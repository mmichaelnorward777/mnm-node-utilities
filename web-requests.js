import * as http from "http";
import * as https from "https";
import { moderator } from './general.js';


export async function apiRequest(url, options = {}, jsonData = true, httpsConnection = false) {

    const httpAgent = new http.Agent();

    const httpsAgent = new https.Agent();

    let selectedAgent = httpsConnection ? httpsAgent : httpAgent;

    let headers = {
            "Content-Type": "application/json",
        };

    if (options.headers) {
        Object.assign(headers, options.headers);
    }

    let requestOptions = jsonData ? { ...options, headers, agent: selectedAgent } : options,
        res = await fetch(url, requestOptions),
        data = await res.json();

    return data;
}

export async function dynamicApiRequest(url, options = {}, jsonData = true, httpsConnection = false) {
    const isHttps = url.startsWith("https:");

    const agent = isHttps
        ? new https.Agent()
        : new http.Agent();

    let headers = {
            "Content-Type": "application/json",
        };

    if (options.headers) {
        Object.assign(headers, options.headers);
    }

    let requestOptions = jsonData ? { ...options, headers, agent } : options,
        res = await fetch(url, requestOptions),
        contentType = res.headers.get('Content-Type');

    if (contentType && contentType.includes('application/json')) {
        return await res.json();
    } else if (contentType && contentType.includes('text/html')) {
        return await res.text();
    } else if (contentType && contentType.includes('application/octet-stream')) {
        return await res.blob();
    } else {
        return await res.text(); // fallback
    }
}

export async function postDataObjects(url, dataObjects, options = {}, limit = 5, callback = async () => { }, jsonData = true, httpsConnection = false) {

    let allResults = [];

    await moderator(dataObjects, async (slicedArr) => {

        let requestPromises = slicedArr.map(item => {
            return async function () {
                try {
                    let postResult = await apiRequest(
                        url,
                        {
                            method: "POST",
                            body: JSON.stringify(item, null, 4),
                            ...options
                        },
                        jsonData,
                        httpsConnection,
                    );
                    console.log(postResult);
                    return postResult;
                } catch (err) {
                    return item;
                }
            }
        });

        let results = await Promise.all(requestPromises.map(item => item()));

        await callback(results);

        allResults.push(...results);

    }, limit);

    return allResults;

}

export async function verifyUrl(newUrl, sameOriginUrl = null) {

    try {

        const httpAgent = new http.Agent();
        const httpsAgent = new https.Agent();

        const agent = newUrl.startsWith("https:") ? httpsAgent : httpAgent;

        const response = await fetch(newUrl, {
            agent,
            redirect: "follow"
        });

        const responseURL = response.url;

        if (!responseURL) {
            throw Error("We didn't get a response from that url");
        }

        // verify same origin
        if (sameOriginUrl) {
            const newUrlObj = new URL(responseURL);
            const sameOriginUrlObj = new URL(sameOriginUrl);

            if (newUrlObj.origin !== sameOriginUrlObj.origin) {
                throw Error("URL are not from the same origin");
            }
        }

        return {
            statusOk: responseURL === newUrl || responseURL === `${newUrl}/`,
            url: responseURL,
        };

    } catch (err) {

        return {
            statusOk: false,
            message: err.message,
            url: null,
        };
    }

}

export function getRequestResult(result, status = 200, contentType = "application/json") {
    let obj = {
        contentType,
        status: status,
        data: contentType === "application/json" ? JSON.stringify(result, null, 4) : result,
    };
    return obj;
}
