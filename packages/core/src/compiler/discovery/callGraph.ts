import ts from 'typescript';
import { CompilerContext } from '../compilerContext.js';
import { StepFunctionCallSite } from './callSiteLocator.js';
import { getFunctionDeclarationFromSymbol } from './utils.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export enum CallNodeType {
  /** Entry point of a step function. */
  EntryPoint,
  /** An intrinsic method or function (e.g., JSON.stringify, Steps.format). */
  Intrinsic,
  /** A user-defined function that may be inlined. */
  UserFunction,
  /** A service binding method (e.g., lambda.call). */
  ServiceCall,
}

export class CallGraphNode {
  constructor(
    public readonly symbol: ts.Symbol | null | undefined,
    public readonly declaration: ts.FunctionLikeDeclarationBase | null | undefined,
    public readonly edges: readonly CallGraphNodeEdge[],
    public readonly nodeType: CallNodeType = CallNodeType.UserFunction,
  ) {}

  get name(): string {
    return this.symbol?.getName() ?? '<anonymous>';
  }
}

export interface CallGraphNodeEdge {
  readonly await: boolean;
  readonly callsite: ts.CallLikeExpression;
  readonly symbol?: ts.Symbol;
  readonly callee?: CallGraphNode;
}

// ---------------------------------------------------------------------------
// Call graph construction
// ---------------------------------------------------------------------------

/**
 * Build a call graph starting from a step function entry point.
 *
 * The graph tracks:
 * - Which functions are called from the entry point (and transitively)
 * - Whether each call is `await`ed (only awaited service calls become Task states)
 * - Symbol resolution for matching against intrinsics / service registry
 */
export function createCallGraph(
  context: CompilerContext,
  callSite: StepFunctionCallSite,
): CallGraphNode {
  const cache = new Map<ts.FunctionLikeDeclarationBase, CallGraphNode>();
  const inProgress = new Set<ts.FunctionLikeDeclarationBase>();

  const edges = parseFunctionEdges(
    context,
    cache,
    inProgress,
    callSite.factoryFunction.factory,
  );

  return new CallGraphNode(
    null,
    callSite.factoryFunction.factory,
    edges,
    CallNodeType.EntryPoint,
  );
}

// ---------------------------------------------------------------------------
// Internal
// ---------------------------------------------------------------------------

function parseFunctionEdges(
  context: CompilerContext,
  cache: Map<ts.FunctionLikeDeclarationBase, CallGraphNode>,
  inProgress: Set<ts.FunctionLikeDeclarationBase>,
  functionDecl: ts.FunctionLikeDeclarationBase,
): CallGraphNodeEdge[] {
  const edges: CallGraphNodeEdge[] = [];

  // Guard against recursion
  if (inProgress.has(functionDecl)) {
    context.addError(
      functionDecl,
      'Recursive function calls are not supported in step functions',
      'SS100',
    );
    return edges;
  }
  inProgress.add(functionDecl);

  const visit = (node: ts.Node): void => {
    // Detect await wrapping a call expression:
    //   await someFunc()  →  AwaitExpression > CallExpression
    if (ts.isAwaitExpression(node) && ts.isCallExpression(node.expression)) {
      const callExpr = node.expression;
      const symbol = context.checker.getSymbolAtLocation(callExpr.expression);
      const callee = resolveCallee(context, cache, inProgress, symbol);

      edges.push({
        await: true,
        callsite: callExpr,
        symbol,
        callee,
      });

      // Still visit the arguments of the call (they may contain nested calls)
      for (const arg of callExpr.arguments) {
        ts.forEachChild(arg, visit);
      }
      return;
    }

    // Non-awaited call expression
    if (ts.isCallExpression(node)) {
      const symbol = context.checker.getSymbolAtLocation(node.expression);
      const callee = resolveCallee(context, cache, inProgress, symbol);

      edges.push({
        await: false,
        callsite: node,
        symbol,
        callee,
      });

      // Visit arguments for nested calls
      for (const arg of node.arguments) {
        ts.forEachChild(arg, visit);
      }
      return;
    }

    // Don't descend into nested function bodies — they have their own scope
    if (
      ts.isFunctionDeclaration(node) ||
      ts.isFunctionExpression(node) ||
      ts.isArrowFunction(node)
    ) {
      return;
    }

    ts.forEachChild(node, visit);
  };

  if (functionDecl.body) {
    ts.forEachChild(functionDecl.body, visit);
  }

  inProgress.delete(functionDecl);
  return edges;
}

/**
 * If the symbol resolves to a user-defined function with a body,
 * recursively build its call graph node. Otherwise return undefined
 * (external / intrinsic / service — resolved later).
 */
function resolveCallee(
  context: CompilerContext,
  cache: Map<ts.FunctionLikeDeclarationBase, CallGraphNode>,
  inProgress: Set<ts.FunctionLikeDeclarationBase>,
  symbol?: ts.Symbol,
): CallGraphNode | undefined {
  if (!symbol) return undefined;

  const decl = getFunctionDeclarationFromSymbol(symbol);
  if (!decl) return undefined;

  // Return cached node if already built
  if (cache.has(decl)) {
    return cache.get(decl);
  }

  // Recursively build edges for this function
  const childEdges = parseFunctionEdges(context, cache, inProgress, decl);
  const node = new CallGraphNode(symbol, decl, childEdges, CallNodeType.UserFunction);
  cache.set(decl, node);
  return node;
}
