// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface Tag {
  /** A key is the required name of the tag. The string value can be from 1 to 128 Unicode characters in length and can't be prefixed with aws: or rds:. The string can only contain only the set of Unicode l */
  Key?: string;
  /** A value is the optional value of the tag. The string value can be from 1 to 256 Unicode characters in length and can't be prefixed with aws: or rds:. The string can only contain only the set of Unicod */
  Value?: string;
}

export interface ScalingConfiguration {
  /** The minimum capacity for an Aurora DB cluster in serverless DB engine mode. For Aurora MySQL, valid capacity values are 1, 2, 4, 8, 16, 32, 64, 128, and 256. For Aurora PostgreSQL, valid capacity valu */
  MinCapacity?: number;
  /** The maximum capacity for an Aurora DB cluster in serverless DB engine mode. For Aurora MySQL, valid capacity values are 1, 2, 4, 8, 16, 32, 64, 128, and 256. For Aurora PostgreSQL, valid capacity valu */
  MaxCapacity?: number;
  /** Indicates whether to allow or disallow automatic pause for an Aurora DB cluster in serverless DB engine mode. A DB cluster can be paused only when it's idle (it has no connections). If a DB cluster is */
  AutoPause?: boolean;
  /** The time, in seconds, before an Aurora DB cluster in serverless mode is paused. Specify a value between 300 and 86,400 seconds. */
  SecondsUntilAutoPause?: number;
  /** The action to take when the timeout is reached, either ForceApplyCapacityChange or RollbackCapacityChange. ForceApplyCapacityChange sets the capacity to the specified value as soon as possible. Rollba */
  TimeoutAction?: string;
  /** The amount of time, in seconds, that Aurora Serverless v1 tries to find a scaling point to perform seamless scaling before enforcing the timeout action. The default is 300. Specify a value between 60  */
  SecondsBeforeTimeout?: number;
}

export interface RdsCustomClusterConfiguration {
  /** Reserved for future use. */
  InterconnectSubnetId?: string;
  /** Reserved for future use. */
  TransitGatewayMulticastDomainId?: string;
  /** Reserved for future use. */
  ReplicaMode?: 'open-read-only' | 'mounted';
}

export interface ServerlessV2ScalingConfiguration {
  /** The minimum number of Aurora capacity units (ACUs) for a DB instance in an Aurora Serverless v2 cluster. You can specify ACU values in half-step increments, such as 8, 8.5, 9, and so on. For Aurora ve */
  MinCapacity?: number;
  /** The maximum number of Aurora capacity units (ACUs) for a DB instance in an Aurora Serverless v2 cluster. You can specify ACU values in half-step increments, such as 32, 32.5, 33, and so on. The larges */
  MaxCapacity?: number;
  /** Specifies the number of seconds an Aurora Serverless v2 DB instance must be idle before Aurora attempts to automatically pause it. Specify a value between 300 seconds (five minutes) and 86,400 seconds */
  SecondsUntilAutoPause?: number;
}

export interface TagSpecification {
  /** The type of resource to tag on creation. Valid Values: auto-backup - The DB instance's automated backup. cluster-auto-backup - The DB cluster's automated backup. */
  ResourceType?: string;
  Tags?: any[];
}

export interface ProcessorFeature {
  /** The name of the processor feature. Valid names are coreCount and threadsPerCore. */
  Name?: string;
  /** The value of a processor feature. */
  Value?: string;
}

export interface AdditionalStorageVolume {
  /** The name of the additional storage volume. Valid Values: RDSDBDATA2 | RDSDBDATA3 | RDSDBDATA4 */
  VolumeName: string;
  /** The amount of storage allocated for the additional storage volume, in gibibytes (GiB). The minimum is 20 GiB. The maximum is 65,536 GiB (64 TiB). */
  AllocatedStorage?: number;
  /** The number of I/O operations per second (IOPS) provisioned for the additional storage volume. */
  IOPS?: number;
  /** The upper limit in gibibytes (GiB) to which RDS can automatically scale the storage of the additional storage volume. */
  MaxAllocatedStorage?: number;
  /** The storage throughput value for the additional storage volume, in mebibytes per second (MiBps). This setting applies only to the General Purpose SSD (gp3) storage type. */
  StorageThroughput?: number;
  /** The storage type for the additional storage volume. Valid Values: GP3 | IO2 */
  StorageType?: string;
}

export interface UserAuthConfig {
  /** A user-specified description about the authentication used by a proxy to log in as a specific database user. */
  Description?: string;
  /** The name of the database user to which the proxy connects. */
  UserName?: string;
  /** The type of authentication that the proxy uses for connections from the proxy to the underlying database. */
  AuthScheme?: 'SECRETS';
  /** The Amazon Resource Name (ARN) representing the secret that the proxy uses to authenticate to the RDS DB instance or Aurora DB cluster. These secrets are stored within Amazon Secrets Manager. */
  SecretArn?: string;
  /** A value that indicates whether to require or disallow Amazon Web Services Identity and Access Management (IAM) authentication for connections to the proxy. The ENABLED value is valid only for proxies  */
  IAMAuth?: 'DISABLED' | 'REQUIRED' | 'ENABLED';
  /** The type of authentication the proxy uses for connections from clients. The following values are defaults for the corresponding engines: RDS for MySQL: MYSQL_CACHING_SHA2_PASSWORD RDS for SQL Server:  */
  ClientPasswordAuthType?: 'MYSQL_NATIVE_PASSWORD' | 'MYSQL_CACHING_SHA2_PASSWORD' | 'POSTGRES_SCRAM_SHA_256' | 'POSTGRES_MD5' | 'SQL_SERVER_AUTHENTICATION';
}

export interface Filter {
  /** The name of the filter. Filter names are case-sensitive. */
  Name: string;
  /** One or more filter values. Filter values are case-sensitive. */
  Values: any[];
}

export interface CloudwatchLogsExportConfiguration {
  /** The list of log types to enable. The following values are valid for each DB engine: Aurora MySQL - audit | error | general | slowquery Aurora PostgreSQL - postgresql RDS for MySQL - error | general |  */
  EnableLogTypes?: string[];
  /** The list of log types to disable. The following values are valid for each DB engine: Aurora MySQL - audit | error | general | slowquery Aurora PostgreSQL - postgresql RDS for MySQL - error | general | */
  DisableLogTypes?: string[];
}

export interface Parameter {
  /** The name of the parameter. */
  ParameterName?: string;
  /** The value of the parameter. */
  ParameterValue?: string;
  /** Provides a description of the parameter. */
  Description?: string;
  /** The source of the parameter value. */
  Source?: string;
  /** Specifies the engine specific parameters type. */
  ApplyType?: string;
  /** Specifies the valid data type for the parameter. */
  DataType?: string;
  /** Specifies the valid range of values for the parameter. */
  AllowedValues?: string;
  /** Indicates whether (true) or not (false) the parameter can be modified. Some parameters have security or operational implications that prevent them from being changed. */
  IsModifiable?: boolean;
  /** The earliest engine version to which the parameter can apply. */
  MinimumEngineVersion?: string;
  /** Indicates when to apply parameter updates. */
  ApplyMethod?: 'immediate' | 'pending-reboot';
  /** The valid DB engine modes. */
  SupportedEngineModes?: any[];
}

export interface ModifyAdditionalStorageVolume {
  /** The name of the additional storage volume that you want to modify. Valid Values: RDSDBDATA2 | RDSDBDATA3 | RDSDBDATA4 */
  VolumeName: string;
  /** The amount of storage allocated for the additional storage volume, in gibibytes (GiB). The minimum is 20 GiB. The maximum is 65,536 GiB (64 TiB). */
  AllocatedStorage?: number;
  /** The number of I/O operations per second (IOPS) provisioned for the additional storage volume. This setting is only supported for Provisioned IOPS SSD (io1 and io2) storage types. */
  IOPS?: number;
  /** The upper limit in gibibytes (GiB) to which RDS can automatically scale the storage of the additional storage volume. You must provide a value greater than or equal to AllocatedStorage. */
  MaxAllocatedStorage?: number;
  /** The storage throughput value for the additional storage volume, in mebibytes per second (MiBps). This setting applies only to the General Purpose SSD (gp3) storage type. */
  StorageThroughput?: number;
  /** The new storage type for the additional storage volume. Valid Values: GP3 | IO2 */
  StorageType?: string;
  /** Indicates whether to delete the additional storage volume. The value true schedules the volume for deletion. You can delete an additional storage volume only when it doesn't contain database files or  */
  SetForDelete?: boolean;
}

export interface ConnectionPoolConfiguration {
  /** The maximum size of the connection pool for each target in a target group. The value is expressed as a percentage of the max_connections setting for the RDS DB instance or Aurora DB cluster used by th */
  MaxConnectionsPercent?: number;
  /** A value that controls how actively the proxy closes idle database connections in the connection pool. The value is expressed as a percentage of the max_connections setting for the RDS DB instance or A */
  MaxIdleConnectionsPercent?: number;
  /** The number of seconds for a proxy to wait for a connection to become available in the connection pool. This setting only applies when the proxy has opened its maximum number of connections and all con */
  ConnectionBorrowTimeout?: number;
  /** Each item in the list represents a class of SQL operations that normally cause all later statements in a session using a proxy to be pinned to the same underlying database connection. Including an ite */
  SessionPinningFilters?: string[];
  /** Add an initialization query, or modify the current one. You can specify one or more SQL statements for the proxy to run when opening each new database connection. The setting is typically used with SE */
  InitQuery?: string;
}

export interface RecommendedActionUpdate {
  /** A unique identifier of the updated recommendation action. */
  ActionId: string;
  /** The status of the updated recommendation action. applied scheduled */
  Status: string;
}

export interface OptionConfiguration {
  /** The configuration of options to include in a group. */
  OptionName: string;
  /** The optional port for the option. */
  Port?: number;
  /** The version for the option. */
  OptionVersion?: string;
  /** A list of DB security groups used for this option. */
  DBSecurityGroupMemberships?: any[];
  /** A list of VPC security group names used for this option. */
  VpcSecurityGroupMemberships?: any[];
  /** The option settings to include in an option group. */
  OptionSettings?: any[];
}

export interface AddRoleToDBClusterInput {
  /** The name of the DB cluster to associate the IAM role with. */
  DBClusterIdentifier: string;
  /** The Amazon Resource Name (ARN) of the IAM role to associate with the Aurora DB cluster, for example arn:aws:iam::123456789012:role/AuroraAccessRole. */
  RoleArn: string;
  /** The name of the feature for the DB cluster that the IAM role is to be associated with. For information about supported feature names, see DBEngineVersion. */
  FeatureName?: string;
}

export interface AddRoleToDBInstanceInput {
  /** The name of the DB instance to associate the IAM role with. */
  DBInstanceIdentifier: string;
  /** The name of the feature for the DB instance that the IAM role is to be associated with. For information about supported feature names, see DBEngineVersion. */
  FeatureName: string;
  /** The Amazon Resource Name (ARN) of the IAM role to associate with the DB instance, for example arn:aws:iam::123456789012:role/AccessRole. */
  RoleArn: string;
}

export interface AddSourceIdentifierToSubscriptionInput {
  /** The identifier of the event source to be added. Constraints: If the source type is a DB instance, a DBInstanceIdentifier value must be supplied. If the source type is a DB cluster, a DBClusterIdentifi */
  SourceIdentifier: string;
  /** The name of the RDS event notification subscription you want to add a source identifier to. */
  SubscriptionName: string;
}

export interface AddTagsToResourceInput {
  /** The Amazon RDS resource that the tags are added to. This value is an Amazon Resource Name (ARN). For information about creating an ARN, see Constructing an RDS Amazon Resource Name (ARN). */
  ResourceName: string;
  /** The tags to be assigned to the Amazon RDS resource. */
  Tags: Tag[];
}

export interface ApplyPendingMaintenanceActionInput {
  /** The pending maintenance action to apply to this resource. Valid Values: ca-certificate-rotation db-upgrade hardware-maintenance os-upgrade system-update For more information about these actions, see M */
  ApplyAction: string;
  /** A value that specifies the type of opt-in request, or undoes an opt-in request. An opt-in request of type immediate can't be undone. Valid Values: immediate - Apply the maintenance action immediately. */
  OptInType: string;
  /** The RDS Amazon Resource Name (ARN) of the resource that the pending maintenance action applies to. For information about creating an ARN, see Constructing an RDS Amazon Resource Name (ARN). */
  ResourceIdentifier: string;
}

export interface AuthorizeDBSecurityGroupIngressInput {
  /** The name of the DB security group to add authorization to. */
  DBSecurityGroupName: string;
  /** The IP range to authorize. */
  CIDRIP?: string;
  /** Id of the EC2 security group to authorize. For VPC DB security groups, EC2SecurityGroupId must be provided. Otherwise, EC2SecurityGroupOwnerId and either EC2SecurityGroupName or EC2SecurityGroupId mus */
  EC2SecurityGroupId?: string;
  /** Name of the EC2 security group to authorize. For VPC DB security groups, EC2SecurityGroupId must be provided. Otherwise, EC2SecurityGroupOwnerId and either EC2SecurityGroupName or EC2SecurityGroupId m */
  EC2SecurityGroupName?: string;
  /** Amazon Web Services account number of the owner of the EC2 security group specified in the EC2SecurityGroupName parameter. The Amazon Web Services access key ID isn't an acceptable value. For VPC DB s */
  EC2SecurityGroupOwnerId?: string;
}

export interface BacktrackDBClusterInput {
  /** The timestamp of the time to backtrack the DB cluster to, specified in ISO 8601 format. For more information about ISO 8601, see the ISO8601 Wikipedia page. If the specified time isn't a consistent ti */
  BacktrackTo: string;
  /** The DB cluster identifier of the DB cluster to be backtracked. This parameter is stored as a lowercase string. Constraints: Must contain from 1 to 63 alphanumeric characters or hyphens. First characte */
  DBClusterIdentifier: string;
  /** Specifies whether to force the DB cluster to backtrack when binary logging is enabled. Otherwise, an error occurs when binary logging is enabled. */
  Force?: boolean;
  /** Specifies whether to backtrack the DB cluster to the earliest possible backtrack time when BacktrackTo is set to a timestamp earlier than the earliest backtrack time. When this parameter is disabled a */
  UseEarliestTimeOnPointInTimeUnavailable?: boolean;
}

export interface CancelExportTaskInput {
  /** The identifier of the snapshot or cluster export task to cancel. */
  ExportTaskIdentifier: string;
}

export interface CopyDBClusterParameterGroupInput {
  /** The identifier or Amazon Resource Name (ARN) for the source DB cluster parameter group. For information about creating an ARN, see Constructing an ARN for Amazon RDS in the Amazon Aurora User Guide. C */
  SourceDBClusterParameterGroupIdentifier: string;
  /** A description for the copied DB cluster parameter group. */
  TargetDBClusterParameterGroupDescription: string;
  /** The identifier for the copied DB cluster parameter group. Constraints: Can't be null, empty, or blank Must contain from 1 to 255 letters, numbers, or hyphens First character must be a letter Can't end */
  TargetDBClusterParameterGroupIdentifier: string;
  Tags?: Tag[];
}

export interface CopyDBClusterSnapshotInput {
  /** The identifier of the DB cluster snapshot to copy. This parameter isn't case-sensitive. Constraints: Must specify a valid source snapshot in the "available" state. If the source snapshot is in the sam */
  SourceDBClusterSnapshotIdentifier: string;
  /** The identifier of the new DB cluster snapshot to create from the source DB cluster snapshot. This parameter isn't case-sensitive. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens. F */
  TargetDBClusterSnapshotIdentifier: string;
  /** Specifies whether to copy all tags from the source DB cluster snapshot to the target DB cluster snapshot. By default, tags are not copied. */
  CopyTags?: boolean;
  /** The Amazon Web Services KMS key identifier for an encrypted DB cluster snapshot. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the Amazon Web Services */
  KmsKeyId?: string;
  /** When you are copying a DB cluster snapshot from one Amazon Web Services GovCloud (US) Region to another, the URL that contains a Signature Version 4 signed request for the CopyDBClusterSnapshot API op */
  PreSignedUrl?: string;
  Tags?: Tag[];
}

export interface CopyDBParameterGroupInput {
  /** The identifier or ARN for the source DB parameter group. For information about creating an ARN, see Constructing an ARN for Amazon RDS in the Amazon RDS User Guide. Constraints: Must specify a valid D */
  SourceDBParameterGroupIdentifier: string;
  /** A description for the copied DB parameter group. */
  TargetDBParameterGroupDescription: string;
  /** The identifier for the copied DB parameter group. Constraints: Can't be null, empty, or blank Must contain from 1 to 255 letters, numbers, or hyphens First character must be a letter Can't end with a  */
  TargetDBParameterGroupIdentifier: string;
  Tags?: Tag[];
}

export interface CopyDBSnapshotInput {
  /** The identifier for the source DB snapshot. If the source snapshot is in the same Amazon Web Services Region as the copy, specify a valid DB snapshot identifier. For example, you might specify rds:mysq */
  SourceDBSnapshotIdentifier: string;
  /** The identifier for the copy of the snapshot. Constraints: Can't be null, empty, or blank Must contain from 1 to 255 letters, numbers, or hyphens First character must be a letter Can't end with a hyphe */
  TargetDBSnapshotIdentifier: string;
  /** Specifies whether to copy the DB option group associated with the source DB snapshot to the target Amazon Web Services account and associate with the target DB snapshot. The associated option group ca */
  CopyOptionGroup?: boolean;
  /** Specifies whether to copy all tags from the source DB snapshot to the target DB snapshot. By default, tags aren't copied. */
  CopyTags?: boolean;
  /** The Amazon Web Services KMS key identifier for an encrypted DB snapshot. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key. If you copy an enc */
  KmsKeyId?: string;
  /** The name of an option group to associate with the copy of the snapshot. Specify this option if you are copying a snapshot from one Amazon Web Services Region to another, and your DB instance uses a no */
  OptionGroupName?: string;
  /** When you are copying a snapshot from one Amazon Web Services GovCloud (US) Region to another, the URL that contains a Signature Version 4 signed request for the CopyDBSnapshot API operation in the sou */
  PreSignedUrl?: string;
  /** Specifies the name of the Availability Zone where RDS stores the DB snapshot. This value is valid only for snapshots that RDS stores on a Dedicated Local Zone. */
  SnapshotAvailabilityZone?: string;
  /** Configures the location where RDS will store copied snapshots. Valid Values: local (Dedicated Local Zone) outposts (Amazon Web Services Outposts) region (Amazon Web Services Region) */
  SnapshotTarget?: string;
  Tags?: Tag[];
  /** The external custom Availability Zone (CAZ) identifier for the target CAZ. Example: rds-caz-aiqhTgQv. */
  TargetCustomAvailabilityZone?: string;
}

export interface CopyOptionGroupInput {
  /** The identifier for the source option group. Constraints: Must specify a valid option group. */
  SourceOptionGroupIdentifier: string;
  /** The description for the copied option group. */
  TargetOptionGroupDescription: string;
  /** The identifier for the copied option group. Constraints: Can't be null, empty, or blank Must contain from 1 to 255 letters, numbers, or hyphens First character must be a letter Can't end with a hyphen */
  TargetOptionGroupIdentifier: string;
  Tags?: Tag[];
}

export interface CreateBlueGreenDeploymentInput {
  /** The name of the blue/green deployment. Constraints: Can't be the same as an existing blue/green deployment name in the same account and Amazon Web Services Region. */
  BlueGreenDeploymentName: string;
  /** The Amazon Resource Name (ARN) of the source production database. Specify the database that you want to clone. The blue/green deployment creates this database in the green environment. You can make up */
  Source: string;
  /** Tags to assign to the blue/green deployment. */
  Tags?: Tag[];
  /** The amount of storage in gibibytes (GiB) to allocate for the green DB instance. You can choose to increase or decrease the allocated storage on the green DB instance. This setting doesn't apply to Ama */
  TargetAllocatedStorage?: number;
  /** The DB cluster parameter group associated with the Aurora DB cluster in the green environment. To test parameter changes, specify a DB cluster parameter group that is different from the one associated */
  TargetDBClusterParameterGroupName?: string;
  /** Specify the DB instance class for the databases in the green environment. This parameter only applies to RDS DB instances, because DB instances within an Aurora DB cluster can have multiple different  */
  TargetDBInstanceClass?: string;
  /** The DB parameter group associated with the DB instance in the green environment. To test parameter changes, specify a DB parameter group that is different from the one associated with the source DB in */
  TargetDBParameterGroupName?: string;
  /** The engine version of the database in the green environment. Specify the engine version to upgrade to in the green environment. */
  TargetEngineVersion?: string;
  /** The amount of Provisioned IOPS (input/output operations per second) to allocate for the green DB instance. For information about valid IOPS values, see Amazon RDS DB instance storage in the Amazon RDS */
  TargetIops?: number;
  /** The storage throughput value for the green DB instance. This setting applies only to the gp3 storage type. This setting doesn't apply to Amazon Aurora blue/green deployments. */
  TargetStorageThroughput?: number;
  /** The storage type to associate with the green DB instance. Valid Values: gp2 | gp3 | io1 | io2 This setting doesn't apply to Amazon Aurora blue/green deployments. */
  TargetStorageType?: string;
  /** Whether to upgrade the storage file system configuration on the green database. This option migrates the green DB instance from the older 32-bit file system to the preferred configuration. For more in */
  UpgradeTargetStorageConfig?: boolean;
}

export interface CreateCustomDBEngineVersionInput {
  /** The database engine. RDS Custom for Oracle supports the following values: custom-oracle-ee custom-oracle-ee-cdb custom-oracle-se2 custom-oracle-se2-cdb RDS Custom for SQL Server supports the following */
  Engine: string;
  /** The name of your custom engine version (CEV). For RDS Custom for Oracle, the name format is 19.*customized_string*. For example, a valid CEV name is 19.my_cev1. For RDS for SQL Server and RDS Custom f */
  EngineVersion: string;
  /** The database installation files (ISO and EXE) uploaded to Amazon S3 for your database engine version to import to Amazon RDS. */
  DatabaseInstallationFiles?: string[];
  /** The name of an Amazon S3 bucket that contains database installation files for your CEV. For example, a valid bucket name is my-custom-installation-files. */
  DatabaseInstallationFilesS3BucketName?: string;
  /** The Amazon S3 directory that contains the database installation files for your CEV. For example, a valid bucket name is 123456789012/cev1. If this setting isn't specified, no prefix is assumed. */
  DatabaseInstallationFilesS3Prefix?: string;
  /** An optional description of your CEV. */
  Description?: string;
  /** The ID of the Amazon Machine Image (AMI). For RDS Custom for SQL Server, an AMI ID is required to create a CEV. For RDS Custom for Oracle, the default is the most recent AMI available, but you can spe */
  ImageId?: string;
  /** The Amazon Web Services KMS key identifier for an encrypted CEV. A symmetric encryption KMS key is required for RDS Custom, but optional for Amazon RDS. If you have an existing symmetric encryption KM */
  KMSKeyId?: string;
  /** The CEV manifest, which is a JSON document that describes the installation .zip files stored in Amazon S3. Specify the name/value pairs in a file or a quoted string. RDS Custom applies the patches in  */
  Manifest?: string;
  /** The ARN of a CEV to use as a source for creating a new CEV. You can specify a different Amazon Machine Imagine (AMI) by using either Source or UseAwsProvidedLatestImage. You can't specify a different  */
  SourceCustomDbEngineVersionIdentifier?: string;
  Tags?: Tag[];
  /** Specifies whether to use the latest service-provided Amazon Machine Image (AMI) for the CEV. If you specify UseAwsProvidedLatestImage, you can't also specify ImageId. */
  UseAwsProvidedLatestImage?: boolean;
}

export interface CreateDBClusterInput {
  /** The identifier for this DB cluster. This parameter is stored as a lowercase string. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Constraints: Must contain from 1 to 63 (for Auro */
  DBClusterIdentifier: string;
  /** The database engine to use for this DB cluster. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Valid Values: aurora-mysql aurora-postgresql mysql postgres neptune - For informatio */
  Engine: string;
  /** The amount of storage in gibibytes (GiB) to allocate to each DB instance in the Multi-AZ DB cluster. Valid for Cluster Type: Multi-AZ DB clusters only This setting is required to create a Multi-AZ DB  */
  AllocatedStorage?: number;
  /** Specifies whether minor engine upgrades are applied automatically to the DB cluster during the maintenance window. By default, minor engine upgrades are applied automatically. Valid for Cluster Type:  */
  AutoMinorVersionUpgrade?: boolean;
  /** A list of Availability Zones (AZs) where you specifically want to create DB instances in the DB cluster. For the first three DB instances that you create, RDS distributes each DB instance to a differe */
  AvailabilityZones?: string[];
  /** The target backtrack window, in seconds. To disable backtracking, set this value to 0. Valid for Cluster Type: Aurora MySQL DB clusters only Default: 0 Constraints: If specified, this value must be se */
  BacktrackWindow?: number;
  /** The number of days for which automated backups are retained. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Default: 1 Constraints: Must be a value from 1 to 35. */
  BackupRetentionPeriod?: number;
  /** The CA certificate identifier to use for the DB cluster's server certificate. For more information, see Using SSL/TLS to encrypt a connection to a DB instance in the Amazon RDS User Guide. Valid for C */
  CACertificateIdentifier?: string;
  /** The name of the character set (CharacterSet) to associate the DB cluster with. Valid for Cluster Type: Aurora DB clusters only */
  CharacterSetName?: string;
  /** Specifies the scalability mode of the Aurora DB cluster. When set to limitless, the cluster operates as an Aurora Limitless Database. When set to standard (the default), the cluster uses normal DB ins */
  ClusterScalabilityType?: 'standard' | 'limitless';
  /** Specifies whether to copy all tags from the DB cluster to snapshots of the DB cluster. The default is not to copy them. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters */
  CopyTagsToSnapshot?: boolean;
  /** The mode of Database Insights to enable for the DB cluster. If you set this value to advanced, you must also set the PerformanceInsightsEnabled parameter to true and the PerformanceInsightsRetentionPe */
  DatabaseInsightsMode?: 'standard' | 'advanced';
  /** The name for your database of up to 64 alphanumeric characters. A database named postgres is always created. If this parameter is specified, an additional database with this name is created. Valid for */
  DatabaseName?: string;
  /** The compute and memory capacity of each DB instance in the Multi-AZ DB cluster, for example db.m6gd.xlarge. Not all DB instance classes are available in all Amazon Web Services Regions, or for all dat */
  DBClusterInstanceClass?: string;
  /** The name of the DB cluster parameter group to associate with this DB cluster. If you don't specify a value, then the default DB cluster parameter group for the specified DB engine and version is used. */
  DBClusterParameterGroupName?: string;
  /** A DB subnet group to associate with this DB cluster. This setting is required to create a Multi-AZ DB cluster. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Constraints: Must mat */
  DBSubnetGroupName?: string;
  /** Reserved for future use. */
  DBSystemId?: string;
  /** Specifies whether the DB cluster has deletion protection enabled. The database can't be deleted when deletion protection is enabled. By default, deletion protection isn't enabled. Valid for Cluster Ty */
  DeletionProtection?: boolean;
  /** The Active Directory directory ID to create the DB cluster in. For Amazon Aurora DB clusters, Amazon RDS can use Kerberos authentication to authenticate users that connect to the DB cluster. For more  */
  Domain?: string;
  /** The name of the IAM role to use when making API calls to the Directory Service. Valid for Cluster Type: Aurora DB clusters only */
  DomainIAMRoleName?: string;
  /** The list of log types that need to be enabled for exporting to CloudWatch Logs. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters The following values are valid for each DB engine: A */
  EnableCloudwatchLogsExports?: string[];
  /** Specifies whether to enable this DB cluster to forward write operations to the primary cluster of a global cluster (Aurora global database). By default, write operations are not allowed on Aurora DB c */
  EnableGlobalWriteForwarding?: boolean;
  /** Specifies whether to enable the HTTP endpoint for the DB cluster. By default, the HTTP endpoint isn't enabled. When enabled, the HTTP endpoint provides a connectionless web service API (RDS Data API)  */
  EnableHttpEndpoint?: boolean;
  /** Specifies whether to enable mapping of Amazon Web Services Identity and Access Management (IAM) accounts to database accounts. By default, mapping isn't enabled. For more information, see IAM Database */
  EnableIAMDatabaseAuthentication?: boolean;
  /** Specifies whether to enable Aurora Limitless Database. You must enable Aurora Limitless Database to create a DB shard group. Valid for: Aurora DB clusters only This setting is no longer used. Instead  */
  EnableLimitlessDatabase?: boolean;
  /** Specifies whether read replicas can forward write operations to the writer DB instance in the DB cluster. By default, write operations aren't allowed on reader DB instances. Valid for: Aurora DB clust */
  EnableLocalWriteForwarding?: boolean;
  /** Specifies whether to turn on Performance Insights for the DB cluster. For more information, see Using Amazon Performance Insights in the Amazon RDS User Guide. Valid for Cluster Type: Aurora DB cluste */
  EnablePerformanceInsights?: boolean;
  /** The life cycle type for this DB cluster. By default, this value is set to open-source-rds-extended-support, which enrolls your DB cluster into Amazon RDS Extended Support. At the end of standard suppo */
  EngineLifecycleSupport?: string;
  /** The DB engine mode of the DB cluster, either provisioned or serverless. The serverless engine mode only applies for Aurora Serverless v1 DB clusters. Aurora Serverless v2 DB clusters use the provision */
  EngineMode?: string;
  /** The version number of the database engine to use. To list all of the available engine versions for Aurora MySQL version 2 (5.7-compatible) and version 3 (MySQL 8.0-compatible), use the following comma */
  EngineVersion?: string;
  /** The global cluster ID of an Aurora cluster that becomes the primary cluster in the new global database cluster. Valid for Cluster Type: Aurora DB clusters only */
  GlobalClusterIdentifier?: string;
  /** The amount of Provisioned IOPS (input/output operations per second) to be initially allocated for each DB instance in the Multi-AZ DB cluster. For information about valid IOPS values, see Provisioned  */
  Iops?: number;
  /** The Amazon Web Services KMS key identifier for an encrypted DB cluster. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key. To use a KMS key in */
  KmsKeyId?: string;
  /** Specifies whether to manage the master user password with Amazon Web Services Secrets Manager. For more information, see Password management with Amazon Web Services Secrets Manager in the Amazon RDS  */
  ManageMasterUserPassword?: boolean;
  /** Specifies the authentication type for the master user. With IAM master user authentication, you can configure the master DB user with IAM database authentication when you create a DB cluster. You can  */
  MasterUserAuthenticationType?: 'password' | 'iam-db-auth';
  /** The name of the master user for the DB cluster. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Constraints: Must be 1 to 16 letters or numbers. First character must be a letter. C */
  MasterUsername?: string;
  /** The password for the master database user. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Constraints: Must contain from 8 to 41 characters. Can contain any printable ASCII charac */
  MasterUserPassword?: string;
  /** The Amazon Web Services KMS key identifier to encrypt a secret that is automatically generated and managed in Amazon Web Services Secrets Manager. This setting is valid only if the master user passwor */
  MasterUserSecretKmsKeyId?: string;
  /** The interval, in seconds, between points when Enhanced Monitoring metrics are collected for the DB cluster. To turn off collecting Enhanced Monitoring metrics, specify 0. If MonitoringRoleArn is speci */
  MonitoringInterval?: number;
  /** The Amazon Resource Name (ARN) for the IAM role that permits RDS to send Enhanced Monitoring metrics to Amazon CloudWatch Logs. An example is arn:aws:iam:123456789012:role/emaccess. For information on */
  MonitoringRoleArn?: string;
  /** The network type of the DB cluster. The network type is determined by the DBSubnetGroup specified for the DB cluster. A DBSubnetGroup can support only the IPv4 protocol or the IPv4 and the IPv6 protoc */
  NetworkType?: string;
  /** The option group to associate the DB cluster with. DB clusters are associated with a default option group that can't be modified. */
  OptionGroupName?: string;
  /** The Amazon Web Services KMS key identifier for encryption of Performance Insights data. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key. If  */
  PerformanceInsightsKMSKeyId?: string;
  /** The number of days to retain Performance Insights data. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Valid Values: 7 month * 31, where month is a number of months from 1-23. Exa */
  PerformanceInsightsRetentionPeriod?: number;
  /** The port number on which the instances in the DB cluster accept connections. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Valid Values: 1150-65535 Default: RDS for MySQL and Aur */
  Port?: number;
  /** The daily time range during which automated backups are created if automated backups are enabled using the BackupRetentionPeriod parameter. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB c */
  PreferredBackupWindow?: string;
  /** The weekly time range during which system maintenance can occur. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters The default is a 30-minute window selected at random from an 8-hour */
  PreferredMaintenanceWindow?: string;
  /** When you are replicating a DB cluster from one Amazon Web Services GovCloud (US) Region to another, an URL that contains a Signature Version 4 signed request for the CreateDBCluster operation to be ca */
  PreSignedUrl?: string;
  /** Specifies whether the DB cluster is publicly accessible. Valid for Cluster Type: Multi-AZ DB clusters only When the DB cluster is publicly accessible and you connect from outside of the DB cluster's v */
  PubliclyAccessible?: boolean;
  /** Reserved for future use. */
  RdsCustomClusterConfiguration?: RdsCustomClusterConfiguration;
  /** The Amazon Resource Name (ARN) of the source DB instance or DB cluster if this DB cluster is created as a read replica. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters */
  ReplicationSourceIdentifier?: string;
  /** For DB clusters in serverless DB engine mode, the scaling properties of the DB cluster. Valid for Cluster Type: Aurora DB clusters only */
  ScalingConfiguration?: ScalingConfiguration;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  /** Specifies whether the DB cluster is encrypted. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters */
  StorageEncrypted?: boolean;
  /** The storage type to associate with the DB cluster. For information on storage types for Aurora DB clusters, see Storage configurations for Amazon Aurora DB clusters. For information on storage types f */
  StorageType?: string;
  /** Tags to assign to the DB cluster. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters */
  Tags?: Tag[];
  /** Tags to assign to resources associated with the DB cluster. Valid Values: cluster-auto-backup - The DB cluster's automated backup. */
  TagSpecifications?: TagSpecification[];
  /** A list of EC2 VPC security groups to associate with this DB cluster. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters */
  VpcSecurityGroupIds?: string[];
}

export interface CreateDBClusterEndpointInput {
  /** The identifier to use for the new endpoint. This parameter is stored as a lowercase string. */
  DBClusterEndpointIdentifier: string;
  /** The DB cluster identifier of the DB cluster associated with the endpoint. This parameter is stored as a lowercase string. */
  DBClusterIdentifier: string;
  /** The type of the endpoint, one of: READER, WRITER, ANY. */
  EndpointType: string;
  /** List of DB instance identifiers that aren't part of the custom endpoint group. All other eligible instances are reachable through the custom endpoint. This parameter is relevant only if the list of st */
  ExcludedMembers?: string[];
  /** List of DB instance identifiers that are part of the custom endpoint group. */
  StaticMembers?: string[];
  /** The tags to be assigned to the Amazon RDS resource. */
  Tags?: Tag[];
}

export interface CreateDBClusterParameterGroupInput {
  /** The name of the DB cluster parameter group. Constraints: Must not match the name of an existing DB cluster parameter group. This value is stored as a lowercase string. */
  DBClusterParameterGroupName: string;
  /** The DB cluster parameter group family name. A DB cluster parameter group can be associated with one and only one DB cluster parameter group family, and can be applied only to a DB cluster running a da */
  DBParameterGroupFamily: string;
  /** The description for the DB cluster parameter group. */
  Description: string;
  /** Tags to assign to the DB cluster parameter group. */
  Tags?: Tag[];
}

export interface CreateDBClusterSnapshotInput {
  /** The identifier of the DB cluster to create a snapshot for. This parameter isn't case-sensitive. Constraints: Must match the identifier of an existing DBCluster. Example: my-cluster1 */
  DBClusterIdentifier: string;
  /** The identifier of the DB cluster snapshot. This parameter is stored as a lowercase string. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens. First character must be a letter. Can't  */
  DBClusterSnapshotIdentifier: string;
  /** The tags to be assigned to the DB cluster snapshot. */
  Tags?: Tag[];
}

export interface CreateDBInstanceInput {
  /** The compute and memory capacity of the DB instance, for example db.m5.large. Not all DB instance classes are available in all Amazon Web Services Regions, or for all database engines. For the full lis */
  DBInstanceClass: string;
  /** The identifier for this DB instance. This parameter is stored as a lowercase string. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens. First character must be a letter. Can't end wi */
  DBInstanceIdentifier: string;
  /** The database engine to use for this DB instance. Not every database engine is available in every Amazon Web Services Region. Valid Values: aurora-mysql (for Aurora MySQL DB instances) aurora-postgresq */
  Engine: string;
  /** A list of additional storage volumes to create for the DB instance. You can create up to three additional storage volumes using the names rdsdbdata2, rdsdbdata3, and rdsdbdata4. Additional storage vol */
  AdditionalStorageVolumes?: AdditionalStorageVolume[];
  /** The amount of storage in gibibytes (GiB) to allocate for the DB instance. This setting doesn't apply to Amazon Aurora DB instances. Aurora cluster volumes automatically grow as the amount of data in y */
  AllocatedStorage?: number;
  /** Specifies whether minor engine upgrades are applied automatically to the DB instance during the maintenance window. By default, minor engine upgrades are applied automatically. If you create an RDS Cu */
  AutoMinorVersionUpgrade?: boolean;
  /** The Availability Zone (AZ) where the database will be created. For information on Amazon Web Services Regions and Availability Zones, see Regions and Availability Zones. For Amazon Aurora, each Aurora */
  AvailabilityZone?: string;
  /** The number of days for which automated backups are retained. Setting this parameter to a positive number enables backups. Setting this parameter to 0 disables automated backups. This setting doesn't a */
  BackupRetentionPeriod?: number;
  /** The location for storing automated backups and manual snapshots. Valid Values: local (Dedicated Local Zone) outposts (Amazon Web Services Outposts) region (Amazon Web Services Region) Default: region  */
  BackupTarget?: string;
  /** The CA certificate identifier to use for the DB instance's server certificate. This setting doesn't apply to RDS Custom DB instances. For more information, see Using SSL/TLS to encrypt a connection to */
  CACertificateIdentifier?: string;
  /** For supported engines, the character set (CharacterSet) to associate the DB instance with. This setting doesn't apply to the following DB instances: Amazon Aurora - The character set is managed by the */
  CharacterSetName?: string;
  /** Specifies whether to copy tags from the DB instance to snapshots of the DB instance. By default, tags are not copied. This setting doesn't apply to Amazon Aurora DB instances. Copying tags to snapshot */
  CopyTagsToSnapshot?: boolean;
  /** The instance profile associated with the underlying Amazon EC2 instance of an RDS Custom DB instance. This setting is required for RDS Custom. Constraints: The profile must exist in your account. The  */
  CustomIamInstanceProfile?: string;
  /** The mode of Database Insights to enable for the DB instance. Aurora DB instances inherit this value from the DB cluster, so you can't change this value. */
  DatabaseInsightsMode?: 'standard' | 'advanced';
  /** The identifier of the DB cluster that this DB instance will belong to. This setting doesn't apply to RDS Custom DB instances. */
  DBClusterIdentifier?: string;
  /** The meaning of this parameter differs according to the database engine you use. Amazon Aurora MySQL The name of the database to create when the primary DB instance of the Aurora MySQL DB cluster is cr */
  DBName?: string;
  /** The name of the DB parameter group to associate with this DB instance. If you don't specify a value, then Amazon RDS uses the default DB parameter group for the specified DB engine and version. This s */
  DBParameterGroupName?: string;
  /** A list of DB security groups to associate with this DB instance. This setting applies to the legacy EC2-Classic platform, which is no longer used to create new DB instances. Use the VpcSecurityGroupId */
  DBSecurityGroups?: string[];
  /** A DB subnet group to associate with this DB instance. Constraints: Must match the name of an existing DB subnet group. Example: mydbsubnetgroup */
  DBSubnetGroupName?: string;
  /** The Oracle system identifier (SID), which is the name of the Oracle database instance that manages your database files. In this context, the term "Oracle database instance" refers exclusively to the s */
  DBSystemId?: string;
  /** Indicates whether the DB instance has a dedicated log volume (DLV) enabled. */
  DedicatedLogVolume?: boolean;
  /** Specifies whether the DB instance has deletion protection enabled. The database can't be deleted when deletion protection is enabled. By default, deletion protection isn't enabled. For more informatio */
  DeletionProtection?: boolean;
  /** The Active Directory directory ID to create the DB instance in. Currently, you can create only Db2, MySQL, Microsoft SQL Server, Oracle, and PostgreSQL DB instances in an Active Directory Domain. For  */
  Domain?: string;
  /** The ARN for the Secrets Manager secret with the credentials for the user joining the domain. Example: arn:aws:secretsmanager:region:account-number:secret:myselfmanagedADtestsecret-123456 */
  DomainAuthSecretArn?: string;
  /** The IPv4 DNS IP addresses of your primary and secondary Active Directory domain controllers. Constraints: Two IP addresses must be provided. If there isn't a secondary domain controller, use the IP ad */
  DomainDnsIps?: string[];
  /** The fully qualified domain name (FQDN) of an Active Directory domain. Constraints: Can't be longer than 64 characters. Example: mymanagedADtest.mymanagedAD.mydomain */
  DomainFqdn?: string;
  /** The name of the IAM role to use when making API calls to the Directory Service. This setting doesn't apply to the following DB instances: Amazon Aurora (The domain is managed by the DB cluster.) RDS C */
  DomainIAMRoleName?: string;
  /** The Active Directory organizational unit for your DB instance to join. Constraints: Must be in the distinguished name format. Can't be longer than 64 characters. Example: OU=mymanagedADtestOU,DC=myman */
  DomainOu?: string;
  /** The list of log types to enable for exporting to CloudWatch Logs. For more information, see Publishing Database Logs to Amazon CloudWatch Logs in the Amazon RDS User Guide. This setting doesn't apply  */
  EnableCloudwatchLogsExports?: string[];
  /** Specifies whether to enable a customer-owned IP address (CoIP) for an RDS on Outposts DB instance. A CoIP provides local or external connectivity to resources in your Outpost subnets through your on-p */
  EnableCustomerOwnedIp?: boolean;
  /** Specifies whether to enable mapping of Amazon Web Services Identity and Access Management (IAM) accounts to database accounts. By default, mapping isn't enabled. For more information, see IAM Database */
  EnableIAMDatabaseAuthentication?: boolean;
  /** Specifies whether to enable Performance Insights for the DB instance. For more information, see Using Amazon Performance Insights in the Amazon RDS User Guide. This setting doesn't apply to RDS Custom */
  EnablePerformanceInsights?: boolean;
  /** The life cycle type for this DB instance. By default, this value is set to open-source-rds-extended-support, which enrolls your DB instance into Amazon RDS Extended Support. At the end of standard sup */
  EngineLifecycleSupport?: string;
  /** The version number of the database engine to use. This setting doesn't apply to Amazon Aurora DB instances. The version number of the database engine the DB instance uses is managed by the DB cluster. */
  EngineVersion?: string;
  /** The amount of Provisioned IOPS (input/output operations per second) to initially allocate for the DB instance. For information about valid IOPS values, see Amazon RDS DB instance storage in the Amazon */
  Iops?: number;
  /** The Amazon Web Services KMS key identifier for an encrypted DB instance. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key. To use a KMS key i */
  KmsKeyId?: string;
  /** The license model information for this DB instance. License models for RDS for Db2 require additional configuration. The bring your own license (BYOL) model requires a custom parameter group and an Am */
  LicenseModel?: string;
  /** Specifies whether to manage the master user password with Amazon Web Services Secrets Manager. For more information, see Password management with Amazon Web Services Secrets Manager in the Amazon RDS  */
  ManageMasterUserPassword?: boolean;
  /** Specifies the authentication type for the master user. With IAM master user authentication, you can configure the master DB user with IAM database authentication when you create a DB instance. You can */
  MasterUserAuthenticationType?: 'password' | 'iam-db-auth';
  /** The name for the master user. This setting doesn't apply to Amazon Aurora DB instances. The name for the master user is managed by the DB cluster. This setting is required for RDS DB instances. Constr */
  MasterUsername?: string;
  /** The password for the master user. This setting doesn't apply to Amazon Aurora DB instances. The password for the master user is managed by the DB cluster. Constraints: Can't be specified if ManageMast */
  MasterUserPassword?: string;
  /** The Amazon Web Services KMS key identifier to encrypt a secret that is automatically generated and managed in Amazon Web Services Secrets Manager. This setting is valid only if the master user passwor */
  MasterUserSecretKmsKeyId?: string;
  /** The upper limit in gibibytes (GiB) to which Amazon RDS can automatically scale the storage of the DB instance. For more information about this setting, including limitations that apply to it, see Mana */
  MaxAllocatedStorage?: number;
  /** The interval, in seconds, between points when Enhanced Monitoring metrics are collected for the DB instance. To disable collection of Enhanced Monitoring metrics, specify 0. If MonitoringRoleArn is sp */
  MonitoringInterval?: number;
  /** The ARN for the IAM role that permits RDS to send enhanced monitoring metrics to Amazon CloudWatch Logs. For example, arn:aws:iam:123456789012:role/emaccess. For information on creating a monitoring r */
  MonitoringRoleArn?: string;
  /** Specifies whether the DB instance is a Multi-AZ deployment. You can't set the AvailabilityZone parameter if the DB instance is a Multi-AZ deployment. This setting doesn't apply to Amazon Aurora becaus */
  MultiAZ?: boolean;
  /** Specifies whether to use the multi-tenant configuration or the single-tenant configuration (default). This parameter only applies to RDS for Oracle container database (CDB) engines. Note the following */
  MultiTenant?: boolean;
  /** The name of the NCHAR character set for the Oracle DB instance. This setting doesn't apply to RDS Custom DB instances. */
  NcharCharacterSetName?: string;
  /** The network type of the DB instance. The network type is determined by the DBSubnetGroup specified for the DB instance. A DBSubnetGroup can support only the IPv4 protocol or the IPv4 and the IPv6 prot */
  NetworkType?: string;
  /** The option group to associate the DB instance with. Permanent options, such as the TDE option for Oracle Advanced Security TDE, can't be removed from an option group. Also, that option group can't be  */
  OptionGroupName?: string;
  /** The Amazon Web Services KMS key identifier for encryption of Performance Insights data. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key. If  */
  PerformanceInsightsKMSKeyId?: string;
  /** The number of days to retain Performance Insights data. This setting doesn't apply to RDS Custom DB instances. Valid Values: 7 month * 31, where month is a number of months from 1-23. Examples: 93 (3  */
  PerformanceInsightsRetentionPeriod?: number;
  /** The port number on which the database accepts connections. This setting doesn't apply to Aurora DB instances. The port number is managed by the cluster. Valid Values: 1150-65535 Default: RDS for Db2 - */
  Port?: number;
  /** The daily time range during which automated backups are created if automated backups are enabled, using the BackupRetentionPeriod parameter. The default is a 30-minute window selected at random from a */
  PreferredBackupWindow?: string;
  /** The time range each week during which system maintenance can occur. For more information, see Amazon RDS Maintenance Window in the Amazon RDS User Guide. The default is a 30-minute window selected at  */
  PreferredMaintenanceWindow?: string;
  /** The number of CPU cores and the number of threads per core for the DB instance class of the DB instance. This setting doesn't apply to Amazon Aurora or RDS Custom DB instances. */
  ProcessorFeatures?: ProcessorFeature[];
  /** The order of priority in which an Aurora Replica is promoted to the primary instance after a failure of the existing primary instance. For more information, see Fault Tolerance for an Aurora DB Cluste */
  PromotionTier?: number;
  /** Specifies whether the DB instance is publicly accessible. When the DB instance is publicly accessible and you connect from outside of the DB instance's virtual private cloud (VPC), its domain name sys */
  PubliclyAccessible?: boolean;
  /** Specifes whether the DB instance is encrypted. By default, it isn't encrypted. For RDS Custom DB instances, either enable this setting or leave it unset. Otherwise, Amazon RDS reports an error. This s */
  StorageEncrypted?: boolean;
  /** The storage throughput value, in mebibyte per second (MiBps), for the DB instance. This setting applies only to the gp3 storage type. This setting doesn't apply to Amazon Aurora or RDS Custom DB insta */
  StorageThroughput?: number;
  /** The storage type to associate with the DB instance. If you specify io1, io2, or gp3, you must also include a value for the Iops parameter. This setting doesn't apply to Amazon Aurora DB instances. Sto */
  StorageType?: string;
  /** Tags to assign to the DB instance. */
  Tags?: Tag[];
  /** Tags to assign to resources associated with the DB instance. Valid Values: auto-backup - The DB instance's automated backup. */
  TagSpecifications?: TagSpecification[];
  /** The ARN from the key store with which to associate the instance for TDE encryption. This setting doesn't apply to Amazon Aurora or RDS Custom DB instances. */
  TdeCredentialArn?: string;
  /** The password for the given ARN from the key store in order to access the device. This setting doesn't apply to RDS Custom DB instances. */
  TdeCredentialPassword?: string;
  /** The time zone of the DB instance. The time zone parameter is currently supported only by RDS for Db2 and RDS for SQL Server. */
  Timezone?: string;
  /** A list of Amazon EC2 VPC security groups to associate with this DB instance. This setting doesn't apply to Amazon Aurora DB instances. The associated list of EC2 VPC security groups is managed by the  */
  VpcSecurityGroupIds?: string[];
}

export interface CreateDBInstanceReadReplicaInput {
  /** The DB instance identifier of the read replica. This identifier is the unique key that identifies a DB instance. This parameter is stored as a lowercase string. */
  DBInstanceIdentifier: string;
  /** A list of additional storage volumes to create for the DB instance. You can create up to three additional storage volumes using the names rdsdbdata2, rdsdbdata3, and rdsdbdata4. Additional storage vol */
  AdditionalStorageVolumes?: AdditionalStorageVolume[];
  /** The amount of storage (in gibibytes) to allocate initially for the read replica. Follow the allocation rules specified in CreateDBInstance. This setting isn't valid for RDS for SQL Server. Be sure to  */
  AllocatedStorage?: number;
  /** Specifies whether to automatically apply minor engine upgrades to the read replica during the maintenance window. This setting doesn't apply to RDS Custom DB instances. Default: Inherits the value fro */
  AutoMinorVersionUpgrade?: boolean;
  /** The Availability Zone (AZ) where the read replica will be created. Default: A random, system-chosen Availability Zone in the endpoint's Amazon Web Services Region. Example: us-east-1d */
  AvailabilityZone?: string;
  /** The location where RDS stores automated backups and manual snapshots. Valid Values: local for Dedicated Local Zones region for Amazon Web Services Region */
  BackupTarget?: string;
  /** The CA certificate identifier to use for the read replica's server certificate. This setting doesn't apply to RDS Custom DB instances. For more information, see Using SSL/TLS to encrypt a connection t */
  CACertificateIdentifier?: string;
  /** Specifies whether to copy all tags from the read replica to snapshots of the read replica. By default, tags aren't copied. */
  CopyTagsToSnapshot?: boolean;
  /** The instance profile associated with the underlying Amazon EC2 instance of an RDS Custom DB instance. The instance profile must meet the following requirements: The profile must exist in your account. */
  CustomIamInstanceProfile?: string;
  /** The mode of Database Insights to enable for the read replica. This setting isn't supported. */
  DatabaseInsightsMode?: 'standard' | 'advanced';
  /** The compute and memory capacity of the read replica, for example db.m4.large. Not all DB instance classes are available in all Amazon Web Services Regions, or for all database engines. For the full li */
  DBInstanceClass?: string;
  /** The name of the DB parameter group to associate with this read replica DB instance. For the Db2 DB engine, if your source DB instance uses the bring your own license (BYOL) model, then a custom parame */
  DBParameterGroupName?: string;
  /** A DB subnet group for the DB instance. The new DB instance is created in the VPC associated with the DB subnet group. If no DB subnet group is specified, then the new DB instance isn't created in a VP */
  DBSubnetGroupName?: string;
  /** Indicates whether the DB instance has a dedicated log volume (DLV) enabled. */
  DedicatedLogVolume?: boolean;
  /** Specifies whether to enable deletion protection for the DB instance. The database can't be deleted when deletion protection is enabled. By default, deletion protection isn't enabled. For more informat */
  DeletionProtection?: boolean;
  /** The Active Directory directory ID to create the DB instance in. Currently, only MySQL, Microsoft SQL Server, Oracle, and PostgreSQL DB instances can be created in an Active Directory Domain. For more  */
  Domain?: string;
  /** The ARN for the Secrets Manager secret with the credentials for the user joining the domain. Example: arn:aws:secretsmanager:region:account-number:secret:myselfmanagedADtestsecret-123456 */
  DomainAuthSecretArn?: string;
  /** The IPv4 DNS IP addresses of your primary and secondary Active Directory domain controllers. Constraints: Two IP addresses must be provided. If there isn't a secondary domain controller, use the IP ad */
  DomainDnsIps?: string[];
  /** The fully qualified domain name (FQDN) of an Active Directory domain. Constraints: Can't be longer than 64 characters. Example: mymanagedADtest.mymanagedAD.mydomain */
  DomainFqdn?: string;
  /** The name of the IAM role to use when making API calls to the Directory Service. This setting doesn't apply to RDS Custom DB instances. */
  DomainIAMRoleName?: string;
  /** The Active Directory organizational unit for your DB instance to join. Constraints: Must be in the distinguished name format. Can't be longer than 64 characters. Example: OU=mymanagedADtestOU,DC=myman */
  DomainOu?: string;
  /** The list of logs that the new DB instance is to export to CloudWatch Logs. The values in the list depend on the DB engine being used. For more information, see Publishing Database Logs to Amazon Cloud */
  EnableCloudwatchLogsExports?: string[];
  /** Specifies whether to enable a customer-owned IP address (CoIP) for an RDS on Outposts read replica. A CoIP provides local or external connectivity to resources in your Outpost subnets through your on- */
  EnableCustomerOwnedIp?: boolean;
  /** Specifies whether to enable mapping of Amazon Web Services Identity and Access Management (IAM) accounts to database accounts. By default, mapping isn't enabled. For more information about IAM databas */
  EnableIAMDatabaseAuthentication?: boolean;
  /** Specifies whether to enable Performance Insights for the read replica. For more information, see Using Amazon Performance Insights in the Amazon RDS User Guide. This setting doesn't apply to RDS Custo */
  EnablePerformanceInsights?: boolean;
  /** The amount of Provisioned IOPS (input/output operations per second) to initially allocate for the DB instance. */
  Iops?: number;
  /** The Amazon Web Services KMS key identifier for an encrypted read replica. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key. If you create an  */
  KmsKeyId?: string;
  /** The upper limit in gibibytes (GiB) to which Amazon RDS can automatically scale the storage of the DB instance. For more information about this setting, including limitations that apply to it, see Mana */
  MaxAllocatedStorage?: number;
  /** The interval, in seconds, between points when Enhanced Monitoring metrics are collected for the read replica. To disable collection of Enhanced Monitoring metrics, specify 0. The default is 0. If Moni */
  MonitoringInterval?: number;
  /** The ARN for the IAM role that permits RDS to send enhanced monitoring metrics to Amazon CloudWatch Logs. For example, arn:aws:iam:123456789012:role/emaccess. For information on creating a monitoring r */
  MonitoringRoleArn?: string;
  /** Specifies whether the read replica is in a Multi-AZ deployment. You can create a read replica as a Multi-AZ DB instance. RDS creates a standby of your replica in another Availability Zone for failover */
  MultiAZ?: boolean;
  /** The network type of the DB instance. Valid Values: IPV4 DUAL The network type is determined by the DBSubnetGroup specified for read replica. A DBSubnetGroup can support only the IPv4 protocol or the I */
  NetworkType?: string;
  /** The option group to associate the DB instance with. If not specified, RDS uses the option group associated with the source DB instance or cluster. For SQL Server, you must use the option group associa */
  OptionGroupName?: string;
  /** The Amazon Web Services KMS key identifier for encryption of Performance Insights data. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key. If  */
  PerformanceInsightsKMSKeyId?: string;
  /** The number of days to retain Performance Insights data. This setting doesn't apply to RDS Custom DB instances. Valid Values: 7 month * 31, where month is a number of months from 1-23. Examples: 93 (3  */
  PerformanceInsightsRetentionPeriod?: number;
  /** The port number that the DB instance uses for connections. Valid Values: 1150-65535 Default: Inherits the value from the source DB instance. */
  Port?: number;
  /** When you are creating a read replica from one Amazon Web Services GovCloud (US) Region to another or from one China Amazon Web Services Region to another, the URL that contains a Signature Version 4 s */
  PreSignedUrl?: string;
  /** The number of CPU cores and the number of threads per core for the DB instance class of the DB instance. This setting doesn't apply to RDS Custom DB instances. */
  ProcessorFeatures?: ProcessorFeature[];
  /** Specifies whether the DB instance is publicly accessible. When the DB cluster is publicly accessible, its Domain Name System (DNS) endpoint resolves to the private IP address from within the DB cluste */
  PubliclyAccessible?: boolean;
  /** The open mode of the replica database. This parameter is only supported for Db2 DB instances and Oracle DB instances. Db2 Standby DB replicas are included in Db2 Advanced Edition (AE) and Db2 Standard */
  ReplicaMode?: 'open-read-only' | 'mounted';
  /** The identifier of the Multi-AZ DB cluster that will act as the source for the read replica. Each DB cluster can have up to 15 read replicas. Constraints: Must be the identifier of an existing Multi-AZ */
  SourceDBClusterIdentifier?: string;
  /** The identifier of the DB instance that will act as the source for the read replica. Each DB instance can have up to 15 read replicas, except for the following engines: Db2 - Can have up to three repli */
  SourceDBInstanceIdentifier?: string;
  /** Specifies the storage throughput value for the read replica. This setting doesn't apply to RDS Custom or Amazon Aurora DB instances. */
  StorageThroughput?: number;
  /** The storage type to associate with the read replica. If you specify io1, io2, or gp3, you must also include a value for the Iops parameter. Valid Values: gp2 | gp3 | io1 | io2 | standard Default: io1  */
  StorageType?: string;
  Tags?: Tag[];
  /** Tags to assign to resources associated with the DB instance. Valid Values: auto-backup - The DB instance's automated backup. */
  TagSpecifications?: TagSpecification[];
  /** Whether to upgrade the storage file system configuration on the read replica. This option migrates the read replica from the old storage file system layout to the preferred layout. */
  UpgradeStorageConfig?: boolean;
  /** Specifies whether the DB instance class of the DB instance uses its default processor features. This setting doesn't apply to RDS Custom DB instances. */
  UseDefaultProcessorFeatures?: boolean;
  /** A list of Amazon EC2 VPC security groups to associate with the read replica. This setting doesn't apply to RDS Custom DB instances. Default: The default EC2 VPC security group for the DB subnet group' */
  VpcSecurityGroupIds?: string[];
}

export interface CreateDBParameterGroupInput {
  /** The DB parameter group family name. A DB parameter group can be associated with one and only one DB parameter group family, and can be applied only to a DB instance running a database engine and engin */
  DBParameterGroupFamily: string;
  /** The name of the DB parameter group. Constraints: Must be 1 to 255 letters, numbers, or hyphens. First character must be a letter Can't end with a hyphen or contain two consecutive hyphens This value i */
  DBParameterGroupName: string;
  /** The description for the DB parameter group. */
  Description: string;
  /** Tags to assign to the DB parameter group. */
  Tags?: Tag[];
}

export interface CreateDBProxyInput {
  /** The identifier for the proxy. This name must be unique for all proxies owned by your Amazon Web Services account in the specified Amazon Web Services Region. An identifier must begin with a letter and */
  DBProxyName: string;
  /** The kinds of databases that the proxy can connect to. This value determines which database network protocol the proxy recognizes when it interprets network traffic to and from the database. For Aurora */
  EngineFamily: 'MYSQL' | 'POSTGRESQL' | 'SQLSERVER';
  /** The Amazon Resource Name (ARN) of the IAM role that the proxy uses to access secrets in Amazon Web Services Secrets Manager. */
  RoleArn: string;
  /** One or more VPC subnet IDs to associate with the new proxy. */
  VpcSubnetIds: string[];
  /** The authorization mechanism that the proxy uses. */
  Auth?: UserAuthConfig[];
  /** Specifies whether the proxy logs detailed connection and query information. When you enable DebugLogging, the proxy captures connection details and connection pool behavior from your queries. Debug lo */
  DebugLogging?: boolean;
  /** The default authentication scheme that the proxy uses for client connections to the proxy and connections from the proxy to the underlying database. Valid values are NONE and IAM_AUTH. When set to IAM */
  DefaultAuthScheme?: 'IAM_AUTH' | 'NONE';
  /** The network type of the DB proxy endpoint. The network type determines the IP version that the proxy endpoint supports. Valid values: IPV4 - The proxy endpoint supports IPv4 only. IPV6 - The proxy end */
  EndpointNetworkType?: 'IPV4' | 'IPV6' | 'DUAL';
  /** The number of seconds that a connection to the proxy can be inactive before the proxy disconnects it. You can set this value higher or lower than the connection timeout limit for the associated databa */
  IdleClientTimeout?: number;
  /** Specifies whether Transport Layer Security (TLS) encryption is required for connections to the proxy. By enabling this setting, you can enforce encrypted TLS connections to the proxy. */
  RequireTLS?: boolean;
  /** An optional set of key-value pairs to associate arbitrary data of your choosing with the proxy. */
  Tags?: Tag[];
  /** The network type that the proxy uses to connect to the target database. The network type determines the IP version that the proxy uses for connections to the database. Valid values: IPV4 - The proxy c */
  TargetConnectionNetworkType?: 'IPV4' | 'IPV6';
  /** One or more VPC security group IDs to associate with the new proxy. */
  VpcSecurityGroupIds?: string[];
}

export interface CreateDBProxyEndpointInput {
  /** The name of the DB proxy endpoint to create. */
  DBProxyEndpointName: string;
  /** The name of the DB proxy associated with the DB proxy endpoint that you create. */
  DBProxyName: string;
  /** The VPC subnet IDs for the DB proxy endpoint that you create. You can specify a different set of subnet IDs than for the original DB proxy. */
  VpcSubnetIds: string[];
  /** The network type of the DB proxy endpoint. The network type determines the IP version that the proxy endpoint supports. Valid values: IPV4 - The proxy endpoint supports IPv4 only. IPV6 - The proxy end */
  EndpointNetworkType?: 'IPV4' | 'IPV6' | 'DUAL';
  Tags?: Tag[];
  /** The role of the DB proxy endpoint. The role determines whether the endpoint can be used for read/write or only read operations. The default is READ_WRITE. The only role that proxies for RDS for Micros */
  TargetRole?: 'READ_WRITE' | 'READ_ONLY';
  /** The VPC security group IDs for the DB proxy endpoint that you create. You can specify a different set of security group IDs than for the original DB proxy. The default is the default security group fo */
  VpcSecurityGroupIds?: string[];
}

export interface CreateDBSecurityGroupInput {
  /** The description for the DB security group. */
  DBSecurityGroupDescription: string;
  /** The name for the DB security group. This value is stored as a lowercase string. Constraints: Must be 1 to 255 letters, numbers, or hyphens. First character must be a letter Can't end with a hyphen or  */
  DBSecurityGroupName: string;
  /** Tags to assign to the DB security group. */
  Tags?: Tag[];
}

export interface CreateDBShardGroupInput {
  /** The name of the primary DB cluster for the DB shard group. */
  DBClusterIdentifier: string;
  /** The name of the DB shard group. */
  DBShardGroupIdentifier: string;
  /** The maximum capacity of the DB shard group in Aurora capacity units (ACUs). */
  MaxACU: number;
  /** Specifies whether to create standby standby DB data access shard for the DB shard group. Valid values are the following: 0 - Creates a DB shard group without a standby DB data access shard. This is th */
  ComputeRedundancy?: number;
  /** The minimum capacity of the DB shard group in Aurora capacity units (ACUs). */
  MinACU?: number;
  /** Specifies whether the DB shard group is publicly accessible. When the DB shard group is publicly accessible, its Domain Name System (DNS) endpoint resolves to the private IP address from within the DB */
  PubliclyAccessible?: boolean;
  Tags?: Tag[];
}

export interface CreateDBSnapshotInput {
  /** The identifier of the DB instance that you want to create the snapshot of. Constraints: Must match the identifier of an existing DBInstance. */
  DBInstanceIdentifier: string;
  /** The identifier for the DB snapshot. Constraints: Can't be null, empty, or blank Must contain from 1 to 255 letters, numbers, or hyphens First character must be a letter Can't end with a hyphen or cont */
  DBSnapshotIdentifier: string;
  Tags?: Tag[];
}

export interface CreateDBSubnetGroupInput {
  /** The description for the DB subnet group. */
  DBSubnetGroupDescription: string;
  /** The name for the DB subnet group. This value is stored as a lowercase string. Constraints: Must contain no more than 255 letters, numbers, periods, underscores, spaces, or hyphens. Must not be default */
  DBSubnetGroupName: string;
  /** The EC2 Subnet IDs for the DB subnet group. */
  SubnetIds: string[];
  /** Tags to assign to the DB subnet group. */
  Tags?: Tag[];
}

export interface CreateEventSubscriptionInput {
  /** The Amazon Resource Name (ARN) of the SNS topic created for event notification. SNS automatically creates the ARN when you create a topic and subscribe to it. RDS doesn't support FIFO (first in, first */
  SnsTopicArn: string;
  /** The name of the subscription. Constraints: The name must be less than 255 characters. */
  SubscriptionName: string;
  /** Specifies whether to activate the subscription. If the event notification subscription isn't activated, the subscription is created but not active. */
  Enabled?: boolean;
  /** A list of event categories for a particular source type (SourceType) that you want to subscribe to. You can see a list of the categories for a given source type in the "Amazon RDS event categories and */
  EventCategories?: string[];
  /** The list of identifiers of the event sources for which events are returned. If not specified, then all sources are included in the response. An identifier must begin with a letter and must contain onl */
  SourceIds?: string[];
  /** The type of source that is generating the events. For example, if you want to be notified of events generated by a DB instance, you set this parameter to db-instance. For RDS Proxy events, specify db- */
  SourceType?: string;
  Tags?: Tag[];
}

export interface CreateGlobalClusterInput {
  /** The cluster identifier for this global database cluster. This parameter is stored as a lowercase string. */
  GlobalClusterIdentifier: string;
  /** The name for your database of up to 64 alphanumeric characters. If you don't specify a name, Amazon Aurora doesn't create a database in the global database cluster. Constraints: Can't be specified if  */
  DatabaseName?: string;
  /** Specifies whether to enable deletion protection for the new global database cluster. The global database can't be deleted when deletion protection is enabled. */
  DeletionProtection?: boolean;
  /** The database engine to use for this global database cluster. Valid Values: aurora-mysql | aurora-postgresql Constraints: Can't be specified if SourceDBClusterIdentifier is specified. In this case, Ama */
  Engine?: string;
  /** The life cycle type for this global database cluster. By default, this value is set to open-source-rds-extended-support, which enrolls your global cluster into Amazon RDS Extended Support. At the end  */
  EngineLifecycleSupport?: string;
  /** The engine version to use for this global database cluster. Constraints: Can't be specified if SourceDBClusterIdentifier is specified. In this case, Amazon Aurora uses the engine version of the source */
  EngineVersion?: string;
  /** The Amazon Resource Name (ARN) to use as the primary cluster of the global database. If you provide a value for this parameter, don't specify values for the following settings because Amazon Aurora us */
  SourceDBClusterIdentifier?: string;
  /** Specifies whether to enable storage encryption for the new global database cluster. Constraints: Can't be specified if SourceDBClusterIdentifier is specified. In this case, Amazon Aurora uses the sett */
  StorageEncrypted?: boolean;
  /** Tags to assign to the global cluster. */
  Tags?: Tag[];
}

export interface CreateIntegrationInput {
  /** The name of the integration. */
  IntegrationName: string;
  /** The Amazon Resource Name (ARN) of the database to use as the source for replication. */
  SourceArn: string;
  /** The ARN of the Redshift data warehouse to use as the target for replication. */
  TargetArn: string;
  /** An optional set of non-secret key–value pairs that contains additional contextual information about the data. For more information, see Encryption context in the Amazon Web Services Key Management Ser */
  AdditionalEncryptionContext?: Record<string, string>;
  /** Data filtering options for the integration. For more information, see Data filtering for Aurora zero-ETL integrations with Amazon Redshift or Data filtering for Amazon RDS zero-ETL integrations with A */
  DataFilter?: string;
  /** A description of the integration. */
  Description?: string;
  /** The Amazon Web Services Key Management System (Amazon Web Services KMS) key identifier for the key to use to encrypt the integration. If you don't specify an encryption key, RDS uses a default Amazon  */
  KMSKeyId?: string;
  Tags?: Tag[];
}

export interface CreateOptionGroupInput {
  /** The name of the engine to associate this option group with. Valid Values: db2-ae db2-se mariadb mysql oracle-ee oracle-ee-cdb oracle-se2 oracle-se2-cdb postgres sqlserver-ee sqlserver-se sqlserver-ex  */
  EngineName: string;
  /** Specifies the major version of the engine that this option group should be associated with. */
  MajorEngineVersion: string;
  /** The description of the option group. */
  OptionGroupDescription: string;
  /** Specifies the name of the option group to be created. Constraints: Must be 1 to 255 letters, numbers, or hyphens First character must be a letter Can't end with a hyphen or contain two consecutive hyp */
  OptionGroupName: string;
  /** Tags to assign to the option group. */
  Tags?: Tag[];
}

export interface CreateTenantDatabaseInput {
  /** The user-supplied DB instance identifier. RDS creates your tenant database in this DB instance. This parameter isn't case-sensitive. */
  DBInstanceIdentifier: string;
  /** The name for the master user account in your tenant database. RDS creates this user account in the tenant database and grants privileges to the master user. This parameter is case-sensitive. Constrain */
  MasterUsername: string;
  /** The user-supplied name of the tenant database that you want to create in your DB instance. This parameter has the same constraints as DBName in CreateDBInstance. */
  TenantDBName: string;
  /** The character set for your tenant database. If you don't specify a value, the character set name defaults to AL32UTF8. */
  CharacterSetName?: string;
  /** Specifies whether to manage the master user password with Amazon Web Services Secrets Manager. For more information, see Password management with Amazon Web Services Secrets Manager in the Amazon RDS  */
  ManageMasterUserPassword?: boolean;
  /** The password for the master user in your tenant database. Constraints: Must be 8 to 30 characters. Can include any printable ASCII character except forward slash (/), double quote ("), at symbol (@),  */
  MasterUserPassword?: string;
  /** The Amazon Web Services KMS key identifier to encrypt a secret that is automatically generated and managed in Amazon Web Services Secrets Manager. This setting is valid only if the master user passwor */
  MasterUserSecretKmsKeyId?: string;
  /** The NCHAR value for the tenant database. */
  NcharCharacterSetName?: string;
  Tags?: Tag[];
}

export interface DeleteBlueGreenDeploymentInput {
  /** The unique identifier of the blue/green deployment to delete. This parameter isn't case-sensitive. Constraints: Must match an existing blue/green deployment identifier. */
  BlueGreenDeploymentIdentifier: string;
  /** Specifies whether to delete the resources in the green environment. You can't specify this option if the blue/green deployment status is SWITCHOVER_COMPLETED. */
  DeleteTarget?: boolean;
}

export interface DeleteCustomDBEngineVersionInput {
  /** The database engine. RDS Custom for Oracle supports the following values: custom-oracle-ee custom-oracle-ee-cdb custom-oracle-se2 custom-oracle-se2-cdb RDS Custom for SQL Server supports the following */
  Engine: string;
  /** The custom engine version (CEV) for your DB instance. This option is required for RDS Custom, but optional for Amazon RDS. The combination of Engine and EngineVersion is unique per customer per Amazon */
  EngineVersion: string;
}

export interface DeleteDBClusterInput {
  /** The DB cluster identifier for the DB cluster to be deleted. This parameter isn't case-sensitive. Constraints: Must match an existing DBClusterIdentifier. */
  DBClusterIdentifier: string;
  /** Specifies whether to remove automated backups immediately after the DB cluster is deleted. This parameter isn't case-sensitive. The default is to remove automated backups immediately after the DB clus */
  DeleteAutomatedBackups?: boolean;
  /** The DB cluster snapshot identifier of the new DB cluster snapshot created when SkipFinalSnapshot is disabled. If you specify this parameter and also skip the creation of a final DB cluster snapshot wi */
  FinalDBSnapshotIdentifier?: string;
  /** Specifies whether to skip the creation of a final DB cluster snapshot before RDS deletes the DB cluster. If you set this value to true, RDS doesn't create a final DB cluster snapshot. If you set this  */
  SkipFinalSnapshot?: boolean;
}

export interface DeleteDBClusterAutomatedBackupInput {
  /** The identifier for the source DB cluster, which can't be changed and which is unique to an Amazon Web Services Region. */
  DbClusterResourceId: string;
}

export interface DeleteDBClusterEndpointInput {
  /** The identifier associated with the custom endpoint. This parameter is stored as a lowercase string. */
  DBClusterEndpointIdentifier: string;
}

export interface DeleteDBClusterParameterGroupInput {
  /** The name of the DB cluster parameter group. Constraints: Must be the name of an existing DB cluster parameter group. You can't delete a default DB cluster parameter group. Can't be associated with any */
  DBClusterParameterGroupName: string;
}

export interface DeleteDBClusterSnapshotInput {
  /** The identifier of the DB cluster snapshot to delete. Constraints: Must be the name of an existing DB cluster snapshot in the available state. */
  DBClusterSnapshotIdentifier: string;
}

export interface DeleteDBInstanceInput {
  /** The DB instance identifier for the DB instance to be deleted. This parameter isn't case-sensitive. Constraints: Must match the name of an existing DB instance. */
  DBInstanceIdentifier: string;
  /** Specifies whether to remove automated backups immediately after the DB instance is deleted. This parameter isn't case-sensitive. The default is to remove automated backups immediately after the DB ins */
  DeleteAutomatedBackups?: boolean;
  /** The DBSnapshotIdentifier of the new DBSnapshot created when the SkipFinalSnapshot parameter is disabled. If you enable this parameter and also enable SkipFinalShapshot, the command results in an error */
  FinalDBSnapshotIdentifier?: string;
  /** Specifies whether to skip the creation of a final DB snapshot before deleting the instance. If you enable this parameter, RDS doesn't create a DB snapshot. If you don't enable this parameter, RDS crea */
  SkipFinalSnapshot?: boolean;
}

/** Parameter input for the DeleteDBInstanceAutomatedBackup operation. */
export interface DeleteDBInstanceAutomatedBackupInput {
  /** The Amazon Resource Name (ARN) of the automated backups to delete, for example, arn:aws:rds:us-east-1:123456789012:auto-backup:ab-L2IJCEXJP7XQ7HOJ4SIEXAMPLE. This setting doesn't apply to RDS Custom. */
  DBInstanceAutomatedBackupsArn?: string;
  /** The identifier for the source DB instance, which can't be changed and which is unique to an Amazon Web Services Region. */
  DbiResourceId?: string;
}

export interface DeleteDBParameterGroupInput {
  /** The name of the DB parameter group. Constraints: Must be the name of an existing DB parameter group You can't delete a default DB parameter group Can't be associated with any DB instances */
  DBParameterGroupName: string;
}

export interface DeleteDBProxyInput {
  /** The name of the DB proxy to delete. */
  DBProxyName: string;
}

export interface DeleteDBProxyEndpointInput {
  /** The name of the DB proxy endpoint to delete. */
  DBProxyEndpointName: string;
}

export interface DeleteDBSecurityGroupInput {
  /** The name of the DB security group to delete. You can't delete the default DB security group. Constraints: Must be 1 to 255 letters, numbers, or hyphens. First character must be a letter Can't end with */
  DBSecurityGroupName: string;
}

export interface DeleteDBShardGroupInput {
  /** The name of the DB shard group to delete. */
  DBShardGroupIdentifier: string;
}

export interface DeleteDBSnapshotInput {
  /** The DB snapshot identifier. Constraints: Must be the name of an existing DB snapshot in the available state. */
  DBSnapshotIdentifier: string;
}

export interface DeleteDBSubnetGroupInput {
  /** The name of the database subnet group to delete. You can't delete the default subnet group. Constraints: Must match the name of an existing DBSubnetGroup. Must not be default. Example: mydbsubnetgroup */
  DBSubnetGroupName: string;
}

export interface DeleteEventSubscriptionInput {
  /** The name of the RDS event notification subscription you want to delete. */
  SubscriptionName: string;
}

export interface DeleteGlobalClusterInput {
  /** The cluster identifier of the global database cluster being deleted. */
  GlobalClusterIdentifier: string;
}

export interface DeleteIntegrationInput {
  /** The unique identifier of the integration. */
  IntegrationIdentifier: string;
}

export interface DeleteOptionGroupInput {
  /** The name of the option group to be deleted. You can't delete default option groups. */
  OptionGroupName: string;
}

export interface DeleteTenantDatabaseInput {
  /** The user-supplied identifier for the DB instance that contains the tenant database that you want to delete. */
  DBInstanceIdentifier: string;
  /** The user-supplied name of the tenant database that you want to remove from your DB instance. Amazon RDS deletes the tenant database with this name. This parameter isn’t case-sensitive. */
  TenantDBName: string;
  /** The DBSnapshotIdentifier of the new DBSnapshot created when the SkipFinalSnapshot parameter is disabled. If you enable this parameter and also enable SkipFinalShapshot, the command results in an error */
  FinalDBSnapshotIdentifier?: string;
  /** Specifies whether to skip the creation of a final DB snapshot before removing the tenant database from your DB instance. If you enable this parameter, RDS doesn't create a DB snapshot. If you don't en */
  SkipFinalSnapshot?: boolean;
}

export interface DeregisterDBProxyTargetsInput {
  /** The identifier of the DBProxy that is associated with the DBProxyTargetGroup. */
  DBProxyName: string;
  /** One or more DB cluster identifiers. */
  DBClusterIdentifiers?: string[];
  /** One or more DB instance identifiers. */
  DBInstanceIdentifiers?: string[];
  /** The identifier of the DBProxyTargetGroup. */
  TargetGroupName?: string;
}

export interface DescribeBlueGreenDeploymentsInput {
  /** The blue/green deployment identifier. If you specify this parameter, the response only includes information about the specific blue/green deployment. This parameter isn't case-sensitive. Constraints:  */
  BlueGreenDeploymentIdentifier?: string;
  /** A filter that specifies one or more blue/green deployments to describe. Valid Values: blue-green-deployment-identifier - Accepts system-generated identifiers for blue/green deployments. The results li */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeBlueGreenDeployments request. If you specify this parameter, the response only includes records beyond the marker, up to the value specified */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so you can retrieve  */
  MaxRecords?: number;
}

export interface DescribeCertificatesInput {
  /** The user-supplied certificate identifier. If this parameter is specified, information for only the identified certificate is returned. This parameter isn't case-sensitive. Constraints: Must match an e */
  CertificateIdentifier?: string;
  /** This parameter isn't currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeCertificates request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by Max */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so you can retrieve  */
  MaxRecords?: number;
}

export interface DescribeDBClusterAutomatedBackupsInput {
  /** (Optional) The user-supplied DB cluster identifier. If this parameter is specified, it must match the identifier of an existing DB cluster. It returns information from the specific DB cluster's automa */
  DBClusterIdentifier?: string;
  /** The resource ID of the DB cluster that is the source of the automated backup. This parameter isn't case-sensitive. */
  DbClusterResourceId?: string;
  /** A filter that specifies which resources to return based on status. Supported filters are the following: status retained - Automated backups for deleted clusters and after backup replication is stopped */
  Filters?: Filter[];
  /** The pagination token provided in the previous request. If this parameter is specified the response includes only records beyond the marker, up to MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that you can retr */
  MaxRecords?: number;
}

export interface DescribeDBClusterBacktracksInput {
  /** The DB cluster identifier of the DB cluster to be described. This parameter is stored as a lowercase string. Constraints: Must contain from 1 to 63 alphanumeric characters or hyphens. First character  */
  DBClusterIdentifier: string;
  /** If specified, this value is the backtrack identifier of the backtrack to be described. Constraints: Must contain a valid universally unique identifier (UUID). For more information about UUIDs, see Uni */
  BacktrackIdentifier?: string;
  /** A filter that specifies one or more DB clusters to describe. Supported filters include the following: db-cluster-backtrack-id - Accepts backtrack identifiers. The results list includes information abo */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeDBClusterBacktracks request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so you can retrieve  */
  MaxRecords?: number;
}

export interface DescribeDBClusterEndpointsInput {
  /** The identifier of the endpoint to describe. This parameter is stored as a lowercase string. */
  DBClusterEndpointIdentifier?: string;
  /** The DB cluster identifier of the DB cluster associated with the endpoint. This parameter is stored as a lowercase string. */
  DBClusterIdentifier?: string;
  /** A set of name-value pairs that define which endpoints to include in the output. The filters are specified as name-value pairs, in the format Name=endpoint_type,Values=endpoint_type1,endpoint_type2,... */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeDBClusterEndpoints request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified  */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so you can retrieve  */
  MaxRecords?: number;
}

export interface DescribeDBClusterParameterGroupsInput {
  /** The name of a specific DB cluster parameter group to return details for. Constraints: If supplied, must match the name of an existing DBClusterParameterGroup. */
  DBClusterParameterGroupName?: string;
  /** This parameter isn't currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeDBClusterParameterGroups request. If this parameter is specified, the response includes only records beyond the marker, up to the value spec */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so you can retrieve  */
  MaxRecords?: number;
}

export interface DescribeDBClusterParametersInput {
  /** The name of a specific DB cluster parameter group to return parameter details for. Constraints: If supplied, must match the name of an existing DBClusterParameterGroup. */
  DBClusterParameterGroupName: string;
  /** A filter that specifies one or more DB cluster parameters to describe. The only supported filter is parameter-name. The results list only includes information about the DB cluster parameters with thes */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeDBClusterParameters request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so you can retrieve  */
  MaxRecords?: number;
  /** A specific source to return parameters for. Valid Values: engine-default system user */
  Source?: string;
}

export interface DescribeDBClustersInput {
  /** The user-supplied DB cluster identifier or the Amazon Resource Name (ARN) of the DB cluster. If this parameter is specified, information for only the specific DB cluster is returned. This parameter is */
  DBClusterIdentifier?: string;
  /** A filter that specifies one or more DB clusters to describe. Supported Filters: clone-group-id - Accepts clone group identifiers. The results list only includes information about the DB clusters assoc */
  Filters?: Filter[];
  /** Specifies whether the output includes information about clusters shared from other Amazon Web Services accounts. */
  IncludeShared?: boolean;
  /** An optional pagination token provided by a previous DescribeDBClusters request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRe */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so you can retrieve  */
  MaxRecords?: number;
}

export interface DescribeDBClusterSnapshotAttributesInput {
  /** The identifier for the DB cluster snapshot to describe the attributes for. */
  DBClusterSnapshotIdentifier: string;
}

export interface DescribeDBClusterSnapshotsInput {
  /** The ID of the DB cluster to retrieve the list of DB cluster snapshots for. This parameter can't be used in conjunction with the DBClusterSnapshotIdentifier parameter. This parameter isn't case-sensiti */
  DBClusterIdentifier?: string;
  /** A specific DB cluster resource ID to describe. */
  DbClusterResourceId?: string;
  /** A specific DB cluster snapshot identifier to describe. This parameter can't be used in conjunction with the DBClusterIdentifier parameter. This value is stored as a lowercase string. Constraints: If s */
  DBClusterSnapshotIdentifier?: string;
  /** A filter that specifies one or more DB cluster snapshots to describe. Supported filters: db-cluster-id - Accepts DB cluster identifiers and DB cluster Amazon Resource Names (ARNs). db-cluster-snapshot */
  Filters?: Filter[];
  /** Specifies whether to include manual DB cluster snapshots that are public and can be copied or restored by any Amazon Web Services account. By default, the public snapshots are not included. You can sh */
  IncludePublic?: boolean;
  /** Specifies whether to include shared manual DB cluster snapshots from other Amazon Web Services accounts that this Amazon Web Services account has been given permission to copy or restore. By default,  */
  IncludeShared?: boolean;
  /** An optional pagination token provided by a previous DescribeDBClusterSnapshots request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified  */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so you can retrieve  */
  MaxRecords?: number;
  /** The type of DB cluster snapshots to be returned. You can specify one of the following values: automated - Return all DB cluster snapshots that have been automatically taken by Amazon RDS for my Amazon */
  SnapshotType?: string;
}

export interface DescribeDBEngineVersionsInput {
  /** The name of a specific DB parameter group family to return details for. Constraints: If supplied, must match an existing DB parameter group family. */
  DBParameterGroupFamily?: string;
  /** Specifies whether to return only the default version of the specified engine or the engine and major version combination. */
  DefaultOnly?: boolean;
  /** The database engine to return version details for. Valid Values: aurora-mysql aurora-postgresql custom-oracle-ee custom-oracle-ee-cdb custom-oracle-se2 custom-oracle-se2-cdb db2-ae db2-se mariadb mysq */
  Engine?: string;
  /** A specific database engine version to return details for. Example: 5.1.49 */
  EngineVersion?: string;
  /** A filter that specifies one or more DB engine versions to describe. Supported filters: db-parameter-group-family - Accepts parameter groups family names. The results list only includes information abo */
  Filters?: Filter[];
  /** Specifies whether to also list the engine versions that aren't available. The default is to list only available engine versions. */
  IncludeAll?: boolean;
  /** Specifies whether to list the supported character sets for each engine version. If this parameter is enabled and the requested engine supports the CharacterSetName parameter for CreateDBInstance, the  */
  ListSupportedCharacterSets?: boolean;
  /** Specifies whether to list the supported time zones for each engine version. If this parameter is enabled and the requested engine supports the TimeZone parameter for CreateDBInstance, the response inc */
  ListSupportedTimezones?: boolean;
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more than the MaxRecords value is available, a pagination token called a marker is included in the response so you can retrieve the remaini */
  MaxRecords?: number;
}

/** Parameter input for DescribeDBInstanceAutomatedBackups. */
export interface DescribeDBInstanceAutomatedBackupsInput {
  /** The Amazon Resource Name (ARN) of the replicated automated backups, for example, arn:aws:rds:us-east-1:123456789012:auto-backup:ab-L2IJCEXJP7XQ7HOJ4SIEXAMPLE. This setting doesn't apply to RDS Custom. */
  DBInstanceAutomatedBackupsArn?: string;
  /** (Optional) The user-supplied instance identifier. If this parameter is specified, it must match the identifier of an existing DB instance. It returns information from the specific DB instance's automa */
  DBInstanceIdentifier?: string;
  /** The resource ID of the DB instance that is the source of the automated backup. This parameter isn't case-sensitive. */
  DbiResourceId?: string;
  /** A filter that specifies which resources to return based on status. Supported filters are the following: status active - Automated backups for current instances. creating - Automated backups that are w */
  Filters?: Filter[];
  /** The pagination token provided in the previous request. If this parameter is specified the response includes only records beyond the marker, up to MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that you can retr */
  MaxRecords?: number;
}

export interface DescribeDBInstancesInput {
  /** The user-supplied instance identifier or the Amazon Resource Name (ARN) of the DB instance. If this parameter is specified, information from only the specific DB instance is returned. This parameter i */
  DBInstanceIdentifier?: string;
  /** A filter that specifies one or more DB instances to describe. Supported Filters: db-cluster-id - Accepts DB cluster identifiers and DB cluster Amazon Resource Names (ARNs). The results list only inclu */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeDBInstances request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxR */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that you can retr */
  MaxRecords?: number;
}

export interface DescribeDBLogFilesInput {
  /** The customer-assigned name of the DB instance that contains the log files you want to list. Constraints: Must match the identifier of an existing DBInstance. */
  DBInstanceIdentifier: string;
  /** Filters the available log files for files written since the specified date, in POSIX timestamp format with milliseconds. */
  FileLastWritten?: number;
  /** Filters the available log files for log file names that contain the specified string. */
  FilenameContains?: string;
  /** Filters the available log files for files larger than the specified size. */
  FileSize?: number;
  /** This parameter isn't currently supported. */
  Filters?: Filter[];
  /** The pagination token provided in the previous request. If this parameter is specified the response includes only records beyond the marker, up to MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so you can retrieve  */
  MaxRecords?: number;
}

export interface DescribeDBMajorEngineVersionsInput {
  /** The database engine to return major version details for. Valid Values: aurora-mysql aurora-postgresql custom-sqlserver-ee custom-sqlserver-se custom-sqlserver-web db2-ae db2-se mariadb mysql oracle-ee */
  Engine?: string;
  /** A specific database major engine version to return details for. Example: 8.4 */
  MajorEngineVersion?: string;
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more than the MaxRecords value is available, a pagination token called a marker is included in the response so you can retrieve the remaini */
  MaxRecords?: number;
}

export interface DescribeDBParameterGroupsInput {
  /** The name of a specific DB parameter group to return details for. Constraints: If supplied, must match the name of an existing DBClusterParameterGroup. */
  DBParameterGroupName?: string;
  /** This parameter isn't currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeDBParameterGroups request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified b */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that you can retr */
  MaxRecords?: number;
}

export interface DescribeDBParametersInput {
  /** The name of a specific DB parameter group to return details for. Constraints: If supplied, must match the name of an existing DBParameterGroup. */
  DBParameterGroupName: string;
  /** A filter that specifies one or more DB parameters to describe. The only supported filter is parameter-name. The results list only includes information about the DB parameters with these names. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeDBParameters request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by Max */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that you can retr */
  MaxRecords?: number;
  /** The parameter types to return. Default: All parameter types returned Valid Values: user | system | engine-default */
  Source?: string;
}

export interface DescribeDBProxiesInput {
  /** The name of the DB proxy. If you omit this parameter, the output includes information about all DB proxies owned by your Amazon Web Services account ID. */
  DBProxyName?: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeDBProxyEndpointsInput {
  /** The name of a DB proxy endpoint to describe. If you omit this parameter, the output includes information about all DB proxy endpoints associated with the specified proxy. */
  DBProxyEndpointName?: string;
  /** The name of the DB proxy whose endpoints you want to describe. If you omit this parameter, the output includes information about all DB proxy endpoints associated with all your DB proxies. */
  DBProxyName?: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeDBProxyTargetGroupsInput {
  /** The identifier of the DBProxy associated with the target group. */
  DBProxyName: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
  /** The identifier of the DBProxyTargetGroup to describe. */
  TargetGroupName?: string;
}

export interface DescribeDBProxyTargetsInput {
  /** The identifier of the DBProxyTarget to describe. */
  DBProxyName: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
  /** The identifier of the DBProxyTargetGroup to describe. */
  TargetGroupName?: string;
}

export interface DescribeDBRecommendationsInput {
  /** A filter that specifies one or more recommendations to describe. Supported Filters: recommendation-id - Accepts a list of recommendation identifiers. The results list only includes the recommendations */
  Filters?: Filter[];
  /** A filter to include only the recommendations that were updated after this specified time. */
  LastUpdatedAfter?: string;
  /** A filter to include only the recommendations that were updated before this specified time. */
  LastUpdatedBefore?: string;
  /** The language that you choose to return the list of recommendations. Valid values: en en_UK de es fr id it ja ko pt_BR zh_TW zh_CN */
  Locale?: string;
  /** An optional pagination token provided by a previous DescribeDBRecommendations request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified b */
  Marker?: string;
  /** The maximum number of recommendations to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that you  */
  MaxRecords?: number;
}

export interface DescribeDBSecurityGroupsInput {
  /** The name of the DB security group to return details for. */
  DBSecurityGroupName?: string;
  /** This parameter isn't currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeDBSecurityGroups request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that you can retr */
  MaxRecords?: number;
}

export interface DescribeDBShardGroupsInput {
  /** The user-supplied DB shard group identifier. If this parameter is specified, information for only the specific DB shard group is returned. This parameter isn't case-sensitive. Constraints: If supplied */
  DBShardGroupIdentifier?: string;
  /** A filter that specifies one or more DB shard groups to describe. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeDBShardGroups request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by Ma */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so you can retrieve  */
  MaxRecords?: number;
}

export interface DescribeDBSnapshotAttributesInput {
  /** The identifier for the DB snapshot to describe the attributes for. */
  DBSnapshotIdentifier: string;
}

export interface DescribeDBSnapshotsInput {
  /** The ID of the DB instance to retrieve the list of DB snapshots for. This parameter isn't case-sensitive. Constraints: If supplied, must match the identifier of an existing DBInstance. */
  DBInstanceIdentifier?: string;
  /** A specific DB resource ID to describe. */
  DbiResourceId?: string;
  /** A specific DB snapshot identifier to describe. This value is stored as a lowercase string. Constraints: If supplied, must match the identifier of an existing DBSnapshot. If this identifier is for an a */
  DBSnapshotIdentifier?: string;
  /** A filter that specifies one or more DB snapshots to describe. Supported filters: db-instance-id - Accepts DB instance identifiers and DB instance Amazon Resource Names (ARNs). db-snapshot-id - Accepts */
  Filters?: Filter[];
  /** Specifies whether to include manual DB cluster snapshots that are public and can be copied or restored by any Amazon Web Services account. By default, the public snapshots are not included. You can sh */
  IncludePublic?: boolean;
  /** Specifies whether to include shared manual DB cluster snapshots from other Amazon Web Services accounts that this Amazon Web Services account has been given permission to copy or restore. By default,  */
  IncludeShared?: boolean;
  /** An optional pagination token provided by a previous DescribeDBSnapshots request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxR */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that you can retr */
  MaxRecords?: number;
  /** The type of snapshots to be returned. You can specify one of the following values: automated - Return all DB snapshots that have been automatically taken by Amazon RDS for my Amazon Web Services accou */
  SnapshotType?: string;
}

export interface DescribeDBSnapshotTenantDatabasesInput {
  /** The ID of the DB instance used to create the DB snapshots. This parameter isn't case-sensitive. Constraints: If supplied, must match the identifier of an existing DBInstance. */
  DBInstanceIdentifier?: string;
  /** A specific DB resource identifier to describe. */
  DbiResourceId?: string;
  /** The ID of a DB snapshot that contains the tenant databases to describe. This value is stored as a lowercase string. Constraints: If you specify this parameter, the value must match the ID of an existi */
  DBSnapshotIdentifier?: string;
  /** A filter that specifies one or more tenant databases to describe. Supported filters: tenant-db-name - Tenant database names. The results list only includes information about the tenant databases that  */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeDBSnapshotTenantDatabases request. If this parameter is specified, the response includes only records beyond the marker, up to the value spe */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that you can retr */
  MaxRecords?: number;
  /** The type of DB snapshots to be returned. You can specify one of the following values: automated – All DB snapshots that have been automatically taken by Amazon RDS for my Amazon Web Services account.  */
  SnapshotType?: string;
}

export interface DescribeDBSubnetGroupsInput {
  /** The name of the DB subnet group to return details for. */
  DBSubnetGroupName?: string;
  /** This parameter isn't currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeDBSubnetGroups request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by M */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that you can retr */
  MaxRecords?: number;
}

export interface DescribeEngineDefaultClusterParametersInput {
  /** The name of the DB cluster parameter group family to return engine parameter information for. */
  DBParameterGroupFamily: string;
  /** This parameter isn't currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeEngineDefaultClusterParameters request. If this parameter is specified, the response includes only records beyond the marker, up to the valu */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so you can retrieve  */
  MaxRecords?: number;
}

export interface DescribeEngineDefaultParametersInput {
  /** The name of the DB parameter group family. Valid Values: aurora-mysql5.7 aurora-mysql8.0 aurora-postgresql10 aurora-postgresql11 aurora-postgresql12 aurora-postgresql13 aurora-postgresql14 custom-orac */
  DBParameterGroupFamily: string;
  /** A filter that specifies one or more parameters to describe. The only supported filter is parameter-name. The results list only includes information about the parameters with these names. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeEngineDefaultParameters request. If this parameter is specified, the response includes only records beyond the marker, up to the value speci */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so you can retrieve  */
  MaxRecords?: number;
}

export interface DescribeEventCategoriesInput {
  /** This parameter isn't currently supported. */
  Filters?: Filter[];
  /** The type of source that is generating the events. For RDS Proxy events, specify db-proxy. Valid Values: db-instance | db-cluster | db-parameter-group | db-security-group | db-snapshot | db-cluster-sna */
  SourceType?: string;
}

export interface DescribeEventsInput {
  /** The number of minutes to retrieve events for. Default: 60 */
  Duration?: number;
  /** The end of the time interval for which to retrieve events, specified in ISO 8601 format. For more information about ISO 8601, go to the ISO8601 Wikipedia page. Example: 2009-07-08T18:00Z */
  EndTime?: string;
  /** A list of event categories that trigger notifications for a event notification subscription. */
  EventCategories?: string[];
  /** This parameter isn't currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeEvents request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecord */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that you can retr */
  MaxRecords?: number;
  /** The identifier of the event source for which events are returned. If not specified, then all sources are included in the response. Constraints: If SourceIdentifier is supplied, SourceType must also be */
  SourceIdentifier?: string;
  /** The event source to retrieve events for. If no value is specified, all events are returned. */
  SourceType?: 'db-instance' | 'db-parameter-group' | 'db-security-group' | 'db-snapshot' | 'db-cluster' | 'db-cluster-snapshot' | 'custom-engine-version' | 'db-proxy' | 'blue-green-deployment' | 'db-shard-group' | 'zero-etl';
  /** The beginning of the time interval to retrieve events for, specified in ISO 8601 format. For more information about ISO 8601, go to the ISO8601 Wikipedia page. Example: 2009-07-08T18:00Z */
  StartTime?: string;
}

export interface DescribeEventSubscriptionsInput {
  /** This parameter isn't currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeOrderableDBInstanceOptions request. If this parameter is specified, the response includes only records beyond the marker, up to the value sp */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that you can retr */
  MaxRecords?: number;
  /** The name of the RDS event notification subscription you want to describe. */
  SubscriptionName?: string;
}

export interface DescribeExportTasksInput {
  /** The identifier of the snapshot or cluster export task to be described. */
  ExportTaskIdentifier?: string;
  /** Filters specify one or more snapshot or cluster exports to describe. The filters are specified as name-value pairs that define what to include in the output. Filter names and values are case-sensitive */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeExportTasks request. If you specify this parameter, the response includes only records beyond the marker, up to the value specified by the M */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified value, a pagination token called a marker is included in the response. You can use the marker in a la */
  MaxRecords?: number;
  /** The Amazon Resource Name (ARN) of the snapshot or cluster exported to Amazon S3. */
  SourceArn?: string;
  /** The type of source for the export. */
  SourceType?: 'SNAPSHOT' | 'CLUSTER';
}

export interface DescribeGlobalClustersInput {
  /** A filter that specifies one or more global database clusters to describe. This parameter is case-sensitive. Currently, the only supported filter is region. If used, the request returns information abo */
  Filters?: Filter[];
  /** The user-supplied DB cluster identifier. If this parameter is specified, information from only the specific DB cluster is returned. This parameter isn't case-sensitive. Constraints: If supplied, must  */
  GlobalClusterIdentifier?: string;
  /** An optional pagination token provided by a previous DescribeGlobalClusters request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by M */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that you can retr */
  MaxRecords?: number;
}

export interface DescribeIntegrationsInput {
  /** A filter that specifies one or more resources to return. */
  Filters?: Filter[];
  /** The unique identifier of the integration. */
  IntegrationIdentifier?: string;
  /** An optional pagination token provided by a previous DescribeIntegrations request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by Max */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that you can retr */
  MaxRecords?: number;
}

export interface DescribeOptionGroupOptionsInput {
  /** The name of the engine to describe options for. Valid Values: db2-ae db2-se mariadb mysql oracle-ee oracle-ee-cdb oracle-se2 oracle-se2-cdb postgres sqlserver-ee sqlserver-se sqlserver-ex sqlserver-we */
  EngineName: string;
  /** This parameter isn't currently supported. */
  Filters?: Filter[];
  /** If specified, filters the results to include only options for the specified major engine version. */
  MajorEngineVersion?: string;
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that you can retr */
  MaxRecords?: number;
}

export interface DescribeOptionGroupsInput {
  /** A filter to only include option groups associated with this database engine. Valid Values: db2-ae db2-se mariadb mysql oracle-ee oracle-ee-cdb oracle-se2 oracle-se2-cdb postgres sqlserver-ee sqlserver */
  EngineName?: string;
  /** This parameter isn't currently supported. */
  Filters?: Filter[];
  /** Filters the list of option groups to only include groups associated with a specific database engine version. If specified, then EngineName must also be specified. */
  MajorEngineVersion?: string;
  /** An optional pagination token provided by a previous DescribeOptionGroups request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by Max */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that you can retr */
  MaxRecords?: number;
  /** The name of the option group to describe. Can't be supplied together with EngineName or MajorEngineVersion. */
  OptionGroupName?: string;
}

export interface DescribeOrderableDBInstanceOptionsInput {
  /** The name of the database engine to describe DB instance options for. Valid Values: aurora-mysql aurora-postgresql custom-oracle-ee custom-oracle-ee-cdb custom-oracle-se2 custom-oracle-se2-cdb db2-ae d */
  Engine: string;
  /** The Availability Zone group associated with a Local Zone. Specify this parameter to retrieve available options for the Local Zones in the group. Omit this parameter to show the available options in th */
  AvailabilityZoneGroup?: string;
  /** A filter to include only the available options for the specified DB instance class. */
  DBInstanceClass?: string;
  /** A filter to include only the available options for the specified engine version. */
  EngineVersion?: string;
  /** This parameter isn't currently supported. */
  Filters?: Filter[];
  /** A filter to include only the available options for the specified license model. RDS Custom supports only the BYOL licensing model. */
  LicenseModel?: string;
  /** An optional pagination token provided by a previous DescribeOrderableDBInstanceOptions request. If this parameter is specified, the response includes only records beyond the marker, up to the value sp */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that you can retr */
  MaxRecords?: number;
  /** Specifies whether to show only VPC or non-VPC offerings. RDS Custom supports only VPC offerings. RDS Custom supports only VPC offerings. If you describe non-VPC offerings for RDS Custom, the output sh */
  Vpc?: boolean;
}

export interface DescribePendingMaintenanceActionsInput {
  /** A filter that specifies one or more resources to return pending maintenance actions for. Supported filters: db-cluster-id - Accepts DB cluster identifiers and DB cluster Amazon Resource Names (ARNs).  */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribePendingMaintenanceActions request. If this parameter is specified, the response includes only records beyond the marker, up to a number of r */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that you can retr */
  MaxRecords?: number;
  /** The ARN of a resource to return pending maintenance actions for. */
  ResourceIdentifier?: string;
}

export interface DescribeReservedDBInstancesInput {
  /** The DB instance class filter value. Specify this parameter to show only those reservations matching the specified DB instances class. */
  DBInstanceClass?: string;
  /** The duration filter value, specified in years or seconds. Specify this parameter to show only reservations for this duration. Valid Values: 1 | 3 | 31536000 | 94608000 */
  Duration?: string;
  /** This parameter isn't currently supported. */
  Filters?: Filter[];
  /** The lease identifier filter value. Specify this parameter to show only the reservation that matches the specified lease ID. Amazon Web Services Support might request the lease ID for an issue related  */
  LeaseId?: string;
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more than the MaxRecords value is available, a pagination token called a marker is included in the response so you can retrieve the remaini */
  MaxRecords?: number;
  /** Specifies whether to show only those reservations that support Multi-AZ. */
  MultiAZ?: boolean;
  /** The offering type filter value. Specify this parameter to show only the available offerings matching the specified offering type. Valid Values: "Partial Upfront" | "All Upfront" | "No Upfront" */
  OfferingType?: string;
  /** The product description filter value. Specify this parameter to show only those reservations matching the specified product description. */
  ProductDescription?: string;
  /** The reserved DB instance identifier filter value. Specify this parameter to show only the reservation that matches the specified reservation ID. */
  ReservedDBInstanceId?: string;
  /** The offering identifier filter value. Specify this parameter to show only purchased reservations matching the specified offering identifier. */
  ReservedDBInstancesOfferingId?: string;
}

export interface DescribeReservedDBInstancesOfferingsInput {
  /** The DB instance class filter value. Specify this parameter to show only the available offerings matching the specified DB instance class. */
  DBInstanceClass?: string;
  /** Duration filter value, specified in years or seconds. Specify this parameter to show only reservations for this duration. Valid Values: 1 | 3 | 31536000 | 94608000 */
  Duration?: string;
  /** This parameter isn't currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more than the MaxRecords value is available, a pagination token called a marker is included in the response so you can retrieve the remaini */
  MaxRecords?: number;
  /** Specifies whether to show only those reservations that support Multi-AZ. */
  MultiAZ?: boolean;
  /** The offering type filter value. Specify this parameter to show only the available offerings matching the specified offering type. Valid Values: "Partial Upfront" | "All Upfront" | "No Upfront" */
  OfferingType?: string;
  /** Product description filter value. Specify this parameter to show only the available offerings that contain the specified product description. The results show offerings that partially match the filter */
  ProductDescription?: string;
  /** The offering identifier filter value. Specify this parameter to show only the available offering that matches the specified reservation identifier. Example: 438012d3-4052-4cc7-b2e3-8d3372e0e706 */
  ReservedDBInstancesOfferingId?: string;
}

export interface DescribeSourceRegionsInput {
  /** This parameter isn't currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeSourceRegions request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by Ma */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so you can retrieve  */
  MaxRecords?: number;
  /** The source Amazon Web Services Region name. For example, us-east-1. Constraints: Must specify a valid Amazon Web Services Region name. */
  RegionName?: string;
}

export interface DescribeTenantDatabasesInput {
  /** The user-supplied DB instance identifier, which must match the identifier of an existing instance owned by the Amazon Web Services account. This parameter isn't case-sensitive. */
  DBInstanceIdentifier?: string;
  /** A filter that specifies one or more database tenants to describe. Supported filters: tenant-db-name - Tenant database names. The results list only includes information about the tenant databases that  */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeTenantDatabases request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by  */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that you can retr */
  MaxRecords?: number;
  /** The user-supplied tenant database name, which must match the name of an existing tenant database on the specified DB instance owned by your Amazon Web Services account. This parameter isn’t case-sensi */
  TenantDBName?: string;
}

export interface DescribeValidDBInstanceModificationsInput {
  /** The customer identifier or the ARN of your DB instance. */
  DBInstanceIdentifier: string;
}

export interface DisableHttpEndpointInput {
  /** The Amazon Resource Name (ARN) of the DB cluster. */
  ResourceArn: string;
}

export interface DownloadDBLogFilePortionInput {
  /** The customer-assigned name of the DB instance that contains the log files you want to list. Constraints: Must match the identifier of an existing DBInstance. */
  DBInstanceIdentifier: string;
  /** The name of the log file to be downloaded. */
  LogFileName: string;
  /** The pagination token provided in the previous request or "0". If the Marker parameter is specified the response includes only records beyond the marker until the end of the file or up to NumberOfLines */
  Marker?: string;
  /** The number of lines to download. If the number of lines specified results in a file over 1 MB in size, the file is truncated at 1 MB in size. If the NumberOfLines parameter is specified, then the bloc */
  NumberOfLines?: number;
}

export interface EnableHttpEndpointInput {
  /** The Amazon Resource Name (ARN) of the DB cluster. */
  ResourceArn: string;
}

export interface FailoverDBClusterInput {
  /** The identifier of the DB cluster to force a failover for. This parameter isn't case-sensitive. Constraints: Must match the identifier of an existing DB cluster. */
  DBClusterIdentifier: string;
  /** The name of the DB instance to promote to the primary DB instance. Specify the DB instance identifier for an Aurora Replica or a Multi-AZ readable standby in the DB cluster, for example mydbcluster-re */
  TargetDBInstanceIdentifier?: string;
}

export interface FailoverGlobalClusterInput {
  /** The identifier of the global database cluster (Aurora global database) this operation should apply to. The identifier is the unique key assigned by the user when the Aurora global database is created. */
  GlobalClusterIdentifier: string;
  /** The identifier of the secondary Aurora DB cluster that you want to promote to the primary for the global database cluster. Use the Amazon Resource Name (ARN) for the identifier so that Aurora can loca */
  TargetDbClusterIdentifier: string;
  /** Specifies whether to allow data loss for this global database cluster operation. Allowing data loss triggers a global failover operation. If you don't specify AllowDataLoss, the global database cluste */
  AllowDataLoss?: boolean;
  /** Specifies whether to switch over this global database cluster. Constraints: Can't be specified together with the AllowDataLoss parameter. */
  Switchover?: boolean;
}

export interface ListTagsForResourceInput {
  /** The Amazon RDS resource with tags to be listed. This value is an Amazon Resource Name (ARN). For information about creating an ARN, see Constructing an ARN for Amazon RDS in the Amazon RDS User Guide. */
  ResourceName: string;
  /** This parameter isn't currently supported. */
  Filters?: Filter[];
}

export interface ModifyActivityStreamInput {
  /** The audit policy state. When a policy is unlocked, it is read/write. When it is locked, it is read-only. You can edit your audit policy only when the activity stream is unlocked or stopped. */
  AuditPolicyState?: 'locked' | 'unlocked';
  /** The Amazon Resource Name (ARN) of the RDS for Oracle or Microsoft SQL Server DB instance. For example, arn:aws:rds:us-east-1:12345667890:db:my-orcl-db. */
  ResourceArn?: string;
}

export interface ModifyCertificatesInput {
  /** The new default certificate identifier to override the current one with. To determine the valid values, use the describe-certificates CLI command or the DescribeCertificates API operation. */
  CertificateIdentifier?: string;
  /** Specifies whether to remove the override for the default certificate. If the override is removed, the default certificate is the system default. */
  RemoveCustomerOverride?: boolean;
}

export interface ModifyCurrentDBClusterCapacityInput {
  /** The DB cluster identifier for the cluster being modified. This parameter isn't case-sensitive. Constraints: Must match the identifier of an existing DB cluster. */
  DBClusterIdentifier: string;
  /** The DB cluster capacity. When you change the capacity of a paused Aurora Serverless v1 DB cluster, it automatically resumes. Constraints: For Aurora MySQL, valid capacity values are 1, 2, 4, 8, 16, 32 */
  Capacity?: number;
  /** The amount of time, in seconds, that Aurora Serverless v1 tries to find a scaling point to perform seamless scaling before enforcing the timeout action. The default is 300. Specify a value between 10  */
  SecondsBeforeTimeout?: number;
  /** The action to take when the timeout is reached, either ForceApplyCapacityChange or RollbackCapacityChange. ForceApplyCapacityChange, the default, sets the capacity to the specified value as soon as po */
  TimeoutAction?: string;
}

export interface ModifyCustomDBEngineVersionInput {
  /** The database engine. RDS Custom for Oracle supports the following values: custom-oracle-ee custom-oracle-ee-cdb custom-oracle-se2 custom-oracle-se2-cdb RDS Custom for SQL Server supports the following */
  Engine: string;
  /** The custom engine version (CEV) that you want to modify. This option is required for RDS Custom for Oracle, but optional for Amazon RDS. The combination of Engine and EngineVersion is unique per custo */
  EngineVersion: string;
  /** An optional description of your CEV. */
  Description?: string;
  /** The availability status to be assigned to the CEV. Valid values are as follows: available You can use this CEV to create a new RDS Custom DB instance. inactive You can create a new RDS Custom instance */
  Status?: 'available' | 'inactive' | 'inactive-except-restore';
}

export interface ModifyDBClusterInput {
  /** The DB cluster identifier for the cluster being modified. This parameter isn't case-sensitive. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Constraints: Must match the identifie */
  DBClusterIdentifier: string;
  /** The amount of storage in gibibytes (GiB) to allocate to each DB instance in the Multi-AZ DB cluster. Valid for Cluster Type: Multi-AZ DB clusters only */
  AllocatedStorage?: number;
  /** Specifies whether engine mode changes from serverless to provisioned are allowed. Valid for Cluster Type: Aurora Serverless v1 DB clusters only Constraints: You must allow engine mode changes when spe */
  AllowEngineModeChange?: boolean;
  /** Specifies whether major version upgrades are allowed. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Constraints: You must allow major version upgrades when specifying a value for */
  AllowMajorVersionUpgrade?: boolean;
  /** Specifies whether the modifications in this request are asynchronously applied as soon as possible, regardless of the PreferredMaintenanceWindow setting for the DB cluster. If this parameter is disabl */
  ApplyImmediately?: boolean;
  /** Specifies whether minor engine upgrades are applied automatically to the DB cluster during the maintenance window. By default, minor engine upgrades are applied automatically. Valid for Cluster Type:  */
  AutoMinorVersionUpgrade?: boolean;
  /** The Amazon Resource Name (ARN) of the recovery point in Amazon Web Services Backup. */
  AwsBackupRecoveryPointArn?: string;
  /** The target backtrack window, in seconds. To disable backtracking, set this value to 0. Valid for Cluster Type: Aurora MySQL DB clusters only Default: 0 Constraints: If specified, this value must be se */
  BacktrackWindow?: number;
  /** The number of days for which automated backups are retained. Specify a minimum value of 1. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Default: 1 Constraints: Must be a value f */
  BackupRetentionPeriod?: number;
  /** The CA certificate identifier to use for the DB cluster's server certificate. For more information, see Using SSL/TLS to encrypt a connection to a DB instance in the Amazon RDS User Guide. Valid for C */
  CACertificateIdentifier?: string;
  /** The configuration setting for the log types to be enabled for export to CloudWatch Logs for a specific DB cluster. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters The following val */
  CloudwatchLogsExportConfiguration?: CloudwatchLogsExportConfiguration;
  /** Specifies whether to copy all tags from the DB cluster to snapshots of the DB cluster. The default is not to copy them. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters */
  CopyTagsToSnapshot?: boolean;
  /** Specifies the mode of Database Insights to enable for the DB cluster. If you change the value from standard to advanced, you must set the PerformanceInsightsEnabled parameter to true and the Performan */
  DatabaseInsightsMode?: 'standard' | 'advanced';
  /** The compute and memory capacity of each DB instance in the Multi-AZ DB cluster, for example db.m6gd.xlarge. Not all DB instance classes are available in all Amazon Web Services Regions, or for all dat */
  DBClusterInstanceClass?: string;
  /** The name of the DB cluster parameter group to use for the DB cluster. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters */
  DBClusterParameterGroupName?: string;
  /** The name of the DB parameter group to apply to all instances of the DB cluster. When you apply a parameter group using the DBInstanceParameterGroupName parameter, the DB cluster isn't rebooted automat */
  DBInstanceParameterGroupName?: string;
  /** Specifies whether the DB cluster has deletion protection enabled. The database can't be deleted when deletion protection is enabled. By default, deletion protection isn't enabled. Valid for Cluster Ty */
  DeletionProtection?: boolean;
  /** The Active Directory directory ID to move the DB cluster to. Specify none to remove the cluster from its current domain. The domain must be created prior to this operation. For more information, see K */
  Domain?: string;
  /** The name of the IAM role to use when making API calls to the Directory Service. Valid for Cluster Type: Aurora DB clusters only */
  DomainIAMRoleName?: string;
  /** Specifies whether to enable this DB cluster to forward write operations to the primary cluster of a global cluster (Aurora global database). By default, write operations are not allowed on Aurora DB c */
  EnableGlobalWriteForwarding?: boolean;
  /** Specifies whether to enable the HTTP endpoint for an Aurora Serverless v1 DB cluster. By default, the HTTP endpoint isn't enabled. When enabled, the HTTP endpoint provides a connectionless web service */
  EnableHttpEndpoint?: boolean;
  /** Specifies whether to enable mapping of Amazon Web Services Identity and Access Management (IAM) accounts to database accounts. By default, mapping isn't enabled. For more information, see IAM Database */
  EnableIAMDatabaseAuthentication?: boolean;
  /** Specifies whether to enable Aurora Limitless Database. You must enable Aurora Limitless Database to create a DB shard group. Valid for: Aurora DB clusters only This setting is no longer used. Instead  */
  EnableLimitlessDatabase?: boolean;
  /** Specifies whether read replicas can forward write operations to the writer DB instance in the DB cluster. By default, write operations aren't allowed on reader DB instances. Valid for: Aurora DB clust */
  EnableLocalWriteForwarding?: boolean;
  /** Specifies whether to turn on Performance Insights for the DB cluster. For more information, see Using Amazon Performance Insights in the Amazon RDS User Guide. Valid for Cluster Type: Aurora DB cluste */
  EnablePerformanceInsights?: boolean;
  /** The DB engine mode of the DB cluster, either provisioned or serverless. The DB engine mode can be modified only from serverless to provisioned. For more information, see CreateDBCluster. Valid for Clu */
  EngineMode?: string;
  /** The version number of the database engine to which you want to upgrade. Changing this parameter results in an outage. The change is applied during the next maintenance window unless ApplyImmediately i */
  EngineVersion?: string;
  /** The amount of Provisioned IOPS (input/output operations per second) to be initially allocated for each DB instance in the Multi-AZ DB cluster. For information about valid IOPS values, see Amazon RDS P */
  Iops?: number;
  /** Specifies whether to manage the master user password with Amazon Web Services Secrets Manager. If the DB cluster doesn't manage the master user password with Amazon Web Services Secrets Manager, you c */
  ManageMasterUserPassword?: boolean;
  /** Specifies the authentication type for the master user. With IAM master user authentication, you can change the master DB user to use IAM database authentication. You can specify one of the following v */
  MasterUserAuthenticationType?: 'password' | 'iam-db-auth';
  /** The new password for the master database user. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Constraints: Must contain from 8 to 41 characters. Can contain any printable ASCII ch */
  MasterUserPassword?: string;
  /** The Amazon Web Services KMS key identifier to encrypt a secret that is automatically generated and managed in Amazon Web Services Secrets Manager. This setting is valid only if both of the following c */
  MasterUserSecretKmsKeyId?: string;
  /** The interval, in seconds, between points when Enhanced Monitoring metrics are collected for the DB cluster. To turn off collecting Enhanced Monitoring metrics, specify 0. If MonitoringRoleArn is speci */
  MonitoringInterval?: number;
  /** The Amazon Resource Name (ARN) for the IAM role that permits RDS to send Enhanced Monitoring metrics to Amazon CloudWatch Logs. An example is arn:aws:iam:123456789012:role/emaccess. For information on */
  MonitoringRoleArn?: string;
  /** The network type of the DB cluster. The network type is determined by the DBSubnetGroup specified for the DB cluster. A DBSubnetGroup can support only the IPv4 protocol or the IPv4 and the IPv6 protoc */
  NetworkType?: string;
  /** The new DB cluster identifier for the DB cluster when renaming a DB cluster. This value is stored as a lowercase string. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Constraints */
  NewDBClusterIdentifier?: string;
  /** The option group to associate the DB cluster with. DB clusters are associated with a default option group that can't be modified. */
  OptionGroupName?: string;
  /** The Amazon Web Services KMS key identifier for encryption of Performance Insights data. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key. If  */
  PerformanceInsightsKMSKeyId?: string;
  /** The number of days to retain Performance Insights data. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Valid Values: 7 month * 31, where month is a number of months from 1-23. Exa */
  PerformanceInsightsRetentionPeriod?: number;
  /** The port number on which the DB cluster accepts connections. Valid for Cluster Type: Aurora DB clusters only Valid Values: 1150-65535 Default: The same port as the original DB cluster. */
  Port?: number;
  /** The daily time range during which automated backups are created if automated backups are enabled, using the BackupRetentionPeriod parameter. The default is a 30-minute window selected at random from a */
  PreferredBackupWindow?: string;
  /** The weekly time range during which system maintenance can occur, in Universal Coordinated Time (UTC). Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters The default is a 30-minute win */
  PreferredMaintenanceWindow?: string;
  /** Specifies whether to rotate the secret managed by Amazon Web Services Secrets Manager for the master user password. This setting is valid only if the master user password is managed by RDS in Amazon W */
  RotateMasterUserPassword?: boolean;
  /** The scaling properties of the DB cluster. You can only modify scaling properties for DB clusters in serverless DB engine mode. Valid for Cluster Type: Aurora DB clusters only */
  ScalingConfiguration?: ScalingConfiguration;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  /** The storage type to associate with the DB cluster. For information on storage types for Aurora DB clusters, see Storage configurations for Amazon Aurora DB clusters. For information on storage types f */
  StorageType?: string;
  /** A list of EC2 VPC security groups to associate with this DB cluster. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters */
  VpcSecurityGroupIds?: string[];
}

export interface ModifyDBClusterEndpointInput {
  /** The identifier of the endpoint to modify. This parameter is stored as a lowercase string. */
  DBClusterEndpointIdentifier: string;
  /** The type of the endpoint. One of: READER, WRITER, ANY. */
  EndpointType?: string;
  /** List of DB instance identifiers that aren't part of the custom endpoint group. All other eligible instances are reachable through the custom endpoint. Only relevant if the list of static members is em */
  ExcludedMembers?: string[];
  /** List of DB instance identifiers that are part of the custom endpoint group. */
  StaticMembers?: string[];
}

export interface ModifyDBClusterParameterGroupInput {
  /** The name of the DB cluster parameter group to modify. */
  DBClusterParameterGroupName: string;
  /** A list of parameters in the DB cluster parameter group to modify. Valid Values (for the application method): immediate | pending-reboot You can use the immediate value with dynamic parameters only. Yo */
  Parameters: Parameter[];
}

export interface ModifyDBClusterSnapshotAttributeInput {
  /** The name of the DB cluster snapshot attribute to modify. To manage authorization for other Amazon Web Services accounts to copy or restore a manual DB cluster snapshot, set this value to restore. To v */
  AttributeName: string;
  /** The identifier for the DB cluster snapshot to modify the attributes for. */
  DBClusterSnapshotIdentifier: string;
  /** A list of DB cluster snapshot attributes to add to the attribute specified by AttributeName. To authorize other Amazon Web Services accounts to copy or restore a manual DB cluster snapshot, set this l */
  ValuesToAdd?: string[];
  /** A list of DB cluster snapshot attributes to remove from the attribute specified by AttributeName. To remove authorization for other Amazon Web Services accounts to copy or restore a manual DB cluster  */
  ValuesToRemove?: string[];
}

export interface ModifyDBInstanceInput {
  /** The identifier of DB instance to modify. This value is stored as a lowercase string. Constraints: Must match the identifier of an existing DB instance. */
  DBInstanceIdentifier: string;
  /** A list of additional storage volumes to modify or delete for the DB instance. You can create up to 3 additional storage volumes. Additional storage volumes are supported for RDS for Oracle and RDS for */
  AdditionalStorageVolumes?: ModifyAdditionalStorageVolume[];
  /** The new amount of storage in gibibytes (GiB) to allocate for the DB instance. For RDS for Db2, MariaDB, RDS for MySQL, RDS for Oracle, and RDS for PostgreSQL, the value supplied must be at least 10% g */
  AllocatedStorage?: number;
  /** Specifies whether major version upgrades are allowed. Changing this parameter doesn't result in an outage and the change is asynchronously applied as soon as possible. This setting doesn't apply to RD */
  AllowMajorVersionUpgrade?: boolean;
  /** Specifies whether the modifications in this request and any pending modifications are asynchronously applied as soon as possible, regardless of the PreferredMaintenanceWindow setting for the DB instan */
  ApplyImmediately?: boolean;
  /** The automation mode of the RDS Custom DB instance. If full, the DB instance automates monitoring and instance recovery. If all paused, the instance pauses automation for the duration set by ResumeFull */
  AutomationMode?: 'full' | 'all-paused';
  /** Specifies whether minor version upgrades are applied automatically to the DB instance during the maintenance window. An outage occurs when all the following conditions are met: The automatic upgrade i */
  AutoMinorVersionUpgrade?: boolean;
  /** The Amazon Resource Name (ARN) of the recovery point in Amazon Web Services Backup. This setting doesn't apply to RDS Custom DB instances. */
  AwsBackupRecoveryPointArn?: string;
  /** The number of days to retain automated backups. Setting this parameter to a positive number enables backups. Setting this parameter to 0 disables automated backups. Enabling and disabling backups can  */
  BackupRetentionPeriod?: number;
  /** The CA certificate identifier to use for the DB instance's server certificate. This setting doesn't apply to RDS Custom DB instances. For more information, see Using SSL/TLS to encrypt a connection to */
  CACertificateIdentifier?: string;
  /** Specifies whether the DB instance is restarted when you rotate your SSL/TLS certificate. By default, the DB instance is restarted when you rotate your SSL/TLS certificate. The certificate is not updat */
  CertificateRotationRestart?: boolean;
  /** The log types to be enabled for export to CloudWatch Logs for a specific DB instance. A change to the CloudwatchLogsExportConfiguration parameter is always applied to the DB instance immediately. Ther */
  CloudwatchLogsExportConfiguration?: CloudwatchLogsExportConfiguration;
  /** Specifies whether to copy all tags from the DB instance to snapshots of the DB instance. By default, tags aren't copied. This setting doesn't apply to Amazon Aurora DB instances. Copying tags to snaps */
  CopyTagsToSnapshot?: boolean;
  /** Specifies the mode of Database Insights to enable for the DB instance. Aurora DB instances inherit this value from the DB cluster, so you can't change this value. */
  DatabaseInsightsMode?: 'standard' | 'advanced';
  /** The new compute and memory capacity of the DB instance, for example db.m4.large. Not all DB instance classes are available in all Amazon Web Services Regions, or for all database engines. For the full */
  DBInstanceClass?: string;
  /** The name of the DB parameter group to apply to the DB instance. Changing this setting doesn't result in an outage. The parameter group name itself is changed immediately, but the actual parameter chan */
  DBParameterGroupName?: string;
  /** The port number on which the database accepts connections. The value of the DBPortNumber parameter must not match any of the port values specified for options in the option group for the DB instance.  */
  DBPortNumber?: number;
  /** A list of DB security groups to authorize on this DB instance. Changing this setting doesn't result in an outage and the change is asynchronously applied as soon as possible. This setting doesn't appl */
  DBSecurityGroups?: string[];
  /** The new DB subnet group for the DB instance. You can use this parameter to move your DB instance to a different VPC. If your DB instance isn't in a VPC, you can also use this parameter to move your DB */
  DBSubnetGroupName?: string;
  /** Indicates whether the DB instance has a dedicated log volume (DLV) enabled. */
  DedicatedLogVolume?: boolean;
  /** Specifies whether the DB instance has deletion protection enabled. The database can't be deleted when deletion protection is enabled. By default, deletion protection isn't enabled. For more informatio */
  DeletionProtection?: boolean;
  /** Specifies whether to remove the DB instance from the Active Directory domain. */
  DisableDomain?: boolean;
  /** The Active Directory directory ID to move the DB instance to. Specify none to remove the instance from its current domain. You must create the domain before this operation. Currently, you can create o */
  Domain?: string;
  /** The ARN for the Secrets Manager secret with the credentials for the user joining the domain. Example: arn:aws:secretsmanager:region:account-number:secret:myselfmanagedADtestsecret-123456 */
  DomainAuthSecretArn?: string;
  /** The IPv4 DNS IP addresses of your primary and secondary Active Directory domain controllers. Constraints: Two IP addresses must be provided. If there isn't a secondary domain controller, use the IP ad */
  DomainDnsIps?: string[];
  /** The fully qualified domain name (FQDN) of an Active Directory domain. Constraints: Can't be longer than 64 characters. Example: mymanagedADtest.mymanagedAD.mydomain */
  DomainFqdn?: string;
  /** The name of the IAM role to use when making API calls to the Directory Service. This setting doesn't apply to RDS Custom DB instances. */
  DomainIAMRoleName?: string;
  /** The Active Directory organizational unit for your DB instance to join. Constraints: Must be in the distinguished name format. Example: OU=mymanagedADtestOU,DC=mymanagedADtest,DC=mymanagedAD,DC=mydomai */
  DomainOu?: string;
  /** Specifies whether to enable a customer-owned IP address (CoIP) for an RDS on Outposts DB instance. A CoIP provides local or external connectivity to resources in your Outpost subnets through your on-p */
  EnableCustomerOwnedIp?: boolean;
  /** Specifies whether to enable mapping of Amazon Web Services Identity and Access Management (IAM) accounts to database accounts. By default, mapping isn't enabled. This setting doesn't apply to Amazon A */
  EnableIAMDatabaseAuthentication?: boolean;
  /** Specifies whether to enable Performance Insights for the DB instance. For more information, see Using Amazon Performance Insights in the Amazon RDS User Guide. This setting doesn't apply to RDS Custom */
  EnablePerformanceInsights?: boolean;
  /** The target Oracle DB engine when you convert a non-CDB to a CDB. This intermediate step is necessary to upgrade an Oracle Database 19c non-CDB to an Oracle Database 21c CDB. Note the following require */
  Engine?: string;
  /** The version number of the database engine to upgrade to. Changing this parameter results in an outage and the change is applied during the next maintenance window unless the ApplyImmediately parameter */
  EngineVersion?: string;
  /** The new Provisioned IOPS (I/O operations per second) value for the RDS instance. Changing this setting doesn't result in an outage and the change is applied during the next maintenance window unless t */
  Iops?: number;
  /** The license model for the DB instance. This setting doesn't apply to Amazon Aurora or RDS Custom DB instances. Valid Values: RDS for Db2 - bring-your-own-license RDS for MariaDB - general-public-licen */
  LicenseModel?: string;
  /** Specifies whether to manage the master user password with Amazon Web Services Secrets Manager. If the DB instance doesn't manage the master user password with Amazon Web Services Secrets Manager, you  */
  ManageMasterUserPassword?: boolean;
  /** Specifies the authentication type for the master user. With IAM master user authentication, you can change the master DB user to use IAM database authentication. You can specify one of the following v */
  MasterUserAuthenticationType?: 'password' | 'iam-db-auth';
  /** The new password for the master user. Changing this parameter doesn't result in an outage and the change is asynchronously applied as soon as possible. Between the time of the request and the completi */
  MasterUserPassword?: string;
  /** The Amazon Web Services KMS key identifier to encrypt a secret that is automatically generated and managed in Amazon Web Services Secrets Manager. This setting is valid only if both of the following c */
  MasterUserSecretKmsKeyId?: string;
  /** The upper limit in gibibytes (GiB) to which Amazon RDS can automatically scale the storage of the DB instance. For more information about this setting, including limitations that apply to it, see Mana */
  MaxAllocatedStorage?: number;
  /** The interval, in seconds, between points when Enhanced Monitoring metrics are collected for the DB instance. To disable collection of Enhanced Monitoring metrics, specify 0. If MonitoringRoleArn is sp */
  MonitoringInterval?: number;
  /** The ARN for the IAM role that permits RDS to send enhanced monitoring metrics to Amazon CloudWatch Logs. For example, arn:aws:iam:123456789012:role/emaccess. For information on creating a monitoring r */
  MonitoringRoleArn?: string;
  /** Specifies whether the DB instance is a Multi-AZ deployment. Changing this parameter doesn't result in an outage. The change is applied during the next maintenance window unless the ApplyImmediately pa */
  MultiAZ?: boolean;
  /** Specifies whether the to convert your DB instance from the single-tenant conﬁguration to the multi-tenant conﬁguration. This parameter is supported only for RDS for Oracle CDB instances. During the co */
  MultiTenant?: boolean;
  /** The network type of the DB instance. The network type is determined by the DBSubnetGroup specified for the DB instance. A DBSubnetGroup can support only the IPv4 protocol or the IPv4 and the IPv6 prot */
  NetworkType?: string;
  /** The new identifier for the DB instance when renaming a DB instance. When you change the DB instance identifier, an instance reboot occurs immediately if you enable ApplyImmediately, or will occur duri */
  NewDBInstanceIdentifier?: string;
  /** The option group to associate the DB instance with. Changing this parameter doesn't result in an outage, with one exception. If the parameter change results in an option group that enables OEM, it can */
  OptionGroupName?: string;
  /** The Amazon Web Services KMS key identifier for encryption of Performance Insights data. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key. If  */
  PerformanceInsightsKMSKeyId?: string;
  /** The number of days to retain Performance Insights data. This setting doesn't apply to RDS Custom DB instances. Valid Values: 7 month * 31, where month is a number of months from 1-23. Examples: 93 (3  */
  PerformanceInsightsRetentionPeriod?: number;
  /** The daily time range during which automated backups are created if automated backups are enabled, as determined by the BackupRetentionPeriod parameter. Changing this parameter doesn't result in an out */
  PreferredBackupWindow?: string;
  /** The weekly time range during which system maintenance can occur, which might result in an outage. Changing this parameter doesn't result in an outage, except in the following situation, and the change */
  PreferredMaintenanceWindow?: string;
  /** The number of CPU cores and the number of threads per core for the DB instance class of the DB instance. This setting doesn't apply to RDS Custom DB instances. */
  ProcessorFeatures?: ProcessorFeature[];
  /** The order of priority in which an Aurora Replica is promoted to the primary instance after a failure of the existing primary instance. For more information, see Fault Tolerance for an Aurora DB Cluste */
  PromotionTier?: number;
  /** Specifies whether the DB instance is publicly accessible. When the DB instance is publicly accessible and you connect from outside of the DB instance's virtual private cloud (VPC), its Domain Name Sys */
  PubliclyAccessible?: boolean;
  /** The open mode of a replica database. This parameter is only supported for Db2 DB instances and Oracle DB instances. Db2 Standby DB replicas are included in Db2 Advanced Edition (AE) and Db2 Standard E */
  ReplicaMode?: 'open-read-only' | 'mounted';
  /** The number of minutes to pause the automation. When the time period ends, RDS Custom resumes full automation. Default: 60 Constraints: Must be at least 60. Must be no more than 1,440. */
  ResumeFullAutomationModeMinutes?: number;
  /** Specifies whether to rotate the secret managed by Amazon Web Services Secrets Manager for the master user password. This setting is valid only if the master user password is managed by RDS in Amazon W */
  RotateMasterUserPassword?: boolean;
  /** The storage throughput value for the DB instance. This setting applies only to the gp3 storage type. This setting doesn't apply to Amazon Aurora or RDS Custom DB instances. */
  StorageThroughput?: number;
  /** The storage type to associate with the DB instance. If you specify io1, io2, or gp3 you must also include a value for the Iops parameter. If you choose to migrate your DB instance from using standard  */
  StorageType?: string;
  /** Tags to assign to resources associated with the DB instance. Valid Values: auto-backup - The DB instance's automated backup. */
  TagSpecifications?: TagSpecification[];
  /** The ARN from the key store with which to associate the instance for TDE encryption. This setting doesn't apply to RDS Custom DB instances. */
  TdeCredentialArn?: string;
  /** The password for the given ARN from the key store in order to access the device. This setting doesn't apply to RDS Custom DB instances. */
  TdeCredentialPassword?: string;
  /** Specifies whether the DB instance class of the DB instance uses its default processor features. This setting doesn't apply to RDS Custom DB instances. */
  UseDefaultProcessorFeatures?: boolean;
  /** A list of Amazon EC2 VPC security groups to associate with this DB instance. This change is asynchronously applied as soon as possible. This setting doesn't apply to the following DB instances: Amazon */
  VpcSecurityGroupIds?: string[];
}

export interface ModifyDBParameterGroupInput {
  /** The name of the DB parameter group. Constraints: If supplied, must match the name of an existing DBParameterGroup. */
  DBParameterGroupName: string;
  /** An array of parameter names, values, and the application methods for the parameter update. At least one parameter name, value, and application method must be supplied; later arguments are optional. A  */
  Parameters: Parameter[];
}

export interface ModifyDBProxyInput {
  /** The identifier for the DBProxy to modify. */
  DBProxyName: string;
  /** The new authentication settings for the DBProxy. */
  Auth?: UserAuthConfig[];
  /** Specifies whether the proxy logs detailed connection and query information. When you enable DebugLogging, the proxy captures connection details and connection pool behavior from your queries. Debug lo */
  DebugLogging?: boolean;
  /** The default authentication scheme that the proxy uses for client connections to the proxy and connections from the proxy to the underlying database. Valid values are NONE and IAM_AUTH. When set to IAM */
  DefaultAuthScheme?: 'IAM_AUTH' | 'NONE';
  /** The number of seconds that a connection to the proxy can be inactive before the proxy disconnects it. You can set this value higher or lower than the connection timeout limit for the associated databa */
  IdleClientTimeout?: number;
  /** The new identifier for the DBProxy. An identifier must begin with a letter and must contain only ASCII letters, digits, and hyphens; it can't end with a hyphen or contain two consecutive hyphens. */
  NewDBProxyName?: string;
  /** Whether Transport Layer Security (TLS) encryption is required for connections to the proxy. By enabling this setting, you can enforce encrypted TLS connections to the proxy, even if the associated dat */
  RequireTLS?: boolean;
  /** The Amazon Resource Name (ARN) of the IAM role that the proxy uses to access secrets in Amazon Web Services Secrets Manager. */
  RoleArn?: string;
  /** The new list of security groups for the DBProxy. */
  SecurityGroups?: string[];
}

export interface ModifyDBProxyEndpointInput {
  /** The name of the DB proxy sociated with the DB proxy endpoint that you want to modify. */
  DBProxyEndpointName: string;
  /** The new identifier for the DBProxyEndpoint. An identifier must begin with a letter and must contain only ASCII letters, digits, and hyphens; it can't end with a hyphen or contain two consecutive hyphe */
  NewDBProxyEndpointName?: string;
  /** The VPC security group IDs for the DB proxy endpoint. When the DB proxy endpoint uses a different VPC than the original proxy, you also specify a different set of security group IDs than for the origi */
  VpcSecurityGroupIds?: string[];
}

export interface ModifyDBProxyTargetGroupInput {
  /** The name of the proxy. */
  DBProxyName: string;
  /** The name of the target group to modify. */
  TargetGroupName: string;
  /** The settings that determine the size and behavior of the connection pool for the target group. */
  ConnectionPoolConfig?: ConnectionPoolConfiguration;
  /** The new name for the modified DBProxyTarget. An identifier must begin with a letter and must contain only ASCII letters, digits, and hyphens; it can't end with a hyphen or contain two consecutive hyph */
  NewName?: string;
}

export interface ModifyDBRecommendationInput {
  /** The identifier of the recommendation to update. */
  RecommendationId: string;
  /** The language of the modified recommendation. */
  Locale?: string;
  /** The list of recommended action status to update. You can update multiple recommended actions at one time. */
  RecommendedActionUpdates?: RecommendedActionUpdate[];
  /** The recommendation status to update. Valid values: active dismissed */
  Status?: string;
}

export interface ModifyDBShardGroupInput {
  /** The name of the DB shard group to modify. */
  DBShardGroupIdentifier: string;
  /** Specifies whether to create standby DB shard groups for the DB shard group. Valid values are the following: 0 - Creates a DB shard group without a standby DB shard group. This is the default value. 1  */
  ComputeRedundancy?: number;
  /** The maximum capacity of the DB shard group in Aurora capacity units (ACUs). */
  MaxACU?: number;
  /** The minimum capacity of the DB shard group in Aurora capacity units (ACUs). */
  MinACU?: number;
}

export interface ModifyDBSnapshotInput {
  /** The identifier of the DB snapshot to modify. */
  DBSnapshotIdentifier: string;
  /** The engine version to upgrade the DB snapshot to. The following are the database engines and engine versions that are available when you upgrade a DB snapshot. MariaDB For the list of engine versions  */
  EngineVersion?: string;
  /** The option group to identify with the upgraded DB snapshot. You can specify this parameter when you upgrade an Oracle DB snapshot. The same option group considerations apply when upgrading a DB snapsh */
  OptionGroupName?: string;
}

export interface ModifyDBSnapshotAttributeInput {
  /** The name of the DB snapshot attribute to modify. To manage authorization for other Amazon Web Services accounts to copy or restore a manual DB snapshot, set this value to restore. To view the list of  */
  AttributeName: string;
  /** The identifier for the DB snapshot to modify the attributes for. */
  DBSnapshotIdentifier: string;
  /** A list of DB snapshot attributes to add to the attribute specified by AttributeName. To authorize other Amazon Web Services accounts to copy or restore a manual snapshot, set this list to include one  */
  ValuesToAdd?: string[];
  /** A list of DB snapshot attributes to remove from the attribute specified by AttributeName. To remove authorization for other Amazon Web Services accounts to copy or restore a manual snapshot, set this  */
  ValuesToRemove?: string[];
}

export interface ModifyDBSubnetGroupInput {
  /** The name for the DB subnet group. This value is stored as a lowercase string. You can't modify the default subnet group. Constraints: Must match the name of an existing DBSubnetGroup. Must not be defa */
  DBSubnetGroupName: string;
  /** The EC2 subnet IDs for the DB subnet group. */
  SubnetIds: string[];
  /** The description for the DB subnet group. */
  DBSubnetGroupDescription?: string;
}

export interface ModifyEventSubscriptionInput {
  /** The name of the RDS event notification subscription. */
  SubscriptionName: string;
  /** Specifies whether to activate the subscription. */
  Enabled?: boolean;
  /** A list of event categories for a source type (SourceType) that you want to subscribe to. You can see a list of the categories for a given source type in Events in the Amazon RDS User Guide or by using */
  EventCategories?: string[];
  /** The Amazon Resource Name (ARN) of the SNS topic created for event notification. The ARN is created by Amazon SNS when you create a topic and subscribe to it. */
  SnsTopicArn?: string;
  /** The type of source that is generating the events. For example, if you want to be notified of events generated by a DB instance, you would set this parameter to db-instance. For RDS Proxy events, speci */
  SourceType?: string;
}

export interface ModifyGlobalClusterInput {
  /** The cluster identifier for the global cluster to modify. This parameter isn't case-sensitive. Constraints: Must match the identifier of an existing global database cluster. */
  GlobalClusterIdentifier: string;
  /** Specifies whether to allow major version upgrades. Constraints: Must be enabled if you specify a value for the EngineVersion parameter that's a different major version than the global cluster's curren */
  AllowMajorVersionUpgrade?: boolean;
  /** Specifies whether to enable deletion protection for the global database cluster. The global database cluster can't be deleted when deletion protection is enabled. */
  DeletionProtection?: boolean;
  /** The version number of the database engine to which you want to upgrade. To list all of the available engine versions for aurora-mysql (for MySQL-based Aurora global databases), use the following comma */
  EngineVersion?: string;
  /** The new cluster identifier for the global database cluster. This value is stored as a lowercase string. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens. The first character must be */
  NewGlobalClusterIdentifier?: string;
}

export interface ModifyIntegrationInput {
  /** The unique identifier of the integration to modify. */
  IntegrationIdentifier: string;
  /** A new data filter for the integration. For more information, see Data filtering for Aurora zero-ETL integrations with Amazon Redshift or Data filtering for Amazon RDS zero-ETL integrations with Amazon */
  DataFilter?: string;
  /** A new description for the integration. */
  Description?: string;
  /** A new name for the integration. */
  IntegrationName?: string;
}

export interface ModifyOptionGroupInput {
  /** The name of the option group to be modified. Permanent options, such as the TDE option for Oracle Advanced Security TDE, can't be removed from an option group, and that option group can't be removed f */
  OptionGroupName: string;
  /** Specifies whether to apply the change immediately or during the next maintenance window for each instance associated with the option group. */
  ApplyImmediately?: boolean;
  /** Options in this list are added to the option group or, if already present, the specified configuration is used to update the existing configuration. */
  OptionsToInclude?: OptionConfiguration[];
  /** Options in this list are removed from the option group. */
  OptionsToRemove?: string[];
}

export interface ModifyTenantDatabaseInput {
  /** The identifier of the DB instance that contains the tenant database that you are modifying. This parameter isn't case-sensitive. Constraints: Must match the identifier of an existing DB instance. */
  DBInstanceIdentifier: string;
  /** The user-supplied name of the tenant database that you want to modify. This parameter isn’t case-sensitive. Constraints: Must match the identifier of an existing tenant database. */
  TenantDBName: string;
  /** Specifies whether to manage the master user password with Amazon Web Services Secrets Manager. If the tenant database doesn't manage the master user password with Amazon Web Services Secrets Manager,  */
  ManageMasterUserPassword?: boolean;
  /** The new password for the master user of the specified tenant database in your DB instance. Amazon RDS operations never return the password, so this action provides a way to regain access to a tenant d */
  MasterUserPassword?: string;
  /** The Amazon Web Services KMS key identifier to encrypt a secret that is automatically generated and managed in Amazon Web Services Secrets Manager. This setting is valid only if both of the following c */
  MasterUserSecretKmsKeyId?: string;
  /** The new name of the tenant database when renaming a tenant database. This parameter isn’t case-sensitive. Constraints: Can't be the string null or any other reserved word. Can't be longer than 8 chara */
  NewTenantDBName?: string;
  /** Specifies whether to rotate the secret managed by Amazon Web Services Secrets Manager for the master user password. This setting is valid only if the master user password is managed by RDS in Amazon W */
  RotateMasterUserPassword?: boolean;
}

export interface PromoteReadReplicaInput {
  /** The DB instance identifier. This value is stored as a lowercase string. Constraints: Must match the identifier of an existing read replica DB instance. Example: mydbinstance */
  DBInstanceIdentifier: string;
  /** The number of days for which automated backups are retained. Setting this parameter to a positive number enables backups. Setting this parameter to 0 disables automated backups. Default: 1 Constraints */
  BackupRetentionPeriod?: number;
  /** The daily time range during which automated backups are created if automated backups are enabled, using the BackupRetentionPeriod parameter. The default is a 30-minute window selected at random from a */
  PreferredBackupWindow?: string;
  /** Tags to assign to resources associated with the DB instance. Valid Values: auto-backup - The DB instance's automated backup. */
  TagSpecifications?: TagSpecification[];
}

export interface PromoteReadReplicaDBClusterInput {
  /** The identifier of the DB cluster read replica to promote. This parameter isn't case-sensitive. Constraints: Must match the identifier of an existing DB cluster read replica. Example: my-cluster-replic */
  DBClusterIdentifier: string;
}

export interface PurchaseReservedDBInstancesOfferingInput {
  /** The ID of the Reserved DB instance offering to purchase. Example: 438012d3-4052-4cc7-b2e3-8d3372e0e706 */
  ReservedDBInstancesOfferingId: string;
  /** The number of instances to reserve. Default: 1 */
  DBInstanceCount?: number;
  /** Customer-specified identifier to track this reservation. Example: myreservationID */
  ReservedDBInstanceId?: string;
  Tags?: Tag[];
}

export interface RebootDBClusterInput {
  /** The DB cluster identifier. This parameter is stored as a lowercase string. Constraints: Must match the identifier of an existing DBCluster. */
  DBClusterIdentifier: string;
}

export interface RebootDBInstanceInput {
  /** The DB instance identifier. This parameter is stored as a lowercase string. Constraints: Must match the identifier of an existing DBInstance. */
  DBInstanceIdentifier: string;
  /** Specifies whether the reboot is conducted through a Multi-AZ failover. Constraint: You can't enable force failover if the instance isn't configured for Multi-AZ. */
  ForceFailover?: boolean;
}

export interface RebootDBShardGroupInput {
  /** The name of the DB shard group to reboot. */
  DBShardGroupIdentifier: string;
}

export interface RegisterDBProxyTargetsInput {
  /** The identifier of the DBProxy that is associated with the DBProxyTargetGroup. */
  DBProxyName: string;
  /** One or more DB cluster identifiers. */
  DBClusterIdentifiers?: string[];
  /** One or more DB instance identifiers. */
  DBInstanceIdentifiers?: string[];
  /** The identifier of the DBProxyTargetGroup. */
  TargetGroupName?: string;
}

export interface RemoveFromGlobalClusterInput {
  /** The Amazon Resource Name (ARN) identifying the cluster that was detached from the Aurora global database cluster. */
  DbClusterIdentifier: string;
  /** The cluster identifier to detach from the Aurora global database cluster. */
  GlobalClusterIdentifier: string;
}

export interface RemoveRoleFromDBClusterInput {
  /** The name of the DB cluster to disassociate the IAM role from. */
  DBClusterIdentifier: string;
  /** The Amazon Resource Name (ARN) of the IAM role to disassociate from the Aurora DB cluster, for example arn:aws:iam::123456789012:role/AuroraAccessRole. */
  RoleArn: string;
  /** The name of the feature for the DB cluster that the IAM role is to be disassociated from. For information about supported feature names, see DBEngineVersion. */
  FeatureName?: string;
}

export interface RemoveRoleFromDBInstanceInput {
  /** The name of the DB instance to disassociate the IAM role from. */
  DBInstanceIdentifier: string;
  /** The name of the feature for the DB instance that the IAM role is to be disassociated from. For information about supported feature names, see DBEngineVersion. */
  FeatureName: string;
  /** The Amazon Resource Name (ARN) of the IAM role to disassociate from the DB instance, for example, arn:aws:iam::123456789012:role/AccessRole. */
  RoleArn: string;
}

export interface RemoveSourceIdentifierFromSubscriptionInput {
  /** The source identifier to be removed from the subscription, such as the DB instance identifier for a DB instance or the name of a security group. */
  SourceIdentifier: string;
  /** The name of the RDS event notification subscription you want to remove a source identifier from. */
  SubscriptionName: string;
}

export interface RemoveTagsFromResourceInput {
  /** The Amazon RDS resource that the tags are removed from. This value is an Amazon Resource Name (ARN). For information about creating an ARN, see Constructing an ARN for Amazon RDS in the Amazon RDS Use */
  ResourceName: string;
  /** The tag key (name) of the tag to be removed. */
  TagKeys: string[];
}

export interface ResetDBClusterParameterGroupInput {
  /** The name of the DB cluster parameter group to reset. */
  DBClusterParameterGroupName: string;
  /** A list of parameter names in the DB cluster parameter group to reset to the default values. You can't use this parameter if the ResetAllParameters parameter is enabled. */
  Parameters?: Parameter[];
  /** Specifies whether to reset all parameters in the DB cluster parameter group to their default values. You can't use this parameter if there is a list of parameter names specified for the Parameters par */
  ResetAllParameters?: boolean;
}

export interface ResetDBParameterGroupInput {
  /** The name of the DB parameter group. Constraints: Must match the name of an existing DBParameterGroup. */
  DBParameterGroupName: string;
  /** To reset the entire DB parameter group, specify the DBParameterGroup name and ResetAllParameters parameters. To reset specific parameters, provide a list of the following: ParameterName and ApplyMetho */
  Parameters?: Parameter[];
  /** Specifies whether to reset all parameters in the DB parameter group to default values. By default, all parameters in the DB parameter group are reset to default values. */
  ResetAllParameters?: boolean;
}

export interface RestoreDBClusterFromS3Input {
  /** The name of the DB cluster to create from the source data in the Amazon S3 bucket. This parameter isn't case-sensitive. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens. First chara */
  DBClusterIdentifier: string;
  /** The name of the database engine to be used for this DB cluster. Valid Values: aurora-mysql (for Aurora MySQL) */
  Engine: string;
  /** The name of the master user for the restored DB cluster. Constraints: Must be 1 to 16 letters or numbers. First character must be a letter. Can't be a reserved word for the chosen database engine. */
  MasterUsername: string;
  /** The name of the Amazon S3 bucket that contains the data used to create the Amazon Aurora DB cluster. */
  S3BucketName: string;
  /** The Amazon Resource Name (ARN) of the Amazon Web Services Identity and Access Management (IAM) role that authorizes Amazon RDS to access the Amazon S3 bucket on your behalf. */
  S3IngestionRoleArn: string;
  /** The identifier for the database engine that was backed up to create the files stored in the Amazon S3 bucket. Valid Values: mysql */
  SourceEngine: string;
  /** The version of the database that the backup files were created from. MySQL versions 5.7 and 8.0 are supported. Example: 5.7.40, 8.0.28 */
  SourceEngineVersion: string;
  /** A list of Availability Zones (AZs) where instances in the restored DB cluster can be created. */
  AvailabilityZones?: string[];
  /** The target backtrack window, in seconds. To disable backtracking, set this value to 0. Currently, Backtrack is only supported for Aurora MySQL DB clusters. Default: 0 Constraints: If specified, this v */
  BacktrackWindow?: number;
  /** The number of days for which automated backups of the restored DB cluster are retained. You must specify a minimum value of 1. Default: 1 Constraints: Must be a value from 1 to 35 */
  BackupRetentionPeriod?: number;
  /** A value that indicates that the restored DB cluster should be associated with the specified CharacterSet. */
  CharacterSetName?: string;
  /** Specifies whether to copy all tags from the restored DB cluster to snapshots of the restored DB cluster. The default is not to copy them. */
  CopyTagsToSnapshot?: boolean;
  /** The database name for the restored DB cluster. */
  DatabaseName?: string;
  /** The name of the DB cluster parameter group to associate with the restored DB cluster. If this argument is omitted, the default parameter group for the engine version is used. Constraints: If supplied, */
  DBClusterParameterGroupName?: string;
  /** A DB subnet group to associate with the restored DB cluster. Constraints: If supplied, must match the name of an existing DBSubnetGroup. Example: mydbsubnetgroup */
  DBSubnetGroupName?: string;
  /** Specifies whether to enable deletion protection for the DB cluster. The database can't be deleted when deletion protection is enabled. By default, deletion protection isn't enabled. */
  DeletionProtection?: boolean;
  /** Specify the Active Directory directory ID to restore the DB cluster in. The domain must be created prior to this operation. For Amazon Aurora DB clusters, Amazon RDS can use Kerberos Authentication to */
  Domain?: string;
  /** Specify the name of the IAM role to be used when making API calls to the Directory Service. */
  DomainIAMRoleName?: string;
  /** The list of logs that the restored DB cluster is to export to CloudWatch Logs. The values in the list depend on the DB engine being used. Aurora MySQL Possible values are audit, error, general, instan */
  EnableCloudwatchLogsExports?: string[];
  /** Specifies whether to enable mapping of Amazon Web Services Identity and Access Management (IAM) accounts to database accounts. By default, mapping isn't enabled. For more information, see IAM Database */
  EnableIAMDatabaseAuthentication?: boolean;
  /** The life cycle type for this DB cluster. By default, this value is set to open-source-rds-extended-support, which enrolls your DB cluster into Amazon RDS Extended Support. At the end of standard suppo */
  EngineLifecycleSupport?: string;
  /** The version number of the database engine to use. To list all of the available engine versions for aurora-mysql (Aurora MySQL), use the following command: aws rds describe-db-engine-versions --engine  */
  EngineVersion?: string;
  /** The Amazon Web Services KMS key identifier for an encrypted DB cluster. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key. To use a KMS key in */
  KmsKeyId?: string;
  /** Specifies whether to manage the master user password with Amazon Web Services Secrets Manager. For more information, see Password management with Amazon Web Services Secrets Manager in the Amazon RDS  */
  ManageMasterUserPassword?: boolean;
  /** The password for the master database user. This password can contain any printable ASCII character except "/", """, or "@". Constraints: Must contain from 8 to 41 characters. Can't be specified if Man */
  MasterUserPassword?: string;
  /** The Amazon Web Services KMS key identifier to encrypt a secret that is automatically generated and managed in Amazon Web Services Secrets Manager. This setting is valid only if the master user passwor */
  MasterUserSecretKmsKeyId?: string;
  /** The network type of the DB cluster. Valid Values: IPV4 DUAL The network type is determined by the DBSubnetGroup specified for the DB cluster. A DBSubnetGroup can support only the IPv4 protocol or the  */
  NetworkType?: string;
  /** A value that indicates that the restored DB cluster should be associated with the specified option group. Permanent options can't be removed from an option group. An option group can't be removed from */
  OptionGroupName?: string;
  /** The port number on which the instances in the restored DB cluster accept connections. Default: 3306 */
  Port?: number;
  /** The daily time range during which automated backups are created if automated backups are enabled using the BackupRetentionPeriod parameter. The default is a 30-minute window selected at random from an */
  PreferredBackupWindow?: string;
  /** The weekly time range during which system maintenance can occur, in Universal Coordinated Time (UTC). Format: ddd:hh24:mi-ddd:hh24:mi The default is a 30-minute window selected at random from an 8-hou */
  PreferredMaintenanceWindow?: string;
  /** The prefix for all of the file names that contain the data used to create the Amazon Aurora DB cluster. If you do not specify a SourceS3Prefix value, then the Amazon Aurora DB cluster is created by us */
  S3Prefix?: string;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  /** Specifies whether the restored DB cluster is encrypted. */
  StorageEncrypted?: boolean;
  /** Specifies the storage type to be associated with the DB cluster. Valid Values: aurora, aurora-iopt1 Default: aurora Valid for: Aurora DB clusters only */
  StorageType?: string;
  Tags?: Tag[];
  /** Tags to assign to resources associated with the DB cluster. Valid Values: cluster-auto-backup - The DB cluster's automated backup. */
  TagSpecifications?: TagSpecification[];
  /** A list of EC2 VPC security groups to associate with the restored DB cluster. */
  VpcSecurityGroupIds?: string[];
}

export interface RestoreDBClusterFromSnapshotInput {
  /** The name of the DB cluster to create from the DB snapshot or DB cluster snapshot. This parameter isn't case-sensitive. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens First charact */
  DBClusterIdentifier: string;
  /** The database engine to use for the new DB cluster. Default: The same as source Constraint: Must be compatible with the engine of the source Valid for: Aurora DB clusters and Multi-AZ DB clusters */
  Engine: string;
  /** The identifier for the DB snapshot or DB cluster snapshot to restore from. You can use either the name or the Amazon Resource Name (ARN) to specify a DB cluster snapshot. However, you can use only the */
  SnapshotIdentifier: string;
  /** Provides the list of Availability Zones (AZs) where instances in the restored DB cluster can be created. Valid for: Aurora DB clusters only */
  AvailabilityZones?: string[];
  /** The target backtrack window, in seconds. To disable backtracking, set this value to 0. Currently, Backtrack is only supported for Aurora MySQL DB clusters. Default: 0 Constraints: If specified, this v */
  BacktrackWindow?: number;
  /** The number of days for which automated backups are retained. Specify a minimum value of 1. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Default: Uses existing setting Constraint */
  BackupRetentionPeriod?: number;
  /** Specifies whether to copy all tags from the restored DB cluster to snapshots of the restored DB cluster. The default is not to copy them. Valid for: Aurora DB clusters and Multi-AZ DB clusters */
  CopyTagsToSnapshot?: boolean;
  /** The database name for the restored DB cluster. Valid for: Aurora DB clusters and Multi-AZ DB clusters */
  DatabaseName?: string;
  /** The compute and memory capacity of the each DB instance in the Multi-AZ DB cluster, for example db.m6gd.xlarge. Not all DB instance classes are available in all Amazon Web Services Regions, or for all */
  DBClusterInstanceClass?: string;
  /** The name of the DB cluster parameter group to associate with this DB cluster. If this argument is omitted, the default DB cluster parameter group for the specified engine is used. Constraints: If supp */
  DBClusterParameterGroupName?: string;
  /** The name of the DB subnet group to use for the new DB cluster. Constraints: If supplied, must match the name of an existing DB subnet group. Example: mydbsubnetgroup Valid for: Aurora DB clusters and  */
  DBSubnetGroupName?: string;
  /** Specifies whether to enable deletion protection for the DB cluster. The database can't be deleted when deletion protection is enabled. By default, deletion protection isn't enabled. Valid for: Aurora  */
  DeletionProtection?: boolean;
  /** The Active Directory directory ID to restore the DB cluster in. The domain must be created prior to this operation. Currently, only MySQL, Microsoft SQL Server, Oracle, and PostgreSQL DB instances can */
  Domain?: string;
  /** The name of the IAM role to be used when making API calls to the Directory Service. Valid for: Aurora DB clusters only */
  DomainIAMRoleName?: string;
  /** The list of logs that the restored DB cluster is to export to Amazon CloudWatch Logs. The values in the list depend on the DB engine being used. RDS for MySQL Possible values are error, general, slowq */
  EnableCloudwatchLogsExports?: string[];
  /** Specifies whether to enable mapping of Amazon Web Services Identity and Access Management (IAM) accounts to database accounts. By default, mapping isn't enabled. For more information, see IAM Database */
  EnableIAMDatabaseAuthentication?: boolean;
  /** Specifies whether to turn on Performance Insights for the DB cluster. */
  EnablePerformanceInsights?: boolean;
  /** The life cycle type for this DB cluster. By default, this value is set to open-source-rds-extended-support, which enrolls your DB cluster into Amazon RDS Extended Support. At the end of standard suppo */
  EngineLifecycleSupport?: string;
  /** The DB engine mode of the DB cluster, either provisioned or serverless. For more information, see CreateDBCluster. Valid for: Aurora DB clusters only */
  EngineMode?: string;
  /** The version of the database engine to use for the new DB cluster. If you don't specify an engine version, the default version for the database engine in the Amazon Web Services Region is used. To list */
  EngineVersion?: string;
  /** The amount of Provisioned IOPS (input/output operations per second) to be initially allocated for each DB instance in the Multi-AZ DB cluster. For information about valid IOPS values, see Amazon RDS P */
  Iops?: number;
  /** The Amazon Web Services KMS key identifier to use when restoring an encrypted DB cluster from a DB snapshot or DB cluster snapshot. The Amazon Web Services KMS key identifier is the key ARN, key ID, a */
  KmsKeyId?: string;
  /** The interval, in seconds, between points when Enhanced Monitoring metrics are collected for the DB cluster. To turn off collecting Enhanced Monitoring metrics, specify 0. If MonitoringRoleArn is speci */
  MonitoringInterval?: number;
  /** The Amazon Resource Name (ARN) for the IAM role that permits RDS to send Enhanced Monitoring metrics to Amazon CloudWatch Logs. An example is arn:aws:iam:123456789012:role/emaccess. If MonitoringInter */
  MonitoringRoleArn?: string;
  /** The network type of the DB cluster. Valid Values: IPV4 DUAL The network type is determined by the DBSubnetGroup specified for the DB cluster. A DBSubnetGroup can support only the IPv4 protocol or the  */
  NetworkType?: string;
  /** The name of the option group to use for the restored DB cluster. DB clusters are associated with a default option group that can't be modified. */
  OptionGroupName?: string;
  /** The Amazon Web Services KMS key identifier for encryption of Performance Insights data. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key. If  */
  PerformanceInsightsKMSKeyId?: string;
  /** The number of days to retain Performance Insights data. Valid Values: 7 month * 31, where month is a number of months from 1-23. Examples: 93 (3 months * 31), 341 (11 months * 31), 589 (19 months * 31 */
  PerformanceInsightsRetentionPeriod?: number;
  /** The port number on which the new DB cluster accepts connections. Constraints: This value must be 1150-65535 Default: The same port as the original DB cluster. Valid for: Aurora DB clusters and Multi-A */
  Port?: number;
  /** The daily time range during which automated backups are created if automated backups are enabled, using the BackupRetentionPeriod parameter. The default is a 30-minute window selected at random from a */
  PreferredBackupWindow?: string;
  /** Specifies whether the DB cluster is publicly accessible. When the DB cluster is publicly accessible, its Domain Name System (DNS) endpoint resolves to the private IP address from within the DB cluster */
  PubliclyAccessible?: boolean;
  /** Reserved for future use. */
  RdsCustomClusterConfiguration?: RdsCustomClusterConfiguration;
  /** For DB clusters in serverless DB engine mode, the scaling properties of the DB cluster. Valid for: Aurora DB clusters only */
  ScalingConfiguration?: ScalingConfiguration;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  /** Specifies the storage type to be associated with the DB cluster. When specified for a Multi-AZ DB cluster, a value for the Iops parameter is required. Valid Values: aurora, aurora-iopt1 (Aurora DB clu */
  StorageType?: string;
  /** The tags to be assigned to the restored DB cluster. Valid for: Aurora DB clusters and Multi-AZ DB clusters */
  Tags?: Tag[];
  /** Tags to assign to resources associated with the DB cluster. Valid Values: cluster-auto-backup - The DB cluster's automated backup. */
  TagSpecifications?: TagSpecification[];
  /** A list of VPC security groups that the new DB cluster will belong to. Valid for: Aurora DB clusters and Multi-AZ DB clusters */
  VpcSecurityGroupIds?: string[];
}

export interface RestoreDBClusterToPointInTimeInput {
  /** The name of the new DB cluster to be created. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens First character must be a letter Can't end with a hyphen or contain two consecutive hy */
  DBClusterIdentifier: string;
  /** The target backtrack window, in seconds. To disable backtracking, set this value to 0. Default: 0 Constraints: If specified, this value must be set to a number from 0 to 259,200 (72 hours). Valid for: */
  BacktrackWindow?: number;
  /** The number of days for which automated backups are retained. Specify a minimum value of 1. Valid for Cluster Type: Aurora DB clusters and Multi-AZ DB clusters Default: Uses existing setting Constraint */
  BackupRetentionPeriod?: number;
  /** Specifies whether to copy all tags from the restored DB cluster to snapshots of the restored DB cluster. The default is not to copy them. Valid for: Aurora DB clusters and Multi-AZ DB clusters */
  CopyTagsToSnapshot?: boolean;
  /** The compute and memory capacity of the each DB instance in the Multi-AZ DB cluster, for example db.m6gd.xlarge. Not all DB instance classes are available in all Amazon Web Services Regions, or for all */
  DBClusterInstanceClass?: string;
  /** The name of the custom DB cluster parameter group to associate with this DB cluster. If the DBClusterParameterGroupName parameter is omitted, the default DB cluster parameter group for the specified e */
  DBClusterParameterGroupName?: string;
  /** The DB subnet group name to use for the new DB cluster. Constraints: If supplied, must match the name of an existing DBSubnetGroup. Example: mydbsubnetgroup Valid for: Aurora DB clusters and Multi-AZ  */
  DBSubnetGroupName?: string;
  /** Specifies whether to enable deletion protection for the DB cluster. The database can't be deleted when deletion protection is enabled. By default, deletion protection isn't enabled. Valid for: Aurora  */
  DeletionProtection?: boolean;
  /** The Active Directory directory ID to restore the DB cluster in. The domain must be created prior to this operation. For Amazon Aurora DB clusters, Amazon RDS can use Kerberos Authentication to authent */
  Domain?: string;
  /** The name of the IAM role to be used when making API calls to the Directory Service. Valid for: Aurora DB clusters only */
  DomainIAMRoleName?: string;
  /** The list of logs that the restored DB cluster is to export to CloudWatch Logs. The values in the list depend on the DB engine being used. RDS for MySQL Possible values are error, general, slowquery, a */
  EnableCloudwatchLogsExports?: string[];
  /** Specifies whether to enable mapping of Amazon Web Services Identity and Access Management (IAM) accounts to database accounts. By default, mapping isn't enabled. For more information, see IAM Database */
  EnableIAMDatabaseAuthentication?: boolean;
  /** Specifies whether to turn on Performance Insights for the DB cluster. */
  EnablePerformanceInsights?: boolean;
  /** The life cycle type for this DB cluster. By default, this value is set to open-source-rds-extended-support, which enrolls your DB cluster into Amazon RDS Extended Support. At the end of standard suppo */
  EngineLifecycleSupport?: string;
  /** The engine mode of the new cluster. Specify provisioned or serverless, depending on the type of the cluster you are creating. You can create an Aurora Serverless v1 clone from a provisioned cluster, o */
  EngineMode?: string;
  /** The amount of Provisioned IOPS (input/output operations per second) to be initially allocated for each DB instance in the Multi-AZ DB cluster. For information about valid IOPS values, see Amazon RDS P */
  Iops?: number;
  /** The Amazon Web Services KMS key identifier to use when restoring an encrypted DB cluster from an encrypted DB cluster. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or  */
  KmsKeyId?: string;
  /** The interval, in seconds, between points when Enhanced Monitoring metrics are collected for the DB cluster. To turn off collecting Enhanced Monitoring metrics, specify 0. If MonitoringRoleArn is speci */
  MonitoringInterval?: number;
  /** The Amazon Resource Name (ARN) for the IAM role that permits RDS to send Enhanced Monitoring metrics to Amazon CloudWatch Logs. An example is arn:aws:iam:123456789012:role/emaccess. If MonitoringInter */
  MonitoringRoleArn?: string;
  /** The network type of the DB cluster. Valid Values: IPV4 DUAL The network type is determined by the DBSubnetGroup specified for the DB cluster. A DBSubnetGroup can support only the IPv4 protocol or the  */
  NetworkType?: string;
  /** The name of the option group for the new DB cluster. DB clusters are associated with a default option group that can't be modified. */
  OptionGroupName?: string;
  /** The Amazon Web Services KMS key identifier for encryption of Performance Insights data. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key. If  */
  PerformanceInsightsKMSKeyId?: string;
  /** The number of days to retain Performance Insights data. Valid Values: 7 month * 31, where month is a number of months from 1-23. Examples: 93 (3 months * 31), 341 (11 months * 31), 589 (19 months * 31 */
  PerformanceInsightsRetentionPeriod?: number;
  /** The port number on which the new DB cluster accepts connections. Constraints: A value from 1150-65535. Default: The default port for the engine. Valid for: Aurora DB clusters and Multi-AZ DB clusters */
  Port?: number;
  /** The daily time range during which automated backups are created if automated backups are enabled, using the BackupRetentionPeriod parameter. The default is a 30-minute window selected at random from a */
  PreferredBackupWindow?: string;
  /** Specifies whether the DB cluster is publicly accessible. When the DB cluster is publicly accessible, its Domain Name System (DNS) endpoint resolves to the private IP address from within the DB cluster */
  PubliclyAccessible?: boolean;
  /** Reserved for future use. */
  RdsCustomClusterConfiguration?: RdsCustomClusterConfiguration;
  /** The date and time to restore the DB cluster to. Valid Values: Value must be a time in Universal Coordinated Time (UTC) format Constraints: Must be before the latest restorable time for the DB instance */
  RestoreToTime?: string;
  /** The type of restore to be performed. You can specify one of the following values: full-copy - The new DB cluster is restored as a full copy of the source DB cluster. copy-on-write - The new DB cluster */
  RestoreType?: string;
  /** For DB clusters in serverless DB engine mode, the scaling properties of the DB cluster. Valid for: Aurora DB clusters only */
  ScalingConfiguration?: ScalingConfiguration;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  /** The identifier of the source DB cluster from which to restore. Constraints: Must match the identifier of an existing DBCluster. Valid for: Aurora DB clusters and Multi-AZ DB clusters */
  SourceDBClusterIdentifier?: string;
  /** The resource ID of the source DB cluster from which to restore. */
  SourceDbClusterResourceId?: string;
  /** Specifies the storage type to be associated with the DB cluster. When specified for a Multi-AZ DB cluster, a value for the Iops parameter is required. Valid Values: aurora, aurora-iopt1 (Aurora DB clu */
  StorageType?: string;
  Tags?: Tag[];
  /** Tags to assign to resources associated with the DB cluster. Valid Values: cluster-auto-backup - The DB cluster's automated backup. */
  TagSpecifications?: TagSpecification[];
  /** Specifies whether to restore the DB cluster to the latest restorable backup time. By default, the DB cluster isn't restored to the latest restorable backup time. Constraints: Can't be specified if Res */
  UseLatestRestorableTime?: boolean;
  /** A list of VPC security groups that the new DB cluster belongs to. Valid for: Aurora DB clusters and Multi-AZ DB clusters */
  VpcSecurityGroupIds?: string[];
}

export interface RestoreDBInstanceFromDBSnapshotInput {
  /** The name of the DB instance to create from the DB snapshot. This parameter isn't case-sensitive. Constraints: Must contain from 1 to 63 numbers, letters, or hyphens. First character must be a letter.  */
  DBInstanceIdentifier: string;
  /** A list of additional storage volumes to create for the DB instance. You can create up to three additional storage volumes using the names rdsdbdata2, rdsdbdata3, and rdsdbdata4. Additional storage vol */
  AdditionalStorageVolumes?: AdditionalStorageVolume[];
  /** The amount of storage (in gibibytes) to allocate initially for the DB instance. Follow the allocation rules specified in CreateDBInstance. This setting isn't valid for RDS for SQL Server. Be sure to a */
  AllocatedStorage?: number;
  /** Specifies whether to automatically apply minor version upgrades to the DB instance during the maintenance window. If you restore an RDS Custom DB instance, you must disable this parameter. For more in */
  AutoMinorVersionUpgrade?: boolean;
  /** The Availability Zone (AZ) where the DB instance will be created. Default: A random, system-chosen Availability Zone. Constraint: You can't specify the AvailabilityZone parameter if the DB instance is */
  AvailabilityZone?: string;
  /** The number of days to retain automated backups. Setting this parameter to a positive number enables backups. Setting this parameter to 0 disables automated backups. Enabling and disabling backups can  */
  BackupRetentionPeriod?: number;
  /** Specifies where automated backups and manual snapshots are stored for the restored DB instance. Possible values are local (Dedicated Local Zone), outposts (Amazon Web Services Outposts), and region (A */
  BackupTarget?: string;
  /** The CA certificate identifier to use for the DB instance's server certificate. This setting doesn't apply to RDS Custom DB instances. For more information, see Using SSL/TLS to encrypt a connection to */
  CACertificateIdentifier?: string;
  /** Specifies whether to copy all tags from the restored DB instance to snapshots of the DB instance. In most cases, tags aren't copied by default. However, when you restore a DB instance from a DB snapsh */
  CopyTagsToSnapshot?: boolean;
  /** The instance profile associated with the underlying Amazon EC2 instance of an RDS Custom DB instance. The instance profile must meet the following requirements: The profile must exist in your account. */
  CustomIamInstanceProfile?: string;
  /** The identifier for the Multi-AZ DB cluster snapshot to restore from. For more information on Multi-AZ DB clusters, see Multi-AZ DB cluster deployments in the Amazon RDS User Guide. Constraints: Must m */
  DBClusterSnapshotIdentifier?: string;
  /** The compute and memory capacity of the Amazon RDS DB instance, for example db.m4.large. Not all DB instance classes are available in all Amazon Web Services Regions, or for all database engines. For t */
  DBInstanceClass?: string;
  /** The name of the database for the restored DB instance. This parameter only applies to RDS for Oracle and RDS for SQL Server DB instances. It doesn't apply to the other engines or to RDS Custom DB inst */
  DBName?: string;
  /** The name of the DB parameter group to associate with this DB instance. If you don't specify a value for DBParameterGroupName, then RDS uses the default DBParameterGroup for the specified DB engine. Th */
  DBParameterGroupName?: string;
  /** The identifier for the DB snapshot to restore from. Constraints: Must match the identifier of an existing DB snapshot. Can't be specified when DBClusterSnapshotIdentifier is specified. Must be specifi */
  DBSnapshotIdentifier?: string;
  /** The name of the DB subnet group to use for the new instance. Constraints: If supplied, must match the name of an existing DB subnet group. Example: mydbsubnetgroup */
  DBSubnetGroupName?: string;
  /** Specifies whether to enable a dedicated log volume (DLV) for the DB instance. */
  DedicatedLogVolume?: boolean;
  /** Specifies whether to enable deletion protection for the DB instance. The database can't be deleted when deletion protection is enabled. By default, deletion protection isn't enabled. For more informat */
  DeletionProtection?: boolean;
  /** The Active Directory directory ID to restore the DB instance in. The domain/ must be created prior to this operation. Currently, you can create only Db2, MySQL, Microsoft SQL Server, Oracle, and Postg */
  Domain?: string;
  /** The ARN for the Secrets Manager secret with the credentials for the user joining the domain. Constraints: Can't be longer than 64 characters. Example: arn:aws:secretsmanager:region:account-number:secr */
  DomainAuthSecretArn?: string;
  /** The IPv4 DNS IP addresses of your primary and secondary Active Directory domain controllers. Constraints: Two IP addresses must be provided. If there isn't a secondary domain controller, use the IP ad */
  DomainDnsIps?: string[];
  /** The fully qualified domain name (FQDN) of an Active Directory domain. Constraints: Can't be longer than 64 characters. Example: mymanagedADtest.mymanagedAD.mydomain */
  DomainFqdn?: string;
  /** The name of the IAM role to use when making API calls to the Directory Service. This setting doesn't apply to RDS Custom DB instances. */
  DomainIAMRoleName?: string;
  /** The Active Directory organizational unit for your DB instance to join. Constraints: Must be in the distinguished name format. Can't be longer than 64 characters. Example: OU=mymanagedADtestOU,DC=myman */
  DomainOu?: string;
  /** The list of logs for the restored DB instance to export to CloudWatch Logs. The values in the list depend on the DB engine. For more information, see Publishing Database Logs to Amazon CloudWatch Logs */
  EnableCloudwatchLogsExports?: string[];
  /** Specifies whether to enable a customer-owned IP address (CoIP) for an RDS on Outposts DB instance. A CoIP provides local or external connectivity to resources in your Outpost subnets through your on-p */
  EnableCustomerOwnedIp?: boolean;
  /** Specifies whether to enable mapping of Amazon Web Services Identity and Access Management (IAM) accounts to database accounts. By default, mapping is disabled. For more information about IAM database  */
  EnableIAMDatabaseAuthentication?: boolean;
  /** The database engine to use for the new instance. This setting doesn't apply to RDS Custom. Default: The same as source Constraint: Must be compatible with the engine of the source. For example, you ca */
  Engine?: string;
  /** The life cycle type for this DB instance. By default, this value is set to open-source-rds-extended-support, which enrolls your DB instance into Amazon RDS Extended Support. At the end of standard sup */
  EngineLifecycleSupport?: string;
  /** Specifies the amount of provisioned IOPS for the DB instance, expressed in I/O operations per second. If this parameter isn't specified, the IOPS value is taken from the backup. If this parameter is s */
  Iops?: number;
  /** License model information for the restored DB instance. License models for RDS for Db2 require additional configuration. The bring your own license (BYOL) model requires a custom parameter group and a */
  LicenseModel?: string;
  /** Specifies whether to manage the master user password with Amazon Web Services Secrets Manager in the restored DB instance. For more information, see Password management with Amazon Web Services Secret */
  ManageMasterUserPassword?: boolean;
  /** The Amazon Web Services KMS key identifier to encrypt a secret that is automatically generated and managed in Amazon Web Services Secrets Manager. This setting is valid only if the master user passwor */
  MasterUserSecretKmsKeyId?: string;
  /** Specifies whether the DB instance is a Multi-AZ deployment. This setting doesn't apply to RDS Custom. Constraint: You can't specify the AvailabilityZone parameter if the DB instance is a Multi-AZ depl */
  MultiAZ?: boolean;
  /** The network type of the DB instance. Valid Values: IPV4 DUAL The network type is determined by the DBSubnetGroup specified for the DB instance. A DBSubnetGroup can support only the IPv4 protocol or th */
  NetworkType?: string;
  /** The name of the option group to be used for the restored DB instance. Permanent options, such as the TDE option for Oracle Advanced Security TDE, can't be removed from an option group, and that option */
  OptionGroupName?: string;
  /** The port number on which the database accepts connections. Default: The same port as the original DB instance Constraints: Value must be 1150-65535 */
  Port?: number;
  /** The daily time range during which automated backups are created if automated backups are enabled, as determined by the BackupRetentionPeriod parameter. Changing this parameter doesn't result in an out */
  PreferredBackupWindow?: string;
  /** The number of CPU cores and the number of threads per core for the DB instance class of the DB instance. This setting doesn't apply to RDS Custom. */
  ProcessorFeatures?: ProcessorFeature[];
  /** Specifies whether the DB instance is publicly accessible. When the DB instance is publicly accessible, its Domain Name System (DNS) endpoint resolves to the private IP address from within the DB insta */
  PubliclyAccessible?: boolean;
  /** Specifies the storage throughput value for the DB instance. This setting doesn't apply to RDS Custom or Amazon Aurora. */
  StorageThroughput?: number;
  /** Specifies the storage type to be associated with the DB instance. Valid Values: gp2 | gp3 | io1 | io2 | standard If you specify io1, io2, or gp3, you must also include a value for the Iops parameter.  */
  StorageType?: string;
  Tags?: Tag[];
  /** Tags to assign to resources associated with the DB instance. Valid Values: auto-backup - The DB instance's automated backup. */
  TagSpecifications?: TagSpecification[];
  /** The ARN from the key store with which to associate the instance for TDE encryption. This setting doesn't apply to RDS Custom. */
  TdeCredentialArn?: string;
  /** The password for the given ARN from the key store in order to access the device. This setting doesn't apply to RDS Custom. */
  TdeCredentialPassword?: string;
  /** Specifies whether the DB instance class of the DB instance uses its default processor features. This setting doesn't apply to RDS Custom. */
  UseDefaultProcessorFeatures?: boolean;
  /** A list of EC2 VPC security groups to associate with this DB instance. Default: The default EC2 VPC security group for the DB subnet group's VPC. */
  VpcSecurityGroupIds?: string[];
}

export interface RestoreDBInstanceFromS3Input {
  /** The compute and memory capacity of the DB instance, for example db.m4.large. Not all DB instance classes are available in all Amazon Web Services Regions, or for all database engines. For the full lis */
  DBInstanceClass: string;
  /** The DB instance identifier. This parameter is stored as a lowercase string. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens. First character must be a letter. Can't end with a hyph */
  DBInstanceIdentifier: string;
  /** The name of the database engine to be used for this instance. Valid Values: mysql */
  Engine: string;
  /** The name of your Amazon S3 bucket that contains your database backup file. */
  S3BucketName: string;
  /** An Amazon Web Services Identity and Access Management (IAM) role with a trust policy and a permissions policy that allows Amazon RDS to access your Amazon S3 bucket. For information about this role, s */
  S3IngestionRoleArn: string;
  /** The name of the engine of your source database. Valid Values: mysql */
  SourceEngine: string;
  /** The version of the database that the backup files were created from. MySQL versions 5.6 and 5.7 are supported. Example: 5.6.40 */
  SourceEngineVersion: string;
  /** A list of additional storage volumes to modify or delete for the DB instance. You can modify or delete up to three additional storage volumes using the names rdsdbdata2, rdsdbdata3, and rdsdbdata4. Ad */
  AdditionalStorageVolumes?: AdditionalStorageVolume[];
  /** The amount of storage (in gibibytes) to allocate initially for the DB instance. Follow the allocation rules specified in CreateDBInstance. This setting isn't valid for RDS for SQL Server. Be sure to a */
  AllocatedStorage?: number;
  /** Specifies whether to automatically apply minor engine upgrades to the DB instance during the maintenance window. By default, minor engine upgrades are not applied automatically. For more information a */
  AutoMinorVersionUpgrade?: boolean;
  /** The Availability Zone that the DB instance is created in. For information about Amazon Web Services Regions and Availability Zones, see Regions and Availability Zones in the Amazon RDS User Guide. Def */
  AvailabilityZone?: string;
  /** The number of days for which automated backups are retained. Setting this parameter to a positive number enables backups. For more information, see CreateDBInstance. */
  BackupRetentionPeriod?: number;
  /** The CA certificate identifier to use for the DB instance's server certificate. This setting doesn't apply to RDS Custom DB instances. For more information, see Using SSL/TLS to encrypt a connection to */
  CACertificateIdentifier?: string;
  /** Specifies whether to copy all tags from the DB instance to snapshots of the DB instance. By default, tags are not copied. */
  CopyTagsToSnapshot?: boolean;
  /** Specifies the mode of Database Insights to enable for the DB instance. Aurora DB instances inherit this value from the DB cluster, so you can't change this value. */
  DatabaseInsightsMode?: 'standard' | 'advanced';
  /** The name of the database to create when the DB instance is created. Follow the naming rules specified in CreateDBInstance. */
  DBName?: string;
  /** The name of the DB parameter group to associate with this DB instance. If you do not specify a value for DBParameterGroupName, then the default DBParameterGroup for the specified DB engine is used. */
  DBParameterGroupName?: string;
  /** A list of DB security groups to associate with this DB instance. Default: The default DB security group for the database engine. */
  DBSecurityGroups?: string[];
  /** A DB subnet group to associate with this DB instance. Constraints: If supplied, must match the name of an existing DBSubnetGroup. Example: mydbsubnetgroup */
  DBSubnetGroupName?: string;
  /** Specifies whether to enable a dedicated log volume (DLV) for the DB instance. */
  DedicatedLogVolume?: boolean;
  /** Specifies whether to enable deletion protection for the DB instance. The database can't be deleted when deletion protection is enabled. By default, deletion protection isn't enabled. For more informat */
  DeletionProtection?: boolean;
  /** The list of logs that the restored DB instance is to export to CloudWatch Logs. The values in the list depend on the DB engine being used. For more information, see Publishing Database Logs to Amazon  */
  EnableCloudwatchLogsExports?: string[];
  /** Specifies whether to enable mapping of Amazon Web Services Identity and Access Management (IAM) accounts to database accounts. By default, mapping isn't enabled. For more information about IAM databas */
  EnableIAMDatabaseAuthentication?: boolean;
  /** Specifies whether to enable Performance Insights for the DB instance. For more information, see Using Amazon Performance Insights in the Amazon RDS User Guide. */
  EnablePerformanceInsights?: boolean;
  /** The life cycle type for this DB instance. By default, this value is set to open-source-rds-extended-support, which enrolls your DB instance into Amazon RDS Extended Support. At the end of standard sup */
  EngineLifecycleSupport?: string;
  /** The version number of the database engine to use. Choose the latest minor version of your database engine. For information about engine versions, see CreateDBInstance, or call DescribeDBEngineVersions */
  EngineVersion?: string;
  /** The amount of Provisioned IOPS (input/output operations per second) to allocate initially for the DB instance. For information about valid IOPS values, see Amazon RDS Provisioned IOPS storage in the A */
  Iops?: number;
  /** The Amazon Web Services KMS key identifier for an encrypted DB instance. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key. To use a KMS key i */
  KmsKeyId?: string;
  /** The license model for this DB instance. Use general-public-license. */
  LicenseModel?: string;
  /** Specifies whether to manage the master user password with Amazon Web Services Secrets Manager. For more information, see Password management with Amazon Web Services Secrets Manager in the Amazon RDS  */
  ManageMasterUserPassword?: boolean;
  /** The name for the master user. Constraints: Must be 1 to 16 letters or numbers. First character must be a letter. Can't be a reserved word for the chosen database engine. */
  MasterUsername?: string;
  /** The password for the master user. Constraints: Can't be specified if ManageMasterUserPassword is turned on. Can include any printable ASCII character except "/", """, or "@". For RDS for Oracle, can't */
  MasterUserPassword?: string;
  /** The Amazon Web Services KMS key identifier to encrypt a secret that is automatically generated and managed in Amazon Web Services Secrets Manager. This setting is valid only if the master user passwor */
  MasterUserSecretKmsKeyId?: string;
  /** The upper limit in gibibytes (GiB) to which Amazon RDS can automatically scale the storage of the DB instance. For more information about this setting, including limitations that apply to it, see Mana */
  MaxAllocatedStorage?: number;
  /** The interval, in seconds, between points when Enhanced Monitoring metrics are collected for the DB instance. To disable collecting Enhanced Monitoring metrics, specify 0. If MonitoringRoleArn is speci */
  MonitoringInterval?: number;
  /** The ARN for the IAM role that permits RDS to send enhanced monitoring metrics to Amazon CloudWatch Logs. For example, arn:aws:iam:123456789012:role/emaccess. For information on creating a monitoring r */
  MonitoringRoleArn?: string;
  /** Specifies whether the DB instance is a Multi-AZ deployment. If the DB instance is a Multi-AZ deployment, you can't set the AvailabilityZone parameter. */
  MultiAZ?: boolean;
  /** The network type of the DB instance. Valid Values: IPV4 DUAL The network type is determined by the DBSubnetGroup specified for the DB instance. A DBSubnetGroup can support only the IPv4 protocol or th */
  NetworkType?: string;
  /** The name of the option group to associate with this DB instance. If this argument is omitted, the default option group for the specified engine is used. */
  OptionGroupName?: string;
  /** The Amazon Web Services KMS key identifier for encryption of Performance Insights data. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key. If  */
  PerformanceInsightsKMSKeyId?: string;
  /** The number of days to retain Performance Insights data. The default is 7 days. The following values are valid: 7 month * 31, where month is a number of months from 1-23 731 For example, the following  */
  PerformanceInsightsRetentionPeriod?: number;
  /** The port number on which the database accepts connections. Type: Integer Valid Values: 1150-65535 Default: 3306 */
  Port?: number;
  /** The time range each day during which automated backups are created if automated backups are enabled. For more information, see Backup window in the Amazon RDS User Guide. Constraints: Must be in the f */
  PreferredBackupWindow?: string;
  /** The time range each week during which system maintenance can occur, in Universal Coordinated Time (UTC). For more information, see Amazon RDS Maintenance Window in the Amazon RDS User Guide. Constrain */
  PreferredMaintenanceWindow?: string;
  /** The number of CPU cores and the number of threads per core for the DB instance class of the DB instance. */
  ProcessorFeatures?: ProcessorFeature[];
  /** Specifies whether the DB instance is publicly accessible. When the DB instance is publicly accessible, its Domain Name System (DNS) endpoint resolves to the private IP address from within the DB insta */
  PubliclyAccessible?: boolean;
  /** The prefix of your Amazon S3 bucket. */
  S3Prefix?: string;
  /** Specifies whether the new DB instance is encrypted or not. */
  StorageEncrypted?: boolean;
  /** Specifies the storage throughput value for the DB instance. This setting doesn't apply to RDS Custom or Amazon Aurora. */
  StorageThroughput?: number;
  /** Specifies the storage type to be associated with the DB instance. Valid Values: gp2 | gp3 | io1 | io2 | standard If you specify io1, io2, or gp3, you must also include a value for the Iops parameter.  */
  StorageType?: string;
  /** A list of tags to associate with this DB instance. For more information, see Tagging Amazon RDS Resources in the Amazon RDS User Guide. */
  Tags?: Tag[];
  /** Tags to assign to resources associated with the DB instance. Valid Values: auto-backup - The DB instance's automated backup. */
  TagSpecifications?: TagSpecification[];
  /** Specifies whether the DB instance class of the DB instance uses its default processor features. */
  UseDefaultProcessorFeatures?: boolean;
  /** A list of VPC security groups to associate with this DB instance. */
  VpcSecurityGroupIds?: string[];
}

export interface RestoreDBInstanceToPointInTimeInput {
  /** The name of the new DB instance to create. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens. First character must be a letter. Can't end with a hyphen or contain two consecutive hyp */
  TargetDBInstanceIdentifier: string;
  /** A list of additional storage volumes to restore to the DB instance. You can restore up to three additional storage volumes using the names rdsdbdata2, rdsdbdata3, and rdsdbdata4. Additional storage vo */
  AdditionalStorageVolumes?: AdditionalStorageVolume[];
  /** The amount of storage (in gibibytes) to allocate initially for the DB instance. Follow the allocation rules specified in CreateDBInstance. This setting isn't valid for RDS for SQL Server. Be sure to a */
  AllocatedStorage?: number;
  /** Specifies whether minor version upgrades are applied automatically to the DB instance during the maintenance window. This setting doesn't apply to RDS Custom. For more information about automatic mino */
  AutoMinorVersionUpgrade?: boolean;
  /** The Availability Zone (AZ) where the DB instance will be created. Default: A random, system-chosen Availability Zone. Constraints: You can't specify the AvailabilityZone parameter if the DB instance i */
  AvailabilityZone?: string;
  /** The number of days to retain automated backups. Setting this parameter to a positive number enables backups. Setting this parameter to 0 disables automated backups. Enabling and disabling backups can  */
  BackupRetentionPeriod?: number;
  /** The location for storing automated backups and manual snapshots for the restored DB instance. Valid Values: local (Dedicated Local Zone) outposts (Amazon Web Services Outposts) region (Amazon Web Serv */
  BackupTarget?: string;
  /** The CA certificate identifier to use for the DB instance's server certificate. This setting doesn't apply to RDS Custom DB instances. For more information, see Using SSL/TLS to encrypt a connection to */
  CACertificateIdentifier?: string;
  /** Specifies whether to copy all tags from the restored DB instance to snapshots of the DB instance. By default, tags are not copied. */
  CopyTagsToSnapshot?: boolean;
  /** The instance profile associated with the underlying Amazon EC2 instance of an RDS Custom DB instance. The instance profile must meet the following requirements: The profile must exist in your account. */
  CustomIamInstanceProfile?: string;
  /** The compute and memory capacity of the Amazon RDS DB instance, for example db.m4.large. Not all DB instance classes are available in all Amazon Web Services Regions, or for all database engines. For t */
  DBInstanceClass?: string;
  /** The database name for the restored DB instance. This parameter doesn't apply to the following DB instances: RDS Custom RDS for Db2 RDS for MariaDB RDS for MySQL */
  DBName?: string;
  /** The name of the DB parameter group to associate with this DB instance. If you do not specify a value for DBParameterGroupName, then the default DBParameterGroup for the specified DB engine is used. Th */
  DBParameterGroupName?: string;
  /** The DB subnet group name to use for the new instance. Constraints: If supplied, must match the name of an existing DB subnet group. Example: mydbsubnetgroup */
  DBSubnetGroupName?: string;
  /** Specifies whether to enable a dedicated log volume (DLV) for the DB instance. */
  DedicatedLogVolume?: boolean;
  /** Specifies whether the DB instance has deletion protection enabled. The database can't be deleted when deletion protection is enabled. By default, deletion protection isn't enabled. For more informatio */
  DeletionProtection?: boolean;
  /** The Active Directory directory ID to restore the DB instance in. Create the domain before running this command. Currently, you can create only the MySQL, Microsoft SQL Server, Oracle, and PostgreSQL D */
  Domain?: string;
  /** The ARN for the Secrets Manager secret with the credentials for the user joining the domain. Constraints: Can't be longer than 64 characters. Example: arn:aws:secretsmanager:region:account-number:secr */
  DomainAuthSecretArn?: string;
  /** The IPv4 DNS IP addresses of your primary and secondary Active Directory domain controllers. Constraints: Two IP addresses must be provided. If there isn't a secondary domain controller, use the IP ad */
  DomainDnsIps?: string[];
  /** The fully qualified domain name (FQDN) of an Active Directory domain. Constraints: Can't be longer than 64 characters. Example: mymanagedADtest.mymanagedAD.mydomain */
  DomainFqdn?: string;
  /** The name of the IAM role to use when making API calls to the Directory Service. This setting doesn't apply to RDS Custom DB instances. */
  DomainIAMRoleName?: string;
  /** The Active Directory organizational unit for your DB instance to join. Constraints: Must be in the distinguished name format. Can't be longer than 64 characters. Example: OU=mymanagedADtestOU,DC=myman */
  DomainOu?: string;
  /** The list of logs that the restored DB instance is to export to CloudWatch Logs. The values in the list depend on the DB engine being used. For more information, see Publishing Database Logs to Amazon  */
  EnableCloudwatchLogsExports?: string[];
  /** Specifies whether to enable a customer-owned IP address (CoIP) for an RDS on Outposts DB instance. A CoIP provides local or external connectivity to resources in your Outpost subnets through your on-p */
  EnableCustomerOwnedIp?: boolean;
  /** Specifies whether to enable mapping of Amazon Web Services Identity and Access Management (IAM) accounts to database accounts. By default, mapping isn't enabled. This setting doesn't apply to RDS Cust */
  EnableIAMDatabaseAuthentication?: boolean;
  /** The database engine to use for the new instance. This setting doesn't apply to RDS Custom. Valid Values: db2-ae db2-se mariadb mysql oracle-ee oracle-ee-cdb oracle-se2 oracle-se2-cdb postgres sqlserve */
  Engine?: string;
  /** The life cycle type for this DB instance. By default, this value is set to open-source-rds-extended-support, which enrolls your DB instance into Amazon RDS Extended Support. At the end of standard sup */
  EngineLifecycleSupport?: string;
  /** The amount of Provisioned IOPS (input/output operations per second) to initially allocate for the DB instance. This setting doesn't apply to SQL Server. Constraints: Must be an integer greater than 10 */
  Iops?: number;
  /** The license model information for the restored DB instance. License models for RDS for Db2 require additional configuration. The bring your own license (BYOL) model requires a custom parameter group a */
  LicenseModel?: string;
  /** Specifies whether to manage the master user password with Amazon Web Services Secrets Manager in the restored DB instance. For more information, see Password management with Amazon Web Services Secret */
  ManageMasterUserPassword?: boolean;
  /** The Amazon Web Services KMS key identifier to encrypt a secret that is automatically generated and managed in Amazon Web Services Secrets Manager. This setting is valid only if the master user passwor */
  MasterUserSecretKmsKeyId?: string;
  /** The upper limit in gibibytes (GiB) to which Amazon RDS can automatically scale the storage of the DB instance. For more information about this setting, including limitations that apply to it, see Mana */
  MaxAllocatedStorage?: number;
  /** Secifies whether the DB instance is a Multi-AZ deployment. This setting doesn't apply to RDS Custom. Constraints: You can't specify the AvailabilityZone parameter if the DB instance is a Multi-AZ depl */
  MultiAZ?: boolean;
  /** The network type of the DB instance. The network type is determined by the DBSubnetGroup specified for the DB instance. A DBSubnetGroup can support only the IPv4 protocol or the IPv4 and the IPv6 prot */
  NetworkType?: string;
  /** The name of the option group to use for the restored DB instance. Permanent options, such as the TDE option for Oracle Advanced Security TDE, can't be removed from an option group, and that option gro */
  OptionGroupName?: string;
  /** The port number on which the database accepts connections. Default: The same port as the original DB instance. Constraints: The value must be 1150-65535. */
  Port?: number;
  /** The daily time range during which automated backups are created if automated backups are enabled, as determined by the BackupRetentionPeriod parameter. Changing this parameter doesn't result in an out */
  PreferredBackupWindow?: string;
  /** The number of CPU cores and the number of threads per core for the DB instance class of the DB instance. This setting doesn't apply to RDS Custom. */
  ProcessorFeatures?: ProcessorFeature[];
  /** Specifies whether the DB instance is publicly accessible. When the DB cluster is publicly accessible, its Domain Name System (DNS) endpoint resolves to the private IP address from within the DB cluste */
  PubliclyAccessible?: boolean;
  /** The date and time to restore from. Constraints: Must be a time in Universal Coordinated Time (UTC) format. Must be before the latest restorable time for the DB instance. Can't be specified if the UseL */
  RestoreTime?: string;
  /** The Amazon Resource Name (ARN) of the replicated automated backups from which to restore, for example, arn:aws:rds:us-east-1:123456789012:auto-backup:ab-L2IJCEXJP7XQ7HOJ4SIEXAMPLE. This setting doesn' */
  SourceDBInstanceAutomatedBackupsArn?: string;
  /** The identifier of the source DB instance from which to restore. Constraints: Must match the identifier of an existing DB instance. */
  SourceDBInstanceIdentifier?: string;
  /** The resource ID of the source DB instance from which to restore. */
  SourceDbiResourceId?: string;
  /** The storage throughput value for the DB instance. This setting doesn't apply to RDS Custom or Amazon Aurora. */
  StorageThroughput?: number;
  /** The storage type to associate with the DB instance. Valid Values: gp2 | gp3 | io1 | io2 | standard Default: io1, if the Iops parameter is specified. Otherwise, gp3. Constraints: If you specify io1, io */
  StorageType?: string;
  Tags?: Tag[];
  /** Tags to assign to resources associated with the DB instance. Valid Values: auto-backup - The DB instance's automated backup. */
  TagSpecifications?: TagSpecification[];
  /** The ARN from the key store with which to associate the instance for TDE encryption. This setting doesn't apply to RDS Custom. */
  TdeCredentialArn?: string;
  /** The password for the given ARN from the key store in order to access the device. This setting doesn't apply to RDS Custom. */
  TdeCredentialPassword?: string;
  /** Specifies whether the DB instance class of the DB instance uses its default processor features. This setting doesn't apply to RDS Custom. */
  UseDefaultProcessorFeatures?: boolean;
  /** Specifies whether the DB instance is restored from the latest backup time. By default, the DB instance isn't restored from the latest backup time. Constraints: Can't be specified if the RestoreTime pa */
  UseLatestRestorableTime?: boolean;
  /** A list of EC2 VPC security groups to associate with this DB instance. Default: The default EC2 VPC security group for the DB subnet group's VPC. */
  VpcSecurityGroupIds?: string[];
}

export interface RevokeDBSecurityGroupIngressInput {
  /** The name of the DB security group to revoke ingress from. */
  DBSecurityGroupName: string;
  /** The IP range to revoke access from. Must be a valid CIDR range. If CIDRIP is specified, EC2SecurityGroupName, EC2SecurityGroupId and EC2SecurityGroupOwnerId can't be provided. */
  CIDRIP?: string;
  /** The id of the EC2 security group to revoke access from. For VPC DB security groups, EC2SecurityGroupId must be provided. Otherwise, EC2SecurityGroupOwnerId and either EC2SecurityGroupName or EC2Securi */
  EC2SecurityGroupId?: string;
  /** The name of the EC2 security group to revoke access from. For VPC DB security groups, EC2SecurityGroupId must be provided. Otherwise, EC2SecurityGroupOwnerId and either EC2SecurityGroupName or EC2Secu */
  EC2SecurityGroupName?: string;
  /** The Amazon Web Services account number of the owner of the EC2 security group specified in the EC2SecurityGroupName parameter. The Amazon Web Services access key ID isn't an acceptable value. For VPC  */
  EC2SecurityGroupOwnerId?: string;
}

export interface StartActivityStreamInput {
  /** The Amazon Web Services KMS key identifier for encrypting messages in the database activity stream. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the  */
  KmsKeyId: string;
  /** Specifies the mode of the database activity stream. Database events such as a change or access generate an activity stream event. The database session can handle these events either synchronously or a */
  Mode: 'sync' | 'async';
  /** The Amazon Resource Name (ARN) of the DB cluster, for example, arn:aws:rds:us-east-1:12345667890:cluster:das-cluster. */
  ResourceArn: string;
  /** Specifies whether or not the database activity stream is to start as soon as possible, regardless of the maintenance window for the database. */
  ApplyImmediately?: boolean;
  /** Specifies whether the database activity stream includes engine-native audit fields. This option applies to an Oracle or Microsoft SQL Server DB instance. By default, no engine-native audit fields are  */
  EngineNativeAuditFieldsIncluded?: boolean;
}

export interface StartDBClusterInput {
  /** The DB cluster identifier of the Amazon Aurora DB cluster to be started. This parameter is stored as a lowercase string. */
  DBClusterIdentifier: string;
}

export interface StartDBInstanceInput {
  /** The user-supplied instance identifier. */
  DBInstanceIdentifier: string;
}

export interface StartDBInstanceAutomatedBackupsReplicationInput {
  /** The Amazon Resource Name (ARN) of the source DB instance for the replicated automated backups, for example, arn:aws:rds:us-west-2:123456789012:db:mydatabase. */
  SourceDBInstanceArn: string;
  /** The retention period for the replicated automated backups. */
  BackupRetentionPeriod?: number;
  /** The Amazon Web Services KMS key identifier for encryption of the replicated automated backups. The KMS key ID is the Amazon Resource Name (ARN) for the KMS encryption key in the destination Amazon Web */
  KmsKeyId?: string;
  /** In an Amazon Web Services GovCloud (US) Region, an URL that contains a Signature Version 4 signed request for the StartDBInstanceAutomatedBackupsReplication operation to call in the Amazon Web Service */
  PreSignedUrl?: string;
  /** A list of tags to associate with the replicated automated backups. */
  Tags?: Tag[];
}

export interface StartExportTaskInput {
  /** A unique identifier for the export task. This ID isn't an identifier for the Amazon S3 bucket where the data is to be exported. */
  ExportTaskIdentifier: string;
  /** The name of the IAM role to use for writing to the Amazon S3 bucket when exporting a snapshot or cluster. In the IAM policy attached to your IAM role, include the following required actions to allow t */
  IamRoleArn: string;
  /** The ID of the Amazon Web Services KMS key to use to encrypt the data exported to Amazon S3. The Amazon Web Services KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key. */
  KmsKeyId: string;
  /** The name of the Amazon S3 bucket to export the snapshot or cluster data to. */
  S3BucketName: string;
  /** The Amazon Resource Name (ARN) of the snapshot or cluster to export to Amazon S3. */
  SourceArn: string;
  /** The data to be exported from the snapshot or cluster. If this parameter isn't provided, all of the data is exported. Valid Values: database - Export all the data from a specified database. database.ta */
  ExportOnly?: string[];
  /** The Amazon S3 bucket prefix to use as the file name and path of the exported data. */
  S3Prefix?: string;
}

export interface StopActivityStreamInput {
  /** The Amazon Resource Name (ARN) of the DB cluster for the database activity stream. For example, arn:aws:rds:us-east-1:12345667890:cluster:das-cluster. */
  ResourceArn: string;
  /** Specifies whether or not the database activity stream is to stop as soon as possible, regardless of the maintenance window for the database. */
  ApplyImmediately?: boolean;
}

export interface StopDBClusterInput {
  /** The DB cluster identifier of the Amazon Aurora DB cluster to be stopped. This parameter is stored as a lowercase string. */
  DBClusterIdentifier: string;
}

export interface StopDBInstanceInput {
  /** The user-supplied instance identifier. */
  DBInstanceIdentifier: string;
  /** The user-supplied instance identifier of the DB Snapshot created immediately before the DB instance is stopped. */
  DBSnapshotIdentifier?: string;
}

export interface StopDBInstanceAutomatedBackupsReplicationInput {
  /** The Amazon Resource Name (ARN) of the source DB instance for which to stop replicating automate backups, for example, arn:aws:rds:us-west-2:123456789012:db:mydatabase. */
  SourceDBInstanceArn: string;
}

export interface SwitchoverBlueGreenDeploymentInput {
  /** The resource ID of the blue/green deployment. Constraints: Must match an existing blue/green deployment resource ID. */
  BlueGreenDeploymentIdentifier: string;
  /** The amount of time, in seconds, for the switchover to complete. Default: 300 If the switchover takes longer than the specified duration, then any changes are rolled back, and no changes are made to th */
  SwitchoverTimeout?: number;
}

export interface SwitchoverGlobalClusterInput {
  /** The identifier of the global database cluster to switch over. This parameter isn't case-sensitive. Constraints: Must match the identifier of an existing global database cluster (Aurora global database */
  GlobalClusterIdentifier: string;
  /** The identifier of the secondary Aurora DB cluster to promote to the new primary for the global database cluster. Use the Amazon Resource Name (ARN) for the identifier so that Aurora can locate the clu */
  TargetDbClusterIdentifier: string;
}

export interface SwitchoverReadReplicaInput {
  /** The DB instance identifier of the current standby database. This value is stored as a lowercase string. Constraints: Must match the identiﬁer of an existing Oracle read replica DB instance. */
  DBInstanceIdentifier: string;
}

/** RDS service binding for Step Functions SDK integrations. */
export class RDS {
  constructor() {}

  addRoleToDBCluster<T>(params: AddRoleToDBClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  addRoleToDBInstance<T>(params: AddRoleToDBInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  addSourceIdentifierToSubscription<T>(params: AddSourceIdentifierToSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  addTagsToResource<T>(params: AddTagsToResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  applyPendingMaintenanceAction<T>(params: ApplyPendingMaintenanceActionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  authorizeDBSecurityGroupIngress<T>(params: AuthorizeDBSecurityGroupIngressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  backtrackDBCluster<T>(params: BacktrackDBClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelExportTask<T>(params: CancelExportTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  copyDBClusterParameterGroup<T>(params: CopyDBClusterParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  copyDBClusterSnapshot<T>(params: CopyDBClusterSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  copyDBParameterGroup<T>(params: CopyDBParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  copyDBSnapshot<T>(params: CopyDBSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  copyOptionGroup<T>(params: CopyOptionGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createBlueGreenDeployment<T>(params: CreateBlueGreenDeploymentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCustomDBEngineVersion<T>(params: CreateCustomDBEngineVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDBCluster<T>(params: CreateDBClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDBClusterEndpoint<T>(params: CreateDBClusterEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDBClusterParameterGroup<T>(params: CreateDBClusterParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDBClusterSnapshot<T>(params: CreateDBClusterSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDBInstance<T>(params: CreateDBInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDBInstanceReadReplica<T>(params: CreateDBInstanceReadReplicaInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDBParameterGroup<T>(params: CreateDBParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDBProxy<T>(params: CreateDBProxyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDBProxyEndpoint<T>(params: CreateDBProxyEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDBSecurityGroup<T>(params: CreateDBSecurityGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDBShardGroup<T>(params: CreateDBShardGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDBSnapshot<T>(params: CreateDBSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDBSubnetGroup<T>(params: CreateDBSubnetGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createEventSubscription<T>(params: CreateEventSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createGlobalCluster<T>(params: CreateGlobalClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createIntegration<T>(params: CreateIntegrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createOptionGroup<T>(params: CreateOptionGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTenantDatabase<T>(params: CreateTenantDatabaseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteBlueGreenDeployment<T>(params: DeleteBlueGreenDeploymentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCustomDBEngineVersion<T>(params: DeleteCustomDBEngineVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDBCluster<T>(params: DeleteDBClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDBClusterAutomatedBackup<T>(params: DeleteDBClusterAutomatedBackupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDBClusterEndpoint<T>(params: DeleteDBClusterEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDBClusterParameterGroup<T>(params: DeleteDBClusterParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDBClusterSnapshot<T>(params: DeleteDBClusterSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDBInstance<T>(params: DeleteDBInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDBInstanceAutomatedBackup<T>(params: DeleteDBInstanceAutomatedBackupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDBParameterGroup<T>(params: DeleteDBParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDBProxy<T>(params: DeleteDBProxyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDBProxyEndpoint<T>(params: DeleteDBProxyEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDBSecurityGroup<T>(params: DeleteDBSecurityGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDBShardGroup<T>(params: DeleteDBShardGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDBSnapshot<T>(params: DeleteDBSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDBSubnetGroup<T>(params: DeleteDBSubnetGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteEventSubscription<T>(params: DeleteEventSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteGlobalCluster<T>(params: DeleteGlobalClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteIntegration<T>(params: DeleteIntegrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteOptionGroup<T>(params: DeleteOptionGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTenantDatabase<T>(params: DeleteTenantDatabaseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deregisterDBProxyTargets<T>(params: DeregisterDBProxyTargetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAccountAttributes<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeBlueGreenDeployments<T>(params: DescribeBlueGreenDeploymentsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCertificates<T>(params: DescribeCertificatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBClusterAutomatedBackups<T>(params: DescribeDBClusterAutomatedBackupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBClusterBacktracks<T>(params: DescribeDBClusterBacktracksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBClusterEndpoints<T>(params: DescribeDBClusterEndpointsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBClusterParameterGroups<T>(params: DescribeDBClusterParameterGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBClusterParameters<T>(params: DescribeDBClusterParametersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBClusters<T>(params: DescribeDBClustersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBClusterSnapshotAttributes<T>(params: DescribeDBClusterSnapshotAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBClusterSnapshots<T>(params: DescribeDBClusterSnapshotsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBEngineVersions<T>(params: DescribeDBEngineVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBInstanceAutomatedBackups<T>(params: DescribeDBInstanceAutomatedBackupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBInstances<T>(params: DescribeDBInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBLogFiles<T>(params: DescribeDBLogFilesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBMajorEngineVersions<T>(params: DescribeDBMajorEngineVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBParameterGroups<T>(params: DescribeDBParameterGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBParameters<T>(params: DescribeDBParametersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBProxies<T>(params: DescribeDBProxiesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBProxyEndpoints<T>(params: DescribeDBProxyEndpointsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBProxyTargetGroups<T>(params: DescribeDBProxyTargetGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBProxyTargets<T>(params: DescribeDBProxyTargetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBRecommendations<T>(params: DescribeDBRecommendationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBSecurityGroups<T>(params: DescribeDBSecurityGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBShardGroups<T>(params: DescribeDBShardGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBSnapshotAttributes<T>(params: DescribeDBSnapshotAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBSnapshots<T>(params: DescribeDBSnapshotsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBSnapshotTenantDatabases<T>(params: DescribeDBSnapshotTenantDatabasesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBSubnetGroups<T>(params: DescribeDBSubnetGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEngineDefaultClusterParameters<T>(params: DescribeEngineDefaultClusterParametersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEngineDefaultParameters<T>(params: DescribeEngineDefaultParametersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEventCategories<T>(params: DescribeEventCategoriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEvents<T>(params: DescribeEventsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEventSubscriptions<T>(params: DescribeEventSubscriptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeExportTasks<T>(params: DescribeExportTasksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeGlobalClusters<T>(params: DescribeGlobalClustersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeIntegrations<T>(params: DescribeIntegrationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeOptionGroupOptions<T>(params: DescribeOptionGroupOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeOptionGroups<T>(params: DescribeOptionGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeOrderableDBInstanceOptions<T>(params: DescribeOrderableDBInstanceOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePendingMaintenanceActions<T>(params: DescribePendingMaintenanceActionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReservedDBInstances<T>(params: DescribeReservedDBInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReservedDBInstancesOfferings<T>(params: DescribeReservedDBInstancesOfferingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSourceRegions<T>(params: DescribeSourceRegionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTenantDatabases<T>(params: DescribeTenantDatabasesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeValidDBInstanceModifications<T>(params: DescribeValidDBInstanceModificationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableHttpEndpoint<T>(params: DisableHttpEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  downloadDBLogFilePortion<T>(params: DownloadDBLogFilePortionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableHttpEndpoint<T>(params: EnableHttpEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  failoverDBCluster<T>(params: FailoverDBClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  failoverGlobalCluster<T>(params: FailoverGlobalClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyActivityStream<T>(params: ModifyActivityStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyCertificates<T>(params: ModifyCertificatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyCurrentDBClusterCapacity<T>(params: ModifyCurrentDBClusterCapacityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyCustomDBEngineVersion<T>(params: ModifyCustomDBEngineVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyDBCluster<T>(params: ModifyDBClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyDBClusterEndpoint<T>(params: ModifyDBClusterEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyDBClusterParameterGroup<T>(params: ModifyDBClusterParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyDBClusterSnapshotAttribute<T>(params: ModifyDBClusterSnapshotAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyDBInstance<T>(params: ModifyDBInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyDBParameterGroup<T>(params: ModifyDBParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyDBProxy<T>(params: ModifyDBProxyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyDBProxyEndpoint<T>(params: ModifyDBProxyEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyDBProxyTargetGroup<T>(params: ModifyDBProxyTargetGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyDBRecommendation<T>(params: ModifyDBRecommendationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyDBShardGroup<T>(params: ModifyDBShardGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyDBSnapshot<T>(params: ModifyDBSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyDBSnapshotAttribute<T>(params: ModifyDBSnapshotAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyDBSubnetGroup<T>(params: ModifyDBSubnetGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyEventSubscription<T>(params: ModifyEventSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyGlobalCluster<T>(params: ModifyGlobalClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyIntegration<T>(params: ModifyIntegrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyOptionGroup<T>(params: ModifyOptionGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyTenantDatabase<T>(params: ModifyTenantDatabaseInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  promoteReadReplica<T>(params: PromoteReadReplicaInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  promoteReadReplicaDBCluster<T>(params: PromoteReadReplicaDBClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  purchaseReservedDBInstancesOffering<T>(params: PurchaseReservedDBInstancesOfferingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rebootDBCluster<T>(params: RebootDBClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rebootDBInstance<T>(params: RebootDBInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rebootDBShardGroup<T>(params: RebootDBShardGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  registerDBProxyTargets<T>(params: RegisterDBProxyTargetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeFromGlobalCluster<T>(params: RemoveFromGlobalClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeRoleFromDBCluster<T>(params: RemoveRoleFromDBClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeRoleFromDBInstance<T>(params: RemoveRoleFromDBInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeSourceIdentifierFromSubscription<T>(params: RemoveSourceIdentifierFromSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeTagsFromResource<T>(params: RemoveTagsFromResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  resetDBClusterParameterGroup<T>(params: ResetDBClusterParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  resetDBParameterGroup<T>(params: ResetDBParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  restoreDBClusterFromS3<T>(params: RestoreDBClusterFromS3Input): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  restoreDBClusterFromSnapshot<T>(params: RestoreDBClusterFromSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  restoreDBClusterToPointInTime<T>(params: RestoreDBClusterToPointInTimeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  restoreDBInstanceFromDBSnapshot<T>(params: RestoreDBInstanceFromDBSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  restoreDBInstanceFromS3<T>(params: RestoreDBInstanceFromS3Input): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  restoreDBInstanceToPointInTime<T>(params: RestoreDBInstanceToPointInTimeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  revokeDBSecurityGroupIngress<T>(params: RevokeDBSecurityGroupIngressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startActivityStream<T>(params: StartActivityStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startDBCluster<T>(params: StartDBClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startDBInstance<T>(params: StartDBInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startDBInstanceAutomatedBackupsReplication<T>(params: StartDBInstanceAutomatedBackupsReplicationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startExportTask<T>(params: StartExportTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopActivityStream<T>(params: StopActivityStreamInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopDBCluster<T>(params: StopDBClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopDBInstance<T>(params: StopDBInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopDBInstanceAutomatedBackupsReplication<T>(params: StopDBInstanceAutomatedBackupsReplicationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  switchoverBlueGreenDeployment<T>(params: SwitchoverBlueGreenDeploymentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  switchoverGlobalCluster<T>(params: SwitchoverGlobalClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  switchoverReadReplica<T>(params: SwitchoverReadReplicaInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
