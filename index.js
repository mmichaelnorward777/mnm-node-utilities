// src/utils/index.js

import getNodeUtils from './node.js';
import getGeneralUtils from './general.js';
import getJsonUtils from './json.js';
import getFileSystemUtils from './file-system.js';
import getDateUtils from './date.js';
import getObjectArrayUtils from './objects-array.js';
import getStringUtils from './string.js';
import getUrlUtils from './url.js';
import getWebPageUtils from './web-page.js';
import getWebRequestUtils from './web-requests.js';


export default function getUtilities(config)  {

    const { userAllowedPaths } = config;
    const 


}

const {} = getFileSystemUtils()

// // Merge all named exports into a single utilities object
// export const utilities = {
//     ...nodeUtilities,
//     ...generalUtilities,
//     ...jsonUtilities,
//     ...fileSystemUtilities,
//     ...dateUtilities,
//     ...objectsArrayUtilities,
//     ...stringUtilities,
//     ...urlUtilities,
//     ...webPageUtilities,
//     ...webRequestsUtilities,
// };

// // Export the combined object as default for easy importing
// export default utilities;