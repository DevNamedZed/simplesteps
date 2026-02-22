import type {
  StateMachineDefinition,
  TaskState,
  PassState,
  ChoiceState,
  WaitState,
  FailState,
  ParallelState,
  MapState,
  SucceedState,
  RetryRule,
  CatchRule,
  ComparisonRule,
  NotRule,
  AndRule,
  OrRule,
} from '@simplesteps/core';

describe('ASL type definitions', () => {
  it('should allow constructing a minimal state machine', () => {
    const def: StateMachineDefinition = {
      StartAt: 'Hello',
      States: {
        Hello: { Type: 'Pass', End: true } as PassState,
      },
    };

    expect(def.StartAt).toBe('Hello');
    expect(Object.keys(def.States)).toHaveLength(1);
  });

  it('should allow constructing a Task state', () => {
    const state: TaskState = {
      Type: 'Task',
      Resource: 'arn:aws:lambda:us-east-1:123456789:function:MyFunc',
      Next: 'Done',
    };

    expect(state.Type).toBe('Task');
    expect(state.Resource).toContain('lambda');
  });

  it('should allow constructing a Task state with Retry and Catch', () => {
    const retry: RetryRule = {
      ErrorEquals: ['States.TaskFailed'],
      IntervalSeconds: 1,
      MaxAttempts: 3,
      BackoffRate: 2.0,
    };

    const catchRule: CatchRule = {
      ErrorEquals: ['States.ALL'],
      Next: 'HandleError',
    };

    const state: TaskState = {
      Type: 'Task',
      Resource: 'arn:aws:lambda:us-east-1:123456789:function:MyFunc',
      Retry: [retry],
      Catch: [catchRule],
      End: true,
    };

    expect(state.Retry).toHaveLength(1);
    expect(state.Catch).toHaveLength(1);
    expect(state.Catch![0].Next).toBe('HandleError');
  });

  it('should allow constructing a Pass state with Result', () => {
    const state: PassState = {
      Type: 'Pass',
      Result: { message: 'Hello World' },
      ResultPath: '$.greeting',
      Next: 'Done',
    };

    expect(state.Type).toBe('Pass');
    expect(state.Result).toEqual({ message: 'Hello World' });
  });

  it('should allow constructing a Choice state with comparison rules', () => {
    const rule: ComparisonRule = {
      Variable: '$.status',
      StringEquals: 'active',
      Next: 'ProcessActive',
    };

    const state: ChoiceState = {
      Type: 'Choice',
      Choices: [rule],
      Default: 'HandleDefault',
    };

    expect(state.Type).toBe('Choice');
    expect(state.Choices).toHaveLength(1);
  });

  it('should allow constructing a Choice state with Not/And/Or rules', () => {
    const notRule: NotRule = {
      Not: { Variable: '$.x', NumericEquals: 0, Next: '' },
      Next: 'NonZero',
    };

    const andRule: AndRule = {
      And: [
        { Variable: '$.a', NumericGreaterThan: 0, Next: '' },
        { Variable: '$.b', NumericLessThan: 100, Next: '' },
      ],
      Next: 'InRange',
    };

    const orRule: OrRule = {
      Or: [
        { Variable: '$.status', StringEquals: 'active', Next: '' },
        { Variable: '$.status', StringEquals: 'pending', Next: '' },
      ],
      Next: 'Process',
    };

    const state: ChoiceState = {
      Type: 'Choice',
      Choices: [notRule, andRule, orRule],
    };

    expect(state.Choices).toHaveLength(3);
  });

  it('should allow constructing a Wait state', () => {
    const state: WaitState = {
      Type: 'Wait',
      Seconds: 10,
      Next: 'Continue',
    };

    expect(state.Type).toBe('Wait');
    expect(state.Seconds).toBe(10);
  });

  it('should allow constructing a Fail state', () => {
    const state: FailState = {
      Type: 'Fail',
      Error: 'CustomError',
      Cause: 'Something went wrong',
    };

    expect(state.Type).toBe('Fail');
    expect(state.Error).toBe('CustomError');
  });

  it('should allow constructing a Succeed state', () => {
    const state: SucceedState = {
      Type: 'Succeed',
      Comment: 'All done',
    };

    expect(state.Type).toBe('Succeed');
  });

  it('should allow constructing a Parallel state', () => {
    const state: ParallelState = {
      Type: 'Parallel',
      Branches: [
        {
          StartAt: 'Branch1',
          States: { Branch1: { Type: 'Pass', End: true } as PassState },
        },
        {
          StartAt: 'Branch2',
          States: { Branch2: { Type: 'Pass', End: true } as PassState },
        },
      ],
      End: true,
    };

    expect(state.Branches).toHaveLength(2);
  });

  it('should allow constructing a Map state', () => {
    const state: MapState = {
      Type: 'Map',
      ItemsPath: '$.items',
      ItemProcessor: {
        StartAt: 'ProcessItem',
        States: {
          ProcessItem: {
            Type: 'Task',
            Resource: 'arn:aws:lambda:us-east-1:123:function:Process',
            End: true,
          } as TaskState,
        },
      },
      MaxConcurrency: 10,
      End: true,
    };

    expect(state.Type).toBe('Map');
    expect(state.MaxConcurrency).toBe(10);
  });

  it('should allow constructing a full state machine definition', () => {
    const def: StateMachineDefinition = {
      Comment: 'Order processing workflow',
      StartAt: 'ValidateOrder',
      TimeoutSeconds: 300,
      States: {
        ValidateOrder: {
          Type: 'Task',
          Resource: 'arn:aws:lambda:us-east-1:123:function:Validate',
          Next: 'CheckResult',
        } as TaskState,
        CheckResult: {
          Type: 'Choice',
          Choices: [
            { Variable: '$.valid', BooleanEquals: true, Next: 'ProcessOrder' },
          ],
          Default: 'RejectOrder',
        } as ChoiceState,
        ProcessOrder: {
          Type: 'Task',
          Resource: 'arn:aws:lambda:us-east-1:123:function:Process',
          End: true,
        } as TaskState,
        RejectOrder: {
          Type: 'Fail',
          Error: 'ValidationError',
          Cause: 'Order validation failed',
        } as FailState,
      },
    };

    expect(Object.keys(def.States)).toHaveLength(4);
    expect(def.StartAt).toBe('ValidateOrder');
  });
});
