// Test fixture: Steps.awsSdk() generic escape hatch

import { Steps, SimpleStepContext } from '../../../src/runtime/index';

export const awsSdkTest = Steps.createFunction(
  async (context: SimpleStepContext, input: { bucket: string; key: string }) => {
    const result = await Steps.awsSdk<{ Bucket: string; Key: string }, { Body: string }>(
      'S3',
      'getObject',
      { Bucket: input.bucket, Key: input.key },
    );

    await Steps.awsSdk(
      'SNS',
      'publish',
      { TopicArn: 'arn:aws:sns:us-east-1:123:MyTopic', Message: 'done' },
    );

    return { body: result.Body };
  },
);
