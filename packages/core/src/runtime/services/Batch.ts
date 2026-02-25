// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for Batch operations. */
export interface BatchOptions {
  retry?: RetryPolicy;
  timeoutSeconds?: number;
  heartbeatSeconds?: number;
}

export interface ArrayProperties {
  /** The size of the array job. */
  size?: number;
}

export interface JobDependency {
  /** The job ID of the Batch job that's associated with this dependency. */
  jobId?: string;
  /** The type of the job dependency. */
  type?: 'N_TO_N' | 'SEQUENTIAL';
}

export interface ContainerOverrides {
  /** This parameter is deprecated, use resourceRequirements to override the vcpus parameter that's set in the job definition. It's not supported for jobs running on Fargate resources. For jobs that run on  */
  vcpus?: number;
  /** This parameter is deprecated, use resourceRequirements to override the memory requirements specified in the job definition. It's not supported for jobs running on Fargate resources. For jobs that run  */
  memory?: number;
  /** The command to send to the container that overrides the default command from the Docker image or the job definition. This parameter can't contain an empty string. */
  command?: string[];
  /** The instance type to use for a multi-node parallel job. This parameter isn't applicable to single-node container jobs or jobs that run on Fargate resources, and shouldn't be provided. */
  instanceType?: string;
  /** The environment variables to send to the container. You can add new environment variables, which are added to the container at launch, or you can override the existing environment variables from the D */
  environment?: any[];
  /** The type and amount of resources to assign to a container. This overrides the settings in the job definition. The supported resources include GPU, MEMORY, and VCPU. */
  resourceRequirements?: any[];
}

export interface NodeOverrides {
  /** The number of nodes to use with a multi-node parallel job. This value overrides the number of nodes that are specified in the job definition. To use this override, you must meet the following conditio */
  numNodes?: number;
  /** The node property overrides for the job. */
  nodePropertyOverrides?: any[];
}

export interface RetryStrategy {
  /** The number of times to move a job to the RUNNABLE status. You can specify between 1 and 10 attempts. If the value of attempts is greater than one, the job is retried on failure the same number of atte */
  attempts?: number;
  /** Array of up to 5 objects that specify the conditions where jobs are retried or failed. If this parameter is specified, then the attempts parameter must also be specified. If none of the listed conditi */
  evaluateOnExit?: any[];
}

export interface JobTimeout {
  /** The job timeout time (in seconds) that's measured from the job attempt's startedAt timestamp. After this time passes, Batch terminates your jobs if they aren't finished. The minimum value for the time */
  attemptDurationSeconds?: number;
}

export interface EksPodPropertiesOverride {
  /** The overrides for the container that's used on the Amazon EKS pod. */
  containers?: any[];
  /** The overrides for the initContainers defined in the Amazon EKS pod. These containers run before application containers, always run to completion, and must complete successfully before the next contain */
  initContainers?: any[];
  /** Metadata about the overrides for the container that's used on the Amazon EKS pod. */
  metadata?: any;
}

export interface EksPropertiesOverride {
  /** The overrides for the Kubernetes pod resources of a job. */
  podProperties?: EksPodPropertiesOverride;
}

export interface EcsPropertiesOverride {
  /** The overrides for the Amazon ECS task definition of a job. This object is currently limited to one element. */
  taskProperties?: any[];
}

export interface ConsumableResourceProperties {
  /** The list of consumable resources required by a job. */
  consumableResourceList?: any[];
}

/** Contains the parameters for SubmitJob. */
export interface SubmitJobInput {
  /** The job definition used by this job. This value can be one of definition-name, definition-name:revision, or the Amazon Resource Name (ARN) for the job definition, with or without the revision (arn:aws */
  jobDefinition: string;
  /** The name of the job. It can be up to 128 letters long. The first character must be alphanumeric, can contain uppercase and lowercase letters, numbers, hyphens (-), and underscores (_). */
  jobName: string;
  /** The job queue where the job is submitted. You can specify either the name or the Amazon Resource Name (ARN) of the queue. */
  jobQueue: string;
  /** The array properties for the submitted job, such as the size of the array. The array size can be between 2 and 10,000. If you specify array properties for a job, it becomes an array job. For more info */
  arrayProperties?: ArrayProperties;
  /** An object that contains overrides for the consumable resources of a job. */
  consumableResourcePropertiesOverride?: ConsumableResourceProperties;
  /** An object with properties that override the defaults for the job definition that specify the name of a container in the specified job definition and the overrides it should receive. You can override t */
  containerOverrides?: ContainerOverrides;
  /** A list of dependencies for the job. A job can depend upon a maximum of 20 jobs. You can specify a SEQUENTIAL type dependency without specifying a job ID for array jobs so that each child array job com */
  dependsOn?: JobDependency[];
  /** An object, with properties that override defaults for the job definition, can only be specified for jobs that are run on Amazon ECS resources. */
  ecsPropertiesOverride?: EcsPropertiesOverride;
  /** An object, with properties that override defaults for the job definition, can only be specified for jobs that are run on Amazon EKS resources. */
  eksPropertiesOverride?: EksPropertiesOverride;
  /** A list of node overrides in JSON format that specify the node range to target and the container overrides for that node range. This parameter isn't applicable to jobs that are running on Fargate resou */
  nodeOverrides?: NodeOverrides;
  /** Additional parameters passed to the job that replace parameter substitution placeholders that are set in the job definition. Parameters are specified as a key and value pair mapping. Parameters in a S */
  parameters?: Record<string, string>;
  /** Specifies whether to propagate the tags from the job or job definition to the corresponding Amazon ECS task. If no value is specified, the tags aren't propagated. Tags can only be propagated to the ta */
  propagateTags?: boolean;
  /** The retry strategy to use for failed jobs from this SubmitJob operation. When a retry strategy is specified here, it overrides the retry strategy defined in the job definition. */
  retryStrategy?: RetryStrategy;
  /** The scheduling priority for the job. This only affects jobs in job queues with a fair-share policy. Jobs with a higher scheduling priority are scheduled before jobs with a lower scheduling priority. T */
  schedulingPriorityOverride?: number;
  /** The share identifier for the job. Don't specify this parameter if the job queue doesn't have a fair-share scheduling policy. If the job queue has a fair-share scheduling policy, then this parameter mu */
  shareIdentifier?: string;
  /** The tags that you apply to the job request to help you categorize and organize your resources. Each tag consists of a key and an optional value. For more information, see Tagging Amazon Web Services R */
  tags?: Record<string, string>;
  /** The timeout configuration for this SubmitJob operation. You can specify a timeout duration after which Batch terminates your jobs if they haven't finished. If a job is terminated due to a timeout, it  */
  timeout?: JobTimeout;
}

/** Contains the parameters for SubmitJob. */
export interface SubmitJobAsyncInput {
  /** The job definition used by this job. This value can be one of definition-name, definition-name:revision, or the Amazon Resource Name (ARN) for the job definition, with or without the revision (arn:aws */
  jobDefinition: string;
  /** The name of the job. It can be up to 128 letters long. The first character must be alphanumeric, can contain uppercase and lowercase letters, numbers, hyphens (-), and underscores (_). */
  jobName: string;
  /** The job queue where the job is submitted. You can specify either the name or the Amazon Resource Name (ARN) of the queue. */
  jobQueue: string;
  /** The array properties for the submitted job, such as the size of the array. The array size can be between 2 and 10,000. If you specify array properties for a job, it becomes an array job. For more info */
  arrayProperties?: ArrayProperties;
  /** An object that contains overrides for the consumable resources of a job. */
  consumableResourcePropertiesOverride?: ConsumableResourceProperties;
  /** An object with properties that override the defaults for the job definition that specify the name of a container in the specified job definition and the overrides it should receive. You can override t */
  containerOverrides?: ContainerOverrides;
  /** A list of dependencies for the job. A job can depend upon a maximum of 20 jobs. You can specify a SEQUENTIAL type dependency without specifying a job ID for array jobs so that each child array job com */
  dependsOn?: JobDependency[];
  /** An object, with properties that override defaults for the job definition, can only be specified for jobs that are run on Amazon ECS resources. */
  ecsPropertiesOverride?: EcsPropertiesOverride;
  /** An object, with properties that override defaults for the job definition, can only be specified for jobs that are run on Amazon EKS resources. */
  eksPropertiesOverride?: EksPropertiesOverride;
  /** A list of node overrides in JSON format that specify the node range to target and the container overrides for that node range. This parameter isn't applicable to jobs that are running on Fargate resou */
  nodeOverrides?: NodeOverrides;
  /** Additional parameters passed to the job that replace parameter substitution placeholders that are set in the job definition. Parameters are specified as a key and value pair mapping. Parameters in a S */
  parameters?: Record<string, string>;
  /** Specifies whether to propagate the tags from the job or job definition to the corresponding Amazon ECS task. If no value is specified, the tags aren't propagated. Tags can only be propagated to the ta */
  propagateTags?: boolean;
  /** The retry strategy to use for failed jobs from this SubmitJob operation. When a retry strategy is specified here, it overrides the retry strategy defined in the job definition. */
  retryStrategy?: RetryStrategy;
  /** The scheduling priority for the job. This only affects jobs in job queues with a fair-share policy. Jobs with a higher scheduling priority are scheduled before jobs with a lower scheduling priority. T */
  schedulingPriorityOverride?: number;
  /** The share identifier for the job. Don't specify this parameter if the job queue doesn't have a fair-share scheduling policy. If the job queue has a fair-share scheduling policy, then this parameter mu */
  shareIdentifier?: string;
  /** The tags that you apply to the job request to help you categorize and organize your resources. Each tag consists of a key and an optional value. For more information, see Tagging Amazon Web Services R */
  tags?: Record<string, string>;
  /** The timeout configuration for this SubmitJob operation. You can specify a timeout duration after which Batch terminates your jobs if they haven't finished. If a job is terminated due to a timeout, it  */
  timeout?: JobTimeout;
}

/** AWS Batch job queue binding for the SimpleSteps compiler. */
export class Batch {
  constructor(jobQueueArn: string) {}

  submitJob<T>(params: SubmitJobInput, options?: BatchOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  submitJobAsync(params: SubmitJobAsyncInput, options?: BatchOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }
}
