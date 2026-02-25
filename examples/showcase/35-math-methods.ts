// Math Methods & Type Conversion
//
// JavaScript Math methods and type conversion functions compile to
// JSONata built-in functions that work with dynamic runtime values.
//
// Query Language: JSONata (default)
//
// These methods require JSONata mode. To compile with JSONPath instead
// (where these would be errors), use:
//   simplesteps compile 35-math-methods.ts --query-language jsonpath
//
// Or programmatically:
//   compile({ sourceFiles: ['35-math-methods.ts'], queryLanguage: 'JSONPath' })
//
// Mapping table:
//   Math.floor(x)      → $floor(x)
//   Math.ceil(x)       → $ceil(x)
//   Math.round(x)      → $round(x)
//   Math.abs(x)        → $abs(x)
//   Math.pow(a, b)     → $power(a, b)
//   Math.sqrt(x)       → $sqrt(x)
//   Math.min(a, b)     → $min([a, b])
//   Math.max(a, b)     → $max([a, b])
//   Math.random()      → $random()
//   Number(x)          → $number(x)
//   String(x)          → $string(x)
//   Boolean(x)         → $boolean(x)
//   typeof x           → $type(x)
//   Date.now()         → $millis()
//   Array.isArray(x)   → $type(x) = 'array'

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const getQuote = Lambda<{ productId: string }, { price: number; discount: number; quantity: string; taxRate: number }>(
  'arn:aws:lambda:us-east-1:123:function:GetQuote',
);

export const mathMethods = Steps.createFunction(
  async (context: SimpleStepContext, input: { productId: string }) => {
    const quote = await getQuote.call({ productId: input.productId });

    // Rounding → $floor / $ceil / $round
    const basePrice = Math.floor(quote.price);
    const shippingCeil = Math.ceil(quote.price * 0.1);
    const rounded = Math.round(quote.price);

    // Absolute value → $abs
    const savings = Math.abs(quote.discount);

    // Power and square root → $power / $sqrt
    const squared = Math.pow(quote.price, 2);
    const root = Math.sqrt(quote.price);

    // Min/max → $min([...]) / $max([...])
    const finalPrice = Math.max(quote.price - quote.discount, 0);
    const capped = Math.min(quote.price, 999);

    // Random → $random()
    const sessionId = Math.random();

    // Type conversion → $number / $string / $boolean
    const qty = Number(quote.quantity);
    const label = String(quote.price);
    const hasDiscount = Boolean(quote.discount);

    // typeof → $type()
    const priceType = typeof quote.price;

    // Date.now() → $millis()
    const timestamp = Date.now();

    return {
      basePrice,
      shippingCeil,
      rounded,
      savings,
      squared,
      root,
      finalPrice,
      capped,
      sessionId,
      qty,
      label,
      hasDiscount,
      priceType,
      timestamp,
    };
  },
);
