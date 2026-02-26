// ---------------------------------------------------------------------------
// ASL data flow pipeline for the local execution runtime.
//
// Every state processes data through: InputPath → Parameters → [execution] →
// ResultSelector → ResultPath → OutputPath. This module implements each step.
// ---------------------------------------------------------------------------

import type { ContextObject } from './types.js';
import { resolvePath, setPath, resolvePayloadTemplate } from './jsonpath.js';

// ---------------------------------------------------------------------------
// InputPath
// ---------------------------------------------------------------------------

/**
 * Apply InputPath to select a subtree of the state input.
 * - undefined / '$': return entire input
 * - null: return {}
 * - '$.field': return stateData.field
 */
export function applyInputPath(stateData: any, inputPath: string | undefined | null): any {
  if (inputPath === undefined || inputPath === '$') return stateData;
  if (inputPath === null) return {};
  return resolvePath(stateData, inputPath);
}

// ---------------------------------------------------------------------------
// Parameters (JSONPath mode)
// ---------------------------------------------------------------------------

/**
 * Apply Parameters to build effective input by resolving '.$' references.
 * JSONPath references resolve against the effectiveInput (post-InputPath).
 * If no Parameters field, returns effectiveInput unchanged.
 */
export function applyParameters(
  effectiveInput: any,
  parameters: Record<string, unknown> | undefined,
  context: ContextObject,
  resolveIntrinsic?: (expr: string, stateData: any, context: ContextObject) => any,
): any {
  if (!parameters) return effectiveInput;
  return resolvePayloadTemplate(parameters, effectiveInput, context, resolveIntrinsic);
}

// ---------------------------------------------------------------------------
// ResultSelector (JSONPath mode)
// ---------------------------------------------------------------------------

/**
 * Apply ResultSelector to reshape the raw result.
 * Same resolution logic as Parameters, but resolves against the result.
 */
export function applyResultSelector(
  result: any,
  resultSelector: Record<string, unknown> | undefined,
  context: ContextObject,
  resolveIntrinsic?: (expr: string, stateData: any, context: ContextObject) => any,
): any {
  if (!resultSelector) return result;
  return resolvePayloadTemplate(resultSelector, result, context, resolveIntrinsic);
}

// ---------------------------------------------------------------------------
// ResultPath
// ---------------------------------------------------------------------------

/**
 * Merge the state result into the original state input.
 *
 * CRITICAL: The originalInput is the state's raw input BEFORE InputPath
 * filtering, NOT the effective input passed to state execution.
 *
 * - undefined / '$': result replaces entire state data
 * - null: result is discarded, state data passes through
 * - '$.field': sets originalInput.field = result
 */
export function applyResultPath(
  originalInput: any,
  resultPath: string | null | undefined,
  result: any,
): any {
  if (resultPath === null) return originalInput;
  if (resultPath === undefined || resultPath === '$') return result;
  return setPath(structuredClone(originalInput), resultPath, result);
}

// ---------------------------------------------------------------------------
// OutputPath
// ---------------------------------------------------------------------------

/**
 * Filter the merged state data to produce the final output.
 * - undefined / '$': entire merged data
 * - null: output is {}
 * - '$.field': output is mergedData.field
 */
export function applyOutputPath(mergedData: any, outputPath: string | undefined | null): any {
  if (outputPath === undefined || outputPath === '$') return mergedData;
  if (outputPath === null) return {};
  return resolvePath(mergedData, outputPath);
}
