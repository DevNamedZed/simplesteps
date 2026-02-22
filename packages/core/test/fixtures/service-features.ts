// Test fixture: Extended service features
//
// Tests new service methods: DynamoDB query/scan/conditional, Lambda async/callback,
// StepFunction callback, S3 headObject, SecretsManager update/describe, SSM batch.

import { Steps, SimpleStepContext } from '../../src/runtime/index';
import { Lambda } from '../../src/runtime/services/Lambda';
import { DynamoDB } from '../../src/runtime/services/DynamoDB';
import { StepFunction } from '../../src/runtime/services/StepFunction';
import { S3 } from '../../src/runtime/services/S3';
import { SecretsManager } from '../../src/runtime/services/SecretsManager';
import { SSM } from '../../src/runtime/services/SSM';

const myLambda = Lambda<{ data: string }, { result: string }>('arn:aws:lambda:us-east-1:123:function:Process');
const table = new DynamoDB('OrdersTable');
const childSfn = new StepFunction<{ task: string }, { done: boolean }>('arn:aws:states:us-east-1:123:stateMachine:Child');
const bucket = new S3('my-bucket');
const secrets = new SecretsManager();
const ssm = new SSM();

// DynamoDB query
export const dynamoQuery = Steps.createFunction(
  async (context: SimpleStepContext, input: { pk: string }) => {
    const result = await table.query({
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: { ':pk': { S: input.pk } },
    });
    return { items: result };
  },
);

// DynamoDB scan
export const dynamoScan = Steps.createFunction(
  async (context: SimpleStepContext, input: { status: string }) => {
    const result = await table.scan({
      FilterExpression: '#s = :status',
      ExpressionAttributeNames: { '#s': 'status' },
      ExpressionAttributeValues: { ':status': { S: input.status } },
    });
    return { items: result };
  },
);

// DynamoDB putItem with ConditionExpression
export const dynamoConditionalPut = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string; name: string }) => {
    await table.putItem({
      Item: { id: { S: input.id }, name: { S: input.name } },
      ConditionExpression: 'attribute_not_exists(id)',
    });
    return { created: true };
  },
);

// DynamoDB getItem with ConsistentRead
export const dynamoConsistentGet = Steps.createFunction(
  async (context: SimpleStepContext, input: { id: string }) => {
    const item = await table.getItem({
      Key: { id: { S: input.id } },
      ConsistentRead: true,
    });
    return { item };
  },
);

// Lambda async invocation
export const lambdaAsync = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    await myLambda.callAsync({ data: input.data });
    return { fired: true };
  },
);

// Lambda waitForTaskToken
export const lambdaCallback = Steps.createFunction(
  async (context: SimpleStepContext, input: { data: string }) => {
    const result = await myLambda.callWithCallback({ data: input.data });
    return { callbackResult: result };
  },
);

// StepFunction waitForTaskToken
export const sfnCallback = Steps.createFunction(
  async (context: SimpleStepContext, input: { task: string }) => {
    const result = await childSfn.startExecutionWithCallback({ task: input.task });
    return { callbackResult: result };
  },
);

// S3 headObject
export const s3Head = Steps.createFunction(
  async (context: SimpleStepContext, input: { key: string }) => {
    const meta = await bucket.headObject({ Key: input.key });
    return { metadata: meta };
  },
);

// SecretsManager updateSecret
export const secretUpdate = Steps.createFunction(
  async (context: SimpleStepContext, input: { secretId: string; value: string }) => {
    await secrets.updateSecret({ SecretId: input.secretId, SecretString: input.value });
    return { updated: true };
  },
);

// SecretsManager describeSecret
export const secretDescribe = Steps.createFunction(
  async (context: SimpleStepContext, input: { secretId: string }) => {
    const info = await secrets.describeSecret({ SecretId: input.secretId });
    return { info };
  },
);

// SSM getParameters (batch)
export const ssmBatch = Steps.createFunction(
  async (context: SimpleStepContext, input: { names: string }) => {
    const params = await ssm.getParameters({ Names: input.names });
    return { params };
  },
);
