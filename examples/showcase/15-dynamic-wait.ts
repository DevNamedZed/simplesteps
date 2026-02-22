// Dynamic Wait (SecondsPath)
//
// Wait a variable number of seconds determined at runtime. When
// Steps.delay receives a jsonpath-resolvable value (from input or
// a prior call's result), the compiler emits SecondsPath instead
// of a fixed Seconds value.
//
// ASL output:
//   Invoke_scheduleFn (Task, ResultPath: $.schedule)
//   → Wait (Wait, SecondsPath: $.schedule.delaySeconds)
//   → Invoke_executeFn (Task)
//   → Return_Result (Pass, End)

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const scheduleFn = Lambda<{ taskId: string }, { delaySeconds: number }>('arn:aws:lambda:us-east-1:123:function:GetSchedule');
const executeFn = Lambda<{ taskId: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:Execute');

export const dynamicWait = Steps.createFunction(
  async (context: SimpleStepContext, input: { taskId: string }) => {
    const schedule = await scheduleFn.call({ taskId: input.taskId });
    Steps.delay({ seconds: schedule.delaySeconds });
    const result = await executeFn.call({ taskId: input.taskId });
    return { result: result.result };
  },
);
