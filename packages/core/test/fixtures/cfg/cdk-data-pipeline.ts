// Test fixture: CDK data pipeline (S3 + Lambda)
//
// ETL pattern: read from S3, transform via Lambda, write back to S3.
// Uses placeholder values for CDK substitution.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';
import { S3 } from '../../../src/runtime/services/S3';

const transformFn = Lambda<
  { records: string; format: string },
  { transformed: string; count: number }
>('placeholder-transform-arn');

const dataBucket = new S3('placeholder-bucket');

export const dataPipeline = Steps.createFunction(
  async (context: SimpleStepContext, input: { inputKey: string; outputKey: string; format: string }) => {
    const rawData = await dataBucket.getObject({ Key: input.inputKey });

    const result = await transformFn.call({
      records: rawData,
      format: input.format,
    });

    await dataBucket.putObject({
      Key: input.outputKey,
      Body: result.transformed,
    });

    return {
      inputKey: input.inputKey,
      outputKey: input.outputKey,
      recordCount: result.count,
    };
  },
);
