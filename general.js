export function generateUuid(num = 16) {
    let dt = new Date().getTime();

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * num) % num | 0;
        dt = Math.floor(dt / num);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(num);
    });
}

export async function waitForCondition({ conditionCallback, onTrueCallback, messageCallback }) {
    conditionCallback = conditionCallback ? conditionCallback : () => true;
    messageCallback = messageCallback ? messageCallback : () => {};
    onTrueCallback = onTrueCallback ? onTrueCallback : () => {};
    await new Promise(resolve => {
        messageCallback();
        let i = 0,
            interval = setInterval(() => {
                if (conditionCallback()) {
                    onTrueCallback();
                    clearInterval(interval);
                    resolve();
                }
                if (i === 100) {
                    messageCallback();
                    i = 0;
                }
                i++;
            }, 100);
    });
}

export async function moderator(arr, callback, bulkCount = 5) {

    let firstIndex = 0,
        lastIndex = bulkCount;

    async function execute(...args) {

        let i = 0;

        while (i < arr.length) {

            let slicedArr = arr.slice(firstIndex, lastIndex);


            await callback(slicedArr, firstIndex, lastIndex, i);

            if (i + bulkCount < arr.length) {
                i += bulkCount;
                firstIndex = i;
                lastIndex = i + bulkCount;
            } else {
                i += arr.length - i;
                firstIndex = i;
                lastIndex = arr.length;
            }

        }

    }

    await execute();
}

export async function slowDown(timeDelay = false) {
    let delay = timeDelay ? timeDelay : 7747;
    await new Promise(resolve => setTimeout(resolve, delay));
}

export function enumerate(arr, and = false) {
    arr = [...arr];
    if (arr.length > 1) {
        let lastIndex = arr.pop();
        return `${arr.join(", ")}, ${and ? "and" : "or"} ${lastIndex}`;
    } else {
        return arr[0];
    }
}

export function getRandomNumber(initialIndex = 0, limit = 10) {
    return Math.floor(Math.random() * limit) + initialIndex;
}

export const replaceWithForwardSlash = (str) => {
    return str.replace(/\\/gi, "/");
}

export function debounce(fn, delay = 2500) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

export function getNumericValue(str) {
    let match = str.match(/([\d,]+(?:\.\d{1,2})?)/);
    return match ? Number(match[1].replace(/,/g, "")) : NaN;
}

export function getValidatedStringValue(input) {
    return input !== null && typeof input !== "undefined" ? input.toString() : null;
}
