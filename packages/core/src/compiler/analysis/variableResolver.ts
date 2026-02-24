import ts from 'typescript';
import { CompilerContext } from '../compilerContext.js';
import { ErrorCodes } from '../diagnosticCodes.js';
import type { ServiceRegistry } from '../discovery/serviceDiscovery.js';
import type { StepFunctionCallSite } from '../discovery/callSiteLocator.js';
import { StepVariableType, type VariableInfo } from './types.js';
import type { WholeProgramAnalyzer } from './wholeProgramAnalyzer.js';
import { isConstant, isBottom } from './lattice.js';

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
        jsonPath: '$$',
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
        jsonPath: '$',
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

/**
 * Resolve a TS expression to a JSONPath string or literal value.
 */
export function resolveExpression(
  context: CompilerContext,
  expr: ts.Expression,
  variables: VariableResolution,
): ResolvedExpression {
  // String literal
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
    return { kind: 'literal', value: expr.text };
  }

  // Template expression: `Hello ${name}` → States.Format('Hello {}', name)
  if (ts.isTemplateExpression(expr)) {
    return resolveTemplateExpression(context, expr, variables);
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
          return resolveExpression(context, argExpr, variables);
        }
      }
    }
    return { kind: 'unknown' };
  }

  // Property access: a.b.c or arr.length
  if (ts.isPropertyAccessExpression(expr)) {
    const base = resolveExpression(context, expr.expression, variables);
    const propName = expr.name.text;

    // arr.length → States.ArrayLength(arr)
    if (propName === 'length' && (base.kind === 'jsonpath' || base.kind === 'intrinsic')) {
      const argStr = base.kind === 'jsonpath' ? base.path : base.path;
      return { kind: 'intrinsic', path: `States.ArrayLength(${argStr})` };
    }

    if (base.kind === 'jsonpath') {
      // Special case: input.field → $.field (not $.input.field)
      // because input maps to '$' directly
      return { kind: 'jsonpath', path: `${base.path}.${propName}` };
    }

    return { kind: 'unknown' };
  }

  // Element access: arr[index] → States.ArrayGetItem(arr, index)
  if (ts.isElementAccessExpression(expr)) {
    const base = resolveExpression(context, expr.expression, variables);
    if ((base.kind === 'jsonpath' || base.kind === 'intrinsic') && expr.argumentExpression) {
      const index = resolveExpression(context, expr.argumentExpression, variables);
      const baseStr = base.path!;
      const indexStr = serializeIntrinsicArg(index);
      if (indexStr !== null) {
        return { kind: 'intrinsic', path: `States.ArrayGetItem(${baseStr}, ${indexStr})` };
      }
    }
    return { kind: 'unknown' };
  }

  // Object literal — return as literal, or handle spread → States.JsonMerge
  if (ts.isObjectLiteralExpression(expr)) {
    return resolveObjectLiteral(context, expr, variables);
  }

  // Array literal with dynamic elements → States.Array(...)
  if (ts.isArrayLiteralExpression(expr)) {
    return resolveArrayLiteral(context, expr, variables);
  }

  // Call expression: Steps.format(), str.split(), JSON.parse(), etc.
  if (ts.isCallExpression(expr)) {
    return resolveCallExpression(context, expr, variables);
  }

  // Binary expression: a + b
  if (ts.isBinaryExpression(expr)) {
    return resolveBinaryExpression(context, expr, variables);
  }

  // Conditional (ternary): cond ? a : b
  // Only handles compile-time constant conditions here.
  // Runtime ternaries are handled by the CFG ternaryAssign terminator.
  if (ts.isConditionalExpression(expr)) {
    const cond = resolveExpression(context, expr.condition, variables);
    if (cond.kind === 'literal' && cond.value !== undefined) {
      return resolveExpression(context, cond.value ? expr.whenTrue : expr.whenFalse, variables);
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
 * Resolve a template expression (`Hello ${name}`) to a States.Format intrinsic.
 * If all substitutions are literals, folds to a plain string at compile time.
 */
function resolveTemplateExpression(
  context: CompilerContext,
  expr: ts.TemplateExpression,
  variables: VariableResolution,
): ResolvedExpression {
  // Build format string: head + {} placeholders + middle/tail text
  let formatStr = expr.head.text;
  const resolvedArgs: ResolvedExpression[] = [];

  for (const span of expr.templateSpans) {
    const resolved = resolveExpression(context, span.expression, variables);
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
 * Resolve a call expression to an intrinsic function.
 * Handles Steps.* calls and JS method mappings (str.split, JSON.parse, etc.).
 */
function resolveCallExpression(
  context: CompilerContext,
  expr: ts.CallExpression,
  variables: VariableResolution,
): ResolvedExpression {
  // Steps.method() — direct intrinsic mapping
  if (ts.isPropertyAccessExpression(expr.expression)) {
    const callee = expr.expression;
    const methodName = callee.name.text;

    // Check for Steps.* intrinsic
    if (ts.isIdentifier(callee.expression) && callee.expression.text === 'Steps') {
      const intrinsicName = STEPS_TO_INTRINSIC[methodName];
      if (intrinsicName) {
        return buildIntrinsicFromArgs(context, intrinsicName, expr.arguments, variables);
      }
    }

    // JS method mappings on resolved values
    const base = resolveExpression(context, callee.expression, variables);
    if (base.kind === 'jsonpath' || base.kind === 'intrinsic') {
      const baseStr = base.path!;

      // str.split(delim) → States.StringSplit(str, delim)
      if (methodName === 'split' && expr.arguments.length === 1) {
        const delimResolved = resolveExpression(context, expr.arguments[0], variables);
        const delimStr = serializeIntrinsicArg(delimResolved);
        if (delimStr !== null) {
          return { kind: 'intrinsic', path: `States.StringSplit(${baseStr}, ${delimStr})` };
        }
      }

      // arr.includes(val) → States.ArrayContains(arr, val)
      if (methodName === 'includes' && expr.arguments.length === 1) {
        const valResolved = resolveExpression(context, expr.arguments[0], variables);
        const valStr = serializeIntrinsicArg(valResolved);
        if (valStr !== null) {
          return { kind: 'intrinsic', path: `States.ArrayContains(${baseStr}, ${valStr})` };
        }
      }
    }

    // JSON.parse(str) → States.StringToJson(str)
    if (ts.isIdentifier(callee.expression) && callee.expression.text === 'JSON') {
      if (methodName === 'parse' && expr.arguments.length >= 1) {
        const argResolved = resolveExpression(context, expr.arguments[0], variables);
        const argStr = serializeIntrinsicArg(argResolved);
        if (argStr !== null) {
          return { kind: 'intrinsic', path: `States.StringToJson(${argStr})` };
        }
      }
      if (methodName === 'stringify' && expr.arguments.length >= 1) {
        const argResolved = resolveExpression(context, expr.arguments[0], variables);
        const argStr = serializeIntrinsicArg(argResolved);
        if (argStr !== null) {
          return { kind: 'intrinsic', path: `States.JsonToString(${argStr})` };
        }
      }
    }

    // crypto.randomUUID() → States.UUID()
    if (ts.isIdentifier(callee.expression) && callee.expression.text === 'crypto') {
      if (methodName === 'randomUUID' && expr.arguments.length === 0) {
        return { kind: 'intrinsic', path: 'States.UUID()' };
      }
    }
  }

  // btoa(str) → States.Base64Encode(str)
  if (ts.isIdentifier(expr.expression) && expr.expression.text === 'btoa' && expr.arguments.length === 1) {
    const argResolved = resolveExpression(context, expr.arguments[0], variables);
    const argStr = serializeIntrinsicArg(argResolved);
    if (argStr !== null) {
      return { kind: 'intrinsic', path: `States.Base64Encode(${argStr})` };
    }
  }

  // atob(str) → States.Base64Decode(str)
  if (ts.isIdentifier(expr.expression) && expr.expression.text === 'atob' && expr.arguments.length === 1) {
    const argResolved = resolveExpression(context, expr.arguments[0], variables);
    const argStr = serializeIntrinsicArg(argResolved);
    if (argStr !== null) {
      return { kind: 'intrinsic', path: `States.Base64Decode(${argStr})` };
    }
  }

  return { kind: 'unknown' };
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
): ResolvedExpression {
  // Check if any property is a spread assignment
  const hasSpread = expr.properties.some(p => ts.isSpreadAssignment(p));

  if (!hasSpread) {
    // Original behavior: all plain property assignments → literal object
    const obj: Record<string, unknown> = {};
    for (const prop of expr.properties) {
      if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
        const resolved = resolveExpression(context, prop.initializer, variables);
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

  // Has spread: { ...a, ...b } → States.JsonMerge(a, b, false)
  // Collect spread operands — only pure spread (no interleaved plain props for now)
  const spreadArgs: ResolvedExpression[] = [];
  for (const prop of expr.properties) {
    if (ts.isSpreadAssignment(prop)) {
      spreadArgs.push(resolveExpression(context, prop.expression, variables));
    } else {
      // Mixed spread + plain properties: not directly expressible as JsonMerge
      return { kind: 'unknown' };
    }
  }

  if (spreadArgs.length < 2) {
    return { kind: 'unknown' };
  }

  // Build a left-associative JsonMerge chain: JsonMerge(JsonMerge(a, b, false), c, false)
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
): ResolvedExpression {
  if (expr.elements.length === 0) {
    return { kind: 'literal', value: [] };
  }

  const resolved = expr.elements.map(e => resolveExpression(context, e, variables));

  // If all elements are literals, fold at compile time
  if (resolved.every(r => r.kind === 'literal')) {
    return { kind: 'literal', value: resolved.map(r => r.value) };
  }

  // Any dynamic element → States.Array(elem1, elem2, ...)
  const serialized = resolved.map(r => serializeIntrinsicArg(r));
  if (serialized.some(s => s === null)) {
    return { kind: 'unknown' };
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
): ResolvedExpression {
  const serializedArgs: string[] = [];
  for (const arg of args) {
    const resolved = resolveExpression(context, arg, variables);
    const serialized = serializeIntrinsicArg(resolved);
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
): ResolvedExpression {
  const op = expr.operatorToken.kind;

  // Unsupported operators — emit helpful errors
  if (op === ts.SyntaxKind.AsteriskToken) {
    context.addError(expr, 'The * operator cannot be compiled to ASL (no States.MathMultiply intrinsic). Use a compile-time constant or a Lambda function instead', ErrorCodes.Expr.MultiplyNotSupported.code);
    return { kind: 'unknown' };
  }
  if (op === ts.SyntaxKind.SlashToken) {
    context.addError(expr, 'The / operator cannot be compiled to ASL (no States.MathDivide intrinsic). Use a compile-time constant or a Lambda function instead', ErrorCodes.Expr.DivideNotSupported.code);
    return { kind: 'unknown' };
  }
  if (op === ts.SyntaxKind.PercentToken) {
    context.addError(expr, 'The % operator cannot be compiled to ASL (no States.MathModulo intrinsic). Use a compile-time constant or a Lambda function instead', ErrorCodes.Expr.ModuloNotSupported.code);
    return { kind: 'unknown' };
  }

  if (op !== ts.SyntaxKind.PlusToken && op !== ts.SyntaxKind.MinusToken) {
    return { kind: 'unknown' };
  }

  const left = resolveExpression(context, expr.left, variables);
  const right = resolveExpression(context, expr.right, variables);

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
    // Dynamic subtraction is not possible in ASL
    context.addError(expr, 'Subtraction with a dynamic right-hand side cannot be compiled to ASL. Only `a - <literal>` is supported (compiled as States.MathAdd(a, -literal)). Use a compile-time constant or a Lambda function instead', ErrorCodes.Expr.DynamicSubtraction.code);
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
