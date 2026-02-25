// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for DynamoDB operations. */
export interface DynamoDbOptions {
  retry?: RetryPolicy;
  timeoutSeconds?: number;
  heartbeatSeconds?: number;
}

export interface ExpectedAttributeValue {
  /** Represents the data for the expected attribute. Each attribute value is described as a name-value pair. The name is the data type, and the value is the data itself. For more information, see Data Type */
  Value?: any;
  /** Causes DynamoDB to evaluate the value before attempting a conditional operation: If Exists is true, DynamoDB will check to see if that attribute value already exists in the table. If it is found, then */
  Exists?: boolean;
  /** A comparator for evaluating attributes in the AttributeValueList. For example, equals, greater than, less than, etc. The following comparison operators are available: EQ | NE | LE | LT | GE | GT | NOT */
  ComparisonOperator?: 'EQ' | 'NE' | 'IN' | 'LE' | 'LT' | 'GE' | 'GT' | 'BETWEEN' | 'NOT_NULL' | 'NULL' | 'CONTAINS' | 'NOT_CONTAINS' | 'BEGINS_WITH';
  /** One or more values to evaluate against the supplied attribute. The number of values in the list depends on the ComparisonOperator being used. For type Number, value comparisons are numeric. String val */
  AttributeValueList?: any[];
}

export interface AttributeValueUpdate {
  /** Represents the data for an attribute. Each attribute value is described as a name-value pair. The name is the data type, and the value is the data itself. For more information, see Data Types in the A */
  Value?: any;
  /** Specifies how to perform the update. Valid values are PUT (default), DELETE, and ADD. The behavior depends on whether the specified primary key already exists in the table. If an item with the specifi */
  Action?: 'ADD' | 'PUT' | 'DELETE';
}

export interface Condition {
  /** One or more values to evaluate against the supplied attribute. The number of values in the list depends on the ComparisonOperator being used. For type Number, value comparisons are numeric. String val */
  AttributeValueList?: any[];
  /** A comparator for evaluating attributes. For example, equals, greater than, less than, etc. The following comparison operators are available: EQ | NE | LE | LT | GE | GT | NOT_NULL | NULL | CONTAINS |  */
  ComparisonOperator: 'EQ' | 'NE' | 'IN' | 'LE' | 'LT' | 'GE' | 'GT' | 'BETWEEN' | 'NOT_NULL' | 'NULL' | 'CONTAINS' | 'NOT_CONTAINS' | 'BEGINS_WITH';
}

export interface KeysAndAttributes {
  /** The primary key attribute values that define the items and the attributes associated with the items. */
  Keys: any[];
  /** This is a legacy parameter. Use ProjectionExpression instead. For more information, see Legacy Conditional Parameters in the Amazon DynamoDB Developer Guide. */
  AttributesToGet?: any[];
  /** The consistency of a read operation. If set to true, then a strongly consistent read is used; otherwise, an eventually consistent read is used. */
  ConsistentRead?: boolean;
  /** A string that identifies one or more attributes to retrieve from the table. These attributes can include scalars, sets, or elements of a JSON document. The attributes in the ProjectionExpression must  */
  ProjectionExpression?: string;
  /** One or more substitution tokens for attribute names in an expression. The following are some use cases for using ExpressionAttributeNames: To access an attribute whose name conflicts with a DynamoDB r */
  ExpressionAttributeNames?: Record<string, any>;
}

/** Represents the input of a GetItem operation. */
export interface GetItemInput {
  /** A map of attribute names to AttributeValue objects, representing the primary key of the item to retrieve. For the primary key, you must provide all of the attributes. For example, with a simple primar */
  Key: Record<string, any>;
  /** This is a legacy parameter. Use ProjectionExpression instead. For more information, see AttributesToGet in the Amazon DynamoDB Developer Guide. */
  AttributesToGet?: string[];
  /** Determines the read consistency model: If set to true, then the operation uses strongly consistent reads; otherwise, the operation uses eventually consistent reads. */
  ConsistentRead?: boolean;
  /** One or more substitution tokens for attribute names in an expression. The following are some use cases for using ExpressionAttributeNames: To access an attribute whose name conflicts with a DynamoDB r */
  ExpressionAttributeNames?: Record<string, string>;
  /** A string that identifies one or more attributes to retrieve from the table. These attributes can include scalars, sets, or elements of a JSON document. The attributes in the expression must be separat */
  ProjectionExpression?: string;
  ReturnConsumedCapacity?: 'INDEXES' | 'TOTAL' | 'NONE';
}

/** Represents the input of a PutItem operation. */
export interface PutItemInput {
  /** A map of attribute name/value pairs, one for each attribute. Only the primary key attributes are required; you can optionally provide other attribute name-value pairs for the item. You must provide al */
  Item: Record<string, any>;
  /** This is a legacy parameter. Use ConditionExpression instead. For more information, see ConditionalOperator in the Amazon DynamoDB Developer Guide. */
  ConditionalOperator?: 'AND' | 'OR';
  /** A condition that must be satisfied in order for a conditional PutItem operation to succeed. An expression can contain any of the following: Functions: attribute_exists | attribute_not_exists | attribu */
  ConditionExpression?: string;
  /** This is a legacy parameter. Use ConditionExpression instead. For more information, see Expected in the Amazon DynamoDB Developer Guide. */
  Expected?: Record<string, ExpectedAttributeValue>;
  /** One or more substitution tokens for attribute names in an expression. The following are some use cases for using ExpressionAttributeNames: To access an attribute whose name conflicts with a DynamoDB r */
  ExpressionAttributeNames?: Record<string, string>;
  /** One or more values that can be substituted in an expression. Use the : (colon) character in an expression to dereference an attribute value. For example, suppose that you wanted to check whether the v */
  ExpressionAttributeValues?: Record<string, any>;
  ReturnConsumedCapacity?: 'INDEXES' | 'TOTAL' | 'NONE';
  /** Determines whether item collection metrics are returned. If set to SIZE, the response includes statistics about item collections, if any, that were modified during the operation are returned in the re */
  ReturnItemCollectionMetrics?: 'SIZE' | 'NONE';
  /** Use ReturnValues if you want to get the item attributes as they appeared before they were updated with the PutItem request. For PutItem, the valid values are: NONE - If ReturnValues is not specified,  */
  ReturnValues?: 'NONE' | 'ALL_OLD' | 'UPDATED_OLD' | 'ALL_NEW' | 'UPDATED_NEW';
  /** An optional parameter that returns the item attributes for a PutItem operation that failed a condition check. There is no additional cost associated with requesting a return value aside from the small */
  ReturnValuesOnConditionCheckFailure?: 'ALL_OLD' | 'NONE';
}

/** Represents the input of a DeleteItem operation. */
export interface DeleteItemInput {
  /** A map of attribute names to AttributeValue objects, representing the primary key of the item to delete. For the primary key, you must provide all of the key attributes. For example, with a simple prim */
  Key: Record<string, any>;
  /** This is a legacy parameter. Use ConditionExpression instead. For more information, see ConditionalOperator in the Amazon DynamoDB Developer Guide. */
  ConditionalOperator?: 'AND' | 'OR';
  /** A condition that must be satisfied in order for a conditional DeleteItem to succeed. An expression can contain any of the following: Functions: attribute_exists | attribute_not_exists | attribute_type */
  ConditionExpression?: string;
  /** This is a legacy parameter. Use ConditionExpression instead. For more information, see Expected in the Amazon DynamoDB Developer Guide. */
  Expected?: Record<string, ExpectedAttributeValue>;
  /** One or more substitution tokens for attribute names in an expression. The following are some use cases for using ExpressionAttributeNames: To access an attribute whose name conflicts with a DynamoDB r */
  ExpressionAttributeNames?: Record<string, string>;
  /** One or more values that can be substituted in an expression. Use the : (colon) character in an expression to dereference an attribute value. For example, suppose that you wanted to check whether the v */
  ExpressionAttributeValues?: Record<string, any>;
  ReturnConsumedCapacity?: 'INDEXES' | 'TOTAL' | 'NONE';
  /** Determines whether item collection metrics are returned. If set to SIZE, the response includes statistics about item collections, if any, that were modified during the operation are returned in the re */
  ReturnItemCollectionMetrics?: 'SIZE' | 'NONE';
  /** Use ReturnValues if you want to get the item attributes as they appeared before they were deleted. For DeleteItem, the valid values are: NONE - If ReturnValues is not specified, or if its value is NON */
  ReturnValues?: 'NONE' | 'ALL_OLD' | 'UPDATED_OLD' | 'ALL_NEW' | 'UPDATED_NEW';
  /** An optional parameter that returns the item attributes for a DeleteItem operation that failed a condition check. There is no additional cost associated with requesting a return value aside from the sm */
  ReturnValuesOnConditionCheckFailure?: 'ALL_OLD' | 'NONE';
}

/** Represents the input of an UpdateItem operation. */
export interface UpdateItemInput {
  /** The primary key of the item to be updated. Each element consists of an attribute name and a value for that attribute. For the primary key, you must provide all of the attributes. For example, with a s */
  Key: Record<string, any>;
  /** This is a legacy parameter. Use UpdateExpression instead. For more information, see AttributeUpdates in the Amazon DynamoDB Developer Guide. */
  AttributeUpdates?: Record<string, AttributeValueUpdate>;
  /** This is a legacy parameter. Use ConditionExpression instead. For more information, see ConditionalOperator in the Amazon DynamoDB Developer Guide. */
  ConditionalOperator?: 'AND' | 'OR';
  /** A condition that must be satisfied in order for a conditional update to succeed. An expression can contain any of the following: Functions: attribute_exists | attribute_not_exists | attribute_type | c */
  ConditionExpression?: string;
  /** This is a legacy parameter. Use ConditionExpression instead. For more information, see Expected in the Amazon DynamoDB Developer Guide. */
  Expected?: Record<string, ExpectedAttributeValue>;
  /** One or more substitution tokens for attribute names in an expression. The following are some use cases for using ExpressionAttributeNames: To access an attribute whose name conflicts with a DynamoDB r */
  ExpressionAttributeNames?: Record<string, string>;
  /** One or more values that can be substituted in an expression. Use the : (colon) character in an expression to dereference an attribute value. For example, suppose that you wanted to check whether the v */
  ExpressionAttributeValues?: Record<string, any>;
  ReturnConsumedCapacity?: 'INDEXES' | 'TOTAL' | 'NONE';
  /** Determines whether item collection metrics are returned. If set to SIZE, the response includes statistics about item collections, if any, that were modified during the operation are returned in the re */
  ReturnItemCollectionMetrics?: 'SIZE' | 'NONE';
  /** Use ReturnValues if you want to get the item attributes as they appear before or after they are successfully updated. For UpdateItem, the valid values are: NONE - If ReturnValues is not specified, or  */
  ReturnValues?: 'NONE' | 'ALL_OLD' | 'UPDATED_OLD' | 'ALL_NEW' | 'UPDATED_NEW';
  /** An optional parameter that returns the item attributes for an UpdateItem operation that failed a condition check. There is no additional cost associated with requesting a return value aside from the s */
  ReturnValuesOnConditionCheckFailure?: 'ALL_OLD' | 'NONE';
  /** An expression that defines one or more attributes to be updated, the action to be performed on them, and new values for them. The following action values are available for UpdateExpression. SET - Adds */
  UpdateExpression?: string;
}

/** Represents the input of a Query operation. */
export interface QueryInput {
  /** This is a legacy parameter. Use ProjectionExpression instead. For more information, see AttributesToGet in the Amazon DynamoDB Developer Guide. */
  AttributesToGet?: string[];
  /** This is a legacy parameter. Use FilterExpression instead. For more information, see ConditionalOperator in the Amazon DynamoDB Developer Guide. */
  ConditionalOperator?: 'AND' | 'OR';
  /** Determines the read consistency model: If set to true, then the operation uses strongly consistent reads; otherwise, the operation uses eventually consistent reads. Strongly consistent reads are not s */
  ConsistentRead?: boolean;
  /** The primary key of the first item that this operation will evaluate. Use the value that was returned for LastEvaluatedKey in the previous operation. The data type for ExclusiveStartKey must be String, */
  ExclusiveStartKey?: Record<string, any>;
  /** One or more substitution tokens for attribute names in an expression. The following are some use cases for using ExpressionAttributeNames: To access an attribute whose name conflicts with a DynamoDB r */
  ExpressionAttributeNames?: Record<string, string>;
  /** One or more values that can be substituted in an expression. Use the : (colon) character in an expression to dereference an attribute value. For example, suppose that you wanted to check whether the v */
  ExpressionAttributeValues?: Record<string, any>;
  /** A string that contains conditions that DynamoDB applies after the Query operation, but before the data is returned to you. Items that do not satisfy the FilterExpression criteria are not returned. A F */
  FilterExpression?: string;
  /** The name of an index to query. This index can be any local secondary index or global secondary index on the table. Note that if you use the IndexName parameter, you must also provide TableName. */
  IndexName?: string;
  /** The condition that specifies the key values for items to be retrieved by the Query action. The condition must perform an equality test on a single partition key value. The condition can optionally per */
  KeyConditionExpression?: string;
  /** This is a legacy parameter. Use KeyConditionExpression instead. For more information, see KeyConditions in the Amazon DynamoDB Developer Guide. */
  KeyConditions?: Record<string, Condition>;
  /** The maximum number of items to evaluate (not necessarily the number of matching items). If DynamoDB processes the number of items up to the limit while processing the results, it stops the operation a */
  Limit?: number;
  /** A string that identifies one or more attributes to retrieve from the table. These attributes can include scalars, sets, or elements of a JSON document. The attributes in the expression must be separat */
  ProjectionExpression?: string;
  /** This is a legacy parameter. Use FilterExpression instead. For more information, see QueryFilter in the Amazon DynamoDB Developer Guide. */
  QueryFilter?: Record<string, Condition>;
  ReturnConsumedCapacity?: 'INDEXES' | 'TOTAL' | 'NONE';
  /** Specifies the order for index traversal: If true (default), the traversal is performed in ascending order; if false, the traversal is performed in descending order. Items with the same partition key v */
  ScanIndexForward?: boolean;
  /** The attributes to be returned in the result. You can retrieve all item attributes, specific item attributes, the count of matching items, or in the case of an index, some or all of the attributes proj */
  Select?: 'ALL_ATTRIBUTES' | 'ALL_PROJECTED_ATTRIBUTES' | 'SPECIFIC_ATTRIBUTES' | 'COUNT';
}

/** Represents the input of a Scan operation. */
export interface ScanInput {
  /** This is a legacy parameter. Use ProjectionExpression instead. For more information, see AttributesToGet in the Amazon DynamoDB Developer Guide. */
  AttributesToGet?: string[];
  /** This is a legacy parameter. Use FilterExpression instead. For more information, see ConditionalOperator in the Amazon DynamoDB Developer Guide. */
  ConditionalOperator?: 'AND' | 'OR';
  /** A Boolean value that determines the read consistency model during the scan: If ConsistentRead is false, then the data returned from Scan might not contain the results from other recently completed wri */
  ConsistentRead?: boolean;
  /** The primary key of the first item that this operation will evaluate. Use the value that was returned for LastEvaluatedKey in the previous operation. The data type for ExclusiveStartKey must be String, */
  ExclusiveStartKey?: Record<string, any>;
  /** One or more substitution tokens for attribute names in an expression. The following are some use cases for using ExpressionAttributeNames: To access an attribute whose name conflicts with a DynamoDB r */
  ExpressionAttributeNames?: Record<string, string>;
  /** One or more values that can be substituted in an expression. Use the : (colon) character in an expression to dereference an attribute value. For example, suppose that you wanted to check whether the v */
  ExpressionAttributeValues?: Record<string, any>;
  /** A string that contains conditions that DynamoDB applies after the Scan operation, but before the data is returned to you. Items that do not satisfy the FilterExpression criteria are not returned. A Fi */
  FilterExpression?: string;
  /** The name of a secondary index to scan. This index can be any local secondary index or global secondary index. Note that if you use the IndexName parameter, you must also provide TableName. */
  IndexName?: string;
  /** The maximum number of items to evaluate (not necessarily the number of matching items). If DynamoDB processes the number of items up to the limit while processing the results, it stops the operation a */
  Limit?: number;
  /** A string that identifies one or more attributes to retrieve from the specified table or index. These attributes can include scalars, sets, or elements of a JSON document. The attributes in the express */
  ProjectionExpression?: string;
  ReturnConsumedCapacity?: 'INDEXES' | 'TOTAL' | 'NONE';
  /** This is a legacy parameter. Use FilterExpression instead. For more information, see ScanFilter in the Amazon DynamoDB Developer Guide. */
  ScanFilter?: Record<string, Condition>;
  /** For a parallel Scan request, Segment identifies an individual segment to be scanned by an application worker. Segment IDs are zero-based, so the first segment is always 0. For example, if you want to  */
  Segment?: number;
  /** The attributes to be returned in the result. You can retrieve all item attributes, specific item attributes, the count of matching items, or in the case of an index, some or all of the attributes proj */
  Select?: 'ALL_ATTRIBUTES' | 'ALL_PROJECTED_ATTRIBUTES' | 'SPECIFIC_ATTRIBUTES' | 'COUNT';
  /** For a parallel Scan request, TotalSegments represents the total number of segments into which the Scan operation will be divided. The value of TotalSegments corresponds to the number of application wo */
  TotalSegments?: number;
}

/** Represents the input of a BatchGetItem operation. */
export interface BatchGetItemInput {
  /** A map of one or more table names or table ARNs and, for each table, a map that describes one or more items to retrieve from that table. Each table name or ARN can be used only once per BatchGetItem re */
  RequestItems: Record<string, KeysAndAttributes>;
  ReturnConsumedCapacity?: 'INDEXES' | 'TOTAL' | 'NONE';
}

/** Represents the input of a BatchWriteItem operation. */
export interface BatchWriteItemInput {
  /** A map of one or more table names or table ARNs and, for each table, a list of operations to be performed (DeleteRequest or PutRequest). Each element in the map consists of the following: DeleteRequest */
  RequestItems: Record<string, any[]>;
  ReturnConsumedCapacity?: 'INDEXES' | 'TOTAL' | 'NONE';
  /** Determines whether item collection metrics are returned. If set to SIZE, the response includes statistics about item collections, if any, that were modified during the operation are returned in the re */
  ReturnItemCollectionMetrics?: 'SIZE' | 'NONE';
}

/** DynamoDB table binding for the SimpleSteps compiler. */
export class DynamoDB {
  constructor(tableName: string) {}

  getItem<T>(params: GetItemInput, options?: DynamoDbOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  get<T>(params: GetItemInput, options?: DynamoDbOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putItem(params: PutItemInput, options?: DynamoDbOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  put(params: PutItemInput, options?: DynamoDbOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  deleteItem(params: DeleteItemInput, options?: DynamoDbOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  delete(params: DeleteItemInput, options?: DynamoDbOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  updateItem<T>(params: UpdateItemInput, options?: DynamoDbOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  update<T>(params: UpdateItemInput, options?: DynamoDbOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  query<T>(params: QueryInput, options?: DynamoDbOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  scan<T>(params: ScanInput, options?: DynamoDbOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchGetItem<T>(params: BatchGetItemInput, options?: DynamoDbOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchWriteItem(params: BatchWriteItemInput, options?: DynamoDbOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }
}
