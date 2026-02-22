// Checkout Processing — SimpleSteps
//
// Multi-service e-commerce checkout: validate cart, process payment,
// create order in DynamoDB, queue for fulfillment, notify customer.

import { Steps, SimpleStepContext, StepException } from '@simplesteps/core/runtime';
import { Lambda } from '@simplesteps/core/runtime/services';
import { DynamoDB } from '@simplesteps/core/runtime/services';
import { SQS } from '@simplesteps/core/runtime/services';
import { SNS } from '@simplesteps/core/runtime/services';

const validateCart = Lambda<
  { cartId: string },
  { valid: boolean; total: number; items: string[] }
>('arn:aws:lambda:us-east-1:123456789:function:ValidateCart');

const processPayment = Lambda<
  { cartId: string; total: number },
  { paymentId: string; status: string }
>('arn:aws:lambda:us-east-1:123456789:function:ProcessPayment');

const ordersTable = new DynamoDB('OrdersTable');
const fulfillmentQueue = new SQS('https://sqs.us-east-1.amazonaws.com/123456789/FulfillmentQueue');
const notificationTopic = new SNS('arn:aws:sns:us-east-1:123456789:OrderNotifications');

export const checkoutProcessing = Steps.createFunction(
  async (context: SimpleStepContext, input: { cartId: string; customerId: string }) => {
    const cart = await validateCart.call({ cartId: input.cartId });

    if (!cart.valid) {
      throw new StepException('Cart validation failed');
    }

    const payment = await processPayment.call({
      cartId: input.cartId,
      total: cart.total,
    });

    if (payment.status !== 'approved') {
      throw new StepException('Payment declined');
    }

    await ordersTable.putItem({
      Item: {
        orderId: { S: input.cartId },
        customerId: { S: input.customerId },
        paymentId: { S: payment.paymentId },
        status: { S: 'CONFIRMED' },
      },
    });

    await fulfillmentQueue.publish({
      orderId: input.cartId,
      items: cart.items,
    });

    await notificationTopic.publish({
      message: 'Your order has been confirmed',
      orderId: input.cartId,
    });

    return {
      orderId: input.cartId,
      paymentId: payment.paymentId,
      status: 'CONFIRMED',
    };
  },
);
