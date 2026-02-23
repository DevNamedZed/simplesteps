# CDK Integration

Deploy SimpleSteps workflows with AWS CDK.

## Install

```bash
npm install @simplesteps/core @simplesteps/cdk aws-cdk-lib constructs
```

## `SimpleStepsStateMachine`

An L3 CDK construct that compiles a TypeScript source file to a Step Functions state machine at synth time. Here's a complete stack:

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

    const validateFn = new lambda.Function(this, 'ValidateOrder', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline('exports.handler = async (e) => ({ valid: true, total: 42 })'),
    });

    const ordersTable = new dynamodb.Table(this, 'OrdersTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const machine = new SimpleStepsStateMachine(this, 'OrderWorkflow', {
      sourceFile: path.join(__dirname, '../workflows/order.ts'),
      bindings: {
        validateOrderArn: validateFn.functionArn,
        ordersTableName: ordersTable.tableName,
      },
    });

    validateFn.grantInvoke(machine);
    ordersTable.grantWriteData(machine);
  }
}
```

## Why Separate Workflow Files?

Workflow code lives in its own file (e.g., `workflows/order.ts`) rather than inline in the CDK stack. This is a deliberate design choice:

**The compiler needs a standalone file to parse.** SimpleSteps analyzes the TypeScript AST to generate ASL. It needs a file it can parse in isolation -- mixing workflow logic with CDK infrastructure code would make the AST analysis ambiguous and fragile.

**Separation of concerns.** Workflow files contain only business logic -- no infrastructure definitions, no CDK imports, no construct trees. This keeps them readable and focused. You can understand what a workflow does without knowing how it's deployed.

**`declare const` + bindings is dependency injection.** The workflow declares what it needs (`declare const validateOrderArn: string`), and the deployment layer provides it (`bindings: { validateOrderArn: validateFn.functionArn }`). The workflow doesn't know where values come from -- same pattern as constructor injection in application code.

**No lock-in to a single deployment method.** The same workflow file works with CDK, the library API, or the CLI. Switching deployment methods means changing how you call the compiler, not rewriting your workflows.

### Props

```typescript
interface SimpleStepsStateMachineProps {
  sourceFile: string;                    // Path to .ts file
  bindings?: Record<string, unknown>;    // Variable name -> CDK resource reference
  stateMachineName?: string;             // Override name (required if file has multiple machines)
  stateMachineType?: sfn.StateMachineType;
  role?: iam.IRole;
  timeout?: cdk.Duration;
  logs?: sfn.LogOptions;
  tracingEnabled?: boolean;
  removalPolicy?: cdk.RemovalPolicy;
}
```

### Bindings

The `bindings` map connects variable names in your workflow source to CDK resource references:

```typescript
// In your workflow (workflows/checkout.ts):
const validateOrder = Lambda<Req, Res>(validateOrderArn);
const ordersTable = new DynamoDB(ordersTableName);

// In your CDK stack:
bindings: {
  validateOrderArn: validateFn.functionArn,   // CDK Token -> CloudFormation resolves at deploy
  ordersTableName: table.tableName,
}
```

CDK Token strings pass through the compiler into ASL as-is. CloudFormation resolves them to actual ARNs at deploy time.

### Accessing the Underlying State Machine

```typescript
machine.stateMachineArn;              // State machine ARN
machine.grantStartExecution(role);    // Grant start execution
machine.grantRead(role);              // Grant read access
machine.compileResult;                // Full CompileResult
machine.compiledMachine;              // Selected CompiledStateMachine
```

## Workflow File Conventions

Workflow files use `declare const` to define variables that will be supplied via `bindings` at compile time:

```typescript
// workflows/checkout.ts
import { Lambda } from '@simplesteps/core/runtime/services';
import { DynamoDB } from '@simplesteps/core/runtime/services';

// These are binding placeholders -- names must match the keys in `bindings`
declare const validateOrderArn: string;
declare const ordersTableName: string;

const validateOrder = Lambda<Req, Res>(validateOrderArn);
const ordersTable = new DynamoDB(ordersTableName);
```

The variable names (`validateOrderArn`, `ordersTableName`) must match the keys you pass in `bindings`. The compiler replaces them with the bound values at synth time.

This means the same workflow file works with any deployment method -- CDK, library API, or CLI. The file itself has no hardcoded ARNs or resource names.

## Multiple Workflows

A single source file can export multiple state machines. Use `stateMachineName` to select which one to deploy:

```typescript
// workflows/orders.ts
export const createOrder = Steps.createFunction(async (context, input) => { /* ... */ });
export const cancelOrder = Steps.createFunction(async (context, input) => { /* ... */ });
```

```typescript
// In your CDK stack
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

If the file exports only one state machine, `stateMachineName` is optional.

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

## How CDK Tokens Flow Through

1. `validateFn.functionArn` returns a CDK Token string (e.g., `"${Token[TOKEN.123]}"`)
2. The compiler places this string in the ASL `Resource` field as-is
3. CDK serializes the Token to `Fn::GetAtt` in the CloudFormation template
4. CloudFormation resolves the actual ARN at deploy time

No special handling needed. Service bindings accept plain `string` -- CDK Tokens are strings.

## Starter Project

See [`examples/starters/cdk/`](../examples/starters/cdk/) for a complete, runnable CDK project.
