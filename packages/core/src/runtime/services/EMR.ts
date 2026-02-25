// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface InstanceFleetProvisioningSpecifications {
  /** The launch specification for Spot instances in the fleet, which determines the allocation strategy, defined duration, and provisioning timeout behavior. */
  SpotSpecification?: any;
  /** The launch specification for On-Demand Instances in the instance fleet, which determines the allocation strategy and capacity reservation options. The instance fleet configuration is available only in */
  OnDemandSpecification?: any;
}

export interface InstanceFleetResizingSpecifications {
  /** The resize specification for Spot Instances in the instance fleet, which contains the allocation strategy and the resize timeout period. */
  SpotResizeSpecification?: any;
  /** The resize specification for On-Demand Instances in the instance fleet, which contains the allocation strategy, capacity reservation options, and the resize timeout period. */
  OnDemandResizeSpecification?: any;
}

export interface InstanceFleetConfig {
  /** The friendly name of the instance fleet. */
  Name?: string;
  /** The node type that the instance fleet hosts. Valid values are MASTER, CORE, and TASK. */
  InstanceFleetType: 'MASTER' | 'CORE' | 'TASK';
  /** The target capacity of On-Demand units for the instance fleet, which determines how many On-Demand Instances to provision. When the instance fleet launches, Amazon EMR tries to provision On-Demand Ins */
  TargetOnDemandCapacity?: number;
  /** The target capacity of Spot units for the instance fleet, which determines how many Spot Instances to provision. When the instance fleet launches, Amazon EMR tries to provision Spot Instances as speci */
  TargetSpotCapacity?: number;
  /** The instance type configurations that define the Amazon EC2 instances in the instance fleet. */
  InstanceTypeConfigs?: any[];
  /** The launch specification for the instance fleet. */
  LaunchSpecifications?: InstanceFleetProvisioningSpecifications;
  /** The resize specification for the instance fleet. */
  ResizeSpecifications?: InstanceFleetResizingSpecifications;
  /** Reserved. */
  Context?: string;
}

export interface InstanceGroupConfig {
  /** Friendly name given to the instance group. */
  Name?: string;
  /** Market type of the Amazon EC2 instances used to create a cluster node. */
  Market?: 'ON_DEMAND' | 'SPOT';
  /** The role of the instance group in the cluster. */
  InstanceRole: 'MASTER' | 'CORE' | 'TASK';
  /** The bid price for each Amazon EC2 Spot Instance type as defined by InstanceType. Expressed in USD. If neither BidPrice nor BidPriceAsPercentageOfOnDemandPrice is provided, BidPriceAsPercentageOfOnDema */
  BidPrice?: string;
  /** The Amazon EC2 instance type for all instances in the instance group. */
  InstanceType: string;
  /** Target number of instances for the instance group. */
  InstanceCount: number;
  /** Amazon EMR releases 4.x or later. The list of configurations supplied for an Amazon EMR cluster instance group. You can specify a separate configuration for each instance group (master, core, and task */
  Configurations?: any[];
  /** EBS configurations that will be attached to each Amazon EC2 instance in the instance group. */
  EbsConfiguration?: any;
  /** An automatic scaling policy for a core instance group or task instance group in an Amazon EMR cluster. The automatic scaling policy defines how an instance group dynamically adds and terminates Amazon */
  AutoScalingPolicy?: any;
  /** The custom AMI ID to use for the provisioned instance group. */
  CustomAmiId?: string;
}

export interface StepConfig {
  /** The name of the step. */
  Name: string;
  /** The action to take when the step fails. Use one of the following values: TERMINATE_CLUSTER - Shuts down the cluster. CANCEL_AND_WAIT - Cancels any pending steps and returns the cluster to the WAITING  */
  ActionOnFailure?: 'TERMINATE_JOB_FLOW' | 'TERMINATE_CLUSTER' | 'CANCEL_AND_WAIT' | 'CONTINUE';
  /** The JAR file used for the step. */
  HadoopJarStep: any;
  /** Object that holds configuration properties for logging. */
  StepMonitoringConfiguration?: any;
}

export interface Tag {
  /** A user-defined key, which is the minimum required information for a valid tag. For more information, see Tag. */
  Key?: string;
  /** A user-defined value, which is optional in a tag. For more information, see Tag Clusters. */
  Value?: string;
}

export interface EMRContainersConfig {
  /** The Job run ID for the container configuration. */
  JobRunId?: string;
}

export interface ReleaseLabelFilter {
  /** Optional release label version prefix filter. For example, emr-5. */
  Prefix?: string;
  /** Optional release label application filter. For example, spark@2.1.0. */
  Application?: string;
}

export interface InstanceFleetModifyConfig {
  /** A unique identifier for the instance fleet. */
  InstanceFleetId: string;
  /** The target capacity of On-Demand units for the instance fleet. For more information see InstanceFleetConfig$TargetOnDemandCapacity. */
  TargetOnDemandCapacity?: number;
  /** The target capacity of Spot units for the instance fleet. For more information, see InstanceFleetConfig$TargetSpotCapacity. */
  TargetSpotCapacity?: number;
  /** The resize specification for the instance fleet. */
  ResizeSpecifications?: InstanceFleetResizingSpecifications;
  /** An array of InstanceTypeConfig objects that specify how Amazon EMR provisions Amazon EC2 instances when it fulfills On-Demand and Spot capacities. For more information, see InstanceTypeConfig. */
  InstanceTypeConfigs?: any[];
  /** Reserved. */
  Context?: string;
}

export interface InstanceGroupModifyConfig {
  /** Unique ID of the instance group to modify. */
  InstanceGroupId: string;
  /** Target size for the instance group. */
  InstanceCount?: number;
  /** The Amazon EC2 InstanceIds to terminate. After you terminate the instances, the instance group will not return to its original requested size. */
  EC2InstanceIdsToTerminate?: any[];
  /** Policy for customizing shrink operations. */
  ShrinkPolicy?: any;
  /** Type of reconfiguration requested. Valid values are MERGE and OVERWRITE. */
  ReconfigurationType?: 'OVERWRITE' | 'MERGE';
  /** A list of new or modified configurations to apply for an instance group. */
  Configurations?: any[];
}

export interface ScalingConstraints {
  /** The lower boundary of Amazon EC2 instances in an instance group below which scaling activities are not allowed to shrink. Scale-in activities will not terminate instances below this boundary. */
  MinCapacity: number;
  /** The upper boundary of Amazon EC2 instances in an instance group beyond which scaling activities are not allowed to grow. Scale-out activities will not add instances beyond this boundary. */
  MaxCapacity: number;
}

export interface AutoScalingPolicy {
  /** The upper and lower Amazon EC2 instance limits for an automatic scaling policy. Automatic scaling activity will not cause an instance group to grow above or below these limits. */
  Constraints: ScalingConstraints;
  /** The scale-in and scale-out rules that comprise the automatic scaling policy. */
  Rules: any[];
}

export interface AutoTerminationPolicy {
  /** Specifies the amount of idle time in seconds after which the cluster automatically terminates. You can specify a minimum of 60 seconds and a maximum of 604800 seconds (seven days). */
  IdleTimeout?: number;
}

export interface BlockPublicAccessConfiguration {
  /** Indicates whether Amazon EMR block public access is enabled (true) or disabled (false). By default, the value is false for accounts that have created Amazon EMR clusters before July 2019. For accounts */
  BlockPublicSecurityGroupRules: boolean;
  /** Specifies ports and port ranges that are permitted to have security group rules that allow inbound traffic from all public sources. For example, if Port 23 (Telnet) is specified for PermittedPublicSec */
  PermittedPublicSecurityGroupRuleRanges?: any[];
  /** The classification within a configuration. */
  Classification?: string;
  /** A list of additional configurations to apply within a configuration object. */
  Configurations?: any[];
  /** A set of properties specified within a configuration classification. */
  Properties?: Record<string, string>;
}

export interface ComputeLimits {
  /** The unit type used for specifying a managed scaling policy. */
  UnitType: 'InstanceFleetUnits' | 'Instances' | 'VCPU';
  /** The lower boundary of Amazon EC2 units. It is measured through vCPU cores or instances for instance groups and measured through units for instance fleets. Managed scaling activities are not allowed be */
  MinimumCapacityUnits: number;
  /** The upper boundary of Amazon EC2 units. It is measured through vCPU cores or instances for instance groups and measured through units for instance fleets. Managed scaling activities are not allowed be */
  MaximumCapacityUnits: number;
  /** The upper boundary of On-Demand Amazon EC2 units. It is measured through vCPU cores or instances for instance groups and measured through units for instance fleets. The On-Demand units are not allowed */
  MaximumOnDemandCapacityUnits?: number;
  /** The upper boundary of Amazon EC2 units for core node type in a cluster. It is measured through vCPU cores or instances for instance groups and measured through units for instance fleets. The core unit */
  MaximumCoreCapacityUnits?: number;
}

export interface ManagedScalingPolicy {
  /** The Amazon EC2 unit limits for a managed scaling policy. The managed scaling activity of a cluster is not allowed to go above or below these limits. The limit only applies to the core and task nodes.  */
  ComputeLimits?: ComputeLimits;
  /** An integer value that represents an advanced scaling strategy. Setting a higher value optimizes for performance. Setting a lower value optimizes for resource conservation. Setting the value to 50 bala */
  UtilizationPerformanceIndex?: number;
  /** Determines whether a custom scaling utilization performance index can be set. Possible values include ADVANCED or DEFAULT. */
  ScalingStrategy?: 'DEFAULT' | 'ADVANCED';
}

export interface PlacementType {
  /** The Amazon EC2 Availability Zone for the cluster. AvailabilityZone is used for uniform instance groups, while AvailabilityZones (plural) is used for instance fleets. */
  AvailabilityZone?: string;
  /** When multiple Availability Zones are specified, Amazon EMR evaluates them and launches instances in the optimal Availability Zone. AvailabilityZones is used for instance fleets, while AvailabilityZone */
  AvailabilityZones?: any[];
}

export interface JobFlowInstancesConfig {
  /** The Amazon EC2 instance type of the master node. */
  MasterInstanceType?: string;
  /** The Amazon EC2 instance type of the core and task nodes. */
  SlaveInstanceType?: string;
  /** The number of Amazon EC2 instances in the cluster. */
  InstanceCount?: number;
  /** Configuration for the instance groups in a cluster. */
  InstanceGroups?: any[];
  /** The instance fleet configuration is available only in Amazon EMR releases 4.8.0 and later, excluding 5.0.x versions. Describes the Amazon EC2 instances and instance configurations for clusters that us */
  InstanceFleets?: any[];
  /** The name of the Amazon EC2 key pair that can be used to connect to the master node using SSH as the user called "hadoop." */
  Ec2KeyName?: string;
  /** The Availability Zone in which the cluster runs. */
  Placement?: PlacementType;
  /** Specifies whether the cluster should remain available after completing all steps. Defaults to false. For more information about configuring cluster termination, see Control Cluster Termination in the  */
  KeepJobFlowAliveWhenNoSteps?: boolean;
  /** Specifies whether to lock the cluster to prevent the Amazon EC2 instances from being terminated by API call, user intervention, or in the event of a job-flow error. */
  TerminationProtected?: boolean;
  /** Indicates whether Amazon EMR should gracefully replace core nodes that have degraded within the cluster. */
  UnhealthyNodeReplacement?: boolean;
  /** Applies only to Amazon EMR release versions earlier than 4.0. The Hadoop version for the cluster. Valid inputs are "0.18" (no longer maintained), "0.20" (no longer maintained), "0.20.205" (no longer m */
  HadoopVersion?: string;
  /** Applies to clusters that use the uniform instance group configuration. To launch the cluster in Amazon Virtual Private Cloud (Amazon VPC), set this parameter to the identifier of the Amazon VPC subnet */
  Ec2SubnetId?: string;
  /** Applies to clusters that use the instance fleet configuration. When multiple Amazon EC2 subnet IDs are specified, Amazon EMR evaluates them and launches instances in the optimal subnet. The instance f */
  Ec2SubnetIds?: string[];
  /** The identifier of the Amazon EC2 security group for the master node. If you specify EmrManagedMasterSecurityGroup, you must also specify EmrManagedSlaveSecurityGroup. */
  EmrManagedMasterSecurityGroup?: string;
  /** The identifier of the Amazon EC2 security group for the core and task nodes. If you specify EmrManagedSlaveSecurityGroup, you must also specify EmrManagedMasterSecurityGroup. */
  EmrManagedSlaveSecurityGroup?: string;
  /** The identifier of the Amazon EC2 security group for the Amazon EMR service to access clusters in VPC private subnets. */
  ServiceAccessSecurityGroup?: string;
  /** A list of additional Amazon EC2 security group IDs for the master node. */
  AdditionalMasterSecurityGroups?: string[];
  /** A list of additional Amazon EC2 security group IDs for the core and task nodes. */
  AdditionalSlaveSecurityGroups?: string[];
}

export interface BootstrapActionConfig {
  /** The name of the bootstrap action. */
  Name: string;
  /** The script run by the bootstrap action. */
  ScriptBootstrapAction: any;
}

export interface SupportedProductConfig {
  /** The name of the product configuration. */
  Name?: string;
  /** The list of user-supplied arguments. */
  Args?: any[];
}

export interface Application {
  /** The name of the application. */
  Name?: string;
  /** The version of the application. */
  Version?: string;
  /** Arguments for Amazon EMR to pass to the application. */
  Args?: any[];
  /** This option is for advanced users only. This is meta information about third-party applications that third-party vendors use for testing purposes. */
  AdditionalInfo?: Record<string, any>;
}

export interface Configuration {
  /** The classification within a configuration. */
  Classification?: string;
  /** A list of additional configurations to apply within a configuration object. */
  Configurations?: any[];
  /** A set of properties specified within a configuration classification. */
  Properties?: Record<string, any>;
}

export interface KerberosAttributes {
  /** The name of the Kerberos realm to which all nodes in a cluster belong. For example, EC2.INTERNAL. */
  Realm: string;
  /** The password used within the cluster for the kadmin service on the cluster-dedicated KDC, which maintains Kerberos principals, password policies, and keytabs for the cluster. */
  KdcAdminPassword: string;
  /** Required only when establishing a cross-realm trust with a KDC in a different realm. The cross-realm principal password, which must be identical across realms. */
  CrossRealmTrustPrincipalPassword?: string;
  /** Required only when establishing a cross-realm trust with an Active Directory domain. A user with sufficient privileges to join resources to the domain. */
  ADDomainJoinUser?: string;
  /** The Active Directory password for ADDomainJoinUser. */
  ADDomainJoinPassword?: string;
}

export interface PlacementGroupConfig {
  /** Role of the instance in the cluster. Starting with Amazon EMR release 5.23.0, the only supported instance role is MASTER. */
  InstanceRole: 'MASTER' | 'CORE' | 'TASK';
  /** Amazon EC2 Placement Group strategy associated with instance role. Starting with Amazon EMR release 5.23.0, the only supported placement strategy is SPREAD for the MASTER instance role. */
  PlacementStrategy?: 'SPREAD' | 'PARTITION' | 'CLUSTER' | 'NONE';
}

export interface CloudWatchLogConfiguration {
  /** Specifies if CloudWatch logging is enabled. */
  Enabled: boolean;
  /** The name of the CloudWatch log group where logs are published. */
  LogGroupName?: string;
  /** The prefix of the log stream name. */
  LogStreamNamePrefix?: string;
  /** The ARN of the encryption key used to encrypt the logs. */
  EncryptionKeyArn?: string;
  /** A map of log types to file names for publishing logs to the standard output or standard error streams for CloudWatch. Valid log types include STEP_LOGS, SPARK_DRIVER, and SPARK_EXECUTOR. Valid file na */
  LogTypes?: Record<string, any>;
}

export interface MonitoringConfiguration {
  /** CloudWatch log configuration settings and metadata that specify settings like log files to monitor and where to send them. */
  CloudWatchLogConfiguration?: CloudWatchLogConfiguration;
}

export interface ExecutionEngineConfig {
  /** The unique identifier of the execution engine. For an Amazon EMR cluster, this is the cluster ID. */
  Id: string;
  /** The type of execution engine. A value of EMR specifies an Amazon EMR cluster. */
  Type?: 'EMR';
  /** An optional unique ID of an Amazon EC2 security group to associate with the master instance of the Amazon EMR cluster for this notebook execution. For more information see Specifying Amazon EC2 Securi */
  MasterInstanceSecurityGroupId?: string;
  /** The execution role ARN required for the notebook execution. */
  ExecutionRoleArn?: string;
}

export interface NotebookS3LocationFromInput {
  /** The Amazon S3 bucket that stores the notebook execution input. */
  Bucket?: string;
  /** The key to the Amazon S3 location that stores the notebook execution input. */
  Key?: string;
}

export interface OutputNotebookS3LocationFromInput {
  /** The Amazon S3 bucket that stores the notebook execution output. */
  Bucket?: string;
  /** The key to the Amazon S3 location that stores the notebook execution output. */
  Key?: string;
}

export interface AddInstanceFleetInput {
  /** The unique identifier of the cluster. */
  ClusterId: string;
  /** Specifies the configuration of the instance fleet. */
  InstanceFleet: InstanceFleetConfig;
}

/** Input to an AddInstanceGroups call. */
export interface AddInstanceGroupsInput {
  /** Instance groups to add. */
  InstanceGroups: InstanceGroupConfig[];
  /** Job flow in which to add the instance groups. */
  JobFlowId: string;
}

/** The input argument to the AddJobFlowSteps operation. */
export interface AddJobFlowStepsInput {
  /** A string that uniquely identifies the job flow. This identifier is returned by RunJobFlow and can also be obtained from ListClusters. */
  JobFlowId: string;
  /** A list of StepConfig to be executed by the job flow. */
  Steps: StepConfig[];
  /** The Amazon Resource Name (ARN) of the runtime role for a step on the cluster. The runtime role can be a cross-account IAM role. The runtime role ARN is a combination of account ID, role name, and role */
  ExecutionRoleArn?: string;
}

/** This input identifies an Amazon EMR resource and a list of tags to attach. */
export interface AddTagsInput {
  /** The Amazon EMR resource identifier to which tags will be added. For example, a cluster identifier or an Amazon EMR Studio ID. */
  ResourceId: string;
  /** A list of tags to associate with a resource. Tags are user-defined key-value pairs that consist of a required key string with a maximum of 128 characters, and an optional value string with a maximum o */
  Tags: Tag[];
}

/** The input argument to the CancelSteps operation. */
export interface CancelStepsInput {
  /** The ClusterID for the specified steps that will be canceled. Use RunJobFlow and ListClusters to get ClusterIDs. */
  ClusterId: string;
  /** The list of StepIDs to cancel. Use ListSteps to get steps and their states for the specified cluster. */
  StepIds: string[];
  /** The option to choose to cancel RUNNING steps. By default, the value is SEND_INTERRUPT. */
  StepCancellationOption?: 'SEND_INTERRUPT' | 'TERMINATE_PROCESS';
}

export interface CreatePersistentAppUIInput {
  /** The unique Amazon Resource Name (ARN) of the target resource. */
  TargetResourceArn: string;
  /** The EMR containers configuration. */
  EMRContainersConfig?: EMRContainersConfig;
  /** The profiler type for the persistent application user interface. */
  ProfilerType?: 'SHS' | 'TEZUI' | 'YTS';
  /** Tags for the persistent application user interface. */
  Tags?: Tag[];
  /** The cross reference for the persistent application user interface. */
  XReferer?: string;
}

export interface CreateSecurityConfigurationInput {
  /** The name of the security configuration. */
  Name: string;
  /** The security configuration details in JSON format. For JSON parameters and examples, see Use Security Configurations to Set Up Cluster Security in the Amazon EMR Management Guide. */
  SecurityConfiguration: string;
}

export interface CreateStudioInput {
  /** Specifies whether the Studio authenticates users using IAM or IAM Identity Center. */
  AuthMode: 'SSO' | 'IAM';
  /** The Amazon S3 location to back up Amazon EMR Studio Workspaces and notebook files. */
  DefaultS3Location: string;
  /** The ID of the Amazon EMR Studio Engine security group. The Engine security group allows inbound network traffic from the Workspace security group, and it must be in the same VPC specified by VpcId. */
  EngineSecurityGroupId: string;
  /** A descriptive name for the Amazon EMR Studio. */
  Name: string;
  /** The IAM role that the Amazon EMR Studio assumes. The service role provides a way for Amazon EMR Studio to interoperate with other Amazon Web Services services. */
  ServiceRole: string;
  /** A list of subnet IDs to associate with the Amazon EMR Studio. A Studio can have a maximum of 5 subnets. The subnets must belong to the VPC specified by VpcId. Studio users can create a Workspace in an */
  SubnetIds: string[];
  /** The ID of the Amazon Virtual Private Cloud (Amazon VPC) to associate with the Studio. */
  VpcId: string;
  /** The ID of the Amazon EMR Studio Workspace security group. The Workspace security group allows outbound network traffic to resources in the Engine security group, and it must be in the same VPC specifi */
  WorkspaceSecurityGroupId: string;
  /** A detailed description of the Amazon EMR Studio. */
  Description?: string;
  /** The KMS key identifier (ARN) used to encrypt Amazon EMR Studio workspace and notebook files when backed up to Amazon S3. */
  EncryptionKeyArn?: string;
  /** The ARN of the IAM Identity Center instance to create the Studio application. */
  IdcInstanceArn?: string;
  /** Specifies whether IAM Identity Center user assignment is REQUIRED or OPTIONAL. If the value is set to REQUIRED, users must be explicitly assigned to the Studio application to access the Studio. */
  IdcUserAssignment?: 'REQUIRED' | 'OPTIONAL';
  /** The authentication endpoint of your identity provider (IdP). Specify this value when you use IAM authentication and want to let federated users log in to a Studio with the Studio URL and credentials f */
  IdpAuthUrl?: string;
  /** The name that your identity provider (IdP) uses for its RelayState parameter. For example, RelayState or TargetSource. Specify this value when you use IAM authentication and want to let federated user */
  IdpRelayStateParameterName?: string;
  /** A list of tags to associate with the Amazon EMR Studio. Tags are user-defined key-value pairs that consist of a required key string with a maximum of 128 characters, and an optional value string with  */
  Tags?: Tag[];
  /** A Boolean indicating whether to enable Trusted identity propagation for the Studio. The default value is false. */
  TrustedIdentityPropagationEnabled?: boolean;
  /** The IAM user role that users and groups assume when logged in to an Amazon EMR Studio. Only specify a UserRole when you use IAM Identity Center authentication. The permissions attached to the UserRole */
  UserRole?: string;
}

export interface CreateStudioSessionMappingInput {
  /** Specifies whether the identity to map to the Amazon EMR Studio is a user or a group. */
  IdentityType: 'USER' | 'GROUP';
  /** The Amazon Resource Name (ARN) for the session policy that will be applied to the user or group. You should specify the ARN for the session policy that you want to apply, not the ARN of your user role */
  SessionPolicyArn: string;
  /** The ID of the Amazon EMR Studio to which the user or group will be mapped. */
  StudioId: string;
  /** The globally unique identifier (GUID) of the user or group from the IAM Identity Center Identity Store. For more information, see UserId and GroupId in the IAM Identity Center Identity Store API Refer */
  IdentityId?: string;
  /** The name of the user or group. For more information, see UserName and DisplayName in the IAM Identity Center Identity Store API Reference. Either IdentityName or IdentityId must be specified, but not  */
  IdentityName?: string;
}

export interface DeleteSecurityConfigurationInput {
  /** The name of the security configuration. */
  Name: string;
}

export interface DeleteStudioInput {
  /** The ID of the Amazon EMR Studio. */
  StudioId: string;
}

export interface DeleteStudioSessionMappingInput {
  /** Specifies whether the identity to delete from the Amazon EMR Studio is a user or a group. */
  IdentityType: 'USER' | 'GROUP';
  /** The ID of the Amazon EMR Studio. */
  StudioId: string;
  /** The globally unique identifier (GUID) of the user or group to remove from the Amazon EMR Studio. For more information, see UserId and GroupId in the IAM Identity Center Identity Store API Reference. E */
  IdentityId?: string;
  /** The name of the user name or group to remove from the Amazon EMR Studio. For more information, see UserName and DisplayName in the IAM Identity Center Store API Reference. Either IdentityName or Ident */
  IdentityName?: string;
}

/** This input determines which cluster to describe. */
export interface DescribeClusterInput {
  /** The identifier of the cluster to describe. */
  ClusterId: string;
}

/** The input for the DescribeJobFlows operation. */
export interface DescribeJobFlowsInput {
  /** Return only job flows created after this date and time. */
  CreatedAfter?: string;
  /** Return only job flows created before this date and time. */
  CreatedBefore?: string;
  /** Return only job flows whose job flow ID is contained in this list. */
  JobFlowIds?: string[];
  /** Return only job flows whose state is contained in this list. */
  JobFlowStates?: 'STARTING' | 'BOOTSTRAPPING' | 'RUNNING' | 'WAITING' | 'SHUTTING_DOWN' | 'TERMINATED' | 'COMPLETED' | 'FAILED'[];
}

export interface DescribeNotebookExecutionInput {
  /** The unique identifier of the notebook execution. */
  NotebookExecutionId: string;
}

export interface DescribePersistentAppUIInput {
  /** The identifier for the persistent application user interface. */
  PersistentAppUIId: string;
}

export interface DescribeReleaseLabelInput {
  /** Reserved for future use. Currently set to null. */
  MaxResults?: number;
  /** The pagination token. Reserved for future use. Currently set to null. */
  NextToken?: string;
  /** The target release label to be described. */
  ReleaseLabel?: string;
}

export interface DescribeSecurityConfigurationInput {
  /** The name of the security configuration. */
  Name: string;
}

/** This input determines which step to describe. */
export interface DescribeStepInput {
  /** The identifier of the cluster with steps to describe. */
  ClusterId: string;
  /** The identifier of the step to describe. */
  StepId: string;
}

export interface DescribeStudioInput {
  /** The Amazon EMR Studio ID. */
  StudioId: string;
}

export interface GetAutoTerminationPolicyInput {
  /** Specifies the ID of the Amazon EMR cluster for which the auto-termination policy will be fetched. */
  ClusterId: string;
}

export interface GetClusterSessionCredentialsInput {
  /** The unique identifier of the cluster. */
  ClusterId: string;
  /** The Amazon Resource Name (ARN) of the runtime role for interactive workload submission on the cluster. The runtime role can be a cross-account IAM role. The runtime role ARN is a combination of accoun */
  ExecutionRoleArn?: string;
}

export interface GetManagedScalingPolicyInput {
  /** Specifies the ID of the cluster for which the managed scaling policy will be fetched. */
  ClusterId: string;
}

export interface GetOnClusterAppUIPresignedURLInput {
  /** The cluster ID associated with the cluster's application user interface presigned URL. */
  ClusterId: string;
  /** The application ID associated with the cluster's application user interface presigned URL. */
  ApplicationId?: string;
  /** Determines if the user interface presigned URL is for a dry run. */
  DryRun?: boolean;
  /** The execution role ARN associated with the cluster's application user interface presigned URL. */
  ExecutionRoleArn?: string;
  /** The application UI type associated with the cluster's application user interface presigned URL. */
  OnClusterAppUIType?: 'SparkHistoryServer' | 'YarnTimelineService' | 'TezUI' | 'ApplicationMaster' | 'JobHistoryServer' | 'ResourceManager';
}

export interface GetPersistentAppUIPresignedURLInput {
  /** The persistent application user interface ID associated with the presigned URL. */
  PersistentAppUIId: string;
  /** The application ID associated with the presigned URL. */
  ApplicationId?: string;
  /** A boolean that represents if the caller is an authentication proxy call. */
  AuthProxyCall?: boolean;
  /** The execution role ARN associated with the presigned URL. */
  ExecutionRoleArn?: string;
  /** The persistent application user interface type associated with the presigned URL. */
  PersistentAppUIType?: 'SHS' | 'TEZ' | 'YTS';
}

export interface GetStudioSessionMappingInput {
  /** Specifies whether the identity to fetch is a user or a group. */
  IdentityType: 'USER' | 'GROUP';
  /** The ID of the Amazon EMR Studio. */
  StudioId: string;
  /** The globally unique identifier (GUID) of the user or group. For more information, see UserId and GroupId in the IAM Identity Center Identity Store API Reference. Either IdentityName or IdentityId must */
  IdentityId?: string;
  /** The name of the user or group to fetch. For more information, see UserName and DisplayName in the IAM Identity Center Identity Store API Reference. Either IdentityName or IdentityId must be specified. */
  IdentityName?: string;
}

/** This input determines which bootstrap actions to retrieve. */
export interface ListBootstrapActionsInput {
  /** The cluster identifier for the bootstrap actions to list. */
  ClusterId: string;
  /** The pagination token that indicates the next set of results to retrieve. */
  Marker?: string;
}

/** This input determines how the ListClusters action filters the list of clusters that it returns. */
export interface ListClustersInput {
  /** The cluster state filters to apply when listing clusters. Clusters that change state while this action runs may be not be returned as expected in the list of clusters. */
  ClusterStates?: 'STARTING' | 'BOOTSTRAPPING' | 'RUNNING' | 'WAITING' | 'TERMINATING' | 'TERMINATED' | 'TERMINATED_WITH_ERRORS'[];
  /** The creation date and time beginning value filter for listing clusters. */
  CreatedAfter?: string;
  /** The creation date and time end value filter for listing clusters. */
  CreatedBefore?: string;
  /** The pagination token that indicates the next set of results to retrieve. */
  Marker?: string;
}

export interface ListInstanceFleetsInput {
  /** The unique identifier of the cluster. */
  ClusterId: string;
  /** The pagination token that indicates the next set of results to retrieve. */
  Marker?: string;
}

/** This input determines which instance groups to retrieve. */
export interface ListInstanceGroupsInput {
  /** The identifier of the cluster for which to list the instance groups. */
  ClusterId: string;
  /** The pagination token that indicates the next set of results to retrieve. */
  Marker?: string;
}

/** This input determines which instances to list. */
export interface ListInstancesInput {
  /** The identifier of the cluster for which to list the instances. */
  ClusterId: string;
  /** The unique identifier of the instance fleet. */
  InstanceFleetId?: string;
  /** The node type of the instance fleet. For example MASTER, CORE, or TASK. */
  InstanceFleetType?: 'MASTER' | 'CORE' | 'TASK';
  /** The identifier of the instance group for which to list the instances. */
  InstanceGroupId?: string;
  /** The type of instance group for which to list the instances. */
  InstanceGroupTypes?: 'MASTER' | 'CORE' | 'TASK'[];
  /** A list of instance states that will filter the instances returned with this request. */
  InstanceStates?: 'AWAITING_FULFILLMENT' | 'PROVISIONING' | 'BOOTSTRAPPING' | 'RUNNING' | 'TERMINATED'[];
  /** The pagination token that indicates the next set of results to retrieve. */
  Marker?: string;
}

export interface ListNotebookExecutionsInput {
  /** The unique ID of the editor associated with the notebook execution. */
  EditorId?: string;
  /** The unique ID of the execution engine. */
  ExecutionEngineId?: string;
  /** The beginning of time range filter for listing notebook executions. The default is the timestamp of 30 days ago. */
  From?: string;
  /** The pagination token, returned by a previous ListNotebookExecutions call, that indicates the start of the list for this ListNotebookExecutions call. */
  Marker?: string;
  /** The status filter for listing notebook executions. START_PENDING indicates that the cluster has received the execution request but execution has not begun. STARTING indicates that the execution is sta */
  Status?: 'START_PENDING' | 'STARTING' | 'RUNNING' | 'FINISHING' | 'FINISHED' | 'FAILING' | 'FAILED' | 'STOP_PENDING' | 'STOPPING' | 'STOPPED';
  /** The end of time range filter for listing notebook executions. The default is the current timestamp. */
  To?: string;
}

export interface ListReleaseLabelsInput {
  /** Filters the results of the request. Prefix specifies the prefix of release labels to return. Application specifies the application (with/without version) of release labels to return. */
  Filters?: ReleaseLabelFilter;
  /** Defines the maximum number of release labels to return in a single response. The default is 100. */
  MaxResults?: number;
  /** Specifies the next page of results. If NextToken is not specified, which is usually the case for the first request of ListReleaseLabels, the first page of results are determined by other filtering par */
  NextToken?: string;
}

export interface ListSecurityConfigurationsInput {
  /** The pagination token that indicates the set of results to retrieve. */
  Marker?: string;
}

/** This input determines which steps to list. */
export interface ListStepsInput {
  /** The identifier of the cluster for which to list the steps. */
  ClusterId: string;
  /** The maximum number of steps that a single ListSteps action returns is 50. To return a longer list of steps, use multiple ListSteps actions along with the Marker parameter, which is a pagination token  */
  Marker?: string;
  /** The filter to limit the step list based on the identifier of the steps. You can specify a maximum of ten Step IDs. The character constraint applies to the overall length of the array. */
  StepIds?: string[];
  /** The filter to limit the step list based on certain states. */
  StepStates?: 'PENDING' | 'CANCEL_PENDING' | 'RUNNING' | 'COMPLETED' | 'CANCELLED' | 'FAILED' | 'INTERRUPTED'[];
}

export interface ListStudiosInput {
  /** The pagination token that indicates the set of results to retrieve. */
  Marker?: string;
}

export interface ListStudioSessionMappingsInput {
  /** Specifies whether to return session mappings for users or groups. If not specified, the results include session mapping details for both users and groups. */
  IdentityType?: 'USER' | 'GROUP';
  /** The pagination token that indicates the set of results to retrieve. */
  Marker?: string;
  /** The ID of the Amazon EMR Studio. */
  StudioId?: string;
}

export interface ListSupportedInstanceTypesInput {
  /** The Amazon EMR release label determines the versions of open-source application packages that Amazon EMR has installed on the cluster. Release labels are in the format emr-x.x.x, where x.x.x is an Ama */
  ReleaseLabel: string;
  /** The pagination token that marks the next set of results to retrieve. */
  Marker?: string;
}

export interface ModifyClusterInput {
  /** The unique identifier of the cluster. */
  ClusterId: string;
  /** Reserved. */
  ExtendedSupport?: boolean;
  /** The number of steps that can be executed concurrently. You can specify a minimum of 1 step and a maximum of 256 steps. We recommend that you do not change this parameter while steps are running or the */
  StepConcurrencyLevel?: number;
}

export interface ModifyInstanceFleetInput {
  /** The unique identifier of the cluster. */
  ClusterId: string;
  /** The configuration parameters of the instance fleet. */
  InstanceFleet: InstanceFleetModifyConfig;
}

/** Change the size of some instance groups. */
export interface ModifyInstanceGroupsInput {
  /** The ID of the cluster to which the instance group belongs. */
  ClusterId?: string;
  /** Instance groups to change. */
  InstanceGroups?: InstanceGroupModifyConfig[];
}

export interface PutAutoScalingPolicyInput {
  /** Specifies the definition of the automatic scaling policy. */
  AutoScalingPolicy: AutoScalingPolicy;
  /** Specifies the ID of a cluster. The instance group to which the automatic scaling policy is applied is within this cluster. */
  ClusterId: string;
  /** Specifies the ID of the instance group to which the automatic scaling policy is applied. */
  InstanceGroupId: string;
}

export interface PutAutoTerminationPolicyInput {
  /** Specifies the ID of the Amazon EMR cluster to which the auto-termination policy will be attached. */
  ClusterId: string;
  /** Specifies the auto-termination policy to attach to the cluster. */
  AutoTerminationPolicy?: AutoTerminationPolicy;
}

export interface PutBlockPublicAccessConfigurationInput {
  /** A configuration for Amazon EMR block public access. The configuration applies to all clusters created in your account for the current Region. The configuration specifies whether block public access is */
  BlockPublicAccessConfiguration: BlockPublicAccessConfiguration;
}

export interface PutManagedScalingPolicyInput {
  /** Specifies the ID of an Amazon EMR cluster where the managed scaling policy is attached. */
  ClusterId: string;
  /** Specifies the constraints for the managed scaling policy. */
  ManagedScalingPolicy: ManagedScalingPolicy;
}

export interface RemoveAutoScalingPolicyInput {
  /** Specifies the ID of a cluster. The instance group to which the automatic scaling policy is applied is within this cluster. */
  ClusterId: string;
  /** Specifies the ID of the instance group to which the scaling policy is applied. */
  InstanceGroupId: string;
}

export interface RemoveAutoTerminationPolicyInput {
  /** Specifies the ID of the Amazon EMR cluster from which the auto-termination policy will be removed. */
  ClusterId: string;
}

export interface RemoveManagedScalingPolicyInput {
  /** Specifies the ID of the cluster from which the managed scaling policy will be removed. */
  ClusterId: string;
}

/** This input identifies an Amazon EMR resource and a list of tags to remove. */
export interface RemoveTagsInput {
  /** The Amazon EMR resource identifier from which tags will be removed. For example, a cluster identifier or an Amazon EMR Studio ID. */
  ResourceId: string;
  /** A list of tag keys to remove from the resource. */
  TagKeys: string[];
}

/** Input to the RunJobFlow operation. */
export interface RunJobFlowInput {
  /** A specification of the number and type of Amazon EC2 instances. */
  Instances: JobFlowInstancesConfig;
  /** The name of the job flow. */
  Name: string;
  /** A JSON string for selecting additional features. */
  AdditionalInfo?: string;
  /** Applies only to Amazon EMR AMI versions 3.x and 2.x. For Amazon EMR releases 4.0 and later, ReleaseLabel is used. To specify a custom AMI, use CustomAmiID. */
  AmiVersion?: string;
  /** Applies to Amazon EMR releases 4.0 and later. A case-insensitive list of applications for Amazon EMR to install and configure when launching the cluster. For a list of applications available for each  */
  Applications?: Application[];
  /** An IAM role for automatic scaling policies. The default role is EMR_AutoScaling_DefaultRole. The IAM role provides permissions that the automatic scaling feature requires to launch and terminate Amazo */
  AutoScalingRole?: string;
  AutoTerminationPolicy?: AutoTerminationPolicy;
  /** A list of bootstrap actions to run before Hadoop starts on the cluster nodes. */
  BootstrapActions?: BootstrapActionConfig[];
  /** For Amazon EMR releases 4.0 and later. The list of configurations supplied for the Amazon EMR cluster that you are creating. */
  Configurations?: Configuration[];
  /** Available only in Amazon EMR releases 5.7.0 and later. The ID of a custom Amazon EBS-backed Linux AMI. If specified, Amazon EMR uses this AMI when it launches cluster Amazon EC2 instances. For more in */
  CustomAmiId?: string;
  /** The IOPS, of the Amazon EBS root device volume of the Linux AMI that is used for each Amazon EC2 instance. Available in Amazon EMR releases 6.15.0 and later. */
  EbsRootVolumeIops?: number;
  /** The size, in GiB, of the Amazon EBS root device volume of the Linux AMI that is used for each Amazon EC2 instance. Available in Amazon EMR releases 4.x and later. */
  EbsRootVolumeSize?: number;
  /** The throughput, in MiB/s, of the Amazon EBS root device volume of the Linux AMI that is used for each Amazon EC2 instance. Available in Amazon EMR releases 6.15.0 and later. */
  EbsRootVolumeThroughput?: number;
  /** Reserved. */
  ExtendedSupport?: boolean;
  /** Also called instance profile and Amazon EC2 role. An IAM role for an Amazon EMR cluster. The Amazon EC2 instances of the cluster assume this role. The default role is EMR_EC2_DefaultRole. In order to  */
  JobFlowRole?: string;
  /** Attributes for Kerberos configuration when Kerberos authentication is enabled using a security configuration. For more information see Use Kerberos Authentication in the Amazon EMR Management Guide. */
  KerberosAttributes?: KerberosAttributes;
  /** The KMS key used for encrypting log files. If a value is not provided, the logs remain encrypted by AES-256. This attribute is only available with Amazon EMR releases 5.30.0 and later, excluding Amazo */
  LogEncryptionKmsKeyId?: string;
  /** The location in Amazon S3 to write the log files of the job flow. If a value is not provided, logs are not created. */
  LogUri?: string;
  /** The specified managed scaling policy for an Amazon EMR cluster. */
  ManagedScalingPolicy?: ManagedScalingPolicy;
  /** Contains CloudWatch log configuration metadata and settings. */
  MonitoringConfiguration?: MonitoringConfiguration;
  /** For Amazon EMR releases 3.x and 2.x. For Amazon EMR releases 4.x and later, use Applications. A list of strings that indicates third-party software to use with the job flow that accepts a user argumen */
  NewSupportedProducts?: SupportedProductConfig[];
  /** Specifies a particular Amazon Linux release for all nodes in a cluster launch RunJobFlow request. If a release is not specified, Amazon EMR uses the latest validated Amazon Linux release for cluster l */
  OSReleaseLabel?: string;
  /** The specified placement group configuration for an Amazon EMR cluster. */
  PlacementGroupConfigs?: PlacementGroupConfig[];
  /** The Amazon EMR release label, which determines the version of open-source application packages installed on the cluster. Release labels are in the form emr-x.x.x, where x.x.x is an Amazon EMR release  */
  ReleaseLabel?: string;
  /** Applies only when CustomAmiID is used. Specifies which updates from the Amazon Linux AMI package repositories to apply automatically when the instance boots using the AMI. If omitted, the default is S */
  RepoUpgradeOnBoot?: 'SECURITY' | 'NONE';
  /** Specifies the way that individual Amazon EC2 instances terminate when an automatic scale-in activity occurs or an instance group is resized. TERMINATE_AT_INSTANCE_HOUR indicates that Amazon EMR termin */
  ScaleDownBehavior?: 'TERMINATE_AT_INSTANCE_HOUR' | 'TERMINATE_AT_TASK_COMPLETION';
  /** The name of a security configuration to apply to the cluster. */
  SecurityConfiguration?: string;
  /** The IAM role that Amazon EMR assumes in order to access Amazon Web Services resources on your behalf. If you've created a custom service role path, you must specify it for the service role when you la */
  ServiceRole?: string;
  /** Specifies the number of steps that can be executed concurrently. The default value is 1. The maximum value is 256. */
  StepConcurrencyLevel?: number;
  /** A list of steps to run. */
  Steps?: StepConfig[];
  /** For Amazon EMR releases 3.x and 2.x. For Amazon EMR releases 4.x and later, use Applications. A list of strings that indicates third-party software to use. For more information, see the Amazon EMR Dev */
  SupportedProducts?: string[];
  /** A list of tags to associate with a cluster and propagate to Amazon EC2 instances. */
  Tags?: Tag[];
  /** The VisibleToAllUsers parameter is no longer supported. By default, the value is set to true. Setting it to false now has no effect. Set this value to true so that IAM principals in the Amazon Web Ser */
  VisibleToAllUsers?: boolean;
}

export interface SetKeepJobFlowAliveWhenNoStepsInput {
  /** A list of strings that uniquely identify the clusters to protect. This identifier is returned by RunJobFlow and can also be obtained from DescribeJobFlows. */
  JobFlowIds: string[];
  /** A Boolean that indicates whether to terminate the cluster after all steps are executed. */
  KeepJobFlowAliveWhenNoSteps: boolean;
}

/** The input argument to the TerminationProtection operation. */
export interface SetTerminationProtectionInput {
  /** A list of strings that uniquely identify the clusters to protect. This identifier is returned by RunJobFlow and can also be obtained from DescribeJobFlows . */
  JobFlowIds: string[];
  /** A Boolean that indicates whether to protect the cluster and prevent the Amazon EC2 instances in the cluster from shutting down due to API calls, user intervention, or job-flow error. */
  TerminationProtected: boolean;
}

export interface SetUnhealthyNodeReplacementInput {
  /** The list of strings that uniquely identify the clusters for which to turn on unhealthy node replacement. You can get these identifiers by running the RunJobFlow or the DescribeJobFlows operations. */
  JobFlowIds: string[];
  /** Indicates whether to turn on or turn off graceful unhealthy node replacement. */
  UnhealthyNodeReplacement: boolean;
}

/** The input to the SetVisibleToAllUsers action. */
export interface SetVisibleToAllUsersInput {
  /** The unique identifier of the job flow (cluster). */
  JobFlowIds: string[];
  /** A value of true indicates that an IAM principal in the Amazon Web Services account can perform Amazon EMR actions on the cluster that the IAM policies attached to the principal allow. A value of false */
  VisibleToAllUsers: boolean;
}

export interface StartNotebookExecutionInput {
  /** Specifies the execution engine (cluster) that runs the notebook execution. */
  ExecutionEngine: ExecutionEngineConfig;
  /** The name or ARN of the IAM role that is used as the service role for Amazon EMR (the Amazon EMR role) for the notebook execution. */
  ServiceRole: string;
  /** The unique identifier of the Amazon EMR Notebook to use for notebook execution. */
  EditorId?: string;
  /** The environment variables associated with the notebook execution. */
  EnvironmentVariables?: Record<string, string>;
  /** An optional name for the notebook execution. */
  NotebookExecutionName?: string;
  /** The unique identifier of the Amazon EC2 security group to associate with the Amazon EMR Notebook for this notebook execution. */
  NotebookInstanceSecurityGroupId?: string;
  /** Input parameters in JSON format passed to the Amazon EMR Notebook at runtime for execution. */
  NotebookParams?: string;
  /** The Amazon S3 location for the notebook execution input. */
  NotebookS3Location?: NotebookS3LocationFromInput;
  /** The output format for the notebook execution. */
  OutputNotebookFormat?: 'HTML';
  /** The Amazon S3 location for the notebook execution output. */
  OutputNotebookS3Location?: OutputNotebookS3LocationFromInput;
  /** The path and file name of the notebook file for this execution, relative to the path specified for the Amazon EMR Notebook. For example, if you specify a path of s3://MyBucket/MyNotebooks when you cre */
  RelativePath?: string;
  /** A list of tags associated with a notebook execution. Tags are user-defined key-value pairs that consist of a required key string with a maximum of 128 characters and an optional value string with a ma */
  Tags?: Tag[];
}

export interface StopNotebookExecutionInput {
  /** The unique identifier of the notebook execution. */
  NotebookExecutionId: string;
}

/** Input to the TerminateJobFlows operation. */
export interface TerminateJobFlowsInput {
  /** A list of job flows to be shut down. */
  JobFlowIds: string[];
}

export interface UpdateStudioInput {
  /** The ID of the Amazon EMR Studio to update. */
  StudioId: string;
  /** The Amazon S3 location to back up Workspaces and notebook files for the Amazon EMR Studio. */
  DefaultS3Location?: string;
  /** A detailed description to assign to the Amazon EMR Studio. */
  Description?: string;
  /** The KMS key identifier (ARN) used to encrypt Amazon EMR Studio workspace and notebook files when backed up to Amazon S3. */
  EncryptionKeyArn?: string;
  /** A descriptive name for the Amazon EMR Studio. */
  Name?: string;
  /** A list of subnet IDs to associate with the Amazon EMR Studio. The list can include new subnet IDs, but must also include all of the subnet IDs previously associated with the Studio. The list order doe */
  SubnetIds?: string[];
}

export interface UpdateStudioSessionMappingInput {
  /** Specifies whether the identity to update is a user or a group. */
  IdentityType: 'USER' | 'GROUP';
  /** The Amazon Resource Name (ARN) of the session policy to associate with the specified user or group. */
  SessionPolicyArn: string;
  /** The ID of the Amazon EMR Studio. */
  StudioId: string;
  /** The globally unique identifier (GUID) of the user or group. For more information, see UserId and GroupId in the IAM Identity Center Identity Store API Reference. Either IdentityName or IdentityId must */
  IdentityId?: string;
  /** The name of the user or group to update. For more information, see UserName and DisplayName in the IAM Identity Center Identity Store API Reference. Either IdentityName or IdentityId must be specified */
  IdentityName?: string;
}

/** EMR service binding for Step Functions SDK integrations. */
export class EMR {
  constructor() {}

  addInstanceFleet<T>(params: AddInstanceFleetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  addInstanceGroups<T>(params: AddInstanceGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  addJobFlowSteps<T>(params: AddJobFlowStepsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  addTags<T>(params: AddTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelSteps<T>(params: CancelStepsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPersistentAppUI<T>(params: CreatePersistentAppUIInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createSecurityConfiguration<T>(params: CreateSecurityConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createStudio<T>(params: CreateStudioInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createStudioSessionMapping<T>(params: CreateStudioSessionMappingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSecurityConfiguration<T>(params: DeleteSecurityConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteStudio<T>(params: DeleteStudioInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteStudioSessionMapping<T>(params: DeleteStudioSessionMappingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCluster<T>(params: DescribeClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeJobFlows<T>(params: DescribeJobFlowsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeNotebookExecution<T>(params: DescribeNotebookExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePersistentAppUI<T>(params: DescribePersistentAppUIInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeReleaseLabel<T>(params: DescribeReleaseLabelInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSecurityConfiguration<T>(params: DescribeSecurityConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStep<T>(params: DescribeStepInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStudio<T>(params: DescribeStudioInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAutoTerminationPolicy<T>(params: GetAutoTerminationPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getBlockPublicAccessConfiguration<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getClusterSessionCredentials<T>(params: GetClusterSessionCredentialsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getManagedScalingPolicy<T>(params: GetManagedScalingPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getOnClusterAppUIPresignedURL<T>(params: GetOnClusterAppUIPresignedURLInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPersistentAppUIPresignedURL<T>(params: GetPersistentAppUIPresignedURLInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getStudioSessionMapping<T>(params: GetStudioSessionMappingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listBootstrapActions<T>(params: ListBootstrapActionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listClusters<T>(params: ListClustersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listInstanceFleets<T>(params: ListInstanceFleetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listInstanceGroups<T>(params: ListInstanceGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listInstances<T>(params: ListInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listNotebookExecutions<T>(params: ListNotebookExecutionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listReleaseLabels<T>(params: ListReleaseLabelsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSecurityConfigurations<T>(params: ListSecurityConfigurationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSteps<T>(params: ListStepsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStudios<T>(params: ListStudiosInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStudioSessionMappings<T>(params: ListStudioSessionMappingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSupportedInstanceTypes<T>(params: ListSupportedInstanceTypesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyCluster<T>(params: ModifyClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyInstanceFleet<T>(params: ModifyInstanceFleetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  modifyInstanceGroups<T>(params: ModifyInstanceGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putAutoScalingPolicy<T>(params: PutAutoScalingPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putAutoTerminationPolicy<T>(params: PutAutoTerminationPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putBlockPublicAccessConfiguration<T>(params: PutBlockPublicAccessConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putManagedScalingPolicy<T>(params: PutManagedScalingPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeAutoScalingPolicy<T>(params: RemoveAutoScalingPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeAutoTerminationPolicy<T>(params: RemoveAutoTerminationPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeManagedScalingPolicy<T>(params: RemoveManagedScalingPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeTags<T>(params: RemoveTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  runJobFlow<T>(params: RunJobFlowInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  setKeepJobFlowAliveWhenNoSteps<T>(params: SetKeepJobFlowAliveWhenNoStepsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  setTerminationProtection<T>(params: SetTerminationProtectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  setUnhealthyNodeReplacement<T>(params: SetUnhealthyNodeReplacementInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  setVisibleToAllUsers<T>(params: SetVisibleToAllUsersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startNotebookExecution<T>(params: StartNotebookExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopNotebookExecution<T>(params: StopNotebookExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  terminateJobFlows<T>(params: TerminateJobFlowsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateStudio<T>(params: UpdateStudioInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateStudioSessionMapping<T>(params: UpdateStudioSessionMappingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
