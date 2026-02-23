// DynamoDB CRUD — CDK + SimpleSteps
//
// Full DynamoDB operations with conditions, expressions, and query.
// Same infrastructure as pure CDK — only the step function definition changes.

import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { SimpleStepsStateMachine } from '@simplesteps/cdk';
import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { DynamoDB } from '@simplesteps/core/runtime/services';

export class DynamoDbCrudStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ordersTable = new dynamodb.Table(this, 'OrdersTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });

    const orders = new DynamoDB(ordersTable.tableName);

    const machine = new SimpleStepsStateMachine(this, 'DynamoDbCrudStateMachine', {
      workflow: Steps.createFunction(
        async (context: SimpleStepContext, input: {
          orderId: string;
          customerId: string;
          items: string[];
          status: string;
        }) => {
          // CREATE — putItem with condition (no overwrite)
          await orders.putItem({
            Item: {
              id: { S: input.orderId },
              customerId: { S: input.customerId },
              status: { S: 'PENDING' },
            },
            ConditionExpression: 'attribute_not_exists(id)',
          });

          // READ — getItem with consistent read
          const order = await orders.getItem({
            Key: { id: { S: input.orderId } },
            ConsistentRead: true,
          });

          // UPDATE — updateItem with expression
          const updated = await orders.updateItem({
            Key: { id: { S: input.orderId } },
            UpdateExpression: 'SET #s = :status',
            ExpressionAttributeNames: { '#s': 'status' },
            ExpressionAttributeValues: { ':status': { S: input.status } },
            ReturnValues: 'ALL_NEW',
          });

          // QUERY — find all orders for a customer
          const customerOrders = await orders.query({
            KeyConditionExpression: 'customerId = :cid',
            ExpressionAttributeValues: { ':cid': { S: input.customerId } },
          });

          return { order, updated, customerOrders };
        },
      ),
    });

    ordersTable.grantReadWriteData(machine);
  }
}
