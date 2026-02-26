// Test fixture: ECS run task with nested array parameters
//
// Tests that ContainerOverrides with Environment arrays containing
// dynamic values (input references) compile correctly to ASL.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { ECS } from '../../../src/runtime/services/ECS';
import { S3 } from '../../../src/runtime/services/S3';
import { Lambda } from '../../../src/runtime/services/Lambda';

const cluster = new ECS('arn:aws:ecs:us-east-1:123456789:cluster/processing');
const dataBucket = new S3('data-pipeline-bucket');
const notifyFn = Lambda<{ status: string; key: string }, void>(
  'arn:aws:lambda:us-east-1:123456789:function:NotifyComplete',
);

export const ecsPipeline = Steps.createFunction(
  async (context: SimpleStepContext, input: { inputKey: string; outputKey: string }) => {
    const manifest = await dataBucket.getObject({ Key: input.inputKey });

    const result = await cluster.runTask({
      TaskDefinition: 'data-processor',
      LaunchType: 'FARGATE',
      Overrides: {
        ContainerOverrides: [{
          Name: 'processor',
          Environment: [
            { Name: 'INPUT_KEY', Value: input.inputKey },
            { Name: 'OUTPUT_KEY', Value: input.outputKey },
          ],
        }],
      },
    });

    await dataBucket.putObject({
      Key: input.outputKey,
      Body: result,
    });

    await notifyFn.callAsync({ status: 'complete', key: input.outputKey });

    return { inputKey: input.inputKey, outputKey: input.outputKey };
  },
);
