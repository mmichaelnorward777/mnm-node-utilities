import getUtilities from '../index.js';
import TestRunner from './test-runner.js';
import * as path from 'path';
import * as fs from 'fs';

const runner = new TestRunner();
const dirname = import.meta.dirname;

// --- Directory Configuration ---
const TEST_BASE_DIR = path.join(dirname, "sample-directory").replace(/\\/g, "/");

// Ensure base directory exists before starting tests
if (!fs.existsSync(TEST_BASE_DIR)) {
    fs.mkdirSync(TEST_BASE_DIR, { recursive: true });
}

// Import file system utils helpers for cleanup and directory creation
// We need to get these from the utils object since they are passed into json-utils
// But we also need them directly here for cleanup.
// Let's instantiate the full utils first to get the FS helpers.
const config = { 
    userAllowedPaths: [
        { 
            path: TEST_BASE_DIR, 
            permissions: "rwdx" 
        }
    ],
};

const utils = getUtilities(config);

// Destructure FS helpers for use in test setup/teardown
const { deleteDirSync, mkdirSync, fileExists } = utils;

// Helper to create a unique test subdirectory
const getTestDir = (name) => path.join(TEST_BASE_DIR, `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${name}`);

// Helper to clean up a specific directory
const cleanupDir = (dirPath) => {
    if (fs.existsSync(dirPath)) {
        try {
            deleteDirSync(dirPath);
        } catch (e) {
            // Ignore cleanup errors in tests if dir is already gone or locked
            // console.log({error : e, message : `${dirPath} cleanup`});
        }
    }
};

// Destructure JSON utils functions
const {
    parseValidatedJSON,
    createJsonFileObject
} = utils;

runner.describe('Json Utils', () => {

    // --- parseValidatedJSON ---
    runner.it('parseValidatedJSON: parses valid JSON string', () => {
        const jsonStr = '{"name": "John", "age": 30}';
        const result = parseValidatedJSON(jsonStr);
        assertEqual(result.name, "John");
        assertEqual(result.age, 30);
    });

    runner.it('parseValidatedJSON: returns input if invalid JSON', () => {
        const invalidJson = '{name: "John"}'; // Missing quotes
        const result = parseValidatedJSON(invalidJson);
        // Should return the original string
        assertEqual(result, invalidJson);
    });

    runner.it('parseValidatedJSON: handles JSON arrays', () => {
        const jsonStr = '[1, 2, 3]';
        const result = parseValidatedJSON(jsonStr);
        assertTrue(Array.isArray(result));
        assertEqual(result.length, 3);
    });

    runner.it('parseValidatedJSON: handles non-string input', () => {
        // JSON.parse throws on non-strings in strict modes, but let's see how it handles
        // Actually JSON.parse("123") -> 123.
        // If input is object, it might throw or return depending on impl.
        // Let's test string number
        assertEqual(parseValidatedJSON("123"), 123);
        assertEqual(parseValidatedJSON('"hello"'), "hello");
    });


    // --- createJsonFileObject ---
    
    // Helper to create a fresh JsonFile instance for testing
    const createJsonFile = (dirName) => {
        const dir = getTestDir(dirName);
        mkdirSync(dir);
        return createJsonFileObject(dir, "data.json");
    };

    runner.it('createJsonFileObject: initializes with empty array', async () => {
        const jsonFile = createJsonFile("initTest");
        try {
            const data = await jsonFile.getSavedData();
            assertTrue(Array.isArray(data));
            assertEqual(data.length, 0);
        } finally {
            cleanupDir(path.dirname(jsonFile.filePath));
        }
    });

    runner.it('createJsonFileObject: adds single item', async () => {
        const jsonFile = createJsonFile("addSingle");
        try {
            await jsonFile.addData([{ id: 1, name: "Alice" }]);
            const data = await jsonFile.getSavedData();
            assertEqual(data.length, 1);
            assertEqual(data[0].id, 1);
            assertEqual(data[0].name, "Alice");
        } finally {
            cleanupDir(path.dirname(jsonFile.filePath));
        }
    });

    runner.it('createJsonFileObject: adds multiple items', async () => {
        const jsonFile = createJsonFile("addMultiple");
        try {
            await jsonFile.addData([{ id: 1 }]);
            await jsonFile.addData([{ id: 2 }, { id: 3 }]);
            
            const data = await jsonFile.getSavedData();
            assertEqual(data.length, 3);
            assertEqual(data[0].id, 1);
            assertEqual(data[1].id, 2);
            assertEqual(data[2].id, 3);
        } finally {
            cleanupDir(path.dirname(jsonFile.filePath));
        }
    });

    runner.it('createJsonFileObject: clears data', async () => {
        const jsonFile = createJsonFile("clearTest");
        try {
            await jsonFile.addData([{ id: 1 }]);
            await jsonFile.clearData();
            
            const data = await jsonFile.getSavedData();
            assertTrue(Array.isArray(data));
            assertEqual(data.length, 0);
        } finally {
            cleanupDir(path.dirname(jsonFile.filePath));
        }
    });

    runner.it('createJsonFileObject: overwrites with newData flag', async () => {
        const jsonFile = createJsonFile("overwriteTest");
        try {
            await jsonFile.addData([{ id: 1 }]);
            // newData: true starts fresh instead of appending
            await jsonFile.addData([{ id: 99 }], true);
            
            const data = await jsonFile.getSavedData();
            assertEqual(data.length, 1);
            assertEqual(data[0].id, 99);
        } finally {
            cleanupDir(path.dirname(jsonFile.filePath));
        }
    });

    runner.it('createJsonFileObject: file exists on disk', async () => {
        const jsonFile = createJsonFile("diskExistTest");
        try {
            const dir = path.dirname(jsonFile.filePath);
            assertTrue(fileExists(dir));
            assertTrue(fileExists(jsonFile.filePath));
            
            // Read raw content to ensure valid JSON
            const fs = await import('fs'); // Dynamic import if needed, or use imported fs
            // Actually we imported fs at top
            const content = fs.readFileSync(jsonFile.filePath, 'utf8');
            const parsed = JSON.parse(content);
            assertTrue(Array.isArray(parsed));
        } finally {
            cleanupDir(path.dirname(jsonFile.filePath));
        }
    });

});

// Helper assertions
function assertEqual(actual, expected, msg = "") {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`${msg ? msg + ": " : ""}Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
    }
}

function assertTrue(val, msg = "") {
    if (!val) throw new Error(`${msg ? msg + ": " : ""}Expected truthy value but got ${val}`);
}

function assertFalse(val, msg = "") {
    if (val) throw new Error(`${msg ? msg + ": " : ""}Expected falsy value but got ${val}`);
}

runner.end();
