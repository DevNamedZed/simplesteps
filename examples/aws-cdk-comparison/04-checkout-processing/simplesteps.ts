// Checkout Processing — CDK + SimpleSteps
//
// Multi-service e-commerce checkout using Lambda, DynamoDB, SQS, and SNS.
// Same infrastructure as pure CDK — only the step function definition changes.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Steps, SimpleStepContext, StepException } from '@simplesteps/core/runtime';
import { Lambda, DynamoDB, SQS, SNS } from '@simplesteps/core/runtime/services';

export class CheckoutStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const validateCartFn = new lambda.Function(this, 'ValidateCartFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/validate-cart'),
    });

    const processPaymentFn = new lambda.Function(this, 'ProcessPaymentFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/process-payment'),
    });

    const ordersTable = new dynamodb.Table(this, 'OrdersTable', {
      partitionKey: { name: 'orderId', type: dynamodb.AttributeType.STRING },
    });

    const fulfillmentQueue = new sqs.Queue(this, 'FulfillmentQueue');
    const notificationTopic = new sns.Topic(this, 'OrderNotifications');

    const validateCart = Lambda<
      { cartId: string },
      { valid: boolean; total: number; items: string[] }
    >(validateCartFn.functionArn);

    const processPayment = Lambda<
      { cartId: string; total: number },
      { paymentId: string; status: string }
    >(processPaymentFn.functionArn);

    const orders = new DynamoDB(ordersTable.tableName);
    const fulfillment = new SQS(fulfillmentQueue.queueUrl);
    const notifications = new SNS(notificationTopic.topicArn);

    const machine = new SimpleStepsStateMachine(this, 'CheckoutStateMachine', {
      workflow: Steps.createFunction(
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

          await orders.putItem({
            Item: {
              orderId: { S: input.cartId },
              customerId: { S: input.customerId },
              paymentId: { S: payment.paymentId },
              status: { S: 'CONFIRMED' },
            },
          });

          await fulfillment.publish({
            orderId: input.cartId,
            items: cart.items,
          });

          await notifications.publish({
            message: 'Your order has been confirmed',
            orderId: input.cartId,
          });

          return {
            orderId: input.cartId,
            paymentId: payment.paymentId,
            status: 'CONFIRMED',
          };
        },
      ),
    });

    validateCartFn.grantInvoke(machine);
    processPaymentFn.grantInvoke(machine);
    ordersTable.grantWriteData(machine);
    fulfillmentQueue.grantSendMessages(machine);
    notificationTopic.grantPublish(machine);
  }
}
