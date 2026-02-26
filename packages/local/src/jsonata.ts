// ---------------------------------------------------------------------------
// JSONata expression evaluator for the local execution runtime.
//
// Wraps the `jsonata` npm package to evaluate {% %} delimited expressions
// with proper $states binding and variable scope.
// ---------------------------------------------------------------------------

import jsonata from 'jsonata';
import type { ContextObject } from './types.js';

/**
 * Variable scope that persists across states in JSONata mode.
 * Variables are set by `Assign` blocks and accessible as `$varName`.
 */
export type VariableScope = Record<string, any>;

/**
 * The $states context object available inside JSONata expressions.
 */
interface StatesBinding {
  input: any;
  context: ContextObject;
  result?: any;
  errorOutput?: any;
}

/**
 * Evaluate a JSONata expression string.
 * Handles both {% expr %} wrapped strings and raw expressions.
 */
export async function evaluateJsonata(
  expr: string,
  statesBinding: StatesBinding,
  scope: VariableScope,
): Promise<any> {
  const raw = stripDelimiters(expr);
  const compiled = jsonata(raw);

  // Bind $states special variable
  compiled.assign('states', statesBinding);

  // Bind all user-scope variables
  for (const [key, value] of Object.entries(scope)) {
    compiled.assign(key, value);
  }

  return compiled.evaluate({});
}

/**
 * Evaluate an Arguments/Output/ItemSelector object or expression.
 * - If the value is a string starting with {% — evaluate as a single JSONata expression.
 * - If the value is an object — recursively evaluate any {% %} string values.
 * - Otherwise return as-is (literal).
 */
export async function evaluateJsonataPayload(
  payload: any,
  statesBinding: StatesBinding,
  scope: VariableScope,
): Promise<any> {
  if (payload === null || payload === undefined) return payload;

  if (typeof payload === 'string') {
    if (isJsonataExpr(payload)) {
      return evaluateJsonata(payload, statesBinding, scope);
    }
    return payload;
  }

  if (Array.isArray(payload)) {
    return Promise.all(payload.map(item => evaluateJsonataPayload(item, statesBinding, scope)));
  }

  if (typeof payload === 'object') {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(payload)) {
      result[key] = await evaluateJsonataPayload(value, statesBinding, scope);
    }
    return result;
  }

  return payload;
}

/**
 * Evaluate an Assign block, returning the new variable bindings.
 * Each value in the Assign object is a JSONata expression that gets evaluated.
 */
export async function evaluateAssign(
  assign: Record<string, unknown>,
  statesBinding: StatesBinding,
  scope: VariableScope,
): Promise<Record<string, any>> {
  const bindings: Record<string, any> = {};
  for (const [key, value] of Object.entries(assign)) {
    bindings[key] = await evaluateJsonataPayload(value, statesBinding, scope);
  }
  return bindings;
}

/**
 * Check if a string is a JSONata expression (wrapped in {% %}).
 */
export function isJsonataExpr(value: string): boolean {
  return value.startsWith('{%') && value.endsWith('%}');
}

/**
 * Strip {% %} delimiters from a JSONata expression string.
 */
function stripDelimiters(expr: string): string {
  if (expr.startsWith('{%') && expr.endsWith('%}')) {
    return expr.slice(2, -2).trim();
  }
  return expr.trim();
}
