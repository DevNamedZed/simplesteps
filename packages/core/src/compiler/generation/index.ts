import ts from 'typescript';
import { CompilerContext } from '../compilerContext.js';
import type { ControlFlowGraph } from '../cfg/types.js';
import type { ServiceRegistry } from '../discovery/serviceDiscovery.js';
import type { StepFunctionCallSite } from '../discovery/callSiteLocator.js';
import { resolveVariables } from '../analysis/variableResolver.js';
import type { WholeProgramAnalyzer } from '../analysis/wholeProgramAnalyzer.js';
import { buildStateMachine } from './stateBuilder.js';
import type { StateMachineDefinition } from '../../asl/types.js';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Generate an ASL StateMachineDefinition from a compiled call site.
 */
export function generateStateMachine(
  context: CompilerContext,
  callSite: StepFunctionCallSite,
  cfg: ControlFlowGraph,
  serviceRegistry: ServiceRegistry,
  substitutions?: Readonly<Record<string, unknown>>,
  analyzer?: WholeProgramAnalyzer,
): StateMachineDefinition {
  const variables = resolveVariables(context, callSite, serviceRegistry, substitutions, analyzer);
  return buildStateMachine(context, cfg, callSite, serviceRegistry, variables);
}

/**
 * Derive the state machine name from the call site.
 *
 * For `export const processOrder = Steps.createFunction(...)`, returns "processOrder".
 * For `@stepFunction method() { ... }`, returns the method name.
 */
export function deriveStateMachineName(callSite: StepFunctionCallSite): string {
  const origin = callSite.origin;

  if (origin.kind === 'createFunction') {
    // Walk up: CallExpression → VariableDeclaration → name
    const parent = origin.call.parent;
    if (ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name)) {
      return parent.name.text;
    }
    return 'StateMachine';
  }

  if (origin.kind === 'decorator') {
    return origin.method.name.getText();
  }

  return 'StateMachine';
}

// Re-exports
export { buildStateMachine } from './stateBuilder.js';
export { buildParameters, buildChoiceRule } from './expressionMapper.js';
