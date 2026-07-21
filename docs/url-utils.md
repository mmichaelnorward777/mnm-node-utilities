## Module: `url-utils`

This module provides a suite of utility functions for parsing, constructing, and manipulating URLs and query strings. It handles complex nested query parameters, converts between different object notations (dot notation vs. standard objects), and extracts domain information.

### Testing the Module

To run the tests for this module, execute the following command from the project root:

```bash
npm run test-url-utils
```

### API Reference

#### 1. `urlConstructor(urlString)`

Constructs a normalized URL string from a potentially incomplete input. If the protocol is missing, it defaults to `https://`.

*   **Arguments:**
    *   `urlString` (`string`): The URL to construct.
*   **Returns:**
    *   `string`: The normalized URL (e.g., `"https://example.com/path?query=1"`).
*   **Throws:**
    *   None.

#### 2. `objectToQueryString(obj, prefix)`

Converts a JavaScript object into a URL-encoded query string. It supports nested objects and arrays.

*   **Arguments:**
    *   `obj` (`Object`): The object to convert.
    *   `prefix` (`string`, optional): A prefix key for nested objects (used internally for recursion).
*   **Returns:**
    *   `string`: The query string (e.g., `"name=John&user[email]=j@e.com"`).
*   **Throws:**
    *   None.

#### 3. `queryStringToObject(queryString)`

Converts a URL-encoded query string back into a JavaScript object. It handles nested keys (e.g., `user[name]`) and arrays (e.g., `items[]`).

*   **Arguments:**
    *   `queryString` (`string`): The query string to parse (with or without leading `?`).
*   **Returns:**
    *   `Object`: The parsed JavaScript object.
*   **Throws:**
    *   None.

#### 4. `urlToQueryStringObject(urlString, trailingSlash)`

Parses a full URL into a structured object containing the origin, pathname, and parsed query parameters.

*   **Arguments:**
    *   `urlString` (`string`): The full URL to parse.
    *   `trailingSlash` (`boolean`, optional): If `true`, ensures the pathname ends with a slash.
*   **Returns:**
    *   `Object` | `null`: An object containing `queryObject`, `originalUrl`, `origin`, `pathName`, `queryString`, and `urlWithoutQueryString`. Returns `null` if the URL is invalid.
*   **Throws:**
    *   None.

#### 5. `objectToDotNotation(obj, prefix, res)`

Flattens a nested JavaScript object into dot notation keys (e.g., `user.name`).

*   **Arguments:**
    *   `obj` (`Object`): The nested object to flatten.
    *   `prefix` (`string`, optional): The current key prefix (used for recursion).
    *   `res` (`Object`, optional): The accumulator object for the result.
*   **Returns:**
    *   `Object`: The flattened object (e.g., `{ 'user.name': 'John' }`).
*   **Throws:**
    *   None.

#### 6. `dotNotationToObject(dotObj)`

Reconstructs a nested JavaScript object from a flat object with dot notation keys.

*   **Arguments:**
    *   `dotObj` (`Object`): The flat object with dot notation keys.
*   **Returns:**
    *   `Object`: The nested object.
*   **Throws:**
    *   None.

#### 7. `getDomain(url)`

Extracts the domain name from a URL, removing the protocol (`http://`, `https://`) and `www.` prefix.

*   **Arguments:**
    *   `url` (`string`): The URL to process.
*   **Returns:**
    *   `string`: The domain name (e.g., `"example.com"`).
*   **Throws:**
    *   None.

#### 8. `checkSubDomain(mainUrl, subUrl)`

Checks if `subUrl` is a subdomain of `mainUrl`.

*   **Arguments:**
    *   `mainUrl` (`string`): The main domain URL.
    *   `subUrl` (`string`): The subdomain URL to check.
*   **Returns:**
    *   `boolean`: `true` if `subUrl` is a subdomain of `mainUrl`; `false` otherwise.
*   **Throws:**
    *   None.