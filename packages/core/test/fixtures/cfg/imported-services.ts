import { Lambda } from '../../../src/runtime/services/Lambda';
import { DynamoDB } from '../../../src/runtime/services/DynamoDB';
import { SNS } from '../../../src/runtime/services/SNS';

export const validateFn = Lambda<{ orderId: string }, { valid: boolean }>(
  'arn:aws:lambda:us-east-1:123:function:ValidateOrder',
);

export const ordersDb = new DynamoDB('OrdersTable');

export const notifications = new SNS('arn:aws:sns:us-east-1:123:OrderNotifications');
