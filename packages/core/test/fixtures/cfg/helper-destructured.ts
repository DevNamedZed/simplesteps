import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';

const sendEmail = Lambda<{ userId: string; message: string }, void>('arn:aws:lambda:us-east-1:123:function:SendEmail');
const logAction = Lambda<{ action: string }, void>('arn:aws:lambda:us-east-1:123:function:LogAction');

// Substep with destructured parameter
async function notifyUser({ userId, message }: { userId: string; message: string }) {
  await sendEmail.call({ userId, message });
  await logAction.call({ action: 'notified' });
}

export const helperDestructured = Steps.createFunction(
  async (context: SimpleStepContext, input: { userId: string; message: string }) => {
    await notifyUser({ userId: input.userId, message: input.message });
    return { sent: true };
  },
);
