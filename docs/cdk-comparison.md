# CDK vs CDK + SimpleSteps Comparison

Both sides are **full CDK stacks** — same Lambda functions, same DynamoDB tables, same permission grants. The only difference is how the step function is defined: CDK construct chains vs SimpleSteps inline TypeScript.

## Line Count

Each example in [`examples/aws-cdk-comparison/`](../examples/aws-cdk-comparison/) contains two complete CDK stacks:

- **`cdk.ts`** — Step function defined with `sfn.*` constructs, `tasks.*` invocations, `.next()` chains, `sfn.CustomState` for unsupported services
- **`simplesteps.ts`** — Same infrastructure, step function defined with `SimpleStepsStateMachine` + inline `Steps.createFunction()`

| # | Example | CDK | CDK + SimpleSteps | Reduction |
|---|---|---|---|---|
| 01 | Hello World | 41 | 38 | 7% |
| 02 | Job Poller | 73 | 61 | 16% |
| 03 | Saga Pattern | 126 | 117 | 7% |
| 04 | Checkout Processing | 130 | 105 | 19% |
| 05 | Parallel Processing | 91 | 74 | 19% |
| 06 | Wait for Callback | 102 | 82 | 20% |
| 07 | DynamoDB CRUD | 100 | 69 | 31% |
| 08 | S3 Data Processing | 95 | 58 | 39% |
| 09 | Secrets & Config | 85 | 69 | 19% |
| 10 | Human Approval | 110 | 81 | 26% |
| 11 | Multi-Catch with Retry | 131 | 92 | 30% |
| 12 | ETL Pipeline | 143 | 101 | 29% |
| 13 | Resource Provisioning | 454 | 332 | 27% |
| | **Average** | **129** | **98** | **24%** |

The savings are modest for simple examples (Hello World is only 3 lines shorter) and grow as workflows get more complex. The biggest gains come from examples that use services CDK doesn't have typed constructs for (DynamoDB expressions, S3, Secrets Manager, SSM) — those require `sfn.CustomState` with raw ASL JSON in pure CDK. The Resource Provisioning example (13) shows the gap at scale: a real-world control plane orchestrator with saga-pattern rollback, parallel provisioning, and health check polling — 454 lines of CDK constructs vs 332 lines of readable TypeScript.

## Side-by-Side: Checkout Processing

A real-world workflow: validate a cart, process payment, save to DynamoDB, queue for fulfillment, notify the customer. Both stacks create the same Lambda functions, DynamoDB table, SQS queue, and SNS topic.

**Pure CDK** — step function defined with construct objects:

```typescript
// Define states individually
const validateCart = new tasks.LambdaInvoke(this, 'Validate Cart', {
  lambdaFunction: validateCartFn,
  outputPath: '$.Payload',
});

const cartInvalid = new sfn.Fail(this, 'Cart Invalid', {
  error: 'CartValidationFailed',
  cause: 'Cart validation failed',
});

const checkCartValid = new sfn.Choice(this, 'Cart Valid?')
  .when(sfn.Condition.booleanEquals('$.valid', false), cartInvalid)
  .otherwise(
    new tasks.LambdaInvoke(this, 'Process Payment', {
      lambdaFunction: processPaymentFn,
      payload: sfn.TaskInput.fromObject({
        'cartId.$': '$.cartId',
        'total.$': '$.total',
      }),
      outputPath: '$.Payload',
    }),
  );

// DynamoDB requires CustomState — no typed CDK construct
const saveOrder = new sfn.CustomState(this, 'Save Order', {
  stateJson: {
    Type: 'Task',
    Resource: 'arn:aws:states:::dynamodb:putItem',
    Parameters: {
      TableName: ordersTable.tableName,
      Item: {
        'orderId': { 'S.$': '$.cartId' },
        'status': { 'S': 'CONFIRMED' },
      },
    },
    ResultPath: null,
  },
});

// SQS send message
const queueForFulfillment = new tasks.SqsSendMessage(this, 'Queue for Fulfillment', {
  queue: fulfillmentQueue,
  messageBody: sfn.TaskInput.fromObject({
    'orderId.$': '$.cartId',
    'items.$': '$.items',
  }),
  resultPath: sfn.JsonPath.DISCARD,
});

// Wire state graph
const definition = validateCart.next(checkCartValid);

const stateMachine = new sfn.StateMachine(this, 'CheckoutStateMachine', {
  definitionBody: sfn.DefinitionBody.fromChainable(definition),
});
```

**CDK + SimpleSteps** — same stack, step function defined inline:

```typescript
const validateCart = Lambda<
  { cartId: string },
  { valid: boolean; total: number; items: string[] }
>(validateCartFn.functionArn);

const processPayment = Lambda<
  { cartId: string; total: number },
  { paymentId: string; status: string }
>(processPaymentFn.functionArn);

const orders = new DynamoDB(ordersTable.tableName);
const fulfillment = new SQS(fulfillmentQueue.queueUrl);
const notifications = new SNS(notificationTopic.topicArn);

const machine = new SimpleStepsStateMachine(this, 'CheckoutStateMachine', {
  workflow: Steps.createFunction(
    async (context: SimpleStepContext, input: { cartId: string; customerId: string }) => {
      const cart = await validateCart.call({ cartId: input.cartId });

      if (!cart.valid) {
        throw new StepException('Cart validation failed');
      }

      const payment = await processPayment.call({
        cartId: input.cartId,
        total: cart.total,
      });

      if (payment.status !== 'approved') {
        throw new StepException('Payment declined');
      }

      await orders.putItem({
        Item: {
          orderId: { S: input.cartId },
          customerId: { S: input.customerId },
          paymentId: { S: payment.paymentId },
          status: { S: 'CONFIRMED' },
        },
      });

      await fulfillment.publish({
        orderId: input.cartId,
        items: cart.items,
      });

      await notifications.publish({
        message: 'Your order has been confirmed',
        orderId: input.cartId,
      });

      return {
        orderId: input.cartId,
        paymentId: payment.paymentId,
        status: 'CONFIRMED',
      };
    },
  ),
});
```

The infrastructure is identical on both sides. The difference is readability: the SimpleSteps version reads top-to-bottom as a function. The CDK version requires you to mentally reconstruct the flow from `.next()` chains, `sfn.Choice().when().otherwise()`, and `sfn.CustomState` blocks with raw JSON.

## What SimpleSteps Replaces

SimpleSteps doesn't replace CDK — it replaces the step function constructs inside your CDK stack.

| CDK Step Function Pattern | SimpleSteps Equivalent |
|---|---|
| `task1.next(task2).next(task3)` | Sequential statements |
| `new sfn.Choice().when().otherwise()` | `if/else`, `switch/case` |
| `new sfn.Parallel().branch(...)` | `await Promise.all([...])` |
| `new sfn.Map(scope, id, { ... })` | `for (const item of array)` |
| `new sfn.Wait(scope, id, { time })` | `await Steps.delay(...)` |
| `new sfn.Fail(scope, id, { error })` | `throw new Error(msg)` |
| `task.addCatch(handler)` | `try/catch` |
| `task.addRetry({ ... })` | `{ retry: { ... } }` option |
| `sfn.CustomState` with raw JSON | Typed service methods |
| `sfn.JsonPath.stringAt(...)` | Variable names |

## Where the Savings Come From

The line count reduction varies by example. The pattern:

- **Simple Lambda-only workflows** (01, 02, 03): Small savings. CDK's `LambdaInvoke` is already reasonably concise. The gain is mostly readability — `if/else` vs `sfn.Choice`, `while` vs back-edge wiring.

- **Multi-service workflows** (04, 07, 08, 09, 12): Larger savings. CDK requires `sfn.CustomState` with raw ASL JSON for DynamoDB (with expressions), S3, Secrets Manager, and SSM. SimpleSteps provides typed methods for all of these.

- **Error handling** (03, 11, 13): Moderate savings. `try/catch` with `instanceof` replaces `addCatch()` chains with manual error string matching.

- **Complex orchestration** (13): The biggest example. 11 Lambda functions across 4 team APIs with saga-pattern rollback at every level, parallel provisioning, a health check polling loop, DynamoDB audit trail, SQS queueing, and SNS notification. The CDK version requires you to mentally reconstruct the rollback graph from scattered `addCatch()` chains. The SimpleSteps version reads like a function: nested `try/catch` for rollback scopes, `Promise.all` for parallelism, `while` for polling.

## Feature Coverage

| Feature | Examples |
|---|---|
| Lambda invocation | 01, 02, 03, 04, 05, 06, 10, 11, 12, 13 |
| DynamoDB operations | 04, 07, 12, 13 |
| SQS messaging | 04, 06, 10, 13 |
| SNS notifications | 04, 10, 11, 12, 13 |
| S3 operations | 08, 12 |
| Secrets Manager | 09 |
| SSM Parameter Store | 09 |
| Loops / polling | 02, 13 |
| Parallel execution | 05, 13 |
| Error handling / retry | 03, 11, 13 |
| Wait for callback | 06, 10 |
| Map iteration | 12 |
| Saga-pattern rollback | 03, 13 |

See [`examples/aws-cdk-comparison/`](../examples/aws-cdk-comparison/) for the complete source files.
