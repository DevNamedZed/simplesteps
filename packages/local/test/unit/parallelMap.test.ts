import { interpret, createDefaultContext } from '../../src/interpreter.js';
import { StateMachineError } from '../../src/errors.js';
import type { RunnerOptions } from '../../src/types.js';
import type { StateMachineDefinition } from '@simplesteps/core/asl';

function makeOptions(overrides?: Partial<RunnerOptions>): RunnerOptions {
  return { services: {}, ...overrides };
}

// ---------------------------------------------------------------------------
// Parallel state
// ---------------------------------------------------------------------------

describe('Parallel state', () => {
  it('executes all branches and collects results', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'ParallelStep',
      States: {
        ParallelStep: {
          Type: 'Parallel',
          Branches: [
            {
              StartAt: 'BranchA',
              States: {
                BranchA: { Type: 'Pass', Result: { branch: 'A' }, End: true },
              },
            },
            {
              StartAt: 'BranchB',
              States: {
                BranchB: { Type: 'Pass', Result: { branch: 'B' }, End: true },
              },
            },
          ],
          End: true,
        },
      },
    };

    const context = createDefaultContext({});
    const output = await interpret(definition, { input: true }, context, makeOptions(), { count: 0, max: 100 });
    expect(output).toEqual([{ branch: 'A' }, { branch: 'B' }]);
  });

  it('passes effective input to all branches', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'ParallelStep',
      States: {
        ParallelStep: {
          Type: 'Parallel',
          InputPath: '$.data',
          Branches: [
            {
              StartAt: 'Echo',
              States: {
                Echo: { Type: 'Pass', End: true },
              },
            },
          ],
          End: true,
        },
      },
    };

    const context = createDefaultContext({});
    const output = await interpret(definition, { data: { value: 42 } }, context, makeOptions(), { count: 0, max: 100 });
    expect(output).toEqual([{ value: 42 }]);
  });

  it('applies ResultPath to merge branch results', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'ParallelStep',
      States: {
        ParallelStep: {
          Type: 'Parallel',
          ResultPath: '$.results',
          Branches: [
            {
              StartAt: 'B1',
              States: { B1: { Type: 'Pass', Result: 'one', End: true } },
            },
            {
              StartAt: 'B2',
              States: { B2: { Type: 'Pass', Result: 'two', End: true } },
            },
          ],
          End: true,
        },
      },
    };

    const context = createDefaultContext({});
    const output = await interpret(definition, { original: true }, context, makeOptions(), { count: 0, max: 100 });
    expect(output).toEqual({ original: true, results: ['one', 'two'] });
  });

  it('catches error from branch failure', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'ParallelStep',
      States: {
        ParallelStep: {
          Type: 'Parallel',
          Branches: [
            {
              StartAt: 'GoodBranch',
              States: { GoodBranch: { Type: 'Pass', Result: 'ok', End: true } },
            },
            {
              StartAt: 'BadBranch',
              States: {
                BadBranch: { Type: 'Fail', Error: 'BranchError', Cause: 'branch failed' },
              },
            },
          ],
          Catch: [{
            ErrorEquals: ['BranchError'],
            Next: 'HandleError',
            ResultPath: '$.err',
          }],
          Next: 'Unreachable',
        },
        HandleError: { Type: 'Pass', End: true },
        Unreachable: { Type: 'Succeed' },
      },
    };

    const context = createDefaultContext({});
    const output = await interpret(definition, { data: 'test' }, context, makeOptions(), { count: 0, max: 100 });
    expect(output).toEqual({
      data: 'test',
      err: { Error: 'BranchError', Cause: 'branch failed' },
    });
  });

  it('shares step counter across branches', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'ParallelStep',
      States: {
        ParallelStep: {
          Type: 'Parallel',
          Branches: [
            {
              StartAt: 'A1',
              States: {
                A1: { Type: 'Pass', Next: 'A2' },
                A2: { Type: 'Pass', End: true },
              },
            },
            {
              StartAt: 'B1',
              States: {
                B1: { Type: 'Pass', Next: 'B2' },
                B2: { Type: 'Pass', End: true },
              },
            },
          ],
          End: true,
        },
      },
    };

    const context = createDefaultContext({});
    const stepCounter = { count: 0, max: 100 };
    await interpret(definition, {}, context, makeOptions(), stepCounter);
    // 1 for Parallel + 2 for branchA + 2 for branchB = 5
    expect(stepCounter.count).toBe(5);
  });
});

// ---------------------------------------------------------------------------
// Map state
// ---------------------------------------------------------------------------

describe('Map state', () => {
  it('iterates over items and collects results', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'MapStep',
      States: {
        MapStep: {
          Type: 'Map',
          ItemsPath: '$.items',
          ItemProcessor: {
            StartAt: 'Process',
            States: {
              Process: {
                Type: 'Pass',
                End: true,
              },
            },
          },
          End: true,
        },
      },
    };

    const context = createDefaultContext({});
    const output = await interpret(
      definition,
      { items: [{ id: 1 }, { id: 2 }, { id: 3 }] },
      context, makeOptions(), { count: 0, max: 100 },
    );
    expect(output).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it('uses ItemSelector to build per-item input', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'MapStep',
      States: {
        MapStep: {
          Type: 'Map',
          ItemsPath: '$.orders',
          ItemSelector: {
            'orderId.$': '$$.Map.Item.Value.id',
            'index.$': '$$.Map.Item.Index',
            source: 'batch',
          } as any,
          ItemProcessor: {
            StartAt: 'Process',
            States: {
              Process: { Type: 'Pass', End: true },
            },
          },
          End: true,
        },
      },
    };

    const context = createDefaultContext({});
    const output = await interpret(
      definition,
      { orders: [{ id: 'A' }, { id: 'B' }] },
      context, makeOptions(), { count: 0, max: 100 },
    );
    expect(output).toEqual([
      { orderId: 'A', index: 0, source: 'batch' },
      { orderId: 'B', index: 1, source: 'batch' },
    ]);
  });

  it('applies ResultPath to merge map results', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'MapStep',
      States: {
        MapStep: {
          Type: 'Map',
          ItemsPath: '$.items',
          ResultPath: '$.processed',
          ItemProcessor: {
            StartAt: 'Double',
            States: {
              Double: {
                Type: 'Pass',
                End: true,
              },
            },
          },
          End: true,
        },
      },
    };

    const context = createDefaultContext({});
    const output = await interpret(
      definition,
      { items: [1, 2, 3], extra: 'keep' },
      context, makeOptions(), { count: 0, max: 100 },
    );
    expect(output).toEqual({ items: [1, 2, 3], extra: 'keep', processed: [1, 2, 3] });
  });

  it('uses array input when no ItemsPath', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'MapStep',
      States: {
        MapStep: {
          Type: 'Map',
          ItemProcessor: {
            StartAt: 'Echo',
            States: {
              Echo: { Type: 'Pass', End: true },
            },
          },
          End: true,
        },
      },
    };

    const context = createDefaultContext({});
    const output = await interpret(
      definition,
      ['a', 'b', 'c'],
      context, makeOptions(), { count: 0, max: 100 },
    );
    expect(output).toEqual(['a', 'b', 'c']);
  });

  it('throws when items is not an array', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'MapStep',
      States: {
        MapStep: {
          Type: 'Map',
          ItemsPath: '$.items',
          ItemProcessor: {
            StartAt: 'Echo',
            States: {
              Echo: { Type: 'Pass', End: true },
            },
          },
          End: true,
        },
      },
    };

    const context = createDefaultContext({});
    await expect(
      interpret(definition, { items: 'not-an-array' }, context, makeOptions(), { count: 0, max: 100 }),
    ).rejects.toThrow('items must be an array');
  });

  it('catches error from iteration failure', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'MapStep',
      States: {
        MapStep: {
          Type: 'Map',
          ItemsPath: '$.items',
          ItemProcessor: {
            StartAt: 'MayFail',
            States: {
              MayFail: {
                Type: 'Task',
                Resource: 'arn:aws:lambda:*',
                End: true,
              },
            },
          },
          Catch: [{ ErrorEquals: ['States.ALL'], Next: 'HandleError', ResultPath: '$.mapError' }],
          Next: 'Done',
        },
        HandleError: { Type: 'Pass', End: true },
        Done: { Type: 'Succeed' },
      },
    };

    let callCount = 0;
    const mock = jest.fn().mockImplementation(() => {
      callCount++;
      if (callCount === 2) throw new StateMachineError('ItemFailed', 'item 2 failed');
      return { ok: true };
    });

    const context = createDefaultContext({});
    const options = makeOptions({ services: { 'arn:aws:lambda:*': mock } });
    const output = await interpret(
      definition,
      { items: ['a', 'b', 'c'] },
      context, options, { count: 0, max: 100 },
    );
    expect(output).toEqual({
      items: ['a', 'b', 'c'],
      mapError: { Error: 'ItemFailed', Cause: 'item 2 failed' },
    });
  });

  it('supports Task states inside Map processor', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'MapStep',
      States: {
        MapStep: {
          Type: 'Map',
          ItemsPath: '$.items',
          ItemProcessor: {
            StartAt: 'CallService',
            States: {
              CallService: {
                Type: 'Task',
                Resource: 'arn:aws:lambda:us-east-1:123:function:transform',
                End: true,
              },
            },
          },
          End: true,
        },
      },
    };

    const mock = jest.fn().mockImplementation((input: any) => ({
      ...input,
      transformed: true,
    }));

    const context = createDefaultContext({});
    const options = makeOptions({
      services: { 'arn:aws:lambda:us-east-1:123:function:transform': mock },
    });
    const output = await interpret(
      definition,
      { items: [{ id: 1 }, { id: 2 }] },
      context, options, { count: 0, max: 100 },
    );
    expect(output).toEqual([
      { id: 1, transformed: true },
      { id: 2, transformed: true },
    ]);
    expect(mock).toHaveBeenCalledTimes(2);
  });
});

// ---------------------------------------------------------------------------
// Nested: Map inside Parallel
// ---------------------------------------------------------------------------

describe('Nested Parallel + Map', () => {
  it('runs Map inside a Parallel branch', async () => {
    const definition: StateMachineDefinition = {
      StartAt: 'ParallelStep',
      States: {
        ParallelStep: {
          Type: 'Parallel',
          Branches: [
            {
              StartAt: 'MapBranch',
              States: {
                MapBranch: {
                  Type: 'Map',
                  ItemsPath: '$.items',
                  ItemProcessor: {
                    StartAt: 'Echo',
                    States: {
                      Echo: { Type: 'Pass', End: true },
                    },
                  },
                  End: true,
                },
              },
            },
            {
              StartAt: 'StaticBranch',
              States: {
                StaticBranch: { Type: 'Pass', Result: 'static', End: true },
              },
            },
          ],
          End: true,
        },
      },
    };

    const context = createDefaultContext({});
    const output = await interpret(
      definition,
      { items: [1, 2, 3] },
      context, makeOptions(), { count: 0, max: 100 },
    );
    expect(output).toEqual([
      [1, 2, 3],
      'static',
    ]);
  });
});
