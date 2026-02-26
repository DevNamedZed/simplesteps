/**
 * Order Processing Workflow — Test Suite
 *
 * Demonstrates testing patterns for SimpleSteps workflows:
 * 1. Compile-time validation
 * 2. Happy path execution
 * 3. Branch coverage (if/else paths)
 * 4. Error handling (try/catch, failures)
 * 5. Trace inspection (state ordering, step count)
 * 6. Service mock assertions
 */
import { compile, AslSerializer, type CompileResult } from '@simplesteps/core';
import { LocalRunner, StateMachineError } from '@simplesteps/local';
import type { StateMachineDefinition } from '@simplesteps/core/asl';
import path from 'path';

// ---------------------------------------------------------------------------
// Compile once, reuse across all tests
// ---------------------------------------------------------------------------

let asl: StateMachineDefinition;
let compileResult: CompileResult;

beforeAll(() => {
  compileResult = compile({
    tsconfigPath: path.resolve(__dirname, '../tsconfig.workflows.json'),
    cwd: path.resolve(__dirname, '..'),
  });

  // Find the order-processing state machine
  const orderSm = compileResult.stateMachines.find(
    sm => sm.name === 'orderProcessing' || sm.source.includes('order-processing'),
  );
  if (!orderSm) {
    throw new Error(
      compileResult.errors.length > 0
        ? `Compilation failed:\n${compileResult.errors.map(e => `  ${e.message}`).join('\n')}`
        : 'No order-processing state machine found',
    );
  }
  asl = JSON.parse(AslSerializer.serialize(orderSm.definition));
});

// ---------------------------------------------------------------------------
// 1. Compile-time validation
// ---------------------------------------------------------------------------

describe('Compilation', () => {
  it('compiles without errors', () => {
    expect(compileResult.errors).toHaveLength(0);
  });

  it('produces the orderProcessing state machine', () => {
    const sm = compileResult.stateMachines.find(sm => sm.name === 'orderProcessing');
    expect(sm).toBeDefined();
  });

  it('has a StartAt and States in the ASL', () => {
    expect(asl.StartAt).toBeDefined();
    expect(asl.States).toBeDefined();
    expect(Object.keys(asl.States!).length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// 2. Happy path — valid order end-to-end
// ---------------------------------------------------------------------------

describe('Happy path', () => {
  const services = {
    'arn:aws:lambda:us-east-1:123456789:function:ValidateOrder': () => ({
      valid: true,
    }),
    'arn:aws:lambda:us-east-1:123456789:function:ChargePayment': () => ({
      chargeId: 'ch_test_123',
    }),
    'arn:aws:lambda:us-east-1:123456789:function:SendConfirmation': () => ({
      sent: true,
    }),
    'arn:aws:lambda:us-east-1:123456789:function:SendRejection': () => ({
      sent: true,
    }),
  };

  it('processes a valid order successfully', async () => {
    const runner = new LocalRunner(asl, { services });
    const output = await runner.execute({ orderId: 'ORD-1', total: 99.99 });

    expect(output.status).toBe('completed');
    expect(output.confirmed).toBe(true);
  });

  it('returns the completed status', async () => {
    const runner = new LocalRunner(asl, { services });
    const output = await runner.execute({ orderId: 'ORD-42', total: 50 });

    expect(output.status).toBe('completed');
  });
});

// ---------------------------------------------------------------------------
// 3. Branch coverage — test each Choice path independently
// ---------------------------------------------------------------------------

describe('Branch coverage', () => {
  it('takes the rejection path when order is invalid', async () => {
    const services = {
      'arn:aws:lambda:us-east-1:123456789:function:ValidateOrder': () => ({
        valid: false,
      }),
      'arn:aws:lambda:us-east-1:123456789:function:SendRejection': () => ({
        sent: true,
      }),
      // ChargePayment and SendConfirmation should NOT be called
      'arn:aws:lambda:us-east-1:123456789:function:ChargePayment': () => {
        throw new Error('ChargePayment should not be called for invalid orders');
      },
      'arn:aws:lambda:us-east-1:123456789:function:SendConfirmation': () => {
        throw new Error('SendConfirmation should not be called for invalid orders');
      },
    };

    const runner = new LocalRunner(asl, { services });
    const output = await runner.execute({ orderId: 'ORD-BAD', total: 100 });

    expect(output.status).toBe('rejected');
  });
});

// ---------------------------------------------------------------------------
// 4. Error handling — payment failure caught by try/catch
// ---------------------------------------------------------------------------

describe('Error handling', () => {
  it('handles payment failure gracefully', async () => {
    const services = {
      'arn:aws:lambda:us-east-1:123456789:function:ValidateOrder': () => ({
        valid: true,
      }),
      'arn:aws:lambda:us-east-1:123456789:function:ChargePayment': () => {
        throw new StateMachineError('PaymentDeclined', 'Card was declined');
      },
      'arn:aws:lambda:us-east-1:123456789:function:SendConfirmation': () => ({
        sent: true,
      }),
      'arn:aws:lambda:us-east-1:123456789:function:SendRejection': () => ({
        sent: true,
      }),
    };

    const runner = new LocalRunner(asl, { services });
    const output = await runner.execute({ orderId: 'ORD-FAIL', total: 50 });

    expect(output.status).toBe('payment_failed');
  });
});

// ---------------------------------------------------------------------------
// 5. Trace inspection — verify state ordering and step count
// ---------------------------------------------------------------------------

describe('Trace inspection', () => {
  const services = {
    'arn:aws:lambda:us-east-1:123456789:function:ValidateOrder': () => ({
      valid: true,
    }),
    'arn:aws:lambda:us-east-1:123456789:function:ChargePayment': () => ({
      chargeId: 'ch_trace',
    }),
    'arn:aws:lambda:us-east-1:123456789:function:SendConfirmation': () => ({
      sent: true,
    }),
    'arn:aws:lambda:us-east-1:123456789:function:SendRejection': () => ({
      sent: true,
    }),
  };

  it('records every state in the execution trace', async () => {
    const runner = new LocalRunner(asl, { services });
    const { trace } = await runner.executeWithTrace({ orderId: 'ORD-T', total: 25 });

    // Trace should have multiple states for the happy path
    expect(trace.states.length).toBeGreaterThanOrEqual(3);
    expect(trace.totalSteps).toBe(trace.states.length);
  });

  it('includes Task states with inputs and outputs', async () => {
    const runner = new LocalRunner(asl, { services });
    const { trace } = await runner.executeWithTrace({ orderId: 'ORD-T2', total: 30 });

    // Find Task states in the trace
    const taskStates = trace.states.filter(s => s.type === 'Task');
    expect(taskStates.length).toBeGreaterThan(0);

    // Each task state should have input and output recorded
    for (const state of taskStates) {
      expect(state.input).toBeDefined();
      expect(state.output).toBeDefined();
      expect(state.duration).toBeGreaterThanOrEqual(0);
    }
  });

  it('shows Choice state transitions', async () => {
    const runner = new LocalRunner(asl, { services });
    const { trace } = await runner.executeWithTrace({ orderId: 'ORD-T3', total: 10 });

    // Find Choice states in the trace
    const choiceStates = trace.states.filter(s => s.type === 'Choice');
    for (const choice of choiceStates) {
      // Choice states should record which branch was taken
      expect(choice.transition).toBeDefined();
    }
  });
});

// ---------------------------------------------------------------------------
// 6. Service mock assertions — verify mocks were called correctly
// ---------------------------------------------------------------------------

describe('Service mock assertions', () => {
  it('passes correct arguments to ValidateOrder', async () => {
    const validateCalls: any[] = [];
    const services = {
      'arn:aws:lambda:us-east-1:123456789:function:ValidateOrder': (input: any) => {
        validateCalls.push(input);
        return { valid: true };
      },
      'arn:aws:lambda:us-east-1:123456789:function:ChargePayment': () => ({
        chargeId: 'ch_mock',
      }),
      'arn:aws:lambda:us-east-1:123456789:function:SendConfirmation': () => ({
        sent: true,
      }),
      'arn:aws:lambda:us-east-1:123456789:function:SendRejection': () => ({
        sent: true,
      }),
    };

    const runner = new LocalRunner(asl, { services });
    await runner.execute({ orderId: 'ORD-MOCK', total: 75 });

    expect(validateCalls).toHaveLength(1);
    expect(validateCalls[0]).toMatchObject({
      orderId: 'ORD-MOCK',
      total: 75,
    });
  });

  it('does not call ChargePayment when validation fails', async () => {
    let chargeCalled = false;
    const services = {
      'arn:aws:lambda:us-east-1:123456789:function:ValidateOrder': () => ({
        valid: false,
      }),
      'arn:aws:lambda:us-east-1:123456789:function:ChargePayment': () => {
        chargeCalled = true;
        return { chargeId: 'should-not-happen' };
      },
      'arn:aws:lambda:us-east-1:123456789:function:SendConfirmation': () => ({
        sent: true,
      }),
      'arn:aws:lambda:us-east-1:123456789:function:SendRejection': () => ({
        sent: true,
      }),
    };

    const runner = new LocalRunner(asl, { services });
    await runner.execute({ orderId: 'ORD-SKIP', total: 100 });

    expect(chargeCalled).toBe(false);
  });
});
