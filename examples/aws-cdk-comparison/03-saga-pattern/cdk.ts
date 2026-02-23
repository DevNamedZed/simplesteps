// Saga Pattern — AWS CDK
//
// Distributed transaction with compensating actions. Each step has
// an addCatch that triggers rollback of all previously completed steps.
// Based on: https://github.com/aws-samples/step-functions-workflows-collection/tree/main/saga-pattern

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';

export class SagaPatternStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda functions for each action and compensation
    const bookFlightFn = new lambda.Function(this, 'BookFlightFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/book-flight'),
    });

    const bookHotelFn = new lambda.Function(this, 'BookHotelFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/book-hotel'),
    });

    const chargeCardFn = new lambda.Function(this, 'ChargeCardFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/charge-card'),
    });

    const cancelFlightFn = new lambda.Function(this, 'CancelFlightFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/cancel-flight'),
    });

    const cancelHotelFn = new lambda.Function(this, 'CancelHotelFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/cancel-hotel'),
    });

    const refundCardFn = new lambda.Function(this, 'RefundCardFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/refund-card'),
    });

    // Define task states
    const bookFlight = new tasks.LambdaInvoke(this, 'Book Flight', {
      lambdaFunction: bookFlightFn,
      outputPath: '$.Payload',
    });

    const bookHotel = new tasks.LambdaInvoke(this, 'Book Hotel', {
      lambdaFunction: bookHotelFn,
      outputPath: '$.Payload',
    });

    const chargeCard = new tasks.LambdaInvoke(this, 'Charge Card', {
      lambdaFunction: chargeCardFn,
      outputPath: '$.Payload',
    });

    const cancelFlight = new tasks.LambdaInvoke(this, 'Cancel Flight', {
      lambdaFunction: cancelFlightFn,
      outputPath: '$.Payload',
    });

    const cancelHotel = new tasks.LambdaInvoke(this, 'Cancel Hotel', {
      lambdaFunction: cancelHotelFn,
      outputPath: '$.Payload',
    });

    const refundCard = new tasks.LambdaInvoke(this, 'Refund Card', {
      lambdaFunction: refundCardFn,
      outputPath: '$.Payload',
    });

    // Define failure state
    const bookingFailed = new sfn.Fail(this, 'Booking Failed', {
      error: 'BookingError',
      cause: 'One or more booking steps failed',
    });

    // Wire compensation chains:
    // If chargeCard fails → cancel hotel → cancel flight → fail
    chargeCard.addCatch(
      cancelHotel.next(cancelFlight).next(bookingFailed),
      { resultPath: '$.error' },
    );

    // If bookHotel fails → cancel flight → fail
    bookHotel.addCatch(
      cancelFlight.next(bookingFailed),
      { resultPath: '$.error' },
    );

    // If bookFlight fails → fail directly
    bookFlight.addCatch(bookingFailed, { resultPath: '$.error' });

    // Main flow
    const definition = bookFlight
      .next(bookHotel)
      .next(chargeCard)
      .next(new sfn.Succeed(this, 'Booking Confirmed'));

    // Create the state machine
    const stateMachine = new sfn.StateMachine(this, 'SagaStateMachine', {
      definitionBody: sfn.DefinitionBody.fromChainable(definition),
    });

    // Grant permissions (every Lambda needs invoke access)
    bookFlightFn.grantInvoke(stateMachine);
    bookHotelFn.grantInvoke(stateMachine);
    chargeCardFn.grantInvoke(stateMachine);
    cancelFlightFn.grantInvoke(stateMachine);
    cancelHotelFn.grantInvoke(stateMachine);
    refundCardFn.grantInvoke(stateMachine);
  }
}
