import { LocalRunner, StateMachineError } from '../../src/index.js';
import type { StateMachineDefinition } from '@simplesteps/core/asl';

// ---------------------------------------------------------------------------
// Simple execute
// ---------------------------------------------------------------------------

describe('LocalRunner.execute', () => {
  it('executes a simple linear workflow', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'Step1',
      States: {
        Step1: {
          Type: 'Pass',
          Result: { status: 'processed' },
          Next: 'Step2',
        },
        Step2: {
          Type: 'Pass',
          Result: { done: true },
          End: true,
        },
      },
    };

    const runner = new LocalRunner(definition);
    const output = await runner.execute({ input: 'data' });
    expect(output).toEqual({ done: true });
  });

  it('executes with service mocks', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'CallLambda',
      States: {
        CallLambda: {
          Type: 'Task',
          Resource: 'arn:aws:lambda:us-east-1:123:function:process',
          End: true,
        },
      },
    };

    const runner = new LocalRunner(definition, {
      services: {
        'arn:aws:lambda:us-east-1:123:function:process': (input) => ({
          ...input,
          processed: true,
        }),
      },
    });

    const output = await runner.execute({ orderId: '123' });
    expect(output).toEqual({ orderId: '123', processed: true });
  });

  it('throws on Fail state', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'FailStep',
      States: {
        FailStep: {
          Type: 'Fail',
          Error: 'CustomError',
          Cause: 'Something went wrong',
        },
      },
    };

    const runner = new LocalRunner(definition);
    await expect(runner.execute()).rejects.toThrow('CustomError');
  });

  it('defaults input to empty object', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'Echo',
      States: {
        Echo: { Type: 'Pass', End: true },
      },
    };

    const runner = new LocalRunner(definition);
    const output = await runner.execute();
    expect(output).toEqual({});
  });

  it('respects maxSteps option', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'Loop',
      States: {
        Loop: { Type: 'Pass', Next: 'Loop' },
      },
    };

    const runner = new LocalRunner(definition, { maxSteps: 5 });
    await expect(runner.execute()).rejects.toThrow('maximum of 5');
  });
});

// ---------------------------------------------------------------------------
// executeWithTrace
// ---------------------------------------------------------------------------

describe('LocalRunner.executeWithTrace', () => {
  it('returns trace on success', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'A',
      States: {
        A: { Type: 'Pass', Result: 'a', Next: 'B' },
        B: { Type: 'Pass', Result: 'b', End: true },
      },
    };

    const runner = new LocalRunner(definition);
    const { output, trace } = await runner.executeWithTrace({});

    expect(output).toBe('b');
    expect(trace.totalSteps).toBe(2);
    expect(trace.states).toHaveLength(2);
    expect(trace.states[0].name).toBe('A');
    expect(trace.states[1].name).toBe('B');
    expect(trace.error).toBeUndefined();
    expect(trace.finalOutput).toBe('b');
  });

  it('does NOT throw on failure — records in trace', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'FailStep',
      States: {
        FailStep: {
          Type: 'Fail',
          Error: 'MyError',
          Cause: 'bad input',
        },
      },
    };

    const runner = new LocalRunner(definition);
    const { output, trace } = await runner.executeWithTrace({});

    expect(output).toBeUndefined();
    expect(trace.error).toEqual({
      name: 'MyError',
      message: 'bad input',
    });
    expect(trace.states).toHaveLength(1);
    expect(trace.states[0].error).toBeDefined();
  });

  it('records trace for multi-step workflow', async () => {
    const mock = jest.fn().mockReturnValue({ result: 'ok' });
    const definition: StateMachineDefinition = {
      StartAt: 'CallService',
      States: {
        CallService: {
          Type: 'Task',
          Resource: 'arn:aws:lambda:*',
          Next: 'Done',
        },
        Done: { Type: 'Succeed' },
      },
    };

    const runner = new LocalRunner(definition, {
      services: { 'arn:aws:lambda:*': mock },
    });
    const { trace } = await runner.executeWithTrace({ data: 'hello' });

    expect(trace.totalSteps).toBe(2);
    expect(trace.states[0].name).toBe('CallService');
    expect(trace.states[0].type).toBe('Task');
    expect(trace.states[1].name).toBe('Done');
    expect(trace.states[1].type).toBe('Succeed');
  });

  it('records trace when max steps exceeded', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'Loop',
      States: {
        Loop: { Type: 'Pass', Next: 'Loop' },
      },
    };

    const runner = new LocalRunner(definition, { maxSteps: 3 });
    const { output, trace } = await runner.executeWithTrace({});

    expect(output).toBeUndefined();
    expect(trace.error).toBeDefined();
    expect(trace.error!.name).toBe('States.Runtime');
    expect(trace.totalSteps).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// Context overrides
// ---------------------------------------------------------------------------

describe('Context overrides', () => {
  it('allows overriding execution name', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'Echo',
      States: {
        Echo: {
          Type: 'Pass',
          Parameters: {
            'name.$': '$$.Execution.Name',
          },
          End: true,
        },
      },
    };

    const runner = new LocalRunner(definition, {
      context: {
        Execution: { Name: 'my-custom-name' },
      },
    });

    const output = await runner.execute({});
    expect(output).toEqual({ name: 'my-custom-name' });
  });
});

// ---------------------------------------------------------------------------
// JSONata mode
// ---------------------------------------------------------------------------

describe('LocalRunner JSONata mode', () => {
  it('executes JSONata workflow end-to-end', async () => {
    const mock = jest.fn().mockReturnValue({ total: 250 });
    const definition: StateMachineDefinition = {
      QueryLanguage: 'JSONata',
      StartAt: 'CalculateTotal',
      States: {
        CalculateTotal: {
          Type: 'Task',
          Resource: 'arn:aws:lambda:*',
          Arguments: {
            orderId: '{% $states.input.orderId %}',
            items: '{% $states.input.items %}',
          },
          Assign: {
            calcResult: '{% $states.result %}',
          },
          Next: 'CheckThreshold',
        } as any,
        CheckThreshold: {
          Type: 'Choice',
          Choices: [
            {
              Condition: '{% $calcResult.total > 200 %}',
              Next: 'HighValue',
            },
          ],
          Default: 'NormalValue',
        } as any,
        HighValue: {
          Type: 'Pass',
          Output: {
            status: 'high-value',
            total: '{% $calcResult.total %}',
          },
          End: true,
        } as any,
        NormalValue: {
          Type: 'Pass',
          Output: {
            status: 'normal',
            total: '{% $calcResult.total %}',
          },
          End: true,
        } as any,
      },
    };

    const runner = new LocalRunner(definition, {
      services: { 'arn:aws:lambda:*': mock },
    });

    const output = await runner.execute({ orderId: 'ORD-1', items: [1, 2, 3] });
    expect(output).toEqual({ status: 'high-value', total: 250 });
  });

  it('executeWithTrace works in JSONata mode', async () => {
    const definition: StateMachineDefinition = {
      QueryLanguage: 'JSONata',
      StartAt: 'Step1',
      States: {
        Step1: {
          Type: 'Pass',
          Output: '{% $states.input.value * 2 %}',
          End: true,
        } as any,
      },
    };

    const runner = new LocalRunner(definition);
    const { output, trace } = await runner.executeWithTrace({ value: 21 });
    expect(output).toBe(42);
    expect(trace.totalSteps).toBe(1);
    expect(trace.error).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Complex workflows
// ---------------------------------------------------------------------------

describe('Complex workflow patterns', () => {
  it('try-catch-finally pattern', async () => {
    let callCount = 0;
    const riskyMock = jest.fn().mockImplementation(() => {
      callCount++;
      if (callCount <= 2) throw new StateMachineError('TransientError', 'service busy');
      return { data: 'success' };
    });

    const definition: StateMachineDefinition = {
      StartAt: 'RiskyCall',
      States: {
        RiskyCall: {
          Type: 'Task',
          Resource: 'arn:aws:lambda:us-east-1:123:function:risky',
          Retry: [{ ErrorEquals: ['TransientError'], MaxAttempts: 3 }],
          Catch: [{
            ErrorEquals: ['States.ALL'],
            Next: 'HandleError',
            ResultPath: '$.error',
          }],
          Next: 'Cleanup',
        },
        HandleError: {
          Type: 'Pass',
          Next: 'Cleanup',
        },
        Cleanup: {
          Type: 'Pass',
          Result: { cleaned: true },
          End: true,
        },
      },
    };

    const runner = new LocalRunner(definition, {
      services: { 'arn:aws:lambda:us-east-1:123:function:risky': riskyMock },
    });

    const output = await runner.execute({});
    expect(output).toEqual({ cleaned: true });
    // 2 failures + 1 success = 3 calls
    expect(riskyMock).toHaveBeenCalledTimes(3);
  });

  it('parallel fan-out fan-in', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'FanOut',
      States: {
        FanOut: {
          Type: 'Parallel',
          Branches: [
            {
              StartAt: 'A',
              States: {
                A: { Type: 'Task', Resource: 'arn:aws:lambda:*', End: true },
              },
            },
            {
              StartAt: 'B',
              States: {
                B: { Type: 'Task', Resource: 'arn:aws:lambda:*', End: true },
              },
            },
            {
              StartAt: 'C',
              States: {
                C: { Type: 'Task', Resource: 'arn:aws:lambda:*', End: true },
              },
            },
          ],
          End: true,
        },
      },
    };

    let callIndex = 0;
    const mock = jest.fn().mockImplementation((input: any) => {
      callIndex++;
      return { index: callIndex, input };
    });

    const runner = new LocalRunner(definition, {
      services: { 'arn:aws:lambda:*': mock },
    });

    const output = await runner.execute({ shared: true });
    expect(output).toHaveLength(3);
    expect(mock).toHaveBeenCalledTimes(3);
  });
});
