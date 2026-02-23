import {
  top,
  constant,
  bottom,
  safeBottom,
  propagateBottom,
  meet,
  isTop,
  isConstant,
  isBottom,
} from '@simplesteps/core/compiler/analysis/lattice';

describe('Lattice', () => {
  describe('factory functions', () => {
    it('top()', () => {
      const v = top();
      expect(v.kind).toBe('top');
      expect(isTop(v)).toBe(true);
      expect(isConstant(v)).toBe(false);
      expect(isBottom(v)).toBe(false);
    });

    it('constant()', () => {
      const v = constant(42);
      expect(v.kind).toBe('constant');
      expect(isConstant(v)).toBe(true);
      if (isConstant(v)) expect(v.value).toBe(42);
    });

    it('constant(null)', () => {
      const v = constant(null);
      expect(isConstant(v)).toBe(true);
      if (isConstant(v)) expect(v.value).toBeNull();
    });

    it('constant(undefined)', () => {
      const v = constant(undefined);
      expect(isConstant(v)).toBe(true);
      if (isConstant(v)) expect(v.value).toBeUndefined();
    });

    it('constant(object)', () => {
      const obj = { a: 1, b: 'hello' };
      const v = constant(obj);
      expect(isConstant(v)).toBe(true);
      if (isConstant(v)) expect(v.value).toBe(obj);
    });

    it('bottom()', () => {
      const v = bottom('test reason');
      expect(v.kind).toBe('bottom');
      expect(isBottom(v)).toBe(true);
      if (isBottom(v)) {
        expect(v.reason).toBe('test reason');
        expect(v.isSafe).toBeUndefined();
      }
    });

    it('safeBottom()', () => {
      const v = safeBottom('wrapped in Steps.safeVar()');
      expect(isBottom(v)).toBe(true);
      if (isBottom(v)) {
        expect(v.isSafe).toBe(true);
        expect(v.reason).toBe('wrapped in Steps.safeVar()');
      }
    });
  });

  describe('propagateBottom()', () => {
    it('preserves root cause', () => {
      const root = bottom('original reason');
      const propagated = propagateBottom('depends on X', root);
      expect(isBottom(propagated)).toBe(true);
      if (isBottom(propagated)) {
        expect(propagated.reason).toBe('depends on X');
        expect(propagated.rootCause).toBe(root);
      }
    });

    it('preserves deep root cause', () => {
      const root = bottom('original');
      const middle = propagateBottom('middle', root);
      const outer = propagateBottom('outer', middle);
      if (isBottom(outer)) {
        expect(outer.rootCause).toBe(root);
      }
    });

    it('preserves isSafe through chain', () => {
      const root = safeBottom('safe value');
      const propagated = propagateBottom('depends on safe', root);
      if (isBottom(propagated)) {
        expect(propagated.isSafe).toBe(true);
        expect(propagated.rootCause).toBe(root);
      }
    });
  });

  describe('meet()', () => {
    it('top ⊓ x = x', () => {
      expect(meet(top(), constant(42))).toEqual(constant(42));
      expect(meet(top(), bottom('r'))).toEqual(bottom('r'));
      expect(meet(top(), top())).toEqual(top());
    });

    it('x ⊓ top = x', () => {
      expect(meet(constant(42), top())).toEqual(constant(42));
      expect(meet(bottom('r'), top())).toEqual(bottom('r'));
    });

    it('bottom ⊓ x = bottom', () => {
      const b = bottom('reason');
      expect(meet(b, constant(42))).toBe(b);
      expect(meet(b, top())).toBe(b);
    });

    it('x ⊓ bottom = bottom', () => {
      const b = bottom('reason');
      expect(meet(constant(42), b)).toBe(b);
    });

    it('same constants meet to constant', () => {
      expect(meet(constant(42), constant(42))).toEqual(constant(42));
      expect(meet(constant('hello'), constant('hello'))).toEqual(constant('hello'));
    });

    it('different constants meet to bottom', () => {
      const result = meet(constant(42), constant(99));
      expect(isBottom(result)).toBe(true);
    });
  });
});
