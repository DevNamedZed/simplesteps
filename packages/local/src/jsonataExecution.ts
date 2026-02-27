// ---------------------------------------------------------------------------
// JSONata-mode state execution.
//
// In JSONata mode, states use different fields from JSONPath mode:
//   Arguments (not Parameters), Assign (not ResultPath),
//   Output (not OutputPath), Condition (not Variable+operator),
//   Items (not ItemsPath).
//
// A VariableScope persists across states, updated by Assign blocks.
// ---------------------------------------------------------------------------

import type { State, StateMachineDefinition, TaskState, PassState, ChoiceState, WaitState, FailState, SucceedState, ParallelState, MapState } from '@simplesteps/core/asl';
import type { ContextObject, StepResult, RunnerOptions } from './types.js';
import type { VariableScope } from './jsonata.js';
import type { SubMachineRunner } from './stateHandlers.js';
import { evaluateJsonata, evaluateJsonataPayload, evaluateAssign, isJsonataExpr } from './jsonata.js';
import { resolveService, executeWithRetryCatch } from './stateHandlers.js';
import { StateMachineError, normalizeError, errorMatches } from './errors.js';
import { resolvePath } from './jsonpath.js';

// ---------------------------------------------------------------------------
// Result type for JSONata execution (includes updated scope)
// ---------------------------------------------------------------------------

export interface JsonataStepResult {
  output: any;
  nextState: string | null;
  scope: VariableScope;
}

// ---------------------------------------------------------------------------
// Main dispatcher
// ---------------------------------------------------------------------------

export async function executeStateJsonata(
  state: State,
  stateName: string,
  stateData: any,
  context: ContextObject,
  options: RunnerOptions,
  scope: VariableScope,
  runSubMachine: SubMachineRunner,
): Promise<JsonataStepResult> {
  switch (state.Type) {
    case 'Task':
      return executeTaskJsonata(state, stateName, stateData, context, options, scope);
    case 'Pass':
      return executePassJsonata(state, stateName, stateData, context, scope);
    case 'Choice':
      return executeChoiceJsonata(state, stateName, stateData, context, scope);
    case 'Wait':
      return executeWaitJsonata(state, stateName, stateData, context, options, scope);
    case 'Fail':
      return executeFailJsonata(state, stateName, stateData, context, scope);
    case 'Succeed':
      return executeSucceedJsonata(state, stateData, context, scope);
    case 'Parallel':
      return executeParallelJsonata(state, stateName, stateData, context, options, scope, runSubMachine);
    case 'Map':
      return executeMapJsonata(state, stateName, stateData, context, options, scope, runSubMachine);
    default:
      throw new StateMachineError(
        'States.Runtime',
        `Unsupported state type: ${(state as any).Type} in state ${stateName}`,
      );
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeStatesBinding(input: any, context: ContextObject, result?: any) {
  return { input, context, result };
}

async function resolveOutput(
  state: any,
  defaultOutput: any,
  statesBinding: { input: any; context: ContextObject; result?: any },
  scope: VariableScope,
): Promise<any> {
  if (state.Output !== undefined) {
    return evaluateJsonataPayload(state.Output, statesBinding, scope);
  }
  return defaultOutput;
}

async function applyAssign(
  state: { Assign?: Readonly<Record<string, unknown>> },
  statesBinding: { input: any; context: ContextObject; result?: any },
  scope: VariableScope,
): Promise<VariableScope> {
  if ((state as any).Assign) {
    const bindings = await evaluateAssign((state as any).Assign, statesBinding, scope);
    return { ...scope, ...bindings };
  }
  return scope;
}

// ---------------------------------------------------------------------------
// Task (JSONata)
// ---------------------------------------------------------------------------

async function executeTaskJsonata(
  state: TaskState,
  stateName: string,
  stateData: any,
  context: ContextObject,
  options: RunnerOptions,
  scope: VariableScope,
): Promise<JsonataStepResult> {
  const statesBinding = makeStatesBinding(stateData, context);

  // Resolve Arguments (JSONata equivalent of Parameters)
  const effectiveInput = state.Arguments
    ? await evaluateJsonataPayload(state.Arguments, statesBinding, scope)
    : stateData;

  // Resolve service mock
  const resource = typeof state.Resource === 'string' ? state.Resource : JSON.stringify(state.Resource);
  const mock = resolveService(resource, options.services);
  if (!mock) {
    throw new StateMachineError(
      'States.TaskFailed',
      `No mock registered for resource: ${resource}. ` +
      `Register a mock in options.services with the resource ARN or a glob pattern.`,
    );
  }

  // Execute with retry/catch
  const retryResult = await executeWithRetryCatch(
    () => mock(effectiveInput, { stateName, resource }),
    state.Retry,
    state.Catch,
    stateData,
    context,
    options,
  );

  // If caught, handle Catch Assign
  if (retryResult.caught) {
    // In JSONata mode, Catch rules use Assign instead of ResultPath
    // The caught result already has the error output from handleCatch
    // We need to check if the catch rule has Assign with $states.errorOutput
    const catchRule = findMatchingCatchRule(state.Catch!, retryResult.caughtError!);
    if (catchRule?.Assign) {
      const errorBinding = {
        input: stateData,
        context,
        errorOutput: { Error: retryResult.caughtError!.errorName, Cause: retryResult.caughtError!.cause },
      };
      const catchBindings = await evaluateAssign(
        catchRule.Assign as Record<string, unknown>,
        errorBinding,
        scope,
      );
      return {
        output: stateData,
        nextState: catchRule.Next,
        scope: { ...scope, ...catchBindings },
      };
    }
    return { ...retryResult.caught, scope };
  }

  // Apply Assign with $states.result
  const resultBinding = makeStatesBinding(stateData, context, retryResult.value);
  const newScope = await applyAssign(state, resultBinding, scope);

  // Resolve Output
  const output = await resolveOutput(state, retryResult.value, resultBinding, newScope);

  const nextState = state.End ? null : (state.Next ?? null);
  return { output, nextState, scope: newScope };
}

function findMatchingCatchRule(
  catchRules: readonly { ErrorEquals: readonly string[]; Next: string; Assign?: any }[],
  error: { errorName: string; cause: string },
) {
  for (const rule of catchRules) {
    if (errorMatches(rule.ErrorEquals, error.errorName)) {
      return rule;
    }
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Pass (JSONata)
// ---------------------------------------------------------------------------

async function executePassJsonata(
  state: PassState,
  _stateName: string,
  stateData: any,
  context: ContextObject,
  scope: VariableScope,
): Promise<JsonataStepResult> {
  const statesBinding = makeStatesBinding(stateData, context);

  // In JSONata mode, Pass uses Result (literal) or Output (expression)
  let result = stateData;
  if (state.Result !== undefined) {
    result = state.Result;
  }

  const resultBinding = makeStatesBinding(stateData, context, result);
  const newScope = await applyAssign(state, resultBinding, scope);
  const output = await resolveOutput(state, result, resultBinding, newScope);

  const nextState = state.End ? null : (state.Next ?? null);
  return { output, nextState, scope: newScope };
}

// ---------------------------------------------------------------------------
// Choice (JSONata)
// ---------------------------------------------------------------------------

async function executeChoiceJsonata(
  state: ChoiceState,
  stateName: string,
  stateData: any,
  context: ContextObject,
  scope: VariableScope,
): Promise<JsonataStepResult> {
  const statesBinding = makeStatesBinding(stateData, context);

  for (const rule of state.Choices) {
    // JSONata mode uses Condition field
    const condition = (rule as any).Condition;
    if (condition && typeof condition === 'string') {
      const result = await evaluateJsonata(condition, statesBinding, scope);
      if (result) {
        return { output: stateData, nextState: rule.Next, scope };
      }
    }
  }

  if (state.Default) {
    return { output: stateData, nextState: state.Default, scope };
  }

  throw new StateMachineError(
    'States.NoChoiceMatched',
    `No choice rule matched and no Default in state ${stateName}`,
  );
}

// ---------------------------------------------------------------------------
// Wait (JSONata)
// ---------------------------------------------------------------------------

async function executeWaitJsonata(
  state: WaitState,
  _stateName: string,
  stateData: any,
  context: ContextObject,
  options: RunnerOptions,
  scope: VariableScope,
): Promise<JsonataStepResult> {
  if (options.simulateWaits) {
    const statesBinding = makeStatesBinding(stateData, context);
    let seconds = 0;

    if (typeof state.Seconds === 'number') {
      seconds = state.Seconds;
    } else if (typeof state.Seconds === 'string' && isJsonataExpr(state.Seconds)) {
      seconds = await evaluateJsonata(state.Seconds, statesBinding, scope);
    } else if (state.Timestamp) {
      if (typeof state.Timestamp === 'string' && isJsonataExpr(state.Timestamp)) {
        const ts = await evaluateJsonata(state.Timestamp, statesBinding, scope);
        const delta = (new Date(ts).getTime() - Date.now()) / 1000;
        seconds = Math.max(0, delta);
      } else {
        const delta = (new Date(state.Timestamp as string).getTime() - Date.now()) / 1000;
        seconds = Math.max(0, delta);
      }
    }

    if (seconds > 0) {
      await new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }
  }

  const nextState = state.End ? null : (state.Next ?? null);
  return { output: stateData, nextState, scope };
}

// ---------------------------------------------------------------------------
// Fail (JSONata)
// ---------------------------------------------------------------------------

async function executeFailJsonata(
  state: FailState,
  _stateName: string,
  stateData: any,
  context: ContextObject,
  scope: VariableScope,
): Promise<never> {
  let errorName = state.Error ?? 'States.TaskFailed';
  let cause = state.Cause ?? '';

  // In JSONata mode, Error and Cause can be JSONata expressions
  if (typeof errorName === 'string' && isJsonataExpr(errorName)) {
    errorName = await evaluateJsonata(errorName, { input: stateData, context }, scope);
  }
  if (typeof cause === 'string' && isJsonataExpr(cause)) {
    cause = await evaluateJsonata(cause, { input: stateData, context }, scope);
  }

  throw new StateMachineError(errorName, cause);
}

// ---------------------------------------------------------------------------
// Succeed (JSONata)
// ---------------------------------------------------------------------------

async function executeSucceedJsonata(
  state: SucceedState,
  stateData: any,
  context: ContextObject,
  scope: VariableScope,
): Promise<JsonataStepResult> {
  let output = stateData;
  if ((state as any).Output !== undefined) {
    const statesBinding = makeStatesBinding(stateData, context);
    output = await evaluateJsonataPayload((state as any).Output, statesBinding, scope);
  }
  return { output, nextState: null, scope };
}

// ---------------------------------------------------------------------------
// Parallel (JSONata)
// ---------------------------------------------------------------------------

async function executeParallelJsonata(
  state: ParallelState,
  stateName: string,
  stateData: any,
  context: ContextObject,
  options: RunnerOptions,
  scope: VariableScope,
  runSubMachine: SubMachineRunner,
): Promise<JsonataStepResult> {
  const executeBranches = async () => {
    return Promise.all(
      state.Branches.map(branchDef =>
        runSubMachine(branchDef, stateData, context),
      ),
    );
  };

  const retryResult = await executeWithRetryCatch(
    executeBranches,
    state.Retry,
    state.Catch,
    stateData,
    context,
    options,
  );

  if (retryResult.caught) {
    return { ...retryResult.caught, scope };
  }

  const resultBinding = makeStatesBinding(stateData, context, retryResult.value);
  const newScope = await applyAssign(state, resultBinding, scope);
  const output = await resolveOutput(state, retryResult.value, resultBinding, newScope);

  const nextState = state.End ? null : (state.Next ?? null);
  return { output, nextState, scope: newScope };
}

// ---------------------------------------------------------------------------
// Map (JSONata)
// ---------------------------------------------------------------------------

async function executeMapJsonata(
  state: MapState,
  stateName: string,
  stateData: any,
  context: ContextObject,
  options: RunnerOptions,
  scope: VariableScope,
  runSubMachine: SubMachineRunner,
): Promise<JsonataStepResult> {
  const statesBinding = makeStatesBinding(stateData, context);

  // Resolve items: JSONata uses Items (expression), JSONPath uses ItemsPath
  let items: any[];
  if (state.Items && typeof state.Items === 'string') {
    items = await evaluateJsonata(state.Items, statesBinding, scope);
  } else if (state.ItemsPath) {
    items = resolvePath(stateData, state.ItemsPath);
  } else {
    items = stateData;
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
      context.Map.Item.Index = index;
      context.Map.Item.Value = item;

      // In JSONata mode, Arguments builds per-item input
      let itemInput: any = item;
      if (state.Arguments) {
        const itemBinding = makeStatesBinding(item, context);
        itemInput = await evaluateJsonataPayload(state.Arguments, itemBinding, scope);
      }

      const itemResult = await runSubMachine(state.ItemProcessor, itemInput, context);
      results.push(itemResult);
    }
    return results;
  };

  const retryResult = await executeWithRetryCatch(
    executeIterations,
    state.Retry,
    state.Catch,
    stateData,
    context,
    options,
  );

  if (retryResult.caught) {
    return { ...retryResult.caught, scope };
  }

  const resultBinding = makeStatesBinding(stateData, context, retryResult.value);
  const newScope = await applyAssign(state, resultBinding, scope);
  const output = await resolveOutput(state, retryResult.value, resultBinding, newScope);

  const nextState = state.End ? null : (state.Next ?? null);
  return { output, nextState, scope: newScope };
}
