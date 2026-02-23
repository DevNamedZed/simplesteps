import { Construct } from 'constructs';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as iam from 'aws-cdk-lib/aws-iam';
import { compile, AslSerializer } from '@simplesteps/core';
import type { CompileResult, CompiledStateMachine } from '@simplesteps/core';

// ── Props ────────────────────────────────────────────────────────────────

/**
 * Properties for SimpleStepsStateMachine.
 */
export interface SimpleStepsStateMachineProps
  extends Omit<sfn.StateMachineProps, 'definitionBody' | 'definition' | 'definitionString'> {

  /**
   * Path to the TypeScript source file containing the step function definition.
   * Used for file-based compilation mode.
   */
  readonly sourceFile?: string;

  /**
   * Map of variable names (as they appear in the source) to CDK resource
   * references or other deploy-time values.
   *
   * Example:
   * ```ts
   * bindings: {
   *   myLambda: myLambdaFunction.functionArn,
   *   myTable: myTable.tableName,
   * }
   * ```
   *
   * These are passed as `substitutions` to the core compiler — CDK tokens
   * are naturally JSON-serializable and flow through to ASL as-is.
   */
  readonly bindings?: Record<string, unknown>;

  /**
   * When set to a specific state machine name (matching the compiled output),
   * only that machine is used. If not set and the source contains exactly one
   * state machine, it is used automatically. An error is thrown if the source
   * produces multiple machines and this is not specified.
   */
  readonly stateMachineName?: string;

  /**
   * Inline workflow definition using `Steps.createFunction()`.
   *
   * Requires the SimpleSteps TypeScript transformer to be active at build time.
   * The transformer will compile this to ASL and replace it with `__compiledAsl`
   * before CDK synthesis.
   */
  readonly workflow?: unknown;

  /**
   * @internal
   * Pre-compiled ASL JSON string, injected by the SimpleSteps transformer.
   * Contains `$$N$$` placeholders that get replaced by `__runtimeBindings` values.
   */
  readonly __compiledAsl?: string;

  /**
   * @internal
   * Array of CDK expressions that replace `$$N$$` placeholders in `__compiledAsl`.
   * Injected by the SimpleSteps transformer.
   */
  readonly __runtimeBindings?: unknown[];
}

// ── Construct ────────────────────────────────────────────────────────────

/**
 * A CDK construct that compiles a SimpleSteps TypeScript source file
 * into an AWS Step Functions state machine.
 *
 * @example
 * ```ts
 * import { SimpleStepsStateMachine } from '@simplesteps/cdk';
 *
 * const machine = new SimpleStepsStateMachine(this, 'MyWorkflow', {
 *   sourceFile: path.join(__dirname, '../workflows/myWorkflow.ts'),
 *   bindings: {
 *     processOrder: processOrderFn.functionArn,
 *     ordersTable: ordersTable.tableName,
 *   },
 * });
 * ```
 */
export class SimpleStepsStateMachine extends sfn.StateMachine {
  /** The full compile result from @simplesteps/core (file-based mode only). */
  readonly compileResult?: CompileResult;

  /** The specific CompiledStateMachine that was selected (file-based mode only). */
  readonly compiledMachine?: CompiledStateMachine;

  constructor(scope: Construct, id: string, props: SimpleStepsStateMachineProps) {
    const {
      sourceFile, bindings, stateMachineName,
      workflow, __compiledAsl, __runtimeBindings,
      ...sfnProps
    } = props;

    // ── Path A: Transformer output — pre-compiled ASL with runtime bindings ──
    if (__compiledAsl != null) {
      let asl = __compiledAsl;
      const runtimeBindings = __runtimeBindings ?? [];
      for (let i = 0; i < runtimeBindings.length; i++) {
        asl = asl.split(`$$${i}$$`).join(String(runtimeBindings[i]));
      }

      super(scope, id, {
        ...sfnProps,
        definitionBody: sfn.DefinitionBody.fromString(asl),
      });
      return;
    }

    // ── Path B: File-based compilation (existing behavior) ──────────────────
    if (sourceFile) {
      // 1. Build substitutions from bindings
      const substitutions: Record<string, unknown> = {};
      if (bindings) {
        for (const [varName, value] of Object.entries(bindings)) {
          substitutions[varName] = value;
        }
      }

      // 2. Compile
      const result = compile({
        sourceFiles: [sourceFile],
        substitutions,
      });

      if (result.errors.length > 0) {
        const messages = result.errors.map(e => `${e.file}:${e.line} - ${e.message}`);
        throw new Error(
          `SimpleSteps compilation failed:\n${messages.join('\n')}`,
        );
      }

      if (result.stateMachines.length === 0) {
        throw new Error(
          `No state machines found in ${sourceFile}`,
        );
      }

      // 3. Select the target state machine
      let selected: CompiledStateMachine;
      if (stateMachineName) {
        const match = result.stateMachines.find(m => m.name === stateMachineName);
        if (!match) {
          const available = result.stateMachines.map(m => m.name).join(', ');
          throw new Error(
            `State machine "${stateMachineName}" not found. Available: ${available}`,
          );
        }
        selected = match;
      } else if (result.stateMachines.length === 1) {
        selected = result.stateMachines[0];
      } else {
        const available = result.stateMachines.map(m => m.name).join(', ');
        throw new Error(
          `Source file produces ${result.stateMachines.length} state machines (${available}). ` +
          `Specify stateMachineName to select one.`,
        );
      }

      // 4. Create CDK StateMachine with compiled ASL
      const definitionString = AslSerializer.serialize(selected.definition);

      super(scope, id, {
        ...sfnProps,
        definitionBody: sfn.DefinitionBody.fromString(definitionString),
      });

      this.compileResult = result;
      this.compiledMachine = selected;
      return;
    }

    // ── Path C: Inline workflow without transformer — error ─────────────────
    if (workflow != null) {
      throw new Error(
        'Inline workflows require the SimpleSteps TypeScript transformer. ' +
        'Add the transformer to your build pipeline. ' +
        'See: https://github.com/DevNamedZed/simplesteps#transformer-setup',
      );
    }

    // ── No valid input ─────────────────────────────────────────────────────
    throw new Error(
      'SimpleStepsStateMachine requires either `sourceFile` (file-based) ' +
      'or `workflow` (inline with transformer) to be specified.',
    );
  }
}

// ── Utility: compile-only (no construct) ─────────────────────────────────

/**
 * Compile a SimpleSteps source file and return the ASL definition body
 * without creating a CDK construct. Useful for integration into existing
 * CDK patterns where you need more control.
 */
export function compileDefinitionBody(
  sourceFile: string,
  bindings?: Record<string, unknown>,
): sfn.DefinitionBody {
  const result = compile({
    sourceFiles: [sourceFile],
    substitutions: bindings,
  });

  if (result.errors.length > 0) {
    const messages = result.errors.map(e => `${e.file}:${e.line} - ${e.message}`);
    throw new Error(`SimpleSteps compilation failed:\n${messages.join('\n')}`);
  }

  if (result.stateMachines.length === 0) {
    throw new Error(`No state machines found in ${sourceFile}`);
  }

  const definition = AslSerializer.serialize(result.stateMachines[0].definition);
  return sfn.DefinitionBody.fromString(definition);
}
