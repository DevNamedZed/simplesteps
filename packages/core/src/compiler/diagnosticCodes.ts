// ---------------------------------------------------------------------------
// Diagnostic Code Registry
//
// Single source of truth for all compiler error/warning codes.
// ---------------------------------------------------------------------------

export interface DiagnosticCode {
  readonly code: string;
  readonly severity: 'error' | 'warning';
  readonly category: string;
}

function error(code: string, category: string): DiagnosticCode {
  return { code, severity: 'error', category };
}

function warning(code: string, category: string): DiagnosticCode {
  return { code, severity: 'warning', category };
}

/**
 * Centralized registry of all SimpleSteps compiler diagnostic codes.
 *
 * Usage: `ErrorCodes.Cfg.BreakOutsideLoop.code` → `'SS400'`
 */
export class ErrorCodes {
  // ── Config / entry point (SS0xx) ──────────────────────────────────────
  static readonly Config = class {
    static readonly InvalidConfig = error('SS000', 'config');
  };

  // ── Discovery (SS1xx) ─────────────────────────────────────────────────
  static readonly Discovery = class {
    static readonly RecursiveCall = error('SS100', 'discovery');
  };

  // ── CFG construction (SS4xx) ──────────────────────────────────────────
  static readonly Cfg = class {
    static readonly BreakOutsideLoop = error('SS400', 'cfg');
    static readonly ContinueOutsideLoop = error('SS401', 'cfg');
    static readonly SwitchFallThrough = error('SS410', 'cfg');
    static readonly PromiseAllNotArray = error('SS420', 'cfg');
    static readonly PromiseRaceNotSupported = error('SS421', 'cfg');
    static readonly InvalidMapCall = error('SS430', 'cfg');
    static readonly InvalidDistributedMapCall = error('SS431', 'cfg');
  };

  // ── Expression mapping (SS5xx) ────────────────────────────────────────
  static readonly Expr = class {
    static readonly SpreadNotSupported = error('SS500', 'expression');
    static readonly ComputedPropertyName = error('SS501', 'expression');
    static readonly UncompilableExpression = error('SS502', 'expression');
    static readonly UncompilableCondition = error('SS510', 'condition');
    static readonly UncompilableComparison = error('SS511', 'condition');
    static readonly UnsupportedOperator = error('SS512', 'condition');
    static readonly UnresolvableIntrinsicArg = error('SS520', 'intrinsic');
    static readonly MultiplyNotSupported = error('SS530', 'arithmetic');
    static readonly DivideNotSupported = error('SS531', 'arithmetic');
    static readonly ModuloNotSupported = error('SS532', 'arithmetic');
    static readonly DynamicSubtraction = error('SS533', 'arithmetic');
    static readonly JsonataOnlyFeature = error('SS540', 'expression');
  };

  // ── ASL generation (SS6xx) ────────────────────────────────────────────
  static readonly Gen = class {
    static readonly EmptyStateMachine = error('SS600', 'generation');
    static readonly UnknownServiceMethod = error('SS610', 'generation');
    static readonly MissingResourceArn = error('SS611', 'generation');
    static readonly AwsSdkRequiresLiteral = error('SS612', 'generation');
  };

  // ── Helper function inlining (SS8xx) ─────────────────────────────────
  static readonly Inlining = class {
    static readonly UninlinableFunction = error('SS800', 'inlining');
    static readonly HelperTooDeep = error('SS803', 'inlining');
    static readonly HelperDestructuringParam = error('SS804', 'inlining');
    static readonly HelperNotAwaited = error('SS805', 'inlining');
    static readonly HelperReturnValue = error('SS806', 'inlining');
  };

  // ── Whole-program data flow (SS7xx) ───────────────────────────────────
  static readonly DataFlow = class {
    static readonly UnresolvableVariable = error('SS700', 'data-flow');
    static readonly MutableVariable = error('SS701', 'data-flow');
    static readonly UnresolvableImport = error('SS702', 'data-flow');
    static readonly ImpureFunction = error('SS703', 'data-flow');
    static readonly CircularImport = error('SS704', 'data-flow');
    static readonly UnverifiedCdkExpression = warning('SS705', 'data-flow');
    static readonly UnanalyzableImport = error('SS706', 'data-flow');
    static readonly ComplexFunction = warning('SS707', 'data-flow');
    static readonly SafeVarEscapeHatch = warning('SS708', 'data-flow');
    static readonly PreferConst = warning('SS709', 'data-flow');
  };
}
