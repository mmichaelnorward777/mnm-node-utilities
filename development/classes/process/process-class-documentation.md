### Process Class Documentation

#### `process-class.md`

```markdown
# Process Class Documentation

The `Process` class manages Node.js child processes (`fork`). It handles process lifecycle (start, stop, respawn), message passing, and persistent logging to JSON files. It includes safety mechanisms to prevent crash loops and memory leaks.

## Table of Contents
- [Constructor](#constructor)
- [Instance Methods](#instance-methods)
- [Static Methods](#static-methods)

## Constructor

### `new Process(config)`

Creates a new Process wrapper instance. Note: The process is **not** started immediately. You must call `initialize()` and then `start()`.

#### Arguments
| Argument | Type | Description |
|----------|------|-------------|
| `config` | `object` | Configuration for the process. |
| `config.filePath` | `string` | Path to the script to fork. |
| `config.processName` | `string` | A human-readable name for this process (used in logs). |
| `config.rootDirectory` | `string` | Base directory for logs. |
| `config.maxAllowedChildProcesses` | `number` | Maximum number of allowed child processes. |

#### Returned Value
Returns a new `Process` instance.

#### Example
```javascript
const Process = require('./Process');

const worker = new Process({
    filePath: './workers/worker.js',
    processName: 'DataProcessor',
    rootDirectory: './',
    maxAllowedChildProcesses: 5
});
```

---

## Instance Methods

### `initialize()`

Async method. Initializes the process, checks if the max process limit is reached, and sets up the logging file. Must be called before `start()`.

#### Arguments
None

#### Returned Value
`Promise<void>` - Resolves when initialization is complete.

#### Example
```javascript
await worker.initialize();
```

### `start()`

Async method. Forks the child process, sets up listeners, and registers the process in the global registry.

#### Arguments
None

#### Returned Value
`Promise<void>` - Resolves when the process is alive and listening.

#### Example
```javascript
await worker.start();
```

### `setRespawnOnExit(booleanValue)`

Configures whether the process should automatically restart if it exits unexpectedly.

#### Arguments
| Argument | Type | Description |
|----------|------|-------------|
| `booleanValue` | `boolean` | `true` to enable auto-respawn, `false` to disable. |

#### Returned Value
`undefined`

#### Example
```javascript
worker.setRespawnOnExit(true);
```

### `sendToChild(data)`

Sends a message to the running child process.

#### Arguments
| Argument | Type | Description |
|----------|------|-------------|
| `data` | `any` | The message or object to send to the child. |

#### Returned Value
`undefined`

#### Throws
`Error` if the process is not currently running.

#### Example
```javascript
worker.sendToChild({ action: 'process_data', id: 1 });
```

### `addChildMessageListeners({ type, callback })`

Registers a callback to be executed when a specific type of message is received from the child process.

#### Arguments
| Argument | Type | Description |
|----------|------|-------------|
| `config` | `object` | Configuration for the listener. |
| `config.type` | `string` | The type identifier of the message to listen for. |
| `config.callback` | `function` | The function to run when a message with that type is received. Receives the full message object. |

#### Returned Value
`undefined`

#### Example
```javascript
worker.addChildMessageListeners({
    type: 'result',
    callback: (msg) => console.log('Result:', msg.payload)
});
```

### `setLiveMessageListner()`

Activates the message listeners. If listeners were already added via `addChildMessageListeners`, this binds them to the child process. Call this after `start()`.

#### Arguments
None

#### Returned Value
`undefined`

#### Example
```javascript
worker.setLiveMessageListner();
```

### `terminate(force = false)`

Stops the child process, removes it from the registry, and logs the termination.

#### Arguments
| Argument | Type | Description |
|----------|------|-------------|
| `force` | `boolean` (Optional) | Not currently used differently, but included for future API consistency. |

#### Returned Value
`undefined`

#### Example
```javascript
worker.terminate();
```

---

## Static Methods

### `Process.canSpawn()`

Checks if a new process can be spawned based on the global limit.

#### Arguments
None

#### Returned Value
`boolean` - `true` if a new process can be created, `false` otherwise.

#### Example
```javascript
if (Process.canSpawn()) {
    new Process(...).start();
}
```

### `Process.terminateAllProcesses()`

Terminates all managed child processes and clears the registry.

#### Arguments
None

#### Returned Value
`undefined`

#### Example
```javascript
Process.terminateAllProcesses();
```
