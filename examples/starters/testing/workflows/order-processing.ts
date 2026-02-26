import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda } from '@simplesteps/core/runtime/services';

// Service declarations — these become Task state resource ARNs in ASL
const validateOrder = Lambda<
  { orderId: string; total: number },
  { valid: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:ValidateOrder');

const chargePayment = Lambda<
  { orderId: string; total: number },
  { chargeId: string }
>('arn:aws:lambda:us-east-1:123456789:function:ChargePayment');

const sendConfirmation = Lambda<
  { orderId: string },
  { sent: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:SendConfirmation');

const sendRejection = Lambda<
  { orderId: string },
  { sent: boolean }
>('arn:aws:lambda:us-east-1:123456789:function:SendRejection');

/**
 * Order processing workflow:
 * 1. Validate the order
 * 2. If valid → charge payment → send confirmation
 * 3. If invalid → send rejection notice
 *
 * ChargePayment has a try/catch to handle transient failures.
 */
export const orderProcessing = Steps.createFunction(
  async (context: SimpleStepContext, input: { orderId: string; total: number }) => {
    const validation = await validateOrder.call({
      orderId: input.orderId,
      total: input.total,
    });

    if (validation.valid) {
      try {
        const charge = await chargePayment.call({
          orderId: input.orderId,
          total: input.total,
        });

        const confirmation = await sendConfirmation.call({
          orderId: input.orderId,
        });

        return {
          status: 'completed',
          orderId: input.orderId,
          confirmed: confirmation.sent,
        };
      } catch (e) {
        return { status: 'payment_failed', orderId: input.orderId };
      }
    } else {
      await sendRejection.call({
        orderId: input.orderId,
      });

      return {
        status: 'rejected',
        orderId: input.orderId,
      };
    }
  },
);
