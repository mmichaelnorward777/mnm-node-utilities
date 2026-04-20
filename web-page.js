const {saveAs} = require("file-saver");
const { moderator, slowDown, waitForCondition } = require("./general");
const { getAllObjectKeys } = require("./objects-array");

async function scrollToBottom(num = 75, containingEl = null)  {

    let scrollableHeight = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight
        ) - window.innerHeight,
        currentScroll = window.scrollY;

    function scroll()   {
        currentScroll = window.scrollY;
    }

    window.addEventListener("scroll", scroll);

    await new Promise(resolve => {
        let interval = setInterval(() => {
                window.scrollTo(0, currentScroll + 10);

                if(currentScroll >= scrollableHeight - num) {
                    clearInterval(interval);
                    window.removeEventListener("scroll", scroll);
                    resolve();
                }
            }, 1);
    });
    
}

async function scrollToBottomByCondition(conditionObject, propName)  {
    let totalHeight = window.innerHeight,
        currentScroll = window.scrollY;

    function scroll()   {
        currentScroll = window.scrollY;
    }
    
    window.addEventListener("scroll", scroll);

    await new Promise(resolve => {

        let interval = setInterval(async () => {

            window.scrollTo(0, currentScroll + 1000);

            totalHeight = window.innerHeight;

            if(conditionObject[propName])    {

                console.log({
                    condition : conditionObject[propName],
                    message : conditionObject[propName] ? "condition is met" : "condition is not met",
                });

                clearInterval(interval);
                window.removeEventListener("scroll", scroll);
                resolve();

            }
        }, 25);
    });
    
}

async function scrollToElement(el)  {
    let scrollableHeight = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight
        ) - window.innerHeight,
        currentScroll = window.scrollY;

    function scroll()   {
        currentScroll = window.scrollY;
    }

    window.addEventListener("scroll", scroll);

    await new Promise(resolve => {
        let interval = setInterval(() => {
                window.scrollTo(0, currentScroll + 10);
                parallaxOffsetTop = el.offsetTop + el.offsetHeight;

                if(currentScroll >= parallaxOffsetTop) {

                    clearInterval(interval);
                    window.removeEventListener("scroll", scroll);
                    resolve();
                }
            }, 1);
    });

}

async function toggleScroll()   {

    let scrollableHeight = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight
        ) - window.innerHeight,
        currentScroll = window.scrollY,
        halfPageScroll = scrollableHeight / 2;

    if(halfPageScroll > currentScroll)  {
        await scrollToBottom();
    } else  {
        await scrollToTop();
    }

    await toggleScroll();
}

async function scrollToTop()   {
    let totalHeight = document.body.offsetHeight - window.innerHeight,
        currentScroll = window.scrollY;

    function scroll()   {
        currentScroll = window.scrollY;
    }
    
    window.addEventListener("scroll", scroll);

    await new Promise(resolve => {
        let interval = setInterval(() => {
            window.scrollTo(0, currentScroll - 10);
            
            if(currentScroll <= 0) {

                clearInterval(interval);
                window.removeEventListener("scroll", scroll);
                resolve();
            }
        }, 1);
    });
}

async function waitForSelector(callback, numberOfWaits = 300)  {
    let node = callback();
    await new Promise(resolve => {
        if(node)    {
            resolve();
        }
        let i = 0,
            interval = setInterval(() => {
                node = callback();
                if(node || i >= numberOfWaits)    {
                    clearInterval(interval);
                    resolve();
                }
                i++;
            }, 100);

    });
    return node;
}

async function typeIt({el, string, elPropKey, newText, duration}) {

    elPropKey = elPropKey ? elPropKey : "value";
    newText = typeof newText !== "undefined" ? newText : true;
    duration = duration ? duration : 7;


    let charsArr = string.split(""),
        condition = el[elPropKey] === string;

    if(newText) {
        el[elPropKey] = "";
    }

    await moderator(charsArr, async (slicedArr) => {
        
        let [char] = slicedArr;

        await slowDown(duration);

        el[elPropKey] = `${el[elPropKey]}${char}`;

    }, 1);

    await waitForCondition({
        conditionCallback : () => condition,
    });

    return condition;

}

function createJSONBlob(productObjects, excludedProps = [])    {
    let allKeys = getAllObjectKeys(productObjects).filter(item => !excludedProps.includes(item)),
        data = productObjects.map(item => {
            return allKeys.reduce((a, b) => {
                a[b] = item[b];
                return a;
            }, {});
        }),
        jsonBlob = new Blob([JSON.stringify(data, null, 4)], {type: 'application/json'});

    return {jsonBlob, data : JSON.stringify(data, null, 4)};
}

async function downloadJsonFile(productObjects, productProps = {})  {
    let {jsonBlob} = createJSONBlob(productObjects),
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

async function downloadAllJsonFiles(dbInstances = [], dataRowProps = {})   {

    await moderator(dbInstances, async (slicedArr) => {

        let [dbInstance] = slicedArr, 
            dataRows = await dbInstance.getAll();

        await downloadJsonFile(dataRows, dataRowProps);

    }, 1);

}

function downloadCsvData(productObjects, fileName)   {

    let {csvBlob} = createCsvBlob(productObjects),
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

async function readBlobData(blob)   {
    let reader = new FileReader(),
        base64data = null;
    reader.readAsDataURL(blob); 
    reader.onloadend = function() {
        base64data = reader.result;                
    }

    await new Promise(resolve => {
        let interval = setInterval(() => {
            if(base64data)  {
                clearInterval(interval);
                resolve();
            }
        }, 10);
    });

    return base64data;

}



async function timedReload(condition = () => {}, timeLimit = 30)   {

    await new Promise((resolve) => {

        let timer = 0,
            interval = setInterval(() => {

            if(condition() || timer >= timeLimit) {
                clearInterval(interval);
                resolve();
            }

            timer += .5;

        }, 500);

    });

    window.location.reload();

}

function removeAttributes(containerEl, excludedAttributes = [])  {
    let elements = Array.from(containerEll.querySelectorAll(`*`));

    elements.forEach(item => {
        let attrs = item.getAttributeNames();

        for(let attr of attrs) {

            if(!excludedAttributes.includes(attr))  {
                item.removeAttribute(attr);
            }

        }
    })
}

function extractTableData(table) {
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

function detectDOMChanges(fnCallback, logOnConsole = false) {

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
            if(logOnConsole)    {
                console.log("Change detected:", mutation);
            }   
        });
    };
      
    // returns a callback function, that returns the observer
    

    return () => observeDOMChanges(handleDOMChanges);

}

function xhrDetector(callback = () => {}) {
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


module.exports = {
    xhrDetector,
    scrollToBottom,
    scrollToBottomByCondition,
    scrollToElement,
    scrollToTop,
    toggleScroll,
    waitForSelector,
    typeIt,
    createJSONBlob,
    downloadJsonFile,
    downloadAllJsonFiles,
    downloadCsvData,
    readBlobData,
    timedReload,
    detectDOMChanges
}