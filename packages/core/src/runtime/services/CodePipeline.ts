// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface ActionTypeSettings {
  /** The URL of a sign-up page where users can sign up for an external service and perform initial configuration of the action provided by that service. */
  thirdPartyConfigurationUrl?: string;
  /** The URL returned to the CodePipeline console that provides a deep link to the resources of the external system, such as the configuration page for a CodeDeploy deployment group. This link is provided  */
  entityUrlTemplate?: string;
  /** The URL returned to the CodePipeline console that contains a link to the top-level landing page for the external system, such as the console page for CodeDeploy. This link is shown on the pipeline vie */
  executionUrlTemplate?: string;
  /** The URL returned to the CodePipeline console that contains a link to the page where customers can update or change the configuration of the external action. */
  revisionUrlTemplate?: string;
}

export interface ActionConfigurationProperty {
  /** The name of the action configuration property. */
  name: string;
  /** Whether the configuration property is a required value. */
  required: boolean;
  /** Whether the configuration property is a key. */
  key: boolean;
  /** Whether the configuration property is secret. Secrets are hidden from all calls except for GetJobDetails, GetThirdPartyJobDetails, PollForJobs, and PollForThirdPartyJobs. When updating a pipeline, pas */
  secret: boolean;
  /** Indicates that the property is used with PollForJobs. When creating a custom action, an action can have up to one queryable property. If it has one, that property must be both required and not secret. */
  queryable?: boolean;
  /** The description of the action configuration property that is displayed to users. */
  description?: string;
  /** The type of the configuration property. */
  type?: 'String' | 'Number' | 'Boolean';
}

export interface ArtifactDetails {
  /** The minimum number of artifacts allowed for the action type. */
  minimumCount: number;
  /** The maximum number of artifacts allowed for the action type. */
  maximumCount: number;
}

export interface Tag {
  /** The tag's key. */
  key: string;
  /** The tag's value. */
  value: string;
}

export interface ArtifactStore {
  /** The type of the artifact store, such as S3. */
  type: 'S3';
  /** The S3 bucket used for storing the artifacts for a pipeline. You can specify the name of an S3 bucket but not a folder in the bucket. A folder to contain the pipeline artifacts is created for you base */
  location: string;
  /** The encryption key used to encrypt the data in the artifact store, such as an Amazon Web Services Key Management Service key. If this is undefined, the default key for Amazon S3 is used. */
  encryptionKey?: any;
}

export interface PipelineDeclaration {
  /** The name of the pipeline. */
  name: string;
  /** The Amazon Resource Name (ARN) for CodePipeline to use to either perform actions with no actionRoleArn, or to use to assume roles for actions with an actionRoleArn. */
  roleArn: string;
  /** Represents information about the S3 bucket where artifacts are stored for the pipeline. You must include either artifactStore or artifactStores in your pipeline, but you cannot use both. If you create */
  artifactStore?: ArtifactStore;
  /** A mapping of artifactStore objects and their corresponding Amazon Web Services Regions. There must be an artifact store for the pipeline Region and for each cross-region action in the pipeline. You mu */
  artifactStores?: Record<string, any>;
  /** The stage in which to perform the action. */
  stages: any[];
  /** The version number of the pipeline. A new pipeline always has a version number of 1. This number is incremented when a pipeline is updated. */
  version?: number;
  /** The method that the pipeline will use to handle multiple executions. The default mode is SUPERSEDED. */
  executionMode?: 'QUEUED' | 'SUPERSEDED' | 'PARALLEL';
  /** CodePipeline provides the following pipeline types, which differ in characteristics and price, so that you can tailor your pipeline features and cost to the needs of your applications. V1 type pipelin */
  pipelineType?: 'V1' | 'V2';
  /** A list that defines the pipeline variables for a pipeline resource. Variable names can have alphanumeric and underscore characters, and the values must match [A-Za-z0-9@\-_]+. */
  variables?: any[];
  /** The trigger configuration specifying a type of event, such as Git tags, that starts the pipeline. When a trigger configuration is specified, default change detection for repository and branch commits  */
  triggers?: any[];
}

export interface LatestInPipelineExecutionFilter {
  /** The execution ID for the latest execution in the pipeline. */
  pipelineExecutionId: string;
  /** The start time to filter on for the latest execution in the pipeline. Valid options: All Latest */
  startTimeRange: 'Latest' | 'All';
}

export interface ActionExecutionFilter {
  /** The pipeline execution ID used to filter action execution history. */
  pipelineExecutionId?: string;
  /** The latest execution in the pipeline. Filtering on the latest execution is available for executions run on or after February 08, 2024. */
  latestInPipelineExecution?: LatestInPipelineExecutionFilter;
}

export interface TargetFilter {
  /** The name on which to filter. */
  name?: 'TARGET_STATUS';
  /** The values on which to filter. */
  values?: any[];
}

export interface SucceededInStageFilter {
  /** The name of the stage for filtering for pipeline executions where the stage was successful in the current pipeline version. */
  stageName?: string;
}

export interface PipelineExecutionFilter {
  /** Filter for pipeline executions where the stage was successful in the current pipeline version. */
  succeededInStage?: SucceededInStageFilter;
}

export interface RuleExecutionFilter {
  /** The pipeline execution ID used to filter rule execution history. */
  pipelineExecutionId?: string;
  latestInPipelineExecution?: LatestInPipelineExecutionFilter;
}

export interface ActionTypeId {
  /** A category defines what kind of action can be taken in the stage, and constrains the provider type for the action. Valid categories are limited to one of the following values. Source Build Test Deploy */
  category: 'Source' | 'Build' | 'Deploy' | 'Test' | 'Invoke' | 'Approval' | 'Compute';
  /** The creator of the action being called. There are three valid values for the Owner field in the action category section within your pipeline structure: AWS, ThirdParty, and Custom. For more informatio */
  owner: 'AWS' | 'ThirdParty' | 'Custom';
  /** The provider of the service being called by the action. Valid providers are determined by the action category. For example, an action in the Deploy category type might have a provider of CodeDeploy, w */
  provider: string;
  /** A string that describes the action version. */
  version: string;
}

export interface ActionRevision {
  /** The system-generated unique ID that identifies the revision number of the action. */
  revisionId: string;
  /** The unique identifier of the change that set the state to this revision (for example, a deployment ID or timestamp). */
  revisionChangeId: string;
  /** The date and time when the most recent version of the action was created, in timestamp format. */
  created: string;
}

export interface ApprovalResult {
  /** The summary of the current status of the approval request. */
  summary: string;
  /** The response submitted by a reviewer assigned to an approval action request. */
  status: 'Approved' | 'Rejected';
}

export interface FailureDetails {
  /** The type of the failure. */
  type: 'JobFailed' | 'ConfigurationError' | 'PermissionError' | 'RevisionOutOfSync' | 'RevisionUnavailable' | 'SystemUnavailable';
  /** The message about the failure. */
  message: string;
  /** The external ID of the run of the action that failed. */
  externalExecutionId?: string;
}

export interface CurrentRevision {
  /** The revision ID of the current version of an artifact. */
  revision: string;
  /** The change identifier for the current revision. */
  changeIdentifier: string;
  /** The date and time when the most recent revision of the artifact was created, in timestamp format. */
  created?: string;
  /** The summary of the most recent revision of the artifact. */
  revisionSummary?: string;
}

export interface ExecutionDetails {
  /** The summary of the current status of the actions. */
  summary?: string;
  /** The system-generated unique ID of this action used to identify this job worker in any external systems, such as CodeDeploy. */
  externalExecutionId?: string;
  /** The percentage of work completed on the action, represented on a scale of 0 to 100 percent. */
  percentComplete?: number;
}

export interface WebhookAuthConfiguration {
  /** The property used to configure acceptance of webhooks in an IP address range. For IP, only the AllowedIPRange property must be set. This property must be set to a valid CIDR range. */
  AllowedIPRange?: string;
  /** The property used to configure GitHub authentication. For GITHUB_HMAC, only the SecretToken property must be set. When creating CodePipeline webhooks, do not use your own credentials or reuse the same */
  SecretToken?: string;
}

export interface WebhookDefinition {
  /** The name of the webhook. */
  name: string;
  /** The name of the pipeline you want to connect to the webhook. */
  targetPipeline: string;
  /** The name of the action in a pipeline you want to connect to the webhook. The action must be from the source (first) stage of the pipeline. */
  targetAction: string;
  /** A list of rules applied to the body/payload sent in the POST request to a webhook URL. All defined rules must pass for the request to be accepted and the pipeline started. */
  filters: any[];
  /** Supported options are GITHUB_HMAC, IP, and UNAUTHENTICATED. When creating CodePipeline webhooks, do not use your own credentials or reuse the same secret token across multiple webhooks. For optimal se */
  authentication: 'GITHUB_HMAC' | 'IP' | 'UNAUTHENTICATED';
  /** Properties that configure the authentication applied to incoming webhook trigger requests. The required properties depend on the authentication type. For GITHUB_HMAC, only the SecretToken property mus */
  authenticationConfiguration: WebhookAuthConfiguration;
}

export interface PipelineVariable {
  /** The name of a pipeline-level variable. */
  name: string;
  /** The value of a pipeline-level variable. */
  value: string;
}

export interface SourceRevisionOverride {
  /** The name of the action where the override will be applied. */
  actionName: string;
  /** The type of source revision, based on the source provider. For example, the revision type for the CodeCommit action provider is the commit ID. */
  revisionType: 'COMMIT_ID' | 'IMAGE_DIGEST' | 'S3_OBJECT_VERSION_ID' | 'S3_OBJECT_KEY';
  /** The source revision, or version of your source artifact, with the changes that you want to run in the pipeline execution. */
  revisionValue: string;
}

export interface ActionTypeExecutor {
  /** The action configuration properties for the action type. These properties are specified in the action definition when the action type is created. */
  configuration: any;
  /** The integration model used to create and update the action type, Lambda or JobWorker. */
  type: 'JobWorker' | 'Lambda';
  /** The policy statement that specifies the permissions in the CodePipeline customer account that are needed to successfully run an action. To grant permission to another account, specify the account ID a */
  policyStatementsTemplate?: string;
  /** The timeout in seconds for the job. An action execution can have multiple jobs. This is the timeout for a single job, not the entire action execution. */
  jobTimeout?: number;
}

export interface ActionTypeIdentifier {
  /** Defines what kind of action can be taken in the stage, one of the following: Source Build Test Deploy Approval Invoke */
  category: 'Source' | 'Build' | 'Deploy' | 'Test' | 'Invoke' | 'Approval' | 'Compute';
  /** The creator of the action type being called: AWS or ThirdParty. */
  owner: string;
  /** The provider of the action type being called. The provider name is supplied when the action type is created. */
  provider: string;
  /** A string that describes the action type version. */
  version: string;
}

export interface ActionTypeArtifactDetails {
  /** The minimum number of artifacts that can be used with the action type. For example, you should specify a minimum and maximum of zero input artifacts for an action type with a category of source. */
  minimumCount: number;
  /** The maximum number of artifacts that can be used with the actiontype. For example, you should specify a minimum and maximum of zero input artifacts for an action type with a category of source. */
  maximumCount: number;
}

export interface ActionTypePermissions {
  /** A list of Amazon Web Services account IDs with access to use the action type in their pipelines. */
  allowedAccounts: any[];
}

export interface ActionTypeUrls {
  /** The URL returned to the CodePipeline console that contains a link to the page where customers can configure the external action. */
  configurationUrl?: string;
  /** The URL returned to the CodePipeline console that provides a deep link to the resources of the external system, such as a status page. This link is provided as part of the action display in the pipeli */
  entityUrlTemplate?: string;
  /** The link to an execution page for the action type in progress. For example, for a CodeDeploy action, this link is shown on the pipeline view page in the CodePipeline console, and it links to a CodeDep */
  executionUrlTemplate?: string;
  /** The URL returned to the CodePipeline console that contains a link to the page where customers can update or change the configuration of the external action. */
  revisionUrlTemplate?: string;
}

export interface ActionTypeDeclaration {
  /** The description for the action type to be updated. */
  description?: string;
  /** Information about the executor for an action type that was created with any supported integration model. */
  executor: ActionTypeExecutor;
  /** The action category, owner, provider, and version of the action type to be updated. */
  id: ActionTypeIdentifier;
  /** Details for the artifacts, such as application files, to be worked on by the action. For example, the minimum and maximum number of input artifacts allowed. */
  inputArtifactDetails: ActionTypeArtifactDetails;
  /** Details for the output artifacts, such as a built application, that are the result of the action. For example, the minimum and maximum number of output artifacts allowed. */
  outputArtifactDetails: ActionTypeArtifactDetails;
  /** Details identifying the accounts with permissions to use the action type. */
  permissions?: ActionTypePermissions;
  /** The properties of the action type to be updated. */
  properties?: any[];
  /** The links associated with the action type to be updated. */
  urls?: ActionTypeUrls;
}

/** Represents the input of an AcknowledgeJob action. */
export interface AcknowledgeJobInput {
  /** The unique system-generated ID of the job for which you want to confirm receipt. */
  jobId: string;
  /** A system-generated random number that CodePipeline uses to ensure that the job is being worked on by only one job worker. Get this number from the response of the PollForJobs request that returned thi */
  nonce: string;
}

/** Represents the input of an AcknowledgeThirdPartyJob action. */
export interface AcknowledgeThirdPartyJobInput {
  /** The clientToken portion of the clientId and clientToken pair used to verify that the calling entity is allowed access to the job and its details. */
  clientToken: string;
  /** The unique system-generated ID of the job. */
  jobId: string;
  /** A system-generated random number that CodePipeline uses to ensure that the job is being worked on by only one job worker. Get this number from the response to a GetThirdPartyJobDetails request. */
  nonce: string;
}

/** Represents the input of a CreateCustomActionType operation. */
export interface CreateCustomActionTypeInput {
  /** The category of the custom action, such as a build action or a test action. */
  category: 'Source' | 'Build' | 'Deploy' | 'Test' | 'Invoke' | 'Approval' | 'Compute';
  /** The details of the input artifact for the action, such as its commit ID. */
  inputArtifactDetails: ArtifactDetails;
  /** The details of the output artifact of the action, such as its commit ID. */
  outputArtifactDetails: ArtifactDetails;
  /** The provider of the service used in the custom action, such as CodeDeploy. */
  provider: string;
  /** The version identifier of the custom action. */
  version: string;
  /** The configuration properties for the custom action. You can refer to a name in the configuration properties of the custom action within the URL templates by following the format of {Config:name}, as l */
  configurationProperties?: ActionConfigurationProperty[];
  /** URLs that provide users information about this custom action. */
  settings?: ActionTypeSettings;
  /** The tags for the custom action. */
  tags?: Tag[];
}

/** Represents the input of a CreatePipeline action. */
export interface CreatePipelineInput {
  /** Represents the structure of actions and stages to be performed in the pipeline. */
  pipeline: PipelineDeclaration;
  /** The tags for the pipeline. */
  tags?: Tag[];
}

/** Represents the input of a DeleteCustomActionType operation. The custom action will be marked as deleted. */
export interface DeleteCustomActionTypeInput {
  /** The category of the custom action that you want to delete, such as source or deploy. */
  category: 'Source' | 'Build' | 'Deploy' | 'Test' | 'Invoke' | 'Approval' | 'Compute';
  /** The provider of the service used in the custom action, such as CodeDeploy. */
  provider: string;
  /** The version of the custom action to delete. */
  version: string;
}

/** Represents the input of a DeletePipeline action. */
export interface DeletePipelineInput {
  /** The name of the pipeline to be deleted. */
  name: string;
}

export interface DeleteWebhookInput {
  /** The name of the webhook you want to delete. */
  name: string;
}

export interface DeregisterWebhookWithThirdPartyInput {
  /** The name of the webhook you want to deregister. */
  webhookName?: string;
}

/** Represents the input of a DisableStageTransition action. */
export interface DisableStageTransitionInput {
  /** The name of the pipeline in which you want to disable the flow of artifacts from one stage to another. */
  pipelineName: string;
  /** The reason given to the user that a stage is disabled, such as waiting for manual approval or manual tests. This message is displayed in the pipeline console UI. */
  reason: string;
  /** The name of the stage where you want to disable the inbound or outbound transition of artifacts. */
  stageName: string;
  /** Specifies whether artifacts are prevented from transitioning into the stage and being processed by the actions in that stage (inbound), or prevented from transitioning from the stage after they have b */
  transitionType: 'Inbound' | 'Outbound';
}

/** Represents the input of an EnableStageTransition action. */
export interface EnableStageTransitionInput {
  /** The name of the pipeline in which you want to enable the flow of artifacts from one stage to another. */
  pipelineName: string;
  /** The name of the stage where you want to enable the transition of artifacts, either into the stage (inbound) or from that stage to the next stage (outbound). */
  stageName: string;
  /** Specifies whether artifacts are allowed to enter the stage and be processed by the actions in that stage (inbound) or whether already processed artifacts are allowed to transition to the next stage (o */
  transitionType: 'Inbound' | 'Outbound';
}

export interface GetActionTypeInput {
  /** Defines what kind of action can be taken in the stage. The following are the valid values: Source Build Test Deploy Approval Invoke Compute */
  category: 'Source' | 'Build' | 'Deploy' | 'Test' | 'Invoke' | 'Approval' | 'Compute';
  /** The creator of an action type that was created with any supported integration model. There are two valid values: AWS and ThirdParty. */
  owner: string;
  /** The provider of the action type being called. The provider name is specified when the action type is created. */
  provider: string;
  /** A string that describes the action type version. */
  version: string;
}

/** Represents the input of a GetJobDetails action. */
export interface GetJobDetailsInput {
  /** The unique system-generated ID for the job. */
  jobId: string;
}

/** Represents the input of a GetPipeline action. */
export interface GetPipelineInput {
  /** The name of the pipeline for which you want to get information. Pipeline names must be unique in an Amazon Web Services account. */
  name: string;
  /** The version number of the pipeline. If you do not specify a version, defaults to the current version. */
  version?: number;
}

/** Represents the input of a GetPipelineExecution action. */
export interface GetPipelineExecutionInput {
  /** The ID of the pipeline execution about which you want to get execution details. */
  pipelineExecutionId: string;
  /** The name of the pipeline about which you want to get execution details. */
  pipelineName: string;
}

/** Represents the input of a GetPipelineState action. */
export interface GetPipelineStateInput {
  /** The name of the pipeline about which you want to get information. */
  name: string;
}

/** Represents the input of a GetThirdPartyJobDetails action. */
export interface GetThirdPartyJobDetailsInput {
  /** The clientToken portion of the clientId and clientToken pair used to verify that the calling entity is allowed access to the job and its details. */
  clientToken: string;
  /** The unique system-generated ID used for identifying the job. */
  jobId: string;
}

export interface ListActionExecutionsInput {
  /** The name of the pipeline for which you want to list action execution history. */
  pipelineName: string;
  /** Input information used to filter action execution history. */
  filter?: ActionExecutionFilter;
  /** The maximum number of results to return in a single call. To retrieve the remaining results, make another call with the returned nextToken value. Action execution history is retained for up to 12 mont */
  maxResults?: number;
  /** The token that was returned from the previous ListActionExecutions call, which can be used to return the next set of action executions in the list. */
  nextToken?: string;
}

/** Represents the input of a ListActionTypes action. */
export interface ListActionTypesInput {
  /** Filters the list of action types to those created by a specified entity. */
  actionOwnerFilter?: 'AWS' | 'ThirdParty' | 'Custom';
  /** An identifier that was returned from the previous list action types call, which can be used to return the next set of action types in the list. */
  nextToken?: string;
  /** The Region to filter on for the list of action types. */
  regionFilter?: string;
}

export interface ListDeployActionExecutionTargetsInput {
  /** The execution ID for the deploy action. */
  actionExecutionId: string;
  /** Filters the targets for a specified deploy action. */
  filters?: TargetFilter[];
  /** The maximum number of results to return in a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  maxResults?: number;
  /** An identifier that was returned from the previous list action types call, which can be used to return the next set of action types in the list. */
  nextToken?: string;
  /** The name of the pipeline with the deploy action. */
  pipelineName?: string;
}

/** Represents the input of a ListPipelineExecutions action. */
export interface ListPipelineExecutionsInput {
  /** The name of the pipeline for which you want to get execution summary information. */
  pipelineName: string;
  /** The pipeline execution to filter on. */
  filter?: PipelineExecutionFilter;
  /** The maximum number of results to return in a single call. To retrieve the remaining results, make another call with the returned nextToken value. Pipeline history is limited to the most recent 12 mont */
  maxResults?: number;
  /** The token that was returned from the previous ListPipelineExecutions call, which can be used to return the next set of pipeline executions in the list. */
  nextToken?: string;
}

/** Represents the input of a ListPipelines action. */
export interface ListPipelinesInput {
  /** The maximum number of pipelines to return in a single call. To retrieve the remaining pipelines, make another call with the returned nextToken value. The minimum value you can specify is 1. The maximu */
  maxResults?: number;
  /** An identifier that was returned from the previous list pipelines call. It can be used to return the next set of pipelines in the list. */
  nextToken?: string;
}

export interface ListRuleExecutionsInput {
  /** The name of the pipeline for which you want to get execution summary information. */
  pipelineName: string;
  /** Input information used to filter rule execution history. */
  filter?: RuleExecutionFilter;
  /** The maximum number of results to return in a single call. To retrieve the remaining results, make another call with the returned nextToken value. Pipeline history is limited to the most recent 12 mont */
  maxResults?: number;
  /** The token that was returned from the previous ListRuleExecutions call, which can be used to return the next set of rule executions in the list. */
  nextToken?: string;
}

export interface ListRuleTypesInput {
  /** The rule Region to filter on. */
  regionFilter?: string;
  /** The rule owner to filter on. */
  ruleOwnerFilter?: 'AWS';
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) of the resource to get tags for. */
  resourceArn: string;
  /** The maximum number of results to return in a single call. */
  maxResults?: number;
  /** The token that was returned from the previous API call, which would be used to return the next page of the list. The ListTagsforResource call lists all available tags in one call and does not use pagi */
  nextToken?: string;
}

export interface ListWebhooksInput {
  /** The maximum number of results to return in a single call. To retrieve the remaining results, make another call with the returned nextToken value. */
  MaxResults?: number;
  /** The token that was returned from the previous ListWebhooks call, which can be used to return the next set of webhooks in the list. */
  NextToken?: string;
}

export interface OverrideStageConditionInput {
  /** The type of condition to override for the stage, such as entry conditions, failure conditions, or success conditions. */
  conditionType: 'BEFORE_ENTRY' | 'ON_SUCCESS';
  /** The ID of the pipeline execution for the override. */
  pipelineExecutionId: string;
  /** The name of the pipeline with the stage that will override the condition. */
  pipelineName: string;
  /** The name of the stage for the override. */
  stageName: string;
}

/** Represents the input of a PollForJobs action. */
export interface PollForJobsInput {
  /** Represents information about an action type. */
  actionTypeId: ActionTypeId;
  /** The maximum number of jobs to return in a poll for jobs call. */
  maxBatchSize?: number;
  /** A map of property names and values. For an action type with no queryable properties, this value must be null or an empty map. For an action type with a queryable property, you must supply that propert */
  queryParam?: Record<string, string>;
}

/** Represents the input of a PollForThirdPartyJobs action. */
export interface PollForThirdPartyJobsInput {
  /** Represents information about an action type. */
  actionTypeId: ActionTypeId;
  /** The maximum number of jobs to return in a poll for jobs call. */
  maxBatchSize?: number;
}

/** Represents the input of a PutActionRevision action. */
export interface PutActionRevisionInput {
  /** The name of the action that processes the revision. */
  actionName: string;
  /** Represents information about the version (or revision) of an action. */
  actionRevision: ActionRevision;
  /** The name of the pipeline that starts processing the revision to the source. */
  pipelineName: string;
  /** The name of the stage that contains the action that acts on the revision. */
  stageName: string;
}

/** Represents the input of a PutApprovalResult action. */
export interface PutApprovalResultInput {
  /** The name of the action for which approval is requested. */
  actionName: string;
  /** The name of the pipeline that contains the action. */
  pipelineName: string;
  /** Represents information about the result of the approval request. */
  result: ApprovalResult;
  /** The name of the stage that contains the action. */
  stageName: string;
  /** The system-generated token used to identify a unique approval request. The token for each open approval request can be obtained using the GetPipelineState action. It is used to validate that the appro */
  token: string;
}

/** Represents the input of a PutJobFailureResult action. */
export interface PutJobFailureResultInput {
  /** The details about the failure of a job. */
  failureDetails: FailureDetails;
  /** The unique system-generated ID of the job that failed. This is the same ID returned from PollForJobs. */
  jobId: string;
}

/** Represents the input of a PutJobSuccessResult action. */
export interface PutJobSuccessResultInput {
  /** The unique system-generated ID of the job that succeeded. This is the same ID returned from PollForJobs. */
  jobId: string;
  /** A token generated by a job worker, such as a CodeDeploy deployment ID, that a successful job provides to identify a custom action in progress. Future jobs use this token to identify the running instan */
  continuationToken?: string;
  /** The ID of the current revision of the artifact successfully worked on by the job. */
  currentRevision?: CurrentRevision;
  /** The execution details of the successful job, such as the actions taken by the job worker. */
  executionDetails?: ExecutionDetails;
  /** Key-value pairs produced as output by a job worker that can be made available to a downstream action configuration. outputVariables can be included only when there is no continuation token on the requ */
  outputVariables?: Record<string, string>;
}

/** Represents the input of a PutThirdPartyJobFailureResult action. */
export interface PutThirdPartyJobFailureResultInput {
  /** The clientToken portion of the clientId and clientToken pair used to verify that the calling entity is allowed access to the job and its details. */
  clientToken: string;
  /** Represents information about failure details. */
  failureDetails: FailureDetails;
  /** The ID of the job that failed. This is the same ID returned from PollForThirdPartyJobs. */
  jobId: string;
}

/** Represents the input of a PutThirdPartyJobSuccessResult action. */
export interface PutThirdPartyJobSuccessResultInput {
  /** The clientToken portion of the clientId and clientToken pair used to verify that the calling entity is allowed access to the job and its details. */
  clientToken: string;
  /** The ID of the job that successfully completed. This is the same ID returned from PollForThirdPartyJobs. */
  jobId: string;
  /** A token generated by a job worker, such as a CodeDeploy deployment ID, that a successful job provides to identify a partner action in progress. Future jobs use this token to identify the running insta */
  continuationToken?: string;
  /** Represents information about a current revision. */
  currentRevision?: CurrentRevision;
  /** The details of the actions taken and results produced on an artifact as it passes through stages in the pipeline. */
  executionDetails?: ExecutionDetails;
}

export interface PutWebhookInput {
  /** The detail provided in an input file to create the webhook, such as the webhook name, the pipeline name, and the action name. Give the webhook a unique name that helps you identify it. You might name  */
  webhook: WebhookDefinition;
  /** The tags for the webhook. */
  tags?: Tag[];
}

export interface RegisterWebhookWithThirdPartyInput {
  /** The name of an existing webhook created with PutWebhook to register with a supported third party. */
  webhookName?: string;
}

/** Represents the input of a RetryStageExecution action. */
export interface RetryStageExecutionInput {
  /** The ID of the pipeline execution in the failed stage to be retried. Use the GetPipelineState action to retrieve the current pipelineExecutionId of the failed stage */
  pipelineExecutionId: string;
  /** The name of the pipeline that contains the failed stage. */
  pipelineName: string;
  /** The scope of the retry attempt. */
  retryMode: 'FAILED_ACTIONS' | 'ALL_ACTIONS';
  /** The name of the failed stage to be retried. */
  stageName: string;
}

export interface RollbackStageInput {
  /** The name of the pipeline for which the stage will be rolled back. */
  pipelineName: string;
  /** The name of the stage in the pipeline to be rolled back. */
  stageName: string;
  /** The pipeline execution ID for the stage to be rolled back to. */
  targetPipelineExecutionId: string;
}

/** Represents the input of a StartPipelineExecution action. */
export interface StartPipelineExecutionInput {
  /** The name of the pipeline to start. */
  name: string;
  /** The system-generated unique ID used to identify a unique execution request. */
  clientRequestToken?: string;
  /** A list that allows you to specify, or override, the source revision for a pipeline execution that's being started. A source revision is the version with all the changes to your application code, or so */
  sourceRevisions?: SourceRevisionOverride[];
  /** A list that overrides pipeline variables for a pipeline execution that's being started. Variable names must match [A-Za-z0-9@\-_]+, and the values can be anything except an empty string. */
  variables?: PipelineVariable[];
}

export interface StopPipelineExecutionInput {
  /** The ID of the pipeline execution to be stopped in the current stage. Use the GetPipelineState action to retrieve the current pipelineExecutionId. */
  pipelineExecutionId: string;
  /** The name of the pipeline to stop. */
  pipelineName: string;
  /** Use this option to stop the pipeline execution by abandoning, rather than finishing, in-progress actions. This option can lead to failed or out-of-sequence tasks. */
  abandon?: boolean;
  /** Use this option to enter comments, such as the reason the pipeline was stopped. */
  reason?: string;
}

export interface TagResourceInput {
  /** The Amazon Resource Name (ARN) of the resource you want to add tags to. */
  resourceArn: string;
  /** The tags you want to modify or add to the resource. */
  tags: Tag[];
}

export interface UntagResourceInput {
  /** The Amazon Resource Name (ARN) of the resource to remove tags from. */
  resourceArn: string;
  /** The list of keys for the tags to be removed from the resource. */
  tagKeys: string[];
}

export interface UpdateActionTypeInput {
  /** The action type definition for the action type to be updated. */
  actionType: ActionTypeDeclaration;
}

/** Represents the input of an UpdatePipeline action. */
export interface UpdatePipelineInput {
  /** The name of the pipeline to be updated. */
  pipeline: PipelineDeclaration;
}

/** CodePipeline service binding for Step Functions SDK integrations. */
export class CodePipeline {
  constructor() {}

  acknowledgeJob<T>(params: AcknowledgeJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  acknowledgeThirdPartyJob<T>(params: AcknowledgeThirdPartyJobInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCustomActionType<T>(params: CreateCustomActionTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPipeline<T>(params: CreatePipelineInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCustomActionType<T>(params: DeleteCustomActionTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePipeline<T>(params: DeletePipelineInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteWebhook<T>(params: DeleteWebhookInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deregisterWebhookWithThirdParty<T>(params: DeregisterWebhookWithThirdPartyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableStageTransition<T>(params: DisableStageTransitionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableStageTransition<T>(params: EnableStageTransitionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getActionType<T>(params: GetActionTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getJobDetails<T>(params: GetJobDetailsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPipeline<T>(params: GetPipelineInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPipelineExecution<T>(params: GetPipelineExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPipelineState<T>(params: GetPipelineStateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getThirdPartyJobDetails<T>(params: GetThirdPartyJobDetailsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listActionExecutions<T>(params: ListActionExecutionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listActionTypes<T>(params: ListActionTypesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDeployActionExecutionTargets<T>(params: ListDeployActionExecutionTargetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPipelineExecutions<T>(params: ListPipelineExecutionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPipelines<T>(params: ListPipelinesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRuleExecutions<T>(params: ListRuleExecutionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRuleTypes<T>(params: ListRuleTypesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listWebhooks<T>(params: ListWebhooksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  overrideStageCondition<T>(params: OverrideStageConditionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  pollForJobs<T>(params: PollForJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  pollForThirdPartyJobs<T>(params: PollForThirdPartyJobsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putActionRevision<T>(params: PutActionRevisionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putApprovalResult<T>(params: PutApprovalResultInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putJobFailureResult<T>(params: PutJobFailureResultInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putJobSuccessResult<T>(params: PutJobSuccessResultInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putThirdPartyJobFailureResult<T>(params: PutThirdPartyJobFailureResultInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putThirdPartyJobSuccessResult<T>(params: PutThirdPartyJobSuccessResultInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putWebhook<T>(params: PutWebhookInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  registerWebhookWithThirdParty<T>(params: RegisterWebhookWithThirdPartyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  retryStageExecution<T>(params: RetryStageExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rollbackStage<T>(params: RollbackStageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startPipelineExecution<T>(params: StartPipelineExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopPipelineExecution<T>(params: StopPipelineExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateActionType<T>(params: UpdateActionTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePipeline<T>(params: UpdatePipelineInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
