// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface Tag {
  /** The required name of the tag. The string value can be from 1 to 128 Unicode characters in length and can't be prefixed with "aws:" or "rds:". The string can contain only the set of Unicode letters, di */
  Key?: string;
  /** The optional value of the tag. The string value can be from 1 to 256 Unicode characters in length and can't be prefixed with "aws:" or "rds:". The string can contain only the set of Unicode letters, d */
  Value?: string;
}

export interface ServerlessV2ScalingConfiguration {
  /** The minimum number of Amazon DocumentDB capacity units (DCUs) for an instance in an Amazon DocumentDB Serverless cluster. You can specify DCU values in half-step increments, such as 8, 8.5, 9, and so  */
  MinCapacity?: number;
  /** The maximum number of Amazon DocumentDB capacity units (DCUs) for an instance in an Amazon DocumentDB Serverless cluster. You can specify DCU values in half-step increments, such as 32, 32.5, 33, and  */
  MaxCapacity?: number;
}

export interface Filter {
  /** The name of the filter. Filter names are case sensitive. */
  Name: string;
  /** One or more filter values. Filter values are case sensitive. */
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
  /** Specifies the value of the parameter. Must be one or more of the cluster parameter's AllowedValues in CSV format: Valid values are: enabled: The cluster accepts secure connections using TLS version 1. */
  ParameterValue?: string;
  /** Provides a description of the parameter. */
  Description?: string;
  /** Indicates the source of the parameter value. */
  Source?: string;
  /** Specifies the engine-specific parameters type. */
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

/** Represents the input to AddSourceIdentifierToSubscription. */
export interface AddSourceIdentifierToSubscriptionInput {
  /** The identifier of the event source to be added: If the source type is an instance, a DBInstanceIdentifier must be provided. If the source type is a security group, a DBSecurityGroupName must be provid */
  SourceIdentifier: string;
  /** The name of the Amazon DocumentDB event notification subscription that you want to add a source identifier to. */
  SubscriptionName: string;
}

/** Represents the input to AddTagsToResource. */
export interface AddTagsToResourceInput {
  /** The Amazon DocumentDB resource that the tags are added to. This value is an Amazon Resource Name . */
  ResourceName: string;
  /** The tags to be assigned to the Amazon DocumentDB resource. */
  Tags: Tag[];
}

/** Represents the input to ApplyPendingMaintenanceAction. */
export interface ApplyPendingMaintenanceActionInput {
  /** The pending maintenance action to apply to this resource. Valid values: system-update, db-upgrade */
  ApplyAction: string;
  /** A value that specifies the type of opt-in request or undoes an opt-in request. An opt-in request of type immediate can't be undone. Valid values: immediate - Apply the maintenance action immediately.  */
  OptInType: string;
  /** The Amazon Resource Name (ARN) of the resource that the pending maintenance action applies to. */
  ResourceIdentifier: string;
}

/** Represents the input to CopyDBClusterParameterGroup. */
export interface CopyDBClusterParameterGroupInput {
  /** The identifier or Amazon Resource Name (ARN) for the source cluster parameter group. Constraints: Must specify a valid cluster parameter group. If the source cluster parameter group is in the same Ama */
  SourceDBClusterParameterGroupIdentifier: string;
  /** A description for the copied cluster parameter group. */
  TargetDBClusterParameterGroupDescription: string;
  /** The identifier for the copied cluster parameter group. Constraints: Cannot be null, empty, or blank. Must contain from 1 to 255 letters, numbers, or hyphens. The first character must be a letter. Cann */
  TargetDBClusterParameterGroupIdentifier: string;
  /** The tags that are to be assigned to the parameter group. */
  Tags?: Tag[];
}

/** Represents the input to CopyDBClusterSnapshot. */
export interface CopyDBClusterSnapshotInput {
  /** The identifier of the cluster snapshot to copy. This parameter is not case sensitive. Constraints: Must specify a valid cluster snapshot in the available state. If the source cluster snapshot is in th */
  SourceDBClusterSnapshotIdentifier: string;
  /** The identifier of the new cluster snapshot to create from the source cluster snapshot. This parameter is not case sensitive. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens. The fi */
  TargetDBClusterSnapshotIdentifier: string;
  /** Set to true to copy all tags from the source cluster snapshot to the target cluster snapshot, and otherwise false. The default is false. */
  CopyTags?: boolean;
  /** The KMS key ID for an encrypted cluster snapshot. The KMS key ID is the Amazon Resource Name (ARN), KMS key identifier, or the KMS key alias for the KMS encryption key. If you copy an encrypted cluste */
  KmsKeyId?: string;
  /** The URL that contains a Signature Version 4 signed request for theCopyDBClusterSnapshot API action in the Amazon Web Services Region that contains the source cluster snapshot to copy. You must use the */
  PreSignedUrl?: string;
  /** The tags to be assigned to the cluster snapshot. */
  Tags?: Tag[];
}

/** Represents the input to CreateDBCluster. */
export interface CreateDBClusterInput {
  /** The cluster identifier. This parameter is stored as a lowercase string. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens. The first character must be a letter. Cannot end with a hyp */
  DBClusterIdentifier: string;
  /** The name of the database engine to be used for this cluster. Valid values: docdb */
  Engine: string;
  /** A list of Amazon EC2 Availability Zones that instances in the cluster can be created in. */
  AvailabilityZones?: string[];
  /** The number of days for which automated backups are retained. You must specify a minimum value of 1. Default: 1 Constraints: Must be a value from 1 to 35. */
  BackupRetentionPeriod?: number;
  /** The name of the cluster parameter group to associate with this cluster. */
  DBClusterParameterGroupName?: string;
  /** A subnet group to associate with this cluster. Constraints: Must match the name of an existing DBSubnetGroup. Must not be default. Example: mySubnetgroup */
  DBSubnetGroupName?: string;
  /** Specifies whether this cluster can be deleted. If DeletionProtection is enabled, the cluster cannot be deleted unless it is modified and DeletionProtection is disabled. DeletionProtection protects clu */
  DeletionProtection?: boolean;
  /** A list of log types that need to be enabled for exporting to Amazon CloudWatch Logs. You can enable audit logs or profiler logs. For more information, see Auditing Amazon DocumentDB Events and Profili */
  EnableCloudwatchLogsExports?: string[];
  /** The version number of the database engine to use. The --engine-version will default to the latest major engine version. For production workloads, we recommend explicitly declaring this parameter with  */
  EngineVersion?: string;
  /** The cluster identifier of the new global cluster. */
  GlobalClusterIdentifier?: string;
  /** The KMS key identifier for an encrypted cluster. The KMS key identifier is the Amazon Resource Name (ARN) for the KMS encryption key. If you are creating a cluster using the same Amazon Web Services a */
  KmsKeyId?: string;
  /** Specifies whether to manage the master user password with Amazon Web Services Secrets Manager. Constraint: You can't manage the master user password with Amazon Web Services Secrets Manager if MasterU */
  ManageMasterUserPassword?: boolean;
  /** The name of the master user for the cluster. Constraints: Must be from 1 to 63 letters or numbers. The first character must be a letter. Cannot be a reserved word for the chosen database engine. */
  MasterUsername?: string;
  /** The password for the master database user. This password can contain any printable ASCII character except forward slash (/), double quote ("), or the "at" symbol (@). Constraints: Must contain from 8  */
  MasterUserPassword?: string;
  /** The Amazon Web Services KMS key identifier to encrypt a secret that is automatically generated and managed in Amazon Web Services Secrets Manager. This setting is valid only if the master user passwor */
  MasterUserSecretKmsKeyId?: string;
  /** The network type of the cluster. The network type is determined by the DBSubnetGroup specified for the cluster. A DBSubnetGroup can support only the IPv4 protocol or the IPv4 and the IPv6 protocols (D */
  NetworkType?: string;
  /** The port number on which the instances in the cluster accept connections. */
  Port?: number;
  /** The daily time range during which automated backups are created if automated backups are enabled using the BackupRetentionPeriod parameter. The default is a 30-minute window selected at random from an */
  PreferredBackupWindow?: string;
  /** The weekly time range during which system maintenance can occur, in Universal Coordinated Time (UTC). Format: ddd:hh24:mi-ddd:hh24:mi The default is a 30-minute window selected at random from an 8-hou */
  PreferredMaintenanceWindow?: string;
  /** Not currently supported. */
  PreSignedUrl?: string;
  /** Contains the scaling configuration of an Amazon DocumentDB Serverless cluster. */
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  /** Specifies whether the cluster is encrypted. */
  StorageEncrypted?: boolean;
  /** The storage type to associate with the DB cluster. For information on storage types for Amazon DocumentDB clusters, see Cluster storage configurations in the Amazon DocumentDB Developer Guide. Valid v */
  StorageType?: string;
  /** The tags to be assigned to the cluster. */
  Tags?: Tag[];
  /** A list of EC2 VPC security groups to associate with this cluster. */
  VpcSecurityGroupIds?: string[];
}

/** Represents the input of CreateDBClusterParameterGroup. */
export interface CreateDBClusterParameterGroupInput {
  /** The name of the cluster parameter group. Constraints: Must not match the name of an existing DBClusterParameterGroup. This value is stored as a lowercase string. */
  DBClusterParameterGroupName: string;
  /** The cluster parameter group family name. */
  DBParameterGroupFamily: string;
  /** The description for the cluster parameter group. */
  Description: string;
  /** The tags to be assigned to the cluster parameter group. */
  Tags?: Tag[];
}

/** Represents the input of CreateDBClusterSnapshot. */
export interface CreateDBClusterSnapshotInput {
  /** The identifier of the cluster to create a snapshot for. This parameter is not case sensitive. Constraints: Must match the identifier of an existing DBCluster. Example: my-cluster */
  DBClusterIdentifier: string;
  /** The identifier of the cluster snapshot. This parameter is stored as a lowercase string. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens. The first character must be a letter. Canno */
  DBClusterSnapshotIdentifier: string;
  /** The tags to be assigned to the cluster snapshot. */
  Tags?: Tag[];
}

/** Represents the input to CreateDBInstance. */
export interface CreateDBInstanceInput {
  /** The identifier of the cluster that the instance will belong to. */
  DBClusterIdentifier: string;
  /** The compute and memory capacity of the instance; for example, db.r5.large. */
  DBInstanceClass: string;
  /** The instance identifier. This parameter is stored as a lowercase string. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens. The first character must be a letter. Cannot end with a hy */
  DBInstanceIdentifier: string;
  /** The name of the database engine to be used for this instance. Valid value: docdb */
  Engine: string;
  /** This parameter does not apply to Amazon DocumentDB. Amazon DocumentDB does not perform minor version upgrades regardless of the value set. Default: false */
  AutoMinorVersionUpgrade?: boolean;
  /** The Amazon EC2 Availability Zone that the instance is created in. Default: A random, system-chosen Availability Zone in the endpoint's Amazon Web Services Region. Example: us-east-1d */
  AvailabilityZone?: string;
  /** The CA certificate identifier to use for the DB instance's server certificate. For more information, see Updating Your Amazon DocumentDB TLS Certificates and Encrypting Data in Transit in the Amazon D */
  CACertificateIdentifier?: string;
  /** A value that indicates whether to copy tags from the DB instance to snapshots of the DB instance. By default, tags are not copied. */
  CopyTagsToSnapshot?: boolean;
  /** A value that indicates whether to enable Performance Insights for the DB Instance. For more information, see Using Amazon Performance Insights. */
  EnablePerformanceInsights?: boolean;
  /** The KMS key identifier for encryption of Performance Insights data. The KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key. If you do not specify a value for Performan */
  PerformanceInsightsKMSKeyId?: string;
  /** The time range each week during which system maintenance can occur, in Universal Coordinated Time (UTC). Format: ddd:hh24:mi-ddd:hh24:mi The default is a 30-minute window selected at random from an 8- */
  PreferredMaintenanceWindow?: string;
  /** A value that specifies the order in which an Amazon DocumentDB replica is promoted to the primary instance after a failure of the existing primary instance. Default: 1 Valid values: 0-15 */
  PromotionTier?: number;
  /** The tags to be assigned to the instance. You can assign up to 10 tags to an instance. */
  Tags?: Tag[];
}

/** Represents the input to CreateDBSubnetGroup. */
export interface CreateDBSubnetGroupInput {
  /** The description for the subnet group. */
  DBSubnetGroupDescription: string;
  /** The name for the subnet group. This value is stored as a lowercase string. Constraints: Must contain no more than 255 letters, numbers, periods, underscores, spaces, or hyphens. Must not be default. E */
  DBSubnetGroupName: string;
  /** The Amazon EC2 subnet IDs for the subnet group. */
  SubnetIds: string[];
  /** The tags to be assigned to the subnet group. */
  Tags?: Tag[];
}

/** Represents the input to CreateEventSubscription. */
export interface CreateEventSubscriptionInput {
  /** The Amazon Resource Name (ARN) of the SNS topic created for event notification. Amazon SNS creates the ARN when you create a topic and subscribe to it. */
  SnsTopicArn: string;
  /** The name of the subscription. Constraints: The name must be fewer than 255 characters. */
  SubscriptionName: string;
  /** A Boolean value; set to true to activate the subscription, set to false to create the subscription but not active it. */
  Enabled?: boolean;
  /** A list of event categories for a SourceType that you want to subscribe to. */
  EventCategories?: string[];
  /** The list of identifiers of the event sources for which events are returned. If not specified, then all sources are included in the response. An identifier must begin with a letter and must contain onl */
  SourceIds?: string[];
  /** The type of source that is generating the events. For example, if you want to be notified of events generated by an instance, you would set this parameter to db-instance. If this value is not specifie */
  SourceType?: string;
  /** The tags to be assigned to the event subscription. */
  Tags?: Tag[];
}

/** Represents the input to CreateGlobalCluster. */
export interface CreateGlobalClusterInput {
  /** The cluster identifier of the new global cluster. */
  GlobalClusterIdentifier: string;
  /** The name for your database of up to 64 alpha-numeric characters. If you do not provide a name, Amazon DocumentDB will not create a database in the global cluster you are creating. */
  DatabaseName?: string;
  /** The deletion protection setting for the new global cluster. The global cluster can't be deleted when deletion protection is enabled. */
  DeletionProtection?: boolean;
  /** The name of the database engine to be used for this cluster. */
  Engine?: string;
  /** The engine version of the global cluster. */
  EngineVersion?: string;
  /** The Amazon Resource Name (ARN) to use as the primary cluster of the global cluster. This parameter is optional. */
  SourceDBClusterIdentifier?: string;
  /** The storage encryption setting for the new global cluster. */
  StorageEncrypted?: boolean;
}

/** Represents the input to DeleteDBCluster. */
export interface DeleteDBClusterInput {
  /** The cluster identifier for the cluster to be deleted. This parameter isn't case sensitive. Constraints: Must match an existing DBClusterIdentifier. */
  DBClusterIdentifier: string;
  /** The cluster snapshot identifier of the new cluster snapshot created when SkipFinalSnapshot is set to false. Specifying this parameter and also setting the SkipFinalShapshot parameter to true results i */
  FinalDBSnapshotIdentifier?: string;
  /** Determines whether a final cluster snapshot is created before the cluster is deleted. If true is specified, no cluster snapshot is created. If false is specified, a cluster snapshot is created before  */
  SkipFinalSnapshot?: boolean;
}

/** Represents the input to DeleteDBClusterParameterGroup. */
export interface DeleteDBClusterParameterGroupInput {
  /** The name of the cluster parameter group. Constraints: Must be the name of an existing cluster parameter group. You can't delete a default cluster parameter group. Cannot be associated with any cluster */
  DBClusterParameterGroupName: string;
}

/** Represents the input to DeleteDBClusterSnapshot. */
export interface DeleteDBClusterSnapshotInput {
  /** The identifier of the cluster snapshot to delete. Constraints: Must be the name of an existing cluster snapshot in the available state. */
  DBClusterSnapshotIdentifier: string;
}

/** Represents the input to DeleteDBInstance. */
export interface DeleteDBInstanceInput {
  /** The instance identifier for the instance to be deleted. This parameter isn't case sensitive. Constraints: Must match the name of an existing instance. */
  DBInstanceIdentifier: string;
}

/** Represents the input to DeleteDBSubnetGroup. */
export interface DeleteDBSubnetGroupInput {
  /** The name of the database subnet group to delete. You can't delete the default subnet group. Constraints: Must match the name of an existing DBSubnetGroup. Must not be default. Example: mySubnetgroup */
  DBSubnetGroupName: string;
}

/** Represents the input to DeleteEventSubscription. */
export interface DeleteEventSubscriptionInput {
  /** The name of the Amazon DocumentDB event notification subscription that you want to delete. */
  SubscriptionName: string;
}

/** Represents the input to DeleteGlobalCluster. */
export interface DeleteGlobalClusterInput {
  /** The cluster identifier of the global cluster being deleted. */
  GlobalClusterIdentifier: string;
}

export interface DescribeCertificatesInput {
  /** The user-supplied certificate identifier. If this parameter is specified, information for only the specified certificate is returned. If this parameter is omitted, a list of up to MaxRecords certifica */
  CertificateIdentifier?: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous DescribeCertificates request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by Max */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
}

/** Represents the input to DescribeDBClusterParameterGroups. */
export interface DescribeDBClusterParameterGroupsInput {
  /** The name of a specific cluster parameter group to return details for. Constraints: If provided, must match the name of an existing DBClusterParameterGroup. */
  DBClusterParameterGroupName?: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token (marker) is included in the response so that the remaining resul */
  MaxRecords?: number;
}

/** Represents the input to DescribeDBClusterParameters. */
export interface DescribeDBClusterParametersInput {
  /** The name of a specific cluster parameter group to return parameter details for. Constraints: If provided, must match the name of an existing DBClusterParameterGroup. */
  DBClusterParameterGroupName: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token (marker) is included in the response so that the remaining resul */
  MaxRecords?: number;
  /** A value that indicates to return only parameters for a specific source. Parameter sources can be engine, service, or customer. */
  Source?: string;
}

/** Represents the input to DescribeDBClusters. */
export interface DescribeDBClustersInput {
  /** The user-provided cluster identifier. If this parameter is specified, information from only the specific cluster is returned. This parameter isn't case sensitive. Constraints: If provided, must match  */
  DBClusterIdentifier?: string;
  /** A filter that specifies one or more clusters to describe. Supported filters: db-cluster-id - Accepts cluster identifiers and cluster Amazon Resource Names (ARNs). The results list only includes inform */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token (marker) is included in the response so that the remaining resul */
  MaxRecords?: number;
}

/** Represents the input to DescribeDBClusterSnapshotAttributes. */
export interface DescribeDBClusterSnapshotAttributesInput {
  /** The identifier for the cluster snapshot to describe the attributes for. */
  DBClusterSnapshotIdentifier: string;
}

/** Represents the input to DescribeDBClusterSnapshots. */
export interface DescribeDBClusterSnapshotsInput {
  /** The ID of the cluster to retrieve the list of cluster snapshots for. This parameter can't be used with the DBClusterSnapshotIdentifier parameter. This parameter is not case sensitive. Constraints: If  */
  DBClusterIdentifier?: string;
  /** A specific cluster snapshot identifier to describe. This parameter can't be used with the DBClusterIdentifier parameter. This value is stored as a lowercase string. Constraints: If provided, must matc */
  DBClusterSnapshotIdentifier?: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** Set to true to include manual cluster snapshots that are public and can be copied or restored by any Amazon Web Services account, and otherwise false. The default is false. */
  IncludePublic?: boolean;
  /** Set to true to include shared manual cluster snapshots from other Amazon Web Services accounts that this Amazon Web Services account has been given permission to copy or restore, and otherwise false.  */
  IncludeShared?: boolean;
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token (marker) is included in the response so that the remaining resul */
  MaxRecords?: number;
  /** The type of cluster snapshots to be returned. You can specify one of the following values: automated - Return all cluster snapshots that Amazon DocumentDB has automatically created for your Amazon Web */
  SnapshotType?: string;
}

/** Represents the input to DescribeDBEngineVersions. */
export interface DescribeDBEngineVersionsInput {
  /** The name of a specific parameter group family to return details for. Constraints: If provided, must match an existing DBParameterGroupFamily. */
  DBParameterGroupFamily?: string;
  /** Indicates that only the default version of the specified engine or engine and major version combination is returned. */
  DefaultOnly?: boolean;
  /** The database engine to return. */
  Engine?: string;
  /** The database engine version to return. Example: 3.6.0 */
  EngineVersion?: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** If this parameter is specified and the requested engine supports the CharacterSetName parameter for CreateDBInstance, the response includes a list of supported character sets for each engine version. */
  ListSupportedCharacterSets?: boolean;
  /** If this parameter is specified and the requested engine supports the TimeZone parameter for CreateDBInstance, the response includes a list of supported time zones for each engine version. */
  ListSupportedTimezones?: boolean;
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token (marker) is included in the response so that the remaining resul */
  MaxRecords?: number;
}

/** Represents the input to DescribeDBInstances. */
export interface DescribeDBInstancesInput {
  /** The user-provided instance identifier. If this parameter is specified, information from only the specific instance is returned. This parameter isn't case sensitive. Constraints: If provided, must matc */
  DBInstanceIdentifier?: string;
  /** A filter that specifies one or more instances to describe. Supported filters: db-cluster-id - Accepts cluster identifiers and cluster Amazon Resource Names (ARNs). The results list includes only the i */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token (marker) is included in the response so that the remaining resul */
  MaxRecords?: number;
}

/** Represents the input to DescribeDBSubnetGroups. */
export interface DescribeDBSubnetGroupsInput {
  /** The name of the subnet group to return details for. */
  DBSubnetGroupName?: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token (marker) is included in the response so that the remaining resul */
  MaxRecords?: number;
}

/** Represents the input to DescribeEngineDefaultClusterParameters. */
export interface DescribeEngineDefaultClusterParametersInput {
  /** The name of the cluster parameter group family to return the engine parameter information for. */
  DBParameterGroupFamily: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token (marker) is included in the response so that the remaining resul */
  MaxRecords?: number;
}

/** Represents the input to DescribeEventCategories. */
export interface DescribeEventCategoriesInput {
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** The type of source that is generating the events. Valid values: db-instance, db-parameter-group, db-security-group */
  SourceType?: string;
}

/** Represents the input to DescribeEvents. */
export interface DescribeEventsInput {
  /** The number of minutes to retrieve events for. Default: 60 */
  Duration?: number;
  /** The end of the time interval for which to retrieve events, specified in ISO 8601 format. Example: 2009-07-08T18:00Z */
  EndTime?: string;
  /** A list of event categories that trigger notifications for an event notification subscription. */
  EventCategories?: string[];
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token (marker) is included in the response so that the remaining resul */
  MaxRecords?: number;
  /** The identifier of the event source for which events are returned. If not specified, then all sources are included in the response. Constraints: If SourceIdentifier is provided, SourceType must also be */
  SourceIdentifier?: string;
  /** The event source to retrieve events for. If no value is specified, all events are returned. */
  SourceType?: 'db-instance' | 'db-parameter-group' | 'db-security-group' | 'db-snapshot' | 'db-cluster' | 'db-cluster-snapshot';
  /** The beginning of the time interval to retrieve events for, specified in ISO 8601 format. Example: 2009-07-08T18:00Z */
  StartTime?: string;
}

/** Represents the input to DescribeEventSubscriptions. */
export interface DescribeEventSubscriptionsInput {
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token (marker) is included in the response so that the remaining resul */
  MaxRecords?: number;
  /** The name of the Amazon DocumentDB event notification subscription that you want to describe. */
  SubscriptionName?: string;
}

export interface DescribeGlobalClustersInput {
  /** A filter that specifies one or more global DB clusters to describe. Supported filters: db-cluster-id accepts cluster identifiers and cluster Amazon Resource Names (ARNs). The results list will only in */
  Filters?: Filter[];
  /** The user-supplied cluster identifier. If this parameter is specified, information from only the specific cluster is returned. This parameter isn't case-sensitive. */
  GlobalClusterIdentifier?: string;
  /** An optional pagination token provided by a previous DescribeGlobalClusters request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by M */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that you can retr */
  MaxRecords?: number;
}

/** Represents the input to DescribeOrderableDBInstanceOptions. */
export interface DescribeOrderableDBInstanceOptionsInput {
  /** The name of the engine to retrieve instance options for. */
  Engine: string;
  /** The instance class filter value. Specify this parameter to show only the available offerings that match the specified instance class. */
  DBInstanceClass?: string;
  /** The engine version filter value. Specify this parameter to show only the available offerings that match the specified engine version. */
  EngineVersion?: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
  /** The license model filter value. Specify this parameter to show only the available offerings that match the specified license model. */
  LicenseModel?: string;
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token (marker) is included in the response so that the remaining resul */
  MaxRecords?: number;
  /** The virtual private cloud (VPC) filter value. Specify this parameter to show only the available VPC or non-VPC offerings. */
  Vpc?: boolean;
}

/** Represents the input to DescribePendingMaintenanceActions. */
export interface DescribePendingMaintenanceActionsInput {
  /** A filter that specifies one or more resources to return pending maintenance actions for. Supported filters: db-cluster-id - Accepts cluster identifiers and cluster Amazon Resource Names (ARNs). The re */
  Filters?: Filter[];
  /** An optional pagination token provided by a previous request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by MaxRecords. */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token (marker) is included in the response so that the remaining resul */
  MaxRecords?: number;
  /** The ARN of a resource to return pending maintenance actions for. */
  ResourceIdentifier?: string;
}

/** Represents the input to FailoverDBCluster. */
export interface FailoverDBClusterInput {
  /** A cluster identifier to force a failover for. This parameter is not case sensitive. Constraints: Must match the identifier of an existing DBCluster. */
  DBClusterIdentifier?: string;
  /** The name of the instance to promote to the primary instance. You must specify the instance identifier for an Amazon DocumentDB replica in the cluster. For example, mydbcluster-replica1. */
  TargetDBInstanceIdentifier?: string;
}

export interface FailoverGlobalClusterInput {
  /** The identifier of the Amazon DocumentDB global cluster to apply this operation. The identifier is the unique key assigned by the user when the cluster is created. In other words, it's the name of the  */
  GlobalClusterIdentifier: string;
  /** The identifier of the secondary Amazon DocumentDB cluster that you want to promote to the primary for the global cluster. Use the Amazon Resource Name (ARN) for the identifier so that Amazon DocumentD */
  TargetDbClusterIdentifier: string;
  /** Specifies whether to allow data loss for this global cluster operation. Allowing data loss triggers a global failover operation. If you don't specify AllowDataLoss, the global cluster operation defaul */
  AllowDataLoss?: boolean;
  /** Specifies whether to switch over this global database cluster. Constraints: Can't be specified together with the AllowDataLoss parameter. */
  Switchover?: boolean;
}

/** Represents the input to ListTagsForResource. */
export interface ListTagsForResourceInput {
  /** The Amazon DocumentDB resource with tags to be listed. This value is an Amazon Resource Name (ARN). */
  ResourceName: string;
  /** This parameter is not currently supported. */
  Filters?: Filter[];
}

/** Represents the input to ModifyDBCluster. */
export interface ModifyDBClusterInput {
  /** The cluster identifier for the cluster that is being modified. This parameter is not case sensitive. Constraints: Must match the identifier of an existing DBCluster. */
  DBClusterIdentifier: string;
  /** A value that indicates whether major version upgrades are allowed. Constraints: You must allow major version upgrades when specifying a value for the EngineVersion parameter that is a different major  */
  AllowMajorVersionUpgrade?: boolean;
  /** A value that specifies whether the changes in this request and any pending changes are asynchronously applied as soon as possible, regardless of the PreferredMaintenanceWindow setting for the cluster. */
  ApplyImmediately?: boolean;
  /** The number of days for which automated backups are retained. You must specify a minimum value of 1. Default: 1 Constraints: Must be a value from 1 to 35. */
  BackupRetentionPeriod?: number;
  /** The configuration setting for the log types to be enabled for export to Amazon CloudWatch Logs for a specific instance or cluster. The EnableLogTypes and DisableLogTypes arrays determine which logs ar */
  CloudwatchLogsExportConfiguration?: CloudwatchLogsExportConfiguration;
  /** The name of the cluster parameter group to use for the cluster. */
  DBClusterParameterGroupName?: string;
  /** Specifies whether this cluster can be deleted. If DeletionProtection is enabled, the cluster cannot be deleted unless it is modified and DeletionProtection is disabled. DeletionProtection protects clu */
  DeletionProtection?: boolean;
  /** The version number of the database engine to which you want to upgrade. Changing this parameter results in an outage. The change is applied during the next maintenance window unless ApplyImmediately i */
  EngineVersion?: string;
  /** Specifies whether to manage the master user password with Amazon Web Services Secrets Manager. If the cluster doesn't manage the master user password with Amazon Web Services Secrets Manager, you can  */
  ManageMasterUserPassword?: boolean;
  /** The password for the master database user. This password can contain any printable ASCII character except forward slash (/), double quote ("), or the "at" symbol (@). Constraints: Must contain from 8  */
  MasterUserPassword?: string;
  /** The Amazon Web Services KMS key identifier to encrypt a secret that is automatically generated and managed in Amazon Web Services Secrets Manager. This setting is valid only if both of the following c */
  MasterUserSecretKmsKeyId?: string;
  /** The network type of the cluster. The network type is determined by the DBSubnetGroup specified for the cluster. A DBSubnetGroup can support only the IPv4 protocol or the IPv4 and the IPv6 protocols (D */
  NetworkType?: string;
  /** The new cluster identifier for the cluster when renaming a cluster. This value is stored as a lowercase string. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens. The first character */
  NewDBClusterIdentifier?: string;
  /** The port number on which the cluster accepts connections. Constraints: Must be a value from 1150 to 65535. Default: The same port as the original cluster. */
  Port?: number;
  /** The daily time range during which automated backups are created if automated backups are enabled, using the BackupRetentionPeriod parameter. The default is a 30-minute window selected at random from a */
  PreferredBackupWindow?: string;
  /** The weekly time range during which system maintenance can occur, in Universal Coordinated Time (UTC). Format: ddd:hh24:mi-ddd:hh24:mi The default is a 30-minute window selected at random from an 8-hou */
  PreferredMaintenanceWindow?: string;
  /** Specifies whether to rotate the secret managed by Amazon Web Services Secrets Manager for the master user password. This setting is valid only if the master user password is managed by Amazon Document */
  RotateMasterUserPassword?: boolean;
  /** Contains the scaling configuration of an Amazon DocumentDB Serverless cluster. */
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  /** The storage type to associate with the DB cluster. For information on storage types for Amazon DocumentDB clusters, see Cluster storage configurations in the Amazon DocumentDB Developer Guide. Valid v */
  StorageType?: string;
  /** A list of virtual private cloud (VPC) security groups that the cluster will belong to. */
  VpcSecurityGroupIds?: string[];
}

/** Represents the input to ModifyDBClusterParameterGroup. */
export interface ModifyDBClusterParameterGroupInput {
  /** The name of the cluster parameter group to modify. */
  DBClusterParameterGroupName: string;
  /** A list of parameters in the cluster parameter group to modify. */
  Parameters: Parameter[];
}

/** Represents the input to ModifyDBClusterSnapshotAttribute. */
export interface ModifyDBClusterSnapshotAttributeInput {
  /** The name of the cluster snapshot attribute to modify. To manage authorization for other Amazon Web Services accounts to copy or restore a manual cluster snapshot, set this value to restore. */
  AttributeName: string;
  /** The identifier for the cluster snapshot to modify the attributes for. */
  DBClusterSnapshotIdentifier: string;
  /** A list of cluster snapshot attributes to add to the attribute specified by AttributeName. To authorize other Amazon Web Services accounts to copy or restore a manual cluster snapshot, set this list to */
  ValuesToAdd?: string[];
  /** A list of cluster snapshot attributes to remove from the attribute specified by AttributeName. To remove authorization for other Amazon Web Services accounts to copy or restore a manual cluster snapsh */
  ValuesToRemove?: string[];
}

/** Represents the input to ModifyDBInstance. */
export interface ModifyDBInstanceInput {
  /** The instance identifier. This value is stored as a lowercase string. Constraints: Must match the identifier of an existing DBInstance. */
  DBInstanceIdentifier: string;
  /** Specifies whether the modifications in this request and any pending modifications are asynchronously applied as soon as possible, regardless of the PreferredMaintenanceWindow setting for the instance. */
  ApplyImmediately?: boolean;
  /** This parameter does not apply to Amazon DocumentDB. Amazon DocumentDB does not perform minor version upgrades regardless of the value set. */
  AutoMinorVersionUpgrade?: boolean;
  /** Indicates the certificate that needs to be associated with the instance. */
  CACertificateIdentifier?: string;
  /** Specifies whether the DB instance is restarted when you rotate your SSL/TLS certificate. By default, the DB instance is restarted when you rotate your SSL/TLS certificate. The certificate is not updat */
  CertificateRotationRestart?: boolean;
  /** A value that indicates whether to copy all tags from the DB instance to snapshots of the DB instance. By default, tags are not copied. */
  CopyTagsToSnapshot?: boolean;
  /** The new compute and memory capacity of the instance; for example, db.r5.large. Not all instance classes are available in all Amazon Web Services Regions. If you modify the instance class, an outage oc */
  DBInstanceClass?: string;
  /** A value that indicates whether to enable Performance Insights for the DB Instance. For more information, see Using Amazon Performance Insights. */
  EnablePerformanceInsights?: boolean;
  /** The new instance identifier for the instance when renaming an instance. When you change the instance identifier, an instance reboot occurs immediately if you set Apply Immediately to true. It occurs d */
  NewDBInstanceIdentifier?: string;
  /** The KMS key identifier for encryption of Performance Insights data. The KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key. If you do not specify a value for Performan */
  PerformanceInsightsKMSKeyId?: string;
  /** The weekly time range (in UTC) during which system maintenance can occur, which might result in an outage. Changing this parameter doesn't result in an outage except in the following situation, and th */
  PreferredMaintenanceWindow?: string;
  /** A value that specifies the order in which an Amazon DocumentDB replica is promoted to the primary instance after a failure of the existing primary instance. Default: 1 Valid values: 0-15 */
  PromotionTier?: number;
}

/** Represents the input to ModifyDBSubnetGroup. */
export interface ModifyDBSubnetGroupInput {
  /** The name for the subnet group. This value is stored as a lowercase string. You can't modify the default subnet group. Constraints: Must match the name of an existing DBSubnetGroup. Must not be default */
  DBSubnetGroupName: string;
  /** The Amazon EC2 subnet IDs for the subnet group. */
  SubnetIds: string[];
  /** The description for the subnet group. */
  DBSubnetGroupDescription?: string;
}

/** Represents the input to ModifyEventSubscription. */
export interface ModifyEventSubscriptionInput {
  /** The name of the Amazon DocumentDB event notification subscription. */
  SubscriptionName: string;
  /** A Boolean value; set to true to activate the subscription. */
  Enabled?: boolean;
  /** A list of event categories for a SourceType that you want to subscribe to. */
  EventCategories?: string[];
  /** The Amazon Resource Name (ARN) of the SNS topic created for event notification. The ARN is created by Amazon SNS when you create a topic and subscribe to it. */
  SnsTopicArn?: string;
  /** The type of source that is generating the events. For example, if you want to be notified of events generated by an instance, set this parameter to db-instance. If this value is not specified, all eve */
  SourceType?: string;
}

/** Represents the input to ModifyGlobalCluster. */
export interface ModifyGlobalClusterInput {
  /** The identifier for the global cluster being modified. This parameter isn't case-sensitive. Constraints: Must match the identifier of an existing global cluster. */
  GlobalClusterIdentifier: string;
  /** Indicates if the global cluster has deletion protection enabled. The global cluster can't be deleted when deletion protection is enabled. */
  DeletionProtection?: boolean;
  /** The new identifier for a global cluster when you modify a global cluster. This value is stored as a lowercase string. Must contain from 1 to 63 letters, numbers, or hyphens The first character must be */
  NewGlobalClusterIdentifier?: string;
}

/** Represents the input to RebootDBInstance. */
export interface RebootDBInstanceInput {
  /** The instance identifier. This parameter is stored as a lowercase string. Constraints: Must match the identifier of an existing DBInstance. */
  DBInstanceIdentifier: string;
  /** When true, the reboot is conducted through a Multi-AZ failover. Constraint: You can't specify true if the instance is not configured for Multi-AZ. */
  ForceFailover?: boolean;
}

/** Represents the input to RemoveFromGlobalCluster. */
export interface RemoveFromGlobalClusterInput {
  /** The Amazon Resource Name (ARN) identifying the cluster that was detached from the Amazon DocumentDB global cluster. */
  DbClusterIdentifier: string;
  /** The cluster identifier to detach from the Amazon DocumentDB global cluster. */
  GlobalClusterIdentifier: string;
}

/** Represents the input to RemoveSourceIdentifierFromSubscription. */
export interface RemoveSourceIdentifierFromSubscriptionInput {
  /** The source identifier to be removed from the subscription, such as the instance identifier for an instance, or the name of a security group. */
  SourceIdentifier: string;
  /** The name of the Amazon DocumentDB event notification subscription that you want to remove a source identifier from. */
  SubscriptionName: string;
}

/** Represents the input to RemoveTagsFromResource. */
export interface RemoveTagsFromResourceInput {
  /** The Amazon DocumentDB resource that the tags are removed from. This value is an Amazon Resource Name (ARN). */
  ResourceName: string;
  /** The tag key (name) of the tag to be removed. */
  TagKeys: string[];
}

/** Represents the input to ResetDBClusterParameterGroup. */
export interface ResetDBClusterParameterGroupInput {
  /** The name of the cluster parameter group to reset. */
  DBClusterParameterGroupName: string;
  /** A list of parameter names in the cluster parameter group to reset to the default values. You can't use this parameter if the ResetAllParameters parameter is set to true. */
  Parameters?: Parameter[];
  /** A value that is set to true to reset all parameters in the cluster parameter group to their default values, and false otherwise. You can't use this parameter if there is a list of parameter names spec */
  ResetAllParameters?: boolean;
}

/** Represents the input to RestoreDBClusterFromSnapshot. */
export interface RestoreDBClusterFromSnapshotInput {
  /** The name of the cluster to create from the snapshot or cluster snapshot. This parameter isn't case sensitive. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens. The first character m */
  DBClusterIdentifier: string;
  /** The database engine to use for the new cluster. Default: The same as source. Constraint: Must be compatible with the engine of the source. */
  Engine: string;
  /** The identifier for the snapshot or cluster snapshot to restore from. You can use either the name or the Amazon Resource Name (ARN) to specify a cluster snapshot. However, you can use only the ARN to s */
  SnapshotIdentifier: string;
  /** Provides the list of Amazon EC2 Availability Zones that instances in the restored DB cluster can be created in. */
  AvailabilityZones?: string[];
  /** The name of the DB cluster parameter group to associate with this DB cluster. Type: String. Required: No. If this argument is omitted, the default DB cluster parameter group is used. If supplied, must */
  DBClusterParameterGroupName?: string;
  /** The name of the subnet group to use for the new cluster. Constraints: If provided, must match the name of an existing DBSubnetGroup. Example: mySubnetgroup */
  DBSubnetGroupName?: string;
  /** Specifies whether this cluster can be deleted. If DeletionProtection is enabled, the cluster cannot be deleted unless it is modified and DeletionProtection is disabled. DeletionProtection protects clu */
  DeletionProtection?: boolean;
  /** A list of log types that must be enabled for exporting to Amazon CloudWatch Logs. */
  EnableCloudwatchLogsExports?: string[];
  /** The version of the database engine to use for the new cluster. */
  EngineVersion?: string;
  /** The KMS key identifier to use when restoring an encrypted cluster from a DB snapshot or cluster snapshot. The KMS key identifier is the Amazon Resource Name (ARN) for the KMS encryption key. If you ar */
  KmsKeyId?: string;
  /** The network type of the cluster. The network type is determined by the DBSubnetGroup specified for the cluster. A DBSubnetGroup can support only the IPv4 protocol or the IPv4 and the IPv6 protocols (D */
  NetworkType?: string;
  /** The port number on which the new cluster accepts connections. Constraints: Must be a value from 1150 to 65535. Default: The same port as the original cluster. */
  Port?: number;
  /** Contains the scaling configuration of an Amazon DocumentDB Serverless cluster. */
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  /** The storage type to associate with the DB cluster. For information on storage types for Amazon DocumentDB clusters, see Cluster storage configurations in the Amazon DocumentDB Developer Guide. Valid v */
  StorageType?: string;
  /** The tags to be assigned to the restored cluster. */
  Tags?: Tag[];
  /** A list of virtual private cloud (VPC) security groups that the new cluster will belong to. */
  VpcSecurityGroupIds?: string[];
}

/** Represents the input to RestoreDBClusterToPointInTime. */
export interface RestoreDBClusterToPointInTimeInput {
  /** The name of the new cluster to be created. Constraints: Must contain from 1 to 63 letters, numbers, or hyphens. The first character must be a letter. Cannot end with a hyphen or contain two consecutiv */
  DBClusterIdentifier: string;
  /** The identifier of the source cluster from which to restore. Constraints: Must match the identifier of an existing DBCluster. */
  SourceDBClusterIdentifier: string;
  /** The subnet group name to use for the new cluster. Constraints: If provided, must match the name of an existing DBSubnetGroup. Example: mySubnetgroup */
  DBSubnetGroupName?: string;
  /** Specifies whether this cluster can be deleted. If DeletionProtection is enabled, the cluster cannot be deleted unless it is modified and DeletionProtection is disabled. DeletionProtection protects clu */
  DeletionProtection?: boolean;
  /** A list of log types that must be enabled for exporting to Amazon CloudWatch Logs. */
  EnableCloudwatchLogsExports?: string[];
  /** The KMS key identifier to use when restoring an encrypted cluster from an encrypted cluster. The KMS key identifier is the Amazon Resource Name (ARN) for the KMS encryption key. If you are restoring a */
  KmsKeyId?: string;
  /** The network type of the cluster. The network type is determined by the DBSubnetGroup specified for the cluster. A DBSubnetGroup can support only the IPv4 protocol or the IPv4 and the IPv6 protocols (D */
  NetworkType?: string;
  /** The port number on which the new cluster accepts connections. Constraints: Must be a value from 1150 to 65535. Default: The default port for the engine. */
  Port?: number;
  /** The date and time to restore the cluster to. Valid values: A time in Universal Coordinated Time (UTC) format. Constraints: Must be before the latest restorable time for the instance. Must be specified */
  RestoreToTime?: string;
  /** The type of restore to be performed. You can specify one of the following values: full-copy - The new DB cluster is restored as a full copy of the source DB cluster. copy-on-write - The new DB cluster */
  RestoreType?: string;
  /** Contains the scaling configuration of an Amazon DocumentDB Serverless cluster. */
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  /** The storage type to associate with the DB cluster. For information on storage types for Amazon DocumentDB clusters, see Cluster storage configurations in the Amazon DocumentDB Developer Guide. Valid v */
  StorageType?: string;
  /** The tags to be assigned to the restored cluster. */
  Tags?: Tag[];
  /** A value that is set to true to restore the cluster to the latest restorable backup time, and false otherwise. Default: false Constraints: Cannot be specified if the RestoreToTime parameter is provided */
  UseLatestRestorableTime?: boolean;
  /** A list of VPC security groups that the new cluster belongs to. */
  VpcSecurityGroupIds?: string[];
}

export interface StartDBClusterInput {
  /** The identifier of the cluster to restart. Example: docdb-2019-05-28-15-24-52 */
  DBClusterIdentifier: string;
}

export interface StopDBClusterInput {
  /** The identifier of the cluster to stop. Example: docdb-2019-05-28-15-24-52 */
  DBClusterIdentifier: string;
}

export interface SwitchoverGlobalClusterInput {
  /** The identifier of the Amazon DocumentDB global database cluster to switch over. The identifier is the unique key assigned by the user when the cluster is created. In other words, it's the name of the  */
  GlobalClusterIdentifier: string;
  /** The identifier of the secondary Amazon DocumentDB cluster to promote to the new primary for the global database cluster. Use the Amazon Resource Name (ARN) for the identifier so that Amazon DocumentDB */
  TargetDbClusterIdentifier: string;
}

/** DocDB service binding for Step Functions SDK integrations. */
export class DocDB {
  constructor() {}

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

  createDBCluster<T>(params: CreateDBClusterInput): Promise<T> {
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

  deleteDBClusterParameterGroup<T>(params: DeleteDBClusterParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDBClusterSnapshot<T>(params: DeleteDBClusterSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDBInstance<T>(params: DeleteDBInstanceInput): Promise<T> {
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

  describeCertificates<T>(params: DescribeCertificatesInput): Promise<T> {
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

  describeDBSubnetGroups<T>(params: DescribeDBSubnetGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEngineDefaultClusterParameters<T>(params: DescribeEngineDefaultClusterParametersInput): Promise<T> {
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

  modifyDBClusterParameterGroup<T>(params: ModifyDBClusterParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyDBClusterSnapshotAttribute<T>(params: ModifyDBClusterSnapshotAttributeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyDBInstance<T>(params: ModifyDBInstanceInput): Promise<T> {
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

  rebootDBInstance<T>(params: RebootDBInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeFromGlobalCluster<T>(params: RemoveFromGlobalClusterInput): Promise<T> {
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
