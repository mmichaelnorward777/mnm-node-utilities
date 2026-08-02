import { fork, execFile } from 'child_process';
import * as path from "path";
import * as os from 'os';
import * as fs from 'fs';

export default function getNodeUtils({ checkDirPathPermissions, getUserAllowedPaths }) {

    // 1. Secure Child Process Spawning
    function spawnOnChildProcess(filePath) {
        // Security: Resolve to real physical path to prevent symlink attacks
        let realFilePath;
        try {
            realFilePath = fs.realpathSync(path.resolve(filePath));
        } catch (error) {
            // If file doesn't exist, we can't resolve it. 
            // You might allow creation, but for execution, it usually must exist.
            throw new Error(`File not found or invalid path: ${filePath}`);
        }

        // Security: Check if the file itself is allowed to be executed
        if (!checkDirPathPermissions(realFilePath, "execute")) {
            throw new Error(`Denied Access Error: Execution of ${realFilePath} is not allowed.`);
        }

        const childProcess = fork(realFilePath);

        childProcess.on('message', (data) => {
            console.log({
                message: "received message",
                data,
            });
        });

        childProcess.on('error', (error) => {
            console.error({
                message: `error occurred`,
                error,
            });
        });

        childProcess.on('close', (code) => {
            console.log({
                message: `child process exited with code : ${code}`
            });
        });

        return childProcess;
    }

    function getAppDataDirPath() {
        const platform = os.platform();

        if (platform === 'win32') {
            return process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local');
        } else if (platform === 'linux') {
            return process.env.XDG_CONFIG_HOME || path.join(os.homedir(), '.config');
        } else if (platform === 'darwin') {
            return path.join(os.homedir(), 'Library', 'Application Support');
        } else {
            throw new Error(`Unsupported platform: ${platform}`);
        }
    }

    // 2. Secure System Command Execution
    function runSystemCommand(command, cwd) {
        return new Promise((resolve, reject) => {
            try {
                // 1. Resolve to absolute path
                const absCwd = path.resolve(cwd);

                // 2. Resolve to REAL physical path (Symlink Protection)
                let realCwd;
                try {
                    realCwd = fs.realpathSync(absCwd);
                } catch (error) {
                    return resolve({
                        statusOk: false,
                        message: `Command Execution Failed: Directory does not exist or cannot be resolved: ${cwd}`,
                        path: absCwd
                    });
                }

                // 3. Check Permissions on the REAL directory
                if (!checkDirPathPermissions(realCwd, "execute")) {
                    return resolve({
                        statusOk: false,
                        message: `Command Execution Failed: This path (${realCwd}) is not allowed by the user.`,
                        path: realCwd,
                        allowedPaths: getUserAllowedPaths()
                    });
                }

                // 4. Security: Parse Command to Prevent Injection
                // We split by whitespace, but this is basic. For advanced security, 
                // consider a whitelist of allowed commands.
                const parts = command.trim().split(/\s+/);
                const cmd = parts[0];
                const args = parts.slice(1);

                // Optional: Whitelist check for dangerous commands
                const dangerousCommands = ['rm', 'mv', 'chown', 'chmod', 'dd', 'mkfs'];
                if (dangerousCommands.includes(cmd)) {
                     // Check if dangerous flags are present
                     if (args.some(arg => arg.includes('-rf') || arg.includes('-f') || arg.includes('-r'))) {
                         return resolve({
                             statusOk: false,
                             message: `Command Execution Failed: Dangerous command '${cmd}' with recursive force flag detected.`,
                             command: command
                         });
                     }
                }

                // 5. Execute using execFile (NO SHELL)
                // This prevents command injection because it does not invoke sh -c
                execFile(
                    cmd,
                    args,
                    { 
                        cwd: realCwd, 
                        timeout: 5000, // 5 second timeout to prevent hanging
                        maxBuffer: 1024 * 1024 // 1MB output limit
                    },
                    (error, stdout, stderr) => {
                        if (error) {
                            reject({
                                statusOk: false,
                                message: `Command Execution Failed: ${error.message}`,
                                stderr: stderr,
                                command: command
                            });
                        } else {
                            resolve({
                                statusOk: true,
                                message: `Command Execution Successful`,
                                stdout: stdout,
                                stderr: stderr,
                                command: command
                            });
                        }
                    }
                );
            } catch (err) {
                reject({
                    statusOk: false,
                    message: `Command Execution Failed: Internal Error - ${err.message}`,
                    command: command
                });
            }
        });
    }

    return {
        spawnOnChildProcess,
        getAppDataDirPath,
        runSystemCommand
    }
}
