// Multi-Service (Lambda + DynamoDB + SNS)
//
// Combines three AWS services in one workflow. Lambda validates,
// DynamoDB persists, SNS notifies. The compiler shapes SDK
// parameters automatically — DynamoDB gets TableName + Item,
// SNS gets TopicArn + Message.
//
// ASL output:
//   Invoke_validateFn (Task, Lambda ARN) → Check_valid (Choice)
//     [!valid] → Return_Result (Pass { error }, End)
//     [default] → Invoke_ordersDb (Task, arn:aws:states:::dynamodb:putItem)
//       → Invoke_notifications (Task, arn:aws:states:::sns:publish)
//       → Return_Result_2 (Pass { success }, End)

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';
import { DynamoDB } from '../../packages/core/src/runtime/services/DynamoDB';
import { SNS } from '../../packages/core/src/runtime/services/SNS';

const validateFn = Lambda<{ orderId: string }, { valid: boolean }>('arn:aws:lambda:us-east-1:123:function:ValidateOrder');
const ordersDb = new DynamoDB('OrdersTable');
const notifications = new SNS('arn:aws:sns:us-east-1:123:OrderNotifications');

export const multiServiceWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; amount: number }) => {
    const validation = await validateFn.call({ orderId: input.orderId });
    if (!validation.valid) {
      return { error: 'Invalid order' };
    }
    await ordersDb.putItem({ orderId: input.orderId, amount: input.amount });
    await notifications.publish({ orderId: input.orderId, status: 'confirmed' });
    return { success: true, orderId: input.orderId };
  },
);
