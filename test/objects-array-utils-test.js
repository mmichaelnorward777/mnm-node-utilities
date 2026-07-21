import getUtilities from '../index.js';
import TestRunner from './test-runner.js';

const runner = new TestRunner();

// Configuration for the utilities
const TEST_CONFIG = {
    userAllowedPaths: [] 
};

const utils = getUtilities(TEST_CONFIG);

// Destructure object-array utils functions
const {
    getValidatedPropValues,
    isObjectInArray,
    getAllObjectKeys,
    sortObjectsByDate,
    sortObjectsByPropName,
    objectToString,
    isObjectUnique,
    filterUnlistedObjects,
    shuffleArr,
    objectCompare,
    assignProps,
    deepMerge
} = utils;

runner.describe('Objects Array Utils', () => {

    // --- getValidatedPropValues ---
    runner.it('getValidatedPropValues: retrieves nested value', () => {
        const obj = { a: { b: { c: 'value' } } };
        const result = getValidatedPropValues(obj, ['a', 'b', 'c']);
        assertEqual(result, 'value');
    });

    runner.it('getValidatedPropValues: returns null for missing key', () => {
        const obj = { a: { b: 'value' } };
        const result = getValidatedPropValues(obj, ['a', 'c']);
        assertEqual(result, null);
    });

    runner.it('getValidatedPropValues: calls callback with value', () => {
        let callbackValue = null;
        const obj = { a: 1 };
        getValidatedPropValues(obj, ['a'], (val) => {
            callbackValue = val;
        });
        assertEqual(callbackValue, 1);
    });

    runner.it('getValidatedPropValues: handles empty props array', () => {
        const obj = { a: 1 };
        const result = getValidatedPropValues(obj, []);
        // If no keys, reduce returns the initial object, but we return objValue which is initially null
        // Wait, the implementation: objValue starts null. If props is empty, loop doesn't run. Returns null.
        assertEqual(result, null);
    });


    // --- isObjectInArray ---
    runner.it('isObjectInArray: finds object by all keys', () => {
        const arr = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
        const obj = { id: 1, name: 'John' };
        assertTrue(isObjectInArray(obj, arr));
    });

    runner.it('isObjectInArray: finds object by specific keys', () => {
        const arr = [{ id: 1, name: 'John', age: 30 }, { id: 2, name: 'Jane' }];
        const obj = { id: 1, name: 'John' }; // Doesn't have age
        // Check only id and name
        assertTrue(isObjectInArray(obj, arr, ['id', 'name']));
    });

    runner.it('isObjectInArray: returns false if not found', () => {
        const arr = [{ id: 1, name: 'John' }];
        const obj = { id: 2, name: 'Jane' };
        assertFalse(isObjectInArray(obj, arr));
    });


    // --- getAllObjectKeys ---
    runner.it('getAllObjectKeys: returns unique keys from multiple objects', () => {
        const objects = [
            { a: 1, b: 2 },
            { b: 3, c: 4 }
        ];
        const keys = getAllObjectKeys(objects);
        assertTrue(keys.includes('a'));
        assertTrue(keys.includes('b'));
        assertTrue(keys.includes('c'));
        assertEqual(keys.length, 3);
    });

    runner.it('getAllObjectKeys: handles empty array', () => {
        const keys = getAllObjectKeys([]);
        assertEqual(keys.length, 0);
    });


    // --- sortObjectsByDate ---
    runner.it('sortObjectsByDate: sorts ascending', () => {
        const arr = [
            { date: '2023-01-03' },
            { date: '2023-01-01' },
            { date: '2023-01-02' }
        ];
        sortObjectsByDate(arr, 'date', true);
        assertEqual(arr[0].date, '2023-01-01');
        assertEqual(arr[2].date, '2023-01-03');
    });

    runner.it('sortObjectsByDate: sorts descending', () => {
        const arr = [
            { date: '2023-01-01' },
            { date: '2023-01-03' },
            { date: '2023-01-02' }
        ];
        sortObjectsByDate(arr, 'date', false);
        assertEqual(arr[0].date, '2023-01-03');
        assertEqual(arr[2].date, '2023-01-01');
    });


    // --- sortObjectsByPropName ---
    runner.it('sortObjectsByPropName: sorts numbers ascending', () => {
        const arr = [
            { score: 10 },
            { score: 2 },
            { score: 20 }
        ];
        sortObjectsByPropName(arr, 'score', true);
        assertEqual(arr[0].score, 2);
        assertEqual(arr[2].score, 20);
    });

    runner.it('sortObjectsByPropName: sorts strings alphabetically', () => {
        const arr = [
            { name: 'Charlie' },
            { name: 'Alice' },
            { name: 'Bob' }
        ];
        sortObjectsByPropName(arr, 'name', true);
        assertEqual(arr[0].name, 'Alice');
        assertEqual(arr[2].name, 'Charlie');
    });


    // --- objectToString ---
    runner.it('objectToString: converts object to string', () => {
        const obj = { name: 'John', age: 30 };
        const str = objectToString(obj);
        // Note: Order of keys in objects is not guaranteed in JS, so we check if it contains parts
        assertTrue(str.includes('Name : John') || str.includes('age : 30')); // toNormalString capitalizes keys
        // Actually toNormalString("name") -> "Name". toNormalString(30) -> "30"
        assertTrue(str.includes('Name') && str.includes('John'));
        assertTrue(str.includes('Age') && str.includes('30'));
    });

    runner.it('objectToString: uses custom delimiter', () => {
        const obj = { a: 1, b: 2 };
        const str = objectToString(obj, '; ');
        assertTrue(str.includes('; '));
    });


    // --- isObjectUnique ---
    runner.it('isObjectUnique: returns true if object is unique in array', () => {
        const obj = { id: 1 };
        const arr = [{ id: 2 }, { id: 3 }];
        assertTrue(isObjectUnique(obj, arr));
    });

    runner.it('isObjectUnique: returns false if object exists in array', () => {
        const obj = { id: 1 };
        const arr = [{ id: 1 }, { id: 2 }];
        assertFalse(isObjectUnique(obj, arr));
    });

    runner.it('isObjectUnique: checks specific keys', () => {
        const obj = { id: 1, name: 'John' };
        const arr = [{ id: 1, name: 'Jane' }];
        // Check only by id -> Not unique
        assertFalse(isObjectUnique(obj, arr, ['id']));
        // Check by name -> Unique
        assertTrue(isObjectUnique(obj, arr, ['name']));
    });


    // --- filterUnlistedObjects ---
    runner.it('filterUnlistedObjects: filters out listed objects', () => {
        const allObjects = [
            { id: 1 },
            { id: 2 },
            { id: 3 }
        ];
        const localObjects = [
            { id: 1 }
        ];
        const filtered = filterUnlistedObjects(localObjects, allObjects);
        assertEqual(filtered.length, 2);
        assertTrue(filtered.some(o => o.id === 2));
        assertTrue(filtered.some(o => o.id === 3));
    });


    // --- shuffleArr ---
    runner.it('shuffleArr: shuffles array', () => {
        const arr = [1, 2, 3, 4, 5];
        const shuffled = shuffleArr([...arr]); // Copy to avoid mutating original test array
        assertEqual(shuffled.length, arr.length);
        // Just verify it's an array with same elements
        const sortedShuffled = [...shuffled].sort((a,b) => a-b);
        assertEqual(sortedShuffled.join(','), arr.join(','));
    });


    // --- objectCompare ---
    runner.it('objectCompare: compares simple objects', () => {
        const target = { a: 1 };
        const src = { a: 1 };
        assertTrue(objectCompare(target, src));
    });

    runner.it('objectCompare: returns false for different values', () => {
        const target = { a: 1 };
        const src = { a: 2 };
        assertFalse(objectCompare(target, src));
    });

    runner.it('objectCompare: handles arrays in values', () => {
        const target = { items: [1, 2] };
        const src = { items: [1, 2] };
        assertTrue(objectCompare(target, src));
    });

    runner.it('objectCompare: handles array inclusion', () => {
        const target = { items: [1, 2, 3] };
        const src = { items: [1, 2] }; // src is subset

        assertFalse(objectCompare(target, src, true));
    });

    runner.it('objectCompare: handles nested objects via dot notation', () => {
        const target = { user: { name: 'John' } };
        const src = { user: { name: 'John' } };
        assertTrue(objectCompare(target, src));
    });


    // --- assignProps ---
    runner.it('assignProps: assigns simple props', () => {
        const target = {};
        const source = { a: 1 };
        assignProps(target, source);
        assertEqual(target.a, 1);
    });

    runner.it('assignProps: assigns nested props', () => {
        const target = { user: {} };
        const source = { user: { name: 'John' } };
        assignProps(target, source);
        assertEqual(target.user.name, 'John');
    });

    runner.it('assignProps: initializes missing nested objects', () => {
        const target = {};
        const source = { user: { name: 'John' } };
        assignProps(target, source);
        assertTrue(typeof target.user === 'object');
        assertEqual(target.user.name, 'John');
    });


    // --- deepMerge ---
    runner.it('deepMerge: merges two objects', () => {
        const target = { a: 1, b: { c: 2 } };
        const source = { b: { d: 3 }, e: 4 };
        deepMerge(target, source);
        assertEqual(target.a, 1);
        assertEqual(target.b.c, 2);
        assertEqual(target.b.d, 3);
        assertEqual(target.e, 4);
    });

    runner.it('deepMerge: overwrites scalar values', () => {
        const target = { a: 1 };
        const source = { a: 2 };
        deepMerge(target, source);
        assertEqual(target.a, 2);
    });

    runner.it('deepMerge: handles multiple sources', () => {
        const target = { a: 1 };
        const source1 = { b: 2 };
        const source2 = { c: 3 };
        deepMerge(target, source1, source2);
        assertEqual(target.a, 1);
        assertEqual(target.b, 2);
        assertEqual(target.c, 3);
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