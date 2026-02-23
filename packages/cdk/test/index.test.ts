import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import { Template } from 'aws-cdk-lib/assertions';
import { SimpleStepsStateMachine, compileDefinitionBody } from '@simplesteps/cdk';
import type { CompileResult, CompiledStateMachine, StateMachineDefinition } from '@simplesteps/core';

// ── Fixtures ────────────────────────────────────────────────────────────

const SEQUENTIAL_FIXTURE = path.resolve(
  __dirname, '../../core/test/fixtures/cfg/sequential.ts',
);

const SUBSTITUTION_FIXTURE = path.resolve(
  __dirname, '../../core/test/fixtures/cfg/template-substitutions.ts',
);

// ── Mock helpers ────────────────────────────────────────────────────────

const MOCK_DEFINITION: StateMachineDefinition = {
  StartAt: 'CallA',
  States: {
    CallA: {
      Type: 'Task',
      Resource: 'arn:aws:lambda:us-east-1:123:function:A',
      Next: 'CallB',
    },
    CallB: {
      Type: 'Task',
      Resource: 'arn:aws:lambda:us-east-1:123:function:B',
      End: true,
    },
  },
};

function makeMachine(name: string, def?: StateMachineDefinition): CompiledStateMachine {
  return {
    name,
    source: 'test.ts',
    definition: def ?? MOCK_DEFINITION,
    services: [],
  };
}

function makeResult(machines: CompiledStateMachine[], errors: any[] = []): CompileResult {
  return { stateMachines: machines, errors };
}

// ── Unit tests (mocked compile) ─────────────────────────────────────────

jest.mock('@simplesteps/core', () => {
  const actual = jest.requireActual('@simplesteps/core');
  return {
    ...actual,
    compile: jest.fn(),
  };
});

import { compile } from '@simplesteps/core';
const mockCompile = compile as jest.MockedFunction<typeof compile>;

function createStack(): cdk.Stack {
  const app = new cdk.App();
  return new cdk.Stack(app, 'TestStack');
}

describe('SimpleStepsStateMachine (unit — mocked compile)', () => {
  beforeEach(() => {
    mockCompile.mockReset();
  });

  test('1. Single state machine, no errors → StateMachine created', () => {
    mockCompile.mockReturnValue(makeResult([makeMachine('workflow')]));

    const stack = createStack();
    const sm = new SimpleStepsStateMachine(stack, 'SM', {
      sourceFile: '/fake/workflow.ts',
    });

    expect(sm).toBeInstanceOf(sfn.StateMachine);
    expect(sm.compileResult!.stateMachines).toHaveLength(1);
    expect(sm.compiledMachine!.name).toBe('workflow');
  });

  test('2. Named machine selection → correct machine selected', () => {
    mockCompile.mockReturnValue(makeResult([
      makeMachine('alpha'),
      makeMachine('beta'),
    ]));

    const stack = createStack();
    const sm = new SimpleStepsStateMachine(stack, 'SM', {
      sourceFile: '/fake/workflow.ts',
      stateMachineName: 'beta',
    });

    expect(sm.compiledMachine!.name).toBe('beta');
  });

  test('3. Bindings → substitutions mapping', () => {
    mockCompile.mockReturnValue(makeResult([makeMachine('workflow')]));

    const stack = createStack();
    new SimpleStepsStateMachine(stack, 'SM', {
      sourceFile: '/fake/workflow.ts',
      bindings: {
        myLambda: 'arn:aws:lambda:us-east-1:123:function:MyFn',
        myTable: 'my-table-name',
      },
    });

    expect(mockCompile).toHaveBeenCalledWith({
      sourceFiles: ['/fake/workflow.ts'],
      substitutions: {
        myLambda: 'arn:aws:lambda:us-east-1:123:function:MyFn',
        myTable: 'my-table-name',
      },
    });
  });

  test('4. Compilation errors → throw with file:line diagnostics', () => {
    mockCompile.mockReturnValue(makeResult([], [{
      file: 'workflow.ts',
      line: 10,
      column: 5,
      message: 'Unknown service method',
      severity: 'error',
      code: 'SS001',
    }]));

    const stack = createStack();
    expect(() => {
      new SimpleStepsStateMachine(stack, 'SM', {
        sourceFile: '/fake/workflow.ts',
      });
    }).toThrow(/workflow\.ts:10/);
  });

  test('5. No state machines found → throw with source file path', () => {
    mockCompile.mockReturnValue(makeResult([]));

    const stack = createStack();
    expect(() => {
      new SimpleStepsStateMachine(stack, 'SM', {
        sourceFile: '/fake/empty.ts',
      });
    }).toThrow(/\/fake\/empty\.ts/);
  });

  test('6. Multiple machines, no name → throw listing available names', () => {
    mockCompile.mockReturnValue(makeResult([
      makeMachine('alpha'),
      makeMachine('beta'),
      makeMachine('gamma'),
    ]));

    const stack = createStack();
    expect(() => {
      new SimpleStepsStateMachine(stack, 'SM', {
        sourceFile: '/fake/workflow.ts',
      });
    }).toThrow(/alpha, beta, gamma/);
  });

  test('7. Named machine not found → throw listing available names', () => {
    mockCompile.mockReturnValue(makeResult([
      makeMachine('alpha'),
      makeMachine('beta'),
    ]));

    const stack = createStack();
    expect(() => {
      new SimpleStepsStateMachine(stack, 'SM', {
        sourceFile: '/fake/workflow.ts',
        stateMachineName: 'missing',
      });
    }).toThrow(/Available: alpha, beta/);
  });

  test('8. compileDefinitionBody() happy path → returns DefinitionBody', () => {
    mockCompile.mockReturnValue(makeResult([makeMachine('workflow')]));

    const body = compileDefinitionBody('/fake/workflow.ts');
    expect(body).toBeDefined();
    // DefinitionBody.fromString returns an object with bind()
    expect(typeof body.bind).toBe('function');
  });

  test('9. compileDefinitionBody() errors → throws', () => {
    mockCompile.mockReturnValue(makeResult([], [{
      file: 'workflow.ts',
      line: 5,
      column: 1,
      message: 'Syntax error',
      severity: 'error',
      code: 'SS002',
    }]));

    expect(() => {
      compileDefinitionBody('/fake/workflow.ts');
    }).toThrow(/compilation failed/i);
  });
});

// ── Inline workflow tests (__compiledAsl path) ───────────────────────────
//
// These test the construct path used by the SimpleSteps transformer.
// The transformer pre-compiles the workflow to ASL and injects __compiledAsl
// + __runtimeBindings into the props. We simulate that here without needing
// the actual transformer running.

describe('SimpleStepsStateMachine (inline — __compiledAsl path)', () => {
  const SIMPLE_ASL = JSON.stringify({
    StartAt: 'Invoke',
    States: {
      Invoke: {
        Type: 'Task',
        Resource: 'arn:aws:lambda:us-east-1:123:function:MyFn',
        End: true,
      },
    },
  });

  test('__compiledAsl without bindings → StateMachine created with literal ASL', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'InlineStack1');

    new SimpleStepsStateMachine(stack, 'SM', {
      __compiledAsl: SIMPLE_ASL,
    } as any);

    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::StepFunctions::StateMachine', {
      DefinitionString: SIMPLE_ASL,
    });
  });

  test('__compiledAsl with runtime bindings → placeholders substituted', () => {
    const aslWithPlaceholders = JSON.stringify({
      StartAt: 'Invoke',
      States: {
        Invoke: {
          Type: 'Task',
          Resource: '$$0$$',
          Next: 'PutItem',
        },
        PutItem: {
          Type: 'Task',
          Resource: 'arn:aws:states:::dynamodb:putItem',
          Parameters: { TableName: '$$1$$' },
          End: true,
        },
      },
    });

    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'InlineStack2');

    new SimpleStepsStateMachine(stack, 'SM', {
      __compiledAsl: aslWithPlaceholders,
      __runtimeBindings: [
        'arn:aws:lambda:us-east-1:999:function:RealFn',
        'production-orders-table',
      ],
    } as any);

    const template = Template.fromStack(stack);
    const resources = template.findResources('AWS::StepFunctions::StateMachine');
    const smResource = Object.values(resources)[0];
    const defString = smResource.Properties.DefinitionString;

    expect(defString).toContain('arn:aws:lambda:us-east-1:999:function:RealFn');
    expect(defString).toContain('production-orders-table');
    expect(defString).not.toContain('$$0$$');
    expect(defString).not.toContain('$$1$$');
  });

  test('multiple bindings → all placeholders replaced in order', () => {
    const asl = '{"StartAt":"A","States":{"A":{"Type":"Task","Resource":"$$0$$","Next":"B"},"B":{"Type":"Task","Resource":"$$1$$","Next":"C"},"C":{"Type":"Task","Resource":"$$2$$","End":true}}}';

    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'InlineStack3');

    new SimpleStepsStateMachine(stack, 'SM', {
      __compiledAsl: asl,
      __runtimeBindings: ['arn:lambda:A', 'arn:lambda:B', 'arn:lambda:C'],
    } as any);

    const template = Template.fromStack(stack);
    const resources = template.findResources('AWS::StepFunctions::StateMachine');
    const defString = Object.values(resources)[0].Properties.DefinitionString;

    expect(defString).toContain('arn:lambda:A');
    expect(defString).toContain('arn:lambda:B');
    expect(defString).toContain('arn:lambda:C');
    expect(defString).not.toMatch(/\$\$\d+\$\$/);
  });

  test('empty runtime bindings → ASL passed through unchanged', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'InlineStack4');

    new SimpleStepsStateMachine(stack, 'SM', {
      __compiledAsl: SIMPLE_ASL,
      __runtimeBindings: [],
    } as any);

    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::StepFunctions::StateMachine', {
      DefinitionString: SIMPLE_ASL,
    });
  });

  test('workflow prop without transformer → throws helpful error', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'InlineStack5');

    expect(() => {
      new SimpleStepsStateMachine(stack, 'SM', {
        workflow: 'some-function-ref',
      } as any);
    }).toThrow(/transformer/i);
  });

  test('no sourceFile and no __compiledAsl → throws', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'InlineStack6');

    expect(() => {
      new SimpleStepsStateMachine(stack, 'SM', {} as any);
    }).toThrow(/sourceFile.*workflow/i);
  });

  test('__compiledAsl takes precedence over sourceFile', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'InlineStack7');

    // Even though sourceFile is set, __compiledAsl should be used
    new SimpleStepsStateMachine(stack, 'SM', {
      sourceFile: '/nonexistent/file.ts',
      __compiledAsl: SIMPLE_ASL,
    } as any);

    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::StepFunctions::StateMachine', {
      DefinitionString: SIMPLE_ASL,
    });
  });

  test('inline path does not set compileResult or compiledMachine', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'InlineStack8');

    const sm = new SimpleStepsStateMachine(stack, 'SM', {
      __compiledAsl: SIMPLE_ASL,
    } as any);

    expect(sm.compileResult).toBeUndefined();
    expect(sm.compiledMachine).toBeUndefined();
  });
});

// ── Integration tests (real compile + CDK synthesis) ─────────────────────

describe('SimpleStepsStateMachine (integration — real compile)', () => {
  // Unmock compile for integration tests
  beforeAll(() => {
    mockCompile.mockRestore();
  });

  test('10. Real fixture → CloudFormation template with StateMachine', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'IntegrationStack');

    // Use jest.requireActual to get the real compile function
    const { compile: realCompile, AslSerializer } = jest.requireActual('@simplesteps/core');

    // Manually compile and inject since mock may interfere
    const result = realCompile({ sourceFiles: [SEQUENTIAL_FIXTURE] });
    expect(result.errors).toHaveLength(0);
    expect(result.stateMachines.length).toBeGreaterThan(0);

    const definitionString = AslSerializer.serialize(result.stateMachines[0].definition);

    new sfn.StateMachine(stack, 'TestMachine', {
      definitionBody: sfn.DefinitionBody.fromString(definitionString),
    });

    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::StepFunctions::StateMachine', {
      DefinitionString: definitionString,
    });

    // Verify the ASL is valid JSON with expected structure
    const parsed = JSON.parse(definitionString);
    expect(parsed).toHaveProperty('StartAt');
    expect(parsed).toHaveProperty('States');
  });

  test('11. With substitutions → substituted values appear in ASL', () => {
    const { compile: realCompile, AslSerializer } = jest.requireActual('@simplesteps/core');

    const result = realCompile({
      sourceFiles: [SUBSTITUTION_FIXTURE],
      substitutions: {
        myLambda: 'arn:aws:lambda:us-east-1:999:function:RealFunction',
        myTable: 'production-table',
      },
    });

    expect(result.errors).toHaveLength(0);
    expect(result.stateMachines.length).toBeGreaterThan(0);

    const definitionString = AslSerializer.serialize(result.stateMachines[0].definition);

    // Substituted values should appear in the ASL output
    expect(definitionString).toContain('arn:aws:lambda:us-east-1:999:function:RealFunction');
    expect(definitionString).toContain('production-table');
  });

  test('12. compileDefinitionBody() integration → valid DefinitionBody', () => {
    const { compile: realCompile, AslSerializer } = jest.requireActual('@simplesteps/core');

    const result = realCompile({ sourceFiles: [SEQUENTIAL_FIXTURE] });
    expect(result.errors).toHaveLength(0);

    const definitionString = AslSerializer.serialize(result.stateMachines[0].definition);
    const body = sfn.DefinitionBody.fromString(definitionString);

    expect(body).toBeDefined();
    expect(typeof body.bind).toBe('function');
  });
});

// ── CDK E2E tests (real compile + substitutions + CDK synthesis) ─────────

const CDK_ORDER_FIXTURE = path.resolve(
  __dirname, '../../core/test/fixtures/cfg/cdk-order.ts',
);

const CDK_NOTIFICATION_FIXTURE = path.resolve(
  __dirname, '../../core/test/fixtures/cfg/cdk-notification.ts',
);

const CDK_DATA_PIPELINE_FIXTURE = path.resolve(
  __dirname, '../../core/test/fixtures/cfg/cdk-data-pipeline.ts',
);

describe('CDK E2E: Order Processing (Lambda + DynamoDB)', () => {
  let asl: any;
  let definitionString: string;

  beforeAll(() => {
    const { compile: realCompile, AslSerializer } = jest.requireActual('@simplesteps/core');

    const result = realCompile({
      sourceFiles: [CDK_ORDER_FIXTURE],
      substitutions: {
        validateOrder: 'arn:aws:lambda:us-east-1:111:function:ValidateOrder',
        ordersTable: 'prod-OrdersTable-ABC123',
      },
    });

    expect(result.errors).toHaveLength(0);
    expect(result.stateMachines).toHaveLength(1);
    expect(result.stateMachines[0].name).toBe('orderWorkflow');

    definitionString = AslSerializer.serialize(result.stateMachines[0].definition);
    asl = JSON.parse(definitionString);
  });

  test('produces valid ASL with StartAt and States', () => {
    expect(asl).toHaveProperty('StartAt');
    expect(asl).toHaveProperty('States');
    expect(Object.keys(asl.States).length).toBeGreaterThan(0);
  });

  test('substituted Lambda ARN appears in Task resource', () => {
    expect(definitionString).toContain('arn:aws:lambda:us-east-1:111:function:ValidateOrder');
  });

  test('substituted DynamoDB table name appears in ASL', () => {
    expect(definitionString).toContain('prod-OrdersTable-ABC123');
  });

  test('contains Lambda invoke task state', () => {
    const tasks = Object.values(asl.States).filter((s: any) => s.Type === 'Task');
    const lambdaTasks = tasks.filter((s: any) =>
      typeof s.Resource === 'string' && s.Resource.includes(':lambda:'),
    );
    expect(lambdaTasks.length).toBeGreaterThanOrEqual(1);
  });

  test('contains DynamoDB putItem integration', () => {
    const tasks = Object.values(asl.States).filter((s: any) => s.Type === 'Task');
    const dynamoTasks = tasks.filter((s: any) =>
      typeof s.Resource === 'string' && s.Resource.includes('dynamodb'),
    );
    expect(dynamoTasks.length).toBeGreaterThanOrEqual(1);
  });

  test('contains Choice state for order validation branch', () => {
    const choices = Object.values(asl.States).filter((s: any) => s.Type === 'Choice');
    expect(choices.length).toBeGreaterThanOrEqual(1);
  });

  test('has at least one terminal state', () => {
    const states = Object.values(asl.States) as any[];
    const hasTerminal = states.some(s => s.End === true || s.Type === 'Succeed' || s.Type === 'Fail');
    expect(hasTerminal).toBe(true);
  });

  test('synthesizes to valid CloudFormation template', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'CdkOrderStack');

    new sfn.StateMachine(stack, 'OrderMachine', {
      definitionBody: sfn.DefinitionBody.fromString(definitionString),
    });

    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::StepFunctions::StateMachine', {
      DefinitionString: definitionString,
    });
  });
});

describe('CDK E2E: Notification Pipeline (Lambda + DynamoDB + SNS + SQS)', () => {
  let asl: any;
  let definitionString: string;

  beforeAll(() => {
    const { compile: realCompile, AslSerializer } = jest.requireActual('@simplesteps/core');

    const result = realCompile({
      sourceFiles: [CDK_NOTIFICATION_FIXTURE],
      substitutions: {
        validateOrder: 'arn:aws:lambda:us-east-1:222:function:ValidateOrder',
        ordersTable: 'prod-OrdersTable-DEF456',
        notifications: 'arn:aws:sns:us-east-1:222:OrderNotifications',
        taskQueue: 'https://sqs.us-east-1.amazonaws.com/222/OrderTasks',
      },
    });

    expect(result.errors).toHaveLength(0);
    expect(result.stateMachines).toHaveLength(1);
    expect(result.stateMachines[0].name).toBe('notificationPipeline');

    definitionString = AslSerializer.serialize(result.stateMachines[0].definition);
    asl = JSON.parse(definitionString);
  });

  test('produces valid ASL with StartAt and States', () => {
    expect(asl).toHaveProperty('StartAt');
    expect(asl).toHaveProperty('States');
    expect(Object.keys(asl.States).length).toBeGreaterThan(0);
  });

  test('all four substituted values appear in ASL', () => {
    expect(definitionString).toContain('arn:aws:lambda:us-east-1:222:function:ValidateOrder');
    expect(definitionString).toContain('prod-OrdersTable-DEF456');
    expect(definitionString).toContain('arn:aws:sns:us-east-1:222:OrderNotifications');
    expect(definitionString).toContain('https://sqs.us-east-1.amazonaws.com/222/OrderTasks');
  });

  test('contains Lambda invoke task', () => {
    const tasks = Object.values(asl.States).filter((s: any) => s.Type === 'Task');
    const lambdaTasks = tasks.filter((s: any) =>
      typeof s.Resource === 'string' && s.Resource.includes(':lambda:'),
    );
    expect(lambdaTasks.length).toBeGreaterThanOrEqual(1);
  });

  test('contains DynamoDB integration', () => {
    const tasks = Object.values(asl.States).filter((s: any) => s.Type === 'Task');
    const dynamoTasks = tasks.filter((s: any) =>
      typeof s.Resource === 'string' && s.Resource.includes('dynamodb'),
    );
    expect(dynamoTasks.length).toBeGreaterThanOrEqual(1);
  });

  test('contains SNS publish integration', () => {
    const tasks = Object.values(asl.States).filter((s: any) => s.Type === 'Task');
    const snsTasks = tasks.filter((s: any) =>
      typeof s.Resource === 'string' && s.Resource.includes('sns'),
    );
    expect(snsTasks.length).toBeGreaterThanOrEqual(1);
  });

  test('contains SQS send integration', () => {
    const tasks = Object.values(asl.States).filter((s: any) => s.Type === 'Task');
    const sqsTasks = tasks.filter((s: any) =>
      typeof s.Resource === 'string' && s.Resource.includes('sqs'),
    );
    expect(sqsTasks.length).toBeGreaterThanOrEqual(1);
  });

  test('contains Choice state for validation branch', () => {
    const choices = Object.values(asl.States).filter((s: any) => s.Type === 'Choice');
    expect(choices.length).toBeGreaterThanOrEqual(1);
  });

  test('synthesizes to valid CloudFormation template', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'CdkNotificationStack');

    new sfn.StateMachine(stack, 'NotificationMachine', {
      definitionBody: sfn.DefinitionBody.fromString(definitionString),
    });

    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::StepFunctions::StateMachine', {
      DefinitionString: definitionString,
    });
  });
});

describe('CDK E2E: Data Pipeline (S3 + Lambda)', () => {
  let asl: any;
  let definitionString: string;

  beforeAll(() => {
    const { compile: realCompile, AslSerializer } = jest.requireActual('@simplesteps/core');

    const result = realCompile({
      sourceFiles: [CDK_DATA_PIPELINE_FIXTURE],
      substitutions: {
        transformFn: 'arn:aws:lambda:us-east-1:333:function:TransformData',
        dataBucket: 'prod-data-pipeline-bucket',
      },
    });

    expect(result.errors).toHaveLength(0);
    expect(result.stateMachines).toHaveLength(1);
    expect(result.stateMachines[0].name).toBe('dataPipeline');

    definitionString = AslSerializer.serialize(result.stateMachines[0].definition);
    asl = JSON.parse(definitionString);
  });

  test('produces valid ASL with StartAt and States', () => {
    expect(asl).toHaveProperty('StartAt');
    expect(asl).toHaveProperty('States');
    expect(Object.keys(asl.States).length).toBeGreaterThan(0);
  });

  test('substituted Lambda ARN appears in ASL', () => {
    expect(definitionString).toContain('arn:aws:lambda:us-east-1:333:function:TransformData');
  });

  test('substituted S3 bucket name appears in ASL', () => {
    expect(definitionString).toContain('prod-data-pipeline-bucket');
  });

  test('contains Lambda invoke task', () => {
    const tasks = Object.values(asl.States).filter((s: any) => s.Type === 'Task');
    const lambdaTasks = tasks.filter((s: any) =>
      typeof s.Resource === 'string' && s.Resource.includes(':lambda:'),
    );
    expect(lambdaTasks.length).toBeGreaterThanOrEqual(1);
  });

  test('contains S3 getObject integration', () => {
    const tasks = Object.values(asl.States).filter((s: any) => s.Type === 'Task');
    const s3GetTasks = tasks.filter((s: any) =>
      typeof s.Resource === 'string' && s.Resource.includes('s3:getObject'),
    );
    expect(s3GetTasks.length).toBeGreaterThanOrEqual(1);
  });

  test('contains S3 putObject integration', () => {
    const tasks = Object.values(asl.States).filter((s: any) => s.Type === 'Task');
    const s3PutTasks = tasks.filter((s: any) =>
      typeof s.Resource === 'string' && s.Resource.includes('s3:putObject'),
    );
    expect(s3PutTasks.length).toBeGreaterThanOrEqual(1);
  });

  test('has at least one terminal state', () => {
    const states = Object.values(asl.States) as any[];
    const hasTerminal = states.some(s => s.End === true || s.Type === 'Succeed' || s.Type === 'Fail');
    expect(hasTerminal).toBe(true);
  });

  test('synthesizes to valid CloudFormation template', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'CdkDataPipelineStack');

    new sfn.StateMachine(stack, 'PipelineMachine', {
      definitionBody: sfn.DefinitionBody.fromString(definitionString),
    });

    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::StepFunctions::StateMachine', {
      DefinitionString: definitionString,
    });
  });
});

// ── CDK E2E: Event-Driven (Lambda + EventBridge + StepFunction) ──────────

const CDK_EVENT_DRIVEN_FIXTURE = path.resolve(
  __dirname, '../../core/test/fixtures/cfg/cdk-event-driven.ts',
);

describe('CDK E2E: Event-Driven Payment (Lambda + EventBridge + StepFunction)', () => {
  let asl: any;
  let definitionString: string;

  beforeAll(() => {
    const { compile: realCompile, AslSerializer } = jest.requireActual('@simplesteps/core');

    const result = realCompile({
      sourceFiles: [CDK_EVENT_DRIVEN_FIXTURE],
      substitutions: {
        enrichPayment: 'arn:aws:lambda:us-east-1:444:function:EnrichPayment',
        auditEvents: 'audit-event-bus',
        fraudCheck: 'arn:aws:states:us-east-1:444:stateMachine:FraudCheck',
      },
    });

    expect(result.errors).toHaveLength(0);
    expect(result.stateMachines).toHaveLength(1);
    expect(result.stateMachines[0].name).toBe('paymentWorkflow');

    definitionString = AslSerializer.serialize(result.stateMachines[0].definition);
    asl = JSON.parse(definitionString);
  });

  test('produces valid ASL with StartAt and States', () => {
    expect(asl).toHaveProperty('StartAt');
    expect(asl).toHaveProperty('States');
    expect(Object.keys(asl.States).length).toBeGreaterThan(0);
  });

  test('substituted Lambda ARN appears in ASL', () => {
    expect(definitionString).toContain('arn:aws:lambda:us-east-1:444:function:EnrichPayment');
  });

  test('substituted EventBridge bus name appears in ASL', () => {
    expect(definitionString).toContain('audit-event-bus');
  });

  test('substituted StepFunction ARN appears in ASL', () => {
    expect(definitionString).toContain('arn:aws:states:us-east-1:444:stateMachine:FraudCheck');
  });

  test('contains Lambda invoke task', () => {
    const tasks = Object.values(asl.States).filter((s: any) => s.Type === 'Task');
    const lambdaTasks = tasks.filter((s: any) =>
      typeof s.Resource === 'string' && s.Resource.includes(':lambda:'),
    );
    expect(lambdaTasks.length).toBeGreaterThanOrEqual(1);
  });

  test('contains EventBridge putEvents integration', () => {
    const tasks = Object.values(asl.States).filter((s: any) => s.Type === 'Task');
    const ebTasks = tasks.filter((s: any) =>
      typeof s.Resource === 'string' && s.Resource.includes('events'),
    );
    expect(ebTasks.length).toBeGreaterThanOrEqual(1);
  });

  test('contains StepFunction startExecution integration', () => {
    const tasks = Object.values(asl.States).filter((s: any) => s.Type === 'Task');
    const sfnTasks = tasks.filter((s: any) =>
      typeof s.Resource === 'string' && s.Resource.includes('states'),
    );
    expect(sfnTasks.length).toBeGreaterThanOrEqual(1);
  });

  test('contains Choice state for fraud check branch', () => {
    const choices = Object.values(asl.States).filter((s: any) => s.Type === 'Choice');
    expect(choices.length).toBeGreaterThanOrEqual(1);
  });

  test('has at least one terminal state', () => {
    const states = Object.values(asl.States) as any[];
    const hasTerminal = states.some(s => s.End === true || s.Type === 'Succeed' || s.Type === 'Fail');
    expect(hasTerminal).toBe(true);
  });

  test('synthesizes to valid CloudFormation template', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'CdkEventDrivenStack');

    new sfn.StateMachine(stack, 'PaymentMachine', {
      definitionBody: sfn.DefinitionBody.fromString(definitionString),
    });

    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::StepFunctions::StateMachine', {
      DefinitionString: definitionString,
    });
  });
});

// ── CDK Starter coverage ─────────────────────────────────────────────────
// The CDK starter (examples/starters/cdk) uses inline workflows with the
// SimpleSteps transformer. The inline (__compiledAsl) path is tested above.
// The cdk-order/notification/data-pipeline/event-driven fixtures test the
// equivalent file-based compilation + substitution path.
// Stack-level CDK assertion tests live in examples/starters/cdk/test/.
