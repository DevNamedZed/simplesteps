// Context Object
//
// Access execution metadata via the context parameter: execution ID,
// state machine name, task token, retry count, etc.

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const auditFn = Lambda<
  { executionId: string; stateMachineName: string; stateName: string },
  { logged: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:AuditLogger');

export const contextExample = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    // Access execution metadata
    await auditFn.call({
      executionId: context.execution.id,
      stateMachineName: context.stateMachine.name,
      stateName: context.state.name,
    });

    return {
      executionId: context.execution.id,
      startTime: context.execution.startTime,
      data: input.data,
    };
  },
);
