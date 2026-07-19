import assert from 'assert';
import getDateTimeUtils from '../date-utils.js';

const utils = getDateTimeUtils();

// Helper to run tests
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (e) {
    console.error(`✗ ${name}`);
    console.error(`  Error: ${e.message}`);
    console.error(`  Stack: ${e.stack}`);
    failed++;
  }
}

// Start Tests
console.log('Running Date Utils Tests...\n');

test('formattedDate: returns MM-DD-YYYY format', () => {
  const date = new Date('2023-05-01T12:00:00');
  const result = utils.formattedDate(date);
  assert.strictEqual(result, '05-01-2023');
});

test('formattedDate: pads single digit month and day', () => {
  const date = new Date('2023-01-09T12:00:00');
  const result = utils.formattedDate(date);
  assert.strictEqual(result, '01-09-2023');
});

test('formattedDate: defaults to current date if null', () => {
  const now = new Date();
  const result = utils.formattedDate(null);
  const [month, day, year] = result.split('-').map(Number);
  
  assert.strictEqual(year, now.getFullYear());
  assert.strictEqual(month, now.getMonth() + 1);
  assert.strictEqual(day, now.getDate());
});

test('getDateTimeObect: parses ISO string', () => {
  const result = utils.getDateTimeObect('2023-10-05T12:00:00');
  assert.ok(result instanceof Date);
  assert.strictEqual(result.getFullYear(), 2023);
  assert.strictEqual(result.getMonth(), 9); // October is 9 (0-indexed)
  assert.strictEqual(result.getDate(), 5);
});

test('getDateTimeObect: parses timestamp', () => {
  const ts = new Date('2023-10-05T12:00:00').getTime();
  const result = utils.getDateTimeObect(ts);
  assert.ok(result instanceof Date);
});

test('getDateTimeObect: returns current Date on invalid input', () => {
  const result = utils.getDateTimeObect('invalid-date');
  assert.ok(result instanceof Date);
});

test('getDateTimeObect: returns current Date on null', () => {
  const result = utils.getDateTimeObect(null);
  assert.ok(result instanceof Date);
});

test('getDateTimeObect: returns current Date on undefined', () => {
  const result = utils.getDateTimeObect(undefined);
  assert.ok(result instanceof Date);
});

test('dateTimeObject: returns object with correct properties', () => {
  const date = new Date('2023-10-05T14:30:45.123Z');
  const result = utils.dateTimeObject(date);
  
  assert.ok(result.year);
  assert.ok(result.month);
  assert.ok(result.date);
  assert.ok(result.day);
  assert.ok(result.time);
  assert.ok(result.fullDate);
  assert.ok(result.fullDateTime);
});

test('dateTimeObject: time is in 12-hour format by default', () => {
  const date = new Date('2023-10-05T14:30:00');
  const result = utils.dateTimeObject(date);
  // 14:30 UTC is 09:30 AM EST (example). Just check format.
  assert.match(result.time, /^\d{2}:\d{2}:\d{2} (AM|PM)$/);
});

test('dateTimeObject: getCurrentTime(false) returns 24-hour format', () => {
  const date = new Date('2023-10-05T14:30:00');
  const result = utils.dateTimeObject(date);
  const time24 = result.getCurrentTime(false);
  assert.match(time24, /^\d{2}:\d{2}:\d{2}$/);
});

test('getTimeElapsed: calculates seconds', () => {
  const t1 = Date.now();
  const t2 = Date.now() + 1500; // 1.5 seconds
  const result = utils.getTimeElapsed(t1, t2);
  assert.ok(result.timeElapsed.includes('seconds'));
});

test('getTimeElapsed: calculates minutes', () => {
  const t1 = Date.now();
  const t2 = Date.now() + 90000; // 1.5 minutes
  const result = utils.getTimeElapsed(t1, t2);
  assert.ok(result.timeElapsed.includes('minutes'));
});

test('getTimeElapsed: calculates hours', () => {
  const t1 = Date.now();
  const t2 = Date.now() + 3600000; // 1 hour
  const result = utils.getTimeElapsed(t1, t2);
  assert.ok(result.timeElapsed.includes('hours'));
});

test('createZuluStartDate: pads milliseconds', () => {
  const date = new Date('2023-01-01T12:00:00.050Z');
  const result = utils.createZuluStartDate(date);
  const iso = result.toISOString();
  assert.ok(iso.includes('.050Z'));
});

test('getOffsetMinutesForTimezone: returns 0 for UTC', () => {
  const offset = utils.getOffsetMinutesForTimezone('UTC');
  assert.strictEqual(offset, 0);
});

test('getHourlyDuration: breaks down minutes', () => {
  const result = utils.getHourlyDuration(90);
  assert.deepStrictEqual(result, { hours: 1, minutes: 30 });
});

test('getDurationInMinutes: calculates difference', () => {
  const start = new Date('2023-01-01T10:00:00');
  const end = new Date('2023-01-01T12:00:00');
  const result = utils.getDurationInMinutes(end, start);
  assert.strictEqual(result, 120);
});

test('getFormattedTime: 12-hour format', () => {
  const date = new Date('2023-01-01T14:05:00');
  const result = utils.getFormattedTime(date);
  assert.match(result, /^\d{2}:\d{2} (AM|PM)$/);
});

test('getFormattedTime: 12:00 PM', () => {
  const date = new Date('2023-01-01T12:00:00');
  const result = utils.getFormattedTime(date);
  assert.ok(result.includes('12'));
  assert.ok(result.includes('PM'));
});

test('getFormattedTime: 00:00 AM', () => {
  const date = new Date('2023-01-01T00:00:00');
  const result = utils.getFormattedTime(date);
  assert.ok(result.includes('12'));
  assert.ok(result.includes('AM'));
});

test('fixTimeStr: adds leading zero', () => {
  const result = utils.fixTimeStr('9:05 PM');
  assert.strictEqual(result, '09:05 PM');
});

test('getCurrentMonthByIndex: returns month name', () => {
  assert.strictEqual(utils.getCurrentMonthByIndex(0), 'January');
  assert.strictEqual(utils.getCurrentMonthByIndex(11), 'December');
});

test('getNextMonth: increments month', () => {
  const date = new Date('2023-10-05');
  const result = utils.getNextMonth(date);
  assert.strictEqual(result.getMonth(), 10); // November
  assert.strictEqual(result.getDate(), 1);
});

test('getNextMonth: increments year in December', () => {
  const date = new Date('2023-12-15');
  const result = utils.getNextMonth(date);
  assert.strictEqual(result.getMonth(), 0); // January
  assert.strictEqual(result.getFullYear(), 2024);
});

test('getPrevMonth: decrements month', () => {
  const date = new Date('2023-10-15');
  const result = utils.getPrevMonth(date);
  assert.strictEqual(result.getMonth(), 8); // September
  assert.strictEqual(result.getDate(), 1);
});

test('getPrevMonth: decrements year in January', () => {
  const date = new Date('2023-01-15');
  const result = utils.getPrevMonth(date);
  assert.strictEqual(result.getMonth(), 11); // December
  assert.strictEqual(result.getFullYear(), 2022);
});

test('getNumberOfDaysOfMonth: October has 31 days', () => {
  const date = new Date('2023-10-05');
  assert.strictEqual(utils.getNumberOfDaysOfMonth(date), 31);
});

test('getNumberOfDaysOfMonth: February 2023 has 28 days', () => {
  const date = new Date('2023-02-15');
  assert.strictEqual(utils.getNumberOfDaysOfMonth(date), 28);
});

test('getNumberOfDaysOfMonth: February 2024 has 29 days', () => {
  const date = new Date('2024-02-15');
  assert.strictEqual(utils.getNumberOfDaysOfMonth(date), 29);
});

test('getFormattedDateStr: returns formatted string', () => {
  const date = new Date('2023-10-05');
  const result = utils.getFormattedDateStr(date);
  assert.strictEqual(result, 'October 5, 2023');
});

test('getISOFormattedDate: returns YYYY-MM-DD', () => {
  const date = new Date('2023-01-05');
  assert.strictEqual(utils.getISOFormattedDate(date), '2023-01-05');
});

test('checkDateFlow: forward', () => {
  assert.strictEqual(utils.checkDateFlow('2023-01-01', '2023-12-31'), 'forward');
});

test('checkDateFlow: backward', () => {
  assert.strictEqual(utils.checkDateFlow('2023-12-31', '2023-01-01'), 'backward');
});

test('getDateRangeObjects: returns array', () => {
  const result = utils.getDateRangeObjects('2023-10-01', '2023-12-31');
  assert.ok(Array.isArray(result));
});

test('getDateRangeObjectsWithIsoZeroOffset: returns array with ztzStartDate', () => {
  const result = utils.getDateRangeObjectsWithIsoZeroOffset('2023-10-01', '2023-10-31', 'UTC');
  assert.ok(Array.isArray(result));
  if (result.length > 0) {
    assert.ok(result[0].ztzStartDate);
  }
});

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
