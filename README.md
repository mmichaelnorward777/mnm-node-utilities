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

## Module: `date-utils`

This module provides a comprehensive suite of utility functions for date parsing, formatting, time zone conversions, and date range calculations. It handles both local time and UTC/Zulu time conversions, with a specific focus on normalizing local times to specific business time zones.

### Testing the Module

To run the tests for this module, ensure you are in the project root directory and execute the following command:

```bash
npm run test-date
```

---

### API Reference

#### 1. `formattedDate(dateObject)`

Formats a date object into a string in the format `MM-DD-YYYY`.

*   **Arguments:**
    *   `dateObject` (`Date` | `null`): The date object to format. If `null` or `undefined`, uses the current date.
*   **Returns:**
    *   `string`: The formatted date string (e.g., `"05-23-2023"`).

#### 2. `getDateTimeObect(dateTime)`

Parses various input formats into a standard JavaScript `Date` object.

*   **Arguments:**
    *   `dateTime` (`Date` | `number` | `string`): The input to parse.
        *   If `Date`: Returns the same object.
        *   If `number`: Interpreted as a Unix timestamp (milliseconds).
        *   If `string`: Expects a date string containing `-` (e.g., `"2023-05-05"`).
*   **Returns:**
    *   `Date`: A valid `Date` object.
    *   If the input is invalid, it catches the error and returns `new Date()` (current date).

#### 3. `dateTimeObject(dateObj)`

Extracts detailed components of a date and time, providing various helper methods.

*   **Arguments:**
    *   `dateObj` (`Date` | `string` | `number`): The input date.
*   **Returns:**
    *   `Object`: An object containing:
        *   `day` (`string`): Full day name (e.g., `"Friday"`).
        *   `month` (`string`): Full month name (e.g., `"May"`).
        *   `year` (`number`): The year (e.g., `2023`).
        *   `date` (`number`): The day of the month (e.g., `5`).
        *   `time` (`string`): Current time in 12-hour format (e.g., `"03:30:45 PM"`).
        *   `getCurrentTime(byTwelve)` (`Function`):
            *   `byTwelve` (`boolean`, default `true`): If `false`, returns 24-hour format.
            *   Returns: `string` (e.g., `"15:30:45"` or `"03:30:45 PM"`).
        *   `getCurrentDate(words, separator)` (`Function`):
            *   `words` (`boolean`, default `true`): If `true`, returns format like `"May 5, 2023"`. If `false`, returns numeric format like `"05/05/2023"`.
            *   `separator` (`string`, default `"/"`): Separator for numeric format.
            *   Returns: `string`.
        *   `fullDate` (`string`): Combined date and day (e.g., `"May 5, 2023 - Friday"`).
        *   `fullDateTime` (`string`): Full date, day, and time (e.g., `"May 5, 2023 - Friday - 03:30:45 PM"`).

#### 4. `getTimeElapsed(time1, time2)`

Calculates the time difference between two timestamps and returns a human-readable summary.

*   **Arguments:**
    *   `time1` (`number`): First timestamp (milliseconds).
    *   `time2` (`number`): Second timestamp (milliseconds).
*   **Returns:**
    *   `Object`:
        *   `timeElapsed` (`string`): Detailed breakdown (e.g., `"1 hours, 30 minutes, and 45.5 seconds"`).
        *   `momentsPassed` (`string`): Human-readable summary (e.g., `"1 hour has passed."`). Note: Logic handles singular/plural grammar.

#### 5. `createZuluStartDate(dateObj)`

Creates a `Date` object representing the start of the day in UTC (Zulu time) based on the local time components of the input.

*   **Arguments:**
    *   `dateObj` (`Date`): The local date object.
*   **Returns:**
    *   `Date`: A new `Date` object set to UTC `+00:00` with the same year, month, day, hour, minute, second, and millisecond as the input.

#### 6. `getOffsetMinutesForTimezone(timeZone)`

Calculates the timezone offset in minutes relative to UTC for a given timezone.

*   **Arguments:**
    *   `timeZone` (`string`): The IANA timezone identifier (e.g., `"UTC"`, `"America/New_York"`).
*   **Returns:**
    *   `number`: The offset in minutes (e.g., `0` for UTC, `-300` for EST).

#### 7. `toISOZeroOffset(input, tz)`

Converts a local date/time to an ISO string with a zero offset (`+00:00`) adjusted for the specified timezone. This is useful for normalizing local times to a specific business time zone before converting to UTC.

*   **Arguments:**
    *   `input` (`Date` | `string`): The date to convert.
    *   `tz` (`string`): The target timezone (e.g., `"Europe/Dublin"`).
*   **Returns:**
    *   `string` | `null`: An ISO formatted string ending in `+00:00` (e.g., `"2023-05-05T10:00:00.000+00:00"`). Returns `null` if input is invalid.

#### 8. `getHourlyDuration(numOfMinutes)`

Breaks down a total number of minutes into hours and remaining minutes.

*   **Arguments:**
    *   `numOfMinutes` (`number`): Total minutes.
*   **Returns:**
    *   `Object`:
        *   `hours` (`number`): Whole hours.
        *   `minutes` (`number`): Remaining minutes.

#### 9. `getDurationInMinutes(dateObj1, dateObj2)`

Calculates the duration in minutes between two date objects.

*   **Arguments:**
    *   `dateObj1` (`Date`): End date.
    *   `dateObj2` (`Date`): Start date.
*   **Returns:**
    *   `number`: The difference in minutes. Can be negative if `dateObj1` is before `dateObj2`.

#### 10. `localDateToSelectedTimeZone(dateObj, selectedTimeZone)`

Converts a date from the local system timezone to a selected target timezone.

*   **Arguments:**
    *   `dateObj` (`Date`): The date in local time.
    *   `selectedTimeZone` (`string`): The target IANA timezone.
*   **Returns:**
    *   `Date`: A new `Date` object representing the time in the selected timezone.

#### 11. `getFormattedTime(dateObj)`

Formats a date object into a 12-hour time string with AM/PM.

*   **Arguments:**
    *   `dateObj` (`Date`): The date object.
*   **Returns:**
    *   `string`: Formatted time (e.g., `"03:05 PM"`). Handles midnight (12 AM) and noon (12 PM) correctly.

#### 12. `getIsoFormattedTime(hours, minutes, seconds)`

Formats individual time components into an ISO-like time string with zero-padding.

*   **Arguments:**
    *   `hours` (`number`): Hour (0-23).
    *   `minutes` (`number`): Minute (0-59).
    *   `seconds` (`number`): Second (0-59).
*   **Returns:**
    *   `string`: ISO formatted time (e.g., `"01:05:09"`).

#### 13. `fixTimeStr(timeStr)`

Normalizes a time string that might be missing spaces or zero-padding.

*   **Arguments:**
    *   `timeStr` (`string`): Raw time string (e.g., `"3:05PM"` or `"15:30 PM"`).
*   **Returns:**
    *   `string`: Normalized string (e.g., `"03:05 PM"`).

#### 14. `getCurrentMonthByIndex(monthIndex)`

Returns the full name of a month based on its 0-indexed integer.

*   **Arguments:**
    *   `monthIndex` (`number`): 0 for January, 11 for December.
*   **Returns:**
    *   `string`: Full month name (e.g., `"May"`). Returns `"January"` for invalid indices.

#### 15. `getNextMonth(dateObj)`

Returns a `Date` object representing the 1st day of the next month.

*   **Arguments:**
    *   `dateObj` (`Date`): The reference date.
*   **Returns:**
    *   `Date`: The first day of the next month. Handles year rollover (e.g., December -> January of next year).

#### 16. `getPrevMonth(dateObject)`

Returns a `Date` object representing a day in the previous month. It attempts to keep the same day number, clamping to the last day of the previous month if necessary (e.g., Jan 31 -> Feb 28).

*   **Arguments:**
    *   `dateObject` (`Date`): The reference date.
*   **Returns:**
    *   `Date`: The date in the previous month.

#### 17. `getNumberOfDaysOfMonth(dateObj)`

Calculates the number of days in the month of the given date.

*   **Arguments:**
    *   `dateObj` (`Date`): Any date in the month of interest.
*   **Returns:**
    *   `number`: Number of days (e.g., `28`, `30`, `31`).

#### 18. `getFormattedDateStr(scheduledDateObj)`

Formats a date object into a readable string format.

*   **Arguments:**
    *   `scheduledDateObj` (`Date`): The date object.
*   **Returns:**
    *   `string`: Format like `"May 5, 2023"`.

#### 19. `toLocalBusinessTimeZone(dateObj, businessTimeZone)`

Converts a UTC date object to the local business time zone.

*   **Arguments:**
    *   `dateObj` (`Date`): A date object (typically UTC).
    *   `businessTimeZone` (`string`): The target IANA timezone.
*   **Returns:**
    *   `Date`: The date adjusted to the business timezone.

#### 20. `createTzScheduleObject(scheduledDate, timeOfDay, timeZone)`

Creates a comprehensive object representing a scheduled time in a specific business timezone, converting it to ISO formats. This is the core method for handling timezone-aware scheduling.

*   **Arguments:**
    *   `scheduledDate` (`string` | `Date`): The date part of the schedule (e.g., `"2023-05-05"`).
    *   `timeOfDay` (`string`): The time part (e.g., `"10:00:00"` or `"10:00:00 AM"`).
    *   `timeZone` (`string`): The business IANA timezone (e.g., `"Europe/Dublin"`).
*   **Returns:**
    *   `Object`:
        *   `lbtzDateObj` (`Date`): Date object in the business timezone.
        *   `isoStringFullDate` (`string`): Full ISO string (e.g., `"2023-05-05T02:00:00.000Z"`).
        *   `month` (`number`): Month index (0-11).
        *   `date` (`number`): Day of month.
        *   `year` (`number`): Year.
        *   `hours` (`number`): Hour (0-23).
        *   `minutes` (`number`): Minute.
        *   `seconds` (`number`): Second.
        *   `isoStringDate` (`string`): ISO date string (e.g., `"2023-05-05"`).
        *   `isoStringTime` (`string`): ISO time string (e.g., `"10:00:00.000"`).
        *   `formattedDate` (`string`): Readable date (e.g., `"May 5, 2023"`).
    *   If an error occurs, returns an error object: `{ statusOk: false, message: string, src: "createLbtzSchedule" }`.

#### 21. `getISOFormattedDate(dateObject)`

Formats a date object into an ISO-like date string.

*   **Arguments:**
    *   `dateObject` (`Date`): The date object.
*   **Returns:**
    *   `string`: Format `YYYY-MM-DD` (e.g., `"2023-05-05"`).

#### 22. `createDateRangeObject(dateObject, lastDateObject)`

Creates an object representing a date range.

*   **Arguments:**
    *   `dateObject` (`Date`): Start date.
    *   `lastDateObject` (`Date` | `null`): End date. If `null`, uses the first day of the next month.
*   **Returns:**
    *   `Object`:
        *   `formattedStartDate` (`string`): ISO start date.
        *   `formattedEndDate` (`string`): ISO end date.
        *   `nextMonthDateObject` (`Date`): The first day of the month after the end date.

#### 23. `checkDateFlow(startDate, endDate)`

Determines if the date range is moving forward in time or backward.

*   **Arguments:**
    *   `startDate` (`string` | `Date`): Start of range.
    *   `endDate` (`string` | `Date`): End of range.
*   **Returns:**
    *   `string`: `"forward"` if start is before end, `"backward"` otherwise.

#### 24. `getForwardDateRangeObjects(startDate, endDate)`

Generates an array of date range objects covering the period from start to end, month by month.

*   **Arguments:**
    *   `startDate` (`Date`): Start of range.
    *   `endDate` (`Date`): End of range.
*   **Returns:**
    *   `Array<Object>`: An array of objects returned by `createDateRangeObject`, covering each month in the range.

#### 25. `getBackwardDateRangeObjects(startDate, endDate)`

Generates an array of date range objects for a backward time range (from later date to earlier date).

*   **Arguments:**
    *   `startDate` (`Date`): The later date.
    *   `endDate` (`Date`): The earlier date.
*   **Returns:**
    *   `Array<Object>`: Array of date range objects, reversed to reflect the backward flow.

#### 26. `getDateRangeObjects(startDate, endDate)`

Automatically determines the direction of the date range and returns the appropriate array of range objects.

*   **Arguments:**
    *   `startDate` (`Date`): Start date.
    *   `endDate` (`Date`): End date.
*   **Returns:**
    *   `Array<Object>`: Array of date range objects.

#### 27. `getDateRangeObjectsWithIsoZeroOffset(startDate, endDate, timeZone)`

Similar to `getDateRangeObjects`, but adds ISO zero-offset strings for the start and end of each range in the specified timezone.

*   **Arguments:**
    *   `startDate` (`Date`): Start of range.
    *   `endDate` (`Date`): End of range.
    *   `timeZone` (`string`): Target timezone for offset calculation.
*   **Returns:**
    *   `Array<Object>`: Each object in the array includes all properties from `createDateRangeObject` plus:
        *   `ztzStartDate` (`string`): ISO string with `+00:00` for the start of the range.
        *   `ztzEndDate` (`string`): ISO string with `+00:00` for the end of the range.

---

## Module: `file-system-utils`

This module provides a secure wrapper around Node.js `fs` and `path` operations. It enforces a permission-based access control system defined by `userAllowedPaths`. All operations check if the target path is within the allowed paths and if the user has the specific permission (read, write, delete, execute) for that path.

**Security & Error Handling:**
If a path is not within the `userAllowedPaths` or the user lacks the required permission, the function **will throw an Error** with the message `"Denied Access Error"`. It will not return `undefined` or a failure object. Consumers of this library must use `try/catch` blocks when calling these functions.

### Testing the Module

To run the tests for this module, ensure you are in the project root directory and execute the following command:

```bash
npm run test-file-system
```

---

### API Reference

#### 1. `getUserAllowedPathsByPermissionType(permissionType)`

Returns an array of all allowed paths that grant the specified permission type.

*   **Arguments:**
    *   `permissionType` (`string`): The type of permission to filter by. Common values: `"read"`, `"write"`, `"delete"`, `"execute"`.
*   **Returns:**
    *   `Array<Object>`: An array of permission objects (from the internal `Map`) that have the requested permission set to `true`.
*   **Throws:**
    *   None.

#### 2. `getUserAllowedPaths()`

Returns an array of all allowed paths configured for the user.

*   **Arguments:**
    *   None.
*   **Returns:**
    *   `Array<Object>`: An array of permission objects containing `path`, `read`, `write`, `delete`, and `execute` properties.
*   **Throws:**
    *   None.

#### 3. `getUserFsPermission(dirPath)`

Determines if a specific path falls within any of the user's allowed paths and returns the permissions for that path.

*   **Arguments:**
    *   `dirPath` (`string`): The file or directory path to check.
*   **Returns:**
    *   `Object` | `undefined`: The permission object for the containing allowed path, or `undefined` if the path is not within any allowed root.
*   **Throws:**
    *   None.

#### 4. `checkDirPathPermissions(dirPath, permissionType)`

A convenience function to check if a specific path has a specific permission.

*   **Arguments:**
    *   `dirPath` (`string`): The file or directory path to check.
    *   `permissionType` (`string`): The permission to check (e.g., `"read"`, `"write"`).
*   **Returns:**
    *   `boolean`: `true` if the path is allowed and has the permission; `false` otherwise.
*   **Throws:**
    *   None.

#### 5. `mimeTypes`

A constant object mapping file extensions to their MIME types.

*   **Arguments:**
    *   None.
*   **Returns:**
    *   `Object`: An object where keys are extensions (e.g., `"jpg"`) and values are MIME types (e.g., `"image/jpeg"`).
*   **Throws:**
    *   None.

#### 6. `baseName(fileName, ...args)`

Returns the last portion of a path, similar to `path.basename`.

*   **Arguments:**
    *   `fileName` (`string`): The path to process.
    *   `...args` (`string`): Additional arguments passed to `path.basename` (e.g., suffix to remove).
*   **Returns:**
    *   `string`: The base name of the file.
*   **Throws:**
    *   `Error`: Only if the `fileName` exists in the filesystem and the user lacks "read" permission. If the file does not exist or is a pure string, it proceeds without checking permissions.

#### 7. `fileExists(fileName)`

Checks if a file or directory exists at the given path.

*   **Arguments:**
    *   `fileName` (`string`): The path to check.
*   **Returns:**
    *   `boolean`: `true` if it exists, `false` if it does not.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 8. `isFile(p)`

Checks if the given path is a file.

*   **Arguments:**
    *   `p` (`string`): The path to check.
*   **Returns:**
    *   `boolean`: `true` if it is a file, `false` otherwise.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 9. `isDirectory(dirPath)`

Checks if the given path is a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The path to check.
*   **Returns:**
    *   `boolean`: `true` if it is a directory, `false` otherwise.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 10. `getParentDir(filePath)`

Returns the parent directory of the given file path.

*   **Arguments:**
    *   `filePath` (`string`): The file path.
*   **Returns:**
    *   `string` | `null`: The parent directory path, `null` if it doesn't exist (or root).
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 11. `getFileExt(filePath)`

Returns the file extension of the given path.

*   **Arguments:**
    *   `filePath` (`string`): The file path.
*   **Returns:**
    *   `string`: The file extension (including the dot, e.g., `.txt`).
*   **Throws:**
    *   None. (Note: This function does *not* check permissions in the current code).

#### 12. `readdir(dirPath, options)`

Asynchronously reads the contents of a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the directory.
    *   `options` (`Object`): Options for `fs.promises.readdir` (default: `{ encoding: "utf8" }`).
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ status: "success", result: true, message: string, data: Array<string> }`
        *   On failure: `{ status: "failed", result: false, message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 13. `readdirSync(dirPath, options)`

Synchronously reads the contents of a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the directory.
    *   `options` (`Object`): Options for `fs.readdirSync` (default: `{ encoding: "utf8" }`).
*   **Returns:**
    *   `Object`:
        *   On success: `{ status: "success", result: true, message: string, data: Array<string> }`
        *   On failure: `{ status: "failed", result: false, message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 14. `mkdir(dirPath, options)`

Asynchronously creates a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the new directory.
    *   `options` (`Object`): Options for `fs.promises.mkdir` (default: `{ recursive: true }`).
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ status: "success", result: true, message: string }`
        *   On failure: `{ status: "failed", result: false, message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "write" permission.

#### 15. `mkdirSync(dirPath, options)`

Synchronously creates a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the new directory.
    *   `options` (`Object`): Options for `fs.mkdirSync` (default: `{ recursive: true }`).
*   **Returns:**
    *   `Object`:
        *   On success: `{ status: "success", result: true, message: string }`
        *   On failure: `{ status: "failed", result: false, message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "write" permission.

#### 16. `deleteDir(dirPath, options)`

Asynchronously deletes a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the directory to delete.
    *   `options` (`Object`): Options for `fs.promises.rm` (default: `{ recursive: true }`).
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ status: "success", result: true, message: string }`
        *   On failure: `{ status: "failed", result: false, message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "delete" permission.

#### 17. `deleteDirSync(dirPath, options)`

Synchronously deletes a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the directory to delete.
    *   `options` (`Object`): Options for `fs.rmSync` (default: `{ recursive: true }`).
*   **Returns:**
    *   `Object`:
        *   On success: `{ status: "success", result: true, message: string }`
        *   On failure: `{ status: "failed", result: false, message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "delete" permission.

#### 18. `readFile(filePath, options)`

Asynchronously reads the content of a file.

*   **Arguments:**
    *   `filePath` (`string`): The path to the file.
    *   `options` (`Object`): Options for `fs.promises.readFile` (default: `{ encoding: "utf8" }`).
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ result: true, status: "success", message: string, data: string | Buffer }`
        *   On failure: `{ result: false, status: "failed", message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 19. `readFileSync(filePath, options)`

Synchronously reads the content of a file.

*   **Arguments:**
    *   `filePath` (`string`): The path to the file.
    *   `options` (`Object`): Options for `fs.readFileSync` (default: `{ encoding: "utf8" }`).
*   **Returns:**
    *   `Object`:
        *   On success: `{ result: true, status: "success", message: string, data: string | Buffer }`
        *   On failure: `{ result: false, status: "failed", message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 20. `writeFile(filePath, data, options)`

Asynchronously writes data to a file.

*   **Arguments:**
    *   `filePath` (`string`): The path to the file.
    *   `data` (`string` | `Buffer`): The data to write.
    *   `options` (`Object`): Options for `fs.promises.writeFile` (default: `{ encoding: "utf8" }`).
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ result: true, status: "success", message: string }`
        *   On failure: `{ result: false, status: "failed", message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "write" permission.

#### 21. `writeFileSync(filePath, data, options)`

Synchronously writes data to a file.

*   **Arguments:**
    *   `filePath` (`string`): The path to the file.
    *   `data` (`string` | `Buffer`): The data to write.
    *   `options` (`Object`): Options for `fs.writeFileSync` (default: `{ encoding: "utf8" }`).
*   **Returns:**
    *   `Object`:
        *   On success: `{ result: true, status: "success", message: string }`
        *   On failure: `{ result: false, status: "failed", message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "write" permission.

#### 22. `deleteFile(filePath)`

Asynchronously deletes a file.

*   **Arguments:**
    *   `filePath` (`string`): The path to the file.
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ status: "successful", result: true, message: string }`
        *   On failure: `{ status: "unchanged", result: false, message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "delete" permission.

#### 23. `deleteFileSync(filePath)`

Synchronously deletes a file.

*   **Arguments:**
    *   `filePath` (`string`): The path to the file.
*   **Returns:**
    *   `Object`:
        *   On success: `{ result: true, status: "success", message: string }`
        *   On failure: `{ result: false, status: "failed", message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "delete" permission.

#### 24. `getFileSize(filePath)`

Asynchronously gets the size of a file in bytes.

*   **Arguments:**
    *   `filePath` (`string`): The path to the file.
*   **Returns:**
    *   `Promise<number>` | `Promise<false>`: The size in bytes, or `false` if the file does not exist.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 25. `isFileEmpty(filePath, options)`

Asynchronously checks if a file is empty.

*   **Arguments:**
    *   `filePath` (`string`): The path to the file.
    *   `options` (`Object`): Options for reading the file.
*   **Returns:**
    *   `Promise<boolean>`: `true` if the file is empty, `false` if it has content.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 26. `isFileEmptySync(filePath, options)`

Synchronously checks if a file is empty.

*   **Arguments:**
    *   `filePath` (`string`): The path to the file.
    *   `options` (`Object`): Options for reading the file.
*   **Returns:**
    *   `boolean`: `true` if the file is empty, `false` if it has content.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 27. `isDirectoryEmpty(dirPath, options)`

Asynchronously checks if a directory is empty.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the directory.
    *   `options` (`Object`): Options for reading the directory.
*   **Returns:**
    *   `Promise<boolean>`: `true` if the directory is empty, `false` otherwise.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 28. `isDirectoryEmptySync(dirPath, options)`

Synchronously checks if a directory is empty.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the directory.
    *   `options` (`Object`): Options for reading the directory.
*   **Returns:**
    *   `boolean`: `true` if the directory is empty, `false` otherwise.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 29. `getAllFilesFromDirectory(dirPath, fileExt)`

Asynchronously retrieves a list of files in a directory, optionally filtered by extension.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the directory.
    *   `fileExt` (`string`): Optional extension filter (e.g., `".txt"`).
*   **Returns:**
    *   `Promise<Array<string>>`: An array of filenames (not full paths).
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 30. `getAllFilesFromDirectorySync(dirPath, fileExt)`

Synchronously retrieves a list of files in a directory, optionally filtered by extension.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the directory.
    *   `fileExt` (`string`): Optional extension filter (e.g., `".txt"`).
*   **Returns:**
    *   `Array<string>`: An array of filenames (not full paths).
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 31. `getAllDirsFromDirectory(dirPath)`

Asynchronously retrieves a list of subdirectories in a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the directory.
*   **Returns:**
    *   `Promise<Array<string>>`: An array of subdirectory names.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 32. `getAllDirsFromDirectorySync(dirPath)`

Synchronously retrieves a list of subdirectories in a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the directory.
*   **Returns:**
    *   `Array<string>`: An array of subdirectory names.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 33. `getAllFilesRecursively(dirPath, excludedFolders)`

Asynchronously retrieves all files in a directory tree.

*   **Arguments:**
    *   `dirPath` (`string`): The root directory.
    *   `excludedFolders` (`Array<string>`): Names of folders to skip.
*   **Returns:**
    *   `Promise<Array<Object>>`: An array of file objects with `name`, `parentDir`, `fileType`, `path`, and `includedFiles` (if directory).
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 34. `getAllFilesRecursivelySync(dirPath, excludedFolders)`

Synchronously retrieves all files in a directory tree.

*   **Arguments:**
    *   `dirPath` (`string`): The root directory.
    *   `excludedFolders` (`Array<string>`): Names of folders to skip.
*   **Returns:**
    *   `Array<Object>`: An array of file objects with `name`, `parentDir`, `fileType`, `path`, and `includedFiles` (if directory).
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 35. `deleteAllFilesInDirPath(dirPath, recursive)`

Asynchronously deletes all files in a directory, optionally recursing into subdirectories.

*   **Arguments:**
    *   `dirPath` (`string`): The root directory.
    *   `recursive` (`boolean`): If `true`, deletes files in subdirectories too.
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ status: "success", result: true, message: string }`
        *   On failure: `{ status: "failed", result: false, message: string, errorMessages: Array<string> }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "delete" permission.

#### 36. `deleteAllDirsInDirPath(dirPath, options)`

Asynchronously deletes all subdirectories in a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The root directory.
    *   `options` (`Object`): Options for deletion.
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ status: "success", result: true, message: string }`
        *   On failure: `{ status: "failed", result: false, message: string, errorMessages: Array<string> }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "delete" permission.

#### 37. `deleteAllInDirPath(dirPath)`

Asynchronously deletes all files and directories inside a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The root directory.
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ result: true, status: "success", message: string }`
        *   On failure: `{ result: false, status: "failed", errorMessages: Array<string> }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "delete" permission.

#### 38. `deleteAllEmptyFilesInDirectory(dirPath, recursive)`

Asynchronously deletes all empty files in a directory, optionally recursing.

*   **Arguments:**
    *   `dirPath` (`string`): The root directory.
    *   `recursive` (`boolean`): If `true`, deletes empty files in subdirectories.
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ status: "success", result: true, message: string }`
        *   On failure: `{ status: "failed", result: false, message: string, errorMessages: Array<string> }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "delete" permission.

#### 39. `deleteAllEmptyDirsInDirectory(dirPath, recursive)`

Asynchronously deletes all empty directories in a directory, optionally recursing.

*   **Arguments:**
    *   `dirPath` (`string`): The root directory.
    *   `recursive` (`boolean`): If `true`, deletes empty directories in subdirectories.
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ status: "success", result: true, message: string }`
        *   On failure: `{ status: "failed", result: false, message: string, errorMessages: Array<string> }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "delete" permission.

#### 40. `getMimeType(file)`

Gets the MIME type for a file based on its extension.

*   **Arguments:**
    *   `file` (`string`): The file path or filename.
*   **Returns:**
    *   `string` | `null`: The MIME type, or `null` if the extension is not found in the `mimeTypes` map.
*   **Throws:**
    *   `Error`: If the path is provided, exists in the filesystem, is a directory, or if a filename is provided without an extension.

#### 41. `getFileExtensionsByMimeType(mimeType)`

Gets all file extensions associated with a specific MIME type.

*   **Arguments:**
    *   `mimeType` (`string`): The MIME type (e.g., `"image/png"`).
*   **Returns:**
    *   `Array<string>`: An array of extensions (e.g., `["png"]`).
*   **Throws:**
    *   None.

#### 42. `getSpecifiedExt(url, fileExtensions)`

Finds the first extension from a list that appears in the URL.

*   **Arguments:**
    *   `url` (`string`): The URL or filename.
    *   `fileExtensions` (`Array<string>`): List of extensions to check.
*   **Returns:**
    *   `string`: The first matching extension found in the URL.
*   **Throws:**
    *   None.

#### 43. `createDirPath(...args)`

Asynchronously creates a directory path if it does not exist.

*   **Arguments:**
    *   `...args` (`string`): Parts of the path to join and create.
*   **Returns:**
    *   `Promise<string>`: The created directory path.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "write" permission.

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
