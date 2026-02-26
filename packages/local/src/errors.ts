// ---------------------------------------------------------------------------
// Error types for the local execution runtime
// ---------------------------------------------------------------------------

/**
 * Represents an ASL error with a name and cause, mirroring the Step Functions
 * error model. Used both internally and by service mocks.
 */
export class StateMachineError extends Error {
  constructor(
    public readonly errorName: string,
    public readonly cause: string,
  ) {
    super(`${errorName}: ${cause}`);
    this.name = 'StateMachineError';
  }
}

/**
 * Normalize any thrown value into an errorName + cause pair.
 */
export function normalizeError(thrown: unknown): { errorName: string; cause: string } {
  if (thrown instanceof StateMachineError) {
    return { errorName: thrown.errorName, cause: thrown.cause };
  }
  if (thrown instanceof Error) {
    return { errorName: thrown.name || 'Error', cause: thrown.message || '' };
  }
  if (typeof thrown === 'string') {
    return { errorName: 'States.TaskFailed', cause: thrown };
  }
  return { errorName: 'States.TaskFailed', cause: String(thrown) };
}

/**
 * Check if an error name matches an ErrorEquals entry.
 * - 'States.ALL' matches any error.
 * - 'States.TaskFailed' matches any non-system error.
 * - Everything else is exact string match.
 */
export function errorMatches(errorEquals: readonly string[], errorName: string): boolean {
  for (const pattern of errorEquals) {
    if (pattern === 'States.ALL') return true;
    if (pattern === 'States.TaskFailed' && !errorName.startsWith('States.')) return true;
    if (pattern === errorName) return true;
  }
  return false;
}

/**
 * Glob matching for resource ARN patterns.
 * Supports '*' as a wildcard matching any sequence of characters.
 */
export function globMatch(value: string, pattern: string): boolean {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp('^' + escaped.replace(/\*/g, '.*') + '$');
  return regex.test(value);
}
