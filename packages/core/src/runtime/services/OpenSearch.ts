// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface S3GlueDataCatalog {
  /** >The Amazon Resource Name (ARN) for the S3 Glue Data Catalog. */
  RoleArn?: string;
}

export interface CloudWatchDirectQueryDataSource {
  /** The unique identifier of the IAM role that grants OpenSearch Service permission to access the specified data source. */
  RoleArn: string;
}

export interface SecurityLakeDirectQueryDataSource {
  /** The unique identifier of the IAM role that grants OpenSearch Service permission to access the specified data source. */
  RoleArn: string;
}

export interface Tag {
  /** The tag key. Tag keys must be unique for the domain to which they are attached. */
  Key: string;
  /** The value assigned to the corresponding tag key. Tag values can be null and don't have to be unique in a tag set. For example, you can have a key value pair in a tag set of project : Trinity and cost- */
  Value: string;
}

export interface KeyStoreAccessOption {
  /** Role ARN to access the KeyStore Key */
  KeyAccessRoleArn?: string;
  /** This indicates whether Key Store access is enabled */
  KeyStoreAccessEnabled: boolean;
}

export interface PackageAssociationConfiguration {
  /** The configuration parameters to enable accessing the key store required by the package. */
  KeyStoreAccessOption?: KeyStoreAccessOption;
}

export interface PackageDetailsForAssociation {
  /** Internal ID of the package that you want to associate with a domain. */
  PackageID: string;
  /** List of package IDs that must be linked to the domain before or simultaneously with the package association. */
  PrerequisitePackageIDList?: any[];
  /** The configuration parameters for associating the package with a domain. */
  AssociationConfiguration?: any;
}

export interface DataSource {
  dataSourceArn?: string;
  /** Detailed description of a data source. */
  dataSourceDescription?: string;
}

export interface IamIdentityCenterOptionsInput {
  /** Specifies whether IAM Identity Center is enabled or disabled. */
  enabled?: boolean;
  iamIdentityCenterInstanceArn?: string;
  /** The ARN of the IAM role associated with the IAM Identity Center application. */
  iamRoleForIdentityCenterApplicationArn?: string;
}

export interface AppConfig {
  /** The configuration item to set, such as the admin role for the OpenSearch application. */
  key?: 'opensearchDashboards.dashboardAdmin.users' | 'opensearchDashboards.dashboardAdmin.groups';
  /** The value assigned to the configuration key, such as an IAM user ARN. */
  value?: string;
}

export interface ZoneAwarenessConfig {
  /** If you enabled multiple Availability Zones, this value is the number of zones that you want the domain to use. Valid values are 2 and 3. If your domain is provisioned within a VPC, this value be equal */
  AvailabilityZoneCount?: number;
}

export interface ColdStorageOptions {
  /** Whether to enable or disable cold storage on the domain. You must enable UltraWarm storage to enable cold storage. */
  Enabled: boolean;
}

export interface ClusterConfig {
  /** Instance type of data nodes in the cluster. */
  InstanceType?: 'm3.medium.search' | 'm3.large.search' | 'm3.xlarge.search' | 'm3.2xlarge.search' | 'm4.large.search' | 'm4.xlarge.search' | 'm4.2xlarge.search' | 'm4.4xlarge.search' | 'm4.10xlarge.search' | 'm5.large.search' | 'm5.xlarge.search' | 'm5.2xlarge.search' | 'm5.4xlarge.search' | 'm5.12xlarge.search' | 'm5.24xlarge.search' | 'r5.large.search' | 'r5.xlarge.search' | 'r5.2xlarge.search' | 'r5.4xlarge.search' | 'r5.12xlarge.search' | 'r5.24xlarge.search' | 'c5.large.search' | 'c5.xlarge.search' | 'c5.2xlarge.search' | 'c5.4xlarge.search' | 'c5.9xlarge.search' | 'c5.18xlarge.search' | 't3.nano.search' | 't3.micro.search' | 't3.small.search' | 't3.medium.search' | 't3.large.search' | 't3.xlarge.search' | 't3.2xlarge.search' | 'or1.medium.search' | 'or1.large.search' | 'or1.xlarge.search' | 'or1.2xlarge.search' | 'or1.4xlarge.search' | 'or1.8xlarge.search' | 'or1.12xlarge.search' | 'or1.16xlarge.search' | 'ultrawarm1.medium.search' | 'ultrawarm1.large.search' | 'ultrawarm1.xlarge.search' | 't2.micro.search' | 't2.small.search' | 't2.medium.search' | 'r3.large.search' | 'r3.xlarge.search' | 'r3.2xlarge.search' | 'r3.4xlarge.search' | 'r3.8xlarge.search' | 'i2.xlarge.search' | 'i2.2xlarge.search' | 'd2.xlarge.search' | 'd2.2xlarge.search' | 'd2.4xlarge.search' | 'd2.8xlarge.search' | 'c4.large.search' | 'c4.xlarge.search' | 'c4.2xlarge.search' | 'c4.4xlarge.search' | 'c4.8xlarge.search' | 'r4.large.search' | 'r4.xlarge.search' | 'r4.2xlarge.search' | 'r4.4xlarge.search' | 'r4.8xlarge.search' | 'r4.16xlarge.search' | 'i3.large.search' | 'i3.xlarge.search' | 'i3.2xlarge.search' | 'i3.4xlarge.search' | 'i3.8xlarge.search' | 'i3.16xlarge.search' | 'r6g.large.search' | 'r6g.xlarge.search' | 'r6g.2xlarge.search' | 'r6g.4xlarge.search' | 'r6g.8xlarge.search' | 'r6g.12xlarge.search' | 'm6g.large.search' | 'm6g.xlarge.search' | 'm6g.2xlarge.search' | 'm6g.4xlarge.search' | 'm6g.8xlarge.search' | 'm6g.12xlarge.search' | 'c6g.large.search' | 'c6g.xlarge.search' | 'c6g.2xlarge.search' | 'c6g.4xlarge.search' | 'c6g.8xlarge.search' | 'c6g.12xlarge.search' | 'r6gd.large.search' | 'r6gd.xlarge.search' | 'r6gd.2xlarge.search' | 'r6gd.4xlarge.search' | 'r6gd.8xlarge.search' | 'r6gd.12xlarge.search' | 'r6gd.16xlarge.search' | 't4g.small.search' | 't4g.medium.search';
  /** Number of data nodes in the cluster. This number must be greater than 1, otherwise you receive a validation exception. */
  InstanceCount?: number;
  /** Indicates whether dedicated master nodes are enabled for the cluster.True if the cluster will use a dedicated master node.False if the cluster will not. */
  DedicatedMasterEnabled?: boolean;
  /** Indicates whether multiple Availability Zones are enabled. For more information, see Configuring a multi-AZ domain in Amazon OpenSearch Service. */
  ZoneAwarenessEnabled?: boolean;
  /** Container for zone awareness configuration options. Only required if ZoneAwarenessEnabled is true. */
  ZoneAwarenessConfig?: ZoneAwarenessConfig;
  /** OpenSearch Service instance type of the dedicated master nodes in the cluster. */
  DedicatedMasterType?: 'm3.medium.search' | 'm3.large.search' | 'm3.xlarge.search' | 'm3.2xlarge.search' | 'm4.large.search' | 'm4.xlarge.search' | 'm4.2xlarge.search' | 'm4.4xlarge.search' | 'm4.10xlarge.search' | 'm5.large.search' | 'm5.xlarge.search' | 'm5.2xlarge.search' | 'm5.4xlarge.search' | 'm5.12xlarge.search' | 'm5.24xlarge.search' | 'r5.large.search' | 'r5.xlarge.search' | 'r5.2xlarge.search' | 'r5.4xlarge.search' | 'r5.12xlarge.search' | 'r5.24xlarge.search' | 'c5.large.search' | 'c5.xlarge.search' | 'c5.2xlarge.search' | 'c5.4xlarge.search' | 'c5.9xlarge.search' | 'c5.18xlarge.search' | 't3.nano.search' | 't3.micro.search' | 't3.small.search' | 't3.medium.search' | 't3.large.search' | 't3.xlarge.search' | 't3.2xlarge.search' | 'or1.medium.search' | 'or1.large.search' | 'or1.xlarge.search' | 'or1.2xlarge.search' | 'or1.4xlarge.search' | 'or1.8xlarge.search' | 'or1.12xlarge.search' | 'or1.16xlarge.search' | 'ultrawarm1.medium.search' | 'ultrawarm1.large.search' | 'ultrawarm1.xlarge.search' | 't2.micro.search' | 't2.small.search' | 't2.medium.search' | 'r3.large.search' | 'r3.xlarge.search' | 'r3.2xlarge.search' | 'r3.4xlarge.search' | 'r3.8xlarge.search' | 'i2.xlarge.search' | 'i2.2xlarge.search' | 'd2.xlarge.search' | 'd2.2xlarge.search' | 'd2.4xlarge.search' | 'd2.8xlarge.search' | 'c4.large.search' | 'c4.xlarge.search' | 'c4.2xlarge.search' | 'c4.4xlarge.search' | 'c4.8xlarge.search' | 'r4.large.search' | 'r4.xlarge.search' | 'r4.2xlarge.search' | 'r4.4xlarge.search' | 'r4.8xlarge.search' | 'r4.16xlarge.search' | 'i3.large.search' | 'i3.xlarge.search' | 'i3.2xlarge.search' | 'i3.4xlarge.search' | 'i3.8xlarge.search' | 'i3.16xlarge.search' | 'r6g.large.search' | 'r6g.xlarge.search' | 'r6g.2xlarge.search' | 'r6g.4xlarge.search' | 'r6g.8xlarge.search' | 'r6g.12xlarge.search' | 'm6g.large.search' | 'm6g.xlarge.search' | 'm6g.2xlarge.search' | 'm6g.4xlarge.search' | 'm6g.8xlarge.search' | 'm6g.12xlarge.search' | 'c6g.large.search' | 'c6g.xlarge.search' | 'c6g.2xlarge.search' | 'c6g.4xlarge.search' | 'c6g.8xlarge.search' | 'c6g.12xlarge.search' | 'r6gd.large.search' | 'r6gd.xlarge.search' | 'r6gd.2xlarge.search' | 'r6gd.4xlarge.search' | 'r6gd.8xlarge.search' | 'r6gd.12xlarge.search' | 'r6gd.16xlarge.search' | 't4g.small.search' | 't4g.medium.search';
  /** Number of dedicated master nodes in the cluster. This number must be greater than 2 and not 4, otherwise you receive a validation exception. */
  DedicatedMasterCount?: number;
  /** Whether to enable warm storage for the cluster. */
  WarmEnabled?: boolean;
  /** The instance type for the cluster's warm nodes. */
  WarmType?: 'ultrawarm1.medium.search' | 'ultrawarm1.large.search' | 'ultrawarm1.xlarge.search';
  /** The number of warm nodes in the cluster. */
  WarmCount?: number;
  /** Container for cold storage configuration options. */
  ColdStorageOptions?: ColdStorageOptions;
  /** A boolean that indicates whether a multi-AZ domain is turned on with a standby AZ. For more information, see Configuring a multi-AZ domain in Amazon OpenSearch Service. */
  MultiAZWithStandbyEnabled?: boolean;
  /** List of node options for the domain. */
  NodeOptions?: any[];
}

export interface EBSOptions {
  /** Indicates whether EBS volumes are attached to data nodes in an OpenSearch Service domain. */
  EBSEnabled?: boolean;
  /** Specifies the type of EBS volumes attached to data nodes. */
  VolumeType?: 'standard' | 'gp2' | 'io1' | 'gp3';
  /** Specifies the size (in GiB) of EBS volumes attached to data nodes. */
  VolumeSize?: number;
  /** Specifies the baseline input/output (I/O) performance of EBS volumes attached to data nodes. Applicable only for the gp3 and provisioned IOPS EBS volume types. */
  Iops?: number;
  /** Specifies the throughput (in MiB/s) of the EBS volumes attached to data nodes. Applicable only for the gp3 volume type. */
  Throughput?: number;
}

export interface SnapshotOptions {
  /** The time, in UTC format, when OpenSearch Service takes a daily automated snapshot of the specified domain. Default is 0 hours. */
  AutomatedSnapshotStartHour?: number;
}

export interface VPCOptions {
  /** A list of subnet IDs associated with the VPC endpoints for the domain. If your domain uses multiple Availability Zones, you need to provide two subnet IDs, one per zone. Otherwise, provide only one. */
  SubnetIds?: string[];
  /** The list of security group IDs associated with the VPC endpoints for the domain. If you do not provide a security group ID, OpenSearch Service uses the default security group for the VPC. */
  SecurityGroupIds?: string[];
}

export interface CognitoOptions {
  /** Whether to enable or disable Amazon Cognito authentication for OpenSearch Dashboards. */
  Enabled?: boolean;
  /** The Amazon Cognito user pool ID that you want OpenSearch Service to use for OpenSearch Dashboards authentication. */
  UserPoolId?: string;
  /** The Amazon Cognito identity pool ID that you want OpenSearch Service to use for OpenSearch Dashboards authentication. */
  IdentityPoolId?: string;
  /** The AmazonOpenSearchServiceCognitoAccess role that allows OpenSearch Service to configure your user pool and identity pool. */
  RoleArn?: string;
}

export interface EncryptionAtRestOptions {
  /** True to enable encryption at rest. */
  Enabled?: boolean;
  /** The KMS key ID. Takes the form 1a2a3a4-1a2a-3a4a-5a6a-1a2a3a4a5a6a. */
  KmsKeyId?: string;
}

export interface NodeToNodeEncryptionOptions {
  /** True to enable node-to-node encryption. */
  Enabled?: boolean;
}

export interface LogPublishingOption {
  /** The Amazon Resource Name (ARN) of the CloudWatch Logs group to publish logs to. */
  CloudWatchLogsLogGroupArn?: string;
  /** Whether the log should be published. */
  Enabled?: boolean;
}

export interface DomainEndpointOptions {
  /** True to require that all traffic to the domain arrive over HTTPS. */
  EnforceHTTPS?: boolean;
  /** Specify the TLS security policy to apply to the HTTPS endpoint of the domain. The policy can be one of the following values: Policy-Min-TLS-1-0-2019-07: TLS security policy that supports TLS version 1 */
  TLSSecurityPolicy?: 'Policy-Min-TLS-1-0-2019-07' | 'Policy-Min-TLS-1-2-2019-07' | 'Policy-Min-TLS-1-2-PFS-2023-10';
  /** Whether to enable a custom endpoint for the domain. */
  CustomEndpointEnabled?: boolean;
  /** The fully qualified URL for the custom endpoint. */
  CustomEndpoint?: string;
  /** The ARN for your security certificate, managed in Amazon Web Services Certificate Manager (ACM). */
  CustomEndpointCertificateArn?: string;
}

export interface MasterUserOptions {
  /** Amazon Resource Name (ARN) for the master user. Only specify if InternalUserDatabaseEnabled is false. */
  MasterUserARN?: string;
  /** User name for the master user. Only specify if InternalUserDatabaseEnabled is true. */
  MasterUserName?: string;
  /** Password for the master user. Only specify if InternalUserDatabaseEnabled is true. */
  MasterUserPassword?: string;
}

export interface SAMLOptionsInput {
  /** True to enable SAML authentication for a domain. */
  Enabled?: boolean;
  /** The SAML Identity Provider's information. */
  Idp?: any;
  /** The SAML master user name, which is stored in the domain's internal user database. */
  MasterUserName?: string;
  /** The backend role that the SAML master user is mapped to. */
  MasterBackendRole?: string;
  /** Element of the SAML assertion to use for the user name. Default is NameID. */
  SubjectKey?: string;
  /** Element of the SAML assertion to use for backend roles. Default is roles. */
  RolesKey?: string;
  /** The duration, in minutes, after which a user session becomes inactive. Acceptable values are between 1 and 1440, and the default value is 60. */
  SessionTimeoutMinutes?: number;
}

export interface JWTOptionsInput {
  /** True to enable JWT authentication and authorization for a domain. */
  Enabled?: boolean;
  /** Element of the JWT assertion to use for the user name. */
  SubjectKey?: string;
  /** Element of the JWT assertion to use for roles. */
  RolesKey?: string;
  /** Element of the JWT assertion used by the cluster to verify JWT signatures. */
  PublicKey?: string;
}

export interface IAMFederationOptionsInput {
  /** Specifies whether IAM identity federation is enabled for the OpenSearch domain. */
  Enabled?: boolean;
  /** The key in the SAML assertion that contains the user's subject identifier. */
  SubjectKey?: string;
  /** The key in the SAML assertion that contains the user's role information. */
  RolesKey?: string;
}

export interface AdvancedSecurityOptionsInput {
  /** True to enable fine-grained access control. */
  Enabled?: boolean;
  /** True to enable the internal user database. */
  InternalUserDatabaseEnabled?: boolean;
  /** Container for information about the master user. */
  MasterUserOptions?: MasterUserOptions;
  /** Container for information about the SAML configuration for OpenSearch Dashboards. */
  SAMLOptions?: SAMLOptionsInput;
  /** Container for information about the JWT configuration of the Amazon OpenSearch Service. */
  JWTOptions?: JWTOptionsInput;
  /** Input configuration for IAM identity federation within advanced security options. */
  IAMFederationOptions?: IAMFederationOptionsInput;
  /** True to enable a 30-day migration period during which administrators can create role mappings. Only necessary when enabling fine-grained access control on an existing domain. */
  AnonymousAuthEnabled?: boolean;
}

export interface IdentityCenterOptionsInput {
  /** Indicates whether IAM Identity Center is enabled for API access in Amazon OpenSearch Service. */
  EnabledAPIAccess?: boolean;
  /** The ARN of the IAM Identity Center instance used to create an OpenSearch UI application that uses IAM Identity Center for authentication. */
  IdentityCenterInstanceARN?: string;
  /** Specifies the attribute that contains the subject identifier (such as username, user ID, or email) in IAM Identity Center. */
  SubjectKey?: 'UserName' | 'UserId' | 'Email';
  /** Specifies the attribute that contains the backend role identifier (such as group name or group ID) in IAM Identity Center. */
  RolesKey?: 'GroupName' | 'GroupId';
}

export interface AutoTuneOptionsInput {
  /** Whether Auto-Tune is enabled or disabled. */
  DesiredState?: 'ENABLED' | 'DISABLED';
  /** A list of maintenance schedules during which Auto-Tune can deploy changes. Maintenance windows are deprecated and have been replaced with off-peak windows. */
  MaintenanceSchedules?: any[];
  /** Whether to schedule Auto-Tune optimizations that require blue/green deployments during the domain's configured daily off-peak window. */
  UseOffPeakWindow?: boolean;
}

export interface OffPeakWindow {
  /** A custom start time for the off-peak window, in Coordinated Universal Time (UTC). The window length will always be 10 hours, so you can't specify an end time. For example, if you specify 11:00 P.M. UT */
  WindowStartTime?: any;
}

export interface OffPeakWindowOptions {
  /** Whether to enable an off-peak window. This option is only available when modifying a domain created prior to February 16, 2023, not when creating a new domain. All domains created after this date have */
  Enabled?: boolean;
  /** Off-peak window settings for the domain. */
  OffPeakWindow?: OffPeakWindow;
}

export interface SoftwareUpdateOptions {
  /** Whether automatic service software updates are enabled for the domain. */
  AutoSoftwareUpdateEnabled?: boolean;
}

export interface NaturalLanguageQueryGenerationOptionsInput {
  /** The desired state of the natural language query generation feature. Valid values are ENABLED and DISABLED. */
  DesiredState?: 'ENABLED' | 'DISABLED';
}

export interface S3VectorsEngine {
  /** Enables S3 vectors engine features. */
  Enabled?: boolean;
}

export interface ServerlessVectorAcceleration {
  /** Specifies whether serverless vector acceleration is enabled for the domain. */
  Enabled?: boolean;
}

export interface AIMLOptionsInput {
  /** Container for parameters required for natural language query generation on the specified domain. */
  NaturalLanguageQueryGenerationOptions?: NaturalLanguageQueryGenerationOptionsInput;
  /** Container for parameters required to enable S3 vectors engine features on the specified domain. */
  S3VectorsEngine?: S3VectorsEngine;
  /** Specifies whether to enable serverless vector acceleration for the domain. When enabled, provides GPU-accelerated vector search capabilities for improved performance on vector workloads. */
  ServerlessVectorAcceleration?: ServerlessVectorAcceleration;
}

export interface AWSDomainInformation {
  /** The Amazon Web Services account ID of the domain owner. */
  OwnerId?: string;
  /** Name of the domain. */
  DomainName: string;
  /** The Amazon Web Services Region in which the domain is located. */
  Region?: string;
}

export interface DomainInformationContainer {
  /** Information about an Amazon OpenSearch Service domain. */
  AWSDomainInformation?: AWSDomainInformation;
}

export interface CrossClusterSearchConnectionProperties {
  /** The status of the SkipUnavailable setting for the outbound connection. This feature allows you to specify some clusters as optional and ensure that your cross-cluster queries return partial results de */
  SkipUnavailable?: 'ENABLED' | 'DISABLED';
}

export interface ConnectionProperties {
  /** The Endpoint attribute cannot be modified. The endpoint of the remote domain. Applicable for VPC_ENDPOINT connection mode. */
  Endpoint?: string;
  /** The connection properties for cross cluster search. */
  CrossClusterSearch?: CrossClusterSearchConnectionProperties;
}

export interface PackageSource {
  /** The name of the Amazon S3 bucket containing the package. */
  S3BucketName?: string;
  /** Key (file name) of the package. */
  S3Key?: string;
}

export interface PackageConfiguration {
  /** The license requirements for the package. */
  LicenseRequirement: 'REQUIRED' | 'OPTIONAL' | 'NONE';
  /** The relative file path for the license associated with the package. */
  LicenseFilepath?: string;
  /** The configuration requirements for the package. */
  ConfigurationRequirement: 'REQUIRED' | 'OPTIONAL' | 'NONE';
  /** This indicates whether a B/G deployment is required for updating the configuration that the plugin is prerequisite for. */
  RequiresRestartForConfigurationUpdate?: boolean;
}

export interface PackageVendingOptions {
  /** Indicates whether the package vending feature is enabled, allowing the package to be used by other users. */
  VendingEnabled: boolean;
}

export interface PackageEncryptionOptions {
  /** KMS key ID for encrypting the package. */
  KmsKeyIdentifier?: string;
  /** Whether encryption is enabled for the package. */
  EncryptionEnabled: boolean;
}

export interface Filter {
  /** The name of the filter. */
  Name?: string;
  /** One or more values for the filter. */
  Values?: any[];
}

export interface DescribePackagesFilter {
  /** Any field from PackageDetails. */
  Name?: 'PackageID' | 'PackageName' | 'PackageStatus' | 'PackageType' | 'EngineVersion' | 'PackageOwner';
  /** A non-empty list of values for the specified filter field. */
  Value?: any[];
}

export interface AutoTuneOptions {
  /** Whether Auto-Tune is enabled or disabled. */
  DesiredState?: 'ENABLED' | 'DISABLED';
  /** When disabling Auto-Tune, specify NO_ROLLBACK to retain all prior Auto-Tune settings or DEFAULT_ROLLBACK to revert to the OpenSearch Service defaults. If you specify DEFAULT_ROLLBACK, you must include */
  RollbackOnDisable?: 'NO_ROLLBACK' | 'DEFAULT_ROLLBACK';
  /** DEPRECATED. Use off-peak window instead. A list of maintenance schedules during which Auto-Tune can deploy changes. */
  MaintenanceSchedules?: any[];
  /** Whether to use the domain's off-peak window to deploy configuration changes on the domain rather than a maintenance schedule. */
  UseOffPeakWindow?: boolean;
}

/** Container for the parameters to the AcceptInboundConnection operation. */
export interface AcceptInboundConnectionInput {
  /** The ID of the inbound connection to accept. */
  ConnectionId: string;
}

/** Container for the parameters to the AddDataSource operation. */
export interface AddDataSourceInput {
  /** The type of data source. */
  DataSourceType: { S3GlueDataCatalog?: S3GlueDataCatalog };
  /** The name of the domain to add the data source to. */
  DomainName: string;
  /** A name for the data source. */
  Name: string;
  /** A description of the data source. */
  Description?: string;
}

export interface AddDirectQueryDataSourceInput {
  /** A unique, user-defined label to identify the data source within your OpenSearch Service environment. */
  DataSourceName: string;
  /** The supported Amazon Web Services service that you want to use as the source for direct queries in OpenSearch Service. */
  DataSourceType: { CloudWatchLog?: CloudWatchDirectQueryDataSource } | { SecurityLake?: SecurityLakeDirectQueryDataSource };
  /** A list of Amazon Resource Names (ARNs) for the OpenSearch collections that are associated with the direct query data source. */
  OpenSearchArns: string[];
  /** An optional text field for providing additional context and details about the data source. */
  Description?: string;
  TagList?: Tag[];
}

/** Container for the parameters to the AddTags operation. Specifies the tags to attach to the domain, data source, or application. */
export interface AddTagsInput {
  /** Amazon Resource Name (ARN) for the OpenSearch Service domain, data source, or application to which you want to attach resource tags. */
  ARN: string;
  /** List of resource tags. */
  TagList: Tag[];
}

/** Container for the request parameters to the AssociatePackage operation. */
export interface AssociatePackageInput {
  /** Name of the domain to associate the package with. */
  DomainName: string;
  /** Internal ID of the package to associate with a domain. Use DescribePackages to find this value. */
  PackageID: string;
  /** The configuration for associating a package with an Amazon OpenSearch Service domain. */
  AssociationConfiguration?: PackageAssociationConfiguration;
  /** A list of package IDs that must be associated with the domain before the package specified in the request can be associated. */
  PrerequisitePackageIDList?: string[];
}

export interface AssociatePackagesInput {
  DomainName: string;
  /** A list of packages and their prerequisites to be associated with a domain. */
  PackageList: PackageDetailsForAssociation[];
}

export interface AuthorizeVpcEndpointAccessInput {
  /** The name of the OpenSearch Service domain to provide access to. */
  DomainName: string;
  /** The Amazon Web Services account ID to grant access to. */
  Account?: string;
  /** The Amazon Web Services service SP to grant access to. */
  Service?: 'application.opensearchservice.amazonaws.com';
}

export interface CancelDomainConfigChangeInput {
  DomainName: string;
  /** When set to True, returns the list of change IDs and properties that will be cancelled without actually cancelling the change. */
  DryRun?: boolean;
}

/** Container for the request parameters to cancel a service software update. */
export interface CancelServiceSoftwareUpdateInput {
  /** Name of the OpenSearch Service domain that you want to cancel the service software update on. */
  DomainName: string;
}

export interface CreateApplicationInput {
  /** The unique name of the OpenSearch application. Names must be unique within an Amazon Web Services Region for each account. */
  name: string;
  /** Configuration settings for the OpenSearch application, including administrative options. */
  appConfigs?: AppConfig[];
  /** Unique, case-sensitive identifier to ensure idempotency of the request. */
  clientToken?: string;
  /** The data sources to link to the OpenSearch application. */
  dataSources?: DataSource[];
  /** Configuration settings for integrating Amazon Web Services IAM Identity Center with the OpenSearch application. */
  iamIdentityCenterOptions?: IamIdentityCenterOptionsInput;
  /** The Amazon Resource Name (ARN) of the KMS key used to encrypt the application's data at rest. If provided, the application uses your customer-managed key for encryption. If omitted, the application us */
  kmsKeyArn?: string;
  tagList?: Tag[];
}

export interface CreateDomainInput {
  /** Name of the OpenSearch Service domain to create. Domain names are unique across the domains owned by an account within an Amazon Web Services Region. */
  DomainName: string;
  /** Identity and Access Management (IAM) policy document specifying the access policies for the new domain. */
  AccessPolicies?: string;
  /** Key-value pairs to specify advanced configuration options. The following key-value pairs are supported: "rest.action.multi.allow_explicit_index": "true" | "false" - Note the use of a string rather tha */
  AdvancedOptions?: Record<string, string>;
  /** Options for fine-grained access control. */
  AdvancedSecurityOptions?: AdvancedSecurityOptionsInput;
  /** Options for all machine learning features for the specified domain. */
  AIMLOptions?: AIMLOptionsInput;
  /** Options for Auto-Tune. */
  AutoTuneOptions?: AutoTuneOptionsInput;
  /** Container for the cluster configuration of a domain. */
  ClusterConfig?: ClusterConfig;
  /** Key-value pairs to configure Amazon Cognito authentication. For more information, see Configuring Amazon Cognito authentication for OpenSearch Dashboards. */
  CognitoOptions?: CognitoOptions;
  /** Additional options for the domain endpoint, such as whether to require HTTPS for all traffic. */
  DomainEndpointOptions?: DomainEndpointOptions;
  /** Container for the parameters required to enable EBS-based storage for an OpenSearch Service domain. */
  EBSOptions?: EBSOptions;
  /** Key-value pairs to enable encryption at rest. */
  EncryptionAtRestOptions?: EncryptionAtRestOptions;
  /** String of format Elasticsearch_X.Y or OpenSearch_X.Y to specify the engine version for the OpenSearch Service domain. For example, OpenSearch_1.0 or Elasticsearch_7.9. For more information, see Creati */
  EngineVersion?: string;
  /** Configuration options for enabling and managing IAM Identity Center integration within a domain. */
  IdentityCenterOptions?: IdentityCenterOptionsInput;
  /** Specify either dual stack or IPv4 as your IP address type. Dual stack allows you to share domain resources across IPv4 and IPv6 address types, and is the recommended option. If you set your IP address */
  IPAddressType?: 'ipv4' | 'dualstack';
  /** Key-value pairs to configure log publishing. */
  LogPublishingOptions?: Record<string, LogPublishingOption>;
  /** Enables node-to-node encryption. */
  NodeToNodeEncryptionOptions?: NodeToNodeEncryptionOptions;
  /** Specifies a daily 10-hour time block during which OpenSearch Service can perform configuration changes on the domain, including service software updates and Auto-Tune enhancements that require a blue/ */
  OffPeakWindowOptions?: OffPeakWindowOptions;
  /** DEPRECATED. Container for the parameters required to configure automated snapshots of domain indexes. */
  SnapshotOptions?: SnapshotOptions;
  /** Software update options for the domain. */
  SoftwareUpdateOptions?: SoftwareUpdateOptions;
  /** List of tags to add to the domain upon creation. */
  TagList?: Tag[];
  /** Container for the values required to configure VPC access domains. If you don't specify these values, OpenSearch Service creates the domain with a public endpoint. For more information, see Launching  */
  VPCOptions?: VPCOptions;
}

export interface CreateIndexInput {
  DomainName: string;
  /** The name of the index to create. Must be between 1 and 255 characters and follow OpenSearch naming conventions. */
  IndexName: string;
  /** The JSON schema defining index mappings, settings, and semantic enrichment configuration. The schema specifies which text fields should be automatically enriched for semantic search capabilities and i */
  IndexSchema: any;
}

/** Container for the parameters to the CreateOutboundConnection operation. */
export interface CreateOutboundConnectionInput {
  /** Name of the connection. */
  ConnectionAlias: string;
  /** Name and Region of the source (local) domain. */
  LocalDomainInfo: DomainInformationContainer;
  /** Name and Region of the destination (remote) domain. */
  RemoteDomainInfo: DomainInformationContainer;
  /** The connection mode. */
  ConnectionMode?: 'DIRECT' | 'VPC_ENDPOINT';
  /** The ConnectionProperties for the outbound connection. */
  ConnectionProperties?: ConnectionProperties;
}

/** Container for request parameters to the CreatePackage operation. */
export interface CreatePackageInput {
  /** Unique name for the package. */
  PackageName: string;
  /** The Amazon S3 location from which to import the package. */
  PackageSource: PackageSource;
  /** The type of package. */
  PackageType: 'TXT-DICTIONARY' | 'ZIP-PLUGIN' | 'PACKAGE-LICENSE' | 'PACKAGE-CONFIG';
  /** The version of the Amazon OpenSearch Service engine for which is compatible with the package. This can only be specified for package type ZIP-PLUGIN */
  EngineVersion?: string;
  /** The configuration parameters for the package being created. */
  PackageConfiguration?: PackageConfiguration;
  /** Description of the package. */
  PackageDescription?: string;
  /** The encryption parameters for the package being created. */
  PackageEncryptionOptions?: PackageEncryptionOptions;
  /** The vending options for the package being created. They determine if the package can be vended to other users. */
  PackageVendingOptions?: PackageVendingOptions;
}

export interface CreateVpcEndpointInput {
  /** The Amazon Resource Name (ARN) of the domain to create the endpoint for. */
  DomainArn: string;
  /** Options to specify the subnets and security groups for the endpoint. */
  VpcOptions: VPCOptions;
  /** Unique, case-sensitive identifier to ensure idempotency of the request. */
  ClientToken?: string;
}

export interface DeleteApplicationInput {
  /** The unique identifier of the OpenSearch application to delete. */
  id: string;
}

/** Container for the parameters to the DeleteDataSource operation. */
export interface DeleteDataSourceInput {
  /** The name of the domain. */
  DomainName: string;
  /** The name of the data source to delete. */
  Name: string;
}

export interface DeleteDirectQueryDataSourceInput {
  /** A unique, user-defined label to identify the data source within your OpenSearch Service environment. */
  DataSourceName: string;
}

/** Container for the parameters to the DeleteDomain operation. */
export interface DeleteDomainInput {
  /** The name of the domain you want to permanently delete. */
  DomainName: string;
}

/** Container for the parameters to the DeleteInboundConnection operation. */
export interface DeleteInboundConnectionInput {
  /** The ID of the inbound connection to permanently delete. */
  ConnectionId: string;
}

export interface DeleteIndexInput {
  DomainName: string;
  /** The name of the index to delete. */
  IndexName: string;
}

/** Container for the parameters to the DeleteOutboundConnection operation. */
export interface DeleteOutboundConnectionInput {
  /** The ID of the outbound connection you want to permanently delete. */
  ConnectionId: string;
}

/** Deletes a package from OpenSearch Service. The package can't be associated with any OpenSearch Service domain. */
export interface DeletePackageInput {
  /** The internal ID of the package you want to delete. Use DescribePackages to find this value. */
  PackageID: string;
}

export interface DeleteVpcEndpointInput {
  /** The unique identifier of the endpoint. */
  VpcEndpointId: string;
}

/** Container for the parameters to the DescribeDomain operation. */
export interface DescribeDomainInput {
  /** The name of the domain that you want information about. */
  DomainName: string;
}

/** Container for the parameters to the DescribeDomainAutoTunes operation. */
export interface DescribeDomainAutoTunesInput {
  /** Name of the domain that you want Auto-Tune details about. */
  DomainName: string;
  /** An optional parameter that specifies the maximum number of results to return. You can use nextToken to get the next page of results. */
  MaxResults?: number;
  /** If your initial DescribeDomainAutoTunes operation returns a nextToken, you can include the returned nextToken in subsequent DescribeDomainAutoTunes operations, which returns results in the next page. */
  NextToken?: string;
}

/** Container for the parameters to the DescribeDomainChangeProgress operation. */
export interface DescribeDomainChangeProgressInput {
  /** The name of the domain to get progress information for. */
  DomainName: string;
  /** The specific change ID for which you want to get progress information. If omitted, the request returns information about the most recent configuration change. */
  ChangeId?: string;
}

/** Container for the parameters to the DescribeDomainConfig operation. */
export interface DescribeDomainConfigInput {
  /** Name of the OpenSearch Service domain configuration that you want to describe. */
  DomainName: string;
}

/** Container for the parameters to the DescribeDomainHealth operation. */
export interface DescribeDomainHealthInput {
  /** The name of the domain. */
  DomainName: string;
}

/** Container for the parameters to the DescribeDomainNodes operation. */
export interface DescribeDomainNodesInput {
  /** The name of the domain. */
  DomainName: string;
}

/** Container for the parameters to the DescribeDomains operation. */
export interface DescribeDomainsInput {
  /** Array of OpenSearch Service domain names that you want information about. You must specify at least one domain name. */
  DomainNames: string[];
}

export interface DescribeDryRunProgressInput {
  /** The name of the domain. */
  DomainName: string;
  /** The unique identifier of the dry run. */
  DryRunId?: string;
  /** Whether to include the configuration of the dry run in the response. The configuration specifies the updates that you're planning to make on the domain. */
  LoadDryRunConfig?: boolean;
}

/** Container for the parameters to the DescribeInboundConnections operation. */
export interface DescribeInboundConnectionsInput {
  /** A list of filters used to match properties for inbound cross-cluster connections. */
  Filters?: Filter[];
  /** An optional parameter that specifies the maximum number of results to return. You can use nextToken to get the next page of results. */
  MaxResults?: number;
  /** If your initial DescribeInboundConnections operation returns a nextToken, you can include the returned nextToken in subsequent DescribeInboundConnections operations, which returns results in the next  */
  NextToken?: string;
}

/** Container for the parameters to the DescribeInstanceTypeLimits operation. */
export interface DescribeInstanceTypeLimitsInput {
  /** Version of OpenSearch or Elasticsearch, in the format Elasticsearch_X.Y or OpenSearch_X.Y. Defaults to the latest version of OpenSearch. */
  EngineVersion: string;
  /** The OpenSearch Service instance type for which you need limit information. */
  InstanceType: 'm3.medium.search' | 'm3.large.search' | 'm3.xlarge.search' | 'm3.2xlarge.search' | 'm4.large.search' | 'm4.xlarge.search' | 'm4.2xlarge.search' | 'm4.4xlarge.search' | 'm4.10xlarge.search' | 'm5.large.search' | 'm5.xlarge.search' | 'm5.2xlarge.search' | 'm5.4xlarge.search' | 'm5.12xlarge.search' | 'm5.24xlarge.search' | 'r5.large.search' | 'r5.xlarge.search' | 'r5.2xlarge.search' | 'r5.4xlarge.search' | 'r5.12xlarge.search' | 'r5.24xlarge.search' | 'c5.large.search' | 'c5.xlarge.search' | 'c5.2xlarge.search' | 'c5.4xlarge.search' | 'c5.9xlarge.search' | 'c5.18xlarge.search' | 't3.nano.search' | 't3.micro.search' | 't3.small.search' | 't3.medium.search' | 't3.large.search' | 't3.xlarge.search' | 't3.2xlarge.search' | 'or1.medium.search' | 'or1.large.search' | 'or1.xlarge.search' | 'or1.2xlarge.search' | 'or1.4xlarge.search' | 'or1.8xlarge.search' | 'or1.12xlarge.search' | 'or1.16xlarge.search' | 'ultrawarm1.medium.search' | 'ultrawarm1.large.search' | 'ultrawarm1.xlarge.search' | 't2.micro.search' | 't2.small.search' | 't2.medium.search' | 'r3.large.search' | 'r3.xlarge.search' | 'r3.2xlarge.search' | 'r3.4xlarge.search' | 'r3.8xlarge.search' | 'i2.xlarge.search' | 'i2.2xlarge.search' | 'd2.xlarge.search' | 'd2.2xlarge.search' | 'd2.4xlarge.search' | 'd2.8xlarge.search' | 'c4.large.search' | 'c4.xlarge.search' | 'c4.2xlarge.search' | 'c4.4xlarge.search' | 'c4.8xlarge.search' | 'r4.large.search' | 'r4.xlarge.search' | 'r4.2xlarge.search' | 'r4.4xlarge.search' | 'r4.8xlarge.search' | 'r4.16xlarge.search' | 'i3.large.search' | 'i3.xlarge.search' | 'i3.2xlarge.search' | 'i3.4xlarge.search' | 'i3.8xlarge.search' | 'i3.16xlarge.search' | 'r6g.large.search' | 'r6g.xlarge.search' | 'r6g.2xlarge.search' | 'r6g.4xlarge.search' | 'r6g.8xlarge.search' | 'r6g.12xlarge.search' | 'm6g.large.search' | 'm6g.xlarge.search' | 'm6g.2xlarge.search' | 'm6g.4xlarge.search' | 'm6g.8xlarge.search' | 'm6g.12xlarge.search' | 'c6g.large.search' | 'c6g.xlarge.search' | 'c6g.2xlarge.search' | 'c6g.4xlarge.search' | 'c6g.8xlarge.search' | 'c6g.12xlarge.search' | 'r6gd.large.search' | 'r6gd.xlarge.search' | 'r6gd.2xlarge.search' | 'r6gd.4xlarge.search' | 'r6gd.8xlarge.search' | 'r6gd.12xlarge.search' | 'r6gd.16xlarge.search' | 't4g.small.search' | 't4g.medium.search';
  /** The name of the domain. Only specify if you need the limits for an existing domain. */
  DomainName?: string;
}

/** Container for the parameters to the DescribeOutboundConnections operation. */
export interface DescribeOutboundConnectionsInput {
  /** List of filter names and values that you can use for requests. */
  Filters?: Filter[];
  /** An optional parameter that specifies the maximum number of results to return. You can use nextToken to get the next page of results. */
  MaxResults?: number;
  /** If your initial DescribeOutboundConnections operation returns a nextToken, you can include the returned nextToken in subsequent DescribeOutboundConnections operations, which returns results in the nex */
  NextToken?: string;
}

/** Container for the request parameters to the DescribePackage operation. */
export interface DescribePackagesInput {
  /** Only returns packages that match the DescribePackagesFilterList values. */
  Filters?: DescribePackagesFilter[];
  /** An optional parameter that specifies the maximum number of results to return. You can use nextToken to get the next page of results. */
  MaxResults?: number;
  /** If your initial DescribePackageFilters operation returns a nextToken, you can include the returned nextToken in subsequent DescribePackageFilters operations, which returns results in the next page. */
  NextToken?: string;
}

/** Container for the request parameters to a DescribeReservedInstanceOfferings operation. */
export interface DescribeReservedInstanceOfferingsInput {
  /** An optional parameter that specifies the maximum number of results to return. You can use nextToken to get the next page of results. */
  MaxResults?: number;
  /** If your initial DescribeReservedInstanceOfferings operation returns a nextToken, you can include the returned nextToken in subsequent DescribeReservedInstanceOfferings operations, which returns result */
  NextToken?: string;
  /** The Reserved Instance identifier filter value. Use this parameter to show only the available instance types that match the specified reservation identifier. */
  ReservedInstanceOfferingId?: string;
}

/** Container for the request parameters to the DescribeReservedInstances operation. */
export interface DescribeReservedInstancesInput {
  /** An optional parameter that specifies the maximum number of results to return. You can use nextToken to get the next page of results. */
  MaxResults?: number;
  /** If your initial DescribeReservedInstances operation returns a nextToken, you can include the returned nextToken in subsequent DescribeReservedInstances operations, which returns results in the next pa */
  NextToken?: string;
  /** The reserved instance identifier filter value. Use this parameter to show only the reservation that matches the specified reserved OpenSearch instance ID. */
  ReservedInstanceId?: string;
}

export interface DescribeVpcEndpointsInput {
  /** The unique identifiers of the endpoints to get information about. */
  VpcEndpointIds: string[];
}

/** Container for the request parameters to the DissociatePackage operation. */
export interface DissociatePackageInput {
  /** Name of the domain to dissociate the package from. */
  DomainName: string;
  /** Internal ID of the package to dissociate from the domain. Use ListPackagesForDomain to find this value. */
  PackageID: string;
}

export interface DissociatePackagesInput {
  DomainName: string;
  /** A list of package IDs to be dissociated from a domain. */
  PackageList: string[];
}

export interface GetApplicationInput {
  /** The unique identifier of the OpenSearch application to retrieve. */
  id: string;
}

/** Container for the request parameters to GetCompatibleVersions operation. */
export interface GetCompatibleVersionsInput {
  /** The name of an existing domain. Provide this parameter to limit the results to a single domain. */
  DomainName?: string;
}

/** Container for the parameters to the GetDataSource operation. */
export interface GetDataSourceInput {
  /** The name of the domain. */
  DomainName: string;
  /** The name of the data source to get information about. */
  Name: string;
}

export interface GetDirectQueryDataSourceInput {
  /** A unique, user-defined label that identifies the data source within your OpenSearch Service environment. */
  DataSourceName: string;
}

/** Container for the parameters to the GetDomainMaintenanceStatus operation. */
export interface GetDomainMaintenanceStatusInput {
  /** The name of the domain. */
  DomainName: string;
  /** The request ID of the maintenance action. */
  MaintenanceId: string;
}

export interface GetIndexInput {
  DomainName: string;
  /** The name of the index to retrieve information about. */
  IndexName: string;
}

/** Container for the request parameters to the GetPackageVersionHistory operation. */
export interface GetPackageVersionHistoryInput {
  /** The unique identifier of the package. */
  PackageID: string;
  /** An optional parameter that specifies the maximum number of results to return. You can use nextToken to get the next page of results. */
  MaxResults?: number;
  /** If your initial GetPackageVersionHistory operation returns a nextToken, you can include the returned nextToken in subsequent GetPackageVersionHistory operations, which returns results in the next page */
  NextToken?: string;
}

/** Container for the request parameters to the GetUpgradeHistory operation. */
export interface GetUpgradeHistoryInput {
  /** The name of an existing domain. */
  DomainName: string;
  /** An optional parameter that specifies the maximum number of results to return. You can use nextToken to get the next page of results. */
  MaxResults?: number;
  /** If your initial GetUpgradeHistory operation returns a nextToken, you can include the returned nextToken in subsequent GetUpgradeHistory operations, which returns results in the next page. */
  NextToken?: string;
}

/** Container for the request parameters to the GetUpgradeStatus operation. */
export interface GetUpgradeStatusInput {
  /** The domain of the domain to get upgrade status information for. */
  DomainName: string;
}

export interface ListApplicationsInput {
  maxResults?: number;
  nextToken?: string;
  /** Filters the list of OpenSearch applications by status. Possible values: CREATING, UPDATING, DELETING, FAILED, ACTIVE, and DELETED. */
  statuses?: 'CREATING' | 'UPDATING' | 'DELETING' | 'ACTIVE' | 'FAILED'[];
}

/** Container for the parameters to the ListDataSources operation. */
export interface ListDataSourcesInput {
  /** The name of the domain. */
  DomainName: string;
}

export interface ListDirectQueryDataSourcesInput {
  NextToken?: string;
}

/** Container for the parameters to the ListDomainMaintenances operation. */
export interface ListDomainMaintenancesInput {
  /** The name of the domain. */
  DomainName: string;
  /** The name of the action. */
  Action?: 'REBOOT_NODE' | 'RESTART_SEARCH_PROCESS' | 'RESTART_DASHBOARD';
  /** An optional parameter that specifies the maximum number of results to return. You can use nextToken to get the next page of results. */
  MaxResults?: number;
  /** If your initial ListDomainMaintenances operation returns a nextToken, include the returned nextToken in subsequent ListDomainMaintenances operations, which returns results in the next page. */
  NextToken?: string;
  /** The status of the action. */
  Status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'TIMED_OUT';
}

/** Container for the parameters to the ListDomainNames operation. */
export interface ListDomainNamesInput {
  /** Filters the output by domain engine type. */
  EngineType?: 'OpenSearch' | 'Elasticsearch';
}

/** Container for the request parameters to the ListDomainsForPackage operation. */
export interface ListDomainsForPackageInput {
  /** The unique identifier of the package for which to list associated domains. */
  PackageID: string;
  /** An optional parameter that specifies the maximum number of results to return. You can use nextToken to get the next page of results. */
  MaxResults?: number;
  /** If your initial ListDomainsForPackage operation returns a nextToken, you can include the returned nextToken in subsequent ListDomainsForPackage operations, which returns results in the next page. */
  NextToken?: string;
}

export interface ListInstanceTypeDetailsInput {
  /** The version of OpenSearch or Elasticsearch, in the format Elasticsearch_X.Y or OpenSearch_X.Y. Defaults to the latest version of OpenSearch. */
  EngineVersion: string;
  /** The name of the domain. */
  DomainName?: string;
  /** An optional parameter that lists information for a given instance type. */
  InstanceType?: string;
  /** An optional parameter that specifies the maximum number of results to return. You can use nextToken to get the next page of results. */
  MaxResults?: number;
  /** If your initial ListInstanceTypeDetails operation returns a nextToken, you can include the returned nextToken in subsequent ListInstanceTypeDetails operations, which returns results in the next page. */
  NextToken?: string;
  /** An optional parameter that specifies the Availability Zones for the domain. */
  RetrieveAZs?: boolean;
}

/** Container for the request parameters to the ListPackagesForDomain operation. */
export interface ListPackagesForDomainInput {
  /** The name of the domain for which you want to list associated packages. */
  DomainName: string;
  /** An optional parameter that specifies the maximum number of results to return. You can use nextToken to get the next page of results. */
  MaxResults?: number;
  /** If your initial ListPackagesForDomain operation returns a nextToken, you can include the returned nextToken in subsequent ListPackagesForDomain operations, which returns results in the next page. */
  NextToken?: string;
}

export interface ListScheduledActionsInput {
  /** The name of the domain. */
  DomainName: string;
  /** An optional parameter that specifies the maximum number of results to return. You can use nextToken to get the next page of results. */
  MaxResults?: number;
  /** If your initial ListScheduledActions operation returns a nextToken, you can include the returned nextToken in subsequent ListScheduledActions operations, which returns results in the next page. */
  NextToken?: string;
}

/** Container for the parameters to the ListTags operation. */
export interface ListTagsInput {
  /** Amazon Resource Name (ARN) for the domain, data source, or application to view tags for. */
  ARN: string;
}

/** Container for the request parameters to the ListVersions operation. */
export interface ListVersionsInput {
  /** An optional parameter that specifies the maximum number of results to return. You can use nextToken to get the next page of results. */
  MaxResults?: number;
  /** If your initial ListVersions operation returns a nextToken, you can include the returned nextToken in subsequent ListVersions operations, which returns results in the next page. */
  NextToken?: string;
}

export interface ListVpcEndpointAccessInput {
  /** The name of the OpenSearch Service domain to retrieve access information for. */
  DomainName: string;
  /** If your initial ListVpcEndpointAccess operation returns a nextToken, you can include the returned nextToken in subsequent ListVpcEndpointAccess operations, which returns results in the next page. */
  NextToken?: string;
}

export interface ListVpcEndpointsInput {
  /** If your initial ListVpcEndpoints operation returns a nextToken, you can include the returned nextToken in subsequent ListVpcEndpoints operations, which returns results in the next page. */
  NextToken?: string;
}

export interface ListVpcEndpointsForDomainInput {
  /** The name of the domain to list associated VPC endpoints for. */
  DomainName: string;
  /** If your initial ListEndpointsForDomain operation returns a nextToken, you can include the returned nextToken in subsequent ListEndpointsForDomain operations, which returns results in the next page. */
  NextToken?: string;
}

/** Container for request parameters to the PurchaseReservedInstanceOffering operation. */
export interface PurchaseReservedInstanceOfferingInput {
  /** A customer-specified identifier to track this reservation. */
  ReservationName: string;
  /** The ID of the Reserved Instance offering to purchase. */
  ReservedInstanceOfferingId: string;
  /** The number of OpenSearch instances to reserve. */
  InstanceCount?: number;
}

export interface PutDefaultApplicationSettingInput {
  applicationArn: string;
  /** Set to true to set the specified ARN as the default application. Set to false to clear the default application. */
  setAsDefault: boolean;
}

/** Container for the request parameters to the RejectInboundConnection operation. */
export interface RejectInboundConnectionInput {
  /** The unique identifier of the inbound connection to reject. */
  ConnectionId: string;
}

/** Container for the request parameters to the RemoveTags operation. */
export interface RemoveTagsInput {
  /** The Amazon Resource Name (ARN) of the domain, data source, or application from which you want to delete the specified tags. */
  ARN: string;
  /** The list of tag keys to remove from the domain, data source, or application. */
  TagKeys: string[];
}

export interface RevokeVpcEndpointAccessInput {
  /** The name of the OpenSearch Service domain. */
  DomainName: string;
  /** The account ID to revoke access from. */
  Account?: string;
  /** The service SP to revoke access from. */
  Service?: 'application.opensearchservice.amazonaws.com';
}

/** Container for the parameters to the StartDomainMaintenance operation. */
export interface StartDomainMaintenanceInput {
  /** The name of the action. */
  Action: 'REBOOT_NODE' | 'RESTART_SEARCH_PROCESS' | 'RESTART_DASHBOARD';
  /** The name of the domain. */
  DomainName: string;
  /** The ID of the data node. */
  NodeId?: string;
}

/** Container for the request parameters to the StartServiceSoftwareUpdate operation. */
export interface StartServiceSoftwareUpdateInput {
  /** The name of the domain that you want to update to the latest service software. */
  DomainName: string;
  /** The Epoch timestamp when you want the service software update to start. You only need to specify this parameter if you set ScheduleAt to TIMESTAMP. */
  DesiredStartTime?: number;
  /** When to start the service software update. NOW - Immediately schedules the update to happen in the current hour if there's capacity available. TIMESTAMP - Lets you specify a custom date and time to ap */
  ScheduleAt?: 'NOW' | 'TIMESTAMP' | 'OFF_PEAK_WINDOW';
}

export interface UpdateApplicationInput {
  /** The unique identifier for the OpenSearch application to be updated. */
  id: string;
  /** The configuration settings to modify for the OpenSearch application. */
  appConfigs?: AppConfig[];
  /** The data sources to associate with the OpenSearch application. */
  dataSources?: DataSource[];
}

/** Container for the parameters to the UpdateDataSource operation. */
export interface UpdateDataSourceInput {
  /** The type of data source. */
  DataSourceType: { S3GlueDataCatalog?: S3GlueDataCatalog };
  /** The name of the domain. */
  DomainName: string;
  /** The name of the data source to modify. */
  Name: string;
  /** A new description of the data source. */
  Description?: string;
  /** The status of the data source update. */
  Status?: 'ACTIVE' | 'DISABLED';
}

export interface UpdateDirectQueryDataSourceInput {
  /** A unique, user-defined label to identify the data source within your OpenSearch Service environment. */
  DataSourceName: string;
  /** The supported Amazon Web Services service that you want to use as the source for direct queries in OpenSearch Service. */
  DataSourceType: { CloudWatchLog?: CloudWatchDirectQueryDataSource } | { SecurityLake?: SecurityLakeDirectQueryDataSource };
  /** A list of Amazon Resource Names (ARNs) for the OpenSearch collections that are associated with the direct query data source. */
  OpenSearchArns: string[];
  /** An optional text field for providing additional context and details about the data source. */
  Description?: string;
}

/** Container for the request parameters to the UpdateDomain operation. */
export interface UpdateDomainConfigInput {
  /** The name of the domain that you're updating. */
  DomainName: string;
  /** Identity and Access Management (IAM) access policy as a JSON-formatted string. */
  AccessPolicies?: string;
  /** Key-value pairs to specify advanced configuration options. The following key-value pairs are supported: "rest.action.multi.allow_explicit_index": "true" | "false" - Note the use of a string rather tha */
  AdvancedOptions?: Record<string, string>;
  /** Options for fine-grained access control. */
  AdvancedSecurityOptions?: AdvancedSecurityOptionsInput;
  /** Options for all machine learning features for the specified domain. */
  AIMLOptions?: AIMLOptionsInput;
  /** Options for Auto-Tune. */
  AutoTuneOptions?: AutoTuneOptions;
  /** Changes that you want to make to the cluster configuration, such as the instance type and number of EC2 instances. */
  ClusterConfig?: ClusterConfig;
  /** Key-value pairs to configure Amazon Cognito authentication for OpenSearch Dashboards. */
  CognitoOptions?: CognitoOptions;
  /** Additional options for the domain endpoint, such as whether to require HTTPS for all traffic. */
  DomainEndpointOptions?: DomainEndpointOptions;
  /** This flag, when set to True, specifies whether the UpdateDomain request should return the results of a dry run analysis without actually applying the change. A dry run determines what type of deployme */
  DryRun?: boolean;
  /** The type of dry run to perform. Basic only returns the type of deployment (blue/green or dynamic) that the update will cause. Verbose runs an additional check to validate the changes you're making. Fo */
  DryRunMode?: 'Basic' | 'Verbose';
  /** The type and size of the EBS volume to attach to instances in the domain. */
  EBSOptions?: EBSOptions;
  /** Encryption at rest options for the domain. */
  EncryptionAtRestOptions?: EncryptionAtRestOptions;
  IdentityCenterOptions?: IdentityCenterOptionsInput;
  /** Specify either dual stack or IPv4 as your IP address type. Dual stack allows you to share domain resources across IPv4 and IPv6 address types, and is the recommended option. If your IP address type is */
  IPAddressType?: 'ipv4' | 'dualstack';
  /** Options to publish OpenSearch logs to Amazon CloudWatch Logs. */
  LogPublishingOptions?: Record<string, LogPublishingOption>;
  /** Node-to-node encryption options for the domain. */
  NodeToNodeEncryptionOptions?: NodeToNodeEncryptionOptions;
  /** Off-peak window options for the domain. */
  OffPeakWindowOptions?: OffPeakWindowOptions;
  /** Option to set the time, in UTC format, for the daily automated snapshot. Default value is 0 hours. */
  SnapshotOptions?: SnapshotOptions;
  /** Service software update options for the domain. */
  SoftwareUpdateOptions?: SoftwareUpdateOptions;
  /** Options to specify the subnets and security groups for a VPC endpoint. For more information, see Launching your Amazon OpenSearch Service domains using a VPC. */
  VPCOptions?: VPCOptions;
}

export interface UpdateIndexInput {
  DomainName: string;
  /** The name of the index to update. */
  IndexName: string;
  /** The updated JSON schema for the index including any changes to mappings, settings, and semantic enrichment configuration. */
  IndexSchema: any;
}

/** Container for request parameters to the UpdatePackage operation. */
export interface UpdatePackageInput {
  /** The unique identifier for the package. */
  PackageID: string;
  /** Amazon S3 bucket and key for the package. */
  PackageSource: PackageSource;
  /** Commit message for the updated file, which is shown as part of GetPackageVersionHistoryResponse. */
  CommitMessage?: string;
  /** The updated configuration details for a package. */
  PackageConfiguration?: PackageConfiguration;
  /** A new description of the package. */
  PackageDescription?: string;
  /** Encryption options for a package. */
  PackageEncryptionOptions?: PackageEncryptionOptions;
}

export interface UpdatePackageScopeInput {
  /** The operation to perform on the package scope (e.g., add/remove/override users). */
  Operation: 'ADD' | 'OVERRIDE' | 'REMOVE';
  /** ID of the package whose scope is being updated. */
  PackageID: string;
  /** List of users to be added or removed from the package scope. */
  PackageUserList: string[];
}

export interface UpdateScheduledActionInput {
  /** The unique identifier of the action to reschedule. To retrieve this ID, send a ListScheduledActions request. */
  ActionID: string;
  /** The type of action to reschedule. Can be one of SERVICE_SOFTWARE_UPDATE, JVM_HEAP_SIZE_TUNING, or JVM_YOUNG_GEN_TUNING. To retrieve this value, send a ListScheduledActions request. */
  ActionType: 'SERVICE_SOFTWARE_UPDATE' | 'JVM_HEAP_SIZE_TUNING' | 'JVM_YOUNG_GEN_TUNING';
  /** The name of the domain to reschedule an action for. */
  DomainName: string;
  /** When to schedule the action. NOW - Immediately schedules the update to happen in the current hour if there's capacity available. TIMESTAMP - Lets you specify a custom date and time to apply the update */
  ScheduleAt: 'NOW' | 'TIMESTAMP' | 'OFF_PEAK_WINDOW';
  /** The time to implement the change, in Coordinated Universal Time (UTC). Only specify this parameter if you set ScheduleAt to TIMESTAMP. */
  DesiredStartTime?: number;
}

export interface UpdateVpcEndpointInput {
  /** The unique identifier of the endpoint. */
  VpcEndpointId: string;
  /** The security groups and/or subnets to add, remove, or modify. */
  VpcOptions: VPCOptions;
}

/** Container for the request parameters to the UpgradeDomain operation. */
export interface UpgradeDomainInput {
  /** Name of the OpenSearch Service domain that you want to upgrade. */
  DomainName: string;
  /** OpenSearch or Elasticsearch version to which you want to upgrade, in the format Opensearch_X.Y or Elasticsearch_X.Y. */
  TargetVersion: string;
  /** Only supports the override_main_response_version parameter and not other advanced options. You can only include this option when upgrading to an OpenSearch version. Specifies whether the domain report */
  AdvancedOptions?: Record<string, string>;
  /** When true, indicates that an upgrade eligibility check needs to be performed. Does not actually perform the upgrade. */
  PerformCheckOnly?: boolean;
}

/** OpenSearch service binding for Step Functions SDK integrations. */
export class OpenSearch {
  constructor() {}

  acceptInboundConnection<T>(params: AcceptInboundConnectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  addDataSource<T>(params: AddDataSourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  addDirectQueryDataSource<T>(params: AddDirectQueryDataSourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  addTags<T>(params: AddTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associatePackage<T>(params: AssociatePackageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associatePackages<T>(params: AssociatePackagesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  authorizeVpcEndpointAccess<T>(params: AuthorizeVpcEndpointAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelDomainConfigChange<T>(params: CancelDomainConfigChangeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelServiceSoftwareUpdate<T>(params: CancelServiceSoftwareUpdateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createApplication<T>(params: CreateApplicationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDomain<T>(params: CreateDomainInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createIndex<T>(params: CreateIndexInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createOutboundConnection<T>(params: CreateOutboundConnectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPackage<T>(params: CreatePackageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVpcEndpoint<T>(params: CreateVpcEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteApplication<T>(params: DeleteApplicationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDataSource<T>(params: DeleteDataSourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDirectQueryDataSource<T>(params: DeleteDirectQueryDataSourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteDomain<T>(params: DeleteDomainInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteInboundConnection<T>(params: DeleteInboundConnectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteIndex<T>(params: DeleteIndexInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteOutboundConnection<T>(params: DeleteOutboundConnectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePackage<T>(params: DeletePackageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVpcEndpoint<T>(params: DeleteVpcEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDomain<T>(params: DescribeDomainInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDomainAutoTunes<T>(params: DescribeDomainAutoTunesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDomainChangeProgress<T>(params: DescribeDomainChangeProgressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDomainConfig<T>(params: DescribeDomainConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDomainHealth<T>(params: DescribeDomainHealthInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDomainNodes<T>(params: DescribeDomainNodesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDomains<T>(params: DescribeDomainsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeDryRunProgress<T>(params: DescribeDryRunProgressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInboundConnections<T>(params: DescribeInboundConnectionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInstanceTypeLimits<T>(params: DescribeInstanceTypeLimitsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeOutboundConnections<T>(params: DescribeOutboundConnectionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePackages<T>(params: DescribePackagesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReservedInstanceOfferings<T>(params: DescribeReservedInstanceOfferingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReservedInstances<T>(params: DescribeReservedInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeVpcEndpoints<T>(params: DescribeVpcEndpointsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  dissociatePackage<T>(params: DissociatePackageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  dissociatePackages<T>(params: DissociatePackagesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getApplication<T>(params: GetApplicationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCompatibleVersions<T>(params: GetCompatibleVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDataSource<T>(params: GetDataSourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDefaultApplicationSetting<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDirectQueryDataSource<T>(params: GetDirectQueryDataSourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDomainMaintenanceStatus<T>(params: GetDomainMaintenanceStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getIndex<T>(params: GetIndexInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPackageVersionHistory<T>(params: GetPackageVersionHistoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getUpgradeHistory<T>(params: GetUpgradeHistoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getUpgradeStatus<T>(params: GetUpgradeStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listApplications<T>(params: ListApplicationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDataSources<T>(params: ListDataSourcesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDirectQueryDataSources<T>(params: ListDirectQueryDataSourcesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDomainMaintenances<T>(params: ListDomainMaintenancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDomainNames<T>(params: ListDomainNamesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDomainsForPackage<T>(params: ListDomainsForPackageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listInstanceTypeDetails<T>(params: ListInstanceTypeDetailsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPackagesForDomain<T>(params: ListPackagesForDomainInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listScheduledActions<T>(params: ListScheduledActionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTags<T>(params: ListTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listVersions<T>(params: ListVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listVpcEndpointAccess<T>(params: ListVpcEndpointAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listVpcEndpoints<T>(params: ListVpcEndpointsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listVpcEndpointsForDomain<T>(params: ListVpcEndpointsForDomainInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  purchaseReservedInstanceOffering<T>(params: PurchaseReservedInstanceOfferingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putDefaultApplicationSetting<T>(params: PutDefaultApplicationSettingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rejectInboundConnection<T>(params: RejectInboundConnectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeTags<T>(params: RemoveTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  revokeVpcEndpointAccess<T>(params: RevokeVpcEndpointAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startDomainMaintenance<T>(params: StartDomainMaintenanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startServiceSoftwareUpdate<T>(params: StartServiceSoftwareUpdateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateApplication<T>(params: UpdateApplicationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDataSource<T>(params: UpdateDataSourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDirectQueryDataSource<T>(params: UpdateDirectQueryDataSourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDomainConfig<T>(params: UpdateDomainConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateIndex<T>(params: UpdateIndexInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePackage<T>(params: UpdatePackageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePackageScope<T>(params: UpdatePackageScopeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateScheduledAction<T>(params: UpdateScheduledActionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateVpcEndpoint<T>(params: UpdateVpcEndpointInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  upgradeDomain<T>(params: UpgradeDomainInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
