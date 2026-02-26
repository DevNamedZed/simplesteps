# SimpleSteps

[![CI](https://github.com/DevNamedZed/simplesteps/actions/workflows/ci.yml/badge.svg)](https://github.com/DevNamedZed/simplesteps/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

TypeScript-to-ASL compiler for AWS Step Functions. Define workflows as typed async functions, compile to Amazon States Language with full data flow inference, and deploy with CDK or the CLI. Supports both JSONata (default) and JSONPath query languages.

[Playground](https://devnamedzed.github.io/simplesteps/) | [Getting Started](docs/getting-started.md) | [CDK Integration](docs/cdk-integration.md) | [Language Reference](docs/language-reference.md)

## Motivation

At my previous company we had dozens of Step Functions deployed with CDK. They were incredibly hard to read and maintain. The CDK approach defines a program by stringing together a tree of construct objects — `.next().next().next()` chains with raw JSONPath and `sfn.CustomState` workarounds. That's exactly the kind of work a compiler should handle.

SimpleSteps compiles typed async functions to ASL state machines. The compiler performs whole-program data flow analysis and derives all data flow fields from variable usage — you never write path expressions. In JSONata mode (the default), standard JavaScript methods like `Math.round()`, `str.toUpperCase()`, and `arr.filter()` compile directly to JSONata built-ins. Service bindings are resolved at compile time, with CDK token substitution at synth time.

**Input:**

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

**Output (JSONata — default):**

```json
{
  "QueryLanguage": "JSONata",
  "StartAt": "Invoke_helloFn",
  "States": {
    "Invoke_helloFn": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789:function:Hello",
      "Arguments": { "name": "{% $states.input.name %}" },
      "Assign": { "result": "{% $states.result %}" },
      "Next": "Return_Result"
    },
    "Return_Result": {
      "Type": "Pass",
      "Output": { "greeting": "{% $result.greeting %}" },
      "End": true
    }
  }
}
```

<details>
<summary>JSONPath output (--query-language jsonpath)</summary>

```json
{
  "StartAt": "Invoke_helloFn",
  "States": {
    "Invoke_helloFn": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789:function:Hello",
      "Parameters": { "name.$": "$.name" },
      "ResultPath": "$.result",
      "Next": "Return_Result"
    },
    "Return_Result": {
      "Type": "Pass",
      "Parameters": { "greeting.$": "$.result.greeting" },
      "End": true
    }
  }
}
```

</details>

## Quick Start

### CDK

```bash
npm install @simplesteps/core @simplesteps/cdk
```

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

    const validateFn = new lambda.Function(this, 'ValidateOrder', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/validate-order'),
    });

    const ordersTable = new dynamodb.Table(this, 'OrdersTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });

    const validateOrder = Lambda<{ orderId: string }, { valid: boolean; total: number }>(
      validateFn.functionArn,
    );
    const orders = new DynamoDB(ordersTable.tableName);

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

    validateFn.grantInvoke(machine);
    ordersTable.grantWriteData(machine);
  }
}
```

Workflows can also be defined in [separate files](docs/cdk-integration.md) using `sourceFile` + `bindings`.

### CLI

```bash
npm install @simplesteps/core
npx simplesteps compile workflow.ts -o output/

# Use JSONPath mode instead of JSONata (default)
npx simplesteps compile workflow.ts -o output/ --query-language jsonpath
```

## Language Support

| TypeScript | ASL |
|---|---|
| `await service.call(input)` | Task state |
| `const x = { ... }` | Pass state |
| `if/else`, `switch/case` | Choice state |
| `while`, `do...while` | Choice + back-edge loop |
| `for (const item of array)` | Map state (parallel, with closures) |
| `await Steps.map(items, cb, opts?)` | Map state (results, closures, MaxConcurrency, Retry) |
| `for (const item of Steps.items(arr, opts?))` | Map state (for...of + MaxConcurrency, Retry) |
| `await Promise.all([...])` | Parallel state |
| Deferred-await (`const p = call(); await p`) | Parallel state (auto-batched) |
| `await Steps.delay({ seconds: 30 })` | Wait state |
| `throw new Error(msg)` | Fail state |
| `return value` | Succeed / End state |
| `try { ... } catch (e) { ... }` | Catch rules |
| `.call(input, { retry, timeoutSeconds, heartbeatSeconds })` | Retry / Timeout / Heartbeat |
| `` `Hello ${name}` `` | `States.Format` / string concatenation |
| `a + b`, `a * b`, `a - b`, `a / b`, `a % b` | Native arithmetic (JSONata) / `States.MathAdd` (JSONPath) |
| `str.split(',')` | `$split()` / `States.StringSplit` |
| `JSON.parse(str)` | `$eval()` / `States.StringToJson` |
| `Steps.uuid()` / `crypto.randomUUID()` | `$uuid()` / `States.UUID` |

### JSONata-Only Methods (default mode)

| TypeScript | JSONata |
|---|---|
| `str.toUpperCase()`, `.toLowerCase()`, `.trim()` | `$uppercase`, `$lowercase`, `$trim` |
| `str.substring()`, `.replace()`, `.charAt()`, `.repeat()` | `$substring`, `$replace`, `$pad` |
| `str.startsWith()`, `.endsWith()`, `.padStart()`, `.padEnd()` | Composed expressions |
| `Math.floor/ceil/round/abs/pow/sqrt/min/max/random` | `$floor`, `$ceil`, `$round`, `$abs`, `$power`, `$sqrt`, `$min`, `$max`, `$random` |
| `Number()`, `String()`, `Boolean()`, `typeof` | `$number`, `$string`, `$boolean`, `$type` |
| `Object.keys()`, `Object.values()` | `$keys`, `$lookup` |
| `Date.now()`, `Array.isArray()` | `$millis`, `$type(x) = 'array'` |
| `arr.join()`, `.reverse()`, `.sort()`, `.concat()` | `$join`, `$reverse`, `$sort`, `$append` |
| `arr.map(v => expr)` | `$map(arr, function($v) { expr })` |
| `arr.filter(v => pred)` | `$filter(arr, function($v) { pred })` |
| `arr.reduce((a, v) => e, init)` | `$reduce(arr, function($a, $v) { e }, init)` |
| `arr.find()`, `.some()`, `.every()` | Composed from `$filter` + `$count` |

## Compiler Features

- **Dual query language support** — JSONata (default) and JSONPath, switchable via `--query-language`
- **55+ JS method → JSONata mappings** — string, math, array, type conversion, and higher-order functions compile directly
- **Lambda expression analysis** — pure callbacks in `.map()`, `.filter()`, `.reduce()` auto-compile to JSONata higher-order functions
- **Whole-program data flow analysis** with constant propagation lattice across modules
- **Cross-file import resolution** with demand-driven analysis and cycle detection
- **Pure function inlining** for compile-time constant derivation
- **15 AWS service bindings**: Lambda, DynamoDB, SQS, SNS, EventBridge, S3, Secrets Manager, SSM, ECS, Bedrock, Glue, CodeBuild, Athena, Batch, StepFunction + `Steps.awsSdk()` for direct SDK integration
- **CDK token propagation** through CloudFormation intrinsics (`Fn::GetAtt`, `Ref`)
- **Substep inlining** for reusable workflow fragments
- **40+ diagnostic codes** with root-cause attribution and poisoned-value chain tracking

## Documentation

| | |
|---|---|
| [Getting Started](docs/getting-started.md) | Install, first workflow, deploy |
| [CDK Integration](docs/cdk-integration.md) | `SimpleStepsStateMachine` construct |
| [CDK Comparison](docs/cdk-comparison.md) | Side-by-side CDK vs SimpleSteps (12 examples) |
| [Library API](docs/library-api.md) | `compile()`, `AslSerializer`, fluent API |
| [CLI Reference](docs/cli.md) | `simplesteps compile` flags |
| [Services](docs/services.md) | AWS service bindings + `Steps.awsSdk()` |
| [Error Handling](docs/error-handling.md) | try/catch, retry, custom errors |
| [Intrinsic Functions](docs/intrinsic-functions.md) | All 18 ASL intrinsics |
| [Language Reference](docs/language-reference.md) | Every TypeScript construct mapped |
| [Constants](docs/constants.md) | Compile-time constant folding |
| [Limitations](docs/limitations.md) | Unsupported patterns and workarounds |

## Examples

- [Starter projects](examples/starters/) — CLI, library API, and CDK templates
- [Showcase](examples/showcase/) — 38 examples covering every language feature, including JSONata methods

## License

MIT
