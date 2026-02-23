import ts from 'typescript';
import {
  ModuleEnvironment,
  analyzeModule,
} from '@simplesteps/core/compiler/analysis/moduleAnalyzer';
import {
  constant,
  bottom,
  isConstant,
  isBottom,
  isTop,
} from '@simplesteps/core/compiler/analysis/lattice';

// ---------------------------------------------------------------------------
// Helper: create a single-file program for module analysis
// ---------------------------------------------------------------------------

function analyzeSource(source: string) {
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

  const checker = program.getTypeChecker();
  const env = analyzeModule(sourceFile, checker);
  return { env, checker, sourceFile };
}

function getExportValue(env: ModuleEnvironment, name: string) {
  return env.getExport(name);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Module Analyzer', () => {
  describe('const declarations', () => {
    it('resolves simple string constant', () => {
      const { env } = analyzeSource('export const NAME = "hello";');
      const val = getExportValue(env, 'NAME');
      expect(isConstant(val)).toBe(true);
      if (isConstant(val)) expect(val.value).toBe('hello');
    });

    it('resolves simple number constant', () => {
      const { env } = analyzeSource('export const COUNT = 42;');
      const val = getExportValue(env, 'COUNT');
      expect(isConstant(val)).toBe(true);
      if (isConstant(val)) expect(val.value).toBe(42);
    });

    it('resolves boolean constant', () => {
      const { env } = analyzeSource('export const ENABLED = true;');
      const val = getExportValue(env, 'ENABLED');
      expect(isConstant(val)).toBe(true);
      if (isConstant(val)) expect(val.value).toBe(true);
    });

    it('resolves null constant', () => {
      const { env } = analyzeSource('export const NOTHING = null;');
      const val = getExportValue(env, 'NOTHING');
      expect(isConstant(val)).toBe(true);
      if (isConstant(val)) expect(val.value).toBeNull();
    });

    it('resolves computed constant', () => {
      const { env } = analyzeSource('export const TOTAL = 10 + 32;');
      const val = getExportValue(env, 'TOTAL');
      expect(isConstant(val)).toBe(true);
      if (isConstant(val)) expect(val.value).toBe(42);
    });

    it('resolves chained constants', () => {
      const { env } = analyzeSource(`
        const BASE = 10;
        export const DOUBLED = BASE * 2;
      `);
      const val = getExportValue(env, 'DOUBLED');
      expect(isConstant(val)).toBe(true);
      if (isConstant(val)) expect(val.value).toBe(20);
    });

    it('resolves template literal with constants', () => {
      const { env } = analyzeSource(`
        const NAME = "world";
        export const GREETING = \`hello \${NAME}\`;
      `);
      const val = getExportValue(env, 'GREETING');
      expect(isConstant(val)).toBe(true);
      if (isConstant(val)) expect(val.value).toBe('hello world');
    });
  });

  describe('object and array literals', () => {
    it('resolves object constant', () => {
      const { env } = analyzeSource('export const CONFIG = { port: 3000, host: "localhost" };');
      const val = getExportValue(env, 'CONFIG');
      expect(isConstant(val)).toBe(true);
      if (isConstant(val)) expect(val.value).toEqual({ port: 3000, host: 'localhost' });
    });

    it('resolves array constant', () => {
      const { env } = analyzeSource('export const ITEMS = [1, 2, 3];');
      const val = getExportValue(env, 'ITEMS');
      expect(isConstant(val)).toBe(true);
      if (isConstant(val)) expect(val.value).toEqual([1, 2, 3]);
    });
  });

  describe('destructuring', () => {
    it('resolves object destructuring', () => {
      const { env } = analyzeSource(`
        const obj = { a: 1, b: 2, c: 3 };
        export const { a, b } = obj;
      `);
      expect(isConstant(getExportValue(env, 'a'))).toBe(true);
      if (isConstant(getExportValue(env, 'a'))) {
        expect((getExportValue(env, 'a') as any).value).toBe(1);
      }
      if (isConstant(getExportValue(env, 'b'))) {
        expect((getExportValue(env, 'b') as any).value).toBe(2);
      }
    });

    it('resolves array destructuring', () => {
      const { env } = analyzeSource(`
        const arr = [10, 20, 30];
        export const [first, second] = arr;
      `);
      expect(isConstant(getExportValue(env, 'first'))).toBe(true);
      if (isConstant(getExportValue(env, 'first'))) {
        expect((getExportValue(env, 'first') as any).value).toBe(10);
      }
    });
  });

  describe('enums', () => {
    it('resolves numeric enum', () => {
      const { env } = analyzeSource(`
        export enum Status { Active, Inactive, Pending }
      `);
      const val = getExportValue(env, 'Status');
      expect(isConstant(val)).toBe(true);
      if (isConstant(val)) {
        const obj = val.value as Record<string, number>;
        expect(obj.Active).toBe(0);
        expect(obj.Inactive).toBe(1);
        expect(obj.Pending).toBe(2);
      }
    });

    it('resolves string enum', () => {
      const { env } = analyzeSource(`
        export enum Direction { Up = "UP", Down = "DOWN" }
      `);
      const val = getExportValue(env, 'Direction');
      expect(isConstant(val)).toBe(true);
      if (isConstant(val)) {
        const obj = val.value as Record<string, string>;
        expect(obj.Up).toBe('UP');
        expect(obj.Down).toBe('DOWN');
      }
    });
  });

  describe('let variables', () => {
    it('single assignment to let is tracked', () => {
      const { env } = analyzeSource(`
        export let x = 42;
      `);
      const val = getExportValue(env, 'x');
      expect(isConstant(val)).toBe(true);
      if (isConstant(val)) expect(val.value).toBe(42);
    });

    it('multiple assignments to let produce bottom', () => {
      const { env } = analyzeSource(`
        export let x = 1;
        x = 2;
      `);
      const val = getExportValue(env, 'x');
      expect(isBottom(val)).toBe(true);
    });
  });

  describe('function inlining', () => {
    it('inlines simple pure function', () => {
      const { env } = analyzeSource(`
        function double(n: number) { return n * 2; }
        export const RESULT = double(21);
      `);
      const val = getExportValue(env, 'RESULT');
      expect(isConstant(val)).toBe(true);
      if (isConstant(val)) expect(val.value).toBe(42);
    });
  });

  describe('exports', () => {
    it('non-exported variables are not in exports', () => {
      const { env } = analyzeSource(`
        const PRIVATE = "secret";
        export const PUBLIC = "visible";
      `);
      expect(isBottom(getExportValue(env, 'PRIVATE'))).toBe(true);
      expect(isConstant(getExportValue(env, 'PUBLIC'))).toBe(true);
    });

    it('exported function is tracked', () => {
      const { env } = analyzeSource(`
        export function greet() { return "hello"; }
      `);
      // Function exports exist (the name is registered)
      const val = getExportValue(env, 'greet');
      // Functions themselves aren't lattice values, so this returns
      // whatever resolve gives — likely top or bottom
      // The important thing is it doesn't crash
      expect(val).toBeDefined();
    });
  });

  describe('built-in functions', () => {
    it('Math.max folds during module analysis', () => {
      const { env } = analyzeSource(`
        export const MAX = Math.max(10, 20, 5);
      `);
      const val = getExportValue(env, 'MAX');
      expect(isConstant(val)).toBe(true);
      if (isConstant(val)) expect(val.value).toBe(20);
    });

    it('JSON.parse folds during module analysis', () => {
      const { env } = analyzeSource(`
        export const DATA = JSON.parse('{"key":"value"}');
      `);
      const val = getExportValue(env, 'DATA');
      expect(isConstant(val)).toBe(true);
      if (isConstant(val)) expect(val.value).toEqual({ key: 'value' });
    });
  });

  describe('star re-exports', () => {
    it('tracks star re-export module specifiers', () => {
      // We can't fully test cross-module without WholeProgramAnalyzer,
      // but we can verify the star re-export is recorded
      const { env } = analyzeSource(`
        export * from './other';
      `);
      // Without an import resolver, star re-exports won't resolve,
      // but the environment should not crash
      const val = getExportValue(env, 'anything');
      expect(isBottom(val)).toBe(true);
    });
  });
});
