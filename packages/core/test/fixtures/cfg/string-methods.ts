import { Steps, SimpleStepContext } from '../../../src/runtime/index';

// Test: JS string method → JSONata function mappings
export const stringMethods = Steps.createFunction(
  async (context: SimpleStepContext, input: { name: string; text: string; id: string; raw: string }) => {
    // str.toUpperCase() → $uppercase(str)
    const upper = input.name.toUpperCase();

    // str.toLowerCase() → $lowercase(str)
    const lower = input.name.toLowerCase();

    // str.trim() → $trim(str)
    const trimmed = input.raw.trim();

    // str.substring(start, end) → $substring(str, start, end - start)
    const sub = input.text.substring(0, 5);

    // str.substring(start) → $substring(str, start)
    const rest = input.text.substring(3);

    // str.padStart(n, c) → $pad(str, -n, c)
    const padded = input.id.padStart(10, '0');

    // str.padEnd(n, c) → $pad(str, n, c)
    const paddedEnd = input.id.padEnd(10, ' ');

    // str.replace(a, b) → $replace(str, a, b)
    const replaced = input.text.replace('old', 'new');

    // str.charAt(i) → $substring(str, i, 1)
    const ch = input.text.charAt(0);

    // str.startsWith(s) → $substring(str, 0, len) = s
    const starts = input.name.startsWith('pre');

    // str.endsWith(s) → $substring(str, $length(str) - len) = s
    const ends = input.name.endsWith('fix');

    // str.repeat(n) → $join($map([1..n], function() { str }))
    const repeated = input.name.repeat(3);

    return { upper, lower, trimmed, sub, rest, padded, paddedEnd, replaced, ch, starts, ends, repeated };
  },
);
