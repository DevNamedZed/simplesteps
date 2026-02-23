# Compile-Time Constants

Module-level `const` declarations are evaluated at compile time and inlined into the ASL output. No runtime lookup is needed.

## Basic Constants

```typescript
const API_VERSION = 'v2';
const MAX_RETRIES = 3;
const TIMEOUT_MS = 30 * 1000;  // folds to 30000
```

When referenced inside a `Steps.createFunction()`, these values are inlined directly into ASL `Parameters` as literals.

## Constant Folding

The compiler evaluates expressions involving only constants at compile time.

### Arithmetic

```typescript
const TIMEOUT_MS = 30 * 1000;           // -> 30000
const HALF = 100 / 2;                   // -> 50
const OFFSET = 10 + 5 - 3;             // -> 12
```

Supported operators: `+`, `-`, `*`, `/`, `%`.

### String Concatenation

```typescript
const BASE_PATH = '/api/' + API_VERSION;  // -> "/api/v2"
```

### Template Literals

```typescript
const GREETING = `Welcome to API ${API_VERSION}`;  // -> "Welcome to API v2"
```

### `Math.*` Functions

The following `Math` methods are evaluated at compile time when all arguments are constants:

| Function | Example |
|---|---|
| `Math.floor(x)` | `Math.floor(3.7)` -> `3` |
| `Math.ceil(x)` | `Math.ceil(3.2)` -> `4` |
| `Math.round(x)` | `Math.round(3.5)` -> `4` |
| `Math.abs(x)` | `Math.abs(-5)` -> `5` |
| `Math.min(a, b, ...)` | `Math.min(3, 1, 2)` -> `1` |
| `Math.max(a, b, ...)` | `Math.max(3, 1, 2)` -> `3` |
| `Math.pow(x, y)` | `Math.pow(2, 10)` -> `1024` |

### Object and Array Literals

Constants can be objects or arrays if all values are themselves constants:

```typescript
const DEFAULT_CONFIG = { retries: 3, timeout: 5000 };
const VALID_STATUSES = ['pending', 'active', 'complete'];
```

## Example

```typescript
const API_VERSION = 'v2';
const BASE_PATH = '/api/' + API_VERSION;
const MAX_RETRIES = 3;
const TIMEOUT_MS = 30 * 1000;
const GREETING = `Welcome to API ${API_VERSION}`;

export const workflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { userId: string }) => {
    const result = await userService.call({
      path: BASE_PATH,        // inlined as "/api/v2"
      retries: MAX_RETRIES,   // inlined as 3
      timeout: TIMEOUT_MS,    // inlined as 30000
    });
    return { data: result.data, greeting: GREETING };
  },
);
```

## What Is NOT Folded

- **`let` and `var` declarations** -- only `const` is folded
- **Runtime values** -- function parameters, service call results, `context.*`
- **String methods** -- `'hello'.toUpperCase()` is not folded
- **User-defined functions** -- `myHelper(42)` is not folded
- **Non-Math pure functions** -- only `Math.floor/ceil/round/abs/min/max/pow` are supported
- **Constants declared inside `Steps.createFunction()`** -- only module-level constants are folded

See [`examples/showcase/21-constants.ts`](../examples/showcase/21-constants.ts) for a working example.
