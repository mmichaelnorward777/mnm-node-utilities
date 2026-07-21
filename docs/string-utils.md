## Module: `string-utils`

This module provides a set of utility functions for string manipulation, including formatting, case conversion, slug generation, and abbreviation extraction. These utilities are essential for preparing data for URLs, database keys, or user-facing display text.

### Testing the Module

To run the tests for this module, ensure you are in the project root directory and execute the following command:

```bash
npm run test-string-utils
```

### API Reference

#### 1. `toUrl(str)`

Converts a string into a URL-friendly slug by lowercasing, trimming, removing special characters, and replacing spaces with hyphens.

*   **Arguments:**
    *   `str` (`string`): The input string to convert.
*   **Returns:**
    *   `string`: A URL-safe slug (e.g., `"hello-world"`).
*   **Throws:**
    *   None.

#### 2. `toCapitalize(str)`

Capitalizes the first letter of a string and lowercases the rest.

*   **Arguments:**
    *   `str` (`string`): The input string.
*   **Returns:**
    *   `string`: The capitalized string (e.g., `"Hello"`).
*   **Throws:**
    *   None.

#### 3. `toCapitalizeAll(str)`

Capitalizes the first letter of every word in a string.

*   **Arguments:**
    *   `str` (`string`): The input string.
*   **Returns:**
    *   `string`: The string with all words capitalized (e.g., `"Hello World"`).
*   **Throws:**
    *   None.

#### 4. `toNormalString(str, previousFormat)`

Converts a formatted string (like `camelCase`, `kebab-case`, or `snake_case`) into a readable "Normal Case" string with spaces.

*   **Arguments:**
    *   `str` (`string`): The input string.
    *   `previousFormat` (`string`, optional): The previous formatting style.
        *   `"camel-case"` (default): e.g., `"helloWorld"` -> `"Hello World"`.
        *   `"kebab-case"`: e.g., `"hello-world"` -> `"Hello World"`.
        *   `"underscored"`: e.g., `"hello_world"` -> `"Hello World"`.
*   **Returns:**
    *   `string`: The normalised string (e.g., `"Hello World"`).
*   **Throws:**
    *   None.

#### 5. `getInitials(str)`

Extracts the initials from a full name or string.

*   **Arguments:**
    *   `str` (`string`): The input string (e.g., `"John Doe"`).
*   **Returns:**
    *   `string` | `null`: The initials in uppercase (e.g., `"JD"`), or `null` if the input is empty or null.
*   **Throws:**
    *   None.

#### 6. `toCamelCase(str, url, initialCap)`

Converts a string into `camelCase` or `PascalCase`.

*   **Arguments:**
    *   `str` (`string`): The input string.
    *   `url` (`boolean`, optional): If `true`, treats hyphens (`-`) as separators instead of spaces.
    *   `initialCap` (`boolean`, optional): If `true`, capitalizes the first letter of the resulting camelCase string (PascalCase).
*   **Returns:**
    *   `string`: The camelCase string (e.g., `"helloWorld"` or `"HelloWorld"`).
*   **Throws:**
    *   None.