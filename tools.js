export default function getMcpTools(z, utils) {
  const mcpTools = {
    // DATE-UTILS
    formattedDate: {
      urlName: "formatted-date",
      title: "Date Formatted",
      description: "Formats a date object into a string in the format MM-DD-YYYY. If no date is provided, uses the current date.",
      inputSchema: z.object({
        date: z.string().optional().describe("A date string (defaults to current date)")
      }),
      outputSchema: z.object({
        result: z.string().describe("Formatted date string in MM-DD-YYYY format (e.g., '05-23-2023')")
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: async ({ date }) => {
        const result = utils.formattedDate(date);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getDateTimeObject: {
      urlName: "get-date-time-object",
      title: "Get Date Time Object",
      description: "Parses various input formats into a standard JavaScript Date object. Accepts Date objects, Unix timestamps (numbers), or date strings containing '-' (e.g., '2023-05-05'). Returns current date if input is invalid.",
      inputSchema: z.object({
        dateInput: z.string().describe("Input to parse. Can be a Date object, number (Unix timestamp in ms), or string (e.g., '2023-05-05').")
      }),
      outputSchema: z.object({
        result: z.any().describe("A valid JavaScript Date object")
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: async ({ dateInput }) => {
        const result = utils.getDateTimeObject(dateInput);
        return { content: [{ type: "text", text: JSON.stringify({ result: result.toISOString() }) }] };
      }
    },
    dateTimeObject: {
      urlName: "date-time-object",
      title: "Date Time Object Detailed",
      description: "Extracts detailed components of a date and time, providing various helper methods. Returns an object with day, month, year, date, time, getCurrentTime (function), getCurrentDate (function), fullDate, and fullDateTime properties.",
      inputSchema: z.object({
        date: z.string().optional().describe("The input date. Can be a Date object, string, or number.")
      }),
      outputSchema: z.object({
        result: z.object({
          day: z.string().describe("Full day name (e.g., 'Friday')"),
          month: z.string().describe("Full month name (e.g., 'May')"),
          year: z.number().describe("The year (e.g., 2023)"),
          date: z.number().describe("The day of the month (e.g., 5)"),
          time: z.string().describe("Current time in 12-hour format (e.g., '03:30:45 PM')")
        })
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: async ({ date }) => {
        const result = utils.dateTimeObject(date);
        return { content: [{ type: "text", text: JSON.stringify({ result: { day: result.day, month: result.month, year: result.year, date: result.date, time: result.time } }) }] };
      }
    },
    getTimeElapsed: {
      urlName: "get-time-elapsed",
      title: "Get Time Elapsed",
      description: "Calculates the time difference between two timestamps (in milliseconds) and returns a human-readable summary with detailed breakdown and moments passed.",
      inputSchema: z.object({
        time1: z.number().describe("First timestamp in milliseconds"),
        time2: z.number().describe("Second timestamp in milliseconds")
      }),
      outputSchema: z.object({
        result: z.object({
          timeElapsed: z.string().describe("Detailed breakdown (e.g., '1 hours, 30 minutes, and 45.5 seconds')"),
          momentsPassed: z.string().describe("Human-readable summary (e.g., '1 hour has passed.')")
        })
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: async ({ time1, time2 }) => {
        const result = utils.getTimeElapsed(time1, time2);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    createZuluStartDate: {
      urlName: "create-zulu-start-date",
      title: "Create Zulu Start Date",
      description: "Creates a Date object representing the start of the day in UTC (Zulu time) based on the local time components of the input date.",
      inputSchema: z.object({
        date: z.string().describe("The local date object (Date)")
      }),
      outputSchema: z.object({
        result: z.any().describe("A new Date object set to UTC +00:00")
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: async ({ date }) => {
        const result = utils.createZuluStartDate(new Date(date));
        return { content: [{ type: "text", text: JSON.stringify({ result: result.toISOString() }) }] };
      }
    },
    getOffsetMinutesForTimezone: {
      urlName: "get-offset-minutes-for-timezone",
      title: "Get Timezone Offset Minutes",
      description: "Calculates the timezone offset in minutes relative to UTC for a given IANA timezone identifier (e.g., 'UTC', 'America/New_York').",
      inputSchema: z.object({
        timeZone: z.string().describe("The IANA timezone identifier (e.g., 'UTC', 'America/New_York')")
      }),
      outputSchema: z.object({
        result: z.number().describe("The offset in minutes (e.g., 0 for UTC, -300 for EST)")
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: async ({ timeZone }) => {
        const result = utils.getOffsetMinutesForTimezone(timeZone);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    toISOZeroOffset: {
      urlName: "to-iso-zero-offset",
      title: "To ISO Zero Offset",
      description: "Converts a local date/time to an ISO string with a zero offset (+00:00) adjusted for the specified timezone. Useful for normalizing local times to a specific business time zone before converting to UTC.",
      inputSchema: z.object({
        input: z.string().describe("The date to convert. Can be a Date object or string."),
        tz: z.string().describe("The target timezone (e.g., 'Europe/Dublin')")
      }),
      outputSchema: z.object({
        result: z.string().nullable().describe("ISO formatted string ending in +00:00 (e.g., '2023-05-05T10:00:00.000+00:00'). Returns null if input is invalid.")
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: async ({ input, tz }) => {
        const result = utils.toISOZeroOffset(input, tz);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getHourlyDuration: {
      urlName: "get-hourly-duration",
      title: "Get Hourly Duration",
      description: "Breaks down a total number of minutes into hours and remaining minutes.",
      inputSchema: z.object({
        numOfMinutes: z.number().describe("Total minutes")
      }),
      outputSchema: z.object({
        result: z.object({
          hours: z.number().describe("Whole hours"),
          minutes: z.number().describe("Remaining minutes")
        })
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: async ({ numOfMinutes }) => {
        const result = utils.getHourlyDuration(numOfMinutes);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getDurationInMinutes: {
      urlName: "get-duration-in-minutes",
      title: "Get Duration In Minutes",
      description: "Calculates the duration in minutes between two date objects. Can return negative if dateObj1 is before dateObj2.",
      inputSchema: z.object({
        dateObj1: z.string().describe("End date (Date)"),
        dateObj2: z.string().describe("Start date (Date)")
      }),
      outputSchema: z.object({
        result: z.number().describe("The difference in minutes. Can be negative.")
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: async ({ dateObj1, dateObj2 }) => {
        const result = utils.getDurationInMinutes(new Date(dateObj1), new Date(dateObj2));
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    localDateToSelectedTimeZone: {
      urlName: "local-date-to-selected-time-zone",
      title: "Local Date To Selected Time Zone",
      description: "Converts a date from the local system timezone to a selected target IANA timezone.",
      inputSchema: z.object({
        date: z.string().describe("The date in local time (Date)"),
        selectedTimeZone: z.string().describe("The target IANA timezone")
      }),
      outputSchema: z.object({
        result: z.any().describe("A new Date object representing the time in the selected timezone")
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: async ({ date, selectedTimeZone }) => {
        const result = utils.localDateToSelectedTimeZone(new Date(date), selectedTimeZone);
        return { content: [{ type: "text", text: JSON.stringify({ result: result.toISOString() }) }] };
      }
    },
    getFormattedTime: {
      urlName: "get-formatted-time",
      title: "Get Formatted Time",
      description: "Formats a date object into a 12-hour time string with AM/PM (e.g., '03:05 PM'). Handles midnight (12 AM) and noon (12 PM) correctly.",
      inputSchema: z.object({
        date: z.string().describe("The date object (Date)")
      }),
      outputSchema: z.object({
        result: z.string().describe("Formatted time string (e.g., '03:05 PM')")
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: async ({ date }) => {
        const result = utils.getFormattedTime(new Date(date));
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getIsoFormattedTime: {
      urlName: "get-iso-formatted-time",
      title: "Get ISO Formatted Time",
      description: "Formats individual time components into an ISO-like time string with zero-padding (e.g., '01:05:09').",
      inputSchema: z.object({
        hours: z.number().describe("Hour (0-23)"),
        minutes: z.number().describe("Minute (0-59)"),
        seconds: z.number().describe("Second (0-59)")
      }),
      outputSchema: z.object({
        result: z.string().describe("ISO formatted time (e.g., '01:05:09')")
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: async ({ hours, minutes, seconds }) => {
        const result = utils.getIsoFormattedTime(hours, minutes, seconds);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    fixTimeStr: {
      urlName: "fix-time-str",
      title: "Fix Time String",
      description: "Normalizes a time string that might be missing spaces or zero-padding. Converts formats like '3:05PM' to '03:05 PM'.",
      inputSchema: z.object({
        timeStr: z.string().describe("Raw time string (e.g., '3:05PM' or '15:30 PM')")
      }),
      outputSchema: z.object({
        result: z.string().describe("Normalized time string (e.g., '03:05 PM')")
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: async ({ timeStr }) => {
        const result = utils.fixTimeStr(timeStr);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getCurrentMonthByIndex: {
      urlName: "get-current-month-by-index",
      title: "Get Current Month By Index",
      description: "Returns the full name of a month based on its 0-indexed integer (0 = January, 11 = December).",
      inputSchema: z.object({
        monthIndex: z.number().describe("Month index (0 = January, 11 = December)")
      }),
      outputSchema: z.object({
        result: z.string().describe("Full month name (e.g., 'May'). Returns 'January' for invalid indices.")
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: async ({ monthIndex }) => {
        const result = utils.getCurrentMonthByIndex(monthIndex);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getNextMonth: {
      urlName: "get-next-month",
      title: "Get Next Month",
      description: "Returns a Date object representing the 1st day of the next month. Handles year rollover (e.g., December -> January of next year).",
      inputSchema: z.object({
        date: z.string().describe("The reference date (Date)")
      }),
      outputSchema: z.object({
        result: z.any().describe("Date object for the first day of the next month")
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: async ({ date }) => {
        const result = utils.getNextMonth(new Date(date));
        return { content: [{ type: "text", text: JSON.stringify({ result: result.toISOString() }) }] };
      }
    },
    getPrevMonth: {
      urlName: "get-prev-month",
      title: "Get Previous Month",
      description: "Returns a Date object representing a day in the previous month. Attempts to keep the same day number, clamping to the last day of the previous month if necessary (e.g., Jan 31 -> Feb 28).",
      inputSchema: z.object({
        date: z.string().describe("The reference date (Date)")
      }),
      metadata : {
        group : "date-utillities",
      },
      outputSchema: z.object({
        result: z.any().describe("Date object for the previous month")
      }),
      handler: async ({ date }) => {
        const result = utils.getPrevMonth(new Date(date));
        return { content: [{ type: "text", text: JSON.stringify({ result: result.toISOString() }) }] };
      }
    },
    getNumberOfDaysOfMonth: {
      urlName: "get-number-of-days-in-month",
      title: "Get Number Of Days In Month",
      description: "Calculates the number of days in the month of the given date (handles leap years).",
      inputSchema: z.object({
        date: z.string().describe("Any date in the month of interest (Date)")
      }),
      metadata : {
        group : "date-utillities",
      },
      outputSchema: z.object({
        result: z.number().describe("Number of days (e.g., 28, 30, 31)")
      }),
      handler: async ({ date }) => {
        const result = utils.getNumberOfDaysOfMonth(new Date(date));
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getFormattedDateStr: {
      urlName: "get-formatted-date-str",
      title: "Get Formatted Date String",
      description: "Formats a date object into a readable string format like 'May 5, 2023'.",
      inputSchema: z.object({
        date: z.string().describe("The date object (Date)")
      }),
      metadata : {
        group : "date-utillities",
      },
      outputSchema: z.object({
        result: z.string().describe("Formatted date string (e.g., 'May 5, 2023')")
      }),
      handler: async ({ date }) => {
        const result = utils.getFormattedDateStr(new Date(date));
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    toLocalBusinessTimeZone: {
      urlName: "to-local-business-time-zone",
      title: "To Local Business Time Zone",
      description: "Converts a UTC date object to the local business time zone specified by an IANA timezone identifier.",
      inputSchema: z.object({
        date: z.string().describe("A date object, typically UTC (Date)"),
        businessTimeZone: z.string().describe("The target IANA timezone")
      }),
      metadata : {
        group : "date-utillities",
      },
      outputSchema: z.object({
        result: z.any().describe("The date adjusted to the business timezone")
      }),
      handler: async ({ date, businessTimeZone }) => {
        const result = utils.toLocalBusinessTimeZone(new Date(date), businessTimeZone);
        return { content: [{ type: "text", text: JSON.stringify({ result: result.toISOString() }) }] };
      }
    },
    createTzScheduleObject: {
      urlName: "create-tz-schedule-object",
      title: "Create Timezone Schedule Object",
      description: "Creates a comprehensive object representing a scheduled time in a specific business timezone, converting it to ISO formats. Core method for timezone-aware scheduling.",
      inputSchema: z.object({
        scheduledDate: z.string().describe("The date part of the schedule. Can be a string (e.g., '2023-05-05') or Date object."),
        timeOfDay: z.string().describe("The time part (e.g., '10:00:00' or '10:00:00 AM')"),
        timeZone: z.string().describe("The business IANA timezone (e.g., 'Europe/Dublin')")
      }),
      outputSchema: z.object({
        result: z.object({
          lbtzDateObj: z.any().describe("Date object in the business timezone"),
          isoStringFullDate: z.string().describe("Full ISO string (e.g., '2023-05-05T02:00:00.000Z')"),
          month: z.number().describe("Month index (0-11)"),
          date: z.number().describe("Day of month"),
          year: z.number().describe("Year"),
          hours: z.number().describe("Hour (0-23)"),
          minutes: z.number().describe("Minute"),
          seconds: z.number().describe("Second"),
          isoStringDate: z.string().describe("ISO date string (e.g., '2023-05-05')"),
          isoStringTime: z.string().describe("ISO time string (e.g., '10:00:00.000')"),
          formattedDate: z.string().describe("Readable date (e.g., 'May 5, 2023')")
        })
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: async ({ scheduledDate, timeOfDay, timeZone }) => {
        const result = utils.createTzScheduleObject(scheduledDate, timeOfDay, timeZone);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getISOFormattedDate: {
      urlName: "get-iso-formatted-date",
      title: "Get ISO Formatted Date",
      description: "Formats a date object into an ISO-like date string in YYYY-MM-DD format (e.g., '2023-05-05').",
      inputSchema: z.object({
        date: z.string().describe("The date object (Date)")
      }),
      outputSchema: z.object({
        result: z.string().describe("ISO date string in YYYY-MM-DD format")
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: async ({ date }) => {
        const result = utils.getISOFormattedDate(new Date(date));
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    createDateRangeObject: {
      urlName: "create-date-range-object",
      title: "Create Date Range Object",
      description: "Creates an object representing a date range with formatted start/end dates and next month date object.",
      inputSchema: z.object({
        date: z.string().describe("Start date (Date)"),
        lastDate: z.string().nullable().optional().describe("End date. If null, uses the first day of the next month.")
      }),
      outputSchema: z.object({
        result: z.object({
          formattedStartDate: z.string().describe("ISO start date"),
          formattedEndDate: z.string().describe("ISO end date"),
          nextMonthDateObject: z.any().describe("The first day of the month after the end date")
        })
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: async ({ date, lastDate }) => {
        const result = utils.createDateRangeObject(new Date(date), lastDate ? new Date(lastDate) : null);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    checkDateFlow: {
      urlName: "check-date-flow",
      title: "Check Date Flow",
      description: "Determines if the date range is moving forward in time or backward. Returns 'forward' if start is before end, 'backward' otherwise.",
      inputSchema: z.object({
        startDate: z.string().describe("Start of range. Can be a Date object or string."),
        endDate: z.string().describe("End of range. Can be a Date object or string.")
      }),
      outputSchema: z.object({
        result: z.enum(["forward", "backward"]).describe("'forward' if start is before end, 'backward' otherwise")
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: async ({ startDate, endDate }) => {
        const result = utils.checkDateFlow(startDate, endDate);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getForwardDateRangeObjects: {
      urlName: "get-forward-date-range-objects",
      title: "Get Forward Date Range Objects",
      description: "Generates an array of date range objects covering the period from start to end, month by month (forward direction).",
      inputSchema: z.object({
        startDate: z.string().describe("Start of range. Can be a Date object or string."),
        endDate: z.string().describe("End of range. Can be a Date object or string.")
      }),
      outputSchema: z.object({
        result: z.array(z.any()).describe("Array of date range objects")
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: async ({ startDate, endDate }) => {
        const result = utils.getForwardDateRangeObjects(new Date(startDate), new Date(endDate));
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getBackwardDateRangeObjects: {
      urlName: "get-backward-date-range-objects",
      title: "Get Backward Date Range Objects",
      description: "Generates an array of date range objects for a backward time range (from later date to earlier date), reversed.",
      inputSchema: z.object({
        startDate: z.string().describe("The later date."),
        endDate: z.string().describe("The earlier date.")
      }),
      outputSchema: z.object({
        result: z.array(z.any()).describe("Array of date range objects, reversed")
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: ({ startDate, endDate }) => {
        const result = utils.getBackwardDateRangeObjects(new Date(startDate), new Date(endDate));
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getDateRangeObjects: {
      urlName: "get-date-range-objects",
      title: "Get Date Range Objects",
      description: "Automatically determines the direction of the date range and returns the appropriate array of range objects (forward or backward).",
      inputSchema: z.object({
        startDate: z.string().describe("Start date."),
        endDate: z.string().describe("End date.")
      }),
      outputSchema: z.object({
        result: z.array(z.any()).describe("Array of date range objects")
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: ({ startDate, endDate }) => {
        const result = utils.getDateRangeObjects(new Date(startDate), new Date(endDate));
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getDateRangeObjectsWithIsoZeroOffset: {
      urlName: "get-date-range-objects-with-iso-zero-offset",
      title: "Get Date Range Objects With ISO Zero Offset",
      description: "Similar to getDateRangeObjects, but adds ISO zero-offset strings (+00:00) for the start and end of each range in the specified timezone.",
      inputSchema: z.object({
        startDate: z.string().describe("Start of range."),
        endDate: z.string().describe("End of range."),
        timeZone: z.string().describe("Target timezone for offset calculation")
      }),
      outputSchema: z.object({
        result: z.array(z.any()).describe("Each object includes ztzStartDate and ztzEndDate (ISO strings with +00:00)")
      }),
      metadata : {
        group : "date-utillities",
      },
      handler: ({ startDate, endDate, timeZone }) => {
        const result = utils.getDateRangeObjectsWithIsoZeroOffset(new Date(startDate), new Date(endDate), timeZone);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },

    // FILE-SYSTEM
    getUserAllowedPathsByPermissionType: {
      urlName: "get-user-allowed-paths-by-permission-type",
      title: "Get User Allowed Paths By Permission Type",
      description: "Returns an array of all allowed paths that grant the specified permission type (read, write, delete, execute).",
      inputSchema: z.object({
        permissionType: z.string().describe("The type of permission to filter by (e.g., 'read', 'write', 'delete', 'execute')")
      }),
      outputSchema: z.object({
        result: z.array(z.any()).describe("Array of permission objects with the requested permission set to true")
      }),
      metadata : {
        group : "fs-utillities",
      },
      handler: async ({ permissionType }) => {
        const result = utils.getUserAllowedPathsByPermissionType(permissionType);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getUserAllowedPaths: {
      urlName: "get-user-allowed-paths",
      title: "Get User Allowed Paths",
      description: "Returns an array of all allowed paths configured for the user. Each object contains path, read, write, delete, and execute properties.",
      inputSchema: z.object({}),
      outputSchema: z.object({
        result: z.array(z.any()).describe("Array of permission objects")
      }),
      metadata : {
        group : "fs-utillities",
      },
      handler: async () => {
        const result = utils.getUserAllowedPaths();
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getUserFsPermission: {
      urlName: "get-user-fs-permission",
      title: "Get User File System Permission",
      description: "Determines if a specific path falls within any of the user's allowed paths and returns the permissions for that path.",
      inputSchema: z.object({
        dirPath: z.string().describe("The file or directory path to check")
      }),
      outputSchema: z.object({
        result: z.any().nullable().describe("The permission object for the containing allowed path, or undefined if not found")
      }),
      metadata : {
        group : "fs-utillities",
      },
      handler: async ({ dirPath }) => {
        const result = utils.getUserFsPermission(dirPath);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    checkDirPathPermissions: {
      urlName: "check-dir-path-permissions",
      title: "Check Directory Path Permissions",
      description: "A convenience function to check if a specific path has a specific permission (read, write, delete, execute). Returns true if allowed and has permission, false otherwise.",
      inputSchema: z.object({
        dirPath: z.string().describe("The file or directory path to check"),
        permissionType: z.string().describe("The permission to check (e.g., 'read', 'write')")
      }),
      outputSchema: z.object({
        result: z.boolean().describe("true if path is allowed and has permission; false otherwise")
      }),
      metadata : {
        group : "fs-utillities",
      },
      handler: async ({ dirPath, permissionType }) => {
        const result = utils.checkDirPathPermissions(dirPath, permissionType);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    baseName: {
      urlName: "base-name",
      title: "Get Base Name",
      description: "Returns the last portion of a path, similar to path.basename. Checks read permission if file/directory exists in filesystem.",
      inputSchema: z.object({
        fileName: z.string().describe("The path to process"),
        suffix: z.string().optional().describe("Optional suffix to remove")
      }),
      outputSchema: z.object({
        result: z.string().describe("The base name of the file")
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      handler: async ({ fileName, suffix }) => {
        const result = utils.baseName(fileName, suffix);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    fileExists: {
      urlName: "file-exists",
      title: "File Exists",
      description: "Checks if a file or directory exists at the given path. Requires read permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to check")
      }),
      outputSchema: z.object({
        result: z.boolean().describe("true if it exists, false if it does not")
      }),
      metadata : {
        group : "fs-utillities",
      },
      handler: async ({ path }) => {
        const result = utils.fileExists(path);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    isFile: {
      urlName: "is-file",
      title: "Is File",
      description: "Checks if the given path is a file. Requires read permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to check")
      }),
      outputSchema: z.object({
        result: z.boolean().describe("true if it is a file, false otherwise")
      }),
      metadata : {
        group : "fs-utillities",
      },
      handler: async ({ path }) => {
        const result = utils.isFile(path);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    isDirectory: {
      urlName: "is-directory",
      title: "Is Directory",
      description: "Checks if the given path is a directory. Requires read permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to check")
      }),
      outputSchema: z.object({
        result: z.boolean().describe("true if it is a directory, false otherwise")
      }),
      metadata : {
        group : "fs-utillities",
      },
      handler: async ({ path }) => {
        const result = utils.isDirectory(path);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getParentDir: {
      urlName: "get-parent-dir",
      title: "Get Parent Directory",
      description: "Returns the parent directory of the given file path. Requires read permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The file path")
      }),
      outputSchema: z.object({
        result: z.string().nullable().describe("The parent directory path, or null if root")
      }),
      metadata : {
        group : "fs-utillities",
      },
      handler: async ({ path }) => {
        const result = utils.getParentDir(path);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getFileExt: {
      urlName: "get-file-ext",
      title: "Get File Extension",
      description: "Returns the file extension of the given path (including the dot, e.g., '.txt').",
      inputSchema: z.object({
        path: z.string().describe("The file path")
      }),
      outputSchema: z.object({
        result: z.string().describe("The file extension (e.g., '.txt')")
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      handler: async ({ path }) => {
        const result = utils.getFileExt(path);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    readdir: {
      urlName: "readdir",
      title: "Read Directory (Async)",
      description: "Asynchronously reads the contents of a directory. Requires read permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to the directory"),
        encoding: z.string().optional().default("utf8").describe("File encoding (default: 'utf8')")
      }),
      outputSchema: z.object({
        result: z.object({
          status: z.string().describe("'success' or 'failed'"),
          result: z.boolean().describe("true on success"),
          message: z.string().describe("Status message"),
          data: z.array(z.string()).optional().describe("Array of filenames on success")
        })
      }),
      metadata : {
        group : "fs-directory-utillities",
      },
      handler: async ({ path, encoding }) => {
        const result = await utils.readdir(path, { encoding: encoding || "utf8" });
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    readdirSync: {
      urlName: "readdir-sync",
      title: "Read Directory (Sync)",
      description: "Synchronously reads the contents of a directory. Requires read permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to the directory"),
        encoding: z.string().optional().default("utf8").describe("File encoding (default: 'utf8')")
      }),
      outputSchema: z.object({
        result: z.object({
          status: z.string(),
          result: z.boolean(),
          message: z.string(),
          data: z.array(z.string()).optional()
        })
      }),
      metadata : {
        group : "fs-directory-utillities",
      },
      handler: async ({ path, encoding }) => {
        const result = utils.readdirSync(path, { encoding: encoding || "utf8" });
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      },
      isSync: true,
    },
    mkdir: {
      urlName: "mkdir",
      title: "Make Directory (Async)",
      description: "Asynchronously creates a directory. Requires write permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to the new directory"),
        recursive: z.boolean().optional().default(true).describe("Create parent directories if needed")
      }),
      outputSchema: z.object({
        result: z.object({
          status: z.string(),
          result: z.boolean(),
          message: z.string()
        })
      }),
      metadata : {
        group : "fs-directory-utillities",
      },
      handler: async ({ path, recursive }) => {
        const result = await utils.mkdir(path, { recursive: recursive !== undefined ? recursive : true });
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    mkdirSync: {
      urlName: "mkdir-sync",
      title: "Make Directory (Sync)",
      description: "Synchronously creates a directory. Requires write permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to the new directory"),
        recursive: z.boolean().optional().default(true).describe("Create parent directories if needed")
      }),
      outputSchema: z.object({
        result: z.object({
          status: z.string(),
          result: z.boolean(),
          message: z.string()
        })
      }),
      metadata : {
        group : "fs-directory-utillities",
      },
      handler: async ({ path, recursive }) => {
        const result = utils.mkdirSync(path, { recursive: recursive !== undefined ? recursive : true });
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      },
      isSync: true,
    },
    deleteDir: {
      urlName: "delete-dir",
      title: "Delete Directory (Async)",
      description: "Asynchronously deletes a directory. Requires delete permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to the directory to delete"),
        recursive: z.boolean().optional().default(true).describe("Delete recursively")
      }),
      outputSchema: z.object({
        result: z.object({
          status: z.string(),
          result: z.boolean(),
          message: z.string()
        })
      }),
      metadata : {
        group : "fs-directory-utillities",
      },
      handler: async ({ path, recursive }) => {
        const result = await utils.deleteDir(path, { recursive: recursive !== undefined ? recursive : true });
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    deleteDirSync: {
      urlName: "delete-dir-sync",
      title: "Delete Directory (Sync)",
      description: "Synchronously deletes a directory. Requires delete permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to the directory to delete"),
        recursive: z.boolean().optional().default(true).describe("Delete recursively")
      }),
      outputSchema: z.object({
        result: z.object({
          status: z.string(),
          result: z.boolean(),
          message: z.string()
        })
      }),
      metadata : {
        group : "fs-directory-utillities",
      },
      handler: async ({ path, recursive }) => {
        const result = utils.deleteDirSync(path, { recursive: recursive !== undefined ? recursive : true });
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      },
      isSync: true,
    },
    readFile: {
      urlName: "read-file",
      title: "Read File (Async)",
      description: "Asynchronously reads the content of a file. Requires read permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to the file"),
        encoding: z.string().optional().default("utf8").describe("File encoding (default: 'utf8')")
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      outputSchema: z.object({
        result: z.object({
          result: z.boolean(),
          status: z.string(),
          message: z.string(),
          data: z.any().describe("File content (string or Buffer)")
        })
      }),
      handler: async ({ path, encoding }) => {
        const result = await utils.readFile(path, { encoding: encoding || "utf8" });
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    readFileSync: {
      urlName: "read-file-sync",
      title: "Read File (Sync)",
      description: "Synchronously reads the content of a file. Requires read permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to the file"),
        encoding: z.string().optional().default("utf8").describe("File encoding (default: 'utf8')")
      }),
      outputSchema: z.object({
        result: z.object({
          result: z.boolean(),
          status: z.string(),
          message: z.string(),
          data: z.any().describe("File content (string or Buffer)")
        })
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      handler: async ({ path, encoding }) => {
        const result = utils.readFileSync(path, { encoding: encoding || "utf8" });
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      },
      isSync: true,
    },
    writeFile: {
      urlName: "write-file",
      title: "Write File (Async)",
      description: "Asynchronously writes data to a file. Requires write permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to the file"),
        content: z.string().describe("The data to write (string)"),
        encoding: z.string().optional().default("utf8").describe("File encoding (default: 'utf8')")
      }),
      outputSchema: z.object({
        result: z.object({
          result: z.boolean(),
          status: z.string(),
          message: z.string()
        })
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      handler: async ({ path, content, encoding }) => {
        const result = await utils.writeFile(path, content, { encoding: encoding || "utf8" });
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    writeFileSync: {
      urlName: "write-file-sync",
      title: "Write File (Sync)",
      description: "Synchronously writes data to a file. Requires write permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to the file"),
        content: z.string().describe("The data to write (string)"),
        encoding: z.string().optional().default("utf8").describe("File encoding (default: 'utf8')")
      }),
      outputSchema: z.object({
        result: z.object({
          result: z.boolean(),
          status: z.string(),
          message: z.string()
        })
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      handler: async ({ path, content, encoding }) => {
        const result = utils.writeFileSync(path, content, { encoding: encoding || "utf8" });
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      },
      isSync: true,
    },
    deleteFile: {
      urlName: "delete-file",
      title: "Delete File (Async)",
      description: "Asynchronously deletes a file. Requires delete permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to the file")
      }),
      outputSchema: z.object({
        result: z.object({
          status: z.string(),
          result: z.boolean(),
          message: z.string()
        })
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      handler: async ({ path }) => {
        const result = await utils.deleteFile(path);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    deleteFileSync: {
      urlName: "delete-file-sync",
      title: "Delete File (Sync)",
      description: "Synchronously deletes a file. Requires delete permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to the file")
      }),
      outputSchema: z.object({
        result: z.object({
          result: z.boolean(),
          status: z.string(),
          message: z.string()
        })
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      handler: async ({ path }) => {
        const result = utils.deleteFileSync(path);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      },
      isSync: true,
    },
    getFileSize: {
      urlName: "get-file-size",
      title: "Get File Size",
      description: "Asynchronously gets the size of a file in bytes. Requires read permission on the path. Returns false if file does not exist.",
      inputSchema: z.object({
        path: z.string().describe("The path to the file")
      }),
      outputSchema: z.object({
        result: z.union([z.number(), z.boolean()]).describe("Size in bytes, or false if file does not exist")
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      handler: async ({ path }) => {
        const result = await utils.getFileSize(path);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    isFileEmpty: {
      urlName: "is-file-empty",
      title: "Is File Empty (Async)",
      description: "Asynchronously checks if a file is empty. Requires read permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to the file"),
        encoding: z.string().optional().default("utf8").describe("File encoding (default: 'utf8')")
      }),
      outputSchema: z.object({
        result: z.boolean().describe("true if the file is empty, false if it has content")
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      handler: async ({ path, encoding }) => {
        const result = await utils.isFileEmpty(path, { encoding: encoding || "utf8" });
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    isFileEmptySync: {
      urlName: "is-file-empty-sync",
      title: "Is File Empty (Sync)",
      description: "Synchronously checks if a file is empty. Requires read permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to the file"),
        encoding: z.string().optional().default("utf8").describe("File encoding (default: 'utf8')")
      }),
      outputSchema: z.object({
        result: z.boolean().describe("true if the file is empty, false if it has content")
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      handler: async ({ path, encoding }) => {
        const result = utils.isFileEmptySync(path, { encoding: encoding || "utf8" });
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      },
      isSync: true,
    },
    getFileObject:  {
      urlName: "get-file-object",
      title: "Get File Object",
      description: "Get the properties of a file or directory. the name, fileType, parentDir, path and includedFiles -- if it is a directory.",
      inputSchema: z.object({
        path: z.string().describe("The path to the file"),
        encoding: z.string().optional().default("utf8").describe("File encoding (default: 'utf8')")
      }),
      outputSchema: z.object({
        result: z.boolean().describe("An object with properties like the name, fileType, parentDir, path and includedFiles -- if it is a directory.")
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      handler: ({ path }) => {
        const result = utils.getFileObject(path);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    isDirectoryEmpty: {
      urlName: "is-directory-empty",
      title: "Is Directory Empty (Async)",
      description: "Asynchronously checks if a directory is empty. Requires read permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to the directory")
      }),
      outputSchema: z.object({
        result: z.boolean().describe("true if the directory is empty, false otherwise")
      }),
      metadata : {
        group : "fs-directory-utillities",
      },
      handler: async ({ path }) => {
        const result = await utils.isDirectoryEmpty(path);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    isDirectoryEmptySync: {
      urlName: "is-directory-empty-sync",
      title: "Is Directory Empty (Sync)",
      description: "Synchronously checks if a directory is empty. Requires read permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to the directory")
      }),
      outputSchema: z.object({
        result: z.boolean().describe("true if the directory is empty, false otherwise")
      }),
      metadata : {
        group : "fsdirectory-utillities",
      },
      handler: async ({ path }) => {
        const result = utils.isDirectoryEmptySync(path);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      },
      isSync: true,
    },
    getAllFilesFromDirectory: {
      urlName: "get-all-files-from-directory",
      title: "Get All Files From Directory (Async)",
      description: "Asynchronously retrieves a list of files in a directory, optionally filtered by extension. Requires read permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to the directory"),
        extension: z.string().optional().describe("Optional extension filter (e.g., '.txt')")
      }),
      outputSchema: z.object({
        result: z.array(z.string()).describe("Array of filenames (not full paths)")
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      handler: async ({ path, extension }) => {
        const result = await utils.getAllFilesFromDirectory(path, extension);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getAllFilesFromDirectorySync: {
      urlName: "get-all-files-from-directory-sync",
      title: "Get All Files From Directory (Sync)",
      description: "Synchronously retrieves a list of files in a directory, optionally filtered by extension. Requires read permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to the directory"),
        extension: z.string().optional().describe("Optional extension filter (e.g., '.txt')")
      }),
      outputSchema: z.object({
        result: z.array(z.string()).describe("Array of filenames (not full paths)")
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      handler: async ({ path, extension }) => {
        const result = utils.getAllFilesFromDirectorySync(path, extension);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      },
      isSync: true,
    },
    getAllDirsFromDirectory: {
      urlName: "get-all-dirs-from-directory",
      title: "Get All Dirs From Directory (Async)",
      description: "Asynchronously retrieves a list of subdirectories in a directory. Requires read permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to the directory")
      }),
      outputSchema: z.object({
        result: z.array(z.string()).describe("Array of subdirectory names")
      }),
      metadata : {
        group : "fs-directory-utillities",
      },
      handler: async ({ path }) => {
        const result = await utils.getAllDirsFromDirectory(path);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getAllDirsFromDirectorySync: {
      urlName: "get-all-dirs-from-directory-sync",
      title: "Get All Dirs From Directory (Sync)",
      description: "Synchronously retrieves a list of subdirectories in a directory. Requires read permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The path to the directory")
      }),
      outputSchema: z.object({
        result: z.array(z.string()).describe("Array of subdirectory names")
      }),
      metadata : {
        group : "fs-directory-utillities",
      },
      handler: async ({ path }) => {
        const result = utils.getAllDirsFromDirectorySync(path);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      },
      isSync: true,
    },
    getAllFilesRecursively: {
      urlName: "get-all-files-recursively",
      title: "Get All Files Recursively (Async)",
      description: "Asynchronously retrieves all files in a directory tree. Requires read permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The root directory"),
        excludedFolders: z.array(z.string()).optional().describe("Names of folders to skip")
      }),
      outputSchema: z.object({
        result: z.array(z.any()).describe("Array of file objects with name, parentDir, fileType, path, and includedFiles (if directory)")
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      handler: async ({ path, excludedFolders }) => {
        const result = await utils.getAllFilesRecursively(path, excludedFolders);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getAllFilesRecursivelySync: {
      urlName: "get-all-files-recursively-sync",
      title: "Get All Files Recursively (Sync)",
      description: "Synchronously retrieves all files in a directory tree. Requires read permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The root directory"),
        excludedFolders: z.array(z.string()).optional().describe("Names of folders to skip")
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      outputSchema: z.object({
        result: z.array(z.any()).describe("Array of file objects with name, parentDir, fileType, path, and includedFiles (if directory)")
      }),
      handler: async ({ path, excludedFolders }) => {
        const result = utils.getAllFilesRecursivelySync(path, excludedFolders);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      },
      isSync: true,
    },
    getMimeType: {
      urlName: "get-mime-type",
      title: "Get MIME Type",
      description: "Gets the MIME type for a file based on its extension.",
      inputSchema: z.object({
        file: z.string().describe("The file path or filename")
      }),
      outputSchema: z.object({
        result: z.string().describe("The MIME type (e.g., 'image/png')")
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      handler: async ({ file }) => {
        const result = utils.getMimeType(file);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getFileExtensionsByMimeType: {
      urlName: "get-file-extensions-by-mime-type",
      title: "Get File Extensions By MIME Type",
      description: "Gets all file extensions associated with a specific MIME type.",
      inputSchema: z.object({
        mimeType: z.string().describe("The MIME type (e.g., 'image/png')")
      }),
      outputSchema: z.object({
        result: z.array(z.string()).describe("Array of file extensions")
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      handler: async ({ mimeType }) => {
        const result = utils.getFileExtensionsByMimeType(mimeType);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getSpecifiedExt: {
      urlName: "get-specified-ext",
      title: "Get Specified Extension",
      description: "Finds the first extension from a list that appears in the URL or filename.",
      inputSchema: z.object({
        url: z.string().describe("The URL or filename"),
        fileExtensions: z.array(z.string()).describe("List of extensions to check (e.g., ['.txt', '.jpg'])")
      }),
      outputSchema: z.object({
        result: z.string().describe("The first matching extension found in the URL")
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      handler: async ({ url, fileExtensions }) => {
        const result = utils.getSpecifiedExt(url, fileExtensions);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    createDirPath: {
      urlName: "create-dir-path",
      title: "Create Directory Path",
      description: "Asynchronously creates a directory path if it does not exist. Requires write permission on the path.",
      inputSchema: z.object({
        pathParts: z.array(z.string()).describe("Array of path parts to join and create (e.g., ['root', 'subfolder', 'file'])")
      }),
      outputSchema: z.object({
        result: z.string().describe("The created directory path")
      }),
      metadata : {
        group : "fs-directory-utillities",
      },
      handler: async ({ pathParts }) => {
        const result = await utils.createDirPath(...pathParts);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    deleteAllFilesInDirPath: {
      urlName: "delete-all-files-in-dir-path",
      title: "Delete All Files In Directory (Async)",
      description: "Asynchronously deletes all files in a directory, optionally recursing into subdirectories. Requires delete permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The root directory"),
        recursive: z.boolean().optional().default(false).describe("Delete files in subdirectories too (default: false)")
      }),
      outputSchema: z.object({
        result: z.object({
          status: z.string(),
          result: z.boolean(),
          message: z.string()
        })
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      handler: async ({ path, recursive }) => {
        const result = await utils.deleteAllFilesInDirPath(path, recursive);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    deleteAllDirsInDirPath: {
      urlName: "delete-all-dirs-in-dir-path",
      title: "Delete All Directories In Directory (Async)",
      description: "Asynchronously deletes all subdirectories in a directory. Requires delete permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The root directory")
      }),
      outputSchema: z.object({
        result: z.object({
          status: z.string(),
          result: z.boolean(),
          message: z.string()
        })
      }),
      metadata : {
        group : "fs-directory-utillities",
      },
      handler: async ({ path }) => {
        const result = await utils.deleteAllDirsInDirPath(path);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    deleteAllInDirPath: {
      urlName: "delete-all-in-dir-path",
      title: "Delete All In Directory (Async)",
      description: "Asynchronously deletes all files and directories inside a directory. Requires delete permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The root directory")
      }),
      outputSchema: z.object({
        result: z.object({
          result: z.boolean(),
          status: z.string(),
          message: z.string()
        })
      }),
      metadata : {
        group : "fs-directory-utillities",
      },
      handler: async ({ path }) => {
        const result = await utils.deleteAllInDirPath(path);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    deleteAllEmptyFilesInDirectory: {
      urlName: "delete-all-empty-files-in-directory",
      title: "Delete All Empty Files In Directory (Async)",
      description: "Asynchronously deletes all empty files in a directory, optionally recursing. Requires delete permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The root directory"),
        recursive: z.boolean().optional().default(false).describe("Delete empty files in subdirectories too (default: false)")
      }),
      outputSchema: z.object({
        result: z.object({
          status: z.string(),
          result: z.boolean(),
          message: z.string()
        })
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      handler: async ({ path, recursive }) => {
        const result = await utils.deleteAllEmptyFilesInDirectory(path, recursive);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    deleteAllEmptyDirsInDirectory: {
      urlName: "delete-all-empty-dirs-in-directory",
      title: "Delete All Empty Directories In Directory (Async)",
      description: "Asynchronously deletes all empty directories in a directory, optionally recursing. Requires delete permission on the path.",
      inputSchema: z.object({
        path: z.string().describe("The root directory"),
        recursive: z.boolean().optional().default(false).describe("Delete empty directories in subdirectories too (default: false)")
      }),
      outputSchema: z.object({
        result: z.object({
          status: z.string(),
          result: z.boolean(),
          message: z.string()
        })
      }),
      metadata : {
        group : "fs-directory-utillities",
      },
      handler: async ({ path, recursive }) => {
        const result = await utils.deleteAllEmptyDirsInDirectory(path, recursive);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    mimeTypes: {
      urlName: "mime-types",
      title: "MIME Types Map",
      description: "A constant object mapping file extensions to their MIME types (e.g., 'jpg' -> 'image/jpeg').",
      inputSchema: z.object({}),
      outputSchema: z.object({
        result: z.record(z.string()).describe("Object mapping file extensions to MIME types")
      }),
      metadata : {
        group : "fs-file-utillities",
      },
      handler: async () => {
        const result = utils.mimeTypes;
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getAppDataDirPath: {
      urlName: "get-app-data-dir-path",
      title: "Get Application Data Directory Path",
      description: "Returns the platform-specific path for application data storage (e.g., %APPDATA% on Windows, ~/.config on Linux).",
      inputSchema: z.object({}),
      outputSchema: z.object({
        result: z.string().describe("The application data directory path")
      }),
      metadata : {
        group : "fs-directory-utillities",
      },
      handler: async () => {
        const result = utils.getAppDataDirPath();
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },

    // GENERAL
    generateUuid: {
      urlName: "generate-uuid",
      title: "Generate UUID",
      description: "Generates a pseudo-unique string identifier (UUID-like) using a configurable radix (default 16).",
      inputSchema: z.object({
        radix: z.number().optional().default(16).describe("The radix for the generated characters (default 16)")
      }),
      outputSchema: z.object({
        result: z.string().describe("A pseudo-unique identifier string")
      }),
      metadata : {
        group : "general-utillities",
      },
      handler: async ({ radix }) => {
        const result = utils.generateUuid(radix);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    slowDown: {
      urlName: "slow-down",
      title: "Slow Down",
      description: "Pauses execution for a specified amount of time (in milliseconds).",
      inputSchema: z.object({
        timeDelay: z.number().optional().default(7747).describe("The delay in milliseconds (default: 7747)")
      }),
      outputSchema: z.object({
        result: z.null().describe("Resolves after the delay")
      }),
      metadata : {
        group : "general-utillities",
      },
      handler: async ({ timeDelay }) => {
        const result = await utils.slowDown(timeDelay);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    enumerate: {
      urlName: "enumerate",
      title: "Enumerate",
      description: "Formats an array of strings into a grammatically correct list (e.g., 'a, b, or c').",
      inputSchema: z.object({
        items: z.array(z.string()).describe("Array of strings to enumerate"),
        useAnd: z.boolean().optional().default(false).describe("Use 'and' as last connector (default: 'or')")
      }),
      outputSchema: z.object({
        result: z.string().describe("Grammatically formatted list string")
      }),
      metadata : {
        group : "general-utillities",
      },
      handler: async ({ items, useAnd }) => {
        return { content: [{ type: "text", text: utils.enumerate(items, useAnd) }] };
      }
    },
    getRandomNumber: {
      urlName: "get-random-number",
      title: "Get Random Number",
      description: "Generates a random integer within a range [min, max).",
      inputSchema: z.object({
        min: z.number().optional().default(0).describe("The lower bound (inclusive)"),
        max: z.number().optional().default(10).describe("The upper bound (exclusive)")
      }),
      outputSchema: z.object({
        result: z.number().describe("Random integer in the range [min, max)")
      }),
      metadata : {
        group : "general-utillities",
      },
      handler: async ({ min, max }) => {
        const result = utils.getRandomNumber(min, max);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getNumericValue: {
      urlName: "get-numeric-value",
      title: "Get Numeric Value",
      description: "Extracts the first numeric value (integer or decimal, optionally with commas) from a string.",
      inputSchema: z.object({
        str: z.string().describe("The input string")
      }),
      outputSchema: z.object({
        result: z.number().describe("The extracted numeric value, or NaN if not found")
      }),
      metadata : {
        group : "general-utillities",
      },
      handler: async ({ str }) => {
        const result = utils.getNumericValue(str);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getValidatedStringValue: {
      urlName: "get-validated-string-value",
      title: "Get Validated String Value",
      description: "Converts a value to a string, but returns null if input is null or undefined.",
      inputSchema: z.object({
        input: z.any().describe("The value to convert")
      }),
      outputSchema: z.object({
        result: z.string().nullable().describe("String representation of input, or null if input was null/undefined")
      }),
      metadata : {
        group : "general-utillities",
      },
      handler: async ({ input }) => {
        const result = utils.getValidatedStringValue(input);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    replaceWithForwardSlash: {
      urlName: "replace-with-forward-slash",
      title: "Replace With Forward Slash",
      description: "Replaces all backslashes with forward slashes in a string.",
      inputSchema: z.object({
        str: z.string().describe("The input string")
      }),
      outputSchema: z.object({
        result: z.string().describe("String with forward slashes")
      }),
      metadata : {
        group : "general-utillities",
      },
      handler: async ({ str }) => {
        const result = utils.replaceWithForwardSlash(str);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },

    
  

    // NODE-UTILS
    spawnOnChildProcess: {
      urlName: "spawn-on-child-process",
      title: "Spawn Node Child Process",
      description: "Spawns a new Node.js child process by forking the specified JavaScript file. Sets up default listeners for message, error, and close events.",
      inputSchema: z.object({
        filePath: z.string().describe("The path to the Node.js script to fork")
      }),
      outputSchema: z.object({
        result: z.string().describe("Child process spawned successfully")
      }),
      metadata : {
        group : "node-utillities",
      },
      handler: ({ filePath }) => {
        const result = utils.spawnOnChildProcess(filePath);
        return { content: [{ type: "text", text: JSON.stringify({ result: "Child process spawned" }) }] };
      }
    },
    runSystemCommand: {
      urlName: "run-system-command",
      title: "Run System Command",
      description: "Executes a system binary within a restricted working directory with security checks. Verifies execution path boundaries, sanitizes arguments, and strips environment variables.",
      inputSchema: z.object({
        command: z.string().describe("The shell command to execute (e.g., 'echo hello')"),
        cwd: z.string().describe("The target working directory where the execution boundary should be enforced")
      }),
      outputSchema: z.object({
        result: z.object({
          statusOk: z.boolean().describe("true if command executed successfully"),
          message: z.string().describe("Status message"),
          stdout: z.string().optional().describe("Standard output"),
          stderr: z.string().optional().describe("Standard error"),
          command: z.string().optional().describe("The command executed")
        }).describe("Result object indicating success or failure")
      }),
      metadata : {
        group : "node-utillities",
      },
      handler: async ({ command, cwd }) => {
        const result = await utils.runSystemCommand(command, cwd);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },

    // JSON
    parseValidatedJSON: {
      urlName: "parse-validated-json",
      title: "Parse Validated JSON",
      description: "Attempts to parse a string as JSON. Returns the original input if parsing fails (handles invalid JSON gracefully).",
      inputSchema: z.object({
        input: z.string().describe("The string to parse")
      }),
      outputSchema: z.object({
        result: z.any().describe("Parsed JSON object, or the original input if parsing failed")
      }),
      metadata : {
        group : "json-utillities",
      },
      handler: async ({ input }) => {
        const result = utils.parseValidatedJSON(input);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    createJsonFileObject: {
      urlName: "create-json-file-object",
      title: "Create JSON File Object",
      description: "Creates a JSON file manager object for storing and retrieving data from a JSON file. Creates the file with an empty array if it doesn't exist.",
      inputSchema: z.object({
        path: z.string().describe("The directory path where the JSON file will be stored"),
        fileName: z.string().describe("The name of the JSON file")
      }),
      outputSchema: z.object({
        result: z.object({
          getSavedData: z.function().describe("Async function to retrieve stored data"),
          addData: z.function().describe("Async function to add data to stored array"),
          clearData: z.function().describe("Async function to clear all data")
        })
      }),
      metadata : {
        group : "json-utillities",
      },
      handler: async ({ path, fileName }) => {
        const result = await utils.createJsonFileObject(path, fileName);
        return { content: [{ type: "text", text: JSON.stringify({ result: "JSON file object created" }) }] };
      }
    },

    // OBJECTS-ARRAY
    getValidatedPropValues: {
      urlName: "get-validated-prop-values",
      title: "Get Validated Property Values",
      description: "Gets validated property values from a nested object by traversing the specified property names path.",
      inputSchema: z.object({
        objStr: z.string().describe("JSON string of the object"),
        propNames: z.array(z.string()).describe("Array of property names to traverse")
      }),
      outputSchema: z.object({
        result: z.any().describe("The property values at the specified path")
      }),
      metadata : {
        group : "objects-array-utillities",
      },
      handler: ({ objStr, propNames }) => {
        const result = utils.getValidatedPropValues(JSON.parse(objStr), propNames);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    isObjectInArray: {
      urlName: "is-object-in-array",
      title: "Is Object In Array",
      description: "Checks if an object exists in an array. Optionally checks only specific keys for comparison.",
      inputSchema: z.object({
        objStr: z.string().describe("JSON string of the object to find"),
        arrStr: z.string().describe("JSON string of the array to search"),
        keysToCheck: z.array(z.string()).optional().describe("Specific keys to compare")
      }),
      outputSchema: z.object({
        result: z.boolean().describe("true if object exists in array, false otherwise")
      }),
      metadata : {
        group : "objects-array-utillities",
      },
      handler: async ({ objStr, arrStr, keysToCheck }) => {
        const result = utils.isObjectInArray(JSON.parse(objStr), JSON.parse(arrStr), keysToCheck);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getAllObjectKeys: {
      urlName: "get-all-object-keys",
      title: "Get All Object Keys",
      description: "Gets all unique keys from an array of objects.",
      inputSchema: z.object({
        arrStr: z.string().describe("JSON string of array of objects")
      }),
      outputSchema: z.object({
        result: z.array(z.string()).describe("Array of unique key names")
      }),
      metadata : {
        group : "objects-array-utillities",
      },
      handler: async ({ arrStr }) => {
        const result = utils.getAllObjectKeys(JSON.parse(arrStr));
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    sortObjectsByDate: {
      urlName: "sort-objects-by-date",
      title: "Sort Objects By Date",
      description: "Sorts an array of objects by a date property (default: 'dateCreated').",
      inputSchema: z.object({
        arrStr: z.string().describe("JSON string of array of objects"),
        dateProp: z.string().optional().default("dateCreated").describe("Date property name (default: 'dateCreated')"),
        ascending: z.boolean().optional().default(true).describe("Sort ascending (default: true)")
      }),
      outputSchema: z.object({
        result: z.array(z.any()).describe("Sorted array of objects")
      }),
      metadata : {
        group : "objects-array-utillities",
      },
      handler: async ({ arrStr, dateProp, ascending }) => {
        const result = utils.sortObjectsByDate(JSON.parse(arrStr), dateProp, ascending);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    sortObjectsByPropName: {
      urlName: "sort-objects-by-prop-name",
      title: "Sort Objects By Property Name",
      description: "Sorts an array of objects by a specific property.",
      inputSchema: z.object({
        arrStr: z.string().describe("JSON string of array of objects"),
        propName: z.string().describe("Property name to sort by"),
        ascending: z.boolean().optional().default(true).describe("Sort ascending (default: true)")
      }),
      outputSchema: z.object({
        result: z.array(z.any()).describe("Sorted array of objects")
      }),
      metadata : {
        group : "objects-array-utillities",
      },
      handler: async ({ arrStr, propName, ascending }) => {
        const result = utils.sortObjectsByPropName(JSON.parse(arrStr), propName, ascending);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    objectToString: {
      urlName: "object-to-string",
      title: "Object To String",
      description: "Converts an object to a readable string format with key-value pairs separated by a delimiter.",
      inputSchema: z.object({
        objStr: z.string().describe("JSON string of the object"),
        delimiter: z.string().optional().default(", ").describe("Separator between key-value pairs (default: ', ')")
      }),
      outputSchema: z.object({
        result: z.string().describe("Readable string representation of the object")
      }),
      metadata : {
        group : "objects-array-utillities",
      },
      handler: async ({ objStr, delimiter }) => {
        const result = utils.objectToString(JSON.parse(objStr), delimiter);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    isObjectUnique: {
      urlName: "is-object-unique",
      title: "Is Object Unique",
      description: "Checks if an object is unique in an array. Optionally checks only specific keys.",
      inputSchema: z.object({
        objStr: z.string().describe("JSON string of the object to check"),
        arrStr: z.string().describe("JSON string of the array"),
        keys: z.array(z.string()).optional().describe("Specific keys to compare")
      }),
      outputSchema: z.object({
        result: z.boolean().describe("true if object is unique in array")
      }),
      metadata : {
        group : "objects-array-utillities",
      },
      handler: async ({ objStr, arrStr, keys }) => {
        const result = utils.isObjectUnique(JSON.parse(objStr), JSON.parse(arrStr), keys);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    filterUnlistedObjects: {
      urlName: "filter-unlisted-objects",
      title: "Filter Unlisted Objects",
      description: "Filters out objects that are already in a local list based on key comparison.",
      inputSchema: z.object({
        localObjectsStr: z.string().describe("JSON string of local objects"),
        allObjectsStr: z.string().describe("JSON string of all objects"),
        keys: z.array(z.string()).optional().describe("Specific keys to compare")
      }),
      outputSchema: z.object({
        result: z.array(z.any()).describe("Filtered array of objects not in local list")
      }),
      metadata : {
        group : "objects-array-utillities",
      },
      handler: async ({ localObjectsStr, allObjectsStr, keys }) => {
        const result = utils.filterUnlistedObjects(JSON.parse(localObjectsStr), JSON.parse(allObjectsStr), keys);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    shuffleArr: {
      urlName: "shuffle-arr",
      title: "Shuffle Array",
      description: "Shuffles an array using the Fisher-Yates algorithm.",
      inputSchema: z.object({
        arrStr: z.string().describe("JSON string of the array")
      }),
      outputSchema: z.object({
        result: z.array(z.any()).describe("Shuffled array")
      }),
      metadata : {
        group : "objects-array-utillities",
      },
      handler: async ({ arrStr }) => {
        const result = utils.shuffleArr(JSON.parse(arrStr));
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    objectCompare: {
      urlName: "object-compare",
      title: "Object Compare",
      description: "Compares two objects for equality.",
      inputSchema: z.object({
        targetStr: z.string().describe("JSON string of target object"),
        sourceStr: z.string().describe("JSON string of source object")
      }),
      outputSchema: z.object({
        result: z.boolean().describe("true if objects are equal")
      }),
      metadata : {
        group : "objects-array-utillities",
      },
      handler: async ({ targetStr, sourceStr }) => {
        const result = utils.objectCompare(JSON.parse(targetStr), JSON.parse(sourceStr));
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    assignProps: {
      urlName: "assign-props",
      title: "Assign Properties",
      description: "Recursively assigns properties from source to target object.",
      inputSchema: z.object({
        targetStr: z.string().describe("JSON string of target object"),
        sourceStr: z.string().describe("JSON string of source object")
      }),
      outputSchema: z.object({
        result: z.any().describe("Target object with assigned properties")
      }),
      metadata : {
        group : "objects-array-utillities",
      },
      handler: async ({ targetStr, sourceStr }) => {
        const result = utils.assignProps(JSON.parse(targetStr), JSON.parse(sourceStr));
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    deepMerge: {
      urlName: "deep-merge",
      title: "Deep Merge",
      description: "Deep merges multiple objects together. Properties from later objects override earlier ones.",
      inputSchema: z.object({
        targetStr: z.string().describe("JSON string of base/target object"),
        sourceStr: z.string().describe("JSON string of source object to merge in")
      }),
      outputSchema: z.object({
        result: z.any().describe("Deep merged object")
      }),
      metadata : {
        group : "objects-array-utillities",
      },
      handler: async ({ targetStr, sourceStr }) => {
        const result = utils.deepMerge(JSON.parse(targetStr), JSON.parse(sourceStr));
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },

    // STRING
    toUrl: {
      urlName: "to-url",
      title: "To URL Slug",
      description: "Converts a string to a URL-friendly slug (lowercase, hyphens for spaces, removes special characters).",
      inputSchema: z.object({
        str: z.string().describe("The input string to convert")
      }),
      outputSchema: z.object({
        result: z.string().describe("URL-friendly slug string")
      }),
      metadata : {
        group : "string-utillities",
      },
      handler: async ({ str }) => {
        const result = utils.toUrl(str);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    toCapitalize: {
      urlName: "to-capitalize",
      title: "To Capitalize",
      description: "Capitalizes the first letter of a string.",
      inputSchema: z.object({
        str: z.string().describe("The input string")
      }),
      outputSchema: z.object({
        result: z.string().describe("String with first letter capitalized")
      }),
      metadata : {
        group : "string-utillities",
      },
      handler: async ({ str }) => {
        const result = utils.toCapitalize(str);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    toCapitalizeAll: {
      urlName: "to-capitalize-all",
      title: "To Capitalize All",
      description: "Capitalizes the first letter of each word in a string.",
      inputSchema: z.object({
        str: z.string().describe("The input string")
      }),
      outputSchema: z.object({
        result: z.string().describe("String with each word capitalized")
      }),
      metadata : {
        group : "string-utillities",
      },
      handler: async ({ str }) => {
        const result = utils.toCapitalizeAll(str);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    toNormalString: {
      urlName: "to-normal-string",
      title: "To Normal String",
      description: "Converts camelCase, snake_case, or kebab-case to normal string (title case with spaces).",
      inputSchema: z.object({
        str: z.string().describe("The input string"),
        previousFormat: z.enum(["camel-case", "underscored", "kebab-case"]).optional().describe("Previous format: 'camel-case', 'underscored', or 'kebab-case'")
      }),
      metadata : {
        group : "string-utillities",
      },
      outputSchema: z.object({
        result: z.string().describe("Normal string with title case words")
      }),
      handler: async ({ str, previousFormat }) => {
        const result = utils.toNormalString(str, previousFormat);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getInitials: {
      urlName: "get-initials",
      title: "Get Initials",
      description: "Gets initials from a full name string (e.g., 'John Doe' -> 'JD').",
      inputSchema: z.object({
        str: z.string().describe("The name string")
      }),
      outputSchema: z.object({
        result: z.string().describe("Initials string (e.g., 'JD')")
      }),
      metadata : {
        group : "string-utillities",
      },
      handler: async ({ str }) => {
        const result = utils.getInitials(str);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    toCamelCase: {
      urlName: "to-camel-case",
      title: "To Camel Case",
      description: "Converts a string to camelCase. Supports URL format (hyphen separator) and initial capitalization options.",
      inputSchema: z.object({
        str: z.string().describe("The input string"),
        url: z.boolean().optional().describe("Use hyphen separator for URL format"),
        initialCap: z.boolean().optional().describe("First letter capitalized")
      }),
      outputSchema: z.object({
        result: z.string().describe("CamelCase string")
      }),
      metadata : {
        group : "string-utillities",
      },
      handler: async ({ str, url, initialCap }) => {
        const result = utils.toCamelCase(str, url, initialCap);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },

    // URL
    urlConstructor: {
      urlName: "url-constructor",
      title: "URL Constructor",
      description: "Reconstructs a URL from its parts (protocol, domain, path, etc.).",
      inputSchema: z.object({
        urlString: z.string().describe("The URL to process")
      }),
      outputSchema: z.object({
        result: z.string().describe("Reconstructed URL string")
      }),
      metadata : {
        group : "url-utillities",
      },
      handler: async ({ urlString }) => {
        const result = utils.urlConstructor(urlString);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    objectToQueryString: {
      urlName: "object-to-query-string",
      title: "Object To Query String",
      description: "Converts a JavaScript object to a URL query string (e.g., {a: 1, b: 2} -> 'a=1&b=2').",
      inputSchema: z.object({
        obj: z.string().describe("JSON string of the object")
      }),
      outputSchema: z.object({
        result: z.string().describe("Query string (e.g., 'a=1&b=2')")
      }),
      metadata : {
        group : "url-utillities",
      },
      handler: ({ obj }) => {
        const result = utils.objectToQueryString(JSON.parse(obj));
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    queryStringToObject: {
      urlName: "query-string-to-object",
      title: "Query String To Object",
      description: "Converts a query string to a JavaScript object (with or without leading '?').",
      inputSchema: z.object({
        queryString: z.string().describe("The query string (with or without leading '?')")
      }),
      outputSchema: z.object({
        result: z.record(z.any()).describe("JavaScript object parsed from query string")
      }),
      metadata : {
        group : "url-utillities",
      },
      handler: async ({ queryString }) => {
        const result = utils.queryStringToObject(queryString);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    urlToQueryStringObject: {
      urlName: "url-to-query-string-object",
      title: "URL To Query String Object",
      description: "Parses a URL and extracts query parameters as an object.",
      inputSchema: z.object({
        urlString: z.string().describe("The full URL"),
        trailingSlash: z.boolean().optional().describe("Add trailing slash to path")
      }),
      outputSchema: z.object({
        result: z.object({
          path: z.string().optional(),
          query: z.record(z.any()).optional(),
          protocol: z.string().optional(),
          host: z.string().optional(),
          hostname: z.string().optional()
        }).describe("Object with path, query parameters, and URL components")
      }),
      metadata : {
        group : "url-utillities",
      },
      handler: async ({ urlString, trailingSlash }) => {
        const result = utils.urlToQueryStringObject(urlString, trailingSlash);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    objectToDotNotation: {
      urlName: "object-to-dot-notation",
      title: "Object To Dot Notation",
      description: "Converts a nested object to dot notation (e.g., {a: {b: 1}} -> {a.b: 1}).",
      inputSchema: z.object({
        obj: z.string().describe("JSON string of the object")
      }),
      outputSchema: z.object({
        result: z.record(z.any()).describe("Object with dot notation keys")
      }),
      metadata : {
        group : "url-utillities",
      },
      handler: ({ obj }) => {
        const result = utils.objectToDotNotation(JSON.parse(obj));
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    dotNotationToObject: {
      urlName: "dot-notation-to-object",
      title: "Dot Notation To Object",
      description: "Converts dot notation back to a nested object (e.g., {a.b: 1} -> {a: {b: 1}}).",
      inputSchema: z.object({
        dotNotationStr: z.string().describe("JSON string of dot notation object")
      }),
      outputSchema: z.object({
        result: z.record(z.any()).describe("Nested JavaScript object")
      }),
      metadata : {
        group : "url-utillities",
      },
      handler: ({ dotNotationStr }) => {
        const result = utils.dotNotationToObject(JSON.parse(dotNotationStr));
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    getDomain: {
      urlName: "get-domain",
      title: "Get Domain",
      description: "Extracts the domain from a URL (removes protocol and www).",
      inputSchema: z.object({
        url: z.string().describe("The URL")
      }),
      outputSchema: z.object({
        result: z.string().describe("Domain string")
      }),
      metadata : {
        group : "url-utillities",
      },
      handler: async ({ url }) => {
        const result = utils.getDomain(url);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    },
    checkSubDomain: {
      urlName: "check-sub-domain",
      title: "Check Sub Domain",
      description: "Checks if a URL contains the domain of another URL (subdomain detection).",
      inputSchema: z.object({
        mainUrl: z.string().describe("The main URL"),
        subUrl: z.string().describe("The URL to check")
      }),
      outputSchema: z.object({
        result: z.boolean().describe("true if subUrl is a subdomain of mainUrl")
      }),
      metadata : {
        group : "url-utillities",
      },
      handler: async ({ mainUrl, subUrl }) => {
        const result = utils.checkSubDomain(mainUrl, subUrl);
        return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
      }
    }
  };

  return mcpTools;
}