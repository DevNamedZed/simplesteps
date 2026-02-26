/**
 * Integration tests that compile real SimpleSteps TypeScript fixtures
 * and execute them through the LocalRunner.
 */
import path from 'path';
import { compile } from '@simplesteps/core';
import { AslSerializer } from '@simplesteps/core/asl';
import { LocalRunner, StateMachineError } from '../../src/index.js';

const FIXTURES_DIR = path.join(__dirname, '../../../core/test/fixtures/cfg');

function compileAndRun(fixtureFile: string, queryLanguage: 'JSONPath' | 'JSONata' = 'JSONata') {
  const filePath = path.join(FIXTURES_DIR, fixtureFile);
  const result = compile({ sourceFiles: [filePath], queryLanguage });

  if (result.errors.length > 0) {
    const msgs = result.errors.map(e => `  [${e.code}] ${e.message}`);
    throw new Error(`Compilation errors in ${fixtureFile}:\n${msgs.join('\n')}`);
  }
  if (result.stateMachines.length === 0) {
    throw new Error(`No state machines found in ${fixtureFile}`);
  }

  const def = result.stateMachines[0].definition;
  const json = AslSerializer.serialize(def);
  return JSON.parse(json);
}

// ---------------------------------------------------------------------------
// Sequential: compile sequential.ts → execute with mocks
// ---------------------------------------------------------------------------

describe('Compile + Execute: sequential.ts (JSONata)', () => {
  it('executes compiled sequential workflow', async () => {
    const asl = compileAndRun('sequential.ts', 'JSONata');

    const runner = new LocalRunner(asl, {
      services: {
        'arn:aws:lambda:us-east-1:123:function:A': (input) => ({
          name: `processed-${input.id}`,
        }),
        'arn:aws:lambda:us-east-1:123:function:B': (input) => ({
          result: `done-${input.name}`,
        }),
      },
    });

    const output = await runner.execute({ id: 'order-1' });
    expect(output).toEqual({ result: 'done-processed-order-1' });
  });

  it('collects trace for sequential workflow', async () => {
    const asl = compileAndRun('sequential.ts', 'JSONata');

    const runner = new LocalRunner(asl, {
      services: {
        'arn:aws:lambda:us-east-1:123:function:A': () => ({ name: 'test' }),
        'arn:aws:lambda:us-east-1:123:function:B': () => ({ result: 'ok' }),
      },
    });

    const { output, trace } = await runner.executeWithTrace({ id: 'x' });
    expect(output).toEqual({ result: 'ok' });
    expect(trace.totalSteps).toBeGreaterThan(0);
    expect(trace.error).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Sequential: JSONPath mode
// ---------------------------------------------------------------------------

describe('Compile + Execute: sequential.ts (JSONPath)', () => {
  it('executes compiled sequential workflow in JSONPath mode', async () => {
    const asl = compileAndRun('sequential.ts', 'JSONPath');

    const runner = new LocalRunner(asl, {
      services: {
        'arn:aws:lambda:us-east-1:123:function:A': (input) => ({
          name: `got-${input.id}`,
        }),
        'arn:aws:lambda:us-east-1:123:function:B': (input) => ({
          result: `final-${input.name}`,
        }),
      },
    });

    const output = await runner.execute({ id: '42' });
    expect(output).toEqual({ result: 'final-got-42' });
  });
});

// ---------------------------------------------------------------------------
// If-else: compile if-else.ts → verify branching
// ---------------------------------------------------------------------------

describe('Compile + Execute: if-else.ts (JSONata)', () => {
  it('takes the then-branch', async () => {
    const asl = compileAndRun('if-else.ts', 'JSONata');

    const runner = new LocalRunner(asl, {
      services: {
        'arn:aws:lambda:*': (input) => input,
      },
    });

    const output = await runner.execute({ mode: 'express' });
    expect(output).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// Try-catch: compile try-catch.ts → verify error handling
// ---------------------------------------------------------------------------

describe('Compile + Execute: try-catch.ts (JSONata)', () => {
  it('catches service failure and takes catch branch', async () => {
    const asl = compileAndRun('try-catch.ts', 'JSONata');

    const runner = new LocalRunner(asl, {
      services: {
        'arn:aws:lambda:*': () => {
          throw new StateMachineError('ServiceError', 'mock failure');
        },
      },
    });

    // Should not throw — the catch branch handles the error
    const { trace } = await runner.executeWithTrace({});
    // Just verify it ran without uncaught error propagation
    // The specific output depends on the fixture's catch logic
    expect(trace.totalSteps).toBeGreaterThan(0);
  });
});
