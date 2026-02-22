// Job Poller — SimpleSteps
//
// Submit a job, poll for status in a loop, handle success or failure.

import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda } from '@simplesteps/core/runtime/services';

const submitJob = Lambda<{ jobName: string }, { jobId: string }>(
  'arn:aws:lambda:us-east-1:123456789:function:SubmitJob',
);
const getJobStatus = Lambda<{ jobId: string }, { jobId: string; status: string }>(
  'arn:aws:lambda:us-east-1:123456789:function:GetJobStatus',
);

export const jobPoller = Steps.createFunction(
  async (context: SimpleStepContext, input: { jobName: string }) => {
    const job = await submitJob.call({ jobName: input.jobName });

    let status = await getJobStatus.call({ jobId: job.jobId });

    while (status.status !== 'SUCCEEDED' && status.status !== 'FAILED') {
      await Steps.delay({ seconds: 30 });
      status = await getJobStatus.call({ jobId: job.jobId });
    }

    if (status.status === 'FAILED') {
      throw new Error('Job failed');
    }

    return { jobId: job.jobId, finalStatus: status.status };
  },
);
