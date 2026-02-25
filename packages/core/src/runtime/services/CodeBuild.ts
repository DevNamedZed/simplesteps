// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy, TaskOptions } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for CodeBuild operations. */
export interface CodeBuildOptions extends TaskOptions {
}

export interface ProjectSource {
  /** The type of repository that contains the source code to be built. Valid values include: BITBUCKET: The source code is in a Bitbucket repository. CODECOMMIT: The source code is in an CodeCommit reposit */
  type: 'CODECOMMIT' | 'CODEPIPELINE' | 'GITHUB' | 'GITLAB' | 'GITLAB_SELF_MANAGED' | 'S3' | 'BITBUCKET' | 'GITHUB_ENTERPRISE' | 'NO_SOURCE';
  /** Information about the location of the source code to be built. Valid values include: For source code settings that are specified in the source action of a pipeline in CodePipeline, location should not */
  location?: string;
  /** Information about the Git clone depth for the build project. */
  gitCloneDepth?: number;
  /** Information about the Git submodules configuration for the build project. */
  gitSubmodulesConfig?: any;
  /** The buildspec file declaration to use for the builds in this build project. If this value is set, it can be either an inline buildspec definition, the path to an alternate buildspec file relative to t */
  buildspec?: string;
  /** Information about the authorization settings for CodeBuild to access the source code to be built. */
  auth?: any;
  /** Set to true to report the status of a build's start and finish to your source provider. This option is valid only when your source provider is GitHub, GitHub Enterprise, GitLab, GitLab Self Managed, G */
  reportBuildStatus?: boolean;
  /** Contains information that defines how the build project reports the build status to the source provider. This option is only used when the source provider is GITHUB, GITHUB_ENTERPRISE, or BITBUCKET. */
  buildStatusConfig?: any;
  /** Enable this flag to ignore SSL warnings while connecting to the project source code. */
  insecureSsl?: boolean;
  /** An identifier for this project source. The identifier can only contain alphanumeric characters and underscores, and must be less than 128 characters in length. */
  sourceIdentifier?: string;
}

export interface ProjectSourceVersion {
  /** An identifier for a source in the build project. The identifier can only contain alphanumeric characters and underscores, and must be less than 128 characters in length. */
  sourceIdentifier: string;
  /** The source version for the corresponding source identifier. If specified, must be one of: For CodeCommit: the commit ID, branch, or Git tag to use. For GitHub: the commit ID, pull request ID, branch n */
  sourceVersion: string;
}

export interface ProjectArtifacts {
  /** The type of build output artifact. Valid values include: CODEPIPELINE: The build project has build output generated through CodePipeline. The CODEPIPELINE type is not supported for secondaryArtifacts. */
  type: 'CODEPIPELINE' | 'S3' | 'NO_ARTIFACTS';
  /** Information about the build output artifact location: If type is set to CODEPIPELINE, CodePipeline ignores this value if specified. This is because CodePipeline manages its build output locations inst */
  location?: string;
  /** Along with namespaceType and name, the pattern that CodeBuild uses to name and store the output artifact: If type is set to CODEPIPELINE, CodePipeline ignores this value if specified. This is because  */
  path?: string;
  /** Along with path and name, the pattern that CodeBuild uses to determine the name and location to store the output artifact: If type is set to CODEPIPELINE, CodePipeline ignores this value if specified. */
  namespaceType?: 'NONE' | 'BUILD_ID';
  /** Along with path and namespaceType, the pattern that CodeBuild uses to name and store the output artifact: If type is set to CODEPIPELINE, CodePipeline ignores this value if specified. This is because  */
  name?: string;
  /** The type of build output artifact to create: If type is set to CODEPIPELINE, CodePipeline ignores this value if specified. This is because CodePipeline manages its build output artifacts instead of Co */
  packaging?: 'NONE' | 'ZIP';
  /** If this flag is set, a name specified in the buildspec file overrides the artifact name. The name specified in a buildspec file is calculated at build time and uses the Shell Command Language. For exa */
  overrideArtifactName?: boolean;
  /** Set to true if you do not want your output artifacts encrypted. This option is valid only if your artifacts type is Amazon S3. If this is set with another artifacts type, an invalidInputException is t */
  encryptionDisabled?: boolean;
  /** An identifier for this artifact definition. */
  artifactIdentifier?: string;
  bucketOwnerAccess?: 'NONE' | 'READ_ONLY' | 'FULL';
}

export interface EnvironmentVariable {
  /** The name or key of the environment variable. */
  name: string;
  /** The value of the environment variable. We strongly discourage the use of PLAINTEXT environment variables to store sensitive values, especially Amazon Web Services secret key IDs. PLAINTEXT environment */
  value: string;
  /** The type of environment variable. Valid values include: PARAMETER_STORE: An environment variable stored in Systems Manager Parameter Store. For environment variables of this type, specify the name of  */
  type?: 'PLAINTEXT' | 'PARAMETER_STORE' | 'SECRETS_MANAGER';
}

export interface SourceAuth {
  /** The authorization type to use. Valid options are OAUTH, CODECONNECTIONS, or SECRETS_MANAGER. */
  type: 'OAUTH' | 'CODECONNECTIONS' | 'SECRETS_MANAGER';
  /** The resource value that applies to the specified authorization type. */
  resource?: string;
}

export interface GitSubmodulesConfig {
  /** Set to true to fetch Git submodules for your CodeBuild build project. */
  fetchSubmodules: boolean;
}

export interface BuildStatusConfig {
  /** Specifies the context of the build status CodeBuild sends to the source provider. The usage of this parameter depends on the source provider. Bitbucket This parameter is used for the name parameter in */
  context?: string;
  /** Specifies the target url of the build status CodeBuild sends to the source provider. The usage of this parameter depends on the source provider. Bitbucket This parameter is used for the url parameter  */
  targetUrl?: string;
}

export interface ProjectCache {
  /** The type of cache used by the build project. Valid values include: NO_CACHE: The build project does not use any cache. S3: The build project reads and writes from and to S3. LOCAL: The build project s */
  type: 'NO_CACHE' | 'S3' | 'LOCAL';
  /** Information about the cache location: NO_CACHE or LOCAL: This value is ignored. S3: This is the S3 bucket name/prefix. */
  location?: string;
  /** An array of strings that specify the local cache modes. You can use one or more local cache modes at the same time. This is only used for LOCAL cache types. Possible values are: LOCAL_SOURCE_CACHE Cac */
  modes?: 'LOCAL_DOCKER_LAYER_CACHE' | 'LOCAL_SOURCE_CACHE' | 'LOCAL_CUSTOM_CACHE'[];
  /** Defines the scope of the cache. You can use this namespace to share a cache across multiple projects. For more information, see Cache sharing between projects in the CodeBuild User Guide. */
  cacheNamespace?: string;
}

export interface CloudWatchLogsConfig {
  /** The current status of the logs in CloudWatch Logs for a build project. Valid values are: ENABLED: CloudWatch Logs are enabled for this build project. DISABLED: CloudWatch Logs are not enabled for this */
  status: 'ENABLED' | 'DISABLED';
  /** The group name of the logs in CloudWatch Logs. For more information, see Working with Log Groups and Log Streams. */
  groupName?: string;
  /** The prefix of the stream name of the CloudWatch Logs. For more information, see Working with Log Groups and Log Streams. */
  streamName?: string;
}

export interface S3LogsConfig {
  /** The current status of the S3 build logs. Valid values are: ENABLED: S3 build logs are enabled for this build project. DISABLED: S3 build logs are not enabled for this build project. */
  status: 'ENABLED' | 'DISABLED';
  /** The ARN of an S3 bucket and the path prefix for S3 logs. If your Amazon S3 bucket name is my-bucket, and your path prefix is build-log, then acceptable formats are my-bucket/build-log or arn:aws:s3::: */
  location?: string;
  /** Set to true if you do not want your S3 build log output encrypted. By default S3 build logs are encrypted. */
  encryptionDisabled?: boolean;
  bucketOwnerAccess?: 'NONE' | 'READ_ONLY' | 'FULL';
}

export interface LogsConfig {
  /** Information about CloudWatch Logs for a build project. CloudWatch Logs are enabled by default. */
  cloudWatchLogs?: CloudWatchLogsConfig;
  /** Information about logs built to an S3 bucket for a build project. S3 logs are not enabled by default. */
  s3Logs?: S3LogsConfig;
}

export interface RegistryCredential {
  /** The Amazon Resource Name (ARN) or name of credentials created using Secrets Manager. The credential can use the name of the credentials only if they exist in your current Amazon Web Services Region. */
  credential: string;
  /** The service that created the credentials to access a private Docker registry. The valid value, SECRETS_MANAGER, is for Secrets Manager. */
  credentialProvider: 'SECRETS_MANAGER';
}

export interface ProjectFleet {
  /** Specifies the compute fleet ARN for the build project. */
  fleetArn?: string;
}

export interface StartBuildInput {
  /** The name of the CodeBuild build project to start running a build. */
  projectName: string;
  /** Build output artifact settings that override, for this build only, the latest ones already defined in the build project. */
  artifactsOverride?: ProjectArtifacts;
  /** The maximum number of additional automatic retries after a failed build. For example, if the auto-retry limit is set to 2, CodeBuild will call the RetryBuild API to automatically retry your build for  */
  autoRetryLimitOverride?: number;
  /** A buildspec file declaration that overrides the latest one defined in the build project, for this build only. The buildspec defined on the project is not changed. If this value is set, it can be eithe */
  buildspecOverride?: string;
  /** Contains information that defines how the build project reports the build status to the source provider. This option is only used when the source provider is GITHUB, GITHUB_ENTERPRISE, or BITBUCKET. */
  buildStatusConfigOverride?: BuildStatusConfig;
  /** A ProjectCache object specified for this build that overrides the one defined in the build project. */
  cacheOverride?: ProjectCache;
  /** The name of a certificate for this build that overrides the one specified in the build project. */
  certificateOverride?: string;
  /** The name of a compute type for this build that overrides the one specified in the build project. */
  computeTypeOverride?: 'BUILD_GENERAL1_SMALL' | 'BUILD_GENERAL1_MEDIUM' | 'BUILD_GENERAL1_LARGE' | 'BUILD_GENERAL1_XLARGE' | 'BUILD_GENERAL1_2XLARGE' | 'BUILD_LAMBDA_1GB' | 'BUILD_LAMBDA_2GB' | 'BUILD_LAMBDA_4GB' | 'BUILD_LAMBDA_8GB' | 'BUILD_LAMBDA_10GB' | 'ATTRIBUTE_BASED_COMPUTE' | 'CUSTOM_INSTANCE_TYPE';
  /** Specifies if session debugging is enabled for this build. For more information, see Viewing a running build in Session Manager. */
  debugSessionEnabled?: boolean;
  /** The Key Management Service customer master key (CMK) that overrides the one specified in the build project. The CMK key encrypts the build output artifacts. You can use a cross-account KMS key to encr */
  encryptionKeyOverride?: string;
  /** A container type for this build that overrides the one specified in the build project. */
  environmentTypeOverride?: 'WINDOWS_CONTAINER' | 'LINUX_CONTAINER' | 'LINUX_GPU_CONTAINER' | 'ARM_CONTAINER' | 'WINDOWS_SERVER_2019_CONTAINER' | 'WINDOWS_SERVER_2022_CONTAINER' | 'LINUX_LAMBDA_CONTAINER' | 'ARM_LAMBDA_CONTAINER' | 'LINUX_EC2' | 'ARM_EC2' | 'WINDOWS_EC2' | 'MAC_ARM';
  /** A set of environment variables that overrides, for this build only, the latest ones already defined in the build project. */
  environmentVariablesOverride?: EnvironmentVariable[];
  /** A ProjectFleet object specified for this build that overrides the one defined in the build project. */
  fleetOverride?: ProjectFleet;
  /** The user-defined depth of history, with a minimum value of 0, that overrides, for this build only, any previous depth of history defined in the build project. */
  gitCloneDepthOverride?: number;
  /** Information about the Git submodules configuration for this build of an CodeBuild build project. */
  gitSubmodulesConfigOverride?: GitSubmodulesConfig;
  /** A unique, case sensitive identifier you provide to ensure the idempotency of the StartBuild request. The token is included in the StartBuild request and is valid for 5 minutes. If you repeat the Start */
  idempotencyToken?: string;
  /** The name of an image for this build that overrides the one specified in the build project. */
  imageOverride?: string;
  /** The type of credentials CodeBuild uses to pull images in your build. There are two valid values: CODEBUILD Specifies that CodeBuild uses its own credentials. This requires that you modify your ECR rep */
  imagePullCredentialsTypeOverride?: 'CODEBUILD' | 'SERVICE_ROLE';
  /** Enable this flag to override the insecure SSL setting that is specified in the build project. The insecure SSL setting determines whether to ignore SSL warnings while connecting to the project source  */
  insecureSslOverride?: boolean;
  /** Log settings for this build that override the log settings defined in the build project. */
  logsConfigOverride?: LogsConfig;
  /** Enable this flag to override privileged mode in the build project. */
  privilegedModeOverride?: boolean;
  /** The number of minutes a build is allowed to be queued before it times out. */
  queuedTimeoutInMinutesOverride?: number;
  /** The credentials for access to a private registry. */
  registryCredentialOverride?: RegistryCredential;
  /** Set to true to report to your source provider the status of a build's start and completion. If you use this option with a source provider other than GitHub, GitHub Enterprise, GitLab, GitLab Self Mana */
  reportBuildStatusOverride?: boolean;
  /** An array of ProjectArtifacts objects. */
  secondaryArtifactsOverride?: ProjectArtifacts[];
  /** An array of ProjectSource objects. */
  secondarySourcesOverride?: ProjectSource[];
  /** An array of ProjectSourceVersion objects that specify one or more versions of the project's secondary sources to be used for this build only. */
  secondarySourcesVersionOverride?: ProjectSourceVersion[];
  /** The name of a service role for this build that overrides the one specified in the build project. */
  serviceRoleOverride?: string;
  /** An authorization type for this build that overrides the one defined in the build project. This override applies only if the build project's source is BitBucket, GitHub, GitLab, or GitLab Self Managed. */
  sourceAuthOverride?: SourceAuth;
  /** A location that overrides, for this build, the source location for the one defined in the build project. */
  sourceLocationOverride?: string;
  /** A source input type, for this build, that overrides the source input defined in the build project. */
  sourceTypeOverride?: 'CODECOMMIT' | 'CODEPIPELINE' | 'GITHUB' | 'GITLAB' | 'GITLAB_SELF_MANAGED' | 'S3' | 'BITBUCKET' | 'GITHUB_ENTERPRISE' | 'NO_SOURCE';
  /** The version of the build input to be built, for this build only. If not specified, the latest version is used. If specified, the contents depends on the source provider: CodeCommit The commit ID, bran */
  sourceVersion?: string;
  /** The number of build timeout minutes, from 5 to 2160 (36 hours), that overrides, for this build only, the latest setting already defined in the build project. */
  timeoutInMinutesOverride?: number;
}

export interface StartBuildAsyncInput {
  /** The name of the CodeBuild build project to start running a build. */
  projectName: string;
  /** Build output artifact settings that override, for this build only, the latest ones already defined in the build project. */
  artifactsOverride?: ProjectArtifacts;
  /** The maximum number of additional automatic retries after a failed build. For example, if the auto-retry limit is set to 2, CodeBuild will call the RetryBuild API to automatically retry your build for  */
  autoRetryLimitOverride?: number;
  /** A buildspec file declaration that overrides the latest one defined in the build project, for this build only. The buildspec defined on the project is not changed. If this value is set, it can be eithe */
  buildspecOverride?: string;
  /** Contains information that defines how the build project reports the build status to the source provider. This option is only used when the source provider is GITHUB, GITHUB_ENTERPRISE, or BITBUCKET. */
  buildStatusConfigOverride?: BuildStatusConfig;
  /** A ProjectCache object specified for this build that overrides the one defined in the build project. */
  cacheOverride?: ProjectCache;
  /** The name of a certificate for this build that overrides the one specified in the build project. */
  certificateOverride?: string;
  /** The name of a compute type for this build that overrides the one specified in the build project. */
  computeTypeOverride?: 'BUILD_GENERAL1_SMALL' | 'BUILD_GENERAL1_MEDIUM' | 'BUILD_GENERAL1_LARGE' | 'BUILD_GENERAL1_XLARGE' | 'BUILD_GENERAL1_2XLARGE' | 'BUILD_LAMBDA_1GB' | 'BUILD_LAMBDA_2GB' | 'BUILD_LAMBDA_4GB' | 'BUILD_LAMBDA_8GB' | 'BUILD_LAMBDA_10GB' | 'ATTRIBUTE_BASED_COMPUTE' | 'CUSTOM_INSTANCE_TYPE';
  /** Specifies if session debugging is enabled for this build. For more information, see Viewing a running build in Session Manager. */
  debugSessionEnabled?: boolean;
  /** The Key Management Service customer master key (CMK) that overrides the one specified in the build project. The CMK key encrypts the build output artifacts. You can use a cross-account KMS key to encr */
  encryptionKeyOverride?: string;
  /** A container type for this build that overrides the one specified in the build project. */
  environmentTypeOverride?: 'WINDOWS_CONTAINER' | 'LINUX_CONTAINER' | 'LINUX_GPU_CONTAINER' | 'ARM_CONTAINER' | 'WINDOWS_SERVER_2019_CONTAINER' | 'WINDOWS_SERVER_2022_CONTAINER' | 'LINUX_LAMBDA_CONTAINER' | 'ARM_LAMBDA_CONTAINER' | 'LINUX_EC2' | 'ARM_EC2' | 'WINDOWS_EC2' | 'MAC_ARM';
  /** A set of environment variables that overrides, for this build only, the latest ones already defined in the build project. */
  environmentVariablesOverride?: EnvironmentVariable[];
  /** A ProjectFleet object specified for this build that overrides the one defined in the build project. */
  fleetOverride?: ProjectFleet;
  /** The user-defined depth of history, with a minimum value of 0, that overrides, for this build only, any previous depth of history defined in the build project. */
  gitCloneDepthOverride?: number;
  /** Information about the Git submodules configuration for this build of an CodeBuild build project. */
  gitSubmodulesConfigOverride?: GitSubmodulesConfig;
  /** A unique, case sensitive identifier you provide to ensure the idempotency of the StartBuild request. The token is included in the StartBuild request and is valid for 5 minutes. If you repeat the Start */
  idempotencyToken?: string;
  /** The name of an image for this build that overrides the one specified in the build project. */
  imageOverride?: string;
  /** The type of credentials CodeBuild uses to pull images in your build. There are two valid values: CODEBUILD Specifies that CodeBuild uses its own credentials. This requires that you modify your ECR rep */
  imagePullCredentialsTypeOverride?: 'CODEBUILD' | 'SERVICE_ROLE';
  /** Enable this flag to override the insecure SSL setting that is specified in the build project. The insecure SSL setting determines whether to ignore SSL warnings while connecting to the project source  */
  insecureSslOverride?: boolean;
  /** Log settings for this build that override the log settings defined in the build project. */
  logsConfigOverride?: LogsConfig;
  /** Enable this flag to override privileged mode in the build project. */
  privilegedModeOverride?: boolean;
  /** The number of minutes a build is allowed to be queued before it times out. */
  queuedTimeoutInMinutesOverride?: number;
  /** The credentials for access to a private registry. */
  registryCredentialOverride?: RegistryCredential;
  /** Set to true to report to your source provider the status of a build's start and completion. If you use this option with a source provider other than GitHub, GitHub Enterprise, GitLab, GitLab Self Mana */
  reportBuildStatusOverride?: boolean;
  /** An array of ProjectArtifacts objects. */
  secondaryArtifactsOverride?: ProjectArtifacts[];
  /** An array of ProjectSource objects. */
  secondarySourcesOverride?: ProjectSource[];
  /** An array of ProjectSourceVersion objects that specify one or more versions of the project's secondary sources to be used for this build only. */
  secondarySourcesVersionOverride?: ProjectSourceVersion[];
  /** The name of a service role for this build that overrides the one specified in the build project. */
  serviceRoleOverride?: string;
  /** An authorization type for this build that overrides the one defined in the build project. This override applies only if the build project's source is BitBucket, GitHub, GitLab, or GitLab Self Managed. */
  sourceAuthOverride?: SourceAuth;
  /** A location that overrides, for this build, the source location for the one defined in the build project. */
  sourceLocationOverride?: string;
  /** A source input type, for this build, that overrides the source input defined in the build project. */
  sourceTypeOverride?: 'CODECOMMIT' | 'CODEPIPELINE' | 'GITHUB' | 'GITLAB' | 'GITLAB_SELF_MANAGED' | 'S3' | 'BITBUCKET' | 'GITHUB_ENTERPRISE' | 'NO_SOURCE';
  /** The version of the build input to be built, for this build only. If not specified, the latest version is used. If specified, the contents depends on the source provider: CodeCommit The commit ID, bran */
  sourceVersion?: string;
  /** The number of build timeout minutes, from 5 to 2160 (36 hours), that overrides, for this build only, the latest setting already defined in the build project. */
  timeoutInMinutesOverride?: number;
}

/** AWS CodeBuild project binding for the SimpleSteps compiler. */
export class CodeBuild {
  constructor(projectName: string) {}

  startBuild<T>(params: StartBuildInput, options?: CodeBuildOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startBuildAsync(params: StartBuildAsyncInput, options?: CodeBuildOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }
}
