# @simplesteps/core

[![CI](https://github.com/DevNamedZed/simplesteps/actions/workflows/ci.yml/badge.svg)](https://github.com/DevNamedZed/simplesteps/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@simplesteps/core)](https://www.npmjs.com/package/@simplesteps/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/DevNamedZed/simplesteps/blob/main/LICENSE)

TypeScript-to-ASL compiler for AWS Step Functions. Write workflows as typed async functions, compile to Amazon States Language with full data flow inference. Supports JSONata (default) and JSONPath query languages.

## Install

```bash
npm install @simplesteps/core
```

## Example

```typescript
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda, DynamoDB, SQS, SNS } from '@simplesteps/core/runtime/services';

const validateOrder = Lambda<{ orderId: string }, { valid: boolean; total: number; items: string[] }>(
  'arn:aws:lambda:us-east-1:123456789:function:ValidateOrder',
);
const enrichCustomer = Lambda<{ customerId: string }, { tier: string; email: string }>(
  'arn:aws:lambda:us-east-1:123456789:function:EnrichCustomer',
);
const orders = new DynamoDB('OrdersTable');
const notifications = new SNS('arn:aws:sns:us-east-1:123456789:OrderNotifications');
const deadLetterQueue = new SQS('https://sqs.us-east-1.amazonaws.com/123456789/FailedOrders');

export const processOrder = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; customerId: string }) => {
    // Validate and enrich in parallel
    const [order, customer] = await Promise.all([
      validateOrder.call({ orderId: input.orderId }),
      enrichCustomer.call({ customerId: input.customerId }),
    ]);

    if (!order.valid) {
      await deadLetterQueue.sendMessage({
        MessageBody: `Invalid order: ${input.orderId}`,
      });
      throw new Error('Order validation failed');
    }

    // Apply discount for premium customers
    const discount = customer.tier === 'premium' ? 0.1 : 0;
    const finalTotal = Math.round(order.total * (1 - discount));

    // Process each item
    for (const item of order.items) {
      try {
        await orders.putItem({
          Item: {
            pk: { S: input.orderId },
            sk: { S: item },
            total: { N: String(finalTotal) },
            customerId: { S: input.customerId },
            status: { S: 'CONFIRMED' },
          },
        });
      } catch (e) {
        await deadLetterQueue.sendMessage({
          MessageBody: `Failed to write item ${item} for order ${input.orderId}`,
        });
      }
    }

    // Notify
    await notifications.publish({
      Message: `Order ${input.orderId} confirmed — $${String(finalTotal)} (${customer.tier})`,
      Subject: 'Order Confirmed',
    });

    return {
      orderId: input.orderId,
      total: finalTotal,
      itemCount: order.items.length,
      tier: customer.tier,
    };
  },
);
```

Compile:

```bash
npx simplesteps compile workflow.ts -o output/
```

This produces a complete ASL state machine — a Parallel state for the concurrent Lambda calls, a Choice state for validation, a Map state iterating items with a Catch for error handling, and all data flow paths derived from variable usage. No JSONPath, no `ResultPath`, no `Parameters` boilerplate.

## What compiles

| TypeScript | ASL |
|---|---|
| `await service.call(input)` | Task state |
| `if/else`, `switch/case` | Choice state |
| `while`, `do...while` | Choice + back-edge loop |
| `for (const item of array)` | Map state |
| `await Steps.map(items, callback)` | Map state (with results + closures) |
| `await Promise.all([...])` | Parallel state |
| Deferred-await (`const p = call(); await p`) | Parallel state (auto-batched) |
| `Steps.delay({ seconds: 30 })` | Wait state |
| `throw new Error(msg)` | Fail state |
| `try/catch` | Catch rules |
| Template literals, arithmetic, `Math.*` | JSONata expressions / intrinsics |
| `arr.map()`, `.filter()`, `.reduce()` | JSONata higher-order functions |
| `str.toUpperCase()`, `.trim()`, `.split()` | JSONata string built-ins |

65+ JavaScript methods compile directly to JSONata. See the full [language reference](https://github.com/DevNamedZed/simplesteps/blob/main/docs/language-reference.md).

## AWS Service Bindings

66 typed service bindings with compile-time resolution:

```typescript
import { Lambda, DynamoDB, SQS, SNS, S3, EventBridge } from '@simplesteps/core/runtime/services';
```

16 services have optimized integrations (Lambda, DynamoDB, SQS, SNS, EventBridge, S3, Secrets Manager, SSM, ECS, Bedrock, Glue, CodeBuild, Athena, Batch, StepFunction, HttpEndpoint), 48 have SDK-generated bindings with full type signatures, and `Steps.awsSdk()` covers anything else.

## CDK

For deploying with AWS CDK, use [`@simplesteps/cdk`](https://www.npmjs.com/package/@simplesteps/cdk).

## Documentation

- [Getting Started](https://github.com/DevNamedZed/simplesteps/blob/main/docs/getting-started.md)
- [Language Reference](https://github.com/DevNamedZed/simplesteps/blob/main/docs/language-reference.md)
- [Services](https://github.com/DevNamedZed/simplesteps/blob/main/docs/services.md)
- [CLI Reference](https://github.com/DevNamedZed/simplesteps/blob/main/docs/cli.md)
- [Library API](https://github.com/DevNamedZed/simplesteps/blob/main/docs/library-api.md)
- [Limitations](https://github.com/DevNamedZed/simplesteps/blob/main/docs/limitations.md)

[Playground](https://devnamedzed.github.io/simplesteps/) | [GitHub](https://github.com/DevNamedZed/simplesteps)

## License

MIT
