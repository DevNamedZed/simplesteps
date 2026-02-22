import ts from 'typescript';

// ---------------------------------------------------------------------------
// Variable classification
// ---------------------------------------------------------------------------

export enum StepVariableType {
  /** The step function's input parameter. */
  Input = 'Input',
  /** The SimpleStepContext parameter. */
  Context = 'Context',
  /** An external service binding (Lambda, DynamoDB, etc.). */
  External = 'External',
  /** The output of a service call (await result). */
  StateOutput = 'StateOutput',
  /** A compile-time constant (literal or frozen). */
  Constant = 'Constant',
  /** A value derived from other variables. */
  Derived = 'Derived',
}

// ---------------------------------------------------------------------------
// Variable info
// ---------------------------------------------------------------------------

export interface VariableInfo {
  readonly symbol: ts.Symbol;
  readonly type: StepVariableType;
  readonly jsonPath?: string;
  readonly definitelyAssigned: boolean;
  readonly constant: boolean;
  readonly literalValue?: unknown;
  readonly serviceBinding?: string;
  /** ASL intrinsic function string (e.g. "States.Format('hello {}', $.name)"). */
  readonly intrinsicPath?: string;
}

// ---------------------------------------------------------------------------
// Scope & environment
// ---------------------------------------------------------------------------

export interface VariableScope {
  readonly variables: ReadonlyMap<string, VariableInfo>;
  readonly parent?: VariableScope;
}

export interface VariableEnvironment {
  readonly scopes: readonly VariableScope[];
  readonly currentScope: VariableScope;
}
