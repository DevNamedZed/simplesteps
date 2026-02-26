import { evaluateChoiceRule } from '../../src/choiceEvaluator.js';
import type { ContextObject } from '../../src/types.js';

const ctx: ContextObject = {
  Execution: { Id: 'test', Name: 'test', StartTime: '2024-01-01T00:00:00Z', RoleArn: 'test', Input: {}, RedriveCount: 0, RedriveStatus: 'NOT_REDRIVABLE' },
  State: { Name: 'TestState', EnteredTime: '2024-01-01T00:00:00Z', RetryCount: 0 },
  StateMachine: { Id: 'test', Name: 'test' },
  Map: { Item: { Index: 0, Value: null } },
};

describe('String comparisons', () => {
  it('StringEquals', () => {
    const rule = { Variable: '$.status', StringEquals: 'ACTIVE', Next: 'X' };
    expect(evaluateChoiceRule(rule, { status: 'ACTIVE' }, ctx)).toBe(true);
    expect(evaluateChoiceRule(rule, { status: 'INACTIVE' }, ctx)).toBe(false);
  });

  it('StringGreaterThan (lexicographic)', () => {
    const rule = { Variable: '$.name', StringGreaterThan: 'Bob', Next: 'X' };
    expect(evaluateChoiceRule(rule, { name: 'Charlie' }, ctx)).toBe(true);
    expect(evaluateChoiceRule(rule, { name: 'Alice' }, ctx)).toBe(false);
  });

  it('StringMatches with wildcard', () => {
    const rule = { Variable: '$.path', StringMatches: '/api/*', Next: 'X' };
    expect(evaluateChoiceRule(rule, { path: '/api/users' }, ctx)).toBe(true);
    expect(evaluateChoiceRule(rule, { path: '/web/home' }, ctx)).toBe(false);
  });
});

describe('Numeric comparisons', () => {
  it('NumericEquals', () => {
    const rule = { Variable: '$.count', NumericEquals: 5, Next: 'X' };
    expect(evaluateChoiceRule(rule, { count: 5 }, ctx)).toBe(true);
    expect(evaluateChoiceRule(rule, { count: 3 }, ctx)).toBe(false);
  });

  it('NumericGreaterThan', () => {
    const rule = { Variable: '$.amount', NumericGreaterThan: 100, Next: 'X' };
    expect(evaluateChoiceRule(rule, { amount: 150 }, ctx)).toBe(true);
    expect(evaluateChoiceRule(rule, { amount: 50 }, ctx)).toBe(false);
  });

  it('NumericLessThanEquals', () => {
    const rule = { Variable: '$.score', NumericLessThanEquals: 10, Next: 'X' };
    expect(evaluateChoiceRule(rule, { score: 10 }, ctx)).toBe(true);
    expect(evaluateChoiceRule(rule, { score: 11 }, ctx)).toBe(false);
  });
});

describe('Boolean comparisons', () => {
  it('BooleanEquals true', () => {
    const rule = { Variable: '$.active', BooleanEquals: true, Next: 'X' };
    expect(evaluateChoiceRule(rule, { active: true }, ctx)).toBe(true);
    expect(evaluateChoiceRule(rule, { active: false }, ctx)).toBe(false);
  });
});

describe('Type-checking operators', () => {
  it('IsNull', () => {
    const rule = { Variable: '$.value', IsNull: true, Next: 'X' };
    expect(evaluateChoiceRule(rule, { value: null }, ctx)).toBe(true);
    expect(evaluateChoiceRule(rule, { value: 'hello' }, ctx)).toBe(false);
  });

  it('IsPresent', () => {
    const rule = { Variable: '$.value', IsPresent: true, Next: 'X' };
    expect(evaluateChoiceRule(rule, { value: 42 }, ctx)).toBe(true);
    expect(evaluateChoiceRule(rule, {}, ctx)).toBe(false);
  });

  it('IsNumeric', () => {
    const rule = { Variable: '$.value', IsNumeric: true, Next: 'X' };
    expect(evaluateChoiceRule(rule, { value: 42 }, ctx)).toBe(true);
    expect(evaluateChoiceRule(rule, { value: 'hello' }, ctx)).toBe(false);
  });
});

describe('Compound rules', () => {
  it('Not', () => {
    const rule = {
      Not: { Variable: '$.status', StringEquals: 'DONE' } as any,
      Next: 'X',
    };
    expect(evaluateChoiceRule(rule, { status: 'PENDING' }, ctx)).toBe(true);
    expect(evaluateChoiceRule(rule, { status: 'DONE' }, ctx)).toBe(false);
  });

  it('And', () => {
    const rule = {
      And: [
        { Variable: '$.a', NumericGreaterThan: 0 },
        { Variable: '$.b', BooleanEquals: true },
      ] as any,
      Next: 'X',
    };
    expect(evaluateChoiceRule(rule, { a: 5, b: true }, ctx)).toBe(true);
    expect(evaluateChoiceRule(rule, { a: 5, b: false }, ctx)).toBe(false);
    expect(evaluateChoiceRule(rule, { a: -1, b: true }, ctx)).toBe(false);
  });

  it('Or', () => {
    const rule = {
      Or: [
        { Variable: '$.x', NumericEquals: 1 },
        { Variable: '$.x', NumericEquals: 2 },
      ] as any,
      Next: 'X',
    };
    expect(evaluateChoiceRule(rule, { x: 1 }, ctx)).toBe(true);
    expect(evaluateChoiceRule(rule, { x: 2 }, ctx)).toBe(true);
    expect(evaluateChoiceRule(rule, { x: 3 }, ctx)).toBe(false);
  });
});

describe('Timestamp comparisons', () => {
  it('TimestampEquals', () => {
    const rule = { Variable: '$.time', TimestampEquals: '2024-01-01T00:00:00Z', Next: 'X' };
    expect(evaluateChoiceRule(rule, { time: '2024-01-01T00:00:00Z' }, ctx)).toBe(true);
    expect(evaluateChoiceRule(rule, { time: '2024-06-15T12:00:00Z' }, ctx)).toBe(false);
  });

  it('TimestampGreaterThan', () => {
    const rule = { Variable: '$.time', TimestampGreaterThan: '2024-01-01T00:00:00Z', Next: 'X' };
    expect(evaluateChoiceRule(rule, { time: '2024-06-15T00:00:00Z' }, ctx)).toBe(true);
    expect(evaluateChoiceRule(rule, { time: '2023-06-15T00:00:00Z' }, ctx)).toBe(false);
  });
});
