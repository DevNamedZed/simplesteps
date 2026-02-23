// Resource Provisioning Orchestrator — AWS CDK
//
// Complex multi-team orchestration: validates a provisioning request, creates
// an audit trail in DynamoDB, calls 4 team APIs (networking, security, compute,
// storage) with saga-pattern rollback, runs a health check polling loop, queues
// post-provisioning tasks via SQS, and notifies via SNS.
//
// This is the kind of workflow that exists in real control planes — coordinating
// resource lifecycle across multiple microservices owned by different teams.

import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';

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

    // ── Step Function Definition ────────────────────────────────────────

    // Step 1: Validate request
    const validateRequest = new tasks.LambdaInvoke(this, 'Validate Request', {
      lambdaFunction: validateRequestFn,
      outputPath: '$.Payload',
    });

    const validationFailed = new sfn.Fail(this, 'Validation Failed', {
      error: 'ValidationError',
      cause: 'Request validation failed',
    });

    const checkValid = new sfn.Choice(this, 'Request Valid?')
      .when(sfn.Condition.booleanEquals('$.valid', false), validationFailed)
      .otherwise(new sfn.Pass(this, 'Validation Passed'));

    // Step 2: Create audit record in DynamoDB (requires CustomState)
    const createAuditRecord = new sfn.CustomState(this, 'Create Audit Record', {
      stateJson: {
        Type: 'Task',
        Resource: 'arn:aws:states:::dynamodb:putItem',
        Parameters: {
          TableName: provisioningTable.tableName,
          Item: {
            'requestId': { 'S.$': '$.requestId' },
            'tenantId': { 'S.$': '$.tenantId' },
            'status': { 'S': 'PROVISIONING' },
            'resourceType': { 'S.$': '$.resourceType' },
          },
        },
        ResultPath: null,
      },
    });

    // Step 3: Provision networking
    const provisionNetworking = new tasks.LambdaInvoke(this, 'Provision Networking', {
      lambdaFunction: networkingApiFn,
      payload: sfn.TaskInput.fromObject({
        'action': 'create',
        'requestId.$': '$.requestId',
        'tenantId.$': '$.tenantId',
        'config.$': '$.networkConfig',
      }),
      outputPath: '$.Payload',
      resultPath: '$.networking',
    });

    provisionNetworking.addRetry({
      errors: ['States.TaskFailed'],
      interval: cdk.Duration.seconds(5),
      maxAttempts: 2,
      backoffRate: 2,
    });

    // Step 4: Create IAM roles
    const createSecurityRoles = new tasks.LambdaInvoke(this, 'Create Security Roles', {
      lambdaFunction: securityApiFn,
      payload: sfn.TaskInput.fromObject({
        'action': 'create',
        'requestId.$': '$.requestId',
        'tenantId.$': '$.tenantId',
        'networkId.$': '$.networking.networkId',
      }),
      outputPath: '$.Payload',
      resultPath: '$.security',
    });

    createSecurityRoles.addRetry({
      errors: ['States.TaskFailed'],
      interval: cdk.Duration.seconds(5),
      maxAttempts: 2,
      backoffRate: 2,
    });

    // Rollback: networking only (if security fails)
    const rollbackNetworkingOnly = new tasks.LambdaInvoke(this, 'Rollback Networking (Security Failed)', {
      lambdaFunction: networkingRollbackFn,
      payload: sfn.TaskInput.fromObject({
        'networkId.$': '$.networking.networkId',
      }),
      resultPath: sfn.JsonPath.DISCARD,
    });

    const securityFailed = new sfn.Fail(this, 'Security Provisioning Failed', {
      error: 'SecurityProvisioningError',
      cause: 'Failed to create security roles',
    });

    createSecurityRoles.addCatch(
      rollbackNetworkingOnly.next(securityFailed),
      { resultPath: '$.error' },
    );

    // Step 5: Parallel — provision compute and storage
    const parallelProvisioning = new sfn.Parallel(this, 'Provision Compute & Storage');

    const provisionCompute = new tasks.LambdaInvoke(this, 'Provision Compute', {
      lambdaFunction: computeApiFn,
      payload: sfn.TaskInput.fromObject({
        'action': 'create',
        'requestId.$': '$.requestId',
        'tenantId.$': '$.tenantId',
        'networkId.$': '$.networking.networkId',
        'roleArn.$': '$.security.roleArn',
        'instanceType.$': '$.computeConfig.instanceType',
      }),
      outputPath: '$.Payload',
    });

    provisionCompute.addRetry({
      errors: ['States.TaskFailed'],
      interval: cdk.Duration.seconds(10),
      maxAttempts: 3,
      backoffRate: 2,
    });

    const provisionStorage = new tasks.LambdaInvoke(this, 'Provision Storage', {
      lambdaFunction: storageApiFn,
      payload: sfn.TaskInput.fromObject({
        'action': 'create',
        'requestId.$': '$.requestId',
        'tenantId.$': '$.tenantId',
        'sizeGb.$': '$.storageConfig.sizeGb',
        'storageType.$': '$.storageConfig.storageType',
      }),
      outputPath: '$.Payload',
    });

    provisionStorage.addRetry({
      errors: ['States.TaskFailed'],
      interval: cdk.Duration.seconds(10),
      maxAttempts: 3,
      backoffRate: 2,
    });

    parallelProvisioning.branch(provisionCompute);
    parallelProvisioning.branch(provisionStorage);

    // Rollback: networking + security (if parallel provisioning fails)
    const rollbackSecurity = new tasks.LambdaInvoke(this, 'Rollback Security (Parallel Failed)', {
      lambdaFunction: securityRollbackFn,
      payload: sfn.TaskInput.fromObject({
        'roleArn.$': '$.security.roleArn',
      }),
      resultPath: sfn.JsonPath.DISCARD,
    });

    const rollbackNetworking = new tasks.LambdaInvoke(this, 'Rollback Networking (Parallel Failed)', {
      lambdaFunction: networkingRollbackFn,
      payload: sfn.TaskInput.fromObject({
        'networkId.$': '$.networking.networkId',
      }),
      resultPath: sfn.JsonPath.DISCARD,
    });

    const parallelFailed = new sfn.Fail(this, 'Parallel Provisioning Failed', {
      error: 'ProvisioningError',
      cause: 'Compute or storage provisioning failed',
    });

    parallelProvisioning.addCatch(
      rollbackSecurity.next(rollbackNetworking).next(parallelFailed),
      { resultPath: '$.error' },
    );

    // Merge parallel results
    const mergeParallelResults = new sfn.Pass(this, 'Merge Parallel Results', {
      parameters: {
        'requestId.$': '$.requestId',
        'tenantId.$': '$.tenantId',
        'networking.$': '$.networking',
        'security.$': '$.security',
        'compute.$': '$.parallelResults[0]',
        'storage.$': '$.parallelResults[1]',
      },
    });

    // Step 6: Configure resources
    const configureResources = new tasks.LambdaInvoke(this, 'Configure Resources', {
      lambdaFunction: configureResourcesFn,
      payload: sfn.TaskInput.fromObject({
        'requestId.$': '$.requestId',
        'networkId.$': '$.networking.networkId',
        'roleArn.$': '$.security.roleArn',
        'instanceId.$': '$.compute.instanceId',
        'volumeId.$': '$.storage.volumeId',
      }),
      outputPath: '$.Payload',
      resultPath: '$.configuration',
    });

    // Rollback: everything (if configuration fails)
    const rollbackCompute = new tasks.LambdaInvoke(this, 'Rollback Compute', {
      lambdaFunction: computeRollbackFn,
      payload: sfn.TaskInput.fromObject({
        'instanceId.$': '$.compute.instanceId',
      }),
      resultPath: sfn.JsonPath.DISCARD,
    });

    const rollbackStorage = new tasks.LambdaInvoke(this, 'Rollback Storage', {
      lambdaFunction: storageRollbackFn,
      payload: sfn.TaskInput.fromObject({
        'volumeId.$': '$.storage.volumeId',
      }),
      resultPath: sfn.JsonPath.DISCARD,
    });

    const rollbackSecurityFull = new tasks.LambdaInvoke(this, 'Rollback Security (Config Failed)', {
      lambdaFunction: securityRollbackFn,
      payload: sfn.TaskInput.fromObject({
        'roleArn.$': '$.security.roleArn',
      }),
      resultPath: sfn.JsonPath.DISCARD,
    });

    const rollbackNetworkingFull = new tasks.LambdaInvoke(this, 'Rollback Networking (Config Failed)', {
      lambdaFunction: networkingRollbackFn,
      payload: sfn.TaskInput.fromObject({
        'networkId.$': '$.networking.networkId',
      }),
      resultPath: sfn.JsonPath.DISCARD,
    });

    const configFailed = new sfn.Fail(this, 'Configuration Failed', {
      error: 'ConfigurationError',
      cause: 'Resource configuration failed',
    });

    configureResources.addCatch(
      rollbackCompute
        .next(rollbackStorage)
        .next(rollbackSecurityFull)
        .next(rollbackNetworkingFull)
        .next(configFailed),
      { resultPath: '$.error' },
    );

    // Step 7: Health check polling loop
    const waitForHealthCheck = new sfn.Wait(this, 'Wait Before Health Check', {
      time: sfn.WaitTime.duration(cdk.Duration.seconds(15)),
    });

    const runHealthCheck = new tasks.LambdaInvoke(this, 'Run Health Check', {
      lambdaFunction: healthCheckFn,
      payload: sfn.TaskInput.fromObject({
        'requestId.$': '$.requestId',
        'instanceId.$': '$.compute.instanceId',
      }),
      outputPath: '$.Payload',
      resultPath: '$.health',
    });

    const healthCheckFailed = new sfn.Fail(this, 'Health Check Failed', {
      error: 'HealthCheckError',
      cause: 'Resource health check failed after max attempts',
    });

    const checkHealth = new sfn.Choice(this, 'Healthy?')
      .when(sfn.Condition.stringEquals('$.health.status', 'HEALTHY'), new sfn.Pass(this, 'Health Check Passed'))
      .when(sfn.Condition.numberGreaterThanEquals('$.health.attempts', 5), healthCheckFailed)
      .otherwise(waitForHealthCheck);

    const healthCheckLoop = waitForHealthCheck
      .next(runHealthCheck)
      .next(checkHealth);

    // Step 8: Queue post-provisioning tasks
    const queuePostProvisioning = new tasks.SqsSendMessage(this, 'Queue Post-Provisioning Tasks', {
      queue: postProvisioningQueue,
      messageBody: sfn.TaskInput.fromObject({
        'requestId.$': '$.requestId',
        'tenantId.$': '$.tenantId',
        'instanceId.$': '$.compute.instanceId',
        'volumeId.$': '$.storage.volumeId',
      }),
      resultPath: sfn.JsonPath.DISCARD,
    });

    // Step 9: Update DynamoDB status (requires CustomState)
    const updateStatus = new sfn.CustomState(this, 'Update Provisioning Status', {
      stateJson: {
        Type: 'Task',
        Resource: 'arn:aws:states:::dynamodb:updateItem',
        Parameters: {
          TableName: provisioningTable.tableName,
          Key: { 'requestId': { 'S.$': '$.requestId' } },
          UpdateExpression: 'SET #s = :status, instanceId = :iid, volumeId = :vid',
          ExpressionAttributeNames: { '#s': 'status' },
          ExpressionAttributeValues: {
            ':status': { 'S': 'COMPLETED' },
            ':iid': { 'S.$': '$.compute.instanceId' },
            ':vid': { 'S.$': '$.storage.volumeId' },
          },
        },
        ResultPath: null,
      },
    });

    // Step 10: Notify success
    const notifySuccess = new tasks.SnsPublish(this, 'Notify Provisioning Complete', {
      topic: alertsTopic,
      subject: 'Resource Provisioning Complete',
      message: sfn.TaskInput.fromObject({
        'requestId.$': '$.requestId',
        'tenantId.$': '$.tenantId',
        'status': 'COMPLETED',
      }),
      resultPath: sfn.JsonPath.DISCARD,
    });

    // ── Wire everything together ────────────────────────────────────────

    const definition = validateRequest
      .next(checkValid)
      .next(createAuditRecord)
      .next(provisionNetworking)
      .next(createSecurityRoles)
      .next(parallelProvisioning)
      .next(mergeParallelResults)
      .next(configureResources)
      .next(runHealthCheck)
      .next(checkHealth)
      .next(queuePostProvisioning)
      .next(updateStatus)
      .next(notifySuccess)
      .next(new sfn.Succeed(this, 'Provisioning Complete'));

    const stateMachine = new sfn.StateMachine(this, 'ResourceProvisioningStateMachine', {
      definitionBody: sfn.DefinitionBody.fromChainable(definition),
      timeout: cdk.Duration.minutes(30),
    });

    // ── Permissions ─────────────────────────────────────────────────────

    validateRequestFn.grantInvoke(stateMachine);
    configureResourcesFn.grantInvoke(stateMachine);
    healthCheckFn.grantInvoke(stateMachine);
    networkingApiFn.grantInvoke(stateMachine);
    securityApiFn.grantInvoke(stateMachine);
    computeApiFn.grantInvoke(stateMachine);
    storageApiFn.grantInvoke(stateMachine);
    networkingRollbackFn.grantInvoke(stateMachine);
    securityRollbackFn.grantInvoke(stateMachine);
    computeRollbackFn.grantInvoke(stateMachine);
    storageRollbackFn.grantInvoke(stateMachine);
    provisioningTable.grantReadWriteData(stateMachine);
    postProvisioningQueue.grantSendMessages(stateMachine);
    alertsTopic.grantPublish(stateMachine);
  }
}
