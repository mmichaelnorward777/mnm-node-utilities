# MNM-NODE-UTILITIES

This library provides a set of utility functions for date manipulation, file system operations, general logic, object/array handling, string manipulation, URL handling, web page automation, and API requests. All modules are now ES Modules.

## Table of Contents
1. [Date](#date)
2. [File System](#file-system)
3. [General](#general)
4. [JSON](#json)
5. [Node.js](#nodejs)
6. [Objects/Array](#objectsarray)
7. [String](#string)
8. [URL](#url)
9. [Web Page](#web-page)
10. [Web Requests](#web-requests)

---

## Date

Utility functions for formatting, parsing, and manipulating dates and time zones.

### `formattedDate(dateObject)`
- **Purpose**: Returns a date string in `MM-DD-YYYY` format.
- **Arguments**: `dateObject` (Date object, optional). If omitted, uses current date.
- **Returns**: `string`

### `getDateTimeObect(dateTime)`
- **Purpose**: Converts a string or timestamp into a valid Date object.
- **Arguments**: `dateTime` (string or number).
- **Returns**: `Date` object, or current date if invalid.

### `dateTimeObject(dateInSeconds)`
- **Purpose**: Returns a detailed object containing formatted time, date, and helper functions for a specific timestamp.
- **Arguments**: `dateInSeconds` (number/string, optional). Defaults to current time.
- **Returns**: `object` containing `day`, `month`, `year`, `time`, `fullDate`, `fullDateTime`, and functions `getCurrentTime(byTwelve)` and `getCurrentDate(words, separator)`.

### `getTimeElapsed(time1, time2)`
- **Purpose**: Calculates the time difference between two timestamps and returns a human-readable string.
- **Arguments**: `time1` (number), `time2` (number).
- **Returns**: `object` with `timeElapsed` (string like "1 hours, 2 minutes...") and `momentsPassed` (simple string).

### `createZuluStartDate(dateObj)`
- **Purpose**: Converts a Date object into a strict ISO 8601 Zulu (UTC) string with milliseconds.
- **Arguments**: `dateObj` (Date object).
- **Returns**: `Date` object in UTC.

### `getOffsetMinutesForTimezone(timeZone)`
- **Purpose**: Calculates the GMT offset in minutes for a given IANA timezone.
- **Arguments**: `timeZone` (string, e.g., "America/New_York").
- **Returns**: `number` (minutes offset).

### `toISOZeroOffset(input, tz)`
- **Purpose**: Converts a local time string and timezone to a UTC ISO string.
- **Arguments**: `input` (string or Date), `tz` (string, IANA timezone).
- **Returns**: `string` (ISO format) or `null` on error.

### `getHourlyDuration(numOfMinutes)`
- **Purpose**: Breaks down total minutes into hours and minutes.
- **Arguments**: `numOfMinutes` (number).
- **Returns**: `object` `{ hours, minutes }`.

### `getDurationInMinutes(dateObj1, dateObj2)`
- **Purpose**: Calculates the duration in minutes between two Date objects.
- **Arguments**: `dateObj1` (Date), `dateObj2` (Date).
- **Returns**: `number` (minutes).

### `localDateToSelectedTimeZone(dateObj, selectedTimeZone)`
- **Purpose**: Converts a local Date object to a specific target timezone.
- **Arguments**: `dateObj` (Date), `selectedTimeZone` (string).
- **Returns**: `Date` object.

### `getFormattedTime(dateObj)`
- **Purpose**: Formats a Date object into `HH:MM AM/PM`.
- **Arguments**: `dateObj` (Date).
- **Returns**: `string`.

### `getIsoFormattedTime(hours, minutes, seconds)`
- **Purpose**: Formats individual time components into ISO time string.
- **Arguments**: `hours` (number), `minutes` (number), `seconds` (number).
- **Returns**: `string`.

### `fixTimeStr(timeStr)`
- **Purpose**: Standardizes time strings (e.g., "9:00AM" -> "09:00 AM").
- **Arguments**: `timeStr` (string).
- **Returns**: `string`.

### `getCurrentMonthByIndex(monthIndex)`
- **Purpose**: Returns the name of the month from an index (0-11).
- **Arguments**: `monthIndex` (number).
- **Returns**: `string`.

### `getNextMonth(dateObj)`
- **Purpose**: Returns a Date object for the first day of the next month.
- **Arguments**: `dateObj` (Date).
- **Returns**: `Date` object.

### `getPrevMonth(dateObject)`
- **Purpose**: Returns a Date object for the first day of the previous month.
- **Arguments**: `dateObject` (Date).
- **Returns**: `Date` object.

### `getNumberOfDaysOfMonth(dateObj)`
- **Purpose**: Returns the number of days in the month of the given date.
- **Arguments**: `dateObj` (Date).
- **Returns**: `number`.

### `getFormattedDateStr(scheduledDateObj)`
- **Purpose**: Formats a date as "Month Day, Year".
- **Arguments**: `scheduledDateObj` (Date).
- **Returns**: `string`.

### `createTzScheduleObject(scheduledDate, timeOfDay, timeZone)`
- **Purpose**: Creates a detailed schedule object handling timezone conversions.
- **Arguments**: `scheduledDate` (string/Date), `timeOfDay` (string, e.g., "10:00 AM"), `timeZone` (string).
- **Returns**: `object` with various date/time properties and ISO strings.

### `getISOFormattedDate(dateObject)`
- **Purpose**: Returns date in `YYYY-MM-DD` format.
- **Arguments**: `dateObject` (Date).
- **Returns**: `string`.

### `createDateRangeObject(dateObject, lastDateObject)`
- **Purpose**: Creates an object with formatted start and end dates for a range.
- **Arguments**: `dateObject` (Date), `lastDateObject` (Date, optional).
- **Returns**: `object` `{ formattedStartDate, formattedEndDate, nextMonthDateObject }`.

### `checkDateFlow(startDate, endDate)`
- **Purpose**: Determines if the date range is moving forward or backward in time.
- **Arguments**: `startDate` (Date/string), `endDate` (Date/string).
- **Returns**: `string` ("forward" or "backward").

### `getForwardDateRangeObjects(startDate, endDate)`
- **Purpose**: Generates an array of monthly range objects from start to end date.
- **Arguments**: `startDate` (Date/string), `endDate` (Date/string).
- **Returns**: `array` of objects.

### `getBackwardDateRangeObjects(startDate, endDate)`
- **Purpose**: Generates an array of monthly range objects from start to end date (reversed).
- **Arguments**: `startDate` (Date/string), `endDate` (Date/string).
- **Returns**: `array` of objects.

### `getDateRangeObjects(startDate, endDate)`
- **Purpose**: Wrapper for forward/backward range objects based on flow.
- **Arguments**: `startDate` (Date/string), `endDate` (Date/string).
- **Returns**: `array` of objects.

### `getDateRangeObjectsWithIsoZeroOffset(startDate, endDate, timeZone)`
- **Purpose**: Same as `getDateRangeObjects` but includes ISO zero-offset start/end times.
- **Arguments**: `startDate` (Date/string), `endDate` (Date/string), `timeZone` (string).
- **Returns**: `array` of objects with `ztzStartDate` and `ztzEndDate`.

---

## File System

Safe wrappers for Node.js `fs` and `path` modules.

### `baseName(fileName, ...args)`
- **Purpose**: Returns the base name of a file path.
- **Arguments**: `fileName` (string), ...args (extension, optional).
- **Returns**: `string`.

### `fileExists(filePath)`
- **Purpose**: Checks if a file exists synchronously.
- **Arguments**: `filePath` (string).
- **Returns**: `boolean`.

### `isFile(path)`
- **Purpose**: Checks if a path is a file.
- **Arguments**: `path` (string).
- **Returns**: `boolean`.

### `isDirectory(path)`
- **Purpose**: Checks if a path is a directory.
- **Arguments**: `path` (string).
- **Returns**: `boolean`.

### `getFileExt(filePath)`
- **Purpose**: Gets the file extension.
- **Arguments**: `filePath` (string).
- **Returns**: `string`.

### `getParentDir(filePath)`
- **Purpose**: Gets the parent directory of a file path.
- **Arguments**: `filePath` (string).
- **Returns**: `string`.

### `readdir(dirPath, options)`
- **Purpose**: Reads directory contents asynchronously.
- **Arguments**: `dirPath` (string), `options` (object, optional).
- **Returns**: `object` `{ status, result, message, data }`.

### `readdirSync(dirPath, options)`
- **Purpose**: Reads directory contents synchronously.
- **Arguments**: `dirPath` (string), `options` (object, optional).
- **Returns**: `object` `{ status, result, message, data }`.

### `mkdir(dirPath, options)`
- **Purpose**: Creates a directory asynchronously.
- **Arguments**: `dirPath` (string), `options` (object, optional).
- **Returns**: `object` `{ status, result, message }`.

### `mkdirSync(dirPath, options)`
- **Purpose**: Creates a directory synchronously.
- **Arguments**: `dirPath` (string), `options` (object, optional).
- **Returns**: `object` `{ status, result, message }`.

### `deleteDir(dirPath, options)`
- **Purpose**: Deletes a directory asynchronously.
- **Arguments**: `dirPath` (string), `options` (object, optional).
- **Returns**: `object` `{ status, result, message }`.

### `deleteDirSync(dirPath, options)`
- **Purpose**: Deletes a directory synchronously.
- **Arguments**: `dirPath` (string), `options` (object, optional).
- **Returns**: `object` `{ status, result, message }`.

### `readFile(filePath, options)`
- **Purpose**: Reads file content asynchronously.
- **Arguments**: `filePath` (string), `options` (object, optional).
- **Returns**: `object` `{ result, status, message, data }`.

### `readFileSync(filePath, options)`
- **Purpose**: Reads file content synchronously.
- **Arguments**: `filePath` (string), `options` (object, optional).
- **Returns**: `object` `{ result, status, message, data }`.

### `writeFile(filePath, data, options)`
- **Purpose**: Writes data to a file asynchronously.
- **Arguments**: `filePath` (string), `data` (string/buffer), `options` (object, optional).
- **Returns**: `object` `{ result, status, message }`.

### `writeFileSync(filePath, data, options)`
- **Purpose**: Writes data to a file synchronously.
- **Arguments**: `filePath` (string), `data` (string/buffer), `options` (object, optional).
- **Returns**: `object` `{ result, status, message }`.

### `deleteFile(filePath)`
- **Purpose**: Deletes a file asynchronously.
- **Arguments**: `filePath` (string).
- **Returns**: `object` `{ status, result, message }`.

### `deleteFileSync(filePath)`
- **Purpose**: Deletes a file synchronously.
- **Arguments**: `filePath` (string).
- **Returns**: `object` `{ result, status, message }`.

### `getFileSize(filePath)`
- **Purpose**: Gets file size in bytes.
- **Arguments**: `filePath` (string).
- **Returns**: `number` or `false`.

### `isFileEmpty(dirPath, options)`
- **Purpose**: Checks if a file is empty.
- **Arguments**: `dirPath` (string, path to file), `options` (object, optional).
- **Returns**: `boolean`.

### `isFileEmptySync(dirPath, options)`
- **Purpose**: Checks if a file is empty (sync).
- **Arguments**: `dirPath` (string), `options` (object, optional).
- **Returns**: `boolean`.

### `isDirectoryEmpty(dirPath, options)`
- **Purpose**: Checks if a directory is empty.
- **Arguments**: `dirPath` (string), `options` (object, optional).
- **Returns**: `boolean`.

### `isDirectoryEmptySync(dirPath, options)`
- **Purpose**: Checks if a directory is empty (sync).
- **Arguments**: `dirPath` (string), `options` (object, optional).
- **Returns**: `boolean`.

### `getAllFilesFromDirectory(dirPath, fileExt)`
- **Purpose**: Gets all files in a directory, optionally filtered by extension.
- **Arguments**: `dirPath` (string), `fileExt` (string, optional).
- **Returns**: `array` of file names.

### `getAllFilesFromDirectorySync(dirPath, fileExt)`
- **Purpose**: Sync version of `getAllFilesFromDirectory`.
- **Arguments**: `dirPath` (string), `fileExt` (string, optional).
- **Returns**: `array` of file names.

### `getAllDirsFromDirectory(dirPath)`
- **Purpose**: Gets all subdirectories in a directory.
- **Arguments**: `dirPath` (string).
- **Returns**: `array` of directory names.

### `getAllDirsFromDirectorySync(dirPath)`
- **Purpose**: Sync version of `getAllDirsFromDirectory`.
- **Arguments**: `dirPath` (string).
- **Returns**: `array` of directory names.

### `getFileObject(filePath)`
- **Purpose**: Returns an object describing a file or directory.
- **Arguments**: `filePath` (string).
- **Returns**: `object` `{ name, parentDir, fileType, path }`.

### `getAllFilesRecursively(dirPath, excludedFolders)`
- **Purpose**: Recursively gets all files in a directory.
- **Arguments**: `dirPath` (string), `excludedFolders` (array, optional).
- **Returns**: `array` of file objects.

### `getAllFilesRecursivelySync(dirPath, excludedFolders)`
- **Purpose**: Sync version of `getAllFilesRecursively`.
- **Arguments**: `dirPath` (string), `excludedFolders` (array, optional).
- **Returns**: `array` of file objects.

### `deleteAllFilesInDirPath(dirPath, recursive)`
- **Purpose**: Deletes all files in a directory.
- **Arguments**: `dirPath` (string), `recursive` (boolean, optional).
- **Returns**: `object` `{ status, result, message, errorMessages }`.

### `deleteAllDirsInDirPath(dirPath, options)`
- **Purpose**: Deletes all subdirectories in a directory.
- **Arguments**: `dirPath` (string), `options` (object, optional).
- **Returns**: `object` `{ status, result, message, errorMessages }`.

### `deleteAllInDirPath(dirPath)`
- **Purpose**: Deletes all files and directories inside a path.
- **Arguments**: `dirPath` (string).
- **Returns**: `object` `{ status, result, message }`.

### `deleteAllEmptyFilesInDirectory(dirPath, recursive)`
- **Purpose**: Deletes only empty files.
- **Arguments**: `dirPath` (string), `recursive` (boolean).
- **Returns**: `object` `{ status, result, message, errorMessages }`.

### `deleteAllEmptyDirsInDirectory(dirPath, recursive)`
- **Purpose**: Deletes only empty directories.
- **Arguments**: `dirPath` (string), `recursive` (boolean).
- **Returns**: `object` `{ status, result, message, errorMessages }`.

### `getMimeType(file)`
- **Purpose**: Gets the MIME type for a file based on extension.
- **Arguments**: `file` (string, path).
- **Returns**: `string` (MIME type) or `undefined`.

### `getFileExtensionsByMimeType(mimeType)`
- **Purpose**: Gets all file extensions for a MIME type.
- **Arguments**: `mimeType` (string).
- **Returns**: `array` of strings.

### `getSpecifiedExt(url, fileExtensions)`
- **Purpose**: Finds the first matching extension in a URL.
- **Arguments**: `url` (string), `fileExtensions` (array of strings).
- **Returns**: `string` (extension).

### `createDirPath(...args)`
- **Purpose**: Creates a directory path if it doesn't exist.
- **Arguments**: ...args (path segments).
- **Returns**: `string` (absolute path).

### `createSvgFile(filePath, svgName, svgData)`
- **Purpose**: Writes an SVG file.
- **Arguments**: `filePath` (directory path), `svgName` (name), `svgData` (string).
- **Returns**: `object` `{ imageName, imagePath }`.

### `getAppDataDirPath()`
- **Purpose**: Gets the OS-specific application data directory.
- **Arguments**: None.
- **Returns**: `string` (path).

---

## General

General-purpose utility functions.

### `generateUuid(num)`
- **Purpose**: Generates a UUID-like string.
- **Arguments**: `num` (number, radix, default 16).
- **Returns**: `string`.

### `waitForCondition({ conditionCallback, onTrueCallback, messageCallback })`
- **Purpose**: Waits until a condition is true, polling every 100ms.
- **Arguments**: `conditionCallback` (function returning boolean), `onTrueCallback` (function), `messageCallback` (function).
- **Returns**: `Promise<void>`.

### `moderator(arr, callback, bulkCount)`
- **Purpose**: Processes an array in chunks (batches).
- **Arguments**: `arr` (array), `callback` (async function), `bulkCount` (number, default 5).
- **Returns**: `Promise<void>`.

### `slowDown(timeDelay)`
- **Purpose**: Pauses execution for a specified time.
- **Arguments**: `timeDelay` (number, ms, default 7747).
- **Returns**: `Promise<void>`.

### `enumerate(arr, and)`
- **Purpose**: Joins array items into a grammatical string (e.g., "A, B, and C").
- **Arguments**: `arr` (array), `and` (boolean, default false).
- **Returns**: `string`.

### `getRandomNumber(initialIndex, limit)`
- **Purpose**: Generates a random integer.
- **Arguments**: `initialIndex` (number, default 0), `limit` (number, default 10).
- **Returns**: `number`.

### `replaceWithForwardSlash(str)`
- **Purpose**: Replaces backslashes with forward slashes.
- **Arguments**: `str` (string).
- **Returns**: `string`.

### `debounce(fn, delay)`
- **Purpose**: Creates a debounced version of a function.
- **Arguments**: `fn` (function), `delay` (number, ms, default 2500).
- **Returns**: `function`.

### `getNumericValue(str)`
- **Purpose**: Extracts a numeric value from a string.
- **Arguments**: `str` (string).
- **Returns**: `number` or `NaN`.

### `getValidatedStringValue(input)`
- **Purpose**: Converts input to string, returns null if undefined/null.
- **Arguments**: `input` (any).
- **Returns**: `string` or `null`.

---

## JSON

JSON file manipulation.

### `parseValidatedJSON(inputValue)`
- **Purpose**: Parses JSON, returns original value if invalid.
- **Arguments**: `inputValue` (string).
- **Returns**: `any` (parsed object or original string).

### `createJsonFileObject(targetPath, fileName)`
- **Purpose**: Returns a class instance to manage a JSON file (read/write/clear).
- **Arguments**: `targetPath` (string), `fileName` (string).
- **Returns**: `object` (instance) with methods `getSavedData()`, `addData(data, newData)`, `clearData()`.

---

## Node.js

Node-specific utilities.

### `spawnOnChildProcess(filePath)`
- **Purpose**: Forks a child process and logs messages/errors.
- **Arguments**: `filePath` (string).
- **Returns**: `ChildProcess` object.

### `createNodeModule(targetPath, fileName, textData)`
- **Purpose**: Creates a new JS file in a directory.
- **Arguments**: `targetPath` (string), `fileName` (string), `textData` (string).
- **Returns**: `object` (write result).

### `getRequestResult(result, status, contentType)`
- **Purpose**: Formats an HTTP response object.
- **Arguments**: `result` (any), `status` (number, default 200), `contentType` (string, default "application/json").
- **Returns**: `object`.

### `getAppDataDirPath()`
- **Purpose**: Gets the OS-specific application data directory.
- **Arguments**: None.
- **Returns**: `string`.

### `getSystemCommandRunner(config)`
- **Purpose**: A secure factory function that creates a restricted system command executor. It ensures commands are only run in user-approved directories (whitelist) to prevent path traversal attacks.
- **Arguments**:
  - `config` (object): Configuration object containing:
    - `userAllowedPaths` (array of strings): List of absolute or relative directory paths that are permitted for command execution.
- **Returns**: `Function`
  - The returned function accepts:
    - `command` (string): The shell command to execute.
    - `cwd` (string): The current working directory where the command will run.
  - The returned function returns a `Promise` that resolves to an object:
    ```javascript
    {
        statusOk: boolean, // true if allowed and executed, false if denied or failed
        message: string,   // Human-readable status message
        stdout?: string,   // Standard output (if successful)
        stderr?: string,   // Standard error (if failed)
        command: string    // The command that was run
    }
    ```
- **Security Note**: This function uses a whitelist approach. If the resolved `cwd` does not strictly start with any path in `userAllowedPaths`, it returns a rejected Promise with an error status. It prevents command injection by validating the execution context.

---

## Objects/Array

Object and array manipulation.

### `getValidatedPropValues(obj, propNames, callback)`
- **Purpose**: Safely navigates nested properties and runs a callback.
- **Arguments**: `obj` (object), `propNames` (array of strings), `callback` (function).
- **Returns**: `any` (the value at the last property).

### `isObjectInArray(object, array, keysToBeChecked)`
- **Purpose**: Checks if an object exists in an array based on keys.
- **Arguments**: `object` (object), `array` (array), `keysToBeChecked` (array, optional).
- **Returns**: `boolean`.

### `getAllObjectKeys(objects)`
- **Purpose**: Gets all unique keys from an array of objects.
- **Arguments**: `objects` (array of objects).
- **Returns**: `array` of strings.

### `sortObjectsByDate(arr, datePropName, asc)`
- **Purpose**: Sorts an array of objects by a date property.
- **Arguments**: `arr` (array), `datePropName` (string), `asc` (boolean, default true).
- **Returns**: `array` (sorted in place).

### `sortObjectsByPropName(arr, propName, asc)`
- **Purpose**: Sorts an array of objects by a string/number property.
- **Arguments**: `arr` (array), `propName` (string), `asc` (boolean, default true).
- **Returns**: `array` (sorted in place).

### `objectToString(object, delimiter)`
- **Purpose**: Converts object keys/values to a string.
- **Arguments**: `object` (object), `delimiter` (string, default ", ").
- **Returns**: `string`.

### `isObjectUnique(obj, objectsArray, keys)`
- **Purpose**: Checks if an object is unique in an array based on keys.
- **Arguments**: `obj` (object), `objectsArray` (array), `keys` (array, optional).
- **Returns**: `boolean`.

### `filterUnlistedObjects(localObjects, allObjects, keys)`
- **Purpose**: Filters out objects present in `localObjects` from `allObjects`.
- **Arguments**: `localObjects` (array), `allObjects` (array), `keys` (array, optional).
- **Returns**: `array`.

### `shuffleArr(arr)`
- **Purpose**: Shuffles an array in place (Fisher-Yates).
- **Arguments**: `arr` (array).
- **Returns**: `array`.

### `objectCompare(target, src, arrayInclusion)`
- **Purpose**: Compares two objects, checking if `src` properties exist in `target`.
- **Arguments**: `target` (object), `src` (object), `arrayInclusion` (boolean, default true).
- **Returns**: `boolean`.

### `assignProps(target, source)`
- **Purpose**: Deeply assigns properties from source to target (mutates target).
- **Arguments**: `target` (object), `source` (object).
- **Returns**: `object` (target).

### `deepMerge(target, ...sources)`
- **Purpose**: Deeply merges sources into target (mutates target).
- **Arguments**: `target` (object), ...sources (objects).
- **Returns**: `object` (target).

---

## String

String manipulation utilities.

### `toUrl(str)`
- **Purpose**: Converts string to URL-friendly slug (lowercase, hyphens).
- **Arguments**: `str` (string).
- **Returns**: `string`.

### `toCapitalize(str)`
- **Purpose**: Capitalizes first letter, lowers rest.
- **Arguments**: `str` (string).
- **Returns**: `string`.

### `toCapitalizeAll(str)`
- **Purpose**: Capitalizes first letter of each word.
- **Arguments**: `str` (string).
- **Returns**: `string`.

### `toNormalString(str, previousFormat)`
- **Purpose**: Converts camelCase/kebab-case/underscored to normal title case.
- **Arguments**: `str` (string), `previousFormat` (string, default "camel-case").
- **Returns**: `string`.

### `getInitials(str)`
- **Purpose**: Gets initials from a name string.
- **Arguments**: `str` (string).
- **Returns**: `string`.

### `toCamelCase(str, url, initialCap)`
- **Purpose**: Converts string to camelCase.
- **Arguments**: `str` (string), `url` (boolean, use hyphens), `initialCap` (boolean).
- **Returns**: `string`.

---

## URL

URL parsing and construction.

### `urlConstructor(urlString)`
- **Purpose**: Reconstructs a URL with protocol and domain.
- **Arguments**: `urlString` (string).
- **Returns**: `string`.

### `objectToQueryString(obj, prefix)`
- **Purpose**: Converts an object to a query string.
- **Arguments**: `obj` (object), `prefix` (string, optional).
- **Returns**: `string`.

### `queryStringToObject(queryString)`
- **Purpose**: Parses a query string into an object.
- **Arguments**: `queryString` (string).
- **Returns**: `object`.

### `urlToQueryStringObject(urlString, trailingSlash)`
- **Purpose**: Parses a URL into origin, path, and query object.
- **Arguments**: `urlString` (string), `trailingSlash` (boolean, default false).
- **Returns**: `object` `{ queryObject, originalUrl, origin, pathName, queryString, urlWithoutQueryString }`.

### `objectToDotNotation(obj, prefix, res)`
- **Purpose**: Converts nested object to dot notation keys.
- **Arguments**: `obj` (object), `prefix` (string, optional), `res` (object, optional).
- **Returns**: `object`.

### `dotNotationToObject(dotObj)`
- **Purpose**: Converts dot notation object back to nested object.
- **Arguments**: `dotObj` (object).
- **Returns**: `object`.

### `getDomain(url)`
- **Purpose**: Removes protocol and www from URL.
- **Arguments**: `url` (string).
- **Returns**: `string`.

### `checkSubDomain(mainUrl, subUrl)`
- **Purpose**: Checks if subUrl is a subdomain of mainUrl.
- **Arguments**: `mainUrl` (string), `subUrl` (string).
- **Returns**: `boolean`.

### `cleanApiUrl(apiEndpoint, baseUrl, categorizedSetId, page, limit, pathFilter)`
- **Purpose**: Cleans and constructs an API URL with standard params.
- **Arguments**: `apiEndpoint` (string), `baseUrl` (string), `categorizedSetId` (string/number), `page` (number), `limit` (number), `pathFilter` (string).
- **Returns**: `string` (clean URL).

---

## Web Page

Browser-side automation utilities.

### `scrollToBottom(num, containingEl)`
- **Purpose**: Scrolls to the bottom of the page.
- **Arguments**: `num` (number, buffer), `containingEl` (element, optional).
- **Returns**: `Promise<void>`.

### `scrollToTop()`
- **Purpose**: Scrolls to the top of the page.
- **Arguments**: None.
- **Returns**: `Promise<void>`.

### `waitForSelector(callback, numberOfWaits)`
- **Purpose**: Waits for an element to appear.
- **Arguments**: `callback` (function returning element), `numberOfWaits` (number, default 300).
- **Returns**: `Promise<element>`.

### `typeIt({ el, string, elPropKey, newText, duration })`
- **Purpose**: Types a string into an input element character by character.
- **Arguments**: Object `{ el, string, elPropKey (default 'value'), newText (boolean), duration (number) }`.
- **Returns**: `Promise<boolean>`.

### `createJSONBlob(productObjects, excludedProps)`
- **Purpose**: Creates a JSON Blob.
- **Arguments**: `productObjects` (array), `excludedProps` (array, optional).
- **Returns**: `object` `{ jsonBlob, data (string) }`.

### `downloadJsonFile(productObjects, productProps)`
- **Purpose**: Triggers a JSON file download.
- **Arguments**: `productObjects` (array), `productProps` (object).
- **Returns**: `Promise<void>`.

### `downloadAllJsonFiles(dbInstances, dataRowProps)`
- **Purpose**: Downloads JSON files for multiple database instances.
- **Arguments**: `dbInstances` (array), `dataRowProps` (object).
- **Returns**: `Promise<void>`.

### `downloadCsvData(productObjects, fileName)`
- **Purpose**: Triggers a CSV file download.
- **Arguments**: `productObjects` (array), `fileName` (string).
- **Returns**: `void`.

### `readBlobData(blob)`
- **Purpose**: Reads a blob as base64.
- **Arguments**: `blob` (Blob).
- **Returns**: `Promise<string>` (base64).

### `timedReload(condition, timeLimit)`
- **Purpose**: Reloads page if condition is met or time limit reached.
- **Arguments**: `condition` (function), `timeLimit` (number, seconds).
- **Returns**: `Promise<void>`.

### `removeAttributes(containerEl, excludedAttributes)`
- **Purpose**: Removes attributes from elements in a container.
- **Arguments**: `containerEl` (element), `excludedAttributes` (array, optional).
- **Returns**: `void`.

### `extractTableData(table)`
- **Purpose**: Extracts data from an HTML table.
- **Arguments**: `table` (element).
- **Returns**: `array` of objects.

### `detectDOMChanges(fnCallback, logOnConsole)`
- **Purpose**: Returns a function to observe DOM changes.
- **Arguments**: `fnCallback` (function), `logOnConsole` (boolean).
- **Returns**: `function` (observer creator).

### `xhrDetector(callback)`
- **Purpose**: Intercepts XHR and Fetch requests.
- **Arguments**: `callback` (function).
- **Returns**: `void`.

---

## Web Requests

HTTP request utilities.

### `apiRequest(url, options, jsonData, httpsConnection)`
- **Purpose**: Makes a JSON API request.
- **Arguments**: `url` (string), `options` (object), `jsonData` (boolean), `httpsConnection` (boolean).
- **Returns**: `Promise<any>` (parsed JSON).

### `dynamicApiRequest(url, options, jsonData, httpsConnection)`
- **Purpose**: Makes an API request and returns appropriate content type.
- **Arguments**: `url` (string), `options` (object), `jsonData` (boolean), `httpsConnection` (boolean).
- **Returns**: `Promise<any>` (json, text, or blob).

### `postDataObjects(url, dataObjects, options, limit, callback, jsonData, httpsConnection)`
- **Purpose**: Posts an array of objects in batches.
- **Arguments**: `url` (string), `dataObjects` (array), `options` (object), `limit` (number), `callback` (function), `jsonData` (boolean), `httpsConnection` (boolean).
- **Returns**: `Promise<array>`.

### `verifyUrl(newUrl, sameOriginUrl)`
- **Purpose**: Verifies a URL and optionally checks same-origin.
- **Arguments**: `newUrl` (string), `sameOriginUrl` (string, optional).
- **Returns**: `Promise<object>` `{ statusOk, url }`.

### `getRequestResult(result, status, contentType)`
- **Purpose**: Formats an HTTP response object.
- **Arguments**: `result` (any), `status` (number), `contentType` (string).
- **Returns**: `object`.


------------------------------------------------------------------------

# 🤝 Contribution

Contributions, improvements, and expanded documentation are welcome.

1.  Fork the repository\
2.  Create a feature branch\
3.  Submit a Pull Request

------------------------------------------------------------------------

# 📄 License

MIT License --- free to use, modify, and distribute.
