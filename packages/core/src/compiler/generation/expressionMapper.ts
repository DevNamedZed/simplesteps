import ts from 'typescript';
import { CompilerContext } from '../compilerContext.js';
import { ErrorCodes } from '../diagnosticCodes.js';
import { resolveExpression, type VariableResolution } from '../analysis/variableResolver.js';
import { StepVariableType } from '../analysis/types.js';
import type { ChoiceRule, ComparisonRule, NotRule, AndRule, OrRule } from '../../asl/types.js';

// ---------------------------------------------------------------------------
// Parameter building
// ---------------------------------------------------------------------------

/**
 * Convert a TS object literal expression to ASL Parameters.
 *
 * { id: input.id, name: "fixed" }
 * → { "id.$": "$.id", "name": "fixed" }
 */
export function buildParameters(
  context: CompilerContext,
  expr: ts.ObjectLiteralExpression,
  variables: VariableResolution,
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
            resolved = resolveExpression(context, argExpr, variables);
          }
        }
      }

      switch (resolved.kind) {
        case 'literal':
          result[propName] = resolved.value;
          break;
        case 'jsonpath':
          result[`${propName}.$`] = resolved.path;
          break;
        case 'intrinsic':
          result[`${propName}.$`] = resolved.path;
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
      result[propName] = buildParameters(context, prop.initializer, variables);
      continue;
    }

    const resolved = resolveExpression(context, prop.initializer, variables);

    switch (resolved.kind) {
      case 'literal':
        result[propName] = resolved.value;
        break;
      case 'jsonpath':
        result[`${propName}.$`] = resolved.path;
        break;
      case 'intrinsic':
        result[`${propName}.$`] = resolved.path;
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
 * input.mode === 'fast' → { Variable: "$.mode", StringEquals: "fast", Next }
 * !validation.valid → { Not: { Variable: "$.validation.valid", BooleanEquals: true, Next: "" }, Next }
 */
export function buildChoiceRule(
  context: CompilerContext,
  expr: ts.Expression,
  nextState: string,
  variables: VariableResolution,
): ChoiceRule {
  // Negation: !expr
  if (ts.isPrefixUnaryExpression(expr) && expr.operator === ts.SyntaxKind.ExclamationToken) {
    const inner = buildComparisonFromExpression(context, expr.operand, '', variables);
    if (inner) {
      return { Not: inner, Next: nextState } as NotRule;
    }
    // Fallback: treat as boolean check on the operand
    const resolved = resolveExpression(context, expr.operand, variables);
    if (resolved.kind === 'jsonpath') {
      return {
        Not: { Variable: resolved.path, BooleanEquals: true, Next: '' } as ComparisonRule,
        Next: nextState,
      } as NotRule;
    }
  }

  // And: a && b
  if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
    const left = buildChoiceRule(context, expr.left, '', variables);
    const right = buildChoiceRule(context, expr.right, '', variables);
    return { And: [stripNext(left), stripNext(right)], Next: nextState } as AndRule;
  }

  // Or: a || b
  if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
    const left = buildChoiceRule(context, expr.left, '', variables);
    const right = buildChoiceRule(context, expr.right, '', variables);
    return { Or: [stripNext(left), stripNext(right)], Next: nextState } as OrRule;
  }

  // Binary comparison: a === b, a !== b, a > b, etc.
  if (ts.isBinaryExpression(expr)) {
    return buildChoiceRuleFromBinary(context, expr, nextState, variables);
  }

  // Bare truthiness check: variable.field
  const resolved = resolveExpression(context, expr, variables);
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
// Internal helpers
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
): ComparisonRule | null {
  // Binary comparison
  if (ts.isBinaryExpression(expr)) {
    const rule = buildChoiceRuleFromBinary(context, expr, next, variables);
    if ('Variable' in rule) return rule as ComparisonRule;
  }

  // Bare expression → boolean check
  const resolved = resolveExpression(context, expr, variables);
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
): ChoiceRule {
  const op = expr.operatorToken.kind;
  const left = resolveExpression(context, expr.left, variables);
  const right = resolveExpression(context, expr.right, variables);

  // Ensure we have a variable on one side and a value on the other
  let variable: string | undefined;
  let comparand: { kind: 'literal'; value: unknown } | { kind: 'jsonpath'; path: string } | undefined;

  if (left.kind === 'jsonpath' && (right.kind === 'literal' || right.kind === 'jsonpath')) {
    variable = left.path;
    comparand = right as any;
  } else if (right.kind === 'jsonpath' && left.kind === 'literal') {
    // Flip: literal op variable → variable reverseOp literal
    variable = right.path;
    comparand = left as any;
    // Note: for == and !=, flipping doesn't change the operator
    // For <, >, <=, >= we would need to reverse, but for now keep simple
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
  if (comparand.kind === 'literal' && typeof comparand.value === 'number') {
    switch (op) {
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
