// Object Destructuring — Extract Properties from Service Results
//
// Destructure service call results directly, just like regular TypeScript.
// Each named property becomes a separate variable in the state machine.
//
// Rest patterns (...rest) are supported in JSONata mode — the rest
// element captures all properties not explicitly named, using $sift().

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

const getUserProfile = Lambda<
  { userId: string },
  { name: string; email: string; age: number; city: string; bio: string }
>('arn:aws:lambda:us-east-1:123:function:GetUserProfile');

const sendEmail = Lambda<{ to: string; subject: string; body: string }, void>(
  'arn:aws:lambda:us-east-1:123:function:SendEmail',
);

export const objectDestructuring = Steps.createFunction(
  async (context: SimpleStepContext, input: { userId: string }) => {
    // Named property destructuring — each becomes its own variable
    const { name, email, ...metadata } = await getUserProfile.call({
      userId: input.userId,
    });

    // Use destructured properties directly
    await sendEmail.call({
      to: email,
      subject: `Welcome, ${name}!`,
      body: `Your profile has been created.`,
    });

    // Rest element (metadata) contains { age, city, bio }
    return { name, metadata };
  },
);
