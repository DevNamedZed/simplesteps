import { Steps, SimpleStepContext } from '../../../src/runtime/index';

export const contextBasic = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    return {
      executionId: context.execution.id,
      startTime: context.execution.startTime,
      stateName: context.state.name,
      retryCount: context.state.retryCount,
      machineId: context.stateMachine.id,
    };
  },
);

export const contextFull = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    return {
      execName: context.execution.name,
      roleArn: context.execution.roleArn,
      execInput: context.execution.input,
      redriveCount: context.execution.redriveCount,
      redriveStatus: context.execution.redriveStatus,
      enteredTime: context.state.enteredTime,
      machineName: context.stateMachine.name,
    };
  },
);
