const nodeUtilities = require("./node");
const generalUtilities = require("./general");
const dateUtilities = require("./date");
const objectsArrayUtilities = require("./objects-array");
const stringUtilities = require("./string");
const urlUtilities = require("./url");
const webPageUtilities = require("./web-page");
const webRequestsUtilities = require("./web-requests");
const fileSystemUtilities = require("./file-system");
const jsonUtilities = require("./json");
const miscsUtilities = require("./miscs");

// const ProcessClass = require("./classes/process/process");
// const processClassFactory = require("./classes/process/index");
// const EventClass = require("./classes/event/event");


module.exports = {
    // nodeProcess : {
    //     classConstructor : ProcessClass,
    //     classFactory : processClassFactory,
    // },
    // nodeEvent : {
    //     classConstructor : EventClass
    // },
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
}