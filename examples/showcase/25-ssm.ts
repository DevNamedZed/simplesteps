// SSM Parameter Store
//
// SSM is a stateless service binding — no constructor argument needed.
// The user provides the parameter Name and other options directly in
// the method call.

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { SSM } from '../../packages/core/src/runtime/services/SSM';

const params = new SSM();

export const ssmExample = Steps.createFunction(
  async (context: SimpleStepContext, input: { paramName: string; paramValue: string }) => {
    await params.putParameter({ Name: input.paramName, Value: input.paramValue, Type: 'String' });
    const result = await params.getParameter({ Name: input.paramName });
    return { result };
  },
);
