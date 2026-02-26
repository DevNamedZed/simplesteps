import { resolvePath, setPath, resolveReference, resolvePayloadTemplate, parsePath } from '../../src/jsonpath.js';
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
// parsePath
// ---------------------------------------------------------------------------

describe('parsePath', () => {
  it('parses root $', () => {
    expect(parsePath('$')).toEqual([]);
  });

  it('parses simple property', () => {
    expect(parsePath('$.name')).toEqual(['name']);
  });

  it('parses nested properties', () => {
    expect(parsePath('$.a.b.c')).toEqual(['a', 'b', 'c']);
  });

  it('parses array index', () => {
    expect(parsePath('$.items[0]')).toEqual(['items', 0]);
  });

  it('parses mixed path', () => {
    expect(parsePath('$.orders[0].status')).toEqual(['orders', 0, 'status']);
  });

  it('parses context path', () => {
    expect(parsePath('$$.Execution.Name')).toEqual(['Execution', 'Name']);
  });
});

// ---------------------------------------------------------------------------
// resolvePath
// ---------------------------------------------------------------------------

describe('resolvePath', () => {
  it('resolves root $', () => {
    expect(resolvePath({ a: 1 }, '$')).toEqual({ a: 1 });
  });

  it('resolves simple property', () => {
    expect(resolvePath({ a: { b: 2 } }, '$.a.b')).toBe(2);
  });

  it('resolves array index', () => {
    expect(resolvePath({ items: ['x', 'y'] }, '$.items[1]')).toBe('y');
  });

  it('resolves mixed path', () => {
    expect(resolvePath({ orders: [{ id: 'A' }] }, '$.orders[0].id')).toBe('A');
  });

  it('returns undefined for missing path', () => {
    expect(resolvePath({ a: 1 }, '$.b.c')).toBeUndefined();
  });

  it('returns undefined for null intermediate', () => {
    expect(resolvePath({ a: null }, '$.a.b')).toBeUndefined();
  });

  it('handles numeric values', () => {
    expect(resolvePath({ count: 42 }, '$.count')).toBe(42);
  });

  it('handles boolean values', () => {
    expect(resolvePath({ flag: true }, '$.flag')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// resolveReference
// ---------------------------------------------------------------------------

describe('resolveReference', () => {
  it('resolves $ paths against state data', () => {
    expect(resolveReference('$.orderId', { orderId: '123' }, ctx)).toBe('123');
  });

  it('resolves $$ paths against context', () => {
    expect(resolveReference('$$.Execution.Name', {}, ctx)).toBe('run-1');
  });

  it('resolves $$.State.RetryCount', () => {
    expect(resolveReference('$$.State.RetryCount', {}, ctx)).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// setPath
// ---------------------------------------------------------------------------

describe('setPath', () => {
  it('sets root path', () => {
    expect(setPath({ a: 1 }, '$', 'new')).toBe('new');
  });

  it('sets nested property', () => {
    const data = { a: { b: 1 }, c: 2 };
    expect(setPath(data, '$.a.b', 99)).toEqual({ a: { b: 99 }, c: 2 });
  });

  it('creates intermediate objects', () => {
    expect(setPath({}, '$.a.b.c', 1)).toEqual({ a: { b: { c: 1 } } });
  });

  it('creates intermediate arrays', () => {
    expect(setPath({}, '$.items[0]', 'x')).toEqual({ items: ['x'] });
  });

  it('preserves existing fields', () => {
    const data = { a: 1, b: 2 };
    expect(setPath(data, '$.result', { ok: true })).toEqual({ a: 1, b: 2, result: { ok: true } });
  });
});

// ---------------------------------------------------------------------------
// resolvePayloadTemplate
// ---------------------------------------------------------------------------

describe('resolvePayloadTemplate', () => {
  it('resolves .$ keys as JSONPath references', () => {
    const template = { 'orderId.$': '$.id', staticField: 'hello' };
    const data = { id: '123' };
    expect(resolvePayloadTemplate(template, data, ctx)).toEqual({
      orderId: '123',
      staticField: 'hello',
    });
  });

  it('resolves nested objects recursively', () => {
    const template = { nested: { 'val.$': '$.x' } };
    const data = { x: 42 };
    expect(resolvePayloadTemplate(template, data, ctx)).toEqual({
      nested: { val: 42 },
    });
  });

  it('resolves context references', () => {
    const template = { 'execName.$': '$$.Execution.Name' };
    expect(resolvePayloadTemplate(template, {}, ctx)).toEqual({ execName: 'run-1' });
  });

  it('delegates intrinsic functions to resolver', () => {
    const template = { 'formatted.$': "States.Format('Hello {}', $.name)" };
    const data = { name: 'Alice' };
    const intrinsicResolver = (expr: string) => 'Hello Alice';
    expect(resolvePayloadTemplate(template, data, ctx, intrinsicResolver)).toEqual({
      formatted: 'Hello Alice',
    });
  });

  it('preserves array literals', () => {
    const template = { items: [1, 2, 3] };
    expect(resolvePayloadTemplate(template, {}, ctx)).toEqual({ items: [1, 2, 3] });
  });

  it('preserves null values', () => {
    const template = { field: null };
    expect(resolvePayloadTemplate(template, {}, ctx)).toEqual({ field: null });
  });
});
