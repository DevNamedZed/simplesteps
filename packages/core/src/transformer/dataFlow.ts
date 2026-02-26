// ---------------------------------------------------------------------------
// Data Flow Analysis for Inline Workflows
//
// Given a workflow function (the callback inside Steps.createFunction()),
// finds all free variables — identifiers that reference declarations outside
// the function — and classifies each as a service binding, compile-time
// constant, or runtime expression.
// ---------------------------------------------------------------------------

import ts from 'typescript';
import type { ServiceRegistry } from '../compiler/discovery/serviceDiscovery.js';
import { detectCdkExpression } from '../compiler/analysis/cdkDetection.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type FreeVariableClassification = 'service-binding' | 'constant' | 'cdk-synth' | 'runtime';

export interface ServiceInfo {
  /** The service name (e.g. "Lambda", "DynamoDB"). */
  readonly service: string;
  /** The expression node providing the resource (e.g. `validateFn.functionArn`). */
  readonly resourceExpr: ts.Expression | undefined;
}

export interface FreeVariable {
  /** The ts.Symbol of the free variable. */
  readonly symbol: ts.Symbol;
  /** How this variable should be handled. */
  readonly classification: FreeVariableClassification;
  /** For service bindings: service type + the resource expression AST node. */
  readonly serviceInfo?: ServiceInfo;
  /** For constants: the folded compile-time value. */
  readonly constantValue?: unknown;
  /** For runtime: the initializer expression to preserve in transformer output. */
  readonly runtimeExpr?: ts.Expression;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Analyze a workflow function to find and classify all free variables.
 *
 * A "free variable" is any identifier used inside the function that is
 * declared outside it — excluding the function's own parameters.
 */
export function analyzeFreeVariables(
  checker: ts.TypeChecker,
  workflowFn: ts.FunctionLikeDeclarationBase,
  serviceRegistry: ServiceRegistry,
): FreeVariable[] {
  const body = workflowFn.body;
  if (!body) return [];

  // Collect all parameter symbols so we can skip them
  const paramSymbols = new Set<ts.Symbol>();
  for (const param of workflowFn.parameters) {
    const sym = checker.getSymbolAtLocation(param.name);
    if (sym) paramSymbols.add(sym);
  }

  // Collect all locally-declared symbols within the function body
  const localSymbols = new Set<ts.Symbol>();
  collectLocalDeclarations(checker, body, localSymbols);

  // Walk the function body and collect all referenced external symbols
  const externalRefs = new Map<ts.Symbol, ts.Identifier>();
  collectExternalReferences(checker, body, paramSymbols, localSymbols, externalRefs);

  // Classify each external reference
  const results: FreeVariable[] = [];
  for (const [symbol, _identifier] of externalRefs) {
    const classified = classifyFreeVariable(checker, symbol, serviceRegistry);
    results.push(classified);
  }

  return results;
}

// ---------------------------------------------------------------------------
// Internals
// ---------------------------------------------------------------------------

/**
 * Collect all symbols declared within a node (variable declarations,
 * function declarations, class declarations, etc.).
 */
function collectLocalDeclarations(
  checker: ts.TypeChecker,
  node: ts.Node,
  locals: Set<ts.Symbol>,
): void {
  ts.forEachChild(node, child => {
    // Variable declarations
    if (ts.isVariableDeclaration(child) && ts.isIdentifier(child.name)) {
      const sym = checker.getSymbolAtLocation(child.name);
      if (sym) locals.add(sym);
    }

    // Binding patterns (destructuring)
    if (ts.isVariableDeclaration(child) && ts.isObjectBindingPattern(child.name)) {
      for (const element of child.name.elements) {
        if (ts.isIdentifier(element.name)) {
          const sym = checker.getSymbolAtLocation(element.name);
          if (sym) locals.add(sym);
        }
      }
    }
    if (ts.isVariableDeclaration(child) && ts.isArrayBindingPattern(child.name)) {
      for (const element of child.name.elements) {
        if (ts.isBindingElement(element) && ts.isIdentifier(element.name)) {
          const sym = checker.getSymbolAtLocation(element.name);
          if (sym) locals.add(sym);
        }
      }
    }

    // Function and class declarations
    if (ts.isFunctionDeclaration(child) && child.name) {
      const sym = checker.getSymbolAtLocation(child.name);
      if (sym) locals.add(sym);
    }
    if (ts.isClassDeclaration(child) && child.name) {
      const sym = checker.getSymbolAtLocation(child.name);
      if (sym) locals.add(sym);
    }

    // Don't recurse into nested function bodies — their locals are their own scope
    if (ts.isFunctionDeclaration(child) || ts.isFunctionExpression(child) ||
        ts.isArrowFunction(child) || ts.isMethodDeclaration(child)) {
      // Only collect parameter names, not body locals
      for (const param of child.parameters) {
        if (ts.isIdentifier(param.name)) {
          const sym = checker.getSymbolAtLocation(param.name);
          if (sym) locals.add(sym);
        }
      }
      return;
    }

    collectLocalDeclarations(checker, child, locals);
  });
}

/**
 * Walk a node and collect all identifiers that reference symbols
 * not in the parameter set or local declaration set.
 */
function collectExternalReferences(
  checker: ts.TypeChecker,
  node: ts.Node,
  paramSymbols: Set<ts.Symbol>,
  localSymbols: Set<ts.Symbol>,
  externals: Map<ts.Symbol, ts.Identifier>,
): void {
  ts.forEachChild(node, child => {
    if (ts.isIdentifier(child)) {
      // Skip identifiers that are declaration names (not references)
      if (isDeclarationName(child)) return;

      // Skip identifiers on the right side of property access (a.b — "b" is not a reference)
      if (ts.isPropertyAccessExpression(child.parent) && child.parent.name === child) return;

      // Skip type-only positions (type annotations, type arguments)
      if (isInTypePosition(child)) return;

      const sym = checker.getSymbolAtLocation(child);
      if (!sym) return;

      // Resolve aliases (imports)
      const resolved = sym.flags & ts.SymbolFlags.Alias
        ? checker.getAliasedSymbol(sym)
        : sym;

      if (paramSymbols.has(resolved) || localSymbols.has(resolved)) return;

      // Skip well-known globals (Error, Promise, JSON, console, etc.)
      if (isWellKnownGlobal(child.text)) return;

      if (!externals.has(resolved)) {
        externals.set(resolved, child);
      }
    }

    collectExternalReferences(checker, child, paramSymbols, localSymbols, externals);
  });
}

/**
 * Check if an identifier is the name in a declaration (not a reference).
 */
function isDeclarationName(node: ts.Identifier): boolean {
  const parent = node.parent;
  if (!parent) return false;

  if (ts.isVariableDeclaration(parent) && parent.name === node) return true;
  if (ts.isFunctionDeclaration(parent) && parent.name === node) return true;
  if (ts.isClassDeclaration(parent) && parent.name === node) return true;
  if (ts.isParameter(parent) && parent.name === node) return true;
  if (ts.isPropertyAssignment(parent) && parent.name === node) return true;
  if (ts.isBindingElement(parent) && parent.name === node) return true;
  if (ts.isImportSpecifier(parent) && parent.name === node) return true;
  if (ts.isMethodDeclaration(parent) && parent.name === node) return true;

  return false;
}

/**
 * Check if a node is in a type-only position (type annotation, type argument, etc.).
 */
function isInTypePosition(node: ts.Node): boolean {
  let current: ts.Node | undefined = node.parent;
  while (current) {
    if (ts.isTypeNode(current)) return true;
    if (ts.isTypeReferenceNode(current)) return true;
    // Heritage clauses (extends/implements)
    if (ts.isHeritageClause(current)) return true;
    current = current.parent;
  }
  return false;
}

/** Names that should not be treated as free variables. */
const WELL_KNOWN_GLOBALS = new Set([
  'Error', 'TypeError', 'RangeError', 'SyntaxError', 'ReferenceError',
  'Promise', 'JSON', 'Math', 'console', 'undefined', 'NaN', 'Infinity',
  'parseInt', 'parseFloat', 'isNaN', 'isFinite', 'btoa', 'atob',
  'Array', 'Object', 'String', 'Number', 'Boolean', 'Symbol', 'Map', 'Set',
  'Date', 'RegExp', 'crypto',
]);

function isWellKnownGlobal(name: string): boolean {
  return WELL_KNOWN_GLOBALS.has(name);
}

/**
 * Classify a free variable by inspecting its declaration.
 */
function classifyFreeVariable(
  checker: ts.TypeChecker,
  symbol: ts.Symbol,
  serviceRegistry: ServiceRegistry,
): FreeVariable {
  const declarations = symbol.declarations;
  if (!declarations || declarations.length === 0) {
    return { symbol, classification: 'runtime' };
  }

  const decl = declarations[0];

  // Variable declaration with an initializer
  if (ts.isVariableDeclaration(decl) && decl.initializer) {
    // Check for service binding pattern
    const serviceMatch = matchServiceBindingExpr(checker, decl.initializer, serviceRegistry);
    if (serviceMatch) {
      return {
        symbol,
        classification: 'service-binding',
        serviceInfo: serviceMatch,
      };
    }

    // Check for compile-time constant
    const parent = decl.parent;
    if (ts.isVariableDeclarationList(parent) && parent.flags & ts.NodeFlags.Const) {
      const constValue = tryFoldConstantExpr(decl.initializer);
      if (constValue !== undefined) {
        return {
          symbol,
          classification: 'constant',
          constantValue: constValue,
        };
      }
    }

    // Check for CDK synth-time expression pattern
    // (e.g., const arn = myLambda.functionArn where myLambda is a CDK construct)
    const cdkMatch = detectCdkExpression(checker, decl.initializer);
    if (cdkMatch) {
      return {
        symbol,
        classification: 'cdk-synth',
        runtimeExpr: decl.initializer,
      };
    }

    // Runtime expression — preserve the initializer
    return {
      symbol,
      classification: 'runtime',
      runtimeExpr: decl.initializer,
    };
  }

  // Parameter, import, etc. — treat as runtime
  return { symbol, classification: 'runtime', runtimeExpr: undefined };
}

// ---------------------------------------------------------------------------
// Service binding detection
// ---------------------------------------------------------------------------

/**
 * Match an expression against known service binding patterns.
 * Matches: `Lambda(expr)`, `new DynamoDB(expr)`, etc.
 */
function matchServiceBindingExpr(
  checker: ts.TypeChecker,
  initializer: ts.Expression,
  serviceRegistry: ServiceRegistry,
): ServiceInfo | null {
  // Match call expressions: Lambda(expr)
  if (ts.isCallExpression(initializer)) {
    const calleeSym = resolveSymbolThroughAliases(checker, initializer.expression);
    if (calleeSym) {
      for (const [name, binding] of serviceRegistry.bindings) {
        if (calleeSym === binding.symbol) {
          const resourceExpr = initializer.arguments[0];
          return { service: name, resourceExpr };
        }
      }
    }
  }

  // Match new expressions: new DynamoDB(expr)
  if (ts.isNewExpression(initializer)) {
    const calleeSym = resolveSymbolThroughAliases(checker, initializer.expression);
    if (calleeSym) {
      for (const [name, binding] of serviceRegistry.bindings) {
        if (calleeSym === binding.symbol) {
          const resourceExpr = initializer.arguments?.[0];
          return { service: name, resourceExpr };
        }
      }
    }
  }

  return null;
}

/**
 * Resolve a symbol through import aliases to the original declaration.
 */
function resolveSymbolThroughAliases(
  checker: ts.TypeChecker,
  expr: ts.Expression,
): ts.Symbol | undefined {
  const sym = checker.getSymbolAtLocation(expr);
  if (!sym) return undefined;
  if (sym.flags & ts.SymbolFlags.Alias) {
    return checker.getAliasedSymbol(sym);
  }
  return sym;
}

// ---------------------------------------------------------------------------
// Constant folding (simplified, checker-free version for data flow)
// ---------------------------------------------------------------------------

/**
 * Try to fold a TypeScript expression to a compile-time literal value.
 * Returns the folded value, or undefined if not foldable.
 */
function tryFoldConstantExpr(expr: ts.Expression): unknown | undefined {
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
    return expr.text;
  }
  if (ts.isNumericLiteral(expr)) {
    return Number(expr.text);
  }
  if (expr.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (expr.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (expr.kind === ts.SyntaxKind.NullKeyword) return null;

  // Template expression with all-constant substitutions
  if (ts.isTemplateExpression(expr)) {
    let result = expr.head.text;
    for (const span of expr.templateSpans) {
      const spanValue = tryFoldConstantExpr(span.expression);
      if (spanValue === undefined) return undefined;
      result += String(spanValue);
      result += span.literal.text;
    }
    return result;
  }

  // Unary prefix: -42, !true, +5
  if (ts.isPrefixUnaryExpression(expr)) {
    const operand = tryFoldConstantExpr(expr.operand);
    if (operand === undefined) return undefined;
    switch (expr.operator) {
      case ts.SyntaxKind.MinusToken:
        return typeof operand === 'number' ? -operand : undefined;
      case ts.SyntaxKind.ExclamationToken:
        return !operand;
      case ts.SyntaxKind.PlusToken:
        return typeof operand === 'number' ? +operand : undefined;
      default:
        return undefined;
    }
  }

  // Binary expressions: 1 + 2, "a" + "b"
  if (ts.isBinaryExpression(expr)) {
    const left = tryFoldConstantExpr(expr.left);
    const right = tryFoldConstantExpr(expr.right);
    if (left === undefined || right === undefined) return undefined;

    switch (expr.operatorToken.kind) {
      case ts.SyntaxKind.PlusToken:
        if (typeof left === 'number' && typeof right === 'number') return left + right;
        if (typeof left === 'string' || typeof right === 'string') return String(left) + String(right);
        return undefined;
      case ts.SyntaxKind.MinusToken:
        if (typeof left === 'number' && typeof right === 'number') return left - right;
        return undefined;
      case ts.SyntaxKind.AsteriskToken:
        if (typeof left === 'number' && typeof right === 'number') return left * right;
        return undefined;
      case ts.SyntaxKind.SlashToken:
        if (typeof left === 'number' && typeof right === 'number' && right !== 0) return left / right;
        return undefined;
      default:
        return undefined;
    }
  }

  // Object literal: { a: 1, b: "x" }
  if (ts.isObjectLiteralExpression(expr)) {
    const obj: Record<string, unknown> = {};
    for (const prop of expr.properties) {
      if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) return undefined;
      const val = tryFoldConstantExpr(prop.initializer);
      if (val === undefined) return undefined;
      obj[prop.name.text] = val;
    }
    return obj;
  }

  // Array literal: [1, 2, 3]
  if (ts.isArrayLiteralExpression(expr)) {
    const arr: unknown[] = [];
    for (const elem of expr.elements) {
      const val = tryFoldConstantExpr(elem);
      if (val === undefined) return undefined;
      arr.push(val);
    }
    return arr;
  }

  return undefined;
}
