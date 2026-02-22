import ts from 'typescript';
import type {
  Terminator,
  FallTerminator,
  BranchTerminator,
  LoopTerminator,
  LoopBackTerminator,
  TryCatchTerminator,
  MapStateTerminator,
  ReturnTerminator,
  ThrowTerminator,
  BreakTerminator,
  ContinueTerminator,
  BasicBlock,
  ControlFlowGraph,
} from '@simplesteps/core/compiler/cfg/types';

describe('CFG types', () => {
  describe('Terminator variants', () => {
    it('should construct a FallTerminator', () => {
      const t: FallTerminator = { kind: 'fall', target: 'bb_1' };
      expect(t.kind).toBe('fall');
      expect(t.target).toBe('bb_1');
    });

    it('should construct a BranchTerminator', () => {
      const t: BranchTerminator = {
        kind: 'branch',
        condition: {} as ts.Expression,
        thenBlock: 'then_0',
        elseBlock: 'else_0',
      };
      expect(t.kind).toBe('branch');
      expect(t.thenBlock).toBe('then_0');
      expect(t.elseBlock).toBe('else_0');
    });

    it('should construct a LoopTerminator', () => {
      const t: LoopTerminator = {
        kind: 'loop',
        condition: {} as ts.Expression,
        bodyBlock: 'body_0',
        exitBlock: 'exit_0',
      };
      expect(t.kind).toBe('loop');
      expect(t.bodyBlock).toBe('body_0');
      expect(t.exitBlock).toBe('exit_0');
    });

    it('should construct a LoopBackTerminator', () => {
      const t: LoopBackTerminator = { kind: 'loopBack', target: 'cond_0' };
      expect(t.kind).toBe('loopBack');
    });

    it('should construct a TryCatchTerminator', () => {
      const t: TryCatchTerminator = {
        kind: 'tryCatch',
        tryBlock: 'try_0',
        errorHandlers: [],
        catchFallback: 'catch_0',
        mergeBlock: 'merge_0',
      };
      expect(t.kind).toBe('tryCatch');
      expect(t.finallyBlock).toBeUndefined();
    });

    it('should construct a TryCatchTerminator with finally', () => {
      const t: TryCatchTerminator = {
        kind: 'tryCatch',
        tryBlock: 'try_0',
        errorHandlers: [],
        catchFallback: 'catch_0',
        finallyBlock: 'finally_0',
        mergeBlock: 'merge_0',
      };
      expect(t.finallyBlock).toBe('finally_0');
    });

    it('should construct a MapStateTerminator', () => {
      const t: MapStateTerminator = {
        kind: 'mapState',
        expression: {} as ts.ForOfStatement,
        bodyBlock: 'body_0',
        exitBlock: 'exit_0',
        collectResults: false,
      };
      expect(t.kind).toBe('mapState');
      expect(t.collectResults).toBe(false);
    });

    it('should construct a ReturnTerminator', () => {
      const t: ReturnTerminator = { kind: 'return' };
      expect(t.kind).toBe('return');
      expect(t.expression).toBeUndefined();
    });

    it('should construct a ThrowTerminator', () => {
      const t: ThrowTerminator = {
        kind: 'throw',
        expression: {} as ts.Expression,
      };
      expect(t.kind).toBe('throw');
    });

    it('should construct a BreakTerminator', () => {
      const t: BreakTerminator = { kind: 'break', target: 'exit_0' };
      expect(t.kind).toBe('break');
    });

    it('should construct a ContinueTerminator', () => {
      const t: ContinueTerminator = { kind: 'continue', target: 'cond_0' };
      expect(t.kind).toBe('continue');
    });
  });

  describe('Terminator discriminated union', () => {
    it('should discriminate on kind', () => {
      const terminators: Terminator[] = [
        { kind: 'fall', target: 'bb_1' },
        { kind: 'return' },
        { kind: 'throw', expression: {} as ts.Expression },
        { kind: 'break', target: 'exit_0' },
        { kind: 'continue', target: 'cond_0' },
      ];

      const kinds = terminators.map(t => t.kind);
      expect(kinds).toEqual(['fall', 'return', 'throw', 'break', 'continue']);
    });
  });

  describe('BasicBlock', () => {
    it('should construct a basic block', () => {
      const block: BasicBlock = {
        id: 'bb_0',
        statements: [],
        terminator: { kind: 'return' },
      };
      expect(block.id).toBe('bb_0');
      expect(block.statements).toHaveLength(0);
      expect(block.terminator.kind).toBe('return');
    });
  });

  describe('ControlFlowGraph', () => {
    it('should construct a CFG with entry and blocks', () => {
      const blocks = new Map<string, BasicBlock>();
      blocks.set('entry_0', {
        id: 'entry_0',
        statements: [],
        terminator: { kind: 'return' },
      });

      const cfg: ControlFlowGraph = {
        entry: 'entry_0',
        blocks,
      };

      expect(cfg.entry).toBe('entry_0');
      expect(cfg.blocks.size).toBe(1);
      expect(cfg.blocks.get('entry_0')).toBeDefined();
    });
  });
});
