import { Steps, SimpleStepContext } from '../../src/runtime/index';
import { Lambda } from '../../src/runtime/services/Lambda';
import { DynamoDB } from '../../src/runtime/services/DynamoDB';
import { SNS } from '../../src/runtime/services/SNS';

const validateFn = Lambda<{ data: string }, { valid: boolean }>('arn:aws:lambda:us-east-1:123:function:Validate');
const table = new DynamoDB('OrdersTable');
const notificationTopic = new SNS('arn:aws:sns:us-east-1:123:OrderNotifications');

export const multiServiceWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string; orderId: string }) => {
    const validation = await validateFn.call({ data: input.data });

    if (validation.valid) {
      await table.putItem({ Item: { id: input.orderId, data: input.data, status: 'validated' } });
      await notificationTopic.publish({ message: 'Order validated', orderId: input.orderId });
    }

    return { processed: true };
  },
);
