import ts from 'typescript';
import { CompilerContext, type CompilerDiagnostic } from './compiler/compilerContext.js';
import { ErrorCodes } from './compiler/diagnosticCodes.js';
import { loadIntrinsics } from './compiler/discovery/intrinsics.js';
import { findCallSites } from './compiler/discovery/callSiteLocator.js';
import { createCallGraph, type CallGraphNode } from './compiler/discovery/callGraph.js';
import { discoverServices } from './compiler/discovery/serviceDiscovery.js';
import { buildCFG } from './compiler/cfg/index.js';
import { generateStateMachine, deriveStateMachineName } from './compiler/generation/index.js';
import { WholeProgramAnalyzer } from './compiler/analysis/wholeProgramAnalyzer.js';

// Re-export ASL types
export type {
  StateMachineDefinition,
  State,
  TaskState,
  PassState,
  ChoiceState,
  WaitState,
  FailState,
  ParallelState,
  MapState,
  SucceedState,
  ChoiceRule,
  ComparisonRule,
  NotRule,
  AndRule,
  OrRule,
  RetryRule,
  CatchRule,
} from './asl/index.js';

export {
  AslParser,
  AslSerializer,
  AslValidator,
} from './asl/index.js';

export type { AslParseResult, AslValidationError } from './asl/index.js';

// ── Compiler API types ─────────────────────────────────────────────────

/**
 * Options for the compile() function.
 */
export interface CompileOptions {
  readonly tsconfigPath?: string;
  readonly sourceFiles?: readonly string[];
  readonly cwd?: string;
  /** Deploy-time value overrides for service binding variables.
   *  Keys are variable names; values are resource identifiers (strings or CF intrinsic objects). */
  readonly substitutions?: Readonly<Record<string, unknown>>;
}

/**
 * The result of a compilation run.
 */
export interface CompileResult {
  readonly stateMachines: readonly CompiledStateMachine[];
  readonly errors: readonly CompilerDiagnostic[];
}

/**
 * A single compiled state machine with its ASL definition and metadata.
 */
export interface CompiledStateMachine {
  readonly name: string;
  readonly source: string;
  readonly definition: import('./asl/types.js').StateMachineDefinition;
  readonly services: readonly string[];
}

export { CompilerDiagnostic };

// Re-export discovery types for testing and advanced usage
export type {
  IntrinsicsMethods,
  StepFunctionCallSite,
  StepFunctionFactory,
  StepFunctionOrigin,
  CallGraphNodeEdge,
  ServiceRegistry,
  ServiceBinding,
  ServiceMethodInfo,
} from './compiler/discovery/index.js';

export {
  CallGraphNode,
  CallNodeType,
} from './compiler/discovery/index.js';

// Re-export CFG types
export type {
  Terminator,
  FallTerminator,
  BranchTerminator,
  LoopTerminator,
  LoopBackTerminator,
  TryCatchTerminator,
  MapStateTerminator,
  ParallelTerminator,
  ReturnTerminator,
  ThrowTerminator,
  BreakTerminator,
  ContinueTerminator,
  BasicBlock,
  ControlFlowGraph,
} from './compiler/cfg/index.js';

export { buildCFG } from './compiler/cfg/index.js';

// Re-export generation types
export {
  generateStateMachine,
  deriveStateMachineName,
  buildStateMachine,
  buildParameters,
  buildChoiceRule,
} from './compiler/generation/index.js';

// Re-export analysis types
export {
  StepVariableType,
  resolveVariables,
  resolveExpression,
  extractResourceArn,
  VariableResolutionBuilder,
} from './compiler/analysis/index.js';

export type {
  VariableInfo,
  VariableScope,
  VariableEnvironment,
  VariableResolution,
  ResolvedExpression,
} from './compiler/analysis/index.js';

// Re-export whole-program analysis types
export {
  WholeProgramAnalyzer,
  ExpressionEvaluator,
  ModuleEnvironment,
  isEligibleForInlining,
  top,
  constant,
  bottom,
  meet,
  isConstant,
  isBottom,
  isTop,
} from './compiler/analysis/index.js';

export type {
  WholeProgramAnalyzerOptions,
  LatticeValue,
  TopValue,
  ConstantValue,
  BottomValue,
  SymbolResolver,
  ImportResolver,
  NamespaceResolver,
} from './compiler/analysis/index.js';

// Re-export transformer
export { createSimpleStepsTransformer } from './transformer/index.js';
export { analyzeFreeVariables } from './transformer/dataFlow.js';
export type { FreeVariable, FreeVariableClassification, ServiceInfo } from './transformer/dataFlow.js';
export { compileVirtualWorkflow } from './transformer/virtualCompiler.js';
export type { VirtualCompileResult } from './transformer/virtualCompiler.js';

// ── Compile function ───────────────────────────────────────────────────

/**
 * Compile TypeScript source files to ASL state machine definitions.
 */
export function compile(options: CompileOptions): CompileResult {
  const cwd = options.cwd ?? process.cwd();

  // Create ts.Program
  let program: ts.Program;

  if (options.sourceFiles && options.sourceFiles.length > 0) {
    const compilerOptions: ts.CompilerOptions = {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.Node16,
      moduleResolution: ts.ModuleResolutionKind.Node16,
      strict: true,
      esModuleInterop: true,
      experimentalDecorators: true,
      skipLibCheck: true,
    };
    program = ts.createProgram([...options.sourceFiles], compilerOptions);
  } else if (options.tsconfigPath) {
    const configFile = ts.readConfigFile(options.tsconfigPath, ts.sys.readFile);
    if (configFile.error) {
      return {
        stateMachines: [],
        errors: [{
          file: options.tsconfigPath,
          line: 1,
          column: 1,
          message: ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'),
          severity: 'error',
          code: ErrorCodes.Config.InvalidConfig.code,
        }],
      };
    }

    const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, cwd);
    program = ts.createProgram(parsed.fileNames, parsed.options);
  } else {
    return {
      stateMachines: [],
      errors: [{
        file: '',
        line: 0,
        column: 0,
        message: 'Either tsconfigPath or sourceFiles must be provided',
        severity: 'error',
        code: ErrorCodes.Config.InvalidConfig.code,
      }],
    };
  }

  const context = new CompilerContext(program);

  // ── Stage 1: Load intrinsics + service registry ─────────────────────
  const intrinsics = loadIntrinsics(context);
  if (!intrinsics) {
    return {
      stateMachines: [],
      errors: [...context.diagnostics],
    };
  }

  const serviceRegistry = discoverServices(context);

  // ── Stage 1b: Create whole-program analyzer ───────────────────────
  const analyzer = new WholeProgramAnalyzer(context, serviceRegistry);

  // ── Stage 2: Find call sites (Steps.createFunction, @stepFunction) ──
  const allCallSites = [];
  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.isDeclarationFile) continue;
    // Skip internal files (runtime, compiler infrastructure)
    if (sourceFile.fileName.includes('/runtime/')) continue;
    if (sourceFile.fileName.includes('/compiler/')) continue;

    const sites = findCallSites(context, intrinsics, sourceFile);
    allCallSites.push(...sites);
  }

  // ── Stage 3: Build call graphs ──────────────────────────────────────
  const callGraphs: { callSite: typeof allCallSites[0]; graph: CallGraphNode }[] = [];
  for (const callSite of allCallSites) {
    const graph = createCallGraph(context, callSite);
    callGraphs.push({ callSite, graph });
  }

  // Early return if there are errors from discovery stages
  if (context.hasErrors()) {
    return {
      stateMachines: [],
      errors: [...context.diagnostics],
    };
  }

  // ── Stage 4: Build control flow graphs ────────────────────────────────
  const compilationUnits: { callSite: typeof allCallSites[0]; graph: CallGraphNode; cfg: import('./compiler/cfg/types.js').ControlFlowGraph }[] = [];
  for (const { callSite, graph } of callGraphs) {
    const body = callSite.factoryFunction.factory.body;
    if (body && ts.isBlock(body)) {
      const cfg = buildCFG(context, body);
      compilationUnits.push({ callSite, graph, cfg });
    }
  }

  // Early return if there are errors from CFG construction
  if (context.hasErrors()) {
    return {
      stateMachines: [],
      errors: [...context.diagnostics],
    };
  }

  // ── Stage 5: ASL generation ──────────────────────────────────────────
  const stateMachines: CompiledStateMachine[] = [];
  for (const { callSite, cfg } of compilationUnits) {
    const definition = generateStateMachine(context, callSite, cfg, serviceRegistry, options.substitutions, analyzer);
    const name = deriveStateMachineName(callSite);

    // Collect service names used by this state machine
    const services: string[] = [];
    for (const state of Object.values(definition.States)) {
      if (state.Type === 'Task' && 'Resource' in state && state.Resource) {
        const resourceKey = typeof state.Resource === 'string'
          ? state.Resource
          : JSON.stringify(state.Resource);
        if (!services.includes(resourceKey)) {
          services.push(resourceKey);
        }
      }
    }

    stateMachines.push({ name, source: callSite.file.fileName, definition, services });
  }

  return {
    stateMachines,
    errors: [...context.diagnostics],
  };
}

// ── Compile from pre-built Program ───────────────────────────────────

/**
 * Options for compileFromProgram(). Used in browser environments
 * where a ts.Program is created with a virtual CompilerHost.
 */
export interface CompileFromProgramOptions {
  /** A pre-built TypeScript Program (e.g. from a virtual file system). */
  readonly program: ts.Program;
  /** Path to the runtime/index.ts file within the program. */
  readonly runtimePath: string;
  /** Path to the runtime/services/ directory within the program. */
  readonly servicesDir: string;
  /** Paths to skip when scanning for call sites (e.g. runtime, compiler files). */
  readonly skipPatterns?: readonly string[];
  /** Deploy-time value overrides for service binding variables. */
  readonly substitutions?: Readonly<Record<string, unknown>>;
}

/**
 * Compile a pre-built ts.Program to ASL state machine definitions.
 *
 * This is the browser-friendly entry point. Unlike compile(), it does not
 * use Node-specific APIs (fs, path, __dirname, process.cwd).
 */
export function compileFromProgram(options: CompileFromProgramOptions): CompileResult {
  const { program, runtimePath, servicesDir } = options;
  const skipPatterns = options.skipPatterns ?? ['/runtime/', '/compiler/'];

  const context = new CompilerContext(program);

  // Stage 1: Load intrinsics + service registry
  const intrinsics = loadIntrinsics(context, runtimePath);
  if (!intrinsics) {
    return { stateMachines: [], errors: [...context.diagnostics] };
  }

  const serviceRegistry = discoverServices(context, servicesDir);

  // Stage 1b: Create whole-program analyzer
  const analyzer2 = new WholeProgramAnalyzer(context, serviceRegistry);

  // Stage 2: Find call sites
  const allCallSites = [];
  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.isDeclarationFile) continue;
    if (skipPatterns.some(p => sourceFile.fileName.includes(p))) continue;
    const sites = findCallSites(context, intrinsics, sourceFile);
    allCallSites.push(...sites);
  }

  // Stage 3: Build call graphs
  const callGraphs: { callSite: typeof allCallSites[0]; graph: CallGraphNode }[] = [];
  for (const callSite of allCallSites) {
    const graph = createCallGraph(context, callSite);
    callGraphs.push({ callSite, graph });
  }

  if (context.hasErrors()) {
    return { stateMachines: [], errors: [...context.diagnostics] };
  }

  // Stage 4: Build control flow graphs
  const compilationUnits: { callSite: typeof allCallSites[0]; graph: CallGraphNode; cfg: import('./compiler/cfg/types.js').ControlFlowGraph }[] = [];
  for (const { callSite, graph } of callGraphs) {
    const body = callSite.factoryFunction.factory.body;
    if (body && ts.isBlock(body)) {
      const cfg = buildCFG(context, body);
      compilationUnits.push({ callSite, graph, cfg });
    }
  }

  if (context.hasErrors()) {
    return { stateMachines: [], errors: [...context.diagnostics] };
  }

  // Stage 5: ASL generation
  const stateMachines: CompiledStateMachine[] = [];
  for (const { callSite, cfg } of compilationUnits) {
    const definition = generateStateMachine(context, callSite, cfg, serviceRegistry, options.substitutions, analyzer2);
    const name = deriveStateMachineName(callSite);

    const services: string[] = [];
    for (const state of Object.values(definition.States)) {
      if (state.Type === 'Task' && 'Resource' in state && state.Resource) {
        const resourceKey = typeof state.Resource === 'string'
          ? state.Resource
          : JSON.stringify(state.Resource);
        if (!services.includes(resourceKey)) {
          services.push(resourceKey);
        }
      }
    }

    stateMachines.push({ name, source: callSite.file.fileName, definition, services });
  }

  return { stateMachines, errors: [...context.diagnostics] };
}

// ── Fluent API ─────────────────────────────────────────────────────────

/**
 * Thrown by SimpleStepsBuilder methods when compilation produces errors.
 */
export class SimpleStepsCompileError extends Error {
  readonly diagnostics: readonly CompilerDiagnostic[];

  constructor(diagnostics: readonly CompilerDiagnostic[]) {
    const messages = diagnostics.map(d => `${d.file}:${d.line} - ${d.message}`);
    super(`SimpleSteps compilation failed:\n${messages.join('\n')}`);
    this.name = 'SimpleStepsCompileError';
    this.diagnostics = diagnostics;
  }
}

/**
 * Builder for extracting compiled state machines.
 */
export class SimpleStepsBuilder {
  private result: CompileResult | null = null;

  constructor(private readonly options: CompileOptions) {}

  /**
   * Return a new builder with deploy-time substitutions merged in.
   * Keys are variable names from source; values are resource identifiers
   * (strings, CF intrinsic objects, CDK tokens, etc.).
   */
  withSubstitutions(substitutions: Readonly<Record<string, unknown>>): SimpleStepsBuilder {
    return new SimpleStepsBuilder({
      ...this.options,
      substitutions: { ...this.options.substitutions, ...substitutions },
    });
  }

  private getResult(): CompileResult {
    if (!this.result) {
      this.result = compile(this.options);
    }
    return this.result;
  }

  toStateMachine(): import('./asl/types.js').StateMachineDefinition {
    const result = this.getResult();
    if (result.errors.length > 0) {
      throw new SimpleStepsCompileError(result.errors);
    }
    if (result.stateMachines.length === 0) {
      throw new Error('No state machines found in the provided source files');
    }
    return result.stateMachines[0].definition;
  }

  toStateMachines(): readonly CompiledStateMachine[] {
    const result = this.getResult();
    if (result.errors.length > 0) {
      throw new SimpleStepsCompileError(result.errors);
    }
    return result.stateMachines;
  }

  toResult(): CompileResult {
    return this.getResult();
  }
}

/**
 * Fluent API for compiling SimpleSteps definitions.
 */
export class SimpleSteps {
  static fromFile(filePath: string): SimpleStepsBuilder {
    return new SimpleStepsBuilder({ sourceFiles: [filePath] });
  }

  static fromProject(tsconfigPath: string): SimpleStepsBuilder {
    return new SimpleStepsBuilder({ tsconfigPath });
  }
}
