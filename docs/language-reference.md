# Language Reference

Every TypeScript construct supported by SimpleSteps and its ASL mapping.

## State Types

| TypeScript | ASL State |
|---|---|
| `await service.call(input)` | Task |
| `const x = { ... }` | Pass |
| `if/else`, `switch/case` | Choice |
| `while`, `do...while` | Choice + back-edge loop |
| `for (const item of array)` | Map (parallel, with closures) |
| `await Steps.map(items, callback, opts?)` | Map (with result capture, closures, MaxConcurrency, Retry) |
| `for (const item of Steps.items(array, opts?))` | Map (for...of with MaxConcurrency, Retry, closures) |
| `for (const item of Steps.sequential(array))` | Map (sequential, `MaxConcurrency: 1`) |
| `await Promise.all([...])` | Parallel |
| `await Steps.parallel(branches, opts?)` | Parallel (with Retry on the Parallel state) |
| Deferred-await (`const p = call(); await p`) | Parallel (auto-batched) |
| `await Steps.distributedMap(items, callback, opts)` | Map (DISTRIBUTED mode, S3 I/O) |
| `await Steps.delay({ seconds: 30 })` | Wait |
| `throw new Error(msg)` | Fail |
| `Steps.succeed()` | Succeed (explicit early termination) |
| `return value` | Succeed / End |
| `try { ... } catch (e) { ... }` | Catch rules |
| `if (e instanceof TimeoutError)` | Typed error matching |
| `.call(input, { retry, timeoutSeconds, heartbeatSeconds })` | Retry / Timeout / Heartbeat |
| `const { a, ...rest } = await svc.call(input)` | Object destructuring (rest requires JSONata) |
| `await http.invoke({ ApiEndpoint, Method, ... })` | Task (HTTPS Endpoint via `http:invoke`) |

## Query Language

SimpleSteps supports two ASL query languages. JSONata is the default and recommended mode.

### JSONata (default)

JSONata provides native arithmetic, string manipulation, type conversion, higher-order array functions, and more — most JavaScript patterns compile directly:

```typescript
// Arithmetic — all operators work
const total = price * quantity;
const tax = total * 0.08;
const discounted = total - discount;

// String methods → $uppercase, $lowercase, $trim, $substring, $pad, $replace
const upper = name.toUpperCase();
const trimmed = raw.trim();
const first5 = text.substring(0, 5);
const padded = id.padStart(10, '0');

// Math functions → $floor, $ceil, $round, $abs, $power, $sqrt, $min, $max, $random
const rounded = Math.round(amount);
const clamped = Math.min(value, 100);

// Type conversion → $number, $string, $boolean, $type, $millis
const num = Number(input.text);
const keys = Object.keys(config);
const priceType = typeof input.price;
const now = Date.now();
const isArr = Array.isArray(input.items);

// Array methods → $join, $reverse, $sort, $append
const sorted = items.sort();
const csv = items.join(', ');

// Higher-order functions → $map, $filter, $reduce
const names = items.map(item => item.name);
const active = items.filter(item => item.active);
const total = items.reduce((sum, item) => sum + item.price, 0);
const found = items.find(item => item.id === targetId);
const hasActive = items.some(item => item.active);
const allValid = items.every(item => item.valid);
```

Higher-order functions require pure expression callbacks (no `await`). For callbacks with service calls, use `Steps.map()` instead (see below).

### JSONPath

The original ASL query language. Use `queryLanguage: 'JSONPath'` to opt in:

```typescript
compile({ sourceFiles: ['workflow.ts'], queryLanguage: 'JSONPath' });
```

JSONPath mode has more restrictions — no arithmetic beyond addition, no string/Math methods. See [Limitations](./limitations.md) for details.

## Entry Points

### `Steps.createFunction()`

```typescript
export const myWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: InputType) => {
    // workflow body
    return output;
  },
);
```

The variable name (`myWorkflow`) becomes the state machine name.

### `@stepFunction` Decorator

```typescript
class WorkflowFactory {
  constructor(public readonly lambdaArn: string) {}

  @stepFunction
  async process(context: SimpleStepContext) {
    const input = context.getInput<{ id: string }>();
    // ...
  }
}
```

## Control Flow

### Sequential Statements

```typescript
const a = await svc1.call(input);
const b = await svc2.call({ id: a.id });
return b;
```

Each `await` produces a Task state. States chain via `Next`.

### Branching

```typescript
if (order.total > 100) {
  await premiumService.call(order);
} else {
  await standardService.call(order);
}
```

Compiles to a Choice state with comparison rules.

### Switch

```typescript
switch (input.status) {
  case 'pending':
    await processPending.call(input);
    break;
  case 'shipped':
    await processShipped.call(input);
    break;
  default:
    throw new Error('Unknown status');
}
```

### Loops

```typescript
// While loop -> Choice state with back-edge
while (status !== 'COMPLETE') {
  const result = await poller.call({ jobId });
  status = result.status;
}

// Do-while
do {
  const result = await poller.call({ jobId });
  status = result.status;
} while (status !== 'COMPLETE');

// For-of -> Map state (parallel iteration)
for (const item of input.items) {
  await processor.call(item);
}

// Closures work in all iteration styles
const config = await getConfig.call({ env: input.env });
for (const item of input.items) {
  await processor.call({ item, prefix: config.prefix }); // config captured via ItemSelector
}

// Sequential iteration
for (const step of Steps.sequential(input.steps)) {
  await executor.call(step);
}

// For-of with concurrency control
for (const item of Steps.items(input.items, { maxConcurrency: 5 })) {
  await processor.call({ item });
}
```

### Steps.map()

`Steps.map()` provides a functional API for Map states with result capture, closures, and concurrency control:

```typescript
// Collect results from parallel iteration
const results = await Steps.map(input.orders, async (order) => {
  return await processOrder.call({ order });
});
// results is an array of each iteration's return value

// Fire-and-forget (no result capture)
await Steps.map(input.items, async (item) => {
  await processItem.call({ item });
});

// With concurrency limit
await Steps.map(input.items, async (item) => {
  await processItem.call({ item });
}, { maxConcurrency: 10 });

// Closures — outer await results are accessible
const config = await getConfig.call({ env: input.env });
await Steps.map(input.items, async (item) => {
  // config is captured via ItemSelector — just works
  await processItem.call({ item, prefix: config.prefix });
});
```

All iteration styles (`for...of`, `Steps.map()`, `Steps.items()`, `Steps.sequential()`) support closures over prior `await` results. `Steps.map()` additionally captures iteration results into a variable.

### Steps.items()

`Steps.items()` wraps an array for use with `for...of`, adding MaxConcurrency control:

```typescript
// for...of with concurrency limit + closures
const config = await getConfig.call({ env: input.env });
for (const item of Steps.items(input.items, { maxConcurrency: 5 })) {
  await processItem.call({ item, prefix: config.prefix });
}
```

Use `Steps.items()` when you prefer imperative `for...of` syntax but need concurrency control. Use `Steps.map()` when you need to collect iteration results.

### Distributed Map

For large-scale parallel processing (up to 10,000 concurrent iterations) with S3-based I/O:

```typescript
const results = await Steps.distributedMap(
  input.items,
  async (item) => {
    const result = await processItem.call({ data: item });
    return { processed: result };
  },
  {
    maxConcurrency: 1000,
    executionType: 'EXPRESS',         // or 'STANDARD' (default)
    itemReader: {
      Resource: 'arn:aws:states:::s3:getObject',
      ReaderConfig: { InputType: 'CSV' },
      Parameters: { Bucket: input.bucket, Key: 'data.csv' },
    },
    resultWriter: {
      Resource: 'arn:aws:states:::s3:putObject',
      Parameters: { Bucket: input.bucket, Prefix: 'results/' },
    },
    toleratedFailurePercentage: 5,
    label: 'ProcessRecords',
  },
);
```

Compiles to an ASL Map state with `ProcessorConfig: { Mode: 'DISTRIBUTED' }`, ItemReader, ResultWriter, and batching/tolerance options.

### Parallel Execution

```typescript
const [users, orders] = await Promise.all([
  userService.call({ id: input.userId }),
  orderService.call({ customerId: input.userId }),
]);
```

Compiles to a Parallel state with one branch per promise. Each branch can be a single service call or a multi-step substep function.

### Parallel with Retry

When you need retry rules on the Parallel state itself, use `Steps.parallel()`:

```typescript
const [users, orders] = await Steps.parallel(
  [
    async () => await userService.call({ id: input.userId }),
    async () => await orderService.call({ customerId: input.userId }),
  ],
  {
    retry: {
      errorEquals: ['States.ALL'],
      maxAttempts: 3,
      intervalSeconds: 1,
      backoffRate: 2,
    },
  },
);
```

**When to use which:**

| Pattern | Use Case |
|---|---|
| `Promise.all([...])` | Simple parallel execution — no retry needed |
| `Steps.parallel(branches, { retry })` | Parallel with retry/catch on the Parallel state itself |
| Deferred-await (`const p = call(); await p`) | Natural JS pattern — compiler batches into Parallel |

All three compile to ASL Parallel states. `Promise.all()` and deferred-await produce identical output. `Steps.parallel()` adds the ability to configure retry on the Parallel state.

### Steps.succeed()

Explicitly terminate the workflow with a Succeed state:

```typescript
if (result.status === 'already_processed') {
  Steps.succeed();
}
// execution stops — code below this point is in a separate branch
```

In most cases, `return value` is sufficient. `Steps.succeed()` is useful for early termination without a return value.

### Deferred-Await (Natural Parallelism)

Start multiple service calls without awaiting, then collect results later:

```typescript
// Start calls (not awaited yet — compiled away, no state emitted)
const orderPromise = orderFn.call({ id: input.orderId });
const paymentPromise = paymentFn.call({ amount: input.amount });

// Await individually — compiler batches into a Parallel state
const order = await orderPromise;
const payment = await paymentPromise;

// Or collect with Promise.all
const [order, payment] = await Promise.all([orderPromise, paymentPromise]);
```

The compiler detects non-awaited service calls and batches their subsequent awaits into a single Parallel state. This is the natural JS/TS pattern for concurrent work.

### Wait

```typescript
await Steps.delay({ seconds: 30 });
await Steps.delay({ timestamp: '2024-12-31T23:59:59Z' });
```

### Early Return

```typescript
if (!order.valid) {
  return { error: 'Invalid order' };
}
```

`return` in a branch produces an End state at that point.

## Object Destructuring

Service call results can be destructured directly:

```typescript
const { name, age } = await userService.call({ id: input.userId });
// name and age are separate variables, accessible in subsequent expressions
```

### Rest patterns (JSONata only)

In JSONata mode, rest elements capture remaining properties:

```typescript
const { name, ...metadata } = await userService.call({ id: input.userId });
// metadata → $sift(result, function($v, $k) { $k != 'name' })
```

Rest patterns require JSONata mode. In JSONPath mode, they emit SS540.

## Substeps

Extract parts of a workflow into named async functions. The compiler inlines them at compile time — no nested executions, no runtime cost.

### Pure functions

Simple expression functions are inlined as values:

```typescript
const formatKey = (id: string) => `order-${id}`;
```

### Async substeps

Module-scope `async` functions that make service calls are inlined at the CFG level. The substep's body is spliced into the caller's state machine:

```typescript
async function provisionWithRollback(id: string, networkId: string) {
  try {
    return await computeApi.call({ action: 'create', id });
  } catch (e) {
    await rollbackApi.call({ networkId });
    throw new StepException('Failed');
  }
}

export const workflow = Steps.createFunction(async (ctx, input) => {
  const network = await networkApi.call({ id: input.id });
  const compute = await provisionWithRollback(input.id, network.networkId);
  return { instanceId: compute.instanceId };
});
```

Substeps can contain any supported control flow: `if/else`, `try/catch`, loops, `Promise.all`. Substeps can also call other substeps — the compiler inlines them transitively. Parameters can be input references, service call results, or constants.

See [Limitations](./limitations.md#substeps) for constraints.

## Automatic Data Flow

One of SimpleSteps' key design goals: **you never write path expressions or data flow fields**. The compiler derives all of them from your variable usage.

In **JSONata mode** (default), the compiler emits `Arguments` with `{% %}` expressions. In **JSONPath mode**, it emits `Parameters` with `"field.$": "$.variable"` references. Either way, you write plain TypeScript:

| Your Code | JSONata ASL | JSONPath ASL |
|---|---|---|
| `await svc.call({ id: x.id })` | `Arguments: { id: "{% $x.id %}" }` | `Parameters: { "id.$": "$.x.id" }` |
| `const x = await svc.call(...)` | `Assign: { x: "{% $states.result %}" }` | `ResultPath: "$.x"` |

In CDK, you'd write `sfn.JsonPath.stringAt('$.order.total')` and manually set `outputPath: '$.Payload'`. In SimpleSteps, you write `order.total` and the compiler handles the rest.

## Variable Assignment

```typescript
const x = { key: 'value', count: 42 };
```

Compiles to a Pass state with the object as `Result`.

## Context Object

The first parameter (`context: SimpleStepContext`) provides execution metadata from the Step Functions [context object](https://docs.aws.amazon.com/step-functions/latest/dg/input-output-contextobject.html). It is always the first parameter of the entry point function.

```typescript
const workflow = Steps.createFunction(async (context, input) => {
  const execId = context.execution.id;       // $$.Execution.Id
  const startTime = context.execution.startTime;  // $$.Execution.StartTime
  const stateName = context.state.name;      // $$.State.Name
  const retryCount = context.state.retryCount;  // $$.State.RetryCount
  const machineId = context.stateMachine.id;    // $$.StateMachine.Id
});
```

| Property | ASL Path | Description |
|---|---|---|
| `context.execution.id` | `$$.Execution.Id` | Unique execution ARN |
| `context.execution.startTime` | `$$.Execution.StartTime` | ISO 8601 timestamp |
| `context.state.name` | `$$.State.Name` | Current state name |
| `context.state.retryCount` | `$$.State.RetryCount` | Number of retries for current state |
| `context.stateMachine.id` | `$$.StateMachine.Id` | State machine ARN |

The context object is optional — if your workflow doesn't need execution metadata, you can omit it and use only the input parameter.

## Comparison Operators

| TypeScript | ASL Comparison |
|---|---|
| `===`, `!==` | `StringEquals` / `NumericEquals` / `BooleanEquals` |
| `>`, `>=`, `<`, `<=` | `NumericGreaterThan` / `NumericLessThan` / etc. |
| `&&` | `And` rule |
| `\|\|` | `Or` rule |
| `!` | `Not` rule |

## Intrinsic Functions

See [Intrinsic Functions](./intrinsic-functions.md) for all 18 ASL intrinsics and their JS mappings.

## Error Handling

See [Error Handling](./error-handling.md) for try/catch, retry, and custom errors.

## Constants

See [Constants](./constants.md) for compile-time constant folding.

