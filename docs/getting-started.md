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

## The Workflow File

Create `workflows/order.ts` in your CDK project. This file contains only business logic -- no infrastructure, no ARNs:

```typescript
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda } from '@simplesteps/core/runtime/services';
import { DynamoDB } from '@simplesteps/core/runtime/services';

declare const validateOrderArn: string;
declare const ordersTableName: string;

const validateOrder = Lambda<{ orderId: string }, { valid: boolean; total: number }>(
  validateOrderArn,
);
const ordersTable = new DynamoDB(ordersTableName);

export const orderWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; customerId: string }) => {
    const order = await validateOrder.call({ orderId: input.orderId });

    if (!order.valid) {
      throw new Error('Invalid order');
    }

    await ordersTable.putItem({
      Item: {
        id: { S: input.orderId },
        customerId: { S: input.customerId },
        total: { N: String(order.total) },
        status: { S: 'CONFIRMED' },
      },
    });

    return { orderId: input.orderId, status: 'CONFIRMED' };
  },
);
```

The `declare const` variables are placeholders. They get replaced with real values via bindings at compile time. The workflow doesn't know or care whether it's deployed with CDK, the library API, or the CLI.

The `context: SimpleStepContext` parameter provides execution metadata — the current execution ID, start time, state name, and retry count. See the [Context Object](./language-reference.md#context-object) section in the Language Reference for the full list.

## The CDK Stack

Create `lib/stack.ts`. This is where infrastructure and the workflow come together:

```typescript
import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';

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

    // Workflow
    const machine = new SimpleStepsStateMachine(this, 'OrderWorkflow', {
      sourceFile: path.join(__dirname, '../workflows/order.ts'),
      bindings: {
        validateOrderArn: validateFn.functionArn,
        ordersTableName: ordersTable.tableName,
      },
    });

    // Permissions
    validateFn.grantInvoke(machine);
    ordersTable.grantWriteData(machine);
  }
}
```

The `bindings` map connects the `declare const` names in the workflow to CDK resource references. CDK Tokens flow through the compiler into ASL as-is -- CloudFormation resolves them to actual ARNs at deploy time.

## Deploy

```bash
cdk deploy
```

## What Happened

The compiler:

1. Found the `Steps.createFunction()` call and identified it as a state machine entry point
2. Resolved `validateOrder` as a Lambda service binding and `ordersTable` as a DynamoDB binding
3. Replaced `declare const` variables with the bound CDK Token values
4. Converted the function body to ASL: a Task state for the Lambda call, a Choice state for the `if` branch, a Fail state for the error, a Task state for the DynamoDB put, and a Succeed state
5. Embedded the ASL in the CloudFormation template via `SimpleStepsStateMachine`

## Compile Locally (for testing)

You can also compile workflows locally to inspect the generated ASL without deploying:

```bash
npx simplesteps compile workflows/order.ts -o output/
```

This produces `output/orderWorkflow.asl.json` -- useful for reviewing the generated state machine before deploying. When compiling locally, any `declare const` variables without bindings are left as literal placeholder strings.

## Next Steps

- [CDK Integration](./cdk-integration.md) -- `SimpleStepsStateMachine` construct, bindings, tokens
- [Library API](./library-api.md) -- use the compiler programmatically for custom pipelines
- [CLI Reference](./cli.md) -- all compiler flags
- [Services](./services.md) -- all 10 supported AWS services
- [Language Reference](./language-reference.md) -- every TypeScript construct and its ASL mapping

## Starter Projects

Complete, standalone projects you can clone and run:

- [`examples/starters/cdk/`](../examples/starters/cdk/) -- CDK deployment
- [`examples/starters/library-api/`](../examples/starters/library-api/) -- programmatic compilation
- [`examples/starters/cli/`](../examples/starters/cli/) -- CLI compilation
