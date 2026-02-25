// ---------------------------------------------------------------------------
// PathDialect — query language abstraction for ASL emission
//
// The dialect encapsulates all query-language-specific patterns (path syntax,
// field names, value wrapping, structural choices) so that stateBuilder and
// expressionMapper remain dialect-agnostic.
// ---------------------------------------------------------------------------

/**
 * Abstraction over the ASL query language used for path references and
 * state field emission.
 *
 * The dialect is immutable and set once per compilation via CompileOptions.
 */
export interface PathDialect {
  /**
   * The QueryLanguage value for the top-level ASL definition.
   * undefined means no explicit QueryLanguage field (JSONPath mode).
   * Note: JSONata is the compiler default; JSONPath is used when explicitly requested.
   */
  readonly queryLanguage: 'JSONPath' | 'JSONata' | undefined;

  // ── Variable path construction ────────────────────────────────────

  /** Build a path for storing a task/pass output variable. e.g. `$.varName` or `$varName` */
  resultPath(varName: string): string;

  /** The ResultPath value meaning "discard output" (fire-and-forget). */
  resultPathDiscard(): null;

  /** Build a path reference for a variable. e.g. `$.varName` or `$varName` */
  variablePath(varName: string): string;

  // ── Root path references (for variableResolver) ───────────────────

  /** Root path for the step function input parameter. `$` or `$states.input` */
  inputRoot(): string;

  /** Root path for the execution context. `$$` or `$states.context` */
  contextRoot(): string;

  /** Path to the current state's result. `$` or `$states.result` */
  statesResult(): string;

  /** Path to the error output in a Catch handler. `$.error` or `$states.errorOutput` */
  statesErrorOutput(): string;

  // ── Parallel state ────────────────────────────────────────────────

  /** ResultPath for temp storage of destructured parallel output. */
  parallelTempResultPath(): string;

  /** InputPath for extracting the i-th element from the parallel temp. */
  parallelElementInputPath(index: number): string;

  /** Whether destructured parallel results need a Pass chain (JSONPath) or use Assign (JSONata). */
  needsParallelPassChain(): boolean;

  /**
   * Build the assignment fields for destructured parallel results (JSONata only).
   * JSONPath returns {} (Pass chain handles it). JSONata returns { Assign: { ... } }.
   */
  emitParallelAssignment(bindings: readonly { name: string; index: number }[]): Record<string, unknown>;

  // ── Map state ─────────────────────────────────────────────────────

  /** The context path for the current Map iteration item value. */
  mapItemValuePath(): string;

  /** Build a key for a dynamic (jsonpath/intrinsic) value in Parameters/Arguments. */
  dynamicKey(name: string): string;

  /** Whether the Map state needs an ItemSelector for captured variables. */
  needsItemSelector(): boolean;

  // ── Value wrapping ────────────────────────────────────────────────

  /** Wrap a dynamic path value for use in Parameters/Arguments values. */
  wrapDynamicValue(path: string): string;

  /**
   * Build a Parameters/Arguments entry for wrapping an intrinsic/dynamic value.
   * JSONPath: `{ "keyName.$": intrinsicPath }`
   * JSONata: `{ "keyName": "{% intrinsicPath %}" }`
   */
  wrapIntrinsicResult(keyName: string, intrinsicPath: string): Record<string, unknown>;

  // ── State field emission ──────────────────────────────────────────
  // These methods return field objects to spread into state definitions,
  // abstracting both field names and value formats.

  /**
   * Emit the fields for assigning a state's result to a variable.
   * JSONPath: `{ ResultPath: "$.varName" }`
   * JSONata: `{ Assign: { varName: "{% $states.result %}" } }`
   */
  emitResultAssignment(varName: string): Record<string, unknown>;

  /**
   * Emit the fields for discarding a state's result.
   * JSONPath: `{ ResultPath: null }`
   * JSONata: `{}` (omit both ResultPath and Assign)
   */
  emitResultDiscard(): Record<string, unknown>;

  /**
   * Emit the Parameters/Arguments field.
   * JSONPath: `{ Parameters: params }`
   * JSONata: `{ Arguments: params }`
   */
  emitParameters(params: Record<string, unknown>): Record<string, unknown>;

  /**
   * Emit the items path field for a Map state.
   * JSONPath: `{ ItemsPath: path }`
   * JSONata: `{ Items: "{% path %}" }`
   */
  emitItemsPath(path: string): Record<string, unknown>;

  /**
   * Emit the catch error assignment fields.
   * JSONPath: `{ ResultPath: "$.paramName" }`
   * JSONata: `{ Assign: { paramName: "{% $states.errorOutput %}" } }`
   */
  emitCatchAssignment(paramName: string): Record<string, unknown>;

  /**
   * Emit the fields for returning a variable path from a Pass state.
   * JSONPath: `{ InputPath: path }`
   * JSONata: `{ Output: "{% path %}" }`
   */
  emitReturnPath(path: string): Record<string, unknown>;

  // ── Choice rule support ───────────────────────────────────────────

  /** Whether this dialect uses JSONata Condition expressions for Choice rules. */
  isJsonata(): boolean;

  // ── Variable name extraction ──────────────────────────────────────

  /**
   * Extract the top-level variable name from a variable path.
   * JSONPath: `$.result` → `result`
   * JSONata: `$result` → `result`
   */
  extractVarName(path: string): string | null;
}

// ---------------------------------------------------------------------------
// JSONPath dialect (used when queryLanguage: 'JSONPath' is explicitly set)
// ---------------------------------------------------------------------------

export class JsonPathDialect implements PathDialect {
  readonly queryLanguage = undefined;

  resultPath(varName: string): string {
    return `$.${varName}`;
  }

  resultPathDiscard(): null {
    return null;
  }

  variablePath(varName: string): string {
    return `$.${varName}`;
  }

  inputRoot(): string {
    return '$';
  }

  contextRoot(): string {
    return '$$';
  }

  statesResult(): string {
    return '$';
  }

  statesErrorOutput(): string {
    return '$.error';
  }

  parallelTempResultPath(): string {
    return '$.__parallel';
  }

  parallelElementInputPath(index: number): string {
    return `$.__parallel[${index}]`;
  }

  needsParallelPassChain(): boolean {
    return true;
  }

  emitParallelAssignment(_bindings: readonly { name: string; index: number }[]): Record<string, unknown> {
    return {};
  }

  mapItemValuePath(): string {
    return '$$.Map.Item.Value';
  }

  dynamicKey(name: string): string {
    return `${name}.$`;
  }

  needsItemSelector(): boolean {
    return true;
  }

  wrapDynamicValue(path: string): string {
    return path;
  }

  wrapIntrinsicResult(keyName: string, intrinsicPath: string): Record<string, unknown> {
    return { [`${keyName}.$`]: intrinsicPath };
  }

  emitResultAssignment(varName: string): Record<string, unknown> {
    return { ResultPath: `$.${varName}` };
  }

  emitResultDiscard(): Record<string, unknown> {
    return { ResultPath: null };
  }

  emitParameters(params: Record<string, unknown>): Record<string, unknown> {
    return { Parameters: params };
  }

  emitItemsPath(path: string): Record<string, unknown> {
    return { ItemsPath: path };
  }

  emitCatchAssignment(paramName: string): Record<string, unknown> {
    return { ResultPath: `$.${paramName}` };
  }

  emitReturnPath(path: string): Record<string, unknown> {
    return { InputPath: path };
  }

  isJsonata(): boolean {
    return false;
  }

  extractVarName(path: string): string | null {
    const match = path.match(/^\$\.(\w+)/);
    return match ? match[1] : null;
  }
}

// ---------------------------------------------------------------------------
// JSONata dialect
// ---------------------------------------------------------------------------

export class JsonataDialect implements PathDialect {
  readonly queryLanguage = 'JSONata' as const;

  resultPath(varName: string): string {
    return `$${varName}`;
  }

  resultPathDiscard(): null {
    return null;
  }

  variablePath(varName: string): string {
    return `$${varName}`;
  }

  inputRoot(): string {
    return '$states.input';
  }

  contextRoot(): string {
    return '$states.context';
  }

  statesResult(): string {
    return '$states.result';
  }

  statesErrorOutput(): string {
    return '$states.errorOutput';
  }

  parallelTempResultPath(): string {
    // Not used in JSONata mode (needsParallelPassChain returns false)
    return '$states.result';
  }

  parallelElementInputPath(index: number): string {
    // Not used in JSONata mode (needsParallelPassChain returns false)
    return `$states.result[${index}]`;
  }

  needsParallelPassChain(): boolean {
    return false;
  }

  emitParallelAssignment(bindings: readonly { name: string; index: number }[]): Record<string, unknown> {
    const assign: Record<string, string> = {};
    for (const { name, index } of bindings) {
      assign[name] = `{% $states.result[${index}] %}`;
    }
    return { Assign: assign };
  }

  mapItemValuePath(): string {
    return '$states.input';
  }

  dynamicKey(name: string): string {
    return name;
  }

  needsItemSelector(): boolean {
    return false;
  }

  wrapDynamicValue(path: string): string {
    return `{% ${path} %}`;
  }

  wrapIntrinsicResult(keyName: string, intrinsicPath: string): Record<string, unknown> {
    return { [keyName]: `{% ${intrinsicPath} %}` };
  }

  emitResultAssignment(varName: string): Record<string, unknown> {
    return { Assign: { [varName]: '{% $states.result %}' } };
  }

  emitResultDiscard(): Record<string, unknown> {
    return {};
  }

  emitParameters(params: Record<string, unknown>): Record<string, unknown> {
    return { Arguments: params };
  }

  emitItemsPath(path: string): Record<string, unknown> {
    return { Items: `{% ${path} %}` };
  }

  emitCatchAssignment(paramName: string): Record<string, unknown> {
    return { Assign: { [paramName]: '{% $states.errorOutput %}' } };
  }

  emitReturnPath(path: string): Record<string, unknown> {
    return { Output: `{% ${path} %}` };
  }

  isJsonata(): boolean {
    return true;
  }

  extractVarName(path: string): string | null {
    // Match $varName (JSONata) — no dot after $
    const match = path.match(/^\$(\w+)/);
    return match ? match[1] : null;
  }
}

/** Singleton instance for the JSONPath dialect. */
export const JSON_PATH_DIALECT: PathDialect = new JsonPathDialect();

/** Singleton instance for the JSONata dialect. */
export const JSONATA_DIALECT: PathDialect = new JsonataDialect();
