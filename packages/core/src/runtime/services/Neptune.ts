// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface Tag {
  /** A key is the required name of the tag. The string value can be from 1 to 128 Unicode characters in length and can't be prefixed with aws: or rds:. The string can only contain the set of Unicode letter */
  Key?: string;
  /** A value is the optional value of the tag. The string value can be from 1 to 256 Unicode characters in length and can't be prefixed with aws: or rds:. The string can only contain the set of Unicode let */
  Value?: string;
}

export interface ServerlessV2ScalingConfiguration {
  /** The minimum number of Neptune capacity units (NCUs) for a DB instance in a Neptune Serverless cluster. You can specify NCU values in half-step increments, such as 8, 8.5, 9, and so on. */
  MinCapacity?: number;
  /** The maximum number of Neptune capacity units (NCUs) for a DB instance in a Neptune Serverless cluster. You can specify NCU values in half-step increments, such as 40, 40.5, 41, and so on. */
  MaxCapacity?: number;
}

export interface Filter {
  /** This parameter is not currently supported. */
  Name: string;
  /** This parameter is not currently supported. */
  Values: any[];
}

export interface CloudwatchLogsExportConfiguration {
  /** The list of log types to enable. */
  EnableLogTypes?: string[];
  /** The list of log types to disable. */
  DisableLogTypes?: string[];
}

export interface Parameter {
  /** Specifies the name of the parameter. */
  ParameterName?: string;
  /** Specifies the value of the parameter. */
  ParameterValue?: string;
  /** Provides a description of the parameter. */
  Description?: string;
  /** Indicates the source of the parameter value. */
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
}

export interface AddRoleToDBClusterInput {
  /** The name of the DB cluster to associate the IAM role with. */
  DBClusterIdentifier: string;
  /** The Amazon Resource Name (ARN) of the IAM role to associate with the Neptune DB cluster, for example arn:aws:iam::123456789012:role/NeptuneAccessRole. */
  RoleArn: string;
  /** The name of the feature for the Neptune DB cluster that the IAM role is to be associated with. For the list of supported feature names, see DBEngineVersion. */
  FeatureName?: string;
}

export interface AddSourceIdentifierToSubscriptionInput {
  /** The identifier of the event source to be added. Constraints: If the source type is a DB instance, then a DBInstanceIdentifier must be supplied. If the source type is a DB security group, a DBSecurityG */
  SourceIdentifier: string;
  /** The name of the event notification subscription you want to add a source identifier to. */
  SubscriptionName: string;
}

export interface AddTagsToResourceInput {
  /** The Amazon Neptune resource that the tags are added to. This value is an Amazon Resource Name (ARN). For information about creating an ARN, see Constructing an Amazon Resource Name (ARN). */
  ResourceName: string;
  /** The tags to be assigned to the Amazon Neptune resource. */
  Tags: Tag[];
}

export interface ApplyPendingMaintenanceActionInput {
  /** The pending maintenance action to apply to this resource. Valid values: system-update, db-upgrade */
  ApplyAction: string;
  /** A value that specifies the type of opt-in request, or undoes an opt-in request. An opt-in request of type immediate can't be undone. Valid values: immediate - Apply the maintenance action immediately. */
  OptInType: string;
  /** The Amazon Resource Name (ARN) of the resource that the pending maintenance action applies to. For information about creating an ARN, see Constructing an Amazon Resource Name (ARN). */
  ResourceIdentifier: string;
}

export interface CopyDBClusterParameterGroupInput {
  /** The identifier or Amazon Resource Name (ARN) for the source DB cluster parameter group. For information about creating an ARN, see Constructing an Amazon Resource Name (ARN). Constraints: Must specify */
  SourceDBClusterParameterGroupIdentifier: string;
  /** A description for the copied DB cluster parameter group. */
  TargetDBClusterParameterGroupDescription: string;
  /** The identifier for the copied DB cluster parameter group. Constraints: Cannot be null, empty, or blank Must contain from 1 to 255 letters, numbers, or hyphens First character must be a letter Cannot e */
  TargetDBClusterParameterGroupIdentifier: string;
  /** The tags to be assigned to the copied DB cluster parameter group. */
  Tags?: Tag[];
}

export interface CopyDBClusterSnapshotInput {
  /** The identifier of the DB cluster snapshot to copy. This parameter is not case-sensitive. If the source DB cluster snapshot is in a different region or owned by another account, specify the snapshot AR */
  SourceDBClusterSnapshotIdentifier: string;
  /** The identifier of the new DB cluster snapshot to create from the source DB cluster snapshot. This parameter is not case-sensitive. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens.  */
  TargetDBClusterSnapshotIdentifier: string;
  /** True to copy all tags from the source DB cluster snapshot to the target DB cluster snapshot, and otherwise false. The default is false. */
  CopyTags?: boolean;
  /** The Amazon Amazon KMS key ID for an encrypted DB cluster snapshot. The KMS key ID is the Amazon Resource Name (ARN), KMS key identifier, or the KMS key alias for the KMS encryption key. If you copy an */
  KmsKeyId?: string;
  /** Not currently supported. */
  PreSignedUrl?: string;
  /** The tags to assign to the new DB cluster snapshot copy. */
  Tags?: Tag[];
}

export interface CopyDBParameterGroupInput {
  /** The identifier or ARN for the source DB parameter group. For information about creating an ARN, see Constructing an Amazon Resource Name (ARN). Constraints: Must specify a valid DB parameter group. Mu */
  SourceDBParameterGroupIdentifier: string;
  /** A description for the copied DB parameter group. */
  TargetDBParameterGroupDescription: string;
  /** The identifier for the copied DB parameter group. Constraints: Cannot be null, empty, or blank. Must contain from 1 to 255 letters, numbers, or hyphens. First character must be a letter. Cannot end wi */
  TargetDBParameterGroupIdentifier: string;
  /** The tags to be assigned to the copied DB parameter group. */
  Tags?: Tag[];
}

export interface CreateDBClusterInput {
  /** The DB cluster identifier. This parameter is stored as a lowercase string. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens. First character must be a letter. Cannot end with a hyph */
  DBClusterIdentifier: string;
  /** The name of the database engine to be used for this DB cluster. Valid Values: neptune */
  Engine: string;
  /** A list of EC2 Availability Zones that instances in the DB cluster can be created in. */
  AvailabilityZones?: string[];
  /** The number of days for which automated backups are retained. You must specify a minimum value of 1. Default: 1 Constraints: Must be a value from 1 to 35 */
  BackupRetentionPeriod?: number;
  /** (Not supported by Neptune) */
  CharacterSetName?: string;
  /** If set to true, tags are copied to any snapshot of the DB cluster that is created. */
  CopyTagsToSnapshot?: boolean;
  /** The name for your database of up to 64 alpha-numeric characters. If you do not provide a name, Amazon Neptune will not create a database in the DB cluster you are creating. */
  DatabaseName?: string;
  /** The name of the DB cluster parameter group to associate with this DB cluster. If this argument is omitted, the default is used. Constraints: If supplied, must match the name of an existing DBClusterPa */
  DBClusterParameterGroupName?: string;
  /** A DB subnet group to associate with this DB cluster. Constraints: Must match the name of an existing DBSubnetGroup. Must not be default. Example: mySubnetgroup */
  DBSubnetGroupName?: string;
  /** A value that indicates whether the DB cluster has deletion protection enabled. The database can't be deleted when deletion protection is enabled. By default, deletion protection is enabled. */
  DeletionProtection?: boolean;
  /** A list of the log types that this DB cluster should export to CloudWatch Logs. Valid log types are: audit (to publish audit logs) and slowquery (to publish slow-query logs). See Publishing Neptune log */
  EnableCloudwatchLogsExports?: string[];
  /** If set to true, enables Amazon Identity and Access Management (IAM) authentication for the entire DB cluster (this cannot be set at an instance level). Default: false. */
  EnableIAMDatabaseAuthentication?: boolean;
  /** The version number of the database engine to use for the new DB cluster. Example: 1.2.1.0 */
  EngineVersion?: string;
  /** The ID of the Neptune global database to which this new DB cluster should be added. */
  GlobalClusterIdentifier?: string;
  /** The Amazon KMS key identifier for an encrypted DB cluster. The KMS key identifier is the Amazon Resource Name (ARN) for the KMS encryption key. If you are creating a DB cluster with the same Amazon ac */
  KmsKeyId?: string;
  /** Not supported by Neptune. */
  MasterUsername?: string;
  /** Not supported by Neptune. */
  MasterUserPassword?: string;
  /** (Not supported by Neptune) */
  OptionGroupName?: string;
  /** The port number on which the instances in the DB cluster accept connections. Default: 8182 */
  Port?: number;
  /** The daily time range during which automated backups are created if automated backups are enabled using the BackupRetentionPeriod parameter. The default is a 30-minute window selected at random from an */
  PreferredBackupWindow?: string;
  /** The weekly time range during which system maintenance can occur, in Universal Coordinated Time (UTC). Format: ddd:hh24:mi-ddd:hh24:mi The default is a 30-minute window selected at random from an 8-hou */
  PreferredMaintenanceWindow?: string;
  /** This parameter is not currently supported. */
  PreSignedUrl?: string;
  /** The Amazon Resource Name (ARN) of the source DB instance or DB cluster if this DB cluster is created as a Read Replica. */
  ReplicationSourceIdentifier?: string;
  /** Contains the scaling configuration of a Neptune Serverless DB cluster. For more information, see Using Amazon Neptune Serverless in the Amazon Neptune User Guide. */
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  /** Specifies whether the DB cluster is encrypted. */
  StorageEncrypted?: boolean;
  /** The storage type for the new DB cluster. Valid Values: standard – ( the default ) Configures cost-effective database storage for applications with moderate to small I/O usage. When set to standard, th */
  StorageType?: string;
  /** The tags to assign to the new DB cluster. */
  Tags?: Tag[];
  /** A list of EC2 VPC security groups to associate with this DB cluster. */
  VpcSecurityGroupIds?: string[];
}

export interface CreateDBClusterEndpointInput {
  /** The identifier to use for the new endpoint. This parameter is stored as a lowercase string. */
  DBClusterEndpointIdentifier: string;
  /** The DB cluster identifier of the DB cluster associated with the endpoint. This parameter is stored as a lowercase string. */
  DBClusterIdentifier: string;
  /** The type of the endpoint. One of: READER, WRITER, ANY. */
  EndpointType: string;
  /** List of DB instance identifiers that aren't part of the custom endpoint group. All other eligible instances are reachable through the custom endpoint. Only relevant if the list of static members is em */
  ExcludedMembers?: string[];
  /** List of DB instance identifiers that are part of the custom endpoint group. */
  StaticMembers?: string[];
  /** The tags to be assigned to the Amazon Neptune resource. */
  Tags?: Tag[];
}

export interface CreateDBClusterParameterGroupInput {
  /** The name of the DB cluster parameter group. Constraints: Must match the name of an existing DBClusterParameterGroup. This value is stored as a lowercase string. */
  DBClusterParameterGroupName: string;
  /** The DB cluster parameter group family name. A DB cluster parameter group can be associated with one and only one DB cluster parameter group family, and can be applied only to a DB cluster running a da */
  DBParameterGroupFamily: string;
  /** The description for the DB cluster parameter group. */
  Description: string;
  /** The tags to be assigned to the new DB cluster parameter group. */
  Tags?: Tag[];
}

export interface CreateDBClusterSnapshotInput {
  /** The identifier of the DB cluster to create a snapshot for. This parameter is not case-sensitive. Constraints: Must match the identifier of an existing DBCluster. Example: my-cluster1 */
  DBClusterIdentifier: string;
  /** The identifier of the DB cluster snapshot. This parameter is stored as a lowercase string. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens. First character must be a letter. Cannot */
  DBClusterSnapshotIdentifier: string;
  /** The tags to be assigned to the DB cluster snapshot. */
  Tags?: Tag[];
}

export interface CreateDBInstanceInput {
  /** The identifier of the DB cluster that the instance will belong to. For information on creating a DB cluster, see CreateDBCluster. Type: String */
  DBClusterIdentifier: string;
  /** The compute and memory capacity of the DB instance, for example, db.m4.large. Not all DB instance classes are available in all Amazon Regions. */
  DBInstanceClass: string;
  /** The DB instance identifier. This parameter is stored as a lowercase string. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens. First character must be a letter. Cannot end with a hyp */
  DBInstanceIdentifier: string;
  /** The name of the database engine to be used for this instance. Valid Values: neptune */
  Engine: string;
  /** Not supported by Neptune. */
  AllocatedStorage?: number;
  /** Indicates that minor engine upgrades are applied automatically to the DB instance during the maintenance window. Default: true */
  AutoMinorVersionUpgrade?: boolean;
  /** The EC2 Availability Zone that the DB instance is created in Default: A random, system-chosen Availability Zone in the endpoint's Amazon Region. Example: us-east-1d Constraint: The AvailabilityZone pa */
  AvailabilityZone?: string;
  /** The number of days for which automated backups are retained. Not applicable. The retention period for automated backups is managed by the DB cluster. For more information, see CreateDBCluster. Default */
  BackupRetentionPeriod?: number;
  /** (Not supported by Neptune) */
  CharacterSetName?: string;
  /** True to copy all tags from the DB instance to snapshots of the DB instance, and otherwise false. The default is false. */
  CopyTagsToSnapshot?: boolean;
  /** Not supported. */
  DBName?: string;
  /** The name of the DB parameter group to associate with this DB instance. If this argument is omitted, the default DBParameterGroup for the specified engine is used. Constraints: Must be 1 to 255 letters */
  DBParameterGroupName?: string;
  /** A list of DB security groups to associate with this DB instance. Default: The default DB security group for the database engine. */
  DBSecurityGroups?: string[];
  /** A DB subnet group to associate with this DB instance. If there is no DB subnet group, then it is a non-VPC DB instance. */
  DBSubnetGroupName?: string;
  /** A value that indicates whether the DB instance has deletion protection enabled. The database can't be deleted when deletion protection is enabled. By default, deletion protection is disabled. See Dele */
  DeletionProtection?: boolean;
  /** Specify the Active Directory Domain to create the instance in. */
  Domain?: string;
  /** Specify the name of the IAM role to be used when making API calls to the Directory Service. */
  DomainIAMRoleName?: string;
  /** The list of log types that need to be enabled for exporting to CloudWatch Logs. */
  EnableCloudwatchLogsExports?: string[];
  /** Not supported by Neptune (ignored). */
  EnableIAMDatabaseAuthentication?: boolean;
  /** (Not supported by Neptune) */
  EnablePerformanceInsights?: boolean;
  /** The version number of the database engine to use. Currently, setting this parameter has no effect. */
  EngineVersion?: string;
  /** The amount of Provisioned IOPS (input/output operations per second) to be initially allocated for the DB instance. */
  Iops?: number;
  /** The Amazon KMS key identifier for an encrypted DB instance. The KMS key identifier is the Amazon Resource Name (ARN) for the KMS encryption key. If you are creating a DB instance with the same Amazon  */
  KmsKeyId?: string;
  /** License model information for this DB instance. Valid values: license-included | bring-your-own-license | general-public-license */
  LicenseModel?: string;
  /** Not supported by Neptune. */
  MasterUsername?: string;
  /** Not supported by Neptune. */
  MasterUserPassword?: string;
  /** The interval, in seconds, between points when Enhanced Monitoring metrics are collected for the DB instance. To disable collecting Enhanced Monitoring metrics, specify 0. The default is 0. If Monitori */
  MonitoringInterval?: number;
  /** The ARN for the IAM role that permits Neptune to send enhanced monitoring metrics to Amazon CloudWatch Logs. For example, arn:aws:iam:123456789012:role/emaccess. If MonitoringInterval is set to a valu */
  MonitoringRoleArn?: string;
  /** Specifies if the DB instance is a Multi-AZ deployment. You can't set the AvailabilityZone parameter if the MultiAZ parameter is set to true. */
  MultiAZ?: boolean;
  /** (Not supported by Neptune) */
  OptionGroupName?: string;
  /** (Not supported by Neptune) */
  PerformanceInsightsKMSKeyId?: string;
  /** The port number on which the database accepts connections. Not applicable. The port is managed by the DB cluster. For more information, see CreateDBCluster. Default: 8182 Type: Integer */
  Port?: number;
  /** The daily time range during which automated backups are created. Not applicable. The daily time range for creating automated backups is managed by the DB cluster. For more information, see CreateDBClu */
  PreferredBackupWindow?: string;
  /** The time range each week during which system maintenance can occur, in Universal Coordinated Time (UTC). Format: ddd:hh24:mi-ddd:hh24:mi The default is a 30-minute window selected at random from an 8- */
  PreferredMaintenanceWindow?: string;
  /** A value that specifies the order in which an Read Replica is promoted to the primary instance after a failure of the existing primary instance. Default: 1 Valid Values: 0 - 15 */
  PromotionTier?: number;
  /** Indicates whether the DB instance is publicly accessible. When the DB instance is publicly accessible and you connect from outside of the DB instance's virtual private cloud (VPC), its Domain Name Sys */
  PubliclyAccessible?: boolean;
  /** Specifies whether the DB instance is encrypted. Not applicable. The encryption for DB instances is managed by the DB cluster. For more information, see CreateDBCluster. Default: false */
  StorageEncrypted?: boolean;
  /** Not applicable. In Neptune the storage type is managed at the DB Cluster level. */
  StorageType?: string;
  /** The tags to assign to the new instance. */
  Tags?: Tag[];
  /** The ARN from the key store with which to associate the instance for TDE encryption. */
  TdeCredentialArn?: string;
  /** The password for the given ARN from the key store in order to access the device. */
  TdeCredentialPassword?: string;
  /** The time zone of the DB instance. */
  Timezone?: string;
  /** A list of EC2 VPC security groups to associate with this DB instance. Not applicable. The associated list of EC2 VPC security groups is managed by the DB cluster. For more information, see CreateDBClu */
  VpcSecurityGroupIds?: string[];
}

export interface CreateDBParameterGroupInput {
  /** The DB parameter group family name. A DB parameter group can be associated with one and only one DB parameter group family, and can be applied only to a DB instance running a database engine and engin */
  DBParameterGroupFamily: string;
  /** The name of the DB parameter group. Constraints: Must be 1 to 255 letters, numbers, or hyphens. First character must be a letter Cannot end with a hyphen or contain two consecutive hyphens This value  */
  DBParameterGroupName: string;
  /** The description for the DB parameter group. */
  Description: string;
  /** The tags to be assigned to the new DB parameter group. */
  Tags?: Tag[];
}

export interface CreateDBSubnetGroupInput {
  /** The description for the DB subnet group. */
  DBSubnetGroupDescription: string;
  /** The name for the DB subnet group. This value is stored as a lowercase string. Constraints: Must contain no more than 255 letters, numbers, periods, underscores, spaces, or hyphens. Must not be default */
  DBSubnetGroupName: string;
  /** The EC2 Subnet IDs for the DB subnet group. */
  SubnetIds: string[];
  /** The tags to be assigned to the new DB subnet group. */
  Tags?: Tag[];
}

export interface CreateEventSubscriptionInput {
  /** The Amazon Resource Name (ARN) of the SNS topic created for event notification. The ARN is created by Amazon SNS when you create a topic and subscribe to it. */
  SnsTopicArn: string;
  /** The name of the subscription. Constraints: The name must be less than 255 characters. */
  SubscriptionName: string;
  /** A Boolean value; set to true to activate the subscription, set to false to create the subscription but not active it. */
  Enabled?: boolean;
  /** A list of event categories for a SourceType that you want to subscribe to. You can see a list of the categories for a given SourceType by using the DescribeEventCategories action. */
  EventCategories?: string[];
  /** The list of identifiers of the event sources for which events are returned. If not specified, then all sources are included in the response. An identifier must begin with a letter and must contain onl */
  SourceIds?: string[];
  /** The type of source that is generating the events. For example, if you want to be notified of events generated by a DB instance, you would set this parameter to db-instance. if this value is not specif */
  SourceType?: string;
  /** The tags to be applied to the new event subscription. */
  Tags?: Tag[];
}

export interface CreateGlobalClusterInput {
  /** The cluster identifier of the new global database cluster. */
  GlobalClusterIdentifier: string;
  /** The deletion protection setting for the new global database. The global database can't be deleted when deletion protection is enabled. */
  DeletionProtection?: boolean;
  /** The name of the database engine to be used in the global database. Valid values: neptune */
  Engine?: string;
  /** The Neptune engine version to be used by the global database. Valid values: 1.2.0.0 or above. */
  EngineVersion?: string;
  /** (Optional) The Amazon Resource Name (ARN) of an existing Neptune DB cluster to use as the primary cluster of the new global database. */
  SourceDBClusterIdentifier?: string;
  /** The storage encryption setting for the new global database cluster. */
  StorageEncrypted?: boolean;
}

export interface DeleteDBClusterInput {
  /** The DB cluster identifier for the DB cluster to be deleted. This parameter isn't case-sensitive. Constraints: Must match an existing DBClusterIdentifier. */
  DBClusterIdentifier: string;
  /** The DB cluster snapshot identifier of the new DB cluster snapshot created when SkipFinalSnapshot is set to false. Specifying this parameter and also setting the SkipFinalShapshot parameter to true res */
  FinalDBSnapshotIdentifier?: string;
  /** Determines whether a final DB cluster snapshot is created before the DB cluster is deleted. If true is specified, no DB cluster snapshot is created. If false is specified, a DB cluster snapshot is cre */
  SkipFinalSnapshot?: boolean;
}

export interface DeleteDBClusterEndpointInput {
  /** The identifier associated with the custom endpoint. This parameter is stored as a lowercase string. */
  DBClusterEndpointIdentifier: string;
}

export interface DeleteDBClusterParameterGroupInput {
  /** The name of the DB cluster parameter group. Constraints: Must be the name of an existing DB cluster parameter group. You can't delete a default DB cluster parameter group. Cannot be associated with an */
  DBClusterParameterGroupName: string;
}

export interface DeleteDBClusterSnapshotInput {
  /** The identifier of the DB cluster snapshot to delete. Constraints: Must be the name of an existing DB cluster snapshot in the available state. */
  DBClusterSnapshotIdentifier: string;
}

export interface DeleteDBInstanceInput {
  /** The DB instance identifier for the DB instance to be deleted. This parameter isn't case-sensitive. Constraints: Must match the name of an existing DB instance. */
  DBInstanceIdentifier: string;
  /** The DBSnapshotIdentifier of the new DBSnapshot created when SkipFinalSnapshot is set to false. Specifying this parameter and also setting the SkipFinalShapshot parameter to true results in an error. C */
  FinalDBSnapshotIdentifier?: string;
  /** Determines whether a final DB snapshot is created before the DB instance is deleted. If true is specified, no DBSnapshot is created. If false is specified, a DB snapshot is created before the DB insta */
  SkipFinalSnapshot?: boolean;
}

export interface DeleteDBParameterGroupInput {
  /** The name of the DB parameter group. Constraints: Must be the name of an existing DB parameter group You can't delete a default DB parameter group Cannot be associated with any DB instances */
  DBParameterGroupName: string;
}

export interface DeleteDBSubnetGroupInput {
  /** The name of the database subnet group to delete. You can't delete the default subnet group. Constraints: Constraints: Must match the name of an existing DBSubnetGroup. Must not be default. Example: my */
  DBSubnetGroupName: string;
}

export interface DeleteEventSubscriptionInput {
  /** The name of the event notification subscription you want to delete. */
  SubscriptionName: string;
}

export interface DeleteGlobalClusterInput {
  /** The cluster identifier of the global database cluster being deleted. */
  GlobalClusterIdentifier: string;
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
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeDBClusterParameterGroups request. If this parameter is specified, the response includes only records beyond the marker, up to the value spec */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeDBClusterParametersInput {
  /** The name of a specific DB cluster parameter group to return parameter details for. Constraints: If supplied, must match the name of an existing DBClusterParameterGroup. */
  DBClusterParameterGroupName: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeDBClusterParameters request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
  /** A value that indicates to return only parameters for a specific source. Parameter sources can be engine, service, or customer. */
  Source?: string;
}

export interface DescribeDBClustersInput {
  /** The user-supplied DB cluster identifier. If this parameter is specified, information from only the specific DB cluster is returned. This parameter isn't case-sensitive. Constraints: If supplied, must  */
  DBClusterIdentifier?: string;
  /** A filter that specifies one or more DB clusters to describe. Supported filters: db-cluster-id - Accepts DB cluster identifiers and DB cluster Amazon Resource Names (ARNs). The results list will only i */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeDBClusters request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRe */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeDBClusterSnapshotAttributesInput {
  /** The identifier for the DB cluster snapshot to describe the attributes for. */
  DBClusterSnapshotIdentifier: string;
}

export interface DescribeDBClusterSnapshotsInput {
  /** The ID of the DB cluster to retrieve the list of DB cluster snapshots for. This parameter can't be used in conjunction with the DBClusterSnapshotIdentifier parameter. This parameter is not case-sensit */
  DBClusterIdentifier?: string;
  /** A specific DB cluster snapshot identifier to describe. This parameter can't be used in conjunction with the DBClusterIdentifier parameter. This value is stored as a lowercase string. Constraints: If s */
  DBClusterSnapshotIdentifier?: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** True to include manual DB cluster snapshots that are public and can be copied or restored by any Amazon account, and otherwise false. The default is false. The default is false. You can share a manual */
  IncludePublic?: boolean;
  /** True to include shared manual DB cluster snapshots from other Amazon accounts that this Amazon account has been given permission to copy or restore, and otherwise false. The default is false. You can  */
  IncludeShared?: boolean;
  /** An optional pagination token provided by a previous DescribeDBClusterSnapshots request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified  */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
  /** The type of DB cluster snapshots to be returned. You can specify one of the following values: automated - Return all DB cluster snapshots that have been automatically taken by Amazon Neptune for my Am */
  SnapshotType?: string;
}

export interface DescribeDBEngineVersionsInput {
  /** The name of a specific DB parameter group family to return details for. Constraints: If supplied, must match an existing DBParameterGroupFamily. */
  DBParameterGroupFamily?: string;
  /** Indicates that only the default version of the specified engine or engine and major version combination is returned. */
  DefaultOnly?: boolean;
  /** The database engine to return. */
  Engine?: string;
  /** The database engine version to return. Example: 5.1.49 */
  EngineVersion?: string;
  /** Not currently supported. */
  Filters?: Filter[];
  /** If this parameter is specified and the requested engine supports the CharacterSetName parameter for CreateDBInstance, the response includes a list of supported character sets for each engine version. */
  ListSupportedCharacterSets?: boolean;
  /** If this parameter is specified and the requested engine supports the TimeZone parameter for CreateDBInstance, the response includes a list of supported time zones for each engine version. */
  ListSupportedTimezones?: boolean;
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more than the MaxRecords value is available, a pagination token called a marker is included in the response so that the following results c */
  MaxRecords?: number;
}

export interface DescribeDBInstancesInput {
  /** The user-supplied instance identifier. If this parameter is specified, information from only the specific DB instance is returned. This parameter isn't case-sensitive. Constraints: If supplied, must m */
  DBInstanceIdentifier?: string;
  /** A filter that specifies one or more DB instances to describe. Supported filters: db-cluster-id - Accepts DB cluster identifiers and DB cluster Amazon Resource Names (ARNs). The results list will only  */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeDBInstances request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxR */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeDBParameterGroupsInput {
  /** The name of a specific DB parameter group to return details for. Constraints: If supplied, must match the name of an existing DBClusterParameterGroup. */
  DBParameterGroupName?: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeDBParameterGroups request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified b */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeDBParametersInput {
  /** The name of a specific DB parameter group to return details for. Constraints: If supplied, must match the name of an existing DBParameterGroup. */
  DBParameterGroupName: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeDBParameters request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by Max */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
  /** The parameter types to return. Default: All parameter types returned Valid Values: user | system | engine-default */
  Source?: string;
}

export interface DescribeDBSubnetGroupsInput {
  /** The name of the DB subnet group to return details for. */
  DBSubnetGroupName?: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeDBSubnetGroups request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by M */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeEngineDefaultClusterParametersInput {
  /** The name of the DB cluster parameter group family to return engine parameter information for. */
  DBParameterGroupFamily: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeEngineDefaultClusterParameters request. If this parameter is specified, the response includes only records beyond the marker, up to the valu */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeEngineDefaultParametersInput {
  /** The name of the DB parameter group family. */
  DBParameterGroupFamily: string;
  /** Not currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeEngineDefaultParameters request. If this parameter is specified, the response includes only records beyond the marker, up to the value speci */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeEventCategoriesInput {
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** The type of source that is generating the events. Valid values: db-instance | db-parameter-group | db-security-group | db-snapshot */
  SourceType?: string;
}

export interface DescribeEventsInput {
  /** The number of minutes to retrieve events for. Default: 60 */
  Duration?: number;
  /** The end of the time interval for which to retrieve events, specified in ISO 8601 format. For more information about ISO 8601, go to the ISO8601 Wikipedia page. Example: 2009-07-08T18:00Z */
  EndTime?: string;
  /** A list of event categories that trigger notifications for a event notification subscription. */
  EventCategories?: string[];
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeEvents request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecord */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
  /** The identifier of the event source for which events are returned. If not specified, then all sources are included in the response. Constraints: If SourceIdentifier is supplied, SourceType must also be */
  SourceIdentifier?: string;
  /** The event source to retrieve events for. If no value is specified, all events are returned. */
  SourceType?: 'db-instance' | 'db-parameter-group' | 'db-security-group' | 'db-snapshot' | 'db-cluster' | 'db-cluster-snapshot';
  /** The beginning of the time interval to retrieve events for, specified in ISO 8601 format. For more information about ISO 8601, go to the ISO8601 Wikipedia page. Example: 2009-07-08T18:00Z */
  StartTime?: string;
}

export interface DescribeEventSubscriptionsInput {
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeOrderableDBInstanceOptions request. If this parameter is specified, the response includes only records beyond the marker, up to the value sp */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
  /** The name of the event notification subscription you want to describe. */
  SubscriptionName?: string;
}

export interface DescribeGlobalClustersInput {
  /** The user-supplied DB cluster identifier. If this parameter is specified, only information about the specified DB cluster is returned. This parameter is not case-sensitive. Constraints: If supplied, mu */
  GlobalClusterIdentifier?: string;
  /** (Optional) A pagination token returned by a previous call to DescribeGlobalClusters. If this parameter is specified, the response will only include records beyond the marker, up to the number specifie */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination marker token is included in the response that you can use to retrieve  */
  MaxRecords?: number;
}

export interface DescribeOrderableDBInstanceOptionsInput {
  /** The name of the engine to retrieve DB instance options for. */
  Engine: string;
  /** The DB instance class filter value. Specify this parameter to show only the available offerings matching the specified DB instance class. */
  DBInstanceClass?: string;
  /** The engine version filter value. Specify this parameter to show only the available offerings matching the specified engine version. */
  EngineVersion?: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** The license model filter value. Specify this parameter to show only the available offerings matching the specified license model. */
  LicenseModel?: string;
  /** An optional pagination token provided by a previous DescribeOrderableDBInstanceOptions request. If this parameter is specified, the response includes only records beyond the marker, up to the value sp */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
  /** The VPC filter value. Specify this parameter to show only the available VPC or non-VPC offerings. */
  Vpc?: boolean;
}

export interface DescribePendingMaintenanceActionsInput {
  /** A filter that specifies one or more resources to return pending maintenance actions for. Supported filters: db-cluster-id - Accepts DB cluster identifiers and DB cluster Amazon Resource Names (ARNs).  */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribePendingMaintenanceActions request. If this parameter is specified, the response includes only records beyond the marker, up to a number of r */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
  /** The ARN of a resource to return pending maintenance actions for. */
  ResourceIdentifier?: string;
}

export interface DescribeValidDBInstanceModificationsInput {
  /** The customer identifier or the ARN of your DB instance. */
  DBInstanceIdentifier: string;
}

export interface FailoverDBClusterInput {
  /** A DB cluster identifier to force a failover for. This parameter is not case-sensitive. Constraints: Must match the identifier of an existing DBCluster. */
  DBClusterIdentifier?: string;
  /** The name of the instance to promote to the primary instance. You must specify the instance identifier for an Read Replica in the DB cluster. For example, mydbcluster-replica1. */
  TargetDBInstanceIdentifier?: string;
}

export interface FailoverGlobalClusterInput {
  /** Identifier of the Neptune global database that should be failed over. The identifier is the unique key assigned by the user when the Neptune global database was created. In other words, it's the name  */
  GlobalClusterIdentifier: string;
  /** The Amazon Resource Name (ARN) of the secondary Neptune DB cluster that you want to promote to primary for the global database. */
  TargetDbClusterIdentifier: string;
  /** Specifies whether to allow data loss for this global database cluster operation. Allowing data loss triggers a global failover operation. If you don't specify AllowDataLoss, the global database cluste */
  AllowDataLoss?: boolean;
  /** Specifies whether to switch over this global database cluster. Constraints:Can't be specified together with the AllowDataLoss parameter. */
  Switchover?: boolean;
}

export interface ListTagsForResourceInput {
  /** The Amazon Neptune resource with tags to be listed. This value is an Amazon Resource Name (ARN). For information about creating an ARN, see Constructing an Amazon Resource Name (ARN). */
  ResourceName: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
}

export interface ModifyDBClusterInput {
  /** The DB cluster identifier for the cluster being modified. This parameter is not case-sensitive. Constraints: Must match the identifier of an existing DBCluster. */
  DBClusterIdentifier: string;
  /** A value that indicates whether upgrades between different major versions are allowed. Constraints: You must set the allow-major-version-upgrade flag when providing an EngineVersion parameter that uses */
  AllowMajorVersionUpgrade?: boolean;
  /** A value that specifies whether the modifications in this request and any pending modifications are asynchronously applied as soon as possible, regardless of the PreferredMaintenanceWindow setting for  */
  ApplyImmediately?: boolean;
  /** The number of days for which automated backups are retained. You must specify a minimum value of 1. Default: 1 Constraints: Must be a value from 1 to 35 */
  BackupRetentionPeriod?: number;
  /** The configuration setting for the log types to be enabled for export to CloudWatch Logs for a specific DB cluster. See Using the CLI to publish Neptune audit logs to CloudWatch Logs. */
  CloudwatchLogsExportConfiguration?: CloudwatchLogsExportConfiguration;
  /** If set to true, tags are copied to any snapshot of the DB cluster that is created. */
  CopyTagsToSnapshot?: boolean;
  /** The name of the DB cluster parameter group to use for the DB cluster. */
  DBClusterParameterGroupName?: string;
  /** The name of the DB parameter group to apply to all instances of the DB cluster. When you apply a parameter group using DBInstanceParameterGroupName, parameter changes aren't applied during the next ma */
  DBInstanceParameterGroupName?: string;
  /** A value that indicates whether the DB cluster has deletion protection enabled. The database can't be deleted when deletion protection is enabled. By default, deletion protection is disabled. */
  DeletionProtection?: boolean;
  /** True to enable mapping of Amazon Identity and Access Management (IAM) accounts to database accounts, and otherwise false. Default: false */
  EnableIAMDatabaseAuthentication?: boolean;
  /** The version number of the database engine to which you want to upgrade. Changing this parameter results in an outage. The change is applied during the next maintenance window unless the ApplyImmediate */
  EngineVersion?: string;
  /** Not supported by Neptune. */
  MasterUserPassword?: string;
  /** The new DB cluster identifier for the DB cluster when renaming a DB cluster. This value is stored as a lowercase string. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens The first c */
  NewDBClusterIdentifier?: string;
  /** Not supported by Neptune. */
  OptionGroupName?: string;
  /** The port number on which the DB cluster accepts connections. Constraints: Value must be 1150-65535 Default: The same port as the original DB cluster. */
  Port?: number;
  /** The daily time range during which automated backups are created if automated backups are enabled, using the BackupRetentionPeriod parameter. The default is a 30-minute window selected at random from a */
  PreferredBackupWindow?: string;
  /** The weekly time range during which system maintenance can occur, in Universal Coordinated Time (UTC). Format: ddd:hh24:mi-ddd:hh24:mi The default is a 30-minute window selected at random from an 8-hou */
  PreferredMaintenanceWindow?: string;
  /** Contains the scaling configuration of a Neptune Serverless DB cluster. For more information, see Using Amazon Neptune Serverless in the Amazon Neptune User Guide. */
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  /** The storage type to associate with the DB cluster. Valid Values: standard – ( the default ) Configures cost-effective database storage for applications with moderate to small I/O usage. iopt1 – Enable */
  StorageType?: string;
  /** A list of VPC security groups that the DB cluster will belong to. */
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
  /** A list of parameters in the DB cluster parameter group to modify. */
  Parameters: Parameter[];
}

export interface ModifyDBClusterSnapshotAttributeInput {
  /** The name of the DB cluster snapshot attribute to modify. To manage authorization for other Amazon accounts to copy or restore a manual DB cluster snapshot, set this value to restore. */
  AttributeName: string;
  /** The identifier for the DB cluster snapshot to modify the attributes for. */
  DBClusterSnapshotIdentifier: string;
  /** A list of DB cluster snapshot attributes to add to the attribute specified by AttributeName. To authorize other Amazon accounts to copy or restore a manual DB cluster snapshot, set this list to includ */
  ValuesToAdd?: string[];
  /** A list of DB cluster snapshot attributes to remove from the attribute specified by AttributeName. To remove authorization for other Amazon accounts to copy or restore a manual DB cluster snapshot, set */
  ValuesToRemove?: string[];
}

export interface ModifyDBInstanceInput {
  /** The DB instance identifier. This value is stored as a lowercase string. Constraints: Must match the identifier of an existing DBInstance. */
  DBInstanceIdentifier: string;
  /** Not supported by Neptune. */
  AllocatedStorage?: number;
  /** Indicates that major version upgrades are allowed. Changing this parameter doesn't result in an outage and the change is asynchronously applied as soon as possible. */
  AllowMajorVersionUpgrade?: boolean;
  /** Specifies whether the modifications in this request and any pending modifications are asynchronously applied as soon as possible, regardless of the PreferredMaintenanceWindow setting for the DB instan */
  ApplyImmediately?: boolean;
  /** Indicates that minor version upgrades are applied automatically to the DB instance during the maintenance window. Changing this parameter doesn't result in an outage except in the following case and t */
  AutoMinorVersionUpgrade?: boolean;
  /** Not applicable. The retention period for automated backups is managed by the DB cluster. For more information, see ModifyDBCluster. Default: Uses existing setting */
  BackupRetentionPeriod?: number;
  /** Indicates the certificate that needs to be associated with the instance. */
  CACertificateIdentifier?: string;
  /** The configuration setting for the log types to be enabled for export to CloudWatch Logs for a specific DB instance or DB cluster. */
  CloudwatchLogsExportConfiguration?: CloudwatchLogsExportConfiguration;
  /** True to copy all tags from the DB instance to snapshots of the DB instance, and otherwise false. The default is false. */
  CopyTagsToSnapshot?: boolean;
  /** The new compute and memory capacity of the DB instance, for example, db.m4.large. Not all DB instance classes are available in all Amazon Regions. If you modify the DB instance class, an outage occurs */
  DBInstanceClass?: string;
  /** The name of the DB parameter group to apply to the DB instance. Changing this setting doesn't result in an outage. The parameter group name itself is changed immediately, but the actual parameter chan */
  DBParameterGroupName?: string;
  /** The port number on which the database accepts connections. The value of the DBPortNumber parameter must not match any of the port values specified for options in the option group for the DB instance.  */
  DBPortNumber?: number;
  /** A list of DB security groups to authorize on this DB instance. Changing this setting doesn't result in an outage and the change is asynchronously applied as soon as possible. Constraints: If supplied, */
  DBSecurityGroups?: string[];
  /** The new DB subnet group for the DB instance. You can use this parameter to move your DB instance to a different VPC. Changing the subnet group causes an outage during the change. The change is applied */
  DBSubnetGroupName?: string;
  /** A value that indicates whether the DB instance has deletion protection enabled. The database can't be deleted when deletion protection is enabled. By default, deletion protection is disabled. See Dele */
  DeletionProtection?: boolean;
  /** Not supported. */
  Domain?: string;
  /** Not supported */
  DomainIAMRoleName?: string;
  /** True to enable mapping of Amazon Identity and Access Management (IAM) accounts to database accounts, and otherwise false. You can enable IAM database authentication for the following database engines  */
  EnableIAMDatabaseAuthentication?: boolean;
  /** (Not supported by Neptune) */
  EnablePerformanceInsights?: boolean;
  /** The version number of the database engine to upgrade to. Currently, setting this parameter has no effect. To upgrade your database engine to the most recent release, use the ApplyPendingMaintenanceAct */
  EngineVersion?: string;
  /** The new Provisioned IOPS (I/O operations per second) value for the instance. Changing this setting doesn't result in an outage and the change is applied during the next maintenance window unless the A */
  Iops?: number;
  /** Not supported by Neptune. */
  LicenseModel?: string;
  /** Not supported by Neptune. */
  MasterUserPassword?: string;
  /** The interval, in seconds, between points when Enhanced Monitoring metrics are collected for the DB instance. To disable collecting Enhanced Monitoring metrics, specify 0. The default is 0. If Monitori */
  MonitoringInterval?: number;
  /** The ARN for the IAM role that permits Neptune to send enhanced monitoring metrics to Amazon CloudWatch Logs. For example, arn:aws:iam:123456789012:role/emaccess. If MonitoringInterval is set to a valu */
  MonitoringRoleArn?: string;
  /** Specifies if the DB instance is a Multi-AZ deployment. Changing this parameter doesn't result in an outage and the change is applied during the next maintenance window unless the ApplyImmediately para */
  MultiAZ?: boolean;
  /** The new DB instance identifier for the DB instance when renaming a DB instance. When you change the DB instance identifier, an instance reboot will occur immediately if you set Apply Immediately to tr */
  NewDBInstanceIdentifier?: string;
  /** (Not supported by Neptune) */
  OptionGroupName?: string;
  /** (Not supported by Neptune) */
  PerformanceInsightsKMSKeyId?: string;
  /** The daily time range during which automated backups are created if automated backups are enabled. Not applicable. The daily time range for creating automated backups is managed by the DB cluster. For  */
  PreferredBackupWindow?: string;
  /** The weekly time range (in UTC) during which system maintenance can occur, which might result in an outage. Changing this parameter doesn't result in an outage, except in the following situation, and t */
  PreferredMaintenanceWindow?: string;
  /** A value that specifies the order in which a Read Replica is promoted to the primary instance after a failure of the existing primary instance. Default: 1 Valid Values: 0 - 15 */
  PromotionTier?: number;
  /** Indicates whether the DB instance is publicly accessible. When the DB instance is publicly accessible and you connect from outside of the DB instance's virtual private cloud (VPC), its Domain Name Sys */
  PubliclyAccessible?: boolean;
  /** Not applicable. In Neptune the storage type is managed at the DB Cluster level. */
  StorageType?: string;
  /** The ARN from the key store with which to associate the instance for TDE encryption. */
  TdeCredentialArn?: string;
  /** The password for the given ARN from the key store in order to access the device. */
  TdeCredentialPassword?: string;
  /** A list of EC2 VPC security groups to authorize on this DB instance. This change is asynchronously applied as soon as possible. Not applicable. The associated list of EC2 VPC security groups is managed */
  VpcSecurityGroupIds?: string[];
}

export interface ModifyDBParameterGroupInput {
  /** The name of the DB parameter group. Constraints: If supplied, must match the name of an existing DBParameterGroup. */
  DBParameterGroupName: string;
  /** An array of parameter names, values, and the apply method for the parameter update. At least one parameter name, value, and apply method must be supplied; subsequent arguments are optional. A maximum  */
  Parameters: Parameter[];
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
  /** The name of the event notification subscription. */
  SubscriptionName: string;
  /** A Boolean value; set to true to activate the subscription. */
  Enabled?: boolean;
  /** A list of event categories for a SourceType that you want to subscribe to. You can see a list of the categories for a given SourceType by using the DescribeEventCategories action. */
  EventCategories?: string[];
  /** The Amazon Resource Name (ARN) of the SNS topic created for event notification. The ARN is created by Amazon SNS when you create a topic and subscribe to it. */
  SnsTopicArn?: string;
  /** The type of source that is generating the events. For example, if you want to be notified of events generated by a DB instance, you would set this parameter to db-instance. if this value is not specif */
  SourceType?: string;
}

export interface ModifyGlobalClusterInput {
  /** The DB cluster identifier for the global cluster being modified. This parameter is not case-sensitive. Constraints: Must match the identifier of an existing global database cluster. */
  GlobalClusterIdentifier: string;
  /** A value that indicates whether major version upgrades are allowed. Constraints: You must allow major version upgrades if you specify a value for the EngineVersion parameter that is a different major v */
  AllowMajorVersionUpgrade?: boolean;
  /** Indicates whether the global database has deletion protection enabled. The global database cannot be deleted when deletion protection is enabled. */
  DeletionProtection?: boolean;
  /** The version number of the database engine to which you want to upgrade. Changing this parameter will result in an outage. The change is applied during the next maintenance window unless ApplyImmediate */
  EngineVersion?: string;
  /** A new cluster identifier to assign to the global database. This value is stored as a lowercase string. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens. The first character must be  */
  NewGlobalClusterIdentifier?: string;
}

export interface PromoteReadReplicaDBClusterInput {
  /** Not supported. */
  DBClusterIdentifier: string;
}

export interface RebootDBInstanceInput {
  /** The DB instance identifier. This parameter is stored as a lowercase string. Constraints: Must match the identifier of an existing DBInstance. */
  DBInstanceIdentifier: string;
  /** When true, the reboot is conducted through a MultiAZ failover. Constraint: You can't specify true if the instance is not configured for MultiAZ. */
  ForceFailover?: boolean;
}

export interface RemoveFromGlobalClusterInput {
  /** The Amazon Resource Name (ARN) identifying the cluster to be detached from the Neptune global database cluster. */
  DbClusterIdentifier: string;
  /** The identifier of the Neptune global database from which to detach the specified Neptune DB cluster. */
  GlobalClusterIdentifier: string;
}

export interface RemoveRoleFromDBClusterInput {
  /** The name of the DB cluster to disassociate the IAM role from. */
  DBClusterIdentifier: string;
  /** The Amazon Resource Name (ARN) of the IAM role to disassociate from the DB cluster, for example arn:aws:iam::123456789012:role/NeptuneAccessRole. */
  RoleArn: string;
  /** The name of the feature for the DB cluster that the IAM role is to be disassociated from. For the list of supported feature names, see DescribeDBEngineVersions. */
  FeatureName?: string;
}

export interface RemoveSourceIdentifierFromSubscriptionInput {
  /** The source identifier to be removed from the subscription, such as the DB instance identifier for a DB instance or the name of a security group. */
  SourceIdentifier: string;
  /** The name of the event notification subscription you want to remove a source identifier from. */
  SubscriptionName: string;
}

export interface RemoveTagsFromResourceInput {
  /** The Amazon Neptune resource that the tags are removed from. This value is an Amazon Resource Name (ARN). For information about creating an ARN, see Constructing an Amazon Resource Name (ARN). */
  ResourceName: string;
  /** The tag key (name) of the tag to be removed. */
  TagKeys: string[];
}

export interface ResetDBClusterParameterGroupInput {
  /** The name of the DB cluster parameter group to reset. */
  DBClusterParameterGroupName: string;
  /** A list of parameter names in the DB cluster parameter group to reset to the default values. You can't use this parameter if the ResetAllParameters parameter is set to true. */
  Parameters?: Parameter[];
  /** A value that is set to true to reset all parameters in the DB cluster parameter group to their default values, and false otherwise. You can't use this parameter if there is a list of parameter names s */
  ResetAllParameters?: boolean;
}

export interface ResetDBParameterGroupInput {
  /** The name of the DB parameter group. Constraints: Must match the name of an existing DBParameterGroup. */
  DBParameterGroupName: string;
  /** To reset the entire DB parameter group, specify the DBParameterGroup name and ResetAllParameters parameters. To reset specific parameters, provide a list of the following: ParameterName and ApplyMetho */
  Parameters?: Parameter[];
  /** Specifies whether (true) or not (false) to reset all parameters in the DB parameter group to default values. Default: true */
  ResetAllParameters?: boolean;
}

export interface RestoreDBClusterFromSnapshotInput {
  /** The name of the DB cluster to create from the DB snapshot or DB cluster snapshot. This parameter isn't case-sensitive. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens First charact */
  DBClusterIdentifier: string;
  /** The database engine to use for the new DB cluster. Default: The same as source Constraint: Must be compatible with the engine of the source */
  Engine: string;
  /** The identifier for the DB snapshot or DB cluster snapshot to restore from. You can use either the name or the Amazon Resource Name (ARN) to specify a DB cluster snapshot. However, you can use only the */
  SnapshotIdentifier: string;
  /** Provides the list of EC2 Availability Zones that instances in the restored DB cluster can be created in. */
  AvailabilityZones?: string[];
  /** If set to true, tags are copied to any snapshot of the restored DB cluster that is created. */
  CopyTagsToSnapshot?: boolean;
  /** Not supported. */
  DatabaseName?: string;
  /** The name of the DB cluster parameter group to associate with the new DB cluster. Constraints: If supplied, must match the name of an existing DBClusterParameterGroup. */
  DBClusterParameterGroupName?: string;
  /** The name of the DB subnet group to use for the new DB cluster. Constraints: If supplied, must match the name of an existing DBSubnetGroup. Example: mySubnetgroup */
  DBSubnetGroupName?: string;
  /** A value that indicates whether the DB cluster has deletion protection enabled. The database can't be deleted when deletion protection is enabled. By default, deletion protection is disabled. */
  DeletionProtection?: boolean;
  /** The list of logs that the restored DB cluster is to export to Amazon CloudWatch Logs. */
  EnableCloudwatchLogsExports?: string[];
  /** True to enable mapping of Amazon Identity and Access Management (IAM) accounts to database accounts, and otherwise false. Default: false */
  EnableIAMDatabaseAuthentication?: boolean;
  /** The version of the database engine to use for the new DB cluster. */
  EngineVersion?: string;
  /** The Amazon KMS key identifier to use when restoring an encrypted DB cluster from a DB snapshot or DB cluster snapshot. The KMS key identifier is the Amazon Resource Name (ARN) for the KMS encryption k */
  KmsKeyId?: string;
  /** (Not supported by Neptune) */
  OptionGroupName?: string;
  /** The port number on which the new DB cluster accepts connections. Constraints: Value must be 1150-65535 Default: The same port as the original DB cluster. */
  Port?: number;
  /** Contains the scaling configuration of a Neptune Serverless DB cluster. For more information, see Using Amazon Neptune Serverless in the Amazon Neptune User Guide. */
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  /** Specifies the storage type to be associated with the DB cluster. Valid values: standard, iopt1 Default: standard */
  StorageType?: string;
  /** The tags to be assigned to the restored DB cluster. */
  Tags?: Tag[];
  /** A list of VPC security groups that the new DB cluster will belong to. */
  VpcSecurityGroupIds?: string[];
}

export interface RestoreDBClusterToPointInTimeInput {
  /** The name of the new DB cluster to be created. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens First character must be a letter Cannot end with a hyphen or contain two consecutive h */
  DBClusterIdentifier: string;
  /** The identifier of the source DB cluster from which to restore. Constraints: Must match the identifier of an existing DBCluster. */
  SourceDBClusterIdentifier: string;
  /** The name of the DB cluster parameter group to associate with the new DB cluster. Constraints: If supplied, must match the name of an existing DBClusterParameterGroup. */
  DBClusterParameterGroupName?: string;
  /** The DB subnet group name to use for the new DB cluster. Constraints: If supplied, must match the name of an existing DBSubnetGroup. Example: mySubnetgroup */
  DBSubnetGroupName?: string;
  /** A value that indicates whether the DB cluster has deletion protection enabled. The database can't be deleted when deletion protection is enabled. By default, deletion protection is disabled. */
  DeletionProtection?: boolean;
  /** The list of logs that the restored DB cluster is to export to CloudWatch Logs. */
  EnableCloudwatchLogsExports?: string[];
  /** True to enable mapping of Amazon Identity and Access Management (IAM) accounts to database accounts, and otherwise false. Default: false */
  EnableIAMDatabaseAuthentication?: boolean;
  /** The Amazon KMS key identifier to use when restoring an encrypted DB cluster from an encrypted DB cluster. The KMS key identifier is the Amazon Resource Name (ARN) for the KMS encryption key. If you ar */
  KmsKeyId?: string;
  /** (Not supported by Neptune) */
  OptionGroupName?: string;
  /** The port number on which the new DB cluster accepts connections. Constraints: Value must be 1150-65535 Default: The same port as the original DB cluster. */
  Port?: number;
  /** The date and time to restore the DB cluster to. Valid Values: Value must be a time in Universal Coordinated Time (UTC) format Constraints: Must be before the latest restorable time for the DB instance */
  RestoreToTime?: string;
  /** The type of restore to be performed. You can specify one of the following values: full-copy - The new DB cluster is restored as a full copy of the source DB cluster. copy-on-write - The new DB cluster */
  RestoreType?: string;
  /** Contains the scaling configuration of a Neptune Serverless DB cluster. For more information, see Using Amazon Neptune Serverless in the Amazon Neptune User Guide. */
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  /** Specifies the storage type to be associated with the DB cluster. Valid values: standard, iopt1 Default: standard */
  StorageType?: string;
  /** The tags to be applied to the restored DB cluster. */
  Tags?: Tag[];
  /** A value that is set to true to restore the DB cluster to the latest restorable backup time, and false otherwise. Default: false Constraints: Cannot be specified if RestoreToTime parameter is provided. */
  UseLatestRestorableTime?: boolean;
  /** A list of VPC security groups that the new DB cluster belongs to. */
  VpcSecurityGroupIds?: string[];
}

export interface StartDBClusterInput {
  /** The DB cluster identifier of the Neptune DB cluster to be started. This parameter is stored as a lowercase string. */
  DBClusterIdentifier: string;
}

export interface StopDBClusterInput {
  /** The DB cluster identifier of the Neptune DB cluster to be stopped. This parameter is stored as a lowercase string. */
  DBClusterIdentifier: string;
}

export interface SwitchoverGlobalClusterInput {
  /** The identifier of the global database cluster to switch over. This parameter isn't case-sensitive. Constraints: Must match the identifier of an existing global database cluster. */
  GlobalClusterIdentifier: string;
  /** The Amazon Resource Name (ARN) of the secondary Neptune DB cluster that you want to promote to primary for the global database. */
  TargetDbClusterIdentifier: string;
}

/** Neptune service binding for Step Functions SDK integrations. */
export class Neptune {
  constructor() {}

  addRoleToDBCluster<T>(params: AddRoleToDBClusterInput): Promise<T> {
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

  copyDBClusterParameterGroup<T>(params: CopyDBClusterParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  copyDBClusterSnapshot<T>(params: CopyDBClusterSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  copyDBParameterGroup<T>(params: CopyDBParameterGroupInput): Promise<T> {
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

  createDBParameterGroup<T>(params: CreateDBParameterGroupInput): Promise<T> {
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

  deleteDBCluster<T>(params: DeleteDBClusterInput): Promise<T> {
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

  deleteDBParameterGroup<T>(params: DeleteDBParameterGroupInput): Promise<T> {
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

  describeDBInstances<T>(params: DescribeDBInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBParameterGroups<T>(params: DescribeDBParameterGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDBParameters<T>(params: DescribeDBParametersInput): Promise<T> {
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

  describeGlobalClusters<T>(params: DescribeGlobalClustersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeOrderableDBInstanceOptions<T>(params: DescribeOrderableDBInstanceOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePendingMaintenanceActions<T>(params: DescribePendingMaintenanceActionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeValidDBInstanceModifications<T>(params: DescribeValidDBInstanceModificationsInput): Promise<T> {
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

  modifyDBSubnetGroup<T>(params: ModifyDBSubnetGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyEventSubscription<T>(params: ModifyEventSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyGlobalCluster<T>(params: ModifyGlobalClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  promoteReadReplicaDBCluster<T>(params: PromoteReadReplicaDBClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rebootDBInstance<T>(params: RebootDBInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeFromGlobalCluster<T>(params: RemoveFromGlobalClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeRoleFromDBCluster<T>(params: RemoveRoleFromDBClusterInput): Promise<T> {
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

  restoreDBClusterFromSnapshot<T>(params: RestoreDBClusterFromSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  restoreDBClusterToPointInTime<T>(params: RestoreDBClusterToPointInTimeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startDBCluster<T>(params: StartDBClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopDBCluster<T>(params: StopDBClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  switchoverGlobalCluster<T>(params: SwitchoverGlobalClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
