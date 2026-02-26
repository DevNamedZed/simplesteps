import { evaluateJsonata, evaluateJsonataPayload, evaluateAssign, isJsonataExpr } from '../../src/jsonata.js';
import { interpret, createDefaultContext } from '../../src/interpreter.js';
import { StateMachineError } from '../../src/errors.js';
import type { RunnerOptions } from '../../src/types.js';
import type { StateMachineDefinition } from '@simplesteps/core/asl';

function makeOptions(overrides?: Partial<RunnerOptions>): RunnerOptions {
  return { services: {}, ...overrides };
}

// ---------------------------------------------------------------------------
// Low-level evaluator
// ---------------------------------------------------------------------------

describe('evaluateJsonata', () => {
  it('evaluates simple expression', async () => {
    const result = await evaluateJsonata('{% 1 + 2 %}', { input: {}, context: {} as any }, {});
    expect(result).toBe(3);
  });

  it('accesses $states.input', async () => {
    const result = await evaluateJsonata(
      '{% $states.input.name %}',
      { input: { name: 'Alice' }, context: {} as any },
      {},
    );
    expect(result).toBe('Alice');
  });

  it('accesses scope variables', async () => {
    const result = await evaluateJsonata(
      '{% $orderId %}',
      { input: {}, context: {} as any },
      { orderId: 'ORD-123' },
    );
    expect(result).toBe('ORD-123');
  });

  it('evaluates boolean expression', async () => {
    const result = await evaluateJsonata(
      '{% $status = "active" %}',
      { input: {}, context: {} as any },
      { status: 'active' },
    );
    expect(result).toBe(true);
  });

  it('evaluates compound condition', async () => {
    const result = await evaluateJsonata(
      '{% ($status = "active") and ($priority > 5) %}',
      { input: {}, context: {} as any },
      { status: 'active', priority: 10 },
    );
    expect(result).toBe(true);
  });

  it('accesses $states.result', async () => {
    const result = await evaluateJsonata(
      '{% $states.result.count %}',
      { input: {}, context: {} as any, result: { count: 42 } },
      {},
    );
    expect(result).toBe(42);
  });
});

describe('evaluateJsonataPayload', () => {
  it('resolves object with mixed expressions and literals', async () => {
    const payload = {
      orderId: '{% $orderId %}',
      source: 'batch',
      nested: {
        value: '{% $states.input.amount %}',
      },
    };
    const result = await evaluateJsonataPayload(
      payload,
      { input: { amount: 100 }, context: {} as any },
      { orderId: 'ORD-1' },
    );
    expect(result).toEqual({
      orderId: 'ORD-1',
      source: 'batch',
      nested: { value: 100 },
    });
  });

  it('returns literal values unchanged', async () => {
    expect(await evaluateJsonataPayload(42, { input: {}, context: {} as any }, {})).toBe(42);
    expect(await evaluateJsonataPayload(true, { input: {}, context: {} as any }, {})).toBe(true);
    expect(await evaluateJsonataPayload(null, { input: {}, context: {} as any }, {})).toBeNull();
  });

  it('evaluates string expression as top-level value', async () => {
    const result = await evaluateJsonataPayload(
      '{% $states.result %}',
      { input: {}, context: {} as any, result: { data: 'hello' } },
      {},
    );
    expect(result).toEqual({ data: 'hello' });
  });
});

describe('evaluateAssign', () => {
  it('evaluates assign block', async () => {
    const assign = {
      orderId: '{% $states.result.id %}',
      status: '{% $states.result.status %}',
    };
    const bindings = await evaluateAssign(
      assign,
      { input: {}, context: {} as any, result: { id: 'X', status: 'done' } },
      {},
    );
    expect(bindings).toEqual({ orderId: 'X', status: 'done' });
  });
});

describe('isJsonataExpr', () => {
  it('detects JSONata expression', () => {
    expect(isJsonataExpr('{% $foo %}')).toBe(true);
    expect(isJsonataExpr('{%$foo%}')).toBe(true);
    expect(isJsonataExpr('plain string')).toBe(false);
    expect(isJsonataExpr('$.path')).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// JSONata mode: interpreter integration
// ---------------------------------------------------------------------------

describe('JSONata mode interpreter', () => {
  it('executes Pass state with Output', async () => {
    const definition: StateMachineDefinition = {
      QueryLanguage: 'JSONata',
      StartAt: 'SetOutput',
      States: {
        SetOutput: {
          Type: 'Pass',
          Output: {
            greeting: '{% "Hello " & $states.input.name %}',
          },
          End: true,
        } as any,
      },
    };

    const context = createDefaultContext({});
    const output = await interpret(definition, { name: 'World' }, context, makeOptions(), { count: 0, max: 100 });
    expect(output).toEqual({ greeting: 'Hello World' });
  });

  it('executes Task state with Arguments and Assign', async () => {
    const mock = jest.fn().mockReturnValue({ orderId: 'ORD-1', total: 100 });
    const definition: StateMachineDefinition = {
      QueryLanguage: 'JSONata',
      StartAt: 'CallService',
      States: {
        CallService: {
          Type: 'Task',
          Resource: 'arn:aws:lambda:*',
          Arguments: {
            id: '{% $states.input.id %}',
            mode: 'express',
          },
          Assign: {
            result: '{% $states.result %}',
          },
          Next: 'ReturnResult',
        } as any,
        ReturnResult: {
          Type: 'Pass',
          Output: '{% $result %}',
          End: true,
        } as any,
      },
    };

    const context = createDefaultContext({});
    const options = makeOptions({ services: { 'arn:aws:lambda:*': mock } });
    const output = await interpret(definition, { id: 'X' }, context, options, { count: 0, max: 100 });
    expect(mock).toHaveBeenCalledWith({ id: 'X', mode: 'express' }, expect.any(Object));
    expect(output).toEqual({ orderId: 'ORD-1', total: 100 });
  });

  it('executes Choice state with Condition', async () => {
    const definition: StateMachineDefinition = {
      QueryLanguage: 'JSONata',
      StartAt: 'CheckStatus',
      States: {
        CheckStatus: {
          Type: 'Choice',
          Choices: [
            {
              Condition: '{% $states.input.status = "active" %}',
              Next: 'Active',
            },
          ],
          Default: 'Inactive',
        } as any,
        Active: {
          Type: 'Pass',
          Output: { result: 'active' },
          End: true,
        } as any,
        Inactive: {
          Type: 'Pass',
          Output: { result: 'inactive' },
          End: true,
        } as any,
      },
    };

    const context = createDefaultContext({});
    const options = makeOptions();

    const activeOutput = await interpret(definition, { status: 'active' }, context, options, { count: 0, max: 100 });
    expect(activeOutput).toEqual({ result: 'active' });

    const inactiveOutput = await interpret(definition, { status: 'pending' }, context, options, { count: 0, max: 100 });
    expect(inactiveOutput).toEqual({ result: 'inactive' });
  });

  it('variables persist across states via Assign', async () => {
    const mockA = jest.fn().mockReturnValue({ data: 'fromA' });
    const mockB = jest.fn().mockReturnValue({ data: 'fromB' });
    const definition: StateMachineDefinition = {
      QueryLanguage: 'JSONata',
      StartAt: 'StepA',
      States: {
        StepA: {
          Type: 'Task',
          Resource: 'arn:aws:lambda:us-east-1:123:function:a',
          Assign: { resultA: '{% $states.result %}' },
          Next: 'StepB',
        } as any,
        StepB: {
          Type: 'Task',
          Resource: 'arn:aws:lambda:us-east-1:123:function:b',
          Arguments: { fromA: '{% $resultA.data %}' },
          Assign: { resultB: '{% $states.result %}' },
          Next: 'Final',
        } as any,
        Final: {
          Type: 'Pass',
          Output: {
            a: '{% $resultA.data %}',
            b: '{% $resultB.data %}',
          },
          End: true,
        } as any,
      },
    };

    const context = createDefaultContext({});
    const options = makeOptions({
      services: {
        'arn:aws:lambda:us-east-1:123:function:a': mockA,
        'arn:aws:lambda:us-east-1:123:function:b': mockB,
      },
    });

    const output = await interpret(definition, {}, context, options, { count: 0, max: 100 });
    expect(mockB).toHaveBeenCalledWith({ fromA: 'fromA' }, expect.any(Object));
    expect(output).toEqual({ a: 'fromA', b: 'fromB' });
  });

  it('executes Parallel with Assign destructuring', async () => {
    const definition: StateMachineDefinition = {
      QueryLanguage: 'JSONata',
      StartAt: 'ParallelStep',
      States: {
        ParallelStep: {
          Type: 'Parallel',
          Branches: [
            {
              QueryLanguage: 'JSONata',
              StartAt: 'BranchA',
              States: {
                BranchA: {
                  Type: 'Pass',
                  Output: { branch: 'A' },
                  End: true,
                } as any,
              },
            },
            {
              QueryLanguage: 'JSONata',
              StartAt: 'BranchB',
              States: {
                BranchB: {
                  Type: 'Pass',
                  Output: { branch: 'B' },
                  End: true,
                } as any,
              },
            },
          ],
          Assign: {
            first: '{% $states.result[0] %}',
            second: '{% $states.result[1] %}',
          },
          Next: 'Final',
        } as any,
        Final: {
          Type: 'Pass',
          Output: {
            firstBranch: '{% $first.branch %}',
            secondBranch: '{% $second.branch %}',
          },
          End: true,
        } as any,
      },
    };

    const context = createDefaultContext({});
    const output = await interpret(definition, {}, context, makeOptions(), { count: 0, max: 100 });
    expect(output).toEqual({ firstBranch: 'A', secondBranch: 'B' });
  });

  it('executes Map with Items expression', async () => {
    const definition: StateMachineDefinition = {
      QueryLanguage: 'JSONata',
      StartAt: 'MapStep',
      States: {
        MapStep: {
          Type: 'Map',
          Items: '{% $states.input.items %}',
          ItemProcessor: {
            QueryLanguage: 'JSONata',
            StartAt: 'ProcessItem',
            States: {
              ProcessItem: {
                Type: 'Pass',
                Output: {
                  processed: true,
                  value: '{% $states.input %}',
                },
                End: true,
              } as any,
            },
          },
          End: true,
        } as any,
      },
    };

    const context = createDefaultContext({});
    const output = await interpret(
      definition,
      { items: ['a', 'b', 'c'] },
      context, makeOptions(), { count: 0, max: 100 },
    );
    expect(output).toEqual([
      { processed: true, value: 'a' },
      { processed: true, value: 'b' },
      { processed: true, value: 'c' },
    ]);
  });

  it('handles Fail with JSONata expression in Cause', async () => {
    const definition: StateMachineDefinition = {
      QueryLanguage: 'JSONata',
      StartAt: 'FailState',
      States: {
        FailState: {
          Type: 'Fail',
          Error: 'CustomError',
          Cause: '{% "Failed for order: " & $states.input.orderId %}',
        } as any,
      },
    };

    const context = createDefaultContext({});
    await expect(
      interpret(definition, { orderId: 'ORD-42' }, context, makeOptions(), { count: 0, max: 100 }),
    ).rejects.toThrow('Failed for order: ORD-42');
  });

  it('Succeed with Output', async () => {
    const definition: StateMachineDefinition = {
      QueryLanguage: 'JSONata',
      StartAt: 'DoneState',
      States: {
        DoneState: {
          Type: 'Succeed',
          Output: '{% $states.input.result %}',
        } as any,
      },
    };

    const context = createDefaultContext({});
    const output = await interpret(definition, { result: 'success' }, context, makeOptions(), { count: 0, max: 100 });
    expect(output).toBe('success');
  });
});
