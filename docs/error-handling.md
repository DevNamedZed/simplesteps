# Error Handling

SimpleSteps maps TypeScript `try/catch/throw` to ASL error handling (Catch rules, Fail states).

## Throwing Errors

`throw` compiles to a Fail state. The class name becomes the ASL error name.

```typescript
// Built-in error
throw new Error('Something went wrong');
// -> { Type: "Fail", Error: "Error", Cause: "Something went wrong" }

// Custom error
class OrderNotFoundError extends StepException {}
throw new OrderNotFoundError('Order 123 not found');
// -> { Type: "Fail", Error: "OrderNotFoundError", Cause: "Order 123 not found" }

// Built-in ASL error
import { TimeoutError } from '@simplesteps/core/runtime';
throw new TimeoutError('Took too long');
// -> { Type: "Fail", Error: "States.Timeout", Cause: "Took too long" }
```

## Catching Errors

`try/catch` compiles to Catch rules on the enclosed Task states.

### Catch All

```typescript
try {
  const result = await lambda.call(payload);
} catch (e) {
  await notifier.publish({ message: 'Something failed' });
}
```

Compiles to `ErrorEquals: ["States.ALL"]`.

### Typed Catch

Use `instanceof` chains to match specific error types:

```typescript
try {
  await riskyService.call(input);
} catch (e) {
  if (e instanceof TimeoutError) {
    // handle timeout
  } else if (e instanceof OrderNotFoundError) {
    // handle not found
  } else {
    // catch all
  }
}
```

Compiles to ordered Catch rules:

```json
{
  "Catch": [
    { "ErrorEquals": ["States.Timeout"], "Next": "HandleTimeout" },
    { "ErrorEquals": ["OrderNotFoundError"], "Next": "HandleNotFound" },
    { "ErrorEquals": ["States.ALL"], "Next": "HandleFallback" }
  ]
}
```

## Retry

Pass a `retry` option to any service call:

```typescript
const result = await api.call(input, {
  retry: {
    errorEquals: ['States.TaskFailed', 'States.Timeout'],
    intervalSeconds: 2,
    maxAttempts: 3,
    backoffRate: 2,
  },
});
```

## Timeouts

Set execution time limits and heartbeat intervals:

```typescript
const result = await longRunningTask.call(input, {
  timeoutSeconds: 300,       // Fail with States.Timeout after 5 minutes
  heartbeatSeconds: 30,      // Fail with States.HeartbeatTimeout if no heartbeat for 30s
});
```

Combine with retry and try/catch for resilient long-running tasks:

```typescript
try {
  const result = await longTask.call(input, {
    timeoutSeconds: 600,
    heartbeatSeconds: 60,
    retry: { maxAttempts: 2, intervalSeconds: 10 },
  });
} catch (e) {
  if (e instanceof TimeoutError) {
    await alertService.call({ message: 'Task timed out' });
  }
}
```

## Custom Errors

Define custom errors by extending `StepException`:

```typescript
import { StepException } from '@simplesteps/core/runtime';

class PaymentDeclinedError extends StepException {}
class InsufficientInventoryError extends StepException {}
```

The class name is used as the ASL error name directly. No registration needed.

## Predefined ASL Errors

| SimpleSteps Class | ASL Error Name |
|---|---|
| `StepException` | `States.ALL` |
| `TimeoutError` | `States.Timeout` |
| `TaskFailedError` | `States.TaskFailed` |
| `PermissionsError` | `States.Permissions` |
| `HeartbeatTimeoutError` | `States.HeartbeatTimeout` |
| `BranchFailedError` | `States.BranchFailed` |
| `NoChoiceMatchedError` | `States.NoChoiceMatched` |
| `IntrinsicFailureError` | `States.IntrinsicFailure` |
| `ResultPathMatchFailureError` | `States.ResultPathMatchFailure` |
| `ParameterPathFailureError` | `States.ParameterPathFailure` |
| `ItemReaderFailedError` | `States.ItemReaderFailed` |
| `ResultWriterFailedError` | `States.ResultWriterFailed` |
| `ExceedToleratedFailureError` | `States.ExceedToleratedFailureThreshold` |

All are importable from `@simplesteps/core/runtime`.

## Catch Parameter

The catch clause parameter name determines where the error object is stored:

```typescript
catch (err) { ... }   // error stored at $.err
catch (e) { ... }      // error stored at $.e
```

The caught error object always has two string fields:

- `.Error` — the error name (e.g., `"TimeoutError"`, `"States.TaskFailed"`)
- `.Cause` — the error message string

These fields are available regardless of whether you use `instanceof` checks. In a catch-all block without `instanceof`, you can still access them:

```typescript
try {
  await riskyService.call(input);
} catch (e) {
  // e.Error and e.Cause are always available
  await logger.call({ errorName: e.Error, errorMessage: e.Cause });
}
```

