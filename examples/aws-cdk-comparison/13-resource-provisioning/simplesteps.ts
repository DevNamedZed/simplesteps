// Resource Provisioning Orchestrator — CDK + SimpleSteps
//
// Complex multi-team orchestration: validates a provisioning request, creates
// an audit trail in DynamoDB, calls 4 team APIs (networking, security, compute,
// storage) with saga-pattern rollback, runs a health check polling loop, queues
// post-provisioning tasks via SQS, and notifies via SNS.
//
// Same infrastructure as pure CDK — only the step function definition changes.
//
// NOTE: In CDK stacks, service bindings are scoped to the constructor (because
// they reference CDK Token values like `fn.functionArn`). Module-scope async
// helpers (which the compiler can inline) can't reference these bindings.
// For non-CDK usage with module-scope services, individual provisioning steps
// can be extracted into helpers, e.g.:
//
//   async function provisionNetwork(requestId: string, tenantId: string, config: any) {
//     return await networkingApi.call({ action: 'create', requestId, tenantId, config },
//       { retry: { maxAttempts: 2, intervalSeconds: 5, backoffRate: 2 } });
//   }
//
// The compiler supports value-returning helpers: `const network = await provisionNetwork(...);`
// The saga try-catch rollback structure remains in the main function body.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Steps, SimpleStepContext, StepException } from '@simplesteps/core/runtime';
import { Lambda, DynamoDB, SQS, SNS } from '@simplesteps/core/runtime/services';

export class ResourceProvisioningStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ── Infrastructure ──────────────────────────────────────────────────

    // Internal services
    const validateRequestFn = new lambda.Function(this, 'ValidateRequestFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/validate-request'),
    });

    const configureResourcesFn = new lambda.Function(this, 'ConfigureResourcesFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/configure-resources'),
    });

    const healthCheckFn = new lambda.Function(this, 'HealthCheckFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/health-check'),
    });

    // Team APIs — each Lambda proxies to a different team's microservice
    const networkingApiFn = new lambda.Function(this, 'NetworkingApiFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/networking-api'),
    });

    const securityApiFn = new lambda.Function(this, 'SecurityApiFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/security-api'),
    });

    const computeApiFn = new lambda.Function(this, 'ComputeApiFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/compute-api'),
    });

    const storageApiFn = new lambda.Function(this, 'StorageApiFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/storage-api'),
    });

    // Rollback APIs — each team exposes a cleanup/delete endpoint
    const networkingRollbackFn = new lambda.Function(this, 'NetworkingRollbackFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/networking-rollback'),
    });

    const securityRollbackFn = new lambda.Function(this, 'SecurityRollbackFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/security-rollback'),
    });

    const computeRollbackFn = new lambda.Function(this, 'ComputeRollbackFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/compute-rollback'),
    });

    const storageRollbackFn = new lambda.Function(this, 'StorageRollbackFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/storage-rollback'),
    });

    // Data and messaging
    const provisioningTable = new dynamodb.Table(this, 'ProvisioningTable', {
      partitionKey: { name: 'requestId', type: dynamodb.AttributeType.STRING },
    });

    const postProvisioningQueue = new sqs.Queue(this, 'PostProvisioningQueue');
    const alertsTopic = new sns.Topic(this, 'ProvisioningAlerts');

    // ── Service Bindings ─────────────────────────────────────────────────

    const validateRequest = Lambda<
      { requestId: string; tenantId: string; resourceType: string },
      { valid: boolean; requestId: string; tenantId: string; resourceType: string; networkConfig: any; computeConfig: { instanceType: string }; storageConfig: { sizeGb: number; storageType: string } }
    >(validateRequestFn.functionArn);

    const networkingApi = Lambda<
      { action: string; requestId: string; tenantId: string; config: any },
      { networkId: string }
    >(networkingApiFn.functionArn);

    const securityApi = Lambda<
      { action: string; requestId: string; tenantId: string; networkId: string },
      { roleArn: string }
    >(securityApiFn.functionArn);

    const computeApi = Lambda<
      { action: string; requestId: string; tenantId: string; networkId: string; roleArn: string; instanceType: string },
      { instanceId: string }
    >(computeApiFn.functionArn);

    const storageApi = Lambda<
      { action: string; requestId: string; tenantId: string; sizeGb: number; storageType: string },
      { volumeId: string }
    >(storageApiFn.functionArn);

    const configureResources = Lambda<
      { requestId: string; networkId: string; roleArn: string; instanceId: string; volumeId: string },
      { configured: boolean }
    >(configureResourcesFn.functionArn);

    const healthCheck = Lambda<
      { requestId: string; instanceId: string },
      { status: string; attempts: number }
    >(healthCheckFn.functionArn);

    const networkingRollback = Lambda<{ networkId: string }, void>(networkingRollbackFn.functionArn);
    const securityRollback = Lambda<{ roleArn: string }, void>(securityRollbackFn.functionArn);
    const computeRollback = Lambda<{ instanceId: string }, void>(computeRollbackFn.functionArn);
    const storageRollback = Lambda<{ volumeId: string }, void>(storageRollbackFn.functionArn);

    const provisioning = new DynamoDB(provisioningTable.tableName);
    const postProvisioning = new SQS(postProvisioningQueue.queueUrl);
    const alerts = new SNS(alertsTopic.topicArn);

    // ── Step Function Definition ────────────────────────────────────────

    const machine = new SimpleStepsStateMachine(this, 'ResourceProvisioningStateMachine', {
      timeout: cdk.Duration.minutes(30),
      workflow: Steps.createFunction(
        async (
          context: SimpleStepContext,
          input: {
            requestId: string;
            tenantId: string;
            resourceType: string;
            networkConfig: any;
            computeConfig: { instanceType: string };
            storageConfig: { sizeGb: number; storageType: string };
          },
        ) => {
          // Step 1: Validate request
          const validation = await validateRequest.call(input);

          if (!validation.valid) {
            throw new StepException('Request validation failed');
          }

          // Step 2: Create audit record
          await provisioning.putItem({
            Item: {
              requestId: { S: input.requestId },
              tenantId: { S: input.tenantId },
              status: { S: 'PROVISIONING' },
              resourceType: { S: input.resourceType },
            },
          });

          // Step 3: Provision networking (with retry)
          const network = await networkingApi.call(
            {
              action: 'create',
              requestId: input.requestId,
              tenantId: input.tenantId,
              config: input.networkConfig,
            },
            { retry: { maxAttempts: 2, intervalSeconds: 5, backoffRate: 2 } },
          );

          try {
            // Step 4: Create security roles (with retry)
            const security = await securityApi.call(
              {
                action: 'create',
                requestId: input.requestId,
                tenantId: input.tenantId,
                networkId: network.networkId,
              },
              { retry: { maxAttempts: 2, intervalSeconds: 5, backoffRate: 2 } },
            );

            try {
              // Step 5: Provision compute & storage in parallel (with retry)
              const [compute, storage] = await Promise.all([
                computeApi.call(
                  {
                    action: 'create',
                    requestId: input.requestId,
                    tenantId: input.tenantId,
                    networkId: network.networkId,
                    roleArn: security.roleArn,
                    instanceType: input.computeConfig.instanceType,
                  },
                  { retry: { maxAttempts: 3, intervalSeconds: 10, backoffRate: 2 } },
                ),
                storageApi.call(
                  {
                    action: 'create',
                    requestId: input.requestId,
                    tenantId: input.tenantId,
                    sizeGb: input.storageConfig.sizeGb,
                    storageType: input.storageConfig.storageType,
                  },
                  { retry: { maxAttempts: 3, intervalSeconds: 10, backoffRate: 2 } },
                ),
              ]);

              try {
                // Step 6: Configure resources
                await configureResources.call({
                  requestId: input.requestId,
                  networkId: network.networkId,
                  roleArn: security.roleArn,
                  instanceId: compute.instanceId,
                  volumeId: storage.volumeId,
                });

                // Step 7: Health check polling loop
                let health = await healthCheck.call({
                  requestId: input.requestId,
                  instanceId: compute.instanceId,
                });

                while (health.status !== 'HEALTHY' && health.attempts < 5) {
                  await Steps.delay({ seconds: 15 });
                  health = await healthCheck.call({
                    requestId: input.requestId,
                    instanceId: compute.instanceId,
                  });
                }

                if (health.status !== 'HEALTHY') {
                  throw new StepException('Health check failed after max attempts');
                }

                // Step 8: Queue post-provisioning tasks
                await postProvisioning.publish({
                  requestId: input.requestId,
                  tenantId: input.tenantId,
                  instanceId: compute.instanceId,
                  volumeId: storage.volumeId,
                });

                // Step 9: Update status
                await provisioning.updateItem({
                  Key: { requestId: { S: input.requestId } },
                  UpdateExpression: 'SET #s = :status, instanceId = :iid, volumeId = :vid',
                  ExpressionAttributeNames: { '#s': 'status' },
                  ExpressionAttributeValues: {
                    ':status': { S: 'COMPLETED' },
                    ':iid': { S: compute.instanceId },
                    ':vid': { S: storage.volumeId },
                  },
                });

                // Step 10: Notify success
                await alerts.publish({
                  requestId: input.requestId,
                  tenantId: input.tenantId,
                  status: 'COMPLETED',
                });

                return {
                  requestId: input.requestId,
                  instanceId: compute.instanceId,
                  volumeId: storage.volumeId,
                  status: 'COMPLETED',
                };
              } catch (e) {
                // Configuration failed — rollback compute + storage, let outer catches handle the rest
                await computeRollback.call({ instanceId: compute.instanceId });
                await storageRollback.call({ volumeId: storage.volumeId });
                throw new StepException('Configuration failed, resources rolled back');
              }
            } catch (e) {
              // Compute/storage or configuration failed — rollback security, let outer catch handle networking
              await securityRollback.call({ roleArn: security.roleArn });
              throw new StepException('Provisioning failed, security rolled back');
            }
          } catch (e) {
            // Security or downstream failed — rollback networking
            await networkingRollback.call({ networkId: network.networkId });
            throw new StepException('Provisioning failed, networking rolled back');
          }
        },
      ),
    });

    // ── Permissions ─────────────────────────────────────────────────────

    validateRequestFn.grantInvoke(machine);
    configureResourcesFn.grantInvoke(machine);
    healthCheckFn.grantInvoke(machine);
    networkingApiFn.grantInvoke(machine);
    securityApiFn.grantInvoke(machine);
    computeApiFn.grantInvoke(machine);
    storageApiFn.grantInvoke(machine);
    networkingRollbackFn.grantInvoke(machine);
    securityRollbackFn.grantInvoke(machine);
    computeRollbackFn.grantInvoke(machine);
    storageRollbackFn.grantInvoke(machine);
    provisioningTable.grantReadWriteData(machine);
    postProvisioningQueue.grantSendMessages(machine);
    alertsTopic.grantPublish(machine);
  }
}
