# MCP Tools

This module provides a set of tools for use with the Model Context Protocol (MCP). Each tool has a standardized structure with `urlName`, `title`, `description`, `inputSchema`, `outputSchema`, and `handler` properties.

## Overview

The MCP Tools module exposes **111 unique utility functions** organized into 8 categories:

| Category | Count | Description |
|----------|-------|-------------|
| Date Utils | 27 | Date/time formatting, parsing, timezone conversion, and date range operations |
| File System Utils | 43 | File/directory operations with permission-based access control |
| General Utils | 10 | Common programming utilities (UUID generation, array processing, debouncing, etc.) |
| JSON Utils | 2 | JSON parsing and file management |
| Node Utils | 3 | Node.js process management and secure command execution |
| Objects/Array Utils | 12 | Object manipulation, sorting, comparison, and filtering |
| String Utils | 6 | String formatting, case conversion, and slug generation |
| URL Utils | 8 | URL parsing, construction, and query string manipulation |

## Using MCP Tools

Import the `getMcpTools` function from the main index:

```javascript
import getUtilities, { getMcpTools } from 'mnm-node-utilities';

const utilities = getUtilities({
  userAllowedPaths: [/* your allowed paths */]
});

// Get all available tools
const tools = getMcpTools(z, utilities); // z = zod instance from MCP server
```

---

## Date Utils

### 1. `formattedDate`

Formats a date object into a string in the format MM-DD-YYYY.

- **Tool Name:** `formatted-date`
- **Arguments:**
  - `date` (`string`, optional): A date string (defaults to current date)
- **Returns:** `string` - Formatted date (e.g., `'05-23-2023'`)

### 2. `getDateTimeObject`

Parses various input formats into a standard JavaScript Date object.

- **Tool Name:** `get-date-time-object`
- **Arguments:**
  - `dateInput` (`string`): Date object, number (Unix timestamp), or string (e.g., `'2023-05-05'`)
- **Returns:** `Date` - A valid JavaScript Date object

### 3. `dateTimeObject`

Extracts detailed components of a date and time.

- **Tool Name:** `date-time-object`
- **Arguments:**
  - `date` (`string`, optional): Input date (Date object, string, or number)
- **Returns:** `Object` - `{ day, month, year, date, time }`

### 4. `getTimeElapsed`

Calculates the time difference between two timestamps.

- **Tool Name:** `get-time-elapsed`
- **Arguments:**
  - `time1` (`number`): First timestamp in milliseconds
  - `time2` (`number`): Second timestamp in milliseconds
- **Returns:** `Object` - `{ timeElapsed, momentsPassed }`

### 5. `createZuluStartDate`

Creates a Date object representing the start of the day in UTC (Zulu time).

- **Tool Name:** `create-zulu-start-date`
- **Arguments:**
  - `date` (`string`): The local date object (Date)
- **Returns:** `Date` - New Date object set to UTC +00:00

### 6. `getOffsetMinutesForTimezone`

Calculates the timezone offset in minutes relative to UTC.

- **Tool Name:** `get-offset-minutes-for-timezone`
- **Arguments:**
  - `timeZone` (`string`): IANA timezone identifier (e.g., `'UTC'`, `'America/New_York'`)
- **Returns:** `number` - Offset in minutes (e.g., 0 for UTC, -300 for EST)

### 7. `toISOZeroOffset`

Converts a local date/time to an ISO string with a zero offset (+00:00).

- **Tool Name:** `to-iso-zero-offset`
- **Arguments:**
  - `input` (`string`): The date to convert (Date object or string)
  - `tz` (`string`): Target timezone (e.g., `'Europe/Dublin'`)
- **Returns:** `string` | `null` - ISO string ending in +00:00

### 8. `getHourlyDuration`

Breaks down total minutes into hours and remaining minutes.

- **Tool Name:** `get-hourly-duration`
- **Arguments:**
  - `numOfMinutes` (`number`): Total minutes
- **Returns:** `Object` - `{ hours, minutes }`

### 9. `getDurationInMinutes`

Calculates the duration in minutes between two date objects.

- **Tool Name:** `get-duration-in-minutes`
- **Arguments:**
  - `dateObj1` (`string`): End date (Date)
  - `dateObj2` (`string`): Start date (Date)
- **Returns:** `number` - Difference in minutes (can be negative)

### 10. `localDateToSelectedTimeZone`

Converts a date from the local system timezone to a target IANA timezone.

- **Tool Name:** `local-date-to-selected-time-zone`
- **Arguments:**
  - `date` (`string`): The date in local time (Date)
  - `selectedTimeZone` (`string`): Target IANA timezone
- **Returns:** `Date` - Date in the selected timezone

### 11. `getFormattedTime`

Formats a date into a 12-hour time string with AM/PM.

- **Tool Name:** `get-formatted-time`
- **Arguments:**
  - `date` (`string`): The date object (Date)
- **Returns:** `string` - Formatted time (e.g., `'03:05 PM'`)

### 12. `getIsoFormattedTime`

Formats time components into an ISO-like time string with zero-padding.

- **Tool Name:** `get-iso-formatted-time`
- **Arguments:**
  - `hours` (`number`): Hour (0-23)
  - `minutes` (`number`): Minute (0-59)
  - `seconds` (`number`): Second (0-59)
- **Returns:** `string` - ISO formatted time (e.g., `'01:05:09'`)

### 13. `fixTimeStr`

Normalizes a time string (e.g., `'3:05PM'` → `'03:05 PM'`).

- **Tool Name:** `fix-time-str`
- **Arguments:**
  - `timeStr` (`string`): Raw time string
- **Returns:** `string` - Normalized time string

### 14. `getCurrentMonthByIndex`

Returns the full name of a month by its 0-indexed integer.

- **Tool Name:** `get-current-month-by-index`
- **Arguments:**
  - `monthIndex` (`number`): Month index (0 = January, 11 = December)
- **Returns:** `string` - Full month name (e.g., `'May'`)

### 15. `getNextMonth`

Returns a Date object for the 1st day of the next month.

- **Tool Name:** `get-next-month`
- **Arguments:**
  - `date` (`string`): The reference date (Date)
- **Returns:** `Date` - First day of next month

### 16. `getPrevMonth`

Returns a Date object for a day in the previous month.

- **Tool Name:** `get-prev-month`
- **Arguments:**
  - `date` (`string`): The reference date (Date)
- **Returns:** `Date` - Date in previous month

### 17. `getNumberOfDaysOfMonth`

Calculates the number of days in the month (handles leap years).

- **Tool Name:** `get-number-of-days-in-month`
- **Arguments:**
  - `date` (`string`): Any date in the month of interest (Date)
- **Returns:** `number` - Number of days (28, 30, 31)

### 18. `getFormattedDateStr`

Formats a date into a readable string (e.g., `'May 5, 2023'`).

- **Tool Name:** `get-formatted-date-str`
- **Arguments:**
  - `date` (`string`): The date object (Date)
- **Returns:** `string` - Formatted date string

### 19. `toLocalBusinessTimeZone`

Converts a UTC date to the local business timezone.

- **Tool Name:** `to-local-business-time-zone`
- **Arguments:**
  - `date` (`string`): A date object, typically UTC (Date)
  - `businessTimeZone` (`string`): Target IANA timezone
- **Returns:** `Date` - Date adjusted to business timezone

### 20. `createTzScheduleObject`

Creates a comprehensive timezone schedule object with ISO formats.

- **Tool Name:** `create-tz-schedule-object`
- **Arguments:**
  - `scheduledDate` (`string`): Date part (string or Date)
  - `timeOfDay` (`string`): Time part (e.g., `'10:00:00'`)
  - `timeZone` (`string`): Business IANA timezone
- **Returns:** `Object` - Full schedule object with ISO strings, date/time components

### 21. `getISOFormattedDate`

Formats a date into YYYY-MM-DD format.

- **Tool Name:** `get-iso-formatted-date`
- **Arguments:**
  - `date` (`string`): The date object (Date)
- **Returns:** `string` - ISO date string (e.g., `'2023-05-05'`)

### 22. `createDateRangeObject`

Creates an object representing a date range with formatted dates.

- **Tool Name:** `create-date-range-object`
- **Arguments:**
  - `date` (`string`): Start date (Date)
  - `lastDate` (`string` | `null`, optional): End date (defaults to first day of next month)
- **Returns:** `Object` - `{ formattedStartDate, formattedEndDate, nextMonthDateObject }`

### 23. `checkDateFlow`

Determines if a date range is moving forward or backward.

- **Tool Name:** `check-date-flow`
- **Arguments:**
  - `startDate` (`string`): Start of range
  - `endDate` (`string`): End of range
- **Returns:** `'forward'` | `'backward'`

### 24. `getForwardDateRangeObjects`

Generates an array of date range objects (forward direction).

- **Tool Name:** `get-forward-date-range-objects`
- **Arguments:**
  - `startDate` (`string`): Start of range
  - `endDate` (`string`): End of range
- **Returns:** `Array` - Array of date range objects

### 25. `getBackwardDateRangeObjects`

Generates an array of date range objects (backward direction, reversed).

- **Tool Name:** `get-backward-date-range-objects`
- **Arguments:**
  - `startDate` (`string`): The later date
  - `endDate` (`string`): The earlier date
- **Returns:** `Array` - Reversed array of date range objects

### 26. `getDateRangeObjects`

Automatically determines direction and returns appropriate range objects.

- **Tool Name:** `get-date-range-objects`
- **Arguments:**
  - `startDate` (`string`): Start date
  - `endDate` (`string`): End date
- **Returns:** `Array` - Array of date range objects

### 27. `getDateRangeObjectsWithIsoZeroOffset`

Similar to getDateRangeObjects with ISO zero-offset strings (+00:00).

- **Tool Name:** `get-date-range-objects-with-iso-zero-offset`
- **Arguments:**
  - `startDate` (`string`): Start of range
  - `endDate` (`string`): End of range
  - `timeZone` (`string`): Target timezone for offset calculation
- **Returns:** `Array` - Objects with `ztzStartDate` and `ztzEndDate`

---

## File System Utils

**Security Note:** All file system operations enforce permission-based access control. Each operation checks if the target path falls within user-allowed paths with the required permission type.

### 1. `getUserAllowedPathsByPermissionType`

Returns paths that grant a specific permission type.

- **Tool Name:** `get-user-allowed-paths-by-permission-type`
- **Arguments:**
  - `permissionType` (`string`): Permission to filter by (`'read'`, `'write'`, `'delete'`, `'execute'`)
- **Returns:** `Array` - Permission objects with requested permission set to true

### 2. `getUserAllowedPaths`

Returns all allowed paths configured for the user.

- **Tool Name:** `get-user-allowed-paths`
- **Arguments:** None
- **Returns:** `Array` - Permission objects with path, read, write, delete, execute properties

### 3. `getUserFsPermission`

Determines if a path falls within allowed paths and returns permissions.

- **Tool Name:** `get-user-fs-permission`
- **Arguments:**
  - `dirPath` (`string`): Path to check
- **Returns:** `Object` | `null` - Permission object or null

### 4. `checkDirPathPermissions`

Checks if a path has a specific permission.

- **Tool Name:** `check-dir-path-permissions`
- **Arguments:**
  - `dirPath` (`string`): Path to check
  - `permissionType` (`string`): Permission to check (`'read'`, `'write'`, etc.)
- **Returns:** `boolean` - True if allowed and has permission

### 5. `baseName`

Returns the last portion of a path (like `path.basename`).

- **Tool Name:** `base-name`
- **Arguments:**
  - `fileName` (`string`): Path to process
  - `suffix` (`string`, optional): Suffix to remove
- **Returns:** `string` - Base name of the file

### 6. `fileExists`

Checks if a file or directory exists at the given path.

- **Tool Name:** `file-exists`
- **Arguments:**
  - `path` (`string`): Path to check
- **Returns:** `boolean` - True if exists

### 7. `isFile`

Checks if the given path is a file.

- **Tool Name:** `is-file`
- **Arguments:**
  - `path` (`string`): Path to check
- **Returns:** `boolean` - True if file

### 8. `isDirectory`

Checks if the given path is a directory.

- **Tool Name:** `is-directory`
- **Arguments:**
  - `path` (`string`): Path to check
- **Returns:** `boolean` - True if directory

### 9. `getParentDir`

Returns the parent directory of a file path.

- **Tool Name:** `get-parent-dir`
- **Arguments:**
  - `path` (`string`): File path
- **Returns:** `string` | `null` - Parent directory path

### 10. `getFileExt`

Returns the file extension (including the dot).

- **Tool Name:** `get-file-ext`
- **Arguments:**
  - `path` (`string`): File path
- **Returns:** `string` - Extension (e.g., `'.txt'`)

### 11. `readdir`

Asynchronously reads directory contents.

- **Tool Name:** `readdir`
- **Arguments:**
  - `path` (`string`): Directory path
  - `encoding` (`string`, optional): File encoding (default: `'utf8'`)
- **Returns:** `Object` - `{ status, result, message, data }`

### 12. `readdirSync`

Synchronously reads directory contents.

- **Tool Name:** `readdir-sync`
- **Arguments:**
  - `path` (`string`): Directory path
  - `encoding` (`string`, optional): File encoding (default: `'utf8'`)
- **Returns:** `Object` - `{ status, result, message, data }`

### 13. `mkdir`

Asynchronously creates a directory.

- **Tool Name:** `mkdir`
- **Arguments:**
  - `path` (`string`): Directory path
  - `recursive` (`boolean`, optional): Create parent directories (default: `true`)
- **Returns:** `Object` - `{ status, result, message }`

### 14. `mkdirSync`

Synchronously creates a directory.

- **Tool Name:** `mkdir-sync`
- **Arguments:**
  - `path` (`string`): Directory path
  - `recursive` (`boolean`, optional): Create parent directories (default: `true`)
- **Returns:** `Object` - `{ status, result, message }`

### 15. `deleteDir`

Asynchronously deletes a directory.

- **Tool Name:** `delete-dir`
- **Arguments:**
  - `path` (`string`): Directory path
  - `recursive` (`boolean`, optional): Delete recursively (default: `true`)
- **Returns:** `Object` - `{ status, result, message }`

### 16. `deleteDirSync`

Synchronously deletes a directory.

- **Tool Name:** `delete-dir-sync`
- **Arguments:**
  - `path` (`string`): Directory path
  - `recursive` (`boolean`, optional): Delete recursively (default: `true`)
- **Returns:** `Object` - `{ status, result, message }`

### 17. `readFile`

Asynchronously reads file content.

- **Tool Name:** `read-file`
- **Arguments:**
  - `path` (`string`): File path
  - `encoding` (`string`, optional): File encoding (default: `'utf8'`)
- **Returns:** `Object` - `{ result, status, message, data }`

### 18. `readFileSync`

Synchronously reads file content.

- **Tool Name:** `read-file-sync`
- **Arguments:**
  - `path` (`string`): File path
  - `encoding` (`string`, optional): File encoding (default: `'utf8'`)
- **Returns:** `Object` - `{ result, status, message, data }`

### 19. `writeFile`

Asynchronously writes data to a file.

- **Tool Name:** `write-file`
- **Arguments:**
  - `path` (`string`): File path
  - `content` (`string`): Data to write
  - `encoding` (`string`, optional): File encoding (default: `'utf8'`)
- **Returns:** `Object` - `{ result, status, message }`

### 20. `writeFileSync`

Synchronously writes data to a file.

- **Tool Name:** `write-file-sync`
- **Arguments:**
  - `path` (`string`): File path
  - `content` (`string`): Data to write
  - `encoding` (`string`, optional): File encoding (default: `'utf8'`)
- **Returns:** `Object` - `{ result, status, message }`

### 21. `deleteFile`

Asynchronously deletes a file.

- **Tool Name:** `delete-file`
- **Arguments:**
  - `path` (`string`): File path
- **Returns:** `Object` - `{ status, result, message }`

### 22. `deleteFileSync`

Synchronously deletes a file.

- **Tool Name:** `delete-file-sync`
- **Arguments:**
  - `path` (`string`): File path
- **Returns:** `Object` - `{ result, status, message }`

### 23. `getFileSize`

Gets the size of a file in bytes.

- **Tool Name:** `get-file-size`
- **Arguments:**
  - `path` (`string`): File path
- **Returns:** `number` | `boolean` - Size in bytes, or false if not found

### 24. `isFileEmpty`

Asynchronously checks if a file is empty.

- **Tool Name:** `is-file-empty`
- **Arguments:**
  - `path` (`string`): File path
  - `encoding` (`string`, optional): File encoding (default: `'utf8'`)
- **Returns:** `boolean` - True if empty

### 25. `isFileEmptySync`

Synchronously checks if a file is empty.

- **Tool Name:** `is-file-empty-sync`
- **Arguments:**
  - `path` (`string`): File path
  - `encoding` (`string`, optional): File encoding (default: `'utf8'`)
- **Returns:** `boolean` - True if empty

### 26. `isDirectoryEmpty`

Asynchronously checks if a directory is empty.

- **Tool Name:** `is-directory-empty`
- **Arguments:**
  - `path` (`string`): Directory path
- **Returns:** `boolean` - True if empty

### 27. `isDirectoryEmptySync`

Synchronously checks if a directory is empty.

- **Tool Name:** `is-directory-empty-sync`
- **Arguments:**
  - `path` (`string`): Directory path
- **Returns:** `boolean` - True if empty

### 28. `getAllFilesFromDirectory`

Asynchronously retrieves files in a directory, optionally filtered by extension.

- **Tool Name:** `get-all-files-from-directory`
- **Arguments:**
  - `path` (`string`): Directory path
  - `extension` (`string`, optional): Extension filter (e.g., `'.txt'`)
- **Returns:** `Array` - Array of filenames

### 29. `getAllFilesFromDirectorySync`

Synchronously retrieves files in a directory.

- **Tool Name:** `get-all-files-from-directory-sync`
- **Arguments:**
  - `path` (`string`): Directory path
  - `extension` (`string`, optional): Extension filter
- **Returns:** `Array` - Array of filenames

### 30. `getAllDirsFromDirectory`

Asynchronously retrieves subdirectories in a directory.

- **Tool Name:** `get-all-dirs-from-directory`
- **Arguments:**
  - `path` (`string`): Directory path
- **Returns:** `Array` - Array of subdirectory names

### 31. `getAllDirsFromDirectorySync`

Synchronously retrieves subdirectories in a directory.

- **Tool Name:** `get-all-dirs-from-directory-sync`
- **Arguments:**
  - `path` (`string`): Directory path
- **Returns:** `Array` - Array of subdirectory names

### 32. `getAllFilesRecursively`

Asynchronously retrieves all files in a directory tree.

- **Tool Name:** `get-all-files-recursively`
- **Arguments:**
  - `path` (`string`): Root directory
  - `excludedFolders` (`Array<string>`, optional): Folders to skip
- **Returns:** `Array` - File objects with name, parentDir, fileType, path

### 33. `getAllFilesRecursivelySync`

Synchronously retrieves all files in a directory tree.

- **Tool Name:** `get-all-files-recursively-sync`
- **Arguments:**
  - `path` (`string`): Root directory
  - `excludedFolders` (`Array<string>`, optional): Folders to skip
- **Returns:** `Array` - File objects with name, parentDir, fileType, path

### 34. `getMimeType`

Gets the MIME type for a file based on its extension.

- **Tool Name:** `get-mime-type`
- **Arguments:**
  - `file` (`string`): File path or filename
- **Returns:** `string` - MIME type (e.g., `'image/png'`)

### 35. `getFileExtensionsByMimeType`

Gets all file extensions for a MIME type.

- **Tool Name:** `get-file-extensions-by-mime-type`
- **Arguments:**
  - `mimeType` (`string`): MIME type (e.g., `'image/png'`)
- **Returns:** `Array<string>` - Array of extensions

### 36. `getSpecifiedExt`

Finds the first extension from a list that appears in the URL.

- **Tool Name:** `get-specified-ext`
- **Arguments:**
  - `url` (`string`): URL or filename
  - `fileExtensions` (`Array<string>`): Extensions to check
- **Returns:** `string` - First matching extension

### 37. `createDirPath`

Asynchronously creates a directory path if it does not exist.

- **Tool Name:** `create-dir-path`
- **Arguments:**
  - `pathParts` (`Array<string>`): Path parts to join and create
- **Returns:** `string` - Created directory path

### 38. `deleteAllFilesInDirPath`

Asynchronously deletes all files in a directory.

- **Tool Name:** `delete-all-files-in-dir-path`
- **Arguments:**
  - `path` (`string`): Root directory
  - `recursive` (`boolean`, optional): Delete in subdirectories (default: `false`)
- **Returns:** `Object` - `{ status, result, message }`

### 39. `deleteAllDirsInDirPath`

Asynchronously deletes all subdirectories in a directory.

- **Tool Name:** `delete-all-dirs-in-dir-path`
- **Arguments:**
  - `path` (`string`): Root directory
- **Returns:** `Object` - `{ status, result, message }`

### 40. `deleteAllInDirPath`

Asynchronously deletes all files and directories inside a directory.

- **Tool Name:** `delete-all-in-dir-path`
- **Arguments:**
  - `path` (`string`): Root directory
- **Returns:** `Object` - `{ result, status, message }`

### 41. `deleteAllEmptyFilesInDirectory`

Asynchronously deletes all empty files in a directory.

- **Tool Name:** `delete-all-empty-files-in-directory`
- **Arguments:**
  - `path` (`string`): Root directory
  - `recursive` (`boolean`, optional): Delete in subdirectories (default: `false`)
- **Returns:** `Object` - `{ status, result, message }`

### 42. `deleteAllEmptyDirsInDirectory`

Asynchronously deletes all empty directories in a directory.

- **Tool Name:** `delete-all-empty-dirs-in-directory`
- **Arguments:**
  - `path` (`string`): Root directory
  - `recursive` (`boolean`, optional): Delete in subdirectories (default: `false`)
- **Returns:** `Object` - `{ status, result, message }`

### 43. `mimeTypes`

Constant object mapping file extensions to MIME types.

- **Tool Name:** `mime-types`
- **Arguments:** None
- **Returns:** `Object` - Map of extensions to MIME types

---

## General Utils

### 1. `generateUuid`

Generates a pseudo-unique string identifier (UUID-like).

- **Tool Name:** `generate-uuid`
- **Arguments:**
  - `radix` (`number`, optional): Radix for characters (default: `16`)
- **Returns:** `string` - Pseudo-unique identifier

### 2. `slowDown`

Pauses execution for a specified time.

- **Tool Name:** `slow-down`
- **Arguments:**
  - `timeDelay` (`number`, optional): Delay in milliseconds (default: `7747`)
- **Returns:** `null` - Resolves after delay

### 3. `enumerate`

Formats an array into a grammatically correct list.

- **Tool Name:** `enumerate`
- **Arguments:**
  - `items` (`Array<string>`): Strings to enumerate
  - `useAnd` (`boolean`, optional): Use 'and' as connector (default: `false`)
- **Returns:** `string` - Formatted list (e.g., `'a, b, or c'`)

### 4. `getRandomNumber`

Generates a random integer within a range.

- **Tool Name:** `get-random-number`
- **Arguments:**
  - `min` (`number`, optional): Lower bound inclusive (default: `0`)
  - `max` (`number`, optional): Upper bound exclusive (default: `10`)
- **Returns:** `number` - Random integer

### 5. `getNumericValue`

Extracts the first numeric value from a string.

- **Tool Name:** `get-numeric-value`
- **Arguments:**
  - `str` (`string`): Input string
- **Returns:** `number` - Extracted number, or NaN

### 6. `getValidatedStringValue`

Converts a value to string, returns null if input is null/undefined.

- **Tool Name:** `get-validated-string-value`
- **Arguments:**
  - `input` (`any`): Value to convert
- **Returns:** `string` | `null` - String representation

### 7. `replaceWithForwardSlash`

Replaces all backslashes with forward slashes.

- **Tool Name:** `replace-with-forward-slash`
- **Arguments:**
  - `str` (`string`): Input string
- **Returns:** `string` - String with forward slashes

### 8. `debounce`

Creates a debounced function.

- **Tool Name:** `debounce`
- **Arguments:**
  - `fn` (`Function`): Function to debounce
  - `delay` (`number`, optional): Delay in ms (default: `2500`)
- **Returns:** `Function` - Debounced function

### 9. `waitForCondition`

Polls a condition until it returns true.

- **Tool Name:** `wait-for-condition`
- **Arguments:**
  - `conditionCallback` (`Function`): Returns boolean
  - `onTrueCallback` (`Function`, optional): Executed when condition is true
  - `messageCallback` (`Function`, optional): Periodic progress updates
  - `timeout` (`number`, optional): Max wait time in ms
- **Returns:** `null` - Resolves when condition is met

### 10. `moderator`

Processes an array in chunks to avoid blocking the event loop.

- **Tool Name:** `moderator`
- **Arguments:**
  - `arr` (`Array`): Array to process
  - `callback` (`Function`): Async function for each chunk
  - `bulkCount` (`number`, optional): Chunk size (default: `5`)
- **Returns:** `null` - Resolves when all chunks processed

---

## Node Utils

### 1. `spawnOnChildProcess`

Spawns a Node.js child process by forking a JavaScript file.

- **Tool Name:** `spawn-on-child-process`
- **Arguments:**
  - `filePath` (`string`): Path to Node.js script to fork
- **Returns:** `string` - Confirmation message

### 2. `runSystemCommand`

Executes a system binary with restricted working directory and security checks.

- **Tool Name:** `run-system-command`
- **Arguments:**
  - `command` (`string`): Shell command (e.g., `'echo hello'`)
  - `cwd` (`string`): Target working directory
- **Returns:** `Object` - `{ statusOk, message, stdout, stderr, command }`

### 3. `getAppDataDirPath`

Returns the platform-specific application data directory path.

- **Tool Name:** `get-app-data-dir-path`
- **Arguments:** None
- **Returns:** `string` - Application data directory path

---

## JSON Utils

### 1. `parseValidatedJSON`

Attempts to parse a string as JSON, returns original input if parsing fails.

- **Tool Name:** `parse-validated-json`
- **Arguments:**
  - `input` (`string`): String to parse
- **Returns:** `any` - Parsed JSON or original input

### 2. `createJsonFileObject`

Creates a JSON file manager for storing and retrieving data.

- **Tool Name:** `create-json-file-object`
- **Arguments:**
  - `path` (`string`): Directory path for JSON file
  - `fileName` (`string`): Name of JSON file
- **Returns:** `Object` - JSON file manager with `getSavedData`, `addData`, `clearData` methods

---

## Objects/Array Utils

### 1. `getValidatedPropValues`

Gets property values from a nested object by traversing property names.

- **Tool Name:** `get-validated-prop-values`
- **Arguments:**
  - `objStr` (`string`): JSON string of object
  - `propNames` (`Array<string>`): Property path (e.g., `['user', 'profile', 'name']`)
- **Returns:** `any` - Property values at the path

### 2. `isObjectInArray`

Checks if an object exists in an array.

- **Tool Name:** `is-object-in-array`
- **Arguments:**
  - `objStr` (`string`): JSON string of object to find
  - `arrStr` (`string`): JSON string of array
  - `keysToCheck` (`Array<string>`, optional): Specific keys to compare
- **Returns:** `boolean` - True if object exists in array

### 3. `getAllObjectKeys`

Gets all unique keys from an array of objects.

- **Tool Name:** `get-all-object-keys`
- **Arguments:**
  - `arrStr` (`string`): JSON string of array of objects
- **Returns:** `Array<string>` - Array of unique key names

### 4. `sortObjectsByDate`

Sorts an array of objects by a date property.

- **Tool Name:** `sort-objects-by-date`
- **Arguments:**
  - `arrStr` (`string`): JSON string of array
  - `dateProp` (`string`, optional): Date property name (default: `'dateCreated'`)
  - `ascending` (`boolean`, optional): Sort ascending (default: `true`)
- **Returns:** `Array` - Sorted array

### 5. `sortObjectsByPropName`

Sorts an array of objects by a specific property.

- **Tool Name:** `sort-objects-by-prop-name`
- **Arguments:**
  - `arrStr` (`string`): JSON string of array
  - `propName` (`string`): Property name to sort by
  - `ascending` (`boolean`, optional): Sort ascending (default: `true`)
- **Returns:** `Array` - Sorted array

### 6. `objectToString`

Converts an object to a readable string format.

- **Tool Name:** `object-to-string`
- **Arguments:**
  - `objStr` (`string`): JSON string of object
  - `delimiter` (`string`, optional): Separator (default: `', '`)
- **Returns:** `string` - Readable string representation

### 7. `isObjectUnique`

Checks if an object is unique in an array.

- **Tool Name:** `is-object-unique`
- **Arguments:**
  - `objStr` (`string`): JSON string of object to check
  - `arrStr` (`string`): JSON string of array
  - `keys` (`Array<string>`, optional): Specific keys to compare
- **Returns:** `boolean` - True if object is unique

### 8. `filterUnlistedObjects`

Filters out objects already in a local list.

- **Tool Name:** `filter-unlisted-objects`
- **Arguments:**
  - `localObjectsStr` (`string`): JSON string of local objects
  - `allObjectsStr` (`string`): JSON string of all objects
  - `keys` (`Array<string>`, optional): Specific keys to compare
- **Returns:** `Array` - Filtered array

### 9. `shuffleArr`

Shuffles an array using Fisher-Yates algorithm.

- **Tool Name:** `shuffle-arr`
- **Arguments:**
  - `arrStr` (`string`): JSON string of array
- **Returns:** `Array` - Shuffled array

### 10. `objectCompare`

Compares two objects for equality.

- **Tool Name:** `object-compare`
- **Arguments:**
  - `targetStr` (`string`): JSON string of target object
  - `sourceStr` (`string`): JSON string of source object
- **Returns:** `boolean` - True if objects are equal

### 11. `assignProps`

Recursively assigns properties from source to target object.

- **Tool Name:** `assign-props`
- **Arguments:**
  - `targetStr` (`string`): JSON string of target object
  - `sourceStr` (`string`): JSON string of source object
- **Returns:** `any` - Target object with assigned properties

### 12. `deepMerge`

Deep merges multiple objects together.

- **Tool Name:** `deep-merge`
- **Arguments:**
  - `targetStr` (`string`): JSON string of base object
  - `sourceStr` (`string`): JSON string of source object
- **Returns:** `any` - Deep merged object

---

## String Utils

### 1. `toUrl`

Converts a string to a URL-friendly slug.

- **Tool Name:** `to-url`
- **Arguments:**
  - `str` (`string`): Input string
- **Returns:** `string` - URL slug (e.g., `'hello-world'`)

### 2. `toCapitalize`

Capitalizes the first letter of a string.

- **Tool Name:** `to-capitalize`
- **Arguments:**
  - `str` (`string`): Input string
- **Returns:** `string` - Capitalized string

### 3. `toCapitalizeAll`

Capitalizes the first letter of each word.

- **Tool Name:** `to-capitalize-all`
- **Arguments:**
  - `str` (`string`): Input string
- **Returns:** `string` - String with all words capitalized

### 4. `toNormalString`

Converts camelCase, snake_case, or kebab-case to normal string.

- **Tool Name:** `to-normal-string`
- **Arguments:**
  - `str` (`string`): Input string
  - `previousFormat` (`'camel-case'` | `'underscored'` | `'kebab-case'`, optional): Previous format
- **Returns:** `string` - Normal string (e.g., `'Hello World'`)

### 5. `getInitials`

Gets initials from a full name.

- **Tool Name:** `get-initials`
- **Arguments:**
  - `str` (`string`): Name string (e.g., `'John Doe'`)
- **Returns:** `string` - Initials (e.g., `'JD'`)

### 6. `toCamelCase`

Converts a string to camelCase.

- **Tool Name:** `to-camel-case`
- **Arguments:**
  - `str` (`string`): Input string
  - `url` (`boolean`, optional): Use hyphen separator
  - `initialCap` (`boolean`, optional): First letter capitalized (PascalCase)
- **Returns:** `string` - camelCase string

---

## URL Utils

### 1. `urlConstructor`

Reconstructs a URL from its parts.

- **Tool Name:** `url-constructor`
- **Arguments:**
  - `urlString` (`string`): URL to process
- **Returns:** `string` - Reconstructed URL

### 2. `objectToQueryString`

Converts a JavaScript object to a query string.

- **Tool Name:** `object-to-query-string`
- **Arguments:**
  - `obj` (`string`): JSON string of object
- **Returns:** `string` - Query string (e.g., `'a=1&b=2'`)

### 3. `queryStringToObject`

Converts a query string to a JavaScript object.

- **Tool Name:** `query-string-to-object`
- **Arguments:**
  - `queryString` (`string`): Query string (with or without leading `?`)
- **Returns:** `Object` - Parsed JavaScript object

### 4. `urlToQueryStringObject`

Parses a URL and extracts query parameters as an object.

- **Tool Name:** `url-to-query-string-object`
- **Arguments:**
  - `urlString` (`string`): Full URL
  - `trailingSlash` (`boolean`, optional): Add trailing slash
- **Returns:** `Object` - `{ path, query, protocol, host, hostname }`

### 5. `objectToDotNotation`

Converts a nested object to dot notation.

- **Tool Name:** `object-to-dot-notation`
- **Arguments:**
  - `obj` (`string`): JSON string of object
- **Returns:** `Object` - Object with dot notation keys (e.g., `{ 'a.b': 1 }`)

### 6. `dotNotationToObject`

Converts dot notation back to a nested object.

- **Tool Name:** `dot-notation-to-object`
- **Arguments:**
  - `dotNotationStr` (`string`): JSON string of dot notation object
- **Returns:** `Object` - Nested JavaScript object

### 7. `getDomain`

Extracts the domain from a URL.

- **Tool Name:** `get-domain`
- **Arguments:**
  - `url` (`string`): URL
- **Returns:** `string` - Domain (e.g., `'example.com'`)

### 8. `checkSubDomain`

Checks if a URL contains the domain of another URL.

- **Tool Name:** `check-sub-domain`
- **Arguments:**
  - `mainUrl` (`string`): Main domain URL
  - `subUrl` (`string`): URL to check
- **Returns:** `boolean` - True if subUrl is a subdomain of mainUrl

---

## Tool Structure

Each MCP tool follows this standardized structure:

```javascript
{
  urlName: "tool-name",           // Unique identifier for the tool
  title: "Tool Title",            // Human-readable title
  description: "Description...",  // What the tool does
  inputSchema: z.object({        // Zod schema for input parameters
    param1: z.string().describe("Parameter description")
  }),
  outputSchema: z.object({       // Zod schema for output
    result: z.string().describe("Output description")
  }),
  handler: async ({ param1 }) => { // Function that executes the tool
    const result = utils.toolFunction(param1);
    return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
  }
}