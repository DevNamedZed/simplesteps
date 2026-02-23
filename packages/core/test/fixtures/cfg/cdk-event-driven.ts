// Test fixture: CDK event-driven workflow (Lambda + EventBridge + StepFunction)
//
// Payment processing: enrich → fraud check → emit audit event.
// Uses placeholder values for CDK substitution.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Lambda } from '../../../src/runtime/services/Lambda';
import { EventBridge } from '../../../src/runtime/services/EventBridge';
import { StepFunction } from '../../../src/runtime/services/StepFunction';

const enrichPayment = Lambda<
  { paymentId: string; amount: number },
  { paymentId: string; amount: number; enriched: boolean; risk: string }
>('placeholder-enrich-arn');

const auditEvents = new EventBridge('placeholder-bus-name');

const fraudCheck = new StepFunction<
  { paymentId: string; amount: number },
  { fraudulent: boolean }
>('placeholder-fraud-check-arn');

export const paymentWorkflow = Steps.createFunction(
  async (
    context: SimpleStepContext,
    input: { paymentId: string; amount: number; merchantId: string },
  ) => {
    const enriched = await enrichPayment.call({
      paymentId: input.paymentId,
      amount: input.amount,
    });

    const fraud = await fraudCheck.startExecution({
      paymentId: input.paymentId,
      amount: input.amount,
    });

    if (fraud.fraudulent) {
      await auditEvents.putEvent({
        source: 'payments',
        detailType: 'PaymentBlocked',
        detail: {
          paymentId: input.paymentId,
          reason: 'fraud_detected',
        },
      });
      return { status: 'BLOCKED', paymentId: input.paymentId };
    }

    await auditEvents.putEvent({
      source: 'payments',
      detailType: 'PaymentProcessed',
      detail: {
        paymentId: input.paymentId,
        amount: input.amount,
        risk: enriched.risk,
      },
    });

    return {
      status: 'PROCESSED',
      paymentId: input.paymentId,
      risk: enriched.risk,
    };
  },
);
