// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface DeleteClusterSnapshotMessage {
  /** The unique identifier of the manual snapshot to be deleted. Constraints: Must be the name of an existing snapshot that is in the available, failed, or cancelled state. */
  SnapshotIdentifier: string;
  /** The unique identifier of the cluster the snapshot was created from. This parameter is required if your IAM user has a policy containing a snapshot resource element that specifies anything other than * */
  SnapshotClusterIdentifier?: string;
}

export interface Tag {
  /** The key, or name, for the resource tag. */
  Key?: string;
  /** The value for the resource tag. */
  Value?: string;
}

export interface AuthorizedTokenIssuer {
  /** The ARN for the authorized token issuer for integrating Amazon Redshift with IDC Identity Center. */
  TrustedTokenIssuerArn?: string;
  /** The list of audiences for the authorized token issuer for integrating Amazon Redshift with IDC Identity Center. */
  AuthorizedAudiencesList?: any[];
}

export interface ResizeClusterMessage {
  /** The unique identifier for the cluster to resize. */
  ClusterIdentifier: string;
  /** The new cluster type for the specified cluster. */
  ClusterType?: string;
  /** The new node type for the nodes you are adding. If not specified, the cluster's current node type is used. */
  NodeType?: string;
  /** The new number of nodes for the cluster. If not specified, the cluster's current number of nodes is used. */
  NumberOfNodes?: number;
  /** A boolean value indicating whether the resize operation is using the classic resize process. If you don't provide this parameter or set the value to false, the resize type is elastic. */
  Classic?: boolean;
  /** The identifier of the reserved node. */
  ReservedNodeId?: string;
  /** The identifier of the target reserved node offering. */
  TargetReservedNodeOfferingId?: string;
}

export interface PauseClusterMessage {
  /** The identifier of the cluster to be paused. */
  ClusterIdentifier: string;
}

export interface ResumeClusterMessage {
  /** The identifier of the cluster to be resumed. */
  ClusterIdentifier: string;
}

export interface ScheduledActionType {
  /** An action that runs a ResizeCluster API operation. */
  ResizeCluster?: ResizeClusterMessage;
  /** An action that runs a PauseCluster API operation. */
  PauseCluster?: PauseClusterMessage;
  /** An action that runs a ResumeCluster API operation. */
  ResumeCluster?: ResumeClusterMessage;
}

export interface ServerlessIdentifier {
  /** The unique identifier for the serverless namespace. */
  NamespaceIdentifier: string;
  /** The unique identifier for the workgroup associated with the serverless namespace. */
  WorkgroupIdentifier: string;
}

export interface ProvisionedIdentifier {
  /** The unique identifier for the provisioned cluster. */
  ClusterIdentifier: string;
}

export interface SnapshotSortingEntity {
  /** The category for sorting the snapshots. */
  Attribute: 'SOURCE_TYPE' | 'TOTAL_SIZE' | 'CREATE_TIME';
  /** The order for listing the attributes. */
  SortOrder?: 'ASC' | 'DESC';
}

export interface DescribeIntegrationsFilter {
  /** Specifies the type of integration filter. */
  Name: 'integration-arn' | 'source-arn' | 'source-types' | 'status';
  /** Specifies the values to filter on. */
  Values: any[];
}

export interface NodeConfigurationOptionsFilter {
  /** The name of the element to filter. */
  Name?: 'NodeType' | 'NumberOfNodes' | 'EstimatedDiskUtilizationPercent' | 'Mode';
  /** The filter operator. If filter Name is NodeType only the 'in' operator is supported. Provide one value to evaluate for 'eq', 'lt', 'le', 'gt', and 'ge'. Provide two values to evaluate for 'between'. P */
  Operator?: 'eq' | 'lt' | 'gt' | 'le' | 'ge' | 'in' | 'between';
  /** List of values. Compare Name using Operator to Values. If filter Name is NumberOfNodes, then values can range from 0 to 200. If filter Name is EstimatedDiskUtilizationPercent, then values can range fr */
  Values?: any[];
}

export interface ScheduledActionFilter {
  /** The type of element to filter. */
  Name: 'cluster-identifier' | 'iam-role';
  /** List of values. Compare if the value (of type defined by Name) equals an item in the list of scheduled actions. */
  Values: any[];
}

export interface Parameter {
  /** The name of the parameter. */
  ParameterName?: string;
  /** The value of the parameter. If ParameterName is wlm_json_configuration, then the maximum size of ParameterValue is 8000 characters. */
  ParameterValue?: string;
  /** A description of the parameter. */
  Description?: string;
  /** The source of the parameter value, such as "engine-default" or "user". */
  Source?: string;
  /** The data type of the parameter. */
  DataType?: string;
  /** The valid range of values for the parameter. */
  AllowedValues?: string;
  /** Specifies how to apply the WLM configuration parameter. Some properties can be applied dynamically, while other properties require that any associated clusters be rebooted for the configuration change */
  ApplyType?: 'static' | 'dynamic';
  /** If true, the parameter can be modified. Some parameters have security or operational implications that prevent them from being changed. */
  IsModifiable?: boolean;
  /** The earliest engine version to which the parameter can apply. */
  MinimumEngineVersion?: string;
}

export interface AcceptReservedNodeExchangeInput {
  /** A string representing the node identifier of the DC1 Reserved Node to be exchanged. */
  ReservedNodeId: string;
  /** The unique identifier of the DC2 Reserved Node offering to be used for the exchange. You can obtain the value for the parameter by calling GetReservedNodeExchangeOfferings */
  TargetReservedNodeOfferingId: string;
}

export interface AddPartnerInput {
  /** The Amazon Web Services account ID that owns the cluster. */
  AccountId: string;
  /** The cluster identifier of the cluster that receives data from the partner. */
  ClusterIdentifier: string;
  /** The name of the database that receives data from the partner. */
  DatabaseName: string;
  /** The name of the partner that is authorized to send data. */
  PartnerName: string;
}

export interface AssociateDataShareConsumerInput {
  /** The Amazon Resource Name (ARN) of the datashare that the consumer is to use. */
  DataShareArn: string;
  /** If set to true, allows write operations for a datashare. */
  AllowWrites?: boolean;
  /** A value that specifies whether the datashare is associated with the entire account. */
  AssociateEntireAccount?: boolean;
  /** The Amazon Resource Name (ARN) of the consumer namespace associated with the datashare. */
  ConsumerArn?: string;
  /** From a datashare consumer account, associates a datashare with all existing and future namespaces in the specified Amazon Web Services Region. */
  ConsumerRegion?: string;
}

export interface AuthorizeClusterSecurityGroupIngressInput {
  /** The name of the security group to which the ingress rule is added. */
  ClusterSecurityGroupName: string;
  /** The IP range to be added the Amazon Redshift security group. */
  CIDRIP?: string;
  /** The EC2 security group to be added the Amazon Redshift security group. */
  EC2SecurityGroupName?: string;
  /** The Amazon Web Services account number of the owner of the security group specified by the EC2SecurityGroupName parameter. The Amazon Web Services Access Key ID is not an acceptable value. Example: 11 */
  EC2SecurityGroupOwnerId?: string;
}

export interface AuthorizeDataShareInput {
  /** The identifier of the data consumer that is authorized to access the datashare. This identifier is an Amazon Web Services account ID or a keyword, such as ADX. */
  ConsumerIdentifier: string;
  /** The Amazon Resource Name (ARN) of the datashare namespace that producers are to authorize sharing for. */
  DataShareArn: string;
  /** If set to true, allows write operations for a datashare. */
  AllowWrites?: boolean;
}

export interface AuthorizeEndpointAccessInput {
  /** The Amazon Web Services account ID to grant access to. */
  Account: string;
  /** The cluster identifier of the cluster to grant access to. */
  ClusterIdentifier?: string;
  /** The virtual private cloud (VPC) identifiers to grant access to. */
  VpcIds?: string[];
}

export interface AuthorizeSnapshotAccessInput {
  /** The identifier of the Amazon Web Services account authorized to restore the specified snapshot. To share a snapshot with Amazon Web Services Support, specify amazon-redshift-support. */
  AccountWithRestoreAccess: string;
  /** The Amazon Resource Name (ARN) of the snapshot to authorize access to. */
  SnapshotArn?: string;
  /** The identifier of the cluster the snapshot was created from. If the snapshot to access doesn't exist and the associated IAM policy doesn't allow access to all (*) snapshots - This parameter is require */
  SnapshotClusterIdentifier?: string;
  /** The identifier of the snapshot the account is authorized to restore. */
  SnapshotIdentifier?: string;
}

export interface BatchDeleteClusterSnapshotsInput {
  /** A list of identifiers for the snapshots that you want to delete. */
  Identifiers: DeleteClusterSnapshotMessage[];
}

export interface BatchModifyClusterSnapshotsInput {
  /** A list of snapshot identifiers you want to modify. */
  SnapshotIdentifierList: string[];
  /** A boolean value indicating whether to override an exception if the retention period has passed. */
  Force?: boolean;
  /** The number of days that a manual snapshot is retained. If you specify the value -1, the manual snapshot is retained indefinitely. The number must be either -1 or an integer between 1 and 3,653. If you */
  ManualSnapshotRetentionPeriod?: number;
}

export interface CancelResizeInput {
  /** The unique identifier for the cluster that you want to cancel a resize operation for. */
  ClusterIdentifier: string;
}

export interface CopyClusterSnapshotInput {
  /** The identifier for the source snapshot. Constraints: Must be the identifier for a valid automated snapshot whose state is available. */
  SourceSnapshotIdentifier: string;
  /** The identifier given to the new manual snapshot. Constraints: Cannot be null, empty, or blank. Must contain from 1 to 255 alphanumeric characters or hyphens. First character must be a letter. Cannot e */
  TargetSnapshotIdentifier: string;
  /** The number of days that a manual snapshot is retained. If the value is -1, the manual snapshot is retained indefinitely. The value must be either -1 or an integer between 1 and 3,653. The default valu */
  ManualSnapshotRetentionPeriod?: number;
  /** The identifier of the cluster the source snapshot was created from. This parameter is required if your IAM user has a policy containing a snapshot resource element that specifies anything other than * */
  SourceSnapshotClusterIdentifier?: string;
}

export interface CreateAuthenticationProfileInput {
  /** The content of the authentication profile in JSON format. The maximum length of the JSON string is determined by a quota for your account. */
  AuthenticationProfileContent: string;
  /** The name of the authentication profile to be created. */
  AuthenticationProfileName: string;
}

export interface CreateClusterInput {
  /** A unique identifier for the cluster. You use this identifier to refer to the cluster for any subsequent cluster operations such as deleting or modifying. The identifier also appears in the Amazon Reds */
  ClusterIdentifier: string;
  /** The user name associated with the admin user account for the cluster that is being created. Constraints: Must be 1 - 128 alphanumeric characters or hyphens. The user name can't be PUBLIC. Must contain */
  MasterUsername: string;
  /** The node type to be provisioned for the cluster. For information about node types, go to Working with Clusters in the Amazon Redshift Cluster Management Guide. Valid Values: dc2.large | dc2.8xlarge |  */
  NodeType: string;
  /** Reserved. */
  AdditionalInfo?: string;
  /** If true, major version upgrades can be applied during the maintenance window to the Amazon Redshift engine that is running on the cluster. When a new major version of the Amazon Redshift engine is rel */
  AllowVersionUpgrade?: boolean;
  /** This parameter is retired. It does not set the AQUA configuration status. Amazon Redshift automatically determines whether to use AQUA (Advanced Query Accelerator). */
  AquaConfigurationStatus?: 'enabled' | 'disabled' | 'auto';
  /** The number of days that automated snapshots are retained. If the value is 0, automated snapshots are disabled. Even if automated snapshots are disabled, you can still create manual snapshots when you  */
  AutomatedSnapshotRetentionPeriod?: number;
  /** The EC2 Availability Zone (AZ) in which you want Amazon Redshift to provision the cluster. For example, if you have several EC2 instances running in a specific Availability Zone, then you might want t */
  AvailabilityZone?: string;
  /** The option to enable relocation for an Amazon Redshift cluster between Availability Zones after the cluster is created. */
  AvailabilityZoneRelocation?: boolean;
  /** The name of the Glue data catalog that will be associated with the cluster enabled with Amazon Redshift federated permissions. Constraints: Must contain at least one lowercase letter. Can only contain */
  CatalogName?: string;
  /** The name of the parameter group to be associated with this cluster. Default: The default Amazon Redshift cluster parameter group. For information about the default parameter group, go to Working with  */
  ClusterParameterGroupName?: string;
  /** A list of security groups to be associated with this cluster. Default: The default cluster security group for Amazon Redshift. */
  ClusterSecurityGroups?: string[];
  /** The name of a cluster subnet group to be associated with this cluster. If this parameter is not provided the resulting cluster will be deployed outside virtual private cloud (VPC). */
  ClusterSubnetGroupName?: string;
  /** The type of the cluster. When cluster type is specified as single-node, the NumberOfNodes parameter is not required. multi-node, the NumberOfNodes parameter is required. Valid Values: multi-node | sin */
  ClusterType?: string;
  /** The version of the Amazon Redshift engine software that you want to deploy on the cluster. The version selected runs on all the nodes in the cluster. Constraints: Only version 1.0 is currently availab */
  ClusterVersion?: string;
  /** The name of the first database to be created when the cluster is created. To create additional databases after the cluster is created, connect to the cluster with a SQL client and use SQL commands to  */
  DBName?: string;
  /** The Amazon Resource Name (ARN) for the IAM role that was set as default for the cluster when the cluster was created. */
  DefaultIamRoleArn?: string;
  /** The Elastic IP (EIP) address for the cluster. Constraints: The cluster must be provisioned in EC2-VPC and publicly-accessible through an Internet gateway. Don't specify the Elastic IP address for a pu */
  ElasticIp?: string;
  /** If true, the data in the cluster is encrypted at rest. If you set the value on this parameter to false, the request will fail. Default: true */
  Encrypted?: boolean;
  /** An option that specifies whether to create the cluster with enhanced VPC routing enabled. To create a cluster that uses enhanced VPC routing, the cluster must be in a VPC. For more information, see En */
  EnhancedVpcRouting?: boolean;
  /** If true, allocates additional compute resources for running automatic optimization operations. Default: false */
  ExtraComputeForAutomaticOptimization?: boolean;
  /** Specifies the name of the HSM client certificate the Amazon Redshift cluster uses to retrieve the data encryption keys stored in an HSM. */
  HsmClientCertificateIdentifier?: string;
  /** Specifies the name of the HSM configuration that contains the information the Amazon Redshift cluster can use to retrieve and store keys in an HSM. */
  HsmConfigurationIdentifier?: string;
  /** A list of Identity and Access Management (IAM) roles that can be used by the cluster to access other Amazon Web Services services. You must supply the IAM roles in their Amazon Resource Name (ARN) for */
  IamRoles?: string[];
  /** The IP address types that the cluster supports. Possible values are ipv4 and dualstack. */
  IpAddressType?: string;
  /** The Key Management Service (KMS) key ID of the encryption key that you want to use to encrypt data in the cluster. */
  KmsKeyId?: string;
  /** A flag that specifies whether to load sample data once the cluster is created. */
  LoadSampleData?: string;
  /** An optional parameter for the name of the maintenance track for the cluster. If you don't provide a maintenance track name, the cluster is assigned to the current track. */
  MaintenanceTrackName?: string;
  /** If true, Amazon Redshift uses Secrets Manager to manage this cluster's admin credentials. You can't use MasterUserPassword if ManageMasterPassword is true. If ManageMasterPassword is false or not set, */
  ManageMasterPassword?: boolean;
  /** The default number of days to retain a manual snapshot. If the value is -1, the snapshot is retained indefinitely. This setting doesn't change the retention period of existing snapshots. The value mus */
  ManualSnapshotRetentionPeriod?: number;
  /** The ID of the Key Management Service (KMS) key used to encrypt and store the cluster's admin credentials secret. You can only use this parameter if ManageMasterPassword is true. */
  MasterPasswordSecretKmsKeyId?: string;
  /** The password associated with the admin user account for the cluster that is being created. You can't use MasterUserPassword if ManageMasterPassword is true. Constraints: Must be between 8 and 64 chara */
  MasterUserPassword?: string;
  /** If true, Amazon Redshift will deploy the cluster in two Availability Zones (AZ). */
  MultiAZ?: boolean;
  /** The number of compute nodes in the cluster. This parameter is required when the ClusterType parameter is specified as multi-node. For information about determining how many nodes you need, go to Worki */
  NumberOfNodes?: number;
  /** The port number on which the cluster accepts incoming connections. The cluster is accessible only via the JDBC and ODBC connection strings. Part of the connection string requires the port on which the */
  Port?: number;
  /** The weekly time range (in UTC) during which automated cluster maintenance can occur. Format: ddd:hh24:mi-ddd:hh24:mi Default: A 30-minute window selected at random from an 8-hour block of time per reg */
  PreferredMaintenanceWindow?: string;
  /** If true, the cluster can be accessed from a public network. Default: false */
  PubliclyAccessible?: boolean;
  /** The Amazon resource name (ARN) of the Amazon Redshift IAM Identity Center application. */
  RedshiftIdcApplicationArn?: string;
  /** A unique identifier for the snapshot schedule. */
  SnapshotScheduleIdentifier?: string;
  /** A list of tag instances. */
  Tags?: Tag[];
  /** A list of Virtual Private Cloud (VPC) security groups to be associated with the cluster. Default: The default VPC security group is associated with the cluster. */
  VpcSecurityGroupIds?: string[];
}

export interface CreateClusterParameterGroupInput {
  /** A description of the parameter group. */
  Description: string;
  /** The Amazon Redshift engine version to which the cluster parameter group applies. The cluster engine version determines the set of parameters. To get a list of valid parameter group family names, you c */
  ParameterGroupFamily: string;
  /** The name of the cluster parameter group. Constraints: Must be 1 to 255 alphanumeric characters or hyphens First character must be a letter. Cannot end with a hyphen or contain two consecutive hyphens. */
  ParameterGroupName: string;
  /** A list of tag instances. */
  Tags?: Tag[];
}

export interface CreateClusterSecurityGroupInput {
  /** The name for the security group. Amazon Redshift stores the value as a lowercase string. Constraints: Must contain no more than 255 alphanumeric characters or hyphens. Must not be "Default". Must be u */
  ClusterSecurityGroupName: string;
  /** A description for the security group. */
  Description: string;
  /** A list of tag instances. */
  Tags?: Tag[];
}

export interface CreateClusterSnapshotInput {
  /** The cluster identifier for which you want a snapshot. */
  ClusterIdentifier: string;
  /** A unique identifier for the snapshot that you are requesting. This identifier must be unique for all snapshots within the Amazon Web Services account. Constraints: Cannot be null, empty, or blank Must */
  SnapshotIdentifier: string;
  /** The number of days that a manual snapshot is retained. If the value is -1, the manual snapshot is retained indefinitely. The value must be either -1 or an integer between 1 and 3,653. The default valu */
  ManualSnapshotRetentionPeriod?: number;
  /** A list of tag instances. */
  Tags?: Tag[];
}

export interface CreateClusterSubnetGroupInput {
  /** The name for the subnet group. Amazon Redshift stores the value as a lowercase string. Constraints: Must contain no more than 255 alphanumeric characters or hyphens. Must not be "Default". Must be uni */
  ClusterSubnetGroupName: string;
  /** A description for the subnet group. */
  Description: string;
  /** An array of VPC subnet IDs. A maximum of 20 subnets can be modified in a single request. */
  SubnetIds: string[];
  /** A list of tag instances. */
  Tags?: Tag[];
}

export interface CreateCustomDomainAssociationInput {
  /** The cluster identifier that the custom domain is associated with. */
  ClusterIdentifier: string;
  /** The certificate Amazon Resource Name (ARN) for the custom domain name association. */
  CustomDomainCertificateArn: string;
  /** The custom domain name for a custom domain association. */
  CustomDomainName: string;
}

export interface CreateEndpointAccessInput {
  /** The Redshift-managed VPC endpoint name. An endpoint name must contain 1-30 characters. Valid characters are A-Z, a-z, 0-9, and hyphen(-). The first character must be a letter. The name can't contain t */
  EndpointName: string;
  /** The subnet group from which Amazon Redshift chooses the subnet to deploy the endpoint. */
  SubnetGroupName: string;
  /** The cluster identifier of the cluster to access. */
  ClusterIdentifier?: string;
  /** The Amazon Web Services account ID of the owner of the cluster. This is only required if the cluster is in another Amazon Web Services account. */
  ResourceOwner?: string;
  /** The security group that defines the ports, protocols, and sources for inbound traffic that you are authorizing into your endpoint. */
  VpcSecurityGroupIds?: string[];
}

export interface CreateEventSubscriptionInput {
  /** The Amazon Resource Name (ARN) of the Amazon SNS topic used to transmit the event notifications. The ARN is created by Amazon SNS when you create a topic and subscribe to it. */
  SnsTopicArn: string;
  /** The name of the event subscription to be created. Constraints: Cannot be null, empty, or blank. Must contain from 1 to 255 alphanumeric characters or hyphens. First character must be a letter. Cannot  */
  SubscriptionName: string;
  /** A boolean value; set to true to activate the subscription, and set to false to create the subscription but not activate it. */
  Enabled?: boolean;
  /** Specifies the Amazon Redshift event categories to be published by the event notification subscription. Values: configuration, management, monitoring, security, pending */
  EventCategories?: string[];
  /** Specifies the Amazon Redshift event severity to be published by the event notification subscription. Values: ERROR, INFO */
  Severity?: string;
  /** A list of one or more identifiers of Amazon Redshift source objects. All of the objects must be of the same type as was specified in the source type parameter. The event subscription will return only  */
  SourceIds?: string[];
  /** The type of source that will be generating the events. For example, if you want to be notified of events generated by a cluster, you would set this parameter to cluster. If this value is not specified */
  SourceType?: string;
  /** A list of tag instances. */
  Tags?: Tag[];
}

export interface CreateHsmClientCertificateInput {
  /** The identifier to be assigned to the new HSM client certificate that the cluster will use to connect to the HSM to use the database encryption keys. */
  HsmClientCertificateIdentifier: string;
  /** A list of tag instances. */
  Tags?: Tag[];
}

export interface CreateHsmConfigurationInput {
  /** A text description of the HSM configuration to be created. */
  Description: string;
  /** The identifier to be assigned to the new Amazon Redshift HSM configuration. */
  HsmConfigurationIdentifier: string;
  /** The IP address that the Amazon Redshift cluster must use to access the HSM. */
  HsmIpAddress: string;
  /** The name of the partition in the HSM where the Amazon Redshift clusters will store their database encryption keys. */
  HsmPartitionName: string;
  /** The password required to access the HSM partition. */
  HsmPartitionPassword: string;
  /** The HSMs public certificate file. When using Cloud HSM, the file name is server.pem. */
  HsmServerPublicCertificate: string;
  /** A list of tag instances. */
  Tags?: Tag[];
}

export interface CreateIntegrationInput {
  /** The name of the integration. */
  IntegrationName: string;
  /** The Amazon Resource Name (ARN) of the database to use as the source for replication. */
  SourceArn: string;
  /** The Amazon Resource Name (ARN) of the Amazon Redshift data warehouse to use as the target for replication. */
  TargetArn: string;
  /** An optional set of non-secret key–value pairs that contains additional contextual information about the data. For more information, see Encryption context in the Amazon Web Services Key Management Ser */
  AdditionalEncryptionContext?: Record<string, string>;
  /** A description of the integration. */
  Description?: string;
  /** An Key Management Service (KMS) key identifier for the key to use to encrypt the integration. If you don't specify an encryption key, the default Amazon Web Services owned key is used. */
  KMSKeyId?: string;
  /** A list of tags. */
  TagList?: Tag[];
}

export interface CreateRedshiftIdcApplicationInput {
  /** The IAM role ARN for the Amazon Redshift IAM Identity Center application instance. It has the required permissions to be assumed and invoke the IDC Identity Center API. */
  IamRoleArn: string;
  /** The display name for the Amazon Redshift IAM Identity Center application instance. It appears in the console. */
  IdcDisplayName: string;
  /** The Amazon resource name (ARN) of the IAM Identity Center instance where Amazon Redshift creates a new managed application. */
  IdcInstanceArn: string;
  /** The name of the Redshift application in IAM Identity Center. */
  RedshiftIdcApplicationName: string;
  /** The type of application being created. Valid values are None or Lakehouse. Use Lakehouse to enable Amazon Redshift federated permissions on cluster. */
  ApplicationType?: 'None' | 'Lakehouse';
  /** The token issuer list for the Amazon Redshift IAM Identity Center application instance. */
  AuthorizedTokenIssuerList?: AuthorizedTokenIssuer[];
  /** The namespace for the Amazon Redshift IAM Identity Center application instance. It determines which managed application verifies the connection token. */
  IdentityNamespace?: string;
  /** A collection of service integrations for the Redshift IAM Identity Center application. */
  ServiceIntegrations?: { LakeFormation?: any[] } | { S3AccessGrants?: any[] } | { Redshift?: any[] }[];
  /** A list of tags keys that Redshift Identity Center applications copy to IAM Identity Center. For each input key, the tag corresponding to the key-value pair is propagated. */
  SsoTagKeys?: string[];
  /** A list of tags. */
  Tags?: Tag[];
}

export interface CreateScheduledActionInput {
  /** The IAM role to assume to run the target action. For more information about this parameter, see ScheduledAction. */
  IamRole: string;
  /** The schedule in at( ) or cron( ) format. For more information about this parameter, see ScheduledAction. */
  Schedule: string;
  /** The name of the scheduled action. The name must be unique within an account. For more information about this parameter, see ScheduledAction. */
  ScheduledActionName: string;
  /** A JSON format string of the Amazon Redshift API operation with input parameters. For more information about this parameter, see ScheduledAction. */
  TargetAction: ScheduledActionType;
  /** If true, the schedule is enabled. If false, the scheduled action does not trigger. For more information about state of the scheduled action, see ScheduledAction. */
  Enable?: boolean;
  /** The end time in UTC of the scheduled action. After this time, the scheduled action does not trigger. For more information about this parameter, see ScheduledAction. */
  EndTime?: string;
  /** The description of the scheduled action. */
  ScheduledActionDescription?: string;
  /** The start time in UTC of the scheduled action. Before this time, the scheduled action does not trigger. For more information about this parameter, see ScheduledAction. */
  StartTime?: string;
}

/** The result of the CreateSnapshotCopyGrant action. */
export interface CreateSnapshotCopyGrantInput {
  /** The name of the snapshot copy grant. This name must be unique in the region for the Amazon Web Services account. Constraints: Must contain from 1 to 63 alphanumeric characters or hyphens. Alphabetic c */
  SnapshotCopyGrantName: string;
  /** The unique identifier of the encrypted symmetric key to which to grant Amazon Redshift permission. If no key is specified, the default key is used. */
  KmsKeyId?: string;
  /** A list of tag instances. */
  Tags?: Tag[];
}

export interface CreateSnapshotScheduleInput {
  DryRun?: boolean;
  NextInvocations?: number;
  /** The definition of the snapshot schedule. The definition is made up of schedule expressions, for example "cron(30 12 *)" or "rate(12 hours)". */
  ScheduleDefinitions?: string[];
  /** The description of the snapshot schedule. */
  ScheduleDescription?: string;
  /** A unique identifier for a snapshot schedule. Only alphanumeric characters are allowed for the identifier. */
  ScheduleIdentifier?: string;
  /** An optional set of tags you can use to search for the schedule. */
  Tags?: Tag[];
}

/** Contains the output from the CreateTags action. */
export interface CreateTagsInput {
  /** The Amazon Resource Name (ARN) to which you want to add the tag or tags. For example, arn:aws:redshift:us-east-2:123456789:cluster:t1. */
  ResourceName: string;
  /** One or more name/value pairs to add as tags to the specified resource. Each tag name is passed in with the parameter Key and the corresponding value is passed in with the parameter Value. The Key and  */
  Tags: Tag[];
}

export interface CreateUsageLimitInput {
  /** The limit amount. If time-based, this amount is in minutes. If data-based, this amount is in terabytes (TB). The value must be a positive number. */
  Amount: number;
  /** The identifier of the cluster that you want to limit usage. */
  ClusterIdentifier: string;
  /** The Amazon Redshift feature that you want to limit. */
  FeatureType: 'spectrum' | 'concurrency-scaling' | 'cross-region-datasharing' | 'extra-compute-for-automatic-optimization';
  /** The type of limit. Depending on the feature type, this can be based on a time duration or data size. If FeatureType is spectrum, then LimitType must be data-scanned. If FeatureType is concurrency-scal */
  LimitType: 'time' | 'data-scanned';
  /** The action that Amazon Redshift takes when the limit is reached. The default is log. For more information about this parameter, see UsageLimit. */
  BreachAction?: 'log' | 'emit-metric' | 'disable';
  /** The time period that the amount applies to. A weekly period begins on Sunday. The default is monthly. */
  Period?: 'daily' | 'weekly' | 'monthly';
  /** A list of tag instances. */
  Tags?: Tag[];
}

export interface DeauthorizeDataShareInput {
  /** The identifier of the data consumer that is to have authorization removed from the datashare. This identifier is an Amazon Web Services account ID or a keyword, such as ADX. */
  ConsumerIdentifier: string;
  /** The namespace Amazon Resource Name (ARN) of the datashare to remove authorization from. */
  DataShareArn: string;
}

export interface DeleteAuthenticationProfileInput {
  /** The name of the authentication profile to delete. */
  AuthenticationProfileName: string;
}

export interface DeleteClusterInput {
  /** The identifier of the cluster to be deleted. Constraints: Must contain lowercase characters. Must contain from 1 to 63 alphanumeric characters or hyphens. First character must be a letter. Cannot end  */
  ClusterIdentifier: string;
  /** The identifier of the final snapshot that is to be created immediately before deleting the cluster. If this parameter is provided, SkipFinalClusterSnapshot must be false. Constraints: Must be 1 to 255 */
  FinalClusterSnapshotIdentifier?: string;
  /** The number of days that a manual snapshot is retained. If the value is -1, the manual snapshot is retained indefinitely. The value must be either -1 or an integer between 1 and 3,653. The default valu */
  FinalClusterSnapshotRetentionPeriod?: number;
  /** Determines whether a final snapshot of the cluster is created before Amazon Redshift deletes the cluster. If true, a final cluster snapshot is not created. If false, a final cluster snapshot is create */
  SkipFinalClusterSnapshot?: boolean;
}

export interface DeleteClusterParameterGroupInput {
  /** The name of the parameter group to be deleted. Constraints: Must be the name of an existing cluster parameter group. Cannot delete a default cluster parameter group. */
  ParameterGroupName: string;
}

export interface DeleteClusterSecurityGroupInput {
  /** The name of the cluster security group to be deleted. */
  ClusterSecurityGroupName: string;
}

export interface DeleteClusterSnapshotInput {
  /** The unique identifier of the manual snapshot to be deleted. Constraints: Must be the name of an existing snapshot that is in the available, failed, or cancelled state. */
  SnapshotIdentifier: string;
  /** The unique identifier of the cluster the snapshot was created from. This parameter is required if your IAM user has a policy containing a snapshot resource element that specifies anything other than * */
  SnapshotClusterIdentifier?: string;
}

export interface DeleteClusterSubnetGroupInput {
  /** The name of the cluster subnet group name to be deleted. */
  ClusterSubnetGroupName: string;
}

export interface DeleteCustomDomainAssociationInput {
  /** The identifier of the cluster to delete a custom domain association for. */
  ClusterIdentifier: string;
  /** The custom domain name for the custom domain association. */
  CustomDomainName: string;
}

export interface DeleteEndpointAccessInput {
  /** The Redshift-managed VPC endpoint to delete. */
  EndpointName: string;
}

export interface DeleteEventSubscriptionInput {
  /** The name of the Amazon Redshift event notification subscription to be deleted. */
  SubscriptionName: string;
}

export interface DeleteHsmClientCertificateInput {
  /** The identifier of the HSM client certificate to be deleted. */
  HsmClientCertificateIdentifier: string;
}

export interface DeleteHsmConfigurationInput {
  /** The identifier of the Amazon Redshift HSM configuration to be deleted. */
  HsmConfigurationIdentifier: string;
}

export interface DeleteIntegrationInput {
  /** The unique identifier of the integration to delete. */
  IntegrationArn: string;
}

export interface DeletePartnerInput {
  /** The Amazon Web Services account ID that owns the cluster. */
  AccountId: string;
  /** The cluster identifier of the cluster that receives data from the partner. */
  ClusterIdentifier: string;
  /** The name of the database that receives data from the partner. */
  DatabaseName: string;
  /** The name of the partner that is authorized to send data. */
  PartnerName: string;
}

export interface DeleteRedshiftIdcApplicationInput {
  /** The ARN for a deleted Amazon Redshift IAM Identity Center application. */
  RedshiftIdcApplicationArn: string;
}

export interface DeleteResourcePolicyInput {
  /** The Amazon Resource Name (ARN) of the resource of which its resource policy is deleted. */
  ResourceArn: string;
}

export interface DeleteScheduledActionInput {
  /** The name of the scheduled action to delete. */
  ScheduledActionName: string;
}

/** The result of the DeleteSnapshotCopyGrant action. */
export interface DeleteSnapshotCopyGrantInput {
  /** The name of the snapshot copy grant to delete. */
  SnapshotCopyGrantName: string;
}

export interface DeleteSnapshotScheduleInput {
  /** A unique identifier of the snapshot schedule to delete. */
  ScheduleIdentifier: string;
}

/** Contains the output from the DeleteTags action. */
export interface DeleteTagsInput {
  /** The Amazon Resource Name (ARN) from which you want to remove the tag or tags. For example, arn:aws:redshift:us-east-2:123456789:cluster:t1. */
  ResourceName: string;
  /** The tag key that you want to delete. */
  TagKeys: string[];
}

export interface DeleteUsageLimitInput {
  /** The identifier of the usage limit to delete. */
  UsageLimitId: string;
}

export interface DeregisterNamespaceInput {
  /** An array containing the ID of the consumer account that you want to deregister the cluster or serverless namespace from. */
  ConsumerIdentifiers: string[];
  /** The unique identifier of the cluster or serverless namespace that you want to deregister. */
  NamespaceIdentifier: { ServerlessIdentifier?: ServerlessIdentifier } | { ProvisionedIdentifier?: ProvisionedIdentifier };
}

export interface DescribeAccountAttributesInput {
  /** A list of attribute names. */
  AttributeNames?: string[];
}

export interface DescribeAuthenticationProfilesInput {
  /** The name of the authentication profile to describe. If not specified then all authentication profiles owned by the account are listed. */
  AuthenticationProfileName?: string;
}

export interface DescribeClusterDbRevisionsInput {
  /** A unique identifier for a cluster whose ClusterDbRevisions you are requesting. This parameter is case sensitive. All clusters defined for an account are returned by default. */
  ClusterIdentifier?: string;
  /** An optional parameter that specifies the starting point for returning a set of response records. When the results of a DescribeClusterDbRevisions request exceed the value specified in MaxRecords, Amaz */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in the marker field of the respon */
  MaxRecords?: number;
}

export interface DescribeClusterParameterGroupsInput {
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeClusterParameterGroups request exceed the value specified in MaxRecords, Amaz */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** The name of a specific parameter group for which to return details. By default, details about all parameter groups and the default parameter group are returned. */
  ParameterGroupName?: string;
  /** A tag key or keys for which you want to return all matching cluster parameter groups that are associated with the specified key or keys. For example, suppose that you have parameter groups that are ta */
  TagKeys?: string[];
  /** A tag value or values for which you want to return all matching cluster parameter groups that are associated with the specified tag value or values. For example, suppose that you have parameter groups */
  TagValues?: string[];
}

export interface DescribeClusterParametersInput {
  /** The name of a cluster parameter group for which to return details. */
  ParameterGroupName: string;
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeClusterParameters request exceed the value specified in MaxRecords, Amazon We */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** The parameter types to return. Specify user to show parameters that are different form the default. Similarly, specify engine-default to show parameters that are the same as the default parameter grou */
  Source?: string;
}

export interface DescribeClustersInput {
  /** The unique identifier of a cluster whose properties you are requesting. This parameter is case sensitive. The default is that all clusters defined for an account are returned. */
  ClusterIdentifier?: string;
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeClusters request exceed the value specified in MaxRecords, Amazon Web Service */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** A tag key or keys for which you want to return all matching clusters that are associated with the specified key or keys. For example, suppose that you have clusters that are tagged with keys called ow */
  TagKeys?: string[];
  /** A tag value or values for which you want to return all matching clusters that are associated with the specified tag value or values. For example, suppose that you have clusters that are tagged with va */
  TagValues?: string[];
}

export interface DescribeClusterSecurityGroupsInput {
  /** The name of a cluster security group for which you are requesting details. You must specify either the Marker parameter or a ClusterSecurityGroupName parameter, but not both. Example: securitygroup1 */
  ClusterSecurityGroupName?: string;
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeClusterSecurityGroups request exceed the value specified in MaxRecords, Amazo */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** A tag key or keys for which you want to return all matching cluster security groups that are associated with the specified key or keys. For example, suppose that you have security groups that are tagg */
  TagKeys?: string[];
  /** A tag value or values for which you want to return all matching cluster security groups that are associated with the specified tag value or values. For example, suppose that you have security groups t */
  TagValues?: string[];
}

export interface DescribeClusterSnapshotsInput {
  /** A value that indicates whether to return snapshots only for an existing cluster. You can perform table-level restore only by using a snapshot of an existing cluster, that is, a cluster that has not be */
  ClusterExists?: boolean;
  /** The identifier of the cluster which generated the requested snapshots. */
  ClusterIdentifier?: string;
  /** A time value that requests only snapshots created at or before the specified time. The time value is specified in ISO 8601 format. For more information about ISO 8601, go to the ISO8601 Wikipedia page */
  EndTime?: string;
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeClusterSnapshots request exceed the value specified in MaxRecords, Amazon Web */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** The Amazon Web Services account used to create or copy the snapshot. Use this field to filter the results to snapshots owned by a particular account. To describe snapshots you own, either specify your */
  OwnerAccount?: string;
  /** The Amazon Resource Name (ARN) of the snapshot associated with the message to describe cluster snapshots. */
  SnapshotArn?: string;
  /** The snapshot identifier of the snapshot about which to return information. */
  SnapshotIdentifier?: string;
  /** The type of snapshots for which you are requesting information. By default, snapshots of all types are returned. Valid Values: automated | manual */
  SnapshotType?: string;
  SortingEntities?: SnapshotSortingEntity[];
  /** A value that requests only snapshots created at or after the specified time. The time value is specified in ISO 8601 format. For more information about ISO 8601, go to the ISO8601 Wikipedia page. Exam */
  StartTime?: string;
  /** A tag key or keys for which you want to return all matching cluster snapshots that are associated with the specified key or keys. For example, suppose that you have snapshots that are tagged with keys */
  TagKeys?: string[];
  /** A tag value or values for which you want to return all matching cluster snapshots that are associated with the specified tag value or values. For example, suppose that you have snapshots that are tagg */
  TagValues?: string[];
}

export interface DescribeClusterSubnetGroupsInput {
  /** The name of the cluster subnet group for which information is requested. */
  ClusterSubnetGroupName?: string;
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeClusterSubnetGroups request exceed the value specified in MaxRecords, Amazon  */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** A tag key or keys for which you want to return all matching cluster subnet groups that are associated with the specified key or keys. For example, suppose that you have subnet groups that are tagged w */
  TagKeys?: string[];
  /** A tag value or values for which you want to return all matching cluster subnet groups that are associated with the specified tag value or values. For example, suppose that you have subnet groups that  */
  TagValues?: string[];
}

export interface DescribeClusterTracksInput {
  /** The name of the maintenance track. */
  MaintenanceTrackName?: string;
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeClusterTracks request exceed the value specified in MaxRecords, Amazon Redshi */
  Marker?: string;
  /** An integer value for the maximum number of maintenance tracks to return. */
  MaxRecords?: number;
}

export interface DescribeClusterVersionsInput {
  /** The name of a specific cluster parameter group family to return details for. Constraints: Must be 1 to 255 alphanumeric characters First character must be a letter Cannot end with a hyphen or contain  */
  ClusterParameterGroupFamily?: string;
  /** The specific cluster version to return. Example: 1.0 */
  ClusterVersion?: string;
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeClusterVersions request exceed the value specified in MaxRecords, Amazon Web  */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
}

export interface DescribeCustomDomainAssociationsInput {
  /** The certificate Amazon Resource Name (ARN) for the custom domain association. */
  CustomDomainCertificateArn?: string;
  /** The custom domain name for the custom domain association. */
  CustomDomainName?: string;
  /** The marker for the custom domain association. */
  Marker?: string;
  /** The maximum records setting for the associated custom domain. */
  MaxRecords?: number;
}

export interface DescribeDataSharesInput {
  /** The Amazon resource name (ARN) of the datashare to describe details of. */
  DataShareArn?: string;
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeDataShares request exceed the value specified in MaxRecords, Amazon Web Servi */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
}

export interface DescribeDataSharesForConsumerInput {
  /** The Amazon Resource Name (ARN) of the consumer namespace that returns in the list of datashares. */
  ConsumerArn?: string;
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeDataSharesForConsumer request exceed the value specified in MaxRecords, Amazo */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** An identifier giving the status of a datashare in the consumer cluster. If this field is specified, Amazon Redshift returns the list of datashares that have the specified status. */
  Status?: 'ACTIVE' | 'AVAILABLE';
}

export interface DescribeDataSharesForProducerInput {
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeDataSharesForProducer request exceed the value specified in MaxRecords, Amazo */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** The Amazon Resource Name (ARN) of the producer namespace that returns in the list of datashares. */
  ProducerArn?: string;
  /** An identifier giving the status of a datashare in the producer. If this field is specified, Amazon Redshift returns the list of datashares that have the specified status. */
  Status?: 'ACTIVE' | 'AUTHORIZED' | 'PENDING_AUTHORIZATION' | 'DEAUTHORIZED' | 'REJECTED';
}

export interface DescribeDefaultClusterParametersInput {
  /** The name of the cluster parameter group family. */
  ParameterGroupFamily: string;
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeDefaultClusterParameters request exceed the value specified in MaxRecords, Am */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
}

export interface DescribeEndpointAccessInput {
  /** The cluster identifier associated with the described endpoint. */
  ClusterIdentifier?: string;
  /** The name of the endpoint to be described. */
  EndpointName?: string;
  /** An optional pagination token provided by a previous DescribeEndpointAccess request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by t */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a Marker is included in the response so that the remainin */
  MaxRecords?: number;
  /** The Amazon Web Services account ID of the owner of the cluster. */
  ResourceOwner?: string;
  /** The virtual private cloud (VPC) identifier with access to the cluster. */
  VpcId?: string;
}

export interface DescribeEndpointAuthorizationInput {
  /** The Amazon Web Services account ID of either the cluster owner (grantor) or grantee. If Grantee parameter is true, then the Account value is of the grantor. */
  Account?: string;
  /** The cluster identifier of the cluster to access. */
  ClusterIdentifier?: string;
  /** Indicates whether to check authorization from a grantor or grantee point of view. If true, Amazon Redshift returns endpoint authorizations that you've been granted. If false (default), checks authoriz */
  Grantee?: boolean;
  /** An optional pagination token provided by a previous DescribeEndpointAuthorization request. If this parameter is specified, the response includes only records beyond the marker, up to the value specifi */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a Marker is included in the response so that the remainin */
  MaxRecords?: number;
}

export interface DescribeEventCategoriesInput {
  /** The source type, such as cluster or parameter group, to which the described event categories apply. Valid values: cluster, cluster-snapshot, cluster-parameter-group, cluster-security-group, and schedu */
  SourceType?: string;
}

export interface DescribeEventsInput {
  /** The number of minutes prior to the time of the request for which to retrieve events. For example, if the request is sent at 18:00 and you specify a duration of 60, then only events which have occurred */
  Duration?: number;
  /** The end of the time interval for which to retrieve events, specified in ISO 8601 format. For more information about ISO 8601, go to the ISO8601 Wikipedia page. Example: 2009-07-08T18:00Z */
  EndTime?: string;
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeEvents request exceed the value specified in MaxRecords, Amazon Web Services  */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** The identifier of the event source for which events will be returned. If this parameter is not specified, then all sources are included in the response. Constraints: If SourceIdentifier is supplied, S */
  SourceIdentifier?: string;
  /** The event source to retrieve events for. If no value is specified, all events are returned. Constraints: If SourceType is supplied, SourceIdentifier must also be provided. Specify cluster when SourceI */
  SourceType?: 'cluster' | 'cluster-parameter-group' | 'cluster-security-group' | 'cluster-snapshot' | 'scheduled-action';
  /** The beginning of the time interval to retrieve events for, specified in ISO 8601 format. For more information about ISO 8601, go to the ISO8601 Wikipedia page. Example: 2009-07-08T18:00Z */
  StartTime?: string;
}

export interface DescribeEventSubscriptionsInput {
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeEventSubscriptions request exceed the value specified in MaxRecords, Amazon W */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** The name of the Amazon Redshift event notification subscription to be described. */
  SubscriptionName?: string;
  /** A tag key or keys for which you want to return all matching event notification subscriptions that are associated with the specified key or keys. For example, suppose that you have subscriptions that a */
  TagKeys?: string[];
  /** A tag value or values for which you want to return all matching event notification subscriptions that are associated with the specified tag value or values. For example, suppose that you have subscrip */
  TagValues?: string[];
}

export interface DescribeHsmClientCertificatesInput {
  /** The identifier of a specific HSM client certificate for which you want information. If no identifier is specified, information is returned for all HSM client certificates owned by your Amazon Web Serv */
  HsmClientCertificateIdentifier?: string;
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeHsmClientCertificates request exceed the value specified in MaxRecords, Amazo */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** A tag key or keys for which you want to return all matching HSM client certificates that are associated with the specified key or keys. For example, suppose that you have HSM client certificates that  */
  TagKeys?: string[];
  /** A tag value or values for which you want to return all matching HSM client certificates that are associated with the specified tag value or values. For example, suppose that you have HSM client certif */
  TagValues?: string[];
}

export interface DescribeHsmConfigurationsInput {
  /** The identifier of a specific Amazon Redshift HSM configuration to be described. If no identifier is specified, information is returned for all HSM configurations owned by your Amazon Web Services acco */
  HsmConfigurationIdentifier?: string;
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeHsmConfigurations request exceed the value specified in MaxRecords, Amazon We */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** A tag key or keys for which you want to return all matching HSM configurations that are associated with the specified key or keys. For example, suppose that you have HSM configurations that are tagged */
  TagKeys?: string[];
  /** A tag value or values for which you want to return all matching HSM configurations that are associated with the specified tag value or values. For example, suppose that you have HSM configurations tha */
  TagValues?: string[];
}

export interface DescribeInboundIntegrationsInput {
  /** The Amazon Resource Name (ARN) of the inbound integration. */
  IntegrationArn?: string;
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeInboundIntegrations request exceed the value specified in MaxRecords, Amazon  */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** The Amazon Resource Name (ARN) of the target of an inbound integration. */
  TargetArn?: string;
}

export interface DescribeIntegrationsInput {
  /** A filter that specifies one or more resources to return. */
  Filters?: DescribeIntegrationsFilter[];
  /** The unique identifier of the integration. */
  IntegrationArn?: string;
  /** An optional pagination token provided by a previous DescribeIntegrations request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified by Max */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
}

export interface DescribeLoggingStatusInput {
  /** The identifier of the cluster from which to get the logging status. Example: examplecluster */
  ClusterIdentifier: string;
}

export interface DescribeNodeConfigurationOptionsInput {
  /** The action type to evaluate for possible node configurations. Specify "restore-cluster" to get configuration combinations based on an existing snapshot. Specify "recommend-node-config" to get configur */
  ActionType: 'restore-cluster' | 'recommend-node-config' | 'resize-cluster';
  /** The identifier of the cluster to evaluate for possible node configurations. */
  ClusterIdentifier?: string;
  /** A set of name, operator, and value items to filter the results. */
  Filters?: NodeConfigurationOptionsFilter[];
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeNodeConfigurationOptions request exceed the value specified in MaxRecords, Am */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** The Amazon Web Services account used to create or copy the snapshot. Required if you are restoring a snapshot you do not own, optional if you own the snapshot. */
  OwnerAccount?: string;
  /** The Amazon Resource Name (ARN) of the snapshot associated with the message to describe node configuration. */
  SnapshotArn?: string;
  /** The identifier of the snapshot to evaluate for possible node configurations. */
  SnapshotIdentifier?: string;
}

export interface DescribeOrderableClusterOptionsInput {
  /** The version filter value. Specify this parameter to show only the available offerings matching the specified version. Default: All versions. Constraints: Must be one of the version returned from Descr */
  ClusterVersion?: string;
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeOrderableClusterOptions request exceed the value specified in MaxRecords, Ama */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** The node type filter value. Specify this parameter to show only the available offerings matching the specified node type. */
  NodeType?: string;
}

export interface DescribePartnersInput {
  /** The Amazon Web Services account ID that owns the cluster. */
  AccountId: string;
  /** The cluster identifier of the cluster whose partner integration is being described. */
  ClusterIdentifier: string;
  /** The name of the database whose partner integration is being described. If database name is not specified, then all databases in the cluster are described. */
  DatabaseName?: string;
  /** The name of the partner that is being described. If partner name is not specified, then all partner integrations are described. */
  PartnerName?: string;
}

export interface DescribeRedshiftIdcApplicationsInput {
  /** A value that indicates the starting point for the next set of response records in a subsequent request. If a value is returned in a response, you can retrieve the next set of records by providing this */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** The ARN for the Redshift application that integrates with IAM Identity Center. */
  RedshiftIdcApplicationArn?: string;
}

export interface DescribeReservedNodeExchangeStatusInput {
  /** An optional pagination token provided by a previous DescribeReservedNodeExchangeStatus request. If this parameter is specified, the response includes only records beyond the marker, up to the value sp */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a Marker field of the response */
  MaxRecords?: number;
  /** The identifier of the reserved-node exchange request. */
  ReservedNodeExchangeRequestId?: string;
  /** The identifier of the source reserved node in a reserved-node exchange request. */
  ReservedNodeId?: string;
}

export interface DescribeReservedNodeOfferingsInput {
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeReservedNodeOfferings request exceed the value specified in MaxRecords, Amazo */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** The unique identifier for the offering. */
  ReservedNodeOfferingId?: string;
}

export interface DescribeReservedNodesInput {
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeReservedNodes request exceed the value specified in MaxRecords, Amazon Web Se */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** Identifier for the node reservation. */
  ReservedNodeId?: string;
}

export interface DescribeResizeInput {
  /** The unique identifier of a cluster whose resize progress you are requesting. This parameter is case-sensitive. By default, resize operations for all clusters defined for an Amazon Web Services account */
  ClusterIdentifier: string;
}

export interface DescribeScheduledActionsInput {
  /** If true, retrieve only active scheduled actions. If false, retrieve only disabled scheduled actions. */
  Active?: boolean;
  /** The end time in UTC of the scheduled action to retrieve. Only active scheduled actions that have invocations before this time are retrieved. */
  EndTime?: string;
  /** List of scheduled action filters. */
  Filters?: ScheduledActionFilter[];
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeScheduledActions request exceed the value specified in MaxRecords, Amazon Web */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** The name of the scheduled action to retrieve. */
  ScheduledActionName?: string;
  /** The start time in UTC of the scheduled actions to retrieve. Only active scheduled actions that have invocations after this time are retrieved. */
  StartTime?: string;
  /** The type of the scheduled actions to retrieve. */
  TargetActionType?: 'ResizeCluster' | 'PauseCluster' | 'ResumeCluster';
}

/** The result of the DescribeSnapshotCopyGrants action. */
export interface DescribeSnapshotCopyGrantsInput {
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeSnapshotCopyGrant request exceed the value specified in MaxRecords, Amazon We */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** The name of the snapshot copy grant. */
  SnapshotCopyGrantName?: string;
  /** A tag key or keys for which you want to return all matching resources that are associated with the specified key or keys. For example, suppose that you have resources tagged with keys called owner and */
  TagKeys?: string[];
  /** A tag value or values for which you want to return all matching resources that are associated with the specified value or values. For example, suppose that you have resources tagged with values called */
  TagValues?: string[];
}

export interface DescribeSnapshotSchedulesInput {
  /** The unique identifier for the cluster whose snapshot schedules you want to view. */
  ClusterIdentifier?: string;
  /** A value that indicates the starting point for the next set of response records in a subsequent request. If a value is returned in a response, you can retrieve the next set of records by providing this */
  Marker?: string;
  /** The maximum number or response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** A unique identifier for a snapshot schedule. */
  ScheduleIdentifier?: string;
  /** The key value for a snapshot schedule tag. */
  TagKeys?: string[];
  /** The value corresponding to the key of the snapshot schedule tag. */
  TagValues?: string[];
}

export interface DescribeTableRestoreStatusInput {
  /** The Amazon Redshift cluster that the table is being restored to. */
  ClusterIdentifier?: string;
  /** An optional pagination token provided by a previous DescribeTableRestoreStatus request. If this parameter is specified, the response includes only records beyond the marker, up to the value specified  */
  Marker?: string;
  /** The maximum number of records to include in the response. If more records exist than the specified MaxRecords value, a pagination token called a marker is included in the response so that the remainin */
  MaxRecords?: number;
  /** The identifier of the table restore request to return status for. If you don't specify a TableRestoreRequestId value, then DescribeTableRestoreStatus returns the status of all in-progress table restor */
  TableRestoreRequestId?: string;
}

export interface DescribeTagsInput {
  /** A value that indicates the starting point for the next set of response records in a subsequent request. If a value is returned in a response, you can retrieve the next set of records by providing this */
  Marker?: string;
  /** The maximum number or response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** The Amazon Resource Name (ARN) for which you want to describe the tag or tags. For example, arn:aws:redshift:us-east-2:123456789:cluster:t1. */
  ResourceName?: string;
  /** The type of resource with which you want to view tags. Valid resource types are: Cluster CIDR/IP EC2 security group Snapshot Cluster security group Subnet group HSM connection HSM certificate Paramete */
  ResourceType?: string;
  /** A tag key or keys for which you want to return all matching resources that are associated with the specified key or keys. For example, suppose that you have resources tagged with keys called owner and */
  TagKeys?: string[];
  /** A tag value or values for which you want to return all matching resources that are associated with the specified value or values. For example, suppose that you have resources tagged with values called */
  TagValues?: string[];
}

export interface DescribeUsageLimitsInput {
  /** The identifier of the cluster for which you want to describe usage limits. */
  ClusterIdentifier?: string;
  /** The feature type for which you want to describe usage limits. */
  FeatureType?: 'spectrum' | 'concurrency-scaling' | 'cross-region-datasharing' | 'extra-compute-for-automatic-optimization';
  /** An optional parameter that specifies the starting point to return a set of response records. When the results of a DescribeUsageLimits request exceed the value specified in MaxRecords, Amazon Web Serv */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** A tag key or keys for which you want to return all matching usage limit objects that are associated with the specified key or keys. For example, suppose that you have parameter groups that are tagged  */
  TagKeys?: string[];
  /** A tag value or values for which you want to return all matching usage limit objects that are associated with the specified tag value or values. For example, suppose that you have parameter groups that */
  TagValues?: string[];
  /** The identifier of the usage limit to describe. */
  UsageLimitId?: string;
}

export interface DisableLoggingInput {
  /** The identifier of the cluster on which logging is to be stopped. Example: examplecluster */
  ClusterIdentifier: string;
}

export interface DisableSnapshotCopyInput {
  /** The unique identifier of the source cluster that you want to disable copying of snapshots to a destination region. Constraints: Must be the valid name of an existing cluster that has cross-region snap */
  ClusterIdentifier: string;
}

export interface DisassociateDataShareConsumerInput {
  /** The Amazon Resource Name (ARN) of the datashare to remove association for. */
  DataShareArn: string;
  /** The Amazon Resource Name (ARN) of the consumer namespace that association for the datashare is removed from. */
  ConsumerArn?: string;
  /** From a datashare consumer account, removes association of a datashare from all the existing and future namespaces in the specified Amazon Web Services Region. */
  ConsumerRegion?: string;
  /** A value that specifies whether association for the datashare is removed from the entire account. */
  DisassociateEntireAccount?: boolean;
}

export interface EnableLoggingInput {
  /** The identifier of the cluster on which logging is to be started. Example: examplecluster */
  ClusterIdentifier: string;
  /** The name of an existing S3 bucket where the log files are to be stored. Constraints: Must be in the same region as the cluster The cluster must have read bucket and put object permissions */
  BucketName?: string;
  /** The log destination type. An enum with possible values of s3 and cloudwatch. */
  LogDestinationType?: 's3' | 'cloudwatch';
  /** The collection of exported log types. Possible values are connectionlog, useractivitylog, and userlog. */
  LogExports?: string[];
  /** The prefix applied to the log file names. Valid characters are any letter from any language, any whitespace character, any numeric character, and the following characters: underscore (_), period (.),  */
  S3KeyPrefix?: string;
}

export interface EnableSnapshotCopyInput {
  /** The unique identifier of the source cluster to copy snapshots from. Constraints: Must be the valid name of an existing cluster that does not already have cross-region snapshot copy enabled. */
  ClusterIdentifier: string;
  /** The destination Amazon Web Services Region that you want to copy snapshots to. Constraints: Must be the name of a valid Amazon Web Services Region. For more information, see Regions and Endpoints in t */
  DestinationRegion: string;
  /** The number of days to retain newly copied snapshots in the destination Amazon Web Services Region after they are copied from the source Amazon Web Services Region. If the value is -1, the manual snaps */
  ManualSnapshotRetentionPeriod?: number;
  /** The number of days to retain automated snapshots in the destination region after they are copied from the source region. Default: 7. Constraints: Must be at least 1 and no more than 35. */
  RetentionPeriod?: number;
  /** The name of the snapshot copy grant to use when snapshots of an Amazon Web Services KMS-encrypted cluster are copied to the destination region. */
  SnapshotCopyGrantName?: string;
}

export interface FailoverPrimaryComputeInput {
  /** The unique identifier of the cluster for which the primary compute unit will be failed over to another Availability Zone. */
  ClusterIdentifier: string;
}

/** The request parameters to get cluster credentials. */
export interface GetClusterCredentialsInput {
  /** The name of a database user. If a user name matching DbUser exists in the database, the temporary user credentials have the same permissions as the existing user. If DbUser doesn't exist in the databa */
  DbUser: string;
  /** Create a database user with the name specified for the user named in DbUser if one does not exist. */
  AutoCreate?: boolean;
  /** The unique identifier of the cluster that contains the database for which you are requesting credentials. This parameter is case sensitive. */
  ClusterIdentifier?: string;
  /** The custom domain name for the cluster credentials. */
  CustomDomainName?: string;
  /** A list of the names of existing database groups that the user named in DbUser will join for the current session, in addition to any group memberships for an existing user. If not specified, a new user */
  DbGroups?: string[];
  /** The name of a database that DbUser is authorized to log on to. If DbName is not specified, DbUser can log on to any existing database. Constraints: Must be 1 to 64 alphanumeric characters or hyphens M */
  DbName?: string;
  /** The number of seconds until the returned temporary password expires. Constraint: minimum 900, maximum 3600. Default: 900 */
  DurationSeconds?: number;
}

export interface GetClusterCredentialsWithIAMInput {
  /** The unique identifier of the cluster that contains the database for which you are requesting credentials. */
  ClusterIdentifier?: string;
  /** The custom domain name for the IAM message cluster credentials. */
  CustomDomainName?: string;
  /** The name of the database for which you are requesting credentials. If the database name is specified, the IAM policy must allow access to the resource dbname for the specified database name. If the da */
  DbName?: string;
  /** The number of seconds until the returned temporary password expires. Range: 900-3600. Default: 900. */
  DurationSeconds?: number;
}

/** The request parameters for GetIdentityCenterAuthToken. */
export interface GetIdentityCenterAuthTokenInput {
  /** A list of cluster identifiers that the generated token can be used with. The token will be scoped to only allow authentication to the specified clusters. Constraints: ClusterIds must contain at least  */
  ClusterIds: string[];
}

export interface GetReservedNodeExchangeConfigurationOptionsInput {
  /** The action type of the reserved-node configuration. The action type can be an exchange initiated from either a snapshot or a resize. */
  ActionType: 'restore-cluster' | 'resize-cluster';
  /** The identifier for the cluster that is the source for a reserved-node exchange. */
  ClusterIdentifier?: string;
  /** An optional pagination token provided by a previous GetReservedNodeExchangeConfigurationOptions request. If this parameter is specified, the response includes only records beyond the marker, up to the */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a Marker field of the response */
  MaxRecords?: number;
  /** The identifier for the snapshot that is the source for the reserved-node exchange. */
  SnapshotIdentifier?: string;
}

export interface GetReservedNodeExchangeOfferingsInput {
  /** A string representing the node identifier for the DC1 Reserved Node to be exchanged. */
  ReservedNodeId: string;
  /** A value that indicates the starting point for the next set of ReservedNodeOfferings. */
  Marker?: string;
  /** An integer setting the maximum number of ReservedNodeOfferings to retrieve. */
  MaxRecords?: number;
}

export interface GetResourcePolicyInput {
  /** The Amazon Resource Name (ARN) of the resource of which its resource policy is fetched. */
  ResourceArn: string;
}

export interface ListRecommendationsInput {
  /** The unique identifier of the Amazon Redshift cluster for which the list of Advisor recommendations is returned. If the neither the cluster identifier and the cluster namespace ARN parameters are speci */
  ClusterIdentifier?: string;
  /** A value that indicates the starting point for the next set of response records in a subsequent request. If a value is returned in a response, you can retrieve the next set of records by providing this */
  Marker?: string;
  /** The maximum number of response records to return in each call. If the number of remaining response records exceeds the specified MaxRecords value, a value is returned in a marker field of the response */
  MaxRecords?: number;
  /** The Amazon Redshift cluster namespace Amazon Resource Name (ARN) for which the list of Advisor recommendations is returned. If the neither the cluster identifier and the cluster namespace ARN paramete */
  NamespaceArn?: string;
}

export interface ModifyAquaConfigurationInput {
  /** The identifier of the cluster to be modified. */
  ClusterIdentifier: string;
  /** This parameter is retired. Amazon Redshift automatically determines whether to use AQUA (Advanced Query Accelerator). */
  AquaConfigurationStatus?: 'enabled' | 'disabled' | 'auto';
}

export interface ModifyAuthenticationProfileInput {
  /** The new content of the authentication profile in JSON format. The maximum length of the JSON string is determined by a quota for your account. */
  AuthenticationProfileContent: string;
  /** The name of the authentication profile to replace. */
  AuthenticationProfileName: string;
}

export interface ModifyClusterInput {
  /** The unique identifier of the cluster to be modified. Example: examplecluster */
  ClusterIdentifier: string;
  /** If true, major version upgrades will be applied automatically to the cluster during the maintenance window. Default: false */
  AllowVersionUpgrade?: boolean;
  /** The number of days that automated snapshots are retained. If the value is 0, automated snapshots are disabled. Even if automated snapshots are disabled, you can still create manual snapshots when you  */
  AutomatedSnapshotRetentionPeriod?: number;
  /** The option to initiate relocation for an Amazon Redshift cluster to the target Availability Zone. */
  AvailabilityZone?: string;
  /** The option to enable relocation for an Amazon Redshift cluster between Availability Zones after the cluster modification is complete. */
  AvailabilityZoneRelocation?: boolean;
  /** The name of the cluster parameter group to apply to this cluster. This change is applied only after the cluster is rebooted. To reboot a cluster use RebootCluster. Default: Uses existing setting. Cons */
  ClusterParameterGroupName?: string;
  /** A list of cluster security groups to be authorized on this cluster. This change is asynchronously applied as soon as possible. Security groups currently associated with the cluster, and not in the lis */
  ClusterSecurityGroups?: string[];
  /** The new cluster type. When you submit your cluster resize request, your existing cluster goes into a read-only mode. After Amazon Redshift provisions a new cluster based on your resize requirements, t */
  ClusterType?: string;
  /** The new version number of the Amazon Redshift engine to upgrade to. For major version upgrades, if a non-default cluster parameter group is currently in use, a new cluster parameter group in the clust */
  ClusterVersion?: string;
  /** The Elastic IP (EIP) address for the cluster. Constraints: The cluster must be provisioned in EC2-VPC and publicly-accessible through an Internet gateway. For more information about provisioning clust */
  ElasticIp?: string;
  /** Indicates whether the cluster is encrypted. If the value is encrypted (true) and you provide a value for the KmsKeyId parameter, we encrypt the cluster with the provided KmsKeyId. If you don't provide */
  Encrypted?: boolean;
  /** An option that specifies whether to create the cluster with enhanced VPC routing enabled. To create a cluster that uses enhanced VPC routing, the cluster must be in a VPC. For more information, see En */
  EnhancedVpcRouting?: boolean;
  /** If true, allocates additional compute resources for running automatic optimization operations. Default: false */
  ExtraComputeForAutomaticOptimization?: boolean;
  /** Specifies the name of the HSM client certificate the Amazon Redshift cluster uses to retrieve the data encryption keys stored in an HSM. */
  HsmClientCertificateIdentifier?: string;
  /** Specifies the name of the HSM configuration that contains the information the Amazon Redshift cluster can use to retrieve and store keys in an HSM. */
  HsmConfigurationIdentifier?: string;
  /** The IP address types that the cluster supports. Possible values are ipv4 and dualstack. */
  IpAddressType?: string;
  /** The Key Management Service (KMS) key ID of the encryption key that you want to use to encrypt data in the cluster. */
  KmsKeyId?: string;
  /** The name for the maintenance track that you want to assign for the cluster. This name change is asynchronous. The new track name stays in the PendingModifiedValues for the cluster until the next maint */
  MaintenanceTrackName?: string;
  /** If true, Amazon Redshift uses Secrets Manager to manage this cluster's admin credentials. You can't use MasterUserPassword if ManageMasterPassword is true. If ManageMasterPassword is false or not set, */
  ManageMasterPassword?: boolean;
  /** The default for number of days that a newly created manual snapshot is retained. If the value is -1, the manual snapshot is retained indefinitely. This value doesn't retroactively change the retention */
  ManualSnapshotRetentionPeriod?: number;
  /** The ID of the Key Management Service (KMS) key used to encrypt and store the cluster's admin credentials secret. You can only use this parameter if ManageMasterPassword is true. */
  MasterPasswordSecretKmsKeyId?: string;
  /** The new password for the cluster admin user. This change is asynchronously applied as soon as possible. Between the time of the request and the completion of the request, the MasterUserPassword elemen */
  MasterUserPassword?: string;
  /** If true and the cluster is currently only deployed in a single Availability Zone, the cluster will be modified to be deployed in two Availability Zones. */
  MultiAZ?: boolean;
  /** The new identifier for the cluster. Constraints: Must contain from 1 to 63 alphanumeric characters or hyphens. Alphabetic characters must be lowercase. First character must be a letter. Cannot end wit */
  NewClusterIdentifier?: string;
  /** The new node type of the cluster. If you specify a new node type, you must also specify the number of nodes parameter. For more information about resizing clusters, go to Resizing Clusters in Amazon R */
  NodeType?: string;
  /** The new number of nodes of the cluster. If you specify a new number of nodes, you must also specify the node type parameter. For more information about resizing clusters, go to Resizing Clusters in Am */
  NumberOfNodes?: number;
  /** The option to change the port of an Amazon Redshift cluster. Valid Values: For clusters with ra3 nodes - Select a port within the ranges 5431-5455 or 8191-8215. (If you have an existing cluster with r */
  Port?: number;
  /** The weekly time range (in UTC) during which system maintenance can occur, if necessary. If system maintenance is necessary during the window, it may result in an outage. This maintenance window change */
  PreferredMaintenanceWindow?: string;
  /** If true, the cluster can be accessed from a public network. Only clusters in VPCs can be set to be publicly available. Default: false */
  PubliclyAccessible?: boolean;
  /** A list of virtual private cloud (VPC) security groups to be associated with the cluster. This change is asynchronously applied as soon as possible. */
  VpcSecurityGroupIds?: string[];
}

export interface ModifyClusterDbRevisionInput {
  /** The unique identifier of a cluster whose database revision you want to modify. Example: examplecluster */
  ClusterIdentifier: string;
  /** The identifier of the database revision. You can retrieve this value from the response to the DescribeClusterDbRevisions request. */
  RevisionTarget: string;
}

export interface ModifyClusterIamRolesInput {
  /** The unique identifier of the cluster for which you want to associate or disassociate IAM roles. */
  ClusterIdentifier: string;
  /** Zero or more IAM roles to associate with the cluster. The roles must be in their Amazon Resource Name (ARN) format. */
  AddIamRoles?: string[];
  /** The Amazon Resource Name (ARN) for the IAM role that was set as default for the cluster when the cluster was last modified. */
  DefaultIamRoleArn?: string;
  /** Zero or more IAM roles in ARN format to disassociate from the cluster. */
  RemoveIamRoles?: string[];
}

export interface ModifyClusterMaintenanceInput {
  /** A unique identifier for the cluster. */
  ClusterIdentifier: string;
  /** A boolean indicating whether to enable the deferred maintenance window. */
  DeferMaintenance?: boolean;
  /** An integer indicating the duration of the maintenance window in days. If you specify a duration, you can't specify an end time. The duration must be 60 days or less. */
  DeferMaintenanceDuration?: number;
  /** A timestamp indicating end time for the deferred maintenance window. If you specify an end time, you can't specify a duration. */
  DeferMaintenanceEndTime?: string;
  /** A unique identifier for the deferred maintenance window. */
  DeferMaintenanceIdentifier?: string;
  /** A timestamp indicating the start time for the deferred maintenance window. */
  DeferMaintenanceStartTime?: string;
}

/** Describes a modify cluster parameter group operation. */
export interface ModifyClusterParameterGroupInput {
  /** The name of the parameter group to be modified. */
  ParameterGroupName: string;
  /** An array of parameters to be modified. A maximum of 20 parameters can be modified in a single request. For each parameter to be modified, you must supply at least the parameter name and parameter valu */
  Parameters: Parameter[];
}

export interface ModifyClusterSnapshotInput {
  /** The identifier of the snapshot whose setting you want to modify. */
  SnapshotIdentifier: string;
  /** A Boolean option to override an exception if the retention period has already passed. */
  Force?: boolean;
  /** The number of days that a manual snapshot is retained. If the value is -1, the manual snapshot is retained indefinitely. If the manual snapshot falls outside of the new retention period, you can speci */
  ManualSnapshotRetentionPeriod?: number;
}

export interface ModifyClusterSnapshotScheduleInput {
  /** A unique identifier for the cluster whose snapshot schedule you want to modify. */
  ClusterIdentifier: string;
  /** A boolean to indicate whether to remove the assoiciation between the cluster and the schedule. */
  DisassociateSchedule?: boolean;
  /** A unique alphanumeric identifier for the schedule that you want to associate with the cluster. */
  ScheduleIdentifier?: string;
}

export interface ModifyClusterSubnetGroupInput {
  /** The name of the subnet group to be modified. */
  ClusterSubnetGroupName: string;
  /** An array of VPC subnet IDs. A maximum of 20 subnets can be modified in a single request. */
  SubnetIds: string[];
  /** A text description of the subnet group to be modified. */
  Description?: string;
}

export interface ModifyCustomDomainAssociationInput {
  /** The identifier of the cluster to change a custom domain association for. */
  ClusterIdentifier: string;
  /** The certificate Amazon Resource Name (ARN) for the changed custom domain association. */
  CustomDomainCertificateArn: string;
  /** The custom domain name for a changed custom domain association. */
  CustomDomainName: string;
}

export interface ModifyEndpointAccessInput {
  /** The endpoint to be modified. */
  EndpointName: string;
  /** The complete list of VPC security groups associated with the endpoint after the endpoint is modified. */
  VpcSecurityGroupIds?: string[];
}

export interface ModifyEventSubscriptionInput {
  /** The name of the modified Amazon Redshift event notification subscription. */
  SubscriptionName: string;
  /** A Boolean value indicating if the subscription is enabled. true indicates the subscription is enabled */
  Enabled?: boolean;
  /** Specifies the Amazon Redshift event categories to be published by the event notification subscription. Values: configuration, management, monitoring, security, pending */
  EventCategories?: string[];
  /** Specifies the Amazon Redshift event severity to be published by the event notification subscription. Values: ERROR, INFO */
  Severity?: string;
  /** The Amazon Resource Name (ARN) of the SNS topic to be used by the event notification subscription. */
  SnsTopicArn?: string;
  /** A list of one or more identifiers of Amazon Redshift source objects. All of the objects must be of the same type as was specified in the source type parameter. The event subscription will return only  */
  SourceIds?: string[];
  /** The type of source that will be generating the events. For example, if you want to be notified of events generated by a cluster, you would set this parameter to cluster. If this value is not specified */
  SourceType?: string;
}

export interface ModifyIntegrationInput {
  /** The unique identifier of the integration to modify. */
  IntegrationArn: string;
  /** A new description for the integration. */
  Description?: string;
  /** A new name for the integration. */
  IntegrationName?: string;
}

export interface ModifyLakehouseConfigurationInput {
  /** The unique identifier of the cluster whose lakehouse configuration you want to modify. */
  ClusterIdentifier: string;
  /** The name of the Glue data catalog that will be associated with the cluster enabled with Amazon Redshift federated permissions. Constraints: Must contain at least one lowercase letter. Can only contain */
  CatalogName?: string;
  /** A boolean value that, if true, validates the request without actually modifying the lakehouse configuration. Use this to check for errors before making changes. */
  DryRun?: boolean;
  /** The Amazon Resource Name (ARN) of the IAM Identity Center application used for enabling Amazon Web Services IAM Identity Center trusted identity propagation on a cluster enabled with Amazon Redshift f */
  LakehouseIdcApplicationArn?: string;
  /** Modifies the Amazon Web Services IAM Identity Center trusted identity propagation on a cluster enabled with Amazon Redshift federated permissions. Valid values are Associate or Disassociate. */
  LakehouseIdcRegistration?: 'Associate' | 'Disassociate';
  /** Specifies whether to register or deregister the cluster with Amazon Redshift federated permissions. Valid values are Register or Deregister. */
  LakehouseRegistration?: 'Register' | 'Deregister';
}

export interface ModifyRedshiftIdcApplicationInput {
  /** The ARN for the Redshift application that integrates with IAM Identity Center. */
  RedshiftIdcApplicationArn: string;
  /** The authorized token issuer list for the Amazon Redshift IAM Identity Center application to change. */
  AuthorizedTokenIssuerList?: AuthorizedTokenIssuer[];
  /** The IAM role ARN associated with the Amazon Redshift IAM Identity Center application to change. It has the required permissions to be assumed and invoke the IDC Identity Center API. */
  IamRoleArn?: string;
  /** The display name for the Amazon Redshift IAM Identity Center application to change. It appears on the console. */
  IdcDisplayName?: string;
  /** The namespace for the Amazon Redshift IAM Identity Center application to change. It determines which managed application verifies the connection token. */
  IdentityNamespace?: string;
  /** A collection of service integrations associated with the application. */
  ServiceIntegrations?: { LakeFormation?: any[] } | { S3AccessGrants?: any[] } | { Redshift?: any[] }[];
}

export interface ModifyScheduledActionInput {
  /** The name of the scheduled action to modify. */
  ScheduledActionName: string;
  /** A modified enable flag of the scheduled action. If true, the scheduled action is active. If false, the scheduled action is disabled. */
  Enable?: boolean;
  /** A modified end time of the scheduled action. For more information about this parameter, see ScheduledAction. */
  EndTime?: string;
  /** A different IAM role to assume to run the target action. For more information about this parameter, see ScheduledAction. */
  IamRole?: string;
  /** A modified schedule in either at( ) or cron( ) format. For more information about this parameter, see ScheduledAction. */
  Schedule?: string;
  /** A modified description of the scheduled action. */
  ScheduledActionDescription?: string;
  /** A modified start time of the scheduled action. For more information about this parameter, see ScheduledAction. */
  StartTime?: string;
  /** A modified JSON format of the scheduled action. For more information about this parameter, see ScheduledAction. */
  TargetAction?: ScheduledActionType;
}

export interface ModifySnapshotCopyRetentionPeriodInput {
  /** The unique identifier of the cluster for which you want to change the retention period for either automated or manual snapshots that are copied to a destination Amazon Web Services Region. Constraints */
  ClusterIdentifier: string;
  /** The number of days to retain automated snapshots in the destination Amazon Web Services Region after they are copied from the source Amazon Web Services Region. By default, this only changes the reten */
  RetentionPeriod: number;
  /** Indicates whether to apply the snapshot retention period to newly copied manual snapshots instead of automated snapshots. */
  Manual?: boolean;
}

export interface ModifySnapshotScheduleInput {
  /** An updated list of schedule definitions. A schedule definition is made up of schedule expressions, for example, "cron(30 12 *)" or "rate(12 hours)". */
  ScheduleDefinitions: string[];
  /** A unique alphanumeric identifier of the schedule to modify. */
  ScheduleIdentifier: string;
}

export interface ModifyUsageLimitInput {
  /** The identifier of the usage limit to modify. */
  UsageLimitId: string;
  /** The new limit amount. For more information about this parameter, see UsageLimit. */
  Amount?: number;
  /** The new action that Amazon Redshift takes when the limit is reached. For more information about this parameter, see UsageLimit. */
  BreachAction?: 'log' | 'emit-metric' | 'disable';
}

/** Describes a pause cluster operation. For example, a scheduled action to run the PauseCluster API operation. */
export interface PauseClusterInput {
  /** The identifier of the cluster to be paused. */
  ClusterIdentifier: string;
}

export interface PurchaseReservedNodeOfferingInput {
  /** The unique identifier of the reserved node offering you want to purchase. */
  ReservedNodeOfferingId: string;
  /** The number of reserved nodes that you want to purchase. Default: 1 */
  NodeCount?: number;
}

export interface PutResourcePolicyInput {
  /** The content of the resource policy being updated. */
  Policy: string;
  /** The Amazon Resource Name (ARN) of the resource of which its resource policy is updated. */
  ResourceArn: string;
}

export interface RebootClusterInput {
  /** The cluster identifier. */
  ClusterIdentifier: string;
}

export interface RegisterNamespaceInput {
  /** An array containing the ID of the consumer account that you want to register the namespace to. */
  ConsumerIdentifiers: string[];
  /** The unique identifier of the cluster or serverless namespace that you want to register. */
  NamespaceIdentifier: { ServerlessIdentifier?: ServerlessIdentifier } | { ProvisionedIdentifier?: ProvisionedIdentifier };
}

export interface RejectDataShareInput {
  /** The Amazon Resource Name (ARN) of the datashare to reject. */
  DataShareArn: string;
}

export interface ResetClusterParameterGroupInput {
  /** The name of the cluster parameter group to be reset. */
  ParameterGroupName: string;
  /** An array of names of parameters to be reset. If ResetAllParameters option is not used, then at least one parameter name must be supplied. Constraints: A maximum of 20 parameters can be reset in a sing */
  Parameters?: Parameter[];
  /** If true, all parameters in the specified parameter group will be reset to their default values. Default: true */
  ResetAllParameters?: boolean;
}

/** Describes a resize cluster operation. For example, a scheduled action to run the ResizeCluster API operation. */
export interface ResizeClusterInput {
  /** The unique identifier for the cluster to resize. */
  ClusterIdentifier: string;
  /** A boolean value indicating whether the resize operation is using the classic resize process. If you don't provide this parameter or set the value to false, the resize type is elastic. */
  Classic?: boolean;
  /** The new cluster type for the specified cluster. */
  ClusterType?: string;
  /** The new node type for the nodes you are adding. If not specified, the cluster's current node type is used. */
  NodeType?: string;
  /** The new number of nodes for the cluster. If not specified, the cluster's current number of nodes is used. */
  NumberOfNodes?: number;
  /** The identifier of the reserved node. */
  ReservedNodeId?: string;
  /** The identifier of the target reserved node offering. */
  TargetReservedNodeOfferingId?: string;
}

export interface RestoreFromClusterSnapshotInput {
  /** The identifier of the cluster that will be created from restoring the snapshot. Constraints: Must contain from 1 to 63 alphanumeric characters or hyphens. Alphabetic characters must be lowercase. Firs */
  ClusterIdentifier: string;
  /** Reserved. */
  AdditionalInfo?: string;
  /** If true, major version upgrades can be applied during the maintenance window to the Amazon Redshift engine that is running on the cluster. Default: true */
  AllowVersionUpgrade?: boolean;
  /** This parameter is retired. It does not set the AQUA configuration status. Amazon Redshift automatically determines whether to use AQUA (Advanced Query Accelerator). */
  AquaConfigurationStatus?: 'enabled' | 'disabled' | 'auto';
  /** The number of days that automated snapshots are retained. If the value is 0, automated snapshots are disabled. Even if automated snapshots are disabled, you can still create manual snapshots when you  */
  AutomatedSnapshotRetentionPeriod?: number;
  /** The Amazon EC2 Availability Zone in which to restore the cluster. Default: A random, system-chosen Availability Zone. Example: us-east-2a */
  AvailabilityZone?: string;
  /** The option to enable relocation for an Amazon Redshift cluster between Availability Zones after the cluster is restored. */
  AvailabilityZoneRelocation?: boolean;
  /** The name of the Glue Data Catalog that will be associated with the cluster enabled with Amazon Redshift federated permissions. Constraints: Must contain at least one lowercase letter. Can only contain */
  CatalogName?: string;
  /** The name of the parameter group to be associated with this cluster. Default: The default Amazon Redshift cluster parameter group. For information about the default parameter group, go to Working with  */
  ClusterParameterGroupName?: string;
  /** A list of security groups to be associated with this cluster. Default: The default cluster security group for Amazon Redshift. Cluster security groups only apply to clusters outside of VPCs. */
  ClusterSecurityGroups?: string[];
  /** The name of the subnet group where you want to cluster restored. A snapshot of cluster in VPC can be restored only in VPC. Therefore, you must provide subnet group name where you want the cluster rest */
  ClusterSubnetGroupName?: string;
  /** The Amazon Resource Name (ARN) for the IAM role that was set as default for the cluster when the cluster was last modified while it was restored from a snapshot. */
  DefaultIamRoleArn?: string;
  /** The Elastic IP (EIP) address for the cluster. Don't specify the Elastic IP address for a publicly accessible cluster with availability zone relocation turned on. */
  ElasticIp?: string;
  /** Enables support for restoring an unencrypted snapshot to a cluster encrypted with Key Management Service (KMS) and a customer managed key. */
  Encrypted?: boolean;
  /** An option that specifies whether to create the cluster with enhanced VPC routing enabled. To create a cluster that uses enhanced VPC routing, the cluster must be in a VPC. For more information, see En */
  EnhancedVpcRouting?: boolean;
  /** Specifies the name of the HSM client certificate the Amazon Redshift cluster uses to retrieve the data encryption keys stored in an HSM. */
  HsmClientCertificateIdentifier?: string;
  /** Specifies the name of the HSM configuration that contains the information the Amazon Redshift cluster can use to retrieve and store keys in an HSM. */
  HsmConfigurationIdentifier?: string;
  /** A list of Identity and Access Management (IAM) roles that can be used by the cluster to access other Amazon Web Services services. You must supply the IAM roles in their Amazon Resource Name (ARN) for */
  IamRoles?: string[];
  /** The IP address type for the cluster. Possible values are ipv4 and dualstack. */
  IpAddressType?: string;
  /** The Key Management Service (KMS) key ID of the encryption key that encrypts data in the cluster restored from a shared snapshot. You can also provide the key ID when you restore from an unencrypted sn */
  KmsKeyId?: string;
  /** The name of the maintenance track for the restored cluster. When you take a snapshot, the snapshot inherits the MaintenanceTrack value from the cluster. The snapshot might be on a different track than */
  MaintenanceTrackName?: string;
  /** If true, Amazon Redshift uses Secrets Manager to manage the restored cluster's admin credentials. If ManageMasterPassword is false or not set, Amazon Redshift uses the admin credentials the cluster ha */
  ManageMasterPassword?: boolean;
  /** The default number of days to retain a manual snapshot. If the value is -1, the snapshot is retained indefinitely. This setting doesn't change the retention period of existing snapshots. The value mus */
  ManualSnapshotRetentionPeriod?: number;
  /** The ID of the Key Management Service (KMS) key used to encrypt and store the cluster's admin credentials secret. You can only use this parameter if ManageMasterPassword is true. */
  MasterPasswordSecretKmsKeyId?: string;
  /** If true, the snapshot will be restored to a cluster deployed in two Availability Zones. */
  MultiAZ?: boolean;
  /** The node type that the restored cluster will be provisioned with. If you have a DC instance type, you must restore into that same instance type and size. In other words, you can only restore a dc2.lar */
  NodeType?: string;
  /** The number of nodes specified when provisioning the restored cluster. */
  NumberOfNodes?: number;
  /** The Amazon Web Services account used to create or copy the snapshot. Required if you are restoring a snapshot you do not own, optional if you own the snapshot. */
  OwnerAccount?: string;
  /** The port number on which the cluster accepts connections. Default: The same port as the original cluster. Valid values: For clusters with DC2 nodes, must be within the range 1150-65535. For clusters w */
  Port?: number;
  /** The weekly time range (in UTC) during which automated cluster maintenance can occur. Format: ddd:hh24:mi-ddd:hh24:mi Default: The value selected for the cluster from which the snapshot was taken. For  */
  PreferredMaintenanceWindow?: string;
  /** If true, the cluster can be accessed from a public network. Default: false */
  PubliclyAccessible?: boolean;
  /** The Amazon Resource Name (ARN) of the IAM Identity Center application used for enabling Amazon Web Services IAM Identity Center trusted identity propagation on a cluster enabled with Amazon Redshift f */
  RedshiftIdcApplicationArn?: string;
  /** The identifier of the target reserved node offering. */
  ReservedNodeId?: string;
  /** The Amazon Resource Name (ARN) of the snapshot associated with the message to restore from a cluster. You must specify this parameter or snapshotIdentifier, but not both. */
  SnapshotArn?: string;
  /** The name of the cluster the source snapshot was created from. This parameter is required if your IAM user has a policy containing a snapshot resource element that specifies anything other than * for t */
  SnapshotClusterIdentifier?: string;
  /** The name of the snapshot from which to create the new cluster. This parameter isn't case sensitive. You must specify this parameter or snapshotArn, but not both. Example: my-snapshot-id */
  SnapshotIdentifier?: string;
  /** A unique identifier for the snapshot schedule. */
  SnapshotScheduleIdentifier?: string;
  /** The identifier of the target reserved node offering. */
  TargetReservedNodeOfferingId?: string;
  /** A list of Virtual Private Cloud (VPC) security groups to be associated with the cluster. Default: The default VPC security group is associated with the cluster. VPC security groups only apply to clust */
  VpcSecurityGroupIds?: string[];
}

export interface RestoreTableFromClusterSnapshotInput {
  /** The identifier of the Amazon Redshift cluster to restore the table to. */
  ClusterIdentifier: string;
  /** The name of the table to create as a result of the current request. */
  NewTableName: string;
  /** The identifier of the snapshot to restore the table from. This snapshot must have been created from the Amazon Redshift cluster specified by the ClusterIdentifier parameter. */
  SnapshotIdentifier: string;
  /** The name of the source database that contains the table to restore from. */
  SourceDatabaseName: string;
  /** The name of the source table to restore from. */
  SourceTableName: string;
  /** Indicates whether name identifiers for database, schema, and table are case sensitive. If true, the names are case sensitive. If false (default), the names are not case sensitive. */
  EnableCaseSensitiveIdentifier?: boolean;
  /** The name of the source schema that contains the table to restore from. If you do not specify a SourceSchemaName value, the default is public. */
  SourceSchemaName?: string;
  /** The name of the database to restore the table to. */
  TargetDatabaseName?: string;
  /** The name of the schema to restore the table to. */
  TargetSchemaName?: string;
}

/** Describes a resume cluster operation. For example, a scheduled action to run the ResumeCluster API operation. */
export interface ResumeClusterInput {
  /** The identifier of the cluster to be resumed. */
  ClusterIdentifier: string;
}

export interface RevokeClusterSecurityGroupIngressInput {
  /** The name of the security Group from which to revoke the ingress rule. */
  ClusterSecurityGroupName: string;
  /** The IP range for which to revoke access. This range must be a valid Classless Inter-Domain Routing (CIDR) block of IP addresses. If CIDRIP is specified, EC2SecurityGroupName and EC2SecurityGroupOwnerI */
  CIDRIP?: string;
  /** The name of the EC2 Security Group whose access is to be revoked. If EC2SecurityGroupName is specified, EC2SecurityGroupOwnerId must also be provided and CIDRIP cannot be provided. */
  EC2SecurityGroupName?: string;
  /** The Amazon Web Services account number of the owner of the security group specified in the EC2SecurityGroupName parameter. The Amazon Web Services access key ID is not an acceptable value. If EC2Secur */
  EC2SecurityGroupOwnerId?: string;
}

export interface RevokeEndpointAccessInput {
  /** The Amazon Web Services account ID whose access is to be revoked. */
  Account?: string;
  /** The cluster to revoke access from. */
  ClusterIdentifier?: string;
  /** Indicates whether to force the revoke action. If true, the Redshift-managed VPC endpoints associated with the endpoint authorization are also deleted. */
  Force?: boolean;
  /** The virtual private cloud (VPC) identifiers for which access is to be revoked. */
  VpcIds?: string[];
}

export interface RevokeSnapshotAccessInput {
  /** The identifier of the Amazon Web Services account that can no longer restore the specified snapshot. */
  AccountWithRestoreAccess: string;
  /** The Amazon Resource Name (ARN) of the snapshot associated with the message to revoke access. */
  SnapshotArn?: string;
  /** The identifier of the cluster the snapshot was created from. This parameter is required if your IAM user has a policy containing a snapshot resource element that specifies anything other than * for th */
  SnapshotClusterIdentifier?: string;
  /** The identifier of the snapshot that the account can no longer access. */
  SnapshotIdentifier?: string;
}

export interface RotateEncryptionKeyInput {
  /** The unique identifier of the cluster that you want to rotate the encryption keys for. Constraints: Must be the name of valid cluster that has encryption enabled. */
  ClusterIdentifier: string;
}

export interface UpdatePartnerStatusInput {
  /** The Amazon Web Services account ID that owns the cluster. */
  AccountId: string;
  /** The cluster identifier of the cluster whose partner integration status is being updated. */
  ClusterIdentifier: string;
  /** The name of the database whose partner integration status is being updated. */
  DatabaseName: string;
  /** The name of the partner whose integration status is being updated. */
  PartnerName: string;
  /** The value of the updated status. */
  Status: 'Active' | 'Inactive' | 'RuntimeFailure' | 'ConnectionFailure';
  /** The status message provided by the partner. */
  StatusMessage?: string;
}

/** Redshift service binding for Step Functions SDK integrations. */
export class Redshift {
  constructor() {}

  acceptReservedNodeExchange<T>(params: AcceptReservedNodeExchangeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  addPartner<T>(params: AddPartnerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateDataShareConsumer<T>(params: AssociateDataShareConsumerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  authorizeClusterSecurityGroupIngress<T>(params: AuthorizeClusterSecurityGroupIngressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  authorizeDataShare<T>(params: AuthorizeDataShareInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  authorizeEndpointAccess<T>(params: AuthorizeEndpointAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  authorizeSnapshotAccess<T>(params: AuthorizeSnapshotAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchDeleteClusterSnapshots<T>(params: BatchDeleteClusterSnapshotsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchModifyClusterSnapshots<T>(params: BatchModifyClusterSnapshotsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelResize<T>(params: CancelResizeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  copyClusterSnapshot<T>(params: CopyClusterSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createAuthenticationProfile<T>(params: CreateAuthenticationProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCluster<T>(params: CreateClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createClusterParameterGroup<T>(params: CreateClusterParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createClusterSecurityGroup<T>(params: CreateClusterSecurityGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createClusterSnapshot<T>(params: CreateClusterSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createClusterSubnetGroup<T>(params: CreateClusterSubnetGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCustomDomainAssociation<T>(params: CreateCustomDomainAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createEndpointAccess<T>(params: CreateEndpointAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createEventSubscription<T>(params: CreateEventSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createHsmClientCertificate<T>(params: CreateHsmClientCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createHsmConfiguration<T>(params: CreateHsmConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createIntegration<T>(params: CreateIntegrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRedshiftIdcApplication<T>(params: CreateRedshiftIdcApplicationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createScheduledAction<T>(params: CreateScheduledActionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createSnapshotCopyGrant<T>(params: CreateSnapshotCopyGrantInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createSnapshotSchedule<T>(params: CreateSnapshotScheduleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTags<T>(params: CreateTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createUsageLimit<T>(params: CreateUsageLimitInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deauthorizeDataShare<T>(params: DeauthorizeDataShareInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAuthenticationProfile<T>(params: DeleteAuthenticationProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCluster<T>(params: DeleteClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteClusterParameterGroup<T>(params: DeleteClusterParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteClusterSecurityGroup<T>(params: DeleteClusterSecurityGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteClusterSnapshot<T>(params: DeleteClusterSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteClusterSubnetGroup<T>(params: DeleteClusterSubnetGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCustomDomainAssociation<T>(params: DeleteCustomDomainAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteEndpointAccess<T>(params: DeleteEndpointAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteEventSubscription<T>(params: DeleteEventSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteHsmClientCertificate<T>(params: DeleteHsmClientCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteHsmConfiguration<T>(params: DeleteHsmConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteIntegration<T>(params: DeleteIntegrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePartner<T>(params: DeletePartnerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRedshiftIdcApplication<T>(params: DeleteRedshiftIdcApplicationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteResourcePolicy<T>(params: DeleteResourcePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteScheduledAction<T>(params: DeleteScheduledActionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSnapshotCopyGrant<T>(params: DeleteSnapshotCopyGrantInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSnapshotSchedule<T>(params: DeleteSnapshotScheduleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTags<T>(params: DeleteTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteUsageLimit<T>(params: DeleteUsageLimitInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deregisterNamespace<T>(params: DeregisterNamespaceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAccountAttributes<T>(params: DescribeAccountAttributesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAuthenticationProfiles<T>(params: DescribeAuthenticationProfilesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeClusterDbRevisions<T>(params: DescribeClusterDbRevisionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeClusterParameterGroups<T>(params: DescribeClusterParameterGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeClusterParameters<T>(params: DescribeClusterParametersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeClusters<T>(params: DescribeClustersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeClusterSecurityGroups<T>(params: DescribeClusterSecurityGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeClusterSnapshots<T>(params: DescribeClusterSnapshotsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeClusterSubnetGroups<T>(params: DescribeClusterSubnetGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeClusterTracks<T>(params: DescribeClusterTracksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeClusterVersions<T>(params: DescribeClusterVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCustomDomainAssociations<T>(params: DescribeCustomDomainAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDataShares<T>(params: DescribeDataSharesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDataSharesForConsumer<T>(params: DescribeDataSharesForConsumerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDataSharesForProducer<T>(params: DescribeDataSharesForProducerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDefaultClusterParameters<T>(params: DescribeDefaultClusterParametersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEndpointAccess<T>(params: DescribeEndpointAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEndpointAuthorization<T>(params: DescribeEndpointAuthorizationInput): Promise<T> {
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

  describeHsmClientCertificates<T>(params: DescribeHsmClientCertificatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeHsmConfigurations<T>(params: DescribeHsmConfigurationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInboundIntegrations<T>(params: DescribeInboundIntegrationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeIntegrations<T>(params: DescribeIntegrationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeLoggingStatus<T>(params: DescribeLoggingStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeNodeConfigurationOptions<T>(params: DescribeNodeConfigurationOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeOrderableClusterOptions<T>(params: DescribeOrderableClusterOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePartners<T>(params: DescribePartnersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRedshiftIdcApplications<T>(params: DescribeRedshiftIdcApplicationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReservedNodeExchangeStatus<T>(params: DescribeReservedNodeExchangeStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReservedNodeOfferings<T>(params: DescribeReservedNodeOfferingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReservedNodes<T>(params: DescribeReservedNodesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeResize<T>(params: DescribeResizeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeScheduledActions<T>(params: DescribeScheduledActionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSnapshotCopyGrants<T>(params: DescribeSnapshotCopyGrantsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSnapshotSchedules<T>(params: DescribeSnapshotSchedulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStorage<T>(): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTableRestoreStatus<T>(params: DescribeTableRestoreStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTags<T>(params: DescribeTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeUsageLimits<T>(params: DescribeUsageLimitsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableLogging<T>(params: DisableLoggingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableSnapshotCopy<T>(params: DisableSnapshotCopyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateDataShareConsumer<T>(params: DisassociateDataShareConsumerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableLogging<T>(params: EnableLoggingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableSnapshotCopy<T>(params: EnableSnapshotCopyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  failoverPrimaryCompute<T>(params: FailoverPrimaryComputeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getClusterCredentials<T>(params: GetClusterCredentialsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getClusterCredentialsWithIAM<T>(params: GetClusterCredentialsWithIAMInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getIdentityCenterAuthToken<T>(params: GetIdentityCenterAuthTokenInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getReservedNodeExchangeConfigurationOptions<T>(params: GetReservedNodeExchangeConfigurationOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getReservedNodeExchangeOfferings<T>(params: GetReservedNodeExchangeOfferingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getResourcePolicy<T>(params: GetResourcePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRecommendations<T>(params: ListRecommendationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyAquaConfiguration<T>(params: ModifyAquaConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyAuthenticationProfile<T>(params: ModifyAuthenticationProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyCluster<T>(params: ModifyClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyClusterDbRevision<T>(params: ModifyClusterDbRevisionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyClusterIamRoles<T>(params: ModifyClusterIamRolesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyClusterMaintenance<T>(params: ModifyClusterMaintenanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyClusterParameterGroup<T>(params: ModifyClusterParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyClusterSnapshot<T>(params: ModifyClusterSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyClusterSnapshotSchedule<T>(params: ModifyClusterSnapshotScheduleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyClusterSubnetGroup<T>(params: ModifyClusterSubnetGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyCustomDomainAssociation<T>(params: ModifyCustomDomainAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyEndpointAccess<T>(params: ModifyEndpointAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyEventSubscription<T>(params: ModifyEventSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyIntegration<T>(params: ModifyIntegrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyLakehouseConfiguration<T>(params: ModifyLakehouseConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyRedshiftIdcApplication<T>(params: ModifyRedshiftIdcApplicationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyScheduledAction<T>(params: ModifyScheduledActionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifySnapshotCopyRetentionPeriod<T>(params: ModifySnapshotCopyRetentionPeriodInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifySnapshotSchedule<T>(params: ModifySnapshotScheduleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyUsageLimit<T>(params: ModifyUsageLimitInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  pauseCluster<T>(params: PauseClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  purchaseReservedNodeOffering<T>(params: PurchaseReservedNodeOfferingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putResourcePolicy<T>(params: PutResourcePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rebootCluster<T>(params: RebootClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  registerNamespace<T>(params: RegisterNamespaceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rejectDataShare<T>(params: RejectDataShareInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  resetClusterParameterGroup<T>(params: ResetClusterParameterGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  resizeCluster<T>(params: ResizeClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  restoreFromClusterSnapshot<T>(params: RestoreFromClusterSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  restoreTableFromClusterSnapshot<T>(params: RestoreTableFromClusterSnapshotInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  resumeCluster<T>(params: ResumeClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  revokeClusterSecurityGroupIngress<T>(params: RevokeClusterSecurityGroupIngressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  revokeEndpointAccess<T>(params: RevokeEndpointAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  revokeSnapshotAccess<T>(params: RevokeSnapshotAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rotateEncryptionKey<T>(params: RotateEncryptionKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePartnerStatus<T>(params: UpdatePartnerStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
