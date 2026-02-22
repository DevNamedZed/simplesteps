// ---------------------------------------------------------------------------
// Amazon States Language (ASL) Type Definitions
// TypeScript representation of the ASL specification.
// ---------------------------------------------------------------------------

// ---- Top-level definition -------------------------------------------------

export interface StateMachineDefinition {
  readonly Comment?: string;
  readonly StartAt: string;
  readonly States: Readonly<Record<string, State>>;
  readonly TimeoutSeconds?: number;
  readonly Version?: string;
}

// ---- State union ----------------------------------------------------------

export type State =
  | TaskState
  | PassState
  | ChoiceState
  | WaitState
  | FailState
  | ParallelState
  | MapState
  | SucceedState;

// ---- Common base fields ---------------------------------------------------

export interface StateBase {
  readonly Type: string;
  readonly Comment?: string;
  readonly InputPath?: string;
  readonly OutputPath?: string;
}

// ---- Terminal fields (shared by non-Choice states) ------------------------

export interface TerminalFields {
  readonly Next?: string;
  readonly End?: boolean;
}

// ---- Individual state types -----------------------------------------------

export interface TaskState extends StateBase, TerminalFields {
  readonly Type: 'Task';
  readonly Resource: string | Record<string, unknown>;
  readonly Parameters?: Readonly<Record<string, unknown>>;
  readonly ResultPath?: string | null;
  readonly ResultSelector?: Readonly<Record<string, unknown>>;
  readonly TimeoutSeconds?: number;
  readonly TimeoutSecondsPath?: string;
  readonly HeartbeatSeconds?: number;
  readonly HeartbeatSecondsPath?: string;
  readonly Retry?: readonly RetryRule[];
  readonly Catch?: readonly CatchRule[];
}

export interface PassState extends StateBase, TerminalFields {
  readonly Type: 'Pass';
  readonly Result?: unknown;
  readonly ResultPath?: string | null;
  readonly Parameters?: Readonly<Record<string, unknown>>;
}

export interface ChoiceState extends StateBase {
  readonly Type: 'Choice';
  readonly Choices: readonly ChoiceRule[];
  readonly Default?: string;
}

export interface WaitState extends StateBase, TerminalFields {
  readonly Type: 'Wait';
  readonly Seconds?: number;
  readonly Timestamp?: string;
  readonly SecondsPath?: string;
  readonly TimestampPath?: string;
}

export interface FailState {
  readonly Type: 'Fail';
  readonly Comment?: string;
  readonly Error?: string;
  readonly Cause?: string;
  readonly CausePath?: string;
  readonly ErrorPath?: string;
}

export interface ParallelState extends StateBase, TerminalFields {
  readonly Type: 'Parallel';
  readonly Branches: readonly StateMachineDefinition[];
  readonly ResultPath?: string | null;
  readonly ResultSelector?: Readonly<Record<string, unknown>>;
  readonly Retry?: readonly RetryRule[];
  readonly Catch?: readonly CatchRule[];
}

export interface MapState extends StateBase, TerminalFields {
  readonly Type: 'Map';
  readonly ItemsPath?: string;
  readonly ItemProcessor: StateMachineDefinition;
  readonly ItemSelector?: Readonly<Record<string, unknown>>;
  readonly MaxConcurrency?: number;
  readonly ResultPath?: string | null;
  readonly ResultSelector?: Readonly<Record<string, unknown>>;
  readonly Parameters?: Readonly<Record<string, unknown>>;
  readonly Retry?: readonly RetryRule[];
  readonly Catch?: readonly CatchRule[];
}

export interface SucceedState {
  readonly Type: 'Succeed';
  readonly Comment?: string;
  readonly InputPath?: string;
  readonly OutputPath?: string;
}

// ---- Choice rules ---------------------------------------------------------

export type ChoiceRule = ComparisonRule | NotRule | AndRule | OrRule;

export interface ComparisonRule {
  readonly Variable?: string;
  readonly Next: string;

  // String comparisons
  readonly StringEquals?: string;
  readonly StringEqualsPath?: string;
  readonly StringGreaterThan?: string;
  readonly StringGreaterThanPath?: string;
  readonly StringGreaterThanEquals?: string;
  readonly StringGreaterThanEqualsPath?: string;
  readonly StringLessThan?: string;
  readonly StringLessThanPath?: string;
  readonly StringLessThanEquals?: string;
  readonly StringLessThanEqualsPath?: string;
  readonly StringMatches?: string;

  // Numeric comparisons
  readonly NumericEquals?: number;
  readonly NumericEqualsPath?: string;
  readonly NumericGreaterThan?: number;
  readonly NumericGreaterThanPath?: string;
  readonly NumericGreaterThanEquals?: number;
  readonly NumericGreaterThanEqualsPath?: string;
  readonly NumericLessThan?: number;
  readonly NumericLessThanPath?: string;
  readonly NumericLessThanEquals?: number;
  readonly NumericLessThanEqualsPath?: string;

  // Boolean comparisons
  readonly BooleanEquals?: boolean;
  readonly BooleanEqualsPath?: string;

  // Timestamp comparisons
  readonly TimestampEquals?: string;
  readonly TimestampEqualsPath?: string;
  readonly TimestampGreaterThan?: string;
  readonly TimestampGreaterThanPath?: string;
  readonly TimestampGreaterThanEquals?: string;
  readonly TimestampGreaterThanEqualsPath?: string;
  readonly TimestampLessThan?: string;
  readonly TimestampLessThanPath?: string;
  readonly TimestampLessThanEquals?: string;
  readonly TimestampLessThanEqualsPath?: string;

  // Type-checking operators
  readonly IsNull?: boolean;
  readonly IsPresent?: boolean;
  readonly IsNumeric?: boolean;
  readonly IsString?: boolean;
  readonly IsBoolean?: boolean;
  readonly IsTimestamp?: boolean;
}

export interface NotRule {
  readonly Not: ChoiceRule;
  readonly Next: string;
}

export interface AndRule {
  readonly And: readonly ChoiceRule[];
  readonly Next: string;
}

export interface OrRule {
  readonly Or: readonly ChoiceRule[];
  readonly Next: string;
}

// ---- Retry and Catch ------------------------------------------------------

export interface RetryRule {
  readonly ErrorEquals: readonly string[];
  readonly IntervalSeconds?: number;
  readonly MaxAttempts?: number;
  readonly BackoffRate?: number;
  readonly MaxDelaySeconds?: number;
  readonly JitterStrategy?: 'FULL' | 'NONE';
}

export interface CatchRule {
  readonly ErrorEquals: readonly string[];
  readonly Next: string;
  readonly ResultPath?: string | null;
}
