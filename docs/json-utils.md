## Module: `json-utils`

This module provides utilities for parsing JSON strings and managing simple JSON files on the disk. It is designed for lightweight data persistence scenarios where you need to store and retrieve arrays of objects without requiring a full database.

### Testing the Module

To run the tests for this module, execute the following command from the project root:

```bash
npm run test-json-utils
```

### API Reference

#### 1. `parseValidatedJSON(inputValue)`

Attempts to parse a string as JSON. If parsing fails, it returns the original input value unchanged, preventing errors from crashing the application.

*   **Arguments:**
    *   `inputValue` (`string`): The string to parse.
*   **Returns:**
    *   `any`: The parsed JavaScript value (Object, Array, String, Number, etc.), or the original `inputValue` if it is not valid JSON.
*   **Throws:**
    *   None.

#### 2. `createJsonFileObject(targetPath, fileName)`

Creates a helper object to manage a JSON file. This helper automatically initializes the file with an empty array `[]` if it does not exist, and provides methods to read, append, and clear data.

*   **Arguments:**
    *   `targetPath` (`string`): The directory path where the JSON file will be stored.
    *   `fileName` (`string`): The name of the JSON file (e.g., `"data.json"`).
*   **Returns:**
    *   `Object`: An instance with the following methods:
        *   `getSavedData()`: Returns the current content of the file as an Array.
        *   `addData(data, newData?)`: Appends data to the existing array.
        *   `clearData()`: Clears the file, setting its content to an empty array `[]`.
*   **Throws:**
    *   None.

##### Methods of the returned JsonFile Object

###### `getSavedData()`
Retrieves the data stored in the JSON file.
*   **Returns:**
    *   `Promise<Array>`: The array of objects stored in the file.

###### `addData(data, newData)`
Adds items to the stored array.
*   **Arguments:**
    *   `data` (`Array`): The items to add.
    *   `newData` (`boolean`, optional): If `true`, replaces the existing data with `data` instead of appending. If `false` (default), appends `data` to the existing array.
*   **Returns:**
    *   `Promise<Object>`: A result object indicating success or failure (e.g., `{ status: "success", result: true }`).

###### `clearData()`
Clears all data from the file by writing an empty array `[]`.
*   **Returns:**
    *   `Promise<Object>`: A result object indicating success or failure.