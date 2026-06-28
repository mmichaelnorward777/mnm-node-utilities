// 1. Import specific functions from each module
import * as miscsUtilities from './miscs/index.js';
import * as nodeUtilities from './node.js';
import * as generalUtilities from './general.js';
import * as jsonUtilities from './json.js';
import * as fileSystemUtilities from './file-system.js';
import * as dateUtilities from './date.js';
import * as objectsArrayUtilities from './objects-array.js';
import * as stringUtilities from './string.js';
import * as urlUtilities from './url.js';
import * as webPageUtilities from './web-page.js';
import * as webRequestsUtilities from './web-requests.js';

// 2. Export the combined object
export default {
    ...miscsUtilities,
    ...nodeUtilities,
    ...generalUtilities,
    ...jsonUtilities,
    ...fileSystemUtilities,
    ...dateUtilities,
    ...objectsArrayUtilities,
    ...stringUtilities,
    ...urlUtilities,
    ...webPageUtilities,
    ...webRequestsUtilities,
};
