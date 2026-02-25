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

## Conditions

Conditions in `if`, `while`, and `switch` statements compile to ASL Choice rules. Only simple comparisons are supported:

```typescript
// OK — simple comparisons
if (input.status === 'ACTIVE') { ... }
if (input.count > 0) { ... }
if (a > 0 && b < 10) { ... }
if (!input.disabled) { ... }

// NOT OK — method calls in conditions
if (input.items.includes(target)) { ... }  // SS510

// NOT OK — function calls in conditions
if (isValid(input)) { ... }                // SS510

// NOT OK — bitwise operators
if (flags & MASK) { ... }                  // SS512
```

Workaround: Compute the condition result in a previous step (e.g., via Lambda), then branch on the result.

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

Map state iterations have isolated state — each iteration receives only its array element as input. The compiler automatically detects outer-scope variables referenced inside a loop body and projects them into each iteration via ASL's `ItemSelector`.

**All iteration styles support closures** — `for...of`, `Steps.map()`, `Steps.items()`, and `Steps.sequential()` all capture outer `await` results automatically:

```typescript
const config = await getConfig.call({ env: input.env });

// All of these capture `config` via ItemSelector:
for (const item of input.items) {
  await processor.call({ key: config.prefix, item });
}

await Steps.map(input.items, async (item) => {
  await processor.call({ key: config.prefix, item });
});

for (const item of Steps.items(input.items, { maxConcurrency: 5 })) {
  await processor.call({ key: config.prefix, item });
}
```

Compile-time constants and service bindings are also accessible in all Map iterations.

## Array Methods

Array instance methods (`.map()`, `.filter()`, `.reduce()`, `.forEach()`) are not supported — these are JavaScript runtime operations with no ASL equivalent.

```typescript
// NOT OK — .map() is a JS method, not compilable
const names = items.map(i => i.name);

// NOT OK — .forEach() is a JS method, not compilable
await items.forEach(async (item) => {
  await processItem.call(item);
});
```

Use `Steps.map()` or `for...of` instead:

```typescript
// OK — Steps.map() compiles to Map state (parallel, with result capture)
const results = await Steps.map(input.items, async (item) => {
  return await processItem.call({ item });
});

// OK — Steps.map() fire-and-forget
await Steps.map(input.items, async (item) => {
  await processItem.call({ item });
});

// OK — for...of also compiles to a Map state
for (const item of input.items) {
  await processItem.call({ item });
}
```

Array properties that **are** supported via ASL intrinsics: `.includes()`, `.length`, `[index]`, `.split()` (on strings).

## Promise.all and Parallel Execution

`Promise.all` compiles to an ASL Parallel state. There are two supported patterns:

### Inline array literal

```typescript
// OK — array literal with service calls
const [order, payment] = await Promise.all([
  orderFn.call({ id: input.orderId }),
  paymentFn.call({ amount: input.amount }),
]);
```

Each element becomes a parallel branch. Branches can be single service calls or multi-step substeps.

### Deferred-await (fire-then-collect)

```typescript
// OK — natural JS pattern: start calls, then await them
const orderPromise = orderFn.call({ id: input.orderId });
const paymentPromise = paymentFn.call({ amount: input.amount });
const order = await orderPromise;
const payment = await paymentPromise;

// OK — also works with Promise.all to collect deferred calls
const orderPromise = orderFn.call({ id: input.orderId });
const paymentPromise = paymentFn.call({ amount: input.amount });
const [order, payment] = await Promise.all([orderPromise, paymentPromise]);
```

The compiler detects non-awaited service calls and batches their awaits into a Parallel state.

### Not supported

```typescript
// NOT OK — variable reference (not inline literal)
const promises = [orderFn.call({ id: input.orderId })];
await Promise.all(promises);  // SS420
```

The compiler must be able to see the branches at compile time.

## Destructuring

Object destructuring of **service call results** is not supported. The state builder only registers simple variable names:

```typescript
// NOT OK — destructuring silently ignored
const { name, count } = await myLambda.call(input);

// OK — assign to a variable, then access properties
const result = await myLambda.call(input);
const name = result.name;    // → $.result.name
const count = result.count;  // → $.result.count
```

Array destructuring **is** supported for `Promise.all` results (see above). Destructured **function parameters** in substeps also work (e.g., `async function process({ id, name }: Input)`).

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

## Escape Hatches

### `Steps.safeVar(value)`

When the compiler cannot prove a variable is constant but you know it will be available at runtime, wrap it with `Steps.safeVar()`. This emits warning SS708 instead of error SS700:

```typescript
const arn = getArnFromConfig();                        // → SS700 error
const svc = Lambda<Req, Res>(Steps.safeVar(arn));      // → SS708 warning (OK)
```

Use this only when you are certain the value will be resolved before the state machine executes (e.g., CDK synth-time values the compiler can't trace).

### `Steps.awsSdk(service, action, params)`

For AWS services not covered by the built-in bindings:

```typescript
const obj = await Steps.awsSdk<{ Bucket: string; Key: string }, { Body: string }>(
  'S3', 'GetObject', { Bucket: 'my-bucket', Key: input.key }
);
```

Compiles to `Resource: "arn:aws:states:::aws-sdk:s3:GetObject"`.

## General Rule

If something would require a JavaScript runtime to evaluate, it probably won't work. ASL executes a fixed set of state transitions and intrinsic functions. The compiler rejects patterns that would silently fail at runtime rather than generating broken state machines.

When in doubt, delegate to a Lambda function — that's a real JavaScript runtime.
