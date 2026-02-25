// Retry, Timeout, and Heartbeat
//
// All service calls accept options for retry policies, execution timeouts,
// and heartbeat intervals. These compile directly to ASL Task state fields.
//
// ASL output:
//   Invoke_longTask (Task,
//     TimeoutSeconds: 300, HeartbeatSeconds: 60,
//     Retry: [{ ErrorEquals: ["States.TaskFailed","States.Timeout"],
//               IntervalSeconds: 5, MaxAttempts: 3, BackoffRate: 2 }],
//     Catch: [{ ErrorEquals: ["States.Timeout"],  Next: timeout handler },
//             { ErrorEquals: ["States.ALL"],       Next: error handler }])
//   → Invoke_alertService (Task, timeout branch) → Return_Result (Pass, End)
//   → Invoke_alertService_2 (Task, error branch) → Return_Result_2 (Pass, End)
//   → Return_Result_3 (Pass, success branch, End)

import { Steps, SimpleStepContext, TimeoutError } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const longTask = Lambda<{ jobId: string }, { status: string }>(
  'arn:aws:lambda:us-east-1:123:function:LongRunningTask',
);
const alertService = Lambda<{ message: string }, void>(
  'arn:aws:lambda:us-east-1:123:function:AlertService',
);

export const retryTimeout = Steps.createFunction(
  async (context: SimpleStepContext, input: { jobId: string }) => {
    try {
      const result = await longTask.call({ jobId: input.jobId }, {
        timeoutSeconds: 300,
        heartbeatSeconds: 60,
        retry: {
          errorEquals: ['States.TaskFailed', 'States.Timeout'],
          intervalSeconds: 5,
          maxAttempts: 3,
          backoffRate: 2,
        },
      });
      return { status: result.status };
    } catch (e) {
      if (e instanceof TimeoutError) {
        await alertService.call({ message: 'Task timed out' });
        return { status: 'timeout' };
      }
      await alertService.call({ message: 'Task failed' });
      return { status: 'error' };
    }
  },
);
