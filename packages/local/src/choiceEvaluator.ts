// ---------------------------------------------------------------------------
// Choice rule evaluation for JSONPath mode.
//
// Implements all ASL comparison operators and compound rules (Not, And, Or).
// ---------------------------------------------------------------------------

import type { ChoiceRule, ComparisonRule } from '@simplesteps/core/asl';
import type { ContextObject } from './types.js';
import { resolveReference } from './jsonpath.js';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Evaluate a Choice rule against state data.
 * Returns true if the rule matches.
 */
export function evaluateChoiceRule(
  rule: ChoiceRule,
  stateData: any,
  context: ContextObject,
): boolean {
  if ('Not' in rule) {
    return !evaluateChoiceRule((rule as any).Not, stateData, context);
  }
  if ('And' in rule) {
    return (rule as any).And.every((r: ChoiceRule) => evaluateChoiceRule(r, stateData, context));
  }
  if ('Or' in rule) {
    return (rule as any).Or.some((r: ChoiceRule) => evaluateChoiceRule(r, stateData, context));
  }
  return evaluateComparisonRule(rule as ComparisonRule, stateData, context);
}

// ---------------------------------------------------------------------------
// Comparison rule evaluation
// ---------------------------------------------------------------------------

function evaluateComparisonRule(
  rule: ComparisonRule,
  stateData: any,
  context: ContextObject,
): boolean {
  const variable = rule.Variable;
  if (!variable) return false;

  const value = resolveReference(variable, stateData, context);

  // String comparisons
  if (rule.StringEquals !== undefined) return value === rule.StringEquals;
  if (rule.StringEqualsPath !== undefined) return value === resolveReference(rule.StringEqualsPath, stateData, context);
  if (rule.StringGreaterThan !== undefined) return typeof value === 'string' && value > rule.StringGreaterThan;
  if (rule.StringGreaterThanPath !== undefined) return typeof value === 'string' && value > resolveReference(rule.StringGreaterThanPath, stateData, context);
  if (rule.StringGreaterThanEquals !== undefined) return typeof value === 'string' && value >= rule.StringGreaterThanEquals;
  if (rule.StringGreaterThanEqualsPath !== undefined) return typeof value === 'string' && value >= resolveReference(rule.StringGreaterThanEqualsPath, stateData, context);
  if (rule.StringLessThan !== undefined) return typeof value === 'string' && value < rule.StringLessThan;
  if (rule.StringLessThanPath !== undefined) return typeof value === 'string' && value < resolveReference(rule.StringLessThanPath, stateData, context);
  if (rule.StringLessThanEquals !== undefined) return typeof value === 'string' && value <= rule.StringLessThanEquals;
  if (rule.StringLessThanEqualsPath !== undefined) return typeof value === 'string' && value <= resolveReference(rule.StringLessThanEqualsPath, stateData, context);
  if (rule.StringMatches !== undefined) return typeof value === 'string' && stringMatches(value, rule.StringMatches);

  // Numeric comparisons
  if (rule.NumericEquals !== undefined) return value === rule.NumericEquals;
  if (rule.NumericEqualsPath !== undefined) return value === resolveReference(rule.NumericEqualsPath, stateData, context);
  if (rule.NumericGreaterThan !== undefined) return typeof value === 'number' && value > rule.NumericGreaterThan;
  if (rule.NumericGreaterThanPath !== undefined) return typeof value === 'number' && value > resolveReference(rule.NumericGreaterThanPath, stateData, context);
  if (rule.NumericGreaterThanEquals !== undefined) return typeof value === 'number' && value >= rule.NumericGreaterThanEquals;
  if (rule.NumericGreaterThanEqualsPath !== undefined) return typeof value === 'number' && value >= resolveReference(rule.NumericGreaterThanEqualsPath, stateData, context);
  if (rule.NumericLessThan !== undefined) return typeof value === 'number' && value < rule.NumericLessThan;
  if (rule.NumericLessThanPath !== undefined) return typeof value === 'number' && value < resolveReference(rule.NumericLessThanPath, stateData, context);
  if (rule.NumericLessThanEquals !== undefined) return typeof value === 'number' && value <= rule.NumericLessThanEquals;
  if (rule.NumericLessThanEqualsPath !== undefined) return typeof value === 'number' && value <= resolveReference(rule.NumericLessThanEqualsPath, stateData, context);

  // Boolean comparisons
  if (rule.BooleanEquals !== undefined) return value === rule.BooleanEquals;
  if (rule.BooleanEqualsPath !== undefined) return value === resolveReference(rule.BooleanEqualsPath, stateData, context);

  // Timestamp comparisons
  if (rule.TimestampEquals !== undefined) return compareTimestamps(value, rule.TimestampEquals) === 0;
  if (rule.TimestampEqualsPath !== undefined) return compareTimestamps(value, resolveReference(rule.TimestampEqualsPath, stateData, context)) === 0;
  if (rule.TimestampGreaterThan !== undefined) return compareTimestamps(value, rule.TimestampGreaterThan) > 0;
  if (rule.TimestampGreaterThanPath !== undefined) return compareTimestamps(value, resolveReference(rule.TimestampGreaterThanPath, stateData, context)) > 0;
  if (rule.TimestampGreaterThanEquals !== undefined) return compareTimestamps(value, rule.TimestampGreaterThanEquals) >= 0;
  if (rule.TimestampGreaterThanEqualsPath !== undefined) return compareTimestamps(value, resolveReference(rule.TimestampGreaterThanEqualsPath, stateData, context)) >= 0;
  if (rule.TimestampLessThan !== undefined) return compareTimestamps(value, rule.TimestampLessThan) < 0;
  if (rule.TimestampLessThanPath !== undefined) return compareTimestamps(value, resolveReference(rule.TimestampLessThanPath, stateData, context)) < 0;
  if (rule.TimestampLessThanEquals !== undefined) return compareTimestamps(value, rule.TimestampLessThanEquals) <= 0;
  if (rule.TimestampLessThanEqualsPath !== undefined) return compareTimestamps(value, resolveReference(rule.TimestampLessThanEqualsPath, stateData, context)) <= 0;

  // Type-checking operators
  if (rule.IsNull !== undefined) return rule.IsNull ? value === null : value !== null;
  if (rule.IsPresent !== undefined) return rule.IsPresent ? value !== undefined : value === undefined;
  if (rule.IsNumeric !== undefined) return rule.IsNumeric ? typeof value === 'number' : typeof value !== 'number';
  if (rule.IsString !== undefined) return rule.IsString ? typeof value === 'string' : typeof value !== 'string';
  if (rule.IsBoolean !== undefined) return rule.IsBoolean ? typeof value === 'boolean' : typeof value !== 'boolean';
  if (rule.IsTimestamp !== undefined) {
    const isTs = typeof value === 'string' && isValidTimestamp(value);
    return rule.IsTimestamp ? isTs : !isTs;
  }

  return false;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Glob-style matching for StringMatches.
 * '*' matches zero or more characters. NOT a regex.
 */
function stringMatches(value: string, pattern: string): boolean {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp('^' + escaped.replace(/\*/g, '.*') + '$');
  return regex.test(value);
}

/**
 * Compare two ISO 8601 timestamp strings.
 * Returns negative if a < b, 0 if equal, positive if a > b.
 */
function compareTimestamps(a: any, b: any): number {
  const ta = new Date(a).getTime();
  const tb = new Date(b).getTime();
  return ta - tb;
}

/**
 * Check if a string is a valid ISO 8601 timestamp.
 */
function isValidTimestamp(value: string): boolean {
  const d = new Date(value);
  return !isNaN(d.getTime()) && /^\d{4}-\d{2}-\d{2}T/.test(value);
}
