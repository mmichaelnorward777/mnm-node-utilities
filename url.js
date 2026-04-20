function urlConstructor(urlString) {
    // Step 1: Identify the parts of the URL
    let protocol = "";
    let domain = "";
    let path = "";
    let queryParams = "";

    // Step 2: Determine the protocol
    if (urlString.startsWith("http://")) {
        protocol = "http://";
        urlString = urlString.slice(protocol.length);
    } else if (urlString.startsWith("https://")) {
        protocol = "https://";
        urlString = urlString.slice(protocol.length);
    } else {
        protocol = "https://";
    }

    // Step 3: Extract the domain or hostname
    if (urlString.includes("/")) {
        domain = urlString.split("/")[0];
        urlString = urlString.slice(domain.length);
    } else {
    
        domain = urlString;

        urlString = "";
    }

    // Step 4: Extract the path or resource
    if (urlString.includes("?")) {
        path = urlString.split("?")[0];
        queryParams = urlString.slice(path.length);
    } else {
        path = urlString;
    }

    // Step 5: Extract the query parameters
    if (queryParams.startsWith("?")) {
        queryParams = queryParams.slice(1);
    }

    // Step 6: Assemble the URL
    let url = protocol + domain + path;
        if (queryParams) {
        url += "?" + queryParams;
    }

    return url;
}

function objectToQueryString(obj, prefix = '') {
    const queryParts = [];

    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        const value = obj[key];
        const prefixedKey = prefix
        ? Array.isArray(obj)
            ? `${prefix}[]`
            : `${prefix}[${key}]`
        : key;

        if (value === null || value === undefined) continue;

        if (typeof value === 'object' && !(value instanceof Date)) {
            queryParts.push(objectToQueryString(value, prefixedKey));
        } else {
            queryParts.push(
                `${encodeURIComponent(prefixedKey)}=${encodeURIComponent(value)}`
            );
        }
    }

    return queryParts.join('&');
}

function queryStringToObject(queryString) {
    const result = {};

    const pairs = queryString.replace(/^\?/, '').split('&');

    for (let pair of pairs) {
        if (!pair) continue;

        const [rawKey, rawValue] = pair.split('=');
        const key = decodeURIComponent(rawKey);
        const value = decodeURIComponent(rawValue || '');

        const keyParts = [];
        key.replace(/\[([^\]]*)\]/g, (_, k) => {
            keyParts.push(k);
            return '';
        });

        const baseKey = key.split('[')[0];
        keyParts.unshift(baseKey);

        let current = result;

        for (let i = 0; i < keyParts.length; i++) {
            const part = keyParts[i] === '' ? undefined : keyParts[i];

            if (i === keyParts.length - 1) {
                if (part === undefined) {
                    // handle array push
                    if (!Array.isArray(current)) current = [];
                    current.push(value);
                } else {
                    if (current[part] === undefined) {
                        current[part] = value;
                    } else if (Array.isArray(current[part])) {
                        current[part].push(value);
                    } else {
                        current[part] = [current[part], value];
                    }
                }
            } else {
                if (part === undefined) {
                    if (!Array.isArray(current)) current = [];
                    current.push({});
                    current = current[current.length - 1];
                } else {
                    if (!current[part] || typeof current[part] !== 'object') {
                        current[part] = {};
                    }
                    current = current[part];
                }
            }
        }
    }

    return result;
}

function urlToQueryStringObject(urlString, trailingSlash = false)   {
    try {
        let url = new URL(urlString),
            queryString = url.search.length ? url.search.slice(1) : "",
            origin = url.origin.charAt(url.origin.length - 1) === "/" ? url.origin.slice(0, -1) : url.origin,
            urlPath = url.pathname;

        urlPath = urlPath.replace(origin, "").trim();
        urlPath = url.pathname.split("/").filter(item => item.length > 0).join("/");
        
        let pathname = trailingSlash ? `${urlPath}/` : urlPath,
            queryObject = queryStringToObject(queryString);

        return {
            queryObject,
            originalUrl : urlString,
            origin,
            pathName : pathname,
            queryString : objectToQueryString(queryObject),
            urlWithoutQueryString : [origin, pathname].join("/"),
        };
    } catch(err)    {
        return null;
    }
}

function objectToDotNotation(obj, prefix = '', res = {}) {
    for (const key in obj) {
        if (!Object.hasOwn(obj, key)) continue;

        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            objectToDotNotation(value, newKey, res);
        } else {
            res[newKey] = value;
        }
    }
    return res;
}

function dotNotationToObject(dotObj) {
    const result = {};

    for (const key in dotObj) {
        const value = dotObj[key];
        const parts = key.split('.');
        let current = result;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];

            if (i === parts.length - 1) {
                current[part] = value;
            } else {
                if (!(part in current)) {
                    current[part] = {};
                }
                current = current[part];
            }
        }
    }

  return result;

}


function getDomain(url) {
    // Remove "https://" or "http://"
    url = url.replace(/^(https?:\/\/)?/, '');
  
    // Remove "www."
    url = url.replace(/^(www\.)?/, '');
  
    return url;
}

function checkSubDomain(mainUrl, subUrl)    {

    return subUrl.toLowerCase().includes(getDomain(mainUrl.toLowerCase()));

}

function cleanApiUrl(apiEndpoint, baseUrl, categorizedSetId, page=1, limit=10, pathFilter="paginated", ) {

    try {
        let urlObject = queryStringToObject(apiEndpoint, false);
        // console.log(urlObject);
        if(!urlObject) {
            apiEndpoint = `${baseUrl}/${apiEndpoint.split("/").filter(item => item.trim() !== "").join("/")}`;
            urlObject = queryStringToObject(apiEndpoint);
        }

        let {queryObject, origin, pathName : pathname} = urlObject;

        if(pathname.includes(baseUrl))  {

            pathname.replace(`${baseUrl}/`, "");

        }

        pathname = pathname.trim().split("/").filter(item => item !== "");

        

        if(!pathname.includes("api") && pathname[0] !== "api") {
            pathname.unshift("api");
        }

        if((pathname[pathname.length - 1] === "single" || pathname[pathname.length - 1] === "all" || pathname[pathname.length - 1] === "paginated") && pathFilter)   {
            pathname[pathname.length - 1] = pathFilter;
        }

        
        if(pathFilter && (!pathname.includes(pathFilter) && pathname[pathname.length - 1] !== pathFilter)) {
            pathname.push(pathFilter);
        }

        queryObject.categorizedSetId = categorizedSetId;
        queryObject.page = page;
        queryObject.limit = limit;
        


        return `${[origin, ...pathname].join("/")}?${objectToQueryString(queryObject)}`;
    }catch(err) {
        console.log(err);
    }

}


module.exports = {
    urlConstructor,
    objectToQueryString,
    urlToQueryStringObject,
    objectToDotNotation,
    dotNotationToObject,
    queryStringToObject,
    getDomain,
    cleanApiUrl,
    checkSubDomain
};