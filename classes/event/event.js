const { EventEmitter } = require("events");
const { generateUuid } = require("mnm-node-utilities");

class Event {

    constructor(eventName) {
        this.setGlobalEventVariable();

        Object.defineProperties(this, {
            emitter: {
                value: new EventEmitter(),
                enumerable: true,
                writable: false,
            },
            eventId: {
                value: generateUuid(),
                enumerable: true,
                writable: false,
            },
            eventName: {
                value: eventName,
                enumerable: true,
                writable: false,
            },
            loggedMessageCallback: {
                value: () => {},
                writable: false,
                enumerable: true,
            },
            status: {
                value: "initialized",
                enumerable: true,
                writable: false,
            },
            messageLogs: {
                value: [],
                enumerable: true,
                writable: false,
            },
        });

        Event.addToEventList(this);
    }

    setGlobalEventVariable() {
        if (typeof global.AuraCrmEvents === "undefined") {
            global.AuraCrmEvents = Event;
        }

        Object.defineProperties(Event, {
            eventList: {
                value: [],
                enumerable: true,
                writable: false,
            }
        });
    }

    static addToEventList(eventObj) {
        Event.eventList.push({
            eventId: eventObj.eventId,
            eventName: eventObj.eventName,
            emitter: eventObj.emitter,
        });
    }

    static removeFromEventList(eventObj) {
        Event.eventList = Event.eventList.filter(item => item.eventId !== eventObj.eventId);
    }

    setloggedMessageCallback(callback) {
        this.loggedMessageCallback = callback;
    }

    addToMessageLogs(data) {
        this.messageLogs.push({
            eventId: this.eventId,
            eventName: this.eventName,
            ...data
        });

        this.loggedMessageCallback(data);
    }

    emit(eventType, payload) {
        this.addToMessageLogs({ message: `Emitting event: ${eventType}`, payload });
        this.emitter.emit(eventType, payload);
    }

    addListener(eventType, callback) {
        this.emitter.on(eventType, (...args) => {
            this.addToMessageLogs({ message: `Received event: ${eventType}`, args });
            callback(...args);
        });
    }

    getInitialListeners() {
        this.addListener("error", (error) => {
            this.addToMessageLogs({
                message: "Event emitter error",
                error
            });
        });

        this.addListener("close", () => {
            this.addToMessageLogs({
                message: "Event emitter closed"
            });

            Event.removeFromEventList(this);
        });
    }

    destroy() {
        this.emitter.removeAllListeners();
        this.addToMessageLogs({ message: "All listeners removed" });
        Event.removeFromEventList(this);
    }
}

module.exports = Event;
