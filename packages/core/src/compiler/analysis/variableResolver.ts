import ts from 'typescript';
import { CompilerContext } from '../compilerContext.js';
import { ErrorCodes } from '../diagnosticCodes.js';
import type { ServiceRegistry } from '../discovery/serviceDiscovery.js';
import type { StepFunctionCallSite } from '../discovery/callSiteLocator.js';
import { StepVariableType, type VariableInfo } from './types.js';
import type { WholeProgramAnalyzer } from './wholeProgramAnalyzer.js';
import { isConstant, isBottom } from './lattice.js';
import type { PathDialect } from '../generation/pathDialect.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface VariableResolution {
  /** All known variables, keyed by ts.Symbol reference. */
  readonly variables: ReadonlyMap<ts.Symbol, VariableInfo>;
  /** The ts.Symbol of the input parameter (factory param 1). */
  readonly inputSymbol: ts.Symbol | undefined;
  /** The ts.Symbol of the context parameter (factory param 0). */
  readonly contextSymbol: ts.Symbol | undefined;
  /** Deferred inline bindings: param symbol → argument expression.
   *  Resolved lazily when the identifier is first accessed. */
  readonly deferredBindings?: ReadonlyMap<ts.Symbol, ts.Expression>;
}

export interface ResolvedExpression {
  readonly kind: 'literal' | 'jsonpath' | 'intrinsic' | 'unknown';
  readonly value?: unknown;
  readonly path?: string;
}

// ---------------------------------------------------------------------------
// Mutable builder used during resolution
// ---------------------------------------------------------------------------

export class VariableResolutionBuilder {
  readonly variables = new Map<ts.Symbol, VariableInfo>();
  readonly deferredBindings = new Map<ts.Symbol, ts.Expression>();
  inputSymbol: ts.Symbol | undefined;
  contextSymbol: ts.Symbol | undefined;

  addVariable(symbol: ts.Symbol, info: VariableInfo): void {
    this.variables.set(symbol, info);
  }

  /** Register a deferred inline binding that will be resolved lazily. */
  addDeferredBinding(paramSymbol: ts.Symbol, argExpression: ts.Expression): void {
    this.deferredBindings.set(paramSymbol, argExpression);
  }

  getBySymbol(symbol: ts.Symbol): VariableInfo | undefined {
    return this.variables.get(symbol);
  }

  toResolution(): VariableResolution {
    return {
      variables: this.variables,
      inputSymbol: this.inputSymbol,
      contextSymbol: this.contextSymbol,
      deferredBindings: this.deferredBindings.size > 0 ? this.deferredBindings : undefined,
    };
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Build the initial variable resolution for a step function.
 * Classifies factory parameters and top-level service bindings.
 */
export function resolveVariables(
  context: CompilerContext,
  callSite: StepFunctionCallSite,
  serviceRegistry: ServiceRegistry,
  substitutions?: Readonly<Record<string, unknown>>,
  analyzer?: WholeProgramAnalyzer,
  dialect?: PathDialect,
): VariableResolutionBuilder {
  const builder = new VariableResolutionBuilder();
  const factory = callSite.factoryFunction.factory;

  // Classify factory parameters
  const params = factory.parameters;
  if (params.length >= 1) {
    const contextParam = params[0];
    const sym = context.checker.getSymbolAtLocation(contextParam.name);
    if (sym) {
      builder.contextSymbol = sym;
      builder.addVariable(sym, {
        symbol: sym,
        type: StepVariableType.Context,
        jsonPath: dialect?.contextRoot() ?? '$$',
        definitelyAssigned: true,
        constant: true,
      });
    }
  }

  if (params.length >= 2) {
    const inputParam = params[1];
    const sym = context.checker.getSymbolAtLocation(inputParam.name);
    if (sym) {
      builder.inputSymbol = sym;
      builder.addVariable(sym, {
        symbol: sym,
        type: StepVariableType.Input,
        jsonPath: dialect?.inputRoot() ?? '$',
        definitelyAssigned: true,
        constant: true,
      });
    }
  }

  // Scan source file for top-level service binding declarations
  const sourceFile = callSite.file;

  // When analyzer is available, use whole-program data flow results
  if (analyzer) {
    const env = analyzer.analyzeFile(sourceFile);
    for (const stmt of sourceFile.statements) {
      if (!ts.isVariableStatement(stmt)) continue;
      for (const decl of stmt.declarationList.declarations) {
        if (!decl.initializer) continue;
        if (!ts.isIdentifier(decl.name)) continue;

        const sym = context.checker.getSymbolAtLocation(decl.name);
        if (!sym) continue;
        if (builder.getBySymbol(sym)) continue; // already classified as param

        const serviceMatch = matchServiceBinding(context, decl.initializer, serviceRegistry);
        if (serviceMatch) {
          const varName = decl.name.text;
          let resourceValue: unknown = substitutions?.[varName] ?? serviceMatch.resourceArn;

          // If simple ARN extraction failed, try WPA evaluation (supports
          // pure function inlining, e.g. Lambda(makeArn('ProcessOrder')))
          if (resourceValue === undefined) {
            const arnArg = getServiceArnArgument(decl.initializer);
            if (arnArg) {
              const latticeVal = analyzer.evaluateExpression(arnArg, sourceFile);
              if (isConstant(latticeVal) && typeof latticeVal.value === 'string') {
                resourceValue = latticeVal.value;
              }
            }
          }

          builder.addVariable(sym, {
            symbol: sym,
            type: StepVariableType.External,
            definitelyAssigned: true,
            constant: true,
            serviceBinding: serviceMatch.serviceName,
            literalValue: resourceValue,
          });
        } else {
          // Use lattice value from whole-program analysis
          const latticeVal = env.resolve(sym);
          if (isConstant(latticeVal)) {
            // Warn if let/var is used when const would suffice
            const isConst = !!(stmt.declarationList.flags & ts.NodeFlags.Const);
            if (!isConst) {
              const keyword = stmt.declarationList.flags & ts.NodeFlags.Let ? 'let' : 'var';
              context.addWarning(
                decl.name,
                `Variable '${decl.name.text}' is declared with '${keyword}' but has a compile-time constant value. Consider using 'const' for clarity and to prevent accidental reassignment.`,
                ErrorCodes.DataFlow.PreferConst,
              );
            }
            builder.addVariable(sym, {
              symbol: sym,
              type: StepVariableType.Constant,
              definitelyAssigned: true,
              constant: true,
              literalValue: latticeVal.value,
            });
          } else if (isBottom(latticeVal) && latticeVal.isSafe) {
            // Steps.safeVar() — warn but allow
            context.addWarning(decl.name, `Variable '${decl.name.text}' is not a compile-time constant (wrapped in Steps.safeVar())`, ErrorCodes.DataFlow.SafeVarEscapeHatch);
          } else if (isBottom(latticeVal)) {
            // Non-constant, non-safe — this will be caught when the variable
            // is used in an expression that requires a constant value
          }
        }
      }
    }

    // Also resolve imported constants via WPA
    for (const stmt of sourceFile.statements) {
      if (!ts.isImportDeclaration(stmt)) continue;
      if (!stmt.importClause?.namedBindings) continue;
      if (!ts.isNamedImports(stmt.importClause.namedBindings)) continue;

      for (const spec of stmt.importClause.namedBindings.elements) {
        const sym = context.checker.getSymbolAtLocation(spec.name);
        if (!sym) continue;
        if (builder.getBySymbol(sym)) continue; // already classified

        const latticeVal = env.resolve(sym);
        if (isConstant(latticeVal)) {
          builder.addVariable(sym, {
            symbol: sym,
            type: StepVariableType.Constant,
            definitelyAssigned: true,
            constant: true,
            literalValue: latticeVal.value,
          });
        }
      }
    }
  } else {
    // Fallback: original single-file scan without whole-program analysis
    for (const stmt of sourceFile.statements) {
      if (!ts.isVariableStatement(stmt)) continue;
      for (const decl of stmt.declarationList.declarations) {
        if (!decl.initializer) continue;
        if (!ts.isIdentifier(decl.name)) continue;

        const sym = context.checker.getSymbolAtLocation(decl.name);
        if (!sym) continue;

        const serviceMatch = matchServiceBinding(context, decl.initializer, serviceRegistry);
        if (serviceMatch) {
          const varName = (decl.name as ts.Identifier).text;
          const resourceValue = substitutions?.[varName] ?? serviceMatch.resourceArn;
          builder.addVariable(sym, {
            symbol: sym,
            type: StepVariableType.External,
            definitelyAssigned: true,
            constant: true,
            serviceBinding: serviceMatch.serviceName,
            literalValue: resourceValue,
          });
        } else if (stmt.declarationList.flags & ts.NodeFlags.Const) {
          const constValue = tryFoldConstant(decl.initializer, builder);
          if (constValue !== undefined) {
            builder.addVariable(sym, {
              symbol: sym,
              type: StepVariableType.Constant,
              definitelyAssigned: true,
              constant: true,
              literalValue: constValue,
            });
          }
        }
      }
    }
  }

  return builder;
}

/** Check whether dialect is JSONata mode. */
function isJsonata(dialect?: PathDialect): boolean {
  return dialect?.isJsonata() === true;
}

/**
 * Emit a SS540 error for features only available in JSONata mode.
 * Returns `{ kind: 'unknown' }` for convenient use in return statements.
 */
function jsonataOnlyError(
  context: CompilerContext,
  node: ts.Node,
  feature: string,
): ResolvedExpression {
  context.addError(
    node,
    `'${feature}' is not supported in JSONPath mode. Switch to JSONata mode (queryLanguage: 'JSONata') to use this feature.`,
    ErrorCodes.Expr.JsonataOnlyFeature.code,
  );
  return { kind: 'unknown' };
}

/**
 * Resolve a TS expression to a JSONPath string or literal value.
 */
export function resolveExpression(
  context: CompilerContext,
  expr: ts.Expression,
  variables: VariableResolution,
  dialect?: PathDialect,
): ResolvedExpression {
  // String literal
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
    return { kind: 'literal', value: expr.text };
  }

  // Template expression: `Hello ${name}` → States.Format('Hello {}', name) or 'Hello ' & $name
  if (ts.isTemplateExpression(expr)) {
    return resolveTemplateExpression(context, expr, variables, dialect);
  }

  // Numeric literal
  if (ts.isNumericLiteral(expr)) {
    return { kind: 'literal', value: Number(expr.text) };
  }

  // Boolean literals
  if (expr.kind === ts.SyntaxKind.TrueKeyword) {
    return { kind: 'literal', value: true };
  }
  if (expr.kind === ts.SyntaxKind.FalseKeyword) {
    return { kind: 'literal', value: false };
  }

  // null
  if (expr.kind === ts.SyntaxKind.NullKeyword) {
    return { kind: 'literal', value: null };
  }

  // Identifier — look up in variables
  if (ts.isIdentifier(expr)) {
    const sym = context.checker.getSymbolAtLocation(expr);
    if (sym) {
      const info = variables.variables.get(sym);
      if (info) {
        if (info.intrinsicPath) {
          return { kind: 'intrinsic', path: info.intrinsicPath };
        }
        if (info.type === StepVariableType.Constant && info.literalValue !== undefined) {
          return { kind: 'literal', value: info.literalValue };
        }
        if (info.jsonPath) {
          return { kind: 'jsonpath', path: info.jsonPath };
        }
      }

      // Check deferred inline bindings — resolve the argument expression lazily
      if (variables.deferredBindings) {
        const argExpr = variables.deferredBindings.get(sym);
        if (argExpr) {
          return resolveExpression(context, argExpr, variables, dialect);
        }
      }
    }
    return { kind: 'unknown' };
  }

  // Property access: a.b.c or arr.length
  if (ts.isPropertyAccessExpression(expr)) {
    const base = resolveExpression(context, expr.expression, variables, dialect);
    const propName = expr.name.text;

    // arr.length → States.ArrayLength(arr) or $count(arr)
    if (propName === 'length' && (base.kind === 'jsonpath' || base.kind === 'intrinsic')) {
      const argStr = base.path!;
      if (isJsonata(dialect)) {
        return { kind: 'intrinsic', path: `$count(${argStr})` };
      }
      return { kind: 'intrinsic', path: `States.ArrayLength(${argStr})` };
    }

    if (base.kind === 'jsonpath') {
      // Special case: input.field → $.field (not $.input.field)
      // because input maps to '$' directly
      return { kind: 'jsonpath', path: `${base.path}.${propName}` };
    }

    return { kind: 'unknown' };
  }

  // Element access: arr[index] → States.ArrayGetItem(arr, index) or arr[index]
  if (ts.isElementAccessExpression(expr)) {
    const base = resolveExpression(context, expr.expression, variables, dialect);
    if ((base.kind === 'jsonpath' || base.kind === 'intrinsic') && expr.argumentExpression) {
      const index = resolveExpression(context, expr.argumentExpression, variables, dialect);
      const baseStr = base.path!;
      const indexStr = serializeArg(index, dialect);
      if (indexStr !== null) {
        if (isJsonata(dialect)) {
          return { kind: 'intrinsic', path: `${baseStr}[${indexStr}]` };
        }
        return { kind: 'intrinsic', path: `States.ArrayGetItem(${baseStr}, ${indexStr})` };
      }
    }
    return { kind: 'unknown' };
  }

  // Object literal — return as literal, or handle spread → States.JsonMerge / $merge
  if (ts.isObjectLiteralExpression(expr)) {
    return resolveObjectLiteral(context, expr, variables, dialect);
  }

  // Array literal with dynamic elements → States.Array(...) or [a, b]
  if (ts.isArrayLiteralExpression(expr)) {
    return resolveArrayLiteral(context, expr, variables, dialect);
  }

  // Call expression: Steps.format(), str.split(), JSON.parse(), etc.
  if (ts.isCallExpression(expr)) {
    return resolveCallExpression(context, expr, variables, dialect);
  }

  // Binary expression: a + b
  if (ts.isBinaryExpression(expr)) {
    return resolveBinaryExpression(context, expr, variables, dialect);
  }

  // Conditional (ternary): cond ? a : b
  // Only handles compile-time constant conditions here.
  // Runtime ternaries are handled by the CFG ternaryAssign terminator.
  if (ts.isConditionalExpression(expr)) {
    const cond = resolveExpression(context, expr.condition, variables, dialect);
    if (cond.kind === 'literal' && cond.value !== undefined) {
      return resolveExpression(context, cond.value ? expr.whenTrue : expr.whenFalse, variables, dialect);
    }
    return { kind: 'unknown' };
  }

  // typeof expression: typeof x → $type(x)  [JSONata only]
  if (ts.isTypeOfExpression(expr)) {
    const operand = resolveExpression(context, expr.expression, variables, dialect);
    if ((operand.kind === 'jsonpath' || operand.kind === 'intrinsic') && operand.path) {
      if (isJsonata(dialect)) {
        return { kind: 'intrinsic', path: `$type(${operand.path})` };
      }
      return jsonataOnlyError(context, expr, 'typeof');
    }
    return { kind: 'unknown' };
  }

  return { kind: 'unknown' };
}

/**
 * Extract the ARN or resource identifier from a service binding variable.
 */
export function extractResourceArn(
  context: CompilerContext,
  symbol: ts.Symbol,
): string | undefined {
  const declarations = symbol.declarations;
  if (!declarations || declarations.length === 0) return undefined;

  const decl = declarations[0];
  if (!ts.isVariableDeclaration(decl) || !decl.initializer) return undefined;

  return extractArnFromExpression(decl.initializer, context.checker);
}

// ---------------------------------------------------------------------------
// Intrinsic function resolution
// ---------------------------------------------------------------------------

/** Maps Steps.method() names to ASL States.* intrinsic names. */
const STEPS_TO_INTRINSIC: Record<string, string> = {
  format: 'States.Format',
  uuid: 'States.UUID',
  add: 'States.MathAdd',
  random: 'States.MathRandom',
  hash: 'States.Hash',
  base64Encode: 'States.Base64Encode',
  base64Decode: 'States.Base64Decode',
  array: 'States.Array',
  arrayPartition: 'States.ArrayPartition',
  arrayContains: 'States.ArrayContains',
  arrayRange: 'States.ArrayRange',
  arrayGetItem: 'States.ArrayGetItem',
  arrayLength: 'States.ArrayLength',
  arrayUnique: 'States.ArrayUnique',
  jsonParse: 'States.StringToJson',
  jsonStringify: 'States.JsonToString',
  merge: 'States.JsonMerge',
};

/**
 * Serialize a resolved expression as an ASL intrinsic function argument.
 * - Strings: single-quoted with escaping for ', {, }, \
 * - Numbers/booleans: bare
 * - JSONPaths: bare ($.field)
 * - Nested intrinsics: bare (States.Format(...))
 */
function serializeIntrinsicArg(resolved: ResolvedExpression): string | null {
  switch (resolved.kind) {
    case 'literal': {
      const v = resolved.value;
      if (typeof v === 'string') {
        // Single-quote the string, escape only backslashes and single quotes.
        // Do NOT escape { and } — they serve as placeholders in States.Format.
        const escaped = v
          .replace(/\\/g, '\\\\')
          .replace(/'/g, "\\'");
        return `'${escaped}'`;
      }
      if (typeof v === 'number' || typeof v === 'boolean') {
        return String(v);
      }
      if (v === null) {
        return 'null';
      }
      return null;
    }
    case 'jsonpath':
      return resolved.path!;
    case 'intrinsic':
      return resolved.path!;
    default:
      return null;
  }
}

/**
 * Serialize a resolved expression as a JSONata sub-expression.
 * Like serializeIntrinsicArg but for native JSONata output.
 */
function serializeJsonataArg(resolved: ResolvedExpression): string | null {
  switch (resolved.kind) {
    case 'literal': {
      const v = resolved.value;
      if (typeof v === 'string') {
        const escaped = v.replace(/'/g, "\\'");
        return `'${escaped}'`;
      }
      if (typeof v === 'number' || typeof v === 'boolean') {
        return String(v);
      }
      if (v === null) return 'null';
      return null;
    }
    case 'jsonpath':
      return resolved.path!;
    case 'intrinsic':
      return resolved.path!;
    default:
      return null;
  }
}

/** Dispatch to the appropriate arg serializer based on dialect. */
function serializeArg(resolved: ResolvedExpression, dialect?: PathDialect): string | null {
  return isJsonata(dialect) ? serializeJsonataArg(resolved) : serializeIntrinsicArg(resolved);
}

/**
 * Resolve a template expression (`Hello ${name}`) to a States.Format intrinsic.
 * If all substitutions are literals, folds to a plain string at compile time.
 */
function resolveTemplateExpression(
  context: CompilerContext,
  expr: ts.TemplateExpression,
  variables: VariableResolution,
  dialect?: PathDialect,
): ResolvedExpression {
  // Build format string: head + {} placeholders + middle/tail text
  let formatStr = expr.head.text;
  const resolvedArgs: ResolvedExpression[] = [];

  for (const span of expr.templateSpans) {
    const resolved = resolveExpression(context, span.expression, variables, dialect);
    resolvedArgs.push(resolved);
    formatStr += '{}';
    formatStr += span.literal.text;
  }

  // Optimization: if ALL substitutions are literals, fold at compile time
  const allLiteral = resolvedArgs.every(r => r.kind === 'literal');
  if (allLiteral) {
    let result = expr.head.text;
    for (let i = 0; i < resolvedArgs.length; i++) {
      result += String(resolvedArgs[i].value);
      result += expr.templateSpans[i].literal.text;
    }
    return { kind: 'literal', value: result };
  }

  // JSONata mode: use native & concatenation
  if (isJsonata(dialect)) {
    return resolveJsonataTemplateExpression(context, expr, resolvedArgs, dialect);
  }

  // Serialize each arg for the States.Format call
  const serializedArgs: string[] = [];
  for (const resolved of resolvedArgs) {
    const serialized = serializeIntrinsicArg(resolved);
    if (serialized === null) return { kind: 'unknown' };
    serializedArgs.push(serialized);
  }

  // Escape single quotes and backslashes in format string (NOT { and })
  const escaped = formatStr
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'");

  const allArgs = [`'${escaped}'`, ...serializedArgs].join(', ');
  return { kind: 'intrinsic', path: `States.Format(${allArgs})` };
}

/**
 * JSONata template expression: `Hello ${name}!` → 'Hello ' & $name & '!'
 */
function resolveJsonataTemplateExpression(
  _context: CompilerContext,
  expr: ts.TemplateExpression,
  resolvedArgs: ResolvedExpression[],
  _dialect?: PathDialect,
): ResolvedExpression {
  const parts: string[] = [];

  if (expr.head.text) {
    parts.push(`'${expr.head.text.replace(/'/g, "\\'")}'`);
  }

  for (let i = 0; i < expr.templateSpans.length; i++) {
    const argStr = serializeJsonataArg(resolvedArgs[i]);
    if (argStr === null) return { kind: 'unknown' };
    parts.push(argStr);

    const tailText = expr.templateSpans[i].literal.text;
    if (tailText) {
      parts.push(`'${tailText.replace(/'/g, "\\'")}'`);
    }
  }

  if (parts.length === 0) return { kind: 'literal', value: '' };
  if (parts.length === 1) return { kind: 'intrinsic', path: parts[0] };
  return { kind: 'intrinsic', path: parts.join(' & ') };
}

/**
 * Analyze a callback (arrow function or function expression) and resolve its
 * body to a JSONata expression. Returns the parameter names (prefixed with $)
 * and the resolved body string, or null if the callback is too complex.
 *
 * Supports:
 * - Expression bodies: `x => x.name`
 * - Single-return block bodies: `x => { return x.name; }`
 */
function resolveCallbackToJsonata(
  context: CompilerContext,
  callback: ts.ArrowFunction | ts.FunctionExpression,
  variables: VariableResolution,
  dialect?: PathDialect,
): { params: string[]; body: string } | null {
  // Extract parameters — only simple identifier params supported
  const paramNames: string[] = [];
  const paramSymbols: Array<{ sym: ts.Symbol; name: string }> = [];
  for (const param of callback.parameters) {
    if (!ts.isIdentifier(param.name)) return null; // destructured params not supported
    const name = param.name.text;
    const sym = context.checker.getSymbolAtLocation(param.name);
    if (!sym) return null;
    paramNames.push(`$${name}`);
    paramSymbols.push({ sym, name });
  }

  // Extract body expression
  let bodyExpr: ts.Expression | undefined;
  if (ts.isBlock(callback.body)) {
    // Block body: must be a single return statement
    const stmts = callback.body.statements;
    if (stmts.length !== 1 || !ts.isReturnStatement(stmts[0]) || !stmts[0].expression) {
      return null;
    }
    bodyExpr = stmts[0].expression;
  } else {
    // Expression body: (x) => expr
    bodyExpr = callback.body;
  }

  // Create child variable resolution with callback params as JSONata variables
  const childVars: VariableResolution = {
    variables: new Map([
      ...variables.variables,
      ...paramSymbols.map(({ sym, name }) => [
        sym,
        {
          symbol: sym,
          type: StepVariableType.StateOutput,
          jsonPath: `$${name}`,
          definitelyAssigned: true,
          constant: false,
        } satisfies VariableInfo,
      ] as [ts.Symbol, VariableInfo]),
    ]),
    inputSymbol: variables.inputSymbol,
    contextSymbol: variables.contextSymbol,
    deferredBindings: variables.deferredBindings,
  };

  const resolved = resolveExpression(context, bodyExpr, childVars, dialect);
  if (resolved.kind === 'unknown') return null;

  const bodyStr = serializeArg(resolved, dialect);
  if (bodyStr === null) return null;

  return { params: paramNames, body: bodyStr };
}

/**
 * Resolve a call expression to an intrinsic function.
 * Handles Steps.* calls and JS method mappings (str.split, JSON.parse, etc.).
 */
function resolveCallExpression(
  context: CompilerContext,
  expr: ts.CallExpression,
  variables: VariableResolution,
  dialect?: PathDialect,
): ResolvedExpression {
  const jsonata = isJsonata(dialect);

  // Steps.method() — direct intrinsic mapping
  if (ts.isPropertyAccessExpression(expr.expression)) {
    const callee = expr.expression;
    const methodName = callee.name.text;

    // Check for Steps.* intrinsic
    if (ts.isIdentifier(callee.expression) && callee.expression.text === 'Steps') {
      if (jsonata) {
        return resolveJsonataStepsCall(context, methodName, expr.arguments, variables, dialect);
      }
      const intrinsicName = STEPS_TO_INTRINSIC[methodName];
      if (intrinsicName) {
        return buildIntrinsicFromArgs(context, intrinsicName, expr.arguments, variables, dialect);
      }
    }

    // JS method mappings on resolved values
    const base = resolveExpression(context, callee.expression, variables, dialect);
    if (base.kind === 'jsonpath' || base.kind === 'intrinsic') {
      const baseStr = base.path!;

      // str.split(delim) → States.StringSplit(str, delim) or $split(str, delim)
      if (methodName === 'split' && expr.arguments.length === 1) {
        const delimResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
        const delimStr = serializeArg(delimResolved, dialect);
        if (delimStr !== null) {
          if (jsonata) {
            return { kind: 'intrinsic', path: `$split(${baseStr}, ${delimStr})` };
          }
          return { kind: 'intrinsic', path: `States.StringSplit(${baseStr}, ${delimStr})` };
        }
      }

      // str.toUpperCase() → $uppercase(str)  [JSONata only]
      if (methodName === 'toUpperCase' && expr.arguments.length === 0) {
        if (jsonata) {
          return { kind: 'intrinsic', path: `$uppercase(${baseStr})` };
        }
        return jsonataOnlyError(context, expr, 'str.toUpperCase()');
      }

      // str.toLowerCase() → $lowercase(str)  [JSONata only]
      if (methodName === 'toLowerCase' && expr.arguments.length === 0) {
        if (jsonata) {
          return { kind: 'intrinsic', path: `$lowercase(${baseStr})` };
        }
        return jsonataOnlyError(context, expr, 'str.toLowerCase()');
      }

      // str.trim() / trimStart() / trimEnd() → $trim(str)  [JSONata only]
      if ((methodName === 'trim' || methodName === 'trimStart' || methodName === 'trimEnd') && expr.arguments.length === 0) {
        if (jsonata) {
          return { kind: 'intrinsic', path: `$trim(${baseStr})` };
        }
        return jsonataOnlyError(context, expr, `str.${methodName}()`);
      }

      // str.substring(start, end?) → $substring(str, start, end - start)  [JSONata only]
      if (methodName === 'substring' && expr.arguments.length >= 1 && expr.arguments.length <= 2) {
        if (jsonata) {
          const startResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
          const startStr = serializeArg(startResolved, dialect);
          if (startStr !== null) {
            if (expr.arguments.length === 1) {
              return { kind: 'intrinsic', path: `$substring(${baseStr}, ${startStr})` };
            }
            const endResolved = resolveExpression(context, expr.arguments[1], variables, dialect);
            const endStr = serializeArg(endResolved, dialect);
            if (endStr !== null) {
              // JSONata $substring uses (str, start, length), JS uses (start, end)
              // length = end - start
              if (startResolved.kind === 'literal' && endResolved.kind === 'literal'
                && typeof startResolved.value === 'number' && typeof endResolved.value === 'number') {
                const len = endResolved.value - startResolved.value;
                return { kind: 'intrinsic', path: `$substring(${baseStr}, ${startStr}, ${len})` };
              }
              return { kind: 'intrinsic', path: `$substring(${baseStr}, ${startStr}, ${endStr} - ${startStr})` };
            }
          }
        }
        return jsonataOnlyError(context, expr, 'str.substring()');
      }

      // str.startsWith(s) → $substring(str, 0, $length(s)) = s  [JSONata only]
      if (methodName === 'startsWith' && expr.arguments.length === 1) {
        if (jsonata) {
          const sResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
          const sStr = serializeArg(sResolved, dialect);
          if (sStr !== null) {
            if (sResolved.kind === 'literal' && typeof sResolved.value === 'string') {
              const len = sResolved.value.length;
              return { kind: 'intrinsic', path: `$substring(${baseStr}, 0, ${len}) = ${sStr}` };
            }
            return { kind: 'intrinsic', path: `$substring(${baseStr}, 0, $length(${sStr})) = ${sStr}` };
          }
        }
        return jsonataOnlyError(context, expr, 'str.startsWith()');
      }

      // str.endsWith(s) → $substring(str, $length(str) - $length(s)) = s  [JSONata only]
      if (methodName === 'endsWith' && expr.arguments.length === 1) {
        if (jsonata) {
          const sResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
          const sStr = serializeArg(sResolved, dialect);
          if (sStr !== null) {
            if (sResolved.kind === 'literal' && typeof sResolved.value === 'string') {
              const len = sResolved.value.length;
              return { kind: 'intrinsic', path: `$substring(${baseStr}, $length(${baseStr}) - ${len}) = ${sStr}` };
            }
            return { kind: 'intrinsic', path: `$substring(${baseStr}, $length(${baseStr}) - $length(${sStr})) = ${sStr}` };
          }
        }
        return jsonataOnlyError(context, expr, 'str.endsWith()');
      }

      // str.padStart(n, c?) → $pad(str, -n, c)  [JSONata only]
      if (methodName === 'padStart' && expr.arguments.length >= 1 && expr.arguments.length <= 2) {
        if (jsonata) {
          const nResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
          const nStr = serializeArg(nResolved, dialect);
          if (nStr !== null) {
            // JSONata $pad with negative width = left-pad (padStart)
            const negWidth = nResolved.kind === 'literal' && typeof nResolved.value === 'number'
              ? String(-nResolved.value)
              : `-${nStr}`;
            if (expr.arguments.length === 2) {
              const cResolved = resolveExpression(context, expr.arguments[1], variables, dialect);
              const cStr = serializeArg(cResolved, dialect);
              if (cStr !== null) {
                return { kind: 'intrinsic', path: `$pad(${baseStr}, ${negWidth}, ${cStr})` };
              }
            }
            return { kind: 'intrinsic', path: `$pad(${baseStr}, ${negWidth})` };
          }
        }
        return jsonataOnlyError(context, expr, 'str.padStart()');
      }

      // str.padEnd(n, c?) → $pad(str, n, c)  [JSONata only]
      if (methodName === 'padEnd' && expr.arguments.length >= 1 && expr.arguments.length <= 2) {
        if (jsonata) {
          const nResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
          const nStr = serializeArg(nResolved, dialect);
          if (nStr !== null) {
            if (expr.arguments.length === 2) {
              const cResolved = resolveExpression(context, expr.arguments[1], variables, dialect);
              const cStr = serializeArg(cResolved, dialect);
              if (cStr !== null) {
                return { kind: 'intrinsic', path: `$pad(${baseStr}, ${nStr}, ${cStr})` };
              }
            }
            return { kind: 'intrinsic', path: `$pad(${baseStr}, ${nStr})` };
          }
        }
        return jsonataOnlyError(context, expr, 'str.padEnd()');
      }

      // str.replace(pattern, replacement) → $replace(str, pattern, replacement)  [JSONata only]
      if (methodName === 'replace' && expr.arguments.length === 2) {
        if (jsonata) {
          const patResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
          const patStr = serializeArg(patResolved, dialect);
          const repResolved = resolveExpression(context, expr.arguments[1], variables, dialect);
          const repStr = serializeArg(repResolved, dialect);
          if (patStr !== null && repStr !== null) {
            return { kind: 'intrinsic', path: `$replace(${baseStr}, ${patStr}, ${repStr})` };
          }
        }
        return jsonataOnlyError(context, expr, 'str.replace()');
      }

      // str.charAt(i) → $substring(str, i, 1)  [JSONata only]
      if (methodName === 'charAt' && expr.arguments.length === 1) {
        if (jsonata) {
          const iResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
          const iStr = serializeArg(iResolved, dialect);
          if (iStr !== null) {
            return { kind: 'intrinsic', path: `$substring(${baseStr}, ${iStr}, 1)` };
          }
        }
        return jsonataOnlyError(context, expr, 'str.charAt()');
      }

      // str.repeat(n) → $join($map([1..n], function() { str }))  [JSONata only]
      if (methodName === 'repeat' && expr.arguments.length === 1) {
        if (jsonata) {
          const nResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
          const nStr = serializeArg(nResolved, dialect);
          if (nStr !== null) {
            return { kind: 'intrinsic', path: `$join($map([1..${nStr}], function() { ${baseStr} }))` };
          }
        }
        return jsonataOnlyError(context, expr, 'str.repeat()');
      }

      // str.includes(s) → $contains(str, s)  [JSONata only for strings]
      // Note: arr.includes(val) falls through to array handler below
      // We can't statically distinguish string from array here,
      // so in JSONata mode we try $contains first (works for both).

      // arr.includes(val) → States.ArrayContains(arr, val) or val in arr
      if (methodName === 'includes' && expr.arguments.length === 1) {
        const valResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
        const valStr = serializeArg(valResolved, dialect);
        if (valStr !== null) {
          if (jsonata) {
            return { kind: 'intrinsic', path: `${valStr} in ${baseStr}` };
          }
          return { kind: 'intrinsic', path: `States.ArrayContains(${baseStr}, ${valStr})` };
        }
      }

      // arr.join(sep?) → $join(arr, sep)  [JSONata only]
      if (methodName === 'join') {
        if (jsonata) {
          if (expr.arguments.length === 0) {
            return { kind: 'intrinsic', path: `$join(${baseStr})` };
          }
          if (expr.arguments.length === 1) {
            const sepResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
            const sepStr = serializeArg(sepResolved, dialect);
            if (sepStr !== null) {
              return { kind: 'intrinsic', path: `$join(${baseStr}, ${sepStr})` };
            }
          }
        }
        return jsonataOnlyError(context, expr, 'arr.join()');
      }

      // arr.reverse() → $reverse(arr)  [JSONata only]
      if (methodName === 'reverse' && expr.arguments.length === 0) {
        if (jsonata) {
          return { kind: 'intrinsic', path: `$reverse(${baseStr})` };
        }
        return jsonataOnlyError(context, expr, 'arr.reverse()');
      }

      // arr.sort() → $sort(arr)  [JSONata only]
      if (methodName === 'sort' && expr.arguments.length === 0) {
        if (jsonata) {
          return { kind: 'intrinsic', path: `$sort(${baseStr})` };
        }
        return jsonataOnlyError(context, expr, 'arr.sort()');
      }

      // arr.concat(b) → $append(arr, b)  [JSONata only]
      if (methodName === 'concat' && expr.arguments.length === 1) {
        if (jsonata) {
          const bResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
          const bStr = serializeArg(bResolved, dialect);
          if (bStr !== null) {
            return { kind: 'intrinsic', path: `$append(${baseStr}, ${bStr})` };
          }
        }
        return jsonataOnlyError(context, expr, 'arr.concat()');
      }

      // --- Callback array methods (JSONata only, pure expressions) ---

      // arr.map(fn) → $map(arr, function($v) { expr })
      if (methodName === 'map' && expr.arguments.length === 1) {
        const cbArg = expr.arguments[0];
        if (jsonata && (ts.isArrowFunction(cbArg) || ts.isFunctionExpression(cbArg))) {
          const cb = resolveCallbackToJsonata(context, cbArg, variables, dialect);
          if (cb) {
            return { kind: 'intrinsic', path: `$map(${baseStr}, function(${cb.params.join(', ')}) { ${cb.body} })` };
          }
        }
        // Don't error — may be handled by cfgBuilder as a Map state for async callbacks
      }

      // arr.filter(fn) → $filter(arr, function($v) { pred })
      if (methodName === 'filter' && expr.arguments.length === 1) {
        const cbArg = expr.arguments[0];
        if (jsonata && (ts.isArrowFunction(cbArg) || ts.isFunctionExpression(cbArg))) {
          const cb = resolveCallbackToJsonata(context, cbArg, variables, dialect);
          if (cb) {
            return { kind: 'intrinsic', path: `$filter(${baseStr}, function(${cb.params.join(', ')}) { ${cb.body} })` };
          }
        }
      }

      // arr.reduce(fn, init) → $reduce(arr, function($prev, $v) { expr }, init)
      if (methodName === 'reduce' && expr.arguments.length === 2) {
        const cbArg = expr.arguments[0];
        if (jsonata && (ts.isArrowFunction(cbArg) || ts.isFunctionExpression(cbArg))) {
          const cb = resolveCallbackToJsonata(context, cbArg, variables, dialect);
          if (cb) {
            const initResolved = resolveExpression(context, expr.arguments[1], variables, dialect);
            const initStr = serializeArg(initResolved, dialect);
            if (initStr !== null) {
              return { kind: 'intrinsic', path: `$reduce(${baseStr}, function(${cb.params.join(', ')}) { ${cb.body} }, ${initStr})` };
            }
          }
        }
      }

      // arr.find(fn) → $filter(arr, function($v) { pred })[0]
      if (methodName === 'find' && expr.arguments.length === 1) {
        const cbArg = expr.arguments[0];
        if (jsonata && (ts.isArrowFunction(cbArg) || ts.isFunctionExpression(cbArg))) {
          const cb = resolveCallbackToJsonata(context, cbArg, variables, dialect);
          if (cb) {
            return { kind: 'intrinsic', path: `$filter(${baseStr}, function(${cb.params.join(', ')}) { ${cb.body} })[0]` };
          }
        }
      }

      // arr.some(fn) → $count($filter(arr, function($v) { pred })) > 0
      if (methodName === 'some' && expr.arguments.length === 1) {
        const cbArg = expr.arguments[0];
        if (jsonata && (ts.isArrowFunction(cbArg) || ts.isFunctionExpression(cbArg))) {
          const cb = resolveCallbackToJsonata(context, cbArg, variables, dialect);
          if (cb) {
            return { kind: 'intrinsic', path: `$count($filter(${baseStr}, function(${cb.params.join(', ')}) { ${cb.body} })) > 0` };
          }
        }
      }

      // arr.every(fn) → $count($filter(arr, function($v) { pred })) = $count(arr)
      if (methodName === 'every' && expr.arguments.length === 1) {
        const cbArg = expr.arguments[0];
        if (jsonata && (ts.isArrowFunction(cbArg) || ts.isFunctionExpression(cbArg))) {
          const cb = resolveCallbackToJsonata(context, cbArg, variables, dialect);
          if (cb) {
            return { kind: 'intrinsic', path: `$count($filter(${baseStr}, function(${cb.params.join(', ')}) { ${cb.body} })) = $count(${baseStr})` };
          }
        }
      }
    }

    // JSON.parse(str) → States.StringToJson(str) or $eval(str)
    if (ts.isIdentifier(callee.expression) && callee.expression.text === 'JSON') {
      if (methodName === 'parse' && expr.arguments.length >= 1) {
        const argResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
        const argStr = serializeArg(argResolved, dialect);
        if (argStr !== null) {
          return { kind: 'intrinsic', path: jsonata ? `$eval(${argStr})` : `States.StringToJson(${argStr})` };
        }
      }
      if (methodName === 'stringify' && expr.arguments.length >= 1) {
        const argResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
        const argStr = serializeArg(argResolved, dialect);
        if (argStr !== null) {
          return { kind: 'intrinsic', path: jsonata ? `$string(${argStr})` : `States.JsonToString(${argStr})` };
        }
      }
    }

    // crypto.randomUUID() → States.UUID() or $uuid()
    if (ts.isIdentifier(callee.expression) && callee.expression.text === 'crypto') {
      if (methodName === 'randomUUID' && expr.arguments.length === 0) {
        return { kind: 'intrinsic', path: jsonata ? '$uuid()' : 'States.UUID()' };
      }
    }

    // Math.* methods  [JSONata only]
    if (ts.isIdentifier(callee.expression) && callee.expression.text === 'Math') {
      const MATH_UNARY: Record<string, string> = {
        floor: '$floor', ceil: '$ceil', round: '$round',
        abs: '$abs', sqrt: '$sqrt',
      };
      if (methodName in MATH_UNARY && expr.arguments.length === 1) {
        if (jsonata) {
          const argResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
          const argStr = serializeArg(argResolved, dialect);
          if (argStr !== null) {
            return { kind: 'intrinsic', path: `${MATH_UNARY[methodName]}(${argStr})` };
          }
        }
        return jsonataOnlyError(context, expr, `Math.${methodName}()`);
      }

      // Math.pow(a, b) → $power(a, b)
      if (methodName === 'pow' && expr.arguments.length === 2) {
        if (jsonata) {
          const aResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
          const aStr = serializeArg(aResolved, dialect);
          const bResolved = resolveExpression(context, expr.arguments[1], variables, dialect);
          const bStr = serializeArg(bResolved, dialect);
          if (aStr !== null && bStr !== null) {
            return { kind: 'intrinsic', path: `$power(${aStr}, ${bStr})` };
          }
        }
        return jsonataOnlyError(context, expr, 'Math.pow()');
      }

      // Math.min(...args) → $min([args])
      if (methodName === 'min' && expr.arguments.length >= 1) {
        if (jsonata) {
          const parts: string[] = [];
          for (const arg of expr.arguments) {
            const r = resolveExpression(context, arg, variables, dialect);
            const s = serializeArg(r, dialect);
            if (s === null) break;
            parts.push(s);
          }
          if (parts.length === expr.arguments.length) {
            return { kind: 'intrinsic', path: `$min([${parts.join(', ')}])` };
          }
        }
        return jsonataOnlyError(context, expr, 'Math.min()');
      }

      // Math.max(...args) → $max([args])
      if (methodName === 'max' && expr.arguments.length >= 1) {
        if (jsonata) {
          const parts: string[] = [];
          for (const arg of expr.arguments) {
            const r = resolveExpression(context, arg, variables, dialect);
            const s = serializeArg(r, dialect);
            if (s === null) break;
            parts.push(s);
          }
          if (parts.length === expr.arguments.length) {
            return { kind: 'intrinsic', path: `$max([${parts.join(', ')}])` };
          }
        }
        return jsonataOnlyError(context, expr, 'Math.max()');
      }

      // Math.random() → $random()
      if (methodName === 'random' && expr.arguments.length === 0) {
        if (jsonata) {
          return { kind: 'intrinsic', path: '$random()' };
        }
        return jsonataOnlyError(context, expr, 'Math.random()');
      }
    }

    // Object.keys(o) → $keys(o)  [JSONata only]
    if (ts.isIdentifier(callee.expression) && callee.expression.text === 'Object') {
      if (methodName === 'keys' && expr.arguments.length === 1) {
        if (jsonata) {
          const argResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
          const argStr = serializeArg(argResolved, dialect);
          if (argStr !== null) {
            return { kind: 'intrinsic', path: `$keys(${argStr})` };
          }
        }
        return jsonataOnlyError(context, expr, 'Object.keys()');
      }

      // Object.values(o) → $lookup(o, $keys(o))  [JSONata only]
      if (methodName === 'values' && expr.arguments.length === 1) {
        if (jsonata) {
          const argResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
          const argStr = serializeArg(argResolved, dialect);
          if (argStr !== null) {
            return { kind: 'intrinsic', path: `$lookup(${argStr}, $keys(${argStr}))` };
          }
        }
        return jsonataOnlyError(context, expr, 'Object.values()');
      }
    }

    // Date.now() → $millis()  [JSONata only]
    if (ts.isIdentifier(callee.expression) && callee.expression.text === 'Date') {
      if (methodName === 'now' && expr.arguments.length === 0) {
        if (jsonata) {
          return { kind: 'intrinsic', path: '$millis()' };
        }
        return jsonataOnlyError(context, expr, 'Date.now()');
      }
    }

    // Array.isArray(val) → $type(val) = 'array'  [JSONata only]
    if (ts.isIdentifier(callee.expression) && callee.expression.text === 'Array') {
      if (methodName === 'isArray' && expr.arguments.length === 1) {
        if (jsonata) {
          const argResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
          const argStr = serializeArg(argResolved, dialect);
          if (argStr !== null) {
            return { kind: 'intrinsic', path: `$type(${argStr}) = 'array'` };
          }
        }
        return jsonataOnlyError(context, expr, 'Array.isArray()');
      }
    }
  }

  // btoa(str) → States.Base64Encode(str) or $base64encode(str)
  if (ts.isIdentifier(expr.expression) && expr.expression.text === 'btoa' && expr.arguments.length === 1) {
    const argResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
    const argStr = serializeArg(argResolved, dialect);
    if (argStr !== null) {
      return { kind: 'intrinsic', path: jsonata ? `$base64encode(${argStr})` : `States.Base64Encode(${argStr})` };
    }
  }

  // atob(str) → States.Base64Decode(str) or $base64decode(str)
  if (ts.isIdentifier(expr.expression) && expr.expression.text === 'atob' && expr.arguments.length === 1) {
    const argResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
    const argStr = serializeArg(argResolved, dialect);
    if (argStr !== null) {
      return { kind: 'intrinsic', path: jsonata ? `$base64decode(${argStr})` : `States.Base64Decode(${argStr})` };
    }
  }

  // Type conversion global functions  [JSONata only]
  if (ts.isIdentifier(expr.expression) && expr.arguments.length === 1) {
    const fnName = expr.expression.text;
    const TYPE_CONV: Record<string, string> = {
      Number: '$number', String: '$string', Boolean: '$boolean',
      parseInt: '$number', parseFloat: '$number',
    };
    if (fnName in TYPE_CONV) {
      if (jsonata) {
        const argResolved = resolveExpression(context, expr.arguments[0], variables, dialect);
        const argStr = serializeArg(argResolved, dialect);
        if (argStr !== null) {
          return { kind: 'intrinsic', path: `${TYPE_CONV[fnName]}(${argStr})` };
        }
      }
      return jsonataOnlyError(context, expr, `${fnName}()`);
    }
  }

  return { kind: 'unknown' };
}

/**
 * Resolve a Steps.method() call to a native JSONata expression.
 */
function resolveJsonataStepsCall(
  context: CompilerContext,
  methodName: string,
  args: ts.NodeArray<ts.Expression>,
  variables: VariableResolution,
  dialect?: PathDialect,
): ResolvedExpression {
  // Resolve and serialize all arguments
  const resolved: ResolvedExpression[] = [];
  const serialized: string[] = [];
  for (const arg of args) {
    const r = resolveExpression(context, arg, variables, dialect);
    resolved.push(r);
    const s = serializeJsonataArg(r);
    if (s === null) {
      context.addError(arg, 'Cannot resolve intrinsic function argument to ASL value', ErrorCodes.Expr.UnresolvableIntrinsicArg.code);
      return { kind: 'unknown' };
    }
    serialized.push(s);
  }

  switch (methodName) {
    case 'format':
      return resolveJsonataStepsFormat(resolved, serialized, args);
    case 'uuid':
      return { kind: 'intrinsic', path: '$uuid()' };
    case 'add':
      if (serialized.length === 2) return { kind: 'intrinsic', path: `${serialized[0]} + ${serialized[1]}` };
      break;
    case 'random':
      if (serialized.length === 2) return { kind: 'intrinsic', path: `$floor($random() * (${serialized[1]} - ${serialized[0]})) + ${serialized[0]}` };
      break;
    case 'base64Encode':
      if (serialized.length === 1) return { kind: 'intrinsic', path: `$base64encode(${serialized[0]})` };
      break;
    case 'base64Decode':
      if (serialized.length === 1) return { kind: 'intrinsic', path: `$base64decode(${serialized[0]})` };
      break;
    case 'array':
      return { kind: 'intrinsic', path: `[${serialized.join(', ')}]` };
    case 'arrayContains':
      if (serialized.length === 2) return { kind: 'intrinsic', path: `${serialized[1]} in ${serialized[0]}` };
      break;
    case 'arrayGetItem':
      if (serialized.length === 2) return { kind: 'intrinsic', path: `${serialized[0]}[${serialized[1]}]` };
      break;
    case 'arrayLength':
      if (serialized.length === 1) return { kind: 'intrinsic', path: `$count(${serialized[0]})` };
      break;
    case 'arrayUnique':
      if (serialized.length === 1) return { kind: 'intrinsic', path: `$distinct(${serialized[0]})` };
      break;
    case 'jsonParse':
      if (serialized.length === 1) return { kind: 'intrinsic', path: `$eval(${serialized[0]})` };
      break;
    case 'jsonStringify':
      if (serialized.length === 1) return { kind: 'intrinsic', path: `$string(${serialized[0]})` };
      break;
    case 'merge':
      if (serialized.length === 2) return { kind: 'intrinsic', path: `$merge([${serialized[0]}, ${serialized[1]}])` };
      break;
    // Keep as States.* intrinsics (no clean JSONata equivalent)
    case 'hash':
    case 'arrayPartition':
    case 'arrayRange': {
      const intrinsicName = STEPS_TO_INTRINSIC[methodName];
      if (intrinsicName) {
        return { kind: 'intrinsic', path: `${intrinsicName}(${serialized.join(', ')})` };
      }
      break;
    }
  }

  return { kind: 'unknown' };
}

/**
 * Resolve Steps.format('Hello {}!', name) → 'Hello ' & $name & '!' in JSONata.
 */
function resolveJsonataStepsFormat(
  resolved: ResolvedExpression[],
  serialized: string[],
  _args: ts.NodeArray<ts.Expression>,
): ResolvedExpression {
  if (resolved.length < 1) return { kind: 'unknown' };

  // First arg must be a literal format string
  if (resolved[0].kind !== 'literal' || typeof resolved[0].value !== 'string') {
    return { kind: 'unknown' };
  }

  const formatStr = resolved[0].value as string;
  const segments = formatStr.split('{}');
  const parts: string[] = [];

  for (let i = 0; i < segments.length; i++) {
    if (segments[i]) {
      parts.push(`'${segments[i].replace(/'/g, "\\'")}'`);
    }
    if (i < serialized.length - 1) {
      parts.push(serialized[i + 1]);  // skip index 0 (format string)
    }
  }

  if (parts.length === 0) return { kind: 'literal', value: '' };
  if (parts.length === 1) return { kind: 'intrinsic', path: parts[0] };
  return { kind: 'intrinsic', path: parts.join(' & ') };
}

/**
 * Resolve an object literal expression.
 * - All plain properties with literal values → literal object
 * - Spread properties like { ...foo, ...bar } → States.JsonMerge chain
 */
function resolveObjectLiteral(
  context: CompilerContext,
  expr: ts.ObjectLiteralExpression,
  variables: VariableResolution,
  dialect?: PathDialect,
): ResolvedExpression {
  // Check if any property is a spread assignment
  const hasSpread = expr.properties.some(p => ts.isSpreadAssignment(p));

  if (!hasSpread) {
    // Original behavior: all plain property assignments → literal object
    const obj: Record<string, unknown> = {};
    for (const prop of expr.properties) {
      if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
        const resolved = resolveExpression(context, prop.initializer, variables, dialect);
        if (resolved.kind === 'literal') {
          obj[prop.name.text] = resolved.value;
        } else {
          return { kind: 'unknown' };
        }
      } else {
        return { kind: 'unknown' };
      }
    }
    return { kind: 'literal', value: obj };
  }

  // Has spread: { ...a, ...b } → States.JsonMerge or $merge
  const spreadArgs: ResolvedExpression[] = [];
  for (const prop of expr.properties) {
    if (ts.isSpreadAssignment(prop)) {
      spreadArgs.push(resolveExpression(context, prop.expression, variables, dialect));
    } else {
      return { kind: 'unknown' };
    }
  }

  if (spreadArgs.length < 2) {
    return { kind: 'unknown' };
  }

  if (isJsonata(dialect)) {
    // JSONata: $merge([a, b, c])
    const allArgs = spreadArgs.map(a => serializeJsonataArg(a));
    if (allArgs.some(a => a === null)) return { kind: 'unknown' };
    return { kind: 'intrinsic', path: `$merge([${allArgs.join(', ')}])` };
  }

  // JSONPath: left-associative JsonMerge chain
  let result = serializeIntrinsicArg(spreadArgs[0]);
  if (result === null) return { kind: 'unknown' };

  for (let i = 1; i < spreadArgs.length; i++) {
    const nextStr = serializeIntrinsicArg(spreadArgs[i]);
    if (nextStr === null) return { kind: 'unknown' };
    result = `States.JsonMerge(${result}, ${nextStr}, false)`;
  }

  return { kind: 'intrinsic', path: result };
}

/**
 * Resolve an array literal expression.
 * - All literal elements → literal array (compile-time fold)
 * - Any dynamic element → States.Array(...) intrinsic
 */
function resolveArrayLiteral(
  context: CompilerContext,
  expr: ts.ArrayLiteralExpression,
  variables: VariableResolution,
  dialect?: PathDialect,
): ResolvedExpression {
  if (expr.elements.length === 0) {
    return { kind: 'literal', value: [] };
  }

  const resolved = expr.elements.map(e => resolveExpression(context, e, variables, dialect));

  // If all elements are literals, fold at compile time
  if (resolved.every(r => r.kind === 'literal')) {
    return { kind: 'literal', value: resolved.map(r => r.value) };
  }

  // Any dynamic element → States.Array(...) or [a, b] in JSONata
  const serialized = resolved.map(r => serializeArg(r, dialect));
  if (serialized.some(s => s === null)) {
    return { kind: 'unknown' };
  }

  if (isJsonata(dialect)) {
    return { kind: 'intrinsic', path: `[${serialized.join(', ')}]` };
  }
  return { kind: 'intrinsic', path: `States.Array(${serialized.join(', ')})` };
}

/**
 * Build an intrinsic string from the given ASL intrinsic name and TS arguments.
 */
function buildIntrinsicFromArgs(
  context: CompilerContext,
  intrinsicName: string,
  args: ts.NodeArray<ts.Expression>,
  variables: VariableResolution,
  dialect?: PathDialect,
): ResolvedExpression {
  const serializedArgs: string[] = [];
  for (const arg of args) {
    const resolved = resolveExpression(context, arg, variables, dialect);
    const serialized = serializeArg(resolved, dialect);
    if (serialized === null) {
      context.addError(arg, 'Cannot resolve intrinsic function argument to ASL value', ErrorCodes.Expr.UnresolvableIntrinsicArg.code);
      return { kind: 'unknown' };
    }
    serializedArgs.push(serialized);
  }
  return { kind: 'intrinsic', path: `${intrinsicName}(${serializedArgs.join(', ')})` };
}

/**
 * Resolve a binary expression to an ASL intrinsic.
 * - Numeric +: States.MathAdd(left, right)
 * - String concat: States.Format('{}{}', left, right)
 * - Numeric - (literal right): States.MathAdd(left, -right)
 * - *, /, %: emit helpful error (no ASL equivalent)
 */
function resolveBinaryExpression(
  context: CompilerContext,
  expr: ts.BinaryExpression,
  variables: VariableResolution,
  dialect?: PathDialect,
): ResolvedExpression {
  const op = expr.operatorToken.kind;

  // JSONata mode: native arithmetic operators supported
  if (isJsonata(dialect)) {
    return resolveJsonataBinaryExpression(context, expr, variables, dialect);
  }

  // Unsupported operators — emit helpful errors (JSONPath mode only)
  if (op === ts.SyntaxKind.AsteriskToken) {
    context.addError(expr, "The '*' operator is not supported in JSONPath mode. Switch to JSONata mode (queryLanguage: 'JSONata') for native arithmetic, or use a compile-time constant.", ErrorCodes.Expr.MultiplyNotSupported.code);
    return { kind: 'unknown' };
  }
  if (op === ts.SyntaxKind.SlashToken) {
    context.addError(expr, "The '/' operator is not supported in JSONPath mode. Switch to JSONata mode (queryLanguage: 'JSONata') for native arithmetic, or use a compile-time constant.", ErrorCodes.Expr.DivideNotSupported.code);
    return { kind: 'unknown' };
  }
  if (op === ts.SyntaxKind.PercentToken) {
    context.addError(expr, "The '%' operator is not supported in JSONPath mode. Switch to JSONata mode (queryLanguage: 'JSONata') for native arithmetic, or use a compile-time constant.", ErrorCodes.Expr.ModuloNotSupported.code);
    return { kind: 'unknown' };
  }

  if (op !== ts.SyntaxKind.PlusToken && op !== ts.SyntaxKind.MinusToken) {
    return { kind: 'unknown' };
  }

  const left = resolveExpression(context, expr.left, variables, dialect);
  const right = resolveExpression(context, expr.right, variables, dialect);

  // Constant folding: if both sides are literals, fold at compile time
  if (left.kind === 'literal' && right.kind === 'literal') {
    const folded = foldBinaryLiterals(left.value, right.value, op);
    if (folded !== undefined) {
      return { kind: 'literal', value: folded };
    }
  }

  // --- Subtraction: a - b → States.MathAdd(a, -b) when b is a literal number ---
  if (op === ts.SyntaxKind.MinusToken) {
    if (right.kind === 'literal' && typeof right.value === 'number') {
      const leftStr = serializeIntrinsicArg(left);
      if (leftStr === null) return { kind: 'unknown' };
      return { kind: 'intrinsic', path: `States.MathAdd(${leftStr}, ${-right.value})` };
    }
    // Dynamic subtraction is not possible in JSONPath ASL
    context.addError(expr, "Dynamic subtraction is not supported in JSONPath mode (only 'a - <literal>' works). Switch to JSONata mode (queryLanguage: 'JSONata') for native arithmetic.", ErrorCodes.Expr.DynamicSubtraction.code);
    return { kind: 'unknown' };
  }

  // --- Addition ---
  const leftStr = serializeIntrinsicArg(left);
  const rightStr = serializeIntrinsicArg(right);
  if (leftStr === null || rightStr === null) {
    return { kind: 'unknown' };
  }

  // If either side is a string literal, use States.Format for concat
  const leftIsString = left.kind === 'literal' && typeof left.value === 'string';
  const rightIsString = right.kind === 'literal' && typeof right.value === 'string';

  if (leftIsString || rightIsString) {
    return { kind: 'intrinsic', path: `States.Format('{}{}', ${leftStr}, ${rightStr})` };
  }

  // Use TypeScript type checker to detect string operands (e.g. firstName + lastName)
  const leftType = context.checker.getTypeAtLocation(expr.left);
  const rightType = context.checker.getTypeAtLocation(expr.right);
  const isStringType = (t: ts.Type) => !!(t.flags & (ts.TypeFlags.String | ts.TypeFlags.StringLiteral));
  if (isStringType(leftType) || isStringType(rightType)) {
    return { kind: 'intrinsic', path: `States.Format('{}{}', ${leftStr}, ${rightStr})` };
  }

  // Otherwise use MathAdd (numbers, jsonpaths, intrinsics)
  return { kind: 'intrinsic', path: `States.MathAdd(${leftStr}, ${rightStr})` };
}

/**
 * JSONata binary expression resolution: native +, -, *, /, % operators.
 * Lifts SS530-SS533 restrictions.
 */
function resolveJsonataBinaryExpression(
  context: CompilerContext,
  expr: ts.BinaryExpression,
  variables: VariableResolution,
  dialect?: PathDialect,
): ResolvedExpression {
  const op = expr.operatorToken.kind;

  // Supported operators: arithmetic + comparison
  const JSONATA_BINARY_OPS: Record<number, string> = {
    [ts.SyntaxKind.PlusToken]: '+',
    [ts.SyntaxKind.MinusToken]: '-',
    [ts.SyntaxKind.AsteriskToken]: '*',
    [ts.SyntaxKind.SlashToken]: '/',
    [ts.SyntaxKind.PercentToken]: '%',
    [ts.SyntaxKind.EqualsEqualsEqualsToken]: '=',
    [ts.SyntaxKind.ExclamationEqualsEqualsToken]: '!=',
    [ts.SyntaxKind.EqualsEqualsToken]: '=',
    [ts.SyntaxKind.ExclamationEqualsToken]: '!=',
    [ts.SyntaxKind.GreaterThanToken]: '>',
    [ts.SyntaxKind.GreaterThanEqualsToken]: '>=',
    [ts.SyntaxKind.LessThanToken]: '<',
    [ts.SyntaxKind.LessThanEqualsToken]: '<=',
    [ts.SyntaxKind.AmpersandAmpersandToken]: 'and',
    [ts.SyntaxKind.BarBarToken]: 'or',
  };

  if (!(op in JSONATA_BINARY_OPS)) {
    return { kind: 'unknown' };
  }

  const left = resolveExpression(context, expr.left, variables, dialect);
  const right = resolveExpression(context, expr.right, variables, dialect);

  // Constant folding (arithmetic only)
  if (left.kind === 'literal' && right.kind === 'literal') {
    const folded = foldBinaryLiterals(left.value, right.value, op);
    if (folded !== undefined) {
      return { kind: 'literal', value: folded };
    }
  }

  const leftStr = serializeJsonataArg(left);
  const rightStr = serializeJsonataArg(right);
  if (leftStr === null || rightStr === null) {
    return { kind: 'unknown' };
  }

  // Parenthesize compound sub-expressions for correct precedence
  const wrapL = left.kind === 'intrinsic' && /[+\-*/%&=<>!]|and|or/.test(leftStr) ? `(${leftStr})` : leftStr;
  const wrapR = right.kind === 'intrinsic' && /[+\-*/%&=<>!]|and|or/.test(rightStr) ? `(${rightStr})` : rightStr;

  // Detect string types for + → & (concatenation)
  if (op === ts.SyntaxKind.PlusToken) {
    const leftIsString = left.kind === 'literal' && typeof left.value === 'string';
    const rightIsString = right.kind === 'literal' && typeof right.value === 'string';
    const leftType = context.checker.getTypeAtLocation(expr.left);
    const rightType = context.checker.getTypeAtLocation(expr.right);
    const isStrType = (t: ts.Type) => !!(t.flags & (ts.TypeFlags.String | ts.TypeFlags.StringLiteral));
    if (leftIsString || rightIsString || isStrType(leftType) || isStrType(rightType)) {
      return { kind: 'intrinsic', path: `${wrapL} & ${wrapR}` };
    }
    return { kind: 'intrinsic', path: `${wrapL} + ${wrapR}` };
  }

  return { kind: 'intrinsic', path: `${wrapL} ${JSONATA_BINARY_OPS[op]} ${wrapR}` };
}

// ---------------------------------------------------------------------------
// Compile-time constant folding
// ---------------------------------------------------------------------------

/**
 * Try to evaluate a TS expression to a compile-time literal value.
 * Returns the folded value, or undefined if the expression is not foldable.
 *
 * Handles: literals, unary prefix, binary arithmetic/concat, identifier
 * references to already-registered constants, object/array literals of
 * constants, and known pure Math.* functions.
 */
function tryFoldConstant(
  expr: ts.Expression,
  builder: VariableResolutionBuilder,
): unknown | undefined {
  // Simple literals
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
    return expr.text;
  }
  if (ts.isNumericLiteral(expr)) {
    return Number(expr.text);
  }
  if (expr.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (expr.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (expr.kind === ts.SyntaxKind.NullKeyword) return null;

  // Template expression: `Hello ${NAME}` with all-constant substitutions
  if (ts.isTemplateExpression(expr)) {
    let result = expr.head.text;
    for (const span of expr.templateSpans) {
      const spanValue = tryFoldConstant(span.expression, builder);
      if (spanValue === undefined) return undefined;
      result += String(spanValue);
      result += span.literal.text;
    }
    return result;
  }

  // Unary prefix: -42, !true, +5
  if (ts.isPrefixUnaryExpression(expr)) {
    const operand = tryFoldConstant(expr.operand, builder);
    if (operand === undefined) return undefined;
    switch (expr.operator) {
      case ts.SyntaxKind.MinusToken:
        return typeof operand === 'number' ? -operand : undefined;
      case ts.SyntaxKind.ExclamationToken:
        return !operand;
      case ts.SyntaxKind.PlusToken:
        return typeof operand === 'number' ? +operand : undefined;
      default:
        return undefined;
    }
  }

  // Binary expressions: 1 + 2, "a" + "b", 3 * 4, etc.
  if (ts.isBinaryExpression(expr)) {
    const left = tryFoldConstant(expr.left, builder);
    const right = tryFoldConstant(expr.right, builder);
    if (left === undefined || right === undefined) return undefined;
    return foldBinaryLiterals(left, right, expr.operatorToken.kind);
  }

  // Identifier — reference to already-registered constant
  if (ts.isIdentifier(expr)) {
    // Search by name since we may not have a checker in this context
    for (const [, info] of builder.variables) {
      if (info.symbol?.escapedName === expr.escapedText &&
          info.type === StepVariableType.Constant &&
          info.literalValue !== undefined) {
        return info.literalValue;
      }
    }
    return undefined;
  }

  // Object literal: { a: 1, b: "x" }
  if (ts.isObjectLiteralExpression(expr)) {
    const obj: Record<string, unknown> = {};
    for (const prop of expr.properties) {
      if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) return undefined;
      const val = tryFoldConstant(prop.initializer, builder);
      if (val === undefined) return undefined;
      obj[prop.name.text] = val;
    }
    return obj;
  }

  // Array literal: [1, 2, 3]
  if (ts.isArrayLiteralExpression(expr)) {
    const arr: unknown[] = [];
    for (const elem of expr.elements) {
      const val = tryFoldConstant(elem, builder);
      if (val === undefined) return undefined;
      arr.push(val);
    }
    return arr;
  }

  // Known pure functions: Math.floor, Math.ceil, Math.max, etc.
  if (ts.isCallExpression(expr) && ts.isPropertyAccessExpression(expr.expression)) {
    const obj = expr.expression.expression;
    const method = expr.expression.name.text;
    if (ts.isIdentifier(obj) && obj.text === 'Math') {
      const args = expr.arguments.map(a => tryFoldConstant(a, builder));
      if (args.some(a => a === undefined || typeof a !== 'number')) return undefined;
      const nums = args as number[];
      switch (method) {
        case 'floor': return Math.floor(nums[0]);
        case 'ceil': return Math.ceil(nums[0]);
        case 'round': return Math.round(nums[0]);
        case 'abs': return Math.abs(nums[0]);
        case 'min': return Math.min(...nums);
        case 'max': return Math.max(...nums);
        case 'pow': return Math.pow(nums[0], nums[1]);
        default: return undefined;
      }
    }
  }

  // Conditional (ternary): cond ? a : b — fold if condition is constant
  if (ts.isConditionalExpression(expr)) {
    const cond = tryFoldConstant(expr.condition, builder);
    if (cond === undefined) return undefined;
    return cond
      ? tryFoldConstant(expr.whenTrue, builder)
      : tryFoldConstant(expr.whenFalse, builder);
  }

  return undefined;
}

/**
 * Fold a binary operation on two literal values at compile time.
 */
function foldBinaryLiterals(
  left: unknown,
  right: unknown,
  op: ts.SyntaxKind,
): unknown | undefined {
  let result: unknown;
  switch (op) {
    case ts.SyntaxKind.PlusToken:
      if (typeof left === 'number' && typeof right === 'number') { result = left + right; break; }
      if (typeof left === 'string' || typeof right === 'string') return String(left) + String(right);
      return undefined;
    case ts.SyntaxKind.MinusToken:
      if (typeof left === 'number' && typeof right === 'number') { result = left - right; break; }
      return undefined;
    case ts.SyntaxKind.AsteriskToken:
      if (typeof left === 'number' && typeof right === 'number') { result = left * right; break; }
      return undefined;
    case ts.SyntaxKind.SlashToken:
      if (typeof left === 'number' && typeof right === 'number' && right !== 0) { result = left / right; break; }
      return undefined;
    case ts.SyntaxKind.PercentToken:
      if (typeof left === 'number' && typeof right === 'number' && right !== 0) { result = left % right; break; }
      return undefined;
    default:
      return undefined;
  }
  // Guard against NaN/Infinity which cannot be represented in ASL JSON
  if (typeof result === 'number' && (!Number.isFinite(result) || Number.isNaN(result))) {
    return undefined;
  }
  return result;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function extractArnFromExpression(expr: ts.Expression, checker?: ts.TypeChecker): string | undefined {
  // Lambda('arn:...') or Lambda(arnVariable) — CallExpression
  if (ts.isCallExpression(expr)) {
    const arg = expr.arguments[0];
    if (arg) {
      const resolved = resolveToStringLiteral(arg, checker);
      if (resolved !== undefined) return resolved;
    }
  }

  // new DynamoDB('TableName') or new DynamoDB(tableNameVar) — NewExpression
  if (ts.isNewExpression(expr)) {
    const arg = expr.arguments?.[0];
    if (arg) {
      const resolved = resolveToStringLiteral(arg, checker);
      if (resolved !== undefined) return resolved;
    }
  }

  return undefined;
}

/**
 * Resolve an expression to a string literal value, following identifier
 * references through const declarations (e.g. `const arn = 'arn:...'; Lambda(arn)`).
 */
function resolveToStringLiteral(expr: ts.Expression, checker?: ts.TypeChecker, depth = 0): string | undefined {
  if (depth > 5) return undefined;

  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
    return expr.text;
  }

  if (ts.isIdentifier(expr) && checker) {
    const sym = checker.getSymbolAtLocation(expr);
    if (!sym?.declarations?.length) return undefined;
    const decl = sym.declarations[0];
    if (ts.isVariableDeclaration(decl) && decl.initializer) {
      return resolveToStringLiteral(decl.initializer, checker, depth + 1);
    }
  }

  return undefined;
}

/**
 * Extract the ARN/resource-name argument expression from a service binding
 * constructor call (e.g. the `makeArn('X')` in `Lambda(makeArn('X'))`).
 */
function getServiceArnArgument(expr: ts.Expression): ts.Expression | undefined {
  if (ts.isCallExpression(expr)) {
    return expr.arguments[0];
  }
  if (ts.isNewExpression(expr)) {
    return expr.arguments?.[0];
  }
  return undefined;
}

interface ServiceMatch {
  serviceName: string;
  resourceArn: string | undefined;
}

function matchServiceBinding(
  context: CompilerContext,
  initializer: ts.Expression,
  serviceRegistry: ServiceRegistry,
): ServiceMatch | null {
  // Match call expressions: Lambda('arn:...') or Lambda(arnVariable)
  if (ts.isCallExpression(initializer)) {
    const calleeSym = resolveAliasedSymbol(context, initializer.expression);
    if (calleeSym) {
      for (const [name, binding] of serviceRegistry.bindings) {
        if (calleeSym === binding.symbol) {
          const arn = extractArnFromExpression(initializer, context.checker);
          return { serviceName: name, resourceArn: arn };
        }
      }
    }
  }

  // Match new expressions: new DynamoDB('TableName') or new DynamoDB(tableNameVar)
  if (ts.isNewExpression(initializer)) {
    const calleeSym = resolveAliasedSymbol(context, initializer.expression);
    if (calleeSym) {
      for (const [name, binding] of serviceRegistry.bindings) {
        if (calleeSym === binding.symbol) {
          const arn = extractArnFromExpression(initializer, context.checker);
          return { serviceName: name, resourceArn: arn };
        }
      }
    }
  }

  return null;
}

/**
 * Resolve a symbol through import aliases to get the original declaration symbol.
 */
function resolveAliasedSymbol(
  context: CompilerContext,
  expr: ts.Expression,
): ts.Symbol | undefined {
  const sym = context.checker.getSymbolAtLocation(expr);
  if (!sym) return undefined;

  // If the symbol is an alias (import), follow it to the original
  if (sym.flags & ts.SymbolFlags.Alias) {
    return context.checker.getAliasedSymbol(sym);
  }

  return sym;
}
