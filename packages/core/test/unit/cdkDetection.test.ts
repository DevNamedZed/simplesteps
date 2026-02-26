import ts from 'typescript';
import {
  CDK_PROPERTY_PATTERNS,
  CDK_CONSTRUCT_TYPE_TABLE,
  CdkSynthInfo,
  isCdkPatternMatch,
} from '../../src/compiler/analysis/cdkDetection';

describe('CDK Detection', () => {
  // -----------------------------------------------------------------------
  // CDK_PROPERTY_PATTERNS
  // -----------------------------------------------------------------------

  describe('CDK_PROPERTY_PATTERNS', () => {
    it('contains expected CDK property names', () => {
      expect(CDK_PROPERTY_PATTERNS.has('functionArn')).toBe(true);
      expect(CDK_PROPERTY_PATTERNS.has('tableName')).toBe(true);
      expect(CDK_PROPERTY_PATTERNS.has('queueUrl')).toBe(true);
      expect(CDK_PROPERTY_PATTERNS.has('topicArn')).toBe(true);
      expect(CDK_PROPERTY_PATTERNS.has('bucketName')).toBe(true);
    });

    it('does NOT contain non-CDK property names', () => {
      expect(CDK_PROPERTY_PATTERNS.has('toString')).toBe(false);
      expect(CDK_PROPERTY_PATTERNS.has('length')).toBe(false);
      expect(CDK_PROPERTY_PATTERNS.has('constructor')).toBe(false);
    });
  });

  // -----------------------------------------------------------------------
  // CDK_CONSTRUCT_TYPE_TABLE
  // -----------------------------------------------------------------------

  describe('CDK_CONSTRUCT_TYPE_TABLE', () => {
    it('has entries for IFunction, ITable, and IQueue', () => {
      const typeNames = CDK_CONSTRUCT_TYPE_TABLE.map((e) => e.typeName);
      expect(typeNames).toContain('IFunction');
      expect(typeNames).toContain('ITable');
      expect(typeNames).toContain('IQueue');
    });
  });

  // -----------------------------------------------------------------------
  // isCdkPatternMatch
  // -----------------------------------------------------------------------

  describe('isCdkPatternMatch', () => {
    it('returns null for non-PropertyAccessExpression nodes', () => {
      const identifier = ts.factory.createIdentifier('foo');
      const result = isCdkPatternMatch(identifier);
      expect(result).toBeNull();
    });

    it('returns CdkSynthInfo with tier 2 for a CDK property pattern match', () => {
      const expr = ts.factory.createPropertyAccessExpression(
        ts.factory.createIdentifier('myLambda'),
        ts.factory.createIdentifier('functionArn'),
      );
      const result = isCdkPatternMatch(expr);
      expect(result).not.toBeNull();
      expect(result!.propertyName).toBe('functionArn');
      expect(result!.tier).toBe(2);
    });

    it('returns null for non-CDK property names', () => {
      const expr = ts.factory.createPropertyAccessExpression(
        ts.factory.createIdentifier('obj'),
        ts.factory.createIdentifier('toString'),
      );
      const result = isCdkPatternMatch(expr);
      expect(result).toBeNull();
    });
  });
});
