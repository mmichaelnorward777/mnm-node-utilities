# MNM-NODE-UTILITIES

**MNM-NODE-UTILITIES** is a modular, lightweight, and practical Node.js
utilities library that provides a wide range of helper functions for:

-   Date & time handling\
-   File system operations\
-   JSON processing\
-   Node process utilities\
-   Object & array manipulation\
-   String manipulation\
-   URL/query-string utilities\
-   Web-page scripting helpers\
-   Web-request utilities\
-   Geo & timezone lookup\ requires playwright
-   Miscellaneous helpers\
-   Factory constructors for Node processes and EventEmitters

This library is designed to be a powerful toolbox for Node.js
applications, automation scripts, web scraping projects, CLI tools, and
backend services. 

***As of now, please bear with the fact that I don't have all the definitions and usage examples for all the functions, and I promise to work on each of them when I have the time to do it -- but most of their functionalities should be explicit enough from their function names alone.***

------------------------------------------------------------------------

## 📦 Installation

### Install via npm

``` bash
npm install mnm-node-utilities
```

### Install via GitHub

``` bash
npm install mmichaelnorward777/mnm-node-utilities
```

------------------------------------------------------------------------

## 📚 Usage

``` js
const { getFormattedDateStr, getNumberOfDaysOfMonth, objectToDotNotation, dotNotationToObject } = require("mnm-node-utilities");

// Example
const date = getFormattedDateStr(new Date());
console.log(date); // sample result would be 'January 5, 2025'

let dt = new Date(),
    numberOfDaysOfMonth = getNumberOfDaysOfMonth(dt);
console.log(numberOfDaysOfMonth) // 28 || 29 || 30 || 31 depending on the current month of the date object

// objectToDotNotation - good for using objects as query params and converting nested objects into dot notation, which works with mongoose

let person = {
        firstName : "John",
        lastName : "Doe",
        familyMembers : {
            spouse : {
                firstName : "Jane",
                lastName : "Doe",
            },
            son : {
                firstName : "George",
                lastName : "Doe"
            }
        }
    },
    dotNotatedPerson = objectToDotNotation(person);

    console.log(dotNotatedPerson); 

    /* 
        this would log: 

        {
            firstName : "John",
            lastName : "Doe",
            familyMembers.spuse.firstName : "Jane",
            familyMembers.spuse.lastName : "Doe",
            familyMembers.son.lastName : "George",
            familyMembers.spuse.lastName : "Doe",
        }
    
    */

// we can also revert dot notated objects back to its original form (nested objects);

let revertedObject = dotNotationToObject(dotNotatedPerson);

console.log(revertedObject);

/* 
    this would log:
    {
        firstName : "John",
        lastName : "Doe",
        familyMembers : {
            spouse : {
                firstName : "Jane",
                lastName : "Doe",
            },
            son : {
                firstName : "George",
                lastName : "Doe"
            }
        }
    }
*/




```

Utilities are grouped logically by category for easier navigation.

------------------------------------------------------------------------

# 📖 Available Functions

Below is the full list of exposed functions currently available in the
package.

> Detailed usage documentation will be added over time.\
> For now, this serves as a complete reference list of what you can
> import and use.

------------------------------------------------------------------------

# 🗓️ Date Functions

-   formattedDate
-   getFormattedTime
-   dateTimeObject
-   getTimeElapsed
-   createZuluStartDate
-   getOffsetMinutesForTimezone
-   toISOZeroOffset
-   getHourlyDuration
-   getDurationInMinutes
-   localDateToSelectedTimeZone
-   getCurrentMonthByIndex
-   getNextMonth
-   getPrevMonth
-   getNumberOfDaysOfMonth
-   getIsoFormattedTime
-   getISOFormattedDate
-   getFormattedDateStr
-   fixTimeStr
-   createTzScheduleObject
-   checkDateFlow
-   getForwardDateRangeObjects
-   getBackwardDateRangeObjects
-   getDateRangeObjects
-   getDateRangeObjectsWithIsoZeroOffset

------------------------------------------------------------------------

# 📁 File System Functions

-   baseName\
-   fileExists\
-   isFile\
-   isDirectory\
-   getFileExt\
-   getParentDir\
-   readdir\
-   readdirSync\
-   mkdir\
-   mkdirSync\
-   deleteDir\
-   deleteDirSync\
-   readFile\
-   readFileSync\
-   writeFile\
-   writeFileSync\
-   deleteFile\
-   deleteFileSync\
-   isFileEmpty\
-   isFileEmptySync\
-   isDirectoryEmpty\
-   isDirectoryEmptySync\
-   getAllFilesFromDirectory\
-   getAllFilesFromDirectorySync\
-   getAllDirsFromDirectory\
-   getAllDirsFromDirectorySync\
-   getFileObject\
-   getAllFilesRecursively\
-   getAllFilesRecursivelySync\
-   deleteAllFilesInDirPath\
-   deleteAllDirsInDirPath\
-   deleteAllInDirPath\
-   deleteAllEmptyFilesInDirectory\
-   deleteAllEmptyDirsInDirectory\
-   getMimeType\
-   getFileExtensionsByMimeType\
-   getSpecifiedExt\
-   getFileSize\
-   createSvgFile\
-   createDirPath\
-   getAppDataDirPath

------------------------------------------------------------------------

# 🧾 JSON Functions

-   createJsonFileObject\
-   parseValidatedJSON

------------------------------------------------------------------------

# ⚙️ Node-Related Functions

-   spawnOnChildProcess\
-   getRequestResult\
-   createNodeModule\
-   sendDataToMainProcess\
-   getAppDataDirPath

------------------------------------------------------------------------

# 🧩 Object & Array Functions

-   getValidatedPropValues\
-   isObjectInArray\
-   getAllObjectKeys\
-   sortObjectsByDate\
-   objectToString\
-   isObjectUnique\
-   filterUnlistedObjects\
-   shuffleArr\
-   sortObjectsByPropName\
-   objectCompare\
-   assignProps\
-   deepObjectAssignment

------------------------------------------------------------------------

# 🔡 String Functions

-   toUrl\
-   toCapitalize\
-   toCapitalizeAll\
-   toNormalString\
-   getInitials\
-   toCamelCase

------------------------------------------------------------------------

# 🌐 URL Functions

-   urlConstructor\
-   objectToQueryString\
-   urlToQueryStringObject\
-   objectToDotNotation\
-   dotNotationToObject\
-   queryStringToObject\
-   getDomain\
-   cleanApiUrl\
-   checkSubDomain

------------------------------------------------------------------------

# 🖥️ Web-Page Related Functions

-   xhrDetector\
-   scrollToBottom\
-   scrollToBottomByCondition\
-   scrollToElement\
-   scrollToTop\
-   toggleScroll\
-   waitForSelector\
-   typeIt\
-   createJSONBlob\
-   downloadJsonFile\
-   downloadAllJsonFiles\
-   downloadCsvData\
-   readBlobData\
-   zipData\
-   timedReload\
-   detectDOMChanges

------------------------------------------------------------------------

# 🌐 Web-Requests Functions

-   apiRequest\
-   postDataObjects\
-   verifyUrl\
-   dynamicApiRequest\
-   getRequestResult

------------------------------------------------------------------------

# 🔧 Miscellaneous Functions

-   filterObjectsByMethodName\
-   dynamicRequire\
-   slowDown\
-   getAllCombination\
-   rgb2hex\
-   pxToPt\
-   encodeURILowerCasedSpecialChars

------------------------------------------------------------------------

# 🗺️ Geo-Timezone Functions

-   getCoords\
-   geoTzLookUp\
-   getGeoTzObject\
-   mapAddressLookup

------------------------------------------------------------------------

# ⚡ Process & EventEmitter Utilities

``` js
nodeProcess: {
    classConstructor: ProcessClass,
    classFactory: processClassFactory,
},

nodeEvent: {
    classConstructor: EventClass
}
```

------------------------------------------------------------------------

# 🤝 Contribution

Contributions, improvements, and expanded documentation are welcome.

1.  Fork the repository\
2.  Create a feature branch\
3.  Submit a Pull Request

------------------------------------------------------------------------

# 📄 License

MIT License --- free to use, modify, and distribute.
