// Activity Task
//
// Activity tasks use external workers that poll for work, process it, and
// send back results. The activity ARN is used directly as the Task Resource.

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Activity } from '../../packages/core/src/runtime/services/Activity';

const humanReview = Activity<{ document: string }, { approved: boolean }>(
  'arn:aws:states:us-east-1:123456789012:activity:HumanReview'
);

export const activityWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { document: string }) => {
    const result = await humanReview.call(
      { document: input.document },
      { timeoutSeconds: 3600, heartbeatSeconds: 60 },
    );

    if (!result.approved) {
      throw new Error('Document rejected');
    }

    return { status: 'approved' };
  },
);
