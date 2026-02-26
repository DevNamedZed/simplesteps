# CDK Integration

Deploy SimpleSteps workflows with AWS CDK.

## Install

```bash
npm install @simplesteps/core @simplesteps/cdk aws-cdk-lib constructs
```

## `SimpleStepsStateMachine`

An L3 CDK construct that compiles a `Steps.createFunction()` workflow to a Step Functions state machine at synth time. Define your workflow inline — service bindings reference CDK resources directly:

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
      code: lambda.Code.fromInline('exports.handler = async (e) => ({ valid: true, total: 42 })'),
    });

    const ordersTable = new dynamodb.Table(this, 'OrdersTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Service bindings — reference CDK constructs directly
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

## How CDK Tokens Flow Through

1. `validateFn.functionArn` returns a CDK Token string (e.g., `"${Token[TOKEN.123]}"`)
2. The compiler places this string in the ASL `Resource` field as-is
3. CDK serializes the Token to `Fn::GetAtt` in the CloudFormation template
4. CloudFormation resolves the actual ARN at deploy time

No special handling needed. Service bindings accept plain `string` — CDK Tokens are strings.

## Multiple Workflows

A single stack can define multiple state machines:

```typescript
const createOrder = Lambda<CreateReq, CreateRes>(createFn.functionArn);
const cancelOrder = Lambda<CancelReq, CancelRes>(cancelFn.functionArn);

const createMachine = new SimpleStepsStateMachine(this, 'CreateOrder', {
  workflow: Steps.createFunction(async (context, input: CreateInput) => {
    const result = await createOrder.call(input);
    return { orderId: result.id };
  }),
});

const cancelMachine = new SimpleStepsStateMachine(this, 'CancelOrder', {
  workflow: Steps.createFunction(async (context, input: CancelInput) => {
    await cancelOrder.call({ orderId: input.orderId });
    return { cancelled: true };
  }),
});
```

## Accessing the Underlying State Machine

```typescript
machine.stateMachineArn;              // State machine ARN
machine.grantStartExecution(role);    // Grant start execution
machine.grantRead(role);              // Grant read access
machine.compileResult;                // Full CompileResult
machine.compiledMachine;              // Selected CompiledStateMachine
```

## Props

```typescript
interface SimpleStepsStateMachineProps {
  workflow?: unknown;                    // Inline Steps.createFunction() definition
  sourceFile?: string;                   // Path to .ts file (file-based mode)
  bindings?: Record<string, unknown>;    // Variable name -> value (file-based mode)
  stateMachineName?: string;             // Override name (required if file has multiple machines)
  stateMachineType?: sfn.StateMachineType;
  role?: iam.IRole;
  timeout?: cdk.Duration;
  logs?: sfn.LogOptions;
  tracingEnabled?: boolean;
  removalPolicy?: cdk.RemovalPolicy;
}
```

## `compileDefinitionBody()`

Compile without creating a construct. Returns a `DefinitionBody` for use with existing CDK patterns.

```typescript
import { compileDefinitionBody } from '@simplesteps/cdk';

const body = compileDefinitionBody(
  path.join(__dirname, '../workflows/checkout.ts'),
  { validateOrderArn: validateFn.functionArn },
);

const machine = new sfn.StateMachine(this, 'Checkout', {
  definitionBody: body,
});
```

## Alternative: Separate Workflow Files

For users who prefer to separate business logic from infrastructure, the construct also supports a file-based mode using `sourceFile` + `bindings`.

### The Workflow File

Create a standalone TypeScript file with `declare const` placeholders for values that will be supplied at compile time:

```typescript
// workflows/order.ts
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

### The CDK Stack

Use `sourceFile` and `bindings` to connect the workflow to CDK resources:

```typescript
const machine = new SimpleStepsStateMachine(this, 'OrderWorkflow', {
  sourceFile: path.join(__dirname, '../workflows/order.ts'),
  bindings: {
    validateOrderArn: validateFn.functionArn,
    ordersTableName: ordersTable.tableName,
  },
});
```

The `bindings` map connects the `declare const` names in the workflow to CDK resource references. CDK Tokens flow through the compiler into ASL as-is — CloudFormation resolves them to actual ARNs at deploy time.

### Multiple Workflows (file-based)

A single source file can export multiple state machines. Use `stateMachineName` to select which one to deploy:

```typescript
// workflows/orders.ts
export const createOrder = Steps.createFunction(async (context, input) => { /* ... */ });
export const cancelOrder = Steps.createFunction(async (context, input) => { /* ... */ });
```

```typescript
const createMachine = new SimpleStepsStateMachine(this, 'CreateOrder', {
  sourceFile: path.join(__dirname, '../workflows/orders.ts'),
  stateMachineName: 'createOrder',
  bindings: { /* ... */ },
});

const cancelMachine = new SimpleStepsStateMachine(this, 'CancelOrder', {
  sourceFile: path.join(__dirname, '../workflows/orders.ts'),
  stateMachineName: 'cancelOrder',
  bindings: { /* ... */ },
});
```

### When to Use Separate Files

- The same workflow is reused across multiple stacks or accounts
- You want to compile and inspect ASL via the CLI without CDK
- Team preference for separating business logic from infrastructure

## CDK Auto-Detection (SS705)

When using the **inline workflow** pattern, the compiler automatically detects CDK construct property accesses (like `myLambda.functionArn` or `myTable.tableName`) and resolves them as synth-time values. This happens transparently — CDK Tokens flow into ASL as-is.

If the compiler recognizes a variable as a CDK synth-time expression via pattern matching (rather than explicit `declare const` binding), it emits warning **SS705**:

```
[SimpleSteps] SS705: CDK synth-time expression 'validateFn.functionArn'
auto-detected for variable 'validateOrderArn'. It will be resolved at CDK synth time.
```

This warning is informational — the compiled output is correct. The compiler detects common CDK property names (`functionArn`, `tableName`, `queueUrl`, `topicArn`, `bucketName`, etc.) and treats them as synth-time constants rather than raising an unresolvable variable error.

To suppress the warning, use the **file-based** pattern with explicit `bindings` instead.

## Starter Project

See [`examples/starters/cdk/`](../examples/starters/cdk/) for a complete, runnable CDK project using inline workflows.
