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