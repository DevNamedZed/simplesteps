# @simplesteps/cdk

[![CI](https://github.com/DevNamedZed/simplesteps/actions/workflows/ci.yml/badge.svg)](https://github.com/DevNamedZed/simplesteps/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@simplesteps/cdk)](https://www.npmjs.com/package/@simplesteps/cdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/DevNamedZed/simplesteps/blob/main/LICENSE)

AWS CDK construct for [SimpleSteps](https://github.com/DevNamedZed/simplesteps) — compile TypeScript workflows into Step Functions state machines and deploy them with CDK.

## Install

```bash
npm install @simplesteps/core @simplesteps/cdk
```

## Example

Define your workflow inline with real CDK resources. The compiler runs at synth time — CDK tokens like function ARNs and table names are automatically propagated through CloudFormation intrinsics.

```typescript
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda, DynamoDB, SNS } from '@simplesteps/core/runtime/services';

export class OrderStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const validateFn = new lambda.Function(this, 'ValidateOrder', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/validate-order'),
    });

    const enrichFn = new lambda.Function(this, 'EnrichCustomer', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/enrich-customer'),
    });

    const ordersTable = new dynamodb.Table(this, 'OrdersTable', {
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
    });

    const topic = new sns.Topic(this, 'OrderNotifications');

    // Typed service bindings — CDK token ARNs resolve at synth time
    const validateOrder = Lambda<{ orderId: string }, { valid: boolean; total: number }>(
      validateFn.functionArn,
    );
    const enrichCustomer = Lambda<{ customerId: string }, { tier: string; email: string }>(
      enrichFn.functionArn,
    );
    const orders = new DynamoDB(ordersTable.tableName);
    const notifications = new SNS(topic.topicArn);

    const machine = new SimpleStepsStateMachine(this, 'OrderWorkflow', {
      workflow: Steps.createFunction(
        async (context: SimpleStepContext, input: { orderId: string; customerId: string }) => {
          // Validate and enrich in parallel
          const [order, customer] = await Promise.all([
            validateOrder.call({ orderId: input.orderId }),
            enrichCustomer.call({ customerId: input.customerId }),
          ]);

          if (!order.valid) {
            throw new Error('Order validation failed');
          }

          const discount = customer.tier === 'premium' ? 0.1 : 0;
          const finalTotal = Math.round(order.total * (1 - discount));

          await orders.putItem({
            Item: {
              pk: { S: input.orderId },
              sk: { S: input.customerId },
              total: { N: String(finalTotal) },
              status: { S: 'CONFIRMED' },
            },
          });

          await notifications.publish({
            Message: `Order ${input.orderId} confirmed — $${String(finalTotal)}`,
            Subject: 'Order Confirmed',
          });

          return { orderId: input.orderId, total: finalTotal, tier: customer.tier };
        },
      ),
    });

    // Standard CDK grants — machine extends sfn.StateMachine
    validateFn.grantInvoke(machine);
    enrichFn.grantInvoke(machine);
    ordersTable.grantWriteData(machine);
    topic.grantPublish(machine);
  }
}
```

## File-based compilation

Workflows can also live in separate files:

```typescript
new SimpleStepsStateMachine(this, 'Workflow', {
  sourceFile: require.resolve('./workflow'),
  bindings: {
    validateOrder: validateFn.functionArn,
    orders: ordersTable.tableName,
  },
});
```

## Features

- Compiles TypeScript to ASL at synth time
- Automatic CDK token substitution (`Fn::GetAtt`, `Ref`) for Lambda ARNs, table names, queue URLs, etc.
- Standard CDK permissions — `fn.grantInvoke(machine)`, `table.grantReadWriteData(machine)`
- JSONata (default) and JSONPath query languages
- Source map annotations for debugging

## Documentation

- [CDK Integration Guide](https://github.com/DevNamedZed/simplesteps/blob/main/docs/cdk-integration.md)
- [CDK vs SimpleSteps Comparison](https://github.com/DevNamedZed/simplesteps/blob/main/docs/cdk-comparison.md)
- [Getting Started](https://github.com/DevNamedZed/simplesteps/blob/main/docs/getting-started.md)

[Playground](https://devnamedzed.github.io/simplesteps/) | [GitHub](https://github.com/DevNamedZed/simplesteps)

## License

MIT
