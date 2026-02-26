// ---------------------------------------------------------------------------
// Main state machine interpreter loop.
//
// Supports both JSONPath and JSONata query languages.
// JSONPath mode uses the existing stateHandlers (InputPath, Parameters, etc.)
// JSONata mode uses jsonataExecution (Arguments, Assign, Output, Condition, etc.)
// ---------------------------------------------------------------------------

import type { StateMachineDefinition, State } from '@simplesteps/core/asl';
import type { ContextObject, StepResult, StateExecution, ExecutionTrace, RunnerOptions } from './types.js';
import { StateMachineError } from './errors.js';
import { executePassState, executeSucceedState, executeFailState, executeWaitState, executeChoiceState, executeTaskState, executeParallelState, executeMapState } from './stateHandlers.js';
import type { SubMachineRunner } from './stateHandlers.js';
import { executeStateJsonata } from './jsonataExecution.js';
import type { VariableScope } from './jsonata.js';

// ---------------------------------------------------------------------------
// Default context
// ---------------------------------------------------------------------------

export function createDefaultContext(input: any, executionName?: string): ContextObject {
  const name = executionName ?? `local-${Date.now()}`;
  const now = new Date().toISOString();

  return {
    Execution: {
      Id: `arn:aws:states:us-east-1:123456789012:execution:LocalTest:${name}`,
      Name: name,
      StartTime: now,
      RoleArn: 'arn:aws:iam::123456789012:role/LocalTestRole',
      Input: structuredClone(input),
      RedriveCount: 0,
      RedriveStatus: 'NOT_REDRIVABLE',
    },
    State: {
      Name: '',
      EnteredTime: '',
      RetryCount: 0,
    },
    StateMachine: {
      Id: 'arn:aws:states:us-east-1:123456789012:stateMachine:LocalTest',
      Name: 'LocalTest',
    },
    Map: {
      Item: {
        Index: 0,
        Value: null,
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Shared step counter (for sub-machine execution budgets)
// ---------------------------------------------------------------------------

export interface StepCounter {
  count: number;
  max: number;
}

// ---------------------------------------------------------------------------
// Interpreter
// ---------------------------------------------------------------------------

export async function interpret(
  definition: StateMachineDefinition,
  input: any,
  context: ContextObject,
  options: RunnerOptions,
  stepCounter: StepCounter,
  trace?: StateExecution[],
  /** Variable scope for JSONata mode (shared across states). */
  scope?: VariableScope,
): Promise<any> {
  const isJsonata = definition.QueryLanguage === 'JSONata';
  let variableScope: VariableScope = scope ?? {};

  let currentStateName: string | null = definition.StartAt;
  let stateData = input;

  while (currentStateName !== null) {
    if (stepCounter.count >= stepCounter.max) {
      throw new StateMachineError(
        'States.Runtime',
        `Execution exceeded maximum of ${stepCounter.max} state transitions. ` +
        `This usually indicates an infinite loop. Increase maxSteps if this is expected.`,
      );
    }

    const state = definition.States[currentStateName];
    if (!state) {
      throw new StateMachineError(
        'States.Runtime',
        `Unknown state: ${currentStateName}`,
      );
    }

    // Update per-state context
    context.State.Name = currentStateName;
    context.State.EnteredTime = new Date().toISOString();

    const start = Date.now();
    let result: StepResult;

    try {
      if (isJsonata) {
        const subRunner = createSubMachineRunner(definition, options, stepCounter, trace, variableScope);
        const jsonataResult = await executeStateJsonata(
          state, currentStateName, stateData, context, options, variableScope, subRunner,
        );
        result = { output: jsonataResult.output, nextState: jsonataResult.nextState };
        variableScope = jsonataResult.scope;
      } else {
        result = await executeStateJsonPath(state, currentStateName, stateData, context, options, stepCounter, trace);
      }
    } catch (err) {
      const duration = Date.now() - start;
      if (trace) {
        const errInfo = err instanceof StateMachineError
          ? { name: err.errorName, message: err.cause }
          : err instanceof Error
            ? { name: err.name, message: err.message }
            : { name: 'Error', message: String(err) };
        trace.push({
          name: currentStateName,
          type: state.Type,
          input: stateData,
          output: undefined,
          duration,
          error: errInfo,
        });
      }
      throw err;
    }

    const duration = Date.now() - start;
    if (trace) {
      trace.push({
        name: currentStateName,
        type: state.Type,
        input: stateData,
        output: result.output,
        duration,
        transition: result.nextState ?? undefined,
      });
    }

    stateData = result.output;
    currentStateName = result.nextState;
    stepCounter.count++;
  }

  return stateData;
}

// ---------------------------------------------------------------------------
// JSONPath state dispatcher
// ---------------------------------------------------------------------------

async function executeStateJsonPath(
  state: State,
  stateName: string,
  stateData: any,
  context: ContextObject,
  options: RunnerOptions,
  stepCounter: StepCounter,
  trace?: StateExecution[],
): Promise<StepResult> {
  switch (state.Type) {
    case 'Pass':
      return executePassState(state, stateName, stateData, context);
    case 'Succeed':
      return executeSucceedState(state, stateName, stateData);
    case 'Fail':
      return executeFailState(state, stateName, stateData);
    case 'Wait':
      return executeWaitState(state, stateName, stateData, options);
    case 'Choice':
      return executeChoiceState(state, stateName, stateData, context);
    case 'Task':
      return executeTaskState(state, stateName, stateData, context, options);
    case 'Parallel':
      return executeParallelState(state, stateName, stateData, context, options, createSubMachineRunner(undefined, options, stepCounter, trace));
    case 'Map':
      return executeMapState(state, stateName, stateData, context, options, createSubMachineRunner(undefined, options, stepCounter, trace));
    default:
      throw new StateMachineError(
        'States.Runtime',
        `Unsupported state type: ${(state as any).Type} in state ${stateName}`,
      );
  }
}

// ---------------------------------------------------------------------------
// Sub-machine runner factory
// ---------------------------------------------------------------------------

function createSubMachineRunner(
  parentDefinition: StateMachineDefinition | undefined,
  options: RunnerOptions,
  stepCounter: StepCounter,
  trace?: StateExecution[],
  scope?: VariableScope,
): SubMachineRunner {
  return (definition, input, context) => {
    // Sub-machines (branches, map iterations) inherit the parent's query language
    // if they don't specify their own.
    const effectiveDefinition = definition.QueryLanguage
      ? definition
      : parentDefinition?.QueryLanguage
        ? { ...definition, QueryLanguage: parentDefinition.QueryLanguage } as StateMachineDefinition
        : definition;
    return interpret(effectiveDefinition, input, context, options, stepCounter, trace, scope);
  };
}
