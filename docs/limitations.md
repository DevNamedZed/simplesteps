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

## Substeps

The compiler supports two kinds of inlineable functions:

### Pure functions (expression inlining)

Simple pure functions with a single `return` statement are inlined as expressions:

```typescript
// OK — pure function, inlined at compile time
const formatKey = (id: string) => `order-${id}`;
```

### Async substeps (CFG-level inlining)

Module-scope `async` functions that make service calls can be inlined at the call site. The compiler splices the substep's body into the main workflow's state machine — no nested executions, no runtime cost.

```typescript
// OK — async substep, inlined into the caller's state machine
async function provisionWithRollback(id: string, networkId: string) {
  try {
    return await computeApi.call({ action: 'create', id });
  } catch (e) {
    await rollbackApi.call({ networkId });
    throw new StepException('Provisioning failed');
  }
}

export const workflow = Steps.createFunction(async (ctx, input) => {
  const network = await networkApi.call({ id: input.id });
  const compute = await provisionWithRollback(input.id, network.networkId);
  return { instanceId: compute.instanceId };
});
```

**Constraints:**

- Must be declared at **module scope** (top-level `async function` or `const fn = async () => { ... }`)
- Parameters can be **simple identifiers**, **object destructuring** (`{ id, name }`), or have **default values** (`retries = 3`). Rest parameters are not supported.
- Must be **awaited** at the call site (`await mySubstep(...)`)
- Substeps can call other substeps — the compiler inlines transitively

```typescript
// OK — nested substeps (inlined transitively)
async function validate(id: string) { await validateFn.call({ id }); }
async function validateAndEnrich(id: string) {
  await validate(id);             // substep calling another substep
  await enrichFn.call({ id });
}
```

**Not supported:**

```typescript
// NOT OK — pure function too complex to inline (loops, side effects)
function calculateTotal(items: Item[]) {
  let total = 0;
  for (const item of items) { total += item.price; }
  return total;
}

// NOT OK — rest parameters
async function process(...ids: string[]) { ... } // SS804
```

Workaround for rest parameters: pass an explicit array parameter instead.

## Closures and Variable Capture

Parallel `for...of` loops compile to ASL Map states, which have isolated state. Each iteration cannot reference **runtime variables** from the outer scope (service call results, input-derived values):

```typescript
const result = await lookupFn.call({ id: input.id });

// NOT OK — Map state can't access `result` (runtime variable)
for (const item of input.items) {
  await processor.call({ key: result.prefix + item.id });
}
```

Compile-time constants and service bindings **are** accessible inside Map state iterations. Only runtime variables are isolated.

Workaround: Use `Steps.sequential()` for sequential iteration (which does allow outer variable access), or restructure the data so each item carries what it needs.

## Array Methods

Synchronous array methods (`Array.filter()`, `Array.reduce()`) and synchronous `.map()` are not supported — these are JavaScript runtime operations with no ASL equivalent.

```typescript
// NOT OK — synchronous .map() cannot be compiled
const names = items.map(i => i.name);

// OK — async .map() compiles to a Map state (parallel)
const results = await items.map(async (item) => {
  return await processItem.call(item);
});

// OK — async .forEach() compiles to a Map state (discard results)
await items.forEach(async (item) => {
  await processItem.call(item);
});

// OK — for...of also compiles to a Map state
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

**Ternary expressions** — `const label = count > 5 ? 'large' : 'small'` **is** supported. The compiler desugars it into a Choice state with two Pass branches. Compile-time constant conditions are folded away entirely.

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

Avoid redeclaring a variable name in a nested scope. ASL uses a flat JSONPath namespace (`$.status`), so shadowing can cause the outer value to be silently overwritten:

```typescript
const status = input.status;
if (status === 'pending') {
  const status = 'processing';  // Avoid — overwrites $.status
}
```

## Spread Operators

Object spread in **service call parameters** is not supported — ASL `Parameters` requires explicit key-value mappings:

```typescript
// NOT OK — spread in service call arguments
await myLambda.call({ ...baseParams, extra: 'value' });
```

Workaround: Use `Steps.merge()` or construct the object with explicit properties.

Object spread **is** supported in general object literals when all properties are spreads (`{ ...a, ...b }`), which compiles to `States.JsonMerge`:

```typescript
// OK — pure spread compiles to States.JsonMerge
const merged = { ...defaults, ...overrides };
```

Mixed spread + plain properties (`{ ...obj, key: value }`) is not yet supported.

## Module-Level `let`

`const` declarations at module scope are always folded. `let` and `var` with a single assignment are also folded (with a warning suggesting `const`). Reassigned `let`/`var` variables are unresolvable:

```typescript
const MAX_RETRIES = 3;    // OK — folded
let retryCount = 3;        // OK — folded (warning SS709: prefer const)
let x = 1; x = 2;         // NOT OK — reassigned, not foldable
```

## General Rule

If something would require a JavaScript runtime to evaluate, it probably won't work. ASL executes a fixed set of state transitions and intrinsic functions. The compiler rejects patterns that would silently fail at runtime rather than generating broken state machines.

When in doubt, delegate to a Lambda function — that's a real JavaScript runtime.
