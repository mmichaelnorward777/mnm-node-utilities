export default function getWebRequestUtils({ moderator })    {

    async function apiRequest(url, options = {}, jsonData = true) {

        let headers = {
                "Content-Type": "application/json",
            };

        if (options.headers) {
            Object.assign(headers, options.headers);
        }

        let requestOptions = jsonData ? { ...options, headers } : options,
            res = await fetch(url, requestOptions),
            data = await res.json();

        return data;
    }

    async function dynamicApiRequest(url, options = {}, jsonData = true) {
        
        let headers = {
                "Content-Type": "application/json",
            };

        if (options.headers) {
            Object.assign(headers, options.headers);
        }

        let requestOptions = jsonData ? { ...options, headers } : options,
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

    async function postDataObjects(url, dataObjects, options = {}, limit = 5, callback = async () => { }, jsonData = true) {

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

    async function verifyUrl(newUrl, sameOriginUrl = null) {

        try {

            const response = await fetch(newUrl, {
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

    function getRequestResult(result, status = 200, contentType = "application/json") {
        let obj = {
            contentType,
            status: status,
            data: contentType === "application/json" ? JSON.stringify(result, null, 4) : result,
        };
        return obj;
    }

    return  {
        apiRequest,
        getWebRequestUtils,
        dynamicApiRequest,
        postDataObjects,
        verifyUrl,
        getRequestResult
        
    }

}



