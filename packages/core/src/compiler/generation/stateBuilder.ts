import ts from 'typescript';
import { CompilerContext } from '../compilerContext.js';
import { ErrorCodes } from '../diagnosticCodes.js';
import type { ControlFlowGraph, BasicBlock, ParallelBranch } from '../cfg/types.js';
import type { ServiceRegistry, ServiceMethodInfo } from '../discovery/serviceDiscovery.js';
import type { StepFunctionCallSite } from '../discovery/callSiteLocator.js';
import {
  type VariableResolution,
  type VariableResolutionBuilder,
  VariableResolutionBuilder as VRBClass,
  resolveExpression,
  extractResourceArn,
} from '../analysis/variableResolver.js';
import { StepVariableType } from '../analysis/types.js';
import { buildParameters, buildChoiceRule } from './expressionMapper.js';
import { STEP_ERROR_NAMES } from '../../runtime/index.js';
import { SDK_PARAM_SHAPE, SDK_RESOURCE_INJECT } from '../../runtime/services/metadata.js';
import type {
  State,
  StateMachineDefinition,
  TaskState,
  PassState,
  ChoiceState,
  WaitState,
  FailState,
  MapState,
  ParallelState,
  CatchRule,
  RetryRule,
} from '../../asl/types.js';

// ---------------------------------------------------------------------------
// Build context
// ---------------------------------------------------------------------------

interface CatchRuleInfo {
  readonly errorEquals: string[];
  readonly target: string;
}

interface TryCatchScope {
  readonly catchRules: CatchRuleInfo[];
  readonly catchParam?: string;
}

interface BuildContext {
  readonly compilerContext: CompilerContext;
  readonly cfg: ControlFlowGraph;
  readonly callSite: StepFunctionCallSite;
  readonly serviceRegistry: ServiceRegistry;
  readonly variables: VariableResolutionBuilder;
  readonly states: Map<string, State>;
  readonly visited: Set<string>;
  readonly blockFirstState: Map<string, string>;
  readonly usedNames: Set<string>;
  readonly tryCatchScopes: TryCatchScope[];
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Build the complete StateMachineDefinition from a CFG.
 */
export function buildStateMachine(
  context: CompilerContext,
  cfg: ControlFlowGraph,
  callSite: StepFunctionCallSite,
  serviceRegistry: ServiceRegistry,
  variables: VariableResolutionBuilder,
): StateMachineDefinition {
  const buildCtx: BuildContext = {
    compilerContext: context,
    cfg,
    callSite,
    serviceRegistry,
    variables,
    states: new Map(),
    visited: new Set(),
    blockFirstState: new Map(),
    usedNames: new Set(),
    tryCatchScopes: [],
  };

  const startState = processBlock(buildCtx, cfg.entry);

  if (!startState) {
    context.addRawDiagnostic(
      callSite.file.fileName, 1, 1,
      'Step function body produced no ASL states',
      'error', ErrorCodes.Gen.EmptyStateMachine.code,
    );
    return { StartAt: '', States: {} };
  }

  const states: Record<string, State> = {};
  for (const [name, state] of buildCtx.states) {
    states[name] = state;
  }

  return { StartAt: startState, States: states };
}

// ---------------------------------------------------------------------------
// Block processing
// ---------------------------------------------------------------------------

/**
 * Process a single CFG block. Returns the name of the first ASL state
 * produced by this block, or null if no states were emitted.
 */
function processBlock(ctx: BuildContext, blockId: string): string | null {
  if (ctx.visited.has(blockId)) {
    return ctx.blockFirstState.get(blockId) ?? null;
  }
  ctx.visited.add(blockId);

  const block = ctx.cfg.blocks.get(blockId);
  if (!block) return null;

  const stateNames: string[] = [];

  // Process statements → may emit states
  for (const stmt of block.statements) {
    const emitted = processStatement(ctx, stmt);
    if (emitted) stateNames.push(emitted);
  }

  // Chain consecutive states within this block
  for (let i = 0; i < stateNames.length - 1; i++) {
    patchNext(ctx.states, stateNames[i], stateNames[i + 1]);
  }

  // Handle value-returning helper inlining: override ResultPath or create alias
  if (block.returnTargetVar) {
    const { name, symbol, expression } = block.returnTargetVar;

    if (!expression) {
      // return await svc.call(...) → override the last Task state's ResultPath
      const resultPath = `$.${name}`;
      const lastEmittedName = stateNames[stateNames.length - 1];
      if (lastEmittedName) {
        const lastState = ctx.states.get(lastEmittedName);
        if (lastState && lastState.Type === 'Task') {
          const taskState = lastState as TaskState;
          if (taskState.ResultPath === null) {
            const { ResultPath: _, ...rest } = taskState;
            ctx.states.set(lastEmittedName, { ...rest, ResultPath: resultPath } as State);
          }
        }
      }
      // Register the caller's variable as StateOutput
      ctx.variables.addVariable(symbol, {
        symbol,
        type: StepVariableType.StateOutput,
        jsonPath: resultPath,
        definitelyAssigned: true,
        constant: false,
      });
    } else {
      // return expr (non-await) → resolve expression and create variable binding
      const resolved = resolveExpression(ctx.compilerContext, expression, ctx.variables.toResolution());
      if (resolved.kind === 'jsonpath' && resolved.path) {
        ctx.variables.addVariable(symbol, {
          symbol,
          type: StepVariableType.StateOutput,
          jsonPath: resolved.path,
          definitelyAssigned: true,
          constant: false,
        });
      } else if (resolved.kind === 'literal') {
        ctx.variables.addVariable(symbol, {
          symbol,
          type: StepVariableType.Constant,
          definitelyAssigned: true,
          constant: true,
          literalValue: resolved.value,
        });
      } else if (resolved.kind === 'intrinsic' && resolved.path) {
        ctx.variables.addVariable(symbol, {
          symbol,
          type: StepVariableType.Derived,
          definitelyAssigned: true,
          constant: true,
          intrinsicPath: resolved.path,
        });
      }
    }
  }

  // Handle terminator
  const lastStateName = stateNames[stateNames.length - 1] ?? null;
  const terminatorResult = processTerminator(ctx, block, lastStateName);

  if (terminatorResult) {
    stateNames.push(terminatorResult);
  }

  const firstState = stateNames[0] ?? null;
  if (firstState) {
    ctx.blockFirstState.set(blockId, firstState);
  }
  return firstState;
}

// ---------------------------------------------------------------------------
// Statement processing
// ---------------------------------------------------------------------------

function processStatement(ctx: BuildContext, stmt: ts.Statement): string | null {
  // Pattern 1: const x = await svc.method(args)
  if (ts.isVariableStatement(stmt)) {
    for (const decl of stmt.declarationList.declarations) {
      if (decl.initializer && ts.isAwaitExpression(decl.initializer)) {
        return processAwaitAssignment(ctx, decl);
      }
      // Literal constants — register but don't emit state
      if (decl.initializer && isSimpleLiteral(decl.initializer) && ts.isIdentifier(decl.name)) {
        registerConstant(ctx, decl);
        return null;
      }
      // Pattern 5: const x = Steps.format(...) or const x = a + b — intrinsic
      if (decl.initializer && ts.isIdentifier(decl.name)) {
        const resolved = resolveExpression(
          ctx.compilerContext,
          decl.initializer,
          ctx.variables.toResolution(),
        );
        if (resolved.kind === 'intrinsic') {
          const sym = ctx.compilerContext.checker.getSymbolAtLocation(decl.name);
          if (sym) {
            ctx.variables.addVariable(sym, {
              symbol: sym,
              type: StepVariableType.Derived,
              definitelyAssigned: true,
              constant: true,
              intrinsicPath: resolved.path,
            });
          }
          return null; // No state emitted — just variable registration
        }
        // Resolved literal (e.g. reference to a module-level constant or folded expression)
        if (resolved.kind === 'literal') {
          const sym = ctx.compilerContext.checker.getSymbolAtLocation(decl.name);
          if (sym) {
            ctx.variables.addVariable(sym, {
              symbol: sym,
              type: StepVariableType.Constant,
              definitelyAssigned: true,
              constant: true,
              literalValue: resolved.value,
            });
          }
          return null;
        }
      }
    }
  }

  // Pattern 2: await svc.method(args) — fire-and-forget
  if (ts.isExpressionStatement(stmt) && ts.isAwaitExpression(stmt.expression)) {
    return processAwaitFireAndForget(ctx, stmt.expression);
  }

  // Pattern 3: variable = await svc.method(args) — reassignment
  if (ts.isExpressionStatement(stmt)) {
    const expr = stmt.expression;
    if (ts.isBinaryExpression(expr) &&
        expr.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
        ts.isAwaitExpression(expr.right)) {
      return processAwaitReassignment(ctx, expr);
    }
  }

  // Pattern 4: Steps.delay({ seconds: 30 }) — Wait state
  if (ts.isExpressionStatement(stmt) && ts.isCallExpression(stmt.expression)) {
    const result = processStepsDelay(ctx, stmt.expression);
    if (result) return result;
  }

  return null;
}

function processAwaitAssignment(
  ctx: BuildContext,
  decl: ts.VariableDeclaration,
): string | null {
  const awaitExpr = decl.initializer as ts.AwaitExpression;
  let callExpr: ts.Expression = awaitExpr.expression;

  // Resolve deferred promise: const y = await x → look up x's original call
  if (ts.isIdentifier(callExpr)) {
    const sym = ctx.compilerContext.checker.getSymbolAtLocation(callExpr);
    if (sym && ctx.cfg.deferredCalls?.has(sym)) {
      callExpr = ctx.cfg.deferredCalls.get(sym)!;
    }
  }

  if (!ts.isCallExpression(callExpr)) return null;

  const serviceCall = extractServiceCall(ctx, callExpr);
  if (!serviceCall) return null;

  // Get the variable name for ResultPath
  const varName = ts.isIdentifier(decl.name) ? decl.name.text : undefined;
  const resultPath = varName ? `$.${varName}` : null;

  // Register the variable as StateOutput
  if (varName && ts.isIdentifier(decl.name)) {
    const sym = ctx.compilerContext.checker.getSymbolAtLocation(decl.name);
    if (sym) {
      ctx.variables.addVariable(sym, {
        symbol: sym,
        type: StepVariableType.StateOutput,
        jsonPath: resultPath!,
        definitelyAssigned: true,
        constant: false,
      });
    }
  }

  const stateName = generateStateName(
    `Invoke_${serviceCall.serviceVarName}`,
    ctx.usedNames,
  );

  const taskState: TaskState = {
    Type: 'Task',
    Resource: serviceCall.resource,
    ...(serviceCall.parameters && { Parameters: serviceCall.parameters }),
    ...(resultPath && { ResultPath: resultPath }),
    ...(serviceCall.retry && { Retry: serviceCall.retry }),
    ...(serviceCall.timeoutSeconds != null && { TimeoutSeconds: serviceCall.timeoutSeconds }),
    ...(serviceCall.timeoutSecondsPath && { TimeoutSecondsPath: serviceCall.timeoutSecondsPath }),
    ...(serviceCall.heartbeatSeconds != null && { HeartbeatSeconds: serviceCall.heartbeatSeconds }),
    ...(serviceCall.heartbeatSecondsPath && { HeartbeatSecondsPath: serviceCall.heartbeatSecondsPath }),
    ...buildCatchRules(ctx),
  };

  ctx.states.set(stateName, taskState);
  return stateName;
}

function processAwaitFireAndForget(
  ctx: BuildContext,
  awaitExpr: ts.AwaitExpression,
): string | null {
  let callExpr: ts.Expression = awaitExpr.expression;

  // Resolve deferred promise: await x → look up x's original call
  if (ts.isIdentifier(callExpr)) {
    const sym = ctx.compilerContext.checker.getSymbolAtLocation(callExpr);
    if (sym && ctx.cfg.deferredCalls?.has(sym)) {
      callExpr = ctx.cfg.deferredCalls.get(sym)!;
    }
  }

  if (!ts.isCallExpression(callExpr)) return null;

  const serviceCall = extractServiceCall(ctx, callExpr);
  if (!serviceCall) return null;

  const stateName = generateStateName(
    `Invoke_${serviceCall.serviceVarName}`,
    ctx.usedNames,
  );

  const taskState: TaskState = {
    Type: 'Task',
    Resource: serviceCall.resource,
    ...(serviceCall.parameters && { Parameters: serviceCall.parameters }),
    ResultPath: null,
    ...(serviceCall.retry && { Retry: serviceCall.retry }),
    ...(serviceCall.timeoutSeconds != null && { TimeoutSeconds: serviceCall.timeoutSeconds }),
    ...(serviceCall.timeoutSecondsPath && { TimeoutSecondsPath: serviceCall.timeoutSecondsPath }),
    ...(serviceCall.heartbeatSeconds != null && { HeartbeatSeconds: serviceCall.heartbeatSeconds }),
    ...(serviceCall.heartbeatSecondsPath && { HeartbeatSecondsPath: serviceCall.heartbeatSecondsPath }),
    ...buildCatchRules(ctx),
  };

  ctx.states.set(stateName, taskState);
  return stateName;
}

function processAwaitReassignment(
  ctx: BuildContext,
  expr: ts.BinaryExpression,
): string | null {
  const awaitExpr = expr.right as ts.AwaitExpression;
  const callExpr = awaitExpr.expression;
  if (!ts.isCallExpression(callExpr)) return null;

  const serviceCall = extractServiceCall(ctx, callExpr);
  if (!serviceCall) return null;

  // Resolve the LHS identifier to get its existing jsonPath
  let resultPath: string | null = null;
  if (ts.isIdentifier(expr.left)) {
    const sym = ctx.compilerContext.checker.getSymbolAtLocation(expr.left);
    if (sym) {
      const varInfo = ctx.variables.getBySymbol(sym);
      if (varInfo && varInfo.jsonPath) {
        resultPath = varInfo.jsonPath;
      }
    }
  }

  const stateName = generateStateName(
    `Invoke_${serviceCall.serviceVarName}`,
    ctx.usedNames,
  );

  const taskState: TaskState = {
    Type: 'Task',
    Resource: serviceCall.resource,
    ...(serviceCall.parameters && { Parameters: serviceCall.parameters }),
    ...(resultPath && { ResultPath: resultPath }),
    ...(serviceCall.retry && { Retry: serviceCall.retry }),
    ...(serviceCall.timeoutSeconds != null && { TimeoutSeconds: serviceCall.timeoutSeconds }),
    ...(serviceCall.timeoutSecondsPath && { TimeoutSecondsPath: serviceCall.timeoutSecondsPath }),
    ...(serviceCall.heartbeatSeconds != null && { HeartbeatSeconds: serviceCall.heartbeatSeconds }),
    ...(serviceCall.heartbeatSecondsPath && { HeartbeatSecondsPath: serviceCall.heartbeatSecondsPath }),
    ...buildCatchRules(ctx),
  };

  ctx.states.set(stateName, taskState);
  return stateName;
}

// ---------------------------------------------------------------------------
// Steps.delay → Wait state
// ---------------------------------------------------------------------------

function processStepsDelay(
  ctx: BuildContext,
  callExpr: ts.CallExpression,
): string | null {
  // Check callee is Steps.delay
  if (!ts.isPropertyAccessExpression(callExpr.expression)) return null;
  const propAccess = callExpr.expression;
  if (!ts.isIdentifier(propAccess.expression) || propAccess.expression.text !== 'Steps') return null;
  if (propAccess.name.text !== 'delay') return null;

  const arg = callExpr.arguments[0];
  if (!arg || !ts.isObjectLiteralExpression(arg)) return null;

  const waitState: Partial<WaitState> = { Type: 'Wait' };

  for (const prop of arg.properties) {
    if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) continue;
    const key = prop.name.text;
    const resolved = resolveExpression(ctx.compilerContext, prop.initializer, ctx.variables.toResolution());

    if (key === 'seconds') {
      if (resolved.kind === 'literal' && typeof resolved.value === 'number') {
        (waitState as any).Seconds = resolved.value;
      } else if (resolved.kind === 'jsonpath') {
        (waitState as any).SecondsPath = resolved.path;
      }
    } else if (key === 'timestamp') {
      if (resolved.kind === 'literal' && typeof resolved.value === 'string') {
        (waitState as any).Timestamp = resolved.value;
      } else if (resolved.kind === 'jsonpath') {
        (waitState as any).TimestampPath = resolved.path;
      }
    } else if (key === 'secondsPath') {
      if (resolved.kind === 'literal' && typeof resolved.value === 'string') {
        (waitState as any).SecondsPath = resolved.value;
      }
    } else if (key === 'timestampPath') {
      if (resolved.kind === 'literal' && typeof resolved.value === 'string') {
        (waitState as any).TimestampPath = resolved.value;
      }
    }
  }

  const stateName = generateStateName('Wait', ctx.usedNames);
  ctx.states.set(stateName, waitState as WaitState);
  return stateName;
}

// ---------------------------------------------------------------------------
// Terminator processing
// ---------------------------------------------------------------------------

/**
 * Process a block's terminator. May emit additional states.
 * Returns the name of additional state(s) emitted, or null.
 * Also wires `lastStateName`'s Next/End as appropriate.
 */
function processTerminator(
  ctx: BuildContext,
  block: BasicBlock,
  lastStateName: string | null,
): string | null {
  const term = block.terminator;

  switch (term.kind) {
    case 'fall': {
      const targetFirst = processBlock(ctx, term.target);
      if (lastStateName && targetFirst) {
        patchNext(ctx.states, lastStateName, targetFirst);
      }
      // If this block had no statements, its first state IS the target's first state
      if (!lastStateName && targetFirst) {
        ctx.blockFirstState.set(block.id, targetFirst);
      }
      return lastStateName ? null : targetFirst;
    }

    case 'return': {
      return processReturnTerminator(ctx, term.expression, lastStateName);
    }

    case 'throw': {
      return processThrowTerminator(ctx, term.expression, lastStateName);
    }

    case 'branch': {
      // Process then and else blocks
      const thenFirst = processBlock(ctx, term.thenBlock);
      const elseFirst = processBlock(ctx, term.elseBlock);

      // Build choice rule
      const thenTarget = thenFirst ?? '';
      const elseTarget = elseFirst ?? '';

      const choiceRule = buildChoiceRule(
        ctx.compilerContext,
        term.condition,
        thenTarget,
        ctx.variables.toResolution(),
      );

      const choiceName = generateChoiceStateName(ctx, term.condition);
      const choiceState: ChoiceState = {
        Type: 'Choice',
        Choices: [choiceRule],
        Default: elseTarget,
      };

      ctx.states.set(choiceName, choiceState);

      // Wire the previous state to the choice
      if (lastStateName) {
        patchNext(ctx.states, lastStateName, choiceName);
      }

      return choiceName;
    }

    case 'ternaryAssign': {
      const resultPath = `$.${term.variableName}`;

      // Register variable BEFORE processing continuation (so it's in scope)
      ctx.variables.addVariable(term.variableSymbol, {
        symbol: term.variableSymbol,
        type: StepVariableType.StateOutput,
        jsonPath: resultPath,
        definitelyAssigned: true,
        constant: false,
      });

      // Process continuation block
      const contFirst = processBlock(ctx, term.continuation);

      // Resolve then/else values
      const thenResolved = resolveExpression(ctx.compilerContext, term.thenExpression, ctx.variables.toResolution());
      const elseResolved = resolveExpression(ctx.compilerContext, term.elseExpression, ctx.variables.toResolution());

      // Build Pass states for each branch
      const thenStateName = generateStateName(`Assign_${term.variableName}_true`, ctx.usedNames);
      const elseStateName = generateStateName(`Assign_${term.variableName}_false`, ctx.usedNames);

      buildTernaryBranchPass(ctx, thenStateName, thenResolved, resultPath, contFirst);
      buildTernaryBranchPass(ctx, elseStateName, elseResolved, resultPath, contFirst);

      // Build Choice state
      const choiceRule = buildChoiceRule(
        ctx.compilerContext,
        term.condition,
        thenStateName,
        ctx.variables.toResolution(),
      );
      const choiceName = generateChoiceStateName(ctx, term.condition);
      const choiceState: ChoiceState = {
        Type: 'Choice',
        Choices: [choiceRule],
        Default: elseStateName,
      };
      ctx.states.set(choiceName, choiceState);

      if (lastStateName) {
        patchNext(ctx.states, lastStateName, choiceName);
      }

      return choiceName;
    }

    case 'loop': {
      // Generate Choice name early so loopBack can reference it
      const choiceName = generateChoiceStateName(ctx, term.condition);
      ctx.blockFirstState.set(block.id, choiceName);

      // Now process body and exit blocks (body may contain loopBack referencing this block)
      const bodyFirst = processBlock(ctx, term.bodyBlock);
      const exitFirst = processBlock(ctx, term.exitBlock);

      const bodyTarget = bodyFirst ?? '';
      const exitTarget = exitFirst ?? '';

      // Build choice rule: condition true → body, default → exit
      const choiceRule = buildChoiceRule(
        ctx.compilerContext,
        term.condition,
        bodyTarget,
        ctx.variables.toResolution(),
      );

      const choiceState: ChoiceState = {
        Type: 'Choice',
        Choices: [choiceRule],
        Default: exitTarget,
      };

      ctx.states.set(choiceName, choiceState);

      if (lastStateName) {
        patchNext(ctx.states, lastStateName, choiceName);
      }

      return choiceName;
    }

    case 'loopBack': {
      // Wire back to the loop condition's Choice state
      const targetFirst = ctx.blockFirstState.get(term.target) ?? null;
      if (lastStateName && targetFirst) {
        patchNext(ctx.states, lastStateName, targetFirst);
      }
      // If this block has no states, propagate the target so parent blocks
      // falling to this empty block can wire through to the loop condition
      if (!lastStateName && targetFirst) {
        return targetFirst;
      }
      return null;
    }

    case 'break': {
      // Jump to the loop exit block
      const targetFirst = processBlock(ctx, term.target);
      if (lastStateName && targetFirst) {
        patchNext(ctx.states, lastStateName, targetFirst);
      }
      return null;
    }

    case 'continue': {
      // Jump back to the loop condition block
      const targetFirst = ctx.blockFirstState.get(term.target) ?? null;
      if (lastStateName && targetFirst) {
        patchNext(ctx.states, lastStateName, targetFirst);
      }
      return null;
    }

    case 'tryCatch': {
      return processTryCatchTerminator(ctx, term, block, lastStateName);
    }

    case 'mapState': {
      return processMapStateTerminator(ctx, term, block, lastStateName);
    }

    case 'parallel': {
      return processParallelTerminator(ctx, term, block, lastStateName);
    }

    default:
      return null;
  }
}

function processTryCatchTerminator(
  ctx: BuildContext,
  term: {
    readonly kind: 'tryCatch';
    readonly tryBlock: string;
    readonly catchParam?: string;
    readonly errorHandlers: readonly { readonly errorClassName: string; readonly blockId: string }[];
    readonly catchFallback?: string;
    readonly finallyBlock?: string;
    readonly mergeBlock: string;
  },
  block: BasicBlock,
  lastStateName: string | null,
): string | null {
  // Process error handler blocks first (we need their first state names for Catch rules)
  const catchRules: CatchRuleInfo[] = [];

  for (const handler of term.errorHandlers) {
    const handlerFirst = processBlock(ctx, handler.blockId);
    if (handlerFirst) {
      const aslErrorName = STEP_ERROR_NAMES[handler.errorClassName] ?? handler.errorClassName;
      catchRules.push({ errorEquals: [aslErrorName], target: handlerFirst });
    }
  }

  // Process fallback block (States.ALL)
  if (term.catchFallback) {
    const fallbackFirst = processBlock(ctx, term.catchFallback);
    if (fallbackFirst) {
      catchRules.push({ errorEquals: ['States.ALL'], target: fallbackFirst });
    }
  }

  // Push try-catch scope so Task states within the try block get Catch rules
  if (catchRules.length > 0) {
    ctx.tryCatchScopes.push({ catchRules, catchParam: term.catchParam });
  }

  // Process try block
  const tryFirst = processBlock(ctx, term.tryBlock);

  // Pop try-catch scope
  if (catchRules.length > 0) {
    ctx.tryCatchScopes.pop();
  }

  // Process finally block if present
  if (term.finallyBlock) {
    processBlock(ctx, term.finallyBlock);
  }

  // Process merge block
  processBlock(ctx, term.mergeBlock);

  // Wire lastStateName to tryFirst
  if (lastStateName && tryFirst) {
    patchNext(ctx.states, lastStateName, tryFirst);
  }

  // If this block had no statements, its first state is the try's first state
  if (!lastStateName && tryFirst) {
    ctx.blockFirstState.set(block.id, tryFirst);
    return tryFirst;
  }

  return null;
}

function processMapStateTerminator(
  ctx: BuildContext,
  term: {
    readonly kind: 'mapState';
    readonly expression?: ts.ForOfStatement;
    readonly itemsExpression: ts.Expression;
    readonly iterVarName: string;
    readonly iterVarSymbol?: ts.Symbol;
    readonly bodyBlock: string;
    readonly exitBlock: string;
    readonly collectResults: boolean;
    readonly maxConcurrency?: number;
    readonly resultBindingName?: string;
    readonly resultSymbol?: ts.Symbol;
    readonly retryExpression?: ts.Expression;
  },
  block: BasicBlock,
  lastStateName: string | null,
): string | null {
  // Resolve items expression to JSONPath
  const resolved = resolveExpression(
    ctx.compilerContext,
    term.itemsExpression,
    ctx.variables.toResolution(),
  );
  let itemsPath: string;
  if (resolved.kind === 'jsonpath') {
    itemsPath = resolved.path!;
  } else {
    const errorNode = term.expression ?? term.itemsExpression;
    ctx.compilerContext.addError(
      errorNode,
      `Cannot resolve iterable expression to a JSONPath reference. ` +
      `The for...of target must be an input field or service call result (e.g., input.items).`,
      ErrorCodes.Expr.UncompilableExpression.code,
    );
    itemsPath = '$.items'; // fallback to allow continued analysis
  }

  // Detect captured variables (outer StateOutput vars referenced inside body)
  const capturedVars = findCapturedVariables(ctx, term.bodyBlock, term.iterVarSymbol);

  // Build ItemSelector if there are captured variables
  let itemSelector: Record<string, string> | undefined;
  if (capturedVars.size > 0) {
    itemSelector = {};
    itemSelector[`${term.iterVarName}.$`] = '$$.Map.Item.Value';
    for (const [, capture] of capturedVars) {
      itemSelector[`${capture.name}.$`] = capture.jsonPath;
    }
  }

  // Create sub-context for the Map state's ItemProcessor
  const subCtx = createSubContext(ctx, term.iterVarName, term.iterVarSymbol, capturedVars);

  // Process the body block in the sub-context
  const bodyFirst = processBlock(subCtx, term.bodyBlock);

  // Collect sub-context states into ItemProcessor
  const subStates: Record<string, State> = {};
  for (const [name, state] of subCtx.states) {
    subStates[name] = state;
  }

  const mapStateName = generateStateName('Map_items', ctx.usedNames);

  if (!bodyFirst) {
    const errorNode = term.expression ?? term.itemsExpression;
    ctx.compilerContext.addError(
      errorNode,
      'Map body produced no states. The loop body must contain at least one await call or assignment.',
      ErrorCodes.Gen.EmptyStateMachine.code,
    );
  }

  // Determine ResultPath: collect results into a named variable, or discard
  const collectResultPath = term.collectResults && term.resultBindingName
    ? `$.${term.resultBindingName}`
    : undefined;

  // Extract retry rules from the options expression, if present
  const mapRetry = term.retryExpression
    ? extractRetryRules(ctx, term.retryExpression)
    : undefined;

  const mapState: MapState = {
    Type: 'Map',
    ItemsPath: itemsPath,
    ...(itemSelector && { ItemSelector: itemSelector }),
    ItemProcessor: {
      StartAt: bodyFirst ?? 'Empty',
      States: subStates,
    },
    ...(term.maxConcurrency != null && { MaxConcurrency: term.maxConcurrency }),
    ...(collectResultPath ? { ResultPath: collectResultPath } : { ResultPath: null }),
    ...(mapRetry && { Retry: mapRetry }),
    ...buildCatchRules(ctx),
  };

  ctx.states.set(mapStateName, mapState);

  // Register result variable so downstream states can reference it
  if (collectResultPath && term.resultSymbol) {
    ctx.variables.addVariable(term.resultSymbol, {
      symbol: term.resultSymbol,
      type: StepVariableType.StateOutput,
      jsonPath: collectResultPath,
      definitelyAssigned: true,
      constant: false,
    });
  }

  if (lastStateName) {
    patchNext(ctx.states, lastStateName, mapStateName);
  }

  // Process exit block and wire map state to it
  const exitFirst = processBlock(ctx, term.exitBlock);
  if (exitFirst) {
    patchNext(ctx.states, mapStateName, exitFirst);
  }

  return mapStateName;
}

function processParallelTerminator(
  ctx: BuildContext,
  term: {
    readonly kind: 'parallel';
    readonly branches: readonly ParallelBranch[];
    readonly resultBindings: readonly string[];
    readonly resultSymbols: readonly (ts.Symbol | undefined)[];
    readonly exitBlock: string;
  },
  block: BasicBlock,
  lastStateName: string | null,
): string | null {
  const branchDefs: StateMachineDefinition[] = [];

  for (const branch of term.branches) {
    if (branch.kind === 'expression') {
      // Direct expression branch — single service call → single Task
      const subCtx = createParallelBranchContext(ctx);
      const stateName = processBranchExpression(subCtx, branch.expression);

      const subStates: Record<string, State> = {};
      for (const [name, state] of subCtx.states) {
        subStates[name] = state;
      }

      branchDefs.push({
        StartAt: stateName ?? '',
        States: subStates,
      });
    } else {
      // Substep branch — multi-state sub-machine from inlined helper body
      const subCtx = createParallelBranchContext(ctx);
      const firstState = processBlock(subCtx, branch.bodyBlock);

      const subStates: Record<string, State> = {};
      for (const [name, state] of subCtx.states) {
        subStates[name] = state;
      }

      branchDefs.push({
        StartAt: firstState ?? '',
        States: subStates,
      });
    }
  }

  // --- ResultPath strategy ---
  // In ASL, omitting ResultPath defaults to "$" which replaces the entire
  // state input with the Parallel output — destroying any pre-existing
  // variables.  We use explicit ResultPath to preserve state.
  let parallelResultPath: string | null;

  if (term.resultBindings.length === 0 ||
      (term.resultBindings.length === 1 && term.resultBindings[0] === '_')) {
    // Fire-and-forget: discard output
    parallelResultPath = null;
  } else if (term.resultBindings.length === 1) {
    // Single binding: store array directly
    parallelResultPath = `$.${term.resultBindings[0]}`;
  } else {
    // Destructured: store at temp key, redistribute via Pass states
    parallelResultPath = '$.__parallel';
  }

  const parallelStateName = generateStateName('Parallel', ctx.usedNames);
  const parallelState: ParallelState = {
    Type: 'Parallel',
    Branches: branchDefs,
    ResultPath: parallelResultPath,
    ...buildCatchRules(ctx),
  };

  ctx.states.set(parallelStateName, parallelState);

  if (lastStateName) {
    patchNext(ctx.states, lastStateName, parallelStateName);
  }

  // For destructured bindings: emit Pass states to redistribute each
  // element from $.__parallel[i] into its own $.varName slot.
  let lastChainedState = parallelStateName;
  if (term.resultBindings.length > 1) {
    for (let i = 0; i < term.resultBindings.length; i++) {
      const name = term.resultBindings[i];
      const sym = term.resultSymbols[i];
      if (name === '_') continue;

      const assignName = generateStateName(`Assign_${name}`, ctx.usedNames);
      const assignState: PassState = {
        Type: 'Pass',
        InputPath: `$.__parallel[${i}]`,
        ResultPath: `$.${name}`,
      };
      ctx.states.set(assignName, assignState);
      patchNext(ctx.states, lastChainedState, assignName);
      lastChainedState = assignName;

      if (sym) {
        ctx.variables.addVariable(sym, {
          symbol: sym,
          type: StepVariableType.StateOutput,
          jsonPath: `$.${name}`,
          definitelyAssigned: true,
          constant: false,
        });
      }
    }
  } else if (term.resultBindings.length === 1 && term.resultBindings[0] !== '_') {
    // Single binding — register variable
    const sym = term.resultSymbols[0];
    if (sym) {
      ctx.variables.addVariable(sym, {
        symbol: sym,
        type: StepVariableType.StateOutput,
        jsonPath: `$.${term.resultBindings[0]}`,
        definitelyAssigned: true,
        constant: false,
      });
    }
  }

  // Wire to exit block
  const exitFirst = processBlock(ctx, term.exitBlock);
  if (exitFirst) {
    patchNext(ctx.states, lastChainedState, exitFirst);
  }

  return parallelStateName;
}

/**
 * Create a sub-context for a parallel branch.
 * Inherits external service bindings from the parent context.
 */
function createParallelBranchContext(ctx: BuildContext): BuildContext {
  const subVariables = new VRBClass();
  // Copy all resolvable variables from outer scope — each Parallel branch
  // receives the same $ input, so StateOutput paths remain valid.
  for (const [sym, info] of ctx.variables.variables) {
    subVariables.addVariable(sym, info);
  }

  return {
    compilerContext: ctx.compilerContext,
    cfg: ctx.cfg,
    callSite: ctx.callSite,
    serviceRegistry: ctx.serviceRegistry,
    variables: subVariables,
    states: new Map<string, State>(),
    visited: new Set<string>(),
    usedNames: new Set<string>(),
    blockFirstState: new Map<string, string>(),
    tryCatchScopes: [],
  };
}

/**
 * Process a single branch expression in a Promise.all context.
 * Handles service call expressions like svc.method(args).
 */
function processBranchExpression(
  ctx: BuildContext,
  expr: ts.Expression,
): string | null {
  // Unwrap await if present (Promise.all args may or may not have inner awaits)
  let callExpr = expr;
  if (ts.isAwaitExpression(expr)) {
    callExpr = expr.expression;
  }

  if (!ts.isCallExpression(callExpr)) return null;

  const serviceCall = extractServiceCall(ctx, callExpr as ts.CallExpression);
  if (!serviceCall) return null;

  const stateName = generateStateName(
    `Invoke_${serviceCall.serviceVarName}`,
    ctx.usedNames,
  );

  const taskState: TaskState = {
    Type: 'Task',
    Resource: serviceCall.resource,
    ...(serviceCall.parameters && { Parameters: serviceCall.parameters }),
    ...(serviceCall.retry && { Retry: serviceCall.retry }),
    ...(serviceCall.timeoutSeconds != null && { TimeoutSeconds: serviceCall.timeoutSeconds }),
    ...(serviceCall.timeoutSecondsPath && { TimeoutSecondsPath: serviceCall.timeoutSecondsPath }),
    ...(serviceCall.heartbeatSeconds != null && { HeartbeatSeconds: serviceCall.heartbeatSeconds }),
    ...(serviceCall.heartbeatSecondsPath && { HeartbeatSecondsPath: serviceCall.heartbeatSecondsPath }),
    End: true,
  };

  ctx.states.set(stateName, taskState);
  return stateName;
}

function processReturnTerminator(
  ctx: BuildContext,
  expression: ts.Expression | undefined,
  lastStateName: string | null,
): string | null {
  if (!expression) {
    // Void return — mark last state as End
    if (lastStateName) {
      patchEnd(ctx.states, lastStateName);
    }
    return null;
  }

  // return await svc.call(...) → Task state with End: true
  if (ts.isAwaitExpression(expression) && ts.isCallExpression(expression.expression)) {
    const serviceCall = extractServiceCall(ctx, expression.expression);
    if (serviceCall) {
      const stateName = generateStateName(
        `Invoke_${serviceCall.serviceVarName}`,
        ctx.usedNames,
      );
      const taskState: TaskState = {
        Type: 'Task',
        Resource: serviceCall.resource,
        ...(serviceCall.parameters && { Parameters: serviceCall.parameters }),
        ...(serviceCall.retry && { Retry: serviceCall.retry }),
        ...(serviceCall.timeoutSeconds != null && { TimeoutSeconds: serviceCall.timeoutSeconds }),
        ...(serviceCall.timeoutSecondsPath && { TimeoutSecondsPath: serviceCall.timeoutSecondsPath }),
        ...(serviceCall.heartbeatSeconds != null && { HeartbeatSeconds: serviceCall.heartbeatSeconds }),
        ...(serviceCall.heartbeatSecondsPath && { HeartbeatSecondsPath: serviceCall.heartbeatSecondsPath }),
        ...buildCatchRules(ctx),
        End: true,
      };
      ctx.states.set(stateName, taskState);
      if (lastStateName) {
        patchNext(ctx.states, lastStateName, stateName);
      }
      return stateName;
    }
  }

  // Object literal return → Pass state with Parameters
  if (ts.isObjectLiteralExpression(expression)) {
    const params = buildParameters(
      ctx.compilerContext,
      expression,
      ctx.variables.toResolution(),
    );

    const stateName = generateStateName('Return_Result', ctx.usedNames);
    const passState: PassState = {
      Type: 'Pass',
      Parameters: params,
      End: true,
    };

    ctx.states.set(stateName, passState);

    if (lastStateName) {
      patchNext(ctx.states, lastStateName, stateName);
    }

    return stateName;
  }

  // Variable reference return → Pass state reshaping output
  const resolved = resolveExpression(
    ctx.compilerContext,
    expression,
    ctx.variables.toResolution(),
  );

  if (resolved.kind === 'jsonpath') {
    // Optimization: if returning the full result of the preceding Task state,
    // merge by removing ResultPath and setting End: true on the Task directly.
    // This avoids emitting a redundant Pass state.
    if (lastStateName) {
      const lastState = ctx.states.get(lastStateName);
      if (lastState && lastState.Type === 'Task' &&
          (lastState as TaskState).ResultPath === resolved.path) {
        const { ResultPath, ...rest } = lastState as TaskState;
        ctx.states.set(lastStateName, { ...rest, End: true } as unknown as TaskState);
        return lastStateName;
      }
    }

    const stateName = generateStateName('Return_Result', ctx.usedNames);
    const passState: PassState = {
      Type: 'Pass',
      InputPath: resolved.path,
      End: true,
    };
    ctx.states.set(stateName, passState);

    if (lastStateName) {
      patchNext(ctx.states, lastStateName, stateName);
    }
    return stateName;
  }

  if (resolved.kind === 'intrinsic') {
    const stateName = generateStateName('Return_Result', ctx.usedNames);
    const passState: PassState = {
      Type: 'Pass',
      Parameters: { 'result.$': resolved.path },
      End: true,
    };
    ctx.states.set(stateName, passState);

    if (lastStateName) {
      patchNext(ctx.states, lastStateName, stateName);
    }
    return stateName;
  }

  if (resolved.kind === 'literal') {
    const stateName = generateStateName('Return_Result', ctx.usedNames);
    const passState: PassState = {
      Type: 'Pass',
      Result: resolved.value,
      End: true,
    };
    ctx.states.set(stateName, passState);

    if (lastStateName) {
      patchNext(ctx.states, lastStateName, stateName);
    }
    return stateName;
  }

  // If we can't resolve the return expression, just mark End
  if (lastStateName) {
    patchEnd(ctx.states, lastStateName);
  }
  return null;
}

function processThrowTerminator(
  ctx: BuildContext,
  expression: ts.Expression,
  lastStateName: string | null,
): string | null {
  const stateName = generateStateName('Throw_Error', ctx.usedNames);

  let failState: FailState;

  // throw new ClassName(message) — extract class name and message
  if (ts.isNewExpression(expression)) {
    const className = ts.isIdentifier(expression.expression)
      ? expression.expression.text
      : undefined;

    const errorName = className
      ? (STEP_ERROR_NAMES[className] ?? className)
      : 'StepException';

    // Extract first argument as Cause
    const firstArg = expression.arguments?.[0];
    if (firstArg) {
      const resolved = resolveExpression(
        ctx.compilerContext,
        firstArg,
        ctx.variables.toResolution(),
      );
      if (resolved.kind === 'literal' && typeof resolved.value === 'string') {
        failState = { Type: 'Fail', Error: errorName, Cause: resolved.value };
      } else if (resolved.kind === 'jsonpath') {
        failState = { Type: 'Fail', Error: errorName, CausePath: resolved.path };
      } else {
        failState = { Type: 'Fail', Error: errorName };
      }
    } else {
      failState = { Type: 'Fail', Error: errorName };
    }
  } else {
    // throw expr (not a new expression) — fallback
    failState = { Type: 'Fail', Error: 'StepException' };
  }

  ctx.states.set(stateName, failState);

  if (lastStateName) {
    patchNext(ctx.states, lastStateName, stateName);
  }

  return stateName;
}

// ---------------------------------------------------------------------------
// Service call extraction
// ---------------------------------------------------------------------------

interface ExtractedServiceCall {
  serviceVarName: string;
  resource: string | Record<string, unknown>;
  parameters?: Record<string, unknown>;
  methodInfo: ServiceMethodInfo;
  retry?: readonly RetryRule[];
  timeoutSeconds?: number;
  timeoutSecondsPath?: string;
  heartbeatSeconds?: number;
  heartbeatSecondsPath?: string;
}

function extractServiceCall(
  ctx: BuildContext,
  callExpr: ts.CallExpression,
): ExtractedServiceCall | null {
  // Expect: serviceVar.method(args)
  if (!ts.isPropertyAccessExpression(callExpr.expression)) return null;

  const propAccess = callExpr.expression;
  const methodName = propAccess.name.text;
  const serviceExpr = propAccess.expression;

  if (!ts.isIdentifier(serviceExpr)) return null;

  const serviceVarName = serviceExpr.text;
  const serviceSymbol = ctx.compilerContext.checker.getSymbolAtLocation(serviceExpr);
  if (!serviceSymbol) return null;

  // Look up this variable in our resolution
  const varInfo = ctx.variables.getBySymbol(serviceSymbol);
  if (!varInfo || varInfo.type !== StepVariableType.External) return null;

  // Get the service binding from the registry
  const serviceName = varInfo.serviceBinding;
  if (!serviceName) return null;

  const binding = ctx.serviceRegistry.bindings.get(serviceName);
  if (!binding) return null;

  const methodInfo = binding.methods.get(methodName);
  if (!methodInfo) {
    ctx.compilerContext.addError(
      callExpr,
      `Unknown service method: ${serviceName}.${methodName}`,
      ErrorCodes.Gen.UnknownServiceMethod.code,
    );
    return null;
  }

  // Determine the resource
  let resource: string | Record<string, unknown>;
  if (methodInfo.integration === 'direct') {
    // Direct integration: resource is the ARN from the variable initializer
    const resourceValue = varInfo.literalValue;
    if (resourceValue === undefined || resourceValue === null) {
      ctx.compilerContext.addError(
        callExpr,
        `Cannot determine ARN for service binding: ${serviceVarName}. Provide a string literal ARN or use the substitutions option`,
        ErrorCodes.Gen.MissingResourceArn.code,
      );
      return null;
    }
    resource = resourceValue as string | Record<string, unknown>;
  } else {
    // SDK integration: resource is the sdkResource from the method mapping
    resource = methodInfo.sdkResource ?? '';
  }

  // Build parameters from arguments
  let parameters: Record<string, unknown> | undefined;
  const arg = callExpr.arguments[0];
  if (arg && ts.isObjectLiteralExpression(arg)) {
    parameters = buildParameters(
      ctx.compilerContext,
      arg,
      ctx.variables.toResolution(),
    );
  }

  // SDK parameter shaping: wrap user params with resource key + param key
  if (methodInfo.integration === 'sdk') {
    const shape = SDK_PARAM_SHAPE[binding.className]?.[methodInfo.methodName];
    if (shape) {
      parameters = {
        [shape.resourceKey]: varInfo.literalValue,
        ...(parameters && { [shape.paramKey]: parameters }),
        ...shape.extraParams,
      };
    } else {
      // Simple resource injection: merge resource value as a single key (e.g., S3 Bucket)
      const injectKey = SDK_RESOURCE_INJECT[binding.className];
      if (injectKey && varInfo.literalValue !== undefined) {
        parameters = { [injectKey]: varInfo.literalValue, ...parameters };
      }
    }
  }

  // Extract task options (retry, timeout, heartbeat) from 2nd argument
  const taskOptions = extractTaskOptions(ctx, callExpr);

  return {
    serviceVarName,
    resource,
    parameters,
    methodInfo,
    ...taskOptions,
  };
}

// ---------------------------------------------------------------------------
// Task options extraction (retry, timeout, heartbeat)
// ---------------------------------------------------------------------------

/**
 * Extract task-level options from the 2nd argument of a service call.
 * Supports: retry, timeoutSeconds, heartbeatSeconds.
 */
function extractTaskOptions(
  ctx: BuildContext,
  callExpr: ts.CallExpression,
): Pick<ExtractedServiceCall, 'retry' | 'timeoutSeconds' | 'timeoutSecondsPath' | 'heartbeatSeconds' | 'heartbeatSecondsPath'> {
  const optionsArg = callExpr.arguments[1];
  if (!optionsArg || !ts.isObjectLiteralExpression(optionsArg)) return {};

  const result: {
    retry?: readonly RetryRule[];
    timeoutSeconds?: number;
    timeoutSecondsPath?: string;
    heartbeatSeconds?: number;
    heartbeatSecondsPath?: string;
  } = {};

  for (const prop of optionsArg.properties) {
    if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) continue;
    const name = prop.name.text;

    if (name === 'retry') {
      result.retry = extractRetryRules(ctx, prop.initializer);
    } else if (name === 'timeoutSeconds') {
      const resolved = resolveExpression(ctx.compilerContext, prop.initializer, ctx.variables.toResolution());
      if (resolved.kind === 'literal' && typeof resolved.value === 'number') {
        result.timeoutSeconds = resolved.value;
      } else if (resolved.kind === 'jsonpath') {
        result.timeoutSecondsPath = resolved.path;
      }
    } else if (name === 'heartbeatSeconds') {
      const resolved = resolveExpression(ctx.compilerContext, prop.initializer, ctx.variables.toResolution());
      if (resolved.kind === 'literal' && typeof resolved.value === 'number') {
        result.heartbeatSeconds = resolved.value;
      } else if (resolved.kind === 'jsonpath') {
        result.heartbeatSecondsPath = resolved.path;
      }
    }
  }

  return result;
}

/**
 * Extract retry rules from a retry option value.
 * Supports a single object literal or an array of object literals.
 */
function extractRetryRules(
  ctx: BuildContext,
  expr: ts.Expression,
): readonly RetryRule[] | undefined {
  // Support both single retry config and array of retry configs
  const retryExprs: ts.ObjectLiteralExpression[] = [];

  if (ts.isObjectLiteralExpression(expr)) {
    retryExprs.push(expr);
  } else if (ts.isArrayLiteralExpression(expr)) {
    for (const el of expr.elements) {
      if (ts.isObjectLiteralExpression(el)) {
        retryExprs.push(el);
      }
    }
  }

  if (retryExprs.length === 0) return undefined;

  const rules: RetryRule[] = [];
  for (const retryObj of retryExprs) {
    const rule = extractSingleRetryRule(ctx, retryObj);
    if (rule) rules.push(rule);
  }

  return rules.length > 0 ? rules : undefined;
}

function extractSingleRetryRule(
  ctx: BuildContext,
  obj: ts.ObjectLiteralExpression,
): RetryRule | null {
  let errorEquals: string[] | undefined;
  let intervalSeconds: number | undefined;
  let maxAttempts: number | undefined;
  let backoffRate: number | undefined;
  let maxDelaySeconds: number | undefined;
  let jitterStrategy: 'FULL' | 'NONE' | undefined;

  for (const prop of obj.properties) {
    if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) continue;
    const name = prop.name.text;
    const resolved = resolveExpression(ctx.compilerContext, prop.initializer, ctx.variables.toResolution());

    switch (name) {
      case 'errorEquals':
        if (ts.isArrayLiteralExpression(prop.initializer)) {
          errorEquals = errorEquals ?? [];
          for (const el of prop.initializer.elements) {
            const elResolved = resolveExpression(ctx.compilerContext, el, ctx.variables.toResolution());
            if (elResolved.kind === 'literal' && typeof elResolved.value === 'string') {
              errorEquals.push(elResolved.value);
            }
          }
        }
        break;
      case 'errors':
        if (ts.isArrayLiteralExpression(prop.initializer)) {
          errorEquals = errorEquals ?? [];
          for (const el of prop.initializer.elements) {
            if (ts.isIdentifier(el)) {
              const className = el.text;
              const aslName = STEP_ERROR_NAMES[className] ?? className;
              errorEquals.push(aslName);
            }
          }
        }
        break;
      case 'intervalSeconds':
        if (resolved.kind === 'literal' && typeof resolved.value === 'number') {
          intervalSeconds = resolved.value;
        }
        break;
      case 'maxAttempts':
        if (resolved.kind === 'literal' && typeof resolved.value === 'number') {
          maxAttempts = resolved.value;
        }
        break;
      case 'backoffRate':
        if (resolved.kind === 'literal' && typeof resolved.value === 'number') {
          backoffRate = resolved.value;
        }
        break;
      case 'maxDelaySeconds':
        if (resolved.kind === 'literal' && typeof resolved.value === 'number') {
          maxDelaySeconds = resolved.value;
        }
        break;
      case 'jitterStrategy':
        if (resolved.kind === 'literal' && (resolved.value === 'FULL' || resolved.value === 'NONE')) {
          jitterStrategy = resolved.value;
        }
        break;
    }
  }

  return {
    ErrorEquals: errorEquals ?? ['States.ALL'],
    ...(intervalSeconds != null && { IntervalSeconds: intervalSeconds }),
    ...(maxAttempts != null && { MaxAttempts: maxAttempts }),
    ...(backoffRate != null && { BackoffRate: backoffRate }),
    ...(maxDelaySeconds != null && { MaxDelaySeconds: maxDelaySeconds }),
    ...(jitterStrategy && { JitterStrategy: jitterStrategy }),
  };
}

// ---------------------------------------------------------------------------
// Try-catch helpers
// ---------------------------------------------------------------------------

function buildCatchRules(ctx: BuildContext): { Catch?: readonly CatchRule[] } {
  if (ctx.tryCatchScopes.length === 0) return {};

  const scope = ctx.tryCatchScopes[ctx.tryCatchScopes.length - 1];
  const resultPath = scope.catchParam ? `$.${scope.catchParam}` : '$.error';

  return {
    Catch: scope.catchRules.map(rule => ({
      ErrorEquals: rule.errorEquals,
      Next: rule.target,
      ResultPath: resultPath,
    })),
  };
}

// ---------------------------------------------------------------------------
// Sub-context for Map states
// ---------------------------------------------------------------------------

interface CapturedVariable {
  readonly name: string;
  readonly jsonPath: string;
}

/**
 * Walk CFG blocks reachable from `startId` and find outer StateOutput variables
 * referenced in the body. These need to be projected via ItemSelector.
 */
function findCapturedVariables(
  ctx: BuildContext,
  startId: string,
  iterVarSymbol: ts.Symbol | undefined,
): Map<ts.Symbol, CapturedVariable> {
  const captured = new Map<ts.Symbol, CapturedVariable>();

  // Collect all reachable blocks
  const visited = new Set<string>();
  const blocks: BasicBlock[] = [];
  const queue = [startId];
  while (queue.length > 0) {
    const id = queue.shift()!;
    if (visited.has(id)) continue;
    visited.add(id);
    const block = ctx.cfg.blocks.get(id);
    if (!block) continue;
    blocks.push(block);
    const t = block.terminator;
    if (t.kind === 'fall') queue.push(t.target);
    else if (t.kind === 'branch') { queue.push(t.thenBlock); queue.push(t.elseBlock); }
    else if (t.kind === 'return' || t.kind === 'throw') { /* terminal */ }
    else if (t.kind === 'loop') { queue.push(t.bodyBlock); queue.push(t.exitBlock); }
    else if (t.kind === 'loopBack') queue.push(t.target);
    else if (t.kind === 'mapState') { queue.push(t.bodyBlock); queue.push(t.exitBlock); }
    else if (t.kind === 'tryCatch') {
      queue.push(t.tryBlock);
      if (t.catchFallback) queue.push(t.catchFallback);
      queue.push(t.mergeBlock);
      for (const h of t.errorHandlers) queue.push(h.blockId);
    }
    else if (t.kind === 'parallel') {
      queue.push(t.exitBlock);
      for (const b of t.branches) {
        if (b.kind === 'substep') queue.push(b.bodyBlock);
      }
    }
    else if (t.kind === 'ternaryAssign') queue.push(t.continuation);
    else if (t.kind === 'break') queue.push(t.target);
    else if (t.kind === 'continue') queue.push(t.target);
  }

  // Walk all AST nodes in those blocks to find identifier references
  const checker = ctx.compilerContext.checker;
  function visitNode(node: ts.Node): void {
    if (ts.isIdentifier(node)) {
      const sym = checker.getSymbolAtLocation(node);
      if (sym && sym !== iterVarSymbol && !captured.has(sym)) {
        const varInfo = ctx.variables.getBySymbol(sym);
        if (varInfo && varInfo.type === StepVariableType.StateOutput && varInfo.jsonPath) {
          // Extract the top-level binding name from the jsonPath (e.g., "$.prefix" → "prefix")
          const match = varInfo.jsonPath.match(/^\$\.(\w+)/);
          if (match) {
            captured.set(sym, { name: match[1], jsonPath: varInfo.jsonPath });
          }
        }
      }
    }
    ts.forEachChild(node, visitNode);
  }

  for (const block of blocks) {
    for (const stmt of block.statements) {
      visitNode(stmt);
    }
    // Also check terminator expressions
    const t = block.terminator;
    if (t.kind === 'return' && t.expression) visitNode(t.expression);
    if (t.kind === 'branch') visitNode(t.condition);
    if (t.kind === 'loop') visitNode(t.condition);
    if (t.kind === 'ternaryAssign') {
      visitNode(t.condition);
      visitNode(t.thenExpression);
      visitNode(t.elseExpression);
    }
  }

  return captured;
}

function createSubContext(
  ctx: BuildContext,
  iterationVarName: string,
  iterationVarSymbol: ts.Symbol | undefined,
  capturedVars?: Map<ts.Symbol, CapturedVariable>,
): BuildContext {
  // Clone variables builder: copy service bindings and constants from outer scope
  const subVariables = new VRBClass();
  for (const [sym, info] of ctx.variables.variables) {
    if (info.type === StepVariableType.External || info.type === StepVariableType.Constant) {
      subVariables.addVariable(sym, info);
    }
  }

  // With captures: iteration var is at $.iterVarName instead of $
  const iterPath = capturedVars?.size ? `$.${iterationVarName}` : '$';

  // Register the iteration variable
  if (iterationVarSymbol) {
    subVariables.addVariable(iterationVarSymbol, {
      symbol: iterationVarSymbol,
      type: StepVariableType.Input,
      jsonPath: iterPath,
      definitelyAssigned: true,
      constant: true,
    });
    subVariables.inputSymbol = iterationVarSymbol;
  }

  // Register captured variables with their projected paths inside the Map
  if (capturedVars) {
    for (const [sym, capture] of capturedVars) {
      subVariables.addVariable(sym, {
        symbol: sym,
        type: StepVariableType.StateOutput,
        jsonPath: `$.${capture.name}`,
        definitelyAssigned: true,
        constant: false,
      });
    }
  }

  return {
    compilerContext: ctx.compilerContext,
    cfg: ctx.cfg,
    callSite: ctx.callSite,
    serviceRegistry: ctx.serviceRegistry,
    variables: subVariables,
    states: new Map(),
    visited: new Set(),
    blockFirstState: new Map(),
    usedNames: new Set(),
    tryCatchScopes: [],
  };
}

// ---------------------------------------------------------------------------
// Ternary branch Pass state builder
// ---------------------------------------------------------------------------

function buildTernaryBranchPass(
  ctx: BuildContext,
  stateName: string,
  resolved: { kind: string; value?: unknown; path?: string },
  resultPath: string,
  nextState: string | null,
): void {
  const passState: Record<string, unknown> = { Type: 'Pass', ResultPath: resultPath };

  if (resolved.kind === 'literal') {
    passState.Result = resolved.value;
  } else if (resolved.kind === 'jsonpath' && resolved.path) {
    passState.InputPath = resolved.path;
  } else if (resolved.kind === 'intrinsic' && resolved.path) {
    passState.Parameters = { 'value.$': resolved.path };
  }

  if (nextState) {
    passState.Next = nextState;
  } else {
    passState.End = true;
  }

  ctx.states.set(stateName, passState as unknown as State);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateStateName(prefix: string, usedNames: Set<string>): string {
  let candidate = prefix;
  let suffix = 2;
  while (usedNames.has(candidate)) {
    candidate = `${prefix}_${suffix}`;
    suffix++;
  }
  usedNames.add(candidate);
  return candidate;
}

function generateChoiceStateName(ctx: BuildContext, condition: ts.Expression): string {
  // Try to derive a meaningful name from the condition
  let label = 'Choice';

  if (ts.isBinaryExpression(condition)) {
    const left = condition.left;
    if (ts.isPropertyAccessExpression(left)) {
      label = `Check_${left.name.text}`;
    } else if (ts.isIdentifier(left)) {
      label = `Check_${left.text}`;
    }
  } else if (ts.isPrefixUnaryExpression(condition)) {
    const operand = condition.operand;
    if (ts.isPropertyAccessExpression(operand)) {
      label = `Check_${operand.name.text}`;
    } else if (ts.isIdentifier(operand)) {
      label = `Check_${operand.text}`;
    }
  }

  return generateStateName(label, ctx.usedNames);
}

function patchNext(states: Map<string, State>, stateName: string, nextState: string): void {
  const state = states.get(stateName);
  if (!state) return;

  // Don't overwrite End or existing Next
  if ('End' in state && state.End) return;
  if ('Next' in state && state.Next) return;

  // Choice states don't have Next — they use Choices[].Next and Default
  if (state.Type === 'Choice' || state.Type === 'Fail' || state.Type === 'Succeed') return;

  states.set(stateName, { ...state, Next: nextState } as State);
}

function patchEnd(states: Map<string, State>, stateName: string): void {
  const state = states.get(stateName);
  if (!state) return;

  if (state.Type === 'Choice' || state.Type === 'Fail' || state.Type === 'Succeed') return;
  if ('Next' in state && state.Next) return;

  states.set(stateName, { ...state, End: true } as State);
}

function isSimpleLiteral(expr: ts.Expression): boolean {
  return ts.isStringLiteral(expr) ||
    ts.isNumericLiteral(expr) ||
    expr.kind === ts.SyntaxKind.TrueKeyword ||
    expr.kind === ts.SyntaxKind.FalseKeyword ||
    expr.kind === ts.SyntaxKind.NullKeyword;
}

function registerConstant(ctx: BuildContext, decl: ts.VariableDeclaration): void {
  if (!ts.isIdentifier(decl.name) || !decl.initializer) return;

  const sym = ctx.compilerContext.checker.getSymbolAtLocation(decl.name);
  if (!sym) return;

  let value: unknown;
  if (ts.isStringLiteral(decl.initializer)) value = decl.initializer.text;
  else if (ts.isNumericLiteral(decl.initializer)) value = Number(decl.initializer.text);
  else if (decl.initializer.kind === ts.SyntaxKind.TrueKeyword) value = true;
  else if (decl.initializer.kind === ts.SyntaxKind.FalseKeyword) value = false;
  else if (decl.initializer.kind === ts.SyntaxKind.NullKeyword) value = null;

  ctx.variables.addVariable(sym, {
    symbol: sym,
    type: StepVariableType.Constant,
    definitelyAssigned: true,
    constant: true,
    literalValue: value,
  });
}
