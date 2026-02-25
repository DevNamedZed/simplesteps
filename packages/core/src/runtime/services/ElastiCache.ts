// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface Tag {
  /** The key for the tag. May not be null. */
  Key?: string;
  /** The tag's value. May be null. */
  Value?: string;
}

export interface LogDeliveryConfigurationRequest {
  /** Refers to slow-log or engine-log.. */
  LogType?: 'slow-log' | 'engine-log';
  /** Specify either cloudwatch-logs or kinesis-firehose as the destination type. */
  DestinationType?: 'cloudwatch-logs' | 'kinesis-firehose';
  /** Configuration details of either a CloudWatch Logs destination or Kinesis Data Firehose destination. */
  DestinationDetails?: any;
  /** Specifies either JSON or TEXT */
  LogFormat?: 'text' | 'json';
  /** Specify if log delivery is enabled. Default true. */
  Enabled?: boolean;
}

export interface NodeGroupConfiguration {
  /** Either the ElastiCache supplied 4-digit id or a user supplied id for the node group these configuration values apply to. */
  NodeGroupId?: string;
  /** A string that specifies the keyspace for a particular node group. Keyspaces range from 0 to 16,383. The string is in the format startkey-endkey. Example: "0-3999" */
  Slots?: string;
  /** The number of read replica nodes in this node group (shard). */
  ReplicaCount?: number;
  /** The Availability Zone where the primary node of this node group (shard) is launched. */
  PrimaryAvailabilityZone?: string;
  /** A list of Availability Zones to be used for the read replicas. The number of Availability Zones in this list must match the value of ReplicaCount or ReplicasPerNodeGroup if not specified. */
  ReplicaAvailabilityZones?: any[];
  /** The outpost ARN of the primary node. */
  PrimaryOutpostArn?: string;
  /** The outpost ARN of the node replicas. */
  ReplicaOutpostArns?: any[];
}

export interface DataStorage {
  /** The upper limit for data storage the cache is set to use. */
  Maximum?: number;
  /** The lower limit for data storage the cache is set to use. */
  Minimum?: number;
  /** The unit that the storage is measured in, in GB. */
  Unit: 'GB';
}

export interface ECPUPerSecond {
  /** The configuration for the maximum number of ECPUs the cache can consume per second. */
  Maximum?: number;
  /** The configuration for the minimum number of ECPUs the cache should be able consume per second. */
  Minimum?: number;
}

export interface CacheUsageLimits {
  /** The maximum data storage limit in the cache, expressed in Gigabytes. */
  DataStorage?: DataStorage;
  ECPUPerSecond?: ECPUPerSecond;
}

export interface AuthenticationMode {
  /** Specifies the authentication type. Possible options are IAM authentication, password and no password. */
  Type?: 'password' | 'no-password-required' | 'iam';
  /** Specifies the passwords to use for authentication if Type is set to password. */
  Passwords?: string[];
}

export interface ConfigureShard {
  /** The 4-digit id for the node group you are configuring. For Valkey or Redis OSS (cluster mode disabled) replication groups, the node group id is always 0001. To find a Valkey or Redis OSS (cluster mode */
  NodeGroupId: string;
  /** The number of replicas you want in this node group at the end of this operation. The maximum value for NewReplicaCount is 5. The minimum value depends upon the type of Valkey or Redis OSS replication  */
  NewReplicaCount: number;
  /** A list of PreferredAvailabilityZone strings that specify which availability zones the replication group's nodes are to be in. The nummber of PreferredAvailabilityZone values must equal the value of Ne */
  PreferredAvailabilityZones?: any[];
  /** The outpost ARNs in which the cache cluster is created. */
  PreferredOutpostArns?: any[];
}

export interface TimeRangeFilter {
  /** The start time of the time range filter */
  StartTime?: string;
  /** The end time of the time range filter */
  EndTime?: string;
}

export interface Filter {
  /** The property being filtered. For example, UserId. */
  Name: string;
  /** The property values to filter on. For example, "user-123". */
  Values: any[];
}

export interface RegionalConfiguration {
  /** The name of the secondary cluster */
  ReplicationGroupId: string;
  /** The Amazon region where the cluster is stored */
  ReplicationGroupRegion: string;
  /** A list of PreferredAvailabilityZones objects that specifies the configuration of a node group in the resharded cluster. */
  ReshardingConfiguration: any[];
}

export interface ScaleConfig {
  /** The percentage by which to scale the Memcached cluster, either horizontally by adding nodes or vertically by increasing resources. */
  ScalePercentage?: number;
  /** The time interval in seconds between scaling operations when performing gradual scaling for a Memcached cluster. */
  ScaleIntervalMinutes?: number;
}

export interface ParameterNameValue {
  /** The name of the parameter. */
  ParameterName?: string;
  /** The value of the parameter. */
  ParameterValue?: string;
}

export interface ReshardingConfiguration {
  /** Either the ElastiCache supplied 4-digit id or a user supplied id for the node group these configuration values apply to. */
  NodeGroupId?: string;
  /** A list of preferred availability zones for the nodes in this cluster. */
  PreferredAvailabilityZones?: any[];
}

export interface CustomerNodeEndpoint {
  /** The address of the node endpoint */
  Address?: string;
  /** The port of the node endpoint */
  Port?: number;
}

/** Represents the input of an AddTagsToResource operation. */
export interface AddTagsToResourceInput {
  /** The Amazon Resource Name (ARN) of the resource to which the tags are to be added, for example arn:aws:elasticache:us-west-2:0123456789:cluster:myCluster or arn:aws:elasticache:us-west-2:0123456789:sna */
  ResourceName: string;
  /** A list of tags to be added to this resource. A tag is a key-value pair. A tag key must be accompanied by a tag value, although null is accepted. */
  Tags: Tag[];
}

/** Represents the input of an AuthorizeCacheSecurityGroupIngress operation. */
export interface AuthorizeCacheSecurityGroupIngressInput {
  /** The cache security group that allows network ingress. */
  CacheSecurityGroupName: string;
  /** The Amazon EC2 security group to be authorized for ingress to the cache security group. */
  EC2SecurityGroupName: string;
  /** The Amazon account number of the Amazon EC2 security group owner. Note that this is not the same thing as an Amazon access key ID - you must provide a valid Amazon account number for this parameter. */
  EC2SecurityGroupOwnerId: string;
}

export interface BatchApplyUpdateActionInput {
  /** The unique ID of the service update */
  ServiceUpdateName: string;
  /** The cache cluster IDs */
  CacheClusterIds?: string[];
  /** The replication group IDs */
  ReplicationGroupIds?: string[];
}

export interface BatchStopUpdateActionInput {
  /** The unique ID of the service update */
  ServiceUpdateName: string;
  /** The cache cluster IDs */
  CacheClusterIds?: string[];
  /** The replication group IDs */
  ReplicationGroupIds?: string[];
}

export interface CompleteMigrationInput {
  /** The ID of the replication group to which data is being migrated. */
  ReplicationGroupId: string;
  /** Forces the migration to stop without ensuring that data is in sync. It is recommended to use this option only to abort the migration and not recommended when application wants to continue migration to */
  Force?: boolean;
}

export interface CopyServerlessCacheSnapshotInput {
  /** The identifier of the existing serverless cache’s snapshot to be copied. Available for Valkey, Redis OSS and Serverless Memcached only. */
  SourceServerlessCacheSnapshotName: string;
  /** The identifier for the snapshot to be created. Available for Valkey, Redis OSS and Serverless Memcached only. */
  TargetServerlessCacheSnapshotName: string;
  /** The identifier of the KMS key used to encrypt the target snapshot. Available for Valkey, Redis OSS and Serverless Memcached only. */
  KmsKeyId?: string;
  /** A list of tags to be added to the target snapshot resource. A tag is a key-value pair. Available for Valkey, Redis OSS and Serverless Memcached only. Default: NULL */
  Tags?: Tag[];
}

/** Represents the input of a CopySnapshotMessage operation. */
export interface CopySnapshotInput {
  /** The name of an existing snapshot from which to make a copy. */
  SourceSnapshotName: string;
  /** A name for the snapshot copy. ElastiCache does not permit overwriting a snapshot, therefore this name must be unique within its context - ElastiCache or an Amazon S3 bucket if exporting. */
  TargetSnapshotName: string;
  /** The ID of the KMS key used to encrypt the target snapshot. */
  KmsKeyId?: string;
  /** A list of tags to be added to this resource. A tag is a key-value pair. A tag key must be accompanied by a tag value, although null is accepted. */
  Tags?: Tag[];
  /** The Amazon S3 bucket to which the snapshot is exported. This parameter is used only when exporting a snapshot for external access. When using this parameter to export a snapshot, be sure Amazon Elasti */
  TargetBucket?: string;
}

/** Represents the input of a CreateCacheCluster operation. */
export interface CreateCacheClusterInput {
  /** The node group (shard) identifier. This parameter is stored as a lowercase string. Constraints: A name must contain from 1 to 50 alphanumeric characters or hyphens. The first character must be a lette */
  CacheClusterId: string;
  /** Reserved parameter. The password used to access a password protected server. Password constraints: Must be only printable ASCII characters. Must be at least 16 characters and no more than 128 characte */
  AuthToken?: string;
  /** If you are running Valkey 7.2 and above or Redis OSS engine version 6.0 and above, set this parameter to yes to opt-in to the next auto minor version upgrade campaign. This parameter is disabled for p */
  AutoMinorVersionUpgrade?: boolean;
  /** Specifies whether the nodes in this Memcached cluster are created in a single Availability Zone or created across multiple Availability Zones in the cluster's region. This parameter is only supported  */
  AZMode?: 'single-az' | 'cross-az';
  /** The compute and memory capacity of the nodes in the node group (shard). The following node types are supported by ElastiCache. Generally speaking, the current generation types provide more memory and  */
  CacheNodeType?: string;
  /** The name of the parameter group to associate with this cluster. If this argument is omitted, the default parameter group for the specified engine is used. You cannot use any parameter group which has  */
  CacheParameterGroupName?: string;
  /** A list of security group names to associate with this cluster. Use this parameter only when you are creating a cluster outside of an Amazon Virtual Private Cloud (Amazon VPC). */
  CacheSecurityGroupNames?: string[];
  /** The name of the subnet group to be used for the cluster. Use this parameter only when you are creating a cluster in an Amazon Virtual Private Cloud (Amazon VPC). If you're going to launch your cluster */
  CacheSubnetGroupName?: string;
  /** The name of the cache engine to be used for this cluster. Valid values for this parameter are: memcached | redis */
  Engine?: string;
  /** The version number of the cache engine to be used for this cluster. To view the supported cache engine versions, use the DescribeCacheEngineVersions operation. Important: You can upgrade to a newer en */
  EngineVersion?: string;
  /** The network type you choose when modifying a cluster, either ipv4 | ipv6. IPv6 is supported for workloads using Valkey 7.2 and above, Redis OSS engine version 6.2 to 7.1 and Memcached engine version 1 */
  IpDiscovery?: 'ipv4' | 'ipv6';
  /** Specifies the destination, format and type of the logs. */
  LogDeliveryConfigurations?: LogDeliveryConfigurationRequest[];
  /** Must be either ipv4 | ipv6 | dual_stack. IPv6 is supported for workloads using Valkey 7.2 and above, Redis OSS engine version 6.2 to 7.1 and Memcached engine version 1.6.6 and above on all instances b */
  NetworkType?: 'ipv4' | 'ipv6' | 'dual_stack';
  /** The Amazon Resource Name (ARN) of the Amazon Simple Notification Service (SNS) topic to which notifications are sent. The Amazon SNS topic owner must be the same as the cluster owner. */
  NotificationTopicArn?: string;
  /** The initial number of cache nodes that the cluster has. For clusters running Valkey or Redis OSS, this value must be 1. For clusters running Memcached, this value must be between 1 and 40. If you need */
  NumCacheNodes?: number;
  /** Specifies whether the nodes in the cluster are created in a single outpost or across multiple outposts. */
  OutpostMode?: 'single-outpost' | 'cross-outpost';
  /** The port number on which each of the cache nodes accepts connections. */
  Port?: number;
  /** The EC2 Availability Zone in which the cluster is created. All nodes belonging to this cluster are placed in the preferred Availability Zone. If you want to create your nodes across multiple Availabil */
  PreferredAvailabilityZone?: string;
  /** A list of the Availability Zones in which cache nodes are created. The order of the zones in the list is not important. This option is only supported on Memcached. If you are creating your cluster in  */
  PreferredAvailabilityZones?: string[];
  /** Specifies the weekly time range during which maintenance on the cluster is performed. It is specified as a range in the format ddd:hh24:mi-ddd:hh24:mi (24H Clock UTC). The minimum maintenance window i */
  PreferredMaintenanceWindow?: string;
  /** The outpost ARN in which the cache cluster is created. */
  PreferredOutpostArn?: string;
  /** The outpost ARNs in which the cache cluster is created. */
  PreferredOutpostArns?: string[];
  /** The ID of the replication group to which this cluster should belong. If this parameter is specified, the cluster is added to the specified replication group as a read replica; otherwise, the cluster i */
  ReplicationGroupId?: string;
  /** One or more VPC security groups associated with the cluster. Use this parameter only when you are creating a cluster in an Amazon Virtual Private Cloud (Amazon VPC). */
  SecurityGroupIds?: string[];
  /** A single-element string list containing an Amazon Resource Name (ARN) that uniquely identifies a Valkey or Redis OSS RDB snapshot file stored in Amazon S3. The snapshot file is used to populate the no */
  SnapshotArns?: string[];
  /** The name of a Valkey or Redis OSS snapshot from which to restore data into the new node group (shard). The snapshot status changes to restoring while the new node group (shard) is being created. This  */
  SnapshotName?: string;
  /** The number of days for which ElastiCache retains automatic snapshots before deleting them. For example, if you set SnapshotRetentionLimit to 5, a snapshot taken today is retained for 5 days before bei */
  SnapshotRetentionLimit?: number;
  /** The daily time range (in UTC) during which ElastiCache begins taking a daily snapshot of your node group (shard). Example: 05:00-09:00 If you do not specify this parameter, ElastiCache automatically c */
  SnapshotWindow?: string;
  /** A list of tags to be added to this resource. */
  Tags?: Tag[];
  /** A flag that enables in-transit encryption when set to true. */
  TransitEncryptionEnabled?: boolean;
}

/** Represents the input of a CreateCacheParameterGroup operation. */
export interface CreateCacheParameterGroupInput {
  /** The name of the cache parameter group family that the cache parameter group can be used with. Valid values are: valkey8 | valkey7 | memcached1.4 | memcached1.5 | memcached1.6 | redis2.6 | redis2.8 | r */
  CacheParameterGroupFamily: string;
  /** A user-specified name for the cache parameter group. */
  CacheParameterGroupName: string;
  /** A user-specified description for the cache parameter group. */
  Description: string;
  /** A list of tags to be added to this resource. A tag is a key-value pair. A tag key must be accompanied by a tag value, although null is accepted. */
  Tags?: Tag[];
}

/** Represents the input of a CreateCacheSecurityGroup operation. */
export interface CreateCacheSecurityGroupInput {
  /** A name for the cache security group. This value is stored as a lowercase string. Constraints: Must contain no more than 255 alphanumeric characters. Cannot be the word "Default". Example: mysecuritygr */
  CacheSecurityGroupName: string;
  /** A description for the cache security group. */
  Description: string;
  /** A list of tags to be added to this resource. A tag is a key-value pair. A tag key must be accompanied by a tag value, although null is accepted. */
  Tags?: Tag[];
}

/** Represents the input of a CreateCacheSubnetGroup operation. */
export interface CreateCacheSubnetGroupInput {
  /** A description for the cache subnet group. */
  CacheSubnetGroupDescription: string;
  /** A name for the cache subnet group. This value is stored as a lowercase string. Constraints: Must contain no more than 255 alphanumeric characters or hyphens. Example: mysubnetgroup */
  CacheSubnetGroupName: string;
  /** A list of VPC subnet IDs for the cache subnet group. */
  SubnetIds: string[];
  /** A list of tags to be added to this resource. A tag is a key-value pair. A tag key must be accompanied by a tag value, although null is accepted. */
  Tags?: Tag[];
}

export interface CreateGlobalReplicationGroupInput {
  /** The suffix name of a Global datastore. Amazon ElastiCache automatically applies a prefix to the Global datastore ID when it is created. Each Amazon Region has its own prefix. For instance, a Global da */
  GlobalReplicationGroupIdSuffix: string;
  /** The name of the primary cluster that accepts writes and will replicate updates to the secondary cluster. */
  PrimaryReplicationGroupId: string;
  /** Provides details of the Global datastore */
  GlobalReplicationGroupDescription?: string;
}

/** Represents the input of a CreateReplicationGroup operation. */
export interface CreateReplicationGroupInput {
  /** A user-created description for the replication group. */
  ReplicationGroupDescription: string;
  /** The replication group identifier. This parameter is stored as a lowercase string. Constraints: A name must contain from 1 to 40 alphanumeric characters or hyphens. The first character must be a letter */
  ReplicationGroupId: string;
  /** A flag that enables encryption at rest when set to true. You cannot modify the value of AtRestEncryptionEnabled after the replication group is created. To enable encryption at rest on a replication gr */
  AtRestEncryptionEnabled?: boolean;
  /** Reserved parameter. The password used to access a password protected server. AuthToken can be specified only on replication groups where TransitEncryptionEnabled is true. For HIPAA compliance, you mus */
  AuthToken?: string;
  /** Specifies whether a read-only replica is automatically promoted to read/write primary if the existing primary fails. AutomaticFailoverEnabled must be enabled for Valkey or Redis OSS (cluster mode enab */
  AutomaticFailoverEnabled?: boolean;
  /** If you are running Valkey 7.2 and above or Redis OSS engine version 6.0 and above, set this parameter to yes to opt-in to the next auto minor version upgrade campaign. This parameter is disabled for p */
  AutoMinorVersionUpgrade?: boolean;
  /** The compute and memory capacity of the nodes in the node group (shard). The following node types are supported by ElastiCache. Generally speaking, the current generation types provide more memory and  */
  CacheNodeType?: string;
  /** The name of the parameter group to associate with this replication group. If this argument is omitted, the default cache parameter group for the specified engine is used. If you are running Valkey or  */
  CacheParameterGroupName?: string;
  /** A list of cache security group names to associate with this replication group. */
  CacheSecurityGroupNames?: string[];
  /** The name of the cache subnet group to be used for the replication group. If you're going to launch your cluster in an Amazon VPC, you need to create a subnet group before you start creating a cluster. */
  CacheSubnetGroupName?: string;
  /** Enabled or Disabled. To modify cluster mode from Disabled to Enabled, you must first set the cluster mode to Compatible. Compatible mode allows your Valkey or Redis OSS clients to connect using both c */
  ClusterMode?: 'enabled' | 'disabled' | 'compatible';
  /** Enables data tiering. Data tiering is only supported for replication groups using the r6gd node type. This parameter must be set to true when using r6gd nodes. For more information, see Data tiering. */
  DataTieringEnabled?: boolean;
  /** The name of the cache engine to be used for the clusters in this replication group. The value must be set to valkey or redis. */
  Engine?: string;
  /** The version number of the cache engine to be used for the clusters in this replication group. To view the supported cache engine versions, use the DescribeCacheEngineVersions operation. Important: You */
  EngineVersion?: string;
  /** The name of the Global datastore */
  GlobalReplicationGroupId?: string;
  /** The network type you choose when creating a replication group, either ipv4 | ipv6. IPv6 is supported for workloads using Valkey 7.2 and above, Redis OSS engine version 6.2 to 7.1 or Memcached engine v */
  IpDiscovery?: 'ipv4' | 'ipv6';
  /** The ID of the KMS key used to encrypt the disk in the cluster. */
  KmsKeyId?: string;
  /** Specifies the destination, format and type of the logs. */
  LogDeliveryConfigurations?: LogDeliveryConfigurationRequest[];
  /** A flag indicating if you have Multi-AZ enabled to enhance fault tolerance. For more information, see Minimizing Downtime: Multi-AZ. */
  MultiAZEnabled?: boolean;
  /** Must be either ipv4 | ipv6 | dual_stack. IPv6 is supported for workloads using Valkey 7.2 and above, Redis OSS engine version 6.2 to 7.1 and Memcached engine version 1.6.6 and above on all instances b */
  NetworkType?: 'ipv4' | 'ipv6' | 'dual_stack';
  /** A list of node group (shard) configuration options. Each node group (shard) configuration has the following members: PrimaryAvailabilityZone, ReplicaAvailabilityZones, ReplicaCount, and Slots. If you' */
  NodeGroupConfiguration?: NodeGroupConfiguration[];
  /** The Amazon Resource Name (ARN) of the Amazon Simple Notification Service (SNS) topic to which notifications are sent. The Amazon SNS topic owner must be the same as the cluster owner. */
  NotificationTopicArn?: string;
  /** The number of clusters this replication group initially has. This parameter is not used if there is more than one node group (shard). You should use ReplicasPerNodeGroup instead. If AutomaticFailoverE */
  NumCacheClusters?: number;
  /** An optional parameter that specifies the number of node groups (shards) for this Valkey or Redis OSS (cluster mode enabled) replication group. For Valkey or Redis OSS (cluster mode disabled) either om */
  NumNodeGroups?: number;
  /** The port number on which each member of the replication group accepts connections. */
  Port?: number;
  /** A list of EC2 Availability Zones in which the replication group's clusters are created. The order of the Availability Zones in the list is the order in which clusters are allocated. The primary cluste */
  PreferredCacheClusterAZs?: string[];
  /** Specifies the weekly time range during which maintenance on the cluster is performed. It is specified as a range in the format ddd:hh24:mi-ddd:hh24:mi (24H Clock UTC). The minimum maintenance window i */
  PreferredMaintenanceWindow?: string;
  /** The identifier of the cluster that serves as the primary for this replication group. This cluster must already exist and have a status of available. This parameter is not required if NumCacheClusters, */
  PrimaryClusterId?: string;
  /** An optional parameter that specifies the number of replica nodes in each node group (shard). Valid values are 0 to 5. */
  ReplicasPerNodeGroup?: number;
  /** One or more Amazon VPC security groups associated with this replication group. Use this parameter only when you are creating a replication group in an Amazon Virtual Private Cloud (Amazon VPC). */
  SecurityGroupIds?: string[];
  /** The name of the snapshot used to create a replication group. Available for Valkey, Redis OSS only. */
  ServerlessCacheSnapshotName?: string;
  /** A list of Amazon Resource Names (ARN) that uniquely identify the Valkey or Redis OSS RDB snapshot files stored in Amazon S3. The snapshot files are used to populate the new replication group. The Amaz */
  SnapshotArns?: string[];
  /** The name of a snapshot from which to restore data into the new replication group. The snapshot status changes to restoring while the new replication group is being created. */
  SnapshotName?: string;
  /** The number of days for which ElastiCache retains automatic snapshots before deleting them. For example, if you set SnapshotRetentionLimit to 5, a snapshot that was taken today is retained for 5 days b */
  SnapshotRetentionLimit?: number;
  /** The daily time range (in UTC) during which ElastiCache begins taking a daily snapshot of your node group (shard). Example: 05:00-09:00 If you do not specify this parameter, ElastiCache automatically c */
  SnapshotWindow?: string;
  /** A list of tags to be added to this resource. Tags are comma-separated key,value pairs (e.g. Key=myKey, Value=myKeyValue. You can include multiple tags as shown following: Key=myKey, Value=myKeyValue K */
  Tags?: Tag[];
  /** A flag that enables in-transit encryption when set to true. This parameter is valid only if the Engine parameter is redis, the EngineVersion parameter is 3.2.6, 4.x or later, and the cluster is being  */
  TransitEncryptionEnabled?: boolean;
  /** A setting that allows you to migrate your clients to use in-transit encryption, with no downtime. When setting TransitEncryptionEnabled to true, you can set your TransitEncryptionMode to preferred in  */
  TransitEncryptionMode?: 'preferred' | 'required';
  /** The user group to associate with the replication group. */
  UserGroupIds?: string[];
}

export interface CreateServerlessCacheInput {
  /** The name of the cache engine to be used for creating the serverless cache. */
  Engine: string;
  /** User-provided identifier for the serverless cache. This parameter is stored as a lowercase string. */
  ServerlessCacheName: string;
  /** Sets the cache usage limits for storage and ElastiCache Processing Units for the cache. */
  CacheUsageLimits?: CacheUsageLimits;
  /** The daily time that snapshots will be created from the new serverless cache. By default this number is populated with 0, i.e. no snapshots will be created on an automatic daily basis. Available for Va */
  DailySnapshotTime?: string;
  /** User-provided description for the serverless cache. The default is NULL, i.e. if no description is provided then an empty string will be returned. The maximum length is 255 characters. */
  Description?: string;
  /** ARN of the customer managed key for encrypting the data at rest. If no KMS key is provided, a default service key is used. */
  KmsKeyId?: string;
  /** The version of the cache engine that will be used to create the serverless cache. */
  MajorEngineVersion?: string;
  /** A list of the one or more VPC security groups to be associated with the serverless cache. The security group will authorize traffic access for the VPC end-point (private-link). If no other information */
  SecurityGroupIds?: string[];
  /** The ARN(s) of the snapshot that the new serverless cache will be created from. Available for Valkey, Redis OSS and Serverless Memcached only. */
  SnapshotArnsToRestore?: string[];
  /** The number of snapshots that will be retained for the serverless cache that is being created. As new snapshots beyond this limit are added, the oldest snapshots will be deleted on a rolling basis. Ava */
  SnapshotRetentionLimit?: number;
  /** A list of the identifiers of the subnets where the VPC endpoint for the serverless cache will be deployed. All the subnetIds must belong to the same VPC. */
  SubnetIds?: string[];
  /** The list of tags (key, value) pairs to be added to the serverless cache resource. Default is NULL. */
  Tags?: Tag[];
  /** The identifier of the UserGroup to be associated with the serverless cache. Available for Valkey and Redis OSS only. Default is NULL. */
  UserGroupId?: string;
}

export interface CreateServerlessCacheSnapshotInput {
  /** The name of an existing serverless cache. The snapshot is created from this cache. Available for Valkey, Redis OSS and Serverless Memcached only. */
  ServerlessCacheName: string;
  /** The name for the snapshot being created. Must be unique for the customer account. Available for Valkey, Redis OSS and Serverless Memcached only. Must be between 1 and 255 characters. */
  ServerlessCacheSnapshotName: string;
  /** The ID of the KMS key used to encrypt the snapshot. Available for Valkey, Redis OSS and Serverless Memcached only. Default: NULL */
  KmsKeyId?: string;
  /** A list of tags to be added to the snapshot resource. A tag is a key-value pair. Available for Valkey, Redis OSS and Serverless Memcached only. */
  Tags?: Tag[];
}

/** Represents the input of a CreateSnapshot operation. */
export interface CreateSnapshotInput {
  /** A name for the snapshot being created. */
  SnapshotName: string;
  /** The identifier of an existing cluster. The snapshot is created from this cluster. */
  CacheClusterId?: string;
  /** The ID of the KMS key used to encrypt the snapshot. */
  KmsKeyId?: string;
  /** The identifier of an existing replication group. The snapshot is created from this replication group. */
  ReplicationGroupId?: string;
  /** A list of tags to be added to this resource. A tag is a key-value pair. A tag key must be accompanied by a tag value, although null is accepted. */
  Tags?: Tag[];
}

export interface CreateUserInput {
  /** Access permissions string used for this user. */
  AccessString: string;
  /** The options are valkey or redis. */
  Engine: string;
  /** The ID of the user. */
  UserId: string;
  /** The username of the user. */
  UserName: string;
  /** Specifies how to authenticate the user. */
  AuthenticationMode?: AuthenticationMode;
  /** Indicates a password is not required for this user. */
  NoPasswordRequired?: boolean;
  /** Passwords used for this user. You can create up to two passwords for each user. */
  Passwords?: string[];
  /** A list of tags to be added to this resource. A tag is a key-value pair. A tag key must be accompanied by a tag value, although null is accepted. */
  Tags?: Tag[];
}

export interface CreateUserGroupInput {
  /** Sets the engine listed in a user group. The options are valkey or redis. */
  Engine: string;
  /** The ID of the user group. */
  UserGroupId: string;
  /** A list of tags to be added to this resource. A tag is a key-value pair. A tag key must be accompanied by a tag value, although null is accepted. Available for Valkey and Redis OSS only. */
  Tags?: Tag[];
  /** The list of user IDs that belong to the user group. */
  UserIds?: string[];
}

export interface DecreaseNodeGroupsInGlobalReplicationGroupInput {
  /** Indicates that the shard reconfiguration process begins immediately. At present, the only permitted value for this parameter is true. */
  ApplyImmediately: boolean;
  /** The name of the Global datastore */
  GlobalReplicationGroupId: string;
  /** The number of node groups (shards) that results from the modification of the shard configuration */
  NodeGroupCount: number;
  /** If the value of NodeGroupCount is less than the current number of node groups (shards), then either NodeGroupsToRemove or NodeGroupsToRetain is required. GlobalNodeGroupsToRemove is a list of NodeGrou */
  GlobalNodeGroupsToRemove?: string[];
  /** If the value of NodeGroupCount is less than the current number of node groups (shards), then either NodeGroupsToRemove or NodeGroupsToRetain is required. GlobalNodeGroupsToRetain is a list of NodeGrou */
  GlobalNodeGroupsToRetain?: string[];
}

export interface DecreaseReplicaCountInput {
  /** If True, the number of replica nodes is decreased immediately. ApplyImmediately=False is not currently supported. */
  ApplyImmediately: boolean;
  /** The id of the replication group from which you want to remove replica nodes. */
  ReplicationGroupId: string;
  /** The number of read replica nodes you want at the completion of this operation. For Valkey or Redis OSS (cluster mode disabled) replication groups, this is the number of replica nodes in the replicatio */
  NewReplicaCount?: number;
  /** A list of ConfigureShard objects that can be used to configure each shard in a Valkey or Redis OSS replication group. The ConfigureShard has three members: NewReplicaCount, NodeGroupId, and PreferredA */
  ReplicaConfiguration?: ConfigureShard[];
  /** A list of the node ids to remove from the replication group or node group (shard). */
  ReplicasToRemove?: string[];
}

/** Represents the input of a DeleteCacheCluster operation. */
export interface DeleteCacheClusterInput {
  /** The cluster identifier for the cluster to be deleted. This parameter is not case sensitive. */
  CacheClusterId: string;
  /** The user-supplied name of a final cluster snapshot. This is the unique name that identifies the snapshot. ElastiCache creates the snapshot, and then deletes the cluster immediately afterward. */
  FinalSnapshotIdentifier?: string;
}

/** Represents the input of a DeleteCacheParameterGroup operation. */
export interface DeleteCacheParameterGroupInput {
  /** The name of the cache parameter group to delete. The specified cache security group must not be associated with any clusters. */
  CacheParameterGroupName: string;
}

/** Represents the input of a DeleteCacheSecurityGroup operation. */
export interface DeleteCacheSecurityGroupInput {
  /** The name of the cache security group to delete. You cannot delete the default security group. */
  CacheSecurityGroupName: string;
}

/** Represents the input of a DeleteCacheSubnetGroup operation. */
export interface DeleteCacheSubnetGroupInput {
  /** The name of the cache subnet group to delete. Constraints: Must contain no more than 255 alphanumeric characters or hyphens. */
  CacheSubnetGroupName: string;
}

export interface DeleteGlobalReplicationGroupInput {
  /** The name of the Global datastore */
  GlobalReplicationGroupId: string;
  /** The primary replication group is retained as a standalone replication group. */
  RetainPrimaryReplicationGroup: boolean;
}

/** Represents the input of a DeleteReplicationGroup operation. */
export interface DeleteReplicationGroupInput {
  /** The identifier for the cluster to be deleted. This parameter is not case sensitive. */
  ReplicationGroupId: string;
  /** The name of a final node group (shard) snapshot. ElastiCache creates the snapshot from the primary node in the cluster, rather than one of the replicas; this is to ensure that it captures the freshest */
  FinalSnapshotIdentifier?: string;
  /** If set to true, all of the read replicas are deleted, but the primary node is retained. */
  RetainPrimaryCluster?: boolean;
}

export interface DeleteServerlessCacheInput {
  /** The identifier of the serverless cache to be deleted. */
  ServerlessCacheName: string;
  /** Name of the final snapshot to be taken before the serverless cache is deleted. Available for Valkey, Redis OSS and Serverless Memcached only. Default: NULL, i.e. a final snapshot is not taken. */
  FinalSnapshotName?: string;
}

export interface DeleteServerlessCacheSnapshotInput {
  /** Idenfitier of the snapshot to be deleted. Available for Valkey, Redis OSS and Serverless Memcached only. */
  ServerlessCacheSnapshotName: string;
}

/** Represents the input of a DeleteSnapshot operation. */
export interface DeleteSnapshotInput {
  /** The name of the snapshot to be deleted. */
  SnapshotName: string;
}

export interface DeleteUserInput {
  /** The ID of the user. */
  UserId: string;
}

export interface DeleteUserGroupInput {
  /** The ID of the user group. */
  UserGroupId: string;
}

/** Represents the input of a DescribeCacheClusters operation. */
export interface DescribeCacheClustersInput {
  /** The user-supplied cluster identifier. If this parameter is specified, only information about that specific cluster is returned. This parameter isn't case sensitive. */
  CacheClusterId?: string;
  /** An optional marker returned from a prior request. Use this marker for pagination of results from this operation. If this parameter is specified, the response includes only records beyond the marker, u */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a marker is included in the response so that the remaining results can be retrieved */
  MaxRecords?: number;
  /** An optional flag that can be included in the DescribeCacheCluster request to show only nodes (API/CLI: clusters) that are not members of a replication group. In practice, this means Memcached and sing */
  ShowCacheClustersNotInReplicationGroups?: boolean;
  /** An optional flag that can be included in the DescribeCacheCluster request to retrieve information about the individual cache nodes. */
  ShowCacheNodeInfo?: boolean;
}

/** Represents the input of a DescribeCacheEngineVersions operation. */
export interface DescribeCacheEngineVersionsInput {
  /** The name of a specific cache parameter group family to return details for. Valid values are: memcached1.4 | memcached1.5 | memcached1.6 | redis2.6 | redis2.8 | redis3.2 | redis4.0 | redis5.0 | redis6. */
  CacheParameterGroupFamily?: string;
  /** If true, specifies that only the default version of the specified engine or engine and major version combination is to be returned. */
  DefaultOnly?: boolean;
  /** The cache engine to return. Valid values: memcached | redis */
  Engine?: string;
  /** The cache engine version to return. Example: 1.4.14 */
  EngineVersion?: string;
  /** An optional marker returned from a prior request. Use this marker for pagination of results from this operation. If this parameter is specified, the response includes only records beyond the marker, u */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a marker is included in the response so that the remaining results can be retrieved */
  MaxRecords?: number;
}

/** Represents the input of a DescribeCacheParameterGroups operation. */
export interface DescribeCacheParameterGroupsInput {
  /** The name of a specific cache parameter group to return details for. */
  CacheParameterGroupName?: string;
  /** An optional marker returned from a prior request. Use this marker for pagination of results from this operation. If this parameter is specified, the response includes only records beyond the marker, u */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a marker is included in the response so that the remaining results can be retrieved */
  MaxRecords?: number;
}

/** Represents the input of a DescribeCacheParameters operation. */
export interface DescribeCacheParametersInput {
  /** The name of a specific cache parameter group to return details for. */
  CacheParameterGroupName: string;
  /** An optional marker returned from a prior request. Use this marker for pagination of results from this operation. If this parameter is specified, the response includes only records beyond the marker, u */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a marker is included in the response so that the remaining results can be retrieved */
  MaxRecords?: number;
  /** The parameter types to return. Valid values: user | system | engine-default */
  Source?: string;
}

/** Represents the input of a DescribeCacheSecurityGroups operation. */
export interface DescribeCacheSecurityGroupsInput {
  /** The name of the cache security group to return details for. */
  CacheSecurityGroupName?: string;
  /** An optional marker returned from a prior request. Use this marker for pagination of results from this operation. If this parameter is specified, the response includes only records beyond the marker, u */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a marker is included in the response so that the remaining results can be retrieved */
  MaxRecords?: number;
}

/** Represents the input of a DescribeCacheSubnetGroups operation. */
export interface DescribeCacheSubnetGroupsInput {
  /** The name of the cache subnet group to return details for. */
  CacheSubnetGroupName?: string;
  /** An optional marker returned from a prior request. Use this marker for pagination of results from this operation. If this parameter is specified, the response includes only records beyond the marker, u */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a marker is included in the response so that the remaining results can be retrieved */
  MaxRecords?: number;
}

/** Represents the input of a DescribeEngineDefaultParameters operation. */
export interface DescribeEngineDefaultParametersInput {
  /** The name of the cache parameter group family. Valid values are: memcached1.4 | memcached1.5 | memcached1.6 | redis2.6 | redis2.8 | redis3.2 | redis4.0 | redis5.0 | redis6.x | redis6.2 | redis7 */
  CacheParameterGroupFamily: string;
  /** An optional marker returned from a prior request. Use this marker for pagination of results from this operation. If this parameter is specified, the response includes only records beyond the marker, u */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a marker is included in the response so that the remaining results can be retrieved */
  MaxRecords?: number;
}

/** Represents the input of a DescribeEvents operation. */
export interface DescribeEventsInput {
  /** The number of minutes worth of events to retrieve. */
  Duration?: number;
  /** The end of the time interval for which to retrieve events, specified in ISO 8601 format. Example: 2017-03-30T07:03:49.555Z */
  EndTime?: string;
  /** An optional marker returned from a prior request. Use this marker for pagination of results from this operation. If this parameter is specified, the response includes only records beyond the marker, u */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a marker is included in the response so that the remaining results can be retrieved */
  MaxRecords?: number;
  /** The identifier of the event source for which events are returned. If not specified, all sources are included in the response. */
  SourceIdentifier?: string;
  /** The event source to retrieve events for. If no value is specified, all events are returned. */
  SourceType?: 'cache-cluster' | 'cache-parameter-group' | 'cache-security-group' | 'cache-subnet-group' | 'replication-group' | 'serverless-cache' | 'serverless-cache-snapshot' | 'user' | 'user-group';
  /** The beginning of the time interval to retrieve events for, specified in ISO 8601 format. Example: 2017-03-30T07:03:49.555Z */
  StartTime?: string;
}

export interface DescribeGlobalReplicationGroupsInput {
  /** The name of the Global datastore */
  GlobalReplicationGroupId?: string;
  /** An optional marker returned from a prior request. Use this marker for pagination of results from this operation. If this parameter is specified, the response includes only records beyond the marker, u */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a marker is included in the response so that the remaining results can be retrieved */
  MaxRecords?: number;
  /** Returns the list of members that comprise the Global datastore. */
  ShowMemberInfo?: boolean;
}

/** Represents the input of a DescribeReplicationGroups operation. */
export interface DescribeReplicationGroupsInput {
  /** An optional marker returned from a prior request. Use this marker for pagination of results from this operation. If this parameter is specified, the response includes only records beyond the marker, u */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a marker is included in the response so that the remaining results can be retrieved */
  MaxRecords?: number;
  /** The identifier for the replication group to be described. This parameter is not case sensitive. If you do not specify this parameter, information about all replication groups is returned. */
  ReplicationGroupId?: string;
}

/** Represents the input of a DescribeReservedCacheNodes operation. */
export interface DescribeReservedCacheNodesInput {
  /** The cache node type filter value. Use this parameter to show only those reservations matching the specified cache node type. The following node types are supported by ElastiCache. Generally speaking,  */
  CacheNodeType?: string;
  /** The duration filter value, specified in years or seconds. Use this parameter to show only reservations for this duration. Valid Values: 1 | 3 | 31536000 | 94608000 */
  Duration?: string;
  /** An optional marker returned from a prior request. Use this marker for pagination of results from this operation. If this parameter is specified, the response includes only records beyond the marker, u */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a marker is included in the response so that the remaining results can be retrieved */
  MaxRecords?: number;
  /** The offering type filter value. Use this parameter to show only the available offerings matching the specified offering type. Valid values: "Light Utilization"|"Medium Utilization"|"Heavy Utilization" */
  OfferingType?: string;
  /** The product description filter value. Use this parameter to show only those reservations matching the specified product description. */
  ProductDescription?: string;
  /** The reserved cache node identifier filter value. Use this parameter to show only the reservation that matches the specified reservation ID. */
  ReservedCacheNodeId?: string;
  /** The offering identifier filter value. Use this parameter to show only purchased reservations matching the specified offering identifier. */
  ReservedCacheNodesOfferingId?: string;
}

/** Represents the input of a DescribeReservedCacheNodesOfferings operation. */
export interface DescribeReservedCacheNodesOfferingsInput {
  /** The cache node type filter value. Use this parameter to show only the available offerings matching the specified cache node type. The following node types are supported by ElastiCache. Generally speak */
  CacheNodeType?: string;
  /** Duration filter value, specified in years or seconds. Use this parameter to show only reservations for a given duration. Valid Values: 1 | 3 | 31536000 | 94608000 */
  Duration?: string;
  /** An optional marker returned from a prior request. Use this marker for pagination of results from this operation. If this parameter is specified, the response includes only records beyond the marker, u */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a marker is included in the response so that the remaining results can be retrieved */
  MaxRecords?: number;
  /** The offering type filter value. Use this parameter to show only the available offerings matching the specified offering type. Valid Values: "Light Utilization"|"Medium Utilization"|"Heavy Utilization" */
  OfferingType?: string;
  /** The product description filter value. Use this parameter to show only the available offerings matching the specified product description. */
  ProductDescription?: string;
  /** The offering identifier filter value. Use this parameter to show only the available offering that matches the specified reservation identifier. Example: 438012d3-4052-4cc7-b2e3-8d3372e0e706 */
  ReservedCacheNodesOfferingId?: string;
}

export interface DescribeServerlessCachesInput {
  /** The maximum number of records in the response. If more records exist than the specified max-records value, the next token is included in the response so that remaining results can be retrieved. The de */
  MaxResults?: number;
  /** An optional marker returned from a prior request to support pagination of results from this operation. If this parameter is specified, the response includes only records beyond the marker, up to the v */
  NextToken?: string;
  /** The identifier for the serverless cache. If this parameter is specified, only information about that specific serverless cache is returned. Default: NULL */
  ServerlessCacheName?: string;
}

export interface DescribeServerlessCacheSnapshotsInput {
  /** The maximum number of records to include in the response. If more records exist than the specified max-results value, a market is included in the response so that remaining results can be retrieved. A */
  MaxResults?: number;
  /** An optional marker returned from a prior request to support pagination of results from this operation. If this parameter is specified, the response includes only records beyond the marker, up to the v */
  NextToken?: string;
  /** The identifier of serverless cache. If this parameter is specified, only snapshots associated with that specific serverless cache are described. Available for Valkey, Redis OSS and Serverless Memcache */
  ServerlessCacheName?: string;
  /** The identifier of the serverless cache’s snapshot. If this parameter is specified, only this snapshot is described. Available for Valkey, Redis OSS and Serverless Memcached only. */
  ServerlessCacheSnapshotName?: string;
  /** The type of snapshot that is being described. Available for Valkey, Redis OSS and Serverless Memcached only. */
  SnapshotType?: string;
}

export interface DescribeServiceUpdatesInput {
  /** An optional marker returned from a prior request. Use this marker for pagination of results from this operation. If this parameter is specified, the response includes only records beyond the marker, u */
  Marker?: string;
  /** The maximum number of records to include in the response */
  MaxRecords?: number;
  /** The unique ID of the service update */
  ServiceUpdateName?: string;
  /** The status of the service update */
  ServiceUpdateStatus?: 'available' | 'cancelled' | 'expired'[];
}

/** Represents the input of a DescribeSnapshotsMessage operation. */
export interface DescribeSnapshotsInput {
  /** A user-supplied cluster identifier. If this parameter is specified, only snapshots associated with that specific cluster are described. */
  CacheClusterId?: string;
  /** An optional marker returned from a prior request. Use this marker for pagination of results from this operation. If this parameter is specified, the response includes only records beyond the marker, u */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a marker is included in the response so that the remaining results can be retrieved */
  MaxRecords?: number;
  /** A user-supplied replication group identifier. If this parameter is specified, only snapshots associated with that specific replication group are described. */
  ReplicationGroupId?: string;
  /** A Boolean value which if true, the node group (shard) configuration is included in the snapshot description. */
  ShowNodeGroupConfig?: boolean;
  /** A user-supplied name of the snapshot. If this parameter is specified, only this snapshot are described. */
  SnapshotName?: string;
  /** If set to system, the output shows snapshots that were automatically created by ElastiCache. If set to user the output shows snapshots that were manually created. If omitted, the output shows both aut */
  SnapshotSource?: string;
}

export interface DescribeUpdateActionsInput {
  /** The cache cluster IDs */
  CacheClusterIds?: string[];
  /** The Elasticache engine to which the update applies. Either Valkey, Redis OSS or Memcached. */
  Engine?: string;
  /** An optional marker returned from a prior request. Use this marker for pagination of results from this operation. If this parameter is specified, the response includes only records beyond the marker, u */
  Marker?: string;
  /** The maximum number of records to include in the response */
  MaxRecords?: number;
  /** The replication group IDs */
  ReplicationGroupIds?: string[];
  /** The unique ID of the service update */
  ServiceUpdateName?: string;
  /** The status of the service update */
  ServiceUpdateStatus?: 'available' | 'cancelled' | 'expired'[];
  /** The range of time specified to search for service updates that are in available status */
  ServiceUpdateTimeRange?: TimeRangeFilter;
  /** Dictates whether to include node level update status in the response */
  ShowNodeLevelUpdateStatus?: boolean;
  /** The status of the update action. */
  UpdateActionStatus?: 'not-applied' | 'waiting-to-start' | 'in-progress' | 'stopping' | 'stopped' | 'complete' | 'scheduling' | 'scheduled' | 'not-applicable'[];
}

export interface DescribeUserGroupsInput {
  /** An optional marker returned from a prior request. Use this marker for pagination of results from this operation. If this parameter is specified, the response includes only records beyond the marker, u */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a marker is included in the response so that the remaining results can be retrieved */
  MaxRecords?: number;
  /** The ID of the user group. */
  UserGroupId?: string;
}

export interface DescribeUsersInput {
  /** The engine. */
  Engine?: string;
  /** Filter to determine the list of User IDs to return. */
  Filters?: Filter[];
  /** An optional marker returned from a prior request. Use this marker for pagination of results from this operation. If this parameter is specified, the response includes only records beyond the marker, u */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a marker is included in the response so that the remaining results can be retrieved */
  MaxRecords?: number;
  /** The ID of the user. */
  UserId?: string;
}

export interface DisassociateGlobalReplicationGroupInput {
  /** The name of the Global datastore */
  GlobalReplicationGroupId: string;
  /** The name of the secondary cluster you wish to remove from the Global datastore */
  ReplicationGroupId: string;
  /** The Amazon region of secondary cluster you wish to remove from the Global datastore */
  ReplicationGroupRegion: string;
}

export interface ExportServerlessCacheSnapshotInput {
  /** Name of the Amazon S3 bucket to export the snapshot to. The Amazon S3 bucket must also be in same region as the snapshot. Available for Valkey and Redis OSS only. */
  S3BucketName: string;
  /** The identifier of the serverless cache snapshot to be exported to S3. Available for Valkey and Redis OSS only. */
  ServerlessCacheSnapshotName: string;
}

export interface FailoverGlobalReplicationGroupInput {
  /** The name of the Global datastore */
  GlobalReplicationGroupId: string;
  /** The Amazon region of the primary cluster of the Global datastore */
  PrimaryRegion: string;
  /** The name of the primary replication group */
  PrimaryReplicationGroupId: string;
}

export interface IncreaseNodeGroupsInGlobalReplicationGroupInput {
  /** Indicates that the process begins immediately. At present, the only permitted value for this parameter is true. */
  ApplyImmediately: boolean;
  /** The name of the Global datastore */
  GlobalReplicationGroupId: string;
  /** Total number of node groups you want */
  NodeGroupCount: number;
  /** Describes the replication group IDs, the Amazon regions where they are stored and the shard configuration for each that comprise the Global datastore */
  RegionalConfigurations?: RegionalConfiguration[];
}

export interface IncreaseReplicaCountInput {
  /** If True, the number of replica nodes is increased immediately. ApplyImmediately=False is not currently supported. */
  ApplyImmediately: boolean;
  /** The id of the replication group to which you want to add replica nodes. */
  ReplicationGroupId: string;
  /** The number of read replica nodes you want at the completion of this operation. For Valkey or Redis OSS (cluster mode disabled) replication groups, this is the number of replica nodes in the replicatio */
  NewReplicaCount?: number;
  /** A list of ConfigureShard objects that can be used to configure each shard in a Valkey or Redis OSS (cluster mode enabled) replication group. The ConfigureShard has three members: NewReplicaCount, Node */
  ReplicaConfiguration?: ConfigureShard[];
}

/** The input parameters for the ListAllowedNodeTypeModifications operation. */
export interface ListAllowedNodeTypeModificationsInput {
  /** The name of the cluster you want to scale up to a larger node instanced type. ElastiCache uses the cluster id to identify the current node type of this cluster and from that to create a list of node t */
  CacheClusterId?: string;
  /** The name of the replication group want to scale up to a larger node type. ElastiCache uses the replication group id to identify the current node type being used by this replication group, and from tha */
  ReplicationGroupId?: string;
}

/** The input parameters for the ListTagsForResource operation. */
export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) of the resource for which you want the list of tags, for example arn:aws:elasticache:us-west-2:0123456789:cluster:myCluster or arn:aws:elasticache:us-west-2:0123456789:s */
  ResourceName: string;
}

/** Represents the input of a ModifyCacheCluster operation. */
export interface ModifyCacheClusterInput {
  /** The cluster identifier. This value is stored as a lowercase string. */
  CacheClusterId: string;
  /** If true, this parameter causes the modifications in this request and any pending modifications to be applied, asynchronously and as soon as possible, regardless of the PreferredMaintenanceWindow setti */
  ApplyImmediately?: boolean;
  /** Reserved parameter. The password used to access a password protected server. This parameter must be specified with the auth-token-update parameter. Password constraints: Must be only printable ASCII c */
  AuthToken?: string;
  /** Specifies the strategy to use to update the AUTH token. This parameter must be specified with the auth-token parameter. Possible values: ROTATE - default, if no update strategy is provided SET - allow */
  AuthTokenUpdateStrategy?: 'SET' | 'ROTATE' | 'DELETE';
  /** If you are running Valkey 7.2 or Redis OSS engine version 6.0 or later, set this parameter to yes to opt-in to the next auto minor version upgrade campaign. This parameter is disabled for previous ver */
  AutoMinorVersionUpgrade?: boolean;
  /** Specifies whether the new nodes in this Memcached cluster are all created in a single Availability Zone or created across multiple Availability Zones. Valid values: single-az | cross-az. This option i */
  AZMode?: 'single-az' | 'cross-az';
  /** A list of cache node IDs to be removed. A node ID is a numeric identifier (0001, 0002, etc.). This parameter is only valid when NumCacheNodes is less than the existing number of cache nodes. The numbe */
  CacheNodeIdsToRemove?: string[];
  /** A valid cache node type that you want to scale this cluster up to. */
  CacheNodeType?: string;
  /** The name of the cache parameter group to apply to this cluster. This change is asynchronously applied as soon as possible for parameters when the ApplyImmediately parameter is specified as true for th */
  CacheParameterGroupName?: string;
  /** A list of cache security group names to authorize on this cluster. This change is asynchronously applied as soon as possible. You can use this parameter only with clusters that are created outside of  */
  CacheSecurityGroupNames?: string[];
  /** The engine type used by the cache cluster. The options are valkey, memcached or redis. */
  Engine?: string;
  /** The upgraded version of the cache engine to be run on the cache nodes. Important: You can upgrade to a newer engine version (see Selecting a Cache Engine and Version), but you cannot downgrade to an e */
  EngineVersion?: string;
  /** The network type you choose when modifying a cluster, either ipv4 | ipv6. IPv6 is supported for workloads using Valkey 7.2 and above, Redis OSS engine version 6.2 to 7.1 or Memcached engine version 1. */
  IpDiscovery?: 'ipv4' | 'ipv6';
  /** Specifies the destination, format and type of the logs. */
  LogDeliveryConfigurations?: LogDeliveryConfigurationRequest[];
  /** This option is only supported on Memcached clusters. The list of Availability Zones where the new Memcached cache nodes are created. This parameter is only valid when NumCacheNodes in the request is g */
  NewAvailabilityZones?: string[];
  /** The Amazon Resource Name (ARN) of the Amazon SNS topic to which notifications are sent. The Amazon SNS topic owner must be same as the cluster owner. */
  NotificationTopicArn?: string;
  /** The status of the Amazon SNS notification topic. Notifications are sent only if the status is active. Valid values: active | inactive */
  NotificationTopicStatus?: string;
  /** The number of cache nodes that the cluster should have. If the value for NumCacheNodes is greater than the sum of the number of current cache nodes and the number of cache nodes pending creation (whic */
  NumCacheNodes?: number;
  /** Specifies the weekly time range during which maintenance on the cluster is performed. It is specified as a range in the format ddd:hh24:mi-ddd:hh24:mi (24H Clock UTC). The minimum maintenance window i */
  PreferredMaintenanceWindow?: string;
  /** Configures horizontal or vertical scaling for Memcached clusters, specifying the scaling percentage and interval. */
  ScaleConfig?: ScaleConfig;
  /** Specifies the VPC Security Groups associated with the cluster. This parameter can be used only with clusters that are created in an Amazon Virtual Private Cloud (Amazon VPC). */
  SecurityGroupIds?: string[];
  /** The number of days for which ElastiCache retains automatic cluster snapshots before deleting them. For example, if you set SnapshotRetentionLimit to 5, a snapshot that was taken today is retained for  */
  SnapshotRetentionLimit?: number;
  /** The daily time range (in UTC) during which ElastiCache begins taking a daily snapshot of your cluster. */
  SnapshotWindow?: string;
}

/** Represents the input of a ModifyCacheParameterGroup operation. */
export interface ModifyCacheParameterGroupInput {
  /** The name of the cache parameter group to modify. */
  CacheParameterGroupName: string;
  /** An array of parameter names and values for the parameter update. You must supply at least one parameter name and value; subsequent arguments are optional. A maximum of 20 parameters may be modified pe */
  ParameterNameValues: ParameterNameValue[];
}

/** Represents the input of a ModifyCacheSubnetGroup operation. */
export interface ModifyCacheSubnetGroupInput {
  /** The name for the cache subnet group. This value is stored as a lowercase string. Constraints: Must contain no more than 255 alphanumeric characters or hyphens. Example: mysubnetgroup */
  CacheSubnetGroupName: string;
  /** A description of the cache subnet group. */
  CacheSubnetGroupDescription?: string;
  /** The EC2 subnet IDs for the cache subnet group. */
  SubnetIds?: string[];
}

export interface ModifyGlobalReplicationGroupInput {
  /** This parameter causes the modifications in this request and any pending modifications to be applied, asynchronously and as soon as possible. Modifications to Global Replication Groups cannot be reques */
  ApplyImmediately: boolean;
  /** The name of the Global datastore */
  GlobalReplicationGroupId: string;
  /** Determines whether a read replica is automatically promoted to read/write primary if the existing primary encounters a failure. */
  AutomaticFailoverEnabled?: boolean;
  /** A valid cache node type that you want to scale this Global datastore to. */
  CacheNodeType?: string;
  /** The name of the cache parameter group to use with the Global datastore. It must be compatible with the major engine version used by the Global datastore. */
  CacheParameterGroupName?: string;
  /** Modifies the engine listed in a global replication group message. The options are redis, memcached or valkey. */
  Engine?: string;
  /** The upgraded version of the cache engine to be run on the clusters in the Global datastore. */
  EngineVersion?: string;
  /** A description of the Global datastore */
  GlobalReplicationGroupDescription?: string;
}

/** Represents the input of a ModifyReplicationGroups operation. */
export interface ModifyReplicationGroupInput {
  /** The identifier of the replication group to modify. */
  ReplicationGroupId: string;
  /** If true, this parameter causes the modifications in this request and any pending modifications to be applied, asynchronously and as soon as possible, regardless of the PreferredMaintenanceWindow setti */
  ApplyImmediately?: boolean;
  /** Reserved parameter. The password used to access a password protected server. This parameter must be specified with the auth-token-update-strategy parameter. Password constraints: Must be only printabl */
  AuthToken?: string;
  /** Specifies the strategy to use to update the AUTH token. This parameter must be specified with the auth-token parameter. Possible values: ROTATE - default, if no update strategy is provided SET - allow */
  AuthTokenUpdateStrategy?: 'SET' | 'ROTATE' | 'DELETE';
  /** Determines whether a read replica is automatically promoted to read/write primary if the existing primary encounters a failure. Valid values: true | false */
  AutomaticFailoverEnabled?: boolean;
  /** If you are running Valkey or Redis OSS engine version 6.0 or later, set this parameter to yes if you want to opt-in to the next auto minor version upgrade campaign. This parameter is disabled for prev */
  AutoMinorVersionUpgrade?: boolean;
  /** A valid cache node type that you want to scale this replication group to. */
  CacheNodeType?: string;
  /** The name of the cache parameter group to apply to all of the clusters in this replication group. This change is asynchronously applied as soon as possible for parameters when the ApplyImmediately para */
  CacheParameterGroupName?: string;
  /** A list of cache security group names to authorize for the clusters in this replication group. This change is asynchronously applied as soon as possible. This parameter can be used only with replicatio */
  CacheSecurityGroupNames?: string[];
  /** Enabled or Disabled. To modify cluster mode from Disabled to Enabled, you must first set the cluster mode to Compatible. Compatible mode allows your Valkey or Redis OSS clients to connect using both c */
  ClusterMode?: 'enabled' | 'disabled' | 'compatible';
  /** Modifies the engine listed in a replication group message. The options are redis, memcached or valkey. */
  Engine?: string;
  /** The upgraded version of the cache engine to be run on the clusters in the replication group. Important: You can upgrade to a newer engine version (see Selecting a Cache Engine and Version), but you ca */
  EngineVersion?: string;
  /** The network type you choose when modifying a cluster, either ipv4 | ipv6. IPv6 is supported for workloads using Valkey 7.2 and above, Redis OSS engine version 6.2 to 7.1 and Memcached engine version 1 */
  IpDiscovery?: 'ipv4' | 'ipv6';
  /** Specifies the destination, format and type of the logs. */
  LogDeliveryConfigurations?: LogDeliveryConfigurationRequest[];
  /** A flag to indicate MultiAZ is enabled. */
  MultiAZEnabled?: boolean;
  /** Deprecated. This parameter is not used. */
  NodeGroupId?: string;
  /** The Amazon Resource Name (ARN) of the Amazon SNS topic to which notifications are sent. The Amazon SNS topic owner must be same as the replication group owner. */
  NotificationTopicArn?: string;
  /** The status of the Amazon SNS notification topic for the replication group. Notifications are sent only if the status is active. Valid values: active | inactive */
  NotificationTopicStatus?: string;
  /** Specifies the weekly time range during which maintenance on the cluster is performed. It is specified as a range in the format ddd:hh24:mi-ddd:hh24:mi (24H Clock UTC). The minimum maintenance window i */
  PreferredMaintenanceWindow?: string;
  /** For replication groups with a single primary, if this parameter is specified, ElastiCache promotes the specified cluster in the specified replication group to the primary role. The nodes of all other  */
  PrimaryClusterId?: string;
  /** Removes the user group associated with this replication group. */
  RemoveUserGroups?: boolean;
  /** A description for the replication group. Maximum length is 255 characters. */
  ReplicationGroupDescription?: string;
  /** Specifies the VPC Security Groups associated with the clusters in the replication group. This parameter can be used only with replication group containing clusters running in an Amazon Virtual Private */
  SecurityGroupIds?: string[];
  /** The number of days for which ElastiCache retains automatic node group (shard) snapshots before deleting them. For example, if you set SnapshotRetentionLimit to 5, a snapshot that was taken today is re */
  SnapshotRetentionLimit?: number;
  /** The cluster ID that is used as the daily snapshot source for the replication group. This parameter cannot be set for Valkey or Redis OSS (cluster mode enabled) replication groups. */
  SnapshottingClusterId?: string;
  /** The daily time range (in UTC) during which ElastiCache begins taking a daily snapshot of the node group (shard) specified by SnapshottingClusterId. Example: 05:00-09:00 If you do not specify this para */
  SnapshotWindow?: string;
  /** A flag that enables in-transit encryption when set to true. If you are enabling in-transit encryption for an existing cluster, you must also set TransitEncryptionMode to preferred. */
  TransitEncryptionEnabled?: boolean;
  /** A setting that allows you to migrate your clients to use in-transit encryption, with no downtime. You must set TransitEncryptionEnabled to true, for your existing cluster, and set TransitEncryptionMod */
  TransitEncryptionMode?: 'preferred' | 'required';
  /** The ID of the user group you are associating with the replication group. */
  UserGroupIdsToAdd?: string[];
  /** The ID of the user group to disassociate from the replication group, meaning the users in the group no longer can access the replication group. */
  UserGroupIdsToRemove?: string[];
}

/** Represents the input for a ModifyReplicationGroupShardConfiguration operation. */
export interface ModifyReplicationGroupShardConfigurationInput {
  /** Indicates that the shard reconfiguration process begins immediately. At present, the only permitted value for this parameter is true. Value: true */
  ApplyImmediately: boolean;
  /** The number of node groups (shards) that results from the modification of the shard configuration. */
  NodeGroupCount: number;
  /** The name of the Valkey or Redis OSS (cluster mode enabled) cluster (replication group) on which the shards are to be configured. */
  ReplicationGroupId: string;
  /** If the value of NodeGroupCount is less than the current number of node groups (shards), then either NodeGroupsToRemove or NodeGroupsToRetain is required. NodeGroupsToRemove is a list of NodeGroupIds t */
  NodeGroupsToRemove?: string[];
  /** If the value of NodeGroupCount is less than the current number of node groups (shards), then either NodeGroupsToRemove or NodeGroupsToRetain is required. NodeGroupsToRetain is a list of NodeGroupIds t */
  NodeGroupsToRetain?: string[];
  /** Specifies the preferred availability zones for each node group in the cluster. If the value of NodeGroupCount is greater than the current number of node groups (shards), you can use this parameter to  */
  ReshardingConfiguration?: ReshardingConfiguration[];
}

export interface ModifyServerlessCacheInput {
  /** User-provided identifier for the serverless cache to be modified. */
  ServerlessCacheName: string;
  /** Modify the cache usage limit for the serverless cache. */
  CacheUsageLimits?: CacheUsageLimits;
  /** The daily time during which Elasticache begins taking a daily snapshot of the serverless cache. Available for Valkey, Redis OSS and Serverless Memcached only. The default is NULL, i.e. the existing sn */
  DailySnapshotTime?: string;
  /** User provided description for the serverless cache. Default = NULL, i.e. the existing description is not removed/modified. The description has a maximum length of 255 characters. */
  Description?: string;
  /** Modifies the engine listed in a serverless cache request. The options are redis, memcached or valkey. */
  Engine?: string;
  /** Modifies the engine vesion listed in a serverless cache request. */
  MajorEngineVersion?: string;
  /** The identifier of the UserGroup to be removed from association with the Valkey and Redis OSS serverless cache. Available for Valkey and Redis OSS only. Default is NULL. */
  RemoveUserGroup?: boolean;
  /** The new list of VPC security groups to be associated with the serverless cache. Populating this list means the current VPC security groups will be removed. This security group is used to authorize tra */
  SecurityGroupIds?: string[];
  /** The number of days for which Elasticache retains automatic snapshots before deleting them. Available for Valkey, Redis OSS and Serverless Memcached only. Default = NULL, i.e. the existing snapshot-ret */
  SnapshotRetentionLimit?: number;
  /** The identifier of the UserGroup to be associated with the serverless cache. Available for Valkey and Redis OSS only. Default is NULL - the existing UserGroup is not removed. */
  UserGroupId?: string;
}

export interface ModifyUserInput {
  /** The ID of the user. */
  UserId: string;
  /** Access permissions string used for this user. */
  AccessString?: string;
  /** Adds additional user permissions to the access string. */
  AppendAccessString?: string;
  /** Specifies how to authenticate the user. */
  AuthenticationMode?: AuthenticationMode;
  /** Modifies the engine listed for a user. The options are valkey or redis. */
  Engine?: string;
  /** Indicates no password is required for the user. */
  NoPasswordRequired?: boolean;
  /** The passwords belonging to the user. You are allowed up to two. */
  Passwords?: string[];
}

export interface ModifyUserGroupInput {
  /** The ID of the user group. */
  UserGroupId: string;
  /** Modifies the engine listed in a user group. The options are valkey or redis. */
  Engine?: string;
  /** The list of user IDs to add to the user group. */
  UserIdsToAdd?: string[];
  /** The list of user IDs to remove from the user group. */
  UserIdsToRemove?: string[];
}

/** Represents the input of a PurchaseReservedCacheNodesOffering operation. */
export interface PurchaseReservedCacheNodesOfferingInput {
  /** The ID of the reserved cache node offering to purchase. Example: 438012d3-4052-4cc7-b2e3-8d3372e0e706 */
  ReservedCacheNodesOfferingId: string;
  /** The number of cache node instances to reserve. Default: 1 */
  CacheNodeCount?: number;
  /** A customer-specified identifier to track this reservation. The Reserved Cache Node ID is an unique customer-specified identifier to track this reservation. If this parameter is not specified, ElastiCa */
  ReservedCacheNodeId?: string;
  /** A list of tags to be added to this resource. A tag is a key-value pair. A tag key must be accompanied by a tag value, although null is accepted. */
  Tags?: Tag[];
}

export interface RebalanceSlotsInGlobalReplicationGroupInput {
  /** If True, redistribution is applied immediately. */
  ApplyImmediately: boolean;
  /** The name of the Global datastore */
  GlobalReplicationGroupId: string;
}

/** Represents the input of a RebootCacheCluster operation. */
export interface RebootCacheClusterInput {
  /** The cluster identifier. This parameter is stored as a lowercase string. */
  CacheClusterId: string;
  /** A list of cache node IDs to reboot. A node ID is a numeric identifier (0001, 0002, etc.). To reboot an entire cluster, specify all of the cache node IDs. */
  CacheNodeIdsToReboot: string[];
}

/** Represents the input of a RemoveTagsFromResource operation. */
export interface RemoveTagsFromResourceInput {
  /** The Amazon Resource Name (ARN) of the resource from which you want the tags removed, for example arn:aws:elasticache:us-west-2:0123456789:cluster:myCluster or arn:aws:elasticache:us-west-2:0123456789: */
  ResourceName: string;
  /** A list of TagKeys identifying the tags you want removed from the named resource. */
  TagKeys: string[];
}

/** Represents the input of a ResetCacheParameterGroup operation. */
export interface ResetCacheParameterGroupInput {
  /** The name of the cache parameter group to reset. */
  CacheParameterGroupName: string;
  /** An array of parameter names to reset to their default values. If ResetAllParameters is true, do not use ParameterNameValues. If ResetAllParameters is false, you must specify the name of at least one p */
  ParameterNameValues?: ParameterNameValue[];
  /** If true, all parameters in the cache parameter group are reset to their default values. If false, only the parameters listed by ParameterNameValues are reset to their default values. Valid values: tru */
  ResetAllParameters?: boolean;
}

/** Represents the input of a RevokeCacheSecurityGroupIngress operation. */
export interface RevokeCacheSecurityGroupIngressInput {
  /** The name of the cache security group to revoke ingress from. */
  CacheSecurityGroupName: string;
  /** The name of the Amazon EC2 security group to revoke access from. */
  EC2SecurityGroupName: string;
  /** The Amazon account number of the Amazon EC2 security group owner. Note that this is not the same thing as an Amazon access key ID - you must provide a valid Amazon account number for this parameter. */
  EC2SecurityGroupOwnerId: string;
}

export interface StartMigrationInput {
  /** List of endpoints from which data should be migrated. For Valkey or Redis OSS (cluster mode disabled), the list should have only one element. */
  CustomerNodeEndpointList: CustomerNodeEndpoint[];
  /** The ID of the replication group to which data should be migrated. */
  ReplicationGroupId: string;
}

export interface TestFailoverInput {
  /** The name of the node group (called shard in the console) in this replication group on which automatic failover is to be tested. You may test automatic failover on up to 15 node groups in any rolling 2 */
  NodeGroupId: string;
  /** The name of the replication group (console: cluster) whose automatic failover is being tested by this operation. */
  ReplicationGroupId: string;
}

export interface TestMigrationInput {
  /** List of endpoints from which data should be migrated. List should have only one element. */
  CustomerNodeEndpointList: CustomerNodeEndpoint[];
  /** The ID of the replication group to which data is to be migrated. */
  ReplicationGroupId: string;
}

/** ElastiCache service binding for Step Functions SDK integrations. */
export class ElastiCache {
  constructor() {}

  addTagsToResource<T>(params: AddTagsToResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  authorizeCacheSecurityGroupIngress<T>(params: AuthorizeCacheSecurityGroupIngressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchApplyUpdateAction<T>(params: BatchApplyUpdateActionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchStopUpdateAction<T>(params: BatchStopUpdateActionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  completeMigration<T>(params: CompleteMigrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  copyServerlessCacheSnapshot<T>(params: CopyServerlessCacheSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  copySnapshot<T>(params: CopySnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCacheCluster<T>(params: CreateCacheClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCacheParameterGroup<T>(params: CreateCacheParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCacheSecurityGroup<T>(params: CreateCacheSecurityGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCacheSubnetGroup<T>(params: CreateCacheSubnetGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createGlobalReplicationGroup<T>(params: CreateGlobalReplicationGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createReplicationGroup<T>(params: CreateReplicationGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createServerlessCache<T>(params: CreateServerlessCacheInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createServerlessCacheSnapshot<T>(params: CreateServerlessCacheSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createSnapshot<T>(params: CreateSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createUser<T>(params: CreateUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createUserGroup<T>(params: CreateUserGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  decreaseNodeGroupsInGlobalReplicationGroup<T>(params: DecreaseNodeGroupsInGlobalReplicationGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  decreaseReplicaCount<T>(params: DecreaseReplicaCountInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCacheCluster<T>(params: DeleteCacheClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCacheParameterGroup<T>(params: DeleteCacheParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCacheSecurityGroup<T>(params: DeleteCacheSecurityGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCacheSubnetGroup<T>(params: DeleteCacheSubnetGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteGlobalReplicationGroup<T>(params: DeleteGlobalReplicationGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteReplicationGroup<T>(params: DeleteReplicationGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteServerlessCache<T>(params: DeleteServerlessCacheInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteServerlessCacheSnapshot<T>(params: DeleteServerlessCacheSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSnapshot<T>(params: DeleteSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteUser<T>(params: DeleteUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteUserGroup<T>(params: DeleteUserGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCacheClusters<T>(params: DescribeCacheClustersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCacheEngineVersions<T>(params: DescribeCacheEngineVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCacheParameterGroups<T>(params: DescribeCacheParameterGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCacheParameters<T>(params: DescribeCacheParametersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCacheSecurityGroups<T>(params: DescribeCacheSecurityGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCacheSubnetGroups<T>(params: DescribeCacheSubnetGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEngineDefaultParameters<T>(params: DescribeEngineDefaultParametersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEvents<T>(params: DescribeEventsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeGlobalReplicationGroups<T>(params: DescribeGlobalReplicationGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReplicationGroups<T>(params: DescribeReplicationGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReservedCacheNodes<T>(params: DescribeReservedCacheNodesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReservedCacheNodesOfferings<T>(params: DescribeReservedCacheNodesOfferingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeServerlessCaches<T>(params: DescribeServerlessCachesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeServerlessCacheSnapshots<T>(params: DescribeServerlessCacheSnapshotsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeServiceUpdates<T>(params: DescribeServiceUpdatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSnapshots<T>(params: DescribeSnapshotsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeUpdateActions<T>(params: DescribeUpdateActionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeUserGroups<T>(params: DescribeUserGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeUsers<T>(params: DescribeUsersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateGlobalReplicationGroup<T>(params: DisassociateGlobalReplicationGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  exportServerlessCacheSnapshot<T>(params: ExportServerlessCacheSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  failoverGlobalReplicationGroup<T>(params: FailoverGlobalReplicationGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  increaseNodeGroupsInGlobalReplicationGroup<T>(params: IncreaseNodeGroupsInGlobalReplicationGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  increaseReplicaCount<T>(params: IncreaseReplicaCountInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAllowedNodeTypeModifications<T>(params: ListAllowedNodeTypeModificationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyCacheCluster<T>(params: ModifyCacheClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyCacheParameterGroup<T>(params: ModifyCacheParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyCacheSubnetGroup<T>(params: ModifyCacheSubnetGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyGlobalReplicationGroup<T>(params: ModifyGlobalReplicationGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyReplicationGroup<T>(params: ModifyReplicationGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyReplicationGroupShardConfiguration<T>(params: ModifyReplicationGroupShardConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyServerlessCache<T>(params: ModifyServerlessCacheInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyUser<T>(params: ModifyUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyUserGroup<T>(params: ModifyUserGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  purchaseReservedCacheNodesOffering<T>(params: PurchaseReservedCacheNodesOfferingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rebalanceSlotsInGlobalReplicationGroup<T>(params: RebalanceSlotsInGlobalReplicationGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rebootCacheCluster<T>(params: RebootCacheClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeTagsFromResource<T>(params: RemoveTagsFromResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  resetCacheParameterGroup<T>(params: ResetCacheParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  revokeCacheSecurityGroupIngress<T>(params: RevokeCacheSecurityGroupIngressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startMigration<T>(params: StartMigrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  testFailover<T>(params: TestFailoverInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  testMigration<T>(params: TestMigrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
