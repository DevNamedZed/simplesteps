/** Retry configuration for service calls. */
export interface RetryPolicy {
  /** Error names as strings (e.g., ['States.Timeout', 'States.TaskFailed']). */
  readonly errorEquals?: readonly string[];
  /** Error classes for type-safe error matching (e.g., [TimeoutError, TaskFailedError]). */
  readonly errors?: readonly (new (...args: any[]) => Error)[];
  readonly intervalSeconds?: number;
  readonly maxAttempts?: number;
  readonly backoffRate?: number;
  readonly maxDelaySeconds?: number;
  readonly jitterStrategy?: 'FULL' | 'NONE';
}

/** Shared base type for service call options (retry, timeout, heartbeat). */
export interface TaskOptions {
  readonly retry?: RetryPolicy | readonly RetryPolicy[];
  readonly timeoutSeconds?: number;
  readonly heartbeatSeconds?: number;
}
