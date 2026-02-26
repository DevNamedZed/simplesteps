// main.ts — Playground entry point.
//
// Sets up two Monaco editors (TypeScript → ASL JSON), wires the compile
// button, debounced auto-compile, example selector, file tree, console
// panel, and error display.

import * as monaco from 'monaco-editor';
import { compileFromFiles } from './compiler-bridge';
import { getRuntimeSources } from './virtual-fs';
import { initExecutionPanel, updateAsl } from './execution';

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
  'Substeps': '\u{1F9E9}',
  'CDK Patterns': '\u{1F4E6}',
  'Multi-Service Patterns': '\u{26A1}',
  'JSONata Features': '\u{2728}',
  'Testing': '\u{1F9EA}',
  'Limitations': '\u{1F6A7}',
};

const EXAMPLE_CATEGORIES: ExampleCategory[] = [
  {
    label: 'Control Flow',
    keys: [
      'sequential', 'if-else', 'early-return', 'while-loop', 'do-while-loop', 'for-each',
      'try-catch', 'typed-error-handling', 'switch-case', 'nested-conditions', 'and-or-conditions',
      'dynamic-wait', 'wait-and-continue', 'parallel', 'steps-map-closure', 'steps-sequential',
      'deferred-await', 'retry-timeout',
    ],
  },
  {
    label: 'Services',
    keys: [
      'multi-service', 'sqs-queue', 'eventbridge', 'dynamodb-crud', 'dynamodb-query-scan',
      's3-operations', 'secrets-manager', 'ssm-params', 'nested-step-function',
      'lambda-patterns', 'aws-sdk-escape-hatch', 'ecs-task', 'bedrock-model',
      'batch-job', 'glue-etl', 'codebuild-project', 'athena-query',
    ],
  },
  {
    label: 'JS Features',
    keys: [
      'query-language', 'intrinsics', 'js-operators', 'string-interpolation', 'constants',
      'js-patterns', 'spread-merge', 'context-object', 'multi-step-function',
    ],
  },
  {
    label: 'JSONata Features',
    keys: [
      'jsonata-string-methods', 'jsonata-math-methods', 'jsonata-array-methods',
      'jsonata-lambda-expressions', 'jsonata-data-transform',
    ],
  },
  {
    label: 'Inline & Data Flow',
    keys: [
      'inline-config', 'inline-pure-functions', 'inline-enums',
      'inline-constant-chain', 'inline-safe-var',
    ],
  },
  {
    label: 'Substeps',
    keys: [
      'substep-basic', 'substep-trycatch', 'substep-nested', 'substep-value', 'substep-destructured',
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
    label: 'Testing',
    keys: [
      'test-compile-validate', 'test-mock-services', 'test-trace-inspection',
    ],
  },
  {
    label: 'Limitations',
    keys: [
      'limit-arithmetic', 'limit-dynamic-expressions', 'limit-array-methods',
      'limit-recursive', 'limit-substep-constraints', 'limit-variable-capture',
      'limit-substep-await',
      'limit-switch-fallthrough', 'limit-promise-all', 'limit-spread',
      'limit-conditions',
      'limit-map-isolation', 'limit-module-scope', 'limit-variable-shadowing',
      'limit-substep-edge-cases', 'limit-runtime-expressions',
      'limit-workarounds',
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

  'do-while-loop': { description: 'Do-while loop — body executes at least once before condition check.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Do-While Loop
// Unlike while, the body executes at least once before checking
// the condition. Useful for polling patterns where you need to
// act first, then decide whether to continue.

const pollFn = Lambda<{ jobId: string }, { status: string; retryable: boolean }>(
  'arn:aws:lambda:us-east-1:123:function:Poll',
);
const processFn = Lambda<{ jobId: string }, { result: string }>(
  'arn:aws:lambda:us-east-1:123:function:Process',
);

export const doWhileLoop = Steps.createFunction(
  async (context: SimpleStepContext, input: { jobId: string }) => {
    let poll;
    do {
      poll = await pollFn.call({ jobId: input.jobId });
    } while (poll.status !== 'ready');

    const result = await processFn.call({ jobId: input.jobId });
    return { result: result.result };
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

  'typed-error-handling': { description: 'Custom StepException subclasses with instanceof chains for typed error handling.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext, StepException } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Typed Error Handling
// Define custom error classes extending StepException.
// The compiler maps instanceof checks to Catch rules with
// ErrorEquals matching the class name.

class OrderNotFound extends StepException {}
class PaymentFailed extends StepException {}

const processFn = Lambda<{ orderId: string }, { total: number }>(
  'arn:aws:lambda:us-east-1:123:function:ProcessOrder',
);
const refundFn = Lambda<{ orderId: string }, void>(
  'arn:aws:lambda:us-east-1:123:function:Refund',
);
const notifyFn = Lambda<{ message: string }, void>(
  'arn:aws:lambda:us-east-1:123:function:Notify',
);

export const typedErrors = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    try {
      const result = await processFn.call({ orderId: input.orderId });
      return { status: 'success', total: result.total };
    } catch (e) {
      if (e instanceof OrderNotFound) {
        await notifyFn.call({ message: 'Order not found' });
        return { status: 'not_found' };
      }
      if (e instanceof PaymentFailed) {
        await refundFn.call({ orderId: input.orderId });
        return { status: 'payment_failed' };
      }
      return { status: 'unknown_error' };
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

  parallel: { description: 'Promise.all → Parallel state. For variable-length arrays, use Steps.map() or for...of.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
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

  'steps-map-closure': { description: 'Steps.map() captures results with closures and concurrency control. Steps.items() wraps arrays for for...of options.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Steps.map() — Functional Map API
//
// Three advantages over plain for...of:
//   1. Result capture — collect iteration results into a variable
//   2. Closures — access outer await results inside the callback
//   3. MaxConcurrency — limit parallel execution
//
// Steps.items() — For...of with options
//   Wrap arrays for for...of with maxConcurrency support.

const getConfig = Lambda<{ env: string }, { prefix: string }>(
  'arn:aws:lambda:us-east-1:123:function:GetConfig',
);
const processItem = Lambda<{ item: string; prefix: string }, { processed: boolean }>(
  'arn:aws:lambda:us-east-1:123:function:ProcessItem',
);

export const stepsMapClosure = Steps.createFunction(
  async (context: SimpleStepContext, input: { items: string[]; env: string }) => {
    // Fetch config (outer scope)
    const config = await getConfig.call({ env: input.env });

    // Steps.map: closure over config.prefix, capture results, limit concurrency
    const results = await Steps.map(input.items, async (item) => {
      return await processItem.call({ item, prefix: config.prefix });
    }, { maxConcurrency: 5 });

    // Steps.items: for...of with maxConcurrency
    for (const item of Steps.items(input.items, { maxConcurrency: 3 })) {
      await processItem.call({ item, prefix: config.prefix });
    }

    return { results };
  },
);
` }] },

  'steps-sequential': { description: 'Steps.sequential() — iterate items one at a time (MaxConcurrency: 1).', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Sequential Iteration
//
// Steps.sequential(arr) wraps an array for use with for...of,
// compiling to a Map state with MaxConcurrency: 1.
// Items are processed strictly one at a time.

const processFn = Lambda<{ item: string }, { ok: boolean }>(
  'arn:aws:lambda:us-east-1:123:function:ProcessItem',
);

export const stepsSequential = Steps.createFunction(
  async (context: SimpleStepContext, input: { items: string[] }) => {
    // MaxConcurrency: 1 — items processed one at a time
    for (const item of Steps.sequential(input.items)) {
      await processFn.call({ item });
    }

    return { done: true };
  },
);
` }] },

  'deferred-await': { description: 'Fire-then-await pattern — compiler batches deferred awaits into a single Parallel state.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Deferred Await — Natural Parallelism
//
// Start multiple service calls without awaiting, then collect
// results later. The compiler detects this pattern and batches
// the awaits into a single Parallel state.

const getOrder = Lambda<{ orderId: string }, { status: string; total: number }>(
  'arn:aws:lambda:us-east-1:123:function:GetOrder',
);
const getPayment = Lambda<{ orderId: string }, { paid: boolean; method: string }>(
  'arn:aws:lambda:us-east-1:123:function:GetPayment',
);

export const deferredAwait = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string }) => {
    // Start both calls — not awaited yet (no state emitted)
    const orderPromise = getOrder.call({ orderId: input.orderId });
    const paymentPromise = getPayment.call({ orderId: input.orderId });

    // Await both — compiler batches into a single Parallel state
    const order = await orderPromise;
    const payment = await paymentPromise;

    return { order, payment };
  },
);
` }] },

  'retry-timeout': { description: 'Retry policies, timeouts, heartbeat, and typed error matching on service calls.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext, TimeoutError } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Retry, Timeout, and Heartbeat
//
// Service calls accept options for retry policies, execution timeouts,
// and heartbeat intervals. These compile directly to ASL Task fields.
// Catch blocks with instanceof check compile to typed Catch rules.

const longTask = Lambda<{ jobId: string }, { status: string }>(
  'arn:aws:lambda:us-east-1:123:function:LongRunningTask',
);
const alertService = Lambda<{ message: string }, void>(
  'arn:aws:lambda:us-east-1:123:function:AlertService',
);

export const retryTimeout = Steps.createFunction(
  async (context: SimpleStepContext, input: { jobId: string }) => {
    try {
      const result = await longTask.call({ jobId: input.jobId }, {
        timeoutSeconds: 300,
        heartbeatSeconds: 60,
        retry: {
          errorEquals: ['States.TaskFailed', 'States.Timeout'],
          intervalSeconds: 5,
          maxAttempts: 3,
          backoffRate: 2,
        },
      });
      return { status: result.status };
    } catch (e) {
      if (e instanceof TimeoutError) {
        await alertService.call({ message: 'Task timed out' });
        return { status: 'timeout' };
      }
      await alertService.call({ message: 'Task failed' });
      return { status: 'error' };
    }
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

  'dynamodb-query-scan': { description: 'DynamoDB query, scan, and updateItem operations.', services: ['DynamoDB'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { DynamoDB } from './runtime/services/DynamoDB';

// DynamoDB Query, Scan, and Update
//
// Beyond basic CRUD (get/put/delete), DynamoDB supports
// query (by key condition), scan (full table), and updateItem.

const ordersDb = new DynamoDB('OrdersTable');

export const dynamoDbQueryScan = Steps.createFunction(
  async (context: SimpleStepContext, input: { userId: string; minAmount: number }) => {
    // Query — retrieve items by partition key
    const orders = await ordersDb.query<{ Items: any[] }>({
      KeyConditionExpression: 'userId = :uid',
      ExpressionAttributeValues: { ':uid': input.userId },
    });

    // Scan — full table scan with filter
    const highValue = await ordersDb.scan<{ Items: any[] }>({
      FilterExpression: 'amount > :min',
      ExpressionAttributeValues: { ':min': input.minAmount },
    });

    // UpdateItem — update specific attributes
    await ordersDb.updateItem({
      Key: { userId: input.userId },
      UpdateExpression: 'SET lastQueried = :now',
      ExpressionAttributeValues: { ':now': 'today' },
    });

    return { orders, highValue };
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

  'query-language': { description: 'JSONata (default) vs JSONPath backend — how to choose and what changes.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Query Language Backend
//
// The compiler supports two backends:
//   JSONata (default) — richer expression support, native operators
//   JSONPath          — classic mode, States.* intrinsics only
//
// Pick the backend via:
//   CLI:  simplesteps compile --query-language jsonpath
//   API:  compile({ queryLanguage: 'JSONPath' })
//   CDK:  new SimpleStepsStateMachine(this, 'SM', { queryLanguage: 'JSONPath' })
//
// This playground compiles in JSONata mode (the default).
// To try JSONPath mode, use the CLI or API with --query-language jsonpath.
//
// The SAME TypeScript compiles to different ASL per backend:
//
//   input.price + input.tax
//     JSONata  →  {% $states.input.price + $states.input.tax %}
//     JSONPath →  States.MathAdd($.price, $.tax)
//
//   \`Hello \${input.name}\`
//     JSONata  →  {% 'Hello ' & $states.input.name %}
//     JSONPath →  States.Format('Hello {}', $.name)
//
//   JSON.parse(str)
//     JSONata  →  {% $eval(...) %}
//     JSONPath →  States.StringToJson(...)
//
// JSONata unlocks patterns impossible in JSONPath:
//   str.toUpperCase()    →  $uppercase(str)
//   Math.floor(x)        →  $floor(x)
//   arr.map(x => x.id)   →  $map(arr, function($x) { $x.id })
//   a * b, a / b, a % b  →  native operators

const processFn = Lambda<{ item: string; total: number }, { result: string }>(
  'arn:aws:lambda:us-east-1:123:function:Process',
);

export const queryLanguageExample = Steps.createFunction(
  async (context: SimpleStepContext, input: { name: string; items: string[]; price: number; tax: number }) => {
    // Works in both modes (+ compiles differently per backend)
    const total = input.price + input.tax;
    const greeting = \`Hello \${input.name}, total: \${total}\`;
    const count = input.items.length;

    // JSONata-only patterns (SS540 error in JSONPath mode):
    const upperName = input.name.toUpperCase();
    const product = input.price * input.tax;
    const ids = input.items.map(item => item);

    // Service calls work identically in both modes
    for (const item of input.items) {
      await processFn.call({ item, total });
    }

    return { greeting, count, upperName, product, ids };
  },
);
` }] },

  intrinsics: { description: 'Steps.* explicit intrinsics (States.* mappings) — work in both backends. Prefer natural JS when available.', services: [], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';

// Steps.* Intrinsics — Explicit ASL Functions
//
// These compile to States.* intrinsic functions in BOTH backends.
// In JSONata mode, prefer natural JS when available:
//   Steps.add(a, b) → just use a + b
//   Steps.jsonParse(s) → just use JSON.parse(s)
// Use Steps.* when no JS equivalent exists (uuid, hash, arrayPartition, etc.).
//
//   Steps.format(tmpl, ...args) → States.Format
//   Steps.add(a, b)             → States.MathAdd
//   Steps.random(lo, hi)        → States.MathRandom
//   Steps.uuid()                → States.UUID
//   Steps.hash(data, algo)      → States.Hash
//   Steps.base64Encode(data)    → States.Base64Encode
//   Steps.base64Decode(data)    → States.Base64Decode
//   Steps.jsonParse(str)        → States.StringToJson
//   Steps.jsonStringify(obj)    → States.JsonToString
//   Steps.array(...items)       → States.Array
//   Steps.arrayPartition(a, n)  → States.ArrayPartition
//   Steps.arrayContains(a, v)   → States.ArrayContains
//   Steps.arrayRange(s, e, st)  → States.ArrayRange
//   Steps.arrayGetItem(a, i)    → States.ArrayGetItem
//   Steps.arrayLength(a)        → States.ArrayLength
//   Steps.arrayUnique(a)        → States.ArrayUnique
//   Steps.arraySlice(a, s, e)   → States.ArraySlice

export const intrinsics = Steps.createFunction(
  async (context: SimpleStepContext, input: {
    orderId: string; price: number; tax: number;
    metadata: string; items: string[]; data: string;
  }) => {
    // ── String & formatting ──
    const total = Steps.add(input.price, input.tax);
    const message = Steps.format('Order {} total: {}', input.orderId, total);
    const trackingId = Steps.uuid();
    const rand = Steps.random(1, 100);

    // ── Encoding ──
    const encoded = Steps.base64Encode(input.data);
    const decoded = Steps.base64Decode(encoded);
    const hashed = Steps.hash(input.data, 'SHA-256');

    // ── JSON ──
    const parsed = Steps.jsonParse(input.metadata);
    const serialized = Steps.jsonStringify(parsed);

    // ── Arrays ──
    const arr = Steps.array(input.orderId, total, trackingId);
    const chunks = Steps.arrayPartition(input.items, 3);
    const hasItem = Steps.arrayContains(input.items, 'special');
    const range = Steps.arrayRange(0, 10, 2);
    const first = Steps.arrayGetItem(input.items, 0);
    const len = Steps.arrayLength(input.items);
    const unique = Steps.arrayUnique(input.items);
    const slice = Steps.arraySlice(input.items, 0, 3);

    return {
      message, trackingId, total, rand,
      encoded, decoded, hashed,
      parsed, serialized,
      arr, chunks, hasItem, range, first, len, unique, slice,
    };
  },
);
` }] },

  'js-operators': { description: 'Natural JS operators compile to JSONata expressions (or States.* in JSONPath mode).', services: [], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';

// Natural JS Operators → JSONata Expressions
//
// Write natural JavaScript — the compiler maps to JSONata (default)
// or States.* intrinsics (JSONPath mode). See "Query Language" example
// for how to switch backends.
//
//   Pattern            JSONata (default)       JSONPath
//   ─────────────────  ─────────────────────── ───────────────────
//   a + b              a + b (native)          States.MathAdd
//   a * b              a * b (native)          ❌ SS530
//   a / b              a / b (native)          ❌ SS531
//   \`\${a} text\`     'text' & a (& concat)   States.Format
//   JSON.parse(s)      $eval(s)                States.StringToJson
//   JSON.stringify(o)  $string(o)              States.JsonToString
//   str.split(',')     $split(str, ',')        States.StringSplit

export const jsOperators = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; price: number; tax: number; metadata: string }) => {
    // Arithmetic — JSONata native operators
    const total = input.price + input.tax;
    const doubled = input.price * 2;
    const half = input.price / 2;

    // Template literals — JSONata & concatenation
    const message = \`Order \${input.orderId} confirmed, total: \${total}\`;

    // UUID — States.UUID in both modes
    const trackingId = Steps.uuid();

    // JSON — JSONata $eval() / $string()
    const meta = JSON.parse(input.metadata);
    const serialized = JSON.stringify(meta);

    return { total, doubled, half, message, trackingId, meta, serialized };
  },
);
` }] },

  'string-interpolation': { description: 'Template literals → JSONata & concatenation (or States.Format in JSONPath).', services: [], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';

// String Interpolation with Template Literals
//
// JSONata (default): compiles to & concatenation
//   \`Hello \${name}\` → 'Hello ' & $name
//
// JSONPath: compiles to States.Format intrinsic
//   \`Hello \${name}\` → States.Format('Hello {}', $.name)

export const stringInterpolation = Steps.createFunction(
  async (context: SimpleStepContext, input: { name: string; orderId: string; price: number; tax: number }) => {
    const total = input.price + input.tax;

    // Simple interpolation → 'Hello, ' & $name & '!'
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

  'js-patterns': { description: 'Complete reference of every JS pattern — JSONata mappings (default backend).', services: [], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';

// Complete JS Pattern Reference — JSONata Mode (Default)
//
// Every JS pattern the compiler maps to ASL. Patterns marked
// "both" work in JSONata and JSONPath; others are JSONata-only.

export const jsPatterns = Steps.createFunction(
  async (context: SimpleStepContext, input: {
    items: { id: string; value: number }[];
    tags: string[]; csv: string; data: string;
    price: number; tax: number; name: string; text: string;
  }) => {
    // ── Arithmetic ──────────────────────────────────────────
    const sum = input.price + input.tax;          // both  (JSONata: native +, JSONPath: States.MathAdd)
    const product = input.price * input.tax;      // JSONata only → native *
    const quotient = input.price / 2;             // JSONata only → native /
    const remainder = input.price % 10;           // JSONata only → native %

    // ── String methods ──────────────────────────────────────
    const greeting = \`Hello \${input.name}\`;       // both  (JSONata: & concat, JSONPath: States.Format)
    const parts = input.csv.split(',');           // both  (JSONata: $split, JSONPath: States.StringSplit)
    const upper = input.name.toUpperCase();       // JSONata only → $uppercase
    const lower = input.name.toLowerCase();       // JSONata only → $lowercase
    const trimmed = input.text.trim();            // JSONata only → $trim
    const sub = input.name.substring(0, 3);       // JSONata only → $substring
    const initial = input.name.charAt(0);         // JSONata only → $substring(s, i, 1)
    const replaced = input.text.replace(' ', '-');// JSONata only → $replace
    const nameLen = input.name.length;            // JSONata only → $length (string)

    // ── Math ────────────────────────────────────────────────
    const floored = Math.floor(input.price);      // JSONata only → $floor
    const ceiled = Math.ceil(input.price);        // JSONata only → $ceil
    const rounded = Math.round(input.price);      // JSONata only → $round
    const absolute = Math.abs(input.tax);         // JSONata only → $abs
    const root = Math.sqrt(input.price);          // JSONata only → $sqrt

    // ── Type conversion ─────────────────────────────────────
    const num = Number(input.name);               // JSONata only → $number
    const str = String(input.price);              // JSONata only → $string
    const bool = Boolean(input.price);            // JSONata only → $boolean
    const priceType = typeof input.price;         // JSONata only → $type

    // ── JSON ────────────────────────────────────────────────
    const parsed = JSON.parse(input.data);        // both  (JSONata: $eval, JSONPath: States.StringToJson)
    const serialized = JSON.stringify(parsed);    // both  (JSONata: $string, JSONPath: States.JsonToString)

    // ── Arrays ──────────────────────────────────────────────
    const hasSpecial = input.tags.includes('x');  // both  (JSONata: in, JSONPath: States.ArrayContains)
    const count = input.items.length;             // both  (JSONata: $count, JSONPath: States.ArrayLength)
    const joined = input.tags.join(', ');         // JSONata only → $join
    const reversed = input.tags.reverse();        // JSONata only → $reverse
    const sorted = input.tags.sort();             // JSONata only → $sort
    const merged = input.tags.concat(input.tags); // JSONata only → $append

    // ── Higher-order functions (JSONata only, pure callbacks) ─
    const ids = input.items.map(i => i.id);                       // → $map
    const big = input.items.filter(i => i.value > 100);           // → $filter
    const total = input.items.reduce((s, i) => s + i.value, 0);  // → $reduce
    const found = input.items.find(i => i.id === 'x');            // → $filter(...)[0]
    const hasAny = input.items.some(i => i.value > 0);            // → $count($filter) > 0
    const allPos = input.items.every(i => i.value > 0);           // → $count($filter) = $count

    // ── UUID — both modes ───────────────────────────────────
    const id = Steps.uuid();

    return {
      sum, product, quotient, remainder,
      greeting, parts, upper, lower, trimmed, sub, initial, replaced, nameLen,
      floored, ceiled, rounded, absolute, root,
      num, str, bool, priceType,
      parsed, serialized,
      hasSpecial, count, joined, reversed, sorted, merged,
      ids, big, total, found, hasAny, allPos, id,
    };
  },
);
` }] },

  'spread-merge': { description: 'Object spread → $merge (JSONata) / States.JsonMerge (JSONPath). Steps.merge() for deep merge.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Object Spread / Merge
//
// { ...a, ...b } compiles to:
//   JSONata (default) → $merge([a, b])
//   JSONPath          → States.JsonMerge(a, b, false)
//
// Steps.merge(a, b, deep?) provides explicit merge control:
//   deep=false (default): shallow merge, later keys win
//   deep=true: recursively merge nested objects
//
// Note: spread in service call parameters is NOT supported (SS500).
// Use { ...a, ...b } in variable assignments only.

const getDefaults = Lambda<{ type: string }, { color: string; size: string; priority: number }>(
  'arn:aws:lambda:us-east-1:123:function:GetDefaults',
);
const getOverrides = Lambda<{ userId: string }, { color: string; label: string }>(
  'arn:aws:lambda:us-east-1:123:function:GetOverrides',
);

export const spreadMerge = Steps.createFunction(
  async (context: SimpleStepContext, input: { type: string; userId: string }) => {
    const defaults = await getDefaults.call({ type: input.type });
    const overrides = await getOverrides.call({ userId: input.userId });

    // Spread → $merge: overrides win on conflict (shallow)
    const combined = { ...defaults, ...overrides };

    // Steps.merge(a, b, true) — deep merge: recursively merges nested objects
    const deepMerged = Steps.merge(defaults, overrides, true);

    return { combined, deepMerged };
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

  'inline-pure-functions': { description: 'Pure functions inlined at compile time as expressions.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Pure Functions — Expression Inlining
// Functions with a single return statement, no service calls, and no
// side effects are evaluated at compile time. The result is substituted
// directly into the ASL as a literal value.

function makeArn(name: string) {
  return \`arn:aws:lambda:us-east-1:123456789:function:\${name}\`;
}

const formatKey = (prefix: string, id: string) => \`\${prefix}-\${id}\`;

const processFn = Lambda<{ orderId: string }, { status: string }>(makeArn('ProcessOrder'));
const validateFn = Lambda<{ orderId: string }, { valid: boolean }>(makeArn('ValidateOrder'));
const notifyFn = Lambda<{ orderId: string; status: string }, { sent: boolean }>(makeArn('NotifyCustomer'));

export const pureInlining = Steps.createFunction(
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
` }] },

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

  // ── Substeps ────────────────────────────────────────────────────────────

  'substep-basic': { description: 'Extract reusable workflow logic into substeps (async functions inlined at compile time).', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Substeps — Reusable Workflow Logic
// Module-scope async functions are inlined at compile time.
// The compiler splices the substep's body into the caller's
// state machine — no nested executions, no runtime cost.

const validateFn = Lambda<
  { id: string },
  { valid: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:Validate');

const processFn = Lambda<
  { id: string },
  { result: string }
>('arn:aws:lambda:us-east-1:123456789:function:Process');

const notifyFn = Lambda<
  { message: string },
  void
>('arn:aws:lambda:us-east-1:123456789:function:Notify');

// Define a substep — a reusable chunk of workflow logic
async function processAndNotify(id: string) {
  const result = await processFn.call({ id });
  await notifyFn.call({ message: result.result });
}

export const basicSubstep = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const check = await validateFn.call({ id: input.id });

    // Call the substep — its body is spliced in here
    await processAndNotify(input.id);

    return { done: true };
  },
);
` }] },

  'substep-trycatch': { description: 'Substep with try/catch for saga-style rollback on failure.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext, StepException } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Substep with Try/Catch — Saga Rollback
// Each substep handles its own error recovery.
// The compiler generates Catch rules on the enclosed Task states.

const provisionFn = Lambda<
  { id: string },
  { instanceId: string }
>('arn:aws:lambda:us-east-1:123456789:function:Provision');

const configureFn = Lambda<
  { instanceId: string },
  { configured: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:Configure');

const rollbackFn = Lambda<
  { instanceId: string },
  void
>('arn:aws:lambda:us-east-1:123456789:function:Rollback');

// Substep with rollback on failure
async function provisionWithRollback(id: string) {
  const instance = await provisionFn.call({ id });
  try {
    await configureFn.call({ instanceId: instance.instanceId });
  } catch (e) {
    await rollbackFn.call({ instanceId: instance.instanceId });
    throw new StepException('Configuration failed, rolled back');
  }
  return instance;
}

export const sagaWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const instance = await provisionWithRollback(input.id);
    return { instanceId: instance.instanceId, status: 'ready' };
  },
);
` }] },

  'substep-nested': { description: 'Substeps calling other substeps — inlined transitively into a flat state machine.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Nested Substeps — Transitive Inlining
// Substeps can call other substeps. The compiler inlines
// them bottom-up, producing a flat state machine.
// No nesting limit — as deep as you need.

const fetchFn = Lambda<
  { id: string },
  { data: string }
>('arn:aws:lambda:us-east-1:123456789:function:Fetch');

const validateFn = Lambda<
  { data: string },
  { valid: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:Validate');

const enrichFn = Lambda<
  { data: string },
  { enriched: string }
>('arn:aws:lambda:us-east-1:123456789:function:Enrich');

const storeFn = Lambda<
  { enriched: string },
  void
>('arn:aws:lambda:us-east-1:123456789:function:Store');

// Inner substep — leaf function
async function fetchAndValidate(id: string) {
  const item = await fetchFn.call({ id });
  await validateFn.call({ data: item.data });
  return item;
}

// Outer substep — calls fetchAndValidate
async function processItem(id: string) {
  const item = await fetchAndValidate(id);
  const enriched = await enrichFn.call({ data: item.data });
  await storeFn.call({ enriched: enriched.enriched });
}

export const nestedSubsteps = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    // This inlines: fetchFn → validateFn → enrichFn → storeFn
    await processItem(input.id);
    return { status: 'complete' };
  },
);
` }] },

  'substep-value': { description: 'Value-returning substeps with ResultPath mapping and property access.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Value-Returning Substeps
// Use const x = await mySubstep(arg) to capture the return value.
// The compiler maps the result to the caller's variable via ResultPath.

const lookupFn = Lambda<
  { userId: string },
  { name: string; email: string; tier: string }
>('arn:aws:lambda:us-east-1:123456789:function:LookupUser');

const sendFn = Lambda<
  { email: string; subject: string },
  { messageId: string }
>('arn:aws:lambda:us-east-1:123456789:function:SendEmail');

// Substep that returns a value
async function lookupUser(userId: string) {
  return await lookupFn.call({ userId });
}

// Substep that uses the return value of another substep
async function notifyUser(userId: string, subject: string) {
  const user = await lookupUser(userId);
  return await sendFn.call({ email: user.email, subject });
}

export const valueSubstep = Steps.createFunction(
  async (context: SimpleStepContext, input: { userId: string }) => {
    // The return value is captured — user.name and result.messageId work
    const result = await notifyUser(input.userId, 'Welcome!');
    return { messageId: result.messageId };
  },
);
` }] },

  'substep-destructured': { description: 'Substeps with destructured parameters and default values.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Destructured & Default Parameters
// Substeps support object destructuring and default values.
// The compiler extracts each property from the call-site argument.

const sendFn = Lambda<
  { userId: string; message: string; priority: number },
  void
>('arn:aws:lambda:us-east-1:123456789:function:SendNotification');

const logFn = Lambda<
  { action: string },
  void
>('arn:aws:lambda:us-east-1:123456789:function:AuditLog');

// Destructured parameter — each property binds to the caller's argument
async function sendNotification(
  { userId, message }: { userId: string; message: string },
  priority = 1,
) {
  await sendFn.call({ userId, message, priority });
  await logFn.call({ action: 'notification_sent' });
}

export const destructuredSubstep = Steps.createFunction(
  async (context: SimpleStepContext, input: { userId: string }) => {
    // Destructured params resolve to the object properties
    // Default value (priority=1) is used as a literal
    await sendNotification({ userId: input.userId, message: 'Welcome!' });
    return { done: true };
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

  // ── JSONata Features ──────────────────────────────────────────────────

  'jsonata-string-methods': { description: 'String methods compile to JSONata built-ins ($uppercase, $lowercase, $trim, etc.).', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// String Methods (JSONata mode)
//
// Standard JS string methods compile directly to JSONata built-in
// functions. These work in JSONata mode (the default).
// In JSONPath mode, use Lambda functions for string manipulation.
//
//   str.toUpperCase()    → $uppercase(str)
//   str.toLowerCase()    → $lowercase(str)
//   str.trim()           → $trim(str)
//   str.substring(s, e)  → $substring(str, s, e - s)
//   str.padStart(n, ch)  → $pad(str, -n, ch)
//   str.padEnd(n, ch)    → $pad(str, n, ch)
//   str.replace(old, new)→ $replace(str, old, new)
//   str.charAt(i)        → $substring(str, i, 1)
//   str.startsWith(pfx)  → $substring(str, 0, $length(pfx)) = pfx
//   str.endsWith(sfx)    → comparison via $substring + $length
//   str.repeat(n)        → $join($map([1..n], function() { str }))
//   str.length           → $length(str)

const lookupUser = Lambda<
  { userId: string },
  { name: string; email: string; bio: string; code: string }
>('arn:aws:lambda:us-east-1:123:function:LookupUser');

export const stringMethods = Steps.createFunction(
  async (context: SimpleStepContext, input: { userId: string; prefix: string }) => {
    const user = await lookupUser.call({ userId: input.userId });

    // Case conversion → $uppercase / $lowercase
    const displayName = user.name.toUpperCase();
    const emailNorm = user.email.toLowerCase();

    // Whitespace → $trim
    const cleanBio = user.bio.trim();

    // Substring → $substring(str, start, length)
    const preview = user.bio.substring(0, 50);

    // Padding → $pad (negative width = padStart)
    const paddedCode = user.code.padStart(8, '0');
    const paddedName = user.name.padEnd(20, ' ');

    // Replace → $replace
    const sanitized = user.bio.replace(' ', '-');

    // charAt → $substring(str, i, 1)
    const initial = user.name.charAt(0);

    // Prefix/suffix checks
    const isInternal = user.email.startsWith(input.prefix);
    const isGmail = user.email.endsWith('@gmail.com');

    // Repeat → $join($map([1..n], function() { str }))
    const separator = user.code.repeat(3);

    // Length → $length
    const nameLen = user.name.length;

    return {
      displayName, emailNorm, cleanBio, preview,
      paddedCode, paddedName, sanitized, initial,
      isInternal, isGmail, separator, nameLen,
    };
  },
);
` }] },

  'jsonata-math-methods': { description: 'Math methods and type conversion compile to JSONata ($floor, $ceil, $number, etc.).', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Math Methods & Type Conversion — JSONata only
//
// JS Math functions and type conversions compile to JSONata built-ins.
//
//   Math.floor(x)    → $floor(x)       Math.ceil(x)     → $ceil(x)
//   Math.round(x)    → $round(x)       Math.abs(x)      → $abs(x)
//   Math.pow(a, b)   → $power(a, b)    Math.sqrt(x)     → $sqrt(x)
//   Math.min(a, b)   → $min([a, b])    Math.max(a, b)   → $max([a, b])
//   Math.random()    → $random()
//   Number(x)        → $number(x)      String(x)        → $string(x)
//   Boolean(x)       → $boolean(x)     typeof x         → $type(x)
//   Date.now()       → $millis()       Array.isArray(x) → $type(x) = 'array'

const getQuote = Lambda<
  { productId: string },
  { price: number; discount: number; quantity: string; taxRate: number }
>('arn:aws:lambda:us-east-1:123:function:GetQuote');

export const mathMethods = Steps.createFunction(
  async (context: SimpleStepContext, input: { productId: string }) => {
    const quote = await getQuote.call({ productId: input.productId });

    // Rounding → $floor / $ceil / $round
    const basePrice = Math.floor(quote.price);
    const shippingCeil = Math.ceil(quote.price * 0.1);
    const rounded = Math.round(quote.price);

    // Absolute value → $abs
    const savings = Math.abs(quote.discount);

    // Power and square root → $power / $sqrt
    const squared = Math.pow(quote.price, 2);
    const root = Math.sqrt(quote.price);

    // Min/max → $min([...]) / $max([...])
    const finalPrice = Math.max(quote.price - quote.discount, 0);
    const capped = Math.min(quote.price, 999);

    // Type conversion → $number / $string / $boolean
    const qty = Number(quote.quantity);
    const label = String(quote.price);
    const hasDiscount = Boolean(quote.discount);

    // typeof → $type()
    const priceType = typeof quote.price;

    // Date.now() → $millis()
    const timestamp = Date.now();

    return {
      basePrice, shippingCeil, rounded, savings,
      squared, root, finalPrice, capped,
      qty, label, hasDiscount, priceType, timestamp,
    };
  },
);
` }] },

  'jsonata-array-methods': { description: 'Array methods & Object utilities compile to JSONata ($join, $reverse, $sort, $keys, etc.).', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Array Methods & Object Utilities (JSONata mode)
//
//   arr.join(delim)     → $join(arr, delim)        JSONata only
//   arr.reverse()       → $reverse(arr)             JSONata only
//   arr.sort()          → $sort(arr)                JSONata only
//   arr.concat(b)       → $append(arr, b)           JSONata only
//   arr.length          → $count(arr)               JSONata only
//   arr.includes(val)   → val in arr  (JSONata) / States.ArrayContains (JSONPath) — BOTH modes
//   Object.keys(o)      → $keys(o)
//   Object.values(o)    → $lookup(o, $keys(o))

const getInventory = Lambda<
  { warehouse: string },
  { items: string[]; backorder: string[]; metadata: Record<string, string> }
>('arn:aws:lambda:us-east-1:123:function:GetInventory');

export const arrayMethods = Steps.createFunction(
  async (context: SimpleStepContext, input: { warehouse: string; requiredItem: string }) => {
    const inv = await getInventory.call({ warehouse: input.warehouse });

    // Join → $join(arr, delim)
    const itemList = inv.items.join(', ');

    // Reverse → $reverse(arr)
    const reversed = inv.items.reverse();

    // Sort → $sort(arr)
    const sorted = inv.items.sort();

    // Concat → $append(arr, arr)
    const allItems = inv.items.concat(inv.backorder);

    // Length → $count(arr)
    const totalCount = inv.items.length;

    // Includes → works in both modes
    const inStock = inv.items.includes(input.requiredItem);

    // Object.keys → $keys(o)
    const metaKeys = Object.keys(inv.metadata);

    // Object.values → $lookup(o, $keys(o))
    const metaValues = Object.values(inv.metadata);

    return {
      itemList, reversed, sorted, allItems,
      totalCount, inStock, metaKeys, metaValues,
    };
  },
);
` }] },

  'jsonata-lambda-expressions': { description: 'Higher-order functions: map, filter, reduce, find, some, every with pure callbacks.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Lambda Expressions — Higher-Order Array Functions (JSONata mode)
//
// Callbacks MUST be pure expressions — no awaits, no service calls.
// The compiler converts pure callbacks to JSONata higher-order functions.
// For callbacks that need service calls, use Steps.map() or for...of instead.
//
//   arr.map(v => expr)          → $map(arr, function($v) { expr })
//   arr.filter(v => pred)       → $filter(arr, function($v) { pred })
//   arr.reduce((a, v) => e, i)  → $reduce(arr, function($a, $v) { e }, i)
//   arr.find(v => pred)         → $filter(arr, function($v) { pred })[0]
//   arr.some(v => pred)         → $count($filter(...)) > 0
//   arr.every(v => pred)        → $count($filter(...)) = $count(arr)

const getOrders = Lambda<
  { customerId: string },
  { orders: Array<{ id: string; status: string; amount: number; priority: boolean }> }
>('arn:aws:lambda:us-east-1:123:function:GetOrders');

export const lambdaExpressions = Steps.createFunction(
  async (context: SimpleStepContext, input: { customerId: string; targetOrderId: string }) => {
    const result = await getOrders.call({ customerId: input.customerId });

    // map → $map(arr, function($order) { $order.id })
    const orderIds = result.orders.map(order => order.id);

    // filter → $filter(arr, function($order) { $order.status = 'active' })
    const activeOrders = result.orders.filter(order => order.status === 'active');

    // reduce → $reduce(arr, function($sum, $order) { $sum + $order.amount }, 0)
    const totalSpend = result.orders.reduce((sum, order) => sum + order.amount, 0);

    // find → $filter(...)[0]
    const targetOrder = result.orders.find(order => order.id === input.targetOrderId);

    // some → $count($filter(...)) > 0
    const hasPriority = result.orders.some(order => order.priority);

    // every → $count($filter(...)) = $count(arr)
    const allPaid = result.orders.every(order => order.amount > 0);

    return { orderIds, activeOrders, totalSpend, targetOrder, hasPriority, allPaid };
  },
);
` }] },

  'jsonata-data-transform': { description: 'Capstone: Lambda call → filter → map → reduce → round → join → format.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Full Data Transformation Pipeline
//
// A realistic workflow that fetches order data, then uses pure
// TypeScript to filter, transform, aggregate, and format —
// all compiled to JSONata expressions in a single state.
//
// Combines: .filter(), .map(), .reduce(), Math.round(),
// .length, .join(), template literals, and Lambda calls.

const fetchOrders = Lambda<
  { region: string },
  { orders: Array<{ product: string; quantity: number; unitPrice: number; shipped: boolean }> }
>('arn:aws:lambda:us-east-1:123:function:FetchOrders');

const sendReport = Lambda<
  { report: string; total: number; count: number },
  { sent: boolean }
>('arn:aws:lambda:us-east-1:123:function:SendReport');

export const fullDataTransform = Steps.createFunction(
  async (context: SimpleStepContext, input: { region: string }) => {
    // 1. Fetch raw order data from Lambda
    const data = await fetchOrders.call({ region: input.region });

    // 2. Filter to shipped orders only → $filter(...)
    const shipped = data.orders.filter(o => o.shipped);

    // 3. Extract product names → $map(...)
    const products = shipped.map(o => o.product);

    // 4. Calculate total revenue → $reduce(...)
    const revenue = shipped.reduce((sum, o) => sum + o.quantity * o.unitPrice, 0);

    // 5. Round to whole dollars → $round(...)
    const roundedRevenue = Math.round(revenue);

    // 6. Count shipped orders
    const shippedCount = shipped.length;

    // 7. Build a comma-separated product list → $join(...)
    const productList = products.join(', ');

    // 8. Format the summary → & concatenation (JSONata)
    const summary = \`Shipped \${shippedCount} orders (\${productList}) for $\${roundedRevenue}\`;

    // 9. Send the report to another Lambda
    const confirmation = await sendReport.call({
      report: summary,
      total: roundedRevenue,
      count: shippedCount,
    });

    return { summary, confirmation };
  },
);
` }] },

  // ── Limitations ────────────────────────────────────────────────────────

  'limit-arithmetic': { description: 'Arithmetic: all operators (+ - * / %) work natively in JSONata. JSONPath: only + and -.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Arithmetic Operators
//
// JSONata mode (default): ALL arithmetic operators work natively.
//   *, /, %, +, - all compile to JSONata expressions.
//
// JSONPath mode: Only + and - (literal) are supported via States.MathAdd.
//   *, /, % produce SS530/SS531/SS532 errors in JSONPath mode.

const priceFn = Lambda<
  { productId: string },
  { price: number; quantity: number }
>('arn:aws:lambda:us-east-1:123456789:function:GetPrice');

export const arithmeticLimits = Steps.createFunction(
  async (context: SimpleStepContext, input: { productId: string }) => {
    const item = await priceFn.call({ productId: input.productId });

    // ✅ Addition — works in both modes (JSONata native / States.MathAdd)
    const withTax = item.price + 5;

    // ✅ Subtraction — works in both modes
    const discounted = item.price - 10;

    // ✅ Multiplication — JSONata only (native * operator)
    //    JSONPath: ❌ SS530
    const total = item.price * item.quantity;

    // ✅ Division — JSONata only (native / operator)
    //    JSONPath: ❌ SS531
    const half = item.price / 2;

    // ✅ Modulo — JSONata only (native % operator)
    //    JSONPath: ❌ SS532
    const remainder = item.quantity % 3;

    // ✅ Dynamic subtraction — JSONata only (native - operator)
    //    JSONPath: ❌ SS533 (right side must be a literal)
    const diff = item.price - item.quantity;

    return { withTax, discounted, total, half, remainder, diff };
  },
);
` }] },

  'limit-dynamic-expressions': { description: 'Expressions that cannot be resolved to ASL values.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Dynamic expressions in service call arguments must resolve to
// ASL-compatible values. JSONata mode supports more patterns than JSONPath.

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

    // ✅ Ternary — compiles to Choice + Pass states
    const label = result.count > 5 ? 'large' : 'small';

    // ✅ AND/OR conditions work — compiles to And/Or choice rules
    if (result.count > 0 && label === 'large') {
      return { status: 'matched' };
    }

    // ✅ String() — JSONata only (compiles to $string())
    //    JSONPath: ❌ SS502
    await storeFn.call({ value: String(result.count), flag: true });

    // ❌ SS501: Computed property name — both modes need static keys
    // const key = 'dynamicKey';
    // await storeFn.call({ [key]: input.data, flag: true });

    return { status: 'done', count: result.count };
  },
);
` }] },

  'limit-array-methods': { description: 'Array .map(), .filter(), .reduce() — JSONata supports pure callbacks; JSONPath needs for...of.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Array Higher-Order Functions
//
// JSONata mode (default): .map(), .filter(), .reduce(), .find(),
//   .some(), .every() all work with PURE EXPRESSION callbacks
//   (no awaits). They compile to $map/$filter/$reduce.
//
// JSONPath mode: These are ❌ SS540 errors. Use for...of (Map state)
//   or Steps.map() instead.
//
// ⚠️ Callbacks must be pure expressions — no await or service calls.
//   For service calls inside loops, use for...of or Steps.map().

const enrichFn = Lambda<
  { id: string },
  { enriched: string }
>('arn:aws:lambda:us-east-1:123456789:function:Enrich');

export const arrayLimits = Steps.createFunction(
  async (context: SimpleStepContext, input: { items: { id: string; value: number }[]; tags: string[] }) => {
    // ✅ .map() with pure callback — JSONata only
    //    JSONPath: ❌ SS540 — use for...of instead
    const ids = input.items.map(item => item.id);

    // ✅ .filter() with pure callback — JSONata only
    const big = input.items.filter(item => item.value > 100);

    // ✅ .reduce() with pure callback — JSONata only
    const total = input.items.reduce((sum, item) => sum + item.value, 0);

    // ✅ for...of compiles to a Map state — works in BOTH modes
    //    Use this when you need await/service calls inside the loop
    for (const item of input.items) {
      await enrichFn.call({ id: item.id });
    }

    // ✅ .length works in both modes
    const count = input.items.length;

    // ✅ .includes() works in both modes
    const hasSpecial = input.tags.includes('priority');

    return { ids, big, total, processedCount: count, hasSpecial };
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

  'limit-substep-constraints': { description: 'SS804: Rest parameters are not supported in substeps.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Substep parameter restrictions:
//   ✅ Simple identifiers, object destructuring, and default values work.
//   ❌ Rest parameters (...args) emit SS804.
//
// Workaround for rest params: pass an explicit array parameter instead.

const notifyFn = Lambda<
  { userId: string; message: string },
  { sent: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:Notify');

// ✅ Simple identifier parameters
async function sendSimple(userId: string, message: string) {
  await notifyFn.call({ userId, message });
}

// ✅ Destructured parameter — now supported
async function sendDestructured({ userId, message }: { userId: string; message: string }) {
  await notifyFn.call({ userId, message });
}

// ✅ Default parameter value — now supported
async function sendWithDefault(userId: string, message: string = 'Hello') {
  await notifyFn.call({ userId, message });
}

// ❌ SS804: Rest parameter — not supported
async function sendToMany(...userIds: string[]) {
  for (const userId of userIds) {
    await notifyFn.call({ userId, message: 'bulk' });
  }
}

export const helperParams = Steps.createFunction(
  async (context: SimpleStepContext, input: { userId: string }) => {
    await sendSimple(input.userId, 'Welcome!');
    await sendDestructured({ userId: input.userId, message: 'hi' });
    await sendWithDefault(input.userId);

    // ❌ This triggers SS804
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

// ❌ const with impure function call — Date.now() is not foldable at module scope.
//    At module scope, values must be compile-time constants.
//    Inside a workflow body, Date.now() works fine in JSONata mode → $millis().
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

  'limit-substep-await': { description: 'Substeps with service calls must be awaited (SS805).', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Substeps can call other substeps — the compiler inlines them
// transitively (bottom-up). The only requirement is that
// substeps with service calls MUST be awaited.

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

// ✅ Simple substep — inlines correctly
async function validate(id: string) {
  await validateFn.call({ id });
}

// ✅ Another simple substep — also inlines correctly
async function enrich(id: string) {
  await enrichFn.call({ id });
}

// ✅ Nested substep — calls validate() and enrich(), all inlined transitively
async function validateAndEnrich(id: string) {
  await validate(id);
  await enrich(id);
}

// ❌ SS805: Substep with service calls must be awaited
// (uncomment the bare call in the workflow below to see the error)

export const helperNesting = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    // ✅ Nested substep call — inlines validate + enrich transitively
    await validateAndEnrich(input.id);

    // ❌ SS805: Missing await — substep contains service calls
    // validate(input.id);

    await notifyFn.call({ id: input.id, message: 'done' });

    return { status: 'complete' };
  },
);
` }] },

  'limit-switch-fallthrough': { description: 'Switch cases must end with break, return, or throw (SS410).', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// ASL switch compilation requires each case to have a definite exit.
// Fall-through between cases cannot be expressed in Choice states.
// Each case must end with break, return, or throw.

const processFn = Lambda<
  { action: string },
  { result: string }
>('arn:aws:lambda:us-east-1:123456789:function:Process');

// ❌ SS410: Fall-through — this case doesn't end with break/return/throw
//
// export const fallThrough = Steps.createFunction(
//   async (context: SimpleStepContext, input: { status: string }) => {
//     switch (input.status) {
//       case 'active':
//         await processFn.call({ action: 'activate' });
//         // Missing break! Falls through to next case — SS410
//       case 'pending':
//         await processFn.call({ action: 'pend' });
//         break;
//       default:
//         break;
//     }
//     return { done: true };
//   },
// );

// ✅ Correct: every case ends with break or return
export const switchCorrect = Steps.createFunction(
  async (context: SimpleStepContext, input: { status: string }) => {
    switch (input.status) {
      case 'active':
        await processFn.call({ action: 'activate' });
        break;
      case 'pending':
        await processFn.call({ action: 'pend' });
        break;
      default:
        await processFn.call({ action: 'default' });
        break;
    }
    return { done: true };
  },
);
` }] },

  'limit-promise-all': { description: 'Promise.all() argument must be an array literal (SS420).', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Promise.all() compiles to an ASL Parallel state. The compiler needs
// to see the individual branches at compile time, so the argument
// must be an array literal — not a variable or expression.

const fetchUser = Lambda<
  { id: string },
  { name: string }
>('arn:aws:lambda:us-east-1:123456789:function:FetchUser');

const fetchOrders = Lambda<
  { userId: string },
  { orders: string[] }
>('arn:aws:lambda:us-east-1:123456789:function:FetchOrders');

// ❌ SS420: Promise.all with a variable — compiler can't see the branches
//
// export const promiseAllVar = Steps.createFunction(
//   async (context: SimpleStepContext, input: { id: string }) => {
//     const tasks = [
//       fetchUser.call({ id: input.id }),
//       fetchOrders.call({ userId: input.id }),
//     ];
//     const results = await Promise.all(tasks);
//     return { results };
//   },
// );

// ✅ Correct: array literal directly inside Promise.all()
export const promiseAllCorrect = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const [user, orders] = await Promise.all([
      fetchUser.call({ id: input.id }),
      fetchOrders.call({ userId: input.id }),
    ]);
    return { userName: user.name, orderCount: orders.orders.length };
  },
);
` }] },

  'limit-spread': { description: 'Spread in service call parameters is not supported (SS500).', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// ASL Parameters require explicit key-value mappings. Spread
// properties in service call arguments cannot be compiled because
// the compiler needs to know all keys at compile time.
//
// Pure spread ({ ...a, ...b }) in general expressions IS supported
// — it compiles to $merge (JSONata) / States.JsonMerge (JSONPath).

const processFn = Lambda<
  { id: string; region: string; mode: string },
  { result: string }
>('arn:aws:lambda:us-east-1:123456789:function:Process');

// ❌ SS500: Spread in service call parameters
//
// export const spreadInCall = Steps.createFunction(
//   async (context: SimpleStepContext, input: { id: string; region: string }) => {
//     const result = await processFn.call({ ...input, mode: 'fast' });
//     return { result: result.result };
//   },
// );

// ✅ Workaround: spell out properties explicitly
export const spreadWorkaround = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string; region: string }) => {
    const result = await processFn.call({
      id: input.id,
      region: input.region,
      mode: 'fast',
    });
    return { result: result.result };
  },
);
` }] },

  'limit-conditions': { description: 'Condition expressions: JSONata supports richer patterns; JSONPath needs simple comparisons.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Conditions in if/while/ternary compile to ASL Choice states.
//
// JSONata mode (default): Conditions are JSONata expressions —
//   richer patterns work including arithmetic comparisons.
//
// JSONPath mode: Choice rules support ===, !==, >, >=, <, <=,
//   &&, ||, ! applied to JSONPath variables and literal values.
//   Method calls and bitwise operators produce errors.
//
// Bitwise operators (& | ^ ~) are not supported in either mode.

const processFn = Lambda<
  { action: string },
  { result: string }
>('arn:aws:lambda:us-east-1:123456789:function:Process');

// ❌ SS512: Bitwise operator in condition — no ASL equivalent (both modes)
//
// export const bitwiseInCondition = Steps.createFunction(
//   async (context: SimpleStepContext, input: { flags: number }) => {
//     if (input.flags & 4) {
//       await processFn.call({ action: 'flagged' });
//     }
//     return { done: true };
//   },
// );

// ✅ Supported conditions
export const conditionsCorrect = Steps.createFunction(
  async (context: SimpleStepContext, input: { count: number; status: string; active: boolean }) => {
    // ✅ Simple comparison — both modes
    if (input.count > 0) {
      await processFn.call({ action: 'has-items' });
    }

    // ✅ Compound condition with && — both modes
    if (input.status === 'ready' && input.count > 5) {
      await processFn.call({ action: 'ready-and-large' });
    }

    // ✅ Negation — both modes
    if (!input.active) {
      await processFn.call({ action: 'inactive' });
    }

    // ✅ OR condition — both modes
    if (input.status === 'error' || input.count === 0) {
      await processFn.call({ action: 'problem' });
    }

    return { done: true };
  },
);
` }] },

  'limit-map-isolation': { description: 'Map state closures — runtime variables captured via ItemSelector.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// for...of compiles to an ASL Map state. The compiler automatically
// captures outer-scope runtime variables (service call results) as
// closures via ItemSelector/Arguments.
//
// This means you CAN reference prior await results inside loops.

const CONFIG_PREFIX = 'item';

const lookupFn = Lambda<
  { id: string },
  { prefix: string }
>('arn:aws:lambda:us-east-1:123456789:function:Lookup');

const processFn = Lambda<
  { key: string },
  { done: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:Process');

export const mapIsolation = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string; items: string[] }) => {
    const lookup = await lookupFn.call({ id: input.id });

    // ✅ Closures work — lookup.prefix is captured via ItemSelector
    for (const item of input.items) {
      await processFn.call({ key: lookup.prefix + item });
    }

    // ✅ Compile-time constants also work inside Map state
    for (const item of input.items) {
      await processFn.call({ key: CONFIG_PREFIX + item });
    }

    // ✅ Steps.sequential() for sequential iteration (MaxConcurrency: 1)
    for (const item of Steps.sequential(input.items)) {
      await processFn.call({ key: lookup.prefix + item });
    }

    // ✅ Steps.items() for concurrency control with closures
    for (const item of Steps.items(input.items, { maxConcurrency: 5 })) {
      await processFn.call({ key: lookup.prefix + item });
    }

    return { done: true };
  },
);
` }] },

  'limit-module-scope': { description: 'Module-scope variables must be resolvable at compile time.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Module-scope variables used inside a workflow must be compile-time
// constants. The compiler's Whole-Program Analyzer tries to fold
// each variable to a known value. If it can't, the variable is
// unresolvable and you'll get an error.

// ✅ Literal — always foldable
const API_VERSION = 'v2';

// ✅ Computed from constants — folded at compile time
const TIMEOUT_MS = 30 * 1000;

// ✅ Pure function result on constants — inlined and folded
const formatArn = (name: string) => \`arn:aws:lambda:us-east-1:123456789:function:\${name}\`;
const PROCESS_ARN = formatArn('Process');

// ❌ Impure function call — Date.now() has side effects, can't fold
const TIMESTAMP = Date.now();

// ❌ Reassigned variable — compiler can't determine final value
let counter = 0;
counter += 1;

// ⚠️ Steps.safeVar() — suppresses error, emits SS708 warning instead
// Use when YOU know the value will be available at runtime (e.g., CDK tokens)
// const EXTERNAL_ARN = Steps.safeVar(getArnFromConfig());

const processFn = Lambda<
  { data: string; version: string },
  { result: string }
>(PROCESS_ARN);

export const moduleScopeRules = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    // ✅ All these work — they reference foldable constants
    const result = await processFn.call({
      data: input.data,
      version: API_VERSION,
    });

    const timeout = TIMEOUT_MS;

    // ❌ These would fail — uncomment to see errors:
    // const ts = TIMESTAMP;         // TIMESTAMP is unresolvable
    // const count = counter;         // counter is reassigned (unresolvable)

    return { result: result.result, timeout };
  },
);
` }] },

  'limit-variable-shadowing': { description: 'Variable shadowing in nested scopes overwrites values in ASL\'s flat namespace.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// ASL uses a flat JSONPath namespace ($.variableName). When you
// redeclare a variable in a nested scope, it overwrites the
// outer variable's value in the state data.
//
// This is a silent footgun — no compiler error, but unexpected
// behavior at runtime. Avoid reusing variable names in nested scopes.

const processFn = Lambda<
  { status: string },
  { ok: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:Process');

export const shadowingDemo = Steps.createFunction(
  async (context: SimpleStepContext, input: { flag: boolean }) => {
    const status = 'active';

    if (input.flag) {
      // ⚠️ This shadows the outer status — both map to $.status
      // After this block, the outer status is 'processing', not 'active'
      const status = 'processing';
      await processFn.call({ status });
    }

    // ⚠️ status here may be 'processing' instead of 'active'
    // because ASL's flat namespace was overwritten
    await processFn.call({ status });

    // ✅ Use unique names to avoid shadowing
    const outerStatus = 'active';
    if (input.flag) {
      const innerStatus = 'processing';
      await processFn.call({ status: innerStatus });
    }
    await processFn.call({ status: outerStatus });

    return { done: true };
  },
);
` }] },

  'limit-substep-edge-cases': { description: 'Substep edge cases: return values, try/catch, non-eligible callees.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Substeps (module-scope async functions) are inlined into the
// caller's state machine. Most patterns work, but some edge
// cases are worth knowing about.

const fetchFn = Lambda<
  { id: string },
  { name: string; status: string }
>('arn:aws:lambda:us-east-1:123456789:function:Fetch');

const saveFn = Lambda<
  { id: string; name: string },
  { saved: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:Save');

const rollbackFn = Lambda<
  { id: string },
  { ok: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:Rollback');

// ✅ Substep with return value — result is captured at call site
async function fetchUser(id: string) {
  return await fetchFn.call({ id });
}

// ✅ Substep with try/catch — error handling is inlined
async function saveWithRollback(id: string, name: string) {
  try {
    await saveFn.call({ id, name });
  } catch (e) {
    await rollbackFn.call({ id });
    throw e;
  }
}

// ✅ Substep with default params — trailing defaults work
async function fetchWithRetry(id: string, retries: number = 3) {
  return await fetchFn.call({ id });
}

// ✅ Substep with destructured + renamed params
async function processItem({ userId: id, userName: name }: { userId: string; userName: string }) {
  await saveFn.call({ id, name });
}

// ❌ SS800: Wrong number of arguments
// async function twoParams(a: string, b: string) {
//   await saveFn.call({ id: a, name: b });
// }
// await twoParams(input.id, input.name, 'extra');  // Too many args

export const substepEdgeCases = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string; name: string }) => {
    // ✅ Capture return value from substep
    const user = await fetchUser(input.id);

    // ✅ Try/catch in substep — Catch rules inlined
    await saveWithRollback(input.id, user.name);

    // ✅ Omit default param — uses default value
    const retry = await fetchWithRetry(input.id);

    // ✅ Pass with default param — overrides default
    const retry2 = await fetchWithRetry(input.id, 5);

    // ✅ Destructured + renamed params
    await processItem({ userId: input.id, userName: user.name });

    return { status: user.status };
  },
);
` }] },

  'limit-runtime-expressions': { description: 'Which expressions work at runtime — JSONata supports more than JSONPath.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

// Inside a workflow body, expressions operate on two kinds of values:
//
// 1. COMPILE-TIME constants — literals, folded math, module-scope const
// 2. RUNTIME values — service call results, input parameters
//
// JSONata mode supports far more runtime operations than JSONPath.

const processFn = Lambda<
  { message: string },
  { count: number; name: string; data: any }
>('arn:aws:lambda:us-east-1:123456789:function:Process');

export const runtimeExpressions = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string; items: string[] }) => {
    const result = await processFn.call({ message: input.id });

    // ── String operations ─────────────────────────────────

    // ✅ Template literals — both modes (JSONata: & concat, JSONPath: States.Format)
    const greeting = \`Hello \${result.name}\`;

    // ✅ String + concatenation — both modes (JSONata: &, JSONPath: States.Format)
    const label = 'item-' + result.name;

    // ✅ String() on runtime value — JSONata only ($string)
    //    JSONPath: use template literal workaround
    const countStr = String(result.count);

    // ── JSON operations ───────────────────────────────────

    // ✅ JSON.stringify() — both modes (JSONata: $string, JSONPath: States.JsonToString)
    const json = JSON.stringify(result.data);

    // ── Array operations ──────────────────────────────────

    // ✅ .length on runtime array — both modes
    const count = input.items.length;

    // ── Arithmetic ────────────────────────────────────────

    // ✅ Addition — both modes (JSONata: native +, JSONPath: States.MathAdd)
    const incremented = result.count + 1;

    // ✅ Subtraction by literal — both modes
    const decremented = result.count - 1;

    // ✅ Multiplication — JSONata only (native * operator)
    //    JSONPath: ❌ SS530
    const doubled = result.count * 2;

    // ── Ternary on runtime condition ──────────────────────

    // ✅ Ternary — both modes (Choice + Pass states)
    const size = result.count > 10 ? 'large' : 'small';

    // ── Property access ──────────────────────────────────

    // ✅ Access properties directly via dot notation
    const name = result.name;
    const itemCount = result.count;

    return { greeting, label, countStr, json, count, incremented, decremented, doubled, size, name, itemCount };
  },
);
` }] },

  'limit-workarounds': { description: 'Patterns that needed workarounds in JSONPath — now native in JSONata mode.', services: ['Lambda', 'DynamoDB'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';
import { DynamoDB } from './runtime/services/DynamoDB';

// This example compiles successfully in JSONata mode (default).
// Many patterns that previously needed workarounds are now native.

const computeFn = Lambda<
  { a: number; b: number; op: string },
  { result: number }
>('arn:aws:lambda:us-east-1:123456789:function:Compute');

const db = new DynamoDB('ResultsTable');

export const workarounds = Steps.createFunction(
  async (context: SimpleStepContext, input: { x: number; y: number; items: { id: string; value: number }[] }) => {
    // ✅ JSONata: multiply/divide/modulo work natively
    //    JSONPath: delegate to Lambda
    const product = input.x * input.y;
    const half = input.x / 2;

    // ✅ JSONata: .map()/.filter() with pure callbacks
    //    JSONPath: use for...of (Map state) instead
    const ids = input.items.map(item => item.id);
    const big = input.items.filter(item => item.value > 100);
    const total = input.items.reduce((sum, item) => sum + item.value, 0);

    // ✅ Ternary — both modes (Choice + Pass states)
    const status = product > 100 ? 'high' : 'low';

    // ✅ Template literals — both modes (JSONata: & concat, JSONPath: States.Format)
    const label = \`result-\${status}\`;

    // ✅ JSONata: Date.now() → $millis(), Math.random() → $random()
    //    Both modes: Steps.uuid() → States.UUID()
    const id = Steps.uuid();
    const timestamp = Date.now();

    // ✅ JSONata: String() → $string(), Number() → $number()
    const productStr = String(product);

    // Compile-time constants always work at module scope
    const VERSION = 'v2';

    await db.putItem({
      id,
      result: product,
      label,
      version: VERSION,
    });

    return { id, result: product, label, total, ids };
  },
);
` }] },

  // ── Testing ──────────────────────────────────────────────────────────

  'test-compile-validate': { description: 'Compile a workflow and validate the ASL structure.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

const processFn = Lambda<{ id: string }, { result: string }>(
  'arn:aws:lambda:us-east-1:123:function:Process',
);

export const workflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const result = await processFn.call({ id: input.id });
    return { output: result.result };
  },
);

// --- Test pattern: Compile & Validate -----------------
// import { compile, AslSerializer } from '@simplesteps/core';
// import { LocalRunner } from '@simplesteps/local';
//
// const result = compile({ sourceFiles: ['./workflow.ts'] });
// expect(result.errors).toHaveLength(0);
// expect(result.stateMachines[0].definition.StartAt).toBeDefined();
//
// const runner = new LocalRunner(aslJson, {
//   services: {
//     'arn:aws:lambda:*:*:function:Process': (input) => ({
//       result: 'processed-' + input.id,
//     }),
//   },
// });
// const output = await runner.execute({ id: '123' });
// expect(output.output).toBe('processed-123');
` }] },

  'test-mock-services': { description: 'Mock service implementations to test different paths.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

const validateFn = Lambda<{ data: string }, { valid: boolean }>(
  'arn:aws:lambda:us-east-1:123:function:Validate',
);
const processFn = Lambda<{ data: string }, { result: string }>(
  'arn:aws:lambda:us-east-1:123:function:Process',
);

export const workflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    const check = await validateFn.call({ data: input.data });
    if (check.valid) {
      const result = await processFn.call({ data: input.data });
      return { status: 'processed', result: result.result };
    } else {
      return { status: 'rejected' };
    }
  },
);

// --- Test pattern: Mock Services ----------------------
// Test the valid path:
//   services['Validate'] = () => ({ valid: true })
//   services['Process'] = () => ({ result: 'done' })
//   expect(output.status).toBe('processed')
//
// Test the invalid path:
//   services['Validate'] = () => ({ valid: false })
//   expect(output.status).toBe('rejected')
//
// Verify Process is NOT called for invalid input:
//   let processCalled = false;
//   services['Process'] = () => { processCalled = true; };
//   expect(processCalled).toBe(false);
` }] },

  'test-trace-inspection': { description: 'Use executeWithTrace() to inspect execution order and timing.', services: ['Lambda'], files: [{ name: 'workflow.ts', content: `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

const stepA = Lambda<{ id: string }, { a: string }>(
  'arn:aws:lambda:us-east-1:123:function:StepA',
);
const stepB = Lambda<{ a: string }, { b: string }>(
  'arn:aws:lambda:us-east-1:123:function:StepB',
);
const stepC = Lambda<{ b: string }, { c: string }>(
  'arn:aws:lambda:us-east-1:123:function:StepC',
);

export const workflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const a = await stepA.call({ id: input.id });
    const b = await stepB.call({ a: a.a });
    const c = await stepC.call({ b: b.b });
    return { result: c.c };
  },
);

// --- Test pattern: Trace Inspection -------------------
// const { output, trace } = await runner.executeWithTrace(input);
//
// Verify execution succeeded:
//   expect(trace.error).toBeUndefined();
//
// Check state ordering:
//   const names = trace.states.map(s => s.name);
//   expect(names).toContain('Invoke_stepA');
//
// Check step count:
//   expect(trace.totalSteps).toBe(trace.states.length);
//
// Inspect individual states:
//   const tasks = trace.states.filter(s => s.type === 'Task');
//   for (const task of tasks) {
//     expect(task.input).toBeDefined();
//     expect(task.output).toBeDefined();
//     expect(task.duration).toBeGreaterThanOrEqual(0);
//   }
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

    // Update execution panel with current ASL
    updateAsl(result.json);

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

// Execution panel elements
const executionContainer = document.getElementById('execution-container')!;
const outputTabs = document.querySelectorAll<HTMLButtonElement>('.output-tab');
const runBtnHeader = document.getElementById('run-btn')!;

let isConsoleExpanded = false;

if (__REPO_URL__) {
  githubLink.href = __REPO_URL__;
} else {
  githubLink.style.display = 'none';
}

compileBtn.addEventListener('click', runCompile);

// ── Execution panel ──────────────────────────────────────────────────────

initExecutionPanel(executionContainer);

// Tab switching between ASL and Execution views
outputTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    outputTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    if (target === 'asl') {
      outputContainer.style.display = '';
      executionContainer.style.display = 'none';
    } else {
      outputContainer.style.display = 'none';
      executionContainer.style.display = '';
    }
  });
});

// Run button in header — switch to execution tab and run
runBtnHeader.addEventListener('click', () => {
  // Ensure we have fresh compilation
  runCompile();
  // Switch to execution tab
  outputTabs.forEach(t => t.classList.remove('active'));
  const execTab = document.querySelector('.output-tab[data-tab="execution"]') as HTMLButtonElement;
  if (execTab) execTab.classList.add('active');
  outputContainer.style.display = 'none';
  executionContainer.style.display = '';
  // Trigger the execution run button inside the panel
  const execRunBtn = document.getElementById('exec-run-btn') as HTMLButtonElement;
  if (execRunBtn) execRunBtn.click();
});

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
