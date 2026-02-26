import type { StateMachineDefinition } from '@simplesteps/core/asl';
import { interpret, createDefaultContext, StepCounter } from '../../src/interpreter.js';
import { StateMachineError } from '../../src/errors.js';
import type { RunnerOptions, StateExecution } from '../../src/types.js';

const defaultOptions: RunnerOptions = {
  services: {},
  simulateWaits: false,
  retryDelays: 'skip',
};

function makeCounter(max = 1000): StepCounter {
  return { count: 0, max };
}

// ---------------------------------------------------------------------------
// Pass state
// ---------------------------------------------------------------------------

describe('interpreter: Pass state', () => {
  it('executes a single Pass state with Result', async () => {
    const def: StateMachineDefinition = {
      StartAt: 'SetResult',
      States: {
        SetResult: {
          Type: 'Pass',
          Result: { greeting: 'hello' },
          End: true,
        },
      },
    };
    const ctx = createDefaultContext({});
    const output = await interpret(def, {}, ctx, defaultOptions, makeCounter());
    expect(output).toEqual({ greeting: 'hello' });
  });

  it('chains multiple Pass states', async () => {
    const def: StateMachineDefinition = {
      StartAt: 'Step1',
      States: {
        Step1: {
          Type: 'Pass',
          Result: { a: 1 },
          ResultPath: '$.step1',
          Next: 'Step2',
        },
        Step2: {
          Type: 'Pass',
          Result: { b: 2 },
          ResultPath: '$.step2',
          End: true,
        },
      },
    };
    const ctx = createDefaultContext({});
    const output = await interpret(def, {}, ctx, defaultOptions, makeCounter());
    expect(output).toEqual({ step1: { a: 1 }, step2: { b: 2 } });
  });

  it('passes through input when no Result', async () => {
    const def: StateMachineDefinition = {
      StartAt: 'PassThrough',
      States: {
        PassThrough: {
          Type: 'Pass',
          End: true,
        },
      },
    };
    const ctx = createDefaultContext({ x: 42 });
    const output = await interpret(def, { x: 42 }, ctx, defaultOptions, makeCounter());
    expect(output).toEqual({ x: 42 });
  });
});

// ---------------------------------------------------------------------------
// Succeed state
// ---------------------------------------------------------------------------

describe('interpreter: Succeed state', () => {
  it('terminates with current state data', async () => {
    const def: StateMachineDefinition = {
      StartAt: 'Done',
      States: {
        Done: {
          Type: 'Succeed',
        },
      },
    };
    const ctx = createDefaultContext({ ok: true });
    const output = await interpret(def, { ok: true }, ctx, defaultOptions, makeCounter());
    expect(output).toEqual({ ok: true });
  });

  it('applies InputPath and OutputPath', async () => {
    const def: StateMachineDefinition = {
      StartAt: 'Done',
      States: {
        Done: {
          Type: 'Succeed',
          InputPath: '$.result',
          OutputPath: '$.value',
        },
      },
    };
    const ctx = createDefaultContext({});
    const output = await interpret(
      def,
      { result: { value: 42, extra: 'x' } },
      ctx,
      defaultOptions,
      makeCounter(),
    );
    expect(output).toBe(42);
  });
});

// ---------------------------------------------------------------------------
// Fail state
// ---------------------------------------------------------------------------

describe('interpreter: Fail state', () => {
  it('throws StateMachineError with Error and Cause', async () => {
    const def: StateMachineDefinition = {
      StartAt: 'Boom',
      States: {
        Boom: {
          Type: 'Fail',
          Error: 'OrderNotFound',
          Cause: 'No order with that ID',
        },
      },
    };
    const ctx = createDefaultContext({});
    await expect(interpret(def, {}, ctx, defaultOptions, makeCounter())).rejects.toThrow('OrderNotFound');
  });

  it('uses defaults when Error/Cause not specified', async () => {
    const def: StateMachineDefinition = {
      StartAt: 'Boom',
      States: {
        Boom: {
          Type: 'Fail',
        },
      },
    };
    const ctx = createDefaultContext({});
    await expect(interpret(def, {}, ctx, defaultOptions, makeCounter())).rejects.toThrow('States.TaskFailed');
  });
});

// ---------------------------------------------------------------------------
// Wait state
// ---------------------------------------------------------------------------

describe('interpreter: Wait state', () => {
  it('skips wait by default', async () => {
    const def: StateMachineDefinition = {
      StartAt: 'WaitStep',
      States: {
        WaitStep: {
          Type: 'Wait',
          Seconds: 60,
          Next: 'Done',
        },
        Done: {
          Type: 'Succeed',
        },
      },
    };
    const ctx = createDefaultContext({});
    const start = Date.now();
    const output = await interpret(def, { data: 1 }, ctx, defaultOptions, makeCounter());
    expect(Date.now() - start).toBeLessThan(100);
    expect(output).toEqual({ data: 1 });
  });
});

// ---------------------------------------------------------------------------
// Max steps
// ---------------------------------------------------------------------------

describe('interpreter: max steps', () => {
  it('throws when max steps exceeded', async () => {
    const def: StateMachineDefinition = {
      StartAt: 'Loop',
      States: {
        Loop: {
          Type: 'Pass',
          Next: 'Loop',
        },
      },
    };
    const ctx = createDefaultContext({});
    await expect(
      interpret(def, {}, ctx, defaultOptions, makeCounter(5)),
    ).rejects.toThrow('exceeded maximum of 5');
  });
});

// ---------------------------------------------------------------------------
// Unknown state
// ---------------------------------------------------------------------------

describe('interpreter: unknown state', () => {
  it('throws on missing state', async () => {
    const def: StateMachineDefinition = {
      StartAt: 'Missing',
      States: {},
    };
    const ctx = createDefaultContext({});
    await expect(
      interpret(def, {}, ctx, defaultOptions, makeCounter()),
    ).rejects.toThrow('Unknown state: Missing');
  });
});

// ---------------------------------------------------------------------------
// Trace recording
// ---------------------------------------------------------------------------

describe('interpreter: trace', () => {
  it('records state executions', async () => {
    const def: StateMachineDefinition = {
      StartAt: 'Step1',
      States: {
        Step1: {
          Type: 'Pass',
          Result: { a: 1 },
          Next: 'Step2',
        },
        Step2: {
          Type: 'Pass',
          Result: { b: 2 },
          End: true,
        },
      },
    };
    const ctx = createDefaultContext({});
    const trace: StateExecution[] = [];
    await interpret(def, {}, ctx, defaultOptions, makeCounter(), trace);

    expect(trace).toHaveLength(2);
    expect(trace[0].name).toBe('Step1');
    expect(trace[0].type).toBe('Pass');
    expect(trace[1].name).toBe('Step2');
    expect(trace[1].type).toBe('Pass');
    expect(trace[1].output).toEqual({ b: 2 });
  });

  it('records error in trace', async () => {
    const def: StateMachineDefinition = {
      StartAt: 'Boom',
      States: {
        Boom: {
          Type: 'Fail',
          Error: 'TestError',
          Cause: 'test',
        },
      },
    };
    const ctx = createDefaultContext({});
    const trace: StateExecution[] = [];
    await expect(
      interpret(def, {}, ctx, defaultOptions, makeCounter(), trace),
    ).rejects.toThrow();

    expect(trace).toHaveLength(1);
    expect(trace[0].name).toBe('Boom');
    expect(trace[0].error).toEqual({ name: 'TestError', message: 'test' });
  });
});
