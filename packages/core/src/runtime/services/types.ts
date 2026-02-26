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
  readonly credentials?: { readonly RoleArn: string };
  /** ASL Comment field on the generated Task state. */
  readonly comment?: string;
  /** ASL InputPath — filter input before the state runs. */
  readonly inputPath?: string;
  /** ASL OutputPath — filter output after the state runs. */
  readonly outputPath?: string;
  /** ASL ResultSelector — reshape the result (JSONPath mode only). */
  readonly resultSelector?: Readonly<Record<string, unknown>>;
}
