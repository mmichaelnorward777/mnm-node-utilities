export default function initializeCallbackRegistry(utils, mcpTools, z)   {
    // In-memory singleton registry (cached once per server instance)
    const callbackRegistry = new Map();

    utils.registerCallback = function(id, fn) {
        if (typeof fn !== 'function') {
            throw new TypeError(`Callback '${id}' must be a function`);
        }
        callbackRegistry.set(id, fn);
        return { id, registered: true };
    }

    utils.getCallback = function(id) {
        return callbackRegistry.get(id) || null;
    }

    utils.removeCallback = function(id) {
        const exists = callbackRegistry.has(id);
        callbackRegistry.delete(id);
        return { id, wasRegistered: exists };
    }

    utils.listCallbacks = function () {
        return Array.from(callbackRegistry.keys());
    }

    utils.clearRegistry = function() {
        const count = callbackRegistry.size;
        callbackRegistry.clear();
        return count;
    }

    const mcpToolsExtension = {
        registerCallback: {
            urlName: "register-callback",
            title: "Register Callback",
            description: "Registers an async function as a reusable callback. Returns a unique ID for later use in tools like moderator or waitForCondition.",
            inputSchema: z.object({
                id: z.string().describe("Unique identifier for the callback"),
                fnCode: z.string().describe("Async function code as a plain string (e.g., 'async (chunk) => { console.log(chunk) }')")
            }),
            outputSchema: z.object({
                result: z.object({
                id: z.string(),
                registered: z.boolean(),
                message: z.string()
                })
            }),
            metadata: { group: "callback-registry" },
            handler: async ({ id, fnCode }) => {
                try {
                // Safely convert string to async function
                const fn = new Function(`return ${fnCode}`)();
                const result = utils.registerCallback(id, fn);
                return { content: [{ type: "text", text: JSON.stringify({ result: { ...result, message: "Callback registered successfully" } }) }] };
                } catch (error) {
                return { content: [{ type: "text", text: JSON.stringify({ result: { id, registered: false, message: `Registration failed: ${error.message}` } }) }] };
                }
            }
        },
        getCallback: {
            urlName: "get-callback-status",
            title: "Get Callback Status",
            description: "Checks if a callback exists in the registry by ID.",
            inputSchema: z.object({
                id: z.string().describe("The callback ID to check")
            }),
            outputSchema: z.object({
                result: z.object({
                id: z.string(),
                registered: z.boolean(),
                hasFunction: z.boolean()
                })
            }),
            metadata: { group: "callback-registry" },
            handler: async ({ id }) => {
                const callback = utils.getCallback(id);
                const result = { id, registered: true, hasFunction: !!callback };
                return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
            }
        },
        removeCallback: {
            urlName: "remove-callback",
            title: "Remove Callback",
            description: "Removes a registered callback by ID to free memory.",
            inputSchema: z.object({
                id: z.string().describe("The callback ID to remove")
            }),
            outputSchema: z.object({
                result: z.object({
                id: z.string(),
                wasRegistered: z.boolean(),
                message: z.string()
                })
            }),
            metadata: { group: "callback-registry" },
            handler: async ({ id }) => {
                const result = utils.removeCallback(id);
                return { content: [{ type: "text", text: JSON.stringify({ result: { ...result, message: result.wasRegistered ? "Callback removed successfully" : "Callback not found" } }) }] };
            }
        },
        listCallbacks: {
            urlName: "list-callbacks",
            title: "List Registered Callbacks",
            description: "Returns an array of all currently registered callback IDs.",
            inputSchema: z.object({}),
            outputSchema: z.object({
                result: z.array(z.string()).describe("Array of registered callback IDs")
            }),
            metadata: { group: "callback-registry" },
            handler: async () => {
                const result = utils.listCallbacks();
                return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
            }
        },
        clearRegistry: {
            urlName: "clear-callback-registry",
            title: "Clear Callback Registry",
            description: "Removes all registered callbacks from memory. Useful during server restarts or cleanup.",
            inputSchema: z.object({}),
            outputSchema: z.object({
                result: z.object({
                clearedCount: z.number(),
                message: z.string()
                })
            }),
            metadata: { group: "callback-registry" },
            handler: async () => {
                const count = utils.clearRegistry();
                return { content: [{ type: "text", text: JSON.stringify({ result: { clearedCount: count, message: `Cleared ${count} callback(s)` } }) }] };
            }
        },
        debounce: {
            urlName: "debounce",
            title: "Debounce",
            description: "Creates a debounced version of a registered callback, delaying invocation until after the specified delay has elapsed since the last invocation.",
            inputSchema: z.object({
                fnId: z.string().describe("ID of the registered callback to debounce"),
                delay: z.number().optional().default(2500).describe("Delay in milliseconds (default: 2500)")
            }),
            outputSchema: z.object({
                result: z.object({ status: z.string(), fnId: z.string(), delay: z.number() })
            }),
            metadata: { group: "general-utilities" },
            handler: async ({ fnId, delay }) => {
                const result = utils.debounce(utils.getCallback(fnId), delay);
                return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
            }
        },
        waitForCondition: {
            urlName: "wait-for-condition",
            title: "Wait For Condition",
            description: "Polls a registered condition callback at a fixed interval until it returns true, then optionally executes a success callback and resolves.",
            inputSchema: z.object({
                conditionId: z.string().describe("ID of the registered condition callback (must return boolean)"),
                onTrueId: z.string().optional().describe("ID of the registered success callback to run when condition is met"),
                messageId: z.string().optional().describe("ID of the registered progress callback (runs every 10 loops)"),
                timeout: z.number().optional().describe("Maximum wait time in milliseconds (default: 30000)")
            }),
            outputSchema: z.object({
                result: z.object({ status: z.string() }).describe("Final status of wait operation")
            }),
            metadata: { group: "general-utilities" },
            handler: async ({ conditionId, onTrueId, messageId }) => {
                const result = await utils.waitForCondition({ conditionCallback : utils.getCallback(conditionId), onTrueCallback : utils.getCallback(onTrueId), messageCallback : utils.getCallback(messageId) });
                return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
            }
        },
        moderator: {
            urlName: "moderator",
            title: "Moderator (Chunked Processing)",
            description: "Processes an array in configurable chunks using a registered callback to prevent event loop blocking.",
            inputSchema: z.object({
                arr: z.array(z.any()).describe("Array of items to process"),
                callbackId: z.string().describe("ID of the registered async callback. Signature: (chunk, firstIndex, lastIndex, globalIndex)"),
                bulkCount: z.number().optional().default(5).describe("Chunk size (default: 5)")
            }),
            outputSchema: z.object({
                result: z.object({ status: z.string() }).describe("Processing completion status")
            }),
            metadata: { group: "general-utilities" },
            handler: async ({ arr, callbackId, bulkCount }) => {
                const result = await utils.moderator(arr, utils.getCallback(callbackId), bulkCount);
                return { content: [{ type: "text", text: JSON.stringify({ result }) }] };
            }
        },
    }

    Object.assign(mcpTools, mcpToolsExtension);

}
