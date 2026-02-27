// ---------------------------------------------------------------------------
// JSONPath resolution for the local execution runtime.
//
// The SimpleSteps compiler generates only simple JSONPath patterns.
// This module does NOT implement the full JSONPath spec — only the subset
// that appears in compiled ASL output.
// ---------------------------------------------------------------------------

import type { ContextObject } from './types.js';

// ---------------------------------------------------------------------------
// Path parsing
// ---------------------------------------------------------------------------

/**
 * Parse a JSONPath expression into segments.
 * '$.a.b[0].c' → ['a', 'b', 0, 'c']
 */
export function parsePath(path: string): (string | number)[] {
  const normalized = path.startsWith('$$.')
    ? path.slice(3)
    : path.startsWith('$.')
      ? path.slice(2)
      : path === '$' || path === '$$'
        ? ''
        : path;

  if (normalized === '') return [];

  const segments: (string | number)[] = [];
  const re = /(\w+)|\[(\d+)\]/g;
  let match;
  while ((match = re.exec(normalized)) !== null) {
    if (match[1] !== undefined) segments.push(match[1]);
    if (match[2] !== undefined) segments.push(parseInt(match[2], 10));
  }
  return segments;
}

// ---------------------------------------------------------------------------
// Path get
// ---------------------------------------------------------------------------

/**
 * Resolve a JSONPath expression against data.
 * Returns `undefined` for missing paths.
 */
export function resolvePath(data: any, path: string): any {
  if (path === '$') return data;

  const segments = parsePath(path);
  let current = data;

  for (const segment of segments) {
    if (current === null || current === undefined) return undefined;
    current = current[segment];
  }

  return current;
}

/**
 * Resolve a path that may be rooted in state data ($) or context ($$).
 */
export function resolveReference(
  path: string,
  stateData: any,
  context: ContextObject,
): any {
  if (path.startsWith('$$')) {
    return resolvePath(context, path.replace(/^\$\$/, '$'));
  }
  return resolvePath(stateData, path);
}

// ---------------------------------------------------------------------------
// Path set
// ---------------------------------------------------------------------------

/**
 * Set a value at a JSONPath location in data.
 * Creates intermediate objects/arrays as needed.
 * Returns the modified data (may be a new root if path is '$').
 */
export function setPath(data: any, path: string, value: any): any {
  if (path === '$') return value;

  const segments = parsePath(path);
  let current = data;

  for (let i = 0; i < segments.length - 1; i++) {
    const seg = segments[i];
    if (current[seg] === undefined || current[seg] === null) {
      const nextSeg = segments[i + 1];
      current[seg] = typeof nextSeg === 'number' ? [] : {};
    }
    current = current[seg];
  }

  const lastSeg = segments[segments.length - 1];
  current[lastSeg] = value;
  return data;
}

// ---------------------------------------------------------------------------
// Payload template resolution (JSONPath mode)
// ---------------------------------------------------------------------------

/**
 * Resolve a payload template object. Keys ending in '.$' are JSONPath
 * references or intrinsic function calls. All other keys are literals.
 */
export function resolvePayloadTemplate(
  template: Record<string, unknown>,
  stateData: any,
  context: ContextObject,
  resolveIntrinsic?: (expr: string, stateData: any, context: ContextObject) => any,
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(template)) {
    if (key.endsWith('.$')) {
      const outputKey = key.slice(0, -2);
      const expr = value as string;

      if (expr.startsWith('States.')) {
        // Intrinsic function call
        result[outputKey] = resolveIntrinsic
          ? resolveIntrinsic(expr, stateData, context)
          : expr; // fallback: return raw string if no intrinsic resolver
      } else {
        // JSONPath reference
        result[outputKey] = resolveReference(expr, stateData, context);
      }
    } else if (Array.isArray(value)) {
      // Array — recurse into each element
      result[key] = value.map((item: any) => {
        if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
          return resolvePayloadTemplate(item as Record<string, unknown>, stateData, context, resolveIntrinsic);
        }
        return item;
      });
    } else if (value !== null && typeof value === 'object') {
      // Nested object — recurse
      result[key] = resolvePayloadTemplate(
        value as Record<string, unknown>,
        stateData,
        context,
        resolveIntrinsic,
      );
    } else {
      // Literal value
      result[key] = value;
    }
  }

  return result;
}
