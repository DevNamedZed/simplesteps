// Saga Pattern — SimpleSteps
//
// Distributed transaction with compensating actions: if any step fails,
// previous steps are automatically rolled back via nested try/catch.
// When installed via npm, use: import { Steps } from '@simplesteps/core/runtime'

import { Steps, SimpleStepContext, StepException } from '../../../packages/core/src/runtime/index';
import { Lambda } from '../../../packages/core/src/runtime/services/Lambda';

const bookFlightFn = Lambda<
  { tripId: string; destination: string },
  { flightId: string }
>('arn:aws:lambda:us-east-1:123456789:function:BookFlight');

const bookHotelFn = Lambda<
  { tripId: string; destination: string },
  { hotelId: string }
>('arn:aws:lambda:us-east-1:123456789:function:BookHotel');

const chargeCardFn = Lambda<
  { tripId: string; amount: number },
  { chargeId: string }
>('arn:aws:lambda:us-east-1:123456789:function:ChargeCard');

const cancelFlightFn = Lambda<{ flightId: string }, { cancelled: boolean }>(
  'arn:aws:lambda:us-east-1:123456789:function:CancelFlight',
);

const cancelHotelFn = Lambda<{ hotelId: string }, { cancelled: boolean }>(
  'arn:aws:lambda:us-east-1:123456789:function:CancelHotel',
);

const refundCardFn = Lambda<{ chargeId: string }, { refunded: boolean }>(
  'arn:aws:lambda:us-east-1:123456789:function:RefundCard',
);

export const sagaPattern = Steps.createFunction(
  async (context: SimpleStepContext, input: { tripId: string; destination: string; amount: number }) => {
    const flight = await bookFlightFn.call({
      tripId: input.tripId,
      destination: input.destination,
    });

    try {
      const hotel = await bookHotelFn.call({
        tripId: input.tripId,
        destination: input.destination,
      });

      try {
        const charge = await chargeCardFn.call({
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
        await cancelHotelFn.call({ hotelId: hotel.hotelId });
        await cancelFlightFn.call({ flightId: flight.flightId });
        throw new StepException('Payment failed, bookings cancelled');
      }
    } catch (e) {
      await cancelFlightFn.call({ flightId: flight.flightId });
      throw new StepException('Hotel booking failed, flight cancelled');
    }
  },
);
