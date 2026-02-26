import {
  applyInputPath,
  applyParameters,
  applyResultSelector,
  applyResultPath,
  applyOutputPath,
} from '../../src/dataFlow.js';
import type { ContextObject } from '../../src/types.js';

const ctx: ContextObject = {
  Execution: {
    Id: 'arn:aws:states:us-east-1:123:execution:Test:run-1',
    Name: 'run-1',
    StartTime: '2024-01-01T00:00:00Z',
    RoleArn: 'arn:aws:iam::123:role/Test',
    Input: {},
    RedriveCount: 0,
    RedriveStatus: 'NOT_REDRIVABLE',
  },
  State: { Name: 'TestState', EnteredTime: '2024-01-01T00:00:00Z', RetryCount: 0 },
  StateMachine: { Id: 'arn:aws:states:us-east-1:123:stateMachine:Test', Name: 'Test' },
  Map: { Item: { Index: 0, Value: null } },
};

// ---------------------------------------------------------------------------
// applyInputPath
// ---------------------------------------------------------------------------

describe('applyInputPath', () => {
  it('returns entire input when undefined', () => {
    expect(applyInputPath({ a: 1 }, undefined)).toEqual({ a: 1 });
  });

  it('returns entire input when "$"', () => {
    expect(applyInputPath({ a: 1 }, '$')).toEqual({ a: 1 });
  });

  it('returns {} when null', () => {
    expect(applyInputPath({ a: 1 }, null)).toEqual({});
  });

  it('selects a subtree', () => {
    expect(applyInputPath({ order: { id: '123' }, extra: 'x' }, '$.order')).toEqual({ id: '123' });
  });
});

// ---------------------------------------------------------------------------
// applyParameters
// ---------------------------------------------------------------------------

describe('applyParameters', () => {
  it('returns effectiveInput when no parameters', () => {
    expect(applyParameters({ a: 1 }, undefined, ctx)).toEqual({ a: 1 });
  });

  it('resolves .$ keys as JSONPath against effectiveInput', () => {
    const params = { 'id.$': '$.orderId', fixed: 'hello' };
    const effectiveInput = { orderId: '123' };
    expect(applyParameters(effectiveInput, params, ctx)).toEqual({ id: '123', fixed: 'hello' });
  });

  it('resolves nested objects', () => {
    const params = { nested: { 'val.$': '$.x' } };
    const effectiveInput = { x: 42 };
    expect(applyParameters(effectiveInput, params, ctx)).toEqual({ nested: { val: 42 } });
  });
});

// ---------------------------------------------------------------------------
// applyResultSelector
// ---------------------------------------------------------------------------

describe('applyResultSelector', () => {
  it('returns result when no resultSelector', () => {
    expect(applyResultSelector({ ok: true }, undefined, ctx)).toEqual({ ok: true });
  });

  it('reshapes result using .$ keys', () => {
    const selector = { 'status.$': '$.StatusCode' };
    const result = { StatusCode: 200, Body: 'data' };
    expect(applyResultSelector(result, selector, ctx)).toEqual({ status: 200 });
  });
});

// ---------------------------------------------------------------------------
// applyResultPath
// ---------------------------------------------------------------------------

describe('applyResultPath', () => {
  it('replaces entire data when undefined', () => {
    expect(applyResultPath({ old: 1 }, undefined, { new: 2 })).toEqual({ new: 2 });
  });

  it('replaces entire data when "$"', () => {
    expect(applyResultPath({ old: 1 }, '$', { new: 2 })).toEqual({ new: 2 });
  });

  it('discards result when null', () => {
    expect(applyResultPath({ a: 1 }, null, { c: 3 })).toEqual({ a: 1 });
  });

  it('merges result into original input at path', () => {
    const original = { a: 1, b: 2 };
    const result = { c: 3 };
    expect(applyResultPath(original, '$.result', result)).toEqual({
      a: 1,
      b: 2,
      result: { c: 3 },
    });
  });

  it('preserves original input (not mutated)', () => {
    const original = { a: 1 };
    const result = applyResultPath(original, '$.b', 2);
    expect(result).toEqual({ a: 1, b: 2 });
    // The original object should not have been mutated because structuredClone is used
    expect(original).toEqual({ a: 1 });
  });
});

// ---------------------------------------------------------------------------
// applyOutputPath
// ---------------------------------------------------------------------------

describe('applyOutputPath', () => {
  it('returns entire data when undefined', () => {
    expect(applyOutputPath({ a: 1 }, undefined)).toEqual({ a: 1 });
  });

  it('returns entire data when "$"', () => {
    expect(applyOutputPath({ a: 1 }, '$')).toEqual({ a: 1 });
  });

  it('returns {} when null', () => {
    expect(applyOutputPath({ a: 1 }, null)).toEqual({});
  });

  it('selects a subtree', () => {
    expect(applyOutputPath({ result: { ok: true }, extra: 'x' }, '$.result')).toEqual({ ok: true });
  });
});

// ---------------------------------------------------------------------------
// Full pipeline simulation
// ---------------------------------------------------------------------------

describe('full data flow pipeline', () => {
  it('InputPath → Parameters → ResultPath → OutputPath', () => {
    const rawInput = { order: { id: '123' }, customer: 'Alice' };

    // InputPath: select order subtree
    const effectiveInput = applyInputPath(rawInput, '$.order');
    expect(effectiveInput).toEqual({ id: '123' });

    // Parameters: build task input (resolves against effectiveInput, not rawInput)
    const taskInput = applyParameters(
      effectiveInput,
      { 'orderId.$': '$.id' },
      ctx,
    );
    expect(taskInput).toEqual({ orderId: '123' });

    // Simulate task execution
    const taskResult = { status: 'OK' };

    // ResultPath: merge result into ORIGINAL input (not filtered)
    const merged = applyResultPath(rawInput, '$.order.result', taskResult);
    expect(merged).toEqual({
      order: { id: '123', result: { status: 'OK' } },
      customer: 'Alice',
    });

    // OutputPath: filter merged data
    const output = applyOutputPath(merged, '$.order');
    expect(output).toEqual({ id: '123', result: { status: 'OK' } });
  });
});
