// Job Poller — CDK + SimpleSteps
//
// Submit a job, poll for status in a loop, handle success or failure.
// Same infrastructure as pure CDK — only the step function definition changes.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda } from '@simplesteps/core/runtime/services';

export class JobPollerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const submitJobFn = new lambda.Function(this, 'SubmitJobFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/submit-job'),
    });

    const getStatusFn = new lambda.Function(this, 'GetStatusFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/get-status'),
    });

    const submitJob = Lambda<{ jobName: string }, { jobId: string }>(
      submitJobFn.functionArn,
    );
    const getJobStatus = Lambda<{ jobId: string }, { jobId: string; status: string }>(
      getStatusFn.functionArn,
    );

    const machine = new SimpleStepsStateMachine(this, 'JobPollerStateMachine', {
      timeout: cdk.Duration.minutes(30),
      workflow: Steps.createFunction(
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
      ),
    });

    submitJobFn.grantInvoke(machine);
    getStatusFn.grantInvoke(machine);
  }
}
