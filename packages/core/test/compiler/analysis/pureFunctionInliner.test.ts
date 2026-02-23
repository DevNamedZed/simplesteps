import ts from 'typescript';
import {
  isEligibleForInlining,
  inlineFunction,
} from '@simplesteps/core/compiler/analysis/pureFunctionInliner';
import {
  constant,
  bottom,
  isConstant,
  isBottom,
  type ConstantValue,
} from '@simplesteps/core/compiler/analysis/lattice';

// ---------------------------------------------------------------------------
// Helper: parse source and extract the first function declaration
// ---------------------------------------------------------------------------

function createProgramFromSource(source: string) {
  const fileName = '/test.ts';
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.ES2022, true);

  const host = ts.createCompilerHost({});
  const originalGetSourceFile = host.getSourceFile;
  host.getSourceFile = (name, ...args) => {
    if (name === fileName) return sourceFile;
    return originalGetSourceFile.call(host, name, ...args);
  };

  const program = ts.createProgram([fileName], {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ES2022,
    strict: true,
    skipLibCheck: true,
    noLib: true,
  }, host);

  return { program, checker: program.getTypeChecker(), sourceFile };
}

function extractFunction(sourceFile: ts.SourceFile): ts.FunctionDeclaration {
  for (const stmt of sourceFile.statements) {
    if (ts.isFunctionDeclaration(stmt)) return stmt;
  }
  throw new Error('No function declaration found');
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Pure Function Inliner', () => {
  describe('isEligibleForInlining', () => {
    it('single return is eligible', () => {
      const { sourceFile } = createProgramFromSource(
        'function add(a: number, b: number) { return a + b; }',
      );
      expect(isEligibleForInlining(extractFunction(sourceFile))).toBe(true);
    });

    it('const + return is eligible', () => {
      const { sourceFile } = createProgramFromSource(
        'function compute(x: number) { const y = x * 2; return y + 1; }',
      );
      expect(isEligibleForInlining(extractFunction(sourceFile))).toBe(true);
    });

    it('arrow expression body is eligible', () => {
      const { sourceFile } = createProgramFromSource(
        'const f = (x: number) => x * 2;\nfunction _dummy() { return 0; }',
      );
      // Extract the arrow function from the variable declaration
      const stmt = sourceFile.statements[0] as ts.VariableStatement;
      const decl = stmt.declarationList.declarations[0];
      const arrow = decl.initializer as ts.ArrowFunction;
      expect(isEligibleForInlining(arrow)).toBe(true);
    });

    it('async function is not eligible', () => {
      const { sourceFile } = createProgramFromSource(
        'async function fetch() { return 42; }',
      );
      expect(isEligibleForInlining(extractFunction(sourceFile))).toBe(false);
    });

    it('generator function is not eligible', () => {
      const { sourceFile } = createProgramFromSource(
        'function* gen() { return 42; }',
      );
      expect(isEligibleForInlining(extractFunction(sourceFile))).toBe(false);
    });

    it('multiple returns is not eligible', () => {
      const { sourceFile } = createProgramFromSource(
        'function f(x: number) { if (x > 0) return 1; return -1; }',
      );
      expect(isEligibleForInlining(extractFunction(sourceFile))).toBe(false);
    });

    it('loop is not eligible', () => {
      const { sourceFile } = createProgramFromSource(
        'function f() { for (let i = 0; i < 10; i++) {} return 0; }',
      );
      expect(isEligibleForInlining(extractFunction(sourceFile))).toBe(false);
    });

    it('let declaration is not eligible', () => {
      const { sourceFile } = createProgramFromSource(
        'function f() { let x = 1; return x; }',
      );
      expect(isEligibleForInlining(extractFunction(sourceFile))).toBe(false);
    });

    it('no return is not eligible', () => {
      const { sourceFile } = createProgramFromSource(
        'function f() { const x = 1; }',
      );
      expect(isEligibleForInlining(extractFunction(sourceFile))).toBe(false);
    });

    it('void return is not eligible', () => {
      const { sourceFile } = createProgramFromSource(
        'function f() { return; }',
      );
      expect(isEligibleForInlining(extractFunction(sourceFile))).toBe(false);
    });
  });

  describe('inlineFunction', () => {
    it('inlines a simple pure function', () => {
      const source = 'function add(a: number, b: number) { return a + b; }';
      const { checker, sourceFile } = createProgramFromSource(source);
      const func = extractFunction(sourceFile);

      const result = inlineFunction(
        func,
        [3, 4] as unknown as ConstantValue[],
        checker,
        () => bottom('not found'),
      );

      // The inliner binds params as lattice Constant values,
      // so we need to pass ConstantValues
      const result2 = inlineFunction(
        func,
        [constant(3), constant(4)] as unknown as ConstantValue[],
        checker,
        () => bottom('not found'),
      );

      expect(isConstant(result2)).toBe(true);
      if (isConstant(result2)) expect(result2.value).toBe(7);
    });

    it('inlines function with const declarations', () => {
      const source = 'function compute(x: number) { const doubled = x * 2; return doubled + 1; }';
      const { checker, sourceFile } = createProgramFromSource(source);
      const func = extractFunction(sourceFile);

      const result = inlineFunction(
        func,
        [constant(5)] as unknown as ConstantValue[],
        checker,
        () => bottom('not found'),
      );

      expect(isConstant(result)).toBe(true);
      if (isConstant(result)) expect(result.value).toBe(11);
    });

    it('returns bottom for destructuring parameters', () => {
      const source = 'function f({ a }: { a: number }) { return a; }';
      const { checker, sourceFile } = createProgramFromSource(source);
      const func = extractFunction(sourceFile);

      const result = inlineFunction(
        func,
        [constant({ a: 1 })] as unknown as ConstantValue[],
        checker,
        () => bottom('not found'),
      );

      expect(isBottom(result)).toBe(true);
    });
  });
});
