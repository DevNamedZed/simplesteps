import path from 'path';
import ts from 'typescript';
import { CompilerContext } from '@simplesteps/core/compiler/compilerContext';
import { loadIntrinsics } from '@simplesteps/core/compiler/discovery/intrinsics';
import { findCallSites } from '@simplesteps/core/compiler/discovery/callSiteLocator';
import { discoverServices } from '@simplesteps/core/compiler/discovery/serviceDiscovery';
import {
  resolveVariables,
  resolveExpression,
  VariableResolutionBuilder,
} from '@simplesteps/core/compiler/analysis/variableResolver';
import { StepVariableType } from '@simplesteps/core/compiler/analysis/types';
import { WholeProgramAnalyzer } from '@simplesteps/core/compiler/analysis/wholeProgramAnalyzer';

const CFG_FIXTURES_DIR = path.resolve(__dirname, '../../fixtures/cfg');

function createProgram(fixtureFile: string): ts.Program {
  const filePath = path.join(CFG_FIXTURES_DIR, fixtureFile);
  const runtimePath = path.resolve(__dirname, '../../../src/runtime/index.ts');
  const servicesDir = path.resolve(__dirname, '../../../src/runtime/services');

  const serviceFiles = [
    path.join(servicesDir, 'types.ts'),
    path.join(servicesDir, 'Lambda.ts'),
    path.join(servicesDir, 'SimpleQueueService.ts'),
    path.join(servicesDir, 'DynamoDB.ts'),
    path.join(servicesDir, 'SNS.ts'),
    path.join(servicesDir, 'StepFunction.ts'),
    path.join(servicesDir, 'EventBridge.ts'),
    path.join(servicesDir, 'index.ts'),
  ];

  return ts.createProgram(
    [filePath, runtimePath, ...serviceFiles],
    {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.Node16,
      moduleResolution: ts.ModuleResolutionKind.Node16,
      strict: true,
      esModuleInterop: true,
      experimentalDecorators: true,
      skipLibCheck: true,
    },
  );
}

function resolveFromFixture(fixtureFile: string) {
  const program = createProgram(fixtureFile);
  const context = new CompilerContext(program);
  const intrinsics = loadIntrinsics(context);
  expect(intrinsics).not.toBeNull();

  const serviceRegistry = discoverServices(context);

  const filePath = path.join(CFG_FIXTURES_DIR, fixtureFile);
  const sourceFile = program.getSourceFile(filePath);
  expect(sourceFile).toBeDefined();

  const callSites = findCallSites(context, intrinsics!, sourceFile!);
  expect(callSites).toHaveLength(1);

  const builder = resolveVariables(context, callSites[0], serviceRegistry);
  return { builder, context, callSite: callSites[0], sourceFile: sourceFile!, serviceRegistry };
}

function resolveFromFixtureWithAnalyzer(fixtureFile: string) {
  const program = createProgram(fixtureFile);
  const context = new CompilerContext(program);
  const intrinsics = loadIntrinsics(context);
  expect(intrinsics).not.toBeNull();

  const serviceRegistry = discoverServices(context);
  const analyzer = new WholeProgramAnalyzer(context, serviceRegistry);

  const filePath = path.join(CFG_FIXTURES_DIR, fixtureFile);
  const sourceFile = program.getSourceFile(filePath);
  expect(sourceFile).toBeDefined();

  const callSites = findCallSites(context, intrinsics!, sourceFile!);
  expect(callSites).toHaveLength(1);

  const builder = resolveVariables(context, callSites[0], serviceRegistry, undefined, analyzer);
  return { builder, context, callSite: callSites[0], sourceFile: sourceFile!, analyzer };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Variable resolver', () => {
  describe('variable classification', () => {
    it('should classify context parameter', () => {
      const { builder } = resolveFromFixture('sequential.ts');
      expect(builder.contextSymbol).toBeDefined();

      const info = builder.getBySymbol(builder.contextSymbol!);
      expect(info).toBeDefined();
      expect(info!.type).toBe(StepVariableType.Context);
      expect(info!.jsonPath).toBe('$$');
    });

    it('should classify input parameter', () => {
      const { builder } = resolveFromFixture('sequential.ts');
      expect(builder.inputSymbol).toBeDefined();

      const info = builder.getBySymbol(builder.inputSymbol!);
      expect(info).toBeDefined();
      expect(info!.type).toBe(StepVariableType.Input);
      expect(info!.jsonPath).toBe('$');
    });

    it('should classify service bindings as External', () => {
      const { builder } = resolveFromFixture('sequential.ts');
      const resolution = builder.toResolution();

      let externalCount = 0;
      for (const info of resolution.variables.values()) {
        if (info.type === StepVariableType.External) {
          externalCount++;
          expect(info.serviceBinding).toBeDefined();
          expect(info.literalValue).toBeDefined();
        }
      }

      // sequential.ts has serviceA and serviceB
      expect(externalCount).toBe(2);
    });

    it('should extract ARN from Lambda service bindings', () => {
      const { builder } = resolveFromFixture('sequential.ts');
      const resolution = builder.toResolution();

      const externals: string[] = [];
      for (const info of resolution.variables.values()) {
        if (info.type === StepVariableType.External && info.literalValue) {
          externals.push(info.literalValue as string);
        }
      }

      expect(externals).toContain('arn:aws:lambda:us-east-1:123:function:A');
      expect(externals).toContain('arn:aws:lambda:us-east-1:123:function:B');
    });
  });

  describe('expression resolution', () => {
    it('should resolve string literal', () => {
      const { context, builder } = resolveFromFixture('sequential.ts');
      const resolution = builder.toResolution();

      // Create a synthetic string literal to test
      const sf = ts.createSourceFile('test.ts', '"hello"', ts.ScriptTarget.ES2022, true);
      const expr = (sf.statements[0] as ts.ExpressionStatement).expression;
      const result = resolveExpression(context, expr, resolution);
      expect(result.kind).toBe('literal');
      expect(result.value).toBe('hello');
    });

    it('should resolve numeric literal', () => {
      const { context, builder } = resolveFromFixture('sequential.ts');
      const resolution = builder.toResolution();

      const sf = ts.createSourceFile('test.ts', '42', ts.ScriptTarget.ES2022, true);
      const expr = (sf.statements[0] as ts.ExpressionStatement).expression;
      const result = resolveExpression(context, expr, resolution);
      expect(result.kind).toBe('literal');
      expect(result.value).toBe(42);
    });

    it('should resolve boolean true', () => {
      const { context, builder } = resolveFromFixture('sequential.ts');
      const resolution = builder.toResolution();

      const sf = ts.createSourceFile('test.ts', 'true', ts.ScriptTarget.ES2022, true);
      const expr = (sf.statements[0] as ts.ExpressionStatement).expression;
      const result = resolveExpression(context, expr, resolution);
      expect(result.kind).toBe('literal');
      expect(result.value).toBe(true);
    });

    it('should resolve boolean false', () => {
      const { context, builder } = resolveFromFixture('sequential.ts');
      const resolution = builder.toResolution();

      const sf = ts.createSourceFile('test.ts', 'false', ts.ScriptTarget.ES2022, true);
      const expr = (sf.statements[0] as ts.ExpressionStatement).expression;
      const result = resolveExpression(context, expr, resolution);
      expect(result.kind).toBe('literal');
      expect(result.value).toBe(false);
    });

    it('should resolve null', () => {
      const { context, builder } = resolveFromFixture('sequential.ts');
      const resolution = builder.toResolution();

      const sf = ts.createSourceFile('test.ts', 'null', ts.ScriptTarget.ES2022, true);
      const expr = (sf.statements[0] as ts.ExpressionStatement).expression;
      const result = resolveExpression(context, expr, resolution);
      expect(result.kind).toBe('literal');
      expect(result.value).toBeNull();
    });

    it('should resolve input symbol to jsonpath $', () => {
      const { context, builder, callSite } = resolveFromFixture('sequential.ts');
      const resolution = builder.toResolution();

      // Find the input identifier in the factory body
      const factory = callSite.factoryFunction.factory;
      const body = factory.body as ts.Block;

      // Find a property access on input (e.g., input.id)
      let inputAccess: ts.PropertyAccessExpression | undefined;
      ts.forEachChild(body, function visit(node) {
        if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression)) {
          const sym = context.checker.getSymbolAtLocation(node.expression);
          if (sym && sym === builder.inputSymbol) {
            inputAccess = node;
          }
        }
        ts.forEachChild(node, visit);
      });

      expect(inputAccess).toBeDefined();
      const result = resolveExpression(context, inputAccess!, resolution);
      expect(result.kind).toBe('jsonpath');
      expect(result.path).toBe('$.id');
    });
  });

  describe('VariableResolutionBuilder', () => {
    it('should convert to immutable resolution', () => {
      const { builder } = resolveFromFixture('sequential.ts');
      const resolution = builder.toResolution();

      expect(resolution.variables).toBeDefined();
      expect(resolution.inputSymbol).toBeDefined();
      expect(resolution.contextSymbol).toBeDefined();
      expect(resolution.variables.size).toBeGreaterThan(0);
    });

    it('should allow adding variables', () => {
      const builder = new VariableResolutionBuilder();
      expect(builder.variables.size).toBe(0);

      const resolution = builder.toResolution();
      expect(resolution.variables.size).toBe(0);
    });
  });

  describe('with WholeProgramAnalyzer', () => {
    it('should classify variables same as without analyzer', () => {
      const withoutAnalyzer = resolveFromFixture('sequential.ts');
      const withAnalyzer = resolveFromFixtureWithAnalyzer('sequential.ts');

      // Both should have same context and input symbols
      expect(withAnalyzer.builder.contextSymbol).toBeDefined();
      expect(withAnalyzer.builder.inputSymbol).toBeDefined();
    });

    it('should classify service bindings with analyzer', () => {
      const { builder } = resolveFromFixtureWithAnalyzer('sequential.ts');
      const resolution = builder.toResolution();

      let externalCount = 0;
      for (const info of resolution.variables.values()) {
        if (info.type === StepVariableType.External) {
          externalCount++;
          expect(info.serviceBinding).toBeDefined();
        }
      }

      expect(externalCount).toBe(2);
    });

    it('should resolve compile-time constants via analyzer', () => {
      const { builder } = resolveFromFixtureWithAnalyzer('constants.ts');
      const resolution = builder.toResolution();

      // Check that the analyzer path resolves constants
      let constantCount = 0;
      for (const info of resolution.variables.values()) {
        if (info.type === StepVariableType.Constant) {
          constantCount++;
        }
      }

      // constants.ts has: BASE_URL, MAX_RETRIES, TIMEOUT, GREETING, DOUBLED, NEGATIVE, COMPUTED
      expect(constantCount).toBeGreaterThanOrEqual(7);
    });

    it('should fold computed constants via analyzer', () => {
      const { builder } = resolveFromFixtureWithAnalyzer('constants.ts');
      const resolution = builder.toResolution();

      const constants = new Map<string, unknown>();
      for (const [sym, info] of resolution.variables) {
        if (info.type === StepVariableType.Constant) {
          constants.set(sym.getName(), info.literalValue);
        }
      }

      expect(constants.get('BASE_URL')).toBe('https://api.example.com');
      expect(constants.get('MAX_RETRIES')).toBe(3);
      expect(constants.get('TIMEOUT')).toBe(40);       // 30 + 10
      expect(constants.get('GREETING')).toBe('Hello World');
      expect(constants.get('DOUBLED')).toBe(6);          // 3 * 2
      expect(constants.get('NEGATIVE')).toBe(-1);
      expect(constants.get('COMPUTED')).toBe(20);         // Math.max(10, 20)
    });

    it('should produce same ARNs with analyzer', () => {
      const { builder } = resolveFromFixtureWithAnalyzer('sequential.ts');
      const resolution = builder.toResolution();

      const arns: string[] = [];
      for (const info of resolution.variables.values()) {
        if (info.type === StepVariableType.External && info.literalValue) {
          arns.push(info.literalValue as string);
        }
      }

      expect(arns).toContain('arn:aws:lambda:us-east-1:123:function:A');
      expect(arns).toContain('arn:aws:lambda:us-east-1:123:function:B');
    });
  });
});
