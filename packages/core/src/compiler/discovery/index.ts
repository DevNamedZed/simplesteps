export { loadIntrinsics } from './intrinsics.js';
export type { IntrinsicsMethods } from './intrinsics.js';

export { findCallSites } from './callSiteLocator.js';
export type { StepFunctionCallSite, StepFunctionFactory, StepFunctionOrigin } from './callSiteLocator.js';

export { createCallGraph, CallGraphNode, CallNodeType } from './callGraph.js';
export type { CallGraphNodeEdge } from './callGraph.js';

export { discoverServices } from './serviceDiscovery.js';
export type {
  ServiceRegistry,
  ServiceBinding,
  ServiceMethodInfo,
  ServiceMethodConfig,
  ServiceIntegration,
} from './serviceDiscovery.js';

export {
  getFunctionDeclarationFromNode,
  getFunctionDeclarationFromSymbol,
  isFunctionLikeDeclarationBase,
  extractNodesBySyntaxKind,
  extractNodes,
  isAssignmentExpression,
  isAssignmentOperator,
  doesNodeCreateNewScope,
} from './utils.js';
