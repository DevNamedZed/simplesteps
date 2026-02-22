// DynamoDB CRUD
//
// Demonstrates getItem, putItem, and deleteItem on DynamoDB. Each
// SDK method compiles to a Task with the appropriate resource ARN
// (dynamodb:getItem, dynamodb:putItem, dynamodb:deleteItem). The
// compiler wraps user params with TableName + the relevant param key.
//
// ASL output:
//   Invoke_usersDb (Task, dynamodb:getItem, Key: { userId })
//   → Invoke_usersDb_2 (Task, dynamodb:putItem, Item: { userId, lastLogin })
//   → Invoke_sessionsDb (Task, dynamodb:deleteItem, Key: { sessionId })
//   → Return_Result (Pass, End)

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';
import { DynamoDB } from '../../packages/core/src/runtime/services/DynamoDB';

const usersDb = new DynamoDB('UsersTable');
const sessionsDb = new DynamoDB('SessionsTable');

export const dynamoDbCrud = Steps.createFunction(
  async (context: SimpleStepContext, input: { userId: string; sessionId: string }) => {
    const user = await usersDb.getItem({ userId: input.userId });
    await usersDb.putItem({ userId: input.userId, lastLogin: 'now' });
    await sessionsDb.deleteItem({ sessionId: input.sessionId });
    return { updated: true };
  },
);
