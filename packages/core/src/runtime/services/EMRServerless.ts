// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface InitialCapacityConfig {
  /** The number of workers in the initial capacity configuration. */
  workerCount: number;
  /** The resource configuration of the initial capacity configuration. */
  workerConfiguration?: any;
}

export interface MaximumAllowedResources {
  /** The maximum allowed CPU for an application. */
  cpu: string;
  /** The maximum allowed resources for an application. */
  memory: string;
  /** The maximum allowed disk for an application. */
  disk?: string;
}

export interface AutoStartConfig {
  /** Enables the application to automatically start on job submission. Defaults to true. */
  enabled?: boolean;
}

export interface AutoStopConfig {
  /** Enables the application to automatically stop after a certain amount of time being idle. Defaults to true. */
  enabled?: boolean;
  /** The amount of idle time in minutes after which your application will automatically stop. Defaults to 15 minutes. */
  idleTimeoutMinutes?: number;
}

export interface NetworkConfiguration {
  /** The array of subnet Ids for customer VPC connectivity. */
  subnetIds?: string[];
  /** The array of security group Ids for customer VPC connectivity. */
  securityGroupIds?: string[];
}

export interface ImageConfigurationInput {
  /** The URI of an image in the Amazon ECR registry. This field is required when you create a new application. If you leave this field blank in an update, Amazon EMR will remove the image configuration. */
  imageUri?: string;
}

export interface WorkerTypeSpecificationInput {
  /** The image configuration for a worker type. */
  imageConfiguration?: any;
}

export interface Configuration {
  /** The classification within a configuration. */
  classification: string;
  /** A set of properties specified within a configuration classification. */
  properties?: Record<string, any>;
  /** A list of additional configurations to apply within a configuration object. */
  configurations?: any[];
}

export interface S3MonitoringConfiguration {
  /** The Amazon S3 destination URI for log publishing. */
  logUri?: string;
  /** The KMS key ARN to encrypt the logs published to the given Amazon S3 destination. */
  encryptionKeyArn?: string;
}

export interface ManagedPersistenceMonitoringConfiguration {
  /** Enables managed logging and defaults to true. If set to false, managed logging will be turned off. */
  enabled?: boolean;
  /** The KMS key ARN to encrypt the logs stored in managed log persistence. */
  encryptionKeyArn?: string;
}

export interface CloudWatchLoggingConfiguration {
  /** Enables CloudWatch logging. */
  enabled: boolean;
  /** The name of the log group in Amazon CloudWatch Logs where you want to publish your logs. */
  logGroupName?: string;
  /** Prefix for the CloudWatch log stream name. */
  logStreamNamePrefix?: string;
  /** The Key Management Service (KMS) key ARN to encrypt the logs that you store in CloudWatch Logs. */
  encryptionKeyArn?: string;
  /** The types of logs that you want to publish to CloudWatch. If you don't specify any log types, driver STDOUT and STDERR logs will be published to CloudWatch Logs by default. For more information includ */
  logTypes?: Record<string, any>;
}

export interface PrometheusMonitoringConfiguration {
  /** The remote write URL in the Amazon Managed Service for Prometheus workspace to send metrics to. */
  remoteWriteUrl?: string;
}

export interface MonitoringConfiguration {
  /** The Amazon S3 configuration for monitoring log publishing. */
  s3MonitoringConfiguration?: S3MonitoringConfiguration;
  /** The managed log persistence configuration for a job run. */
  managedPersistenceMonitoringConfiguration?: ManagedPersistenceMonitoringConfiguration;
  /** The Amazon CloudWatch configuration for monitoring logs. You can configure your jobs to send log information to CloudWatch. */
  cloudWatchLoggingConfiguration?: CloudWatchLoggingConfiguration;
  /** The monitoring configuration object you can configure to send metrics to Amazon Managed Service for Prometheus for a job run. */
  prometheusMonitoringConfiguration?: PrometheusMonitoringConfiguration;
}

export interface DiskEncryptionConfiguration {
  /** Specifies the optional encryption context that will be used when encrypting the data. An encryption context is a collection of non-secret key-value pairs that represent additional authenticated data. */
  encryptionContext?: Record<string, string>;
  /** The KMS key ARN to encrypt local disks. */
  encryptionKeyArn?: string;
}

export interface InteractiveConfiguration {
  /** Enables you to connect an application to Amazon EMR Studio to run interactive workloads in a notebook. */
  studioEnabled?: boolean;
  /** Enables an Apache Livy endpoint that you can connect to and run interactive jobs. */
  livyEndpointEnabled?: boolean;
}

export interface SchedulerConfiguration {
  /** The maximum duration in minutes for the job in QUEUED state. If scheduler configuration is enabled on your application, the default value is 360 minutes (6 hours). The valid range is from 15 to 720. */
  queueTimeoutMinutes?: number;
  /** The maximum concurrent job runs on this application. If scheduler configuration is enabled on your application, the default value is 15. The valid range is 1 to 1000. */
  maxConcurrentRuns?: number;
}

export interface IdentityCenterConfigurationInput {
  /** The ARN of the IAM Identity Center instance. */
  identityCenterInstanceArn?: string;
  /** Enables user background sessions for this application so Livy sessions can continue running after users log out of their interactive notebook or their Identity Center sessions expire. */
  userBackgroundSessionsEnabled?: boolean;
}

export interface JobLevelCostAllocationConfiguration {
  /** Enables job level cost allocation for the application. */
  enabled?: boolean;
}

export interface JobRunExecutionIamPolicy {
  /** An IAM inline policy to use as an execution IAM policy. */
  policy?: string;
  /** A list of Amazon Resource Names (ARNs) to use as an execution IAM policy. */
  policyArns?: string[];
}

export interface SparkSubmit {
  /** The entry point for the Spark submit job run. */
  entryPoint: string;
  /** The arguments for the Spark submit job run. */
  entryPointArguments?: any[];
  /** The parameters for the Spark submit job run. */
  sparkSubmitParameters?: string;
}

export interface Hive {
  /** The query for the Hive job run. */
  query: string;
  /** The query file for the Hive job run. */
  initQueryFile?: string;
  /** The parameters for the Hive job run. */
  parameters?: string;
}

export interface ConfigurationOverrides {
  /** The override configurations for the application. */
  applicationConfiguration?: any[];
  /** The override configurations for monitoring. */
  monitoringConfiguration?: MonitoringConfiguration;
  /** The override configuration to encrypt local disks. */
  diskEncryptionConfiguration?: DiskEncryptionConfiguration;
}

export interface CancelJobRunInput {
  /** The ID of the application on which the job run will be canceled. */
  applicationId: string;
  /** The ID of the job run to cancel. */
  jobRunId: string;
  /** The duration in seconds to wait before forcefully terminating the job after cancellation is requested. */
  shutdownGracePeriodInSeconds?: number;
}

export interface CreateApplicationInput {
  /** The client idempotency token of the application to create. Its value must be unique for each request. */
  clientToken: string;
  /** The Amazon EMR release associated with the application. */
  releaseLabel: string;
  /** The type of application you want to start, such as Spark or Hive. */
  type: string;
  /** The CPU architecture of an application. */
  architecture?: 'ARM64' | 'X86_64';
  /** The configuration for an application to automatically start on job submission. */
  autoStartConfiguration?: AutoStartConfig;
  /** The configuration for an application to automatically stop after a certain amount of time being idle. */
  autoStopConfiguration?: AutoStopConfig;
  /** The configuration object that allows encrypting local disks. */
  diskEncryptionConfiguration?: DiskEncryptionConfiguration;
  /** The IAM Identity Center Configuration accepts the Identity Center instance parameter required to enable trusted identity propagation. This configuration allows identity propagation between integrated  */
  identityCenterConfiguration?: IdentityCenterConfigurationInput;
  /** The image configuration for all worker types. You can either set this parameter or imageConfiguration for each worker type in workerTypeSpecifications. */
  imageConfiguration?: ImageConfigurationInput;
  /** The capacity to initialize when the application is created. */
  initialCapacity?: Record<string, InitialCapacityConfig>;
  /** The interactive configuration object that enables the interactive use cases to use when running an application. */
  interactiveConfiguration?: InteractiveConfiguration;
  /** The configuration object that enables job level cost allocation. */
  jobLevelCostAllocationConfiguration?: JobLevelCostAllocationConfiguration;
  /** The maximum capacity to allocate when the application is created. This is cumulative across all workers at any given point in time, not just when an application is created. No new resources will be cr */
  maximumCapacity?: MaximumAllowedResources;
  /** The configuration setting for monitoring. */
  monitoringConfiguration?: MonitoringConfiguration;
  /** The name of the application. */
  name?: string;
  /** The network configuration for customer VPC connectivity. */
  networkConfiguration?: NetworkConfiguration;
  /** The Configuration specifications to use when creating an application. Each configuration consists of a classification and properties. This configuration is applied to all the job runs submitted under  */
  runtimeConfiguration?: Configuration[];
  /** The scheduler configuration for batch and streaming jobs running on this application. Supported with release labels emr-7.0.0 and above. */
  schedulerConfiguration?: SchedulerConfiguration;
  /** The tags assigned to the application. */
  tags?: Record<string, string>;
  /** The key-value pairs that specify worker type to WorkerTypeSpecificationInput. This parameter must contain all valid worker types for a Spark or Hive application. Valid worker types include Driver and  */
  workerTypeSpecifications?: Record<string, WorkerTypeSpecificationInput>;
}

export interface DeleteApplicationInput {
  /** The ID of the application that will be deleted. */
  applicationId: string;
}

export interface GetApplicationInput {
  /** The ID of the application that will be described. */
  applicationId: string;
}

export interface GetDashboardForJobRunInput {
  /** The ID of the application. */
  applicationId: string;
  /** The ID of the job run. */
  jobRunId: string;
  /** Allows access to system profile logs for Lake Formation-enabled jobs. Default is false. */
  accessSystemProfileLogs?: boolean;
  /** An optimal parameter that indicates the amount of attempts for the job. If not specified, this value defaults to the attempt of the latest job. */
  attempt?: number;
}

export interface GetJobRunInput {
  /** The ID of the application on which the job run is submitted. */
  applicationId: string;
  /** The ID of the job run. */
  jobRunId: string;
  /** An optimal parameter that indicates the amount of attempts for the job. If not specified, this value defaults to the attempt of the latest job. */
  attempt?: number;
}

export interface ListApplicationsInput {
  /** The maximum number of applications that can be listed. */
  maxResults?: number;
  /** The token for the next set of application results. */
  nextToken?: string;
  /** An optional filter for application states. Note that if this filter contains multiple states, the resulting list will be grouped by the state. */
  states?: 'CREATING' | 'CREATED' | 'STARTING' | 'STARTED' | 'STOPPING' | 'STOPPED' | 'TERMINATED'[];
}

export interface ListJobRunAttemptsInput {
  /** The ID of the application for which to list job runs. */
  applicationId: string;
  /** The ID of the job run to list. */
  jobRunId: string;
  /** The maximum number of job run attempts to list. */
  maxResults?: number;
  /** The token for the next set of job run attempt results. */
  nextToken?: string;
}

export interface ListJobRunsInput {
  /** The ID of the application for which to list the job run. */
  applicationId: string;
  /** The lower bound of the option to filter by creation date and time. */
  createdAtAfter?: string;
  /** The upper bound of the option to filter by creation date and time. */
  createdAtBefore?: string;
  /** The maximum number of job runs that can be listed. */
  maxResults?: number;
  /** The mode of the job runs to list. */
  mode?: 'BATCH' | 'STREAMING';
  /** The token for the next set of job run results. */
  nextToken?: string;
  /** An optional filter for job run states. Note that if this filter contains multiple states, the resulting list will be grouped by the state. */
  states?: 'SUBMITTED' | 'PENDING' | 'SCHEDULED' | 'RUNNING' | 'SUCCESS' | 'FAILED' | 'CANCELLING' | 'CANCELLED' | 'QUEUED'[];
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) that identifies the resource to list the tags for. Currently, the supported resources are Amazon EMR Serverless applications and job runs. */
  resourceArn: string;
}

export interface StartApplicationInput {
  /** The ID of the application to start. */
  applicationId: string;
}

export interface StartJobRunInput {
  /** The ID of the application on which to run the job. */
  applicationId: string;
  /** The client idempotency token of the job run to start. Its value must be unique for each request. */
  clientToken: string;
  /** The execution role ARN for the job run. */
  executionRoleArn: string;
  /** The configuration overrides for the job run. */
  configurationOverrides?: ConfigurationOverrides;
  /** You can pass an optional IAM policy. The resulting job IAM role permissions will be an intersection of this policy and the policy associated with your job execution role. */
  executionIamPolicy?: JobRunExecutionIamPolicy;
  /** The maximum duration for the job run to run. If the job run runs beyond this duration, it will be automatically cancelled. */
  executionTimeoutMinutes?: number;
  /** The job driver for the job run. */
  jobDriver?: { sparkSubmit?: SparkSubmit } | { hive?: Hive };
  /** The mode of the job run when it starts. */
  mode?: 'BATCH' | 'STREAMING';
  /** The optional job run name. This doesn't have to be unique. */
  name?: string;
  /** The retry policy when job run starts. */
  retryPolicy?: any;
  /** The tags assigned to the job run. */
  tags?: Record<string, string>;
}

export interface StopApplicationInput {
  /** The ID of the application to stop. */
  applicationId: string;
}

export interface TagResourceInput {
  /** The Amazon Resource Name (ARN) that identifies the resource to list the tags for. Currently, the supported resources are Amazon EMR Serverless applications and job runs. */
  resourceArn: string;
  /** The tags to add to the resource. A tag is an array of key-value pairs. */
  tags: Record<string, string>;
}

export interface UntagResourceInput {
  /** The Amazon Resource Name (ARN) that identifies the resource to list the tags for. Currently, the supported resources are Amazon EMR Serverless applications and job runs. */
  resourceArn: string;
  /** The keys of the tags to be removed. */
  tagKeys: string[];
}

export interface UpdateApplicationInput {
  /** The ID of the application to update. */
  applicationId: string;
  /** The client idempotency token of the application to update. Its value must be unique for each request. */
  clientToken: string;
  /** The CPU architecture of an application. */
  architecture?: 'ARM64' | 'X86_64';
  /** The configuration for an application to automatically start on job submission. */
  autoStartConfiguration?: AutoStartConfig;
  /** The configuration for an application to automatically stop after a certain amount of time being idle. */
  autoStopConfiguration?: AutoStopConfig;
  /** The configuration object that allows encrypting local disks. */
  diskEncryptionConfiguration?: DiskEncryptionConfiguration;
  /** Specifies the IAM Identity Center configuration used to enable or disable trusted identity propagation. When provided, this configuration determines how the application interacts with IAM Identity Cen */
  identityCenterConfiguration?: IdentityCenterConfigurationInput;
  /** The image configuration to be used for all worker types. You can either set this parameter or imageConfiguration for each worker type in WorkerTypeSpecificationInput. */
  imageConfiguration?: ImageConfigurationInput;
  /** The capacity to initialize when the application is updated. */
  initialCapacity?: Record<string, InitialCapacityConfig>;
  /** The interactive configuration object that contains new interactive use cases when the application is updated. */
  interactiveConfiguration?: InteractiveConfiguration;
  /** The configuration object that enables job level cost allocation. */
  jobLevelCostAllocationConfiguration?: JobLevelCostAllocationConfiguration;
  /** The maximum capacity to allocate when the application is updated. This is cumulative across all workers at any given point in time during the lifespan of the application. No new resources will be crea */
  maximumCapacity?: MaximumAllowedResources;
  /** The configuration setting for monitoring. */
  monitoringConfiguration?: MonitoringConfiguration;
  networkConfiguration?: NetworkConfiguration;
  /** The Amazon EMR release label for the application. You can change the release label to use a different release of Amazon EMR. */
  releaseLabel?: string;
  /** The Configuration specifications to use when updating an application. Each configuration consists of a classification and properties. This configuration is applied across all the job runs submitted un */
  runtimeConfiguration?: Configuration[];
  /** The scheduler configuration for batch and streaming jobs running on this application. Supported with release labels emr-7.0.0 and above. */
  schedulerConfiguration?: SchedulerConfiguration;
  /** The key-value pairs that specify worker type to WorkerTypeSpecificationInput. This parameter must contain all valid worker types for a Spark or Hive application. Valid worker types include Driver and  */
  workerTypeSpecifications?: Record<string, WorkerTypeSpecificationInput>;
}

/** EMR Serverless service binding for Step Functions SDK integrations. */
export class EMRServerless {
  constructor() {}

  cancelJobRun<T>(params: CancelJobRunInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createApplication<T>(params: CreateApplicationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteApplication<T>(params: DeleteApplicationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getApplication<T>(params: GetApplicationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDashboardForJobRun<T>(params: GetDashboardForJobRunInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getJobRun<T>(params: GetJobRunInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listApplications<T>(params: ListApplicationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listJobRunAttempts<T>(params: ListJobRunAttemptsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listJobRuns<T>(params: ListJobRunsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startApplication<T>(params: StartApplicationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startJobRun<T>(params: StartJobRunInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopApplication<T>(params: StopApplicationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateApplication<T>(params: UpdateApplicationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
