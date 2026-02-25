// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.

/**
 * Maps service class name → lowercase SDK service ID for ARN construction.
 * Used to build `arn:aws:states:::aws-sdk:{sdkId}:{action}` ARNs.
 */
export const SERVICE_SDK_IDS: Record<string, string> = {
  Athena: 'athena',
  Batch: 'batch',
  Bedrock: 'bedrock',
  CodeBuild: 'codebuild',
  DynamoDB: 'dynamodb',
  ECS: 'ecs',
  EventBridge: 'eventbridge',
  Glue: 'glue',
  Lambda: 'lambda',
  S3: 's3',
  SecretsManager: 'secretsmanager',
  SimpleQueueService: 'sqs',
  SNS: 'sns',
  SSM: 'ssm',
  StepFunction: 'sfn',
  APIGateway: 'apigateway',
  AppSync: 'appsync',
  CloudFormation: 'cloudformation',
  CloudWatch: 'monitoring',
  CloudWatchLogs: 'logs',
  CodeCommit: 'codecommit',
  CodePipeline: 'codepipeline',
  Comprehend: 'comprehend',
  ConfigService: 'config',
  Connect: 'connect',
  DatabaseMigrationService: 'dms',
  DataBrew: 'databrew',
  DocDB: 'rds',
  EC2: 'ec2',
  ECR: 'ecr',
  EKS: 'eks',
  ElastiCache: 'elasticache',
  ElasticBeanstalk: 'elasticbeanstalk',
  EMR: 'elasticmapreduce',
  EMRServerless: 'emr-serverless',
  Firehose: 'firehose',
  IAM: 'iam',
  IoT: 'iot',
  Kafka: 'kafka',
  Kinesis: 'kinesis',
  KMS: 'kms',
  LakeFormation: 'lakeformation',
  LexModelsV2: 'lex',
  MediaConvert: 'mediaconvert',
  Neptune: 'rds',
  OpenSearch: 'es',
  Organizations: 'organizations',
  Pinpoint: 'mobiletargeting',
  Polly: 'polly',
  RDS: 'rds',
  Redshift: 'redshift',
  Rekognition: 'rekognition',
  Route53: 'route53',
  SageMaker: 'sagemaker',
  Scheduler: 'scheduler',
  ServiceCatalog: 'servicecatalog',
  SESv2: 'ses',
  SFN: 'states',
  Textract: 'textract',
  Transcribe: 'transcribe',
  Transfer: 'transfer',
  Translate: 'translate',
  WAFV2: 'wafv2',
};

export type ServiceIntegration = 'direct' | 'sdk';

export interface OptimizedMethodEntry {
  readonly integration: ServiceIntegration;
  readonly sdkResource?: string;
  readonly hasOutput: boolean;
}

export interface OptimizedMethodAlias {
  readonly aliasOf: string;
}

export type OptimizedEntry = OptimizedMethodEntry | OptimizedMethodAlias;

/**
 * Services with special ARN patterns (not the generic aws-sdk:service:action pattern).
 * If a method is listed here, use its sdkResource. Otherwise fall back to generic.
 */
export const OPTIMIZED_INTEGRATIONS: Record<string, Record<string, OptimizedEntry>> = {
  Lambda: {
    call: { integration: 'direct', hasOutput: true },
    callAsync: { integration: 'sdk', sdkResource: 'arn:aws:states:::lambda:invoke', hasOutput: false },
    callWithCallback: { integration: 'sdk', sdkResource: 'arn:aws:states:::lambda:invoke.waitForTaskToken', hasOutput: true },
  },
  SimpleQueueService: {
    publish: { integration: 'sdk', sdkResource: 'arn:aws:states:::sqs:sendMessage', hasOutput: false },
    publishWithCallback: { integration: 'sdk', sdkResource: 'arn:aws:states:::sqs:sendMessage.waitForTaskToken', hasOutput: true },
    receiveMessage: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:sqs:receiveMessage', hasOutput: true },
    deleteMessage: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:sqs:deleteMessage', hasOutput: false },
  },
  DynamoDB: {
    getItem: { integration: 'sdk', sdkResource: 'arn:aws:states:::dynamodb:getItem', hasOutput: true },
    get: { aliasOf: 'getItem' },
    putItem: { integration: 'sdk', sdkResource: 'arn:aws:states:::dynamodb:putItem', hasOutput: false },
    put: { aliasOf: 'putItem' },
    deleteItem: { integration: 'sdk', sdkResource: 'arn:aws:states:::dynamodb:deleteItem', hasOutput: false },
    delete: { aliasOf: 'deleteItem' },
    updateItem: { integration: 'sdk', sdkResource: 'arn:aws:states:::dynamodb:updateItem', hasOutput: true },
    update: { aliasOf: 'updateItem' },
    query: { integration: 'sdk', sdkResource: 'arn:aws:states:::dynamodb:query', hasOutput: true },
    scan: { integration: 'sdk', sdkResource: 'arn:aws:states:::dynamodb:scan', hasOutput: true },
    batchGetItem: { integration: 'sdk', sdkResource: 'arn:aws:states:::dynamodb:batchGetItem', hasOutput: true },
    batchWriteItem: { integration: 'sdk', sdkResource: 'arn:aws:states:::dynamodb:batchWriteItem', hasOutput: false },
  },
  SNS: {
    publish: { integration: 'sdk', sdkResource: 'arn:aws:states:::sns:publish', hasOutput: false },
  },
  StepFunction: {
    startExecution: { integration: 'sdk', sdkResource: 'arn:aws:states:::states:startExecution.sync:2', hasOutput: true },
    startExecutionAsync: { integration: 'sdk', sdkResource: 'arn:aws:states:::states:startExecution', hasOutput: true },
    startExecutionWithCallback: { integration: 'sdk', sdkResource: 'arn:aws:states:::states:startExecution.waitForTaskToken', hasOutput: true },
  },
  EventBridge: {
    putEvent: { integration: 'sdk', sdkResource: 'arn:aws:states:::events:putEvents', hasOutput: false },
  },
  S3: {
    getObject: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:s3:getObject', hasOutput: true },
    putObject: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:s3:putObject', hasOutput: false },
    deleteObject: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:s3:deleteObject', hasOutput: false },
    copyObject: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:s3:copyObject', hasOutput: false },
    headObject: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:s3:headObject', hasOutput: true },
    listObjects: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:s3:listObjectsV2', hasOutput: true },
  },
  SecretsManager: {
    getSecretValue: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:secretsmanager:getSecretValue', hasOutput: true },
    putSecretValue: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:secretsmanager:putSecretValue', hasOutput: false },
    createSecret: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:secretsmanager:createSecret', hasOutput: true },
    updateSecret: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:secretsmanager:updateSecret', hasOutput: false },
    deleteSecret: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:secretsmanager:deleteSecret', hasOutput: false },
    describeSecret: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:secretsmanager:describeSecret', hasOutput: true },
  },
  SSM: {
    getParameter: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:ssm:getParameter', hasOutput: true },
    putParameter: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:ssm:putParameter', hasOutput: false },
    getParameters: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:ssm:getParameters', hasOutput: true },
    getParametersByPath: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:ssm:getParametersByPath', hasOutput: true },
    deleteParameter: { integration: 'sdk', sdkResource: 'arn:aws:states:::aws-sdk:ssm:deleteParameter', hasOutput: false },
  },
  ECS: {
    runTask: { integration: 'sdk', sdkResource: 'arn:aws:states:::ecs:runTask.sync', hasOutput: true },
    runTaskAsync: { integration: 'sdk', sdkResource: 'arn:aws:states:::ecs:runTask', hasOutput: false },
  },
  Bedrock: {
    invokeModel: { integration: 'sdk', sdkResource: 'arn:aws:states:::bedrock:invokeModel', hasOutput: true },
  },
  Batch: {
    submitJob: { integration: 'sdk', sdkResource: 'arn:aws:states:::batch:submitJob.sync', hasOutput: true },
    submitJobAsync: { integration: 'sdk', sdkResource: 'arn:aws:states:::batch:submitJob', hasOutput: false },
  },
  Glue: {
    startJobRun: { integration: 'sdk', sdkResource: 'arn:aws:states:::glue:startJobRun.sync', hasOutput: true },
    startJobRunAsync: { integration: 'sdk', sdkResource: 'arn:aws:states:::glue:startJobRun', hasOutput: false },
  },
  CodeBuild: {
    startBuild: { integration: 'sdk', sdkResource: 'arn:aws:states:::codebuild:startBuild.sync', hasOutput: true },
    startBuildAsync: { integration: 'sdk', sdkResource: 'arn:aws:states:::codebuild:startBuild', hasOutput: false },
  },
  Athena: {
    startQueryExecution: { integration: 'sdk', sdkResource: 'arn:aws:states:::athena:startQueryExecution.sync', hasOutput: true },
    getQueryExecution: { integration: 'sdk', sdkResource: 'arn:aws:states:::athena:getQueryExecution', hasOutput: true },
    getQueryResults: { integration: 'sdk', sdkResource: 'arn:aws:states:::athena:getQueryResults', hasOutput: true },
  },
};

export const SDK_PARAM_SHAPE: Record<string, Record<string, {
  resourceKey: string;
  paramKey: string;
  extraParams?: Record<string, unknown>;
}>> = {
  Lambda: {
    callAsync: { resourceKey: 'FunctionName', paramKey: 'Payload', extraParams: {"InvocationType":"Event"} },
    callWithCallback: { resourceKey: 'FunctionName', paramKey: 'Payload' },
  },
  SimpleQueueService: {
    publish: { resourceKey: 'QueueUrl', paramKey: 'MessageBody' },
    publishWithCallback: { resourceKey: 'QueueUrl', paramKey: 'MessageBody' },
  },
  SNS: {
    publish: { resourceKey: 'TopicArn', paramKey: 'Message' },
  },
  StepFunction: {
    startExecution: { resourceKey: 'StateMachineArn', paramKey: 'Input' },
    startExecutionAsync: { resourceKey: 'StateMachineArn', paramKey: 'Input' },
    startExecutionWithCallback: { resourceKey: 'StateMachineArn', paramKey: 'Input' },
  },
  EventBridge: {
    putEvent: { resourceKey: 'EventBusName', paramKey: 'Detail' },
  },
  Batch: {
    submitJob: { resourceKey: 'JobQueue', paramKey: 'Parameters' },
    submitJobAsync: { resourceKey: 'JobQueue', paramKey: 'Parameters' },
  },
};

export const SDK_RESOURCE_INJECT: Record<string, string> = {
  SimpleQueueService: 'QueueUrl',
  DynamoDB: 'TableName',
  S3: 'Bucket',
  ECS: 'Cluster',
  Bedrock: 'ModelId',
  Glue: 'JobName',
  CodeBuild: 'ProjectName',
};

