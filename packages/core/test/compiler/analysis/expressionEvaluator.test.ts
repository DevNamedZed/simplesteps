import ts from 'typescript';
import {
  ExpressionEvaluator,
  type SymbolResolver,
} from '@simplesteps/core/compiler/analysis/expressionEvaluator';
import {
  constant,
  bottom,
  isConstant,
  isBottom,
  type LatticeValue,
} from '@simplesteps/core/compiler/analysis/lattice';

// ---------------------------------------------------------------------------
// Helper: create a program from inline source and extract the first expression
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

function extractExpression(sourceFile: ts.SourceFile): ts.Expression {
  // Find the first variable declaration initializer
  for (const stmt of sourceFile.statements) {
    if (ts.isVariableStatement(stmt)) {
      for (const decl of stmt.declarationList.declarations) {
        if (decl.initializer) return decl.initializer;
      }
    }
  }
  throw new Error('No expression found in source');
}

function evalExpr(source: string, resolver?: SymbolResolver): LatticeValue {
  const fullSource = `const _result = ${source};`;
  const { checker, sourceFile } = createProgramFromSource(fullSource);
  const expr = extractExpression(sourceFile);
  const defaultResolver: SymbolResolver = () => bottom('unresolved');
  const evaluator = new ExpressionEvaluator(checker, resolver ?? defaultResolver);
  return evaluator.evaluate(expr);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ExpressionEvaluator', () => {
  describe('literals', () => {
    it('string literal', () => {
      const result = evalExpr('"hello"');
      expect(isConstant(result)).toBe(true);
      if (isConstant(result)) expect(result.value).toBe('hello');
    });

    it('number literal', () => {
      const result = evalExpr('42');
      expect(isConstant(result)).toBe(true);
      if (isConstant(result)) expect(result.value).toBe(42);
    });

    it('boolean true', () => {
      const result = evalExpr('true');
      expect(isConstant(result)).toBe(true);
      if (isConstant(result)) expect(result.value).toBe(true);
    });

    it('boolean false', () => {
      const result = evalExpr('false');
      expect(isConstant(result)).toBe(true);
      if (isConstant(result)) expect(result.value).toBe(false);
    });

    it('null', () => {
      const result = evalExpr('null');
      expect(isConstant(result)).toBe(true);
      if (isConstant(result)) expect(result.value).toBeNull();
    });
  });

  describe('binary operators', () => {
    it('addition (numbers)', () => {
      const result = evalExpr('10 + 32');
      expect(isConstant(result)).toBe(true);
      if (isConstant(result)) expect(result.value).toBe(42);
    });

    it('string concatenation', () => {
      const result = evalExpr('"hello" + " " + "world"');
      expect(isConstant(result)).toBe(true);
      if (isConstant(result)) expect(result.value).toBe('hello world');
    });

    it('subtraction', () => {
      const result = evalExpr('50 - 8');
      expect(isConstant(result)).toBe(true);
      if (isConstant(result)) expect(result.value).toBe(42);
    });

    it('multiplication', () => {
      const result = evalExpr('6 * 7');
      expect(isConstant(result)).toBe(true);
      if (isConstant(result)) expect(result.value).toBe(42);
    });

    it('division', () => {
      const result = evalExpr('84 / 2');
      expect(isConstant(result)).toBe(true);
      if (isConstant(result)) expect(result.value).toBe(42);
    });

    it('modulo', () => {
      const result = evalExpr('10 % 3');
      expect(isConstant(result)).toBe(true);
      if (isConstant(result)) expect(result.value).toBe(1);
    });

    it('logical AND', () => {
      expect(isConstant(evalExpr('true && false'))).toBe(true);
      const result = evalExpr('true && false');
      if (isConstant(result)) expect(result.value).toBe(false);
    });

    it('logical OR', () => {
      const result = evalExpr('false || "fallback"');
      if (isConstant(result)) expect(result.value).toBe('fallback');
    });

    it('nullish coalescing', () => {
      const result = evalExpr('null ?? "default"');
      if (isConstant(result)) expect(result.value).toBe('default');
    });

    it('strict equality', () => {
      const result = evalExpr('42 === 42');
      if (isConstant(result)) expect(result.value).toBe(true);
    });

    it('strict inequality', () => {
      const result = evalExpr('42 !== 43');
      if (isConstant(result)) expect(result.value).toBe(true);
    });

    it('comparison', () => {
      const result = evalExpr('10 < 20');
      if (isConstant(result)) expect(result.value).toBe(true);
    });

    it('exponentiation', () => {
      const result = evalExpr('2 ** 10');
      if (isConstant(result)) expect(result.value).toBe(1024);
    });
  });

  describe('unary operators', () => {
    it('negation', () => {
      const result = evalExpr('-42');
      if (isConstant(result)) expect(result.value).toBe(-42);
    });

    it('logical not', () => {
      const result = evalExpr('!true');
      if (isConstant(result)) expect(result.value).toBe(false);
    });

    it('bitwise not', () => {
      const result = evalExpr('~0');
      if (isConstant(result)) expect(result.value).toBe(-1);
    });
  });

  describe('conditional (ternary)', () => {
    it('truthy condition', () => {
      const result = evalExpr('true ? "yes" : "no"');
      if (isConstant(result)) expect(result.value).toBe('yes');
    });

    it('falsy condition', () => {
      const result = evalExpr('false ? "yes" : "no"');
      if (isConstant(result)) expect(result.value).toBe('no');
    });
  });

  describe('object literals', () => {
    it('simple object', () => {
      const result = evalExpr('({ a: 1, b: "two" })');
      expect(isConstant(result)).toBe(true);
      if (isConstant(result)) {
        expect(result.value).toEqual({ a: 1, b: 'two' });
      }
    });
  });

  describe('array literals', () => {
    it('simple array', () => {
      const result = evalExpr('[1, 2, 3]');
      expect(isConstant(result)).toBe(true);
      if (isConstant(result)) {
        expect(result.value).toEqual([1, 2, 3]);
      }
    });
  });

  describe('template literals', () => {
    it('no-substitution template', () => {
      const result = evalExpr('`hello`');
      expect(isConstant(result)).toBe(true);
      if (isConstant(result)) expect(result.value).toBe('hello');
    });
  });

  describe('typeof', () => {
    it('typeof string literal', () => {
      const result = evalExpr('typeof "hello"');
      expect(isConstant(result)).toBe(true);
      if (isConstant(result)) expect(result.value).toBe('string');
    });

    it('typeof number literal', () => {
      const result = evalExpr('typeof 42');
      expect(isConstant(result)).toBe(true);
      if (isConstant(result)) expect(result.value).toBe('number');
    });
  });

  describe('void', () => {
    it('void expression', () => {
      const result = evalExpr('void 0');
      expect(isConstant(result)).toBe(true);
      if (isConstant(result)) expect(result.value).toBeUndefined();
    });
  });

  describe('built-in pure functions', () => {
    it('Math.floor', () => {
      const result = evalExpr('Math.floor(3.7)');
      if (isConstant(result)) expect(result.value).toBe(3);
    });

    it('Math.max', () => {
      const result = evalExpr('Math.max(10, 20, 5)');
      if (isConstant(result)) expect(result.value).toBe(20);
    });

    it('Math.abs', () => {
      const result = evalExpr('Math.abs(-42)');
      if (isConstant(result)) expect(result.value).toBe(42);
    });

    it('JSON.stringify', () => {
      const result = evalExpr('JSON.stringify({ a: 1 })');
      if (isConstant(result)) expect(result.value).toBe('{"a":1}');
    });

    it('JSON.parse', () => {
      const result = evalExpr('JSON.parse(\'{"a":1}\')');
      if (isConstant(result)) expect(result.value).toEqual({ a: 1 });
    });
  });

  describe('bottom propagation', () => {
    it('binary op with bottom operand propagates', () => {
      // Use an unresolved identifier to get bottom
      const source = 'const x: any = unknown_var;\nconst _result = x + 1;';
      const { checker, sourceFile } = createProgramFromSource(source);

      // Extract the second variable's initializer
      const stmts = sourceFile.statements;
      const secondDecl = (stmts[1] as ts.VariableStatement).declarationList.declarations[0];
      const expr = secondDecl.initializer!;

      const evaluator = new ExpressionEvaluator(
        checker,
        () => bottom('unknown'),
      );
      const result = evaluator.evaluate(expr);
      expect(isBottom(result)).toBe(true);
    });
  });
});
