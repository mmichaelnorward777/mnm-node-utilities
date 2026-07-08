// src/utils/index.js

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

// Merge all named exports into a single utilities object
export const utilities = {
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

// Export the combined object as default for easy importing
export default utilities;