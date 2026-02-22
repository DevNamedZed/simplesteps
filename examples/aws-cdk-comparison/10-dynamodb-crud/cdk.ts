// DynamoDB CRUD — AWS CDK
//
// Full DynamoDB operations. CDK has limited DynamoDB task constructs —
// they don't support ConditionExpression, UpdateExpression, or query.
// Every operation requires CustomState with raw ASL JSON.

import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class DynamoDbCrudStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create DynamoDB table
    const ordersTable = new dynamodb.Table(this, 'OrdersTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });

    // CREATE — putItem with ConditionExpression (requires CustomState)
    const putItem = new sfn.CustomState(this, 'Create Order', {
      stateJson: {
        Type: 'Task',
        Resource: 'arn:aws:states:::dynamodb:putItem',
        Parameters: {
          TableName: ordersTable.tableName,
          Item: {
            'id': { 'S.$': '$.orderId' },
            'customerId': { 'S.$': '$.customerId' },
            'status': { 'S': 'PENDING' },
          },
          ConditionExpression: 'attribute_not_exists(id)',
        },
        ResultPath: null,
      },
    });

    // READ — getItem with ConsistentRead (requires CustomState)
    const getItem = new sfn.CustomState(this, 'Get Order', {
      stateJson: {
        Type: 'Task',
        Resource: 'arn:aws:states:::dynamodb:getItem',
        Parameters: {
          TableName: ordersTable.tableName,
          Key: { 'id': { 'S.$': '$.orderId' } },
          ConsistentRead: true,
        },
        ResultPath: '$.order',
      },
    });

    // UPDATE — updateItem with UpdateExpression (requires CustomState)
    const updateItem = new sfn.CustomState(this, 'Update Order Status', {
      stateJson: {
        Type: 'Task',
        Resource: 'arn:aws:states:::dynamodb:updateItem',
        Parameters: {
          TableName: ordersTable.tableName,
          Key: { 'id': { 'S.$': '$.orderId' } },
          UpdateExpression: 'SET #s = :status',
          ExpressionAttributeNames: { '#s': 'status' },
          ExpressionAttributeValues: { ':status': { 'S.$': '$.status' } },
          ReturnValues: 'ALL_NEW',
        },
        ResultPath: '$.updated',
      },
    });

    // QUERY — query by customerId (requires CustomState, no CDK construct)
    const queryItems = new sfn.CustomState(this, 'Query Customer Orders', {
      stateJson: {
        Type: 'Task',
        Resource: 'arn:aws:states:::dynamodb:query',
        Parameters: {
          TableName: ordersTable.tableName,
          KeyConditionExpression: 'customerId = :cid',
          ExpressionAttributeValues: { ':cid': { 'S.$': '$.customerId' } },
        },
        ResultPath: '$.customerOrders',
      },
    });

    // Wire up the definition
    const definition = putItem
      .next(getItem)
      .next(updateItem)
      .next(queryItems)
      .next(new sfn.Succeed(this, 'Done'));

    // Create the state machine
    const stateMachine = new sfn.StateMachine(this, 'DynamoDbCrudStateMachine', {
      definitionBody: sfn.DefinitionBody.fromChainable(definition),
    });

    // Grant permissions — manual IAM policy for CustomState
    ordersTable.grantReadWriteData(stateMachine);
  }
}
