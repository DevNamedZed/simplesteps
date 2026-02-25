// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface StreamModeDetails {
  /** Specifies the capacity mode to which you want to set your data stream. Currently, in Kinesis Data Streams, you can choose between an on-demand capacity mode and a provisioned capacity mode for your da */
  StreamMode: 'PROVISIONED' | 'ON_DEMAND';
}

export interface ShardFilter {
  /** The shard type specified in the ShardFilter parameter. This is a required property of the ShardFilter parameter. You can specify the following valid values: AFTER_SHARD_ID - the response includes all  */
  Type: 'AFTER_SHARD_ID' | 'AT_TRIM_HORIZON' | 'FROM_TRIM_HORIZON' | 'AT_LATEST' | 'AT_TIMESTAMP' | 'FROM_TIMESTAMP';
  /** The exclusive start shardID speified in the ShardFilter parameter. This property can only be used if the AFTER_SHARD_ID shard type is specified. */
  ShardId?: string;
  /** The timestamps specified in the ShardFilter parameter. A timestamp is a Unix epoch date with precision in milliseconds. For example, 2016-04-04T19:58:46.480-00:00 or 1459799926.480. This property can  */
  Timestamp?: string;
}

export interface PutRecordsRequestEntry {
  /** The data blob to put into the record, which is base64-encoded when the blob is serialized. When the data blob (the payload before base64-encoding) is added to the partition key size, the total size mu */
  Data: string;
  /** The hash value used to determine explicitly the shard that the data record is assigned to by overriding the partition key hash. */
  ExplicitHashKey?: string;
  /** Determines which shard in the stream the data record is assigned to. Partition keys are Unicode strings with a maximum length limit of 256 characters for each key. Amazon Kinesis Data Streams uses the */
  PartitionKey: string;
}

export interface StartingPosition {
  /** You can set the starting position to one of the following values: AT_SEQUENCE_NUMBER: Start streaming from the position denoted by the sequence number specified in the SequenceNumber field. AFTER_SEQU */
  Type: 'AT_SEQUENCE_NUMBER' | 'AFTER_SEQUENCE_NUMBER' | 'TRIM_HORIZON' | 'LATEST' | 'AT_TIMESTAMP';
  /** The sequence number of the data record in the shard from which to start streaming. To specify a sequence number, set StartingPosition to AT_SEQUENCE_NUMBER or AFTER_SEQUENCE_NUMBER. */
  SequenceNumber?: string;
  /** The time stamp of the data record from which to start reading. To specify a time stamp, set StartingPosition to Type AT_TIMESTAMP. A time stamp is the Unix epoch date with precision in milliseconds. F */
  Timestamp?: string;
}

export interface MinimumThroughputBillingCommitmentInput {
  /** The desired status of the minimum throughput billing commitment. */
  Status: 'ENABLED' | 'DISABLED';
}

/** Represents the input for AddTagsToStream. */
export interface AddTagsToStreamInput {
  /** A set of up to 50 key-value pairs to use to create the tags. A tag consists of a required key and an optional value. You can add up to 50 tags per resource. */
  Tags: Record<string, string>;
  /** The ARN of the stream. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The name of the stream. */
  StreamName?: string;
}

/** Represents the input for CreateStream. */
export interface CreateStreamInput {
  /** A name to identify the stream. The stream name is scoped to the Amazon Web Services account used by the application that creates the stream. It is also scoped by Amazon Web Services Region. That is, t */
  StreamName: string;
  /** The maximum record size of a single record in kibibyte (KiB) that you can write to, and read from a stream. */
  MaxRecordSizeInKiB?: number;
  /** The number of shards that the stream will use. The throughput of the stream is a function of the number of shards; more shards are required for greater provisioned throughput. */
  ShardCount?: number;
  /** Indicates the capacity mode of the data stream. Currently, in Kinesis Data Streams, you can choose between an on-demand capacity mode and a provisioned capacity mode for your data streams. */
  StreamModeDetails?: StreamModeDetails;
  /** A set of up to 50 key-value pairs to use to create the tags. A tag consists of a required key and an optional value. */
  Tags?: Record<string, string>;
  /** The target warm throughput in MB/s that the stream should be scaled to handle. This represents the throughput capacity that will be immediately available for write operations. */
  WarmThroughputMiBps?: number;
}

/** Represents the input for DecreaseStreamRetentionPeriod. */
export interface DecreaseStreamRetentionPeriodInput {
  /** The new retention period of the stream, in hours. Must be less than the current retention period. */
  RetentionPeriodHours: number;
  /** The ARN of the stream. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The name of the stream to modify. */
  StreamName?: string;
}

export interface DeleteResourcePolicyInput {
  /** The Amazon Resource Name (ARN) of the data stream or consumer. */
  ResourceARN: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
}

/** Represents the input for DeleteStream. */
export interface DeleteStreamInput {
  /** If this parameter is unset (null) or if you set it to false, and the stream has registered consumers, the call to DeleteStream fails with a ResourceInUseException. */
  EnforceConsumerDeletion?: boolean;
  /** The ARN of the stream. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The name of the stream to delete. */
  StreamName?: string;
}

export interface DeregisterStreamConsumerInput {
  /** The ARN returned by Kinesis Data Streams when you registered the consumer. If you don't know the ARN of the consumer that you want to deregister, you can use the ListStreamConsumers operation to get a */
  ConsumerARN?: string;
  /** The name that you gave to the consumer. */
  ConsumerName?: string;
  /** The ARN of the Kinesis data stream that the consumer is registered with. For more information, see Amazon Resource Names (ARNs) and Amazon Web Services Service Namespaces. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
}

/** Represents the input for DescribeStream. */
export interface DescribeStreamInput {
  /** The shard ID of the shard to start with. Specify this parameter to indicate that you want to describe the stream starting with the shard whose ID immediately follows ExclusiveStartShardId. If you don' */
  ExclusiveStartShardId?: string;
  /** The maximum number of shards to return in a single call. The default value is 100. If you specify a value greater than 100, at most 100 results are returned. */
  Limit?: number;
  /** The ARN of the stream. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The name of the stream to describe. */
  StreamName?: string;
}

export interface DescribeStreamConsumerInput {
  /** The ARN returned by Kinesis Data Streams when you registered the consumer. */
  ConsumerARN?: string;
  /** The name that you gave to the consumer. */
  ConsumerName?: string;
  /** The ARN of the Kinesis data stream that the consumer is registered with. For more information, see Amazon Resource Names (ARNs) and Amazon Web Services Service Namespaces. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
}

export interface DescribeStreamSummaryInput {
  /** The ARN of the stream. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The name of the stream to describe. */
  StreamName?: string;
}

/** Represents the input for DisableEnhancedMonitoring. */
export interface DisableEnhancedMonitoringInput {
  /** List of shard-level metrics to disable. The following are the valid shard-level metrics. The value "ALL" disables every metric. IncomingBytes IncomingRecords OutgoingBytes OutgoingRecords WriteProvisi */
  ShardLevelMetrics: 'IncomingBytes' | 'IncomingRecords' | 'OutgoingBytes' | 'OutgoingRecords' | 'WriteProvisionedThroughputExceeded' | 'ReadProvisionedThroughputExceeded' | 'IteratorAgeMilliseconds' | 'ALL'[];
  /** The ARN of the stream. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The name of the Kinesis data stream for which to disable enhanced monitoring. */
  StreamName?: string;
}

/** Represents the input for EnableEnhancedMonitoring. */
export interface EnableEnhancedMonitoringInput {
  /** List of shard-level metrics to enable. The following are the valid shard-level metrics. The value "ALL" enables every metric. IncomingBytes IncomingRecords OutgoingBytes OutgoingRecords WriteProvision */
  ShardLevelMetrics: 'IncomingBytes' | 'IncomingRecords' | 'OutgoingBytes' | 'OutgoingRecords' | 'WriteProvisionedThroughputExceeded' | 'ReadProvisionedThroughputExceeded' | 'IteratorAgeMilliseconds' | 'ALL'[];
  /** The ARN of the stream. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The name of the stream for which to enable enhanced monitoring. */
  StreamName?: string;
}

/** Represents the input for GetRecords. */
export interface GetRecordsInput {
  /** The position in the shard from which you want to start sequentially reading data records. A shard iterator specifies this position using the sequence number of a data record in the shard. */
  ShardIterator: string;
  /** The maximum number of records to return. Specify a value of up to 10,000. If you specify a value that is greater than 10,000, GetRecords throws InvalidArgumentException. The default value is 10,000. */
  Limit?: number;
  /** The ARN of the stream. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
}

export interface GetResourcePolicyInput {
  /** The Amazon Resource Name (ARN) of the data stream or consumer. */
  ResourceARN: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
}

/** Represents the input for GetShardIterator. */
export interface GetShardIteratorInput {
  /** The shard ID of the Kinesis Data Streams shard to get the iterator for. */
  ShardId: string;
  /** Determines how the shard iterator is used to start reading data records from the shard. The following are the valid Amazon Kinesis shard iterator types: AT_SEQUENCE_NUMBER - Start reading from the pos */
  ShardIteratorType: 'AT_SEQUENCE_NUMBER' | 'AFTER_SEQUENCE_NUMBER' | 'TRIM_HORIZON' | 'LATEST' | 'AT_TIMESTAMP';
  /** The sequence number of the data record in the shard from which to start reading. Used with shard iterator type AT_SEQUENCE_NUMBER and AFTER_SEQUENCE_NUMBER. */
  StartingSequenceNumber?: string;
  /** The ARN of the stream. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The name of the Amazon Kinesis data stream. */
  StreamName?: string;
  /** The time stamp of the data record from which to start reading. Used with shard iterator type AT_TIMESTAMP. A time stamp is the Unix epoch date with precision in milliseconds. For example, 2016-04-04T1 */
  Timestamp?: string;
}

/** Represents the input for IncreaseStreamRetentionPeriod. */
export interface IncreaseStreamRetentionPeriodInput {
  /** The new retention period of the stream, in hours. Must be more than the current retention period. */
  RetentionPeriodHours: number;
  /** The ARN of the stream. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The name of the stream to modify. */
  StreamName?: string;
}

export interface ListShardsInput {
  /** Specify this parameter to indicate that you want to list the shards starting with the shard whose ID immediately follows ExclusiveStartShardId. If you don't specify this parameter, the default behavio */
  ExclusiveStartShardId?: string;
  /** The maximum number of shards to return in a single call to ListShards. The maximum number of shards to return in a single call. The default value is 1000. If you specify a value greater than 1000, at  */
  MaxResults?: number;
  /** When the number of shards in the data stream is greater than the default value for the MaxResults parameter, or if you explicitly specify a value for MaxResults that is less than the number of shards  */
  NextToken?: string;
  /** Enables you to filter out the response of the ListShards API. You can only specify one filter at a time. If you use the ShardFilter parameter when invoking the ListShards API, the Type is the required */
  ShardFilter?: ShardFilter;
  /** The ARN of the stream. */
  StreamARN?: string;
  /** Specify this input parameter to distinguish data streams that have the same name. For example, if you create a data stream and then delete it, and you later create another data stream with the same na */
  StreamCreationTimestamp?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The name of the data stream whose shards you want to list. You cannot specify this parameter if you specify the NextToken parameter. */
  StreamName?: string;
}

export interface ListStreamConsumersInput {
  /** The ARN of the Kinesis data stream for which you want to list the registered consumers. For more information, see Amazon Resource Names (ARNs) and Amazon Web Services Service Namespaces. */
  StreamARN: string;
  /** The maximum number of consumers that you want a single call of ListStreamConsumers to return. The default value is 100. If you specify a value greater than 100, at most 100 results are returned. */
  MaxResults?: number;
  /** When the number of consumers that are registered with the data stream is greater than the default value for the MaxResults parameter, or if you explicitly specify a value for MaxResults that is less t */
  NextToken?: string;
  /** Specify this input parameter to distinguish data streams that have the same name. For example, if you create a data stream and then delete it, and you later create another data stream with the same na */
  StreamCreationTimestamp?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
}

/** Represents the input for ListStreams. */
export interface ListStreamsInput {
  /** The name of the stream to start the list with. */
  ExclusiveStartStreamName?: string;
  /** The maximum number of streams to list. The default value is 100. If you specify a value greater than 100, at most 100 results are returned. */
  Limit?: number;
  NextToken?: string;
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) of the Kinesis resource for which to list tags. */
  ResourceARN: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
}

/** Represents the input for ListTagsForStream. */
export interface ListTagsForStreamInput {
  /** The key to use as the starting point for the list of tags. If this parameter is set, ListTagsForStream gets all tags that occur after ExclusiveStartTagKey. */
  ExclusiveStartTagKey?: string;
  /** The number of tags to return. If this number is less than the total number of tags associated with the stream, HasMoreTags is set to true. To list additional tags, set ExclusiveStartTagKey to the last */
  Limit?: number;
  /** The ARN of the stream. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The name of the stream. */
  StreamName?: string;
}

/** Represents the input for MergeShards. */
export interface MergeShardsInput {
  /** The shard ID of the adjacent shard for the merge. */
  AdjacentShardToMerge: string;
  /** The shard ID of the shard to combine with the adjacent shard for the merge. */
  ShardToMerge: string;
  /** The ARN of the stream. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The name of the stream for the merge. */
  StreamName?: string;
}

/** Represents the input for PutRecord. */
export interface PutRecordInput {
  /** The data blob to put into the record, which is base64-encoded when the blob is serialized. When the data blob (the payload before base64-encoding) is added to the partition key size, the total size mu */
  Data: string;
  /** Determines which shard in the stream the data record is assigned to. Partition keys are Unicode strings with a maximum length limit of 256 characters for each key. Amazon Kinesis Data Streams uses the */
  PartitionKey: string;
  /** The hash value used to explicitly determine the shard the data record is assigned to by overriding the partition key hash. */
  ExplicitHashKey?: string;
  /** Guarantees strictly increasing sequence numbers, for puts from the same client and to the same partition key. Usage: set the SequenceNumberForOrdering of record n to the sequence number of record n-1  */
  SequenceNumberForOrdering?: string;
  /** The ARN of the stream. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The name of the stream to put the data record into. */
  StreamName?: string;
}

/** A PutRecords request. */
export interface PutRecordsInput {
  /** The records associated with the request. */
  Records: PutRecordsRequestEntry[];
  /** The ARN of the stream. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The stream name associated with the request. */
  StreamName?: string;
}

export interface PutResourcePolicyInput {
  /** Details of the resource policy. It must include the identity of the principal and the actions allowed on this resource. This is formatted as a JSON string. */
  Policy: string;
  /** The Amazon Resource Name (ARN) of the data stream or consumer. */
  ResourceARN: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
}

export interface RegisterStreamConsumerInput {
  /** For a given Kinesis data stream, each consumer must have a unique name. However, consumer names don't have to be unique across data streams. */
  ConsumerName: string;
  /** The ARN of the Kinesis data stream that you want to register the consumer with. For more info, see Amazon Resource Names (ARNs) and Amazon Web Services Service Namespaces. */
  StreamARN: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** A set of up to 50 key-value pairs. A tag consists of a required key and an optional value. */
  Tags?: Record<string, string>;
}

/** Represents the input for RemoveTagsFromStream. */
export interface RemoveTagsFromStreamInput {
  /** A list of tag keys. Each corresponding tag is removed from the stream. */
  TagKeys: string[];
  /** The ARN of the stream. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The name of the stream. */
  StreamName?: string;
}

/** Represents the input for SplitShard. */
export interface SplitShardInput {
  /** A hash key value for the starting hash key of one of the child shards created by the split. The hash key range for a given shard constitutes a set of ordered contiguous positive integers. The value fo */
  NewStartingHashKey: string;
  /** The shard ID of the shard to split. */
  ShardToSplit: string;
  /** The ARN of the stream. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The name of the stream for the shard split. */
  StreamName?: string;
}

export interface StartStreamEncryptionInput {
  /** The encryption type to use. The only valid value is KMS. */
  EncryptionType: 'NONE' | 'KMS';
  /** The GUID for the customer-managed Amazon Web Services KMS key to use for encryption. This value can be a globally unique identifier, a fully specified Amazon Resource Name (ARN) to either an alias or  */
  KeyId: string;
  /** The ARN of the stream. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The name of the stream for which to start encrypting records. */
  StreamName?: string;
}

export interface StopStreamEncryptionInput {
  /** The encryption type. The only valid value is KMS. */
  EncryptionType: 'NONE' | 'KMS';
  /** The GUID for the customer-managed Amazon Web Services KMS key to use for encryption. This value can be a globally unique identifier, a fully specified Amazon Resource Name (ARN) to either an alias or  */
  KeyId: string;
  /** The ARN of the stream. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The name of the stream on which to stop encrypting records. */
  StreamName?: string;
}

export interface SubscribeToShardInput {
  /** For this parameter, use the value you obtained when you called RegisterStreamConsumer. */
  ConsumerARN: string;
  /** The ID of the shard you want to subscribe to. To see a list of all the shards for a given stream, use ListShards. */
  ShardId: string;
  /** The starting position in the data stream from which to start streaming. */
  StartingPosition: StartingPosition;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
}

export interface TagResourceInput {
  /** The Amazon Resource Name (ARN) of the Kinesis resource to which to add tags. */
  ResourceARN: string;
  /** An array of tags to be added to the Kinesis resource. A tag consists of a required key and an optional value. You can add up to 50 tags per resource. Tags may only contain Unicode letters, digits, whi */
  Tags: Record<string, string>;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
}

export interface UntagResourceInput {
  /** The Amazon Resource Name (ARN) of the Kinesis resource from which to remove tags. */
  ResourceARN: string;
  /** A list of tag key-value pairs. Existing tags of the resource whose keys are members of this list will be removed from the Kinesis resource. */
  TagKeys: string[];
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
}

export interface UpdateAccountSettingsInput {
  /** Specifies the minimum throughput billing commitment configuration for your account. */
  MinimumThroughputBillingCommitment: MinimumThroughputBillingCommitmentInput;
}

export interface UpdateMaxRecordSizeInput {
  /** The maximum record size of a single record in KiB that you can write to, and read from a stream. Specify a value between 1024 and 10240 KiB (1 to 10 MiB). If you specify a value that is out of this ra */
  MaxRecordSizeInKiB: number;
  /** The Amazon Resource Name (ARN) of the stream for the MaxRecordSize update. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
}

export interface UpdateShardCountInput {
  /** The scaling type. Uniform scaling creates shards of equal size. */
  ScalingType: 'UNIFORM_SCALING';
  /** The new number of shards. This value has the following default limits. By default, you cannot do the following: Set this value to more than double your current shard count for a stream. Set this value */
  TargetShardCount: number;
  /** The ARN of the stream. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The name of the stream. */
  StreamName?: string;
}

export interface UpdateStreamModeInput {
  /** Specifies the ARN of the data stream whose capacity mode you want to update. */
  StreamARN: string;
  /** Specifies the capacity mode to which you want to set your data stream. Currently, in Kinesis Data Streams, you can choose between an on-demand capacity mode and a provisioned capacity mode for your da */
  StreamModeDetails: StreamModeDetails;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The target warm throughput in MB/s that the stream should be scaled to handle. This represents the throughput capacity that will be immediately available for write operations. This field is only valid */
  WarmThroughputMiBps?: number;
}

export interface UpdateStreamWarmThroughputInput {
  /** The target warm throughput in MB/s that the stream should be scaled to handle. This represents the throughput capacity that will be immediately available for write operations. */
  WarmThroughputMiBps: number;
  /** The ARN of the stream to be updated. */
  StreamARN?: string;
  /** Not Implemented. Reserved for future use. */
  StreamId?: string;
  /** The name of the stream to be updated. */
  StreamName?: string;
}

/** Kinesis service binding for Step Functions SDK integrations. */
export class Kinesis {
  constructor() {}

  addTagsToStream<T>(params: AddTagsToStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createStream<T>(params: CreateStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  decreaseStreamRetentionPeriod<T>(params: DecreaseStreamRetentionPeriodInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteResourcePolicy<T>(params: DeleteResourcePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteStream<T>(params: DeleteStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deregisterStreamConsumer<T>(params: DeregisterStreamConsumerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAccountSettings<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeLimits<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStream<T>(params: DescribeStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStreamConsumer<T>(params: DescribeStreamConsumerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStreamSummary<T>(params: DescribeStreamSummaryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableEnhancedMonitoring<T>(params: DisableEnhancedMonitoringInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableEnhancedMonitoring<T>(params: EnableEnhancedMonitoringInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRecords<T>(params: GetRecordsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getResourcePolicy<T>(params: GetResourcePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getShardIterator<T>(params: GetShardIteratorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  increaseStreamRetentionPeriod<T>(params: IncreaseStreamRetentionPeriodInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listShards<T>(params: ListShardsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStreamConsumers<T>(params: ListStreamConsumersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStreams<T>(params: ListStreamsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForStream<T>(params: ListTagsForStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  mergeShards<T>(params: MergeShardsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putRecord<T>(params: PutRecordInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putRecords<T>(params: PutRecordsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putResourcePolicy<T>(params: PutResourcePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  registerStreamConsumer<T>(params: RegisterStreamConsumerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeTagsFromStream<T>(params: RemoveTagsFromStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  splitShard<T>(params: SplitShardInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startStreamEncryption<T>(params: StartStreamEncryptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopStreamEncryption<T>(params: StopStreamEncryptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  subscribeToShard<T>(params: SubscribeToShardInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateAccountSettings<T>(params: UpdateAccountSettingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateMaxRecordSize<T>(params: UpdateMaxRecordSizeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateShardCount<T>(params: UpdateShardCountInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateStreamMode<T>(params: UpdateStreamModeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateStreamWarmThroughput<T>(params: UpdateStreamWarmThroughputInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
