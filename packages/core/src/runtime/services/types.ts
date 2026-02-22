/** Retry configuration for service calls. */
export interface RetryPolicy {
  readonly errorEquals?: readonly string[];
  readonly intervalSeconds?: number;
  readonly maxAttempts?: number;
  readonly backoffRate?: number;
  readonly maxDelaySeconds?: number;
  readonly jitterStrategy?: 'FULL' | 'NONE';
}
