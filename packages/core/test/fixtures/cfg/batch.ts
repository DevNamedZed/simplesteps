// Test fixture: AWS Batch submit job
//
// Submits a batch job synchronously and returns the result.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Batch } from '../../../src/runtime/services/Batch';

const queue = new Batch('arn:aws:batch:us-east-1:123456789:job-queue/my-queue');

export const batchWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { jobName: string; jobDefinition: string }) => {
    const result = await queue.submitJob({
      JobName: input.jobName,
      JobDefinition: input.jobDefinition,
    });

    return { jobResult: result };
  },
);
