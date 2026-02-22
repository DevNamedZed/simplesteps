import path from 'path';
import ts from 'typescript';
import { CompilerContext } from '@simplesteps/core/compiler/compilerContext';
import { loadIntrinsics } from '@simplesteps/core/compiler/discovery/intrinsics';
import { findCallSites } from '@simplesteps/core/compiler/discovery/callSiteLocator';
import { buildCFG } from '@simplesteps/core/compiler/cfg/cfgBuilder';
import type { ControlFlowGraph, BasicBlock, Terminator } from '@simplesteps/core/compiler/cfg/types';

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

function buildCFGFromFixture(fixtureFile: string): {
  cfg: ControlFlowGraph;
  context: CompilerContext;
} {
  const program = createProgram(fixtureFile);
  const context = new CompilerContext(program);
  const intrinsics = loadIntrinsics(context);
  expect(intrinsics).not.toBeNull();

  const filePath = path.join(CFG_FIXTURES_DIR, fixtureFile);
  const sourceFile = program.getSourceFile(filePath);
  expect(sourceFile).toBeDefined();

  const callSites = findCallSites(context, intrinsics!, sourceFile!);
  expect(callSites).toHaveLength(1);

  const factory = callSites[0].factoryFunction.factory;
  expect(factory.body).toBeDefined();
  expect(ts.isBlock(factory.body!)).toBe(true);

  const cfg = buildCFG(context, factory.body! as ts.Block);
  return { cfg, context };
}

function getBlock(cfg: ControlFlowGraph, id: string): BasicBlock {
  const block = cfg.blocks.get(id);
  expect(block).toBeDefined();
  return block!;
}

function findBlocksByTerminator(
  cfg: ControlFlowGraph,
  kind: Terminator['kind'],
): BasicBlock[] {
  const result: BasicBlock[] = [];
  for (const block of cfg.blocks.values()) {
    if (block.terminator.kind === kind) {
      result.push(block);
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('CFG builder', () => {
  describe('sequential fixture', () => {
    it('should produce blocks with entry', () => {
      const { cfg } = buildCFGFromFixture('sequential.ts');
      expect(cfg.entry).toBeDefined();
      expect(cfg.blocks.size).toBeGreaterThanOrEqual(1);
    });

    it('should have entry block', () => {
      const { cfg } = buildCFGFromFixture('sequential.ts');
      const entry = getBlock(cfg, cfg.entry);
      expect(entry).toBeDefined();
    });

    it('should end with a return terminator', () => {
      const { cfg } = buildCFGFromFixture('sequential.ts');
      const returnBlocks = findBlocksByTerminator(cfg, 'return');
      expect(returnBlocks.length).toBeGreaterThanOrEqual(1);
    });

    it('should produce no errors', () => {
      const { context } = buildCFGFromFixture('sequential.ts');
      expect(context.hasErrors()).toBe(false);
    });
  });

  describe('if-else fixture', () => {
    it('should have a branch terminator', () => {
      const { cfg } = buildCFGFromFixture('if-else.ts');
      const branchBlocks = findBlocksByTerminator(cfg, 'branch');
      expect(branchBlocks.length).toBeGreaterThanOrEqual(1);
    });

    it('should have thenBlock and elseBlock targets', () => {
      const { cfg } = buildCFGFromFixture('if-else.ts');
      const branchBlocks = findBlocksByTerminator(cfg, 'branch');
      expect(branchBlocks.length).toBeGreaterThanOrEqual(1);

      const branch = branchBlocks[0].terminator;
      expect(branch.kind).toBe('branch');
      if (branch.kind === 'branch') {
        expect(cfg.blocks.has(branch.thenBlock)).toBe(true);
        expect(cfg.blocks.has(branch.elseBlock)).toBe(true);
      }
    });

    it('should have return terminators in both branches', () => {
      const { cfg } = buildCFGFromFixture('if-else.ts');
      const returnBlocks = findBlocksByTerminator(cfg, 'return');
      expect(returnBlocks.length).toBeGreaterThanOrEqual(2);
    });

    it('should produce no errors', () => {
      const { context } = buildCFGFromFixture('if-else.ts');
      expect(context.hasErrors()).toBe(false);
    });
  });

  describe('while-loop fixture', () => {
    it('should have a loop terminator', () => {
      const { cfg } = buildCFGFromFixture('while-loop.ts');
      const loopBlocks = findBlocksByTerminator(cfg, 'loop');
      expect(loopBlocks.length).toBeGreaterThanOrEqual(1);
    });

    it('should have loop body and exit targets', () => {
      const { cfg } = buildCFGFromFixture('while-loop.ts');
      const loopBlocks = findBlocksByTerminator(cfg, 'loop');
      const loop = loopBlocks[0].terminator;
      if (loop.kind === 'loop') {
        expect(cfg.blocks.has(loop.bodyBlock)).toBe(true);
        expect(cfg.blocks.has(loop.exitBlock)).toBe(true);
      }
    });

    it('should have a loopBack terminator in body', () => {
      const { cfg } = buildCFGFromFixture('while-loop.ts');
      const loopBackBlocks = findBlocksByTerminator(cfg, 'loopBack');
      expect(loopBackBlocks.length).toBeGreaterThanOrEqual(1);
    });

    it('should produce no errors', () => {
      const { context } = buildCFGFromFixture('while-loop.ts');
      expect(context.hasErrors()).toBe(false);
    });
  });

  describe('try-catch fixture', () => {
    it('should have a tryCatch terminator', () => {
      const { cfg } = buildCFGFromFixture('try-catch.ts');
      const tryCatchBlocks = findBlocksByTerminator(cfg, 'tryCatch');
      expect(tryCatchBlocks.length).toBeGreaterThanOrEqual(1);
    });

    it('should have try and catch block targets', () => {
      const { cfg } = buildCFGFromFixture('try-catch.ts');
      const tryCatchBlocks = findBlocksByTerminator(cfg, 'tryCatch');
      const tc = tryCatchBlocks[0].terminator;
      if (tc.kind === 'tryCatch') {
        expect(cfg.blocks.has(tc.tryBlock)).toBe(true);
        // catchFallback or errorHandlers should have valid blocks
        if (tc.catchFallback) {
          expect(cfg.blocks.has(tc.catchFallback)).toBe(true);
        }
        expect(cfg.blocks.has(tc.mergeBlock)).toBe(true);
      }
    });

    it('should produce no errors', () => {
      const { context } = buildCFGFromFixture('try-catch.ts');
      expect(context.hasErrors()).toBe(false);
    });
  });

  describe('for-of fixture', () => {
    it('should have a mapState terminator', () => {
      const { cfg } = buildCFGFromFixture('for-of.ts');
      const mapBlocks = findBlocksByTerminator(cfg, 'mapState');
      expect(mapBlocks.length).toBeGreaterThanOrEqual(1);
    });

    it('should have body and exit targets', () => {
      const { cfg } = buildCFGFromFixture('for-of.ts');
      const mapBlocks = findBlocksByTerminator(cfg, 'mapState');
      const ms = mapBlocks[0].terminator;
      if (ms.kind === 'mapState') {
        expect(cfg.blocks.has(ms.bodyBlock)).toBe(true);
        expect(cfg.blocks.has(ms.exitBlock)).toBe(true);
      }
    });

    it('should produce no errors', () => {
      const { context } = buildCFGFromFixture('for-of.ts');
      expect(context.hasErrors()).toBe(false);
    });
  });

  describe('early-return fixture', () => {
    it('should have a branch terminator for the if check', () => {
      const { cfg } = buildCFGFromFixture('early-return.ts');
      const branchBlocks = findBlocksByTerminator(cfg, 'branch');
      expect(branchBlocks.length).toBeGreaterThanOrEqual(1);
    });

    it('should have a return in one branch and continuation in other', () => {
      const { cfg } = buildCFGFromFixture('early-return.ts');
      // The early return branch has a return terminator
      const returnBlocks = findBlocksByTerminator(cfg, 'return');
      expect(returnBlocks.length).toBeGreaterThanOrEqual(2);

      // There should be a merge block for the non-returning branch
      const fallBlocks = findBlocksByTerminator(cfg, 'fall');
      expect(fallBlocks.length).toBeGreaterThanOrEqual(1);
    });

    it('should produce no errors', () => {
      const { context } = buildCFGFromFixture('early-return.ts');
      expect(context.hasErrors()).toBe(false);
    });
  });

  describe('nested fixture', () => {
    it('should have multiple branch terminators for nested ifs', () => {
      const { cfg } = buildCFGFromFixture('nested.ts');
      const branchBlocks = findBlocksByTerminator(cfg, 'branch');
      expect(branchBlocks.length).toBeGreaterThanOrEqual(2);
    });

    it('should have multiple return terminators', () => {
      const { cfg } = buildCFGFromFixture('nested.ts');
      const returnBlocks = findBlocksByTerminator(cfg, 'return');
      expect(returnBlocks.length).toBeGreaterThanOrEqual(3);
    });

    it('should produce no errors', () => {
      const { context } = buildCFGFromFixture('nested.ts');
      expect(context.hasErrors()).toBe(false);
    });
  });

  describe('and-or-conditions fixture', () => {
    it('should have a branch terminator', () => {
      const { cfg } = buildCFGFromFixture('and-or-conditions.ts');
      const branchBlocks = findBlocksByTerminator(cfg, 'branch');
      expect(branchBlocks.length).toBeGreaterThanOrEqual(1);
    });

    it('should produce no errors', () => {
      const { context } = buildCFGFromFixture('and-or-conditions.ts');
      expect(context.hasErrors()).toBe(false);
    });
  });

  describe('wait-state fixture', () => {
    it('should produce blocks with entry', () => {
      const { cfg } = buildCFGFromFixture('wait-state.ts');
      expect(cfg.entry).toBeDefined();
      expect(cfg.blocks.size).toBeGreaterThanOrEqual(1);
    });

    it('should produce no errors', () => {
      const { context } = buildCFGFromFixture('wait-state.ts');
      expect(context.hasErrors()).toBe(false);
    });
  });

  describe('switch-case fixture', () => {
    it('should have branch terminators for chained cases', () => {
      const { cfg } = buildCFGFromFixture('switch-case.ts');
      const branchBlocks = findBlocksByTerminator(cfg, 'branch');
      expect(branchBlocks.length).toBeGreaterThanOrEqual(2);
    });

    it('should have return terminators for case bodies', () => {
      const { cfg } = buildCFGFromFixture('switch-case.ts');
      const returnBlocks = findBlocksByTerminator(cfg, 'return');
      expect(returnBlocks.length).toBeGreaterThanOrEqual(3);
    });

    it('should produce no errors', () => {
      const { context } = buildCFGFromFixture('switch-case.ts');
      expect(context.hasErrors()).toBe(false);
    });
  });

  describe('intrinsics fixture', () => {
    it('should produce a CFG with no errors', () => {
      const { cfg, context } = buildCFGFromFixture('intrinsics.ts');
      expect(context.errors).toHaveLength(0);
      expect(cfg.entry).toBeDefined();
      expect(cfg.blocks.size).toBeGreaterThanOrEqual(1);
    });

    it('should have a return terminator', () => {
      const { cfg } = buildCFGFromFixture('intrinsics.ts');
      const returns = findBlocksByTerminator(cfg, 'return');
      expect(returns.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('js-operators fixture', () => {
    it('should produce a CFG with no errors', () => {
      const { cfg, context } = buildCFGFromFixture('js-operators.ts');
      expect(context.errors).toHaveLength(0);
      expect(cfg.entry).toBeDefined();
    });
  });

  describe('parallel fixture', () => {
    it('should produce a parallel terminator', () => {
      const { cfg, context } = buildCFGFromFixture('parallel.ts');
      expect(context.errors).toHaveLength(0);

      const parallelBlocks = findBlocksByTerminator(cfg, 'parallel');
      expect(parallelBlocks).toHaveLength(1);

      const term = parallelBlocks[0].terminator;
      expect(term.kind).toBe('parallel');
      if (term.kind === 'parallel') {
        expect(term.branches).toHaveLength(2);
        expect(term.resultBindings).toEqual(['orderResult', 'paymentResult']);
      }
    });
  });

  describe('all fixtures produce zero diagnostics', () => {
    const fixtures = [
      'sequential.ts',
      'if-else.ts',
      'while-loop.ts',
      'try-catch.ts',
      'for-of.ts',
      'early-return.ts',
      'nested.ts',
      'and-or-conditions.ts',
      'wait-state.ts',
      'switch-case.ts',
      'intrinsics.ts',
      'js-operators.ts',
      'parallel.ts',
    ];

    for (const fixture of fixtures) {
      it(`${fixture} has no errors`, () => {
        const { context } = buildCFGFromFixture(fixture);
        expect(context.errors).toHaveLength(0);
      });
    }
  });
});
