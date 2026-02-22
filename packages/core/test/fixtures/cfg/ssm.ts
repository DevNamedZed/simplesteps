// Test fixture: SSM Parameter Store (stateless service binding)

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { SSM } from '../../../src/runtime/services/SSM';

const params = new SSM();

export const ssmTest = Steps.createFunction(
  async (context: SimpleStepContext, input: { paramName: string }) => {
    const result = await params.getParameter({ Name: input.paramName });
    return { result };
  },
);
