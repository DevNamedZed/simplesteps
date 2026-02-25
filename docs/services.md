# Services

SimpleSteps provides typed bindings for 15 AWS services, plus a generic escape hatch for any AWS service.

All service bindings are compile-time markers. They provide TypeScript types for the compiler and throw if called at runtime.

```typescript
import { Lambda, DynamoDB, S3, SQS, SNS, StepFunction, EventBridge, SecretsManager, SSM } from '@simplesteps/core/runtime/services';
```

---

## Lambda

```typescript
const fn = Lambda<{ orderId: string }, { total: number }>(
  'arn:aws:lambda:us-east-1:123:function:ProcessOrder',
);

// Synchronous invocation
const result = await fn.call(input);
const result = await fn(input);             // short form (identical ASL)

// With retry
const result = await fn.call(input, {
  retry: { maxAttempts: 3, intervalSeconds: 2, backoffRate: 2 },
});

// Async (fire-and-forget)
await fn.callAsync(input);

// Wait for callback (waitForTaskToken)
const cbResult = await fn.callWithCallback<CallbackResult>(input);
```

`Lambda()` is a factory function, not a class. The type parameters define input and output types.

---

## DynamoDB

```typescript
const table = new DynamoDB('OrdersTable');

// CRUD
const item = await table.getItem<Order>({ Key: { id: { S: input.orderId } } });
await table.putItem({ Item: { id: { S: 'abc' }, status: { S: 'created' } } });
await table.deleteItem({ Key: { id: { S: input.orderId } } });
const updated = await table.updateItem<Order>({
  Key: { id: { S: input.orderId } },
  UpdateExpression: 'SET #s = :status',
  ExpressionAttributeNames: { '#s': 'status' },
  ExpressionAttributeValues: { ':status': { S: 'shipped' } },
  ReturnValues: 'ALL_NEW',
});

// Query and Scan
const results = await table.query<QueryResult>({
  KeyConditionExpression: 'pk = :pk',
  ExpressionAttributeValues: { ':pk': { S: input.pk } },
});
const all = await table.scan<ScanResult>({});

// Short aliases: .get(), .put(), .delete(), .update()
const item = await table.get<Order>({ Key: { id: { S: input.id } } });
```

Parameters map directly to the DynamoDB API. `TableName` is auto-injected from the constructor.

---

## S3

```typescript
const bucket = new S3('my-data-bucket');

const obj = await bucket.getObject<MyData>('data/file.json');
await bucket.putObject({ Key: 'output/result.json', Body: JSON.stringify(data) });
await bucket.deleteObject('temp/old-file.json');
await bucket.copyObject({ SourceKey: 'a.json', DestinationKey: 'b.json' });
const meta = await bucket.headObject<HeadResult>({ Key: 'data/file.json' });
const listing = await bucket.listObjects<S3ListResult>({ Prefix: 'data/' });
```

`getObject` and `deleteObject` accept a string key directly as a shorthand. All other S3 methods take a parameter object. The shorthand is equivalent to `{ Key: 'data/file.json' }`.

---

## SQS

```typescript
const queue = new SQS('https://sqs.us-east-1.amazonaws.com/123456789/my-queue');

// Fire-and-forget
await queue.publish({ orderId: order.id });

// Wait for callback
const result = await queue.publishWithCallback<CallbackResult>(message);
```

`SQS` is an alias for `SimpleQueueService`. Both work identically. The constructor takes a **Queue URL** (not ARN).

`publish()` is syntactic sugar for the SQS `SendMessage` API action. The compiler generates `Resource: "arn:aws:states:::sqs:sendMessage"` in the ASL output.

---

## SNS

```typescript
const topic = new SNS('arn:aws:sns:us-east-1:123456789:OrderNotifications');

await topic.publish({ message: 'Order placed', subject: 'New Order' });
```

---

## StepFunction (Nested Execution)

```typescript
const child = new StepFunction<ValidateInput, ValidateResult>(
  'arn:aws:states:us-east-1:123456789:stateMachine:Validation',
);

// Synchronous (waits for completion)
const result = await child.startExecution({ data: input.data });

// Async (returns immediately)
const { executionArn } = await child.startExecutionAsync({ data: input.data });

// Wait for callback
const cbResult = await child.startExecutionWithCallback({ data: input.data });
```

---

## EventBridge

```typescript
const bus = new EventBridge('orders-bus');

await bus.putEvent({
  source: 'orders',
  detailType: 'OrderPlaced',
  detail: { orderId: order.id, total: order.total },
});
```

---

## SecretsManager

```typescript
const secrets = new SecretsManager();

const secret = await secrets.getSecretValue<MySecret>({ SecretId: 'my-secret' });
await secrets.putSecretValue({ SecretId: 'my-secret', SecretString: JSON.stringify(data) });
const created = await secrets.createSecret<CreateResult>({ Name: 'new-secret', SecretString: 'value' });
await secrets.updateSecret({ SecretId: 'my-secret', SecretString: 'new-value' });
await secrets.deleteSecret({ SecretId: 'my-secret' });
const info = await secrets.describeSecret<DescribeResult>({ SecretId: 'my-secret' });
```

No constructor argument. SecretsManager is stateless.

---

## SSM (Parameter Store)

```typescript
const ssm = new SSM();

const param = await ssm.getParameter<ParamResult>({ Name: '/my/parameter' });
await ssm.putParameter({ Name: '/my/parameter', Value: 'new-value', Type: 'String' });
const batch = await ssm.getParameters<BatchResult>({ Names: ['/my/param1', '/my/param2'] });
const params = await ssm.getParametersByPath<ParamsResult>({ Path: '/my/prefix/' });
await ssm.deleteParameter({ Name: '/my/parameter' });
```

No constructor argument. SSM is stateless.

---

## ECS

```typescript
const cluster = new ECS('arn:aws:ecs:us-east-1:123:cluster/my-cluster');

// Run task (sync — waits for completion)
const result = await cluster.runTask<TaskResult>({
  TaskDefinition: 'arn:aws:ecs:us-east-1:123:task-definition/my-task:1',
  LaunchType: 'FARGATE',
});

// Run task (async — returns immediately)
await cluster.runTaskAsync({
  TaskDefinition: 'arn:aws:ecs:us-east-1:123:task-definition/my-task:1',
  LaunchType: 'FARGATE',
});
```

Constructor takes a **Cluster ARN**.

---

## Bedrock

```typescript
const model = new Bedrock('anthropic.claude-3-sonnet-20240229-v1:0');

const result = await model.invokeModel<BedrockResponse>({
  Body: { prompt: input.prompt, max_tokens: 1000 },
  ContentType: 'application/json',
  Accept: 'application/json',
});
```

Constructor takes a **Model ID**.

---

## Glue

```typescript
const job = new Glue('my-etl-job');

// Start job run (sync — waits for completion)
const result = await job.startJobRun<JobResult>({
  Arguments: { '--input_path': input.path },
});

// Start job run (async — returns immediately)
await job.startJobRunAsync({
  Arguments: { '--input_path': input.path },
});
```

Constructor takes a **Job Name**.

---

## CodeBuild

```typescript
const project = new CodeBuild('my-build-project');

// Start build (sync — waits for completion)
const result = await project.startBuild<BuildResult>({
  EnvironmentVariablesOverride: [
    { Name: 'BRANCH', Value: input.branch, Type: 'PLAINTEXT' },
  ],
});

// Start build (async — returns immediately)
await project.startBuildAsync({});
```

Constructor takes a **Project Name**.

---

## Athena

```typescript
const athena = new Athena();

const execution = await athena.startQueryExecution<StartResult>({
  QueryString: 'SELECT * FROM logs WHERE date = ?',
  QueryExecutionContext: { Database: 'my_database' },
  ResultConfiguration: { OutputLocation: 's3://results/' },
});

const status = await athena.getQueryExecution<StatusResult>({
  QueryExecutionId: execution.QueryExecutionId,
});

const results = await athena.getQueryResults<QueryResult>({
  QueryExecutionId: execution.QueryExecutionId,
});
```

No constructor argument. Athena is stateless.

---

## Batch

```typescript
const queue = new Batch('arn:aws:batch:us-east-1:123:job-queue/my-queue');

// Submit job (sync — waits for completion)
const result = await queue.submitJob<JobResult>({
  JobDefinition: 'arn:aws:batch:us-east-1:123:job-definition/my-job:1',
  JobName: 'process-data',
});

// Submit job (async — returns immediately)
await queue.submitJobAsync({
  JobDefinition: 'arn:aws:batch:us-east-1:123:job-definition/my-job:1',
  JobName: 'process-data',
});
```

Constructor takes a **Job Queue ARN**.

---

## `Steps.awsSdk()` -- Generic Escape Hatch

For AWS services without a dedicated binding:

```typescript
// SES
await Steps.awsSdk('ses', 'sendEmail', {
  Source: 'noreply@example.com',
  Destination: { ToAddresses: [input.email] },
  Message: {
    Subject: { Data: 'Hello' },
    Body: { Text: { Data: input.messageBody } },
  },
});

// Bedrock
const response = await Steps.awsSdk<BedrockResponse>('bedrock', 'invokeModel', {
  ModelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
  Body: JSON.stringify({ prompt: input.prompt }),
});
```

Arguments:
- `service` -- AWS service name in lowercase (e.g., `"s3"`, `"ses"`, `"bedrock"`)
- `action` -- API action in camelCase (e.g., `"getObject"`, `"sendEmail"`)
- `parameters` -- request parameters (mapped directly to ASL `Parameters`)

Generates `Resource: "arn:aws:states:::aws-sdk:<service>:<action>"`.

Use typed bindings when available. Use `Steps.awsSdk()` for services without bindings or uncommon actions.

---

## Service Options

All service methods accept an optional second argument with retry, timeout, and heartbeat settings:

```typescript
const result = await fn.call(input, {
  retry: {
    errorEquals: ['States.TaskFailed'],
    intervalSeconds: 2,
    maxAttempts: 3,
    backoffRate: 2,
    maxDelaySeconds: 60,
    jitterStrategy: 'FULL',
  },
  timeoutSeconds: 300,       // Max execution time
  heartbeatSeconds: 30,      // Heartbeat interval for long-running tasks
});
```

### Retry Policy

```typescript
interface RetryPolicy {
  errorEquals?: string[];     // Error names to match (default: all retryable)
  intervalSeconds?: number;   // Initial delay (default: 1)
  maxAttempts?: number;       // Max retries (default: 3)
  backoffRate?: number;       // Delay multiplier (default: 2.0)
  maxDelaySeconds?: number;   // Max delay cap
  jitterStrategy?: 'FULL' | 'NONE';
}
```

### Timeouts

- `timeoutSeconds` — Maximum time (in seconds) the Task state is allowed to run. If the task exceeds this, Step Functions raises `States.Timeout`.
- `heartbeatSeconds` — Interval (in seconds) between heartbeat signals for long-running tasks. If no heartbeat is received within this interval, Step Functions raises `States.HeartbeatTimeout`.

Both compile to their corresponding ASL fields (`TimeoutSeconds`, `HeartbeatSeconds`) on the Task state.

