// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface ApplicationVersionLifecycleConfig {
  /** Specify a max count rule to restrict the number of application versions that are retained for an application. */
  MaxCountRule?: any;
  /** Specify a max age rule to restrict the length of time that application versions are retained for an application. */
  MaxAgeRule?: any;
}

export interface ApplicationResourceLifecycleConfig {
  /** The ARN of an IAM service role that Elastic Beanstalk has permission to assume. The ServiceRole property is required the first time that you provide a VersionLifecycleConfig for the application in one */
  ServiceRole?: string;
  /** Defines lifecycle settings for application versions. */
  VersionLifecycleConfig?: ApplicationVersionLifecycleConfig;
}

export interface Tag {
  /** The key of the tag. */
  Key?: string;
  /** The value of the tag. */
  Value?: string;
}

export interface SourceBuildInformation {
  /** The type of repository. Git Zip */
  SourceType: 'Git' | 'Zip';
  /** Location where the repository is stored. CodeCommit S3 */
  SourceRepository: 'CodeCommit' | 'S3';
  /** The location of the source code, as a formatted string, depending on the value of SourceRepository For CodeCommit, the format is the repository name and commit ID, separated by a forward slash. For ex */
  SourceLocation: string;
}

export interface S3Location {
  /** The Amazon S3 bucket where the data is located. */
  S3Bucket?: string;
  /** The Amazon S3 key where the data is located. */
  S3Key?: string;
}

export interface BuildConfiguration {
  /** The name of the artifact of the CodeBuild build. If provided, Elastic Beanstalk stores the build artifact in the S3 location S3-bucket/resources/application-name/codebuild/codebuild-version-label-arti */
  ArtifactName?: string;
  /** The Amazon Resource Name (ARN) of the AWS Identity and Access Management (IAM) role that enables AWS CodeBuild to interact with dependent AWS services on behalf of the AWS account. */
  CodeBuildServiceRole: string;
  /** Information about the compute resources the build project will use. BUILD_GENERAL1_SMALL: Use up to 3 GB memory and 2 vCPUs for builds BUILD_GENERAL1_MEDIUM: Use up to 7 GB memory and 4 vCPUs for buil */
  ComputeType?: 'BUILD_GENERAL1_SMALL' | 'BUILD_GENERAL1_MEDIUM' | 'BUILD_GENERAL1_LARGE';
  /** The ID of the Docker image to use for this build project. */
  Image: string;
  /** How long in minutes, from 5 to 480 (8 hours), for AWS CodeBuild to wait until timing out any related build that does not get marked as completed. The default is 60 minutes. */
  TimeoutInMinutes?: number;
}

export interface SourceConfiguration {
  /** The name of the application associated with the configuration. */
  ApplicationName?: string;
  /** The name of the configuration template. */
  TemplateName?: string;
}

export interface ConfigurationOptionSetting {
  /** A unique resource name for the option setting. Use it for a time–based scaling configuration option. */
  ResourceName?: string;
  /** A unique namespace that identifies the option's associated AWS resource. */
  Namespace?: string;
  /** The name of the configuration option. */
  OptionName?: string;
  /** The current value for the configuration option. */
  Value?: string;
}

export interface EnvironmentTier {
  /** The name of this environment tier. Valid values: For Web server tier – WebServer For Worker tier – Worker */
  Name?: string;
  /** The type of this environment tier. Valid values: For Web server tier – Standard For Worker tier – SQS/HTTP */
  Type?: string;
  /** The version of this environment tier. When you don't set a value to it, Elastic Beanstalk uses the latest compatible worker tier version. This member is deprecated. Any specific version that you set m */
  Version?: string;
}

export interface OptionSpecification {
  /** A unique resource name for a time-based scaling configuration option. */
  ResourceName?: string;
  /** A unique namespace identifying the option's associated AWS resource. */
  Namespace?: string;
  /** The name of the configuration option. */
  OptionName?: string;
}

export interface SearchFilter {
  /** The result attribute to which the filter values are applied. Valid values vary by API action. */
  Attribute?: string;
  /** The operator to apply to the Attribute with each of the Values. Valid values vary by Attribute. */
  Operator?: string;
  /** The list of values applied to the Attribute and Operator attributes. Number of values and valid values vary by Attribute. */
  Values?: any[];
}

export interface PlatformFilter {
  /** The platform version attribute to which the filter values are applied. Valid values: PlatformName | PlatformVersion | PlatformStatus | PlatformBranchName | PlatformLifecycleState | PlatformOwner | Sup */
  Type?: string;
  /** The operator to apply to the Type with each of the Values. Valid values: = | != | | | > | >= | contains | begins_with | ends_with */
  Operator?: string;
  /** The list of values applied to the filtering platform version attribute. Only one value is supported for all current operators. The following list shows valid filter values for some filter attributes.  */
  Values?: any[];
}

export interface AbortEnvironmentUpdateInput {
  /** This specifies the ID of the environment with the in-progress update that you want to cancel. */
  EnvironmentId?: string;
  /** This specifies the name of the environment with the in-progress update that you want to cancel. */
  EnvironmentName?: string;
}

/** Request to execute a scheduled managed action immediately. */
export interface ApplyEnvironmentManagedActionInput {
  /** The action ID of the scheduled managed action to execute. */
  ActionId: string;
  /** The environment ID of the target environment. */
  EnvironmentId?: string;
  /** The name of the target environment. */
  EnvironmentName?: string;
}

/** Request to add or change the operations role used by an environment. */
export interface AssociateEnvironmentOperationsRoleInput {
  /** The name of the environment to which to set the operations role. */
  EnvironmentName: string;
  /** The Amazon Resource Name (ARN) of an existing IAM role to be used as the environment's operations role. */
  OperationsRole: string;
}

/** Results message indicating whether a CNAME is available. */
export interface CheckDNSAvailabilityInput {
  /** The prefix used when this CNAME is reserved. */
  CNAMEPrefix: string;
}

/** Request to create or update a group of environments. */
export interface ComposeEnvironmentsInput {
  /** The name of the application to which the specified source bundles belong. */
  ApplicationName?: string;
  /** The name of the group to which the target environments belong. Specify a group name only if the environment name defined in each target environment's manifest ends with a + (plus) character. See Envir */
  GroupName?: string;
  /** A list of version labels, specifying one or more application source bundles that belong to the target application. Each source bundle must include an environment manifest that specifies the name of th */
  VersionLabels?: string[];
}

/** Request to create an application. */
export interface CreateApplicationInput {
  /** The name of the application. Must be unique within your account. */
  ApplicationName: string;
  /** Your description of the application. */
  Description?: string;
  /** Specifies an application resource lifecycle configuration to prevent your application from accumulating too many versions. */
  ResourceLifecycleConfig?: ApplicationResourceLifecycleConfig;
  /** Specifies the tags applied to the application. Elastic Beanstalk applies these tags only to the application. Environments that you create in the application don't inherit the tags. */
  Tags?: Tag[];
}

export interface CreateApplicationVersionInput {
  /** The name of the application. If no application is found with this name, and AutoCreateApplication is false, returns an InvalidParameterValue error. */
  ApplicationName: string;
  /** A label identifying this version. Constraint: Must be unique per application. If an application version already exists with this label for the specified application, AWS Elastic Beanstalk returns an I */
  VersionLabel: string;
  /** Set to true to create an application with the specified name if it doesn't already exist. */
  AutoCreateApplication?: boolean;
  /** Settings for an AWS CodeBuild build. */
  BuildConfiguration?: BuildConfiguration;
  /** A description of this application version. */
  Description?: string;
  /** Pre-processes and validates the environment manifest (env.yaml) and configuration files (*.config files in the .ebextensions folder) in the source bundle. Validating configuration files can identify i */
  Process?: boolean;
  /** Specify a commit in an AWS CodeCommit Git repository to use as the source code for the application version. */
  SourceBuildInformation?: SourceBuildInformation;
  /** The Amazon S3 bucket and key that identify the location of the source bundle for this version. The Amazon S3 bucket must be in the same region as the environment. Specify a source bundle in S3 or a co */
  SourceBundle?: S3Location;
  /** Specifies the tags applied to the application version. Elastic Beanstalk applies these tags only to the application version. Environments that use the application version don't inherit the tags. */
  Tags?: Tag[];
}

/** Request to create a configuration template. */
export interface CreateConfigurationTemplateInput {
  /** The name of the Elastic Beanstalk application to associate with this configuration template. */
  ApplicationName: string;
  /** The name of the configuration template. Constraint: This name must be unique per application. */
  TemplateName: string;
  /** An optional description for this configuration. */
  Description?: string;
  /** The ID of an environment whose settings you want to use to create the configuration template. You must specify EnvironmentId if you don't specify PlatformArn, SolutionStackName, or SourceConfiguration */
  EnvironmentId?: string;
  /** Option values for the Elastic Beanstalk configuration, such as the instance type. If specified, these values override the values obtained from the solution stack or the source configuration template.  */
  OptionSettings?: ConfigurationOptionSetting[];
  /** The Amazon Resource Name (ARN) of the custom platform. For more information, see Custom Platforms in the AWS Elastic Beanstalk Developer Guide. If you specify PlatformArn, then don't specify SolutionS */
  PlatformArn?: string;
  /** The name of an Elastic Beanstalk solution stack (platform version) that this configuration uses. For example, 64bit Amazon Linux 2013.09 running Tomcat 7 Java 7. A solution stack specifies the operati */
  SolutionStackName?: string;
  /** An Elastic Beanstalk configuration template to base this one on. If specified, Elastic Beanstalk uses the configuration values from the specified configuration template to create a new configuration.  */
  SourceConfiguration?: SourceConfiguration;
  /** Specifies the tags applied to the configuration template. */
  Tags?: Tag[];
}

export interface CreateEnvironmentInput {
  /** The name of the application that is associated with this environment. */
  ApplicationName: string;
  /** If specified, the environment attempts to use this value as the prefix for the CNAME in your Elastic Beanstalk environment URL. If not specified, the CNAME is generated automatically by appending a ra */
  CNAMEPrefix?: string;
  /** Your description for this environment. */
  Description?: string;
  /** A unique name for the environment. Constraint: Must be from 4 to 40 characters in length. The name can contain only letters, numbers, and hyphens. It can't start or end with a hyphen. This name must b */
  EnvironmentName?: string;
  /** The name of the group to which the target environment belongs. Specify a group name only if the environment's name is specified in an environment manifest and not with the environment name parameter.  */
  GroupName?: string;
  /** The Amazon Resource Name (ARN) of an existing IAM role to be used as the environment's operations role. If specified, Elastic Beanstalk uses the operations role for permissions to downstream services  */
  OperationsRole?: string;
  /** If specified, AWS Elastic Beanstalk sets the specified configuration options to the requested value in the configuration set for the new environment. These override the values obtained from the soluti */
  OptionSettings?: ConfigurationOptionSetting[];
  /** A list of custom user-defined configuration options to remove from the configuration set for this new environment. */
  OptionsToRemove?: OptionSpecification[];
  /** The Amazon Resource Name (ARN) of the custom platform to use with the environment. For more information, see Custom Platforms in the AWS Elastic Beanstalk Developer Guide. If you specify PlatformArn,  */
  PlatformArn?: string;
  /** The name of an Elastic Beanstalk solution stack (platform version) to use with the environment. If specified, Elastic Beanstalk sets the configuration values to the default values associated with the  */
  SolutionStackName?: string;
  /** Specifies the tags applied to resources in the environment. */
  Tags?: Tag[];
  /** The name of the Elastic Beanstalk configuration template to use with the environment. If you specify TemplateName, then don't specify SolutionStackName. */
  TemplateName?: string;
  /** Specifies the tier to use in creating this environment. The environment tier that you choose determines whether Elastic Beanstalk provisions resources to support a web application that handles HTTP(S) */
  Tier?: EnvironmentTier;
  /** The name of the application version to deploy. Default: If not specified, Elastic Beanstalk attempts to deploy the sample application. */
  VersionLabel?: string;
}

/** Request to create a new platform version. */
export interface CreatePlatformVersionInput {
  /** The location of the platform definition archive in Amazon S3. */
  PlatformDefinitionBundle: S3Location;
  /** The name of your custom platform. */
  PlatformName: string;
  /** The number, such as 1.0.2, for the new platform version. */
  PlatformVersion: string;
  /** The name of the builder environment. */
  EnvironmentName?: string;
  /** The configuration option settings to apply to the builder environment. */
  OptionSettings?: ConfigurationOptionSetting[];
  /** Specifies the tags applied to the new platform version. Elastic Beanstalk applies these tags only to the platform version. Environments that you create using the platform version don't inherit the tag */
  Tags?: Tag[];
}

/** Request to delete an application. */
export interface DeleteApplicationInput {
  /** The name of the application to delete. */
  ApplicationName: string;
  /** When set to true, running environments will be terminated before deleting the application. */
  TerminateEnvByForce?: boolean;
}

/** Request to delete an application version. */
export interface DeleteApplicationVersionInput {
  /** The name of the application to which the version belongs. */
  ApplicationName: string;
  /** The label of the version to delete. */
  VersionLabel: string;
  /** Set to true to delete the source bundle from your storage bucket. Otherwise, the application version is deleted only from Elastic Beanstalk and the source bundle remains in Amazon S3. */
  DeleteSourceBundle?: boolean;
}

/** Request to delete a configuration template. */
export interface DeleteConfigurationTemplateInput {
  /** The name of the application to delete the configuration template from. */
  ApplicationName: string;
  /** The name of the configuration template to delete. */
  TemplateName: string;
}

/** Request to delete a draft environment configuration. */
export interface DeleteEnvironmentConfigurationInput {
  /** The name of the application the environment is associated with. */
  ApplicationName: string;
  /** The name of the environment to delete the draft configuration from. */
  EnvironmentName: string;
}

export interface DeletePlatformVersionInput {
  /** The ARN of the version of the custom platform. */
  PlatformArn?: string;
}

/** Request to describe one or more applications. */
export interface DescribeApplicationsInput {
  /** If specified, AWS Elastic Beanstalk restricts the returned descriptions to only include those with the specified names. */
  ApplicationNames?: string[];
}

/** Request to describe application versions. */
export interface DescribeApplicationVersionsInput {
  /** Specify an application name to show only application versions for that application. */
  ApplicationName?: string;
  /** For a paginated request. Specify a maximum number of application versions to include in each response. If no MaxRecords is specified, all available application versions are retrieved in a single respo */
  MaxRecords?: number;
  /** For a paginated request. Specify a token from a previous response page to retrieve the next response page. All other parameter values must be identical to the ones specified in the initial request. If */
  NextToken?: string;
  /** Specify a version label to show a specific application version. */
  VersionLabels?: string[];
}

/** Result message containing a list of application version descriptions. */
export interface DescribeConfigurationOptionsInput {
  /** The name of the application associated with the configuration template or environment. Only needed if you want to describe the configuration options associated with either the configuration template o */
  ApplicationName?: string;
  /** The name of the environment whose configuration options you want to describe. */
  EnvironmentName?: string;
  /** If specified, restricts the descriptions to only the specified options. */
  Options?: OptionSpecification[];
  /** The ARN of the custom platform. */
  PlatformArn?: string;
  /** The name of the solution stack whose configuration options you want to describe. */
  SolutionStackName?: string;
  /** The name of the configuration template whose configuration options you want to describe. */
  TemplateName?: string;
}

/** Result message containing all of the configuration settings for a specified solution stack or configuration template. */
export interface DescribeConfigurationSettingsInput {
  /** The application for the environment or configuration template. */
  ApplicationName: string;
  /** The name of the environment to describe. Condition: You must specify either this or a TemplateName, but not both. If you specify both, AWS Elastic Beanstalk returns an InvalidParameterCombination erro */
  EnvironmentName?: string;
  /** The name of the configuration template to describe. Conditional: You must specify either this parameter or an EnvironmentName, but not both. If you specify both, AWS Elastic Beanstalk returns an Inval */
  TemplateName?: string;
}

/** See the example below to learn how to create a request body. */
export interface DescribeEnvironmentHealthInput {
  /** Specify the response elements to return. To retrieve all attributes, set to All. If no attribute names are specified, returns the name of the environment. */
  AttributeNames?: 'Status' | 'Color' | 'Causes' | 'ApplicationMetrics' | 'InstancesHealth' | 'All' | 'HealthStatus' | 'RefreshedAt'[];
  /** Specify the environment by ID. You must specify either this or an EnvironmentName, or both. */
  EnvironmentId?: string;
  /** Specify the environment by name. You must specify either this or an EnvironmentName, or both. */
  EnvironmentName?: string;
}

/** Request to list completed and failed managed actions. */
export interface DescribeEnvironmentManagedActionHistoryInput {
  /** The environment ID of the target environment. */
  EnvironmentId?: string;
  /** The name of the target environment. */
  EnvironmentName?: string;
  /** The maximum number of items to return for a single request. */
  MaxItems?: number;
  /** The pagination token returned by a previous request. */
  NextToken?: string;
}

/** Request to list an environment's upcoming and in-progress managed actions. */
export interface DescribeEnvironmentManagedActionsInput {
  /** The environment ID of the target environment. */
  EnvironmentId?: string;
  /** The name of the target environment. */
  EnvironmentName?: string;
  /** To show only actions with a particular status, specify a status. */
  Status?: 'Scheduled' | 'Pending' | 'Running' | 'Unknown';
}

/** Request to describe the resources in an environment. */
export interface DescribeEnvironmentResourcesInput {
  /** The ID of the environment to retrieve AWS resource usage data. Condition: You must specify either this or an EnvironmentName, or both. If you do not specify either, AWS Elastic Beanstalk returns Missi */
  EnvironmentId?: string;
  /** The name of the environment to retrieve AWS resource usage data. Condition: You must specify either this or an EnvironmentId, or both. If you do not specify either, AWS Elastic Beanstalk returns Missi */
  EnvironmentName?: string;
}

/** Request to describe one or more environments. */
export interface DescribeEnvironmentsInput {
  /** If specified, AWS Elastic Beanstalk restricts the returned descriptions to include only those that are associated with this application. */
  ApplicationName?: string;
  /** If specified, AWS Elastic Beanstalk restricts the returned descriptions to include only those that have the specified IDs. */
  EnvironmentIds?: string[];
  /** If specified, AWS Elastic Beanstalk restricts the returned descriptions to include only those that have the specified names. */
  EnvironmentNames?: string[];
  /** If specified when IncludeDeleted is set to true, then environments deleted after this date are displayed. */
  IncludedDeletedBackTo?: string;
  /** Indicates whether to include deleted environments: true: Environments that have been deleted after IncludedDeletedBackTo are displayed. false: Do not include deleted environments. */
  IncludeDeleted?: boolean;
  /** For a paginated request. Specify a maximum number of environments to include in each response. If no MaxRecords is specified, all available environments are retrieved in a single response. */
  MaxRecords?: number;
  /** For a paginated request. Specify a token from a previous response page to retrieve the next response page. All other parameter values must be identical to the ones specified in the initial request. If */
  NextToken?: string;
  /** If specified, AWS Elastic Beanstalk restricts the returned descriptions to include only those that are associated with this application version. */
  VersionLabel?: string;
}

/** Request to retrieve a list of events for an environment. */
export interface DescribeEventsInput {
  /** If specified, AWS Elastic Beanstalk restricts the returned descriptions to include only those associated with this application. */
  ApplicationName?: string;
  /** If specified, AWS Elastic Beanstalk restricts the returned descriptions to those that occur up to, but not including, the EndTime. */
  EndTime?: string;
  /** If specified, AWS Elastic Beanstalk restricts the returned descriptions to those associated with this environment. */
  EnvironmentId?: string;
  /** If specified, AWS Elastic Beanstalk restricts the returned descriptions to those associated with this environment. */
  EnvironmentName?: string;
  /** Specifies the maximum number of events that can be returned, beginning with the most recent event. */
  MaxRecords?: number;
  /** Pagination token. If specified, the events return the next batch of results. */
  NextToken?: string;
  /** The ARN of a custom platform version. If specified, AWS Elastic Beanstalk restricts the returned descriptions to those associated with this custom platform version. */
  PlatformArn?: string;
  /** If specified, AWS Elastic Beanstalk restricts the described events to include only those associated with this request ID. */
  RequestId?: string;
  /** If specified, limits the events returned from this call to include only those with the specified severity or higher. */
  Severity?: 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL';
  /** If specified, AWS Elastic Beanstalk restricts the returned descriptions to those that occur on or after this time. */
  StartTime?: string;
  /** If specified, AWS Elastic Beanstalk restricts the returned descriptions to those that are associated with this environment configuration. */
  TemplateName?: string;
  /** If specified, AWS Elastic Beanstalk restricts the returned descriptions to those associated with this application version. */
  VersionLabel?: string;
}

/** Parameters for a call to DescribeInstancesHealth. */
export interface DescribeInstancesHealthInput {
  /** Specifies the response elements you wish to receive. To retrieve all attributes, set to All. If no attribute names are specified, returns a list of instances. */
  AttributeNames?: 'HealthStatus' | 'Color' | 'Causes' | 'ApplicationMetrics' | 'RefreshedAt' | 'LaunchedAt' | 'System' | 'Deployment' | 'AvailabilityZone' | 'InstanceType' | 'All'[];
  /** Specify the AWS Elastic Beanstalk environment by ID. */
  EnvironmentId?: string;
  /** Specify the AWS Elastic Beanstalk environment by name. */
  EnvironmentName?: string;
  /** Specify the pagination token returned by a previous call. */
  NextToken?: string;
}

export interface DescribePlatformVersionInput {
  /** The ARN of the platform version. */
  PlatformArn?: string;
}

/** Request to disassociate the operations role from an environment. */
export interface DisassociateEnvironmentOperationsRoleInput {
  /** The name of the environment from which to disassociate the operations role. */
  EnvironmentName: string;
}

export interface ListPlatformBranchesInput {
  /** Criteria for restricting the resulting list of platform branches. The filter is evaluated as a logical conjunction (AND) of the separate SearchFilter terms. The following list shows valid attribute va */
  Filters?: SearchFilter[];
  /** The maximum number of platform branch values returned in one call. */
  MaxRecords?: number;
  /** For a paginated request. Specify a token from a previous response page to retrieve the next response page. All other parameter values must be identical to the ones specified in the initial request. If */
  NextToken?: string;
}

export interface ListPlatformVersionsInput {
  /** Criteria for restricting the resulting list of platform versions. The filter is interpreted as a logical conjunction (AND) of the separate PlatformFilter terms. */
  Filters?: PlatformFilter[];
  /** The maximum number of platform version values returned in one call. */
  MaxRecords?: number;
  /** For a paginated request. Specify a token from a previous response page to retrieve the next response page. All other parameter values must be identical to the ones specified in the initial request. If */
  NextToken?: string;
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) of the resouce for which a tag list is requested. Must be the ARN of an Elastic Beanstalk resource. */
  ResourceArn: string;
}

export interface RebuildEnvironmentInput {
  /** The ID of the environment to rebuild. Condition: You must specify either this or an EnvironmentName, or both. If you do not specify either, AWS Elastic Beanstalk returns MissingRequiredParameter error */
  EnvironmentId?: string;
  /** The name of the environment to rebuild. Condition: You must specify either this or an EnvironmentId, or both. If you do not specify either, AWS Elastic Beanstalk returns MissingRequiredParameter error */
  EnvironmentName?: string;
}

/** Request to retrieve logs from an environment and store them in your Elastic Beanstalk storage bucket. */
export interface RequestEnvironmentInfoInput {
  /** The type of information to request. */
  InfoType: 'tail' | 'bundle';
  /** The ID of the environment of the requested data. If no such environment is found, RequestEnvironmentInfo returns an InvalidParameterValue error. Condition: You must specify either this or an Environme */
  EnvironmentId?: string;
  /** The name of the environment of the requested data. If no such environment is found, RequestEnvironmentInfo returns an InvalidParameterValue error. Condition: You must specify either this or an Environ */
  EnvironmentName?: string;
}

export interface RestartAppServerInput {
  /** The ID of the environment to restart the server for. Condition: You must specify either this or an EnvironmentName, or both. If you do not specify either, AWS Elastic Beanstalk returns MissingRequired */
  EnvironmentId?: string;
  /** The name of the environment to restart the server for. Condition: You must specify either this or an EnvironmentId, or both. If you do not specify either, AWS Elastic Beanstalk returns MissingRequired */
  EnvironmentName?: string;
}

/** Request to download logs retrieved with RequestEnvironmentInfo. */
export interface RetrieveEnvironmentInfoInput {
  /** The type of information to retrieve. */
  InfoType: 'tail' | 'bundle';
  /** The ID of the data's environment. If no such environment is found, returns an InvalidParameterValue error. Condition: You must specify either this or an EnvironmentName, or both. If you do not specify */
  EnvironmentId?: string;
  /** The name of the data's environment. If no such environment is found, returns an InvalidParameterValue error. Condition: You must specify either this or an EnvironmentId, or both. If you do not specify */
  EnvironmentName?: string;
}

/** Swaps the CNAMEs of two environments. */
export interface SwapEnvironmentCNAMEsInput {
  /** The ID of the destination environment. Condition: You must specify at least the DestinationEnvironmentID or the DestinationEnvironmentName. You may also specify both. You must specify the SourceEnviro */
  DestinationEnvironmentId?: string;
  /** The name of the destination environment. Condition: You must specify at least the DestinationEnvironmentID or the DestinationEnvironmentName. You may also specify both. You must specify the SourceEnvi */
  DestinationEnvironmentName?: string;
  /** The ID of the source environment. Condition: You must specify at least the SourceEnvironmentID or the SourceEnvironmentName. You may also specify both. If you specify the SourceEnvironmentId, you must */
  SourceEnvironmentId?: string;
  /** The name of the source environment. Condition: You must specify at least the SourceEnvironmentID or the SourceEnvironmentName. You may also specify both. If you specify the SourceEnvironmentName, you  */
  SourceEnvironmentName?: string;
}

/** Request to terminate an environment. */
export interface TerminateEnvironmentInput {
  /** The ID of the environment to terminate. Condition: You must specify either this or an EnvironmentName, or both. If you do not specify either, AWS Elastic Beanstalk returns MissingRequiredParameter err */
  EnvironmentId?: string;
  /** The name of the environment to terminate. Condition: You must specify either this or an EnvironmentId, or both. If you do not specify either, AWS Elastic Beanstalk returns MissingRequiredParameter err */
  EnvironmentName?: string;
  /** Terminates the target environment even if another environment in the same group is dependent on it. */
  ForceTerminate?: boolean;
  /** Indicates whether the associated AWS resources should shut down when the environment is terminated: true: The specified environment as well as the associated AWS resources, such as Auto Scaling group  */
  TerminateResources?: boolean;
}

/** Request to update an application. */
export interface UpdateApplicationInput {
  /** The name of the application to update. If no such application is found, UpdateApplication returns an InvalidParameterValue error. */
  ApplicationName: string;
  /** A new description for the application. Default: If not specified, AWS Elastic Beanstalk does not update the description. */
  Description?: string;
}

export interface UpdateApplicationResourceLifecycleInput {
  /** The name of the application. */
  ApplicationName: string;
  /** The lifecycle configuration. */
  ResourceLifecycleConfig: ApplicationResourceLifecycleConfig;
}

export interface UpdateApplicationVersionInput {
  /** The name of the application associated with this version. If no application is found with this name, UpdateApplication returns an InvalidParameterValue error. */
  ApplicationName: string;
  /** The name of the version to update. If no application version is found with this label, UpdateApplication returns an InvalidParameterValue error. */
  VersionLabel: string;
  /** A new description for this version. */
  Description?: string;
}

/** The result message containing the options for the specified solution stack. */
export interface UpdateConfigurationTemplateInput {
  /** The name of the application associated with the configuration template to update. If no application is found with this name, UpdateConfigurationTemplate returns an InvalidParameterValue error. */
  ApplicationName: string;
  /** The name of the configuration template to update. If no configuration template is found with this name, UpdateConfigurationTemplate returns an InvalidParameterValue error. */
  TemplateName: string;
  /** A new description for the configuration. */
  Description?: string;
  /** A list of configuration option settings to update with the new specified option value. */
  OptionSettings?: ConfigurationOptionSetting[];
  /** A list of configuration options to remove from the configuration set. Constraint: You can remove only UserDefined configuration options. */
  OptionsToRemove?: OptionSpecification[];
}

/** Request to update an environment. */
export interface UpdateEnvironmentInput {
  /** The name of the application with which the environment is associated. */
  ApplicationName?: string;
  /** If this parameter is specified, AWS Elastic Beanstalk updates the description of this environment. */
  Description?: string;
  /** The ID of the environment to update. If no environment with this ID exists, AWS Elastic Beanstalk returns an InvalidParameterValue error. Condition: You must specify either this or an EnvironmentName, */
  EnvironmentId?: string;
  /** The name of the environment to update. If no environment with this name exists, AWS Elastic Beanstalk returns an InvalidParameterValue error. Condition: You must specify either this or an EnvironmentI */
  EnvironmentName?: string;
  /** The name of the group to which the target environment belongs. Specify a group name only if the environment's name is specified in an environment manifest and not with the environment name or environm */
  GroupName?: string;
  /** If specified, AWS Elastic Beanstalk updates the configuration set associated with the running environment and sets the specified configuration options to the requested value. */
  OptionSettings?: ConfigurationOptionSetting[];
  /** A list of custom user-defined configuration options to remove from the configuration set for this environment. */
  OptionsToRemove?: OptionSpecification[];
  /** The ARN of the platform, if used. */
  PlatformArn?: string;
  /** This specifies the platform version that the environment will run after the environment is updated. */
  SolutionStackName?: string;
  /** If this parameter is specified, AWS Elastic Beanstalk deploys this configuration template to the environment. If no such configuration template is found, AWS Elastic Beanstalk returns an InvalidParame */
  TemplateName?: string;
  /** This specifies the tier to use to update the environment. Condition: At this time, if you change the tier version, name, or type, AWS Elastic Beanstalk returns InvalidParameterValue error. */
  Tier?: EnvironmentTier;
  /** If this parameter is specified, AWS Elastic Beanstalk deploys the named application version to the environment. If no such application version is found, returns an InvalidParameterValue error. */
  VersionLabel?: string;
}

export interface UpdateTagsForResourceInput {
  /** The Amazon Resource Name (ARN) of the resouce to be updated. Must be the ARN of an Elastic Beanstalk resource. */
  ResourceArn: string;
  /** A list of tags to add or update. If a key of an existing tag is added, the tag's value is updated. Specify at least one of these parameters: TagsToAdd, TagsToRemove. */
  TagsToAdd?: Tag[];
  /** A list of tag keys to remove. If a tag key doesn't exist, it is silently ignored. Specify at least one of these parameters: TagsToAdd, TagsToRemove. */
  TagsToRemove?: string[];
}

/** A list of validation messages for a specified configuration template. */
export interface ValidateConfigurationSettingsInput {
  /** The name of the application that the configuration template or environment belongs to. */
  ApplicationName: string;
  /** A list of the options and desired values to evaluate. */
  OptionSettings: ConfigurationOptionSetting[];
  /** The name of the environment to validate the settings against. Condition: You cannot specify both this and a configuration template name. */
  EnvironmentName?: string;
  /** The name of the configuration template to validate the settings against. Condition: You cannot specify both this and an environment name. */
  TemplateName?: string;
}

/** Elastic Beanstalk service binding for Step Functions SDK integrations. */
export class ElasticBeanstalk {
  constructor() {}

  abortEnvironmentUpdate<T>(params: AbortEnvironmentUpdateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  applyEnvironmentManagedAction<T>(params: ApplyEnvironmentManagedActionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateEnvironmentOperationsRole<T>(params: AssociateEnvironmentOperationsRoleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  checkDNSAvailability<T>(params: CheckDNSAvailabilityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  composeEnvironments<T>(params: ComposeEnvironmentsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createApplication<T>(params: CreateApplicationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createApplicationVersion<T>(params: CreateApplicationVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createConfigurationTemplate<T>(params: CreateConfigurationTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createEnvironment<T>(params: CreateEnvironmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPlatformVersion<T>(params: CreatePlatformVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createStorageLocation<T>(): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteApplication<T>(params: DeleteApplicationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteApplicationVersion<T>(params: DeleteApplicationVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteConfigurationTemplate<T>(params: DeleteConfigurationTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteEnvironmentConfiguration<T>(params: DeleteEnvironmentConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePlatformVersion<T>(params: DeletePlatformVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAccountAttributes<T>(): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeApplications<T>(params: DescribeApplicationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeApplicationVersions<T>(params: DescribeApplicationVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeConfigurationOptions<T>(params: DescribeConfigurationOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeConfigurationSettings<T>(params: DescribeConfigurationSettingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEnvironmentHealth<T>(params: DescribeEnvironmentHealthInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEnvironmentManagedActionHistory<T>(params: DescribeEnvironmentManagedActionHistoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEnvironmentManagedActions<T>(params: DescribeEnvironmentManagedActionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEnvironmentResources<T>(params: DescribeEnvironmentResourcesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEnvironments<T>(params: DescribeEnvironmentsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEvents<T>(params: DescribeEventsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInstancesHealth<T>(params: DescribeInstancesHealthInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePlatformVersion<T>(params: DescribePlatformVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateEnvironmentOperationsRole<T>(params: DisassociateEnvironmentOperationsRoleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAvailableSolutionStacks<T>(): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPlatformBranches<T>(params: ListPlatformBranchesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPlatformVersions<T>(params: ListPlatformVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rebuildEnvironment<T>(params: RebuildEnvironmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  requestEnvironmentInfo<T>(params: RequestEnvironmentInfoInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  restartAppServer<T>(params: RestartAppServerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  retrieveEnvironmentInfo<T>(params: RetrieveEnvironmentInfoInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  swapEnvironmentCNAMEs<T>(params: SwapEnvironmentCNAMEsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  terminateEnvironment<T>(params: TerminateEnvironmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateApplication<T>(params: UpdateApplicationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateApplicationResourceLifecycle<T>(params: UpdateApplicationResourceLifecycleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateApplicationVersion<T>(params: UpdateApplicationVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateConfigurationTemplate<T>(params: UpdateConfigurationTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateEnvironment<T>(params: UpdateEnvironmentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateTagsForResource<T>(params: UpdateTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  validateConfigurationSettings<T>(params: ValidateConfigurationSettingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
