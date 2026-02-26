import { StateMachineError, normalizeError, errorMatches, globMatch } from '../../src/errors.js';

// ---------------------------------------------------------------------------
// StateMachineError
// ---------------------------------------------------------------------------

describe('StateMachineError', () => {
  it('creates error with name and cause', () => {
    const err = new StateMachineError('States.TaskFailed', 'something went wrong');
    expect(err.errorName).toBe('States.TaskFailed');
    expect(err.cause).toBe('something went wrong');
    expect(err.message).toBe('States.TaskFailed: something went wrong');
    expect(err.name).toBe('StateMachineError');
  });
});

// ---------------------------------------------------------------------------
// normalizeError
// ---------------------------------------------------------------------------

describe('normalizeError', () => {
  it('passes through StateMachineError', () => {
    const err = new StateMachineError('CustomError', 'reason');
    expect(normalizeError(err)).toEqual({ errorName: 'CustomError', cause: 'reason' });
  });

  it('converts standard Error', () => {
    const err = new TypeError('bad type');
    expect(normalizeError(err)).toEqual({ errorName: 'TypeError', cause: 'bad type' });
  });

  it('converts string thrown value', () => {
    expect(normalizeError('boom')).toEqual({ errorName: 'States.TaskFailed', cause: 'boom' });
  });

  it('converts other thrown values', () => {
    expect(normalizeError(42)).toEqual({ errorName: 'States.TaskFailed', cause: '42' });
  });
});

// ---------------------------------------------------------------------------
// errorMatches
// ---------------------------------------------------------------------------

describe('errorMatches', () => {
  it('States.ALL matches everything', () => {
    expect(errorMatches(['States.ALL'], 'CustomError')).toBe(true);
    expect(errorMatches(['States.ALL'], 'States.TaskFailed')).toBe(true);
  });

  it('States.TaskFailed matches non-States. errors', () => {
    expect(errorMatches(['States.TaskFailed'], 'CustomError')).toBe(true);
    expect(errorMatches(['States.TaskFailed'], 'TypeError')).toBe(true);
  });

  it('States.TaskFailed does NOT match States.* errors', () => {
    expect(errorMatches(['States.TaskFailed'], 'States.Timeout')).toBe(false);
    expect(errorMatches(['States.TaskFailed'], 'States.Runtime')).toBe(false);
  });

  it('exact match works', () => {
    expect(errorMatches(['InsufficientFunds'], 'InsufficientFunds')).toBe(true);
    expect(errorMatches(['InsufficientFunds'], 'OtherError')).toBe(false);
  });

  it('multiple patterns — first match wins', () => {
    expect(errorMatches(['CustomError', 'States.ALL'], 'CustomError')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// globMatch
// ---------------------------------------------------------------------------

describe('globMatch', () => {
  it('exact match', () => {
    expect(globMatch('arn:aws:lambda:us-east-1:123:function:GetOrder', 'arn:aws:lambda:us-east-1:123:function:GetOrder')).toBe(true);
  });

  it('wildcard at end', () => {
    expect(globMatch('arn:aws:lambda:us-east-1:123:function:GetOrder', 'arn:aws:lambda:*')).toBe(true);
  });

  it('wildcard in middle', () => {
    expect(globMatch('arn:aws:states:::dynamodb:PutItem', 'arn:aws:states:::dynamodb:*')).toBe(true);
  });

  it('no match', () => {
    expect(globMatch('arn:aws:lambda:us-east-1:123:function:GetOrder', 'arn:aws:states:::dynamodb:*')).toBe(false);
  });
});
