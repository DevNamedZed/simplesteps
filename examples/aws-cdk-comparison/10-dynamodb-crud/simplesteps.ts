// DynamoDB CRUD — SimpleSteps
//
// Full DynamoDB integration: putItem with conditions, getItem with
// consistent reads, updateItem with expressions, and query.

import { Steps, SimpleStepContext } from '@simplesteps/core/runtime';
import { DynamoDB } from '@simplesteps/core/runtime/services';

const ordersTable = new DynamoDB('OrdersTable');

export const dynamoDbCrud = Steps.createFunction(
  async (context: SimpleStepContext, input: {
    orderId: string;
    customerId: string;
    items: string[];
    status: string;
  }) => {
    // CREATE — putItem with condition (no overwrite)
    await ordersTable.putItem({
      Item: {
        id: { S: input.orderId },
        customerId: { S: input.customerId },
        status: { S: 'PENDING' },
      },
      ConditionExpression: 'attribute_not_exists(id)',
    });

    // READ — getItem with consistent read
    const order = await ordersTable.getItem({
      Key: { id: { S: input.orderId } },
      ConsistentRead: true,
    });

    // UPDATE — updateItem with expression
    const updated = await ordersTable.updateItem({
      Key: { id: { S: input.orderId } },
      UpdateExpression: 'SET #s = :status',
      ExpressionAttributeNames: { '#s': 'status' },
      ExpressionAttributeValues: { ':status': { S: input.status } },
      ReturnValues: 'ALL_NEW',
    });

    // QUERY — find all orders for a customer
    const customerOrders = await ordersTable.query({
      KeyConditionExpression: 'customerId = :cid',
      ExpressionAttributeValues: { ':cid': { S: input.customerId } },
    });

    return { order, updated, customerOrders };
  },
);
