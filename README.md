# SimpleSteps

TypeScript-to-ASL compiler for AWS Step Functions. Write workflows as ordinary TypeScript functions — the compiler handles the rest.

## Why

At my previous company we had dozens of Step Functions deployed with CDK. They were incredibly hard to read and understand. The CDK approach defines a program by stringing together a tree of construct objects — but reading a program defined that way is difficult. That's what compilers are supposed to do for us.

SimpleSteps lets you define AWS Step Functions naturally using TypeScript. Write your workflow logic as a normal async function, and the compiler produces valid ASL (Amazon States Language) — no JSONPath, no `sfn.CustomState`, no `.next().next().next()` chains.

## Example

**Input** — a TypeScript workflow file:

```typescript
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda } from '@simplesteps/core/runtime/services';

declare const helloFnArn: string;

const helloFn = Lambda<{ name: string }, { greeting: string }>(helloFnArn);

export const helloWorld = Steps.createFunction(
  async (context: SimpleStepContext, input: { name: string }) => {
    const result = await helloFn.call({ name: input.name });
    return { greeting: result.greeting };
  },
);
```

**Output** — generated ASL:

```json
{
  "StartAt": "Invoke_helloFn",
  "States": {
    "Invoke_helloFn": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789:function:Hello",
      "Parameters": {
        "name.$": "$.name"
      },
      "ResultPath": "$.result",
      "Next": "Return_Result"
    },
    "Return_Result": {
      "Type": "Pass",
      "Parameters": {
        "greeting.$": "$.result.greeting"
      },
      "End": true
    }
  }
}
```

The compiler generates all data flow fields (`Parameters`, `ResultPath`, `InputPath`, `ResultSelector`, `OutputPath`) automatically from your variable usage. You never write JSONPath.

## Quick Start

### With CDK

```bash
npm install @simplesteps/core @simplesteps/cdk
```

Your CDK stack stays the same — you still create your Lambda functions, DynamoDB tables, and grant permissions with CDK. The only thing that changes is how you define the step function:

```typescript
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda, DynamoDB } from '@simplesteps/core/runtime/services';

export class OrderStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Infrastructure — same as any CDK stack
    const validateFn = new lambda.Function(this, 'ValidateOrder', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/validate-order'),
    });

    const ordersTable = new dynamodb.Table(this, 'OrdersTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Service bindings — CDK tokens flow through to ASL automatically
    const validateOrder = Lambda<{ orderId: string }, { valid: boolean; total: number }>(
      validateFn.functionArn,
    );
    const orders = new DynamoDB(ordersTable.tableName);

    // Step function — defined as readable TypeScript instead of construct chains
    const machine = new SimpleStepsStateMachine(this, 'OrderWorkflow', {
      workflow: Steps.createFunction(
        async (context: SimpleStepContext, input: { orderId: string; customerId: string }) => {
          const order = await validateOrder.call({ orderId: input.orderId });

          if (!order.valid) {
            throw new Error('Invalid order');
          }

          await orders.putItem({
            Item: {
              id: { S: input.orderId },
              customerId: { S: input.customerId },
              total: { N: String(order.total) },
              status: { S: 'CONFIRMED' },
            },
          });

          return { orderId: input.orderId, status: 'CONFIRMED' };
        },
      ),
    });

    // Permissions — same as any CDK stack
    validateFn.grantInvoke(machine);
    ordersTable.grantWriteData(machine);
  }
}
```

You can also use [separate workflow files](docs/cdk-integration.md) with `sourceFile` + `bindings` if you prefer to keep business logic out of infrastructure code.

### CLI (for testing)

```bash
npm install @simplesteps/core
npx simplesteps compile workflow.ts -o output/
```

## What You Can Write

| TypeScript | Step Functions |
|---|---|
| `await service.call(input)` | Task state |
| `const x = { ... }` | Pass state |
| `if/else`, `switch/case` | Choice state |
| `while`, `do...while` | Choice + back-edge loop |
| `for (const item of array)` | Map state (parallel) |
| `await Promise.all([...])` | Parallel state |
| `await Steps.delay({ seconds: 30 })` | Wait state |
| `throw new Error(msg)` | Fail state |
| `return value` | Succeed / End state |
| `try { ... } catch (e) { ... }` | Catch rules |
| `.call(input, { retry: { ... } })` | Retry rules |
| `` `Hello ${name}` `` | `States.Format` |
| `a + b` (numbers) | `States.MathAdd` |
| `str.split(',')` | `States.StringSplit` |
| `JSON.parse(str)` | `States.StringToJson` |
| `Steps.uuid()` / `crypto.randomUUID()` | `States.UUID` |

## Documentation

| Topic | |
|---|---|
| [Getting Started](docs/getting-started.md) | Install, first workflow, deploy |
| [CDK Integration](docs/cdk-integration.md) | `SimpleStepsStateMachine` construct |
| [CDK Comparison](docs/cdk-comparison.md) | Side-by-side CDK vs SimpleSteps (12 examples) |
| [Library API](docs/library-api.md) | `compile()`, `AslSerializer`, fluent API |
| [CLI Reference](docs/cli.md) | `simplesteps compile` flags |
| [Services](docs/services.md) | All 10 AWS services + `Steps.awsSdk()` |
| [Error Handling](docs/error-handling.md) | try/catch, retry, custom errors |
| [Intrinsic Functions](docs/intrinsic-functions.md) | All 18 ASL intrinsics |
| [Language Reference](docs/language-reference.md) | Every TypeScript construct mapped |
| [Constants](docs/constants.md) | Compile-time constant folding |
| [Limitations](docs/limitations.md) | What's not supported |

## Examples

- **[Starter projects](examples/starters/)** -- 3 standalone, cloneable projects (CLI, library API, CDK)
- **[Showcase](examples/showcase/)** -- 29 examples covering every language feature

## License

MIT
