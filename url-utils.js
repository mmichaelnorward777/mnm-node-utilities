export default function getUrlUtils()   {

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
            if (!Object.hasOwn(obj, key)) continue;

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

        if (!queryString) return result;

        const pairs = queryString.replace(/^\?/, '').split('&');

        for (let pair of pairs) {
            if (!pair) continue;

            const [rawKey, rawValue] = pair.split('=');
            const key = decodeURIComponent(rawKey);
            const value = decodeURIComponent(rawValue || '');

            // 1. Parse the key into parts
            // "user[email]" -> ["user", "email"]
            // "items[]" -> ["items", undefined]  (undefined signals array push)
            // "items[0][name]" -> ["items", "0", "name"]
            const parts = [];
            const baseKey = key.split('[')[0];
            parts.push(baseKey);

            const bracketRegex = /\[([^\]]*)\]/g;
            let match;
            while ((match = bracketRegex.exec(key)) !== null) {
                // If the content is empty string "", it means [], so we use undefined
                parts.push(match[1] === '' ? undefined : match[1]);
            }

            // 2. Navigate or Create the Structure
            let current = result;

            // We iterate through all parts EXCEPT the last one to build the path
            for (let i = 0; i < parts.length - 1; i++) {
                const part = parts[i];

                if (!current[part]) {
                    // If the next part is undefined, this container must be an array
                    // If the next part is a string, this container must be an object
                    const nextPart = parts[i + 1];
                    
                    if (nextPart === undefined) {
                        current[part] = [];
                    } else {
                        current[part] = {};
                    }
                }

                current = current[part];
            }

            // 3. Assign the Value to the Final Part
            const finalPart = parts[parts.length - 1];

            if (finalPart === undefined) {
                // This means the key ended with []
                // Ensure current is an array
                if (!Array.isArray(current)) {
                    current = [];
                }
                current.push(value);
            } else {
                // Standard assignment
                current[finalPart] = value;
            }
        }

        return result;
    }


    

    function urlToQueryStringObject(urlString, trailingSlash = false) {
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
                originalUrl: urlString,
                origin,
                pathName: pathname,
                queryString: objectToQueryString(queryObject),
                urlWithoutQueryString: [origin, pathname].join("/"),
            };
        } catch (err) {
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
        let cleanUrl = url.replace(/^(https?:\/\/)?/, '');

        // Remove "www."
        cleanUrl = cleanUrl.replace(/^www\./, '');

        // Split by slash and return the first part (the domain)
        return cleanUrl.split('/')[0];
    }


    function checkSubDomain(mainUrl, subUrl) {

        return subUrl.toLowerCase().includes(getDomain(mainUrl.toLowerCase()));

    }

    return {
        urlConstructor,
        objectToQueryString,
        queryStringToObject,
        urlToQueryStringObject,
        objectToDotNotation,
        dotNotationToObject,
        getDomain,
        checkSubDomain,
    }

}


