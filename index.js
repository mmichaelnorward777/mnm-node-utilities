// src/utils/index.js

import getNodeUtils from './node-utils.js';
import getGeneralUtils from './general-utils.js';
import getJsonUtils from './json-utils.js';
import getFileSystemUtils from './file-system-utils.js';
import getDateUtils from './date-utils.js';
import getObjectArrayUtils from './objects-array-utils.js';
import getStringUtils from './string-utils.js';
import getUrlUtils from './url-utils.js';
import getWebPageUtils from './web-page-utils.js';
import getWebRequestUtils from './web-requests-utils.js';


export default function getUtilities(config)  {

    /* 
        const sampleUserPath = [
            {
                path : "E:/apps/npm-packages/mnm-node-utilities/test/sample-directory",
                permissions : "rwdx",
            }
        ] 
    */

    const { userAllowedPaths, securedFsCommands } = config;
    const fileSystemUtils = getFileSystemUtils({userAllowedPaths, securedFsCommands});
    const dateUtils = getDateUtils();
    const stringUtils =  getStringUtils();
    const urlUtils = getUrlUtils();
    const generalUtils = getGeneralUtils();

    const { writeFileSync, fileExists, writeFile, readFile, mkdirSync, createDirPath, checkDirPathPermissions } = fileSystemUtils;
    const { toUrl, toNormalString } = stringUtils;
    const { objectToDotNotation } = urlUtils;
    const { moderator, slowDown, waitForCondition } = generalUtils;

    const jsonUtils = getJsonUtils({ writeFileSync, fileExists, writeFile, readFile, mkdirSync });
    const nodeUtils = getNodeUtils({ writeFile, createDirPath, checkDirPathPermissions });
    const objectArrayUtils = getObjectArrayUtils({ toNormalString, objectToDotNotation });
    
    const { getAllObjectKeys } = objectArrayUtils;

    const webPageUtils = getWebPageUtils({ moderator, slowDown, waitForCondition, getAllObjectKeys, toUrl });
    const webRequestUtils = getWebRequestUtils({ moderator });


    return {
        ...fileSystemUtils,
        ...dateUtils,
        ...stringUtils,
        ...urlUtils,
        ...generalUtils,
        ...jsonUtils,
        ...nodeUtils,
        ...objectArrayUtils,
        ...webPageUtils,
        ...webRequestUtils,
    }

}

// const {} = getFileSystemUtils()

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