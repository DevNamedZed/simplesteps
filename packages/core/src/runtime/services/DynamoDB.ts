import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for DynamoDB operations. */
export interface DynamoDbOptions {
  retry?: RetryPolicy;
}

/** DynamoDB table binding for the SimpleSteps compiler. */
export class DynamoDB {
  constructor(tableName: string) {
    throw new Error(BINDING_ERROR);
  }

  getItem<T>(params: Record<string, any>, options?: DynamoDbOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  get<T>(params: Record<string, any>, options?: DynamoDbOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putItem(params: Record<string, any>, options?: DynamoDbOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  put(params: Record<string, any>, options?: DynamoDbOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  deleteItem(params: Record<string, any>, options?: DynamoDbOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  delete(params: Record<string, any>, options?: DynamoDbOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  updateItem<T>(params: Record<string, any>, options?: DynamoDbOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  update<T>(params: Record<string, any>, options?: DynamoDbOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  query<T>(params: Record<string, any>, options?: DynamoDbOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  scan<T>(params: Record<string, any>, options?: DynamoDbOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
