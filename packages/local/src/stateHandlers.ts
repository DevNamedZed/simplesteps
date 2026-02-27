// ---------------------------------------------------------------------------
// State handlers for the local execution runtime.
//
// Each handler takes a state definition, state name, current state data, and
// context, and returns a StepResult { output, nextState }.
// ---------------------------------------------------------------------------

import type {
  PassState,
  SucceedState,
  FailState,
  WaitState,
  ChoiceState,
  TaskState,
  ParallelState,
  MapState,
  StateMachineDefinition,
  RetryRule,
  CatchRule,
} from '@simplesteps/core/asl';
import type { ContextObject, StepResult, RunnerOptions, ServiceMock } from './types.js';
import { StateMachineError, normalizeError, errorMatches, globMatch } from './errors.js';
import { applyInputPath, applyParameters, applyResultSelector, applyResultPath, applyOutputPath } from './dataFlow.js';
import { resolvePath, resolvePayloadTemplate } from './jsonpath.js';
import { evaluateChoiceRule } from './choiceEvaluator.js';
import { executeIntrinsic } from './intrinsics.js';

// ---------------------------------------------------------------------------
// Pass
// ---------------------------------------------------------------------------

export function executePassState(
  state: PassState,
  _stateName: string,
  stateData: any,
  context: ContextObject,
): StepResult {
  const effectiveInput = applyInputPath(stateData, state.InputPath);
  const parameterized = applyParameters(effectiveInput, state.Parameters, context, executeIntrinsic);

  // If Result is present, use it; otherwise use the parameterized input
  const result = state.Result !== undefined ? state.Result : parameterized;

  const merged = applyResultPath(stateData, state.ResultPath, result);
  const output = applyOutputPath(merged, state.OutputPath);

  const nextState = state.End ? null : (state.Next ?? null);
  return { output, nextState };
}

// ---------------------------------------------------------------------------
// Succeed
// ---------------------------------------------------------------------------

export function executeSucceedState(
  state: SucceedState,
  _stateName: string,
  stateData: any,
): StepResult {
  const effectiveInput = applyInputPath(stateData, state.InputPath);
  const output = applyOutputPath(effectiveInput, state.OutputPath);
  return { output, nextState: null };
}

// ---------------------------------------------------------------------------
// Fail
// ---------------------------------------------------------------------------

export function executeFailState(
  state: FailState,
  _stateName: string,
  stateData: any,
): never {
  let errorName = state.Error ?? 'States.TaskFailed';
  let cause = state.Cause ?? '';

  // Resolve dynamic paths if present
  if (state.ErrorPath) {
    errorName = resolvePath(stateData, state.ErrorPath) ?? errorName;
  }
  if (state.CausePath) {
    cause = resolvePath(stateData, state.CausePath) ?? cause;
  }

  throw new StateMachineError(errorName, cause);
}

// ---------------------------------------------------------------------------
// Wait
// ---------------------------------------------------------------------------

export async function executeWaitState(
  state: WaitState,
  _stateName: string,
  stateData: any,
  options: RunnerOptions,
): Promise<StepResult> {
  if (options.simulateWaits) {
    const seconds = resolveWaitDuration(state, stateData);
    if (seconds > 0) {
      await new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }
  }

  const effectiveInput = applyInputPath(stateData, state.InputPath);
  const output = applyOutputPath(effectiveInput, state.OutputPath);

  const nextState = state.End ? null : (state.Next ?? null);
  return { output, nextState };
}

// ---------------------------------------------------------------------------
// Choice
// ---------------------------------------------------------------------------

export function executeChoiceState(
  state: ChoiceState,
  stateName: string,
  stateData: any,
  context: ContextObject,
): StepResult {
  const effectiveInput = applyInputPath(stateData, state.InputPath);

  for (const rule of state.Choices) {
    if (evaluateChoiceRule(rule, effectiveInput, context)) {
      const output = applyOutputPath(effectiveInput, state.OutputPath);
      return { output, nextState: rule.Next };
    }
  }

  if (state.Default) {
    const output = applyOutputPath(effectiveInput, state.OutputPath);
    return { output, nextState: state.Default };
  }

  throw new StateMachineError(
    'States.NoChoiceMatched',
    `No choice rule matched and no Default in state ${stateName}`,
  );
}

// ---------------------------------------------------------------------------
// Task
// ---------------------------------------------------------------------------

export async function executeTaskState(
  state: TaskState,
  stateName: string,
  stateData: any,
  context: ContextObject,
  options: RunnerOptions,
): Promise<StepResult> {
  // 1. Data flow: input pipeline
  const effectiveInput = applyInputPath(stateData, state.InputPath);
  const parameterized = applyParameters(effectiveInput, state.Parameters, context, executeIntrinsic);

  // 2. Resolve service mock
  const resource = typeof state.Resource === 'string' ? state.Resource : JSON.stringify(state.Resource);
  const mock = resolveService(resource, options.services);
  if (!mock) {
    throw new StateMachineError(
      'States.TaskFailed',
      `No mock registered for resource: ${resource}. ` +
      `Register a mock in options.services with the resource ARN or a glob pattern.`,
    );
  }

  // 3. Execute with retry/catch logic
  const result = await executeWithRetry(
    mock,
    parameterized,
    state.Retry,
    state.Catch,
    stateData,
    stateName,
    resource,
    context,
    options,
  );

  // If catch triggered, it returns a StepResult directly
  if (result.caught) {
    return result.caught;
  }

  // 4. Data flow: output pipeline
  const selected = applyResultSelector(result.value, state.ResultSelector, context, executeIntrinsic);
  const merged = applyResultPath(stateData, state.ResultPath, selected);
  const output = applyOutputPath(merged, state.OutputPath);

  // 5. Determine transition
  const nextState = state.End ? null : (state.Next ?? null);
  return { output, nextState };
}

// ---------------------------------------------------------------------------
// Service mock resolution
// ---------------------------------------------------------------------------

/**
 * Resolve a service mock by resource ARN.
 * Exact matches take priority over glob patterns.
 */
export function resolveService(
  resource: string,
  services: Record<string, ServiceMock>,
): ServiceMock | undefined {
  // Exact match first
  if (services[resource]) return services[resource];

  // Glob pattern match (first match wins)
  for (const [pattern, mock] of Object.entries(services)) {
    if (pattern.includes('*') && globMatch(resource, pattern)) {
      return mock;
    }
  }

  return undefined;
}

// ---------------------------------------------------------------------------
// Retry logic
// ---------------------------------------------------------------------------

export interface RetryResult {
  value?: any;
  caught?: StepResult;
  caughtError?: { errorName: string; cause: string };
}

async function executeWithRetry(
  mock: ServiceMock,
  input: any,
  retryRules: readonly RetryRule[] | undefined,
  catchRules: readonly CatchRule[] | undefined,
  stateData: any,
  stateName: string,
  resource: string,
  context: ContextObject,
  options: RunnerOptions,
): Promise<RetryResult> {
  // Track attempts per retry rule
  const attempts = new Map<number, number>();

  while (true) {
    try {
      const value = await mock(input, { stateName, resource });
      return { value };
    } catch (thrown) {
      const { errorName, cause } = normalizeError(thrown);

      // Find matching retry rule
      const ruleIndex = findMatchingRetryRule(retryRules, errorName, attempts);

      if (ruleIndex !== -1) {
        const rule = retryRules![ruleIndex];
        const maxAttempts = rule.MaxAttempts ?? 3;
        const currentAttempts = (attempts.get(ruleIndex) ?? 0) + 1;
        attempts.set(ruleIndex, currentAttempts);

        if (currentAttempts <= maxAttempts) {
          // Update context retry count
          context.State.RetryCount = currentAttempts;

          // Delay if simulating
          if (options.retryDelays === 'simulate') {
            const intervalSeconds = rule.IntervalSeconds ?? 1;
            const backoffRate = rule.BackoffRate ?? 2.0;
            let delay = intervalSeconds * Math.pow(backoffRate, currentAttempts - 1);
            if (rule.MaxDelaySeconds !== undefined) {
              delay = Math.min(delay, rule.MaxDelaySeconds);
            }
            if (rule.JitterStrategy === 'FULL') {
              delay = Math.random() * delay;
            }
            await new Promise(resolve => setTimeout(resolve, delay * 1000));
          }

          continue; // retry
        }
      }

      // Retry exhausted or no matching rule — try Catch
      const catchResult = handleCatch(catchRules, errorName, cause, stateData);
      if (catchResult) {
        return { caught: catchResult, caughtError: { errorName, cause } };
      }

      // No catch matched — propagate error
      throw new StateMachineError(errorName, cause);
    }
  }
}

function findMatchingRetryRule(
  retryRules: readonly RetryRule[] | undefined,
  errorName: string,
  attempts: Map<number, number>,
): number {
  if (!retryRules) return -1;

  for (let i = 0; i < retryRules.length; i++) {
    if (errorMatches(retryRules[i].ErrorEquals, errorName)) {
      const maxAttempts = retryRules[i].MaxAttempts ?? 3;
      const currentAttempts = attempts.get(i) ?? 0;
      if (currentAttempts < maxAttempts) {
        return i;
      }
    }
  }

  return -1;
}

// ---------------------------------------------------------------------------
// Catch logic
// ---------------------------------------------------------------------------

function handleCatch(
  catchRules: readonly CatchRule[] | undefined,
  errorName: string,
  cause: string,
  stateData: any,
): StepResult | undefined {
  if (!catchRules || catchRules.length === 0) return undefined;

  for (const rule of catchRules) {
    if (errorMatches(rule.ErrorEquals, errorName)) {
      const errorOutput = { Error: errorName, Cause: cause };
      const output = applyResultPath(stateData, rule.ResultPath, errorOutput);
      return { output, nextState: rule.Next };
    }
  }

  return undefined;
}

// ---------------------------------------------------------------------------
// Generic retry/catch wrapper (used by Parallel and Map)
// ---------------------------------------------------------------------------

export async function executeWithRetryCatch(
  fn: () => Promise<any>,
  retryRules: readonly RetryRule[] | undefined,
  catchRules: readonly CatchRule[] | undefined,
  stateData: any,
  context: ContextObject,
  options: RunnerOptions,
): Promise<RetryResult> {
  const attempts = new Map<number, number>();

  while (true) {
    try {
      const value = await fn();
      return { value };
    } catch (thrown) {
      const { errorName, cause } = normalizeError(thrown);
      const ruleIndex = findMatchingRetryRule(retryRules, errorName, attempts);

      if (ruleIndex !== -1) {
        const rule = retryRules![ruleIndex];
        const maxAttempts = rule.MaxAttempts ?? 3;
        const currentAttempts = (attempts.get(ruleIndex) ?? 0) + 1;
        attempts.set(ruleIndex, currentAttempts);

        if (currentAttempts <= maxAttempts) {
          context.State.RetryCount = currentAttempts;
          if (options.retryDelays === 'simulate') {
            const intervalSeconds = rule.IntervalSeconds ?? 1;
            const backoffRate = rule.BackoffRate ?? 2.0;
            let delay = intervalSeconds * Math.pow(backoffRate, currentAttempts - 1);
            if (rule.MaxDelaySeconds !== undefined) delay = Math.min(delay, rule.MaxDelaySeconds);
            if (rule.JitterStrategy === 'FULL') delay = Math.random() * delay;
            await new Promise(resolve => setTimeout(resolve, delay * 1000));
          }
          continue;
        }
      }

      const catchResult = handleCatch(catchRules, errorName, cause, stateData);
      if (catchResult) return { caught: catchResult, caughtError: { errorName, cause } };
      throw new StateMachineError(errorName, cause);
    }
  }
}

// ---------------------------------------------------------------------------
// Parallel
// ---------------------------------------------------------------------------

/**
 * A function that interprets a sub-machine definition.
 * Injected from interpreter.ts to avoid circular imports.
 */
export type SubMachineRunner = (
  definition: StateMachineDefinition,
  input: any,
  context: ContextObject,
) => Promise<any>;

export async function executeParallelState(
  state: ParallelState,
  stateName: string,
  stateData: any,
  context: ContextObject,
  options: RunnerOptions,
  runSubMachine: SubMachineRunner,
): Promise<StepResult> {
  const effectiveInput = applyInputPath(stateData, state.InputPath);

  const executeBranches = async (): Promise<any> => {
    const branchResults = await Promise.all(
      state.Branches.map(branchDef =>
        runSubMachine(branchDef, effectiveInput, context),
      ),
    );
    return branchResults;
  };

  // Execute with retry/catch around the entire parallel execution
  const result = await executeWithRetryCatch(
    executeBranches,
    state.Retry,
    state.Catch,
    stateData,
    context,
    options,
  );

  if (result.caught) return result.caught;

  const selected = applyResultSelector(result.value, state.ResultSelector, context, executeIntrinsic);
  const merged = applyResultPath(stateData, state.ResultPath, selected);
  const output = applyOutputPath(merged, state.OutputPath);

  const nextState = state.End ? null : (state.Next ?? null);
  return { output, nextState };
}

// ---------------------------------------------------------------------------
// Map
// ---------------------------------------------------------------------------

export async function executeMapState(
  state: MapState,
  stateName: string,
  stateData: any,
  context: ContextObject,
  options: RunnerOptions,
  runSubMachine: SubMachineRunner,
): Promise<StepResult> {
  const effectiveInput = applyInputPath(stateData, state.InputPath);

  // Resolve items array
  let items: any[];
  if (state.ItemsPath) {
    items = resolvePath(effectiveInput, state.ItemsPath);
  } else {
    items = effectiveInput;
  }

  if (!Array.isArray(items)) {
    throw new StateMachineError(
      'States.TaskFailed',
      `Map state "${stateName}" items must be an array, got ${typeof items}`,
    );
  }

  const executeIterations = async (): Promise<any[]> => {
    const results: any[] = [];

    for (let index = 0; index < items.length; index++) {
      const item = items[index];

      // Update Map context for this iteration
      context.Map.Item.Index = index;
      context.Map.Item.Value = item;

      // Build per-item input using ItemSelector or Parameters
      let itemInput: any = item;
      const selector = state.ItemSelector ?? state.Parameters;
      if (selector) {
        itemInput = resolvePayloadTemplate(selector as Record<string, unknown>, effectiveInput, context, executeIntrinsic);
      }

      const itemResult = await runSubMachine(state.ItemProcessor, itemInput, context);
      results.push(itemResult);
    }

    return results;
  };

  // Execute with retry/catch
  const result = await executeWithRetryCatch(
    executeIterations,
    state.Retry,
    state.Catch,
    stateData,
    context,
    options,
  );

  if (result.caught) return result.caught;

  const selected = applyResultSelector(result.value, state.ResultSelector, context, executeIntrinsic);
  const merged = applyResultPath(stateData, state.ResultPath, selected);
  const output = applyOutputPath(merged, state.OutputPath);

  const nextState = state.End ? null : (state.Next ?? null);
  return { output, nextState };
}

// ---------------------------------------------------------------------------
// Wait duration resolution
// ---------------------------------------------------------------------------

function resolveWaitDuration(state: WaitState, stateData: any): number {
  if (typeof state.Seconds === 'number') return state.Seconds;
  if (state.SecondsPath) {
    const val = resolvePath(stateData, state.SecondsPath);
    return typeof val === 'number' ? val : 0;
  }
  if (state.Timestamp) {
    const target = new Date(state.Timestamp).getTime();
    const delta = (target - Date.now()) / 1000;
    return Math.max(0, delta);
  }
  if (state.TimestampPath) {
    const val = resolvePath(stateData, state.TimestampPath);
    if (typeof val === 'string') {
      const target = new Date(val).getTime();
      const delta = (target - Date.now()) / 1000;
      return Math.max(0, delta);
    }
  }
  return 0;
}
