Here are the documentation files for the `Event` and `Process` classes based on the robust, refactored code provided in the previous step.

---

### 1. Event Class Documentation

#### `event-class.md`

```markdown
# Event Class Documentation

The `Event` class is a wrapper around Node.js's `EventEmitter`. It provides built-in logging, unique identification for each instance, and a central registry for tracking active events. It is designed to simplify event management in the AuraCRM application.

## Table of Contents
- [Constructor](#constructor)
- [Instance Methods](#instance-methods)
- [Static Methods](#static-methods)

## Constructor

### `new Event(eventName, options?)`

Creates a new Event instance.

#### Arguments
| Argument | Type | Description |
|----------|------|-------------|
| `eventName` | `string` | The name/identifier for this event type. |
| `options` | `object` (Optional) | Configuration options. |
| `options.callback` | `function` | A callback function triggered whenever a log entry is added. Receives the log data object. |
| `options.logging` | `boolean` | Enable or disable logging. Default: `true`. |

#### Returned Value
Returns a new `Event` instance.

#### Example
```javascript
const Event = require('./Event');

const myEvent = new Event('user_login', {
    logging: true,
    callback: (data) => console.log('Log:', data.message)
});
```

---

## Instance Methods

### `emit(eventType, payload)`

Emits an event on the internal EventEmitter and logs the action.

#### Arguments
| Argument | Type | Description |
|----------|------|-------------|
| `eventType` | `string` | The name of the event to emit. |
| `payload` | `any` | The data payload to send with the event. |

#### Returned Value
`undefined`

#### Example
```javascript
myEvent.emit('success', { userId: 123 });
```

### `addListener(eventType, callback)`

Adds a listener for a specific event type. The callback receives the payload emitted by `emit`.

#### Arguments
| Argument | Type | Description |
|----------|------|-------------|
| `eventType` | `string` | The name of the event to listen for. |
| `callback` | `function` | The function to execute when the event is received. It receives the payload as its first argument. |

#### Returned Value
`undefined`

#### Example
```javascript
myEvent.addListener('success', (payload) => {
    console.log('User logged in:', payload.userId);
});
```

### `destroy()`

Stops the event emitter, removes all listeners, and removes the event from the global registry. **Always call this when the event is no longer needed to prevent memory leaks.**

#### Arguments
None

#### Returned Value
`undefined`

#### Example
```javascript
myEvent.destroy();
```

---

## Static Methods

### `Event.getAllEvents()`

Returns a list of all currently active event instances registered in `AuraCrmEvents`.

#### Arguments
None

#### Returned Value
`array` - An array of `Event` instances.

#### Example
```javascript
const activeEvents = Event.getAllEvents();
console.log(`Active events: ${activeEvents.length}`);
```

### `Event.clearAllEvents()`

Terminates and removes all currently active event instances from the registry.

#### Arguments
None

#### Returned Value
`undefined`

#### Example
```javascript
Event.clearAllEvents(); // Cleans up all events
```
```

