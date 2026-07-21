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