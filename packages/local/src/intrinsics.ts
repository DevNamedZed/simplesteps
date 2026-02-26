// ---------------------------------------------------------------------------
// ASL intrinsic function parser and implementations.
//
// Intrinsic functions appear as string values in Parameters with '.$' keys:
//   { "result.$": "States.Format('Hello {}', $.name)" }
// ---------------------------------------------------------------------------

import type { ContextObject } from './types.js';
import { resolveReference } from './jsonpath.js';

// ---------------------------------------------------------------------------
// Cross-environment crypto helpers (Node.js + browser)
// ---------------------------------------------------------------------------

const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

function getRandomUUID(): string {
  if (isBrowser) {
    return crypto.randomUUID();
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require('crypto').randomUUID();
}

function computeHash(algorithm: string, data: string): string {
  if (isBrowser) {
    // Web Crypto is async but ASL intrinsics are sync.
    // Fall back to a simple non-crypto hash for browser usage —
    // the playground only needs deterministic output, not cryptographic security.
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const ch = data.charCodeAt(i);
      hash = ((hash << 5) - hash + ch) | 0;
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require('crypto').createHash(algorithm.toLowerCase()).update(data).digest('hex');
}

function base64Encode(str: string): string {
  if (isBrowser) {
    return btoa(str);
  }
  return Buffer.from(str, 'utf-8').toString('base64');
}

function base64Decode(str: string): string {
  if (isBrowser) {
    return atob(str);
  }
  return Buffer.from(str, 'base64').toString('utf-8');
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Evaluate an intrinsic function expression string.
 * The expression starts with "States." and contains a function call.
 */
export function executeIntrinsic(
  expr: string,
  stateData: any,
  context: ContextObject,
): any {
  const parsed = parseIntrinsicCall(expr.trim());
  return evaluateCall(parsed, stateData, context);
}

// ---------------------------------------------------------------------------
// Parser
// ---------------------------------------------------------------------------

interface IntrinsicCall {
  name: string;
  args: IntrinsicArg[];
}

type IntrinsicArg =
  | { type: 'path'; value: string }
  | { type: 'string'; value: string }
  | { type: 'number'; value: number }
  | { type: 'boolean'; value: boolean }
  | { type: 'call'; value: IntrinsicCall };

function parseIntrinsicCall(expr: string): IntrinsicCall {
  const nameEnd = expr.indexOf('(');
  if (nameEnd === -1) throw new Error(`Invalid intrinsic: ${expr}`);

  const name = expr.slice(0, nameEnd).trim();
  // Find matching closing paren
  let depth = 0;
  let end = nameEnd;
  for (let i = nameEnd; i < expr.length; i++) {
    if (expr[i] === '(') depth++;
    if (expr[i] === ')') depth--;
    if (depth === 0) { end = i; break; }
  }

  const argsStr = expr.slice(nameEnd + 1, end).trim();
  const args = argsStr.length > 0 ? parseArgList(argsStr, 0).args : [];

  return { name, args };
}

function parseArgList(str: string, start: number): { args: IntrinsicArg[]; end: number } {
  const args: IntrinsicArg[] = [];
  let i = start;

  while (i < str.length) {
    // Skip whitespace
    while (i < str.length && str[i] === ' ') i++;
    if (i >= str.length) break;

    const ch = str[i];

    if (ch === "'") {
      // String literal
      const closeQuote = str.indexOf("'", i + 1);
      if (closeQuote === -1) throw new Error(`Unterminated string in intrinsic args`);
      args.push({ type: 'string', value: str.slice(i + 1, closeQuote) });
      i = closeQuote + 1;
    } else if (ch === '$') {
      // JSONPath
      let j = i + 1;
      while (j < str.length && str[j] !== ',' && str[j] !== ')') j++;
      args.push({ type: 'path', value: str.slice(i, j).trim() });
      i = j;
    } else if (ch === 'S' && str.startsWith('States.', i)) {
      // Nested intrinsic call
      const nested = parseIntrinsicCall(str.slice(i));
      // Find where the nested call ends in the original string
      const nestedStr = reconstructCall(nested);
      args.push({ type: 'call', value: nested });
      i += nestedStr.length;
    } else if (ch === 't' && str.startsWith('true', i)) {
      args.push({ type: 'boolean', value: true });
      i += 4;
    } else if (ch === 'f' && str.startsWith('false', i)) {
      args.push({ type: 'boolean', value: false });
      i += 5;
    } else if (ch === '-' || ch === '+' || (ch >= '0' && ch <= '9')) {
      // Number literal
      let j = i;
      if (ch === '-' || ch === '+') j++;
      while (j < str.length && ((str[j] >= '0' && str[j] <= '9') || str[j] === '.')) j++;
      args.push({ type: 'number', value: parseFloat(str.slice(i, j)) });
      i = j;
    } else if (ch === ',') {
      i++; // skip comma
      continue;
    } else {
      i++; // skip unexpected character
      continue;
    }

    // Skip comma after arg
    while (i < str.length && str[i] === ' ') i++;
    if (i < str.length && str[i] === ',') i++;
  }

  return { args, end: i };
}

function reconstructCall(call: IntrinsicCall): string {
  const args = call.args.map(a => {
    switch (a.type) {
      case 'string': return `'${a.value}'`;
      case 'number': return String(a.value);
      case 'boolean': return String(a.value);
      case 'path': return a.value;
      case 'call': return reconstructCall(a.value);
    }
  });
  return `${call.name}(${args.join(', ')})`;
}

// ---------------------------------------------------------------------------
// Evaluator
// ---------------------------------------------------------------------------

function resolveArg(arg: IntrinsicArg, stateData: any, context: ContextObject): any {
  switch (arg.type) {
    case 'string': return arg.value;
    case 'number': return arg.value;
    case 'boolean': return arg.value;
    case 'path': return resolveReference(arg.value, stateData, context);
    case 'call': return evaluateCall(arg.value, stateData, context);
  }
}

function evaluateCall(call: IntrinsicCall, stateData: any, context: ContextObject): any {
  const args = call.args.map(a => resolveArg(a, stateData, context));

  switch (call.name) {
    case 'States.Format': return statesFormat(args);
    case 'States.StringToJson': return JSON.parse(args[0]);
    case 'States.JsonToString': return JSON.stringify(args[0]);
    case 'States.Array': return args;
    case 'States.ArrayPartition': return statesArrayPartition(args[0], args[1]);
    case 'States.ArrayContains': return statesArrayContains(args[0], args[1]);
    case 'States.ArrayRange': return statesArrayRange(args[0], args[1], args[2]);
    case 'States.ArrayGetItem': return args[0][args[1]];
    case 'States.ArrayLength': return args[0].length;
    case 'States.ArrayUnique': return statesArrayUnique(args[0]);
    case 'States.Base64Encode': return base64Encode(args[0]);
    case 'States.Base64Decode': return base64Decode(args[0]);
    case 'States.Hash': return computeHash(args[1], args[0]);
    case 'States.JsonMerge': return { ...args[0], ...args[1] };
    case 'States.MathRandom': return Math.floor(Math.random() * (args[1] - args[0])) + args[0];
    case 'States.MathAdd': return args[0] + args[1];
    case 'States.StringSplit': return args[1] === '' ? [...args[0]] : args[0].split(args[1]);
    case 'States.UUID': return getRandomUUID();
    default:
      throw new Error(`Unknown intrinsic function: ${call.name}`);
  }
}

// ---------------------------------------------------------------------------
// Individual intrinsic implementations
// ---------------------------------------------------------------------------

function statesFormat(args: any[]): string {
  const template = args[0] as string;
  let argIndex = 1;
  return template.replace(/\{}/g, () => {
    const val = args[argIndex++];
    return val === undefined ? '' : String(val);
  });
}

function statesArrayPartition(arr: any[], size: number): any[][] {
  const result: any[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

function statesArrayContains(arr: any[], value: any): boolean {
  return arr.some(item => {
    if (typeof item === 'object' && typeof value === 'object') {
      return JSON.stringify(item) === JSON.stringify(value);
    }
    return item === value;
  });
}

function statesArrayRange(start: number, end: number, step: number): number[] {
  const result: number[] = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}

function statesArrayUnique(arr: any[]): any[] {
  const seen = new Set<string>();
  const result: any[] = [];
  for (const item of arr) {
    const key = typeof item === 'object' ? JSON.stringify(item) : String(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}
