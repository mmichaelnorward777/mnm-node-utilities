import getUtilities from '../index.js';
import TestRunner from './test-runner.js';

const runner = new TestRunner();

// Configuration for the utilities
// Note: string-utils does not strictly require file system paths, 
// but we provide a minimal config to satisfy the main getUtilities factory.
const TEST_CONFIG = {
    userAllowedPaths: [] 
};

const utils = getUtilities(TEST_CONFIG);

// Destructure string utils functions
const {
    toUrl,
    toCapitalize,
    toCapitalizeAll,
    toNormalString,
    getInitials,
    toCamelCase
} = utils;

runner.describe('String Utils', () => {

    // --- toUrl ---
    runner.it('toUrl: converts sentence to URL slug', () => {
        assertEqual(toUrl("Hello World"), "hello-world");
    });

    runner.it('toUrl: handles mixed case and special chars', () => {
        assertEqual(toUrl("Hello World! 123"), "hello-world-123");
    });

    runner.it('toUrl: trims whitespace', () => {
        assertEqual(toUrl("  Hello  World  "), "hello-world");
    });

    runner.it('toUrl: handles single word', () => {
        assertEqual(toUrl("Hello"), "hello");
    });


    // --- toCapitalize ---
    runner.it('toCapitalize: capitalizes first letter', () => {
        assertEqual(toCapitalize("hello"), "Hello");
    });

    runner.it('toCapitalize: lowercases rest of string', () => {
        assertEqual(toCapitalize("HELLO"), "Hello");
    });

    runner.it('toCapitalize: handles empty string', () => {
        assertEqual(toCapitalize(""), "");
    });

    runner.it('toCapitalize: handles single char', () => {
        assertEqual(toCapitalize("a"), "A");
        assertEqual(toCapitalize("A"), "A");
    });


    // --- toCapitalizeAll ---
    runner.it('toCapitalizeAll: capitalizes all words', () => {
        assertEqual(toCapitalizeAll("hello world"), "Hello World");
    });
    
    runner.it('toCapitalizeAll: preserves multiple spaces', () => {
        assertEqual(toCapitalizeAll("hello   world"), "Hello   World");
    });


    // --- toNormalString ---
    runner.it('toNormalString: converts camelCase to normal', () => {
        assertEqual(toNormalString("camelCase"), "Camel case");
    });

    runner.it('toNormalString: converts kebab-case to normal', () => {
        assertEqual(toNormalString("camel-case", "kebab-case"), "Camel case");
    });

    runner.it('toNormalString: converts snake_case to normal', () => {
        assertEqual(toNormalString("camel_case", "underscored"), "Camel case");
    });

    runner.it('toNormalString: handles single word', () => {
        assertEqual(toNormalString("hello"), "Hello");
    });

    runner.it('toNormalString: handles empty string', () => {
        assertEqual(toNormalString(""), "");
    });


    // --- getInitials ---
    runner.it('getInitials: gets initials from full name', () => {
        assertEqual(getInitials("John Doe"), "JD");
    });

    runner.it('getInitials: gets initials from single name', () => {
        assertEqual(getInitials("John"), "J");
    });

    runner.it('getInitials: handles multiple middle names', () => {
        assertEqual(getInitials("John Michael Doe"), "JMD");
    });

    runner.it('getInitials: handles empty string', () => {
        assertEqual(getInitials(""), null);
    });

    runner.it('getInitials: handles null input', () => {
        assertEqual(getInitials(null), null);
    });


    // --- toCamelCase ---
    runner.it('toCamelCase: converts string to camelCase', () => {
        assertEqual(toCamelCase("hello world"), "helloWorld");
    });

    runner.it('toCamelCase: converts kebab-case to camelCase', () => {
        assertEqual(toCamelCase("hello-world", true), "helloWorld");
    });

    runner.it('toCamelCase: handles initial capitalization', () => {
        assertEqual(toCamelCase("hello world", false, true), "HelloWorld");
    });

    runner.it('toCamelCase: handles single word', () => {
        assertEqual(toCamelCase("hello"), "hello");
        assertEqual(toCamelCase("hello", false, true), "Hello");
    });

    runner.it('toCamelCase: handles empty string', () => {
        assertEqual(toCamelCase(""), "");
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
