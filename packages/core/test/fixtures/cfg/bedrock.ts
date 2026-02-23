// Test fixture: Bedrock invoke model
//
// Invokes a Bedrock foundation model and returns the response.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Bedrock } from '../../../src/runtime/services/Bedrock';

const model = new Bedrock('anthropic.claude-3-sonnet-20240229-v1:0');

export const bedrockWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { prompt: string }) => {
    const response = await model.invokeModel({
      ContentType: 'application/json',
      Body: {
        prompt: input.prompt,
        max_tokens: 1024,
      },
    });

    return { response };
  },
);
