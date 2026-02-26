// Test fixture: Extended task options (comment, inputPath, outputPath, resultSelector)

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const myLambda = Lambda<{ id: string }, { name: string; metadata: any }>(
  'arn:aws:lambda:us-east-1:123:function:MyFunc'
);

export const taskOptionsExtended = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    // Test comment option
    const a = await myLambda.call({ id: input.id }, {
      comment: 'Fetch user by ID',
    });

    // Test inputPath option
    const b = await myLambda.call({ id: input.id }, {
      inputPath: '$.detail',
    });

    // Test outputPath option
    const c = await myLambda.call({ id: input.id }, {
      outputPath: '$.Payload',
    });

    // Test resultSelector option
    const d = await myLambda.call({ id: input.id }, {
      resultSelector: {
        'name.$': '$.Payload.name',
        'statusCode.$': '$.StatusCode',
      },
    });

    return { a: a.name, b: b.name, c: c.name, d: d.name };
  },
);
