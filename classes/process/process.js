const { fork } = require("child_process");
const { DateTime } = require("luxon");
const { createJsonFileObject } = require("mnm-node-utilities");


class Process {

    constructor({filePath, processName, rootDirectory, config})   {

        if(Array.isArray(global.AuraCrmProcesses) && global.AuraCrmProcesses.length >= config.maxAllowedChildProcesses) {
            return false;
        }

        this.setGlobalProcessVariable();

        this.process = null;
        this.processId = null;
        this.filePath = filePath;
        this.processName = processName;
        this.status = null;
        this.respawnOnExit = false;
        this.messageLogs = [];
        this.messageListeners = [];
        this.messageHandlersCallback = (data) => {};

        this.currentDate = function(){
            let dt = DateTime.fromJSDate(new Date()).toObject(),
                {day, month, year} = dt;

            return `${month}-${day}-${year}`;
        }();
        

        this.taskFinished = false;

        this.messageLoggingEnabled = false;

        this.messageLogsDirPath = `${rootDirectory}/logs/process/`;

        this.logFile = null;

    }

    setGlobalProcessVariable()  {
        if (typeof global.AuraCrmProcesses === "undefined") {
            global.AuraCrmProcesses = Process;
        }

        // Only assign once
        if (!Array.isArray(Process.childProcesses)) {
            Process.childProcesses = [];
        }
    }

    setRespawnOnExit(booleanValue){
        this.respawnOnExit = booleanValue;
    }

    static addToChildProcesses(childProcessObj)    {

        Process.childProcesses.push({
            processId : childProcessObj.processId,
            filePath : childProcessObj.filePath,
            processName : childProcessObj.processName,
            process : childProcessObj.process,
        });

    }

    static removeFromChildProcesses(childProcess, onExit = false)   {

        Process.childProcesses = Process.childProcesses.filter(
            item => item.processId !== childProcess.processId
        );

        if (!onExit && childProcess.process) {
            childProcess.taskFinished = true;
            childProcess.process.kill("SIGTERM");
            childProcess.status = "killed";
        }

    }

    static terminateAllProcesses()   {

        Process.childProcesses.forEach(childProcess => {
            Process.removeFromChildProcesses(childProcess, true);
        })

    }

    start()    {

        this.process = fork(this.filePath);
        this.status = "alive";
        this.processId = this.process.pid;
        Process.addToChildProcesses(this);
        this.getInitialListeners();
        
    }

    async messageLogger(data)   {
        if(this.messageLoggingEnabled) {

            if(!this.logFile)    {
                this.logFile = createJsonFileObject(this.messageLogsDirPath, `${this.processName}-${this.currentDate}.json`);
            }

            await this.logFile.addData([data]);
        }
        
    }

    async addToMessageLogs(data)  {

        this.messageLogs.push({
            processId : this.processId,
            processName : this.processName,
            filePath : this.filePath,
            ...data
        });
        await this.messageLogger({
            processId : this.processId,
            processName : this.processName,
            filePath : this.filePath,
            ...data
        });

    }

    getInitialListeners()   {

        this.process.on('exit', async (code) => {

            await this.addToMessageLogs({
                message : `Child exited: ${code}`
            });           
            
            Process.removeFromChildProcesses(this);

            if(this.respawnOnExit)  {
                this.start();
            }
        });

        this.process.on('error', async (error) => {

            await this.addToMessageLogs({
                message : `Child process error`,
                error
            });  

            Process.removeFromChildProcesses(this);

            if(this.respawnOnExit)  {
                this.start();
            }

        });

    }

    sendToChild(data) {
        this.process.send(data)
    }

    addChildMessageListeners({type, callback}) {

        let foundListenerObj = this.messageListeners.find(item => item.type === type);

        if(foundListenerObj)   {
            foundListenerObj.callback = callback;
        } else  {
            this.messageListeners.push({type, callback});
        }

    }

    createMessageHandlersCallback() {

        this.messageHandlersCallback = (data) => {

            this.messageListeners.forEach(item => {
                if(data.type === item.type) {
                    item.callback(data);
                }
            })

        }
        
    }

    setLiveMessageListner()    {

        this.removeLiveMessageListner();

        this.createMessageHandlersCallback();

        this.process.on("message", this.messageHandlersCallback);

    } 

    removeLiveMessageListner() {

        this.process.removeListener("message", this.messageHandlersCallback);

    }

    terminate()  {
        Process.removeFromChildProcesses(this.process, false)
        this.status = "dead";
        this.process.kill("SIGTERM");
        this.process.taskFinished = true;
    }

}

module.exports = Process;

