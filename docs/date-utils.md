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