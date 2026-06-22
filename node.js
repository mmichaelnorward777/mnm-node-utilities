const { fork, exec } = require('child_process');
const path = require("path");
const { writeFile, createDirPath } = require('./file-system');
const { EventEmitter } = require("events");
const globalEvent = new EventEmitter();
const os = require('os');

function registerWindowEvent(windowId, object, eventName, callback)  {

    if(!Array.isArray(global.eventListenersObject))  {
        global.eventListenersObject = [];
    }

    let foundRegisteredListener = global.eventListenersObject.find(item => item.windowId === windowId && item.eventName === eventName && item.object === object);

    if(!foundRegisteredListener) {
        object.on(eventName, callback);
        global.eventListenersObject.push({
            windowId,
            eventName,
            object,
            callback,
        });
    } 
    
}

function spawnOnChildProcess(filePath) {
    const childProcess = fork(filePath);
  
    childProcess.on('message', (data) => {
        console.log({
            message : "received message",
            data,
        });
    });
  
    childProcess.on('error', (error) => {
        console.error({
            message : `error occured`,
            error,
        });
    });
  
    childProcess.on('close', (code) => {
        console.log({
            message : `child process exited with code : ${code}`
        });
    });

    return childProcess;
}

async function createNodeModule(targetPath, fileName, textData) {
    let dirPath = await createDirPath(targetPath),
        filePath = path.join(dirPath, fileName),
        writeResult = await writeFile(filePath, textData);

    return writeResult;
}

function getRequestResult(result, status = 200, contentType = "application/json") {
    let obj = {
        contentType,
        status : status,
        data : contentType === "application/json" ? JSON.stringify(result, null, 4) : result,
    };
    return obj;
}

function sendDataToMainProcess(channel, data)   {

    globalEvent.emit(channel, data);

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
    return new Promise((resolve, reject) => {
        const platform = os.platform();
        let fullCommand;

        if (platform === 'win32') {
            // Windows example: list directory
            fullCommand = `cmd /c ${command}`;
        } else {
            // Linux and macOS example: list directory
            fullCommand = `sh -c "${command}"`;
        }

        exec(fullCommand, { cwd: cwd }, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout);
        });
    });
}

module.exports = {
    globalEvent,
    registerWindowEvent,
    spawnOnChildProcess,
    getRequestResult,
    createNodeModule,
    sendDataToMainProcess,
    getAppDataDirPath
}