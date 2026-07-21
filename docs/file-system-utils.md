## Module: `file-system-utils`

This module provides a secure wrapper around Node.js `fs` and `path` operations. It enforces a permission-based access control system defined by `userAllowedPaths`. All operations check if the target path is within the allowed paths and if the user has the specific permission (read, write, delete, execute) for that path.

**Security & Error Handling:**
If a path is not within the `userAllowedPaths` or the user lacks the required permission, the function **will throw an Error** with the message `"Denied Access Error"`. It will not return `undefined` or a failure object. Consumers of this library must use `try/catch` blocks when calling these functions.

### Testing the Module

To run the tests for this module, ensure you are in the project root directory and execute the following command:

```bash
npm run test-file-system
```

---

### API Reference

#### 1. `getUserAllowedPathsByPermissionType(permissionType)`

Returns an array of all allowed paths that grant the specified permission type.

*   **Arguments:**
    *   `permissionType` (`string`): The type of permission to filter by. Common values: `"read"`, `"write"`, `"delete"`, `"execute"`.
*   **Returns:**
    *   `Array<Object>`: An array of permission objects (from the internal `Map`) that have the requested permission set to `true`.
*   **Throws:**
    *   None.

#### 2. `getUserAllowedPaths()`

Returns an array of all allowed paths configured for the user.

*   **Arguments:**
    *   None.
*   **Returns:**
    *   `Array<Object>`: An array of permission objects containing `path`, `read`, `write`, `delete`, and `execute` properties.
*   **Throws:**
    *   None.

#### 3. `getUserFsPermission(dirPath)`

Determines if a specific path falls within any of the user's allowed paths and returns the permissions for that path.

*   **Arguments:**
    *   `dirPath` (`string`): The file or directory path to check.
*   **Returns:**
    *   `Object` | `undefined`: The permission object for the containing allowed path, or `undefined` if the path is not within any allowed root.
*   **Throws:**
    *   None.

#### 4. `checkDirPathPermissions(dirPath, permissionType)`

A convenience function to check if a specific path has a specific permission.

*   **Arguments:**
    *   `dirPath` (`string`): The file or directory path to check.
    *   `permissionType` (`string`): The permission to check (e.g., `"read"`, `"write"`).
*   **Returns:**
    *   `boolean`: `true` if the path is allowed and has the permission; `false` otherwise.
*   **Throws:**
    *   None.

#### 5. `mimeTypes`

A constant object mapping file extensions to their MIME types.

*   **Arguments:**
    *   None.
*   **Returns:**
    *   `Object`: An object where keys are extensions (e.g., `"jpg"`) and values are MIME types (e.g., `"image/jpeg"`).
*   **Throws:**
    *   None.

#### 6. `baseName(fileName, ...args)`

Returns the last portion of a path, similar to `path.basename`.

*   **Arguments:**
    *   `fileName` (`string`): The path to process.
    *   `...args` (`string`): Additional arguments passed to `path.basename` (e.g., suffix to remove).
*   **Returns:**
    *   `string`: The base name of the file.
*   **Throws:**
    *   `Error`: Only if the `fileName` exists in the filesystem and the user lacks "read" permission. If the file does not exist or is a pure string, it proceeds without checking permissions.

#### 7. `fileExists(fileName)`

Checks if a file or directory exists at the given path.

*   **Arguments:**
    *   `fileName` (`string`): The path to check.
*   **Returns:**
    *   `boolean`: `true` if it exists, `false` if it does not.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 8. `isFile(p)`

Checks if the given path is a file.

*   **Arguments:**
    *   `p` (`string`): The path to check.
*   **Returns:**
    *   `boolean`: `true` if it is a file, `false` otherwise.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 9. `isDirectory(dirPath)`

Checks if the given path is a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The path to check.
*   **Returns:**
    *   `boolean`: `true` if it is a directory, `false` otherwise.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 10. `getParentDir(filePath)`

Returns the parent directory of the given file path.

*   **Arguments:**
    *   `filePath` (`string`): The file path.
*   **Returns:**
    *   `string` | `null`: The parent directory path, `null` if it doesn't exist (or root).
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 11. `getFileExt(filePath)`

Returns the file extension of the given path.

*   **Arguments:**
    *   `filePath` (`string`): The file path.
*   **Returns:**
    *   `string`: The file extension (including the dot, e.g., `.txt`).
*   **Throws:**
    *   None. (Note: This function does *not* check permissions in the current code).

#### 12. `readdir(dirPath, options)`

Asynchronously reads the contents of a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the directory.
    *   `options` (`Object`): Options for `fs.promises.readdir` (default: `{ encoding: "utf8" }`).
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ status: "success", result: true, message: string, data: Array<string> }`
        *   On failure: `{ status: "failed", result: false, message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 13. `readdirSync(dirPath, options)`

Synchronously reads the contents of a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the directory.
    *   `options` (`Object`): Options for `fs.readdirSync` (default: `{ encoding: "utf8" }`).
*   **Returns:**
    *   `Object`:
        *   On success: `{ status: "success", result: true, message: string, data: Array<string> }`
        *   On failure: `{ status: "failed", result: false, message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 14. `mkdir(dirPath, options)`

Asynchronously creates a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the new directory.
    *   `options` (`Object`): Options for `fs.promises.mkdir` (default: `{ recursive: true }`).
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ status: "success", result: true, message: string }`
        *   On failure: `{ status: "failed", result: false, message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "write" permission.

#### 15. `mkdirSync(dirPath, options)`

Synchronously creates a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the new directory.
    *   `options` (`Object`): Options for `fs.mkdirSync` (default: `{ recursive: true }`).
*   **Returns:**
    *   `Object`:
        *   On success: `{ status: "success", result: true, message: string }`
        *   On failure: `{ status: "failed", result: false, message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "write" permission.

#### 16. `deleteDir(dirPath, options)`

Asynchronously deletes a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the directory to delete.
    *   `options` (`Object`): Options for `fs.promises.rm` (default: `{ recursive: true }`).
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ status: "success", result: true, message: string }`
        *   On failure: `{ status: "failed", result: false, message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "delete" permission.

#### 17. `deleteDirSync(dirPath, options)`

Synchronously deletes a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the directory to delete.
    *   `options` (`Object`): Options for `fs.rmSync` (default: `{ recursive: true }`).
*   **Returns:**
    *   `Object`:
        *   On success: `{ status: "success", result: true, message: string }`
        *   On failure: `{ status: "failed", result: false, message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "delete" permission.

#### 18. `readFile(filePath, options)`

Asynchronously reads the content of a file.

*   **Arguments:**
    *   `filePath` (`string`): The path to the file.
    *   `options` (`Object`): Options for `fs.promises.readFile` (default: `{ encoding: "utf8" }`).
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ result: true, status: "success", message: string, data: string | Buffer }`
        *   On failure: `{ result: false, status: "failed", message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 19. `readFileSync(filePath, options)`

Synchronously reads the content of a file.

*   **Arguments:**
    *   `filePath` (`string`): The path to the file.
    *   `options` (`Object`): Options for `fs.readFileSync` (default: `{ encoding: "utf8" }`).
*   **Returns:**
    *   `Object`:
        *   On success: `{ result: true, status: "success", message: string, data: string | Buffer }`
        *   On failure: `{ result: false, status: "failed", message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 20. `writeFile(filePath, data, options)`

Asynchronously writes data to a file.

*   **Arguments:**
    *   `filePath` (`string`): The path to the file.
    *   `data` (`string` | `Buffer`): The data to write.
    *   `options` (`Object`): Options for `fs.promises.writeFile` (default: `{ encoding: "utf8" }`).
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ result: true, status: "success", message: string }`
        *   On failure: `{ result: false, status: "failed", message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "write" permission.

#### 21. `writeFileSync(filePath, data, options)`

Synchronously writes data to a file.

*   **Arguments:**
    *   `filePath` (`string`): The path to the file.
    *   `data` (`string` | `Buffer`): The data to write.
    *   `options` (`Object`): Options for `fs.writeFileSync` (default: `{ encoding: "utf8" }`).
*   **Returns:**
    *   `Object`:
        *   On success: `{ result: true, status: "success", message: string }`
        *   On failure: `{ result: false, status: "failed", message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "write" permission.

#### 22. `deleteFile(filePath)`

Asynchronously deletes a file.

*   **Arguments:**
    *   `filePath` (`string`): The path to the file.
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ status: "successful", result: true, message: string }`
        *   On failure: `{ status: "unchanged", result: false, message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "delete" permission.

#### 23. `deleteFileSync(filePath)`

Synchronously deletes a file.

*   **Arguments:**
    *   `filePath` (`string`): The path to the file.
*   **Returns:**
    *   `Object`:
        *   On success: `{ result: true, status: "success", message: string }`
        *   On failure: `{ result: false, status: "failed", message: string, reason: string }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "delete" permission.

#### 24. `getFileSize(filePath)`

Asynchronously gets the size of a file in bytes.

*   **Arguments:**
    *   `filePath` (`string`): The path to the file.
*   **Returns:**
    *   `Promise<number>` | `Promise<false>`: The size in bytes, or `false` if the file does not exist.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 25. `isFileEmpty(filePath, options)`

Asynchronously checks if a file is empty.

*   **Arguments:**
    *   `filePath` (`string`): The path to the file.
    *   `options` (`Object`): Options for reading the file.
*   **Returns:**
    *   `Promise<boolean>`: `true` if the file is empty, `false` if it has content.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 26. `isFileEmptySync(filePath, options)`

Synchronously checks if a file is empty.

*   **Arguments:**
    *   `filePath` (`string`): The path to the file.
    *   `options` (`Object`): Options for reading the file.
*   **Returns:**
    *   `boolean`: `true` if the file is empty, `false` if it has content.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 27. `isDirectoryEmpty(dirPath, options)`

Asynchronously checks if a directory is empty.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the directory.
    *   `options` (`Object`): Options for reading the directory.
*   **Returns:**
    *   `Promise<boolean>`: `true` if the directory is empty, `false` otherwise.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 28. `isDirectoryEmptySync(dirPath, options)`

Synchronously checks if a directory is empty.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the directory.
    *   `options` (`Object`): Options for reading the directory.
*   **Returns:**
    *   `boolean`: `true` if the directory is empty, `false` otherwise.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 29. `getAllFilesFromDirectory(dirPath, fileExt)`

Asynchronously retrieves a list of files in a directory, optionally filtered by extension.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the directory.
    *   `fileExt` (`string`): Optional extension filter (e.g., `".txt"`).
*   **Returns:**
    *   `Promise<Array<string>>`: An array of filenames (not full paths).
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 30. `getAllFilesFromDirectorySync(dirPath, fileExt)`

Synchronously retrieves a list of files in a directory, optionally filtered by extension.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the directory.
    *   `fileExt` (`string`): Optional extension filter (e.g., `".txt"`).
*   **Returns:**
    *   `Array<string>`: An array of filenames (not full paths).
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 31. `getAllDirsFromDirectory(dirPath)`

Asynchronously retrieves a list of subdirectories in a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the directory.
*   **Returns:**
    *   `Promise<Array<string>>`: An array of subdirectory names.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 32. `getAllDirsFromDirectorySync(dirPath)`

Synchronously retrieves a list of subdirectories in a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The path to the directory.
*   **Returns:**
    *   `Array<string>`: An array of subdirectory names.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 33. `getAllFilesRecursively(dirPath, excludedFolders)`

Asynchronously retrieves all files in a directory tree.

*   **Arguments:**
    *   `dirPath` (`string`): The root directory.
    *   `excludedFolders` (`Array<string>`): Names of folders to skip.
*   **Returns:**
    *   `Promise<Array<Object>>`: An array of file objects with `name`, `parentDir`, `fileType`, `path`, and `includedFiles` (if directory).
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 34. `getAllFilesRecursivelySync(dirPath, excludedFolders)`

Synchronously retrieves all files in a directory tree.

*   **Arguments:**
    *   `dirPath` (`string`): The root directory.
    *   `excludedFolders` (`Array<string>`): Names of folders to skip.
*   **Returns:**
    *   `Array<Object>`: An array of file objects with `name`, `parentDir`, `fileType`, `path`, and `includedFiles` (if directory).
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "read" permission.

#### 35. `deleteAllFilesInDirPath(dirPath, recursive)`

Asynchronously deletes all files in a directory, optionally recursing into subdirectories.

*   **Arguments:**
    *   `dirPath` (`string`): The root directory.
    *   `recursive` (`boolean`): If `true`, deletes files in subdirectories too.
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ status: "success", result: true, message: string }`
        *   On failure: `{ status: "failed", result: false, message: string, errorMessages: Array<string> }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "delete" permission.

#### 36. `deleteAllDirsInDirPath(dirPath, options)`

Asynchronously deletes all subdirectories in a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The root directory.
    *   `options` (`Object`): Options for deletion.
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ status: "success", result: true, message: string }`
        *   On failure: `{ status: "failed", result: false, message: string, errorMessages: Array<string> }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "delete" permission.

#### 37. `deleteAllInDirPath(dirPath)`

Asynchronously deletes all files and directories inside a directory.

*   **Arguments:**
    *   `dirPath` (`string`): The root directory.
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ result: true, status: "success", message: string }`
        *   On failure: `{ result: false, status: "failed", errorMessages: Array<string> }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "delete" permission.

#### 38. `deleteAllEmptyFilesInDirectory(dirPath, recursive)`

Asynchronously deletes all empty files in a directory, optionally recursing.

*   **Arguments:**
    *   `dirPath` (`string`): The root directory.
    *   `recursive` (`boolean`): If `true`, deletes empty files in subdirectories.
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ status: "success", result: true, message: string }`
        *   On failure: `{ status: "failed", result: false, message: string, errorMessages: Array<string> }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "delete" permission.

#### 39. `deleteAllEmptyDirsInDirectory(dirPath, recursive)`

Asynchronously deletes all empty directories in a directory, optionally recursing.

*   **Arguments:**
    *   `dirPath` (`string`): The root directory.
    *   `recursive` (`boolean`): If `true`, deletes empty directories in subdirectories.
*   **Returns:**
    *   `Promise<Object>`:
        *   On success: `{ status: "success", result: true, message: string }`
        *   On failure: `{ status: "failed", result: false, message: string, errorMessages: Array<string> }`
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "delete" permission.

#### 40. `getMimeType(file)`

Gets the MIME type for a file based on its extension.

*   **Arguments:**
    *   `file` (`string`): The file path or filename.
*   **Returns:**
    *   `string` | `null`: The MIME type, or `null` if the extension is not found in the `mimeTypes` map.
*   **Throws:**
    *   `Error`: If the path is provided, exists in the filesystem, is a directory, or if a filename is provided without an extension.

#### 41. `getFileExtensionsByMimeType(mimeType)`

Gets all file extensions associated with a specific MIME type.

*   **Arguments:**
    *   `mimeType` (`string`): The MIME type (e.g., `"image/png"`).
*   **Returns:**
    *   `Array<string>`: An array of extensions (e.g., `["png"]`).
*   **Throws:**
    *   None.

#### 42. `getSpecifiedExt(url, fileExtensions)`

Finds the first extension from a list that appears in the URL.

*   **Arguments:**
    *   `url` (`string`): The URL or filename.
    *   `fileExtensions` (`Array<string>`): List of extensions to check.
*   **Returns:**
    *   `string`: The first matching extension found in the URL.
*   **Throws:**
    *   None.

#### 43. `createDirPath(...args)`

Asynchronously creates a directory path if it does not exist.

*   **Arguments:**
    *   `...args` (`string`): Parts of the path to join and create.
*   **Returns:**
    *   `Promise<string>`: The created directory path.
*   **Throws:**
    *   `Error`: If the path is not allowed or lacks "write" permission.