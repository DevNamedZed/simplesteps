export {
  StepVariableType,
} from './types.js';

export type {
  VariableInfo,
  VariableScope,
  VariableEnvironment,
} from './types.js';

export {
  resolveVariables,
  resolveExpression,
  extractResourceArn,
  VariableResolutionBuilder,
} from './variableResolver.js';

export type {
  VariableResolution,
  ResolvedExpression,
} from './variableResolver.js';

// Lattice types
export {
  top,
  constant,
  bottom,
  safeBottom,
  propagateBottom,
  meet,
  isTop,
  isConstant,
  isBottom,
} from './lattice.js';

export type {
  TopValue,
  ConstantValue,
  BottomValue,
  LatticeValue,
} from './lattice.js';

// Expression evaluator
export { ExpressionEvaluator } from './expressionEvaluator.js';
export type { SymbolResolver, CallResolver } from './expressionEvaluator.js';

// Pure function inliner
export { isEligibleForInlining, inlineFunction } from './pureFunctionInliner.js';

// Module analyzer
export { ModuleEnvironment, analyzeModule } from './moduleAnalyzer.js';
export type { ImportInfo, ImportResolver, NamespaceResolver } from './moduleAnalyzer.js';

// Whole-program analyzer
export { WholeProgramAnalyzer } from './wholeProgramAnalyzer.js';
export type { WholeProgramAnalyzerOptions } from './wholeProgramAnalyzer.js';
