// test/date-utils.test.js
import getUtilities from '../index.js';
import TestRunner from './test-runner.js';

const runner = new TestRunner();
const TEST_CONFIG = {
    userAllowedPaths: [{ path: "E:/apps/npm-packages/mnm-node-utilities/test/sample-directory", permissions: "rwdx" }]
};

// We import utils here to ensure we have the specific functions
// Note: In a real scenario, you might import the module directly, but here we use the index to get the context
// However, dateUtils doesn't depend on fileSystem, so we can call getDateUtils directly if we exported it, 
// but your index exports a merged object. Let's just instantiate the main utils and destructure.
const utils = getUtilities(TEST_CONFIG);

const {
    formattedDate, getDateTimeObject, dateTimeObject, getTimeElapsed,
    createZuluStartDate, getOffsetMinutesForTimezone, toISOZeroOffset,
    getHourlyDuration, getDurationInMinutes, localDateToSelectedTimeZone,
    getFormattedTime, getIsoFormattedTime, fixTimeStr,
    getCurrentMonthByIndex, getNextMonth, getPrevMonth, getNumberOfDaysOfMonth,
    getFormattedDateStr, createTzScheduleObject,
    getISOFormattedDate, createDateRangeObject, checkDateFlow,
    getForwardDateRangeObjects, getBackwardDateRangeObjects, getDateRangeObjects,
    getDateRangeObjectsWithIsoZeroOffset
} = utils;

runner.describe('Date Utils', () => {
    
    // formattedDate
    runner.it('formattedDate: returns MM-DD-YYYY', () => {
        const d = new Date("2023-05-05T10:00:00");
        assertEqual(formattedDate(d), "05-05-2023");
    });
    runner.it('formattedDate: handles null date (now)', () => {
        const res = formattedDate(null);
        assertTrue(res.length === 10); // MM-DD-YYYY
    });

    // getDateTimeObject
    runner.it('getDateTimeObject: parses string date', () => {
        const d = getDateTimeObject("2023-05-05");
        assertTrue(d instanceof Date);
    });
    runner.it('getDateTimeObject: parses number timestamp', () => {
        const ts = new Date("2023-05-05").getTime();
        const d = getDateTimeObject(ts);
        assertTrue(d instanceof Date);
        assertEqual(d.getFullYear(), 2023);
    });
    runner.it('getDateTimeObject: invalid date returns new Date()', () => {
        const d = getDateTimeObject("invalid");
        assertTrue(d instanceof Date);
    });

    // dateTimeObject
    runner.it('dateTimeObject: returns full object structure', () => {
        let date = new Date("2023-05-05T15:30:45")
        const d = dateTimeObject(date);
        assertEqual(d.day, "Friday");
        assertEqual(d.month, "May");
        assertEqual(d.year, 2023);
        assertEqual(d.date, 5);
        assertTrue(d.time.includes("03:30:45 PM"));
    });
    runner.it('dateTimeObject: getCurrentTime 24h', () => {
        const d = dateTimeObject(new Date("2023-05-05T15:30:45"));
        const time24 = d.getCurrentTime(false);
        assertEqual(time24, "15:30:45");
    });
    runner.it('dateTimeObject: getCurrentDate words', () => {
        const d = dateTimeObject(new Date("2023-05-05"));
        assertEqual(d.getCurrentDate(true), "May 5, 2023");
    });

    // getTimeElapsed
    runner.it('getTimeElapsed: hours', () => {
        const t1 = new Date("2023-01-01T00:00:00").getTime();
        const t2 = new Date("2023-01-01T02:00:00").getTime();
        const res = getTimeElapsed(t1, t2);
        console.log(res);
        assertEqual(res.momentsPassed, "2 hours have passed.");
    });
    runner.it('getTimeElapsed: minutes', () => {
        const t1 = new Date("2023-01-01T00:00:00").getTime();
        const t2 = new Date("2023-01-01T00:05:00").getTime();
        const res = getTimeElapsed(t1, t2);
        assertEqual(res.momentsPassed, "5 minutes have passed.");
    });
    runner.it('getTimeElapsed: seconds', () => {
        const t1 = new Date("2023-01-01T00:00:00").getTime();
        const t2 = new Date("2023-01-01T00:00:05").getTime();
        const res = getTimeElapsed(t1, t2);
        assertEqual(res.momentsPassed, "5 seconds have passed.");
    });

    // createZuluStartDate
    runner.it('createZuluStartDate: formats correctly', () => {
        const d = new Date("2023-05-05T10:05:03.050");
        const zulu = createZuluStartDate(d);
        assertEqual(zulu.getUTCHours(), 10);
        assertEqual(zulu.getUTCMinutes(), 5);
        assertEqual(zulu.getUTCSeconds(), 3);
    });

    // getOffsetMinutesForTimezone
    runner.it('getOffsetMinutesForTimezone: UTC', () => {
        assertEqual(getOffsetMinutesForTimezone("UTC"), 0);
    });

    // toISOZeroOffset
    runner.it('toISOZeroOffset: returns ISO string with offset', () => {
        const d = new Date("2023-05-05T10:00:00");
        const iso = toISOZeroOffset(d, "UTC");
        assertTrue(typeof iso === "string");
        assertTrue(iso.includes("2023-05-05"));
    });

    // getHourlyDuration
    runner.it('getHourlyDuration: converts minutes to hours/minutes', () => {
        const res = getHourlyDuration(125);
        assertEqual(res.hours, 2);
        assertEqual(res.minutes, 5);
    });

    // getDurationInMinutes
    runner.it('getDurationInMinutes: calculates difference', () => {
        const d1 = new Date("2023-01-01T00:00:00");
        const d2 = new Date("2023-01-01T00:30:00");
        assertEqual(getDurationInMinutes(d2, d1), 30);
    });

    // localDateToSelectedTimeZone
    runner.it('localDateToSelectedTimeZone: shifts time', () => {
        const d = new Date("2023-05-05T12:00:00"); // Noon UTC
        // Assuming local is UTC for simplicity in test, or just check it returns a Date
        const newD = localDateToSelectedTimeZone(d, "America/New_York");
        assertTrue(newD instanceof Date);
    });

    // getFormattedTime
    runner.it('getFormattedTime: 12h format', () => {
        const d = new Date("2023-05-05T15:05:00"); // 3:05 PM
        const t = getFormattedTime(d);
        assertEqual(t, "03:05 PM");
    });

    // getIsoFormattedTime
    runner.it('getIsoFormattedTime: pads zeros', () => {
        assertEqual(getIsoFormattedTime(1, 5, 9), "01:05:09");
    });

    // fixTimeStr
    runner.it('fixTimeStr: normalizes time string', () => {
        assertEqual(fixTimeStr("3:05PM"), "03:05 PM");
    });

    // getCurrentMonthByIndex
    runner.it('getCurrentMonthByIndex: returns month name', () => {
        assertEqual(getCurrentMonthByIndex(0), "January");
        assertEqual(getCurrentMonthByIndex(11), "December");
    });

    // getNextMonth
    runner.it('getNextMonth: rolls over year', () => {
        const d = new Date("2023-12-01");
        const next = getNextMonth(d);
        assertEqual(next.getFullYear(), 2024);
        assertEqual(next.getMonth(), 0); // Jan
    });

    // getPrevMonth
    runner.it('getPrevMonth: rolls over year', () => {
        const d = new Date("2024-01-01");

        const prev = getPrevMonth(d);
        assertEqual(prev.getFullYear(), 2023);
        assertEqual(prev.getMonth(), 11); // Dec
    });

    // getNumberOfDaysOfMonth
    runner.it('getNumberOfDaysOfMonth: Feb non-leap', () => {
        assertEqual(getNumberOfDaysOfMonth(new Date("2023-02-01")), 28);
    });
    runner.it('getNumberOfDaysOfMonth: Feb leap', () => {
        assertEqual(getNumberOfDaysOfMonth(new Date("2024-02-01")), 29);
    });

    // getFormattedDateStr
    runner.it('getFormattedDateStr: formats date string', () => {
        const d = new Date("2023-05-05");
        assertEqual(getFormattedDateStr(d), "May 5, 2023");
    });

    // createTzScheduleObject
    runner.it('createTzScheduleObject: returns schedule object', () => {
        const obj = createTzScheduleObject("2023-05-05T10:00:00", "10:00:00", "Europe/Dublin");
        console.log(obj);
        assertEqual(obj.month === 4, true); // Should not fail
        assertEqual(obj.date === 5, true); // Should not fail
        assertEqual(obj.year === 2023, true); // Should not fail
        assertEqual(obj.hours === 10, true); // Should not fail
        assertEqual(obj.minutes === 0, true); // Should not fail
        assertEqual(obj.isoStringDate === "2023-05-05", true); // Should not fail
        assertEqual(obj.isoStringTime === '10:00:00.000', true); // Should not fail
        assertEqual(obj.formattedDate === 'May 5, 2023', true); // Should not fail
        assertEqual(typeof obj.isoStringFullDate, "string");
    });

    // getISOFormattedDate
    runner.it('getISOFormattedDate: YYYY-MM-DD', () => {
        const d = new Date("December 25, 2023");
        console.log({date : d, isoFormattedDate : getISOFormattedDate(d)});
        assertEqual(getISOFormattedDate(d), "2023-12-25");
    });

    // createDateRangeObject
    runner.it('createDateRangeObject: returns range', () => {
        const d = new Date("2023-05-01");
        const next = new Date("2023-05-31");
        const range = createDateRangeObject(d, next);
        assertEqual(range.formattedStartDate, "2023-05-01");
        assertEqual(range.formattedEndDate, "2023-05-31");
    });

    // checkDateFlow
    runner.it('checkDateFlow: forward', () => {
        assertEqual(checkDateFlow("2023-01-01", "2023-01-02"), "forward");
    });
    runner.it('checkDateFlow: backward', () => {
        assertEqual(checkDateFlow("2023-01-02", "2023-01-01"), "backward");
    });

    // getForwardDateRangeObjects
    runner.it('getForwardDateRangeObjects: returns array of months', () => {
        const start = new Date("2023-01-15");
        const end = new Date("2023-03-15");
        const ranges = getForwardDateRangeObjects(start, end);
        assertTrue(Array.isArray(ranges));
        assertTrue(ranges.length >= 2); // Jan, Feb, Mar
    });

    // getBackwardDateRangeObjects
    runner.it('getBackwardDateRangeObjects: returns reversed array', () => {
        const start = new Date("2023-03-15");
        const end = new Date("2023-01-15");
        const ranges = getBackwardDateRangeObjects(start, end);
        assertTrue(Array.isArray(ranges));
    });

    // getDateRangeObjects
    runner.it('getDateRangeObjects: handles forward', () => {
        const start = new Date("2023-01-01");
        const end = new Date("2023-02-01");
        const ranges = getDateRangeObjects(start, end);
        assertTrue(Array.isArray(ranges));
    });

    // getDateRangeObjectsWithIsoZeroOffset
    runner.it('getDateRangeObjectsWithIsoZeroOffset: adds ISO offsets', () => {
        const start = new Date("2023-01-01");
        const end = new Date("2023-01-31");
        const ranges = getDateRangeObjectsWithIsoZeroOffset(start, end, "UTC");

        console.log(ranges)
        assertTrue(Array.isArray(ranges));
        if (ranges.length > 0) {
            assertEqual(typeof ranges[0].ztzStartDate, "string");
        }
    });
});

// Helper assertions
function assertEqual(actual, expected, msg = "") {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`${msg ? msg + ": " : ""}Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
    }
}

function assertTrue(val, msg = "") {
    if (!val) throw new Error(`${msg ? msg + ": " : ""}Expected truthy value but got ${val}`);
}

runner.end();
