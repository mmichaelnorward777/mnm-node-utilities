export default function ({toNormalString, objectToDotNotation})  {

    function getValidatedPropValues(obj, propNames = [], callback = (value) => { }) {

        if (!obj) {
            return null;
        }

        let objValue = null;
        propNames.reduce((object, key) => {

            if (object[key]) {
                object = object[key];
                objValue = object;
            } else {
                object = {};
                objValue = null;
            }

            callback(objValue);

            return object;

        }, obj);

        return objValue;

    }

    function isObjectInArray(object, array = [], keysToBeChecked = []) {
        return array.some(item => {
            let results = [];
            if (keysToBeChecked.length) {
                for (let key of keysToBeChecked) {
                    results.push(object[key] === item[key]);
                }
            } else {
                for (let key in object) {
                    results.push(object[key] === item[key]);
                }
            }

            return results.every(res => res);
        });
    }

    function getAllObjectKeys(objects) {
        return objects.reduce((a, b) => {
            for (let key of Object.keys(b)) {
                if (!a.includes(key)) {
                    a.push(key);
                }
            }
            return a;
        }, []);
    }

    function sortObjectsByDate(arr, datePropName = "dateCreated", asc = true) {
        arr.sort((a, b) => {
            let date1 = new Date(a[datePropName]).getTime(),
                date2 = new Date(b[datePropName]).getTime();
            if (asc) {
                return date1 < date2 ? -1 : date1 > date2 ? 1 : 0;
            } else {
                return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
            }

        })
    }

    function sortObjectsByPropName(arr, propName, asc = true) {
        arr.sort((a, b) => {
            if (asc) {
                return a[propName] < b[propName] ? -1 : b[propName] > a[propName] ? 1 : 0;
            } else {
                return a[propName] > b[propName] ? -1 : b[propName] < a[propName] ? 1 : 0;
            }

        })
    }

    function objectToString(object, delimiter = ", ") {
        let output = [];
        for (let key in object) {
            output.push(`${toNormalString(key)} : ${toNormalString(`${object[key]}`)}`);
        }
        return output.join(delimiter);
    }

    function isObjectUnique(obj, objectsArray, keys = []) {
        let overAllResults = [];
        for (let object of objectsArray) {
            let results = [];
            if (keys.length) {
                for (let key of keys) {
                    results.push(obj[key] !== object[key]);
                }
            } else {
                for (let key in obj) {
                    results.push(obj[key] !== object[key]);
                }
            }

            overAllResults.push(results.every(res => res));
        }
        return overAllResults.every(res => res);
    }

    function filterUnlistedObjects(localObjects, allObjects, keys = []) {
        return allObjects.filter(obj => isObjectUnique(obj, localObjects, keys));
    }

    function shuffleArr(arr = []) {

        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;

    }

    function objectCompare(target, src, arrayInclusion = true) {

        let targetClone = objectToDotNotation(target),
            srcClone = objectToDotNotation(src),
            results = [];

        if (src === null || typeof src !== "object") {
            return target === src;
        }


        for (let key in srcClone) {

            if (Array.isArray(srcClone[key])) {
                results.push(JSON.stringify(srcClone[key]) === JSON.stringify(targetClone[key]));
            } else {

                if (Array.isArray(targetClone[key]) && arrayInclusion) {
                    results.push(targetClone[key].includes(srcClone[key]));
                } else {
                    results.push(srcClone[key] === targetClone[key]);
                }

            }
        }

        return results.every(res => res);

    }

    function assignProps(target, source) {

        for (let prop in source) {

            if (typeof source[prop] === "object") {

                if (typeof target[prop] !== "object") {
                    target[prop] = {};
                }

                target[prop] = assignProps(target[prop], source[prop]);

            } else {

                target[prop] = source[prop];

            }

        }

        return target

    }

    function deepMerge(target, ...sources) {
        // Create a deep copy of the target to avoid mutating the original if you want
        // If you WANT to mutate target, you can skip the copy step, but be careful.
        const isObject = (obj) => obj && typeof obj === 'object' && !Array.isArray(obj);

        if (!sources.length) return target;

        const source = sources.shift();

        if (isObject(target) && isObject(source)) {
            for (const key in source) {
                if (isObject(source[key])) {
                    if (!target[key]) Object.assign(target, { [key]: {} });
                    deepMerge(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }

        // If there are more sources, merge the next one into the result
        if (sources.length) return deepMerge(target, ...sources);

        return target;
    }

    return {
        getValidatedPropValues,
        isObjectInArray,
        getAllObjectKeys,
        sortObjectsByDate,
        sortObjectsByPropName,
        objectToString,
        isObjectUnique,
        filterUnlistedObjects,
        objectCompare,
        assignProps,
        deepMerge
    }

}

