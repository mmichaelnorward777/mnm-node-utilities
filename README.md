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

To ensure data safety and strict access control, all file system operations are governed by the `userAllowedPaths` configuration. If a requested path is not explicitly included in this list, or if the user lacks the necessary permission (read, write, delete, or execute) for that path, the function will immediately **throw an Error** with the message `"Denied Access Error"`.

*   **No Silent Failures:** Functions will never return `undefined` or a failure object to indicate permission denial. This design choice ensures that security breaches are never accidentally ignored.
*   **Required Error Handling:** Consumers of this library **must** wrap their file system calls in `try/catch` blocks to handle potential permission errors gracefully.
*   **Automatic Safe Path Resolution:** If no `userAllowedPaths` are provided (or an empty array is passed), the library automatically initializes a secure set of writable paths. This includes:
    *   The user's Home Directory.
    *   The Application Data directory (e.g., `~/.config` on Linux/Mac, `%APPDATA%` on Windows).
    *   Secondary drives (excluding the primary OS partition on Windows).
    *   Removable media (mounted volumes on macOS/Linux).
    
    This ensures that the application always operates within a safe, user-writable context by default, preventing accidental access to protected system files.

### Testing the Module

To run the tests for this module, ensure you are in the project root directory and execute the following command:

```bash
npm run test-file-system
```

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

## Module: `general-utils`

This module provides a set of general-purpose utility functions for common programming tasks such as ID generation, array processing, time delays, string manipulation, and condition waiting. It is designed to be lightweight and framework-agnostic.

### Testing the Module

To run the tests for this module, execute the following command from the project root:

```bash
npm run test-general-utils
```

### API Reference

#### 1. `generateUuid(num)`

Generates a pseudo-unique string identifier (UUID-like).

*   **Arguments:**
    *   `num` (`number`, optional): The radix for the generated characters (default `16` for hexadecimal).
*   **Returns:**
    *   `string`: A random alphanumeric string (e.g., `"a1b2c3d4-e5f6-7890-abcd-ef1234567890"`).
*   **Throws:**
    *   None.

#### 2. `waitForCondition({ conditionCallback, onTrueCallback, messageCallback })`

Polls a condition at a fixed interval (100ms) until it returns `true`, then executes a callback and resolves the promise.

*   **Arguments:**
    *   `conditionCallback` (`Function`): A function that returns a boolean. If `true`, the waiting stops.
    *   `onTrueCallback` (`Function`, optional): Executed once when the condition becomes true.
    *   `messageCallback` (`Function`, optional): Executed periodically (every 100 loops) to allow for progress updates or logging.
*   **Returns:**
    *   `Promise<void>`: Resolves when the condition is met.
*   **Throws:**
    *   None. (The promise resolves silently if the condition is met).

#### 3. `moderator(arr, callback, bulkCount)`

Processes an array in chunks (batches) to avoid blocking the event loop with large synchronous operations.

*   **Arguments:**
    *   `arr` (`Array`): The array to process.
    *   `callback` (`Function`): An async function called for each chunk. Signature: `(chunk, firstIndex, lastIndex, globalIndex)`.
    *   `bulkCount` (`number`, optional): The size of each chunk (default `5`).
*   **Returns:**
    *   `Promise<void>`: Resolves when all chunks have been processed.
*   **Throws:**
    *   None.

#### 4. `slowDown(timeDelay)`

Pauses execution for a specified amount of time.

*   **Arguments:**
    *   `timeDelay` (`number`, optional): The delay in milliseconds (default `7747`).
*   **Returns:**
    *   `Promise<void>`: Resolves after the delay.
*   **Throws:**
    *   None.

#### 5. `enumerate(arr, and)`

Formats an array of strings into a grammatically correct list (e.g., `"A, B, and C"`).

*   **Arguments:**
    *   `arr` (`Array`): The array of strings to enumerate.
    *   `and` (`boolean`, optional): If `true`, uses `"and"` as the last connector; otherwise uses `"or"`. (Default `false`).
*   **Returns:**
    *   `string` | `undefined`:
        *   If `arr.length === 0`: `undefined`.
        *   If `arr.length === 1`: The single item.
        *   If `arr.length === 2`: `"A or B"` (or `"A and B"`).
        *   If `arr.length > 2`: `"A, B, or C"` (or `"A, B, and C"`).
*   **Throws:**
    *   None.

#### 6. `getRandomNumber(initialIndex, limit)`

Generates a random integer within a range.

*   **Arguments:**
    *   `initialIndex` (`number`, optional): The lower bound (inclusive).
    *   `limit` (`number`, optional): The upper bound (exclusive).
*   **Returns:**
    *   `number`: A random integer.
*   **Throws:**
    *   None.

#### 7. `replaceWithForwardSlash(str)`

Replaces all backslashes (`\`) in a string with forward slashes (`/`).

*   **Arguments:**
    *   `str` (`string`): The input string.
*   **Returns:**
    *   `string`: The normalized string.
*   **Throws:**
    *   None.

#### 8. `debounce(fn, delay)`

Creates a debounced version of the provided function that delays invoking `fn` until after `delay` milliseconds have elapsed since the last time the debounced function was invoked.

*   **Arguments:**
    *   `fn` (`Function`): The function to debounce.
    *   `delay` (`number`, optional): The delay in milliseconds (default `2500`).
*   **Returns:**
    *   `Function`: The debounced function.
*   **Throws:**
    *   None.

#### 9. `getNumericValue(str)`

Extracts the first numeric value (integer or decimal, optionally with commas) from a string.

*   **Arguments:**
    *   `str` (`string`): The input string.
*   **Returns:**
    *   `number` | `NaN`: The extracted number, or `NaN` if no number is found.
*   **Throws:**
    *   None.

#### 10. `getValidatedStringValue(input)`

Converts a value to a string, but returns `null` if the input is `null` or `undefined`.

*   **Arguments:**
    *   `input` (`any`): The value to convert.
*   **Returns:**
    *   `string` | `null`: The string representation of the input, or `null`.
*   **Throws:**
    *   None.

---

## Module: `json-utils`

This module provides utilities for parsing JSON strings and managing simple JSON files on the disk. It is designed for lightweight data persistence scenarios where you need to store and retrieve arrays of objects without requiring a full database.

### Testing the Module

To run the tests for this module, execute the following command from the project root:

```bash
npm run test-json-utils
```

### API Reference

#### 1. `parseValidatedJSON(inputValue)`

Attempts to parse a string as JSON. If parsing fails, it returns the original input value unchanged, preventing errors from crashing the application.

*   **Arguments:**
    *   `inputValue` (`string`): The string to parse.
*   **Returns:**
    *   `any`: The parsed JavaScript value (Object, Array, String, Number, etc.), or the original `inputValue` if it is not valid JSON.
*   **Throws:**
    *   None.

#### 2. `createJsonFileObject(targetPath, fileName)`

Creates a helper object to manage a JSON file. This helper automatically initializes the file with an empty array `[]` if it does not exist, and provides methods to read, append, and clear data.

*   **Arguments:**
    *   `targetPath` (`string`): The directory path where the JSON file will be stored.
    *   `fileName` (`string`): The name of the JSON file (e.g., `"data.json"`).
*   **Returns:**
    *   `Object`: An instance with the following methods:
        *   `getSavedData()`: Returns the current content of the file as an Array.
        *   `addData(data, newData?)`: Appends data to the existing array.
        *   `clearData()`: Clears the file, setting its content to an empty array `[]`.
*   **Throws:**
    *   None.

##### Methods of the returned JsonFile Object

###### `getSavedData()`
Retrieves the data stored in the JSON file.
*   **Returns:**
    *   `Promise<Array>`: The array of objects stored in the file.

###### `addData(data, newData)`
Adds items to the stored array.
*   **Arguments:**
    *   `data` (`Array`): The items to add.
    *   `newData` (`boolean`, optional): If `true`, replaces the existing data with `data` instead of appending. If `false` (default), appends `data` to the existing array.
*   **Returns:**
    *   `Promise<Object>`: A result object indicating success or failure (e.g., `{ status: "success", result: true }`).

###### `clearData()`
Clears all data from the file by writing an empty array `[]`.
*   **Returns:**
    *   `Promise<Object>`: A result object indicating success or failure.

---

## Module: `node-utils`

This module provides utilities for interacting with the Node.js runtime and the operating system. It focuses on process management, system command execution with security checks, and platform-specific directory resolution.

**Security Note:**
The `runSystemCommand` function enforces a permission-based access control. It will only execute commands if the target directory is explicitly allowed in the `userAllowedPaths` configuration with `"execute"` permissions. If permissions are denied, it returns a resolved Promise with an error object instead of throwing, allowing for synchronous error handling.

### Testing the Module

To run the tests for this module, execute the following command from the project root:

```bash
npm run test-node-utils
```

### API Reference

#### 1. `spawnOnChildProcess(filePath)`

Spawns a new Node.js child process by forking the specified JavaScript file. It sets up default listeners for `message`, `error`, and `close` events.

*   **Arguments:**
    *   `filePath` (`string`): The path to the Node.js script to fork.
*   **Returns:**
    *   `ChildProcess`: The child process object.
*   **Throws:**
    *   `Error`: If the file at `filePath` does not exist or is not a valid module.

#### 2. `getAppDataDirPath()`

Returns the platform-specific path for application data storage. This path is typically used for storing configuration files or persistent app data.

*   **Arguments:**
    *   None.
*   **Returns:**
    *   `string`: The absolute path to the application data directory.
        *   **Windows:** `%LOCALAPPDATA%` (or `~/AppData/Local`).
        *   **Linux:** `$XDG_CONFIG_HOME` (or `~/.config`).
        *   **macOS:** `~/Library/Application Support`.
*   **Throws:**
    *   `Error`: If the platform is unsupported.

#### 3. `runSystemCommand(command, cwd)`

Executes a system shell command within a specific working directory, after verifying that the user has the required permissions.

*   **Arguments:**
    *   `command` (`string`): The shell command to execute (e.g., `"echo hello"`).
    *   `cwd` (`string`): The working directory where the command should be executed.
*   **Returns:**
    *   `Promise<Object>`:
        *   **On Success:**
            ```javascript
            {
                statusOk: true,
                message: "Command Execution Successful...",
                stdout: string,   // Standard output
                stderr: string,   // Standard error (usually empty on success)
                command: string   // The command executed
            }
            ```
        *   **On Permission Denied:**
            ```javascript
            {
                statusOk: false,
                message: "Command Execution Failed: ...",
                path: string,
                allowedPaths: Array
            }
            ```
        *   **On Execution Error:** (Rejected Promise)
            ```javascript
            {
                statusOk: false,
                message: "Command Execution Failed: ...",
                stderr: string,
                command: string
            }
            ```
*   **Throws:**
    *   None. (Errors are returned via the Promise rejection or the resolved error object).

---

Here is the documentation for the `objects-array-utils` module.

---

## Module: `objects-array-utils`

This module provides utilities for manipulating objects and arrays. It includes functions for retrieving nested properties, sorting, comparing, merging, and filtering objects and arrays. It is designed to simplify complex data operations in JavaScript applications.

### Testing the Module

To run the tests for this module, execute the following command from the project root:

```bash
npm run test-objects-array-utils
```

### API Reference

#### 1. `getValidatedPropValues(obj, propNames, callback)`

Retrieves a value from a nested object using an array of property names. It also allows you to monitor the traversal via a callback.

*   **Arguments:**
    *   `obj` (`Object`): The object to search.
    *   `propNames` (`Array<string>`): An array of keys representing the path (e.g., `['user', 'profile', 'name']`).
    *   `callback` (`Function`, optional): A function called at each step of the traversal with the current value.
*   **Returns:**
    *   `any` | `null`: The value found at the end of the path, or `null` if any key in the path is missing.
*   **Throws:**
    *   None.

#### 2. `isObjectInArray(object, array, keysToBeChecked)`

Checks if an object exists in an array. By default, it compares all keys. If `keysToBeChecked` is provided, it only compares those specific keys.

*   **Arguments:**
    *   `object` (`Object`): The object to find.
    *   `array` (`Array<Object>`): The array to search.
    *   `keysToBeChecked` (`Array<string>`, optional): Specific keys to compare. If empty, all keys are compared.
*   **Returns:**
    *   `boolean`: `true` if the object is found; `false` otherwise.
*   **Throws:**
    *   None.

#### 3. `getAllObjectKey objects)`

Returns a unique array of all keys present in any of the objects within the provided array.

*   **Arguments:**
    *   `objects` (`Array<Object>`): An array of objects.
*   **Returns:**
    *   `Array<string>`: An array of unique key names.
*   **Throws:**
    *   None.

#### 4. `sortObjectsByDate(arr, datePropName, asc)`

Sorts an array of objects based on a date property.

*   **Arguments:**
    *   `arr` (`Array<Object>`): The array to sort.
    *   `datePropName` (`string`, optional): The key containing the date (default `"dateCreated"`).
    *   `asc` (`boolean`, optional): `true` for ascending, `false` for descending (default `true`).
*   **Returns:**
    *   `Array<Object>`: The sorted array (mutates the original array).
*   **Throws:**
    *   None.

#### 5. `sortObjectsByPropName(arr, propName, asc)`

Sorts an array of objects based on a specific property value (supports numbers and strings).

*   **Arguments:**
    *   `arr` (`Array<Object>`): The array to sort.
    *   `propName` (`string`): The key to sort by.
    *   `asc` (`boolean`, optional): `true` for ascending, `false` for descending (default `true`).
*   **Returns:**
    *   `Array<Object>`: The sorted array (mutates the original array).
*   **Throws:**
    *   None.

#### 6. `objectToString(object, delimiter)`

Converts an object into a human-readable string. It uses `toNormalString` to format keys and values nicely.

*   **Arguments:**
    *   `object` (`Object`): The object to convert.
    *   `delimiter` (`string`, optional): The separator between key-value pairs (default `", "`).
*   **Returns:**
    *   `string`: A formatted string (e.g., `"Name : John, Age : 30"`).
*   **Throws:**
    *   None.

#### 7. `isObjectUnique(obj, objectsArray, keys)`

Checks if an object is unique within an array (i.e., it does not match any object in the array).

*   **Arguments:**
    *   `obj` (`Object`): The object to check.
    *   `objectsArray` (`Array<Object>`): The array to compare against.
    *   `keys` (`Array<string>`, optional): Specific keys to check for uniqueness. If empty, all keys are checked.
*   **Returns:**
    *   `boolean`: `true` if the object is unique; `false` if it matches an object in the array.
*   **Throws:**
    *   None.

#### 8. `filterUnlistedObjects(localObjects, allObjects, keys)`

Filters an `allObjects` array to exclude any objects that are present in `localObjects`.

*   **Arguments:**
    *   `localObjects` (`Array<Object>`): The "local" or excluded objects.
    *   `allObjects` (`Array<Object>`): The full list of objects.
    *   `keys` (`Array<string>`, optional): Specific keys to use for comparison.
*   **Returns:**
    *   `Array<Object>`: The filtered array containing only unique objects.
*   **Throws:**
    *   None.

#### 9. `shuffleArr(arr)`

Randomly shuffles an array using the Fisher-Yates algorithm.

*   **Arguments:**
    *   `arr` (`Array`): The array to shuffle.
*   **Returns:**
    *   `Array`: The shuffled array (mutates the original array).
*   **Throws:**
    *   None.

#### 10. `objectCompare(target, src, arrayInclusion)`

Compares two objects. It supports nested object comparison via dot notation and can handle array values (either exact match or subset inclusion).

*   **Arguments:**
    *   `target` (`Object`): The target object.
    *   `src` (`Object`): The source object to compare against.
    *   `arrayInclusion` (`boolean`, optional): If `true`, array values in `src` are checked for inclusion in `target` arrays. If `false`, they must be identical (default `true`).
*   **Returns:**
    *   `boolean`: `true` if `src` is considered equal to/included in `target`; `false` otherwise.
*   **Throws:**
    *   None.

#### 11. `assignProps(target, source)`

Recursively assigns properties from `source` to `target`. If a property in `source` is an object and the corresponding property in `target` is not, it initializes it as an object before merging.

*   **Arguments:**
    *   `target` (`Object`): The object to assign properties to.
    *   `source` (`Object`): The object to assign properties from.
*   **Returns:**
    *   `Object`: The modified `target` object.
*   **Throws:**
    *   None.

#### 12. `deepMerge(target, ...sources)`

Deeply merges one or more source objects into the target object. It creates nested objects as needed and overwrites scalar values.

*   **Arguments:**
    *   `target` (`Object`): The target object to merge into.
    *   `...sources` (`Object`): One or more source objects.
*   **Returns:**
    *   `Object`: The modified `target` object.
*   **Throws:**
    *   None.

---

## Module: `string-utils`

This module provides a set of utility functions for string manipulation, including formatting, case conversion, slug generation, and abbreviation extraction. These utilities are essential for preparing data for URLs, database keys, or user-facing display text.

### Testing the Module

To run the tests for this module, ensure you are in the project root directory and execute the following command:

```bash
npm run test-string-utils
```

### API Reference

#### 1. `toUrl(str)`

Converts a string into a URL-friendly slug by lowercasing, trimming, removing special characters, and replacing spaces with hyphens.

*   **Arguments:**
    *   `str` (`string`): The input string to convert.
*   **Returns:**
    *   `string`: A URL-safe slug (e.g., `"hello-world"`).
*   **Throws:**
    *   None.

#### 2. `toCapitalize(str)`

Capitalizes the first letter of a string and lowercases the rest.

*   **Arguments:**
    *   `str` (`string`): The input string.
*   **Returns:**
    *   `string`: The capitalized string (e.g., `"Hello"`).
*   **Throws:**
    *   None.

#### 3. `toCapitalizeAll(str)`

Capitalizes the first letter of every word in a string.

*   **Arguments:**
    *   `str` (`string`): The input string.
*   **Returns:**
    *   `string`: The string with all words capitalized (e.g., `"Hello World"`).
*   **Throws:**
    *   None.

#### 4. `toNormalString(str, previousFormat)`

Converts a formatted string (like `camelCase`, `kebab-case`, or `snake_case`) into a readable "Normal Case" string with spaces.

*   **Arguments:**
    *   `str` (`string`): The input string.
    *   `previousFormat` (`string`, optional): The previous formatting style.
        *   `"camel-case"` (default): e.g., `"helloWorld"` -> `"Hello World"`.
        *   `"kebab-case"`: e.g., `"hello-world"` -> `"Hello World"`.
        *   `"underscored"`: e.g., `"hello_world"` -> `"Hello World"`.
*   **Returns:**
    *   `string`: The normalised string (e.g., `"Hello World"`).
*   **Throws:**
    *   None.

#### 5. `getInitials(str)`

Extracts the initials from a full name or string.

*   **Arguments:**
    *   `str` (`string`): The input string (e.g., `"John Doe"`).
*   **Returns:**
    *   `string` | `null`: The initials in uppercase (e.g., `"JD"`), or `null` if the input is empty or null.
*   **Throws:**
    *   None.

#### 6. `toCamelCase(str, url, initialCap)`

Converts a string into `camelCase` or `PascalCase`.

*   **Arguments:**
    *   `str` (`string`): The input string.
    *   `url` (`boolean`, optional): If `true`, treats hyphens (`-`) as separators instead of spaces.
    *   `initialCap` (`boolean`, optional): If `true`, capitalizes the first letter of the resulting camelCase string (PascalCase).
*   **Returns:**
    *   `string`: The camelCase string (e.g., `"helloWorld"` or `"HelloWorld"`).
*   **Throws:**
    *   None.

---


## Module: `url-utils`

This module provides a suite of utility functions for parsing, constructing, and manipulating URLs and query strings. It handles complex nested query parameters, converts between different object notations (dot notation vs. standard objects), and extracts domain information.

### Testing the Module

To run the tests for this module, execute the following command from the project root:

```bash
npm run test-url-utils
```



### API Reference

#### 1. `urlConstructor(urlString)`

Constructs a normalized URL string from a potentially incomplete input. If the protocol is missing, it defaults to `https://`.

*   **Arguments:**
    *   `urlString` (`string`): The URL to construct.
*   **Returns:**
    *   `string`: The normalized URL (e.g., `"https://example.com/path?query=1"`).
*   **Throws:**
    *   None.

#### 2. `objectToQueryString(obj, prefix)`

Converts a JavaScript object into a URL-encoded query string. It supports nested objects and arrays.

*   **Arguments:**
    *   `obj` (`Object`): The object to convert.
    *   `prefix` (`string`, optional): A prefix key for nested objects (used internally for recursion).
*   **Returns:**
    *   `string`: The query string (e.g., `"name=John&user[email]=j@e.com"`).
*   **Throws:**
    *   None.

#### 3. `queryStringToObject(queryString)`

Converts a URL-encoded query string back into a JavaScript object. It handles nested keys (e.g., `user[name]`) and arrays (e.g., `items[]`).

*   **Arguments:**
    *   `queryString` (`string`): The query string to parse (with or without leading `?`).
*   **Returns:**
    *   `Object`: The parsed JavaScript object.
*   **Throws:**
    *   None.

#### 4. `urlToQueryStringObject(urlString, trailingSlash)`

Parses a full URL into a structured object containing the origin, pathname, and parsed query parameters.

*   **Arguments:**
    *   `urlString` (`string`): The full URL to parse.
    *   `trailingSlash` (`boolean`, optional): If `true`, ensures the pathname ends with a slash.
*   **Returns:**
    *   `Object` | `null`: An object containing `queryObject`, `originalUrl`, `origin`, `pathName`, `queryString`, and `urlWithoutQueryString`. Returns `null` if the URL is invalid.
*   **Throws:**
    *   None.

#### 5. `objectToDotNotation(obj, prefix, res)`

Flattens a nested JavaScript object into dot notation keys (e.g., `user.name`).

*   **Arguments:**
    *   `obj` (`Object`): The nested object to flatten.
    *   `prefix` (`string`, optional): The current key prefix (used for recursion).
    *   `res` (`Object`, optional): The accumulator object for the result.
*   **Returns:**
    *   `Object`: The flattened object (e.g., `{ 'user.name': 'John' }`).
*   **Throws:**
    *   None.

#### 6. `dotNotationToObject(dotObj)`

Reconstructs a nested JavaScript object from a flat object with dot notation keys.

*   **Arguments:**
    *   `dotObj` (`Object`): The flat object with dot notation keys.
*   **Returns:**
    *   `Object`: The nested object.
*   **Throws:**
    *   None.

#### 7. `getDomain(url)`

Extracts the domain name from a URL, removing the protocol (`http://`, `https://`) and `www.` prefix.

*   **Arguments:**
    *   `url` (`string`): The URL to process.
*   **Returns:**
    *   `string`: The domain name (e.g., `"example.com"`).
*   **Throws:**
    *   None.

#### 8. `checkSubDomain(mainUrl, subUrl)`

Checks if `subUrl` is a subdomain of `mainUrl`.

*   **Arguments:**
    *   `mainUrl` (`string`): The main domain URL.
    *   `subUrl` (`string`): The subdomain URL to check.
*   **Returns:**
    *   `boolean`: `true` if `subUrl` is a subdomain of `mainUrl`; `false` otherwise.
*   **Throws:**
    *   None.



------------------------------------------------------------------------

# 🤝 Contribution

Contributions, improvements, and expanded documentation are welcome.

1.  Fork the repository\
2.  Create a feature branch\
3.  Submit a Pull Request

------------------------------------------------------------------------

# 📄 License

MIT License --- free to use, modify, and distribute.
