# SimpleSteps CDK Starter

Deploy SimpleSteps workflows as Step Functions state machines using AWS CDK.

Uses **inline workflows** — the workflow logic lives directly in the CDK stack
files. The SimpleSteps TypeScript transformer compiles them to ASL at build time.

## Setup

```bash
npm install
```

This runs `ts-patch install` automatically (via `prepare`) to enable the
SimpleSteps transformer in TypeScript.

## Deploy

```bash
npx cdk deploy --all
```

## Synth (preview CloudFormation)

```bash
npx cdk synth
```

## Test

```bash
npm test
```

## Stacks

### OrderStack — Lambda + DynamoDB

Simple order validation workflow. Calls a Lambda function to validate an order,
then persists the result to DynamoDB.

**Services:** Lambda, DynamoDB

### NotificationStack — Lambda + DynamoDB + SNS + SQS

Multi-service notification pipeline. Validates an order via Lambda, saves to
DynamoDB, publishes an SNS notification, and queues a fulfillment task to SQS.

**Services:** Lambda, DynamoDB, SNS, SQS

### DataPipelineStack — S3 + Lambda

ETL data pipeline. Reads raw data from S3, transforms it via a Lambda function,
and writes the result back to S3.

**Services:** S3, Lambda

### EventDrivenStack — Lambda + EventBridge + StepFunction

Event-driven payment processing. Enriches a payment via Lambda, runs a nested
fraud-check state machine, and emits audit events to EventBridge.

**Services:** Lambda, EventBridge, StepFunction (nested)

### AdvancedWorkflowStack — Lambda + DynamoDB + SQS + SNS + StepFunction

Advanced workflow combining parallel processing, nested execution, wait-for-callback,
retry policies, and error handling patterns.

**Services:** Lambda, DynamoDB, SQS, SNS, StepFunction (nested)

### BatchProcessingStack — Lambda + S3 + DynamoDB + SQS

Batch data processing pipeline using distributed map for parallel item processing
with error tolerance and result aggregation.

**Services:** Lambda, S3, DynamoDB, SQS

## How It Works

Each stack defines infrastructure and workflow in a single file:

```typescript
const validateOrder = Lambda<Req, Res>(validateFn.functionArn);
const orders = new DynamoDB(ordersTable.tableName);

new SimpleStepsStateMachine(this, 'OrderWorkflow', {
  workflow: Steps.createFunction(async (ctx, input) => {
    const result = await validateOrder.call({ orderId: input.orderId });
    await orders.putItem({ ... });
    return { status: 'CONFIRMED' };
  }),
});
```

At build time, the SimpleSteps transformer:
1. Extracts the workflow function
2. Detects service bindings as free variables
3. Compiles the function to ASL with CDK token placeholders
4. Injects the compiled ASL back into the construct props

No separate workflow files needed.

## Files

```
lib/
  stack.ts                     — Order workflow (Lambda + DynamoDB)
  notification-stack.ts        — Notification pipeline (Lambda + DynamoDB + SNS + SQS)
  data-pipeline-stack.ts       — ETL pipeline (S3 + Lambda)
  event-driven-stack.ts        — Payment processing (Lambda + EventBridge + StepFunction)
  advanced-workflow-stack.ts   — Advanced patterns (parallel, nested, callback, retry)
  batch-processing-stack.ts    — Batch processing (distributed map, error tolerance)
bin/
  app.ts                       — CDK app entry point
test/
  order-stack.test.ts              — OrderStack unit tests
  notification-stack.test.ts       — NotificationStack unit tests
  data-pipeline-stack.test.ts      — DataPipelineStack unit tests
  event-driven-stack.test.ts       — EventDrivenStack unit tests
  advanced-workflow-stack.test.ts  — AdvancedWorkflowStack unit tests
  batch-processing-stack.test.ts   — BatchProcessingStack unit tests
```
