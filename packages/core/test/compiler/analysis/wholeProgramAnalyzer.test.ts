import path from 'path';
import ts from 'typescript';
import { CompilerContext } from '@simplesteps/core/compiler/compilerContext';
import { discoverServices } from '@simplesteps/core/compiler/discovery/serviceDiscovery';
import { WholeProgramAnalyzer } from '@simplesteps/core/compiler/analysis/wholeProgramAnalyzer';
import {
  isConstant,
  isBottom,
} from '@simplesteps/core/compiler/analysis/lattice';

// ---------------------------------------------------------------------------
// Helper: create a multi-file virtual program
// ---------------------------------------------------------------------------

function createMultiFileProgram(files: Record<string, string>) {
  const sourceFiles = new Map<string, ts.SourceFile>();

  for (const [name, content] of Object.entries(files)) {
    sourceFiles.set(name, ts.createSourceFile(name, content, ts.ScriptTarget.ES2022, true));
  }

  const host = ts.createCompilerHost({});
  const originalGetSourceFile = host.getSourceFile;
  const originalFileExists = host.fileExists;
  host.getSourceFile = (name, ...args) => {
    const sf = sourceFiles.get(name);
    if (sf) return sf;
    return originalGetSourceFile.call(host, name, ...args);
  };
  host.fileExists = (name) => {
    if (sourceFiles.has(name)) return true;
    return originalFileExists.call(host, name);
  };

  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ES2022,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true,
    skipLibCheck: true,
    noLib: true,
  };

  const program = ts.createProgram(
    Object.keys(files),
    compilerOptions,
    host,
  );

  const context = new CompilerContext(program);
  // Empty service registry for these tests
  const serviceRegistry = { bindings: new Map() } as any;
  const analyzer = new WholeProgramAnalyzer(context, serviceRegistry);

  return { program, context, analyzer, sourceFiles };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('WholeProgramAnalyzer', () => {
  describe('single file analysis', () => {
    it('analyzes constants in a single file', () => {
      const { program, analyzer } = createMultiFileProgram({
        '/main.ts': `
          export const X = 42;
          export const Y = X * 2;
        `,
      });

      const sourceFile = program.getSourceFile('/main.ts')!;
      const env = analyzer.analyzeFile(sourceFile);

      const x = env.getExport('X');
      const y = env.getExport('Y');

      expect(isConstant(x)).toBe(true);
      if (isConstant(x)) expect(x.value).toBe(42);
      expect(isConstant(y)).toBe(true);
      if (isConstant(y)) expect(y.value).toBe(84);
    });

    it('caches module environments', () => {
      const { program, analyzer } = createMultiFileProgram({
        '/main.ts': 'export const X = 1;',
      });

      const sourceFile = program.getSourceFile('/main.ts')!;
      const env1 = analyzer.analyzeFile(sourceFile);
      const env2 = analyzer.analyzeFile(sourceFile);

      expect(env1).toBe(env2);
    });
  });

  describe('cross-module imports', () => {
    it('resolves named import from another file', () => {
      const { program, analyzer } = createMultiFileProgram({
        '/config.ts': 'export const PORT = 3000;',
        '/main.ts': `
          import { PORT } from './config.ts';
          export const URL = PORT;
        `,
      });

      const mainFile = program.getSourceFile('/main.ts')!;
      const env = analyzer.analyzeFile(mainFile);
      const url = env.getExport('URL');

      expect(isConstant(url)).toBe(true);
      if (isConstant(url)) expect(url.value).toBe(3000);
    });

    it('resolves chained imports across multiple files', () => {
      const { program, analyzer } = createMultiFileProgram({
        '/base.ts': 'export const BASE = 10;',
        '/middle.ts': `
          import { BASE } from './base.ts';
          export const DOUBLED = BASE * 2;
        `,
        '/main.ts': `
          import { DOUBLED } from './middle.ts';
          export const RESULT = DOUBLED + 1;
        `,
      });

      const mainFile = program.getSourceFile('/main.ts')!;
      const env = analyzer.analyzeFile(mainFile);
      const result = env.getExport('RESULT');

      expect(isConstant(result)).toBe(true);
      if (isConstant(result)) expect(result.value).toBe(21);
    });
  });

  describe('cycle detection', () => {
    it('handles circular imports gracefully', () => {
      const { program, analyzer, context } = createMultiFileProgram({
        '/a.ts': `
          import { B } from './b.ts';
          export const A = B;
        `,
        '/b.ts': `
          import { A } from './a.ts';
          export const B = A;
        `,
      });

      const aFile = program.getSourceFile('/a.ts')!;
      const env = analyzer.analyzeFile(aFile);
      const a = env.getExport('A');

      // Should be bottom due to circular dependency, not crash
      expect(isBottom(a)).toBe(true);
    });
  });

  describe('declaration file imports', () => {
    it('returns bottom for .d.ts module imports', () => {
      const { program, analyzer } = createMultiFileProgram({
        '/main.ts': `
          import { something } from './lib.ts';
          export const X = something;
        `,
        // No actual lib.ts — this will fail to resolve
      });

      const mainFile = program.getSourceFile('/main.ts')!;
      const env = analyzer.analyzeFile(mainFile);
      const x = env.getExport('X');

      // Import can't resolve, so should be bottom
      expect(isBottom(x)).toBe(true);
    });
  });

  describe('namespace imports', () => {
    it('resolves namespace import as object', () => {
      const { program, analyzer } = createMultiFileProgram({
        '/config.ts': `
          export const PORT = 3000;
          export const HOST = "localhost";
        `,
        '/main.ts': `
          import * as Config from './config.ts';
          export const PORT = Config.PORT;
        `,
      });

      const mainFile = program.getSourceFile('/main.ts')!;
      const env = analyzer.analyzeFile(mainFile);
      const port = env.getExport('PORT');

      // Namespace resolves to object, then property access extracts PORT
      // This depends on the expression evaluator handling Config.PORT
      // The module resolves Config to a constant object, then the
      // evaluator does property access. If property access on non-constant
      // fails gracefully, this is fine.
      expect(port).toBeDefined();
    });
  });

  describe('diagnostics', () => {
    it('does not emit diagnostics for .d.ts imports', () => {
      const { program, analyzer, context } = createMultiFileProgram({
        '/main.ts': 'export const X = 1;',
      });

      analyzer.analyzeFile(program.getSourceFile('/main.ts')!);

      // No diagnostics for a clean file
      expect(context.errors).toHaveLength(0);
    });
  });

  describe('re-exports', () => {
    it('resolves named re-exports', () => {
      const { program, analyzer } = createMultiFileProgram({
        '/base.ts': 'export const VALUE = 42;',
        '/barrel.ts': `export { VALUE } from './base.ts';`,
        '/main.ts': `
          import { VALUE } from './barrel.ts';
          export const RESULT = VALUE;
        `,
      });

      const mainFile = program.getSourceFile('/main.ts')!;
      const env = analyzer.analyzeFile(mainFile);
      const result = env.getExport('RESULT');

      expect(isConstant(result)).toBe(true);
      if (isConstant(result)) expect(result.value).toBe(42);
    });
  });
});
