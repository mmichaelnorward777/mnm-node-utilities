import { fork, exec } from 'child_process';
import * as path from "path";
import * as os from 'os';

export default function getNodeUtils({ checkDirPathPermissions, getUserAllowedPaths }) {

    function spawnOnChildProcess(filePath) {
        const childProcess = fork(filePath);

        childProcess.on('message', (data) => {
            console.log({
                message: "received message",
                data,
            });
        });

        childProcess.on('error', (error) => {
            console.error({
                message: `error occured`,
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

    function runSystemCommand(command, cwd) {

        // 1. Check if user has the correct and matching fs permission for the directory, the user wants to execute system command on.
        let isUserAllowed = checkDirPathPermissions(cwd, "execute"),
            absoluteCwd = path.resolve(cwd);

        if (!isUserAllowed) {
            // Return a resolved Promise with an error object so the caller can handle it synchronously or asynchronously
            return Promise.resolve({
                statusOk: false,
                message: `Command Execution Failed: This path we're trying to execute the command line on, is not allowed by the user. Please add the current working directory on the app's configuration file.`,
                path: absoluteCwd,
                allowedPaths: getUserAllowedPaths(),
            });
        }

        // 2. Execute Command
        return new Promise((resolve, reject) => {
            const platform = os.platform();
            // Note: For better security, consider using execFile with an array of args instead of string interpolation
            let fullCommand = platform === 'win32' ? `cmd /c ${command}` : `sh -c "${command}"`;

            exec(fullCommand, { cwd: absoluteCwd }, (error, stdout, stderr) => {
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
                        message: `Command Execution Successful: We have successfully executed the command ${command} on ${absoluteCwd}`,
                        stdout: stdout,
                        command: command
                    });
                }
            });
        });
    };

    return {
        spawnOnChildProcess,
        getAppDataDirPath,
        runSystemCommand
    }

}



