// main.ts — Playground entry point.
//
// Sets up two Monaco editors (TypeScript → ASL JSON), wires the compile
// button, debounced auto-compile, example selector, and error display.

import * as monaco from 'monaco-editor';
import { compileFromString } from './compiler-bridge';
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

// ── Example code snippets ────────────────────────────────────────────────

const EXAMPLES: Record<string, string> = {
  sequential: `import { Steps, SimpleStepContext } from './runtime/index';
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
`,

  'if-else': `import { Steps, SimpleStepContext } from './runtime/index';
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
`,

  'early-return': `import { Steps, SimpleStepContext } from './runtime/index';
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
`,

  'while-loop': `import { Steps, SimpleStepContext } from './runtime/index';
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
`,

  'for-each': `import { Steps, SimpleStepContext } from './runtime/index';
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
`,

  'try-catch': `import { Steps, SimpleStepContext } from './runtime/index';
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
`,

  'multi-service': `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';
import { DynamoDB } from './runtime/services/DynamoDB';
import { SNS } from './runtime/services/SNS';

const validateFn = Lambda<{ orderId: string }, { valid: boolean }>('arn:aws:lambda:us-east-1:123:function:ValidateOrder');
const ordersDb = new DynamoDB('OrdersTable');
const notifications = new SNS('arn:aws:sns:us-east-1:123:OrderNotifications');

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
`,

  'wait-and-continue': `import { Steps, SimpleStepContext } from './runtime/index';
import { Lambda } from './runtime/services/Lambda';

const checkFn = Lambda<{ id: string }, { status: string }>('arn:aws:lambda:us-east-1:123:function:CheckStatus');

export const waitAndContinue = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    Steps.delay({ seconds: 30 });
    const result = await checkFn.call({ id: input.id });
    return { status: result.status };
  },
);
`,

  'switch-case': `import { Steps, SimpleStepContext } from './runtime/index';
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
`,

  'and-or-conditions': `import { Steps, SimpleStepContext } from './runtime/index';
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
`,

  'sqs-queue': `import { Steps, SimpleStepContext } from './runtime/index';
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
`,

  eventbridge: `import { Steps, SimpleStepContext } from './runtime/index';
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
`,

  'dynamodb-crud': `import { Steps, SimpleStepContext } from './runtime/index';
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
`,

  'nested-conditions': `import { Steps, SimpleStepContext } from './runtime/index';
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
`,

  'dynamic-wait': `import { Steps, SimpleStepContext } from './runtime/index';
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
`,

  'multi-step-function': `import { Steps, SimpleStepContext } from './runtime/index';
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
`,

  parallel: `import { Steps, SimpleStepContext } from './runtime/index';
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
`,

  intrinsics: `import { Steps, SimpleStepContext } from './runtime/index';

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
`,

  'js-operators': `import { Steps, SimpleStepContext } from './runtime/index';

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
`,

  'string-interpolation': `import { Steps, SimpleStepContext } from './runtime/index';

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
`,

  constants: `import { Steps, SimpleStepContext } from './runtime/index';
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
`,

  'js-patterns': `import { Steps, SimpleStepContext } from './runtime/index';

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
`,

  's3-operations': `import { Steps, SimpleStepContext } from './runtime/index';
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
`,

  'secrets-manager': `import { Steps, SimpleStepContext } from './runtime/index';
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
`,

  'ssm-params': `import { Steps, SimpleStepContext } from './runtime/index';
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
`,
};

const DEFAULT_CODE = EXAMPLES['sequential'];

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
const errorFooter = document.getElementById('errors')! as HTMLElement;

const inputEditor = monaco.editor.create(editorContainer, {
  value: DEFAULT_CODE,
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

// ── Compile & display ────────────────────────────────────────────────────

function runCompile() {
  const code = inputEditor.getValue();

  try {
    const result = compileFromString(code);

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

    // Update error footer
    if (result.errors.length > 0) {
      errorFooter.className = 'has-errors';
      errorFooter.textContent = result.errors
        .map((e) => `[${e.code}] line ${e.line}: ${e.message}`)
        .join('\n');
    } else {
      errorFooter.className = 'success';
      const plural = result.stateMachineCount === 1 ? '' : 's';
      errorFooter.textContent = `Compiled ${result.stateMachineCount} state machine${plural} successfully.`;
    }
  } catch (err: any) {
    errorFooter.className = 'has-errors';
    errorFooter.textContent = `Internal error: ${err.message}`;
    outputEditor.setValue(`// Internal compiler error\n// ${err.message}`);
  }
}

// ── Wire UI ──────────────────────────────────────────────────────────────

const compileBtn = document.getElementById('compile-btn')!;
const autoCheck = document.getElementById('auto-compile') as HTMLInputElement;
const examplesSelect = document.getElementById('examples') as HTMLSelectElement;

compileBtn.addEventListener('click', runCompile);

// Debounced auto-compile
let timer: ReturnType<typeof setTimeout> | null = null;
inputEditor.onDidChangeModelContent(() => {
  if (!autoCheck.checked) return;
  if (timer) clearTimeout(timer);
  timer = setTimeout(runCompile, 500);
});

// Example selector
examplesSelect.addEventListener('change', () => {
  const key = examplesSelect.value;
  if (key && EXAMPLES[key]) {
    inputEditor.setValue(EXAMPLES[key]);
    // Reset selector so the same example can be re-selected
    examplesSelect.value = '';
    if (autoCheck.checked) {
      runCompile();
    }
  }
});

// Initial compile on load
runCompile();
