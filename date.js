export default function getDateUtilities()  {

    function formattedDate(dateObject) {
        let dt = dateObject ? dateObject : new Date(),
            year = dt.getFullYear(),
            date = function () {
                let num = dt.getDate();
                return num < 10 ? `0${num}` : num;
            }(),
            month = function () {
                let num = dt.getMonth();
                return num < 9 ? `0${num + 1}` : num + 1;
            }();
        return `${month}-${date}-${year}`;
    }

    function getDateTimeObect(dateTime) {

        try {
            let dtObj;

            if (dateTime && dateTime.includes("-")) {
                dtObj = new Date(`${dateTime}`);
            } else if (dateTime && typeof dateTime === "number") {
                dtObj = new Date(dateTime);
            }

            // dtObj.getPrototype
            if ((dateTime !== null && typeof dateTime !== "undefined") && dtObj instanceof Date) {
                return dtObj
            } else {
                throw Error("Invalid Date Object");
            }
        } catch (err) {
            return new Date();
        }

    }

    function dateTimeObject(dateInSeconds = null) {
        let dateTime = getDateTimeObect(dateInSeconds),
            months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            month = months[dateTime.getMonth()],
            date = dateTime.getDate(),
            year = dateTime.getFullYear(),
            day = days[dateTime.getDay()],
            getCurrentTime = function (byTwelve = true) {
                let hours = function () {
                        if (byTwelve) {
                            let twelveHourFormat = dateTime.getHours() > 12 ? dateTime.getHours() % 12 : dateTime.getHours();
                            return twelveHourFormat < 10 ? `0${twelveHourFormat}` : twelveHourFormat;
                        } else {
                            return dateTime.getHours();
                        }
                    }(),
                    minutes = dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes(),
                    seconds = dateTime.getSeconds() < 10 ? `0${dateTime.getSeconds()}` : dateTime.getSeconds(),
                    halfOfDay = dateTime.getHours() > 12 ? "PM" : "AM";

                return byTwelve ? `${hours}:${minutes}:${seconds} ${halfOfDay}` : `${hours}:${minutes}:${seconds}`;
            },
            time = getCurrentTime(),
            getCurrentDate = function (words = true, separator = "/") {

                let dateInWords = `${month} ${date}, ${year}`,
                    dateInNumbers = `${(dateTime.getMonth() + 1) < 10 ? `0${dateTime.getMonth() + 1}` : dateTime.getMonth() + 1}${separator}${date < 10 ? `0${date}` : date}${separator}${year}`

                return words ? dateInWords : dateInNumbers;
            },
            fullDate = `${getCurrentDate()} - ${day}`,
            fullDateTime = `${getCurrentDate()} - ${day} - ${getCurrentTime()}`;

        return {
            day,
            month,
            year,
            date,
            time,
            getCurrentTime,
            getCurrentDate,
            fullDate,
            fullDateTime
        }
    }

    function getTimeElapsed(time1, time2) {

        let diff = Math.abs(time2 - time1),
            milliseconds = Number((Math.round((diff % 1000)) / 1000).toFixed(2)),
            seconds = Math.floor((diff / 1000) % 60),
            minutes = Math.floor(((diff / 1000) / 60) % 60),
            hours = Math.floor((diff / 1000) / 60 / 60),
            secondsUnit = seconds > 1 ? "seconds" : "second",
            minutesUnit = minutes > 1 ? "minutes" : "minute",
            hoursUnit = hours > 1 ? "hours" : "hour";


        let elapsedTime = function () {

            let momentsPassed = "";

            if (hours >= 1) {
                momentsPassed = `${hours} ${hoursUnit} ${hours < 1 ? "has" : "have"} passed.`;
            } if (hours < 1 && minutes >= 1) {
                momentsPassed = `${minutes} ${minutesUnit} ${minutes < 1 ? "has" : "have"} passed.`;
            } if (hours < 1 && minutes < 1) {
                momentsPassed = `${seconds + milliseconds} ${secondsUnit} ${(seconds + milliseconds) < 1 ? "has" : "have"} passed.`
            }

            return {
                timeElapsed: `${hours} ${hoursUnit}, ${minutes} ${minutesUnit}, and ${seconds + milliseconds} ${secondsUnit}`,
                momentsPassed,
            }


        }();

        return elapsedTime;

    }

    function createZuluStartDate(dateObj) {
        let date = dateObj.getDate(),
            month = dateObj.getMonth(),
            year = dateObj.getFullYear(),
            hours = dateObj.getHours(),
            minutes = dateObj.getMinutes(),
            seconds = dateObj.getSeconds(),
            ms = dateObj.getMilliseconds(),


            dateStr = date < 10 ? `0${date}` : date,
            monthStr = month + 1 < 10 ? `0${month + 1}` : month + 1,
            hourStr = hours < 10 ? `0${hours}` : hours,
            minuteStr = minutes < 10 ? `0${minutes}` : minutes,
            secondStr = seconds < 10 ? `0${seconds}` : seconds,
            msStr = ms >= 100 ? ms : ms < 100 && ms >= 10 ? `0${ms}` : `00${ms}`;

        return new Date(`${year}-${monthStr}-${dateStr}T${hourStr}:${minuteStr}:${secondStr}.${msStr}+00:00`);
        // return new Date();
    }

    function getOffsetMinutesForTimezone(timeZone) {

        let date = new Date();
        const fmt = new Intl.DateTimeFormat("en-US", {
            timeZone,
            timeZoneName: "shortOffset",
        });
        const tzName = fmt.formatToParts(date).find(p => p.type === "timeZoneName").value; // e.g., "GMT+8" or "GMT+08:00"
        const m = tzName.match(/GMT([+-]\d{1,2})(?::(\d{2}))?/);
        if (!m) return 0; // fallback
        const h = parseInt(m[1], 10);
        const mm = m[2] ? parseInt(m[2], 10) : 0;
        return h * 60 + (h < 0 ? -mm : mm);

    }

    function toISOZeroOffset(input, tz) {

        try {
            if (!(input instanceof Date)) {
                input = new Date(input);
            }

            if (!(input instanceof Date)) {
                throw Error("Invalid date");
            }

            let zuluDate = createZuluStartDate(input),
                zuluDateMs = zuluDate.getTime(),
                offsetInMinutes = getOffsetMinutesForTimezone(tz),
                offsetMs = offsetInMinutes * 60 * 1000,
                newTimeInMs = zuluDateMs - offsetMs;


            return new Date(newTimeInMs).toISOString().replace("Z", "+00:00");
        } catch (err) {
            return null;
        }
    }

    function getHourlyDuration(numOfMinutes) {

        let hours = Math.floor(numOfMinutes / 60),
            minutes = numOfMinutes % 60;

        return {
            hours,
            minutes,
        }
    }

    function getDurationInMinutes(dateObj1, dateObj2) {
        let diffInMs = dateObj1.getTime() - dateObj2.getTime(),
            diffInSec = diffInMs / 1000,
            diffInMinutes = diffInSec / 60;

        return diffInMinutes;
    }

    function localDateToSelectedTimeZone(dateObj, selectedTimeZone) {
        let localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
            localTzOffset = getOffsetMinutesForTimezone(localTimezone),
            selectedTzOffset = getOffsetMinutesForTimezone(selectedTimeZone),
            totalTimeDiffMS = (selectedTzOffset - localTzOffset) * 60 * 1000;

        return new Date(dateObj.getTime() + totalTimeDiffMS);
    }

    function getFormattedTime(dateObj) {

        let currentHour = dateObj.getHours() % 12 === 0 ? 12 : dateObj.getHours() % 12,
            currentHalf = dateObj.getHours() / 12 >= 1 ? "PM" : "AM",
            hourStr = currentHour < 10 ? `0${currentHour}` : currentHour,
            minuteStr = dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : dateObj.getMinutes();

        return `${hourStr}:${minuteStr} ${currentHalf}`;
    }

    function getIsoFormattedTime(hours, minutes, seconds) {
        return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }

    function fixTimeStr(timeStr) {
        timeStr = timeStr.replace("AM", " AM").replace("PM", " PM");

        let [time, halfDayMarker] = timeStr.split(" "),
            [hours, minutes] = time.split(":"),
            correctedHours = null;

        if (parseInt(hours) < 10) {
            correctedHours = `0${hours}`;
        } else {
            correctedHours = hours;
        }

        return `${correctedHours}:${minutes} ${halfDayMarker}`;
    }

    /* Month date utilities */

    function getCurrentMonthByIndex(monthIndex) {
        let monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        return monthIndex <= monthsArray.length - 1 ? monthsArray[monthIndex] : monthsArray[0];
    }

    function getNextMonth(dateObj) {
        let monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthIndex = dateObj.getMonth(),
            nextMonth = monthIndex + 1 <= monthsArray.length - 1 ? monthsArray[monthIndex + 1] : monthsArray[0],
            year = dateObj.getFullYear();


        if (nextMonth === "January") {
            year += 1;
        }

        return new Date(`${nextMonth} 1, ${year}`);
    }

    function getPrevMonth(dateObject) {
        let monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthIndex = dateObject.getMonth(),
            year = dateObject.getFullYear(),
            prevMonth = null;

        if (dateObject.getDate() > 1) {
            prevMonth = monthsArray[dateObject.getMonth()];
        } else {
            prevMonth = monthIndex - 1 >= 0 ? monthsArray[monthIndex - 1] : monthsArray[monthsArray.length - 1];
        }

        if (prevMonth === "January") {
            year -= 1;
        }


        return new Date(`${prevMonth} 1, ${year}`);
    }

    function getNumberOfDaysOfMonth(dateObj) {
        let date = new Date(dateObj),
            nextMonthDate = getNextMonth(date),
            numberOfDays = new Date(nextMonthDate.getTime() - (1000 * 60 * 60 * 24)).getDate();

        return numberOfDays;
    }

    function getFormattedDateStr(scheduledDateObj) {
        return `${getCurrentMonthByIndex(scheduledDateObj.getMonth())} ${scheduledDateObj.getDate()}, ${scheduledDateObj.getFullYear()}`;
    }

    function createTzScheduleObject(scheduledDate, timeOfDay, timeZone) {

        try {

            timeOfDay = timeOfDay.includes("T") ? timeOfDay.split("T").pop() : timeOfDay;

            let scheduledDateObj = new Date(scheduledDate),
                timeInputString = `${scheduledDateObj.toISOString().split("T").shift()}T${timeOfDay}`,
                isoZeroOffset = toISOZeroOffset(timeInputString, timeZone),
                zeroOffsetDateObj;



            if (!isoZeroOffset) {
                timeInputString = `${getFormattedDateStr(scheduledDateObj)} ${timeOfDay}`;
                isoZeroOffset = toISOZeroOffset(timeInputString, timeZone);
            }

            zeroOffsetDateObj = new Date(isoZeroOffset);

            if (!(zeroOffsetDateObj instanceof Date)) {
                throw Error("Invalid Date Object");
            }

            let lbtzDateObj = toLocalBusinessTimeZone(zeroOffsetDateObj, timeZone),
                isoStringFullDate = lbtzDateObj.toISOString(),
                month = lbtzDateObj.getMonth(),
                date = lbtzDateObj.getDate(),
                year = lbtzDateObj.getFullYear(),
                hours = lbtzDateObj.getHours(),
                minutes = lbtzDateObj.getMinutes(),
                seconds = lbtzDateObj.getSeconds(),
                isoStringDate = getISOFormattedDate(lbtzDateObj),
                isoStringTime = getIsoFormattedTime(hours, minutes, seconds) + ".000",
                formattedDate = getFormattedDateStr(lbtzDateObj);

            return {
                lbtzDateObj,
                isoStringFullDate,
                month,
                date,
                year,
                hours,
                minutes,
                seconds,
                isoStringDate,
                isoStringTime,
                formattedDate
            }


        } catch (err) {

            return {
                statusOk: false,
                message: err.message,
                src: "createLbtzSchedule"
            }

        }
    }

    /* 

        Date Range Functions

    */

    function getISOFormattedDate(dateObject) {
        let date = dateObject.getDate() < 10 ? `0${dateObject.getDate()}` : dateObject.getDate(),
            monthIndex = dateObject.getMonth()
            month = monthIndex + 1 < 10 ? `0${monthIndex + 1}` : monthIndex + 1;
        return `${dateObject.getFullYear()}-${month}-${date}`;
    }

    function createDateRangeObject(dateObject, lastDateObject = null) {
        let formattedStartDate = getISOFormattedDate(dateObject),
            nextMonthDateObject = getNextMonth(dateObject),
            formattedEndDate = lastDateObject ? getISOFormattedDate(lastDateObject) : getISOFormattedDate(nextMonthDateObject);

        return {
            formattedStartDate,
            formattedEndDate,
            nextMonthDateObject
        }
    }

    function checkDateFlow(startDate, endDate) {
        let start = new Date(startDate),
            end = new Date(endDate);
        return start.getTime() > end.getTime() ? "backward" : "forward";
    }

    function getForwardDateRangeObjects(startDate, endDate) {

        let currentDateMonth = getCurrentMonthByIndex(startDate.getMonth()),
            endDateMonth = getCurrentMonthByIndex(endDate.getMonth()),
            dateRangeObjectArrays = [];

        while (startDate.getTime() < endDate.getTime()) {

            let numberOfDays = getNumberOfDaysOfMonth(startDate),
                stDt, edDt, dateRangeObject,
                oneDay = 1000 * 60 * 60 * 24;

            if (currentDateMonth === endDateMonth && startDate.getFullYear() === endDate.getFullYear()) {
                stDt = new Date(new Date(`${currentDateMonth} ${startDate.getDate()}, ${startDate.getFullYear()}`).getTime() + oneDay);
                edDt = new Date(`${endDateMonth} ${endDate.getDate()}, ${endDate.getFullYear()}`);
            } else {
                stDt = new Date(new Date(`${currentDateMonth} ${startDate.getDate()}, ${startDate.getFullYear()}`).getTime() + oneDay);
                edDt = new Date(`${currentDateMonth} ${numberOfDays}, ${startDate.getFullYear()}`);
            }
            dateRangeObject = createDateRangeObject(stDt, edDt);

            dateRangeObjectArrays.push(dateRangeObject);

            startDate = getNextMonth(startDate);
            currentDateMonth = getCurrentMonthByIndex(startDate.getMonth());

        }

        return dateRangeObjectArrays;

    }


    function getBackwardDateRangeObjects(startDate, endDate) {

        return getForwardDateRangeObjects(endDate, startDate).reverse();

    }

    function getDateRangeObjects(startDate, endDate) {

        let dateFlow = checkDateFlow(startDate, endDate);

        return dateFlow === "backward" ? getBackwardDateRangeObjects(startDate, endDate) : getForwardDateRangeObjects(startDate, endDate);

    }

    function getDateRangeObjectsWithIsoZeroOffset(startDate, endDate, timeZone) {
        let dateRanges = getDateRangeObjects(startDate, endDate);

        return dateRanges.map(item => {

            let { formattedStartDate, formattedEndDate } = item,
                ztzStartDate = toISOZeroOffset(`${formattedStartDate}T00:00:00`, timeZone),
                ztzEndDate = toISOZeroOffset(`${formattedEndDate}T23:59:59`, timeZone);

            return {
                ...item,
                ztzStartDate,
                ztzEndDate,
            }

        });

    }

    return {
        formattedDate,
        getDateTimeObect,
        dateTimeObject,
        createZuluStartDate,
        getOffsetMinutesForTimezone,
        toISOZeroOffset,
        getHourlyDuration,
        getDurationInMinutes,
        localDateToSelectedTimeZone,
        getFormattedTime,
        getIsoFormattedTime,
        fixTimeStr,
        getCurrentMonthByIndex,
        getNextMonth,
        getPrevMonth,
        getNumberOfDaysOfMonth,
        getFormattedDateStr,
        createTzScheduleObject,
        getISOFormattedDate,
        createDateRangeObject,
        checkDateFlow,
        getForwardDateRangeObjects,
        getBackwardDateRangeObjects,
        getDateRangeObjects,
        getDateRangeObjectsWithIsoZeroOffset,
    }
}


