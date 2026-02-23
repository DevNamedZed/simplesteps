# CDK vs SimpleSteps Comparison

Side-by-side comparison of AWS CDK Step Functions constructs vs SimpleSteps.

## Line Count

Each example in [`examples/aws-cdk-comparison/`](../examples/aws-cdk-comparison/) contains complete code for both approaches -- full CDK stack vs full SimpleSteps workflow.

| # | Example | CDK Lines | SimpleSteps Lines | Reduction |
|---|---|---|---|---|
| 01 | Hello World | 41 | 17 | 59% |
| 02 | Job Poller | 73 | 32 | 56% |
| 04 | Saga Pattern | 126 | 72 | 43% |
| 05 | Checkout Processing | 130 | 68 | 48% |
| 06 | Parallel Processing | 91 | 39 | 57% |
| 08 | Wait for Callback | 102 | 52 | 49% |
| 10 | DynamoDB CRUD | 100 | 51 | 49% |
| 15 | S3 Data Processing | 95 | 36 | 62% |
| 16 | Secrets & Config | 85 | 40 | 53% |
| 21 | Human Approval | 110 | 55 | 50% |
| 29 | Multi-Catch with Retry | 131 | 63 | 52% |
| 30 | ETL Pipeline | 143 | 60 | 58% |
| | **Average** | **102** | **49** | **53%** |

## Side-by-Side: Hello World

The simplest example — invoke a Lambda and return the result.

**CDK (41 lines):**

```typescript
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';

export class HelloWorldStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloFunction = new lambda.Function(this, 'HelloFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/hello'),
    });

    const invokeHello = new tasks.LambdaInvoke(this, 'Invoke Hello', {
      lambdaFunction: helloFunction,
      outputPath: '$.Payload',
    });

    const succeed = new sfn.Succeed(this, 'Done');
    const definition = invokeHello.next(succeed);

    const stateMachine = new sfn.StateMachine(this, 'HelloWorldStateMachine', {
      definitionBody: sfn.DefinitionBody.fromChainable(definition),
    });

    helloFunction.grantInvoke(stateMachine);
  }
}
```

**SimpleSteps (17 lines):**

```typescript
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda } from '@simplesteps/core/runtime/services';

const helloFn = Lambda<{ name: string }, { greeting: string }>(
  'arn:aws:lambda:us-east-1:123456789:function:Hello',
);

export const helloWorld = Steps.createFunction(
  async (context: SimpleStepContext, input: { name: string }) => {
    const result = await helloFn.call({ name: input.name });
    return { greeting: result.greeting };
  },
);
```

The CDK version requires 5 imports, a class wrapper, infrastructure definitions, explicit state wiring (`.next()`), manual output path extraction, and permission grants. The SimpleSteps version is just a function.

## CDK Stack vs CDK + SimpleSteps Stack

If you already use CDK, SimpleSteps doesn't replace it — it replaces the step function wiring inside your CDK stack. Here's the same checkout workflow defined both ways:

**Pure CDK** — state machine defined with construct objects:

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

// Wire state graph
const definition = validateCart.next(checkCartValid);

const stateMachine = new sfn.StateMachine(this, 'CheckoutStateMachine', {
  definitionBody: sfn.DefinitionBody.fromChainable(definition),
});

// Grant permissions manually
validateCartFn.grantInvoke(stateMachine);
processPaymentFn.grantInvoke(stateMachine);
ordersTable.grantWriteData(stateMachine);
```

**CDK + SimpleSteps** — same workflow, inline:

```typescript
const validateCart = Lambda<{ cartId: string }, { valid: boolean; total: number }>(
  validateCartFn.functionArn,
);
const processPayment = Lambda<{ cartId: string; total: number }, { status: string }>(
  processPaymentFn.functionArn,
);
const orders = new DynamoDB(ordersTable.tableName);

const machine = new SimpleStepsStateMachine(this, 'Checkout', {
  workflow: Steps.createFunction(
    async (context: SimpleStepContext, input: { cartId: string }) => {
      const cart = await validateCart.call({ cartId: input.cartId });
      if (!cart.valid) {
        throw new Error('Cart validation failed');
      }
      const payment = await processPayment.call({ cartId: input.cartId, total: cart.total });
      if (payment.status !== 'approved') {
        throw new Error('Payment declined');
      }
      await orders.putItem({
        Item: {
          orderId: { S: input.cartId },
          status: { S: 'CONFIRMED' },
        },
      });
      return { status: 'CONFIRMED' };
    },
  ),
});

// Permissions still granted the CDK way
validateCartFn.grantInvoke(machine);
processPaymentFn.grantInvoke(machine);
ordersTable.grantWriteData(machine);
```

The infrastructure stays CDK. The workflow logic becomes readable TypeScript. No `CustomState`, no `'$.Payload'`, no `.next()` chains, no `sfn.Condition.booleanEquals()`.

## What Makes CDK Verbose

**Infrastructure boilerplate.** Every Lambda needs `runtime`, `handler`, `code`. Every DynamoDB table needs `partitionKey`. SimpleSteps doesn't define infrastructure -- it defines workflow logic only.

**Limited service coverage.** CDK has typed constructs for 5 services: Lambda, SQS, SNS, DynamoDB (limited), Step Functions, EventBridge. DynamoDB (with expressions), S3, Secrets Manager, and SSM all require `sfn.CustomState` with raw ASL JSON. SimpleSteps provides typed bindings for all 10.

**Manual permission grants.** Every `grantInvoke()`, `grantReadWriteData()`, `grantSendMessages()` must be written explicitly per resource.

**Explicit state wiring.** `.next()`, `.addCatch()`, `.addRetry()`, `sfn.Choice().when().otherwise()` replace natural `if/else`, `try/catch`, `while`, and `Promise.all`.

**JSONPath strings.** `'$.field'`, `sfn.JsonPath.stringAt(...)` replace natural variable access.

## What SimpleSteps Eliminates

| CDK Pattern | SimpleSteps Equivalent |
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
| `grantInvoke()`, `grantReadWriteData()` | Auto-granted (planned) |

## Feature Coverage

The 12 comparison examples cover every major Step Functions feature:

| Feature | Examples |
|---|---|
| Lambda invocation | 01, 02, 04, 05, 06, 08, 21, 29, 30 |
| DynamoDB operations | 05, 10, 30 |
| SQS messaging | 05, 08, 21 |
| SNS notifications | 05, 21, 29, 30 |
| S3 operations | 15, 30 |
| Secrets Manager | 16 |
| SSM Parameter Store | 16 |
| Loops / polling | 02 |
| Parallel execution | 06 |
| Error handling / retry | 04, 29 |
| Wait for callback | 08, 21 |
| Map iteration | 30 |

See [`examples/aws-cdk-comparison/`](../examples/aws-cdk-comparison/) for the complete source files.
