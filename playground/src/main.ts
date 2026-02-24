// main.ts — Playground entry point.
//
// Sets up two Monaco editors (TypeScript → ASL JSON), wires the compile
// button, debounced auto-compile, example selector, file tree, console
// panel, and error display.

import * as monaco from 'monaco-editor';
import { compileFromFiles } from './compiler-bridge';
import { getRuntimeSources } from './virtual-fs';

// ── Configure Monaco workers (self-hosted via Vite) ─────────────────────

// @ts-ignore — Vite bundled workers
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
// @ts-ignore
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
// @ts-ignore
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';

self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'typescript' || label === 'javascript') return new tsWorker();
    if (label === 'json') return new jsonWorker();
    return new editorWorker();
  },
};

// ── Example types ────────────────────────────────────────────────────────

interface ExampleFile {
  name: string;
  content: string;
}

interface ExampleDef {
  files: ExampleFile[];
  description?: string;
  services?: string[];
}

interface ExampleCategory {
  label: string;
  keys: string[];
}

const CATEGORY_ICONS: Record<string, string> = {
  'Control Flow': '\u{1F500}',
  'Services': '\u{2601}\uFE0F',
  'JS Features': '\u{1F4DD}',
  'Inline & Data Flow': '\u{1F517}',
  'CDK Patterns': '\u{1F4E6}',
  'Multi-Service Patterns': '\u{26A1}',
  'Limitations': '\u{1F6A7}',
};

const EXAMPLE_CATEGORIES: ExampleCategory[] = [
  {
    label: 'Control Flow',
    keys: [
      'sequential', 'if-else', 'early-return', 'while-loop', 'for-each',
      'try-catch', 'switch-case', 'nested-conditions', 'and-or-conditions',
      'dynamic-wait', 'wait-and-continue', 'parallel',
    ],
  },
  {
    label: 'Services',
    keys: [
      'multi-service', 'sqs-queue', 'eventbridge', 'dynamodb-crud',
      's3-operations', 'secrets-manager', 'ssm-params', 'nested-step-function',
      'lambda-patterns', 'aws-sdk-escape-hatch', 'ecs-task', 'bedrock-model',
      'batch-job', 'glue-etl', 'codebuild-project', 'athena-query',
    ],
  },
  {
    label: 'JS Features',
    keys: [
      'intrinsics', 'js-operators', 'string-interpolation', 'constants',
      'js-patterns', 'context-object', 'multi-step-function',
    ],
  },
  {
    label: 'Inline & Data Flow',
    keys: [
      'inline-config', 'inline-helpers', 'inline-enums',
      'inline-constant-chain', 'inline-safe-var',
    ],
  },
  {
    label: 'CDK Patterns',
    keys: [
      'cdk-order', 'cdk-notification', 'cdk-data-pipeline',
    ],
  },
  {
    label: 'Multi-Service Patterns',
    keys: [
      'ecs-s3-pipeline', 'bedrock-dynamodb-ai', 'error-handling-retry',
      'batch-fan-out',
    ],
  },
  {
    label: 'Limitations',
    keys: [
      'limit-arithmetic', 'limit-dynamic-expressions', 'limit-array-methods',
      'limit-recursive', 'limit-helper-constraints', 'limit-variable-capture',
      'limit-helper-nesting', 'limit-workarounds',
    ],
  },
];

// ── Example code snippets ────────────────────────────────────────────────

const EXAMPLES: Record<string, ExampleDef> = {
  // ── Control Flow ──────────────────────────────────────────────────────

  sequential: { description: 'Chain Lambda calls in sequence, passing results forward.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

const enrichFn = Lambda<{ id: string }, { data: string }>(
  'arn:aws:lambda:us-east-1:123:function:Enrich',
);
const transformFn = Lambda<{ data: string }, { output: string }>(
  'arn:aws:lambda:us-east-1:123:function:Transform',
);

export const sequential = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const enriched = await enrichFn.call({ id: input.id });
    const transformed = await transformFn.call({ data: enriched.data });
    return { output: transformed.output };
  },
);
` }] },

  'if-else': { description: 'Branch on input with if/else, compiles to Choice state.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

const premiumFn = Lambda<{ id: string }, { plan: string }>(
  'arn:aws:lambda:us-east-1:123:function:Premium',
);
const standardFn = Lambda<{ id: string }, { plan: string }>(
  'arn:aws:lambda:us-east-1:123:function:Standard',
);

export const ifElse = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string; tier: string }) => {
    if (input.tier === 'premium') {
      const result = await premiumFn.call({ id: input.id });
      return { plan: result.plan };
    } else {
      const result = await standardFn.call({ id: input.id });
      return { plan: result.plan };
    }
  },
);
` }] },

  'early-return': { description: 'Return early from a workflow using guard clauses.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

const validateFn = Lambda<{ data: string }, { valid: boolean }>('arn:aws:lambda:us-east-1:123:function:Validate');
const processFn = Lambda<{ data: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:Process');

export const earlyReturn = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    const validation = await validateFn.call({ data: input.data });
    if (!validation.valid) {
      return { error: 'Invalid data' };
    }
    const result = await processFn.call({ data: input.data });
    return { success: true, result: result.result };
  },
);
` }] },

  'while-loop': { description: 'Poll until done with a while loop (Choice + loop back).', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

const pollFn = Lambda<{ jobId: string }, { done: boolean; progress: number }>('arn:aws:lambda:us-east-1:123:function:Poll');

export const whileLoop = Steps.createFunction(
  async (context: SimpleStepContext, input: { jobId: string }) => {
    let status = await pollFn.call({ jobId: input.jobId });
    while (!status.done) {
      status = await pollFn.call({ jobId: input.jobId });
    }
    return { completed: true, progress: status.progress };
  },
);
` }] },

  'for-each': { description: 'Iterate over items with for-of, compiles to Map state.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

const processFn = Lambda<{ item: string }, { processed: boolean }>(
  'arn:aws:lambda:us-east-1:123:function:ProcessItem',
);

export const forEach = Steps.createFunction(
  async (context: SimpleStepContext, input: { items: string[] }) => {
    for (const item of input.items) {
      await processFn.call({ item });
    }
    return { done: true };
  },
);
` }] },

  'try-catch': { description: 'Error handling with try/catch, compiles to Catch rules.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

const riskyFn = Lambda<{ url: string }, { data: string }>(
  'arn:aws:lambda:us-east-1:123:function:FetchData',
);

export const tryCatch = Steps.createFunction(
  async (context: SimpleStepContext, input: { url: string }) => {
    try {
      const data = await riskyFn.call({ url: input.url });
      return { success: true, data: data.data };
    } catch (e) {
      return { success: false, error: 'Fetch failed' };
    }
  },
);
` }] },

  'switch-case': { description: 'Multi-branch switch/case, compiles to chained Choice states.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

const activateFn = Lambda<{ id: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:Activate');
const pendingFn = Lambda<{ id: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:ReviewPending');
const defaultFn = Lambda<{ id: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:HandleDefault');

export const switchCase = Steps.createFunction(
  async (context: SimpleStepContext, input: { status: string; id: string }) => {
    switch (input.status) {
      case 'active':
        const activeResult = await activateFn.call({ id: input.id });
        return { handled: 'active', result: activeResult.result };
      case 'pending':
        const pendingResult = await pendingFn.call({ id: input.id });
        return { handled: 'pending', result: pendingResult.result };
      default:
        const defaultResult = await defaultFn.call({ id: input.id });
        return { handled: 'default', result: defaultResult.result };
    }
  },
);
` }] },

  'nested-conditions': { description: 'Nested if/else conditions for role-based access.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

const superFn = Lambda<{ id: string }, { access: string }>('arn:aws:lambda:us-east-1:123:function:SuperAdmin');
const adminFn = Lambda<{ id: string }, { access: string }>('arn:aws:lambda:us-east-1:123:function:Admin');
const userFn = Lambda<{ id: string }, { access: string }>('arn:aws:lambda:us-east-1:123:function:User');

export const nestedConditions = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string; role: string; level: number }) => {
    if (input.role === 'admin') {
      if (input.level > 5) {
        const result = await superFn.call({ id: input.id });
        return { access: result.access, tier: 'super' };
      } else {
        const result = await adminFn.call({ id: input.id });
        return { access: result.access, tier: 'admin' };
      }
    } else {
      const result = await userFn.call({ id: input.id });
      return { access: result.access, tier: 'user' };
    }
  },
);
` }] },

  'and-or-conditions': { description: 'Compound conditions with && and ||, compiles to And/Or rules.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

const urgentFn = Lambda<{ id: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:HandleUrgent');
const normalFn = Lambda<{ id: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:HandleNormal');

export const andOrConditions = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string; priority: number; status: string }) => {
    if (input.priority > 5 && input.status === 'active') {
      const result = await urgentFn.call({ id: input.id });
      return { urgent: true, result: result.result };
    } else {
      const result = await normalFn.call({ id: input.id });
      return { urgent: false, result: result.result };
    }
  },
);
` }] },

  'dynamic-wait': { description: 'Wait state with dynamic seconds from a Lambda result.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

const scheduleFn = Lambda<{ taskId: string }, { delaySeconds: number }>('arn:aws:lambda:us-east-1:123:function:GetSchedule');
const executeFn = Lambda<{ taskId: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:Execute');

export const dynamicWait = Steps.createFunction(
  async (context: SimpleStepContext, input: { taskId: string }) => {
    const schedule = await scheduleFn.call({ taskId: input.taskId });
    Steps.delay({ seconds: schedule.delaySeconds });
    const result = await executeFn.call({ taskId: input.taskId });
    return { result: result.result };
  },
);
` }] },

  'wait-and-continue': { description: 'Fixed wait then continue execution.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

const checkFn = Lambda<{ id: string }, { status: string }>('arn:aws:lambda:us-east-1:123:function:CheckStatus');

export const waitAndContinue = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    Steps.delay({ seconds: 30 });
    const result = await checkFn.call({ id: input.id });
    return { status: result.status };
  },
);
` }] },

  parallel: { description: 'Run tasks in parallel with Promise.all, compiles to Parallel state.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

const getOrder = Lambda<{ orderId: string }, { status: string; total: number }>(
  'arn:aws:lambda:us-east-1:123:function:GetOrder',
);
const getPayment = Lambda<{ orderId: string }, { paid: boolean; method: string }>(
  'arn:aws:lambda:us-east-1:123:function:GetPayment',
);

export const parallel = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    const [order, payment] = await Promise.all([
      getOrder.call({ orderId: input.orderId }),
      getPayment.call({ orderId: input.orderId }),
    ]);

    return { order: order, payment: payment };
  },
);
` }] },

  // ── Services ──────────────────────────────────────────────────────────

  'multi-service': { description: 'Combine Lambda, DynamoDB, and SNS in one workflow.', services: ['Lambda', 'DynamoDB', 'SNS'], files: [
    { name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { validateFn, ordersDb, notifications } from './services';

// Multi-Service Workflow
// Service bindings are defined in services.ts and imported here.
// Open the file tree (◀ button) to see both files.

export const multiServiceWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; amount: number }) => {
    const validation = await validateFn.call({ orderId: input.orderId });
    if (!validation.valid) {
      return { error: 'Invalid order' };
    }
    await ordersDb.putItem({ orderId: input.orderId, amount: input.amount });
    await notifications.publish({ orderId: input.orderId, status: 'confirmed' });
    return { success: true, orderId: input.orderId };
  },
);
` },
    { name: 'services.ts', content: `import { Lambda } from './runtime/services/Lambda';
import { DynamoDB } from './runtime/services/DynamoDB';
import { SNS } from './runtime/services/SNS';

// Shared service bindings — imported by workflow files.

export const validateFn = Lambda<{ orderId: string }, { valid: boolean }>(
  'arn:aws:lambda:us-east-1:123:function:ValidateOrder',
);

export const ordersDb = new DynamoDB('OrdersTable');

export const notifications = new SNS('arn:aws:sns:us-east-1:123:OrderNotifications');
` },
  ] },

  'sqs-queue': { description: 'Send messages to an SQS queue after enrichment.', services: ['Lambda', 'SQS'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';
import { SQS } from './runtime/services/SimpleQueueService';

const enrichFn = Lambda<{ orderId: string }, { payload: string }>('arn:aws:lambda:us-east-1:123:function:EnrichOrder');
const taskQueue = new SQS('https://sqs.us-east-1.amazonaws.com/123/TaskQueue');

export const sqsQueue = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    const enriched = await enrichFn.call({ orderId: input.orderId });
    await taskQueue.publish({ orderId: input.orderId, payload: enriched.payload });
    return { queued: true };
  },
);
` }] },

  eventbridge: { description: 'Publish events to EventBridge after processing.', services: ['Lambda', 'EventBridge'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';
import { EventBridge } from './runtime/services/EventBridge';

const processFn = Lambda<{ orderId: string }, { total: number }>('arn:aws:lambda:us-east-1:123:function:ProcessOrder');
const eventBus = new EventBridge('MyAppBus');

export const eventBridgeExample = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    const order = await processFn.call({ orderId: input.orderId });
    await eventBus.putEvent({ orderId: input.orderId, status: 'processed' });
    return { published: true };
  },
);
` }] },

  'dynamodb-crud': { description: 'DynamoDB get, put, and delete with table name injection.', services: ['DynamoDB'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { DynamoDB } from './runtime/services/DynamoDB';

const usersDb = new DynamoDB('UsersTable');
const sessionsDb = new DynamoDB('SessionsTable');

export const dynamoDbCrud = Steps.createFunction(
  async (context: SimpleStepContext, input: { userId: string; sessionId: string }) => {
    const user = await usersDb.getItem({ userId: input.userId });
    await usersDb.putItem({ userId: input.userId, lastLogin: 'now' });
    await sessionsDb.deleteItem({ sessionId: input.sessionId });
    return { updated: true };
  },
);
` }] },

  's3-operations': { description: 'S3 put and get with automatic Bucket injection.', services: ['S3'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { S3 } from './runtime/services/S3';

// S3 Bucket Operations
// S3 takes a bucket name in the constructor. The compiler injects it
// as the Bucket parameter automatically.

const dataBucket = new S3('my-data-bucket');

export const s3Operations = Steps.createFunction(
  async (context: SimpleStepContext, input: { key: string; body: string }) => {
    await dataBucket.putObject({ Key: input.key, Body: input.body });
    const data = await dataBucket.getObject({ Key: input.key });
    return { data };
  },
);
` }] },

  'secrets-manager': { description: 'Retrieve secrets from AWS Secrets Manager.', services: ['SecretsManager'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { SecretsManager } from './runtime/services/SecretsManager';

// Secrets Manager
// SecretsManager is a stateless service — no constructor argument needed.
// The SecretId is provided directly in the method call.

const secrets = new SecretsManager();

export const secretsExample = Steps.createFunction(
  async (context: SimpleStepContext, input: { secretId: string }) => {
    const secret = await secrets.getSecretValue({ SecretId: input.secretId });
    return { secret };
  },
);
` }] },

  'ssm-params': { description: 'Read and write SSM Parameter Store values.', services: ['SSM'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { SSM } from './runtime/services/SSM';

// SSM Parameter Store
// SSM is a stateless service — no constructor argument needed.
// The parameter Name is provided directly in the method call.

const params = new SSM();

export const ssmExample = Steps.createFunction(
  async (context: SimpleStepContext, input: { paramName: string; paramValue: string }) => {
    await params.putParameter({ Name: input.paramName, Value: input.paramValue, Type: 'String' });
    const result = await params.getParameter({ Name: input.paramName });
    return { result };
  },
);
` }] },

  'nested-step-function': { description: 'Start child state machines synchronously and asynchronously.', services: ['StepFunction'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { StepFunction } from './runtime/services/StepFunction';

// Nested Step Function Execution
// Start a child state machine: sync (wait for result) or async (fire-and-forget).

const validationWorkflow = new StepFunction<
  { data: string },
  { valid: boolean; score: number }
>('arn:aws:states:us-east-1:123456789:stateMachine:ValidationWorkflow');

const notifyWorkflow = new StepFunction<
  { message: string },
  void
>('arn:aws:states:us-east-1:123456789:stateMachine:NotifyWorkflow');

export const nestedExecution = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    // Synchronous — waits for child to complete
    const result = await validationWorkflow.startExecution({ data: input.data });

    if (!result.valid) {
      return { status: 'INVALID', score: result.score };
    }

    // Asynchronous — fire and forget
    await notifyWorkflow.startExecutionAsync({ message: 'Validation passed' });

    return { status: 'VALID', score: result.score };
  },
);
` }] },

  'lambda-patterns': { description: 'Sync, async, and callback Lambda invocation patterns.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Lambda Invocation Patterns
// Three modes: synchronous (default), async (fire-and-forget),
// and wait-for-callback (waitForTaskToken).

const processOrder = Lambda<{ orderId: string }, { status: string }>(
  'arn:aws:lambda:us-east-1:123456789:function:ProcessOrder',
);

const sendEmail = Lambda<{ to: string; body: string }, void>(
  'arn:aws:lambda:us-east-1:123456789:function:SendEmail',
);

const longRunningJob = Lambda<{ jobId: string }, { result: string }>(
  'arn:aws:lambda:us-east-1:123456789:function:LongRunningJob',
);

export const lambdaPatterns = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; email: string }) => {
    // Synchronous — wait for result
    const order = await processOrder.call({ orderId: input.orderId });

    // Asynchronous — fire and forget (InvocationType: Event)
    await sendEmail.callAsync({
      to: input.email,
      body: order.status,
    });

    // Wait for callback — pauses until Lambda calls SendTaskSuccess
    const jobResult = await longRunningJob.callWithCallback<{ result: string }>({
      jobId: input.orderId,
    });

    return { orderStatus: order.status, jobResult: jobResult.result };
  },
);
` }] },

  'aws-sdk-escape-hatch': { description: 'Call any AWS service via Steps.awsSdk() escape hatch.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';

// AWS SDK Escape Hatch
// Steps.awsSdk() calls any AWS service not covered by built-in bindings.
// Compiles to: arn:aws:states:::aws-sdk:<service>:<action>

export const awsSdkEscapeHatch = Steps.createFunction(
  async (context: SimpleStepContext, input: { email: string; messageBody: string }) => {
    // Send an email via SES (no built-in binding)
    await Steps.awsSdk('ses', 'sendEmail', {
      Source: 'noreply@example.com',
      Destination: { ToAddresses: [input.email] },
      Message: {
        Subject: { Data: 'Notification' },
        Body: { Text: { Data: input.messageBody } },
      },
    });

    // Start a Textract job (no built-in binding)
    await Steps.awsSdk('textract', 'startDocumentAnalysis', {
      DocumentLocation: {
        S3Object: { Bucket: 'my-docs', Name: 'document.pdf' },
      },
      FeatureTypes: ['TABLES', 'FORMS'],
    });

    return { sent: true };
  },
);
` }] },

  // ── JS Features ───────────────────────────────────────────────────────

  intrinsics: { description: 'Steps.format(), Steps.uuid(), Steps.add() intrinsic functions.', services: [], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';

export const intrinsics = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; price: number; tax: number; metadata: string }) => {
    // Arithmetic using Steps.add()
    const total = Steps.add(input.price, input.tax);

    // String formatting using Steps.format()
    const message = Steps.format('Order {} confirmed, total: {}', input.orderId, total);

    // Generate a unique ID using Steps.uuid()
    const trackingId = Steps.uuid();

    // Parse a JSON string using Steps.jsonParse()
    const meta = Steps.jsonParse(input.metadata);

    return {
      message: message,
      trackingId: trackingId,
      total: total,
      meta: meta,
    };
  },
);
` }] },

  'js-operators': { description: 'Natural JS operators (+, template literals, JSON.parse) mapped to ASL.', services: [], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';

// Same logic as the "Intrinsics" example, but using natural JS operators.
// The compiler maps these to the SAME ASL intrinsic functions!
//   a + b            → States.MathAdd(a, b)
//   \`\${a} text\`   → States.Format('{} text', a)
//   JSON.parse()     → States.StringToJson()

export const jsOperators = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; price: number; tax: number; metadata: string }) => {
    // Arithmetic using the + operator (compiles to States.MathAdd)
    const total = input.price + input.tax;

    // String formatting using template literals (compiles to States.Format)
    const message = \`Order \${input.orderId} confirmed, total: \${total}\`;

    // Generate a unique ID (Steps.uuid is the only way)
    const trackingId = Steps.uuid();

    // Parse a JSON string using JSON.parse (compiles to States.StringToJson)
    const meta = JSON.parse(input.metadata);

    return {
      message: message,
      trackingId: trackingId,
      total: total,
      meta: meta,
    };
  },
);
` }] },

  'string-interpolation': { description: 'Template literals compile to States.Format intrinsic.', services: [], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';

// String Interpolation with Template Literals
// Write natural template strings — compiler maps them to States.Format.

export const stringInterpolation = Steps.createFunction(
  async (context: SimpleStepContext, input: { name: string; orderId: string; price: number; tax: number }) => {
    const total = input.price + input.tax;

    // Simple interpolation
    const greeting = \`Hello, \${input.name}!\`;

    // Multiple substitutions
    const summary = \`Order \${input.orderId}: $\${total} (including tax)\`;

    // Nested expressions in template
    const receipt = \`Receipt for \${input.name} — Order #\${input.orderId}, Total: $\${Steps.add(input.price, input.tax)}\`;

    return { greeting, summary, receipt };
  },
);
` }] },

  constants: { description: 'Module-level constants folded and inlined at compile time.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Compile-Time Constants
// Module-level const values are inlined at compile time.

const API_VERSION = 'v2';
const BASE_PATH = '/api/' + API_VERSION;    // folds to "/api/v2"
const MAX_RETRIES = 3;
const TIMEOUT_MS = 30 * 1000;               // folds to 30000
const GREETING = \`Welcome to API \${API_VERSION}\`;  // template + constant fold

const userService = Lambda<{ path: string; retries: number; timeout: number }, { data: string }>(
  'arn:aws:lambda:us-east-1:123:function:UserService',
);

export const constants = Steps.createFunction(
  async (context: SimpleStepContext, input: { userId: string }) => {
    const result = await userService.call({
      path: BASE_PATH,
      retries: MAX_RETRIES,
      timeout: TIMEOUT_MS,
    });
    return {
      data: result.data,
      greeting: GREETING,
    };
  },
);
` }] },

  'js-patterns': { description: 'Complete reference of every JS pattern mapped to ASL.', services: [], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';

// Complete JavaScript Pattern Reference
// Every JS pattern the compiler maps to ASL, in one place.

export const jsPatterns = Steps.createFunction(
  async (context: SimpleStepContext, input: {
    items: string[]; csv: string; data: string;
    price: number; tax: number; name: string
  }) => {
    // Arithmetic: + → States.MathAdd
    const total = input.price + input.tax;

    // Template literals → States.Format
    const message = \`Hello \${input.name}, your total is \${total}\`;

    // String split → States.StringSplit
    const parts = input.csv.split(',');

    // JSON.parse → States.StringToJson
    const parsed = JSON.parse(input.data);

    // JSON.stringify → States.JsonToString
    const serialized = JSON.stringify(parsed);

    // Array includes → States.ArrayContains
    const hasItem = input.items.includes('special');

    // Array length → States.ArrayLength
    const count = input.items.length;

    // Steps.uuid → States.UUID
    const id = Steps.uuid();

    return { total, message, parts, parsed, serialized, hasItem, count, id };
  },
);
` }] },

  'context-object': { description: 'Access execution metadata via the context parameter.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Context Object
// Access execution metadata via the context parameter: execution ID,
// state machine name, task token, retry count, etc.

const auditFn = Lambda<
  { executionId: string; stateMachineName: string; stateName: string },
  { logged: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:AuditLogger');

export const contextExample = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    // Access execution metadata
    await auditFn.call({
      executionId: context.execution.id,
      stateMachineName: context.stateMachine.name,
      stateName: context.state.name,
    });

    return {
      executionId: context.execution.id,
      startTime: context.execution.startTime,
      data: input.data,
    };
  },
);
` }] },

  'multi-step-function': { description: 'Multiple state machines in one file (create + cancel order).', services: ['Lambda', 'DynamoDB', 'SNS'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';
import { DynamoDB } from './runtime/services/DynamoDB';
import { SNS } from './runtime/services/SNS';

const validateFn = Lambda<{ orderId: string; amount: number }, { valid: boolean }>(
  'arn:aws:lambda:us-east-1:123:function:ValidateOrder',
);
const lookupFn = Lambda<{ orderId: string }, { exists: boolean; status: string }>(
  'arn:aws:lambda:us-east-1:123:function:LookupOrder',
);
const ordersDb = new DynamoDB('OrdersTable');
const notifications = new SNS('arn:aws:sns:us-east-1:123:OrderEvents');

// Step function 1: Create Order
export const createOrder = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; amount: number }) => {
    const check = await validateFn.call({ orderId: input.orderId, amount: input.amount });
    if (!check.valid) {
      return { success: false, error: 'Validation failed' };
    }
    await ordersDb.putItem({ orderId: input.orderId, amount: input.amount, status: 'created' });
    await notifications.publish({ orderId: input.orderId, event: 'created' });
    return { success: true, orderId: input.orderId };
  },
);

// Step function 2: Cancel Order
export const cancelOrder = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    const order = await lookupFn.call({ orderId: input.orderId });
    if (!order.exists) {
      return { success: false, error: 'Order not found' };
    }
    await ordersDb.deleteItem({ orderId: input.orderId });
    await notifications.publish({ orderId: input.orderId, event: 'cancelled' });
    return { success: true, orderId: input.orderId };
  },
);
` }] },

  // ── Inline & Data Flow ────────────────────────────────────────────────

  'inline-config': { description: 'Cross-file config objects resolved at compile time.', services: ['Lambda'], files: [
    { name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';
import { config } from './config';

// Config & Destructuring
// The config object lives in config.ts. Properties are resolved
// across files at compile time — check the ASL for literal values.
// Open the file tree (◀ button) to see both files.

const { processArn, notifyArn, maxRetries, timeoutMs } = config;

const processFn = Lambda<
  { orderId: string; retries: number },
  { status: string; total: number }
>(processArn);

const notifyFn = Lambda<
  { orderId: string; message: string },
  { sent: boolean }
>(notifyArn);

export const configWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    const result = await processFn.call({
      orderId: input.orderId,
      retries: maxRetries,
    });

    await notifyFn.call({
      orderId: input.orderId,
      message: 'Order processed',
    });

    return {
      status: result.status,
      total: result.total,
      timeout: timeoutMs,
    };
  },
);
` },
    { name: 'config.ts', content: `// Shared configuration — imported by workflow.ts.
// All values are resolved at compile time.

export const config = {
  processArn: 'arn:aws:lambda:us-east-1:123:function:ProcessOrder',
  notifyArn: 'arn:aws:lambda:us-east-1:123:function:NotifyCustomer',
  maxRetries: 3,
  timeoutMs: 30000,
  region: 'us-east-1',
};
` },
  ] },

  'inline-helpers': { description: 'Pure helper functions inlined across file boundaries.', services: ['Lambda'], files: [
    { name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';
import { makeArn } from './helpers';

// Pure Helper Functions (cross-file)
// makeArn() lives in helpers.ts. The compiler inlines the return
// value across the file boundary — check the ASL for literal ARNs.
// Open the file tree (◀ button) to see both files.

const processFn = Lambda<{ orderId: string }, { status: string }>(makeArn('ProcessOrder'));
const validateFn = Lambda<{ orderId: string }, { valid: boolean }>(makeArn('ValidateOrder'));
const notifyFn = Lambda<{ orderId: string; status: string }, { sent: boolean }>(makeArn('NotifyCustomer'));

export const helperWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    const check = await validateFn.call({ orderId: input.orderId });
    if (!check.valid) {
      return { error: 'Invalid order' };
    }
    const result = await processFn.call({ orderId: input.orderId });
    await notifyFn.call({ orderId: input.orderId, status: result.status });
    return { status: result.status };
  },
);
` },
    { name: 'helpers.ts', content: `// Pure helper function — inlined at compile time.
// The compiler evaluates makeArn() calls and substitutes the result.

export function makeArn(name: string) {
  return \`arn:aws:lambda:us-east-1:123456789:function:\${name}\`;
}
` },
  ] },

  'inline-enums': { description: 'TypeScript enum values resolved to literals at compile time.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// TypeScript Enums
// Enum member values are resolved at compile time and inlined
// as literal strings in the ASL output.

enum OrderStatus {
  Pending = 'PENDING',
  Active = 'ACTIVE',
  Shipped = 'SHIPPED',
  Cancelled = 'CANCELLED',
}

const statusFn = Lambda<
  { orderId: string },
  { status: string }
>('arn:aws:lambda:us-east-1:123:function:CheckStatus');

const shipFn = Lambda<
  { orderId: string },
  { trackingId: string }
>('arn:aws:lambda:us-east-1:123:function:ShipOrder');

const cancelFn = Lambda<
  { orderId: string; reason: string },
  { refunded: boolean }
>('arn:aws:lambda:us-east-1:123:function:CancelOrder');

export const enumWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    const check = await statusFn.call({ orderId: input.orderId });

    if (check.status === OrderStatus.Active) {
      const shipped = await shipFn.call({ orderId: input.orderId });
      return { status: OrderStatus.Shipped, trackingId: shipped.trackingId };
    }

    if (check.status === OrderStatus.Pending) {
      const cancelled = await cancelFn.call({
        orderId: input.orderId,
        reason: 'Stale pending order',
      });
      return { status: OrderStatus.Cancelled, refunded: cancelled.refunded };
    }

    return { status: check.status, action: 'none' };
  },
);
` }] },

  'inline-constant-chain': { description: 'Chained constants resolved across file boundaries.', services: ['Lambda'], files: [
    { name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';
import { MAX_TIMEOUT, GREETING, TOTAL_BUDGET, APP_VERSION } from './constants';

// Constant Chain (cross-file)
// All constants are defined in constants.ts and resolved across the
// file boundary at compile time. Check the ASL — every value is a literal.
// Open the file tree (◀ button) to see both files.

const processFn = Lambda<
  { timeout: number; greeting: string },
  { result: string }
>('arn:aws:lambda:us-east-1:123:function:Process');

export const constantChain = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    const result = await processFn.call({
      timeout: MAX_TIMEOUT,
      greeting: GREETING,
    });
    return {
      result: result.result,
      totalBudget: TOTAL_BUDGET,
      appVersion: APP_VERSION,
    };
  },
);
` },
    { name: 'constants.ts', content: `// Constant chain — each value derives from earlier constants.
// The compiler resolves the entire chain at compile time.

export const BASE_TIMEOUT = 10;
export const RETRY_MULTIPLIER = 3;
export const MAX_TIMEOUT = BASE_TIMEOUT * RETRY_MULTIPLIER;   // → 30
export const TOTAL_BUDGET = MAX_TIMEOUT + 20;                  // → 50

export const APP_NAME = 'OrderService';
export const APP_VERSION = 2;
export const GREETING = \`\${APP_NAME} v\${APP_VERSION}\`;        // → "OrderService v2"
` },
  ] },

  'inline-safe-var': { description: 'Steps.safeVar() escape hatch for dynamic CDK values.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Steps.safeVar() Escape Hatch
//
// When a value isn't a compile-time constant (e.g., it comes from
// CDK bindings or environment config), wrap it with Steps.safeVar()
// to tell the compiler: "trust me, this will be available at runtime."
//
// The compiler emits a warning (SS708) instead of an error.

const dynamicArn = Steps.safeVar(
  'arn:aws:lambda:us-east-1:123:function:DynamicProcessor',
);

const dynamicFn = Lambda<
  { data: string },
  { result: string }
>(dynamicArn);

export const safeVarWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    const result = await dynamicFn.call({ data: input.data });
    return { result: result.result };
  },
);
` }] },

  // ── CDK Patterns ──────────────────────────────────────────────────────

  'cdk-order': { description: 'CDK order processing with Lambda + DynamoDB bindings.', services: ['Lambda', 'DynamoDB'], files: [
    { name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';
import { DynamoDB } from './runtime/services/DynamoDB';

// CDK Bindings
// In production, these values come from the CDK stack via:
//   bindings: { validateOrderArn: validateFn.functionArn, ... }
// CDK substitutes real ARNs at deploy time.
// See stack.ts for the full CDK infrastructure code.

const validateOrderArn = 'arn:aws:lambda:us-east-1:123456789:function:ValidateOrder';
const ordersTableName = 'OrdersTable';

const validateOrder = Lambda<
  { orderId: string },
  { valid: boolean; total: number }
>(validateOrderArn);

const ordersTable = new DynamoDB(ordersTableName);

export const orderWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; customerId: string }) => {
    const order = await validateOrder.call({ orderId: input.orderId });

    if (!order.valid) {
      return { status: 'INVALID', orderId: input.orderId };
    }

    await ordersTable.putItem({
      orderId: input.orderId,
      customerId: input.customerId,
      total: order.total,
      status: 'CONFIRMED',
    });

    return { status: 'CONFIRMED', orderId: input.orderId, total: order.total };
  },
);
` },
    { name: 'stack.ts', content: `// CDK Stack — infrastructure for the order workflow.
// This file is not compiled by SimpleSteps; it shows how
// you wire the workflow into a CDK app.
//
// The SimpleStepsStateMachine construct compiles workflow.ts
// at CDK synth time and injects the real ARNs via bindings.

import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Construct } from 'constructs';

export class OrderStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. Create infrastructure
    const validateFn = new lambda.Function(this, 'ValidateOrder', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/validate'),
    });

    const ordersTable = new dynamodb.Table(this, 'OrdersTable', {
      partitionKey: { name: 'orderId', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // 2. Create state machine from workflow.ts
    const machine = new SimpleStepsStateMachine(this, 'OrderWorkflow', {
      sourceFile: path.join(__dirname, '../workflows/workflow.ts'),
      bindings: {
        // CDK Tokens — resolved to real ARNs at deploy time
        validateOrderArn: validateFn.functionArn,
        ordersTableName: ordersTable.tableName,
      },
    });

    // 3. Grant permissions
    validateFn.grantInvoke(machine);
    ordersTable.grantWriteData(machine);
  }
}
` },
  ] },

  'cdk-notification': { description: 'CDK notification pipeline with 4 services.', services: ['Lambda', 'DynamoDB', 'SNS', 'SQS'], files: [
    { name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';
import { DynamoDB } from './runtime/services/DynamoDB';
import { SNS } from './runtime/services/SNS';
import { SQS } from './runtime/services/SimpleQueueService';

// CDK Bindings — see stack.ts for infrastructure code.
const validateOrderArn = 'arn:aws:lambda:us-east-1:123456789:function:ValidateOrder';
const ordersTableName = 'OrdersTable';
const notificationTopicArn = 'arn:aws:sns:us-east-1:123456789:OrderNotifications';
const taskQueueUrl = 'https://sqs.us-east-1.amazonaws.com/123456789/OrderTasks';

const validateOrder = Lambda<
  { orderId: string; amount: number },
  { valid: boolean }
>(validateOrderArn);

const ordersTable = new DynamoDB(ordersTableName);
const notifications = new SNS(notificationTopicArn);
const taskQueue = new SQS(taskQueueUrl);

export const notificationPipeline = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; amount: number; email: string }) => {
    // Validate
    const check = await validateOrder.call({
      orderId: input.orderId,
      amount: input.amount,
    });

    if (!check.valid) {
      await notifications.publish({
        event: 'ORDER_REJECTED',
        orderId: input.orderId,
        email: input.email,
      });
      return { status: 'REJECTED' };
    }

    // Persist
    await ordersTable.putItem({
      orderId: input.orderId,
      amount: input.amount,
      status: 'CONFIRMED',
    });

    // Fan out: notify + queue fulfillment task
    await notifications.publish({
      event: 'ORDER_CONFIRMED',
      orderId: input.orderId,
      email: input.email,
    });

    await taskQueue.publish({
      action: 'FULFILL',
      orderId: input.orderId,
    });

    return { status: 'CONFIRMED', orderId: input.orderId };
  },
);
` },
    { name: 'stack.ts', content: `// CDK Stack — notification pipeline infrastructure.
// Wires Lambda, DynamoDB, SNS, and SQS into the workflow.

import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Construct } from 'constructs';

export class NotificationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const validateFn = new lambda.Function(this, 'ValidateOrder', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/validate'),
    });

    const ordersTable = new dynamodb.Table(this, 'OrdersTable', {
      partitionKey: { name: 'orderId', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const notificationTopic = new sns.Topic(this, 'OrderNotifications');

    const taskQueue = new sqs.Queue(this, 'OrderTasks', {
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    const machine = new SimpleStepsStateMachine(this, 'NotificationPipeline', {
      sourceFile: path.join(__dirname, '../workflows/workflow.ts'),
      bindings: {
        validateOrderArn: validateFn.functionArn,
        ordersTableName: ordersTable.tableName,
        notificationTopicArn: notificationTopic.topicArn,
        taskQueueUrl: taskQueue.queueUrl,
      },
    });

    // Grant permissions for each service
    validateFn.grantInvoke(machine);
    ordersTable.grantWriteData(machine);
    notificationTopic.grantPublish(machine);
    taskQueue.grantSendMessages(machine);
  }
}
` },
  ] },

  'cdk-data-pipeline': { description: 'CDK ETL pipeline: S3 read, Lambda transform, S3 write.', services: ['Lambda', 'S3'], files: [
    { name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';
import { S3 } from './runtime/services/S3';

// CDK Bindings — see stack.ts for infrastructure code.
const transformFnArn = 'arn:aws:lambda:us-east-1:123456789:function:TransformData';
const dataBucketName = 'my-data-pipeline-bucket';

const transformFn = Lambda<
  { records: string; format: string },
  { transformed: string; count: number }
>(transformFnArn);

const dataBucket = new S3(dataBucketName);

export const dataPipeline = Steps.createFunction(
  async (context: SimpleStepContext, input: { inputKey: string; outputKey: string; format: string }) => {
    // 1. Read raw data from S3
    const rawData = await dataBucket.getObject({ Key: input.inputKey });

    // 2. Transform with Lambda
    const result = await transformFn.call({
      records: rawData,
      format: input.format,
    });

    // 3. Write result back to S3
    await dataBucket.putObject({
      Key: input.outputKey,
      Body: result.transformed,
    });

    return {
      inputKey: input.inputKey,
      outputKey: input.outputKey,
      recordCount: result.count,
    };
  },
);
` },
    { name: 'stack.ts', content: `// CDK Stack — S3 data pipeline infrastructure.
// In raw CDK, every S3 operation requires a CustomState with
// hand-written ASL JSON. SimpleSteps compiles natural TypeScript
// to those same integrations automatically.

import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Construct } from 'constructs';

export class DataPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dataBucket = new s3.Bucket(this, 'DataBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const transformFn = new lambda.Function(this, 'TransformData', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/transform'),
      timeout: cdk.Duration.minutes(5),
      memorySize: 1024,
    });

    const machine = new SimpleStepsStateMachine(this, 'DataPipeline', {
      sourceFile: path.join(__dirname, '../workflows/workflow.ts'),
      bindings: {
        transformFnArn: transformFn.functionArn,
        dataBucketName: dataBucket.bucketName,
      },
    });

    // Grant permissions
    transformFn.grantInvoke(machine);
    dataBucket.grantRead(machine);
    dataBucket.grantWrite(machine);
  }
}
` },
  ] },

  // ── New Services ────────────────────────────────────────────────────────

  'ecs-task': { description: 'Run an ECS Fargate task synchronously.', services: ['ECS'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { ECS } from './runtime/services/ECS';

// ECS Task Runner
// ECS takes a cluster ARN in the constructor. The compiler injects it
// as the Cluster parameter automatically.

const cluster = new ECS('arn:aws:ecs:us-east-1:123456789:cluster/my-cluster');

export const ecsWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { image: string; command: string }) => {
    const result = await cluster.runTask({
      TaskDefinition: 'my-task-def',
      LaunchType: 'FARGATE',
      Overrides: {
        ContainerOverrides: [{
          Name: 'main',
          Command: [input.command],
        }],
      },
    });

    return { taskResult: result };
  },
);
` }] },

  'bedrock-model': { description: 'Invoke a Bedrock foundation model for AI inference.', services: ['Bedrock'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Bedrock } from './runtime/services/Bedrock';

// Bedrock Model Invocation
// Bedrock takes a model ID in the constructor. The compiler injects it
// as the ModelId parameter automatically.

const claude = new Bedrock('anthropic.claude-3-sonnet-20240229-v1:0');

export const bedrockWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { prompt: string; maxTokens: number }) => {
    const response = await claude.invokeModel({
      ContentType: 'application/json',
      Body: {
        prompt: input.prompt,
        max_tokens: input.maxTokens,
      },
    });

    return { response };
  },
);
` }] },

  'batch-job': { description: 'Submit an AWS Batch job and wait for completion.', services: ['Batch'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Batch } from './runtime/services/Batch';

// AWS Batch Job
// Batch takes a job queue ARN in the constructor. The compiler injects it
// as the JobQueue parameter.

const queue = new Batch('arn:aws:batch:us-east-1:123456789:job-queue/my-queue');

export const batchWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { jobName: string; inputFile: string }) => {
    const result = await queue.submitJob({
      JobName: input.jobName,
      JobDefinition: 'my-job-def',
      ContainerOverrides: {
        Environment: [
          { Name: 'INPUT_FILE', Value: input.inputFile },
        ],
      },
    });

    return { jobResult: result };
  },
);
` }] },

  'glue-etl': { description: 'Run a Glue ETL job synchronously.', services: ['Glue'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Glue } from './runtime/services/Glue';

// AWS Glue ETL Job
// Glue takes a job name in the constructor. The compiler injects it
// as the JobName parameter automatically.

const etlJob = new Glue('my-etl-job');

export const glueWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { inputPath: string; outputPath: string }) => {
    const result = await etlJob.startJobRun({
      Arguments: {
        '--input_path': input.inputPath,
        '--output_path': input.outputPath,
      },
    });

    return { jobResult: result };
  },
);
` }] },

  'codebuild-project': { description: 'Trigger a CodeBuild project build and wait for it.', services: ['CodeBuild'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { CodeBuild } from './runtime/services/CodeBuild';

// AWS CodeBuild
// CodeBuild takes a project name in the constructor. The compiler injects it
// as the ProjectName parameter automatically.

const buildProject = new CodeBuild('my-build-project');

export const codebuildWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { branch: string; commitId: string }) => {
    const result = await buildProject.startBuild({
      SourceVersion: input.branch,
      EnvironmentVariablesOverride: [
        { Name: 'COMMIT_ID', Value: input.commitId, Type: 'PLAINTEXT' },
      ],
    });

    return { buildResult: result };
  },
);
` }] },

  'athena-query': { description: 'Run an Athena SQL query and retrieve results.', services: ['Athena'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Athena } from './runtime/services/Athena';

// Athena Query
// Athena is stateless (no constructor arg). Methods map directly
// to Athena Step Functions integrations.

const athena = new Athena();

export const athenaWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { query: string; database: string }) => {
    const execution = await athena.startQueryExecution({
      QueryString: input.query,
      QueryExecutionContext: { Database: input.database },
      ResultConfiguration: { OutputLocation: 's3://query-results/' },
    });

    const results = await athena.getQueryResults({
      QueryExecutionId: execution,
    });

    return { results };
  },
);
` }] },

  // ── Multi-Service Patterns ──────────────────────────────────────────────

  'ecs-s3-pipeline': { description: 'ECS + S3 data pipeline: read from S3, process in ECS, write back.', services: ['ECS', 'S3', 'Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { ECS } from './runtime/services/ECS';
import { S3 } from './runtime/services/S3';
import { Lambda } from './runtime/services/Lambda';

const cluster = new ECS('arn:aws:ecs:us-east-1:123456789:cluster/processing');
const dataBucket = new S3('data-pipeline-bucket');
const notifyFn = Lambda<{ status: string; key: string }, void>(
  'arn:aws:lambda:us-east-1:123456789:function:NotifyComplete',
);

export const ecsPipeline = Steps.createFunction(
  async (context: SimpleStepContext, input: { inputKey: string; outputKey: string }) => {
    // 1. Read input manifest from S3
    const manifest = await dataBucket.getObject({ Key: input.inputKey });

    // 2. Run ECS task to process the data
    const result = await cluster.runTask({
      TaskDefinition: 'data-processor',
      LaunchType: 'FARGATE',
      Overrides: {
        ContainerOverrides: [{
          Name: 'processor',
          Environment: [
            { Name: 'INPUT_KEY', Value: input.inputKey },
            { Name: 'OUTPUT_KEY', Value: input.outputKey },
          ],
        }],
      },
    });

    // 3. Write completion marker to S3
    await dataBucket.putObject({
      Key: input.outputKey,
      Body: result,
    });

    // 4. Notify completion
    await notifyFn.callAsync({ status: 'complete', key: input.outputKey });

    return { inputKey: input.inputKey, outputKey: input.outputKey };
  },
);
` }] },

  'bedrock-dynamodb-ai': { description: 'Bedrock AI + DynamoDB: generate content and store results.', services: ['Bedrock', 'DynamoDB', 'Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Bedrock } from './runtime/services/Bedrock';
import { DynamoDB } from './runtime/services/DynamoDB';
import { Lambda } from './runtime/services/Lambda';

const claude = new Bedrock('anthropic.claude-3-sonnet-20240229-v1:0');
const resultsDb = new DynamoDB('AIResultsTable');
const prepareFn = Lambda<
  { topic: string },
  { prompt: string; systemPrompt: string }
>('arn:aws:lambda:us-east-1:123456789:function:PreparePrompt');

export const aiWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { topic: string; userId: string }) => {
    // 1. Prepare the prompt via Lambda
    const prepared = await prepareFn.call({ topic: input.topic });

    // 2. Invoke Bedrock model
    const response = await claude.invokeModel({
      ContentType: 'application/json',
      Body: {
        prompt: prepared.prompt,
        system: prepared.systemPrompt,
        max_tokens: 2048,
      },
    });

    // 3. Store result in DynamoDB
    await resultsDb.putItem({
      userId: input.userId,
      topic: input.topic,
      result: response,
      timestamp: context.execution.startTime,
    });

    return { userId: input.userId, topic: input.topic, response };
  },
);
` }] },

  'error-handling-retry': { description: 'Multi-service workflow with try/catch and retry patterns.', services: ['Lambda', 'DynamoDB', 'SNS'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';
import { DynamoDB } from './runtime/services/DynamoDB';
import { SNS } from './runtime/services/SNS';

const processFn = Lambda<
  { orderId: string },
  { status: string; total: number }
>('arn:aws:lambda:us-east-1:123456789:function:ProcessOrder');

const ordersDb = new DynamoDB('OrdersTable');
const alerts = new SNS('arn:aws:sns:us-east-1:123456789:AlertTopic');

export const errorHandlingWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    try {
      // Process the order — may fail
      const result = await processFn.call({ orderId: input.orderId });

      // Store successful result
      await ordersDb.putItem({
        orderId: input.orderId,
        status: result.status,
        total: result.total,
      });

      return { success: true, orderId: input.orderId, total: result.total };
    } catch (e) {
      // On failure, send alert and mark order as failed
      await alerts.publish({
        event: 'ORDER_FAILED',
        orderId: input.orderId,
        executionId: context.execution.id,
      });

      await ordersDb.putItem({
        orderId: input.orderId,
        status: 'FAILED',
      });

      return { success: false, orderId: input.orderId };
    }
  },
);
` }] },

  'batch-fan-out': { description: 'Fan-out/fan-in: process items in parallel, aggregate results.', services: ['Lambda', 'DynamoDB'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';
import { DynamoDB } from './runtime/services/DynamoDB';

const processFn = Lambda<
  { item: string },
  { result: string; score: number }
>('arn:aws:lambda:us-east-1:123456789:function:ProcessItem');

const aggregateFn = Lambda<
  { batchId: string; itemCount: number },
  { summary: string }
>('arn:aws:lambda:us-east-1:123456789:function:Aggregate');

const resultsDb = new DynamoDB('BatchResultsTable');

export const batchFanOut = Steps.createFunction(
  async (context: SimpleStepContext, input: { batchId: string; items: string[] }) => {
    // Fan-out: process each item (compiles to Map state)
    for (const item of input.items) {
      await processFn.call({ item });
    }

    // Aggregate results
    const summary = await aggregateFn.call({
      batchId: input.batchId,
      itemCount: input.items.length,
    });

    // Store final result
    await resultsDb.putItem({
      batchId: input.batchId,
      summary: summary.summary,
      itemCount: input.items.length,
    });

    return { batchId: input.batchId, summary: summary.summary };
  },
);
` }] },

  // ── Limitations ────────────────────────────────────────────────────────

  'limit-arithmetic': { description: 'Multiply, divide, and modulo have no ASL intrinsic.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// ASL only provides States.MathAdd — there is no States.MathMultiply,
// States.MathDivide, or States.MathModulo. The compiler will emit
// helpful errors for each unsupported operator.

const priceFn = Lambda<
  { productId: string },
  { price: number; quantity: number }
>('arn:aws:lambda:us-east-1:123456789:function:GetPrice');

export const arithmeticLimits = Steps.createFunction(
  async (context: SimpleStepContext, input: { productId: string }) => {
    const item = await priceFn.call({ productId: input.productId });

    // ✅ Addition works — compiles to States.MathAdd
    const withTax = item.price + 5;

    // ✅ Subtraction by a literal works — compiles to States.MathAdd(x, -10)
    const discounted = item.price - 10;

    // ❌ SS530: Multiplication — no ASL intrinsic
    const total = item.price * item.quantity;

    // ❌ SS531: Division — no ASL intrinsic
    const half = item.price / 2;

    // ❌ SS532: Modulo — no ASL intrinsic
    const remainder = item.quantity % 3;

    // ❌ SS533: Dynamic subtraction — right side must be a literal
    const diff = item.price - item.quantity;

    return { withTax, discounted, total, half, remainder, diff };
  },
);
` }] },

  'limit-dynamic-expressions': { description: 'Expressions that cannot be resolved to ASL values.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// ASL parameters must be: input references ($.field), service call
// results, compile-time constants, or ASL intrinsic functions.
// Anything else produces an SS502 "Cannot resolve to ASL value" error.

const processFn = Lambda<
  { data: string },
  { items: string[]; count: number }
>('arn:aws:lambda:us-east-1:123456789:function:Process');

const storeFn = Lambda<
  { value: string; flag: boolean },
  { ok: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:Store');

export const dynamicLimits = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string; threshold: number }) => {
    const result = await processFn.call({ data: input.data });

    // ❌ SS502: Ternary with runtime values — ASL has no conditional expression
    const label = result.count > 5 ? 'large' : 'small';

    // ❌ SS502: String() coercion — no ASL equivalent
    const countStr = String(result.count);

    // ❌ SS510: Complex condition — can't compile to ASL Choice rule
    if (result.count > 0 && label === 'large') {
      return { status: 'matched' };
    }

    // ❌ SS501: Computed property name — JSONPath needs static keys
    const key = 'dynamicKey';
    await storeFn.call({ value: input.data, flag: true });

    return { status: 'done', count: result.count };
  },
);
` }] },

  'limit-array-methods': { description: 'Array .map(), .filter(), .reduce() have no ASL equivalent.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// ASL has no runtime array transformation primitives. Methods like
// .map(), .filter(), and .reduce() require arbitrary code execution
// that Step Functions can't express.
//
// Workaround: Use for...of loops (compiled to Map states) or
// delegate to a Lambda function.

const enrichFn = Lambda<
  { id: string },
  { enriched: string }
>('arn:aws:lambda:us-east-1:123456789:function:Enrich');

export const arrayLimits = Steps.createFunction(
  async (context: SimpleStepContext, input: { items: { id: string; value: number }[] }) => {
    // ❌ .map() — not compilable to ASL
    // const ids = input.items.map(item => item.id);

    // ❌ .filter() — not compilable to ASL
    // const big = input.items.filter(item => item.value > 100);

    // ❌ .reduce() — not compilable to ASL
    // const total = input.items.reduce((sum, item) => sum + item.value, 0);

    // ❌ .forEach() — not compilable to ASL
    // input.items.forEach(item => console.log(item));

    // ✅ for...of compiles to a Map state — the ASL way to iterate
    for (const item of input.items) {
      await enrichFn.call({ id: item.id });
    }

    // ✅ .length works — compiles to States.ArrayLength
    const count = input.items.length;

    // ✅ .includes() works — compiles to States.ArrayContains
    // (only on jsonpath values, shown here conceptually)

    return { processedCount: count };
  },
);
` }] },

  'limit-recursive': { description: 'Recursive calls and runtime function references are not supported.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// ASL state machines cannot call themselves. There is no way to
// express recursion in the Step Functions state language.
//
// Workaround: Restructure as a while loop, or use a Lambda
// function for recursive logic.

const fetchFn = Lambda<
  { pageToken: string },
  { items: string[]; nextToken: string }
>('arn:aws:lambda:us-east-1:123456789:function:FetchPage');

// ❌ SS100: Recursive function — would produce infinite ASL states
//
// async function fetchAllPages(token: string): Promise<string[]> {
//   const page = await fetchFn.call({ pageToken: token });
//   if (!page.nextToken) return page.items;
//   const rest = await fetchAllPages(page.nextToken);  // ← recursion
//   return [...page.items, ...rest];
// }

// ✅ Workaround: Use a while loop instead of recursion
export const paginationWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { startToken: string }) => {
    let page = await fetchFn.call({ pageToken: input.startToken });

    while (page.nextToken !== '') {
      page = await fetchFn.call({ pageToken: page.nextToken });
    }

    return { lastPage: page.items };
  },
);
` }] },

  'limit-helper-constraints': { description: 'SS804: Destructured, rest, and default parameters are not supported.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Helper function parameters must be simple identifiers.
// Destructuring, rest params, and default values are not
// supported for inlined helpers — the compiler emits SS804.
//
// Why? The compiler binds each parameter symbol to the caller's
// argument expression. Destructuring creates multiple symbols
// from one argument, which the v1 binder can't handle.

const notifyFn = Lambda<
  { userId: string; message: string },
  { sent: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:Notify');

// ✅ Simple identifier parameters — works
async function sendSimple(userId: string, message: string) {
  await notifyFn.call({ userId, message });
}

// ❌ SS804: Destructured parameter
async function sendDestructured({ userId, message }: { userId: string; message: string }) {
  await notifyFn.call({ userId, message });
}

// ❌ SS804: Default parameter value
async function sendWithDefault(userId: string, message: string = 'Hello') {
  await notifyFn.call({ userId, message });
}

// ❌ SS804: Rest parameter
async function sendToMany(...userIds: string[]) {
  for (const userId of userIds) {
    await notifyFn.call({ userId, message: 'bulk' });
  }
}

export const helperParams = Steps.createFunction(
  async (context: SimpleStepContext, input: { userId: string }) => {
    // ✅ Works
    await sendSimple(input.userId, 'Welcome!');

    // ❌ Each of these triggers SS804
    await sendDestructured({ userId: input.userId, message: 'hi' });
    await sendWithDefault(input.userId);
    await sendToMany(input.userId);

    return { status: 'done' };
  },
);
` }] },

  'limit-variable-capture': { description: 'How const, let, and var are captured — and when warnings or errors appear.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// The compiler's Whole-Program Analyzer classifies module-level variables:
//   const + literal  → compile-time constant (folded into ASL)
//   const + service  → service binding (Lambda, DynamoDB, etc.)
//   let/var + literal (single assignment) → constant, but SS709 warning
//   const + pure expr → folded if all operands are constants
//   const + impure call → ❌ not foldable (e.g. Date.now())
//   let/var reassigned → ❌ Bottom — multiple assignments

// ✅ const with string literal — folded, no warnings
const API_VERSION = 'v2';

// ✅ const with number literal — folded, no warnings
const MAX_RETRIES = 3;

// ✅ const with computed literal — folded (compiler evaluates 60 * 5)
const TIMEOUT_SECONDS = 60 * 5;

// ⚠️ let with literal — works but emits SS709: prefer const
let baseUrl = 'https://api.example.com';

// ⚠️ var with literal — works but emits SS709: prefer const
var defaultRegion = 'us-east-1';

// ❌ const with impure function call — Date.now() is not foldable
const timestamp = Date.now();

const processFn = Lambda<
  { data: string; version: string },
  { result: string }
>('arn:aws:lambda:us-east-1:123456789:function:Process');

export const variableCapture = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    // ✅ Works — API_VERSION is a folded constant
    const result = await processFn.call({
      data: input.data,
      version: API_VERSION,
    });

    // ✅ Works — MAX_RETRIES is a folded constant
    const retries = MAX_RETRIES;

    // ⚠️ Works with SS709 warning — baseUrl resolves but is declared with let
    await processFn.call({ data: baseUrl, version: API_VERSION });

    // ⚠️ Works with SS709 warning — defaultRegion resolves but is declared with var
    await processFn.call({ data: defaultRegion, version: API_VERSION });

    // ❌ SS502: timestamp is not a foldable constant (Date.now() is impure)
    // Uncomment to see the error:
    // await processFn.call({ data: input.data, version: String(timestamp) });

    return { result: result.result, retries };
  },
);
` }] },

  'limit-helper-nesting': { description: 'Helpers cannot call other helpers and must be awaited.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Helper function inlining has a "v1" restriction: each helper
// is inlined independently. A helper CANNOT call another helper
// because the compiler only inlines one level deep.
//
// Additionally, helpers with service calls MUST be awaited —
// a bare call like \`doWork(id)\` without await is an error.

const validateFn = Lambda<
  { id: string },
  { valid: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:Validate');

const enrichFn = Lambda<
  { id: string },
  { data: string }
>('arn:aws:lambda:us-east-1:123456789:function:Enrich');

const notifyFn = Lambda<
  { id: string; message: string },
  { sent: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:Notify');

// ✅ Simple helper — inlines correctly
async function validate(id: string) {
  await validateFn.call({ id });
}

// ✅ Another simple helper — also inlines correctly
async function enrich(id: string) {
  await enrichFn.call({ id });
}

// ❌ SS803: Calls validate() which is another user-defined helper
async function validateAndEnrich(id: string) {
  await validate(id);
  await enrich(id);
}

// ❌ SS805: Helper with service calls must be awaited
// (uncomment the bare call in the workflow below to see the error)

export const helperNesting = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    // ✅ These work — direct calls to simple helpers
    await validate(input.id);
    await enrich(input.id);

    // ❌ SS803: This triggers the nested-helper error
    await validateAndEnrich(input.id);

    // ❌ SS805: Missing await — helper contains service calls
    // validate(input.id);

    await notifyFn.call({ id: input.id, message: 'done' });

    return { status: 'complete' };
  },
);
` }] },

  'limit-workarounds': { description: 'Common patterns and their ASL-compatible workarounds.', services: ['Lambda', 'DynamoDB'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';
import { DynamoDB } from './runtime/services/DynamoDB';

// This example compiles successfully. It shows the recommended
// workarounds for common limitations.

const computeFn = Lambda<
  { a: number; b: number; op: string },
  { result: number }
>('arn:aws:lambda:us-east-1:123456789:function:Compute');

const db = new DynamoDB('ResultsTable');

export const workarounds = Steps.createFunction(
  async (context: SimpleStepContext, input: { x: number; y: number; items: string[] }) => {
    // LIMITATION: No multiply/divide/modulo in ASL
    // WORKAROUND: Delegate complex math to a Lambda function
    const product = await computeFn.call({ a: input.x, b: input.y, op: 'multiply' });

    // LIMITATION: No .map() / .filter()
    // WORKAROUND: Use for...of (compiles to Map state)
    for (const item of input.items) {
      await computeFn.call({ a: input.x, b: 0, op: item });
    }

    // LIMITATION: No ternary expressions at runtime
    // WORKAROUND: Use if/else (compiles to Choice state)
    let status: string;
    if (product.result > 100) {
      status = 'high';
    } else {
      status = 'low';
    }

    // LIMITATION: No string concatenation with + on runtime values
    // WORKAROUND: Use template literals (compile to States.Format)
    const label = \`result-\${status}\`;

    // LIMITATION: No Date.now() or Math.random()
    // WORKAROUND: Use context metadata and Steps intrinsics
    const id = Steps.uuid();
    const startTime = context.execution.startTime;

    // LIMITATION: Compile-time constants only at module scope
    // WORKAROUND: Use const (not let/var) for values the compiler can fold
    const VERSION = 'v2';

    await db.putItem({
      id,
      result: product.result,
      label,
      version: VERSION,
    });

    return { id, result: product.result, label };
  },
);
` }] },
};

const DEFAULT_EXAMPLE = 'sequential';

// ── Create editors ───────────────────────────────────────────────────────

function registerRuntimeTypes() {
  const defaults = monaco.languages.typescript.typescriptDefaults;

  defaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.Classic,
    allowNonTsExtensions: true,
    strict: true,
  });

  // Suppress all Monaco diagnostics — we show our own compiler errors
  defaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true,
  });

  // Register runtime type files for IntelliSense
  const sources = getRuntimeSources();
  for (const [path, content] of Object.entries(sources)) {
    defaults.addExtraLib(content, `file:///node_modules/@simplesteps/${path}`);
  }
}

registerRuntimeTypes();

const editorContainer = document.getElementById('editor-container')!;
const outputContainer = document.getElementById('output-container')!;

const inputEditor = monaco.editor.create(editorContainer, {
  value: '',
  language: 'typescript',
  theme: 'vs-dark',
  minimap: { enabled: false },
  automaticLayout: true,
  fontSize: 13,
  lineNumbers: 'on',
  scrollBeyondLastLine: false,
  tabSize: 2,
});

const outputEditor = monaco.editor.create(outputContainer, {
  value: '// Click "Compile" or enable auto-compile',
  language: 'json',
  theme: 'vs-dark',
  minimap: { enabled: false },
  automaticLayout: true,
  readOnly: true,
  fontSize: 13,
  lineNumbers: 'on',
  scrollBeyondLastLine: false,
  tabSize: 2,
});

// ── File tree state ──────────────────────────────────────────────────────

let currentExampleKey = DEFAULT_EXAMPLE;
let currentFileIndex = 0;
/** Tracks user edits per file within the current example session. */
let fileContents = new Map<string, string>();

function getCurrentFiles(): ExampleFile[] {
  return EXAMPLES[currentExampleKey]?.files ?? [];
}

function loadExample(key: string) {
  if (!EXAMPLES[key]) return;
  currentExampleKey = key;
  currentFileIndex = 0;

  const files = getCurrentFiles();
  fileContents = new Map(files.map((f) => [f.name, f.content]));

  renderFileTree();
  switchToFile(0, true);  // skipSave=true: don't save empty editor content

  // Update button label to show current example name
  const label = document.getElementById('currentExample');
  if (label) label.textContent = formatExampleName(key);

  // For multi-file examples, auto-expand the file tree
  if (files.length > 1) {
    fileTree.classList.remove('collapsed');
    fileTreeToggle.textContent = '\u25C0';
  } else {
    fileTree.classList.add('collapsed');
    fileTreeToggle.textContent = '\u25B6';
  }
}

function renderFileTree() {
  const files = getCurrentFiles();
  fileList.innerHTML = '';
  files.forEach((file, i) => {
    const li = document.createElement('li');
    li.textContent = file.name;
    li.classList.toggle('active', i === currentFileIndex);
    li.addEventListener('click', () => switchToFile(i));
    fileList.appendChild(li);
  });
}

function switchToFile(index: number, skipSave = false) {
  const files = getCurrentFiles();
  // Save current editor content before switching (skip on initial load)
  if (!skipSave && files.length > 0) {
    const currentName = files[currentFileIndex]?.name;
    if (currentName) {
      fileContents.set(currentName, inputEditor.getValue());
    }
  }
  currentFileIndex = index;
  const file = files[index];
  if (file) {
    inputEditor.setValue(fileContents.get(file.name) ?? file.content);
  }
  renderFileTree();
}

// ── Compile & display ────────────────────────────────────────────────────

function runCompile() {
  // Save current editor content
  const files = getCurrentFiles();
  if (files.length > 0) {
    const currentName = files[currentFileIndex]?.name;
    if (currentName) {
      fileContents.set(currentName, inputEditor.getValue());
    }
  }

  // Build user files map
  const userFiles: Record<string, string> = {};
  for (const [name, content] of fileContents) {
    userFiles[name] = content;
  }

  // Fallback: if no files tracked, use editor content directly
  if (Object.keys(userFiles).length === 0) {
    userFiles['user.ts'] = inputEditor.getValue();
  }

  try {
    const result = compileFromFiles(userFiles);

    // Update output panel
    outputEditor.setValue(result.json);

    // Map diagnostics to Monaco markers on the input editor
    const model = inputEditor.getModel();
    if (model) {
      const markers: monaco.editor.IMarkerData[] = result.errors.map((err) => {
        const line = Math.max(1, err.line);
        const col = Math.max(1, err.column);
        return {
          severity:
            err.severity === 'error'
              ? monaco.MarkerSeverity.Error
              : monaco.MarkerSeverity.Warning,
          message: `[${err.code}] ${err.message}`,
          startLineNumber: line,
          startColumn: col,
          endLineNumber: line,
          endColumn: col + 1,
        };
      });
      monaco.editor.setModelMarkers(model, 'simplesteps', markers);
    }

    // Update console panel
    updateConsole(result.errors, result.stateMachineCount);
  } catch (err: any) {
    updateConsoleError(err.message);
    outputEditor.setValue(`// Internal compiler error\n// ${err.message}`);
  }
}

function updateConsole(
  errors: readonly { code: string; message: string; line: number; severity: string }[],
  stateMachineCount: number,
) {
  // Status bar text
  if (errors.length > 0) {
    const errCount = errors.filter((e) => e.severity === 'error').length;
    const warnCount = errors.filter((e) => e.severity === 'warning').length;
    const parts: string[] = [];
    if (errCount > 0) parts.push(`${errCount} error${errCount === 1 ? '' : 's'}`);
    if (warnCount > 0) parts.push(`${warnCount} warning${warnCount === 1 ? '' : 's'}`);
    consoleStatusText.textContent = parts.join(', ');
    consolePanel.className = 'has-errors';
  } else {
    const plural = stateMachineCount === 1 ? '' : 's';
    consoleStatusText.textContent = `Compiled ${stateMachineCount} state machine${plural} successfully.`;
    consolePanel.className = 'success';
  }
  // Preserve expanded state
  if (isConsoleExpanded) {
    consolePanel.classList.add('expanded');
  }

  // Detail output
  consoleOutput.innerHTML = '';
  if (errors.length > 0) {
    for (const e of errors) {
      const div = document.createElement('div');
      div.className = `diag-line diag-${e.severity === 'error' ? 'error' : 'warning'}`;
      div.textContent = `[${e.code}] line ${e.line}: ${e.message}`;
      consoleOutput.appendChild(div);
    }
  } else {
    const div = document.createElement('div');
    div.className = 'diag-line diag-success';
    const plural = stateMachineCount === 1 ? '' : 's';
    div.textContent = `Compiled ${stateMachineCount} state machine${plural} successfully.`;
    consoleOutput.appendChild(div);
  }
}

function updateConsoleError(message: string) {
  consoleStatusText.textContent = `Internal error: ${message}`;
  consolePanel.className = 'has-errors';
  if (isConsoleExpanded) {
    consolePanel.classList.add('expanded');
  }

  consoleOutput.innerHTML = '';
  const div = document.createElement('div');
  div.className = 'diag-line diag-error';
  div.textContent = `Internal error: ${message}`;
  consoleOutput.appendChild(div);
}

// ── Wire UI ──────────────────────────────────────────────────────────────

declare const __REPO_URL__: string;

const compileBtn = document.getElementById('compile-btn')!;
const autoCheck = document.getElementById('auto-compile') as HTMLInputElement;
const examplesBtn = document.getElementById('examples-btn')!;
const examplesModal = document.getElementById('examples-modal') as HTMLDialogElement;
const examplesSearch = document.getElementById('examples-search') as HTMLInputElement;
const examplesList = document.getElementById('examples-list')!;
const modalCloseBtn = document.getElementById('modal-close-btn')!;
const githubLink = document.getElementById('github-link') as HTMLAnchorElement;

// File tree elements
const fileTree = document.getElementById('file-tree')!;
const fileTreeToggle = document.getElementById('file-tree-toggle')! as HTMLButtonElement;
const collapseTreeBtn = document.getElementById('collapse-tree-btn')!;
const fileList = document.getElementById('file-list')!;

// Console panel elements
const consolePanel = document.getElementById('console-panel')!;
const consoleStatusBar = document.getElementById('console-status-bar')!;
const consoleStatusText = document.getElementById('console-status-text')!;
const consoleToggle = document.getElementById('console-toggle')!;
const consoleOutput = document.getElementById('console-output')!;

let isConsoleExpanded = false;

if (__REPO_URL__) {
  githubLink.href = __REPO_URL__;
} else {
  githubLink.style.display = 'none';
}

compileBtn.addEventListener('click', runCompile);

// File tree toggle
fileTreeToggle.addEventListener('click', () => {
  fileTree.classList.toggle('collapsed');
  fileTreeToggle.textContent = fileTree.classList.contains('collapsed') ? '\u25B6' : '\u25C0';
});

collapseTreeBtn.addEventListener('click', () => {
  fileTree.classList.add('collapsed');
  fileTreeToggle.textContent = '\u25B6';
});

// Console panel toggle
function toggleConsole() {
  isConsoleExpanded = !isConsoleExpanded;
  consolePanel.classList.toggle('expanded', isConsoleExpanded);
  consoleToggle.textContent = isConsoleExpanded ? '\u25BC' : '\u25B2';
}

consoleToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleConsole();
});

consoleStatusBar.addEventListener('click', toggleConsole);

// Debounced auto-compile
let timer: ReturnType<typeof setTimeout> | null = null;
inputEditor.onDidChangeModelContent(() => {
  if (!autoCheck.checked) return;
  if (timer) clearTimeout(timer);
  timer = setTimeout(runCompile, 500);
});

// ── Examples modal ─────────────────────────────────────────────────────

function formatExampleName(key: string): string {
  return key
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function renderModal(filter: string) {
  const lowerFilter = filter.toLowerCase();
  examplesList.innerHTML = '';

  for (const category of EXAMPLE_CATEGORIES) {
    const section = document.createElement('div');
    section.className = 'example-category';

    const label = document.createElement('div');
    label.className = 'example-category-label';
    const icon = CATEGORY_ICONS[category.label] ?? '';
    label.textContent = icon ? `${icon}  ${category.label}` : category.label;
    section.appendChild(label);

    const grid = document.createElement('div');
    grid.className = 'example-grid';

    let visibleCount = 0;
    for (const key of category.keys) {
      const example = EXAMPLES[key];
      if (!example) continue;

      const name = formatExampleName(key);
      const desc = example.description ?? '';
      const services = example.services ?? [];
      const searchText = `${name} ${desc} ${services.join(' ')} ${category.label}`.toLowerCase();

      if (lowerFilter && !searchText.includes(lowerFilter)) continue;
      visibleCount++;

      const card = document.createElement('button');
      card.className = 'example-card';
      if (key === currentExampleKey) card.classList.add('active');

      const title = document.createElement('div');
      title.className = 'example-card-title';
      title.textContent = name;
      card.appendChild(title);

      if (desc) {
        const descEl = document.createElement('div');
        descEl.className = 'example-card-desc';
        descEl.textContent = desc;
        card.appendChild(descEl);
      }

      if (services.length > 0) {
        const pills = document.createElement('div');
        pills.className = 'example-card-services';
        for (const svc of services) {
          const pill = document.createElement('span');
          pill.className = 'service-pill';
          pill.textContent = svc;
          pills.appendChild(pill);
        }
        card.appendChild(pills);
      }

      card.addEventListener('click', () => {
        loadExample(key);
        examplesModal.close();
        examplesSearch.value = '';
        if (autoCheck.checked) {
          runCompile();
        }
      });

      grid.appendChild(card);
    }

    section.appendChild(grid);

    if (visibleCount > 0) {
      examplesList.appendChild(section);
    }
  }
}

examplesBtn.addEventListener('click', () => {
  renderModal('');
  examplesModal.showModal();
  examplesSearch.focus();
});

modalCloseBtn.addEventListener('click', () => {
  examplesModal.close();
  examplesSearch.value = '';
});

examplesModal.addEventListener('click', (e) => {
  // Close on backdrop click
  if (e.target === examplesModal) {
    examplesModal.close();
    examplesSearch.value = '';
  }
});

let searchTimer: ReturnType<typeof setTimeout> | null = null;
examplesSearch.addEventListener('input', () => {
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => renderModal(examplesSearch.value), 150);
});

// Initial load
loadExample(DEFAULT_EXAMPLE);
runCompile();
