// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for ECS operations. */
export interface EcsOptions {
  retry?: RetryPolicy;
  timeoutSeconds?: number;
  heartbeatSeconds?: number;
}

export interface CapacityProviderStrategyItem {
  /** The short name of the capacity provider. */
  capacityProvider: string;
  /** The weight value designates the relative percentage of the total number of tasks launched that should use the specified capacity provider. The weight value is taken into consideration after the base v */
  weight?: number;
  /** The base value designates how many tasks, at a minimum, to run on the specified capacity provider for each service. Only one capacity provider in a capacity provider strategy can have a base defined.  */
  base?: number;
}

export interface AwsVpcConfiguration {
  /** The IDs of the subnets associated with the task or service. There's a limit of 16 subnets that can be specified. All specified subnets must be from the same VPC. */
  subnets: any[];
  /** The IDs of the security groups associated with the task or service. If you don't specify a security group, the default security group for the VPC is used. There's a limit of 5 security groups that can */
  securityGroups?: any[];
  /** Whether the task's elastic network interface receives a public IP address. Consider the following when you set this value: When you use create-service or update-service, the default is DISABLED. When  */
  assignPublicIp?: 'ENABLED' | 'DISABLED';
}

export interface NetworkConfiguration {
  /** The VPC subnets and security groups that are associated with a task. All specified subnets and security groups must be from the same VPC. */
  awsvpcConfiguration?: AwsVpcConfiguration;
}

export interface EphemeralStorage {
  /** The total amount, in GiB, of ephemeral storage to set for the task. The minimum supported value is 21 GiB and the maximum supported value is 200 GiB. */
  sizeInGiB: number;
}

export interface TaskOverride {
  /** One or more container overrides that are sent to a task. */
  containerOverrides?: any[];
  /** The CPU override for the task. */
  cpu?: string;
  /** The Elastic Inference accelerator override for the task. */
  inferenceAcceleratorOverrides?: any[];
  /** The Amazon Resource Name (ARN) of the task execution role override for the task. For more information, see Amazon ECS task execution IAM role in the Amazon Elastic Container Service Developer Guide. */
  executionRoleArn?: string;
  /** The memory override for the task. */
  memory?: string;
  /** The Amazon Resource Name (ARN) of the role that containers in this task can assume. All containers in this task are granted the permissions that are specified in this role. For more information, see I */
  taskRoleArn?: string;
  /** The ephemeral storage setting override for the task. This parameter is only supported for tasks hosted on Fargate that use the following platform versions: Linux platform version 1.4.0 or later. Windo */
  ephemeralStorage?: EphemeralStorage;
}

export interface PlacementConstraint {
  /** The type of constraint. Use distinctInstance to ensure that each task in a particular group is running on a different container instance. Use memberOf to restrict the selection to a group of valid can */
  type?: 'distinctInstance' | 'memberOf';
  /** A cluster query language expression to apply to the constraint. The expression can have a maximum length of 2000 characters. You can't specify an expression if the constraint type is distinctInstance. */
  expression?: string;
}

export interface PlacementStrategy {
  /** The type of placement strategy. The random placement strategy randomly places tasks on available candidates. The spread placement strategy spreads placement across available candidates evenly based on */
  type?: 'random' | 'spread' | 'binpack';
  /** The field to apply the placement strategy against. For the spread placement strategy, valid values are instanceId (or host, which has the same effect), or any platform or custom attribute that's appli */
  field?: string;
}

export interface Tag {
  /** One part of a key-value pair that make up a tag. A key is a general label that acts like a category for more specific tag values. */
  key?: string;
  /** The optional part of a key-value pair that make up a tag. A value acts as a descriptor within a tag category (key). */
  value?: string;
}

export interface TaskVolumeConfiguration {
  /** The name of the volume. This value must match the volume name from the Volume object in the task definition. */
  name: string;
  /** The configuration for the Amazon EBS volume that Amazon ECS creates and manages on your behalf. These settings are used to create each Amazon EBS volume, with one volume created for each task. The Ama */
  managedEBSVolume?: any;
}

export interface RunTaskInput {
  /** The family and revision (family:revision) or full ARN of the task definition to run. If a revision isn't specified, the latest ACTIVE revision is used. The full ARN value must match the value that you */
  taskDefinition: string;
  /** The capacity provider strategy to use for the task. If you want to use Amazon ECS Managed Instances, you must use the capacityProviderStrategy request parameter and omit the launchType request paramet */
  capacityProviderStrategy?: CapacityProviderStrategyItem[];
  /** An identifier that you provide to ensure the idempotency of the request. It must be unique and is case sensitive. Up to 64 characters are allowed. The valid characters are characters in the range of 3 */
  clientToken?: string;
  /** The short name or full Amazon Resource Name (ARN) of the cluster to run your task on. If you do not specify a cluster, the default cluster is assumed. Each account receives a default cluster the first */
  cluster?: string;
  /** The number of instantiations of the specified task to place on your cluster. You can specify up to 10 tasks for each call. */
  count?: number;
  /** Specifies whether to use Amazon ECS managed tags for the task. For more information, see Tagging Your Amazon ECS Resources in the Amazon Elastic Container Service Developer Guide. */
  enableECSManagedTags?: boolean;
  /** Determines whether to use the execute command functionality for the containers in this task. If true, this enables execute command functionality on all containers in the task. If true, then the task d */
  enableExecuteCommand?: boolean;
  /** The name of the task group to associate with the task. The default value is the family name of the task definition (for example, family:my-family-name). */
  group?: string;
  /** The infrastructure to run your standalone task on. For more information, see Amazon ECS launch types in the Amazon Elastic Container Service Developer Guide. If you want to use Amazon ECS Managed Inst */
  launchType?: 'EC2' | 'FARGATE' | 'EXTERNAL' | 'MANAGED_INSTANCES';
  /** The network configuration for the task. This parameter is required for task definitions that use the awsvpc network mode to receive their own elastic network interface, and it isn't supported for othe */
  networkConfiguration?: NetworkConfiguration;
  /** A list of container overrides in JSON format that specify the name of a container in the specified task definition and the overrides it should receive. You can override the default command for a conta */
  overrides?: TaskOverride;
  /** An array of placement constraint objects to use for the task. You can specify up to 10 constraints for each task (including constraints in the task definition and those specified at runtime). */
  placementConstraints?: PlacementConstraint[];
  /** The placement strategy objects to use for the task. You can specify a maximum of 5 strategy rules for each task. */
  placementStrategy?: PlacementStrategy[];
  /** The platform version the task uses. A platform version is only specified for tasks hosted on Fargate. If one isn't specified, the LATEST platform version is used. For more information, see Fargate pla */
  platformVersion?: string;
  /** Specifies whether to propagate the tags from the task definition to the task. If no value is specified, the tags aren't propagated. Tags can only be propagated to the task during task creation. To add */
  propagateTags?: 'TASK_DEFINITION' | 'SERVICE' | 'NONE';
  /** This parameter is only used by Amazon ECS. It is not intended for use by customers. */
  referenceId?: string;
  /** An optional tag specified when a task is started. For example, if you automatically trigger a task to run a batch process job, you could apply a unique identifier for that job to your task with the st */
  startedBy?: string;
  /** The metadata that you apply to the task to help you categorize and organize them. Each tag consists of a key and an optional value, both of which you define. The following basic restrictions apply to  */
  tags?: Tag[];
  /** The details of the volume that was configuredAtLaunch. You can configure the size, volumeType, IOPS, throughput, snapshot and encryption in TaskManagedEBSVolumeConfiguration. The name of the volume mu */
  volumeConfigurations?: TaskVolumeConfiguration[];
}

export interface RunTaskAsyncInput {
  /** The family and revision (family:revision) or full ARN of the task definition to run. If a revision isn't specified, the latest ACTIVE revision is used. The full ARN value must match the value that you */
  taskDefinition: string;
  /** The capacity provider strategy to use for the task. If you want to use Amazon ECS Managed Instances, you must use the capacityProviderStrategy request parameter and omit the launchType request paramet */
  capacityProviderStrategy?: CapacityProviderStrategyItem[];
  /** An identifier that you provide to ensure the idempotency of the request. It must be unique and is case sensitive. Up to 64 characters are allowed. The valid characters are characters in the range of 3 */
  clientToken?: string;
  /** The short name or full Amazon Resource Name (ARN) of the cluster to run your task on. If you do not specify a cluster, the default cluster is assumed. Each account receives a default cluster the first */
  cluster?: string;
  /** The number of instantiations of the specified task to place on your cluster. You can specify up to 10 tasks for each call. */
  count?: number;
  /** Specifies whether to use Amazon ECS managed tags for the task. For more information, see Tagging Your Amazon ECS Resources in the Amazon Elastic Container Service Developer Guide. */
  enableECSManagedTags?: boolean;
  /** Determines whether to use the execute command functionality for the containers in this task. If true, this enables execute command functionality on all containers in the task. If true, then the task d */
  enableExecuteCommand?: boolean;
  /** The name of the task group to associate with the task. The default value is the family name of the task definition (for example, family:my-family-name). */
  group?: string;
  /** The infrastructure to run your standalone task on. For more information, see Amazon ECS launch types in the Amazon Elastic Container Service Developer Guide. If you want to use Amazon ECS Managed Inst */
  launchType?: 'EC2' | 'FARGATE' | 'EXTERNAL' | 'MANAGED_INSTANCES';
  /** The network configuration for the task. This parameter is required for task definitions that use the awsvpc network mode to receive their own elastic network interface, and it isn't supported for othe */
  networkConfiguration?: NetworkConfiguration;
  /** A list of container overrides in JSON format that specify the name of a container in the specified task definition and the overrides it should receive. You can override the default command for a conta */
  overrides?: TaskOverride;
  /** An array of placement constraint objects to use for the task. You can specify up to 10 constraints for each task (including constraints in the task definition and those specified at runtime). */
  placementConstraints?: PlacementConstraint[];
  /** The placement strategy objects to use for the task. You can specify a maximum of 5 strategy rules for each task. */
  placementStrategy?: PlacementStrategy[];
  /** The platform version the task uses. A platform version is only specified for tasks hosted on Fargate. If one isn't specified, the LATEST platform version is used. For more information, see Fargate pla */
  platformVersion?: string;
  /** Specifies whether to propagate the tags from the task definition to the task. If no value is specified, the tags aren't propagated. Tags can only be propagated to the task during task creation. To add */
  propagateTags?: 'TASK_DEFINITION' | 'SERVICE' | 'NONE';
  /** This parameter is only used by Amazon ECS. It is not intended for use by customers. */
  referenceId?: string;
  /** An optional tag specified when a task is started. For example, if you automatically trigger a task to run a batch process job, you could apply a unique identifier for that job to your task with the st */
  startedBy?: string;
  /** The metadata that you apply to the task to help you categorize and organize them. Each tag consists of a key and an optional value, both of which you define. The following basic restrictions apply to  */
  tags?: Tag[];
  /** The details of the volume that was configuredAtLaunch. You can configure the size, volumeType, IOPS, throughput, snapshot and encryption in TaskManagedEBSVolumeConfiguration. The name of the volume mu */
  volumeConfigurations?: TaskVolumeConfiguration[];
}

/** ECS cluster binding for the SimpleSteps compiler. */
export class ECS {
  constructor(clusterArn: string) {}

  runTask<T>(params: RunTaskInput, options?: EcsOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  runTaskAsync(params: RunTaskAsyncInput, options?: EcsOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }
}
