# Limitations

SimpleSteps compiles TypeScript to ASL (Amazon States Language). ASL is not a general-purpose runtime — it has a fixed set of operations. This page documents what you **cannot** do in a SimpleSteps workflow and why.

Most limitations come from ASL itself, not the compiler. Where possible, workarounds are listed.

## Arithmetic

ASL only provides `States.MathAdd`. The compiler supports addition, subtraction by literal, and increment/decrement:

```typescript
const next = count + 1;   // OK
count++;                    // OK
count -= 3;                 // OK
```

**Not supported at runtime:**

- `a * b` — no `States.MathMultiply` exists
- `a / b` — no `States.MathDivide` exists
- `a % b` — no `States.MathModulo` exists
- `a - b` where `b` is a variable — only literal subtraction is supported

Workaround: Use compile-time constants (`const TIMEOUT = 30 * 1000` is folded at compile time), or delegate the calculation to a Lambda.

## Helper Functions

Only simple pure functions can be inlined by the compiler. A function must:

- Have a single `return` statement
- Use only `const` declarations (no `let`)
- Have no loops, `try/catch`, or `async`
- Have no side effects

```typescript
// OK — simple pure function, inlined at compile time
const formatKey = (id: string) => `order-${id}`;

// NOT OK — too complex to inline
function calculateTotal(items: Item[]) {
  let total = 0;
  for (const item of items) {
    total += item.price;
  }
  return total;
}
```

Workaround: Move complex logic into a Lambda function.

## Closures and Variable Capture

Parallel `for...of` loops compile to ASL Map states, which have isolated state. Each iteration cannot reference variables from the outer scope:

```typescript
const prefix = input.prefix;

// NOT OK — Map state can't access `prefix`
for (const item of input.items) {
  await processor.call({ key: prefix + item.id });
}
```

Workaround: Use `Steps.sequential()` for sequential iteration (which does allow outer variable access), or restructure the data so each item carries what it needs.

## Array Methods

`Array.map()`, `Array.filter()`, `Array.reduce()`, and `Array.forEach()` are not supported. These are JavaScript runtime methods with no ASL equivalent.

```typescript
// NOT OK
const names = items.map(i => i.name);

// OK — use for...of instead
for (const item of items) {
  await processItem.call(item);
}
```

Array methods that **are** supported via ASL intrinsics: `.includes()`, `.length`, `[index]`, `.split()` (on strings).

## Classes

Class instantiation is not supported inside workflow bodies. You cannot create class instances at runtime.

The one exception is error classes extending `StepException`, which are used as compile-time markers for ASL error names:

```typescript
class OrderNotFoundError extends StepException {}  // OK — error type only
throw new OrderNotFoundError('Not found');          // OK — compiles to Fail state
```

## Unsupported Control Flow

**C-style `for` loops** — `for (let i = 0; i < n; i++)` is supported but compiles to a `while` loop with `States.MathAdd`. Prefer `for...of` or `while` for clarity.

**`for...in` loops** — not supported. Use `for...of` with arrays.

**Switch fall-through** — each `case` must end with `break`, `return`, or `throw`. Fall-through between cases is not allowed.

## Dynamic Property Access

Computed property names and dynamic indexing cannot be expressed in JSONPath:

```typescript
// NOT OK
const key = input.fieldName;
const value = data[key];

// NOT OK
const obj = { [dynamicKey]: 'value' };
```

Workaround: Use static property access (`data.knownField`) or restructure your data.

## Built-in APIs

These JavaScript built-ins have no ASL equivalent:

| API | Workaround |
|---|---|
| `Math.*()` at runtime | Use compile-time constants, or Lambda |
| `Date` / `Date.now()` | Use `context.execution.startTime` |
| `console.log()` | Return data for inspection |
| `setTimeout` / `setInterval` | Use `Steps.delay({ seconds: N })` |
| `fetch()` / HTTP calls | Use Lambda or `Steps.awsSdk()` |
| `RegExp` | Use Lambda |

Note: `Math.floor()`, `Math.ceil()`, etc. **are** supported as compile-time constants (see [Constants](./constants.md)).

## Variable Shadowing

You cannot redeclare a variable name in a nested scope if it already exists in an outer scope:

```typescript
const status = input.status;
if (status === 'pending') {
  const status = 'processing';  // NOT OK — shadows outer `status`
}
```

## Spread in Service Call Arguments

Object spread (`{ ...obj }`) is not supported in service call parameters. Use `Steps.merge()` or construct the object with explicit properties.

## Module-Level `let`

Only `const` declarations at module scope are folded. `let` and `var` declarations may be reassigned, making their values unresolvable at compile time:

```typescript
const MAX_RETRIES = 3;    // OK — folded
let retryCount = 3;        // NOT OK — mutable, not folded
```

## General Rule

If something would require a JavaScript runtime to evaluate, it probably won't work. ASL executes a fixed set of state transitions and intrinsic functions. The compiler rejects patterns that would silently fail at runtime rather than generating broken state machines.

When in doubt, delegate to a Lambda function — that's a real JavaScript runtime.
