// Saga Pattern — CDK + SimpleSteps
//
// Distributed transaction with compensating actions: if any step fails,
// previous steps are automatically rolled back via nested try/catch.
// Same infrastructure as pure CDK — only the step function definition changes.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Steps, SimpleStepContext, StepException } from '@simplesteps/core/runtime';
import { Lambda } from '@simplesteps/core/runtime/services';

export class SagaPatternStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

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

    const bookFlight = Lambda<{ tripId: string; destination: string }, { flightId: string }>(
      bookFlightFn.functionArn,
    );
    const bookHotel = Lambda<{ tripId: string; destination: string }, { hotelId: string }>(
      bookHotelFn.functionArn,
    );
    const chargeCard = Lambda<{ tripId: string; amount: number }, { chargeId: string }>(
      chargeCardFn.functionArn,
    );
    const cancelFlight = Lambda<{ flightId: string }, { cancelled: boolean }>(
      cancelFlightFn.functionArn,
    );
    const cancelHotel = Lambda<{ hotelId: string }, { cancelled: boolean }>(
      cancelHotelFn.functionArn,
    );

    const machine = new SimpleStepsStateMachine(this, 'SagaStateMachine', {
      workflow: Steps.createFunction(
        async (context: SimpleStepContext, input: { tripId: string; destination: string; amount: number }) => {
          const flight = await bookFlight.call({
            tripId: input.tripId,
            destination: input.destination,
          });

          try {
            const hotel = await bookHotel.call({
              tripId: input.tripId,
              destination: input.destination,
            });

            try {
              const charge = await chargeCard.call({
                tripId: input.tripId,
                amount: input.amount,
              });

              return {
                tripId: input.tripId,
                flightId: flight.flightId,
                hotelId: hotel.hotelId,
                chargeId: charge.chargeId,
                status: 'CONFIRMED',
              };
            } catch (e) {
              await cancelHotel.call({ hotelId: hotel.hotelId });
              await cancelFlight.call({ flightId: flight.flightId });
              throw new StepException('Payment failed, bookings cancelled');
            }
          } catch (e) {
            await cancelFlight.call({ flightId: flight.flightId });
            throw new StepException('Hotel booking failed, flight cancelled');
          }
        },
      ),
    });

    bookFlightFn.grantInvoke(machine);
    bookHotelFn.grantInvoke(machine);
    chargeCardFn.grantInvoke(machine);
    cancelFlightFn.grantInvoke(machine);
    cancelHotelFn.grantInvoke(machine);
    refundCardFn.grantInvoke(machine);
  }
}
