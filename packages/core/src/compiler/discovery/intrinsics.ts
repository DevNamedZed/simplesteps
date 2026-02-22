import ts from 'typescript';
import path from 'path';
import { CompilerContext } from '../compilerContext.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * All known Steps static method symbols, keyed by method name.
 */
export type IntrinsicsMethods = {
  /** The Steps.createFunction() symbol — used to find call sites. */
  readonly createFunction: ts.Symbol;
  /** Map of all other Steps static method symbols. */
  readonly methods: ReadonlyMap<string, ts.Symbol>;
};

// ---------------------------------------------------------------------------
// Resolution
// ---------------------------------------------------------------------------

const STEPS_CLASS_NAME = 'Steps';

/**
 * Resolve the path to the runtime index.ts file within the package.
 * Uses the package-relative path rather than __dirname.
 */
function resolveRuntimePath(): string {
  // The runtime/index.ts lives relative to the package root.
  // From packages/core/src/compiler/discovery/ → ../../runtime/index.ts
  return path.resolve(__dirname, '../../runtime/index.ts');
}

/**
 * Load all Steps class static method symbols from the runtime module.
 *
 * This scans packages/core/src/runtime/index.ts for the `Steps` class
 * and collects every static method symbol. The compiler uses these symbols
 * to recognise intrinsic calls.
 */
export function loadIntrinsics(context: CompilerContext, runtimePathOverride?: string): IntrinsicsMethods | null {
  const runtimePath = runtimePathOverride ?? resolveRuntimePath();
  const sourceFile = context.program.getSourceFile(runtimePath);

  if (!sourceFile) {
    context.logger.warn(`Could not load runtime source file: ${runtimePath}`);
    return null;
  }

  // Find the Steps class declaration
  let stepsClass: ts.ClassDeclaration | undefined;
  for (const stmt of sourceFile.statements) {
    if (ts.isClassDeclaration(stmt) && stmt.name?.escapedText === STEPS_CLASS_NAME) {
      stepsClass = stmt;
      break;
    }
  }

  if (!stepsClass) {
    context.logger.warn(`Could not find ${STEPS_CLASS_NAME} class in runtime`);
    return null;
  }

  // Collect all static method symbols
  let createFunctionSymbol: ts.Symbol | undefined;
  const methods = new Map<string, ts.Symbol>();

  for (const member of stepsClass.members) {
    if (!ts.isMethodDeclaration(member)) continue;

    // Only static members
    const isStatic = member.modifiers?.some(
      m => m.kind === ts.SyntaxKind.StaticKeyword,
    );
    if (!isStatic) continue;

    const symbol = context.checker.getSymbolAtLocation(member.name);
    if (!symbol) continue;

    const name = symbol.getName();
    methods.set(name, symbol);

    if (name === 'createFunction') {
      createFunctionSymbol = symbol;
    }
  }

  if (!createFunctionSymbol) {
    context.logger.warn('Could not find Steps.createFunction() symbol');
    return null;
  }

  context.logger.debug(
    `Loaded ${methods.size} intrinsic methods: ${[...methods.keys()].join(', ')}`,
  );

  return {
    createFunction: createFunctionSymbol,
    methods,
  };
}
