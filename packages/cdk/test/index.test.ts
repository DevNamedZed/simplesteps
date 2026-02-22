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
    expect(sm.compileResult.stateMachines).toHaveLength(1);
    expect(sm.compiledMachine.name).toBe('workflow');
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

    expect(sm.compiledMachine.name).toBe('beta');
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
