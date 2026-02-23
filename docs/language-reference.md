# Language Reference

Every TypeScript construct supported by SimpleSteps and its ASL mapping.

## State Types

| TypeScript | ASL State |
|---|---|
| `await service.call(input)` | Task |
| `const x = { ... }` | Pass |
| `if/else`, `switch/case` | Choice |
| `while`, `do...while` | Choice + back-edge loop |
| `for (const item of array)` | Map (parallel) |
| `for (const item of Steps.sequential(array))` | Map (sequential, `MaxConcurrency: 1`) |
| `await Promise.all([...])` | Parallel |
| `await Steps.delay({ seconds: 30 })` | Wait |
| `throw new Error(msg)` | Fail |
| `return value` | Succeed / End |
| `try { ... } catch (e) { ... }` | Catch rules |
| `if (e instanceof TimeoutError)` | Typed error matching |
| `.call(input, { retry: { ... } })` | Retry rules |

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

// Sequential iteration
for (const step of Steps.sequential(input.steps)) {
  await executor.call(step);
}
```

### Parallel Execution

```typescript
const [users, orders] = await Promise.all([
  userService.call({ id: input.userId }),
  orderService.call({ customerId: input.userId }),
]);
```

Compiles to a Parallel state with one branch per promise.

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

## Automatic Data Flow (No JSONPath)

One of SimpleSteps' key design goals: **you never write JSONPath or data flow fields**. The compiler derives all of them from your variable usage.

| ASL Field | Derived From |
|---|---|
| `Parameters` | Service call arguments — the compiler maps each argument to a `"field.$": "$.variable"` reference |
| `ResultPath` | Variable assignment — `const x = await svc.call(...)` stores the result at `$.x` |
| `InputPath` | Variable references in service call arguments — the compiler determines what data the state needs |
| `ResultSelector` | Automatic `.Payload` extraction for Lambda results (so you access `result.field`, not `result.Payload.field`) |
| `OutputPath` | Variable liveness analysis — the compiler prunes fields that are no longer needed downstream |

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
```

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

For the exhaustive ASL/CDK/SimpleSteps cross-reference, see [`spec/feature-mapping.md`](../spec/feature-mapping.md).
