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
// 3. MapOptions
// ---------------------------------------------------------------------------

export interface MapOptions {
  readonly maxConcurrency?: number;
  readonly retry?: import('./services/types').RetryPolicy | readonly import('./services/types').RetryPolicy[];
}

// ---------------------------------------------------------------------------
// 3b. DistributedMapOptions
// ---------------------------------------------------------------------------

export interface ItemReaderConfig {
  readonly Resource: 'arn:aws:states:::s3:getObject';
  readonly ReaderConfig: {
    readonly InputType: 'CSV' | 'JSON' | 'MANIFEST';
    readonly CSVHeaderLocation?: 'FIRST_ROW' | 'GIVEN';
    readonly CSVHeaders?: readonly string[];
    readonly MaxItems?: number;
  };
  readonly Parameters?: Record<string, unknown>;
}

export interface ResultWriterConfig {
  readonly Resource: 'arn:aws:states:::s3:putObject';
  readonly Parameters?: Record<string, unknown>;
}

export interface ItemBatcherConfig {
  readonly MaxItemsPerBatch?: number;
  readonly MaxInputBytesPerBatch?: number;
  readonly BatchInput?: Record<string, unknown>;
}

export interface DistributedMapOptions {
  readonly maxConcurrency?: number;
  readonly executionType?: 'STANDARD' | 'EXPRESS';
  readonly itemReader?: ItemReaderConfig;
  readonly resultWriter?: ResultWriterConfig;
  readonly itemBatcher?: ItemBatcherConfig;
  readonly toleratedFailurePercentage?: number;
  readonly toleratedFailureCount?: number;
  readonly label?: string;
  readonly retry?: import('./services/types').RetryPolicy | readonly import('./services/types').RetryPolicy[];
}

// ---------------------------------------------------------------------------
// 3c. ParallelOptions
// ---------------------------------------------------------------------------

export interface ParallelOptions {
  readonly retry?: import('./services/types').RetryPolicy | readonly import('./services/types').RetryPolicy[];
}

// ---------------------------------------------------------------------------
// 4. HashAlgorithm
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
    // Return a stub — safe for CDK inline workflows where the transformer
    // replaces this call before runtime. The stub is an opaque marker.
    return _factory as unknown as StepFunctionDefinition<TInput, TOutput>;
  }

  static delay(_options: DelayOptions): void {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  static sequential<T>(_array: readonly T[]): SequentialIterable<T> {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  /**
   * Wrap an array for use with for...of, with optional Map state configuration.
   * Supports maxConcurrency and closures (outer variable capture).
   *
   * @example
   *   for (const item of Steps.items(input.items, { maxConcurrency: 5 })) {
   *     await processItem.call({ item, prefix: config.prefix });
   *   }
   */
  static items<T>(
    _array: readonly T[],
    _options?: MapOptions,
  ): Iterable<T> {
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

  // -- Map with options ----------------------------------------------------

  /**
   * Iterate over an array and execute the callback for each item,
   * compiling to a Map state with optional concurrency control.
   *
   * @example
   *   const results = await Steps.map(input.items, async (item) => {
   *     return await processItem.call({ item });
   *   }, { maxConcurrency: 10 });
   */
  static map<T, R>(
    _items: readonly T[],
    _callback: (item: T) => Promise<R>,
    _options?: MapOptions,
  ): Promise<R[]> {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  // -- Distributed Map -----------------------------------------------------

  /**
   * Distributed Map: large-scale parallel iteration with S3-based I/O.
   * Compiles to a Map state with ProcessorConfig DISTRIBUTED.
   *
   * @example
   *   const results = await Steps.distributedMap(
   *     input.items,
   *     async (item) => { return await processItem.call({ item }); },
   *     {
   *       maxConcurrency: 1000,
   *       itemReader: {
   *         Resource: 'arn:aws:states:::s3:getObject',
   *         ReaderConfig: { InputType: 'CSV' },
   *         Parameters: { Bucket: 'my-bucket', Key: 'data.csv' },
   *       },
   *       resultWriter: {
   *         Resource: 'arn:aws:states:::s3:putObject',
   *         Parameters: { Bucket: 'my-bucket', Prefix: 'results/' },
   *       },
   *       toleratedFailurePercentage: 5,
   *       label: 'ProcessRecords',
   *     },
   *   );
   */
  static distributedMap<T, R>(
    _items: readonly T[],
    _callback: (item: T) => Promise<R>,
    _options?: DistributedMapOptions,
  ): Promise<R[]> {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  // -- Compiler hints ------------------------------------------------------

  /**
   * Escape hatch for data flow analysis.
   *
   * Wraps a value that the compiler cannot prove is constant, but the
   * developer knows will be available at runtime. The compiler emits a
   * warning (SS708) instead of an error, and passes the value through
   * unchanged to the ASL output.
   *
   * @example
   *   const arn = getArnFromConfig();
   *   const svc = Lambda<Req, Res>(Steps.safeVar(arn));
   */
  static safeVar<T>(_value: T): T {
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

  /**
   * Emit an explicit Succeed state. Terminates the current execution path.
   *
   * @example
   *   Steps.succeed();
   */
  static succeed(): never {
    throw new Error(RUNTIME_ERROR_MESSAGE);
  }

  /**
   * Execute branches in parallel with optional retry configuration.
   * Compiles to ASL Parallel state with Retry rules.
   *
   * @example
   *   const [a, b] = await Steps.parallel(
   *     [() => svc1.call(input), () => svc2.call(input)],
   *     { retry: { errorEquals: ['States.ALL'], maxAttempts: 3 } },
   *   );
   */
  static parallel<T extends readonly unknown[]>(
    _branches: { [K in keyof T]: () => Promise<T[K]> },
    _options?: ParallelOptions,
  ): Promise<T> {
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
