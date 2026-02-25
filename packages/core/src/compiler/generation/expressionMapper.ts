import ts from 'typescript';
import { CompilerContext } from '../compilerContext.js';
import { ErrorCodes } from '../diagnosticCodes.js';
import { resolveExpression, type VariableResolution } from '../analysis/variableResolver.js';
import { StepVariableType } from '../analysis/types.js';
import type { ChoiceRule, ComparisonRule, NotRule, AndRule, OrRule } from '../../asl/types.js';
import { type PathDialect, JSON_PATH_DIALECT } from './pathDialect.js';

// ---------------------------------------------------------------------------
// Parameter building
// ---------------------------------------------------------------------------

/**
 * Convert a TS object literal expression to ASL Parameters/Arguments.
 *
 * JSONPath: { id: input.id, name: "fixed" } → { "id.$": "$.id", "name": "fixed" }
 * JSONata: { id: input.id, name: "fixed" } → { "id": "{% $states.input.id %}", "name": "fixed" }
 */
export function buildParameters(
  context: CompilerContext,
  expr: ts.ObjectLiteralExpression,
  variables: VariableResolution,
  dialect: PathDialect = JSON_PATH_DIALECT,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const prop of expr.properties) {
    if (ts.isShorthandPropertyAssignment(prop)) {
      const propName = prop.name.text;
      // For shorthand { item }, resolve the value symbol (not the property symbol)
      const valueSym = context.checker.getShorthandAssignmentValueSymbol(prop);
      let resolved: ReturnType<typeof resolveExpression> = { kind: 'unknown' as const };
      if (valueSym) {
        const varInfo = variables.variables.get(valueSym);
        if (varInfo) {
          if (varInfo.intrinsicPath) {
            resolved = { kind: 'intrinsic', path: varInfo.intrinsicPath };
          } else if (varInfo.type === StepVariableType.Constant && varInfo.literalValue !== undefined) {
            resolved = { kind: 'literal', value: varInfo.literalValue };
          } else if (varInfo.jsonPath) {
            resolved = { kind: 'jsonpath', path: varInfo.jsonPath };
          }
        }

        // Check deferred inline bindings for helper function parameters
        if (resolved.kind === 'unknown' && variables.deferredBindings) {
          const argExpr = variables.deferredBindings.get(valueSym);
          if (argExpr) {
            resolved = resolveExpression(context, argExpr, variables, dialect);
          }
        }
      }

      switch (resolved.kind) {
        case 'literal':
          result[propName] = resolved.value;
          break;
        case 'jsonpath':
          result[dialect.dynamicKey(propName)] = dialect.wrapDynamicValue(resolved.path!);
          break;
        case 'intrinsic':
          result[dialect.dynamicKey(propName)] = dialect.wrapDynamicValue(resolved.path!);
          break;
        case 'unknown': {
          const exprText = prop.name.text;
          context.addError(
            prop.name,
            `Cannot resolve '${exprText}' to an ASL value. ` +
            `Expressions must be input references (input.x), service call results, ` +
            `compile-time constants, or ASL intrinsic functions (Steps.format, Steps.add, etc.).`,
            ErrorCodes.Expr.UncompilableExpression.code,
          );
          break;
        }
      }
      continue;
    }

    if (!ts.isPropertyAssignment(prop)) {
      context.addError(prop, 'Spread properties are not yet supported in ASL parameters', ErrorCodes.Expr.SpreadNotSupported.code);
      continue;
    }

    const propName = getPropertyName(prop.name);
    if (!propName) {
      context.addError(prop, 'Computed property names are not supported in ASL parameters', ErrorCodes.Expr.ComputedPropertyName.code);
      continue;
    }

    // Nested object literal: recurse into buildParameters
    if (ts.isObjectLiteralExpression(prop.initializer)) {
      result[propName] = buildParameters(context, prop.initializer, variables, dialect);
      continue;
    }

    const resolved = resolveExpression(context, prop.initializer, variables, dialect);

    switch (resolved.kind) {
      case 'literal':
        result[propName] = resolved.value;
        break;
      case 'jsonpath':
        result[dialect.dynamicKey(propName)] = dialect.wrapDynamicValue(resolved.path!);
        break;
      case 'intrinsic':
        result[dialect.dynamicKey(propName)] = dialect.wrapDynamicValue(resolved.path!);
        break;
      case 'unknown': {
        const exprText = prop.initializer.getText().substring(0, 80);
        context.addError(
          prop.initializer,
          `Cannot resolve '${exprText}' to an ASL value. ` +
          `Expressions must be input references (input.x), service call results, ` +
          `compile-time constants, or ASL intrinsic functions (Steps.format, Steps.add, etc.).`,
          ErrorCodes.Expr.UncompilableExpression.code,
        );
        break;
      }
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Choice rule building
// ---------------------------------------------------------------------------

/**
 * Convert a TS condition expression to an ASL ChoiceRule.
 *
 * JSONPath: input.mode === 'fast' → { Variable: "$.mode", StringEquals: "fast", Next }
 * JSONata: input.mode === 'fast' → { Condition: "{% $states.input.mode = 'fast' %}", Next }
 */
export function buildChoiceRule(
  context: CompilerContext,
  expr: ts.Expression,
  nextState: string,
  variables: VariableResolution,
  dialect: PathDialect = JSON_PATH_DIALECT,
): ChoiceRule {
  if (dialect.isJsonata()) {
    return buildJsonataChoiceRule(context, expr, nextState, variables, dialect);
  }

  // ── JSONPath choice rule logic (unchanged) ──────────────────────

  // Negation: !expr
  if (ts.isPrefixUnaryExpression(expr) && expr.operator === ts.SyntaxKind.ExclamationToken) {
    const inner = buildComparisonFromExpression(context, expr.operand, '', variables, dialect);
    if (inner) {
      return { Not: inner, Next: nextState } as NotRule;
    }
    // Fallback: treat as boolean check on the operand
    const resolved = resolveExpression(context, expr.operand, variables, dialect);
    if (resolved.kind === 'jsonpath') {
      return {
        Not: { Variable: resolved.path, BooleanEquals: true, Next: '' } as ComparisonRule,
        Next: nextState,
      } as NotRule;
    }
  }

  // And: a && b
  if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
    const left = buildChoiceRule(context, expr.left, '', variables, dialect);
    const right = buildChoiceRule(context, expr.right, '', variables, dialect);
    return { And: [stripNext(left), stripNext(right)], Next: nextState } as AndRule;
  }

  // Or: a || b
  if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
    const left = buildChoiceRule(context, expr.left, '', variables, dialect);
    const right = buildChoiceRule(context, expr.right, '', variables, dialect);
    return { Or: [stripNext(left), stripNext(right)], Next: nextState } as OrRule;
  }

  // Binary comparison: a === b, a !== b, a > b, etc.
  if (ts.isBinaryExpression(expr)) {
    return buildChoiceRuleFromBinary(context, expr, nextState, variables, dialect);
  }

  // Bare truthiness check: variable.field
  const resolved = resolveExpression(context, expr, variables, dialect);
  if (resolved.kind === 'jsonpath') {
    return {
      Variable: resolved.path,
      BooleanEquals: true,
      Next: nextState,
    } as ComparisonRule;
  }

  context.addError(expr, 'Cannot compile condition expression to ASL Choice rule', ErrorCodes.Expr.UncompilableCondition.code);
  return { Variable: '$', BooleanEquals: true, Next: nextState } as ComparisonRule;
}

// ---------------------------------------------------------------------------
// JSONata choice rule building
// ---------------------------------------------------------------------------

/**
 * Build a JSONata Condition-based ChoiceRule.
 *
 * Instead of JSONPath's { Variable, StringEquals, ... }, JSONata uses a single
 * Condition field with a boolean expression: { Condition: "{% expr %}", Next }.
 */
function buildJsonataChoiceRule(
  context: CompilerContext,
  expr: ts.Expression,
  nextState: string,
  variables: VariableResolution,
  dialect?: PathDialect,
): ChoiceRule {
  const condition = buildJsonataConditionExpr(context, expr, variables, dialect);
  return { Condition: `{% ${condition} %}`, Next: nextState } as ComparisonRule;
}

/**
 * Recursively build a JSONata boolean expression string from a TS expression.
 */
function buildJsonataConditionExpr(
  context: CompilerContext,
  expr: ts.Expression,
  variables: VariableResolution,
  dialect?: PathDialect,
): string {
  // Negation: !expr
  if (ts.isPrefixUnaryExpression(expr) && expr.operator === ts.SyntaxKind.ExclamationToken) {
    const inner = buildJsonataConditionExpr(context, expr.operand, variables, dialect);
    return `$not(${inner})`;
  }

  // And: a && b
  if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
    const left = buildJsonataConditionExpr(context, expr.left, variables, dialect);
    const right = buildJsonataConditionExpr(context, expr.right, variables, dialect);
    return `(${left}) and (${right})`;
  }

  // Or: a || b
  if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
    const left = buildJsonataConditionExpr(context, expr.left, variables, dialect);
    const right = buildJsonataConditionExpr(context, expr.right, variables, dialect);
    return `(${left}) or (${right})`;
  }

  // Binary comparison: a === b, a !== b, a > b, etc.
  if (ts.isBinaryExpression(expr)) {
    return buildJsonataBinaryCondition(context, expr, variables, dialect);
  }

  // Bare truthiness check
  const resolved = resolveExpression(context, expr, variables, dialect);
  if (resolved.kind === 'jsonpath' || resolved.kind === 'intrinsic') {
    return resolved.path!;
  }
  if (resolved.kind === 'literal') {
    return serializeJsonataValue(resolved.value);
  }

  context.addError(expr, 'Cannot compile condition expression to JSONata Condition', ErrorCodes.Expr.UncompilableCondition.code);
  return 'true';
}

/**
 * Build a JSONata binary comparison expression.
 */
function buildJsonataBinaryCondition(
  context: CompilerContext,
  expr: ts.BinaryExpression,
  variables: VariableResolution,
  dialect?: PathDialect,
): string {
  const op = expr.operatorToken.kind;
  const left = resolveExpression(context, expr.left, variables, dialect);
  const right = resolveExpression(context, expr.right, variables, dialect);

  const leftStr = serializeJsonataOperand(left);
  const rightStr = serializeJsonataOperand(right);

  if (leftStr === null || rightStr === null) {
    context.addError(expr, 'Cannot compile comparison to JSONata Condition', ErrorCodes.Expr.UncompilableComparison.code);
    return 'true';
  }

  const isNot = op === ts.SyntaxKind.ExclamationEqualsEqualsToken ||
                op === ts.SyntaxKind.ExclamationEqualsToken;

  let jsonataOp: string;
  switch (op) {
    case ts.SyntaxKind.EqualsEqualsEqualsToken:
    case ts.SyntaxKind.EqualsEqualsToken:
      jsonataOp = '=';
      break;
    case ts.SyntaxKind.ExclamationEqualsEqualsToken:
    case ts.SyntaxKind.ExclamationEqualsToken:
      jsonataOp = '='; // will be wrapped in $not()
      break;
    case ts.SyntaxKind.LessThanToken:
      jsonataOp = '<';
      break;
    case ts.SyntaxKind.GreaterThanToken:
      jsonataOp = '>';
      break;
    case ts.SyntaxKind.LessThanEqualsToken:
      jsonataOp = '<=';
      break;
    case ts.SyntaxKind.GreaterThanEqualsToken:
      jsonataOp = '>=';
      break;
    default:
      context.addError(expr, 'Unsupported comparison operator for JSONata Condition', ErrorCodes.Expr.UnsupportedOperator.code);
      return 'true';
  }

  const comparison = `${leftStr} ${jsonataOp} ${rightStr}`;
  return isNot ? `$not(${comparison})` : comparison;
}

/**
 * Serialize a resolved expression as a JSONata operand in a Condition.
 */
function serializeJsonataOperand(resolved: ReturnType<typeof resolveExpression>): string | null {
  switch (resolved.kind) {
    case 'jsonpath':
    case 'intrinsic':
      return resolved.path!;
    case 'literal':
      return serializeJsonataValue(resolved.value);
    default:
      return null;
  }
}

/**
 * Serialize a literal value as a JSONata expression.
 */
function serializeJsonataValue(value: unknown): string {
  if (typeof value === 'string') {
    // Single-quote strings in JSONata, escape single quotes
    return `'${value.replace(/'/g, "\\'")}'`;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (value === null) {
    return 'null';
  }
  return String(value);
}

// ---------------------------------------------------------------------------
// Internal helpers (JSONPath)
// ---------------------------------------------------------------------------

function getPropertyName(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name)) return name.text;
  if (ts.isStringLiteral(name)) return name.text;
  if (ts.isNumericLiteral(name)) return name.text;
  return undefined;
}

function buildComparisonFromExpression(
  context: CompilerContext,
  expr: ts.Expression,
  next: string,
  variables: VariableResolution,
  dialect?: PathDialect,
): ComparisonRule | null {
  // Binary comparison
  if (ts.isBinaryExpression(expr)) {
    const rule = buildChoiceRuleFromBinary(context, expr, next, variables, dialect);
    if ('Variable' in rule) return rule as ComparisonRule;
  }

  // Bare expression → boolean check
  const resolved = resolveExpression(context, expr, variables, dialect);
  if (resolved.kind === 'jsonpath') {
    return { Variable: resolved.path, BooleanEquals: true, Next: next } as ComparisonRule;
  }

  return null;
}

function buildChoiceRuleFromBinary(
  context: CompilerContext,
  expr: ts.BinaryExpression,
  nextState: string,
  variables: VariableResolution,
  dialect?: PathDialect,
): ChoiceRule {
  const op = expr.operatorToken.kind;
  const left = resolveExpression(context, expr.left, variables, dialect);
  const right = resolveExpression(context, expr.right, variables, dialect);

  // Ensure we have a variable on one side and a value on the other
  let variable: string | undefined;
  let comparand: { kind: 'literal'; value: unknown } | { kind: 'jsonpath'; path: string } | undefined;
  let flipped = false;

  if (left.kind === 'jsonpath' && (right.kind === 'literal' || right.kind === 'jsonpath')) {
    variable = left.path;
    comparand = right as any;
  } else if (right.kind === 'jsonpath' && left.kind === 'literal') {
    // Flip: literal op variable → variable reverseOp literal
    variable = right.path;
    comparand = left as any;
    flipped = true;
  }

  if (!variable || !comparand) {
    context.addError(expr, 'Cannot compile comparison to ASL Choice rule', ErrorCodes.Expr.UncompilableComparison.code);
    return { Variable: '$', BooleanEquals: true, Next: nextState } as ComparisonRule;
  }

  const isNot = op === ts.SyntaxKind.ExclamationEqualsEqualsToken ||
                op === ts.SyntaxKind.ExclamationEqualsToken;
  const isEquals = op === ts.SyntaxKind.EqualsEqualsEqualsToken ||
                   op === ts.SyntaxKind.EqualsEqualsToken || isNot;

  if (isEquals) {
    const comparison = buildEqualityComparison(variable, comparand, nextState);
    if (isNot) {
      return {
        Not: { ...comparison, Next: '' } as ComparisonRule,
        Next: nextState,
      } as NotRule;
    }
    return comparison;
  }

  // Numeric comparisons: <, >, <=, >=
  // When operands were flipped (e.g. `5 < x` → variable=x, comparand=5),
  // reverse the operator: < becomes >, <= becomes >=, etc.
  if (comparand.kind === 'literal' && typeof comparand.value === 'number') {
    const effectiveOp = flipped ? flipRelationalOp(op) : op;
    switch (effectiveOp) {
      case ts.SyntaxKind.LessThanToken:
        return { Variable: variable, NumericLessThan: comparand.value, Next: nextState } as ComparisonRule;
      case ts.SyntaxKind.GreaterThanToken:
        return { Variable: variable, NumericGreaterThan: comparand.value, Next: nextState } as ComparisonRule;
      case ts.SyntaxKind.LessThanEqualsToken:
        return { Variable: variable, NumericLessThanEquals: comparand.value, Next: nextState } as ComparisonRule;
      case ts.SyntaxKind.GreaterThanEqualsToken:
        return { Variable: variable, NumericGreaterThanEquals: comparand.value, Next: nextState } as ComparisonRule;
    }
  }

  context.addError(expr, 'Unsupported comparison operator for ASL Choice rule', ErrorCodes.Expr.UnsupportedOperator.code);
  return { Variable: variable, BooleanEquals: true, Next: nextState } as ComparisonRule;
}

function stripNext(rule: ChoiceRule): ChoiceRule {
  const { Next, ...rest } = rule as any;
  return rest as ChoiceRule;
}

/**
 * Reverse a relational operator for when operands are flipped.
 * `5 < x` becomes `x > 5`, so LessThan becomes GreaterThan, etc.
 */
function flipRelationalOp(op: ts.SyntaxKind): ts.SyntaxKind {
  switch (op) {
    case ts.SyntaxKind.LessThanToken: return ts.SyntaxKind.GreaterThanToken;
    case ts.SyntaxKind.GreaterThanToken: return ts.SyntaxKind.LessThanToken;
    case ts.SyntaxKind.LessThanEqualsToken: return ts.SyntaxKind.GreaterThanEqualsToken;
    case ts.SyntaxKind.GreaterThanEqualsToken: return ts.SyntaxKind.LessThanEqualsToken;
    default: return op;
  }
}

function buildEqualityComparison(
  variable: string,
  comparand: { kind: 'literal'; value: unknown } | { kind: 'jsonpath'; path: string },
  next: string,
): ComparisonRule {
  if (comparand.kind === 'jsonpath') {
    // Variable-to-variable comparison: use Path variant
    return { Variable: variable, StringEqualsPath: comparand.path, Next: next } as ComparisonRule;
  }

  const value = comparand.value;

  if (typeof value === 'string') {
    return { Variable: variable, StringEquals: value, Next: next } as ComparisonRule;
  }
  if (typeof value === 'number') {
    return { Variable: variable, NumericEquals: value, Next: next } as ComparisonRule;
  }
  if (typeof value === 'boolean') {
    return { Variable: variable, BooleanEquals: value, Next: next } as ComparisonRule;
  }

  // Fallback for null etc.
  return { Variable: variable, IsNull: true, Next: next } as ComparisonRule;
}
