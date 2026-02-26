# Limitations

SimpleSteps compiles TypeScript to ASL (Amazon States Language). ASL is not a general-purpose runtime — it has a fixed set of operations. This page documents what you **cannot** do in a SimpleSteps workflow and why.

Most limitations come from ASL itself, not the compiler. Where possible, workarounds are listed.

## Arithmetic

### JSONata mode (default)

All arithmetic operators work natively:

```typescript
const product = a * b;     // OK — native JSONata *
const quotient = a / b;    // OK — native JSONata /
const remainder = a % b;   // OK — native JSONata %
const diff = a - b;        // OK — native JSONata -
const sum = a + b;         // OK
```

### JSONPath mode

ASL only provides `States.MathAdd`. The compiler supports addition, subtraction by literal, and increment/decrement:

```typescript
const next = count + 1;   // OK
count++;                    // OK
count -= 3;                 // OK
```

**Not supported in JSONPath mode (SS530-SS533):**

- `a * b` — no `States.MathMultiply` exists (SS530)
- `a / b` — no `States.MathDivide` exists (SS531)
- `a % b` — no `States.MathModulo` exists (SS532)
- `a - b` where `b` is a variable — only literal subtraction is supported (SS533)

Workaround: Switch to JSONata mode (the default), use compile-time constants (`const TIMEOUT = 30 * 1000` is folded at compile time), or delegate the calculation to a Lambda.

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

### Supported array operations

These array methods compile to ASL intrinsics or JSONata built-in functions:

| Method | JSONata | JSONPath | Notes |
|---|---|---|---|
| `arr.includes(v)` | `v in arr` | `States.ArrayContains` | Both modes |
| `arr.length` | `$count(arr)` | `States.ArrayLength` | Both modes |
| `arr[i]` | Native indexing | `States.ArrayGetItem` | Both modes |
| `arr.join(sep)` | `$join(arr, sep)` | SS540 | JSONata only |
| `arr.reverse()` | `$reverse(arr)` | SS540 | JSONata only |
| `arr.sort()` | `$sort(arr)` | SS540 | JSONata only |
| `arr.sort((a, b) => a.x - b.x)` | `$sort(arr, function($a, $b) { $a.x < $b.x })` | SS540 | JSONata only |
| `arr.concat(b)` | `$append(arr, b)` | SS540 | JSONata only |

### Higher-order array functions (JSONata only)

In JSONata mode, pure expression callbacks compile directly to JSONata higher-order functions:

```typescript
// OK in JSONata mode — pure expression callbacks
const names = items.map(item => item.name);           // → $map(...)
const active = items.filter(item => item.active);      // → $filter(...)
const total = items.reduce((sum, item) => sum + item.price, 0); // → $reduce(...)
const found = items.find(item => item.id === target);  // → $filter(...)[0]
const any = items.some(item => item.active);           // → $count($filter(...)) > 0
const all = items.every(item => item.valid);           // → $count($filter(...)) = $count(arr)
```

The callback must be a pure expression (no `await`, no multi-statement bodies). For callbacks with service calls, use `Steps.map()` instead.

### Iteration with service calls

For callbacks that contain `await` or service calls, use `Steps.map()` or `for...of`:

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

### Not supported

```typescript
// NOT OK — .forEach() (side-effect only, no ASL equivalent)
items.forEach(item => console.log(item));

// NOT OK — multi-statement callback body
const processed = items.map(item => {
  const x = item.name;
  const y = x.toUpperCase();
  return y;  // Only single-expression or single-return callbacks work
});
```

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

### Object destructuring of service call results

Named property destructuring is supported — each property is registered as a separate variable:

```typescript
// OK — each property becomes its own variable
const { name, count } = await myLambda.call(input);
// name → $.result.name (JSONPath) or $states.result.name (JSONata)
// count → $.result.count (JSONPath) or $states.result.count (JSONata)
```

### Rest patterns (JSONata only)

In JSONata mode, the rest element captures remaining properties via `$sift()`:

```typescript
// OK in JSONata mode — rest element
const { name, ...metadata } = await myLambda.call(input);
// name → $states.result.name
// metadata → $sift($states.result, function($v, $k) { $k != 'name' })
```

Rest patterns emit SS540 in JSONPath mode (no equivalent).

### Other destructuring

Array destructuring is supported for `Promise.all` results (see above). Destructured function parameters in substeps also work (e.g., `async function process({ id, name }: Input)`).

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

Computed property names and dynamic indexing are limited:

```typescript
// NOT OK — dynamic key lookup
const key = input.fieldName;
const value = data[key];

// NOT OK — computed property name
const obj = { [dynamicKey]: 'value' };
```

Workaround: Use static property access (`data.knownField`), `Object.keys()` / `Object.values()` (JSONata mode), or restructure your data.

## Built-in APIs

### JSONata mode (default) — expanded support

In JSONata mode, many JavaScript built-ins compile to native JSONata functions:

| Category | Supported Methods |
|---|---|
| **String** | `toUpperCase`, `toLowerCase`, `trim`, `substring`, `startsWith`, `endsWith`, `padStart`, `padEnd`, `replace`, `charAt`, `repeat`, `split` |
| **Array** | `join`, `reverse`, `sort`, `concat`, `map`, `filter`, `reduce`, `find`, `some`, `every` |
| **Math** | `Math.floor`, `Math.ceil`, `Math.round`, `Math.abs`, `Math.pow`, `Math.sqrt`, `Math.min`, `Math.max`, `Math.random` |
| **Type** | `Number()`, `String()`, `Boolean()`, `parseInt()`, `parseFloat()`, `typeof`, `Date.now()`, `Array.isArray()` |
| **Object** | `Object.keys()`, `Object.values()` |
| **Other** | `JSON.parse`, `JSON.stringify`, `btoa`, `atob`, `crypto.randomUUID()` |

### Not supported (any mode)

| API | Workaround |
|---|---|
| `Date` / `new Date()` | `Date.now()` → `$millis()` in JSONata mode; for `new Date()` use `context.execution.startTime` |
| `console.log()` | Return data for inspection |
| `setTimeout` / `setInterval` | Use `Steps.delay({ seconds: N })` |
| `fetch()` / HTTP calls | Use Lambda or `Steps.awsSdk()` |
| `RegExp` objects | Use Lambda (string patterns work with `str.replace()` in JSONata mode) |

Note: `Math.floor()`, `Math.ceil()`, etc. are also supported as compile-time constants in both modes (see [Constants](./constants.md)).

## Variable Shadowing

Avoid redeclaring a variable name in a nested scope. ASL uses a flat namespace (`$.status` in JSONPath, `$status` in JSONata), so shadowing can cause the outer value to be silently overwritten:

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

## Query Language Modes

SimpleSteps supports two ASL query languages:

- **JSONata** (default) — richer expression language with native arithmetic, string methods, Math functions, type conversions, and object introspection. Most JavaScript patterns "just work."
- **JSONPath** — the original ASL query language. More limited (no arithmetic operators, no string methods), but well-established.

Switch modes via the `queryLanguage` compile option:

```typescript
compile({ sourceFiles: ['workflow.ts'], queryLanguage: 'JSONPath' });
```

Methods only available in JSONata mode produce error **SS540** when compiled in JSONPath mode. The error message tells you what mode to switch to.

## HTTPS Endpoints

HTTPS Endpoints (`arn:aws:states:::http:invoke`) are supported via the `HttpEndpoint` binding. Authentication requires an EventBridge Connection ARN configured in the AWS Console.

```typescript
const http = new HttpEndpoint();
const result = await http.invoke({
  ApiEndpoint: 'https://api.example.com/data',
  Method: 'GET',
  Authentication: { ConnectionArn: 'arn:aws:events:...:connection/MyConn' },
});
```

See [Services](./services.md#httpendpoint) for the full API.

## General Rule

If something would require a JavaScript runtime to evaluate, it probably won't work. ASL executes a fixed set of state transitions and intrinsic functions. The compiler rejects patterns that would silently fail at runtime rather than generating broken state machines.

When in doubt, delegate to a Lambda function — that's a real JavaScript runtime.
