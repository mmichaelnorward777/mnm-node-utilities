const { find : findGeoLocation } = require("geo-tz");

function geoTzLookUp({lat, lon})  {
    return findGeoLocation(lat, lon);
}


async function getCoords(playWrightBrowser, contextMenuVisible)    {

    let coordsString = await playWrightBrowser.page.getByRole('menuitemradio').first().textContent();

    if(coordsString && contextMenuVisible)    {
        let [lat, lon] = coordsString.split(",").map(item => item.trim()),
            [timeZone] = geoTzLookUp({lat, lon});

        // console.log(result, lon, lat);
        await playWrightBrowser.closeBrowser();

        delete(playWrightBrowser);

        return {
            timeZone,
            coords : {
                lat, 
                lon
            }
        }
    } else  {

        return null;

    }

}

async function getGeoTzObject(playWrightBrowser, address) {

    try {

        let modifiedAddress = address.replace("-", "").replace(/,/g, "").replace(/\s+/g, "+");

        await playWrightBrowser.createPageInstance();

        await playWrightBrowser.context.setDefaultTimeout(10000);

        await playWrightBrowser.navigateToUrl(`https://www.google.com/maps/search/${encodeURIComponent(modifiedAddress)}`);

        await playWrightBrowser.getStorageStateFromBrowser();

        await slowDown(1500);

        await playWrightBrowser.evaluateScript(async (browserId) => {
            console.log("Getting the Coordinates to determine the timezone of the address", {
                browserId,
                date : new Date(),
                message : "Getting the Coordinates to determine the timezone of the address"
            });
        }, playWrightBrowser.browserId);


        await playWrightBrowser.page.waitForSelector('canvas');

        // Get the viewport size (so we can click the middle)
        let viewport = playWrightBrowser.page.viewportSize(),
            centerX = viewport.width / 2,
            centerY = viewport.height / 2;

        let contextMenuVisible = false,
            attempts = 0,
            maxAttempts = 10; // prevent infinite loop

        while (!contextMenuVisible && attempts < maxAttempts) {

            attempts++;
            console.log({
                message : `Right Clicking at the center of the page to get the coordinates`,
                attempts,
            });

            // Right-click at the center of the page
            await playWrightBrowser.page.mouse.click(centerX, centerY, { button: 'right' });

            // Small pause to allow Google Maps to react
            await playWrightBrowser.page.waitForTimeout(430);

            // Check if a context menu (the white Google Maps popup) appeared
            contextMenuVisible = await playWrightBrowser.evaluateScript(() => {
                return !!document.querySelector('div[role="menu"][jsaction$=".contextmenu"]');
            });
        }        

        return await getCoords(playWrightBrowser, contextMenuVisible);

    } catch(err)    {

        await playWrightBrowser.closeBrowser();

        return await getGeoTzObject(playWrightBrowser, address);

    }

}

async function mapAddressLookup(playWrightBrowser, nameOfPlace, countryName)    {

    try {

        await playWrightBrowser.createPageInstance();

        await playWrightBrowser.navigateToUrl(`https://gemini.google.com/app`);

        await playWrightBrowser.getStorageStateFromBrowser();

        await slowDown(1000);
        
        let prompt = `Only answer in JSON format. Find the actual address of ${nameOfPlace} in ${countryName}, and give me a JSON result with the following properties: streetAddress1, streetAddress2, city, state, country, postalCode. Do not give further answer aside from the JSON format. Place your answer in a codeblock.`;

        await playWrightBrowser.click('div.ql-editor.textarea');

        await playWrightBrowser.fillWithText('div.ql-editor.textarea', prompt);

        await slowDown(1500);

        await playWrightBrowser.pressEnter();

        await playWrightBrowser.waitForSelector(`code.code-container`)

        let storeLocation = await playWrightBrowser.evaluateScript(async() => {

            let { waitForCondition } = window.__pwa.utilities,
                codeContainer = document.querySelector("code.code-container");

            await waitForCondition({
                conditionCallback : () => {
                    return codeContainer.innerText.trim().includes(`{`) && codeContainer.innerText.trim().includes(`}`);
                },
                messageCallback : () => console.log("waiting for text to finish...")
            });

            let jsonText = codeContainer ? codeContainer.innerText.trim() : `{}`;

            return jsonText;

        });

        // console.log(result, lon, lat);
        // await playWrightBrowser.closeBrowser();

        // delete(playWrightBrowser);

        return storeLocation


    } catch(err)    {

        await playWrightBrowser.closeBrowser();

        return await getGeoTzObject(playWrightBrowser, address);

    }

}

module.exports = {
    getCoords,
    geoTzLookUp,
    getGeoTzObject,
    mapAddressLookup
}