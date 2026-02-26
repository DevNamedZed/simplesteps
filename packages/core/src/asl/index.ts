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

import type { StateMachineDefinition, State, ChoiceRule } from './types.js';

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
    return JSON.parse(json) as StateMachineDefinition;
  }

  static parseAndValidate(json: string): AslParseResult {
    let definition: StateMachineDefinition;
    try {
      definition = JSON.parse(json) as StateMachineDefinition;
    } catch {
      return {
        errors: [{
          code: 'ASL001', message: 'Invalid JSON', severity: 'error',
        }],
      };
    }
    const errors = AslValidator.validate(definition);
    return { definition, errors };
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

/** Fields that should not appear in JSONata mode. */
const PATH_FIELDS = [
  'InputPath', 'OutputPath', 'ResultPath', 'ItemsPath',
  'TimeoutSecondsPath', 'HeartbeatSecondsPath', 'SecondsPath', 'TimestampPath',
];

export class AslValidator {
  static validate(
    def: StateMachineDefinition,
  ): readonly AslValidationError[] {
    const errors: AslValidationError[] = [];
    const states = def.States ?? {};
    const stateNames = new Set(Object.keys(states));

    // 1. StartAt must reference a valid state
    if (!def.StartAt) {
      errors.push({ code: 'ASL100', message: 'Missing StartAt field', severity: 'error' });
    } else if (!stateNames.has(def.StartAt)) {
      errors.push({
        code: 'ASL101', message: `StartAt "${def.StartAt}" does not match any state`, severity: 'error',
      });
    }

    // 2. Validate each state
    for (const [name, state] of Object.entries(states)) {
      validateState(name, state, stateNames, def.QueryLanguage, errors);
    }

    return errors;
  }

  static isValid(def: StateMachineDefinition): boolean {
    return AslValidator.validate(def).length === 0;
  }
}

function validateState(
  name: string,
  state: State,
  stateNames: ReadonlySet<string>,
  queryLanguage: string | undefined,
  errors: AslValidationError[],
): void {
  const s = state as unknown as Record<string, unknown>;

  // Terminal check: non-terminal states need Next or End
  if (state.Type !== 'Choice' && state.Type !== 'Fail' && state.Type !== 'Succeed') {
    const hasNext = 'Next' in s && typeof s.Next === 'string';
    const hasEnd = 'End' in s && s.End === true;
    if (!hasNext && !hasEnd) {
      errors.push({
        code: 'ASL200', message: `State "${name}" has neither Next nor End: true`,
        stateName: name, severity: 'error',
      });
    }
    if (hasNext && !stateNames.has(s.Next as string)) {
      errors.push({
        code: 'ASL201', message: `State "${name}" Next target "${s.Next}" does not exist`,
        stateName: name, field: 'Next', severity: 'error',
      });
    }
  }

  // Choice state rules
  if (state.Type === 'Choice') {
    const choices = (s as any).Choices as ChoiceRule[] | undefined;
    if (choices) {
      for (const rule of choices) {
        const next = (rule as any).Next;
        if (next && !stateNames.has(next)) {
          errors.push({
            code: 'ASL202', message: `Choice rule in "${name}" targets non-existent state "${next}"`,
            stateName: name, field: 'Choices', severity: 'error',
          });
        }
      }
    }
    const def = (s as any).Default;
    if (def && !stateNames.has(def)) {
      errors.push({
        code: 'ASL203', message: `Choice Default in "${name}" targets non-existent state "${def}"`,
        stateName: name, field: 'Default', severity: 'error',
      });
    }
  }

  // Catch/Retry Next targets
  const catchRules = (s as any).Catch as Array<{ Next?: string }> | undefined;
  if (catchRules) {
    for (const rule of catchRules) {
      if (rule.Next && !stateNames.has(rule.Next)) {
        errors.push({
          code: 'ASL204', message: `Catch in "${name}" targets non-existent state "${rule.Next}"`,
          stateName: name, field: 'Catch', severity: 'error',
        });
      }
    }
  }

  // Sub-state-machines: Map ItemProcessor, Parallel Branches
  if (state.Type === 'Map') {
    const processor = (s as any).ItemProcessor as StateMachineDefinition | undefined;
    if (processor) validateSubMachine(name, 'ItemProcessor', processor, errors, queryLanguage);
  }
  if (state.Type === 'Parallel') {
    const branches = (s as any).Branches as StateMachineDefinition[] | undefined;
    if (branches) {
      branches.forEach((b, i) => validateSubMachine(name, `Branches[${i}]`, b, errors, queryLanguage));
    }
  }

  // JSONata mode: no *Path fields
  if (queryLanguage === 'JSONata') {
    for (const field of PATH_FIELDS) {
      if (field in s && s[field] !== undefined) {
        errors.push({
          code: 'ASL300', message: `State "${name}" has "${field}" in JSONata mode (not allowed)`,
          stateName: name, field, severity: 'error',
        });
      }
    }
  }
}

function validateSubMachine(
  parentName: string,
  path: string,
  sub: StateMachineDefinition,
  errors: AslValidationError[],
  queryLanguage: string | undefined,
): void {
  const subStates = sub.States ?? {};
  const subNames = new Set(Object.keys(subStates));

  if (!sub.StartAt) {
    errors.push({
      code: 'ASL110', message: `${parentName}.${path} missing StartAt`,
      stateName: parentName, field: path, severity: 'error',
    });
  } else if (!subNames.has(sub.StartAt)) {
    errors.push({
      code: 'ASL111', message: `${parentName}.${path} StartAt "${sub.StartAt}" not found in States`,
      stateName: parentName, field: path, severity: 'error',
    });
  }

  for (const [name, state] of Object.entries(subStates)) {
    validateState(name, state, subNames, queryLanguage, errors);
  }
}
