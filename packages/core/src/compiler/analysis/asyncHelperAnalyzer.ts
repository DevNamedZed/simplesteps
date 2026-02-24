import ts from 'typescript';
import { CompilerContext } from '../compilerContext.js';
import { ErrorCodes } from '../diagnosticCodes.js';
import type { CallGraphNode, CallGraphNodeEdge } from '../discovery/callGraph.js';
import { CallNodeType } from '../discovery/callGraph.js';
import { getFunctionDeclarationFromSymbol } from '../discovery/utils.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * A module-scope async function eligible for CFG-level inlining.
 */
export interface InlinableHelper {
  readonly symbol: ts.Symbol;
  readonly declaration: ts.FunctionDeclaration | ts.ArrowFunction;
  readonly parameters: readonly ts.ParameterDeclaration[];
  readonly body: ts.Block;
}

/**
 * A binding from an inlined helper's parameter to the call-site argument.
 * Used to register the parameter symbol in the variable resolution.
 */
export interface InlineBinding {
  readonly paramSymbol: ts.Symbol;
  readonly argExpression: ts.Expression;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Analyze the call graph to identify async helper functions eligible for
 * CFG-level inlining. Returns a map from function symbol to helper info.
 *
 * Supports transitive inlining — helper A can call helper B, which calls
 * helper C. The compiler inlines them bottom-up (leaf helpers first).
 *
 * A function is eligible if:
 * - It is `async`
 * - It is declared at module scope (top-level)
 * - Parameters are simple identifiers, object destructuring, or have defaults
 *   (no rest params, array destructuring, nested destructuring, or computed keys)
 * - It is not recursive (already enforced by call graph)
 * - All callee helpers are themselves eligible
 * - It is called from the entry point (reachable in call graph)
 */
export function analyzeHelperFunctions(
  context: CompilerContext,
  callGraph: CallGraphNode,
  sourceFile: ts.SourceFile,
): Map<ts.Symbol, InlinableHelper> {
  const helpers = new Map<ts.Symbol, InlinableHelper>();
  const ineligible = new Set<ts.Symbol>();

  // Phase 1: Collect all reachable UserFunction nodes from the call graph
  const allUserFunctions = collectAllUserFunctionNodes(callGraph);

  // Phase 2: Topological sort — leaf helpers first (those with no UserFunction callees)
  const sorted = topologicalSort(allUserFunctions);

  // Phase 3: Analyze each in bottom-up order
  for (const node of sorted) {
    const symbol = node.symbol!;
    const decl = node.declaration!;

    // Must be async
    const modifiers = ts.canHaveModifiers(decl) ? ts.getModifiers(decl) : undefined;
    if (!modifiers?.some((m: ts.Modifier) => m.kind === ts.SyntaxKind.AsyncKeyword)) {
      continue;
    }

    // Must be a function declaration or arrow function (not a method)
    if (!ts.isFunctionDeclaration(decl) && !ts.isArrowFunction(decl)) {
      continue;
    }

    // Must be at module scope (top-level in the source file)
    if (!isModuleScope(decl, sourceFile)) {
      continue;
    }

    // Must have a block body
    const body = getBody(decl);
    if (!body) continue;

    // Validate parameters: identifiers, object destructuring, and defaults are OK.
    // Rest params, array destructuring, nested destructuring, and computed keys are not.
    let hasComplexParams = false;
    for (const param of decl.parameters) {
      // Rest params not supported
      if (param.dotDotDotToken) {
        context.addError(
          param,
          `Substep '${symbol.getName()}' uses rest parameters, which are not supported for inlined substeps`,
          ErrorCodes.Inlining.HelperDestructuringParam.code,
        );
        hasComplexParams = true;
        continue;
      }

      // Simple identifier (with or without default) — always OK
      if (ts.isIdentifier(param.name)) {
        continue;
      }

      // Object destructuring — validate each element is simple
      if (ts.isObjectBindingPattern(param.name)) {
        for (const element of param.name.elements) {
          if (element.dotDotDotToken) {
            context.addError(
              element,
              `Substep '${symbol.getName()}' uses rest element in destructuring, which is not supported for inlined substeps`,
              ErrorCodes.Inlining.HelperDestructuringParam.code,
            );
            hasComplexParams = true;
          }
          if (!ts.isIdentifier(element.name)) {
            context.addError(
              element,
              `Substep '${symbol.getName()}' uses nested destructuring, which is not supported for inlined substeps`,
              ErrorCodes.Inlining.HelperDestructuringParam.code,
            );
            hasComplexParams = true;
          }
          if (element.propertyName && !ts.isIdentifier(element.propertyName)) {
            context.addError(
              element,
              `Substep '${symbol.getName()}' uses computed property names in destructuring, which are not supported for inlined substeps`,
              ErrorCodes.Inlining.HelperDestructuringParam.code,
            );
            hasComplexParams = true;
          }
        }
        continue;
      }

      // Array destructuring — not supported
      context.addError(
        param,
        `Substep '${symbol.getName()}' parameter '${param.name.getText()}' uses array destructuring, which is not supported for inlined substeps`,
        ErrorCodes.Inlining.HelperDestructuringParam.code,
      );
      hasComplexParams = true;
    }
    if (hasComplexParams) {
      ineligible.add(symbol);
      continue;
    }

    // All callee helpers must be eligible (bottom-up: they've already been analyzed)
    let hasIneligibleCallee = false;
    for (const childEdge of node.edges) {
      if (childEdge.callee?.nodeType === CallNodeType.UserFunction && childEdge.callee.symbol) {
        if (ineligible.has(childEdge.callee.symbol)) {
          hasIneligibleCallee = true;
        } else if (!helpers.has(childEdge.callee.symbol) && allUserFunctions.has(childEdge.callee.symbol)) {
          // Callee was visited but not registered — ineligible
          hasIneligibleCallee = true;
        }
      }
    }
    if (hasIneligibleCallee) {
      ineligible.add(symbol);
      continue;
    }

    helpers.set(symbol, {
      symbol,
      declaration: decl as ts.FunctionDeclaration | ts.ArrowFunction,
      parameters: Array.from(decl.parameters),
      body,
    });
  }

  // Phase 4: Check that all call sites to registered helpers are awaited
  checkAwaitedCalls(context, callGraph, helpers);

  return helpers;
}

// ---------------------------------------------------------------------------
// Internal — call graph traversal
// ---------------------------------------------------------------------------

/**
 * Recursively walk the call graph and collect every reachable UserFunction node.
 */
function collectAllUserFunctionNodes(
  root: CallGraphNode,
): Map<ts.Symbol, CallGraphNode> {
  const result = new Map<ts.Symbol, CallGraphNode>();
  const visited = new Set<CallGraphNode>();

  function walk(node: CallGraphNode): void {
    if (visited.has(node)) return;
    visited.add(node);

    for (const edge of node.edges) {
      if (!edge.callee) continue;
      if (edge.callee.nodeType === CallNodeType.UserFunction && edge.callee.symbol) {
        result.set(edge.callee.symbol, edge.callee);
      }
      walk(edge.callee);
    }
  }

  walk(root);
  return result;
}

/**
 * Topological sort of UserFunction nodes — leaf helpers first (those whose
 * edges contain no other UserFunction nodes), then helpers that call those.
 * This allows bottom-up eligibility analysis.
 */
function topologicalSort(
  nodes: Map<ts.Symbol, CallGraphNode>,
): CallGraphNode[] {
  const sorted: CallGraphNode[] = [];
  const visited = new Set<ts.Symbol>();
  const visiting = new Set<ts.Symbol>(); // cycle guard (recursion already caught by SS100)

  function visit(node: CallGraphNode): void {
    const sym = node.symbol!;
    if (visited.has(sym)) return;
    if (visiting.has(sym)) return; // cycle — already caught by call graph (SS100)
    visiting.add(sym);

    for (const edge of node.edges) {
      if (edge.callee?.nodeType === CallNodeType.UserFunction && edge.callee.symbol) {
        const callee = nodes.get(edge.callee.symbol);
        if (callee) {
          visit(callee);
        }
      }
    }

    visiting.delete(sym);
    visited.add(sym);
    sorted.push(node);
  }

  for (const node of nodes.values()) {
    visit(node);
  }

  return sorted; // leaf-first order
}

/**
 * Walk the entire call graph and emit SS805 for any non-awaited call to a
 * registered helper. Decoupled from per-node eligibility analysis because
 * the await requirement is a call-site property, not a function property.
 */
function checkAwaitedCalls(
  context: CompilerContext,
  root: CallGraphNode,
  helpers: Map<ts.Symbol, InlinableHelper>,
): void {
  const visited = new Set<CallGraphNode>();

  function walk(node: CallGraphNode): void {
    if (visited.has(node)) return;
    visited.add(node);

    for (const edge of node.edges) {
      if (edge.callee?.symbol && helpers.has(edge.callee.symbol)) {
        if (!edge.await) {
          context.addError(
            edge.callsite,
            `Substep '${edge.callee.symbol.getName()}' contains service calls and must be awaited`,
            ErrorCodes.Inlining.HelperNotAwaited.code,
          );
        }
      }
      if (edge.callee) {
        walk(edge.callee);
      }
    }
  }

  walk(root);
}

// ---------------------------------------------------------------------------
// Internal — AST helpers
// ---------------------------------------------------------------------------

/**
 * Check if a function declaration is at module scope (direct child of SourceFile,
 * or a variable declaration at module scope for arrow functions).
 */
function isModuleScope(
  decl: ts.FunctionLikeDeclarationBase,
  sourceFile: ts.SourceFile,
): boolean {
  if (ts.isFunctionDeclaration(decl)) {
    return decl.parent === sourceFile;
  }

  // Arrow function: check if it's assigned to a top-level variable
  // const helper = async (...) => { ... }
  if (ts.isArrowFunction(decl)) {
    const parent = decl.parent;
    if (ts.isVariableDeclaration(parent)) {
      const varStmt = parent.parent?.parent;
      if (varStmt && ts.isVariableStatement(varStmt) && varStmt.parent === sourceFile) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Get the block body from a function declaration or arrow function.
 */
function getBody(decl: ts.FunctionLikeDeclarationBase): ts.Block | null {
  if (!decl.body) return null;
  if (ts.isBlock(decl.body)) return decl.body;
  return null;
}
