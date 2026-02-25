// Test fixture: JSONata arithmetic operators
//
// These operators (*, /, %, dynamic -) produce SS530-SS533 errors in JSONPath mode
// but should compile to native JSONata expressions.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';

export const jsonataArithmetic = Steps.createFunction(
  async (context: SimpleStepContext, input: { price: number; quantity: number; discount: number; divisor: number }) => {
    // Multiplication: input.price * input.quantity
    const subtotal = input.price * input.quantity;

    // Division: subtotal / input.divisor
    const divided = subtotal / input.divisor;

    // Modulo: subtotal % 100
    const remainder = subtotal % 100;

    // Dynamic subtraction: subtotal - input.discount
    const total = subtotal - input.discount;

    // Addition (already supported in JSONPath, but test native JSONata too)
    const withTax = total + input.discount;

    return { subtotal, divided, remainder, total, withTax };
  },
);
