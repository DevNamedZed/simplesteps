// ---------------------------------------------------------------------------
// Constant Propagation Lattice
//
// Three-element lattice: Top → Constant(value) → Bottom
// Used by the whole-program data flow analyzer to track variable values.
// ---------------------------------------------------------------------------

import type ts from 'typescript';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TopValue {
  readonly kind: 'top';
}

export interface ConstantValue {
  readonly kind: 'constant';
  readonly value: unknown;
}

export interface BottomValue {
  readonly kind: 'bottom';
  /** Human-readable reason this value is not constant. */
  readonly reason: string;
  /** The original expression node that caused the Bottom. */
  readonly sourceNode?: ts.Node;
  /** Root-cause Bottom for poisoned-value chains. */
  readonly rootCause?: BottomValue;
  /** True when wrapped in Steps.safeVar() — produces warning instead of error. */
  readonly isSafe?: boolean;
}

export type LatticeValue = TopValue | ConstantValue | BottomValue;

// ---------------------------------------------------------------------------
// Factory functions
// ---------------------------------------------------------------------------

const TOP_SINGLETON: TopValue = { kind: 'top' };

export function top(): TopValue {
  return TOP_SINGLETON;
}

export function constant(value: unknown): ConstantValue {
  return { kind: 'constant', value };
}

export function bottom(
  reason: string,
  sourceNode?: ts.Node,
  rootCause?: BottomValue,
): BottomValue {
  return { kind: 'bottom', reason, sourceNode, rootCause };
}

export function safeBottom(
  reason: string,
  sourceNode?: ts.Node,
  rootCause?: BottomValue,
): BottomValue {
  return { kind: 'bottom', reason, sourceNode, rootCause, isSafe: true };
}

/**
 * Propagate a Bottom through a dependency chain.
 * The new Bottom inherits the root cause from the original.
 */
export function propagateBottom(
  reason: string,
  source: BottomValue,
  sourceNode?: ts.Node,
): BottomValue {
  return {
    kind: 'bottom',
    reason,
    sourceNode,
    rootCause: source.rootCause ?? source,
    isSafe: source.isSafe,
  };
}

// ---------------------------------------------------------------------------
// Meet operation
// ---------------------------------------------------------------------------

/**
 * The meet (⊓) combines two lattice values:
 *   ⊤ ⊓ x = x
 *   x ⊓ ⊤ = x
 *   ⊥ ⊓ x = ⊥
 *   x ⊓ ⊥ = ⊥
 *   Constant(a) ⊓ Constant(b) = Constant(a) if a === b, else ⊥
 */
export function meet(a: LatticeValue, b: LatticeValue): LatticeValue {
  if (a.kind === 'top') return b;
  if (b.kind === 'top') return a;
  if (a.kind === 'bottom') return a;
  if (b.kind === 'bottom') return b;
  // Both are constants
  if (a.value === b.value) return a;
  return bottom('Value differs across paths');
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function isTop(v: LatticeValue): v is TopValue {
  return v.kind === 'top';
}

export function isConstant(v: LatticeValue): v is ConstantValue {
  return v.kind === 'constant';
}

export function isBottom(v: LatticeValue): v is BottomValue {
  return v.kind === 'bottom';
}
