import ts from 'typescript';
import { CompilerContext } from '../compilerContext.js';
import { ErrorCodes } from '../diagnosticCodes.js';
import type { ControlFlowGraph, BasicBlock } from '../cfg/types.js';
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
} from '../../asl/types.js';

// ---------------------------------------------------------------------------
// SDK parameter shaping
// ---------------------------------------------------------------------------

const SDK_PARAM_SHAPE: Record<string, Record<string, {
  resourceKey: string;
  paramKey: string;
  extraParams?: Record<string, unknown>;
}>> = {
  Lambda: {
    callAsync: { resourceKey: 'FunctionName', paramKey: 'Payload', extraParams: { InvocationType: 'Event' } },
    callWithCallback: { resourceKey: 'FunctionName', paramKey: 'Payload' },
  },
  SimpleQueueService: {
    publish: { resourceKey: 'QueueUrl', paramKey: 'MessageBody' },
    publishWithCallback: { resourceKey: 'QueueUrl', paramKey: 'MessageBody' },
  },
  SNS: {
    publish: { resourceKey: 'TopicArn', paramKey: 'Message' },
  },
  StepFunction: {
    startExecution: { resourceKey: 'StateMachineArn', paramKey: 'Input' },
    startExecutionAsync: { resourceKey: 'StateMachineArn', paramKey: 'Input' },
    startExecutionWithCallback: { resourceKey: 'StateMachineArn', paramKey: 'Input' },
  },
  EventBridge: {
    putEvent: { resourceKey: 'EventBusName', paramKey: 'Detail' },
  },
  Batch: {
    submitJob: { resourceKey: 'JobQueue', paramKey: 'Parameters' },
    submitJobAsync: { resourceKey: 'JobQueue', paramKey: 'Parameters' },
  },
};

/**
 * Simple resource injection for SDK services that take a resource identifier
 * as a constructor arg but pass parameters flat (not nested under a single key).
 * E.g., S3 injects { Bucket: constructorArg, ...userParams }.
 */
const SDK_RESOURCE_INJECT: Record<string, string> = {
  DynamoDB: 'TableName',
  S3: 'Bucket',
  SimpleQueueService: 'QueueUrl',
  ECS: 'Cluster',
  Bedrock: 'ModelId',
  Glue: 'JobName',
  CodeBuild: 'ProjectName',
};

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
  const callExpr = awaitExpr.expression;
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
    ...buildCatchRules(ctx),
  };

  ctx.states.set(stateName, taskState);
  return stateName;
}

function processAwaitFireAndForget(
  ctx: BuildContext,
  awaitExpr: ts.AwaitExpression,
): string | null {
  const callExpr = awaitExpr.expression;
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
    readonly expression: ts.ForOfStatement;
    readonly bodyBlock: string;
    readonly exitBlock: string;
    readonly collectResults: boolean;
  },
  block: BasicBlock,
  lastStateName: string | null,
): string | null {
  const forOfStmt = term.expression;

  // Extract iterable → resolve to JSONPath
  const iterableExpr = forOfStmt.expression;
  const resolved = resolveExpression(
    ctx.compilerContext,
    iterableExpr,
    ctx.variables.toResolution(),
  );
  let itemsPath: string;
  if (resolved.kind === 'jsonpath') {
    itemsPath = resolved.path!;
  } else {
    ctx.compilerContext.addError(
      iterableExpr,
      `Cannot resolve iterable expression to a JSONPath reference. ` +
      `The for...of target must be an input field or service call result (e.g., input.items).`,
      ErrorCodes.Expr.UncompilableExpression.code,
    );
    itemsPath = '$.items'; // fallback to allow continued analysis
  }

  // Extract iteration variable name
  let iterVarName = 'item';
  let iterVarSymbol: ts.Symbol | undefined;
  if (ts.isVariableDeclarationList(forOfStmt.initializer)) {
    const decl = forOfStmt.initializer.declarations[0];
    if (decl && ts.isIdentifier(decl.name)) {
      iterVarName = decl.name.text;
      iterVarSymbol = ctx.compilerContext.checker.getSymbolAtLocation(decl.name);
    }
  }

  // Create sub-context for the Map state's ItemProcessor
  const subCtx = createSubContext(ctx, iterVarName, iterVarSymbol);

  // Process the body block in the sub-context
  const bodyFirst = processBlock(subCtx, term.bodyBlock);

  // Collect sub-context states into ItemProcessor
  const subStates: Record<string, State> = {};
  for (const [name, state] of subCtx.states) {
    subStates[name] = state;
  }

  const mapStateName = generateStateName('Map_items', ctx.usedNames);

  if (!bodyFirst) {
    ctx.compilerContext.addError(
      forOfStmt,
      'for...of loop body produced no states. The loop body must contain at least one await call or assignment.',
      ErrorCodes.Gen.EmptyStateMachine.code,
    );
  }

  const mapState: MapState = {
    Type: 'Map',
    ItemsPath: itemsPath,
    ItemProcessor: {
      StartAt: bodyFirst ?? 'Empty',
      States: subStates,
    },
    ...(!term.collectResults && { ResultPath: null }),
  };

  ctx.states.set(mapStateName, mapState);

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
    readonly branches: readonly ts.Expression[];
    readonly resultBindings: readonly string[];
    readonly resultSymbols: readonly (ts.Symbol | undefined)[];
    readonly exitBlock: string;
  },
  block: BasicBlock,
  lastStateName: string | null,
): string | null {
  const branchDefs: StateMachineDefinition[] = [];

  for (const branchExpr of term.branches) {
    // Create a sub-context for each parallel branch
    const subCtx = createParallelBranchContext(ctx);

    // Each branch expression is typically a service call — process it as a single statement
    const stateName = processBranchExpression(subCtx, branchExpr);

    // Collect sub-context states
    const subStates: Record<string, State> = {};
    for (const [name, state] of subCtx.states) {
      subStates[name] = state;
    }

    branchDefs.push({
      StartAt: stateName ?? '',
      States: subStates,
    });
  }

  const parallelStateName = generateStateName('Parallel', ctx.usedNames);

  // Build ResultSelector if we have named result bindings from destructuring
  let resultSelector: Record<string, unknown> | undefined;
  const isDestructured = term.resultBindings.length > 1 ||
    (term.resultBindings.length === 1 && term.resultBindings[0] !== '_');

  if (isDestructured && term.resultBindings.length > 1) {
    // Array destructuring: const [a, b] = await Promise.all([...])
    // Parallel state output is an array; use ResultSelector to map positions to names
    resultSelector = {};
    for (let i = 0; i < term.resultBindings.length; i++) {
      const name = term.resultBindings[i];
      if (name !== '_') {
        resultSelector[`${name}.$`] = `$[${i}]`;
      }
    }
  }

  const parallelState: ParallelState = {
    Type: 'Parallel',
    Branches: branchDefs,
    ...(resultSelector && { ResultSelector: resultSelector }),
    ...buildCatchRules(ctx),
  };

  ctx.states.set(parallelStateName, parallelState);

  if (lastStateName) {
    patchNext(ctx.states, lastStateName, parallelStateName);
  }

  // Register result variables in the main context
  if (term.resultBindings.length > 1) {
    // Array destructuring — each binding maps to $.bindingName
    for (let i = 0; i < term.resultBindings.length; i++) {
      const name = term.resultBindings[i];
      const sym = term.resultSymbols[i];
      if (name !== '_' && sym) {
        ctx.variables.addVariable(sym, {
          symbol: sym,
          type: StepVariableType.StateOutput,
          jsonPath: `$.${name}`,
          definitelyAssigned: true,
          constant: false,
        });
      }
    }
  } else if (term.resultBindings.length === 1) {
    // Single binding: const result = await Promise.all([...])
    const name = term.resultBindings[0];
    const sym = term.resultSymbols[0];
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

  // Process exit block and wire parallel state to it
  const exitFirst = processBlock(ctx, term.exitBlock);
  if (exitFirst) {
    patchNext(ctx.states, parallelStateName, exitFirst);
  }

  return parallelStateName;
}

/**
 * Create a sub-context for a parallel branch.
 * Inherits external service bindings from the parent context.
 */
function createParallelBranchContext(ctx: BuildContext): BuildContext {
  const subVariables = new VRBClass();
  // Copy service bindings, input, and constants from outer scope
  for (const [sym, info] of ctx.variables.variables) {
    if (info.type === StepVariableType.External || info.type === StepVariableType.Input || info.type === StepVariableType.Constant) {
      subVariables.addVariable(sym, info);
    }
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

  return {
    serviceVarName,
    resource,
    parameters,
    methodInfo,
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

function createSubContext(
  ctx: BuildContext,
  iterationVarName: string,
  iterationVarSymbol: ts.Symbol | undefined,
): BuildContext {
  // Clone variables builder: copy service bindings and constants from outer scope
  const subVariables = new VRBClass();
  for (const [sym, info] of ctx.variables.variables) {
    if (info.type === StepVariableType.External || info.type === StepVariableType.Constant) {
      subVariables.addVariable(sym, info);
    }
  }

  // Register the iteration variable at $ (each Map item input is $)
  if (iterationVarSymbol) {
    subVariables.addVariable(iterationVarSymbol, {
      symbol: iterationVarSymbol,
      type: StepVariableType.Input,
      jsonPath: '$',
      definitelyAssigned: true,
      constant: true,
    });
    subVariables.inputSymbol = iterationVarSymbol;
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
