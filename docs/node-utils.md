## Module: `node-utils`

This module provides utilities for interacting with the Node.js runtime and the operating system. It focuses on process management, system command execution with security checks, and platform-specific directory resolution.

**Security Note:**
The `runSystemCommand` function enforces a permission-based access control. It will only execute commands if the target directory is explicitly allowed in the `userAllowedPaths` configuration with `"execute"` permissions. If permissions are denied, it returns a resolved Promise with an error object instead of throwing, allowing for synchronous error handling.

### Testing the Module

To run the tests for this module, execute the following command from the project root:

```bash
npm run test-node-utils
```

### API Reference

#### 1. `spawnOnChildProcess(filePath)`

Spawns a new Node.js child process by forking the specified JavaScript file. It sets up default listeners for `message`, `error`, and `close` events.

*   **Arguments:**
    *   `filePath` (`string`): The path to the Node.js script to fork.
*   **Returns:**
    *   `ChildProcess`: The child process object.
*   **Throws:**
    *   `Error`: If the file at `filePath` does not exist or is not a valid module.

#### 2. `getAppDataDirPath()`

Returns the platform-specific path for application data storage. This path is typically used for storing configuration files or persistent app data.

*   **Arguments:**
    *   None.
*   **Returns:**
    *   `string`: The absolute path to the application data directory.
        *   **Windows:** `%LOCALAPPDATA%` (or `~/AppData/Local`).
        *   **Linux:** `$XDG_CONFIG_HOME` (or `~/.config`).
        *   **macOS:** `~/Library/Application Support`.
*   **Throws:**
    *   `Error`: If the platform is unsupported.

#### 3. `runSystemCommand(command, cwd)`

Executes a system shell command within a specific working directory, after verifying that the user has the required permissions.

*   **Arguments:**
    *   `command` (`string`): The shell command to execute (e.g., `"echo hello"`).
    *   `cwd` (`string`): The working directory where the command should be executed.
*   **Returns:**
    *   `Promise<Object>`:
        *   **On Success:**
            ```javascript
            {
                statusOk: true,
                message: "Command Execution Successful...",
                stdout: string,   // Standard output
                stderr: string,   // Standard error (usually empty on success)
                command: string   // The command executed
            }
            ```
        *   **On Permission Denied:**
            ```javascript
            {
                statusOk: false,
                message: "Command Execution Failed: ...",
                path: string,
                allowedPaths: Array
            }
            ```
        *   **On Execution Error:** (Rejected Promise)
            ```javascript
            {
                statusOk: false,
                message: "Command Execution Failed: ...",
                stderr: string,
                command: string
            }
            ```
*   **Throws:**
    *   None. (Errors are returned via the Promise rejection or the resolved error object).