const { fork } = require("child_process");
const { DateTime } = require("luxon");
const { createJsonFileObject } = require("mnm-node-utilities");

class Process {
    // Static Registry
    static childProcesses = [];
    static maxAllowedChildProcesses = 10; // Define this in config

    constructor({ filePath, processName, rootDirectory, config }) {
        this.filePath = filePath;
        this.processName = processName;
        this.rootDirectory = rootDirectory;
        this.config = config;
        
        this.process = null;
        this.processId = null;
        this.status = "stopped"; // stopped, alive, killed
        this.respawnOnExit = false;
        
        this.messageLogs = [];
        this.messageListeners = [];
        this.messageHandlersCallback = () => {};
        
        this.currentDate = DateTime.now().toFormat("M-d-yyyy"); // Use Luxon directly
        this.messageLoggingEnabled = false;
        this.messageLogsDirPath = `${rootDirectory}/logs/process/`;
        this.logFile = null;
        
        this._isStopping = false; // Flag to prevent respawn during manual terminate
    }

    setGlobalProcessVariable() {
        if (typeof global.AuraCrmProcesses === "undefined") {
            global.AuraCrmProcesses = Process;
        }
        if (!Array.isArray(Process.childProcesses)) {
            Process.childProcesses = [];
        }
    }

    static getActiveCount() {
        return Process.childProcesses.length;
    }

    static canSpawn() {
        return Process.getActiveCount() < (Process.maxAllowedChildProcesses || 10);
    }

    async initialize() {
        this.setGlobalProcessVariable();
        
        if (!Process.canSpawn()) {
            throw new Error("Max child processes reached");
        }

        // Initialize log file asynchronously
        if (this.messageLoggingEnabled) {
            this.logFile = await createJsonFileObject(this.messageLogsDirPath, `${this.processName}-${this.currentDate}.json`);
        }
    }

    async start() {
        if (this.status === "alive") return; // Already running

        try {
            this.process = fork(this.filePath);
            this.status = "alive";
            this.processId = this.process.pid;
            
            Process.addToChildProcesses(this);
            this.getInitialListeners();
            this.setLiveMessageListner();
            
            await this.addToMessageLogs({ message: `Child started: PID ${this.processId}` });
        } catch (error) {
            await this.addToMessageLogs({ message: "Failed to start child process", error });
            this.status = "error";
            throw error;
        }
    }

    static addToChildProcesses(processInstance) {
        if (!Process.childProcesses.find(p => p.processId === processInstance.processId)) {
            Process.childProcesses.push({
                processId: processInstance.processId,
                filePath: processInstance.filePath,
                processName: processInstance.processName,
                process: processInstance, // Store the instance, not the child object
            });
        }
    }

    static removeFromChildProcesses(processInstance) {
        Process.childProcesses = Process.childProcesses.filter(
            item => item.processId !== processInstance.processId
        );
    }

    static terminateAllProcesses() {
        // Create a copy to iterate safely
        [...Process.childProcesses].forEach(item => {
            // item.process is the Process instance
            if (item.process) {
                item.process.terminate(true); // Force terminate
            }
        });
        Process.childProcesses = [];
    }

    async addToMessageLogs(data) {
        const logEntry = {
            processId: this.processId,
            processName: this.processName,
            filePath: this.filePath,
            timestamp: new Date().toISOString(),
            ...data
        };

        this.messageLogs.push(logEntry);

        if (this.messageLoggingEnabled && this.logFile) {
            try {
                await this.logFile.addData([logEntry]);
            } catch (e) {
                console.error("Logging error:", e);
            }
        }
    }

    getInitialListeners() {
        this.process.on('exit', async (code) => {
            this.status = "exited";
            await this.addToMessageLogs({ message: `Child exited: ${code}` });
            
            Process.removeFromChildProcesses(this);
            
            // Only respawn if not manually stopped and flag is set
            if (!this._isStopping && this.respawnOnExit) {
                await this.addToMessageLogs({ message: "Respawning process..." });
                // Small delay to prevent crash loops
                setTimeout(() => this.start(), 1000); 
            }
        });

        this.process.on('error', async (error) => {
            await this.addToMessageLogs({ message: "Child process error", error });
            // Error doesn't always mean exit, but we should handle it
        });
    }

    sendToChild(data) {
        if (this.status !== "alive" || !this.process) {
            throw new Error("Process is not running");
        }
        this.process.send(data);
    }

    addChildMessageListeners({ type, callback }) {
        const existing = this.messageListeners.find(item => item.type === type);
        if (existing) {
            existing.callback = callback;
        } else {
            this.messageListeners.push({ type, callback });
        }
    }

    createMessageHandlersCallback() {
        this.messageHandlersCallback = (data) => {
            this.messageListeners.forEach(item => {
                if (data.type === item.type) {
                    item.callback(data);
                }
            });
        };
    }

    setLiveMessageListner() {
        this.removeLiveMessageListner();
        this.createMessageHandlersCallback();
        this.process.on("message", this.messageHandlersCallback);
    }

    removeLiveMessageListner() {
        if (this.process && this.messageHandlersCallback) {
            this.process.removeListener("message", this.messageHandlersCallback);
        }
    }

    terminate(force = false) {
        this._isStopping = true;
        this.status = "killing";
        
        Process.removeFromChildProcesses(this);
        this.removeLiveMessageListner();
        
        if (this.process) {
            try {
                this.process.kill("SIGTERM");
            } catch (e) {
                console.error("Kill error:", e);
            }
        }
        
        this.status = "dead";
        this.addToMessageLogs({ message: "Terminated" }).catch(() => {}); // Ignore logging errors on destroy
    }
}

module.exports = Process;