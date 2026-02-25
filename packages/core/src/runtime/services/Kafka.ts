// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface StorageInfo {
  /** EBS volume information. */
  EbsStorageInfo?: any;
}

export interface ConnectivityInfo {
  /** Public access control for brokers. */
  PublicAccess?: any;
  /** VPC connectivity access control for brokers. */
  VpcConnectivity?: any;
  /** The network type of the cluster, which is IPv4 or DUAL. The DUAL network type uses both IPv4 and IPv6 addresses for your cluster and its resources.By default, a cluster uses the IPv4 network type. */
  NetworkType?: 'IPV4' | 'DUAL';
}

export interface BrokerNodeGroupInfo {
  /** The distribution of broker nodes across Availability Zones. This is an optional parameter. If you don't specify it, Amazon MSK gives it the value DEFAULT. You can also explicitly set this parameter to */
  BrokerAZDistribution?: 'DEFAULT';
  /** The list of subnets to connect to in the client virtual private cloud (VPC). AWS creates elastic network interfaces inside these subnets. Client applications use elastic network interfaces to produce  */
  ClientSubnets: string[];
  /** The type of Amazon EC2 instances to use for Apache Kafka brokers. The following instance types are allowed: kafka.m5.large, kafka.m5.xlarge, kafka.m5.2xlarge, kafka.m5.4xlarge, kafka.m5.12xlarge, and  */
  InstanceType: string;
  /** The AWS security groups to associate with the elastic network interfaces in order to specify who can connect to and communicate with the Amazon MSK cluster. If you don't specify a security group, Amaz */
  SecurityGroups?: string[];
  /** Contains information about storage volumes attached to MSK broker nodes. */
  StorageInfo?: StorageInfo;
  /** Information about the broker access configuration. */
  ConnectivityInfo?: ConnectivityInfo;
  /** The list of zoneIds for the cluster in the virtual private cloud (VPC). */
  ZoneIds?: string[];
}

export interface Rebalancing {
  /** Intelligent rebalancing status. The default intelligent rebalancing status is ACTIVE for all new Express-based clusters. */
  Status?: 'PAUSED' | 'ACTIVE';
}

export interface Sasl {
  /** Details for SASL/SCRAM client authentication. */
  Scram?: any;
  /** Indicates whether IAM access control is enabled. */
  Iam?: any;
}

export interface Tls {
  /** List of ACM Certificate Authority ARNs. */
  CertificateAuthorityArnList?: any[];
  /** Specifies whether you want to turn on or turn off TLS authentication. */
  Enabled?: boolean;
}

export interface Unauthenticated {
  /** Specifies whether you want to turn on or turn off unauthenticated traffic to your cluster. */
  Enabled?: boolean;
}

export interface ClientAuthentication {
  /** Details for ClientAuthentication using SASL. */
  Sasl?: Sasl;
  /** Details for ClientAuthentication using TLS. */
  Tls?: Tls;
  /** Contains information about unauthenticated traffic to the cluster. */
  Unauthenticated?: Unauthenticated;
}

export interface ConfigurationInfo {
  /** ARN of the configuration to use. */
  Arn: string;
  /** The revision of the configuration to use. */
  Revision: number;
}

export interface EncryptionAtRest {
  /** The ARN of the AWS KMS key for encrypting data at rest. If you don't specify a KMS key, MSK creates one for you and uses it. */
  DataVolumeKMSKeyId: string;
}

export interface EncryptionInTransit {
  /** Indicates the encryption setting for data in transit between clients and brokers. The following are the possible values. TLS means that client-broker communication is enabled with TLS only. TLS_PLAINT */
  ClientBroker?: 'TLS' | 'TLS_PLAINTEXT' | 'PLAINTEXT';
  /** When set to true, it indicates that data communication among the broker nodes of the cluster is encrypted. When set to false, the communication happens in plaintext. The default value is true. */
  InCluster?: boolean;
}

export interface EncryptionInfo {
  /** The data-volume encryption details. */
  EncryptionAtRest?: EncryptionAtRest;
  /** The details for encryption in transit. */
  EncryptionInTransit?: EncryptionInTransit;
}

export interface PrometheusInfo {
  /** Indicates whether you want to turn on or turn off the JMX Exporter. */
  JmxExporter?: any;
  /** Indicates whether you want to turn on or turn off the Node Exporter. */
  NodeExporter?: any;
}

export interface OpenMonitoringInfo {
  /** Prometheus settings. */
  Prometheus: PrometheusInfo;
}

export interface BrokerLogs {
  CloudWatchLogs?: any;
  Firehose?: any;
  S3?: any;
}

export interface LoggingInfo {
  BrokerLogs: BrokerLogs;
}

export interface ProvisionedRequest {
  /** Information about the brokers. */
  BrokerNodeGroupInfo: BrokerNodeGroupInfo;
  /** Specifies if intelligent rebalancing is turned on for your MSK Provisioned cluster with Express brokers. For all new Express-based clusters that you create, intelligent rebalancing is turned on by def */
  Rebalancing?: Rebalancing;
  /** Includes all client authentication information. */
  ClientAuthentication?: ClientAuthentication;
  /** Represents the configuration that you want Amazon MSK to use for the brokers in a cluster. */
  ConfigurationInfo?: ConfigurationInfo;
  /** Includes all encryption-related information. */
  EncryptionInfo?: EncryptionInfo;
  /** Specifies the level of monitoring for the MSK cluster. The possible values are DEFAULT, PER_BROKER, PER_TOPIC_PER_BROKER, and PER_TOPIC_PER_PARTITION. */
  EnhancedMonitoring?: 'DEFAULT' | 'PER_BROKER' | 'PER_TOPIC_PER_BROKER' | 'PER_TOPIC_PER_PARTITION';
  /** The settings for open monitoring. */
  OpenMonitoring?: OpenMonitoringInfo;
  /** The Apache Kafka version that you want for the cluster. */
  KafkaVersion: string;
  /** Log delivery information for the cluster. */
  LoggingInfo?: LoggingInfo;
  /** The number of broker nodes in the cluster. */
  NumberOfBrokerNodes: number;
  /** This controls storage mode for supported storage tiers. */
  StorageMode?: 'LOCAL' | 'TIERED';
}

export interface ServerlessClientAuthentication {
  /** Details for ClientAuthentication using SASL. */
  Sasl?: any;
}

export interface ServerlessRequest {
  /** The configuration of the Amazon VPCs for the cluster. */
  VpcConfigs: any[];
  /** Includes all client authentication information. */
  ClientAuthentication?: ServerlessClientAuthentication;
}

export interface KafkaCluster {
  /** Details of an Amazon MSK Cluster. */
  AmazonMskCluster: any;
  /** Details of an Amazon VPC which has network connectivity to the Apache Kafka cluster. */
  VpcConfig: any;
}

export interface ReplicationInfo {
  /** Configuration relating to consumer group replication. */
  ConsumerGroupReplication: any;
  /** The ARN of the source Kafka cluster. */
  SourceKafkaClusterArn: string;
  /** The compression type to use when producing records to target cluster. */
  TargetCompressionType: 'NONE' | 'GZIP' | 'SNAPPY' | 'LZ4' | 'ZSTD';
  /** The ARN of the target Kafka cluster. */
  TargetKafkaClusterArn: string;
  /** Configuration relating to topic replication. */
  TopicReplication: any;
}

export interface BrokerEBSVolumeInfo {
  /** The ID of the broker to update. */
  KafkaBrokerNodeId: string;
  /** EBS volume provisioned throughput information. */
  ProvisionedThroughput?: any;
  /** Size of the EBS volume to update. */
  VolumeSizeGB?: number;
}

export interface ConsumerGroupReplicationUpdate {
  /** List of regular expression patterns indicating the consumer groups that should not be replicated. */
  ConsumerGroupsToExclude: string[];
  /** List of regular expression patterns indicating the consumer groups to copy. */
  ConsumerGroupsToReplicate: string[];
  /** Enables synchronization of consumer groups to target cluster. */
  DetectAndCopyNewConsumerGroups: boolean;
  /** Enables synchronization of consumer group offsets to target cluster. The translated offsets will be written to topic __consumer_offsets. */
  SynchroniseConsumerGroupOffsets: boolean;
}

export interface TopicReplicationUpdate {
  /** Whether to periodically configure remote topic ACLs to match their corresponding upstream topics. */
  CopyAccessControlListsForTopics: boolean;
  /** Whether to periodically configure remote topics to match their corresponding upstream topics. */
  CopyTopicConfigurations: boolean;
  /** Whether to periodically check for new topics and partitions. */
  DetectAndCopyNewTopics: boolean;
  /** List of regular expression patterns indicating the topics that should not be replicated. */
  TopicsToExclude: string[];
  /** List of regular expression patterns indicating the topics to copy. */
  TopicsToReplicate: string[];
}

export interface ProvisionedThroughput {
  /** Provisioned throughput is enabled or not. */
  Enabled?: boolean;
  /** Throughput value of the EBS volumes for the data drive on each kafka broker node in MiB per second. */
  VolumeThroughput?: number;
}

/** Associates sasl scram secrets to cluster. */
export interface BatchAssociateScramSecretInput {
  /** The Amazon Resource Name (ARN) of the cluster to be updated. */
  ClusterArn: string;
  /** List of AWS Secrets Manager secret ARNs. */
  SecretArnList: string[];
}

/** Disassociates sasl scram secrets to cluster. */
export interface BatchDisassociateScramSecretInput {
  /** The Amazon Resource Name (ARN) of the cluster to be updated. */
  ClusterArn: string;
  /** List of AWS Secrets Manager secret ARNs. */
  SecretArnList: string[];
}

export interface CreateClusterInput {
  /** Information about the broker nodes in the cluster. */
  BrokerNodeGroupInfo: BrokerNodeGroupInfo;
  /** The name of the cluster. */
  ClusterName: string;
  /** The version of Apache Kafka. */
  KafkaVersion: string;
  /** The number of broker nodes in the cluster. */
  NumberOfBrokerNodes: number;
  /** Includes all client authentication related information. */
  ClientAuthentication?: ClientAuthentication;
  /** Represents the configuration that you want MSK to use for the brokers in a cluster. */
  ConfigurationInfo?: ConfigurationInfo;
  /** Includes all encryption-related information. */
  EncryptionInfo?: EncryptionInfo;
  /** Specifies the level of monitoring for the MSK cluster. The possible values are DEFAULT, PER_BROKER, PER_TOPIC_PER_BROKER, and PER_TOPIC_PER_PARTITION. */
  EnhancedMonitoring?: 'DEFAULT' | 'PER_BROKER' | 'PER_TOPIC_PER_BROKER' | 'PER_TOPIC_PER_PARTITION';
  LoggingInfo?: LoggingInfo;
  /** The settings for open monitoring. */
  OpenMonitoring?: OpenMonitoringInfo;
  /** Specifies if intelligent rebalancing should be turned on for the new MSK Provisioned cluster with Express brokers. By default, intelligent rebalancing status is ACTIVE for all new clusters. */
  Rebalancing?: Rebalancing;
  /** This controls storage mode for supported storage tiers. */
  StorageMode?: 'LOCAL' | 'TIERED';
  /** Create tags when creating the cluster. */
  Tags?: Record<string, string>;
}

export interface CreateClusterV2Input {
  /** The name of the cluster. */
  ClusterName: string;
  /** Information about the provisioned cluster. */
  Provisioned?: ProvisionedRequest;
  /** Information about the serverless cluster. */
  Serverless?: ServerlessRequest;
  /** A map of tags that you want the cluster to have. */
  Tags?: Record<string, string>;
}

export interface CreateConfigurationInput {
  /** The name of the configuration. */
  Name: string;
  /** Contents of the server.properties file. When using the API, you must ensure that the contents of the file are base64 encoded. When using the AWS Management Console, the SDK, or the AWS CLI, the conten */
  ServerProperties: string;
  /** The description of the configuration. */
  Description?: string;
  /** The versions of Apache Kafka with which you can use this MSK configuration. */
  KafkaVersions?: string[];
}

/** Creates a replicator using the specified configuration. */
export interface CreateReplicatorInput {
  /** Kafka Clusters to use in setting up sources / targets for replication. */
  KafkaClusters: KafkaCluster[];
  /** A list of replication configurations, where each configuration targets a given source cluster to target cluster replication flow. */
  ReplicationInfoList: ReplicationInfo[];
  /** The name of the replicator. Alpha-numeric characters with '-' are allowed. */
  ReplicatorName: string;
  /** The ARN of the IAM role used by the replicator to access resources in the customer's account (e.g source and target clusters) */
  ServiceExecutionRoleArn: string;
  /** A summary description of the replicator. */
  Description?: string;
  /** List of tags to attach to created Replicator. */
  Tags?: Record<string, string>;
}

export interface CreateTopicInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the cluster. */
  ClusterArn: string;
  /** The number of partitions for the topic. */
  PartitionCount: number;
  /** The replication factor for the topic. */
  ReplicationFactor: number;
  /** The name of the topic to create. */
  TopicName: string;
  /** Topic configurations encoded as a Base64 string. */
  Configs?: string;
}

export interface CreateVpcConnectionInput {
  /** The authentication type of VPC connection. */
  Authentication: string;
  /** The list of client subnets. */
  ClientSubnets: string[];
  /** The list of security groups. */
  SecurityGroups: string[];
  /** The cluster Amazon Resource Name (ARN) for the VPC connection. */
  TargetClusterArn: string;
  /** The VPC ID of VPC connection. */
  VpcId: string;
  /** A map of tags for the VPC connection. */
  Tags?: Record<string, string>;
}

export interface DeleteClusterInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the cluster. */
  ClusterArn: string;
  /** The current version of the MSK cluster. */
  CurrentVersion?: string;
}

export interface DeleteClusterPolicyInput {
  /** The Amazon Resource Name (ARN) of the cluster. */
  ClusterArn: string;
}

export interface DeleteConfigurationInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies an MSK configuration. */
  Arn: string;
}

export interface DeleteReplicatorInput {
  /** The Amazon Resource Name (ARN) of the replicator to be deleted. */
  ReplicatorArn: string;
  /** The current version of the replicator. */
  CurrentVersion?: string;
}

export interface DeleteTopicInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the cluster. */
  ClusterArn: string;
  /** The name of the topic to delete. */
  TopicName: string;
}

export interface DeleteVpcConnectionInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies an MSK VPC connection. */
  Arn: string;
}

export interface DescribeClusterInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the cluster. */
  ClusterArn: string;
}

export interface DescribeClusterOperationInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the MSK cluster operation. */
  ClusterOperationArn: string;
}

export interface DescribeClusterOperationV2Input {
  /** ARN of the cluster operation to describe. */
  ClusterOperationArn: string;
}

export interface DescribeClusterV2Input {
  /** The Amazon Resource Name (ARN) that uniquely identifies the cluster. */
  ClusterArn: string;
}

export interface DescribeConfigurationInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies an MSK configuration and all of its revisions. */
  Arn: string;
}

export interface DescribeConfigurationRevisionInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies an MSK configuration and all of its revisions. */
  Arn: string;
  /** A string that uniquely identifies a revision of an MSK configuration. */
  Revision: number;
}

export interface DescribeReplicatorInput {
  /** The Amazon Resource Name (ARN) of the replicator to be described. */
  ReplicatorArn: string;
}

export interface DescribeTopicInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the cluster. */
  ClusterArn: string;
  /** The Kafka topic name that uniquely identifies the topic. */
  TopicName: string;
}

export interface DescribeTopicPartitionsInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the cluster. */
  ClusterArn: string;
  /** The Kafka topic name that uniquely identifies the topic. */
  TopicName: string;
  /** The maximum number of results to return in the response. If there are more results, the response includes a NextToken parameter. */
  MaxResults?: number;
  /** The paginated results marker. When the result of the operation is truncated, the call returns NextToken in the response. To get the next batch, provide this token in your next request. */
  NextToken?: string;
}

export interface DescribeVpcConnectionInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies a MSK VPC connection. */
  Arn: string;
}

export interface GetBootstrapBrokersInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the cluster. */
  ClusterArn: string;
}

export interface GetClusterPolicyInput {
  /** The Amazon Resource Name (ARN) of the cluster. */
  ClusterArn: string;
}

export interface GetCompatibleKafkaVersionsInput {
  /** The Amazon Resource Name (ARN) of the cluster check. */
  ClusterArn?: string;
}

export interface ListClientVpcConnectionsInput {
  /** The Amazon Resource Name (ARN) of the cluster. */
  ClusterArn: string;
  /** The maximum number of results to return in the response. If there are more results, the response includes a NextToken parameter. */
  MaxResults?: number;
  /** The paginated results marker. When the result of the operation is truncated, the call returns NextToken in the response. To get the next batch, provide this token in your next request. */
  NextToken?: string;
}

export interface ListClusterOperationsInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the cluster. */
  ClusterArn: string;
  /** The maximum number of results to return in the response. If there are more results, the response includes a NextToken parameter. */
  MaxResults?: number;
  /** The paginated results marker. When the result of the operation is truncated, the call returns NextToken in the response. To get the next batch, provide this token in your next request. */
  NextToken?: string;
}

export interface ListClusterOperationsV2Input {
  /** The arn of the cluster whose operations are being requested. */
  ClusterArn: string;
  /** The maxResults of the query. */
  MaxResults?: number;
  /** The nextToken of the query. */
  NextToken?: string;
}

export interface ListClustersInput {
  /** Specify a prefix of the name of the clusters that you want to list. The service lists all the clusters whose names start with this prefix. */
  ClusterNameFilter?: string;
  /** The maximum number of results to return in the response. If there are more results, the response includes a NextToken parameter. */
  MaxResults?: number;
  /** The paginated results marker. When the result of the operation is truncated, the call returns NextToken in the response. To get the next batch, provide this token in your next request. */
  NextToken?: string;
}

export interface ListClustersV2Input {
  /** Specify a prefix of the names of the clusters that you want to list. The service lists all the clusters whose names start with this prefix. */
  ClusterNameFilter?: string;
  /** Specify either PROVISIONED or SERVERLESS. */
  ClusterTypeFilter?: string;
  /** The maximum number of results to return in the response. If there are more results, the response includes a NextToken parameter. */
  MaxResults?: number;
  /** The paginated results marker. When the result of the operation is truncated, the call returns NextToken in the response. To get the next batch, provide this token in your next request. */
  NextToken?: string;
}

export interface ListConfigurationRevisionsInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies an MSK configuration and all of its revisions. */
  Arn: string;
  /** The maximum number of results to return in the response. If there are more results, the response includes a NextToken parameter. */
  MaxResults?: number;
  /** The paginated results marker. When the result of the operation is truncated, the call returns NextToken in the response. To get the next batch, provide this token in your next request. */
  NextToken?: string;
}

export interface ListConfigurationsInput {
  /** The maximum number of results to return in the response. If there are more results, the response includes a NextToken parameter. */
  MaxResults?: number;
  /** The paginated results marker. When the result of the operation is truncated, the call returns NextToken in the response. To get the next batch, provide this token in your next request. */
  NextToken?: string;
}

export interface ListKafkaVersionsInput {
  /** The maximum number of results to return in the response. If there are more results, the response includes a NextToken parameter. */
  MaxResults?: number;
  /** The paginated results marker. When the result of the operation is truncated, the call returns NextToken in the response. To get the next batch, provide this token in your next request. */
  NextToken?: string;
}

export interface ListNodesInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the cluster. */
  ClusterArn: string;
  /** The maximum number of results to return in the response. If there are more results, the response includes a NextToken parameter. */
  MaxResults?: number;
  /** The paginated results marker. When the result of the operation is truncated, the call returns NextToken in the response. To get the next batch, provide this token in your next request. */
  NextToken?: string;
}

export interface ListReplicatorsInput {
  /** The maximum number of results to return in the response. If there are more results, the response includes a NextToken parameter. */
  MaxResults?: number;
  /** If the response of ListReplicators is truncated, it returns a NextToken in the response. This NextToken should be sent in the subsequent request to ListReplicators. */
  NextToken?: string;
  /** Returns replicators starting with given name. */
  ReplicatorNameFilter?: string;
}

export interface ListScramSecretsInput {
  /** The arn of the cluster. */
  ClusterArn: string;
  /** The maxResults of the query. */
  MaxResults?: number;
  /** The nextToken of the query. */
  NextToken?: string;
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the resource that's associated with the tags. */
  ResourceArn: string;
}

export interface ListTopicsInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the cluster. */
  ClusterArn: string;
  /** The maximum number of results to return in the response. If there are more results, the response includes a NextToken parameter. */
  MaxResults?: number;
  /** The paginated results marker. When the result of the operation is truncated, the call returns NextToken in the response. To get the next batch, provide this token in your next request. */
  NextToken?: string;
  /** Returns topics starting with given name. */
  TopicNameFilter?: string;
}

export interface ListVpcConnectionsInput {
  /** The maximum number of results to return in the response. If there are more results, the response includes a NextToken parameter. */
  MaxResults?: number;
  /** The paginated results marker. When the result of the operation is truncated, the call returns NextToken in the response. To get the next batch, provide this token in your next request. */
  NextToken?: string;
}

export interface PutClusterPolicyInput {
  /** The Amazon Resource Name (ARN) of the cluster. */
  ClusterArn: string;
  /** The policy. */
  Policy: string;
  /** The policy version. */
  CurrentVersion?: string;
}

/** Reboots a node. */
export interface RebootBrokerInput {
  /** The list of broker IDs to be rebooted. The reboot-broker operation supports rebooting one broker at a time. */
  BrokerIds: string[];
  /** The Amazon Resource Name (ARN) of the cluster to be updated. */
  ClusterArn: string;
}

export interface RejectClientVpcConnectionInput {
  /** The Amazon Resource Name (ARN) of the cluster. */
  ClusterArn: string;
  /** The VPC connection ARN. */
  VpcConnectionArn: string;
}

export interface TagResourceInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the resource that's associated with the tags. */
  ResourceArn: string;
  /** The key-value pair for the resource tag. */
  Tags: Record<string, string>;
}

export interface UntagResourceInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the resource that's associated with the tags. */
  ResourceArn: string;
  /** Tag keys must be unique for a given cluster. In addition, the following restrictions apply: Each tag key must be unique. If you add a tag with a key that's already in use, your new tag overwrites the  */
  TagKeys: string[];
}

export interface UpdateBrokerCountInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the cluster. */
  ClusterArn: string;
  /** The version of cluster to update from. A successful operation will then generate a new version. */
  CurrentVersion: string;
  /** The number of broker nodes that you want the cluster to have after this operation completes successfully. */
  TargetNumberOfBrokerNodes: number;
}

export interface UpdateBrokerStorageInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the cluster. */
  ClusterArn: string;
  /** The version of cluster to update from. A successful operation will then generate a new version. */
  CurrentVersion: string;
  /** Describes the target volume size and the ID of the broker to apply the update to. */
  TargetBrokerEBSVolumeInfo: BrokerEBSVolumeInfo[];
}

export interface UpdateBrokerTypeInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the cluster. */
  ClusterArn: string;
  /** The cluster version that you want to change. After this operation completes successfully, the cluster will have a new version. */
  CurrentVersion: string;
  /** The Amazon MSK broker type that you want all of the brokers in this cluster to be. */
  TargetInstanceType: string;
}

export interface UpdateClusterConfigurationInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the cluster. */
  ClusterArn: string;
  /** Represents the configuration that you want MSK to use for the brokers in a cluster. */
  ConfigurationInfo: ConfigurationInfo;
  /** The version of the cluster that needs to be updated. */
  CurrentVersion: string;
}

export interface UpdateClusterKafkaVersionInput {
  /** The Amazon Resource Name (ARN) of the cluster to be updated. */
  ClusterArn: string;
  /** Current cluster version. */
  CurrentVersion: string;
  /** Target Kafka version. */
  TargetKafkaVersion: string;
  /** The custom configuration that should be applied on the new version of cluster. */
  ConfigurationInfo?: ConfigurationInfo;
}

export interface UpdateConfigurationInput {
  /** The Amazon Resource Name (ARN) of the configuration. */
  Arn: string;
  /** Contents of the server.properties file. When using the API, you must ensure that the contents of the file are base64 encoded. When using the AWS Management Console, the SDK, or the AWS CLI, the conten */
  ServerProperties: string;
  /** The description of the configuration revision. */
  Description?: string;
}

/** Request body for UpdateConnectivity. */
export interface UpdateConnectivityInput {
  /** The Amazon Resource Name (ARN) of the configuration. */
  ClusterArn: string;
  /** Information about the broker access configuration. */
  ConnectivityInfo: ConnectivityInfo;
  /** The version of the MSK cluster to update. Cluster versions aren't simple numbers. You can describe an MSK cluster to find its version. When this update operation is successful, it generates a new clus */
  CurrentVersion: string;
}

/** Request body for UpdateMonitoring. */
export interface UpdateMonitoringInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the cluster. */
  ClusterArn: string;
  /** The version of the MSK cluster to update. Cluster versions aren't simple numbers. You can describe an MSK cluster to find its version. When this update operation is successful, it generates a new clus */
  CurrentVersion: string;
  /** Specifies which Apache Kafka metrics Amazon MSK gathers and sends to Amazon CloudWatch for this cluster. */
  EnhancedMonitoring?: 'DEFAULT' | 'PER_BROKER' | 'PER_TOPIC_PER_BROKER' | 'PER_TOPIC_PER_PARTITION';
  LoggingInfo?: LoggingInfo;
  /** The settings for open monitoring. */
  OpenMonitoring?: OpenMonitoringInfo;
}

export interface UpdateRebalancingInput {
  /** The Amazon Resource Name (ARN) of the cluster. */
  ClusterArn: string;
  /** The current version of the cluster. */
  CurrentVersion: string;
  /** Specifies if intelligent rebalancing should be turned on for your cluster. The default intelligent rebalancing status is ACTIVE for all new MSK Provisioned clusters that you create with Express broker */
  Rebalancing: Rebalancing;
}

/** Update information relating to replication between a given source and target Kafka cluster. */
export interface UpdateReplicationInfoInput {
  /** Current replicator version. */
  CurrentVersion: string;
  /** The Amazon Resource Name (ARN) of the replicator to be updated. */
  ReplicatorArn: string;
  /** The ARN of the source Kafka cluster. */
  SourceKafkaClusterArn: string;
  /** The ARN of the target Kafka cluster. */
  TargetKafkaClusterArn: string;
  /** Updated consumer group replication information. */
  ConsumerGroupReplication?: ConsumerGroupReplicationUpdate;
  /** Updated topic replication information. */
  TopicReplication?: TopicReplicationUpdate;
}

export interface UpdateSecurityInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the cluster. */
  ClusterArn: string;
  /** The version of the MSK cluster to update. Cluster versions aren't simple numbers. You can describe an MSK cluster to find its version. When this update operation is successful, it generates a new clus */
  CurrentVersion: string;
  /** Includes all client authentication related information. */
  ClientAuthentication?: ClientAuthentication;
  /** Includes all encryption-related information. */
  EncryptionInfo?: EncryptionInfo;
}

/** Request object for UpdateStorage api. Its used to update the storage attributes for the cluster. */
export interface UpdateStorageInput {
  /** The Amazon Resource Name (ARN) of the cluster to be updated. */
  ClusterArn: string;
  /** The version of cluster to update from. A successful operation will then generate a new version. */
  CurrentVersion: string;
  /** EBS volume provisioned throughput information. */
  ProvisionedThroughput?: ProvisionedThroughput;
  /** Controls storage mode for supported storage tiers. */
  StorageMode?: 'LOCAL' | 'TIERED';
  /** size of the EBS volume to update. */
  VolumeSizeGB?: number;
}

export interface UpdateTopicInput {
  /** The Amazon Resource Name (ARN) that uniquely identifies the cluster. */
  ClusterArn: string;
  /** The name of the topic to update configuration for. */
  TopicName: string;
  /** The new topic configurations encoded as a Base64 string. */
  Configs?: string;
  /** The new total number of partitions for the topic. */
  PartitionCount?: number;
}

/** Kafka service binding for Step Functions SDK integrations. */
export class Kafka {
  constructor() {}

  batchAssociateScramSecret<T>(params: BatchAssociateScramSecretInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchDisassociateScramSecret<T>(params: BatchDisassociateScramSecretInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCluster<T>(params: CreateClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createClusterV2<T>(params: CreateClusterV2Input): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createConfiguration<T>(params: CreateConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createReplicator<T>(params: CreateReplicatorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTopic<T>(params: CreateTopicInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVpcConnection<T>(params: CreateVpcConnectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCluster<T>(params: DeleteClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteClusterPolicy<T>(params: DeleteClusterPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteConfiguration<T>(params: DeleteConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteReplicator<T>(params: DeleteReplicatorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTopic<T>(params: DeleteTopicInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVpcConnection<T>(params: DeleteVpcConnectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCluster<T>(params: DescribeClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeClusterOperation<T>(params: DescribeClusterOperationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeClusterOperationV2<T>(params: DescribeClusterOperationV2Input): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeClusterV2<T>(params: DescribeClusterV2Input): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeConfiguration<T>(params: DescribeConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeConfigurationRevision<T>(params: DescribeConfigurationRevisionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReplicator<T>(params: DescribeReplicatorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTopic<T>(params: DescribeTopicInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTopicPartitions<T>(params: DescribeTopicPartitionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVpcConnection<T>(params: DescribeVpcConnectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getBootstrapBrokers<T>(params: GetBootstrapBrokersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getClusterPolicy<T>(params: GetClusterPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCompatibleKafkaVersions<T>(params: GetCompatibleKafkaVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listClientVpcConnections<T>(params: ListClientVpcConnectionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listClusterOperations<T>(params: ListClusterOperationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listClusterOperationsV2<T>(params: ListClusterOperationsV2Input): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listClusters<T>(params: ListClustersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listClustersV2<T>(params: ListClustersV2Input): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listConfigurationRevisions<T>(params: ListConfigurationRevisionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listConfigurations<T>(params: ListConfigurationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listKafkaVersions<T>(params: ListKafkaVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listNodes<T>(params: ListNodesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listReplicators<T>(params: ListReplicatorsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listScramSecrets<T>(params: ListScramSecretsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTopics<T>(params: ListTopicsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listVpcConnections<T>(params: ListVpcConnectionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putClusterPolicy<T>(params: PutClusterPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rebootBroker<T>(params: RebootBrokerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rejectClientVpcConnection<T>(params: RejectClientVpcConnectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateBrokerCount<T>(params: UpdateBrokerCountInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateBrokerStorage<T>(params: UpdateBrokerStorageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateBrokerType<T>(params: UpdateBrokerTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateClusterConfiguration<T>(params: UpdateClusterConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateClusterKafkaVersion<T>(params: UpdateClusterKafkaVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateConfiguration<T>(params: UpdateConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateConnectivity<T>(params: UpdateConnectivityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateMonitoring<T>(params: UpdateMonitoringInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRebalancing<T>(params: UpdateRebalancingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateReplicationInfo<T>(params: UpdateReplicationInfoInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateSecurity<T>(params: UpdateSecurityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateStorage<T>(params: UpdateStorageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateTopic<T>(params: UpdateTopicInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
