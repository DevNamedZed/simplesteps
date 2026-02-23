import ts from 'typescript';
import { Logger, LogLevel } from './logger.js';
import type { DiagnosticCode } from './diagnosticCodes.js';

/**
 * Severity level for compiler diagnostics.
 * Errors prevent ASL generation; warnings do not.
 */
export type DiagnosticSeverity = 'error' | 'warning';

/**
 * A diagnostic message from the compiler.
 */
export interface CompilerDiagnostic {
  readonly file: string;
  readonly line: number;
  readonly column: number;
  readonly message: string;
  readonly severity: DiagnosticSeverity;
  readonly code: string;
}

/**
 * Holds shared state for the entire compilation run.
 *
 * Passed through all compiler stages. No dependency on ts.TransformationContext —
 * the compiler uses ts.createProgram() directly without program.emit().
 */
export class CompilerContext {
  readonly checker: ts.TypeChecker;
  readonly logger: Logger;
  private readonly _diagnostics: CompilerDiagnostic[] = [];

  constructor(
    readonly program: ts.Program,
    verbose: boolean = false,
  ) {
    this.checker = program.getTypeChecker();
    this.logger = new Logger(verbose ? LogLevel.Debug : LogLevel.Info);
  }

  get diagnostics(): readonly CompilerDiagnostic[] {
    return this._diagnostics;
  }

  get errors(): readonly CompilerDiagnostic[] {
    return this._diagnostics.filter(d => d.severity === 'error');
  }

  get warnings(): readonly CompilerDiagnostic[] {
    return this._diagnostics.filter(d => d.severity === 'warning');
  }

  /**
   * Add a diagnostic from an AST node.
   * Extracts file path, line, and column automatically.
   */
  addDiagnostic(
    node: ts.Node,
    message: string,
    severity: DiagnosticSeverity,
    code: string,
  ): void {
    const sourceFile = node.getSourceFile();
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());

    this._diagnostics.push({
      file: sourceFile.fileName,
      line: line + 1,       // 1-based
      column: character + 1, // 1-based
      message,
      severity,
      code,
    });
  }

  /**
   * Add a diagnostic without an AST node (e.g., configuration errors).
   */
  addRawDiagnostic(
    file: string,
    line: number,
    column: number,
    message: string,
    severity: DiagnosticSeverity,
    code: string,
  ): void {
    this._diagnostics.push({ file, line, column, message, severity, code });
  }

  /**
   * Convenience: add an error diagnostic from an AST node.
   */
  addError(node: ts.Node, message: string, code: DiagnosticCode | string): void {
    const codeStr = typeof code === 'string' ? code : code.code;
    this.addDiagnostic(node, message, 'error', codeStr);
  }

  /**
   * Convenience: add a warning diagnostic from an AST node.
   */
  addWarning(node: ts.Node, message: string, code: DiagnosticCode | string): void {
    const codeStr = typeof code === 'string' ? code : code.code;
    this.addDiagnostic(node, message, 'warning', codeStr);
  }

  hasErrors(): boolean {
    return this._diagnostics.some(d => d.severity === 'error');
  }
}
