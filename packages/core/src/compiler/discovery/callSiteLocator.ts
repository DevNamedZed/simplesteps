import ts from 'typescript';
import { CompilerContext } from '../compilerContext.js';
import { IntrinsicsMethods } from './intrinsics.js';
import { getFunctionDeclarationFromNode, isFunctionLikeDeclarationBase } from './utils.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * How the step function was declared.
 */
export type StepFunctionOrigin =
  | { kind: 'createFunction'; call: ts.CallExpression }
  | { kind: 'decorator'; decorator: ts.Decorator; method: ts.MethodDeclaration };

/**
 * The factory function passed to Steps.createFunction() or the decorated method.
 */
export interface StepFunctionFactory {
  readonly contextType?: ts.TypeNode;
  readonly inputType?: ts.TypeNode;
  readonly factory: ts.FunctionLikeDeclarationBase;
}

/**
 * A discovered step function call site.
 */
export interface StepFunctionCallSite {
  readonly file: ts.SourceFile;
  readonly origin: StepFunctionOrigin;
  readonly factoryFunction: StepFunctionFactory;
}

// ---------------------------------------------------------------------------
// Discovery
// ---------------------------------------------------------------------------

/**
 * Find all step function declarations in a source file.
 *
 * Detects two patterns:
 * 1. `Steps.createFunction(fn)` — call expression
 * 2. `@stepFunction` — method decorator
 */
export function findCallSites(
  context: CompilerContext,
  intrinsics: IntrinsicsMethods,
  file: ts.SourceFile,
): StepFunctionCallSite[] {
  const callSites: StepFunctionCallSite[] = [];

  const visit = (node: ts.Node): void => {
    // Pattern 1: Steps.createFunction(fn)
    if (
      ts.isCallExpression(node) &&
      context.checker.getSymbolAtLocation(node.expression) === intrinsics.createFunction
    ) {
      const factory = extractFactoryFromCreateFunction(context, node);
      if (factory) {
        callSites.push({
          file,
          origin: { kind: 'createFunction', call: node },
          factoryFunction: factory,
        });
      }
      // Don't descend into the factory function body here — it will be
      // analyzed by the call graph builder.
      return;
    }

    // Pattern 2: @stepFunction decorator on a method
    if (ts.isMethodDeclaration(node) && node.modifiers) {
      for (const mod of node.modifiers) {
        if (!ts.isDecorator(mod)) continue;
        const expr = mod.expression;
        const symbol = ts.isIdentifier(expr)
          ? context.checker.getSymbolAtLocation(expr)
          : ts.isCallExpression(expr) && ts.isIdentifier(expr.expression)
            ? context.checker.getSymbolAtLocation(expr.expression)
            : undefined;

        if (symbol && symbol.getName() === 'stepFunction') {
          const factory: StepFunctionFactory = {
            factory: node,
          };
          callSites.push({
            file,
            origin: { kind: 'decorator', decorator: mod, method: node },
            factoryFunction: factory,
          });
          break;
        }
      }
    }

    ts.forEachChild(node, visit);
  };

  ts.forEachChild(file, visit);
  return callSites;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function extractFactoryFromCreateFunction(
  context: CompilerContext,
  callExpr: ts.CallExpression,
): StepFunctionFactory | null {
  const arg = callExpr.arguments[0];
  if (!arg) return null;

  let factory: ts.FunctionLikeDeclarationBase | null = null;

  if (isFunctionLikeDeclarationBase(arg)) {
    factory = arg;
  } else if (ts.isIdentifier(arg)) {
    factory = getFunctionDeclarationFromNode(context.checker, arg);
  }

  if (!factory) return null;

  // Extract type parameters from the generic: Steps.createFunction<TInput, TOutput>(fn)
  const typeArgs = callExpr.typeArguments;
  return {
    inputType: typeArgs?.[0],
    contextType: undefined,
    factory,
  };
}
