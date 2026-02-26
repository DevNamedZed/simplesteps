// ---------------------------------------------------------------------------
// Public types for the local execution runtime
// ---------------------------------------------------------------------------

/**
 * A function that simulates a service integration.
 * Receives the effective input after Parameters/Arguments processing.
 * The optional second argument provides execution context (state name, resource ARN).
 * Returns the simulated service response.
 * Throw to simulate a service error (caught by Retry/Catch rules).
 */
export type ServiceMock = (
  input: any,
  context?: { stateName: string; resource: string },
) => Promise<any> | any;

/**
 * Options for the LocalRunner.
 */
export interface RunnerOptions {
  /**
   * Mock service implementations keyed by resource ARN or glob pattern.
   * Exact ARN matches take priority over pattern matches.
   */
  services: Record<string, ServiceMock>;

  /**
   * Override fields in the $$ context object.
   * Merged shallowly into the default simulated context.
   */
  context?: DeepPartial<ContextObject>;

  /**
   * Maximum number of state transitions before aborting execution.
   * Prevents infinite loops in workflows with back-edges.
   * Default: 1000.
   */
  maxSteps?: number;

  /**
   * Whether to honor Wait state durations.
   * Default: false (Wait states complete instantly).
   */
  simulateWaits?: boolean;

  /**
   * Retry delay behavior.
   * - 'skip': retry immediately (default, best for unit tests)
   * - 'simulate': wait actual IntervalSeconds * BackoffRate
   */
  retryDelays?: 'skip' | 'simulate';
}

/**
 * Detailed execution trace for debugging.
 */
export interface ExecutionTrace {
  /** Ordered list of every state execution. */
  states: StateExecution[];

  /** Total number of state transitions (equals states.length). */
  totalSteps: number;

  /** The final output of the state machine, or undefined if it failed. */
  finalOutput: any;

  /** If the execution failed, the terminal error. */
  error?: ExecutionError;
}

export interface StateExecution {
  /** The state name as it appears in the ASL States map. */
  name: string;

  /** The ASL state type (Task, Pass, Choice, etc.). */
  type: string;

  /** The effective input to this state (after InputPath + Parameters). */
  input: any;

  /** The output of this state (after ResultSelector + ResultPath + OutputPath). */
  output: any;

  /** Wall-clock duration of this state execution in milliseconds. */
  duration: number;

  /** If this state failed, the error details. */
  error?: ExecutionError;

  /** For Choice states: which branch was taken (Next state name). */
  transition?: string;

  /** Current retry attempt number (0-based), if retrying. */
  retryAttempt?: number;
}

export interface ExecutionError {
  /** The ASL error name (e.g., 'States.TaskFailed', custom string). */
  name: string;

  /** Human-readable error message. */
  message: string;
}

/**
 * Matches the AWS Step Functions context object structure.
 */
export interface ContextObject {
  Execution: {
    Id: string;
    Name: string;
    StartTime: string;
    RoleArn: string;
    Input: any;
    RedriveCount: number;
    RedriveStatus: string;
  };
  State: {
    Name: string;
    EnteredTime: string;
    RetryCount: number;
  };
  StateMachine: {
    Id: string;
    Name: string;
  };
  Map: {
    Item: {
      Index: number;
      Value: any;
    };
  };
}

/**
 * Internal result returned by each state handler.
 */
export interface StepResult {
  output: any;
  nextState: string | null;
}

// ---------------------------------------------------------------------------
// Utility types
// ---------------------------------------------------------------------------

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
