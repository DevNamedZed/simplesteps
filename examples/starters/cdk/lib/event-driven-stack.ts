import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { Lambda, EventBridge, StepFunction } from '@simplesteps/core/runtime/services';

export class EventDrivenStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Infrastructure
    const enrichFn = new lambda.Function(this, 'EnrichPayment', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(
        'exports.handler = async (e) => ({ ...e, enriched: true, risk: "low" })',
      ),
    });

    const auditBus = new events.EventBus(this, 'AuditBus');

    // A child state machine for fraud checks (could be another SimpleSteps workflow)
    const fraudCheckMachine = new sfn.StateMachine(this, 'FraudCheck', {
      definitionBody: sfn.DefinitionBody.fromString(JSON.stringify({
        StartAt: 'Check',
        States: {
          Check: {
            Type: 'Pass',
            Result: { fraudulent: false },
            End: true,
          },
        },
      })),
    });

    // Service bindings
    const enrichPayment = Lambda<
      { paymentId: string; amount: number },
      { paymentId: string; amount: number; enriched: boolean; risk: string }
    >(enrichFn.functionArn);

    const auditEvents = new EventBridge(auditBus.eventBusName);

    const fraudCheck = new StepFunction<
      { paymentId: string; amount: number },
      { fraudulent: boolean }
    >(fraudCheckMachine.stateMachineArn);

    // Inline workflow: enrich → fraud check → emit audit event
    const machine = new SimpleStepsStateMachine(this, 'PaymentWorkflow', {
      workflow: Steps.createFunction(
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
      ),
    });

    // Permissions
    enrichFn.grantInvoke(machine);
    auditBus.grantPutEventsTo(machine);
    fraudCheckMachine.grantStartSyncExecution(machine);
  }
}
