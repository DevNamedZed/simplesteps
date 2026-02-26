# Getting Started

## Prerequisites

- Node.js 18+
- TypeScript 5.4+
- AWS CDK v2 _(only needed for CDK deployment — the [CLI](./cli.md) and [library API](./library-api.md) don't require CDK)_

## Install

```bash
# CDK path (this guide)
npm install @simplesteps/core @simplesteps/cdk aws-cdk-lib constructs

# CLI or library API only
npm install @simplesteps/core
```

## Your First Workflow

Create `lib/stack.ts`. Everything lives in one file — infrastructure, service bindings, and workflow logic:

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

    // Infrastructure
    const validateFn = new lambda.Function(this, 'ValidateOrder', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline('exports.handler = async (e) => ({ valid: true, total: 42 })'),
    });

    const ordersTable = new dynamodb.Table(this, 'OrdersTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Service bindings — reference CDK resources directly
    const validateOrder = Lambda<{ orderId: string }, { valid: boolean; total: number }>(
      validateFn.functionArn,
    );
    const orders = new DynamoDB(ordersTable.tableName);

    // Workflow — defined inline, compiled to ASL at build time
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

    // Permissions
    validateFn.grantInvoke(machine);
    ordersTable.grantWriteData(machine);
  }
}
```

The `context: SimpleStepContext` parameter provides execution metadata — the current execution ID, start time, state name, and retry count. See the [Context Object](./language-reference.md#context-object) section in the Language Reference for the full list.

## Deploy

```bash
cdk deploy
```

## What Happened

The compiler:

1. Found the `Steps.createFunction()` call and identified it as a state machine entry point
2. Resolved `validateOrder` and `orders` as service bindings — free variables captured from the surrounding scope
3. Converted the function body to ASL: a Task state for the Lambda call, a Choice state for the `if` branch, a Fail state for the error, a Task state for the DynamoDB put, and a Succeed state
4. CDK Token strings (`validateFn.functionArn`, `ordersTable.tableName`) flow through the compiler into ASL as-is — CloudFormation resolves them to actual ARNs at deploy time
5. Embedded the ASL in the CloudFormation template via `SimpleStepsStateMachine`

## Compile Locally (for testing)

You can also compile standalone workflow files to inspect the generated ASL without deploying:

```typescript
// workflows/order.ts
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda } from '@simplesteps/core/runtime/services';

const validateOrder = Lambda<{ orderId: string }, { valid: boolean; total: number }>(
  'arn:aws:lambda:us-east-1:123456789:function:ValidateOrder',
);

export const orderWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    const order = await validateOrder.call({ orderId: input.orderId });
    return { valid: order.valid, total: order.total };
  },
);
```

```bash
npx simplesteps compile workflows/order.ts -o output/

# Use JSONPath instead of JSONata (the default)
npx simplesteps compile workflows/order.ts -o output/ --query-language jsonpath
```

This produces `output/orderWorkflow.asl.json` — useful for reviewing the generated state machine before deploying. The default query language is JSONata, which supports richer expressions (arithmetic, string methods, Math functions, higher-order array functions). Use `--query-language jsonpath` if you need the original ASL query language.

## Next Steps

- [CDK Integration](./cdk-integration.md) -- `SimpleStepsStateMachine` construct, multiple workflows, file-based mode
- [Library API](./library-api.md) -- use the compiler programmatically for custom pipelines
- [CLI Reference](./cli.md) -- all compiler flags
- [Services](./services.md) -- 64 typed AWS service bindings + Steps.awsSdk()
- [Language Reference](./language-reference.md) -- every TypeScript construct and its ASL mapping

## Starter Projects

Complete, standalone projects you can clone and run:

- [`examples/starters/cdk/`](../examples/starters/cdk/) -- CDK deployment
- [`examples/starters/library-api/`](../examples/starters/library-api/) -- programmatic compilation
- [`examples/starters/cli/`](../examples/starters/cli/) -- CLI compilation
