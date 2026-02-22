import { AslSerializer } from '@simplesteps/core/asl/index';
import type { StateMachineDefinition, TaskState, PassState } from '@simplesteps/core/asl/types';

describe('AslSerializer', () => {
  const simpleDef: StateMachineDefinition = {
    StartAt: 'InvokeLambda',
    States: {
      InvokeLambda: {
        Type: 'Task',
        Resource: 'arn:aws:lambda:us-east-1:123:function:MyFn',
        Parameters: { 'id.$': '$.id' },
        ResultPath: '$.result',
        Next: 'Done',
      } as TaskState,
      Done: {
        Type: 'Pass',
        End: true,
      } as PassState,
    },
  };

  describe('serialize', () => {
    it('should serialize a simple state machine to JSON', () => {
      const json = AslSerializer.serialize(simpleDef);
      const parsed = JSON.parse(json);
      expect(parsed.StartAt).toBe('InvokeLambda');
      expect(parsed.States.InvokeLambda.Type).toBe('Task');
      expect(parsed.States.InvokeLambda.Resource).toBe('arn:aws:lambda:us-east-1:123:function:MyFn');
      expect(parsed.States.Done.Type).toBe('Pass');
      expect(parsed.States.Done.End).toBe(true);
    });

    it('should preserve null ResultPath', () => {
      const def: StateMachineDefinition = {
        StartAt: 'Fire',
        States: {
          Fire: {
            Type: 'Task',
            Resource: 'arn:aws:lambda:us-east-1:123:function:Fire',
            ResultPath: null,
            End: true,
          } as TaskState,
        },
      };
      const json = AslSerializer.serialize(def);
      const parsed = JSON.parse(json);
      expect(parsed.States.Fire.ResultPath).toBeNull();
    });

    it('should strip undefined fields', () => {
      const def: StateMachineDefinition = {
        StartAt: 'Pass',
        States: {
          Pass: {
            Type: 'Pass',
            Result: 'hello',
            ResultPath: undefined as any,
            End: true,
          } as PassState,
        },
      };
      const json = AslSerializer.serialize(def);
      const parsed = JSON.parse(json);
      expect(parsed.States.Pass.Result).toBe('hello');
      expect('ResultPath' in parsed.States.Pass).toBe(false);
    });

    it('should use custom indent', () => {
      const json = AslSerializer.serialize(simpleDef, 4);
      expect(json).toContain('    ');
    });

    it('should default to 2-space indent', () => {
      const json = AslSerializer.serialize(simpleDef);
      const lines = json.split('\n');
      // The second line should have 2-space indentation
      expect(lines[1]).toMatch(/^ {2}/);
    });
  });

  describe('serializeToObject', () => {
    it('should return a plain object', () => {
      const obj = AslSerializer.serializeToObject(simpleDef);
      expect(obj.StartAt).toBe('InvokeLambda');
      expect(obj.States.InvokeLambda.Type).toBe('Task');
    });

    it('should strip undefined but preserve null', () => {
      const def: StateMachineDefinition = {
        StartAt: 'S1',
        States: {
          S1: {
            Type: 'Task',
            Resource: 'arn:test',
            ResultPath: null,
            Parameters: undefined as any,
            End: true,
          } as TaskState,
        },
      };
      const obj = AslSerializer.serializeToObject(def);
      expect(obj.States.S1.ResultPath).toBeNull();
      expect('Parameters' in obj.States.S1).toBe(false);
    });
  });
});
