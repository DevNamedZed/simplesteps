import ts from 'typescript';
import { CompilerContext } from '../compilerContext.js';
import type { ControlFlowGraph } from '../cfg/types.js';
import type { ServiceRegistry } from '../discovery/serviceDiscovery.js';
import type { StepFunctionCallSite } from '../discovery/callSiteLocator.js';
import { resolveVariables, resolveExpression } from '../analysis/variableResolver.js';
import { StepVariableType } from '../analysis/types.js';
import type { InlineBinding } from '../analysis/asyncHelperAnalyzer.js';
import type { WholeProgramAnalyzer } from '../analysis/wholeProgramAnalyzer.js';
import { buildStateMachine } from './stateBuilder.js';
import { type PathDialect, JSON_PATH_DIALECT } from './pathDialect.js';
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
  inlineBindings?: readonly InlineBinding[],
  dialect: PathDialect = JSON_PATH_DIALECT,
  timeoutSeconds?: number,
  version?: string,
  sourceMap?: boolean,
): StateMachineDefinition {
  const variables = resolveVariables(context, callSite, serviceRegistry, substitutions, analyzer, dialect);

  // Apply inline bindings: map helper parameter symbols to the same
  // variable info as the call-site argument expressions.
  // Bindings are registered as deferred so they resolve lazily — this handles
  // arguments that reference runtime variables (e.g. service call results)
  // which aren't in the resolution until the state builder processes them.
  if (inlineBindings && inlineBindings.length > 0) {
    for (const binding of inlineBindings) {
      // Try eager resolution first (works for input refs, literals, intrinsics)
      const resolved = resolveExpression(context, binding.argExpression, variables.toResolution(), dialect);

      if (resolved.kind === 'jsonpath' && resolved.path) {
        variables.addVariable(binding.paramSymbol, {
          symbol: binding.paramSymbol,
          type: StepVariableType.StateOutput,
          jsonPath: resolved.path,
          definitelyAssigned: true,
          constant: false,
        });
      } else if (resolved.kind === 'literal') {
        variables.addVariable(binding.paramSymbol, {
          symbol: binding.paramSymbol,
          type: StepVariableType.Constant,
          definitelyAssigned: true,
          constant: true,
          literalValue: resolved.value,
        });
      } else if (resolved.kind === 'intrinsic' && resolved.path) {
        variables.addVariable(binding.paramSymbol, {
          symbol: binding.paramSymbol,
          type: StepVariableType.Derived,
          definitelyAssigned: true,
          constant: true,
          intrinsicPath: resolved.path,
        });
      } else {
        // Defer: the argument references a runtime variable not yet registered.
        // It will be resolved lazily when the parameter is accessed during state building.
        variables.addDeferredBinding(binding.paramSymbol, binding.argExpression);
      }
    }
  }

  return buildStateMachine(context, cfg, callSite, serviceRegistry, variables, dialect, timeoutSeconds, version, sourceMap);
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
export { type PathDialect, JsonPathDialect, JSON_PATH_DIALECT, JsonataDialect, JSONATA_DIALECT } from './pathDialect.js';
