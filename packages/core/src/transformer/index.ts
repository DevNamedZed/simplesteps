// ---------------------------------------------------------------------------
// SimpleSteps TypeScript Transformer
//
// A ts.TransformerFactory that finds inline workflow usage in CDK stacks:
//
//   new SimpleStepsStateMachine(this, 'Id', {
//     workflow: Steps.createFunction(async (ctx, input) => { ... }),
//   })
//
// The transformer:
// 1. Extracts the workflow function
// 2. Analyzes free variables (service bindings, constants, runtime expressions)
// 3. Synthesizes a virtual workflow file
// 4. Compiles it to ASL using the core compiler
// 5. Replaces the original props with { __compiledAsl, __runtimeBindings }
// ---------------------------------------------------------------------------

import ts from 'typescript';
import { analyzeFreeVariables, type FreeVariable } from './dataFlow.js';
import { compileVirtualWorkflow } from './virtualCompiler.js';
import { discoverServices, type ServiceRegistry } from '../compiler/discovery/serviceDiscovery.js';
import { CompilerContext } from '../compiler/compilerContext.js';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Create the SimpleSteps TypeScript transformer factory.
 *
 * Register via ts-patch, ttypescript, or programmatic ts.CustomTransformers:
 *
 * ```json
 * // tsconfig.json (ts-patch)
 * {
 *   "compilerOptions": {
 *     "plugins": [{ "transform": "@simplesteps/core/transformer" }]
 *   }
 * }
 * ```
 *
 * Or programmatically:
 * ```typescript
 * const result = ts.emit(program, undefined, undefined, false, {
 *   before: [createSimpleStepsTransformer(program)],
 * });
 * ```
 */
export function createSimpleStepsTransformer(
  program: ts.Program,
): ts.TransformerFactory<ts.SourceFile> {
  return (transformationContext: ts.TransformationContext) => {
    const checker = program.getTypeChecker();

    // Build the service registry once for the whole program
    const compilerContext = new CompilerContext(program);
    const serviceRegistry = discoverServices(compilerContext);

    return (sourceFile: ts.SourceFile) => {
      const visitor = createVisitor(
        checker,
        transformationContext,
        serviceRegistry,
      );
      return ts.visitNode(sourceFile, visitor) as ts.SourceFile;
    };
  };
}

// Also export as default for ts-patch plugin convention
export default createSimpleStepsTransformer;

// ---------------------------------------------------------------------------
// AST Visitor
// ---------------------------------------------------------------------------

function createVisitor(
  checker: ts.TypeChecker,
  ctx: ts.TransformationContext,
  serviceRegistry: ServiceRegistry,
): ts.Visitor<ts.Node, ts.Node> {
  const visitor: ts.Visitor<ts.Node, ts.Node> = (node: ts.Node): ts.Node => {
    // Look for: new SimpleStepsStateMachine(scope, id, { workflow: Steps.createFunction(fn) })
    if (ts.isNewExpression(node) && isSimpleStepsStateMachineNew(checker, node)) {
      const transformed = tryTransformConstruct(checker, node, serviceRegistry);
      if (transformed) return transformed;
    }

    return ts.visitEachChild(node, visitor, ctx);
  };

  return visitor;
}

// ---------------------------------------------------------------------------
// Detection
// ---------------------------------------------------------------------------

/**
 * Check if a `new` expression is `new SimpleStepsStateMachine(...)`.
 */
function isSimpleStepsStateMachineNew(
  checker: ts.TypeChecker,
  node: ts.NewExpression,
): boolean {
  if (!ts.isIdentifier(node.expression)) return false;
  if (node.expression.text !== 'SimpleStepsStateMachine') return false;

  // Verify via the type checker that this actually resolves to our construct
  const sym = checker.getSymbolAtLocation(node.expression);
  if (!sym) return false;

  // We accept any class named SimpleStepsStateMachine — the construct import
  // could be from @simplesteps/cdk or a local re-export
  return true;
}

// ---------------------------------------------------------------------------
// Transformation
// ---------------------------------------------------------------------------

/**
 * Try to transform a `new SimpleStepsStateMachine(scope, id, props)` call.
 * Returns the rewritten node, or null if this isn't an inline workflow usage.
 */
function tryTransformConstruct(
  checker: ts.TypeChecker,
  node: ts.NewExpression,
  serviceRegistry: ServiceRegistry,
): ts.NewExpression | null {
  const args = node.arguments;
  if (!args || args.length < 3) return null;

  const propsArg = args[2];
  if (!ts.isObjectLiteralExpression(propsArg)) return null;

  // Find the `workflow` property
  const workflowProp = propsArg.properties.find(
    p => ts.isPropertyAssignment(p) &&
         ts.isIdentifier(p.name) &&
         p.name.text === 'workflow',
  );
  if (!workflowProp || !ts.isPropertyAssignment(workflowProp)) return null;

  // The workflow value should be Steps.createFunction(fn)
  const workflowExpr = workflowProp.initializer;
  if (!ts.isCallExpression(workflowExpr)) return null;

  // Verify it's Steps.createFunction
  if (!isStepsCreateFunction(checker, workflowExpr)) return null;

  // Extract the factory function
  const factoryArg = workflowExpr.arguments[0];
  if (!factoryArg) return null;

  let workflowFn: ts.FunctionLikeDeclarationBase | undefined;
  if (ts.isArrowFunction(factoryArg) || ts.isFunctionExpression(factoryArg)) {
    workflowFn = factoryArg;
  }
  if (!workflowFn) return null;

  // Analyze free variables
  const freeVars = analyzeFreeVariables(checker, workflowFn, serviceRegistry);

  // Build the synthetic workflow source
  const { source, substitutions, runtimeBindingExprs } = synthesizeWorkflowSource(
    checker,
    workflowFn,
    freeVars,
    workflowExpr,
  );

  // Compile to ASL
  const result = compileVirtualWorkflow(source, substitutions);

  if (result.errors.length > 0) {
    // If compilation fails, emit a diagnostic comment but don't crash
    // the build — fall through to runtime error handling in the CDK construct
    const errorMessages = result.errors.map(e => e.message).join('; ');
    console.warn(`[SimpleSteps transformer] Compilation warning: ${errorMessages}`);
  }

  // Build the replacement props object
  const newProps = buildTransformedProps(
    propsArg,
    result.asl,
    runtimeBindingExprs,
  );

  // Create the new `new SimpleStepsStateMachine(scope, id, newProps)` expression
  return ts.factory.createNewExpression(
    node.expression,
    node.typeArguments,
    [args[0], args[1], newProps, ...args.slice(3)],
  );
}

/**
 * Check if a call expression is `Steps.createFunction(...)`.
 */
function isStepsCreateFunction(
  checker: ts.TypeChecker,
  call: ts.CallExpression,
): boolean {
  if (!ts.isPropertyAccessExpression(call.expression)) return false;
  const propAccess = call.expression;
  if (!ts.isIdentifier(propAccess.expression)) return false;
  if (propAccess.name.text !== 'createFunction') return false;

  // Verify "Steps" resolves to the runtime Steps class
  const sym = checker.getSymbolAtLocation(propAccess.expression);
  if (!sym) return false;

  // Accept any class/namespace named "Steps"
  return propAccess.expression.text === 'Steps';
}

// ---------------------------------------------------------------------------
// Source Synthesis
// ---------------------------------------------------------------------------

interface SynthesisResult {
  /** The full TypeScript source for the virtual workflow file. */
  source: string;
  /** Substitution map: binding variable name -> placeholder string. */
  substitutions: Record<string, unknown>;
  /** The original CDK expressions for each runtime binding, to preserve in output. */
  runtimeBindingExprs: ts.Expression[];
}

/**
 * Synthesize a virtual workflow file from the extracted workflow function
 * and its free variables.
 */
function synthesizeWorkflowSource(
  checker: ts.TypeChecker,
  workflowFn: ts.FunctionLikeDeclarationBase,
  freeVars: FreeVariable[],
  originalCall: ts.CallExpression,
): SynthesisResult {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const lines: string[] = [];
  const substitutions: Record<string, unknown> = {};
  const runtimeBindingExprs: ts.Expression[] = [];
  let bindingIndex = 0;

  // Imports
  lines.push("import { Steps, SimpleStepContext } from './runtime/index';");

  // Collect which service modules we need to import
  const serviceImports = new Set<string>();
  for (const fv of freeVars) {
    if (fv.classification === 'service-binding' && fv.serviceInfo) {
      serviceImports.add(fv.serviceInfo.service);
    }
  }
  if (serviceImports.size > 0) {
    const names = [...serviceImports].join(', ');
    lines.push(`import { ${names} } from './runtime/services/index';`);
  }

  lines.push('');

  // Emit declarations for each free variable
  for (const fv of freeVars) {
    const varName = fv.symbol.getName();

    switch (fv.classification) {
      case 'service-binding': {
        // For service bindings, we need a declare const for the resource,
        // then construct the binding using the placeholder.
        const bindingName = `__binding_${bindingIndex}__`;
        const placeholder = `$$${bindingIndex}$$`;
        substitutions[bindingName] = placeholder;

        lines.push(`declare const ${bindingName}: string;`);

        if (fv.serviceInfo) {
          // Reconstruct the service binding with the placeholder variable
          // e.g.: const validateOrder = Lambda<Req, Res>(__binding_0__);
          const typeArgs = extractServiceTypeArgs(checker, fv.symbol);
          const typeArgStr = typeArgs ? `<${typeArgs}>` : '';

          // Determine if it's a call-style (Lambda) or new-style (DynamoDB) binding
          const initExpr = getInitializerExpression(fv.symbol);
          if (initExpr && ts.isNewExpression(initExpr)) {
            lines.push(`const ${varName} = new ${fv.serviceInfo.service}${typeArgStr}(${bindingName});`);
          } else {
            lines.push(`const ${varName} = ${fv.serviceInfo.service}${typeArgStr}(${bindingName});`);
          }

          // Track the original CDK expression for runtime binding substitution
          if (fv.serviceInfo.resourceExpr) {
            runtimeBindingExprs.push(fv.serviceInfo.resourceExpr);
          } else {
            // Service without a resource arg (e.g., SecretsManager with no name)
            runtimeBindingExprs.push(ts.factory.createStringLiteral(''));
          }
        }

        bindingIndex++;
        break;
      }

      case 'constant': {
        // Inline the constant value
        const value = fv.constantValue;
        lines.push(`const ${varName} = ${JSON.stringify(value)};`);
        break;
      }

      case 'runtime': {
        // Runtime expressions become declare const with placeholder
        const bindingName = `__binding_${bindingIndex}__`;
        const placeholder = `$$${bindingIndex}$$`;
        substitutions[bindingName] = placeholder;

        lines.push(`declare const ${bindingName}: string;`);
        lines.push(`const ${varName} = ${bindingName};`);

        if (fv.runtimeExpr) {
          runtimeBindingExprs.push(fv.runtimeExpr);
        } else {
          runtimeBindingExprs.push(
            ts.factory.createIdentifier(varName),
          );
        }

        bindingIndex++;
        break;
      }
    }
  }

  lines.push('');

  // Print the workflow function body
  // We need to reconstruct: export const __workflow = Steps.createFunction(fn);
  const fnText = printNode(printer, workflowFn);

  // Reconstruct the Steps.createFunction call with type arguments if present
  const typeArgs = originalCall.typeArguments;
  let typeArgStr = '';
  if (typeArgs && typeArgs.length > 0) {
    const typeTexts = typeArgs.map(t => printNode(printer, t));
    typeArgStr = `<${typeTexts.join(', ')}>`;
  }

  lines.push(`export const __workflow = Steps.createFunction${typeArgStr}(${fnText});`);

  return {
    source: lines.join('\n'),
    substitutions,
    runtimeBindingExprs,
  };
}

/**
 * Print a TS node to string using the printer.
 */
function printNode(printer: ts.Printer, node: ts.Node): string {
  const sourceFile = ts.createSourceFile(
    'temp.ts',
    '',
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS,
  );
  return printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
}

/**
 * Extract type arguments from a service binding variable's initializer.
 * e.g., `Lambda<Req, Res>('arn')` → "Req, Res"
 */
function extractServiceTypeArgs(
  checker: ts.TypeChecker,
  symbol: ts.Symbol,
): string | undefined {
  const declarations = symbol.declarations;
  if (!declarations || declarations.length === 0) return undefined;

  const decl = declarations[0];
  if (!ts.isVariableDeclaration(decl) || !decl.initializer) return undefined;

  const init = decl.initializer;
  if (ts.isCallExpression(init) && init.typeArguments && init.typeArguments.length > 0) {
    const printer = ts.createPrinter();
    return init.typeArguments.map(t => printNode(printer, t)).join(', ');
  }
  if (ts.isNewExpression(init) && init.typeArguments && init.typeArguments.length > 0) {
    const printer = ts.createPrinter();
    return init.typeArguments.map(t => printNode(printer, t)).join(', ');
  }

  return undefined;
}

/**
 * Get the initializer expression from a variable symbol's declaration.
 */
function getInitializerExpression(symbol: ts.Symbol): ts.Expression | undefined {
  const declarations = symbol.declarations;
  if (!declarations || declarations.length === 0) return undefined;
  const decl = declarations[0];
  if (ts.isVariableDeclaration(decl)) return decl.initializer;
  return undefined;
}

// ---------------------------------------------------------------------------
// Output AST Construction
// ---------------------------------------------------------------------------

/**
 * Build the replacement props object literal:
 *
 * {
 *   ...existingProps (minus workflow),
 *   __compiledAsl: '{"StartAt":...}',
 *   __runtimeBindings: [expr0, expr1, ...],
 * }
 */
function buildTransformedProps(
  originalProps: ts.ObjectLiteralExpression,
  asl: string,
  runtimeBindingExprs: ts.Expression[],
): ts.ObjectLiteralExpression {
  // Keep all original properties except `workflow`
  const keptProps = originalProps.properties.filter(p => {
    if (ts.isPropertyAssignment(p) && ts.isIdentifier(p.name)) {
      return p.name.text !== 'workflow';
    }
    return true;
  });

  // Add __compiledAsl property
  const compiledAslProp = ts.factory.createPropertyAssignment(
    ts.factory.createIdentifier('__compiledAsl'),
    ts.factory.createStringLiteral(asl),
  );

  // Add __runtimeBindings property
  const bindingsArray = ts.factory.createArrayLiteralExpression(
    runtimeBindingExprs,
    false,
  );
  const runtimeBindingsProp = ts.factory.createPropertyAssignment(
    ts.factory.createIdentifier('__runtimeBindings'),
    bindingsArray,
  );

  return ts.factory.createObjectLiteralExpression(
    [...keptProps, compiledAslProp, runtimeBindingsProp],
    true, // multiLine
  );
}
