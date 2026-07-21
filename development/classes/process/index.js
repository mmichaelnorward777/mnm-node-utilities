import * as Process from "./process";
let exitHandlerInitialized = false;

module.exports = function() {

    // ensures that all child processes are killed when the application exits;
     if (!exitHandlerInitialized) {
        process.on("exit", Process.terminateAllProcesses);
        exitHandlerInitialized = true;
    }

    function getAllChildProcesses() {
        return Process.childProcesses;
    }

    function terminateAllChildProcesses()    {
        Process.terminateAllProcesses();
    }

    function createChildProcess({filePath, processName, respawnOnExit, rootDirectory})   {
        let childProcess =  new Process({filePath, processName, rootDirectory});

        if(childProcess)    {
            childProcess.setRespawnOnExit(respawnOnExit);
            childProcess.start();
        }
        return childProcess;
    }

    return {
        createChildProcess,
        getAllChildProcesses,
        terminateAllChildProcesses,
    }

}