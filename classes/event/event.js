const { EventEmitter } = require("events");
const { generateUuid } = require("mnm-node-utilities");

class Event {
    // Static Registry
    static eventList = [];
    static maxLogSize = 100; // Prevent memory bloat

    constructor(eventName, options = {}) {
        this.eventId = generateUuid();
        this.eventName = eventName;
        this.status = "initialized";
        
        // Internal State
        this.emitter = new EventEmitter();
        this.emitter.setMaxListeners(0); // Prevent warnings if many listeners
        
        // Logging
        this.messageLogs = [];
        this.loggedMessageCallback = options.callback || (() => {});
        this.enableLogging = options.logging !== false; // Default on

        // Register in global list
        if (!global.AuraCrmEvents) global.AuraCrmEvents = Event;
        Event.eventList.push(this);

        // Auto-setup internal listeners
        this._setupInternalListeners();
    }

    _setupInternalListeners() {
        // Error Handler
        this.emitter.on("error", (err) => {
            this._log({ type: "error", message: "Event emitter error", error: err });
        });

        // Close Handler (Optional: Auto-remove from list if you want)
        // Note: 'close' is emitted by emitter after removeAllListeners
        this.emitter.on("close", () => {
            this.status = "closed";
            this._log({ type: "info", message: "Event emitter closed" });
            Event.removeFromEventList(this);
        });
    }

    // Helper for logging to avoid duplication
    _log(data) {
        if (!this.enableLogging) return;

        // Keep log size manageable
        if (this.messageLogs.length >= Event.maxLogSize) {
            this.messageLogs.shift(); // Remove oldest
        }

        this.messageLogs.push({
            eventId: this.eventId,
            eventName: this.eventName,
            timestamp: new Date().toISOString(),
            ...data
        });

        try {
            this.loggedMessageCallback(data);
        } catch (e) {
            console.error("Error in loggedMessageCallback:", e);
        }
    }

    emit(eventType, payload) {
        this._log({ type: "emit", message: `Emitting ${eventType}`, payload });
        this.emitter.emit(eventType, payload);
    }

    addListener(eventType, callback) {
        this.emitter.on(eventType, (...args) => {
            this._log({ type: "receive", message: `Received ${eventType}`, args });
            callback(...args);
        });
    }

    destroy() {
        this.status = "destroyed";
        this.emitter.removeAllListeners();
        this.emitter.emit("close"); // Trigger close handler
        this._log({ type: "destroy", message: "Destroyed" });
    }

    static removeFromEventList(eventObj) {
        Event.eventList = Event.eventList.filter(e => e.eventId !== eventObj.eventId);
    }

    static getAllEvents() {
        return [...Event.eventList]; // Return copy
    }
    
    static clearAllEvents() {
        Event.eventList.forEach(e => e.destroy());
        Event.eventList = [];
    }
}

module.exports = Event;
