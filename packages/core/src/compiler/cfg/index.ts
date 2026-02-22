export type {
  Terminator,
  FallTerminator,
  BranchTerminator,
  LoopTerminator,
  LoopBackTerminator,
  TryCatchTerminator,
  MapStateTerminator,
  ParallelTerminator,
  ReturnTerminator,
  ThrowTerminator,
  BreakTerminator,
  ContinueTerminator,
  BasicBlock,
  ControlFlowGraph,
} from './types.js';

export { buildCFG } from './cfgBuilder.js';
