import ts from 'typescript';
import { CompilerContext } from '../compilerContext.js';
import { ErrorCodes } from '../diagnosticCodes.js';
import type { InlinableHelper, InlineBinding } from '../analysis/asyncHelperAnalyzer.js';
import type {
  BasicBlock,
  ControlFlowGraph,
  Terminator,
  ParallelBranch,
} from './types.js';

// ---------------------------------------------------------------------------
// Internal state
// ---------------------------------------------------------------------------

interface LoopContext {
  readonly conditionBlock: string;
  readonly exitBlock: string;
  readonly isSwitch?: boolean;
}

class CFGBuilderState {
  private counter = 0;
  readonly blocks = new Map<string, BasicBlock>();
  readonly deferredCalls = new Map<ts.Symbol, ts.CallExpression>();

  newBlockId(label?: string): string {
    const id = label
      ? `${label}_${this.counter++}`
      : `bb_${this.counter++}`;
    return id;
  }

  addBlock(
    id: string,
    statements: readonly ts.Statement[],
    terminator: Terminator,
    returnTargetVar?: BasicBlock['returnTargetVar'],
  ): void {
    this.blocks.set(id, { id, statements, terminator, ...(returnTargetVar && { returnTargetVar }) });
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Result of building a CFG, including any inline bindings from helper
 * function inlining.
 */
export interface BuildCFGResult {
  readonly cfg: ControlFlowGraph;
  readonly inlineBindings: readonly InlineBinding[];
}

/**
 * Build a control flow graph from a function body block.
 *
 * Takes a `ts.Block` (the factory function body), not a full
 * `StepFunctionCallSite` — keeps CFG construction decoupled from discovery.
 *
 * When `helperRegistry` is provided, awaited calls to functions in the
 * registry are inlined: the helper's body statements are spliced into the
 * CFG at the call site, and parameter-to-argument bindings are returned
 * so the variable resolver can map helper parameters to caller values.
 */
export function buildCFG(
  context: CompilerContext,
  body: ts.Block,
  helperRegistry?: ReadonlyMap<ts.Symbol, InlinableHelper>,
): BuildCFGResult {
  const state = new CFGBuilderState();
  const inlineBindings: InlineBinding[] = [];
  const entryId = state.newBlockId('entry');

  const statements = Array.from(body.statements);
  processStatements(state, context, statements, entryId, [], { helperRegistry, inlineBindings });

  return {
    cfg: {
      entry: entryId,
      blocks: state.blocks,
      ...(state.deferredCalls.size > 0 && { deferredCalls: state.deferredCalls }),
    },
    inlineBindings,
  };
}

// ---------------------------------------------------------------------------
// Inlining context — threaded through to detect and inline helper calls
// ---------------------------------------------------------------------------

interface InliningContext {
  readonly helperRegistry?: ReadonlyMap<ts.Symbol, InlinableHelper>;
  readonly inlineBindings?: InlineBinding[];
  /** If set, `return` terminators become `fall` to this block (used inside inlined helpers). */
  readonly returnOverride?: string;
  /** Caller's variable name for value-returning helpers (e.g. `const data = await helper()`). */
  readonly returnVarName?: string;
  /** Caller's variable symbol for value-returning helpers. */
  readonly returnVarSymbol?: ts.Symbol;
}

// ---------------------------------------------------------------------------
// Core statement processor
// ---------------------------------------------------------------------------

/**
 * Process a list of statements into basic blocks.
 *
 * Accumulates non-branching statements into the current block. When a
 * branching construct is encountered, finalizes the current block and
 * recursively processes sub-blocks.
 *
 * Returns the ID of the last block in the sequence, or `null` if the
 * sequence always terminates (return/throw in all paths).
 */
function processStatements(
  state: CFGBuilderState,
  context: CompilerContext,
  statements: readonly ts.Statement[],
  currentBlockId: string,
  loopStack: readonly LoopContext[],
  inlining: InliningContext = {},
): string | null {
  const accumulated: ts.Statement[] = [];

  // Pre-scan: detect deferred-await patterns (const x = call(); ... await x)
  const pendingPromises = findPendingPromises(context, statements);

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    const remaining = statements.slice(i + 1);

    // --- Skip pending promise declarations (consumed at the await point) ---
    if (pendingPromises.size > 0 && ts.isVariableStatement(stmt)) {
      const decl = stmt.declarationList.declarations[0];
      if (decl && ts.isIdentifier(decl.name)) {
        const sym = context.checker.getSymbolAtLocation(decl.name);
        if (sym && pendingPromises.has(sym)) {
          // Record in deferredCalls for state builder fallback (single-await case)
          state.deferredCalls.set(sym, pendingPromises.get(sym)!.callExpr);
          continue;
        }
      }
    }

    // --- Return statement ---
    if (ts.isReturnStatement(stmt)) {
      // Inside an inlined helper: return → fall to continuation
      if (inlining.returnOverride) {
        if (stmt.expression) {
          if (inlining.returnVarName && inlining.returnVarSymbol) {
            // Value-returning helper: caller captures the result
            const returnTarget = { name: inlining.returnVarName, symbol: inlining.returnVarSymbol };

            if (ts.isAwaitExpression(stmt.expression)) {
              // return await svc.call(...) → push as fire-and-forget statement,
              // then override ResultPath via returnTargetVar on the block
              const exprStmt = ts.factory.createExpressionStatement(stmt.expression);
              ts.setTextRange(exprStmt, stmt);
              accumulated.push(exprStmt);
              state.addBlock(currentBlockId, accumulated, {
                kind: 'fall',
                target: inlining.returnOverride,
              }, returnTarget);
            } else {
              // return someVar → alias the caller's variable to this expression
              state.addBlock(currentBlockId, accumulated, {
                kind: 'fall',
                target: inlining.returnOverride,
              }, { ...returnTarget, expression: stmt.expression });
            }
          } else if (ts.isAwaitExpression(stmt.expression)) {
            // Void call of value-returning helper: result discarded but side effects preserved
            const exprStmt = ts.factory.createExpressionStatement(stmt.expression);
            ts.setTextRange(exprStmt, stmt);
            accumulated.push(exprStmt);
            state.addBlock(currentBlockId, accumulated, {
              kind: 'fall',
              target: inlining.returnOverride,
            });
          } else {
            // Non-await return value discarded in void call — no effect needed
            state.addBlock(currentBlockId, accumulated, {
              kind: 'fall',
              target: inlining.returnOverride,
            });
          }
        } else {
          // Void return — fall to continuation
          state.addBlock(currentBlockId, accumulated, {
            kind: 'fall',
            target: inlining.returnOverride,
          });
        }
        return null;
      }
      state.addBlock(currentBlockId, accumulated, {
        kind: 'return',
        expression: stmt.expression,
      });
      return null;
    }

    // --- Throw statement ---
    if (ts.isThrowStatement(stmt)) {
      state.addBlock(currentBlockId, accumulated, {
        kind: 'throw',
        expression: stmt.expression,
      });
      return null;
    }

    // --- Break statement ---
    if (ts.isBreakStatement(stmt)) {
      const loop = loopStack[loopStack.length - 1];
      if (!loop) {
        context.addError(stmt, 'break statement outside of loop', ErrorCodes.Cfg.BreakOutsideLoop.code);
        continue;
      }
      state.addBlock(currentBlockId, accumulated, {
        kind: 'break',
        target: loop.exitBlock,
      });
      return null;
    }

    // --- Continue statement ---
    if (ts.isContinueStatement(stmt)) {
      // Skip switch contexts — continue targets the enclosing loop, not the switch
      let loop: LoopContext | undefined;
      for (let i = loopStack.length - 1; i >= 0; i--) {
        if (!loopStack[i].isSwitch) { loop = loopStack[i]; break; }
      }
      if (!loop) {
        context.addError(stmt, 'continue statement outside of loop', ErrorCodes.Cfg.ContinueOutsideLoop.code);
        continue;
      }
      state.addBlock(currentBlockId, accumulated, {
        kind: 'continue',
        target: loop.conditionBlock,
      });
      return null;
    }

    // --- If/else ---
    if (ts.isIfStatement(stmt)) {
      const result = processIfStatement(
        state, context, stmt, accumulated, currentBlockId, remaining, loopStack, inlining,
      );
      return result;
    }

    // --- While loop ---
    if (ts.isWhileStatement(stmt)) {
      const afterLoop = processWhileStatement(
        state, context, stmt, accumulated, currentBlockId, loopStack, inlining,
      );
      if (afterLoop === null) return null;
      // Continue processing remaining statements in the exit block
      if (remaining.length > 0) {
        return processStatements(state, context, remaining, afterLoop, loopStack, inlining);
      }
      return afterLoop;
    }

    // --- Do-while loop ---
    if (ts.isDoStatement(stmt)) {
      const afterLoop = processDoWhileStatement(
        state, context, stmt, accumulated, currentBlockId, loopStack, inlining,
      );
      if (afterLoop === null) return null;
      if (remaining.length > 0) {
        return processStatements(state, context, remaining, afterLoop, loopStack, inlining);
      }
      return afterLoop;
    }

    // --- For(;;) loop ---
    if (ts.isForStatement(stmt)) {
      const afterLoop = processForStatement(
        state, context, stmt, accumulated, currentBlockId, loopStack, inlining,
      );
      if (afterLoop === null) return null;
      if (remaining.length > 0) {
        return processStatements(state, context, remaining, afterLoop, loopStack, inlining);
      }
      return afterLoop;
    }

    // --- For...of loop (map state) ---
    if (ts.isForOfStatement(stmt)) {
      const afterLoop = processForOfStatement(
        state, context, stmt, accumulated, currentBlockId, loopStack, inlining,
      );
      if (afterLoop === null) return null;
      if (remaining.length > 0) {
        return processStatements(state, context, remaining, afterLoop, loopStack, inlining);
      }
      return afterLoop;
    }

    // --- Try/catch/finally ---
    if (ts.isTryStatement(stmt)) {
      const afterTry = processTryStatement(
        state, context, stmt, accumulated, currentBlockId, remaining, loopStack, inlining,
      );
      return afterTry;
    }

    // --- Switch/case ---
    if (ts.isSwitchStatement(stmt)) {
      const afterSwitch = processSwitchStatement(
        state, context, stmt, accumulated, currentBlockId, remaining, loopStack, inlining,
      );
      return afterSwitch;
    }

    // --- Steps.map() → Map state with options ---
    {
      const stepsMapResult = tryExtractStepsMap(state, context, stmt, accumulated, currentBlockId, remaining, loopStack, inlining);
      if (stepsMapResult !== undefined) {
        return stepsMapResult;
      }
    }

    // --- Steps.distributedMap() → Distributed Map state ---
    {
      const distMapResult = tryExtractStepsDistributedMap(state, context, stmt, accumulated, currentBlockId, remaining, loopStack, inlining);
      if (distMapResult !== undefined) {
        return distMapResult;
      }
    }

    // --- Steps.parallel() → Parallel state with options (retry) ---
    {
      const stepsParallelResult = tryExtractStepsParallel(state, context, stmt, accumulated, currentBlockId, remaining, loopStack, inlining);
      if (stepsParallelResult !== undefined) {
        return stepsParallelResult;
      }
    }

    // --- Deferred-await batch → Parallel state ---
    if (pendingPromises.size > 0) {
      const batchResult = tryBatchDeferredAwaits(
        state, context, statements, i, accumulated, currentBlockId, loopStack, inlining, pendingPromises,
      );
      if (batchResult) {
        const { exitBlockId, advanceTo } = batchResult;
        const afterBatch = statements.slice(advanceTo);
        if (afterBatch.length > 0) {
          return processStatements(state, context, afterBatch, exitBlockId, loopStack, inlining);
        }
        return exitBlockId;
      }
    }

    // --- Promise.race / Promise.any → compile-time error ---
    if (ts.isExpressionStatement(stmt) && ts.isAwaitExpression(stmt.expression) &&
        isPromiseRaceOrAny(stmt.expression.expression)) {
      context.addError(
        stmt.expression.expression,
        `Promise.race() and Promise.any() are not supported. ASL Parallel states wait for all branches to complete. ` +
        `Use Promise.all() instead, or delegate race logic to a Lambda function.`,
        ErrorCodes.Cfg.PromiseRaceNotSupported.code,
      );
    }

    // --- Promise.all (fire-and-forget, ExpressionStatement) → Parallel state ---
    if (ts.isExpressionStatement(stmt) && ts.isAwaitExpression(stmt.expression)) {
      const promiseAll = extractPromiseAllFromAwait(context, stmt.expression, pendingPromises);
      if (promiseAll) {
        const exitBlockId = state.newBlockId('parallel_exit');
        const classifiedBranches = classifyParallelBranches(
          state, context, promiseAll.branches, loopStack, inlining,
        );
        state.addBlock(currentBlockId, accumulated, {
          kind: 'parallel',
          branches: classifiedBranches,
          resultBindings: [],
          resultSymbols: [],
          exitBlock: exitBlockId,
        });
        if (remaining.length > 0) {
          return processStatements(state, context, remaining, exitBlockId, loopStack, inlining);
        }
        return exitBlockId;
      }
    }

    // --- Promise.race / Promise.any (variable statement) → compile-time error ---
    if (ts.isVariableStatement(stmt)) {
      const decl = stmt.declarationList.declarations[0];
      if (decl?.initializer && ts.isAwaitExpression(decl.initializer) &&
          ts.isCallExpression(decl.initializer.expression) &&
          isPromiseRaceOrAny(decl.initializer.expression)) {
        context.addError(
          decl.initializer.expression,
          `Promise.race() and Promise.any() are not supported. ASL Parallel states wait for all branches to complete. ` +
          `Use Promise.all() instead, or delegate race logic to a Lambda function.`,
          ErrorCodes.Cfg.PromiseRaceNotSupported.code,
        );
      }
    }

    // --- Promise.all (with destructuring, VariableStatement) → Parallel state ---
    if (ts.isVariableStatement(stmt)) {
      const promiseAll = extractPromiseAll(context, stmt);
      if (promiseAll) {
        const exitBlockId = state.newBlockId('parallel_exit');

        // Resolve deferred promise references in branches
        const resolvedBranches = pendingPromises.size > 0
          ? promiseAll.branches.map(branch => {
              if (ts.isIdentifier(branch)) {
                const sym = context.checker.getSymbolAtLocation(branch);
                if (sym && pendingPromises.has(sym)) return pendingPromises.get(sym)!.callExpr;
              }
              return branch;
            })
          : promiseAll.branches;

        // Classify each branch: direct expression or substep
        const classifiedBranches = classifyParallelBranches(
          state, context, resolvedBranches, loopStack, inlining,
        );

        state.addBlock(currentBlockId, accumulated, {
          kind: 'parallel',
          branches: classifiedBranches,
          resultBindings: promiseAll.resultBindings,
          resultSymbols: promiseAll.resultSymbols,
          exitBlock: exitBlockId,
        });

        if (remaining.length > 0) {
          return processStatements(state, context, remaining, exitBlockId, loopStack, inlining);
        }
        return exitBlockId;
      }
    }

    // --- Async helper function call (inlining) ---
    if (inlining.helperRegistry) {
      const helperResult = tryInlineHelperCall(
        state, context, stmt, accumulated, currentBlockId, remaining, loopStack, inlining,
      );
      if (helperResult !== undefined) {
        return helperResult;
      }
    }

    // --- Ternary variable declaration → Choice + Pass desugaring ---
    if (ts.isVariableStatement(stmt)) {
      const decls = stmt.declarationList.declarations;
      if (decls.length === 1 && decls[0].initializer &&
          ts.isConditionalExpression(decls[0].initializer) &&
          ts.isIdentifier(decls[0].name)) {
        const decl = decls[0];
        const ternary = decl.initializer as ts.ConditionalExpression;
        const varSym = context.checker.getSymbolAtLocation(decl.name);
        if (varSym) {
          const continuationId = state.newBlockId('after_ternary');
          state.addBlock(currentBlockId, accumulated, {
            kind: 'ternaryAssign',
            condition: ternary.condition,
            variableName: (decl.name as ts.Identifier).text,
            variableSymbol: varSym,
            thenExpression: ternary.whenTrue,
            elseExpression: ternary.whenFalse,
            continuation: continuationId,
          });
          if (remaining.length > 0) {
            return processStatements(state, context, remaining, continuationId, loopStack, inlining);
          }
          return continuationId;
        }
      }
    }

    // --- Sequential: accumulate non-branching statements ---
    accumulated.push(stmt);
  }

  // End of statements — finalize block with a fall-through to a terminal block
  // Inside an inlined helper: fall to the continuation block instead of implicit return
  if (inlining.returnOverride) {
    if (accumulated.length > 0) {
      const bridgeId = state.newBlockId('inline_exit');
      state.addBlock(currentBlockId, accumulated, { kind: 'fall', target: bridgeId });
      state.addBlock(bridgeId, [], { kind: 'fall', target: inlining.returnOverride });
      return bridgeId;
    }
    state.addBlock(currentBlockId, accumulated, { kind: 'fall', target: inlining.returnOverride });
    return currentBlockId;
  }

  // If there are no remaining statements, this is an implicit return
  const exitId = state.newBlockId('exit');
  state.addBlock(currentBlockId, accumulated, {
    kind: 'fall',
    target: exitId,
  });
  state.addBlock(exitId, [], { kind: 'return', expression: undefined });
  return exitId;
}

// ---------------------------------------------------------------------------
// If/else
// ---------------------------------------------------------------------------

function processIfStatement(
  state: CFGBuilderState,
  context: CompilerContext,
  stmt: ts.IfStatement,
  accumulated: readonly ts.Statement[],
  currentBlockId: string,
  remaining: readonly ts.Statement[],
  loopStack: readonly LoopContext[],
  inlining: InliningContext = {},
): string | null {
  const thenBlockId = state.newBlockId('then');
  const elseBlockId = state.newBlockId('else');

  // Finalize current block with branch terminator
  state.addBlock(currentBlockId, accumulated, {
    kind: 'branch',
    condition: stmt.expression,
    thenBlock: thenBlockId,
    elseBlock: elseBlockId,
  });

  // Process then branch
  const thenBody = getBlockStatements(stmt.thenStatement);
  const thenExit = processStatements(state, context, thenBody, thenBlockId, loopStack, inlining);

  // Process else branch
  let elseExit: string | null;
  if (stmt.elseStatement) {
    const elseBody = getBlockStatements(stmt.elseStatement);
    elseExit = processStatements(state, context, elseBody, elseBlockId, loopStack, inlining);
  } else {
    // No else: the else block is empty and falls through to merge
    elseExit = elseBlockId;
    // Will be finalized below when creating merge block
  }

  // If both branches terminate, no merge block needed
  if (thenExit === null && elseExit === null) {
    // No else body was provided but thenExit is null — need to finalize empty else
    if (!stmt.elseStatement) {
      const mergeId = state.newBlockId('merge');
      state.addBlock(elseBlockId, [], { kind: 'fall', target: mergeId });
      if (remaining.length > 0) {
        return processStatements(state, context, remaining, mergeId, loopStack, inlining);
      }
      state.addBlock(mergeId, [], { kind: 'return', expression: undefined });
      return mergeId;
    }
    return null;
  }

  // Create merge block for remaining statements
  const mergeId = state.newBlockId('merge');

  // Wire non-null exits to merge
  if (thenExit !== null) {
    patchBlockTerminator(state, thenExit, { kind: 'fall', target: mergeId });
  }

  if (elseExit !== null) {
    if (!stmt.elseStatement) {
      // Empty else — add block with fall to merge
      state.addBlock(elseBlockId, [], { kind: 'fall', target: mergeId });
    } else {
      patchBlockTerminator(state, elseExit, { kind: 'fall', target: mergeId });
    }
  }

  // Process remaining statements in merge block
  if (remaining.length > 0) {
    return processStatements(state, context, remaining, mergeId, loopStack, inlining);
  }

  // No remaining — merge falls through to implicit return
  state.addBlock(mergeId, [], { kind: 'return', expression: undefined });
  return mergeId;
}

// ---------------------------------------------------------------------------
// While loop
// ---------------------------------------------------------------------------

function processWhileStatement(
  state: CFGBuilderState,
  context: CompilerContext,
  stmt: ts.WhileStatement,
  accumulated: readonly ts.Statement[],
  currentBlockId: string,
  loopStack: readonly LoopContext[],
  inlining: InliningContext = {},
): string | null {
  const condBlockId = state.newBlockId('while_cond');
  const bodyBlockId = state.newBlockId('while_body');
  const exitBlockId = state.newBlockId('while_exit');

  // Finalize current block → fall to condition
  state.addBlock(currentBlockId, accumulated, {
    kind: 'fall',
    target: condBlockId,
  });

  // Condition block → loop terminator
  state.addBlock(condBlockId, [], {
    kind: 'loop',
    condition: stmt.expression,
    bodyBlock: bodyBlockId,
    exitBlock: exitBlockId,
  });

  // Process body with loop context for break/continue
  const loopCtx: LoopContext = { conditionBlock: condBlockId, exitBlock: exitBlockId };
  const bodyStatements = getBlockStatements(stmt.statement);
  const bodyExit = processStatements(
    state, context, bodyStatements, bodyBlockId, [...loopStack, loopCtx], inlining,
  );

  // Body exit loops back to condition
  if (bodyExit !== null) {
    patchBlockTerminator(state, bodyExit, { kind: 'loopBack', target: condBlockId });
  }

  return exitBlockId;
}

// ---------------------------------------------------------------------------
// Do-while loop
// ---------------------------------------------------------------------------

function processDoWhileStatement(
  state: CFGBuilderState,
  context: CompilerContext,
  stmt: ts.DoStatement,
  accumulated: readonly ts.Statement[],
  currentBlockId: string,
  loopStack: readonly LoopContext[],
  inlining: InliningContext = {},
): string | null {
  const bodyBlockId = state.newBlockId('do_body');
  const condBlockId = state.newBlockId('do_cond');
  const exitBlockId = state.newBlockId('do_exit');

  // Finalize current block → fall to body
  state.addBlock(currentBlockId, accumulated, {
    kind: 'fall',
    target: bodyBlockId,
  });

  // Process body with loop context
  const loopCtx: LoopContext = { conditionBlock: condBlockId, exitBlock: exitBlockId };
  const bodyStatements = getBlockStatements(stmt.statement);
  const bodyExit = processStatements(
    state, context, bodyStatements, bodyBlockId, [...loopStack, loopCtx], inlining,
  );

  // Body exit falls to condition check
  if (bodyExit !== null) {
    patchBlockTerminator(state, bodyExit, { kind: 'fall', target: condBlockId });
  }

  // Condition block: branch back to body or exit
  state.addBlock(condBlockId, [], {
    kind: 'branch',
    condition: stmt.expression,
    thenBlock: bodyBlockId,
    elseBlock: exitBlockId,
  });

  return exitBlockId;
}

// ---------------------------------------------------------------------------
// For(;;) loop
// ---------------------------------------------------------------------------

function processForStatement(
  state: CFGBuilderState,
  context: CompilerContext,
  stmt: ts.ForStatement,
  accumulated: readonly ts.Statement[],
  currentBlockId: string,
  loopStack: readonly LoopContext[],
  inlining: InliningContext = {},
): string | null {
  // Process initializer as part of the pre-loop block
  const initStatements: ts.Statement[] = [...accumulated];
  if (stmt.initializer) {
    if (ts.isVariableDeclarationList(stmt.initializer)) {
      // Wrap in a variable statement for consistent handling
      initStatements.push(
        ts.factory.createVariableStatement(undefined, stmt.initializer),
      );
    } else {
      initStatements.push(
        ts.factory.createExpressionStatement(stmt.initializer),
      );
    }
  }

  const condBlockId = state.newBlockId('for_cond');
  const bodyBlockId = state.newBlockId('for_body');
  const updateBlockId = state.newBlockId('for_update');
  const exitBlockId = state.newBlockId('for_exit');

  // Finalize current block with init → fall to condition
  state.addBlock(currentBlockId, initStatements, {
    kind: 'fall',
    target: condBlockId,
  });

  // Condition block
  if (stmt.condition) {
    state.addBlock(condBlockId, [], {
      kind: 'loop',
      condition: stmt.condition,
      bodyBlock: bodyBlockId,
      exitBlock: exitBlockId,
    });
  } else {
    // No condition = infinite loop (condition always true)
    state.addBlock(condBlockId, [], {
      kind: 'fall',
      target: bodyBlockId,
    });
  }

  // Process body — continue targets the update block, not the condition
  const loopCtx: LoopContext = { conditionBlock: updateBlockId, exitBlock: exitBlockId };
  const bodyStatements = getBlockStatements(stmt.statement);
  const bodyExit = processStatements(
    state, context, bodyStatements, bodyBlockId, [...loopStack, loopCtx], inlining,
  );

  // Body exit → update block
  if (bodyExit !== null) {
    patchBlockTerminator(state, bodyExit, { kind: 'fall', target: updateBlockId });
  }

  // Update block → loop back to condition
  const updateStatements: ts.Statement[] = [];
  if (stmt.incrementor) {
    updateStatements.push(
      ts.factory.createExpressionStatement(stmt.incrementor),
    );
  }
  state.addBlock(updateBlockId, updateStatements, {
    kind: 'loopBack',
    target: condBlockId,
  });

  return exitBlockId;
}

// ---------------------------------------------------------------------------
// For...of loop (map state)
// ---------------------------------------------------------------------------

function processForOfStatement(
  state: CFGBuilderState,
  context: CompilerContext,
  stmt: ts.ForOfStatement,
  accumulated: readonly ts.Statement[],
  currentBlockId: string,
  loopStack: readonly LoopContext[],
  inlining: InliningContext = {},
): string | null {
  const bodyBlockId = state.newBlockId('forof_body');
  const exitBlockId = state.newBlockId('forof_exit');

  // Detect if results are collected (const results = [...]; for of; results.push)
  // For now, set collectResults = false — full detection is a Stage 6 concern
  const collectResults = false;

  // Extract iteration variable name and symbol
  let iterVarName = 'item';
  let iterVarSymbol: ts.Symbol | undefined;
  if (ts.isVariableDeclarationList(stmt.initializer)) {
    const decl = stmt.initializer.declarations[0];
    if (decl && ts.isIdentifier(decl.name)) {
      iterVarName = decl.name.text;
      iterVarSymbol = context.checker.getSymbolAtLocation(decl.name);
    }
  }

  // Detect Steps.sequential() / Steps.items() wrappers and unwrap to the real items expression
  let itemsExpression: ts.Expression = stmt.expression;
  let maxConcurrency: number | undefined;
  let retryExpression: ts.Expression | undefined;

  if (ts.isCallExpression(stmt.expression)) {
    if (isStepsCall(stmt.expression, 'sequential')) {
      itemsExpression = stmt.expression.arguments[0];
      maxConcurrency = 1;
    } else if (isStepsCall(stmt.expression, 'items')) {
      itemsExpression = stmt.expression.arguments[0];
      const optionsArg = stmt.expression.arguments[1];
      if (optionsArg && ts.isObjectLiteralExpression(optionsArg)) {
        for (const prop of optionsArg.properties) {
          if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) continue;
          if (prop.name.text === 'maxConcurrency' && ts.isNumericLiteral(prop.initializer)) {
            maxConcurrency = Number(prop.initializer.text);
          } else if (prop.name.text === 'retry') {
            retryExpression = prop.initializer;
          }
        }
      }
    }
  }

  // Finalize current block with mapState terminator
  state.addBlock(currentBlockId, accumulated, {
    kind: 'mapState',
    expression: stmt,
    itemsExpression,
    iterVarName,
    iterVarSymbol,
    bodyBlock: bodyBlockId,
    exitBlock: exitBlockId,
    collectResults,
    ...(maxConcurrency != null && { maxConcurrency }),
    ...(retryExpression && { retryExpression }),
  });

  // Process body — break/continue targets loop exit/body start
  const loopCtx: LoopContext = { conditionBlock: bodyBlockId, exitBlock: exitBlockId };
  const bodyStatements = getBlockStatements(stmt.statement);
  const bodyExit = processStatements(
    state, context, bodyStatements, bodyBlockId, [...loopStack, loopCtx], inlining,
  );

  // Body exit: implicit end of iteration
  if (bodyExit !== null) {
    // The body's exit doesn't loop back — each iteration is independent in Map state
    patchBlockTerminator(state, bodyExit, { kind: 'return', expression: undefined });
  }

  return exitBlockId;
}

// ---------------------------------------------------------------------------
// Try/catch/finally
// ---------------------------------------------------------------------------

function processTryStatement(
  state: CFGBuilderState,
  context: CompilerContext,
  stmt: ts.TryStatement,
  accumulated: readonly ts.Statement[],
  currentBlockId: string,
  remaining: readonly ts.Statement[],
  loopStack: readonly LoopContext[],
  inlining: InliningContext = {},
): string | null {
  const tryBlockId = state.newBlockId('try');
  const finallyBlockId = stmt.finallyBlock ? state.newBlockId('finally') : undefined;
  const mergeId = state.newBlockId('try_merge');

  // Extract catch parameter name
  let catchParam: string | undefined;
  if (stmt.catchClause?.variableDeclaration?.name && ts.isIdentifier(stmt.catchClause.variableDeclaration.name)) {
    catchParam = stmt.catchClause.variableDeclaration.name.text;
  }

  // Analyze catch block for instanceof chains
  const targetAfterCatch = finallyBlockId ?? mergeId;
  let errorHandlers: { errorClassName: string; blockId: string }[] = [];
  let catchFallback: string | undefined;
  let catchExit: string | null = null;

  if (stmt.catchClause) {
    const catchStatements = Array.from(stmt.catchClause.block.statements);
    const instanceofChain = catchParam
      ? extractInstanceofChain(catchStatements, catchParam)
      : null;

    if (instanceofChain && instanceofChain.handlers.length > 0) {
      // Process each instanceof handler as a separate CFG block
      for (const handler of instanceofChain.handlers) {
        const handlerBlockId = state.newBlockId(`catch_${handler.className}`);
        const handlerExit = processStatements(
          state, context, handler.statements, handlerBlockId, loopStack, inlining,
        );
        if (handlerExit !== null) {
          patchBlockTerminator(state, handlerExit, { kind: 'fall', target: targetAfterCatch });
        }
        errorHandlers.push({ errorClassName: handler.className, blockId: handlerBlockId });
      }

      // Process fallback (else block or remaining statements)
      if (instanceofChain.fallbackStatements.length > 0) {
        const fallbackBlockId = state.newBlockId('catch_fallback');
        const fallbackExit = processStatements(
          state, context, instanceofChain.fallbackStatements, fallbackBlockId, loopStack, inlining,
        );
        if (fallbackExit !== null) {
          patchBlockTerminator(state, fallbackExit, { kind: 'fall', target: targetAfterCatch });
        }
        catchFallback = fallbackBlockId;
        catchExit = fallbackExit;
      }
    } else {
      // No instanceof pattern — whole catch block is a States.ALL fallback
      const catchBlockId = state.newBlockId('catch');
      catchExit = processStatements(state, context, catchStatements, catchBlockId, loopStack, inlining);
      if (catchExit !== null) {
        patchBlockTerminator(state, catchExit, { kind: 'fall', target: targetAfterCatch });
      }
      catchFallback = catchBlockId;
    }
  }

  // Finalize current block with tryCatch terminator
  state.addBlock(currentBlockId, accumulated, {
    kind: 'tryCatch',
    tryBlock: tryBlockId,
    catchParam,
    errorHandlers,
    catchFallback,
    finallyBlock: finallyBlockId,
    mergeBlock: mergeId,
  });

  // Process try block
  const tryStatements = Array.from(stmt.tryBlock.statements);
  const tryExit = processStatements(state, context, tryStatements, tryBlockId, loopStack, inlining);

  // Wire try exit to merge (or finally)
  const targetAfterTry = finallyBlockId ?? mergeId;
  if (tryExit !== null) {
    patchBlockTerminator(state, tryExit, { kind: 'fall', target: targetAfterTry });
  }

  // Process finally block
  if (finallyBlockId && stmt.finallyBlock) {
    const finallyStatements = Array.from(stmt.finallyBlock.statements);
    const finallyExit = processStatements(
      state, context, finallyStatements, finallyBlockId, loopStack, inlining,
    );

    if (finallyExit !== null) {
      patchBlockTerminator(state, finallyExit, { kind: 'fall', target: mergeId });
    }
  }

  // Process remaining statements in merge block
  if (remaining.length > 0) {
    return processStatements(state, context, remaining, mergeId, loopStack, inlining);
  }

  // Always create merge block so the CFG is structurally complete
  state.addBlock(mergeId, [], { kind: 'return', expression: undefined });

  // If both try and catch terminate and there's no finally, merge is unreachable
  if (tryExit === null && catchExit === null && !stmt.finallyBlock) {
    return null;
  }

  return mergeId;
}

// ---------------------------------------------------------------------------
// instanceof chain extraction
// ---------------------------------------------------------------------------

interface InstanceofHandler {
  readonly className: string;
  readonly statements: ts.Statement[];
}

interface InstanceofChainResult {
  readonly handlers: InstanceofHandler[];
  readonly fallbackStatements: ts.Statement[];
}

/**
 * Analyze catch block statements for an instanceof chain pattern:
 *   if (e instanceof FooError) { ... }
 *   else if (e instanceof BarError) { ... }
 *   else { ... }
 *
 * Returns null if the first statement is not an instanceof if-chain.
 */
function extractInstanceofChain(
  statements: readonly ts.Statement[],
  catchParamName: string,
): InstanceofChainResult | null {
  if (statements.length === 0) return null;

  const firstStmt = statements[0];
  if (!ts.isIfStatement(firstStmt)) return null;

  // Check that the condition is `catchParam instanceof ClassName`
  if (!isInstanceofCheck(firstStmt.expression, catchParamName)) return null;

  const handlers: InstanceofHandler[] = [];
  let fallbackStatements: ts.Statement[] = [];

  // Track which top-level statement index we've consumed
  let stmtIndex = 0;

  let current: ts.IfStatement | undefined = firstStmt;
  while (current) {
    const className = extractInstanceofClassName(current.expression, catchParamName);
    if (!className) break;

    const body = getBlockStatements(current.thenStatement);
    handlers.push({ className, statements: Array.from(body) });

    if (current.elseStatement) {
      if (ts.isIfStatement(current.elseStatement)) {
        // else if — continue the chain
        if (isInstanceofCheck(current.elseStatement.expression, catchParamName)) {
          current = current.elseStatement;
        } else {
          // else if with non-instanceof condition — treat as fallback
          fallbackStatements = [current.elseStatement];
          current = undefined;
        }
      } else {
        // else block — this is the fallback
        fallbackStatements = Array.from(getBlockStatements(current.elseStatement));
        current = undefined;
      }
    } else {
      // No else — check if the NEXT statement is also an instanceof check
      // This handles: if (e instanceof A) { ... } if (e instanceof B) { ... }
      current = undefined;
      stmtIndex++;
      while (stmtIndex < statements.length) {
        const nextStmt = statements[stmtIndex];
        if (ts.isIfStatement(nextStmt) && isInstanceofCheck(nextStmt.expression, catchParamName)) {
          current = nextStmt;
          break;
        } else {
          // Non-instanceof statement — stop scanning
          break;
        }
      }
    }
  }

  // Include any remaining statements after the consumed if-chain as part of the fallback
  const remainingStart = stmtIndex + 1;
  if (remainingStart < statements.length) {
    fallbackStatements = [...fallbackStatements, ...statements.slice(remainingStart)];
  }

  return handlers.length > 0 ? { handlers, fallbackStatements } : null;
}

/**
 * Check if an expression is `paramName instanceof ClassName`.
 */
function isInstanceofCheck(expr: ts.Expression, paramName: string): boolean {
  if (!ts.isBinaryExpression(expr)) return false;
  if (expr.operatorToken.kind !== ts.SyntaxKind.InstanceOfKeyword) return false;
  if (!ts.isIdentifier(expr.left) || expr.left.text !== paramName) return false;
  if (!ts.isIdentifier(expr.right)) return false;
  return true;
}

/**
 * Extract the class name from `paramName instanceof ClassName`.
 */
function extractInstanceofClassName(expr: ts.Expression, paramName: string): string | null {
  if (!isInstanceofCheck(expr, paramName)) return null;
  return (expr as ts.BinaryExpression).right.getText();
}

// ---------------------------------------------------------------------------
// Switch/case (desugared to chained if-else branches)
// ---------------------------------------------------------------------------

function processSwitchStatement(
  state: CFGBuilderState,
  context: CompilerContext,
  stmt: ts.SwitchStatement,
  accumulated: readonly ts.Statement[],
  currentBlockId: string,
  remaining: readonly ts.Statement[],
  loopStack: readonly LoopContext[],
  inlining: InliningContext = {},
): string | null {
  const mergeId = state.newBlockId('switch_merge');
  const discriminant = stmt.expression;
  const clauses = Array.from(stmt.caseBlock.clauses);

  // Validate: no fall-through (each non-empty case must end with break/return/throw/continue)
  for (const clause of clauses) {
    if (clause.statements.length === 0) continue;
    const lastStmt = clause.statements[clause.statements.length - 1];
    if (!ts.isBreakStatement(lastStmt) && !ts.isReturnStatement(lastStmt) && !ts.isThrowStatement(lastStmt) && !ts.isContinueStatement(lastStmt)) {
      // Check if the last statement is a block ending with break/return/throw/continue
      if (ts.isBlock(lastStmt)) {
        const blockLast = lastStmt.statements[lastStmt.statements.length - 1];
        if (blockLast && (ts.isBreakStatement(blockLast) || ts.isReturnStatement(blockLast) || ts.isThrowStatement(blockLast) || ts.isContinueStatement(blockLast))) {
          continue;
        }
      }
      context.addError(clause, 'Switch case fall-through is not supported; each case must end with break, return, or throw', ErrorCodes.Cfg.SwitchFallThrough.code);
    }
  }

  // Separate cases and default
  const caseClauses: ts.CaseClause[] = [];
  let defaultClause: ts.DefaultClause | undefined;
  for (const clause of clauses) {
    if (ts.isCaseClause(clause)) {
      caseClauses.push(clause);
    } else {
      defaultClause = clause;
    }
  }

  // Create a switch "loop context" so break exits to mergeId
  const switchCtx: LoopContext = { conditionBlock: mergeId, exitBlock: mergeId, isSwitch: true };
  const switchLoopStack = [...loopStack, switchCtx];

  // Process default body
  let defaultBlockId: string;
  if (defaultClause && defaultClause.statements.length > 0) {
    defaultBlockId = state.newBlockId('switch_default');
    const defaultBody = filterBreaks(Array.from(defaultClause.statements));
    const defaultExit = processStatements(state, context, defaultBody, defaultBlockId, switchLoopStack, inlining);
    if (defaultExit !== null) {
      patchBlockTerminator(state, defaultExit, { kind: 'fall', target: mergeId });
    }
  } else {
    // No default clause → fall through to merge
    defaultBlockId = state.newBlockId('switch_default');
    state.addBlock(defaultBlockId, [], { kind: 'fall', target: mergeId });
  }

  // Build chained branches in reverse order
  // Last case's else → default
  let currentElseBlock = defaultBlockId;

  for (let i = caseClauses.length - 1; i >= 0; i--) {
    const clause = caseClauses[i];

    // Create the body block for this case
    const caseBodyId = state.newBlockId(`switch_case_${i}`);
    const caseBody = filterBreaks(Array.from(clause.statements));
    const caseExit = processStatements(state, context, caseBody, caseBodyId, switchLoopStack, inlining);
    if (caseExit !== null) {
      patchBlockTerminator(state, caseExit, { kind: 'fall', target: mergeId });
    }

    // Create a condition block with branch terminator: discriminant === caseValue
    const condBlockId = state.newBlockId(`switch_cond_${i}`);
    const syntheticCondition = ts.factory.createBinaryExpression(
      discriminant,
      ts.factory.createToken(ts.SyntaxKind.EqualsEqualsEqualsToken),
      clause.expression,
    );

    state.addBlock(condBlockId, [], {
      kind: 'branch',
      condition: syntheticCondition,
      thenBlock: caseBodyId,
      elseBlock: currentElseBlock,
    });

    currentElseBlock = condBlockId;
  }

  // Finalize the current (pre-switch) block → fall to the first condition
  state.addBlock(currentBlockId, accumulated, {
    kind: 'fall',
    target: currentElseBlock,
  });

  // Process remaining statements in the merge block
  if (remaining.length > 0) {
    return processStatements(state, context, remaining, mergeId, loopStack, inlining);
  }

  state.addBlock(mergeId, [], { kind: 'return', expression: undefined });
  return mergeId;
}

/**
 * Remove trailing break statements from case body (they're handled structurally).
 */
function filterBreaks(stmts: ts.Statement[]): ts.Statement[] {
  if (stmts.length > 0 && ts.isBreakStatement(stmts[stmts.length - 1])) {
    return stmts.slice(0, -1);
  }
  return stmts;
}

// ---------------------------------------------------------------------------
// Helper function inlining
// ---------------------------------------------------------------------------

/**
 * Detect and inline an awaited helper function call.
 *
 * Matches patterns:
 *   await helperFunc(arg1, arg2);                   // void call
 *   const x = await helperFunc(arg1, arg2);         // value-returning call
 *
 * Returns:
 *   - string | null if the statement was inlined (the exit block ID or null)
 *   - undefined if this statement is not a helper call (caller should continue)
 */
function tryInlineHelperCall(
  state: CFGBuilderState,
  context: CompilerContext,
  stmt: ts.Statement,
  accumulated: ts.Statement[],
  currentBlockId: string,
  remaining: readonly ts.Statement[],
  loopStack: readonly LoopContext[],
  inlining: InliningContext,
): string | null | undefined {
  const { helperRegistry, inlineBindings } = inlining;
  if (!helperRegistry || !inlineBindings) return undefined;

  // Match: await helperFunc(arg1, arg2)              — void call
  //   or:  const x = await helperFunc(arg1, arg2)  — value-returning call
  let callExpr: ts.CallExpression | undefined;
  let resultVarName: string | undefined;
  let resultVarSymbol: ts.Symbol | undefined;

  // Pattern 1: await helperFunc(arg1, arg2) — void
  if (ts.isExpressionStatement(stmt) && ts.isAwaitExpression(stmt.expression)) {
    const awaited = stmt.expression.expression;
    if (ts.isCallExpression(awaited)) {
      callExpr = awaited;
    }
  }

  // Pattern 2: const x = await helperFunc(arg1, arg2) — value-returning
  if (!callExpr && ts.isVariableStatement(stmt)) {
    const decls = stmt.declarationList.declarations;
    if (decls.length === 1) {
      const decl = decls[0];
      if (ts.isIdentifier(decl.name) && decl.initializer && ts.isAwaitExpression(decl.initializer)) {
        const awaited = decl.initializer.expression;
        if (ts.isCallExpression(awaited)) {
          callExpr = awaited;
          resultVarName = decl.name.text;
          resultVarSymbol = context.checker.getSymbolAtLocation(decl.name);
        }
      }
    }
  }

  if (!callExpr) return undefined;

  // Resolve the called function's symbol
  const calleeSym = context.checker.getSymbolAtLocation(callExpr.expression);
  if (!calleeSym) return undefined;

  // Check if this symbol is in the helper registry
  // Follow aliases for imports
  const resolvedSym = (calleeSym.flags & ts.SymbolFlags.Alias)
    ? context.checker.getAliasedSymbol(calleeSym)
    : calleeSym;
  const helper = helperRegistry.get(resolvedSym);
  if (!helper) return undefined;

  // Validate argument count (allow fewer args when trailing params have defaults)
  const requiredCount = helper.parameters.filter(p => !p.initializer).length;
  if (callExpr.arguments.length > helper.parameters.length ||
      callExpr.arguments.length < requiredCount) {
    context.addError(
      callExpr,
      `Substep '${helper.symbol.getName()}' expects ${requiredCount === helper.parameters.length ? String(helper.parameters.length) : `${requiredCount}-${helper.parameters.length}`} arguments but got ${callExpr.arguments.length}`,
      ErrorCodes.Inlining.UninlinableFunction.code,
    );
    return undefined;
  }

  // Record parameter-to-argument bindings for the variable resolver
  for (let p = 0; p < helper.parameters.length; p++) {
    const param = helper.parameters[p];
    // Use call-site argument if provided, otherwise fall back to default value
    const argExpr = p < callExpr.arguments.length
      ? callExpr.arguments[p]
      : param.initializer!; // guaranteed present by requiredCount check

    if (ts.isIdentifier(param.name)) {
      // Simple identifier parameter — one binding
      const paramSym = context.checker.getSymbolAtLocation(param.name);
      if (paramSym) {
        inlineBindings.push({ paramSymbol: paramSym, argExpression: argExpr });
      }
    } else if (ts.isObjectBindingPattern(param.name)) {
      // Destructured parameter — one binding per element.
      // If the argument is an object literal, extract property values directly.
      // Otherwise, create synthetic property access expressions (for variable args).
      for (const element of param.name.elements) {
        const elemSym = context.checker.getSymbolAtLocation(element.name);
        if (!elemSym) continue;
        // Property name: explicit rename ({ userId: id }) or same as binding name
        const propName = element.propertyName
          ? (element.propertyName as ts.Identifier).text
          : (element.name as ts.Identifier).text;

        let bindingExpr: ts.Expression | undefined;

        // Try to extract directly from object literal argument
        if (ts.isObjectLiteralExpression(argExpr)) {
          const prop = argExpr.properties.find(p => {
            if (ts.isPropertyAssignment(p) && ts.isIdentifier(p.name)) return p.name.text === propName;
            if (ts.isShorthandPropertyAssignment(p)) return p.name.text === propName;
            return false;
          });
          if (prop) {
            bindingExpr = ts.isPropertyAssignment(prop)
              ? prop.initializer
              : (prop as ts.ShorthandPropertyAssignment).name;
          }
        }

        // Fallback: synthetic property access (for variable/identifier args)
        if (!bindingExpr) {
          bindingExpr = ts.factory.createPropertyAccessExpression(argExpr, propName);
        }

        inlineBindings.push({ paramSymbol: elemSym, argExpression: bindingExpr });
      }
    }
  }

  // Finalize the current block with accumulated statements → fall to inline entry
  const inlineEntryId = state.newBlockId(`inline_${helper.symbol.getName()}`);
  const continuationId = state.newBlockId(`after_${helper.symbol.getName()}`);

  state.addBlock(currentBlockId, accumulated, {
    kind: 'fall',
    target: inlineEntryId,
  });

  // Process the helper's body statements with returnOverride → continuation
  const helperStatements = Array.from(helper.body.statements);
  const inlineInlining: InliningContext = {
    ...inlining,
    returnOverride: continuationId,
    returnVarName: resultVarName,
    returnVarSymbol: resultVarSymbol,
  };
  const inlineExit = processStatements(
    state, context, helperStatements, inlineEntryId, loopStack, inlineInlining,
  );

  // Wire inline exit to continuation (if not already terminated)
  if (inlineExit !== null) {
    patchBlockTerminator(state, inlineExit, { kind: 'fall', target: continuationId });
  }

  // Process remaining statements in the continuation block
  if (remaining.length > 0) {
    return processStatements(state, context, remaining, continuationId, loopStack, inlining);
  }

  // No remaining statements — continuation falls through
  state.addBlock(continuationId, [], { kind: 'return', expression: undefined });
  return continuationId;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Extract statements from a statement that may or may not be a Block.
 */
function getBlockStatements(stmt: ts.Statement): readonly ts.Statement[] {
  if (ts.isBlock(stmt)) {
    return Array.from(stmt.statements);
  }
  return [stmt];
}

/**
 * Replace the terminator of an existing block, or create a new block
 * with just the terminator if the block doesn't exist yet.
 *
 * Used to wire exits from branches/loops to merge or continuation blocks.
 */
function patchBlockTerminator(
  state: CFGBuilderState,
  blockId: string,
  terminator: Terminator,
): void {
  const existing = state.blocks.get(blockId);
  if (existing) {
    // Replace the block with updated terminator, preserving returnTargetVar
    state.blocks.set(blockId, {
      id: existing.id,
      statements: existing.statements,
      terminator,
      ...(existing.returnTargetVar && { returnTargetVar: existing.returnTargetVar }),
    });
  } else {
    state.addBlock(blockId, [], terminator);
  }
}

// ---------------------------------------------------------------------------
// Steps.map() detection
// ---------------------------------------------------------------------------

/**
 * Detect `await Steps.map(items, callback, options?)` or
 * `const results = await Steps.map(items, callback, options?)`.
 *
 * Returns the exit block ID if matched, undefined if not matched.
 */
function tryExtractStepsMap(
  state: CFGBuilderState,
  context: CompilerContext,
  stmt: ts.Statement,
  accumulated: ts.Statement[],
  currentBlockId: string,
  remaining: readonly ts.Statement[],
  loopStack: readonly LoopContext[],
  inlining: InliningContext,
): string | null | undefined {
  // Pattern 1: const results = await Steps.map(items, cb, opts?)
  // Pattern 2: await Steps.map(items, cb, opts?)  (fire-and-forget)
  let callExpr: ts.CallExpression | undefined;
  let collectResults = false;
  let resultBindingName: string | undefined;
  let resultSymbol: ts.Symbol | undefined;

  if (ts.isVariableStatement(stmt)) {
    const decl = stmt.declarationList.declarations[0];
    if (decl?.initializer && ts.isAwaitExpression(decl.initializer) &&
        ts.isCallExpression(decl.initializer.expression)) {
      const call = decl.initializer.expression;
      if (isStepsMapCall(call)) {
        callExpr = call;
        collectResults = true;
        if (ts.isIdentifier(decl.name)) {
          resultBindingName = decl.name.text;
          resultSymbol = context.checker.getSymbolAtLocation(decl.name);
        }
      }
    }
  } else if (ts.isExpressionStatement(stmt) && ts.isAwaitExpression(stmt.expression) &&
             ts.isCallExpression(stmt.expression.expression)) {
    const call = stmt.expression.expression;
    if (isStepsMapCall(call)) {
      callExpr = call;
      collectResults = false;
    }
  }

  if (!callExpr) return undefined;

  // Extract arguments: Steps.map(items, callback, options?)
  const itemsArg = callExpr.arguments[0];
  const callbackArg = callExpr.arguments[1];
  const optionsArg = callExpr.arguments[2];

  if (!itemsArg || !callbackArg) {
    context.addError(callExpr, 'Steps.map() requires at least 2 arguments: items and callback', ErrorCodes.Cfg.InvalidMapCall.code);
    return undefined;
  }

  // Callback must be an arrow function or function expression
  let callbackBody: ts.Block | undefined;
  let callbackParam: ts.ParameterDeclaration | undefined;

  if (ts.isArrowFunction(callbackArg) || ts.isFunctionExpression(callbackArg)) {
    callbackParam = callbackArg.parameters[0];
    if (ts.isBlock(callbackArg.body)) {
      callbackBody = callbackArg.body;
    } else {
      // Expression body: (item) => expr  →  wrap in { return expr; }
      // The CFG builder processes statements, so we treat the expression as a single return
      // For now, only block bodies are supported
      context.addError(callbackArg, 'Steps.map() callback must have a block body (use { } braces)', ErrorCodes.Cfg.InvalidMapCall.code);
      return undefined;
    }
  } else {
    context.addError(callbackArg, 'Steps.map() callback must be an arrow function or function expression', ErrorCodes.Cfg.InvalidMapCall.code);
    return undefined;
  }

  // Extract maxConcurrency and retry from options
  let maxConcurrency: number | undefined;
  let retryExpression: ts.Expression | undefined;
  if (optionsArg && ts.isObjectLiteralExpression(optionsArg)) {
    for (const prop of optionsArg.properties) {
      if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) continue;
      if (prop.name.text === 'maxConcurrency' && ts.isNumericLiteral(prop.initializer)) {
        maxConcurrency = Number(prop.initializer.text);
      } else if (prop.name.text === 'retry') {
        retryExpression = prop.initializer;
      }
    }
  }

  // Extract iteration variable name and symbol
  let iterVarName = 'item';
  let iterVarSymbol: ts.Symbol | undefined;
  if (callbackParam && ts.isIdentifier(callbackParam.name)) {
    iterVarName = callbackParam.name.text;
    iterVarSymbol = context.checker.getSymbolAtLocation(callbackParam.name);
  }

  const bodyBlockId = state.newBlockId('map_body');
  const exitBlockId = state.newBlockId('map_exit');

  // Finalize current block with mapState terminator
  state.addBlock(currentBlockId, accumulated, {
    kind: 'mapState',
    itemsExpression: itemsArg,
    iterVarName,
    iterVarSymbol,
    bodyBlock: bodyBlockId,
    exitBlock: exitBlockId,
    collectResults,
    maxConcurrency,
    ...(resultBindingName && { resultBindingName }),
    ...(resultSymbol && { resultSymbol }),
    ...(retryExpression && { retryExpression }),
  });

  // Process the callback body
  const bodyStatements = Array.from(callbackBody.statements);
  const bodyExit = processStatements(
    state, context, bodyStatements, bodyBlockId,
    [...loopStack, { conditionBlock: bodyBlockId, exitBlock: exitBlockId }],
    inlining,
  );

  // Body exit: implicit end of iteration (each iteration is independent in Map)
  if (bodyExit !== null) {
    patchBlockTerminator(state, bodyExit, { kind: 'return', expression: undefined });
  }

  if (remaining.length > 0) {
    return processStatements(state, context, remaining, exitBlockId, loopStack, inlining);
  }
  return exitBlockId;
}

function isStepsMapCall(call: ts.CallExpression): boolean {
  if (!ts.isPropertyAccessExpression(call.expression)) return false;
  const prop = call.expression;
  return ts.isIdentifier(prop.expression) && prop.expression.text === 'Steps' &&
         prop.name.text === 'map';
}

function isStepsDistributedMapCall(call: ts.CallExpression): boolean {
  if (!ts.isPropertyAccessExpression(call.expression)) return false;
  const prop = call.expression;
  return ts.isIdentifier(prop.expression) && prop.expression.text === 'Steps' &&
         prop.name.text === 'distributedMap';
}

/**
 * Extract Steps.distributedMap(items, callback, options?) into a MapStateTerminator
 * with distributed: true and additional fields for ItemReader, ResultWriter, etc.
 */
function tryExtractStepsDistributedMap(
  state: CFGBuilderState,
  context: CompilerContext,
  stmt: ts.Statement,
  accumulated: ts.Statement[],
  currentBlockId: string,
  remaining: readonly ts.Statement[],
  loopStack: readonly LoopContext[],
  inlining: InliningContext,
): string | null | undefined {
  // Pattern 1: const results = await Steps.distributedMap(items, cb, opts?)
  // Pattern 2: await Steps.distributedMap(items, cb, opts?)  (fire-and-forget)
  let callExpr: ts.CallExpression | undefined;
  let collectResults = false;
  let resultBindingName: string | undefined;
  let resultSymbol: ts.Symbol | undefined;

  if (ts.isVariableStatement(stmt)) {
    const decl = stmt.declarationList.declarations[0];
    if (decl?.initializer && ts.isAwaitExpression(decl.initializer) &&
        ts.isCallExpression(decl.initializer.expression)) {
      const call = decl.initializer.expression;
      if (isStepsDistributedMapCall(call)) {
        callExpr = call;
        collectResults = true;
        if (ts.isIdentifier(decl.name)) {
          resultBindingName = decl.name.text;
          resultSymbol = context.checker.getSymbolAtLocation(decl.name);
        }
      }
    }
  } else if (ts.isExpressionStatement(stmt) && ts.isAwaitExpression(stmt.expression) &&
             ts.isCallExpression(stmt.expression.expression)) {
    const call = stmt.expression.expression;
    if (isStepsDistributedMapCall(call)) {
      callExpr = call;
      collectResults = false;
    }
  }

  if (!callExpr) return undefined;

  // Extract arguments: Steps.distributedMap(items, callback, options?)
  const itemsArg = callExpr.arguments[0];
  const callbackArg = callExpr.arguments[1];
  const optionsArg = callExpr.arguments[2];

  if (!itemsArg || !callbackArg) {
    context.addError(callExpr, 'Steps.distributedMap() requires at least 2 arguments: items and callback', ErrorCodes.Cfg.InvalidDistributedMapCall.code);
    return undefined;
  }

  // Callback must be an arrow function or function expression
  let callbackBody: ts.Block | undefined;
  let callbackParam: ts.ParameterDeclaration | undefined;

  if (ts.isArrowFunction(callbackArg) || ts.isFunctionExpression(callbackArg)) {
    callbackParam = callbackArg.parameters[0];
    if (ts.isBlock(callbackArg.body)) {
      callbackBody = callbackArg.body;
    } else {
      context.addError(callbackArg, 'Steps.distributedMap() callback must have a block body (use { } braces)', ErrorCodes.Cfg.InvalidDistributedMapCall.code);
      return undefined;
    }
  } else {
    context.addError(callbackArg, 'Steps.distributedMap() callback must be an arrow function or function expression', ErrorCodes.Cfg.InvalidDistributedMapCall.code);
    return undefined;
  }

  // Extract options
  let maxConcurrency: number | undefined;
  let executionType: 'STANDARD' | 'EXPRESS' | undefined;
  let retryExpression: ts.Expression | undefined;
  let itemReaderExpression: ts.Expression | undefined;
  let resultWriterExpression: ts.Expression | undefined;
  let itemBatcherExpression: ts.Expression | undefined;
  let toleratedFailurePercentage: number | undefined;
  let toleratedFailureCount: number | undefined;
  let label: string | undefined;

  if (optionsArg && ts.isObjectLiteralExpression(optionsArg)) {
    for (const prop of optionsArg.properties) {
      if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) continue;
      switch (prop.name.text) {
        case 'maxConcurrency':
          if (ts.isNumericLiteral(prop.initializer)) {
            maxConcurrency = Number(prop.initializer.text);
          }
          break;
        case 'executionType':
          if (ts.isStringLiteral(prop.initializer)) {
            const val = prop.initializer.text;
            if (val === 'STANDARD' || val === 'EXPRESS') {
              executionType = val;
            }
          }
          break;
        case 'retry':
          retryExpression = prop.initializer;
          break;
        case 'itemReader':
          itemReaderExpression = prop.initializer;
          break;
        case 'resultWriter':
          resultWriterExpression = prop.initializer;
          break;
        case 'itemBatcher':
          itemBatcherExpression = prop.initializer;
          break;
        case 'toleratedFailurePercentage':
          if (ts.isNumericLiteral(prop.initializer)) {
            toleratedFailurePercentage = Number(prop.initializer.text);
          }
          break;
        case 'toleratedFailureCount':
          if (ts.isNumericLiteral(prop.initializer)) {
            toleratedFailureCount = Number(prop.initializer.text);
          }
          break;
        case 'label':
          if (ts.isStringLiteral(prop.initializer)) {
            label = prop.initializer.text;
          }
          break;
      }
    }
  }

  // Extract iteration variable name and symbol
  let iterVarName = 'item';
  let iterVarSymbol: ts.Symbol | undefined;
  if (callbackParam && ts.isIdentifier(callbackParam.name)) {
    iterVarName = callbackParam.name.text;
    iterVarSymbol = context.checker.getSymbolAtLocation(callbackParam.name);
  }

  const bodyBlockId = state.newBlockId('distmap_body');
  const exitBlockId = state.newBlockId('distmap_exit');

  // Finalize current block with mapState terminator (distributed)
  state.addBlock(currentBlockId, accumulated, {
    kind: 'mapState',
    itemsExpression: itemsArg,
    iterVarName,
    iterVarSymbol,
    bodyBlock: bodyBlockId,
    exitBlock: exitBlockId,
    collectResults,
    maxConcurrency,
    ...(resultBindingName && { resultBindingName }),
    ...(resultSymbol && { resultSymbol }),
    ...(retryExpression && { retryExpression }),
    distributed: true,
    ...(executionType && { executionType }),
    ...(itemReaderExpression && { itemReaderExpression }),
    ...(resultWriterExpression && { resultWriterExpression }),
    ...(itemBatcherExpression && { itemBatcherExpression }),
    ...(toleratedFailurePercentage != null && { toleratedFailurePercentage }),
    ...(toleratedFailureCount != null && { toleratedFailureCount }),
    ...(label && { label }),
  });

  // Process the callback body
  const bodyStatements = Array.from(callbackBody.statements);
  const bodyExit = processStatements(
    state, context, bodyStatements, bodyBlockId,
    [...loopStack, { conditionBlock: bodyBlockId, exitBlock: exitBlockId }],
    inlining,
  );

  // Body exit: implicit end of iteration
  if (bodyExit !== null) {
    patchBlockTerminator(state, bodyExit, { kind: 'return', expression: undefined });
  }

  if (remaining.length > 0) {
    return processStatements(state, context, remaining, exitBlockId, loopStack, inlining);
  }
  return exitBlockId;
}

/** Check if an expression is a call to Steps.<method>() */
function isStepsCall(expr: ts.Expression, method: string): boolean {
  if (!ts.isCallExpression(expr)) return false;
  if (!ts.isPropertyAccessExpression(expr.expression)) return false;
  const prop = expr.expression;
  return ts.isIdentifier(prop.expression) && prop.expression.text === 'Steps' &&
         prop.name.text === method;
}

// ---------------------------------------------------------------------------
// Steps.parallel() → Parallel state with retry options
// ---------------------------------------------------------------------------

/**
 * Detect `const [a, b] = await Steps.parallel([fn1, fn2], { retry: {...} })`
 * or `await Steps.parallel([fn1, fn2], { retry: {...} })` (fire-and-forget).
 */
function tryExtractStepsParallel(
  state: CFGBuilderState,
  context: CompilerContext,
  stmt: ts.Statement,
  accumulated: ts.Statement[],
  currentBlockId: string,
  remaining: readonly ts.Statement[],
  loopStack: readonly LoopContext[],
  inlining: InliningContext,
): string | null | undefined {
  let callExpr: ts.CallExpression | undefined;
  let resultBindings: string[] = [];
  let resultSymbols: (ts.Symbol | undefined)[] = [];

  // Pattern 1: const [a, b] = await Steps.parallel([...], opts)
  if (ts.isVariableStatement(stmt)) {
    const decl = stmt.declarationList.declarations[0];
    if (decl?.initializer && ts.isAwaitExpression(decl.initializer) &&
        ts.isCallExpression(decl.initializer.expression) &&
        isStepsCall(decl.initializer.expression, 'parallel')) {
      callExpr = decl.initializer.expression;
      if (ts.isArrayBindingPattern(decl.name)) {
        for (const el of decl.name.elements) {
          if (ts.isBindingElement(el) && ts.isIdentifier(el.name)) {
            resultBindings.push(el.name.text);
            resultSymbols.push(context.checker.getSymbolAtLocation(el.name));
          } else {
            resultBindings.push('_');
            resultSymbols.push(undefined);
          }
        }
      } else if (ts.isIdentifier(decl.name)) {
        resultBindings = [decl.name.text];
        resultSymbols = [context.checker.getSymbolAtLocation(decl.name)];
      }
    }
  }

  // Pattern 2: await Steps.parallel([...], opts)  (fire-and-forget)
  if (!callExpr && ts.isExpressionStatement(stmt) && ts.isAwaitExpression(stmt.expression) &&
      ts.isCallExpression(stmt.expression.expression) &&
      isStepsCall(stmt.expression.expression, 'parallel')) {
    callExpr = stmt.expression.expression;
  }

  if (!callExpr) return undefined;

  // First arg: array of branch functions
  const branchesArg = callExpr.arguments[0];
  if (!branchesArg || !ts.isArrayLiteralExpression(branchesArg)) {
    context.addError(callExpr, 'Steps.parallel() first argument must be an array literal of functions', ErrorCodes.Cfg.PromiseAllNotArray.code);
    return undefined;
  }

  // Extract branch expressions: unwrap () => expr to just expr
  const branches: ts.Expression[] = [];
  for (const el of branchesArg.elements) {
    if (ts.isArrowFunction(el) && !ts.isBlock(el.body)) {
      branches.push(el.body);
    } else if (ts.isArrowFunction(el) && ts.isBlock(el.body)) {
      // Block body arrow: () => { return await svc.call(...) }
      // Extract the await expression from the single return statement
      const stmts = el.body.statements;
      if (stmts.length === 1 && ts.isReturnStatement(stmts[0]) && stmts[0].expression) {
        branches.push(stmts[0].expression);
      } else {
        branches.push(el);
      }
    } else {
      branches.push(el);
    }
  }

  // Second arg: options with retry
  let retryExpression: ts.Expression | undefined;
  const optionsArg = callExpr.arguments[1];
  if (optionsArg && ts.isObjectLiteralExpression(optionsArg)) {
    for (const prop of optionsArg.properties) {
      if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) continue;
      if (prop.name.text === 'retry') {
        retryExpression = prop.initializer;
      }
    }
  }

  const exitBlockId = state.newBlockId('parallel_exit');
  const classifiedBranches = classifyParallelBranches(
    state, context, branches, loopStack, inlining,
  );

  state.addBlock(currentBlockId, accumulated, {
    kind: 'parallel',
    branches: classifiedBranches,
    resultBindings,
    resultSymbols,
    exitBlock: exitBlockId,
    ...(retryExpression && { retryExpression }),
  });

  if (remaining.length > 0) {
    return processStatements(state, context, remaining, exitBlockId, loopStack, inlining);
  }
  return exitBlockId;
}

// ---------------------------------------------------------------------------
// Parallel branch classification
// ---------------------------------------------------------------------------

/**
 * Classify Promise.all branches as direct expressions or substep calls.
 * When a branch is a call to a registered substep, inline the substep body
 * into a sub-block to produce a multi-state branch.
 */
function classifyParallelBranches(
  state: CFGBuilderState,
  context: CompilerContext,
  branches: readonly ts.Expression[],
  loopStack: readonly LoopContext[],
  inlining: InliningContext,
): ParallelBranch[] {
  const result: ParallelBranch[] = [];

  for (const expr of branches) {
    // Unwrap await
    let callExpr: ts.Expression = expr;
    if (ts.isAwaitExpression(callExpr)) {
      callExpr = callExpr.expression;
    }

    // Check if this is a call to a registered substep/helper
    if (ts.isCallExpression(callExpr) && inlining.helperRegistry) {
      const calleeSym = context.checker.getSymbolAtLocation(callExpr.expression);
      if (calleeSym) {
        const resolvedSym = (calleeSym.flags & ts.SymbolFlags.Alias)
          ? context.checker.getAliasedSymbol(calleeSym)
          : calleeSym;
        const helper = inlining.helperRegistry.get(resolvedSym);
        if (helper) {
          // This is a substep call — inline its body into a sub-block
          const branchBlockId = state.newBlockId(`parallel_branch_${helper.symbol.getName()}`);

          // Record parameter-to-argument bindings
          if (inlining.inlineBindings) {
            for (let p = 0; p < helper.parameters.length; p++) {
              const param = helper.parameters[p];
              const argExpr = p < callExpr.arguments.length
                ? callExpr.arguments[p]
                : param.initializer!;

              if (ts.isIdentifier(param.name)) {
                const paramSym = context.checker.getSymbolAtLocation(param.name);
                if (paramSym) {
                  inlining.inlineBindings.push({ paramSymbol: paramSym, argExpression: argExpr });
                }
              } else if (ts.isObjectBindingPattern(param.name)) {
                for (const element of param.name.elements) {
                  const elemSym = context.checker.getSymbolAtLocation(element.name);
                  if (!elemSym) continue;
                  const propName = element.propertyName
                    ? (element.propertyName as ts.Identifier).text
                    : (element.name as ts.Identifier).text;

                  let bindingExpr: ts.Expression | undefined;
                  if (ts.isObjectLiteralExpression(argExpr)) {
                    const prop = argExpr.properties.find(p => {
                      if (ts.isPropertyAssignment(p) && ts.isIdentifier(p.name)) return p.name.text === propName;
                      if (ts.isShorthandPropertyAssignment(p)) return p.name.text === propName;
                      return false;
                    });
                    if (prop) {
                      bindingExpr = ts.isPropertyAssignment(prop)
                        ? prop.initializer
                        : (prop as ts.ShorthandPropertyAssignment).name;
                    }
                  }
                  if (!bindingExpr) {
                    bindingExpr = ts.factory.createPropertyAccessExpression(argExpr, propName);
                  }
                  inlining.inlineBindings.push({ paramSymbol: elemSym, argExpression: bindingExpr });
                }
              }
            }
          }

          // Process the helper's body into a sub-graph
          const bodyStatements = Array.from(helper.body.statements);
          const bodyExit = processStatements(
            state, context, bodyStatements, branchBlockId, loopStack,
            { ...inlining, returnOverride: undefined, returnVarName: undefined, returnVarSymbol: undefined },
          );

          // Body exit: end of branch (implicit return)
          if (bodyExit !== null) {
            patchBlockTerminator(state, bodyExit, { kind: 'return', expression: undefined });
          }

          result.push({ kind: 'substep', bodyBlock: branchBlockId });
          continue;
        }
      }
    }

    // Not a substep — direct expression
    result.push({ kind: 'expression', expression: expr });
  }

  return result;
}

// ---------------------------------------------------------------------------
// Promise.all detection
// ---------------------------------------------------------------------------

interface PromiseAllInfo {
  branches: ts.Expression[];
  resultBindings: string[];
  resultSymbols: (ts.Symbol | undefined)[];
}

/**
 * Extract Promise.all([...]) from a variable statement.
 * Supports:
 *   const [a, b] = await Promise.all([exprA, exprB]);
 *   const result = await Promise.all([exprA, exprB]);
 */
function extractPromiseAll(
  context: CompilerContext,
  stmt: ts.VariableStatement,
): PromiseAllInfo | null {
  const decl = stmt.declarationList.declarations[0];
  if (!decl || !decl.initializer) return null;

  // Must be: await Promise.all([...])
  if (!ts.isAwaitExpression(decl.initializer)) return null;
  const awaitedExpr = decl.initializer.expression;
  if (!ts.isCallExpression(awaitedExpr)) return null;

  // Check callee is Promise.all
  if (!ts.isPropertyAccessExpression(awaitedExpr.expression)) return null;
  const propAccess = awaitedExpr.expression;
  if (!ts.isIdentifier(propAccess.expression) || propAccess.expression.text !== 'Promise') return null;
  if (propAccess.name.text !== 'all') return null;

  // Extract array argument
  const arg = awaitedExpr.arguments[0];
  if (!arg || !ts.isArrayLiteralExpression(arg)) {
    context.addError(awaitedExpr, 'Promise.all argument must be an array literal', ErrorCodes.Cfg.PromiseAllNotArray.code);
    return null;
  }

  const branches = [...arg.elements];
  const resultBindings: string[] = [];
  const resultSymbols: (ts.Symbol | undefined)[] = [];

  // Extract result variable names
  if (ts.isArrayBindingPattern(decl.name)) {
    // const [a, b] = await Promise.all([...])
    for (const element of decl.name.elements) {
      if (ts.isBindingElement(element) && ts.isIdentifier(element.name)) {
        resultBindings.push(element.name.text);
        resultSymbols.push(context.checker.getSymbolAtLocation(element.name));
      } else {
        resultBindings.push('_');
        resultSymbols.push(undefined);
      }
    }
  } else if (ts.isIdentifier(decl.name)) {
    // const result = await Promise.all([...])
    resultBindings.push(decl.name.text);
    resultSymbols.push(context.checker.getSymbolAtLocation(decl.name));
  }

  return { branches, resultBindings, resultSymbols };
}

/**
 * Returns true if the expression is a call to `Promise.race(...)` or `Promise.any(...)`.
 */
function isPromiseRaceOrAny(expr: ts.Expression): boolean {
  if (!ts.isCallExpression(expr)) return false;
  if (!ts.isPropertyAccessExpression(expr.expression)) return false;
  const prop = expr.expression;
  if (!ts.isIdentifier(prop.expression) || prop.expression.text !== 'Promise') return false;
  return prop.name.text === 'race' || prop.name.text === 'any';
}

/**
 * Extract Promise.all from a standalone await expression (fire-and-forget):
 *   await Promise.all([exprA, exprB])
 * Resolves deferred promise references in branches.
 */
function extractPromiseAllFromAwait(
  context: CompilerContext,
  awaitExpr: ts.AwaitExpression,
  pendingPromises: ReadonlyMap<ts.Symbol, PendingPromise>,
): { branches: ts.Expression[] } | null {
  const callExpr = awaitExpr.expression;
  if (!ts.isCallExpression(callExpr)) return null;

  if (!ts.isPropertyAccessExpression(callExpr.expression)) return null;
  const propAccess = callExpr.expression;
  if (!ts.isIdentifier(propAccess.expression) || propAccess.expression.text !== 'Promise') return null;
  if (propAccess.name.text !== 'all') return null;

  const arg = callExpr.arguments[0];
  if (!arg || !ts.isArrayLiteralExpression(arg)) {
    context.addError(callExpr, 'Promise.all argument must be an array literal', ErrorCodes.Cfg.PromiseAllNotArray.code);
    return null;
  }

  const branches = [...arg.elements].map(branch => {
    if (ts.isIdentifier(branch)) {
      const sym = context.checker.getSymbolAtLocation(branch);
      if (sym && pendingPromises.has(sym)) return pendingPromises.get(sym)!.callExpr;
    }
    return branch;
  });

  return { branches };
}

// ---------------------------------------------------------------------------
// Deferred-await detection
// ---------------------------------------------------------------------------

interface PendingPromise {
  readonly callExpr: ts.CallExpression;
  readonly varName: string;
  readonly varSymbol: ts.Symbol;
}

/**
 * Pre-scan statements to find the deferred-await pattern:
 *   const foo = svc.call(params)   // non-awaited call
 *   ...
 *   await foo                       // awaited later
 *
 * Only returns candidates that are confirmed to be awaited later
 * in the same statement list (via `await x`, `const y = await x`,
 * or inside `Promise.all([x, ...])`).
 */
function findPendingPromises(
  context: CompilerContext,
  statements: readonly ts.Statement[],
): Map<ts.Symbol, PendingPromise> {
  const candidates = new Map<ts.Symbol, PendingPromise>();

  // Pass 1: find non-awaited call declarations
  for (const stmt of statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    const decl = stmt.declarationList.declarations[0];
    if (!decl?.initializer || !ts.isIdentifier(decl.name)) continue;
    if (ts.isAwaitExpression(decl.initializer)) continue;
    if (!ts.isCallExpression(decl.initializer)) continue;

    const sym = context.checker.getSymbolAtLocation(decl.name);
    if (sym) {
      candidates.set(sym, {
        callExpr: decl.initializer,
        varName: decl.name.text,
        varSymbol: sym,
      });
    }
  }

  if (candidates.size === 0) return candidates;

  // Pass 2: check which candidates are awaited later
  const awaited = new Set<ts.Symbol>();

  for (const stmt of statements) {
    visitAwaitedIdentifiers(context, stmt, candidates, (sym) => {
      awaited.add(sym);
    });
  }

  // Only keep confirmed
  for (const sym of candidates.keys()) {
    if (!awaited.has(sym)) candidates.delete(sym);
  }

  return candidates;
}

/**
 * Walk a statement looking for identifiers that are awaited:
 * - `await x` (ExpressionStatement)
 * - `const y = await x` (VariableDeclaration)
 * - `Promise.all([x, ...])` (identifier inside array argument)
 */
function visitAwaitedIdentifiers(
  context: CompilerContext,
  stmt: ts.Statement,
  candidates: ReadonlyMap<ts.Symbol, PendingPromise>,
  callback: (sym: ts.Symbol) => void,
): void {
  // Pattern: await x (ExpressionStatement)
  if (ts.isExpressionStatement(stmt) && ts.isAwaitExpression(stmt.expression)) {
    const inner = stmt.expression.expression;
    if (ts.isIdentifier(inner)) {
      const sym = context.checker.getSymbolAtLocation(inner);
      if (sym && candidates.has(sym)) callback(sym);
    }
    // Also check: await Promise.all([x, ...])
    if (ts.isCallExpression(inner)) {
      checkPromiseAllArgs(context, inner, candidates, callback);
    }
  }

  // Pattern: const y = await x (VariableStatement)
  if (ts.isVariableStatement(stmt)) {
    const decl = stmt.declarationList.declarations[0];
    if (decl?.initializer && ts.isAwaitExpression(decl.initializer)) {
      const inner = decl.initializer.expression;
      if (ts.isIdentifier(inner)) {
        const sym = context.checker.getSymbolAtLocation(inner);
        if (sym && candidates.has(sym)) callback(sym);
      }
      // Also check: const [a, b] = await Promise.all([x, ...])
      if (ts.isCallExpression(inner)) {
        checkPromiseAllArgs(context, inner, candidates, callback);
      }
    }
  }
}

/**
 * If callExpr is Promise.all([...]), check array elements for candidate identifiers.
 */
function checkPromiseAllArgs(
  context: CompilerContext,
  callExpr: ts.CallExpression,
  candidates: ReadonlyMap<ts.Symbol, PendingPromise>,
  callback: (sym: ts.Symbol) => void,
): void {
  if (!ts.isPropertyAccessExpression(callExpr.expression)) return;
  const propAccess = callExpr.expression;
  if (!ts.isIdentifier(propAccess.expression) || propAccess.expression.text !== 'Promise') return;
  if (propAccess.name.text !== 'all') return;

  const arg = callExpr.arguments[0];
  if (!arg || !ts.isArrayLiteralExpression(arg)) return;

  for (const el of arg.elements) {
    if (ts.isIdentifier(el)) {
      const sym = context.checker.getSymbolAtLocation(el);
      if (sym && candidates.has(sym)) callback(sym);
    }
  }
}

/**
 * Info about a single deferred-await resolution point.
 */
interface DeferredAwaitInfo {
  readonly callExpr: ts.CallExpression;
  readonly resultName: string | undefined;
  readonly resultSymbol: ts.Symbol | undefined;
}

/**
 * Check if a statement is an await-on-pending-promise pattern.
 * Returns info if it is, undefined otherwise.
 */
function extractDeferredAwait(
  context: CompilerContext,
  stmt: ts.Statement,
  pendingPromises: ReadonlyMap<ts.Symbol, PendingPromise>,
): DeferredAwaitInfo | undefined {
  // Pattern: await x (fire-and-forget)
  if (ts.isExpressionStatement(stmt) && ts.isAwaitExpression(stmt.expression)) {
    const inner = stmt.expression.expression;
    if (ts.isIdentifier(inner)) {
      const sym = context.checker.getSymbolAtLocation(inner);
      if (sym && pendingPromises.has(sym)) {
        return {
          callExpr: pendingPromises.get(sym)!.callExpr,
          resultName: undefined,
          resultSymbol: undefined,
        };
      }
    }
  }

  // Pattern: const y = await x (result capture)
  if (ts.isVariableStatement(stmt)) {
    const decl = stmt.declarationList.declarations[0];
    if (decl?.initializer && ts.isAwaitExpression(decl.initializer) && ts.isIdentifier(decl.name)) {
      const inner = decl.initializer.expression;
      if (ts.isIdentifier(inner)) {
        const sym = context.checker.getSymbolAtLocation(inner);
        if (sym && pendingPromises.has(sym)) {
          return {
            callExpr: pendingPromises.get(sym)!.callExpr,
            resultName: decl.name.text,
            resultSymbol: context.checker.getSymbolAtLocation(decl.name),
          };
        }
      }
    }
  }

  return undefined;
}

/**
 * Try to batch consecutive deferred-await statements into a ParallelTerminator.
 * Returns the index to advance to (exclusive) if a batch was created, or -1 if not.
 */
function tryBatchDeferredAwaits(
  state: CFGBuilderState,
  context: CompilerContext,
  statements: readonly ts.Statement[],
  startIndex: number,
  accumulated: ts.Statement[],
  currentBlockId: string,
  loopStack: readonly LoopContext[],
  inlining: InliningContext,
  pendingPromises: ReadonlyMap<ts.Symbol, PendingPromise>,
): { exitBlockId: string; advanceTo: number } | undefined {
  const first = extractDeferredAwait(context, statements[startIndex], pendingPromises);
  if (!first) return undefined;

  // Collect consecutive deferred awaits
  const batch: DeferredAwaitInfo[] = [first];
  let j = startIndex + 1;
  while (j < statements.length) {
    const next = extractDeferredAwait(context, statements[j], pendingPromises);
    if (!next) break;
    batch.push(next);
    j++;
  }

  // Single deferred await — don't create Parallel; handled by state builder fallback
  if (batch.length < 2) return undefined;

  const exitBlockId = state.newBlockId('parallel_exit');

  // Classify branches (handles both service calls and substep calls)
  const classifiedBranches = classifyParallelBranches(
    state, context, batch.map(b => b.callExpr), loopStack, inlining,
  );

  const resultBindings = batch.map(b => b.resultName ?? '_');
  const resultSymbols = batch.map(b => b.resultSymbol);

  state.addBlock(currentBlockId, accumulated, {
    kind: 'parallel',
    branches: classifiedBranches,
    resultBindings,
    resultSymbols,
    exitBlock: exitBlockId,
  });

  return { exitBlockId, advanceTo: j };
}
