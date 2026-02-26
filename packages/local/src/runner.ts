// ---------------------------------------------------------------------------
// LocalRunner — The public API for executing state machines locally.
// ---------------------------------------------------------------------------

import type { StateMachineDefinition } from '@simplesteps/core/asl';
import type {
  RunnerOptions,
  ExecutionTrace,
  StateExecution,
  ContextObject,
  DeepPartial,
} from './types.js';
import { StateMachineError } from './errors.js';
import { interpret, createDefaultContext, StepCounter } from './interpreter.js';

/**
 * Executes an ASL state machine definition locally with mock services.
 *
 * ```ts
 * const runner = new LocalRunner(definition, {
 *   services: {
 *     'arn:aws:lambda:*': (input) => ({ processed: true }),
 *   },
 * });
 *
 * const output = await runner.execute({ orderId: '123' });
 * ```
 */
export class LocalRunner {
  private definition: StateMachineDefinition;
  private options: RunnerOptions;

  constructor(definition: StateMachineDefinition, options?: Partial<RunnerOptions>) {
    this.definition = definition;
    this.options = {
      services: options?.services ?? {},
      context: options?.context,
      maxSteps: options?.maxSteps,
      simulateWaits: options?.simulateWaits,
      retryDelays: options?.retryDelays,
    };
  }

  /**
   * Execute the state machine with the given input.
   * Returns the final output.
   * Throws if the state machine reaches a Fail state or an uncaught error.
   */
  async execute(input?: any): Promise<any> {
    const context = this.buildContext(input ?? {});
    const stepCounter: StepCounter = {
      count: 0,
      max: this.options.maxSteps ?? 1000,
    };

    return interpret(this.definition, input ?? {}, context, this.options, stepCounter);
  }

  /**
   * Execute the state machine and return both the output and a detailed trace.
   * Does NOT throw on Fail states — check trace.error instead.
   */
  async executeWithTrace(input?: any): Promise<{ output: any; trace: ExecutionTrace }> {
    const context = this.buildContext(input ?? {});
    const stepCounter: StepCounter = {
      count: 0,
      max: this.options.maxSteps ?? 1000,
    };
    const states: StateExecution[] = [];

    try {
      const output = await interpret(this.definition, input ?? {}, context, this.options, stepCounter, states);
      return {
        output,
        trace: {
          states,
          totalSteps: stepCounter.count,
          finalOutput: output,
        },
      };
    } catch (err) {
      const error = err instanceof StateMachineError
        ? { name: err.errorName, message: err.cause }
        : err instanceof Error
          ? { name: err.name, message: err.message }
          : { name: 'Error', message: String(err) };

      return {
        output: undefined,
        trace: {
          states,
          totalSteps: stepCounter.count,
          finalOutput: undefined,
          error,
        },
      };
    }
  }

  // ---------------------------------------------------------------------------
  // Internal
  // ---------------------------------------------------------------------------

  private buildContext(input: any): ContextObject {
    const context = createDefaultContext(input);

    // Apply user-provided context overrides
    if (this.options.context) {
      mergeDeep(context, this.options.context);
    }

    return context;
  }
}

// ---------------------------------------------------------------------------
// Deep merge utility
// ---------------------------------------------------------------------------

function mergeDeep(target: any, source: any): any {
  for (const key of Object.keys(source)) {
    if (
      source[key] !== null &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] !== null &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      mergeDeep(target[key], source[key]);
    } else if (source[key] !== undefined) {
      target[key] = source[key];
    }
  }
  return target;
}
