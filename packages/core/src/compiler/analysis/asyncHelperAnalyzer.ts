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
 * A function is eligible if:
 * - It is `async`
 * - It is declared at module scope (top-level)
 * - It has only simple identifier parameters (no destructuring)
 * - It is not recursive (already enforced by call graph)
 * - It is called from the entry point (reachable in call graph)
 */
export function analyzeHelperFunctions(
  context: CompilerContext,
  callGraph: CallGraphNode,
  sourceFile: ts.SourceFile,
): Map<ts.Symbol, InlinableHelper> {
  const helpers = new Map<ts.Symbol, InlinableHelper>();

  // Collect all user function edges from the call graph (direct children only for v1)
  for (const edge of callGraph.edges) {
    if (!edge.callee) continue;
    if (edge.callee.nodeType !== CallNodeType.UserFunction) continue;
    if (!edge.callee.symbol || !edge.callee.declaration) continue;

    const symbol = edge.callee.symbol;

    // Skip if already analyzed
    if (helpers.has(symbol)) continue;

    const decl = edge.callee.declaration;

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

    // Parameters must be simple identifiers (no destructuring for v1)
    let hasComplexParams = false;
    for (const param of decl.parameters) {
      if (!ts.isIdentifier(param.name)) {
        context.addError(
          param,
          `Helper function '${symbol.getName()}' parameter '${param.name.getText()}' uses destructuring, which is not supported for inlined helpers`,
          ErrorCodes.Inlining.HelperDestructuringParam.code,
        );
        hasComplexParams = true;
      }
      // No rest params
      if (param.dotDotDotToken) {
        context.addError(
          param,
          `Helper function '${symbol.getName()}' uses rest parameters, which are not supported for inlined helpers`,
          ErrorCodes.Inlining.HelperDestructuringParam.code,
        );
        hasComplexParams = true;
      }
      // No default values
      if (param.initializer) {
        context.addError(
          param,
          `Helper function '${symbol.getName()}' uses default parameter values, which are not supported for inlined helpers`,
          ErrorCodes.Inlining.HelperDestructuringParam.code,
        );
        hasComplexParams = true;
      }
    }
    if (hasComplexParams) continue;

    // v1: Must not call other user functions (single-level inlining only)
    let callsOtherHelpers = false;
    for (const childEdge of edge.callee.edges) {
      if (childEdge.callee?.nodeType === CallNodeType.UserFunction) {
        context.addError(
          childEdge.callsite,
          `Helper function '${symbol.getName()}' calls another helper function '${childEdge.callee.name}'. Nested helper calls are not yet supported`,
          ErrorCodes.Inlining.HelperTooDeep.code,
        );
        callsOtherHelpers = true;
      }
    }
    if (callsOtherHelpers) continue;

    // Must be awaited at the call site
    if (!edge.await) {
      context.addError(
        edge.callsite,
        `Helper function '${symbol.getName()}' contains service calls and must be awaited`,
        ErrorCodes.Inlining.HelperNotAwaited.code,
      );
      continue;
    }

    helpers.set(symbol, {
      symbol,
      declaration: decl as ts.FunctionDeclaration | ts.ArrowFunction,
      parameters: Array.from(decl.parameters),
      body,
    });
  }

  return helpers;
}

// ---------------------------------------------------------------------------
// Internal
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
