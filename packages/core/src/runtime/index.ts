// ---------------------------------------------------------------------------
// SimpleSteps Runtime Types
//
// These types exist ONLY for the TypeScript type checker and compiler symbol
// resolution. Every method / constructor throws at runtime.
// ---------------------------------------------------------------------------

const RUNTIME_ERROR_MESSAGE =
  'SimpleSteps runtime types cannot be called directly. They exist only for the compiler.';

// ---------------------------------------------------------------------------
// 1. StepFunctionDefinition – opaque branded type
// ---------------------------------------------------------------------------

export type StepFunctionDefinition<TInput, TOutput> = {
  readonly __brand: 'StepFunctionDefinition';
  readonly __input: TInput;
  readonly __output: TOutput;
};

// ---------------------------------------------------------------------------
// 2. DelayOptions
// ---------------------------------------------------------------------------

export interface DelayOptions {
  seconds?: number;
  timestamp?: string;
  secondsPath?: string;
  timestampPath?: string;
}

// ---------------------------------------------------------------------------
// 3. HashAlgorithm
// ---------------------------------------------------------------------------

export type HashAlgorithm = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

// ---------------------------------------------------------------------------
// 4. SequentialIterable<T>
// ---------------------------------------------------------------------------

export type SequentialIterable<T> = Iterable<T> & {
  readonly __brand: 'SequentialIterable';
};

// ---------------------------------------------------------------------------
// 5. Steps – static-only class
// ---------------------------------------------------------------------------

export class Steps {
  private constructor() {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  // -- Core helpers --------------------------------------------------------

  static createFunction<TInput, TOutput>(
    _factory: (context: SimpleStepContext, input: TInput) => Promise<TOutput>,
  ): StepFunctionDefinition<TInput, TOutput> {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  static delay(_options: DelayOptions): void {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  static sequential<T>(_array: readonly T[]): SequentialIterable<T> {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  // -- Intrinsic functions -------------------------------------------------

  static format(_template: string, ..._args: any[]): string {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  static add(_a: number, _b: number): number {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  static random(_start: number, _end: number): number {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  static uuid(): string {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  static hash(_data: string, _algorithm: HashAlgorithm): string {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  static base64Encode(_data: string): string {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  static base64Decode(_data: string): string {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  static array(..._items: any[]): any[] {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  static arrayPartition<T>(_array: readonly T[], _size: number): T[][] {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  static partition<T>(array: readonly T[], size: number): T[][] {
    return Steps.arrayPartition(array, size);
  }

  static arrayContains<T>(_array: readonly T[], _value: T): boolean {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  static arrayRange(_start: number, _end: number, _step: number): number[] {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  static range(start: number, end: number, step: number): number[] {
    return Steps.arrayRange(start, end, step);
  }

  static arrayGetItem<T>(_array: readonly T[], _index: number): T {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  static arrayLength<T>(_array: readonly T[]): number {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  static arrayUnique<T>(_array: readonly T[]): T[] {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  static unique<T>(array: readonly T[]): T[] {
    return Steps.arrayUnique(array);
  }

  static arraySlice<T>(_array: readonly T[], _start: number, _end: number): T[] {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  static jsonParse(_str: string): any {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  static jsonStringify(_obj: any): string {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  static merge(_obj1: any, _obj2: any, _deep?: boolean): any {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  // -- Escape hatch --------------------------------------------------------

  /**
   * Direct SDK integration for any AWS service not covered by the
   * built-in bindings. Compiles to a Task state with:
   *   Resource: "arn:aws:states:::aws-sdk:<service>:<action>"
   *
   * @example
   *   const result = await Steps.awsSdk<
   *     { Bucket: string; Key: string },
   *     { Body: string }
   *   >('S3', 'GetObject', { Bucket: 'my-bucket', Key: input.key });
   */
  static awsSdk<TInput extends Record<string, any> = Record<string, any>, TOutput = any>(
    _service: string,
    _action: string,
    _parameters: TInput,
  ): Promise<TOutput> {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }
}

// ---------------------------------------------------------------------------
// 6. SimpleStepContext
// ---------------------------------------------------------------------------

export class SimpleStepContext {
  readonly execution!: {
    readonly id: string;
    readonly name: string;
    readonly startTime: string;
    readonly roleArn: string;
    readonly input: any;
    readonly redriveCount: number;
    readonly redriveStatus: string;
  };

  readonly state!: {
    readonly name: string;
    readonly enteredTime: string;
    readonly retryCount: number;
  };

  readonly stateMachine!: {
    readonly id: string;
    readonly name: string;
  };

  readonly task!: {
    readonly token: string;
  };

  readonly map!: {
    readonly item: {
      readonly index: number;
      readonly value: any;
    };
  };

  constructor() {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  getInput<T>(): T {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }
}

// ---------------------------------------------------------------------------
// 7. StepException + predefined ASL error subclasses
// ---------------------------------------------------------------------------

export class StepException extends Error {}

// Predefined ASL errors (States Language Appendix A)
export class TimeoutError extends StepException {}
export class TaskFailedError extends StepException {}
export class PermissionsError extends StepException {}
export class HeartbeatTimeoutError extends StepException {}
export class BranchFailedError extends StepException {}
export class NoChoiceMatchedError extends StepException {}
export class IntrinsicFailureError extends StepException {}
export class ResultPathMatchFailureError extends StepException {}
export class ParameterPathFailureError extends StepException {}
export class ItemReaderFailedError extends StepException {}
export class ResultWriterFailedError extends StepException {}
export class ExceedToleratedFailureError extends StepException {}

/**
 * Maps built-in error class names to ASL error strings.
 * Custom StepException subclasses not in this map use their class name directly.
 */
export const STEP_ERROR_NAMES: Record<string, string> = {
  StepException: 'States.ALL',
  TimeoutError: 'States.Timeout',
  TaskFailedError: 'States.TaskFailed',
  PermissionsError: 'States.Permissions',
  HeartbeatTimeoutError: 'States.HeartbeatTimeout',
  BranchFailedError: 'States.BranchFailed',
  NoChoiceMatchedError: 'States.NoChoiceMatched',
  IntrinsicFailureError: 'States.IntrinsicFailure',
  ResultPathMatchFailureError: 'States.ResultPathMatchFailure',
  ParameterPathFailureError: 'States.ParameterPathFailure',
  ItemReaderFailedError: 'States.ItemReaderFailed',
  ResultWriterFailedError: 'States.ResultWriterFailed',
  ExceedToleratedFailureError: 'States.ExceedToleratedFailureThreshold',
};

// ---------------------------------------------------------------------------
// 8. stepFunction decorator
// ---------------------------------------------------------------------------

export function stepFunction(
  _target: any,
  _propertyKey: string,
  descriptor: PropertyDescriptor,
): PropertyDescriptor {
  return descriptor;
}
