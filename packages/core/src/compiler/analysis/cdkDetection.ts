// ---------------------------------------------------------------------------
// CDK Expression Detection
//
// Detects CDK construct property accesses (e.g., myLambda.functionArn) that
// resolve to CloudFormation tokens at synth time. Two detection tiers:
//
// Tier 1: Type-based — checks if the expression's type extends known CDK
//         construct interfaces (e.g., IFunction, ITable).
// Tier 2: Pattern-based — matches property names against known CDK patterns
//         (e.g., functionArn, tableName, queueUrl).
// ---------------------------------------------------------------------------

import ts from 'typescript';

// ---------------------------------------------------------------------------
// CDK property patterns (Tier 2)
// ---------------------------------------------------------------------------

/**
 * Property names that are strong indicators of CDK construct resource properties.
 * These resolve to CloudFormation tokens at synth time.
 */
export const CDK_PROPERTY_PATTERNS = new Set([
  // Lambda
  'functionArn', 'functionName',
  // DynamoDB
  'tableName', 'tableArn',
  // SQS
  'queueUrl', 'queueArn', 'queueName',
  // SNS
  'topicArn', 'topicName',
  // S3
  'bucketName', 'bucketArn',
  // Step Functions
  'stateMachineArn', 'stateMachineName',
  // EventBridge
  'eventBusArn', 'eventBusName',
  // Secrets Manager
  'secretArn', 'secretName', 'secretFullArn',
  // SSM Parameter Store
  'parameterArn', 'parameterName',
  // Kinesis
  'streamArn', 'streamName',
  // ECS
  'clusterArn', 'clusterName',
  'serviceArn', 'serviceName',
  'taskDefinitionArn',
  // API Gateway
  'restApiId', 'apiId',
  // IAM
  'roleArn', 'roleName',
  // CloudWatch
  'logGroupArn', 'logGroupName',
]);

// ---------------------------------------------------------------------------
// CDK construct type table (Tier 1)
// ---------------------------------------------------------------------------

/**
 * Maps CDK interface/class names to their known resource properties.
 * Used for type-based detection when CDK types are available.
 */
export const CDK_CONSTRUCT_TYPE_TABLE: ReadonlyArray<{
  readonly typeName: string;
  readonly properties: readonly string[];
}> = [
  { typeName: 'IFunction', properties: ['functionArn', 'functionName'] },
  { typeName: 'ITable', properties: ['tableName', 'tableArn'] },
  { typeName: 'IQueue', properties: ['queueUrl', 'queueArn', 'queueName'] },
  { typeName: 'ITopic', properties: ['topicArn', 'topicName'] },
  { typeName: 'IBucket', properties: ['bucketName', 'bucketArn'] },
  { typeName: 'IStateMachine', properties: ['stateMachineArn', 'stateMachineName'] },
  { typeName: 'IEventBus', properties: ['eventBusArn', 'eventBusName'] },
  { typeName: 'ISecret', properties: ['secretArn', 'secretName', 'secretFullArn'] },
  { typeName: 'IParameter', properties: ['parameterArn', 'parameterName'] },
  { typeName: 'IStream', properties: ['streamArn', 'streamName'] },
  { typeName: 'ICluster', properties: ['clusterArn', 'clusterName'] },
  { typeName: 'IRole', properties: ['roleArn', 'roleName'] },
  { typeName: 'ILogGroup', properties: ['logGroupArn', 'logGroupName'] },
];

// ---------------------------------------------------------------------------
// Detection result
// ---------------------------------------------------------------------------

export interface CdkSynthInfo {
  /** The property name being accessed (e.g., 'functionArn'). */
  readonly propertyName: string;
  /** Whether detection was type-based (high confidence) or pattern-based (medium). */
  readonly tier: 1 | 2;
}

// ---------------------------------------------------------------------------
// Tier 2: Pattern-based detection
// ---------------------------------------------------------------------------

/**
 * Check if an expression is a property access matching known CDK patterns.
 *
 * Matches: `someVar.functionArn`, `someVar.tableName`, etc.
 */
export function isCdkPatternMatch(expr: ts.Expression): CdkSynthInfo | null {
  if (!ts.isPropertyAccessExpression(expr)) return null;
  const propName = expr.name.text;
  if (CDK_PROPERTY_PATTERNS.has(propName)) {
    return { propertyName: propName, tier: 2 };
  }
  return null;
}

// ---------------------------------------------------------------------------
// Tier 1: Type-based detection
// ---------------------------------------------------------------------------

/**
 * Check if an expression's type matches a known CDK construct interface.
 *
 * Uses the TypeChecker to resolve the type of the base expression and
 * walk its base types/interfaces looking for matches in CDK_CONSTRUCT_TYPE_TABLE.
 */
export function isCdkTypeMatch(
  checker: ts.TypeChecker,
  expr: ts.Expression,
): CdkSynthInfo | null {
  if (!ts.isPropertyAccessExpression(expr)) return null;
  const propName = expr.name.text;

  // Get the type of the base expression (e.g., type of `myLambda` in `myLambda.functionArn`)
  const baseType = checker.getTypeAtLocation(expr.expression);
  if (!baseType) return null;

  // Check the type name and its base types against known CDK constructs
  const typeNames = collectTypeNames(checker, baseType);
  for (const entry of CDK_CONSTRUCT_TYPE_TABLE) {
    if (typeNames.has(entry.typeName) && entry.properties.includes(propName)) {
      return { propertyName: propName, tier: 1 };
    }
  }

  return null;
}

/**
 * Collect all type names from a type and its base types/interfaces.
 */
function collectTypeNames(checker: ts.TypeChecker, type: ts.Type): Set<string> {
  const names = new Set<string>();
  const visited = new Set<ts.Type>();

  function walk(t: ts.Type): void {
    if (visited.has(t)) return;
    visited.add(t);

    const symbol = t.getSymbol();
    if (symbol) {
      names.add(symbol.getName());
    }

    // Walk base types
    const baseTypes = t.getBaseTypes?.();
    if (baseTypes) {
      for (const base of baseTypes) {
        walk(base);
      }
    }

    // Walk interfaces for intersection/union types
    if (t.isUnionOrIntersection()) {
      for (const member of t.types) {
        walk(member);
      }
    }

    // Walk apparent type (for interfaces implemented by classes)
    const apparent = checker.getApparentType(t);
    if (apparent !== t) {
      const apparentSymbol = apparent.getSymbol();
      if (apparentSymbol) {
        names.add(apparentSymbol.getName());
      }
    }
  }

  walk(type);
  return names;
}

// ---------------------------------------------------------------------------
// Combined detection
// ---------------------------------------------------------------------------

/**
 * Detect if an expression is a CDK synth-time expression.
 * Tries Tier 1 (type-based) first, falls back to Tier 2 (pattern-based).
 */
export function detectCdkExpression(
  checker: ts.TypeChecker,
  expr: ts.Expression,
): CdkSynthInfo | null {
  // Tier 1: type-based (high confidence)
  const typeMatch = isCdkTypeMatch(checker, expr);
  if (typeMatch) return typeMatch;

  // Tier 2: pattern-based (medium confidence)
  return isCdkPatternMatch(expr);
}
