// ---------------------------------------------------------------------------
// ASL module — public API
// ---------------------------------------------------------------------------

export type {
  StateMachineDefinition,
  State,
  StateBase,
  TerminalFields,
  TaskState,
  PassState,
  ChoiceState,
  WaitState,
  FailState,
  ParallelState,
  MapState,
  SucceedState,
  ChoiceRule,
  ComparisonRule,
  NotRule,
  AndRule,
  OrRule,
  RetryRule,
  CatchRule,
} from './types.js';

import type { StateMachineDefinition } from './types.js';

// ---- Validation error -----------------------------------------------------

export interface AslValidationError {
  readonly code: string;
  readonly message: string;
  readonly stateName?: string;
  readonly field?: string;
  readonly severity: 'error' | 'warning';
}

// ---- Parse result ---------------------------------------------------------

export interface AslParseResult {
  readonly definition?: StateMachineDefinition;
  readonly errors: readonly AslValidationError[];
}

// ---- Parser ---------------------------------------------------------------

export class AslParser {
  static parse(json: string): StateMachineDefinition {
    throw new Error('Not implemented');
  }

  static parseAndValidate(json: string): AslParseResult {
    throw new Error('Not implemented');
  }
}

// ---- Deep clean helper ----------------------------------------------------

function deepClean(obj: unknown): unknown {
  if (obj === null) return null;
  if (obj === undefined) return undefined;
  if (Array.isArray(obj)) return obj.map(deepClean);
  if (typeof obj === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      if (value === undefined) continue;
      result[key] = deepClean(value);
    }
    return result;
  }
  return obj;
}

// ---- Serializer -----------------------------------------------------------

export class AslSerializer {
  static serialize(def: StateMachineDefinition, indent: number = 2): string {
    return JSON.stringify(deepClean(def), null, indent);
  }

  static serializeToObject(
    def: StateMachineDefinition,
  ): Record<string, any> {
    return deepClean(def) as Record<string, any>;
  }
}

// ---- Validator ------------------------------------------------------------

export class AslValidator {
  static validate(
    def: StateMachineDefinition,
  ): readonly AslValidationError[] {
    throw new Error('Not implemented');
  }

  static isValid(def: StateMachineDefinition): boolean {
    throw new Error('Not implemented');
  }
}
