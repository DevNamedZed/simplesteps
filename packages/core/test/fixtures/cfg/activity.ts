// Test fixture: Activity task binding

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Activity } from '../../../src/runtime/services/Activity';

const reviewTask = Activity<{ document: string }, { approved: boolean }>(
  'arn:aws:states:us-east-1:123456789012:activity:HumanReview'
);

export const activityTest = Steps.createFunction(
  async (context: SimpleStepContext, input: { document: string }) => {
    const result = await reviewTask.call(
      { document: input.document },
      { timeoutSeconds: 3600, heartbeatSeconds: 60 },
    );

    return { approved: result.approved };
  },
);
