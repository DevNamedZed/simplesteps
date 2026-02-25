import ts from 'typescript';

// ---------------------------------------------------------------------------
// Terminators — discriminated union for basic block exits
// ---------------------------------------------------------------------------

export interface FallTerminator {
  readonly kind: 'fall';
  readonly target: string;
}

export interface BranchTerminator {
  readonly kind: 'branch';
  readonly condition: ts.Expression;
  readonly thenBlock: string;
  readonly elseBlock: string;
}

export interface LoopTerminator {
  readonly kind: 'loop';
  readonly condition: ts.Expression;
  readonly bodyBlock: string;
  readonly exitBlock: string;
}

export interface LoopBackTerminator {
  readonly kind: 'loopBack';
  readonly target: string;
}

export interface CatchErrorHandler {
  readonly errorClassName: string;
  readonly blockId: string;
}

export interface TryCatchTerminator {
  readonly kind: 'tryCatch';
  readonly tryBlock: string;
  readonly catchParam?: string;
  readonly errorHandlers: readonly CatchErrorHandler[];
  readonly catchFallback?: string;
  readonly finallyBlock?: string;
  readonly mergeBlock: string;
}

export interface MapStateTerminator {
  readonly kind: 'mapState';
  /** The original ForOfStatement (present for `for...of`, absent for `Steps.map()`). */
  readonly expression?: ts.ForOfStatement;
  /** The expression that evaluates to the items array (e.g., `input.items`). */
  readonly itemsExpression: ts.Expression;
  /** Iteration variable name (e.g., `item`). */
  readonly iterVarName: string;
  /** Iteration variable symbol (for variable resolver). */
  readonly iterVarSymbol?: ts.Symbol;
  readonly bodyBlock: string;
  readonly exitBlock: string;
  readonly collectResults: boolean;
  readonly maxConcurrency?: number;
  /** Variable name for collecting results (e.g., `results` from `const results = await Steps.map(...)`). */
  readonly resultBindingName?: string;
  /** Symbol of the result variable for registration in the variable resolver. */
  readonly resultSymbol?: ts.Symbol;
}

export interface ReturnTerminator {
  readonly kind: 'return';
  readonly expression?: ts.Expression;
}

export interface ThrowTerminator {
  readonly kind: 'throw';
  readonly expression: ts.Expression;
}

export interface BreakTerminator {
  readonly kind: 'break';
  readonly target: string;
}

export interface ContinueTerminator {
  readonly kind: 'continue';
  readonly target: string;
}

/** A branch in Promise.all: either a direct expression (service call) or an inlined substep. */
export type ParallelBranch =
  | { readonly kind: 'expression'; readonly expression: ts.Expression }
  | { readonly kind: 'substep'; readonly bodyBlock: string };

export interface ParallelTerminator {
  readonly kind: 'parallel';
  readonly branches: readonly ParallelBranch[];
  readonly resultBindings: readonly string[];
  readonly resultSymbols: readonly (ts.Symbol | undefined)[];
  readonly exitBlock: string;
}

export interface TernaryAssignTerminator {
  readonly kind: 'ternaryAssign';
  readonly condition: ts.Expression;
  readonly variableName: string;
  readonly variableSymbol: ts.Symbol;
  readonly thenExpression: ts.Expression;
  readonly elseExpression: ts.Expression;
  readonly continuation: string;
}

export type Terminator =
  | FallTerminator
  | BranchTerminator
  | LoopTerminator
  | LoopBackTerminator
  | TryCatchTerminator
  | MapStateTerminator
  | ParallelTerminator
  | TernaryAssignTerminator
  | ReturnTerminator
  | ThrowTerminator
  | BreakTerminator
  | ContinueTerminator;

// ---------------------------------------------------------------------------
// Basic block & control flow graph
// ---------------------------------------------------------------------------

export interface BasicBlock {
  readonly id: string;
  readonly statements: readonly ts.Statement[];
  readonly terminator: Terminator;
  /**
   * Set on blocks produced by inlined helpers that return a value.
   * Tells the state builder to assign the last Task state's ResultPath
   * to the caller's variable, or to create a variable alias for non-await returns.
   */
  readonly returnTargetVar?: {
    readonly name: string;
    readonly symbol: ts.Symbol;
    /** For non-await returns (e.g. `return someVar`), the expression to alias. */
    readonly expression?: ts.Expression;
  };
}

export interface ControlFlowGraph {
  readonly entry: string;
  readonly blocks: ReadonlyMap<string, BasicBlock>;
  /**
   * Non-awaited service calls that are awaited later via an identifier.
   * Maps the variable symbol to the original call expression so the state
   * builder can resolve `await foo` → `await svc.call(params)`.
   */
  readonly deferredCalls?: ReadonlyMap<ts.Symbol, ts.CallExpression>;
}
