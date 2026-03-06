import { executeIntrinsic } from '../../src/intrinsics.js';
import type { ContextObject } from '../../src/types.js';

const ctx: ContextObject = {
  Execution: { Id: 'test', Name: 'run-1', StartTime: '2024-01-01T00:00:00Z', RoleArn: 'test', Input: {}, RedriveCount: 0, RedriveStatus: 'NOT_REDRIVABLE' },
  State: { Name: 'TestState', EnteredTime: '2024-01-01T00:00:00Z', RetryCount: 0 },
  StateMachine: { Id: 'test', Name: 'test' },
  Map: { Item: { Index: 0, Value: null } },
};

describe('States.Format', () => {
  it('replaces placeholders', () => {
    expect(executeIntrinsic(
      "States.Format('Hello {}, you have {} items', $.name, $.count)",
      { name: 'Alice', count: 3 }, ctx,
    )).toBe('Hello Alice, you have 3 items');
  });

  it('handles single placeholder', () => {
    expect(executeIntrinsic(
      "States.Format('Order: {}', $.id)",
      { id: 'ABC' }, ctx,
    )).toBe('Order: ABC');
  });
});

describe('States.MathAdd', () => {
  it('adds two numbers', () => {
    expect(executeIntrinsic("States.MathAdd($.a, $.b)", { a: 10, b: 20 }, ctx)).toBe(30);
  });

  it('adds with literal', () => {
    expect(executeIntrinsic("States.MathAdd($.a, 5)", { a: 10 }, ctx)).toBe(15);
  });
});

describe('States.StringToJson / States.JsonToString', () => {
  it('parses JSON string', () => {
    expect(executeIntrinsic(
      "States.StringToJson($.data)",
      { data: '{"key":"value"}' }, ctx,
    )).toEqual({ key: 'value' });
  });

  it('stringifies object', () => {
    expect(executeIntrinsic(
      "States.JsonToString($.data)",
      { data: { key: 'value' } }, ctx,
    )).toBe('{"key":"value"}');
  });
});

describe('States.Array', () => {
  it('creates array from args', () => {
    expect(executeIntrinsic(
      "States.Array($.a, $.b, $.c)",
      { a: 1, b: 2, c: 3 }, ctx,
    )).toEqual([1, 2, 3]);
  });
});

describe('States.ArrayPartition', () => {
  it('partitions array into chunks', () => {
    expect(executeIntrinsic(
      "States.ArrayPartition($.arr, 2)",
      { arr: [1, 2, 3, 4, 5] }, ctx,
    )).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('throws on zero chunk size', () => {
    expect(() => executeIntrinsic(
      "States.ArrayPartition($.arr, 0)",
      { arr: [1, 2, 3] }, ctx,
    )).toThrow('chunk size must be a positive integer');
  });
});

describe('States.ArrayContains', () => {
  it('finds primitive', () => {
    expect(executeIntrinsic(
      "States.ArrayContains($.arr, 3)",
      { arr: [1, 2, 3, 4] }, ctx,
    )).toBe(true);
  });

  it('returns false for missing', () => {
    expect(executeIntrinsic(
      "States.ArrayContains($.arr, 9)",
      { arr: [1, 2, 3] }, ctx,
    )).toBe(false);
  });
});

describe('States.ArrayRange', () => {
  it('generates range', () => {
    expect(executeIntrinsic(
      "States.ArrayRange(0, 5, 1)",
      {}, ctx,
    )).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('generates range with step', () => {
    expect(executeIntrinsic(
      "States.ArrayRange(0, 10, 3)",
      {}, ctx,
    )).toEqual([0, 3, 6, 9]);
  });
});

describe('States.ArrayGetItem', () => {
  it('gets item by index', () => {
    expect(executeIntrinsic(
      "States.ArrayGetItem($.arr, 1)",
      { arr: ['a', 'b', 'c'] }, ctx,
    )).toBe('b');
  });
});

describe('States.ArrayLength', () => {
  it('returns length', () => {
    expect(executeIntrinsic(
      "States.ArrayLength($.arr)",
      { arr: [1, 2, 3] }, ctx,
    )).toBe(3);
  });
});

describe('States.ArrayUnique', () => {
  it('removes duplicates', () => {
    expect(executeIntrinsic(
      "States.ArrayUnique($.arr)",
      { arr: [1, 2, 2, 3, 3, 3] }, ctx,
    )).toEqual([1, 2, 3]);
  });
});

describe('States.Base64Encode / States.Base64Decode', () => {
  it('encodes to base64', () => {
    expect(executeIntrinsic(
      "States.Base64Encode($.data)",
      { data: 'hello world' }, ctx,
    )).toBe(Buffer.from('hello world').toString('base64'));
  });

  it('decodes from base64', () => {
    const encoded = Buffer.from('hello world').toString('base64');
    expect(executeIntrinsic(
      "States.Base64Decode($.data)",
      { data: encoded }, ctx,
    )).toBe('hello world');
  });
});

describe('States.JsonMerge', () => {
  it('shallow merges two objects', () => {
    expect(executeIntrinsic(
      "States.JsonMerge($.a, $.b, false)",
      { a: { x: 1 }, b: { y: 2 } }, ctx,
    )).toEqual({ x: 1, y: 2 });
  });

  it('second object wins on conflict', () => {
    expect(executeIntrinsic(
      "States.JsonMerge($.a, $.b, false)",
      { a: { x: 1 }, b: { x: 2 } }, ctx,
    )).toEqual({ x: 2 });
  });

  it('deep merges nested objects when flag is true', () => {
    expect(executeIntrinsic(
      "States.JsonMerge($.a, $.b, true)",
      { a: { nested: { x: 1, y: 2 } }, b: { nested: { y: 3, z: 4 } } }, ctx,
    )).toEqual({ nested: { x: 1, y: 3, z: 4 } });
  });
});

describe('States.StringSplit', () => {
  it('splits by delimiter', () => {
    expect(executeIntrinsic(
      "States.StringSplit($.str, ',')",
      { str: 'a,b,c' }, ctx,
    )).toEqual(['a', 'b', 'c']);
  });

  it('splits into characters when delimiter is empty', () => {
    expect(executeIntrinsic(
      "States.StringSplit($.str, '')",
      { str: 'abc' }, ctx,
    )).toEqual(['a', 'b', 'c']);
  });
});

describe('States.UUID', () => {
  it('returns a UUID string', () => {
    const result = executeIntrinsic("States.UUID()", {}, ctx);
    expect(typeof result).toBe('string');
    expect(result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-/);
  });
});

describe('States.Hash', () => {
  it('returns SHA-256 hash', () => {
    const result = executeIntrinsic(
      "States.Hash($.data, 'SHA-256')",
      { data: 'hello' }, ctx,
    );
    expect(typeof result).toBe('string');
    expect(result).toHaveLength(64); // SHA-256 hex
  });
});

describe('States.MathRandom', () => {
  it('returns number in range', () => {
    const result = executeIntrinsic("States.MathRandom(0, 10)", {}, ctx);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(10);
  });
});

describe('Intrinsic parser edge cases', () => {
  it('handles unbalanced open paren inside string literal', () => {
    expect(executeIntrinsic(
      "States.Format('count: ({}', $.val)",
      { val: 'test' }, ctx,
    )).toBe('count: (test');
  });

  it('handles unbalanced close paren inside string literal', () => {
    expect(executeIntrinsic(
      "States.Format('done) {}', $.val)",
      { val: 'ok' }, ctx,
    )).toBe('done) ok');
  });

  it('handles nested call with unbalanced paren in string literal', () => {
    expect(executeIntrinsic(
      "States.Format('(result: {}', States.JsonToString($.data))",
      { data: { x: 1 } }, ctx,
    )).toBe('(result: {"x":1}');
  });
});
