// ---------------------------------------------------------------------------
// Expression Evaluator
//
// Reduces TypeScript expressions to LatticeValues for constant propagation.
// Upgrade of tryFoldConstant() in variableResolver.ts using the lattice.
// ---------------------------------------------------------------------------

import ts from 'typescript';
import {
  type LatticeValue,
  type ConstantValue,
  constant,
  bottom,
  safeBottom,
  propagateBottom,
  isConstant,
  isBottom,
} from './lattice.js';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Callback for resolving identifiers.
 * The expression evaluator delegates symbol lookup to the caller
 * (typically a ModuleEnvironment).
 */
export type SymbolResolver = (symbol: ts.Symbol) => LatticeValue;

/**
 * Callback for resolving function calls (pure function inlining).
 * Returns undefined if the function is not eligible for inlining.
 */
export type CallResolver = (
  expr: ts.CallExpression,
  evaluator: ExpressionEvaluator,
) => LatticeValue | undefined;

export class ExpressionEvaluator {
  constructor(
    private readonly checker: ts.TypeChecker,
    private readonly resolveSymbol: SymbolResolver,
    private readonly resolveCall?: CallResolver,
  ) {}

  /**
   * Evaluate a TS expression to a LatticeValue.
   */
  evaluate(expr: ts.Expression): LatticeValue {
    // Unwrap parenthesized / as / satisfies
    if (ts.isParenthesizedExpression(expr)) {
      return this.evaluate(expr.expression);
    }
    if (ts.isAsExpression(expr)) {
      return this.evaluate(expr.expression);
    }
    if (ts.isSatisfiesExpression(expr)) {
      return this.evaluate(expr.expression);
    }
    if (ts.isNonNullExpression(expr)) {
      return this.evaluate(expr.expression);
    }

    // 1. Literals
    if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
      return constant(expr.text);
    }
    if (ts.isNumericLiteral(expr)) {
      return constant(Number(expr.text));
    }
    if (expr.kind === ts.SyntaxKind.TrueKeyword) return constant(true);
    if (expr.kind === ts.SyntaxKind.FalseKeyword) return constant(false);
    if (expr.kind === ts.SyntaxKind.NullKeyword) return constant(null);
    if (expr.kind === ts.SyntaxKind.UndefinedKeyword) return constant(undefined);

    // 2. Identifier reference
    if (ts.isIdentifier(expr)) {
      return this.evaluateIdentifier(expr);
    }

    // 3. Property access on constant object
    if (ts.isPropertyAccessExpression(expr)) {
      return this.evaluatePropertyAccess(expr);
    }

    // 4. Element access on constant array/object
    if (ts.isElementAccessExpression(expr)) {
      return this.evaluateElementAccess(expr);
    }

    // 5. Binary expression
    if (ts.isBinaryExpression(expr)) {
      return this.evaluateBinary(expr);
    }

    // 6. Unary prefix
    if (ts.isPrefixUnaryExpression(expr)) {
      return this.evaluateUnaryPrefix(expr);
    }

    // 7. Conditional expression (ternary)
    if (ts.isConditionalExpression(expr)) {
      return this.evaluateConditional(expr);
    }

    // 8. Template expression
    if (ts.isTemplateExpression(expr)) {
      return this.evaluateTemplate(expr);
    }

    // 9. Object literal
    if (ts.isObjectLiteralExpression(expr)) {
      return this.evaluateObjectLiteral(expr);
    }

    // 10. Array literal
    if (ts.isArrayLiteralExpression(expr)) {
      return this.evaluateArrayLiteral(expr);
    }

    // 11. Call expression
    if (ts.isCallExpression(expr)) {
      return this.evaluateCallExpression(expr);
    }

    // 12. typeof
    if (ts.isTypeOfExpression(expr)) {
      return this.evaluateTypeOf(expr);
    }

    // 13. Spread element (handled by parent array/object evaluators)
    // 14. void expression
    if (ts.isVoidExpression(expr)) {
      return constant(undefined);
    }

    return bottom(`Expression type '${ts.SyntaxKind[expr.kind]}' is not foldable`, expr);
  }

  // -----------------------------------------------------------------------
  // Identifier
  // -----------------------------------------------------------------------

  private evaluateIdentifier(expr: ts.Identifier): LatticeValue {
    // Special globals
    if (expr.text === 'undefined') return constant(undefined);
    if (expr.text === 'NaN') return constant(NaN);
    if (expr.text === 'Infinity') return constant(Infinity);

    const sym = this.checker.getSymbolAtLocation(expr);
    if (!sym) return bottom(`Unknown identifier '${expr.text}'`, expr);

    const value = this.resolveSymbol(sym);
    if (isBottom(value)) {
      return propagateBottom(`depends on '${expr.text}'`, value, expr);
    }
    return value;
  }

  // -----------------------------------------------------------------------
  // Property access
  // -----------------------------------------------------------------------

  private evaluatePropertyAccess(expr: ts.PropertyAccessExpression): LatticeValue {
    const base = this.evaluate(expr.expression);
    const propName = expr.name.text;

    if (isConstant(base)) {
      const obj = base.value;
      if (obj !== null && obj !== undefined && typeof obj === 'object') {
        const val = (obj as Record<string, unknown>)[propName];
        return val !== undefined ? constant(val) : bottom(`Property '${propName}' not found on object`, expr);
      }
      // typeof on primitive
      if (typeof obj === 'string' && propName === 'length') {
        return constant(obj.length);
      }
      return bottom(`Property access on non-object constant`, expr);
    }

    if (isBottom(base)) {
      return propagateBottom(`property '${propName}' on unresolvable value`, base, expr);
    }

    return bottom(`Property access on non-constant value`, expr);
  }

  // -----------------------------------------------------------------------
  // Element access
  // -----------------------------------------------------------------------

  private evaluateElementAccess(expr: ts.ElementAccessExpression): LatticeValue {
    const base = this.evaluate(expr.expression);
    if (!expr.argumentExpression) return bottom('Missing element access argument', expr);
    const index = this.evaluate(expr.argumentExpression);

    if (isConstant(base) && isConstant(index)) {
      const result = (base.value as any)?.[index.value as any];
      return result !== undefined ? constant(result) : bottom('Element not found', expr);
    }

    if (isBottom(base)) return propagateBottom('element access on unresolvable', base, expr);
    if (isBottom(index)) return propagateBottom('unresolvable index', index, expr);

    return bottom('Element access on non-constant', expr);
  }

  // -----------------------------------------------------------------------
  // Binary expression
  // -----------------------------------------------------------------------

  private evaluateBinary(expr: ts.BinaryExpression): LatticeValue {
    const left = this.evaluate(expr.left);
    const right = this.evaluate(expr.right);

    if (isBottom(left)) return propagateBottom('left operand unresolvable', left, expr);
    if (isBottom(right)) return propagateBottom('right operand unresolvable', right, expr);
    if (!isConstant(left) || !isConstant(right)) return bottom('Non-constant operands', expr);

    const l = left.value;
    const r = right.value;
    const op = expr.operatorToken.kind;

    switch (op) {
      case ts.SyntaxKind.PlusToken:
        if (typeof l === 'number' && typeof r === 'number') return constant(l + r);
        if (typeof l === 'string' || typeof r === 'string') return constant(String(l) + String(r));
        return bottom('+ on incompatible types', expr);
      case ts.SyntaxKind.MinusToken:
        if (typeof l === 'number' && typeof r === 'number') return constant(l - r);
        return bottom('- on non-numbers', expr);
      case ts.SyntaxKind.AsteriskToken:
        if (typeof l === 'number' && typeof r === 'number') return constant(l * r);
        return bottom('* on non-numbers', expr);
      case ts.SyntaxKind.SlashToken:
        if (typeof l === 'number' && typeof r === 'number' && r !== 0) return constant(l / r);
        return bottom('/ on non-numbers or division by zero', expr);
      case ts.SyntaxKind.PercentToken:
        if (typeof l === 'number' && typeof r === 'number' && r !== 0) return constant(l % r);
        return bottom('% on non-numbers or division by zero', expr);
      case ts.SyntaxKind.AsteriskAsteriskToken:
        if (typeof l === 'number' && typeof r === 'number') return constant(l ** r);
        return bottom('** on non-numbers', expr);
      case ts.SyntaxKind.AmpersandAmpersandToken:
        return constant(l && r);
      case ts.SyntaxKind.BarBarToken:
        return constant(l || r);
      case ts.SyntaxKind.QuestionQuestionToken:
        return constant(l ?? r);
      case ts.SyntaxKind.EqualsEqualsEqualsToken:
        return constant(l === r);
      case ts.SyntaxKind.ExclamationEqualsEqualsToken:
        return constant(l !== r);
      case ts.SyntaxKind.EqualsEqualsToken:
        return constant(l == r);
      case ts.SyntaxKind.ExclamationEqualsToken:
        return constant(l != r);
      case ts.SyntaxKind.LessThanToken:
        if (typeof l === 'number' && typeof r === 'number') return constant(l < r);
        if (typeof l === 'string' && typeof r === 'string') return constant(l < r);
        return bottom('< on incompatible types', expr);
      case ts.SyntaxKind.LessThanEqualsToken:
        if (typeof l === 'number' && typeof r === 'number') return constant(l <= r);
        if (typeof l === 'string' && typeof r === 'string') return constant(l <= r);
        return bottom('<= on incompatible types', expr);
      case ts.SyntaxKind.GreaterThanToken:
        if (typeof l === 'number' && typeof r === 'number') return constant(l > r);
        if (typeof l === 'string' && typeof r === 'string') return constant(l > r);
        return bottom('> on incompatible types', expr);
      case ts.SyntaxKind.GreaterThanEqualsToken:
        if (typeof l === 'number' && typeof r === 'number') return constant(l >= r);
        if (typeof l === 'string' && typeof r === 'string') return constant(l >= r);
        return bottom('>= on incompatible types', expr);
      case ts.SyntaxKind.BarToken:
        if (typeof l === 'number' && typeof r === 'number') return constant(l | r);
        return bottom('| on non-numbers', expr);
      case ts.SyntaxKind.AmpersandToken:
        if (typeof l === 'number' && typeof r === 'number') return constant(l & r);
        return bottom('& on non-numbers', expr);
      case ts.SyntaxKind.CaretToken:
        if (typeof l === 'number' && typeof r === 'number') return constant(l ^ r);
        return bottom('^ on non-numbers', expr);
      case ts.SyntaxKind.LessThanLessThanToken:
        if (typeof l === 'number' && typeof r === 'number') return constant(l << r);
        return bottom('<< on non-numbers', expr);
      case ts.SyntaxKind.GreaterThanGreaterThanToken:
        if (typeof l === 'number' && typeof r === 'number') return constant(l >> r);
        return bottom('>> on non-numbers', expr);
      case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
        if (typeof l === 'number' && typeof r === 'number') return constant(l >>> r);
        return bottom('>>> on non-numbers', expr);
      default:
        return bottom(`Unsupported binary operator`, expr);
    }
  }

  // -----------------------------------------------------------------------
  // Unary prefix
  // -----------------------------------------------------------------------

  private evaluateUnaryPrefix(expr: ts.PrefixUnaryExpression): LatticeValue {
    const operand = this.evaluate(expr.operand);
    if (!isConstant(operand)) {
      if (isBottom(operand)) return propagateBottom('unary operand unresolvable', operand, expr);
      return bottom('Unary on non-constant', expr);
    }

    const v = operand.value;
    switch (expr.operator) {
      case ts.SyntaxKind.MinusToken:
        return typeof v === 'number' ? constant(-v) : bottom('- on non-number', expr);
      case ts.SyntaxKind.PlusToken:
        return typeof v === 'number' ? constant(+v) : bottom('+ on non-number', expr);
      case ts.SyntaxKind.ExclamationToken:
        return constant(!v);
      case ts.SyntaxKind.TildeToken:
        return typeof v === 'number' ? constant(~v) : bottom('~ on non-number', expr);
      default:
        return bottom('Unsupported unary operator', expr);
    }
  }

  // -----------------------------------------------------------------------
  // Conditional (ternary)
  // -----------------------------------------------------------------------

  private evaluateConditional(expr: ts.ConditionalExpression): LatticeValue {
    const cond = this.evaluate(expr.condition);
    if (!isConstant(cond)) {
      if (isBottom(cond)) return propagateBottom('ternary condition unresolvable', cond, expr);
      return bottom('Non-constant ternary condition', expr);
    }

    return cond.value ? this.evaluate(expr.whenTrue) : this.evaluate(expr.whenFalse);
  }

  // -----------------------------------------------------------------------
  // Template expression
  // -----------------------------------------------------------------------

  private evaluateTemplate(expr: ts.TemplateExpression): LatticeValue {
    let result = expr.head.text;
    for (const span of expr.templateSpans) {
      const val = this.evaluate(span.expression);
      if (!isConstant(val)) {
        if (isBottom(val)) return propagateBottom('template substitution unresolvable', val, expr);
        return bottom('Non-constant template substitution', expr);
      }
      result += String(val.value);
      result += span.literal.text;
    }
    return constant(result);
  }

  // -----------------------------------------------------------------------
  // Object literal
  // -----------------------------------------------------------------------

  private evaluateObjectLiteral(expr: ts.ObjectLiteralExpression): LatticeValue {
    const obj: Record<string, unknown> = {};

    for (const prop of expr.properties) {
      if (ts.isPropertyAssignment(prop)) {
        let key: string;
        if (ts.isIdentifier(prop.name)) {
          key = prop.name.text;
        } else if (ts.isStringLiteral(prop.name)) {
          key = prop.name.text;
        } else if (ts.isNumericLiteral(prop.name)) {
          key = prop.name.text;
        } else {
          return bottom('Computed property name in object literal', expr);
        }

        const val = this.evaluate(prop.initializer);
        if (!isConstant(val)) {
          if (isBottom(val)) return propagateBottom(`property '${key}' unresolvable`, val, expr);
          return bottom(`Non-constant property '${key}'`, expr);
        }
        obj[key] = val.value;
      } else if (ts.isShorthandPropertyAssignment(prop)) {
        const key = prop.name.text;
        const val = this.evaluateIdentifier(prop.name);
        if (!isConstant(val)) {
          if (isBottom(val)) return propagateBottom(`shorthand property '${key}' unresolvable`, val, expr);
          return bottom(`Non-constant shorthand property '${key}'`, expr);
        }
        obj[key] = val.value;
      } else if (ts.isSpreadAssignment(prop)) {
        const spread = this.evaluate(prop.expression);
        if (!isConstant(spread)) {
          if (isBottom(spread)) return propagateBottom('spread value unresolvable', spread, expr);
          return bottom('Non-constant spread value', expr);
        }
        if (typeof spread.value === 'object' && spread.value !== null) {
          Object.assign(obj, spread.value);
        } else {
          return bottom('Spread on non-object', expr);
        }
      } else {
        return bottom('Unsupported object literal member', expr);
      }
    }

    return constant(obj);
  }

  // -----------------------------------------------------------------------
  // Array literal
  // -----------------------------------------------------------------------

  private evaluateArrayLiteral(expr: ts.ArrayLiteralExpression): LatticeValue {
    const arr: unknown[] = [];

    for (const elem of expr.elements) {
      if (ts.isSpreadElement(elem)) {
        const spread = this.evaluate(elem.expression);
        if (!isConstant(spread)) {
          if (isBottom(spread)) return propagateBottom('array spread unresolvable', spread, expr);
          return bottom('Non-constant array spread', expr);
        }
        if (Array.isArray(spread.value)) {
          arr.push(...spread.value);
        } else {
          return bottom('Spread of non-array', expr);
        }
      } else {
        const val = this.evaluate(elem);
        if (!isConstant(val)) {
          if (isBottom(val)) return propagateBottom('array element unresolvable', val, expr);
          return bottom('Non-constant array element', expr);
        }
        arr.push(val.value);
      }
    }

    return constant(arr);
  }

  // -----------------------------------------------------------------------
  // Call expression
  // -----------------------------------------------------------------------

  private evaluateCallExpression(expr: ts.CallExpression): LatticeValue {
    // Check for Steps.safeVar() wrapper
    if (this.isStepsSafeVarCall(expr)) {
      if (expr.arguments.length < 1) return bottom('Steps.safeVar() requires an argument', expr);
      const inner = this.evaluate(expr.arguments[0]);
      if (isConstant(inner)) return inner; // no-op for constants
      if (isBottom(inner)) {
        return safeBottom(inner.reason, expr, inner.rootCause ?? inner);
      }
      return safeBottom('wrapped in Steps.safeVar()', expr);
    }

    // Delegate to external call resolver (pure function inlining)
    if (this.resolveCall) {
      const result = this.resolveCall(expr, this);
      if (result !== undefined) return result;
    }

    // Known pure built-in functions
    return this.evaluateBuiltinCall(expr);
  }

  private isStepsSafeVarCall(expr: ts.CallExpression): boolean {
    if (!ts.isPropertyAccessExpression(expr.expression)) return false;
    const callee = expr.expression;
    if (!ts.isIdentifier(callee.expression)) return false;
    return callee.expression.text === 'Steps' && callee.name.text === 'safeVar';
  }

  private evaluateBuiltinCall(expr: ts.CallExpression): LatticeValue {
    // Property access calls: Math.floor(), JSON.parse(), etc.
    if (ts.isPropertyAccessExpression(expr.expression)) {
      const obj = expr.expression.expression;
      const method = expr.expression.name.text;

      if (ts.isIdentifier(obj)) {
        // Math.*
        if (obj.text === 'Math') {
          return this.evaluateMathCall(method, expr);
        }

        // JSON.parse / JSON.stringify
        if (obj.text === 'JSON') {
          return this.evaluateJsonCall(method, expr);
        }

        // Object.keys / values / entries
        if (obj.text === 'Object') {
          return this.evaluateObjectCall(method, expr);
        }

        // Array.isArray
        if (obj.text === 'Array' && method === 'isArray' && expr.arguments.length === 1) {
          const arg = this.evaluate(expr.arguments[0]);
          if (isConstant(arg)) return constant(Array.isArray(arg.value));
        }
      }
    }

    // Direct function calls: String(), Number(), Boolean(), parseInt(), parseFloat()
    if (ts.isIdentifier(expr.expression)) {
      const name = expr.expression.text;
      if (expr.arguments.length >= 1) {
        const arg = this.evaluate(expr.arguments[0]);
        if (isConstant(arg)) {
          switch (name) {
            case 'String': return constant(String(arg.value));
            case 'Number': return constant(Number(arg.value));
            case 'Boolean': return constant(Boolean(arg.value));
            case 'parseInt': {
              const radix = expr.arguments.length >= 2 ? this.evaluate(expr.arguments[1]) : undefined;
              if (radix && !isConstant(radix)) break;
              return constant(parseInt(String(arg.value), radix ? Number(radix.value) : undefined));
            }
            case 'parseFloat':
              return constant(parseFloat(String(arg.value)));
          }
        }
      }
    }

    return bottom('Function call not foldable', expr);
  }

  private evaluateMathCall(method: string, expr: ts.CallExpression): LatticeValue {
    const args = expr.arguments.map(a => this.evaluate(a));
    if (args.some(a => !isConstant(a))) {
      const firstBottom = args.find(isBottom);
      if (firstBottom) return propagateBottom(`Math.${method}() argument unresolvable`, firstBottom, expr);
      return bottom(`Non-constant argument to Math.${method}()`, expr);
    }
    const nums = args.map(a => Number((a as ConstantValue).value));
    if (nums.some(n => isNaN(n) && typeof (args[nums.indexOf(n)] as ConstantValue).value !== 'number')) {
      return bottom(`Non-numeric argument to Math.${method}()`, expr);
    }

    switch (method) {
      case 'floor': return constant(Math.floor(nums[0]));
      case 'ceil': return constant(Math.ceil(nums[0]));
      case 'round': return constant(Math.round(nums[0]));
      case 'abs': return constant(Math.abs(nums[0]));
      case 'min': return constant(Math.min(...nums));
      case 'max': return constant(Math.max(...nums));
      case 'pow': return constant(Math.pow(nums[0], nums[1]));
      case 'sqrt': return constant(Math.sqrt(nums[0]));
      case 'trunc': return constant(Math.trunc(nums[0]));
      case 'sign': return constant(Math.sign(nums[0]));
      case 'log': return constant(Math.log(nums[0]));
      case 'log2': return constant(Math.log2(nums[0]));
      case 'log10': return constant(Math.log10(nums[0]));
      default: return bottom(`Math.${method}() is not a recognized pure function`, expr);
    }
  }

  private evaluateJsonCall(method: string, expr: ts.CallExpression): LatticeValue {
    if (expr.arguments.length < 1) return bottom(`JSON.${method}() requires an argument`, expr);
    const arg = this.evaluate(expr.arguments[0]);
    if (!isConstant(arg)) {
      if (isBottom(arg)) return propagateBottom(`JSON.${method}() argument unresolvable`, arg, expr);
      return bottom(`Non-constant argument to JSON.${method}()`, expr);
    }

    switch (method) {
      case 'stringify':
        try { return constant(JSON.stringify(arg.value)); }
        catch { return bottom('JSON.stringify() failed', expr); }
      case 'parse':
        if (typeof arg.value !== 'string') return bottom('JSON.parse() requires a string', expr);
        try { return constant(JSON.parse(arg.value)); }
        catch { return bottom('JSON.parse() failed: invalid JSON', expr); }
      default:
        return bottom(`JSON.${method}() is not foldable`, expr);
    }
  }

  private evaluateObjectCall(method: string, expr: ts.CallExpression): LatticeValue {
    if (expr.arguments.length < 1) return bottom(`Object.${method}() requires an argument`, expr);
    const arg = this.evaluate(expr.arguments[0]);
    if (!isConstant(arg)) {
      if (isBottom(arg)) return propagateBottom(`Object.${method}() argument unresolvable`, arg, expr);
      return bottom(`Non-constant argument to Object.${method}()`, expr);
    }

    if (typeof arg.value !== 'object' || arg.value === null) {
      return bottom(`Object.${method}() requires an object`, expr);
    }

    switch (method) {
      case 'keys': return constant(Object.keys(arg.value as object));
      case 'values': return constant(Object.values(arg.value as object));
      case 'entries': return constant(Object.entries(arg.value as object));
      case 'freeze': return constant(arg.value); // identity for our purposes
      case 'assign':
        // Object.assign({}, a, b, ...) — fold if all args are constants
        if (expr.arguments.length >= 2) {
          const allArgs = expr.arguments.map(a => this.evaluate(a));
          if (allArgs.every(isConstant)) {
            const objs = allArgs.map(a => (a as ConstantValue).value);
            return constant(Object.assign({}, ...objs));
          }
        }
        return bottom('Non-constant argument to Object.assign()', expr);
      default:
        return bottom(`Object.${method}() is not foldable`, expr);
    }
  }

  // -----------------------------------------------------------------------
  // typeof
  // -----------------------------------------------------------------------

  private evaluateTypeOf(expr: ts.TypeOfExpression): LatticeValue {
    const operand = this.evaluate(expr.expression);
    if (isConstant(operand)) {
      return constant(typeof operand.value);
    }
    if (isBottom(operand)) {
      return propagateBottom('typeof on unresolvable', operand, expr);
    }
    return bottom('typeof on non-constant', expr);
  }
}
