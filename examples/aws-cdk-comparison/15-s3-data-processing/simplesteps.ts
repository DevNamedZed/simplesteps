// S3 Data Processing — SimpleSteps
//
// Read data from S3, transform with Lambda, write results back, verify.
// When installed via npm, use: import { Steps } from '@simplesteps/core/runtime'

import { Steps, SimpleStepContext } from '../../../packages/core/src/runtime/index';
import { Lambda } from '../../../packages/core/src/runtime/services/Lambda';
import { S3 } from '../../../packages/core/src/runtime/services/S3';

const transformData = Lambda<
  { data: string },
  { result: string }
>('arn:aws:lambda:us-east-1:123456789:function:TransformData');

const dataBucket = new S3('my-data-bucket');

export const s3DataProcessing = Steps.createFunction(
  async (context: SimpleStepContext, input: { inputKey: string; outputKey: string }) => {
    const source = await dataBucket.getObject({ Key: input.inputKey });

    const transformed = await transformData.call({ data: source.Body });

    await dataBucket.putObject({
      Key: input.outputKey,
      Body: transformed.result,
      ContentType: 'application/json',
    });

    const metadata = await dataBucket.headObject({ Key: input.outputKey });

    return {
      inputKey: input.inputKey,
      outputKey: input.outputKey,
      size: metadata.ContentLength,
    };
  },
);
