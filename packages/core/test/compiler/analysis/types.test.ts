import { StepVariableType } from '@simplesteps/core/compiler/analysis/types';
import type {
  VariableInfo,
  VariableScope,
  VariableEnvironment,
} from '@simplesteps/core/compiler/analysis/types';

describe('Analysis types', () => {
  describe('StepVariableType enum', () => {
    it('should have all expected values', () => {
      expect(StepVariableType.Input).toBe('Input');
      expect(StepVariableType.Context).toBe('Context');
      expect(StepVariableType.External).toBe('External');
      expect(StepVariableType.StateOutput).toBe('StateOutput');
      expect(StepVariableType.Constant).toBe('Constant');
      expect(StepVariableType.Derived).toBe('Derived');
    });

    it('should have exactly 6 values', () => {
      const values = Object.values(StepVariableType);
      expect(values).toHaveLength(6);
    });
  });

  describe('VariableInfo interface', () => {
    it('should construct a minimal VariableInfo', () => {
      const info: VariableInfo = {
        symbol: {} as any,
        type: StepVariableType.Input,
        definitelyAssigned: true,
        constant: false,
      };
      expect(info.type).toBe(StepVariableType.Input);
      expect(info.definitelyAssigned).toBe(true);
      expect(info.jsonPath).toBeUndefined();
      expect(info.literalValue).toBeUndefined();
      expect(info.serviceBinding).toBeUndefined();
    });

    it('should construct a fully-specified VariableInfo', () => {
      const info: VariableInfo = {
        symbol: {} as any,
        type: StepVariableType.External,
        jsonPath: '$.services.dynamodb',
        definitelyAssigned: true,
        constant: true,
        literalValue: 'OrdersTable',
        serviceBinding: 'DynamoDB',
      };
      expect(info.serviceBinding).toBe('DynamoDB');
      expect(info.constant).toBe(true);
    });
  });

  describe('VariableScope interface', () => {
    it('should construct a scope with no parent', () => {
      const scope: VariableScope = {
        variables: new Map(),
      };
      expect(scope.parent).toBeUndefined();
      expect(scope.variables.size).toBe(0);
    });

    it('should construct a scope with a parent', () => {
      const parent: VariableScope = { variables: new Map() };
      const child: VariableScope = { variables: new Map(), parent };
      expect(child.parent).toBe(parent);
    });
  });

  describe('VariableEnvironment interface', () => {
    it('should construct an environment', () => {
      const scope: VariableScope = { variables: new Map() };
      const env: VariableEnvironment = {
        scopes: [scope],
        currentScope: scope,
      };
      expect(env.scopes).toHaveLength(1);
      expect(env.currentScope).toBe(scope);
    });
  });
});
