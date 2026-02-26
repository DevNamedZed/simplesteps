import { executeTaskState, resolveService } from '../../src/stateHandlers.js';
import { StateMachineError } from '../../src/errors.js';
import type { ContextObject, RunnerOptions } from '../../src/types.js';
import type { TaskState } from '@simplesteps/core/asl';

const ctx: ContextObject = {
  Execution: { Id: 'test', Name: 'run-1', StartTime: '2024-01-01T00:00:00Z', RoleArn: 'test', Input: {}, RedriveCount: 0, RedriveStatus: 'NOT_REDRIVABLE' },
  State: { Name: 'TestState', EnteredTime: '2024-01-01T00:00:00Z', RetryCount: 0 },
  StateMachine: { Id: 'test', Name: 'test' },
  Map: { Item: { Index: 0, Value: null } },
};

function makeOptions(overrides?: Partial<RunnerOptions>): RunnerOptions {
  return {
    services: {},
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// resolveService
// ---------------------------------------------------------------------------

describe('resolveService', () => {
  it('resolves exact match', () => {
    const mock = jest.fn();
    const services = { 'arn:aws:lambda:us-east-1:123:function:myFn': mock };
    expect(resolveService('arn:aws:lambda:us-east-1:123:function:myFn', services)).toBe(mock);
  });

  it('resolves glob pattern', () => {
    const mock = jest.fn();
    const services = { 'arn:aws:lambda:*': mock };
    expect(resolveService('arn:aws:lambda:us-east-1:123:function:myFn', services)).toBe(mock);
  });

  it('exact match takes priority over glob', () => {
    const exactMock = jest.fn().mockReturnValue('exact');
    const globMock = jest.fn().mockReturnValue('glob');
    const services = {
      'arn:aws:lambda:*': globMock,
      'arn:aws:lambda:us-east-1:123:function:myFn': exactMock,
    };
    expect(resolveService('arn:aws:lambda:us-east-1:123:function:myFn', services)).toBe(exactMock);
  });

  it('returns undefined when no match', () => {
    const services = { 'arn:aws:s3:*': jest.fn() };
    expect(resolveService('arn:aws:lambda:us-east-1:123:function:myFn', services)).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Task state: basic execution
// ---------------------------------------------------------------------------

describe('executeTaskState', () => {
  it('calls mock and returns result', async () => {
    const mock = jest.fn().mockReturnValue({ result: 'ok' });
    const state: TaskState = {
      Type: 'Task',
      Resource: 'arn:aws:lambda:us-east-1:123:function:myFn',
      End: true,
    };
    const options = makeOptions({
      services: { 'arn:aws:lambda:us-east-1:123:function:myFn': mock },
    });

    const result = await executeTaskState(state, 'CallLambda', { input: 'data' }, ctx, options);
    expect(mock).toHaveBeenCalledWith({ input: 'data' }, { stateName: 'CallLambda', resource: 'arn:aws:lambda:us-east-1:123:function:myFn' });
    expect(result.output).toEqual({ result: 'ok' });
    expect(result.nextState).toBeNull();
  });

  it('throws when no mock registered', async () => {
    const state: TaskState = {
      Type: 'Task',
      Resource: 'arn:aws:lambda:us-east-1:123:function:missing',
      End: true,
    };
    const options = makeOptions();

    await expect(
      executeTaskState(state, 'CallLambda', {}, ctx, options),
    ).rejects.toThrow('No mock registered');
  });

  it('applies full data flow pipeline', async () => {
    const mock = jest.fn().mockReturnValue({ status: 'processed' });
    const state: TaskState = {
      Type: 'Task',
      Resource: 'arn:aws:lambda:*',
      InputPath: '$.order',
      Parameters: { 'orderId.$': '$.id', source: 'test' } as any,
      ResultSelector: { 'taskResult.$': '$.status' } as any,
      ResultPath: '$.taskOutput',
      OutputPath: '$.taskOutput',
      End: true,
    };
    const options = makeOptions({
      services: { 'arn:aws:lambda:*': mock },
    });

    const input = { order: { id: 'ORD-123', amount: 50 }, customer: 'Alice' };
    const result = await executeTaskState(state, 'Process', input, ctx, options);

    // Mock should receive parameterized input
    expect(mock).toHaveBeenCalledWith(
      { orderId: 'ORD-123', source: 'test' },
      expect.any(Object),
    );

    // ResultSelector reshapes result, ResultPath merges into original input,
    // OutputPath selects from merged
    expect(result.output).toEqual({ taskResult: 'processed' });
  });

  it('transitions to Next state', async () => {
    const mock = jest.fn().mockReturnValue({});
    const state: TaskState = {
      Type: 'Task',
      Resource: 'arn:aws:lambda:*',
      Next: 'NextStep',
    };
    const options = makeOptions({
      services: { 'arn:aws:lambda:*': mock },
    });

    const result = await executeTaskState(state, 'Step1', {}, ctx, options);
    expect(result.nextState).toBe('NextStep');
  });

  it('handles async mock functions', async () => {
    const mock = jest.fn().mockResolvedValue({ async: true });
    const state: TaskState = {
      Type: 'Task',
      Resource: 'arn:aws:lambda:*',
      End: true,
    };
    const options = makeOptions({
      services: { 'arn:aws:lambda:*': mock },
    });

    const result = await executeTaskState(state, 'AsyncCall', {}, ctx, options);
    expect(result.output).toEqual({ async: true });
  });
});

// ---------------------------------------------------------------------------
// Retry logic
// ---------------------------------------------------------------------------

describe('Task retry', () => {
  it('retries on matching error and succeeds', async () => {
    let callCount = 0;
    const mock = jest.fn().mockImplementation(() => {
      callCount++;
      if (callCount < 3) throw new StateMachineError('TransientError', 'temporary');
      return { success: true };
    });

    const state: TaskState = {
      Type: 'Task',
      Resource: 'arn:aws:lambda:*',
      Retry: [{ ErrorEquals: ['TransientError'], MaxAttempts: 3 }],
      End: true,
    };
    const options = makeOptions({
      services: { 'arn:aws:lambda:*': mock },
    });

    const result = await executeTaskState(state, 'RetryTask', {}, ctx, options);
    expect(result.output).toEqual({ success: true });
    expect(mock).toHaveBeenCalledTimes(3);
  });

  it('exhausts retries and throws', async () => {
    const mock = jest.fn().mockImplementation(() => {
      throw new StateMachineError('PermanentError', 'always fails');
    });

    const state: TaskState = {
      Type: 'Task',
      Resource: 'arn:aws:lambda:*',
      Retry: [{ ErrorEquals: ['PermanentError'], MaxAttempts: 2 }],
      End: true,
    };
    const options = makeOptions({
      services: { 'arn:aws:lambda:*': mock },
    });

    await expect(
      executeTaskState(state, 'RetryTask', {}, ctx, options),
    ).rejects.toThrow('PermanentError');
    // 1 initial + 2 retries = 3 calls
    expect(mock).toHaveBeenCalledTimes(3);
  });

  it('States.ALL catches any error', async () => {
    let callCount = 0;
    const mock = jest.fn().mockImplementation(() => {
      callCount++;
      if (callCount === 1) throw new Error('random error');
      return { ok: true };
    });

    const state: TaskState = {
      Type: 'Task',
      Resource: 'arn:aws:lambda:*',
      Retry: [{ ErrorEquals: ['States.ALL'], MaxAttempts: 2 }],
      End: true,
    };
    const options = makeOptions({
      services: { 'arn:aws:lambda:*': mock },
    });

    const result = await executeTaskState(state, 'RetryAll', {}, ctx, options);
    expect(result.output).toEqual({ ok: true });
    expect(mock).toHaveBeenCalledTimes(2);
  });

  it('does not retry on non-matching error', async () => {
    const mock = jest.fn().mockImplementation(() => {
      throw new StateMachineError('WrongError', 'not retryable');
    });

    const state: TaskState = {
      Type: 'Task',
      Resource: 'arn:aws:lambda:*',
      Retry: [{ ErrorEquals: ['SomeOtherError'], MaxAttempts: 3 }],
      End: true,
    };
    const options = makeOptions({
      services: { 'arn:aws:lambda:*': mock },
    });

    await expect(
      executeTaskState(state, 'NoMatch', {}, ctx, options),
    ).rejects.toThrow('WrongError');
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('uses default MaxAttempts of 3', async () => {
    const mock = jest.fn().mockImplementation(() => {
      throw new StateMachineError('Err', 'fail');
    });

    const state: TaskState = {
      Type: 'Task',
      Resource: 'arn:aws:lambda:*',
      Retry: [{ ErrorEquals: ['Err'] }],
      End: true,
    };
    const options = makeOptions({
      services: { 'arn:aws:lambda:*': mock },
    });

    await expect(
      executeTaskState(state, 'DefaultMax', {}, ctx, options),
    ).rejects.toThrow('Err');
    // 1 initial + 3 retries = 4 calls
    expect(mock).toHaveBeenCalledTimes(4);
  });

  it('updates context.State.RetryCount', async () => {
    let capturedRetryCount = -1;
    let callCount = 0;
    const mock = jest.fn().mockImplementation(() => {
      callCount++;
      if (callCount < 3) throw new StateMachineError('Err', 'fail');
      capturedRetryCount = testCtx.State.RetryCount;
      return { ok: true };
    });

    const testCtx = { ...ctx, State: { ...ctx.State } };
    const state: TaskState = {
      Type: 'Task',
      Resource: 'arn:aws:lambda:*',
      Retry: [{ ErrorEquals: ['Err'], MaxAttempts: 3 }],
      End: true,
    };
    const options = makeOptions({
      services: { 'arn:aws:lambda:*': mock },
    });

    await executeTaskState(state, 'RetryCount', {}, testCtx, options);
    expect(capturedRetryCount).toBe(2); // 2 retries occurred
  });
});

// ---------------------------------------------------------------------------
// Catch logic
// ---------------------------------------------------------------------------

describe('Task catch', () => {
  it('catches matching error and transitions', async () => {
    const mock = jest.fn().mockImplementation(() => {
      throw new StateMachineError('ValidationError', 'invalid input');
    });

    const state: TaskState = {
      Type: 'Task',
      Resource: 'arn:aws:lambda:*',
      Catch: [{ ErrorEquals: ['ValidationError'], Next: 'HandleError' }],
      End: true,
    };
    const options = makeOptions({
      services: { 'arn:aws:lambda:*': mock },
    });

    const result = await executeTaskState(state, 'CatchTask', { original: 'data' }, ctx, options);
    expect(result.nextState).toBe('HandleError');
    expect(result.output).toEqual({ Error: 'ValidationError', Cause: 'invalid input' });
  });

  it('catch with ResultPath merges error into state data', async () => {
    const mock = jest.fn().mockImplementation(() => {
      throw new StateMachineError('ProcessError', 'failed to process');
    });

    const state: TaskState = {
      Type: 'Task',
      Resource: 'arn:aws:lambda:*',
      Catch: [{
        ErrorEquals: ['ProcessError'],
        Next: 'HandleError',
        ResultPath: '$.errorInfo',
      }],
      End: true,
    };
    const options = makeOptions({
      services: { 'arn:aws:lambda:*': mock },
    });

    const result = await executeTaskState(state, 'CatchRP', { orderId: '123' }, ctx, options);
    expect(result.nextState).toBe('HandleError');
    expect(result.output).toEqual({
      orderId: '123',
      errorInfo: { Error: 'ProcessError', Cause: 'failed to process' },
    });
  });

  it('catch with ResultPath null discards error', async () => {
    const mock = jest.fn().mockImplementation(() => {
      throw new StateMachineError('Err', 'fail');
    });

    const state: TaskState = {
      Type: 'Task',
      Resource: 'arn:aws:lambda:*',
      Catch: [{
        ErrorEquals: ['Err'],
        Next: 'Fallback',
        ResultPath: null,
      }],
      End: true,
    };
    const options = makeOptions({
      services: { 'arn:aws:lambda:*': mock },
    });

    const result = await executeTaskState(state, 'CatchNull', { keep: 'me' }, ctx, options);
    expect(result.nextState).toBe('Fallback');
    expect(result.output).toEqual({ keep: 'me' });
  });

  it('propagates error when no catch matches', async () => {
    const mock = jest.fn().mockImplementation(() => {
      throw new StateMachineError('UnexpectedError', 'oops');
    });

    const state: TaskState = {
      Type: 'Task',
      Resource: 'arn:aws:lambda:*',
      Catch: [{ ErrorEquals: ['DifferentError'], Next: 'Handler' }],
      End: true,
    };
    const options = makeOptions({
      services: { 'arn:aws:lambda:*': mock },
    });

    await expect(
      executeTaskState(state, 'NoCatch', {}, ctx, options),
    ).rejects.toThrow('UnexpectedError');
  });

  it('States.ALL in catch matches any error', async () => {
    const mock = jest.fn().mockImplementation(() => {
      throw new Error('anything');
    });

    const state: TaskState = {
      Type: 'Task',
      Resource: 'arn:aws:lambda:*',
      Catch: [{ ErrorEquals: ['States.ALL'], Next: 'CatchAll' }],
      End: true,
    };
    const options = makeOptions({
      services: { 'arn:aws:lambda:*': mock },
    });

    const result = await executeTaskState(state, 'CatchAll', {}, ctx, options);
    expect(result.nextState).toBe('CatchAll');
  });
});

// ---------------------------------------------------------------------------
// Retry + Catch combined
// ---------------------------------------------------------------------------

describe('Task retry then catch', () => {
  it('catches after retries are exhausted', async () => {
    const mock = jest.fn().mockImplementation(() => {
      throw new StateMachineError('Flaky', 'service down');
    });

    const state: TaskState = {
      Type: 'Task',
      Resource: 'arn:aws:lambda:*',
      Retry: [{ ErrorEquals: ['Flaky'], MaxAttempts: 2 }],
      Catch: [{ ErrorEquals: ['Flaky'], Next: 'Fallback' }],
      End: true,
    };
    const options = makeOptions({
      services: { 'arn:aws:lambda:*': mock },
    });

    const result = await executeTaskState(state, 'RetryCatch', {}, ctx, options);
    expect(result.nextState).toBe('Fallback');
    // 1 initial + 2 retries = 3 calls before catch
    expect(mock).toHaveBeenCalledTimes(3);
  });
});

// ---------------------------------------------------------------------------
// Integration with interpreter
// ---------------------------------------------------------------------------

describe('Task in interpreter', () => {
  // Import interpret to test end-to-end
  let interpret: typeof import('../../src/interpreter.js').interpret;
  let createDefaultContext: typeof import('../../src/interpreter.js').createDefaultContext;

  beforeAll(async () => {
    const mod = await import('../../src/interpreter.js');
    interpret = mod.interpret;
    createDefaultContext = mod.createDefaultContext;
  });

  it('executes Task → Pass workflow', async () => {
    const definition = {
      StartAt: 'CallService',
      States: {
        CallService: {
          Type: 'Task' as const,
          Resource: 'arn:aws:lambda:us-east-1:123:function:process',
          Next: 'Done',
        },
        Done: {
          Type: 'Pass' as const,
          Result: { status: 'complete' },
          End: true,
        },
      },
    };

    const mock = jest.fn().mockReturnValue({ processed: true });
    const options = makeOptions({
      services: { 'arn:aws:lambda:us-east-1:123:function:process': mock },
    });
    const context = createDefaultContext({});

    const output = await interpret(definition, { data: 'hello' }, context, options, { count: 0, max: 100 });
    expect(output).toEqual({ status: 'complete' });
    expect(mock).toHaveBeenCalledWith({ data: 'hello' }, expect.any(Object));
  });

  it('handles Task failure with Catch transitioning to recovery', async () => {
    const definition = {
      StartAt: 'RiskyCall',
      States: {
        RiskyCall: {
          Type: 'Task' as const,
          Resource: 'arn:aws:lambda:*',
          Catch: [{
            ErrorEquals: ['States.ALL'],
            Next: 'HandleError',
            ResultPath: '$.error',
          }],
          Next: 'Success',
        },
        HandleError: {
          Type: 'Pass' as const,
          End: true,
        },
        Success: {
          Type: 'Succeed' as const,
        },
      },
    };

    const mock = jest.fn().mockImplementation(() => {
      throw new StateMachineError('ServiceDown', 'unavailable');
    });
    const options = makeOptions({
      services: { 'arn:aws:lambda:*': mock },
    });
    const context = createDefaultContext({});

    const output = await interpret(definition, { orderId: '42' }, context, options, { count: 0, max: 100 });
    expect(output).toEqual({
      orderId: '42',
      error: { Error: 'ServiceDown', Cause: 'unavailable' },
    });
  });
});
