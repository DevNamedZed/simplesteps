// Test fixture: ECS run task
//
// Runs an ECS task synchronously, waits for completion, and returns the result.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { ECS } from '../../../src/runtime/services/ECS';

const cluster = new ECS('arn:aws:ecs:us-east-1:123456789:cluster/my-cluster');

export const ecsWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { taskDefinition: string }) => {
    const result = await cluster.runTask({
      TaskDefinition: input.taskDefinition,
      LaunchType: 'FARGATE',
    });

    return { taskResult: result };
  },
);
