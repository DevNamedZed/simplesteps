// ---------------------------------------------------------------------------
// Pure Function Inliner
//
// Analyzes function declarations for inlining eligibility and inlines
// simple pure functions during constant propagation.
// ---------------------------------------------------------------------------

import ts from 'typescript';
import {
  type LatticeValue,
  type ConstantValue,
  constant,
  bottom,
  isConstant,
} from './lattice.js';
import { ExpressionEvaluator, type SymbolResolver } from './expressionEvaluator.js';

// ---------------------------------------------------------------------------
// Eligibility check
// ---------------------------------------------------------------------------

/**
 * Check if a function declaration is eligible for constant-propagation inlining.
 *
 * Eligible: single return statement (possibly preceded by const declarations),
 * no side effects, no await, no loops, no try/catch, not a generator.
 */
export function isEligibleForInlining(
  decl: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction,
): boolean {
  // Must not be async or generator
  if (decl.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword)) return false;
  if (decl.asteriskToken) return false;

  const body = decl.body;
  if (!body) return false;

  // Arrow with expression body: always eligible (it's a single return)
  if (!ts.isBlock(body)) return true;

  // Block body: must contain only const declarations and exactly one return
  let hasReturn = false;
  for (const stmt of body.statements) {
    if (ts.isReturnStatement(stmt)) {
      if (hasReturn) return false; // multiple returns
      if (!stmt.expression) return false; // void return
      hasReturn = true;
    } else if (ts.isVariableStatement(stmt)) {
      // Only const declarations allowed
      if (!(stmt.declarationList.flags & ts.NodeFlags.Const)) return false;
      // Check no destructuring with initializers that have side effects
      for (const decl of stmt.declarationList.declarations) {
        if (!decl.initializer) return false;
        if (containsSideEffects(decl.initializer)) return false;
      }
    } else {
      // Any other statement type (if, for, while, try, etc.) → not eligible
      return false;
    }
  }

  return hasReturn;
}

/**
 * Quick check for obvious side effects in an expression.
 * Not exhaustive — just catches the obvious cases.
 */
function containsSideEffects(expr: ts.Expression): boolean {
  let hasSideEffects = false;

  function visit(node: ts.Node): void {
    if (hasSideEffects) return;

    // await
    if (ts.isAwaitExpression(node)) { hasSideEffects = true; return; }
    // yield
    if (ts.isYieldExpression(node)) { hasSideEffects = true; return; }
    // assignment
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      hasSideEffects = true; return;
    }
    // delete
    if (ts.isDeleteExpression(node)) { hasSideEffects = true; return; }
    // Prefix/postfix ++ or --
    if (ts.isPrefixUnaryExpression(node) && (
      node.operator === ts.SyntaxKind.PlusPlusToken ||
      node.operator === ts.SyntaxKind.MinusMinusToken
    )) { hasSideEffects = true; return; }
    if (ts.isPostfixUnaryExpression(node) && (
      node.operator === ts.SyntaxKind.PlusPlusToken ||
      node.operator === ts.SyntaxKind.MinusMinusToken
    )) { hasSideEffects = true; return; }

    ts.forEachChild(node, visit);
  }

  visit(expr);
  return hasSideEffects;
}

// ---------------------------------------------------------------------------
// Inlining
// ---------------------------------------------------------------------------

/**
 * Inline a function call by binding parameters to argument values
 * and evaluating the body.
 *
 * @param decl The function declaration to inline
 * @param argValues Evaluated constant values for each argument
 * @param checker Type checker for symbol resolution
 * @param parentResolver The parent module's symbol resolver
 */
export function inlineFunction(
  decl: ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction,
  argValues: ConstantValue[],
  checker: ts.TypeChecker,
  parentResolver: SymbolResolver,
): LatticeValue {
  const body = decl.body;
  if (!body) return bottom('Function has no body');

  // Build a local scope binding params → arg values
  const localBindings = new Map<ts.Symbol, LatticeValue>();

  const params = decl.parameters;
  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    if (ts.isIdentifier(param.name)) {
      const sym = checker.getSymbolAtLocation(param.name);
      if (sym) {
        localBindings.set(sym, i < argValues.length ? argValues[i] : constant(undefined));
      }
    }
    // Destructuring parameters not supported for inlining
    if (ts.isObjectBindingPattern(param.name) || ts.isArrayBindingPattern(param.name)) {
      return bottom('Function has destructuring parameters — too complex to inline');
    }
  }

  // Resolver that checks local bindings first, then falls back to parent
  const resolver: SymbolResolver = (sym: ts.Symbol) => {
    const local = localBindings.get(sym);
    if (local !== undefined) return local;
    return parentResolver(sym);
  };

  // Create evaluator with local scope (no call resolver — prevent nested inlining)
  const evaluator = new ExpressionEvaluator(checker, resolver);

  // Arrow with expression body
  if (!ts.isBlock(body)) {
    return evaluator.evaluate(body);
  }

  // Block body: process const declarations, then evaluate the return expression
  for (const stmt of body.statements) {
    if (ts.isVariableStatement(stmt)) {
      for (const varDecl of stmt.declarationList.declarations) {
        if (ts.isIdentifier(varDecl.name) && varDecl.initializer) {
          const sym = checker.getSymbolAtLocation(varDecl.name);
          if (sym) {
            localBindings.set(sym, evaluator.evaluate(varDecl.initializer));
          }
        }
      }
    } else if (ts.isReturnStatement(stmt) && stmt.expression) {
      return evaluator.evaluate(stmt.expression);
    }
  }

  return bottom('Function does not return a value');
}
