import getUtilities from '../index.js';
import TestRunner from './test-runner.js';

const runner = new TestRunner();

// Configuration for the utilities
const TEST_CONFIG = {
    userAllowedPaths: [] 
};

const utils = getUtilities(TEST_CONFIG);

// Destructure url utils functions
const {
    urlConstructor,
    objectToQueryString,
    queryStringToObject,
    urlToQueryStringObject,
    objectToDotNotation,
    dotNotationToObject,
    getDomain,
    checkSubDomain,
    cleanApiUrl
} = utils;

runner.describe('Url Utils', () => {

    // --- urlConstructor ---
    runner.it('urlConstructor: parses https URL', () => {
        const result = urlConstructor('https://example.com/path?query=1');
        assertEqual(result, 'https://example.com/path?query=1');
    });

    runner.it('urlConstructor: defaults to https', () => {
        const result = urlConstructor('example.com/path');
        assertEqual(result, 'https://example.com/path');
    });

    runner.it('urlConstructor: parses http URL', () => {
        const result = urlConstructor('http://example.com/path');
        assertEqual(result, 'http://example.com/path');
    });


    // --- objectToQueryString ---
    runner.it('objectToQueryString: simple object', () => {
        const obj = { name: 'John', age: 30 };
        const result = objectToQueryString(obj);
        // Note: Order might vary, so we check if it includes key parts
        assertTrue(result.includes('name=John'));
        assertTrue(result.includes('age=30'));
    });

    runner.it('objectToQueryString: nested object', () => {
        const obj = { user: { name: 'John' } };
        const result = objectToQueryString(obj);
        assertTrue(result.includes('user%5Bname%5D=John')); // URL encoded brackets
    });

    runner.it('objectToQueryString: handles arrays', () => {
        const obj = { items: ['a', 'b'] };
        const result = objectToQueryString(obj);
        // Implementation pushes each item with prefix[]
        assertTrue(result.includes('items%5B%5D=a'));
        assertTrue(result.includes('items%5B%5D=b'));
    });

    runner.it('objectToQueryString: skips null/undefined', () => {
        const obj = { name: 'John', age: null, city: undefined };
        const result = objectToQueryString(obj);
        assertTrue(result.includes('name=John'));
        assertFalse(result.includes('age'));
        assertFalse(result.includes('city'));
    });


    // --- queryStringToObject ---
    runner.it('queryStringToObject: simple query', () => {
        const qs = 'name=John&age=30';
        const result = queryStringToObject(qs);
        assertEqual(result.name, 'John');
        assertEqual(result.age, '30');
    });

    runner.it('queryStringToObject: nested query', () => {
        const qs = 'user[name]=John';
        const result = queryStringToObject(qs);
        assertEqual(result.user.name, 'John');
    });

    runner.it('queryStringToObject: array query', () => {
        const qs = 'items[]=a&items[]=b';
        const result = queryStringToObject(qs);
        assertTrue(Array.isArray(result.items));
        assertEqual(result.items.length, 2);
        assertEqual(result.items[0], 'a');
        assertEqual(result.items[1], 'b');
    });


    // --- urlToQueryStringObject ---
    runner.it('urlToQueryStringObject: parses full URL', () => {
        const result = urlToQueryStringObject('https://example.com/path?name=John&age=30');
        assertTrue(result !== null);
        assertEqual(result.origin, 'https://example.com');
        assertEqual(result.pathName, 'path');
        assertEqual(result.queryObject.name, 'John');
        assertEqual(result.queryObject.age, '30');
    });

    runner.it('urlToQueryStringObject: handles trailing slash', () => {
        const result = urlToQueryStringObject('https://example.com/path/', true);
        assertEqual(result.pathName, 'path/');
    });

    runner.it('urlToQueryStringObject: invalid URL returns null', () => {
        const result = urlToQueryStringObject('invalid-url');
        assertEqual(result, null);
    });


    // --- objectToDotNotation ---
    runner.it('objectToDotNotation: simple object', () => {
        const obj = { name: 'John', age: 30 };
        const result = objectToDotNotation(obj);
        assertEqual(result.name, 'John');
        assertEqual(result.age, 30);
    });

    runner.it('objectToDotNotation: nested object', () => {
        const obj = { user: { name: 'John' } };
        const result = objectToDotNotation(obj);
        assertEqual(result['user.name'], 'John');
    });

    runner.it('objectToDotNotation: ignores arrays', () => {
        const obj = { items: ['a', 'b'] };
        const result = objectToDotNotation(obj);
        // Arrays are treated as non-objects, so they are assigned as is
        assertTrue(Array.isArray(result.items));
    });


    // --- dotNotationToObject ---
    runner.it('dotNotationToObject: simple keys', () => {
        const obj = { name: 'John', age: 30 };
        const result = dotNotationToObject(obj);
        assertEqual(result.name, 'John');
        assertEqual(result.age, 30);
    });

    runner.it('dotNotationToObject: dot keys', () => {
        const obj = { 'user.name': 'John', 'user.age': 30 };
        const result = dotNotationToObject(obj);
        assertEqual(result.user.name, 'John');
        assertEqual(result.user.age, 30);
    });


    // --- getDomain ---
    runner.it('getDomain: extracts domain from URL', () => {
        assertEqual(getDomain('https://example.com/path'), 'example.com');
    });

    runner.it('getDomain: removes www', () => {
        assertEqual(getDomain('https://www.example.com/path'), 'example.com');
    });

    runner.it('getDomain: handles plain domain', () => {
        assertEqual(getDomain('example.com'), 'example.com');
    });


    // --- checkSubDomain ---
    runner.it('checkSubDomain: true match', () => {
        assertTrue(checkSubDomain('example.com', 'sub.example.com'));
    });

    runner.it('checkSubDomain: false match', () => {
        assertFalse(checkSubDomain('example.com', 'other.com'));
    });

    runner.it('checkSubDomain: case insensitive', () => {
        assertTrue(checkSubDomain('Example.Com', 'sub.EXAMPLE.com'));
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
