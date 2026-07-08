import { moderator, slowDown, waitForCondition } from "./general.js";
import { getAllObjectKeys } from "./objects-array.js";
import { toUrl } from "./string.js";

export async function scrollToBottom(targetDistanceFromBottom = 200, targetEl = document.documentElement, maxTimeout = 10) {

    try {

        let scrollableHeight = targetEl !== window && targetEl !== document.documentElement ? targetEl.scrollHeight : document.documentElement.scrollHeight,
            currentTimeout = 0,
            error = false,
            targetDistance = function(){
                targetDistanceFromBottom = targetDistanceFromBottom > 0 ? targetDistanceFromBottom * -1 : targetDistanceFromBottom;
                return scrollableHeight + targetDistanceFromBottom < 0 ? scrollableHeight * -1 : targetDistanceFromBottom;
            }();
        
        maxTimeout = maxTimeout * 10;      
        targetEl.scrollTo({
            top: scrollableHeight + targetDistance,
            behavior: 'smooth'
        });

        await waitForCondition({
            conditionCallback : () => {
                if(currentTimeout >= maxTimeout)    {
                    console.log({message : "checking condition", currentTimeout, maxTimeout});
                    error = true;
                    return error;
                }
                
                currentTimeout += 1;
                let currentScroll = targetEl !== window ? targetEl.scrollTop : targetEl.scrollY;

                return currentScroll >= scrollableHeight + targetDistance || (currentScroll / scrollableHeight) * 100 > 85;
            },
            messageCallback : () => console.log({message : "still scrolling", currentTimeout, maxTimeout}),
            onTrueCallback : () => console.log("scrolling done"),
        });

        if(error)   {
            throw Error("Reached Maximum timeout for scroll, target distance may not have been reached.")
        }

        return true;

    } catch(err)    {
        return false;
    }
    
}


export async function scrollToTop(targetDistanceFromTop = 0, targetEl = document.documentElement, maxTimeout = 10) {

    try {
        let scrollableHeight = targetEl !== window && targetEl !== document.documentElement ? targetEl.scrollHeight : document.documentElement.scrollHeight, 
            currentTimeout = 0,
            error = false,
            targetDistance = function(){
                targetDistanceFromTop = targetDistanceFromTop > 0 ? targetDistanceFromTop : targetDistanceFromTop * -1;

                return targetDistanceFromTop >= scrollableHeight ? scrollableHeight : targetDistanceFromTop;
            }();
        
        maxTimeout = maxTimeout * 10;
        targetEl.scrollTo({
            top: targetDistance,
            behavior: 'smooth' 
        });

        await waitForCondition({
            conditionCallback : () => {
                if(currentTimeout >= maxTimeout)    {
                    console.log({message : "checking condition", currentTimeout, maxTimeout});
                    error = true;
                    return error;
                }
                let currentScroll = targetEl !== window ? targetEl.scrollTop : targetEl.scrollY;
                currentTimeout += 1;
                return currentScroll <= targetDistance;
            },
            messageCallback : () => console.log({message : "still scrolling", currentTimeout, maxTimeout}),
            onTrueCallback : () => console.log("scrolling done"),
        });

        if(error)   {
            throw Error("Reached Maximum timeout for scroll, target distance may not have been reached.")
        }

        return true;
    } catch(err)    {
        console.log(err)
        return false;
    }
    
}

export async function waitForSelector(callback, numberOfWaits = 300) {
    let node = callback();
    await new Promise(resolve => {
        if (node) {
            resolve();
        }
        let i = 0,
            interval = setInterval(() => {
                node = callback();
                if (node || i >= numberOfWaits) {
                    clearInterval(interval);
                    resolve();
                }
                i++;
            }, 100);

    });
    return node;
}

export async function typeIt({ el, string, elPropKey, newText, duration }) {

    elPropKey = elPropKey ? elPropKey : "value";
    newText = typeof newText !== "undefined" ? newText : true;
    duration = duration ? duration : 7;


    let charsArr = string.split(""),
        condition = el[elPropKey] === string;

    if (newText) {
        el[elPropKey] = "";
    }

    await moderator(charsArr, async (slicedArr) => {

        let [char] = slicedArr;

        await slowDown(duration);

        el[elPropKey] = `${el[elPropKey]}${char}`;

    }, 1);

    await waitForCondition({
        conditionCallback: () => condition,
    });

    return condition;

}

export function createJSONBlob(productObjects, excludedProps = []) {
    let allKeys = getAllObjectKeys(productObjects).filter(item => !excludedProps.includes(item)),
        data = productObjects.map(item => {
            return allKeys.reduce((a, b) => {
                a[b] = item[b];
                return a;
            }, {});
        }),
        jsonBlob = new Blob([JSON.stringify(data, null, 4)], { type: 'application/json' });

    return { jsonBlob, data: JSON.stringify(data, null, 4) };
}

export async function downloadJsonFile(productObjects, productProps = {}) {
    let { jsonBlob } = createJSONBlob(productObjects),
        blobURL = URL.createObjectURL(jsonBlob),
        a = document.createElement('a'),
        fileName = `${toUrl(Object.keys(productProps).reduce((a, b) => {
            a += productProps[b] + " ";
            return a;
        }, "") + ` __date-${Date.now()}` + ` __total-${productObjects.length}`)}.json`;

    a.setAttribute('href', blobURL);
    a.setAttribute('download', `${fileName}.json`);

    a.style.display = 'none';
    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(blobURL);
}

export async function downloadAllJsonFiles(dbInstances = [], dataRowProps = {}) {

    await moderator(dbInstances, async (slicedArr) => {

        let [dbInstance] = slicedArr,
            dataRows = await dbInstance.getAll();

        await downloadJsonFile(dataRows, dataRowProps);

    }, 1);

}

export function downloadCsvData(productObjects, fileName) {

    let { csvBlob } = createCsvBlob(productObjects),
        blobURL = URL.createObjectURL(csvBlob),
        a = document.createElement('a');

    a.setAttribute('href', blobURL);
    a.setAttribute('download', `${fileName}.csv`);

    a.style.display = 'none';
    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(blobURL);

}

export async function readBlobData(blob) {
    let reader = new FileReader(),
        base64data = null;
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
        base64data = reader.result;
    }

    await new Promise(resolve => {
        let interval = setInterval(() => {
            if (base64data) {
                clearInterval(interval);
                resolve();
            }
        }, 10);
    });

    return base64data;

}



export async function timedReload(condition = () => {}, timeLimit = 30) {

    await new Promise((resolve) => {

        let timer = 0,
            interval = setInterval(() => {

            if (condition() || timer >= timeLimit) {
                clearInterval(interval);
                resolve();
            }

            timer += .5;

        }, 500);

    });

    window.location.reload();

}

export function removeAttributes(containerEl, excludedAttributes = []) {
    let elements = Array.from(containerEl.querySelectorAll(`*`));

    elements.forEach(item => {
        let attrs = item.getAttributeNames();

        for (let attr of attrs) {

            if (!excludedAttributes.includes(attr)) {
                item.removeAttribute(attr);
            }

        }
    })
}

export function extractTableData(table) {
    const tableData = [];
    const thead = table.querySelector('thead');
    const thElements = Array.from(thead.querySelectorAll('th'));

    const tbody = table.querySelector('tbody');
    const tbodyRows = tbody.querySelectorAll('tr');

    tbodyRows.forEach(row => {
        const rowData = {};
        const tdElements = Array.from(row.querySelectorAll('td'));

        thElements.forEach((th, index) => {
            const key = th.innerText.trim();
            const value = tdElements[index].innerText.trim();
            rowData[key] = value;
        });

        tableData.push(rowData);
    });

    return tableData;
}

export function detectDOMChanges(fnCallback, logOnConsole = false) {

    let observer = null;

    const observeDOMChanges = (callback) => {
        // Select the target node
        const targetNode = document.body; // You can change this to observe a specific element or the entire document

        // Options for the observer (all possible options)
        const config = { attributes: true, childList: true, subtree: true, characterData: true };

        // Create an observer instance linked to the callback function
        observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);

        // Later, you can disconnect the observer to stop observing
        // observer.disconnect();

        return observer;

    };

    // Example callback function to be called when a change is detected
    const handleDOMChanges = (mutationsList, observer) => {
        mutationsList.forEach((mutation) => {
            fnCallback("Change detected:", mutation);
            if (logOnConsole) {
                console.log("Change detected:", mutation);
            }
        });
    };

    // returns a callback function, that returns the observer


    return () => observeDOMChanges(handleDOMChanges);

}

export function xhrDetector(callback = () => {}) {
    function debounce(fn, delay = 2500) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    let modifiedCallback = debounce(callback);

    (function () {
        // --- Intercept XMLHttpRequest ---
        const originalXhrOpen = XMLHttpRequest.prototype.open;
        const originalXhrSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function (method, url, ...args) {
            this._method = method;
            this._url = url;
            return originalXhrOpen.apply(this, [method, url, ...args]);
        };

        XMLHttpRequest.prototype.send = function (body) {
            const xhr = this;
            const requestBody = body;

            this.addEventListener("readystatechange", function () {
                if (xhr.readyState === 4) {
                    modifiedCallback({
                        type: "XHR",
                        method: xhr._method,
                        url: xhr._url,
                        status: xhr.status,
                        response: xhr.responseText,
                        requestBody: requestBody
                    });
                }
            });

            return originalXhrSend.apply(this, [body]);
        };

        // --- Intercept Fetch ---
        const originalFetch = window.fetch;

        window.fetch = async function (input, init = {}) {
            const method = init.method || "GET";
            const url = typeof input === "string" ? input : input.url;
            let requestBody = init.body;

            // For JSON body, try to clone it as string (only works for supported types)
            let clonedBody = requestBody;
            if (requestBody && typeof requestBody === "object" && !(requestBody instanceof FormData)) {
                try {
                    clonedBody = JSON.stringify(requestBody);
                } catch (e) {
                    clonedBody = "[Unserializable body]";
                }
            }

            const response = await originalFetch(input, init);
            const clone = response.clone();

            clone.text().then((text) =>
                modifiedCallback({
                    type: "Fetch",
                    method,
                    url,
                    status: response.status,
                    response: text,
                    requestBody: clonedBody
                })
            );

            return response;
        };
    })();
}


export function getMouseCoordsOnElement(event, element) {
    const rect = element.getBoundingClientRect();
    
    // Check for standard touches, changedTouches (for touchend), or fallback to mouse clientX/Y
    const clientX = event.touches?.[0]?.clientX ?? event.changedTouches?.[0]?.clientX ?? event.clientX;
    const clientY = event.touches?.[0]?.clientY ?? event.changedTouches?.[0]?.clientY ?? event.clientY;

    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}