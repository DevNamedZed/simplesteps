// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface LoggingConfig {
  /** The Amazon Resource Name (ARN) of the role that CloudFormation should assume when sending log entries to CloudWatch Logs. */
  LogRoleArn: string;
  /** The Amazon CloudWatch Logs group to which CloudFormation sends error logging information when invoking the extension's handlers. */
  LogGroupName: string;
}

export interface TypeConfigurationIdentifier {
  /** The ARN for the extension, in this account and Region. For public extensions, this will be the ARN assigned when you call the ActivateType API operation in this account and Region. For private extensi */
  TypeArn?: string;
  /** The alias specified for this configuration, if one was specified when the configuration was set. */
  TypeConfigurationAlias?: string;
  /** The ARN for the configuration, in this account and Region. */
  TypeConfigurationArn?: string;
  /** The type of extension. */
  Type?: 'RESOURCE' | 'MODULE' | 'HOOK';
  /** The name of the extension type to which this configuration applies. */
  TypeName?: string;
}

export interface Parameter {
  /** The key associated with the parameter. If you don't specify a key and value for a particular parameter, CloudFormation uses the default value that's specified in your template. */
  ParameterKey?: string;
  /** The input value associated with the parameter. */
  ParameterValue?: string;
  /** During a stack update, use the existing parameter value that the stack is using for a given parameter key. If you specify true, do not specify a parameter value. */
  UsePreviousValue?: boolean;
  /** Read-only. The value that corresponds to a Systems Manager parameter key. This field is returned only for Systems Manager parameter types in the template. For more information, see Specify existing re */
  ResolvedValue?: string;
}

export interface RollbackConfiguration {
  /** The triggers to monitor during stack creation or update actions. By default, CloudFormation saves the rollback triggers specified for a stack and applies them to any subsequent update operations for t */
  RollbackTriggers?: any[];
  /** The amount of time, in minutes, during which CloudFormation should monitor all the rollback triggers after the stack creation or update operation deploys all necessary resources. The default is 0 minu */
  MonitoringTimeInMinutes?: number;
}

export interface Tag {
  /** A string used to identify this tag. You can specify a maximum of 128 characters for a tag key. Tags owned by Amazon Web Services have the reserved prefix: aws:. */
  Key: string;
  /** A string that contains the value for this tag. You can specify a maximum of 256 characters for a tag value. */
  Value: string;
}

export interface ResourceToImport {
  /** The type of resource to import into your stack, such as AWS::S3::Bucket. For a list of supported resource types, see Resource type support for imports and drift detection in the CloudFormation User Gu */
  ResourceType: string;
  /** The logical ID of the target resource as specified in the template. */
  LogicalResourceId: string;
  /** A key-value pair that identifies the target resource. The key is an identifier property (for example, BucketName for AWS::S3::Bucket resources) and the value is the actual property value (for example, */
  ResourceIdentifier: Record<string, any>;
}

export interface ResourceDefinition {
  /** The type of the resource, such as AWS::DynamoDB::Table. For the list of supported resources, see Resource type support for imports and drift detection in the CloudFormation User Guide */
  ResourceType: string;
  /** The logical resource id for this resource in the generated template. */
  LogicalResourceId?: string;
  /** A list of up to 256 key-value pairs that identifies the scanned resource. The key is the name of one of the primary identifiers for the resource. (Primary identifiers are specified in the primaryIdent */
  ResourceIdentifier: Record<string, any>;
}

export interface TemplateConfiguration {
  /** The DeletionPolicy assigned to resources in the generated template. Supported values are: DELETE - delete all resources when the stack is deleted. RETAIN - retain all resources when the stack is delet */
  DeletionPolicy?: 'DELETE' | 'RETAIN';
  /** The UpdateReplacePolicy assigned to resources in the generated template. Supported values are: DELETE - delete all resources when the resource is replaced during an update operation. RETAIN - retain a */
  UpdateReplacePolicy?: 'DELETE' | 'RETAIN';
}

export interface DeploymentTargets {
  /** The Amazon Web Services account IDs where you want to perform stack operations. How these accounts are used depends on the AccountFilterType property. If you have many account numbers, you can provide */
  Accounts?: string[];
  /** The Amazon S3 URL path to a file that contains a list of Amazon Web Services account IDs. The file format must be either .csv or .txt, and the data can be comma-separated or new-line-separated. There  */
  AccountsUrl?: string;
  /** The organization root ID or organizational unit (OU) IDs where you want to perform stack operations. CloudFormation will perform operations on accounts within these OUs and their child OUs. */
  OrganizationalUnitIds?: string[];
  /** Refines which accounts will have stack operations performed on them by specifying how to use the Accounts and OrganizationalUnitIds properties together. The following values determine how CloudFormati */
  AccountFilterType?: 'NONE' | 'INTERSECTION' | 'DIFFERENCE' | 'UNION';
}

export interface StackSetOperationPreferences {
  /** The concurrency type of deploying StackSets operations in Regions, could be in parallel or one Region at a time. */
  RegionConcurrencyType?: 'SEQUENTIAL' | 'PARALLEL';
  /** The order of the Regions where you want to perform the stack operation. */
  RegionOrder?: string[];
  /** The number of accounts per Region this operation can fail in before CloudFormation stops the operation in that Region. If the operation is stopped in a Region, CloudFormation doesn't attempt the opera */
  FailureToleranceCount?: number;
  /** The percentage of accounts per Region this stack operation can fail in before CloudFormation stops the operation in that Region. If the operation is stopped in a Region, CloudFormation doesn't attempt */
  FailureTolerancePercentage?: number;
  /** The maximum number of accounts in which to perform this operation at one time. This can depend on the value of FailureToleranceCount depending on your ConcurrencyMode. MaxConcurrentCount is at most on */
  MaxConcurrentCount?: number;
  /** The maximum percentage of accounts in which to perform this operation at one time. When calculating the number of accounts based on the specified percentage, CloudFormation rounds down to the next who */
  MaxConcurrentPercentage?: number;
  /** Specifies how the concurrency level behaves during the operation execution. STRICT_FAILURE_TOLERANCE: This option dynamically lowers the concurrency level to ensure the number of failed accounts never */
  ConcurrencyMode?: 'STRICT_FAILURE_TOLERANCE' | 'SOFT_FAILURE_TOLERANCE';
}

export interface ResourceMapping {
  /** The source stack StackName and LogicalResourceId for the resource being refactored. */
  Source: any;
  /** The destination stack StackName and LogicalResourceId for the resource being refactored. */
  Destination: any;
}

export interface StackDefinition {
  /** The name associated with the stack. */
  StackName?: string;
  /** The file path for the stack template file. */
  TemplateBody?: string;
  /** The desired final state of the stack template. */
  TemplateURL?: string;
}

export interface AutoDeployment {
  /** If set to true, StackSets automatically deploys additional stack instances to Organizations accounts that are added to a target organization or organizational unit (OU) in the specified Regions. If an */
  Enabled?: boolean;
  /** If set to true, stack resources are retained when an account is removed from a target organization or OU. If set to false, stack resources are deleted. Specify only if Enabled is set to True. */
  RetainStacksOnAccountRemoval?: boolean;
  /** A list of StackSet ARNs that this StackSet depends on for auto-deployment operations. When auto-deployment is triggered, operations will be sequenced to ensure all dependencies complete successfully b */
  DependsOn?: string[];
}

export interface ManagedExecution {
  /** When true, CloudFormation performs non-conflicting operations concurrently and queues conflicting operations. After conflicting operations finish, CloudFormation starts queued operations in request or */
  Active?: boolean;
}

export interface EventFilter {
  /** When set to true, only returns failed events within the operation. This helps quickly identify root causes for a failed operation. */
  FailedEvents?: boolean;
}

export interface TemplateSummaryConfig {
  /** If set to True, any unrecognized resource types generate warnings and not an error. Any unrecognized resource types are returned in the Warnings output parameter. */
  TreatUnrecognizedResourceTypesAsWarnings?: boolean;
}

export interface ScannedResourceIdentifier {
  /** The type of the resource, such as AWS::DynamoDB::Table. For the list of supported resources, see Resource type support for imports and drift detection In the CloudFormation User Guide. */
  ResourceType: string;
  /** A list of up to 256 key-value pairs that identifies the scanned resource. The key is the name of one of the primary identifiers for the resource. (Primary identifiers are specified in the primaryIdent */
  ResourceIdentifier: Record<string, any>;
}

export interface StackInstanceFilter {
  /** The type of filter to apply. */
  Name?: 'DETAILED_STATUS' | 'LAST_OPERATION_ID' | 'DRIFT_STATUS';
  /** The status to filter by. */
  Values?: string;
}

export interface OperationResultFilter {
  /** The type of filter to apply. */
  Name?: 'OPERATION_RESULT_STATUS';
  /** The value to filter by. */
  Values?: string;
}

export interface TypeFilters {
  /** The category of extensions to return. REGISTERED: Private extensions that have been registered for this account and Region. ACTIVATED: Public extensions that have been activated for this account and R */
  Category?: 'REGISTERED' | 'ACTIVATED' | 'THIRD_PARTY' | 'AWS_TYPES';
  /** The id of the publisher of the extension. Extensions published by Amazon aren't assigned a publisher ID. Use the AWS_TYPES category to specify a list of types published by Amazon. */
  PublisherId?: string;
  /** A prefix to use as a filter for results. */
  TypeNamePrefix?: string;
}

export interface ScanFilter {
  /** An array of strings where each string represents an Amazon Web Services resource type you want to scan. Each string defines the resource type using the format AWS::ServiceName::ResourceType, for examp */
  Types?: any[];
}

export interface ActivateTypeInput {
  /** Whether to automatically update the extension in this account and Region when a new minor version is published by the extension publisher. Major versions released by the publisher must be manually upd */
  AutoUpdate?: boolean;
  /** The name of the IAM execution role to use to activate the extension. */
  ExecutionRoleArn?: string;
  /** Contains logging configuration information for an extension. */
  LoggingConfig?: LoggingConfig;
  /** The major version of this extension you want to activate, if multiple major versions are available. The default is the latest major version. CloudFormation uses the latest available minor version of t */
  MajorVersion?: number;
  /** The Amazon Resource Name (ARN) of the public extension. Conditional: You must specify PublicTypeArn, or TypeName, Type, and PublisherId. */
  PublicTypeArn?: string;
  /** The ID of the extension publisher. Conditional: You must specify PublicTypeArn, or TypeName, Type, and PublisherId. */
  PublisherId?: string;
  /** The extension type. Conditional: You must specify PublicTypeArn, or TypeName, Type, and PublisherId. */
  Type?: 'RESOURCE' | 'MODULE' | 'HOOK';
  /** The name of the extension. Conditional: You must specify PublicTypeArn, or TypeName, Type, and PublisherId. */
  TypeName?: string;
  /** An alias to assign to the public extension in this account and Region. If you specify an alias for the extension, CloudFormation treats the alias as the extension type name within this account and Reg */
  TypeNameAlias?: string;
  /** Manually updates a previously-activated type to a new major or minor version, if available. You can also use this parameter to update the value of AutoUpdate. MAJOR: CloudFormation updates the extensi */
  VersionBump?: 'MAJOR' | 'MINOR';
}

export interface BatchDescribeTypeConfigurationsInput {
  /** The list of identifiers for the desired extension configurations. */
  TypeConfigurationIdentifiers: TypeConfigurationIdentifier[];
}

/** The input for the CancelUpdateStack action. */
export interface CancelUpdateStackInput {
  /** If you don't pass a parameter to StackName, the API returns a response that describes all resources in the account. The IAM policy below can be added to IAM policies when you want to limit resource-le */
  StackName: string;
  /** A unique identifier for this CancelUpdateStack request. Specify this token if you plan to retry requests so that CloudFormation knows that you're not attempting to cancel an update on a stack with the */
  ClientRequestToken?: string;
}

/** The input for the ContinueUpdateRollback action. */
export interface ContinueUpdateRollbackInput {
  /** The name or the unique ID of the stack that you want to continue rolling back. Don't specify the name of a nested stack (a stack that was created by using the AWS::CloudFormation::Stack resource). Ins */
  StackName: string;
  /** A unique identifier for this ContinueUpdateRollback request. Specify this token if you plan to retry requests so that CloudFormation knows that you're not attempting to continue the rollback to a stac */
  ClientRequestToken?: string;
  /** A list of the logical IDs of the resources that CloudFormation skips during the continue update rollback operation. You can specify only resources that are in the UPDATE_FAILED state because a rollbac */
  ResourcesToSkip?: string[];
  /** The Amazon Resource Name (ARN) of an IAM role that CloudFormation assumes to roll back the stack. CloudFormation uses the role's credentials to make calls on your behalf. CloudFormation always uses th */
  RoleARN?: string;
}

/** The input for the CreateChangeSet action. */
export interface CreateChangeSetInput {
  /** The name of the change set. The name must be unique among all change sets that are associated with the specified stack. A change set name can contain only alphanumeric, case sensitive characters, and  */
  ChangeSetName: string;
  /** The name or the unique ID of the stack for which you are creating a change set. CloudFormation generates the change set by comparing this stack's information with the information that you submit, such */
  StackName: string;
  /** In some cases, you must explicitly acknowledge that your stack template contains certain capabilities in order for CloudFormation to create the stack. CAPABILITY_IAM and CAPABILITY_NAMED_IAM Some stac */
  Capabilities?: 'CAPABILITY_IAM' | 'CAPABILITY_NAMED_IAM' | 'CAPABILITY_AUTO_EXPAND'[];
  /** The type of change set operation. To create a change set for a new stack, specify CREATE. To create a change set for an existing stack, specify UPDATE. To create a change set for an import operation,  */
  ChangeSetType?: 'CREATE' | 'UPDATE' | 'IMPORT';
  /** A unique identifier for this CreateChangeSet request. Specify this token if you plan to retry requests so that CloudFormation knows that you're not attempting to create another change set with the sam */
  ClientToken?: string;
  /** Determines how CloudFormation handles configuration drift during deployment. REVERT_DRIFT – Creates a drift-aware change set that brings actual resource states in line with template definitions. Provi */
  DeploymentMode?: 'REVERT_DRIFT';
  /** A description to help you identify this change set. */
  Description?: string;
  /** Indicates if the change set auto-imports resources that already exist. For more information, see Import Amazon Web Services resources into a CloudFormation stack automatically in the CloudFormation Us */
  ImportExistingResources?: boolean;
  /** Creates a change set for the all nested stacks specified in the template. The default behavior of this action is set to False. To include nested sets in a change set, specify True. */
  IncludeNestedStacks?: boolean;
  /** The Amazon Resource Names (ARNs) of Amazon SNS topics that CloudFormation associates with the stack. To remove all associated notification topics, specify an empty list. */
  NotificationARNs?: string[];
  /** Determines what action will be taken if stack creation fails. If this parameter is specified, the DisableRollback parameter to the ExecuteChangeSet API operation must not be specified. This must be on */
  OnStackFailure?: 'DO_NOTHING' | 'ROLLBACK' | 'DELETE';
  /** A list of Parameter structures that specify input parameters for the change set. For more information, see the Parameter data type. */
  Parameters?: Parameter[];
  /** The resources to import into your stack. */
  ResourcesToImport?: ResourceToImport[];
  /** Specifies which resource types you can work with, such as AWS::EC2::Instance or Custom::MyCustomInstance. If the list of resource types doesn't include a resource type that you're updating, the stack  */
  ResourceTypes?: string[];
  /** The Amazon Resource Name (ARN) of an IAM role that CloudFormation assumes when executing the change set. CloudFormation uses the role's credentials to make calls on your behalf. CloudFormation uses th */
  RoleARN?: string;
  /** The rollback triggers for CloudFormation to monitor during stack creation and updating operations, and for the specified monitoring period afterwards. */
  RollbackConfiguration?: RollbackConfiguration;
  /** Key-value pairs to associate with this stack. CloudFormation also propagates these tags to resources in the stack. You can specify a maximum of 50 tags. */
  Tags?: Tag[];
  /** A structure that contains the body of the revised template, with a minimum length of 1 byte and a maximum length of 51,200 bytes. CloudFormation generates the change set by comparing this template wit */
  TemplateBody?: string;
  /** The URL of the file that contains the revised template. The URL must point to a template (max size: 1 MB) that's located in an Amazon S3 bucket or a Systems Manager document. CloudFormation generates  */
  TemplateURL?: string;
  /** Whether to reuse the template that's associated with the stack to create the change set. When using templates with the AWS::LanguageExtensions transform, provide the template instead of using UsePrevi */
  UsePreviousTemplate?: boolean;
}

export interface CreateGeneratedTemplateInput {
  /** The name assigned to the generated template. */
  GeneratedTemplateName: string;
  /** An optional list of resources to be included in the generated template. If no resources are specified,the template will be created without any resources. Resources can be added to the template using t */
  Resources?: ResourceDefinition[];
  /** An optional name or ARN of a stack to use as the base stack for the generated template. */
  StackName?: string;
  /** The configuration details of the generated template, including the DeletionPolicy and UpdateReplacePolicy. */
  TemplateConfiguration?: TemplateConfiguration;
}

/** The input for CreateStack action. */
export interface CreateStackInput {
  /** The name that's associated with the stack. The name must be unique in the Region in which you are creating the stack. A stack name can contain only alphanumeric characters (case sensitive) and hyphens */
  StackName: string;
  /** In some cases, you must explicitly acknowledge that your stack template contains certain capabilities in order for CloudFormation to create the stack. CAPABILITY_IAM and CAPABILITY_NAMED_IAM Some stac */
  Capabilities?: 'CAPABILITY_IAM' | 'CAPABILITY_NAMED_IAM' | 'CAPABILITY_AUTO_EXPAND'[];
  /** A unique identifier for this CreateStack request. Specify this token if you plan to retry requests so that CloudFormation knows that you're not attempting to create a stack with the same name. You mig */
  ClientRequestToken?: string;
  /** Set to true to disable rollback of the stack if stack creation failed. You can specify either DisableRollback or OnFailure, but not both. Default: false */
  DisableRollback?: boolean;
  /** Whether to enable termination protection on the specified stack. If a user attempts to delete a stack with termination protection enabled, the operation fails and the stack remains unchanged. For more */
  EnableTerminationProtection?: boolean;
  /** The Amazon SNS topic ARNs to publish stack related events. You can find your Amazon SNS topic ARNs using the Amazon SNS console or your Command Line Interface (CLI). */
  NotificationARNs?: string[];
  /** Determines what action will be taken if stack creation fails. This must be one of: DO_NOTHING, ROLLBACK, or DELETE. You can specify either OnFailure or DisableRollback, but not both. Although the defa */
  OnFailure?: 'DO_NOTHING' | 'ROLLBACK' | 'DELETE';
  /** A list of Parameter structures that specify input parameters for the stack. For more information, see the Parameter data type. */
  Parameters?: Parameter[];
  /** Specifies which resource types you can work with, such as AWS::EC2::Instance or Custom::MyCustomInstance. If the list of resource types doesn't include a resource that you're creating, the stack creat */
  ResourceTypes?: string[];
  /** When set to true, newly created resources are deleted when the operation rolls back. This includes newly created resources marked with a deletion policy of Retain. Default: false */
  RetainExceptOnCreate?: boolean;
  /** The Amazon Resource Name (ARN) of an IAM role that CloudFormation assumes to create the stack. CloudFormation uses the role's credentials to make calls on your behalf. CloudFormation always uses this  */
  RoleARN?: string;
  /** The rollback triggers for CloudFormation to monitor during stack creation and updating operations, and for the specified monitoring period afterwards. */
  RollbackConfiguration?: RollbackConfiguration;
  /** Structure that contains the stack policy body. For more information, see Prevent updates to stack resources in the CloudFormation User Guide. You can specify either the StackPolicyBody or the StackPol */
  StackPolicyBody?: string;
  /** Location of a file that contains the stack policy. The URL must point to a policy (maximum size: 16 KB) located in an S3 bucket in the same Region as the stack. The location for an Amazon S3 bucket mu */
  StackPolicyURL?: string;
  /** Key-value pairs to associate with this stack. CloudFormation also propagates these tags to the resources created in the stack. A maximum number of 50 tags can be specified. */
  Tags?: Tag[];
  /** Structure that contains the template body with a minimum length of 1 byte and a maximum length of 51,200 bytes. Conditional: You must specify either TemplateBody or TemplateURL, but not both. */
  TemplateBody?: string;
  /** The URL of a file that contains the template body. The URL must point to a template (max size: 1 MB) that's located in an Amazon S3 bucket or a Systems Manager document. The location for an Amazon S3  */
  TemplateURL?: string;
  /** The amount of time that can pass before the stack status becomes CREATE_FAILED; if DisableRollback is not set or is set to false, the stack will be rolled back. */
  TimeoutInMinutes?: number;
}

export interface CreateStackInstancesInput {
  /** The names of one or more Amazon Web Services Regions where you want to create stack instances using the specified Amazon Web Services accounts. */
  Regions: string[];
  /** The name or unique ID of the StackSet that you want to create stack instances from. */
  StackSetName: string;
  /** [Self-managed permissions] The account IDs of one or more Amazon Web Services accounts that you want to create stack instances in the specified Region(s) for. You can specify Accounts or DeploymentTar */
  Accounts?: string[];
  /** [Service-managed permissions] Specifies whether you are acting as an account administrator in the organization's management account or as a delegated administrator in a member account. By default, SEL */
  CallAs?: 'SELF' | 'DELEGATED_ADMIN';
  /** [Service-managed permissions] The Organizations accounts in which to create stack instances in the specified Amazon Web Services Regions. You can specify Accounts or DeploymentTargets, but not both. */
  DeploymentTargets?: DeploymentTargets;
  /** The unique identifier for this StackSet operation. The operation ID also functions as an idempotency token, to ensure that CloudFormation performs the StackSet operation only once, even if you retry t */
  OperationId?: string;
  /** Preferences for how CloudFormation performs this StackSet operation. */
  OperationPreferences?: StackSetOperationPreferences;
  /** A list of StackSet parameters whose values you want to override in the selected stack instances. Any overridden parameter values will be applied to all stack instances in the specified accounts and Am */
  ParameterOverrides?: Parameter[];
}

export interface CreateStackRefactorInput {
  /** The stacks being refactored. */
  StackDefinitions: StackDefinition[];
  /** A description to help you identify the stack refactor. */
  Description?: string;
  /** Determines if a new stack is created with the refactor. */
  EnableStackCreation?: boolean;
  /** The mappings for the stack resource Source and stack resource Destination. */
  ResourceMappings?: ResourceMapping[];
}

export interface CreateStackSetInput {
  /** The name to associate with the StackSet. The name must be unique in the Region where you create your StackSet. A stack name can contain only alphanumeric characters (case-sensitive) and hyphens. It mu */
  StackSetName: string;
  /** The Amazon Resource Name (ARN) of the IAM role to use to create this StackSet. Specify an IAM role only if you are using customized administrator roles to control which users or groups can manage spec */
  AdministrationRoleARN?: string;
  /** Describes whether StackSets automatically deploys to Organizations accounts that are added to the target organization or organizational unit (OU). For more information, see Enable or disable automatic */
  AutoDeployment?: AutoDeployment;
  /** Specifies whether you are acting as an account administrator in the organization's management account or as a delegated administrator in a member account. By default, SELF is specified. Use SELF for S */
  CallAs?: 'SELF' | 'DELEGATED_ADMIN';
  /** In some cases, you must explicitly acknowledge that your StackSet template contains certain capabilities in order for CloudFormation to create the StackSet and related stack instances. CAPABILITY_IAM  */
  Capabilities?: 'CAPABILITY_IAM' | 'CAPABILITY_NAMED_IAM' | 'CAPABILITY_AUTO_EXPAND'[];
  /** A unique identifier for this CreateStackSet request. Specify this token if you plan to retry requests so that CloudFormation knows that you're not attempting to create another StackSet with the same n */
  ClientRequestToken?: string;
  /** A description of the StackSet. You can use the description to identify the StackSet's purpose or other important information. */
  Description?: string;
  /** The name of the IAM execution role to use to create the StackSet. If you do not specify an execution role, CloudFormation uses the AWSCloudFormationStackSetExecutionRole role for the StackSet operatio */
  ExecutionRoleName?: string;
  /** Describes whether CloudFormation performs non-conflicting operations concurrently and queues conflicting operations. */
  ManagedExecution?: ManagedExecution;
  /** The input parameters for the StackSet template. */
  Parameters?: Parameter[];
  /** Describes how the IAM roles required for StackSet operations are created. By default, SELF-MANAGED is specified. With self-managed permissions, you must create the administrator and execution roles re */
  PermissionModel?: 'SERVICE_MANAGED' | 'SELF_MANAGED';
  /** The stack ID you are importing into a new StackSet. Specify the Amazon Resource Name (ARN) of the stack. */
  StackId?: string;
  /** The key-value pairs to associate with this StackSet and the stacks created from it. CloudFormation also propagates these tags to supported resources that are created in the stacks. A maximum number of */
  Tags?: Tag[];
  /** The structure that contains the template body, with a minimum length of 1 byte and a maximum length of 51,200 bytes. Conditional: You must specify either the TemplateBody or the TemplateURL parameter, */
  TemplateBody?: string;
  /** The URL of a file that contains the template body. The URL must point to a template (maximum size: 1 MB) that's located in an Amazon S3 bucket or a Systems Manager document. The location for an Amazon */
  TemplateURL?: string;
}

export interface DeactivateTypeInput {
  /** The Amazon Resource Name (ARN) for the extension in this account and Region. Conditional: You must specify either Arn, or TypeName and Type. */
  Arn?: string;
  /** The extension type. Conditional: You must specify either Arn, or TypeName and Type. */
  Type?: 'RESOURCE' | 'MODULE' | 'HOOK';
  /** The type name of the extension in this account and Region. If you specified a type name alias when enabling the extension, use the type name alias. Conditional: You must specify either Arn, or TypeNam */
  TypeName?: string;
}

/** The input for the DeleteChangeSet action. */
export interface DeleteChangeSetInput {
  /** The name or Amazon Resource Name (ARN) of the change set that you want to delete. */
  ChangeSetName: string;
  /** If you specified the name of a change set to delete, specify the stack name or Amazon Resource Name (ARN) that's associated with it. */
  StackName?: string;
}

export interface DeleteGeneratedTemplateInput {
  /** The name or Amazon Resource Name (ARN) of a generated template. */
  GeneratedTemplateName: string;
}

/** The input for DeleteStack action. */
export interface DeleteStackInput {
  /** The name or the unique stack ID that's associated with the stack. */
  StackName: string;
  /** A unique identifier for this DeleteStack request. Specify this token if you plan to retry requests so that CloudFormation knows that you're not attempting to delete a stack with the same name. You mig */
  ClientRequestToken?: string;
  /** Specifies the deletion mode for the stack. Possible values are: STANDARD - Use the standard behavior. Specifying this value is the same as not specifying this parameter. FORCE_DELETE_STACK - Delete th */
  DeletionMode?: 'STANDARD' | 'FORCE_DELETE_STACK';
  /** For stacks in the DELETE_FAILED state, a list of resource logical IDs that are associated with the resources you want to retain. During deletion, CloudFormation deletes the stack but doesn't delete th */
  RetainResources?: string[];
  /** The Amazon Resource Name (ARN) of an IAM role that CloudFormation assumes to delete the stack. CloudFormation uses the role's credentials to make calls on your behalf. If you don't specify a value, Cl */
  RoleARN?: string;
}

export interface DeleteStackInstancesInput {
  /** The Amazon Web Services Regions where you want to delete StackSet instances. */
  Regions: string[];
  /** Removes the stack instances from the specified StackSet, but doesn't delete the stacks. You can't reassociate a retained stack or add an existing, saved stack to a new stack set. For more information, */
  RetainStacks: boolean;
  /** The name or unique ID of the StackSet that you want to delete stack instances for. */
  StackSetName: string;
  /** [Self-managed permissions] The account IDs of the Amazon Web Services accounts that you want to delete stack instances for. You can specify Accounts or DeploymentTargets, but not both. */
  Accounts?: string[];
  /** [Service-managed permissions] Specifies whether you are acting as an account administrator in the organization's management account or as a delegated administrator in a member account. By default, SEL */
  CallAs?: 'SELF' | 'DELEGATED_ADMIN';
  /** [Service-managed permissions] The Organizations accounts from which to delete stack instances. You can specify Accounts or DeploymentTargets, but not both. */
  DeploymentTargets?: DeploymentTargets;
  /** The unique identifier for this StackSet operation. If you don't specify an operation ID, the SDK generates one automatically. The operation ID also functions as an idempotency token, to ensure that Cl */
  OperationId?: string;
  /** Preferences for how CloudFormation performs this StackSet operation. */
  OperationPreferences?: StackSetOperationPreferences;
}

export interface DeleteStackSetInput {
  /** The name or unique ID of the StackSet that you're deleting. You can obtain this value by running ListStackSets. */
  StackSetName: string;
  /** [Service-managed permissions] Specifies whether you are acting as an account administrator in the organization's management account or as a delegated administrator in a member account. By default, SEL */
  CallAs?: 'SELF' | 'DELEGATED_ADMIN';
}

export interface DeregisterTypeInput {
  /** The Amazon Resource Name (ARN) of the extension. Conditional: You must specify either TypeName and Type, or Arn. */
  Arn?: string;
  /** The kind of extension. Conditional: You must specify either TypeName and Type, or Arn. */
  Type?: 'RESOURCE' | 'MODULE' | 'HOOK';
  /** The name of the extension. Conditional: You must specify either TypeName and Type, or Arn. */
  TypeName?: string;
  /** The ID of a specific version of the extension. The version ID is the value at the end of the Amazon Resource Name (ARN) assigned to the extension version when it is registered. */
  VersionId?: string;
}

/** The input for the DescribeAccountLimits action. */
export interface DescribeAccountLimitsInput {
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
}

/** The input for the DescribeChangeSet action. */
export interface DescribeChangeSetInput {
  /** The name or Amazon Resource Name (ARN) of the change set that you want to describe. */
  ChangeSetName: string;
  /** If true, the returned changes include detailed changes in the property values. */
  IncludePropertyValues?: boolean;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
  /** If you specified the name of a change set, specify the stack name or ID (ARN) of the change set you want to describe. */
  StackName?: string;
}

export interface DescribeChangeSetHooksInput {
  /** The name or Amazon Resource Name (ARN) of the change set that you want to describe. */
  ChangeSetName: string;
  /** If specified, lists only the Hooks related to the specified LogicalResourceId. */
  LogicalResourceId?: string;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
  /** If you specified the name of a change set, specify the stack name or stack ID (ARN) of the change set you want to describe. */
  StackName?: string;
}

export interface DescribeEventsInput {
  /** The name or Amazon Resource Name (ARN) of the change set for which you want to retrieve events. */
  ChangeSetName?: string;
  /** Filters to apply when retrieving events. */
  Filters?: EventFilter;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
  /** The unique identifier of the operation for which you want to retrieve events. */
  OperationId?: string;
  /** The name or unique stack ID for which you want to retrieve events. */
  StackName?: string;
}

export interface DescribeGeneratedTemplateInput {
  /** The name or Amazon Resource Name (ARN) of a generated template. */
  GeneratedTemplateName: string;
}

export interface DescribeOrganizationsAccessInput {
  /** [Service-managed permissions] Specifies whether you are acting as an account administrator in the organization's management account or as a delegated administrator in a member account. By default, SEL */
  CallAs?: 'SELF' | 'DELEGATED_ADMIN';
}

export interface DescribePublisherInput {
  /** The ID of the extension publisher. If you don't supply a PublisherId, and you have registered as an extension publisher, DescribePublisher returns information about your own publisher account. */
  PublisherId?: string;
}

export interface DescribeResourceScanInput {
  /** The Amazon Resource Name (ARN) of the resource scan. */
  ResourceScanId: string;
}

export interface DescribeStackDriftDetectionStatusInput {
  /** The ID of the drift detection results of this operation. CloudFormation generates new results, with a new drift detection ID, each time this operation is run. However, the number of drift results Clou */
  StackDriftDetectionId: string;
}

/** The input for DescribeStackEvents action. */
export interface DescribeStackEventsInput {
  /** The name or the unique stack ID that's associated with the stack, which aren't always interchangeable: Running stacks: You can specify either the stack's name or its unique stack ID. Deleted stacks: Y */
  StackName: string;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
}

export interface DescribeStackInstanceInput {
  /** The ID of an Amazon Web Services account that's associated with this stack instance. */
  StackInstanceAccount: string;
  /** The name of a Region that's associated with this stack instance. */
  StackInstanceRegion: string;
  /** The name or the unique stack ID of the StackSet that you want to get stack instance information for. */
  StackSetName: string;
  /** [Service-managed permissions] Specifies whether you are acting as an account administrator in the organization's management account or as a delegated administrator in a member account. By default, SEL */
  CallAs?: 'SELF' | 'DELEGATED_ADMIN';
}

export interface DescribeStackRefactorInput {
  /** The ID associated with the stack refactor created from the CreateStackRefactor action. */
  StackRefactorId: string;
}

/** The input for DescribeStackResource action. */
export interface DescribeStackResourceInput {
  /** The logical name of the resource as specified in the template. */
  LogicalResourceId: string;
  /** The name or the unique stack ID that's associated with the stack, which aren't always interchangeable: Running stacks: You can specify either the stack's name or its unique stack ID. Deleted stacks: Y */
  StackName: string;
}

export interface DescribeStackResourceDriftsInput {
  /** The name of the stack for which you want drift information. */
  StackName: string;
  /** The maximum number of results to be returned with a single call. If the number of available results exceeds this maximum, the response includes a NextToken value that you can assign to the NextToken r */
  MaxResults?: number;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
  /** The resource drift status values to use as filters for the resource drift results returned. DELETED: The resource differs from its expected template configuration in that the resource has been deleted */
  StackResourceDriftStatusFilters?: 'IN_SYNC' | 'MODIFIED' | 'DELETED' | 'NOT_CHECKED' | 'UNKNOWN' | 'UNSUPPORTED'[];
}

/** The input for DescribeStackResources action. */
export interface DescribeStackResourcesInput {
  /** The logical name of the resource as specified in the template. */
  LogicalResourceId?: string;
  /** The name or unique identifier that corresponds to a physical instance ID of a resource supported by CloudFormation. For example, for an Amazon Elastic Compute Cloud (EC2) instance, PhysicalResourceId  */
  PhysicalResourceId?: string;
  /** The name or the unique stack ID that is associated with the stack, which aren't always interchangeable: Running stacks: You can specify either the stack's name or its unique stack ID. Deleted stacks:  */
  StackName?: string;
}

/** The input for DescribeStacks action. */
export interface DescribeStacksInput {
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
  /** If you don't pass a parameter to StackName, the API returns a response that describes all resources in the account, which can impact performance. This requires ListStacks and DescribeStacks permission */
  StackName?: string;
}

export interface DescribeStackSetInput {
  /** The name or unique ID of the StackSet whose description you want. */
  StackSetName: string;
  /** [Service-managed permissions] Specifies whether you are acting as an account administrator in the organization's management account or as a delegated administrator in a member account. By default, SEL */
  CallAs?: 'SELF' | 'DELEGATED_ADMIN';
}

export interface DescribeStackSetOperationInput {
  /** The unique ID of the StackSet operation. */
  OperationId: string;
  /** The name or the unique stack ID of the StackSet for the stack operation. */
  StackSetName: string;
  /** [Service-managed permissions] Specifies whether you are acting as an account administrator in the organization's management account or as a delegated administrator in a member account. By default, SEL */
  CallAs?: 'SELF' | 'DELEGATED_ADMIN';
}

export interface DescribeTypeInput {
  /** The Amazon Resource Name (ARN) of the extension. Conditional: You must specify either TypeName and Type, or Arn. */
  Arn?: string;
  /** The version number of a public third-party extension. */
  PublicVersionNumber?: string;
  /** The publisher ID of the extension publisher. Extensions provided by Amazon Web Services are not assigned a publisher ID. */
  PublisherId?: string;
  /** The kind of extension. Conditional: You must specify either TypeName and Type, or Arn. */
  Type?: 'RESOURCE' | 'MODULE' | 'HOOK';
  /** The name of the extension. Conditional: You must specify either TypeName and Type, or Arn. */
  TypeName?: string;
  /** The ID of a specific version of the extension. The version ID is the value at the end of the Amazon Resource Name (ARN) assigned to the extension version when it is registered. If you specify a Versio */
  VersionId?: string;
}

export interface DescribeTypeRegistrationInput {
  /** The identifier for this registration request. This registration token is generated by CloudFormation when you initiate a registration request using RegisterType. */
  RegistrationToken: string;
}

export interface DetectStackDriftInput {
  /** The name of the stack for which you want to detect drift. */
  StackName: string;
  /** The logical names of any resources you want to use as filters. */
  LogicalResourceIds?: string[];
}

export interface DetectStackResourceDriftInput {
  /** The logical name of the resource for which to return drift information. */
  LogicalResourceId: string;
  /** The name of the stack to which the resource belongs. */
  StackName: string;
}

export interface DetectStackSetDriftInput {
  /** The name of the StackSet on which to perform the drift detection operation. */
  StackSetName: string;
  /** [Service-managed permissions] Specifies whether you are acting as an account administrator in the organization's management account or as a delegated administrator in a member account. By default, SEL */
  CallAs?: 'SELF' | 'DELEGATED_ADMIN';
  /** The ID of the StackSet operation. */
  OperationId?: string;
  /** The user-specified preferences for how CloudFormation performs a StackSet operation. For more information about maximum concurrent accounts and failure tolerance, see StackSet operation options. */
  OperationPreferences?: StackSetOperationPreferences;
}

/** The input for an EstimateTemplateCost action. */
export interface EstimateTemplateCostInput {
  /** A list of Parameter structures that specify input parameters. */
  Parameters?: Parameter[];
  /** Structure that contains the template body with a minimum length of 1 byte and a maximum length of 51,200 bytes. Conditional: You must pass TemplateBody or TemplateURL. If both are passed, only Templat */
  TemplateBody?: string;
  /** The URL of a file that contains the template body. The URL must point to a template that's located in an Amazon S3 bucket or a Systems Manager document. The location for an Amazon S3 bucket must start */
  TemplateURL?: string;
}

/** The input for the ExecuteChangeSet action. */
export interface ExecuteChangeSetInput {
  /** The name or Amazon Resource Name (ARN) of the change set that you want use to update the specified stack. */
  ChangeSetName: string;
  /** A unique identifier for this ExecuteChangeSet request. Specify this token if you plan to retry requests so that CloudFormation knows that you're not attempting to execute a change set to update a stac */
  ClientRequestToken?: string;
  /** Preserves the state of previously provisioned resources when an operation fails. This parameter can't be specified when the OnStackFailure parameter to the CreateChangeSet API operation was specified. */
  DisableRollback?: boolean;
  /** When set to true, newly created resources are deleted when the operation rolls back. This includes newly created resources marked with a deletion policy of Retain. Default: false */
  RetainExceptOnCreate?: boolean;
  /** If you specified the name of a change set, specify the stack name or Amazon Resource Name (ARN) that's associated with the change set you want to execute. */
  StackName?: string;
}

export interface ExecuteStackRefactorInput {
  /** The ID associated with the stack refactor created from the CreateStackRefactor action. */
  StackRefactorId: string;
}

export interface GetGeneratedTemplateInput {
  /** The name or Amazon Resource Name (ARN) of the generated template. The format is arn:${Partition}:cloudformation:${Region}:${Account}:generatedtemplate/${Id}. For example, arn:aws:cloudformation:us-eas */
  GeneratedTemplateName: string;
  /** The language to use to retrieve for the generated template. Supported values are: JSON YAML */
  Format?: 'JSON' | 'YAML';
}

export interface GetHookResultInput {
  /** The unique identifier (ID) of the Hook invocation result that you want details about. You can get the ID from the ListHookResults operation. */
  HookResultId?: string;
}

/** The input for the GetStackPolicy action. */
export interface GetStackPolicyInput {
  /** The name or unique stack ID that's associated with the stack whose policy you want to get. */
  StackName: string;
}

/** The input for a GetTemplate action. */
export interface GetTemplateInput {
  /** The name or Amazon Resource Name (ARN) of a change set for which CloudFormation returns the associated template. If you specify a name, you must also specify the StackName. */
  ChangeSetName?: string;
  /** The name or the unique stack ID that's associated with the stack, which aren't always interchangeable: Running stacks: You can specify either the stack's name or its unique stack ID. Deleted stacks: Y */
  StackName?: string;
  /** For templates that include transforms, the stage of the template that CloudFormation returns. To get the user-submitted template, specify Original. To get the template after CloudFormation has process */
  TemplateStage?: 'Original' | 'Processed';
}

/** The input for the GetTemplateSummary action. */
export interface GetTemplateSummaryInput {
  /** [Service-managed permissions] Specifies whether you are acting as an account administrator in the organization's management account or as a delegated administrator in a member account. By default, SEL */
  CallAs?: 'SELF' | 'DELEGATED_ADMIN';
  /** The name or the stack ID that's associated with the stack, which aren't always interchangeable. For running stacks, you can specify either the stack's name or its unique stack ID. For deleted stack, y */
  StackName?: string;
  /** The name or unique ID of the StackSet from which the stack was created. Conditional: You must specify only one of the following parameters: StackName, StackSetName, TemplateBody, or TemplateURL. */
  StackSetName?: string;
  /** Structure that contains the template body with a minimum length of 1 byte and a maximum length of 51,200 bytes. Conditional: You must specify only one of the following parameters: StackName, StackSetN */
  TemplateBody?: string;
  /** Specifies options for the GetTemplateSummary API action. */
  TemplateSummaryConfig?: TemplateSummaryConfig;
  /** The URL of a file that contains the template body. The URL must point to a template (max size: 1 MB) that's located in an Amazon S3 bucket or a Systems Manager document. The location for an Amazon S3  */
  TemplateURL?: string;
}

export interface ImportStacksToStackSetInput {
  /** The name of the StackSet. The name must be unique in the Region where you create your StackSet. */
  StackSetName: string;
  /** By default, SELF is specified. Use SELF for StackSets with self-managed permissions. If you are signed in to the management account, specify SELF. For service managed StackSets, specify DELEGATED_ADMI */
  CallAs?: 'SELF' | 'DELEGATED_ADMIN';
  /** A unique, user defined, identifier for the StackSet operation. */
  OperationId?: string;
  /** The user-specified preferences for how CloudFormation performs a StackSet operation. For more information about maximum concurrent accounts and failure tolerance, see StackSet operation options. */
  OperationPreferences?: StackSetOperationPreferences;
  /** The list of OU ID's to which the imported stacks must be mapped as deployment targets. */
  OrganizationalUnitIds?: string[];
  /** The IDs of the stacks you are importing into a StackSet. You import up to 10 stacks per StackSet at a time. Specify either StackIds or StackIdsUrl. */
  StackIds?: string[];
  /** The Amazon S3 URL which contains list of stack ids to be inputted. Specify either StackIds or StackIdsUrl. */
  StackIdsUrl?: string;
}

/** The input for the ListChangeSets action. */
export interface ListChangeSetsInput {
  /** The name or the Amazon Resource Name (ARN) of the stack for which you want to list change sets. */
  StackName: string;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
}

export interface ListExportsInput {
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
}

export interface ListGeneratedTemplatesInput {
  /** If the number of available results exceeds this maximum, the response includes a NextToken value that you can use for the NextToken parameter to get the next set of results. By default the ListGenerat */
  MaxResults?: number;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
}

export interface ListHookResultsInput {
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
  /** Filters results by the status of Hook invocations. Can only be used in combination with TypeArn. Valid values are: HOOK_IN_PROGRESS: The Hook is currently running. HOOK_COMPLETE_SUCCEEDED: The Hook co */
  Status?: 'HOOK_IN_PROGRESS' | 'HOOK_COMPLETE_SUCCEEDED' | 'HOOK_COMPLETE_FAILED' | 'HOOK_FAILED';
  /** Filters results by the unique identifier of the target the Hook was invoked against. For change sets, this is the change set ARN. When the target is a Cloud Control API operation, this value must be t */
  TargetId?: string;
  /** Filters results by target type. Currently, only CHANGE_SET and CLOUD_CONTROL are supported filter options. Required when TargetId is specified and cannot be used otherwise. */
  TargetType?: 'CHANGE_SET' | 'STACK' | 'RESOURCE' | 'CLOUD_CONTROL';
  /** Filters results by the ARN of the Hook. Can be used alone or in combination with Status. */
  TypeArn?: string;
}

export interface ListImportsInput {
  /** The name of the exported output value. CloudFormation returns the stack names that are importing this value. */
  ExportName: string;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
}

export interface ListResourceScanRelatedResourcesInput {
  /** The list of resources for which you want to get the related resources. Up to 100 resources can be provided. */
  Resources: ScannedResourceIdentifier[];
  /** The Amazon Resource Name (ARN) of the resource scan. */
  ResourceScanId: string;
  /** If the number of available results exceeds this maximum, the response includes a NextToken value that you can use for the NextToken parameter to get the next set of results. By default the ListResourc */
  MaxResults?: number;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
}

export interface ListResourceScanResourcesInput {
  /** The Amazon Resource Name (ARN) of the resource scan. */
  ResourceScanId: string;
  /** If the number of available results exceeds this maximum, the response includes a NextToken value that you can use for the NextToken parameter to get the next set of results. By default the ListResourc */
  MaxResults?: number;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
  /** If specified, the returned resources will have the specified resource identifier (or one of them in the case where the resource has multiple identifiers). */
  ResourceIdentifier?: string;
  /** If specified, the returned resources will be of any of the resource types with the specified prefix. */
  ResourceTypePrefix?: string;
  /** If specified, the returned resources will have a matching tag key. */
  TagKey?: string;
  /** If specified, the returned resources will have a matching tag value. */
  TagValue?: string;
}

export interface ListResourceScansInput {
  /** If the number of available results exceeds this maximum, the response includes a NextToken value that you can use for the NextToken parameter to get the next set of results. The default value is 10. T */
  MaxResults?: number;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
  /** The scan type that you want to get summary information about. The default is FULL. */
  ScanTypeFilter?: 'FULL' | 'PARTIAL';
}

export interface ListStackInstanceResourceDriftsInput {
  /** The unique ID of the drift operation. */
  OperationId: string;
  /** The name of the Amazon Web Services account that you want to list resource drifts for. */
  StackInstanceAccount: string;
  /** The name of the Region where you want to list resource drifts. */
  StackInstanceRegion: string;
  /** The name or unique ID of the StackSet that you want to list drifted resources for. */
  StackSetName: string;
  /** [Service-managed permissions] Specifies whether you are acting as an account administrator in the organization's management account or as a delegated administrator in a member account. By default, SEL */
  CallAs?: 'SELF' | 'DELEGATED_ADMIN';
  /** The maximum number of results to be returned with a single call. If the number of available results exceeds this maximum, the response includes a NextToken value that you can assign to the NextToken r */
  MaxResults?: number;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
  /** The resource drift status of the stack instance. DELETED: The resource differs from its expected template configuration in that the resource has been deleted. MODIFIED: One or more resource properties */
  StackInstanceResourceDriftStatuses?: 'IN_SYNC' | 'MODIFIED' | 'DELETED' | 'NOT_CHECKED' | 'UNKNOWN' | 'UNSUPPORTED'[];
}

export interface ListStackInstancesInput {
  /** The name or unique ID of the StackSet that you want to list stack instances for. */
  StackSetName: string;
  /** [Service-managed permissions] Specifies whether you are acting as an account administrator in the organization's management account or as a delegated administrator in a member account. By default, SEL */
  CallAs?: 'SELF' | 'DELEGATED_ADMIN';
  /** The filter to apply to stack instances */
  Filters?: StackInstanceFilter[];
  /** The maximum number of results to be returned with a single call. If the number of available results exceeds this maximum, the response includes a NextToken value that you can assign to the NextToken r */
  MaxResults?: number;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
  /** The name of the Amazon Web Services account that you want to list stack instances for. */
  StackInstanceAccount?: string;
  /** The name of the Region where you want to list stack instances. */
  StackInstanceRegion?: string;
}

export interface ListStackRefactorActionsInput {
  /** The ID associated with the stack refactor created from the CreateStackRefactor action. */
  StackRefactorId: string;
  /** The maximum number of results to be returned with a single call. If the number of available results exceeds this maximum, the response includes a NextToken value that you can assign to the NextToken r */
  MaxResults?: number;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
}

export interface ListStackRefactorsInput {
  /** Execution status to use as a filter. Specify one or more execution status codes to list only stack refactors with the specified execution status codes. */
  ExecutionStatusFilter?: 'UNAVAILABLE' | 'AVAILABLE' | 'OBSOLETE' | 'EXECUTE_IN_PROGRESS' | 'EXECUTE_COMPLETE' | 'EXECUTE_FAILED' | 'ROLLBACK_IN_PROGRESS' | 'ROLLBACK_COMPLETE' | 'ROLLBACK_FAILED'[];
  /** The maximum number of results to be returned with a single call. If the number of available results exceeds this maximum, the response includes a NextToken value that you can assign to the NextToken r */
  MaxResults?: number;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
}

/** The input for the ListStackResource action. */
export interface ListStackResourcesInput {
  /** The name or the unique stack ID that is associated with the stack, which aren't always interchangeable: Running stacks: You can specify either the stack's name or its unique stack ID. Deleted stacks:  */
  StackName: string;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
}

/** The input for ListStacks action. */
export interface ListStacksInput {
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
  /** Stack status to use as a filter. Specify one or more stack status codes to list only stacks with the specified status codes. For a complete list of stack status codes, see the StackStatus parameter of */
  StackStatusFilter?: 'CREATE_IN_PROGRESS' | 'CREATE_FAILED' | 'CREATE_COMPLETE' | 'ROLLBACK_IN_PROGRESS' | 'ROLLBACK_FAILED' | 'ROLLBACK_COMPLETE' | 'DELETE_IN_PROGRESS' | 'DELETE_FAILED' | 'DELETE_COMPLETE' | 'UPDATE_IN_PROGRESS' | 'UPDATE_COMPLETE_CLEANUP_IN_PROGRESS' | 'UPDATE_COMPLETE' | 'UPDATE_FAILED' | 'UPDATE_ROLLBACK_IN_PROGRESS' | 'UPDATE_ROLLBACK_FAILED' | 'UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS' | 'UPDATE_ROLLBACK_COMPLETE' | 'REVIEW_IN_PROGRESS' | 'IMPORT_IN_PROGRESS' | 'IMPORT_COMPLETE' | 'IMPORT_ROLLBACK_IN_PROGRESS' | 'IMPORT_ROLLBACK_FAILED' | 'IMPORT_ROLLBACK_COMPLETE'[];
}

export interface ListStackSetAutoDeploymentTargetsInput {
  /** The name or unique ID of the StackSet that you want to get automatic deployment targets for. */
  StackSetName: string;
  /** Specifies whether you are acting as an account administrator in the organization's management account or as a delegated administrator in a member account. By default, SELF is specified. Use SELF for S */
  CallAs?: 'SELF' | 'DELEGATED_ADMIN';
  /** The maximum number of results to be returned with a single call. If the number of available results exceeds this maximum, the response includes a NextToken value that you can assign to the NextToken r */
  MaxResults?: number;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
}

export interface ListStackSetOperationResultsInput {
  /** The ID of the StackSet operation. */
  OperationId: string;
  /** The name or unique ID of the StackSet that you want to get operation results for. */
  StackSetName: string;
  /** [Service-managed permissions] Specifies whether you are acting as an account administrator in the organization's management account or as a delegated administrator in a member account. By default, SEL */
  CallAs?: 'SELF' | 'DELEGATED_ADMIN';
  /** The filter to apply to operation results. */
  Filters?: OperationResultFilter[];
  /** The maximum number of results to be returned with a single call. If the number of available results exceeds this maximum, the response includes a NextToken value that you can assign to the NextToken r */
  MaxResults?: number;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
}

export interface ListStackSetOperationsInput {
  /** The name or unique ID of the StackSet that you want to get operation summaries for. */
  StackSetName: string;
  /** [Service-managed permissions] Specifies whether you are acting as an account administrator in the organization's management account or as a delegated administrator in a member account. By default, SEL */
  CallAs?: 'SELF' | 'DELEGATED_ADMIN';
  /** The maximum number of results to be returned with a single call. If the number of available results exceeds this maximum, the response includes a NextToken value that you can assign to the NextToken r */
  MaxResults?: number;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
}

export interface ListStackSetsInput {
  /** [Service-managed permissions] Specifies whether you are acting as an account administrator in the management account or as a delegated administrator in a member account. By default, SELF is specified. */
  CallAs?: 'SELF' | 'DELEGATED_ADMIN';
  /** The maximum number of results to be returned with a single call. If the number of available results exceeds this maximum, the response includes a NextToken value that you can assign to the NextToken r */
  MaxResults?: number;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
  /** The status of the StackSets that you want to get summary information about. */
  Status?: 'ACTIVE' | 'DELETED';
}

export interface ListTypeRegistrationsInput {
  /** The maximum number of results to be returned with a single call. If the number of available results exceeds this maximum, the response includes a NextToken value that you can assign to the NextToken r */
  MaxResults?: number;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
  /** The current status of the extension registration request. The default is IN_PROGRESS. */
  RegistrationStatusFilter?: 'COMPLETE' | 'IN_PROGRESS' | 'FAILED';
  /** The kind of extension. Conditional: You must specify either TypeName and Type, or Arn. */
  Type?: 'RESOURCE' | 'MODULE' | 'HOOK';
  /** The Amazon Resource Name (ARN) of the extension. Conditional: You must specify either TypeName and Type, or Arn. */
  TypeArn?: string;
  /** The name of the extension. Conditional: You must specify either TypeName and Type, or Arn. */
  TypeName?: string;
}

export interface ListTypesInput {
  /** The deprecation status of the extension that you want to get summary information about. Valid values include: LIVE: The extension is registered for use in CloudFormation operations. DEPRECATED: The ex */
  DeprecatedStatus?: 'LIVE' | 'DEPRECATED';
  /** Filter criteria to use in determining which extensions to return. Filters must be compatible with Visibility to return valid results. For example, specifying AWS_TYPES for Category and PRIVATE for Vis */
  Filters?: TypeFilters;
  /** The maximum number of results to be returned with a single call. If the number of available results exceeds this maximum, the response includes a NextToken value that you can assign to the NextToken r */
  MaxResults?: number;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
  /** For resource types, the provisioning behavior of the resource type. CloudFormation determines the provisioning type during registration, based on the types of handlers in the schema handler package su */
  ProvisioningType?: 'NON_PROVISIONABLE' | 'IMMUTABLE' | 'FULLY_MUTABLE';
  /** The type of extension. */
  Type?: 'RESOURCE' | 'MODULE' | 'HOOK';
  /** The scope at which the extensions are visible and usable in CloudFormation operations. Valid values include: PRIVATE: Extensions that are visible and usable within this account and Region. This includ */
  Visibility?: 'PUBLIC' | 'PRIVATE';
}

export interface ListTypeVersionsInput {
  /** The Amazon Resource Name (ARN) of the extension for which you want version summary information. Conditional: You must specify either TypeName and Type, or Arn. */
  Arn?: string;
  /** The deprecation status of the extension versions that you want to get summary information about. Valid values include: LIVE: The extension version is registered and can be used in CloudFormation opera */
  DeprecatedStatus?: 'LIVE' | 'DEPRECATED';
  /** The maximum number of results to be returned with a single call. If the number of available results exceeds this maximum, the response includes a NextToken value that you can assign to the NextToken r */
  MaxResults?: number;
  /** The token for the next set of items to return. (You received this token from a previous call.) */
  NextToken?: string;
  /** The publisher ID of the extension publisher. Extensions published by Amazon aren't assigned a publisher ID. */
  PublisherId?: string;
  /** The kind of the extension. Conditional: You must specify either TypeName and Type, or Arn. */
  Type?: 'RESOURCE' | 'MODULE' | 'HOOK';
  /** The name of the extension for which you want version summary information. Conditional: You must specify either TypeName and Type, or Arn. */
  TypeName?: string;
}

export interface PublishTypeInput {
  /** The Amazon Resource Name (ARN) of the extension. Conditional: You must specify Arn, or TypeName and Type. */
  Arn?: string;
  /** The version number to assign to this version of the extension. Use the following format, and adhere to semantic versioning when assigning a version number to your extension: MAJOR.MINOR.PATCH For more */
  PublicVersionNumber?: string;
  /** The type of the extension. Conditional: You must specify Arn, or TypeName and Type. */
  Type?: 'RESOURCE' | 'MODULE' | 'HOOK';
  /** The name of the extension. Conditional: You must specify Arn, or TypeName and Type. */
  TypeName?: string;
}

export interface RecordHandlerProgressInput {
  /** Reserved for use by the CloudFormation CLI. */
  BearerToken: string;
  /** Reserved for use by the CloudFormation CLI. */
  OperationStatus: 'PENDING' | 'IN_PROGRESS' | 'SUCCESS' | 'FAILED';
  /** Reserved for use by the CloudFormation CLI. */
  ClientRequestToken?: string;
  /** Reserved for use by the CloudFormation CLI. */
  CurrentOperationStatus?: 'PENDING' | 'IN_PROGRESS' | 'SUCCESS' | 'FAILED';
  /** Reserved for use by the CloudFormation CLI. */
  ErrorCode?: 'NotUpdatable' | 'InvalidRequest' | 'AccessDenied' | 'InvalidCredentials' | 'AlreadyExists' | 'NotFound' | 'ResourceConflict' | 'Throttling' | 'ServiceLimitExceeded' | 'NotStabilized' | 'GeneralServiceException' | 'ServiceInternalError' | 'NetworkFailure' | 'InternalFailure' | 'InvalidTypeConfiguration' | 'HandlerInternalFailure' | 'NonCompliant' | 'Unknown' | 'UnsupportedTarget';
  /** Reserved for use by the CloudFormation CLI. */
  ResourceModel?: string;
  /** Reserved for use by the CloudFormation CLI. */
  StatusMessage?: string;
}

export interface RegisterPublisherInput {
  /** Whether you accept the Terms and Conditions for publishing extensions in the CloudFormation registry. You must accept the terms and conditions in order to register to publish public extensions to the  */
  AcceptTermsAndConditions?: boolean;
  /** If you are using a Bitbucket or GitHub account for identity verification, the Amazon Resource Name (ARN) for your connection to that account. For more information, see Prerequisite: Registering your a */
  ConnectionArn?: string;
}

export interface RegisterTypeInput {
  /** A URL to the S3 bucket that contains the extension project package that contains the necessary files for the extension you want to register. For information about generating a schema handler package f */
  SchemaHandlerPackage: string;
  /** The name of the extension being registered. We suggest that extension names adhere to the following patterns: For resource types, company_or_organization::service::type. For modules, company_or_organi */
  TypeName: string;
  /** A unique identifier that acts as an idempotency key for this registration request. Specifying a client request token prevents CloudFormation from generating more than one version of an extension from  */
  ClientRequestToken?: string;
  /** The Amazon Resource Name (ARN) of the IAM role for CloudFormation to assume when invoking the extension. For CloudFormation to assume the specified execution role, the role must contain a trust relati */
  ExecutionRoleArn?: string;
  /** Specifies logging configuration information for an extension. */
  LoggingConfig?: LoggingConfig;
  /** The kind of extension. */
  Type?: 'RESOURCE' | 'MODULE' | 'HOOK';
}

export interface RollbackStackInput {
  /** The name that's associated with the stack. */
  StackName: string;
  /** A unique identifier for this RollbackStack request. */
  ClientRequestToken?: string;
  /** When set to true, newly created resources are deleted when the operation rolls back. This includes newly created resources marked with a deletion policy of Retain. Default: false */
  RetainExceptOnCreate?: boolean;
  /** The Amazon Resource Name (ARN) of an IAM role that CloudFormation assumes to rollback the stack. */
  RoleARN?: string;
}

/** The input for the SetStackPolicy action. */
export interface SetStackPolicyInput {
  /** The name or unique stack ID that you want to associate a policy with. */
  StackName: string;
  /** Structure that contains the stack policy body. For more information, see Prevent updates to stack resources in the CloudFormation User Guide. You can specify either the StackPolicyBody or the StackPol */
  StackPolicyBody?: string;
  /** Location of a file that contains the stack policy. The URL must point to a policy (maximum size: 16 KB) located in an Amazon S3 bucket in the same Amazon Web Services Region as the stack. The location */
  StackPolicyURL?: string;
}

export interface SetTypeConfigurationInput {
  /** The configuration data for the extension in this account and Region. The configuration data must be formatted as JSON and validate against the extension's schema returned in the Schema response elemen */
  Configuration: string;
  /** An alias by which to refer to this extension configuration data. Conditional: Specifying a configuration alias is required when setting a configuration for a resource type extension. */
  ConfigurationAlias?: string;
  /** The type of extension. Conditional: You must specify ConfigurationArn, or Type and TypeName. */
  Type?: 'RESOURCE' | 'MODULE' | 'HOOK';
  /** The Amazon Resource Name (ARN) for the extension in this account and Region. For public extensions, this will be the ARN assigned when you call the ActivateType API operation in this account and Regio */
  TypeArn?: string;
  /** The name of the extension. Conditional: You must specify ConfigurationArn, or Type and TypeName. */
  TypeName?: string;
}

export interface SetTypeDefaultVersionInput {
  /** The Amazon Resource Name (ARN) of the extension for which you want version summary information. Conditional: You must specify either TypeName and Type, or Arn. */
  Arn?: string;
  /** The kind of extension. Conditional: You must specify either TypeName and Type, or Arn. */
  Type?: 'RESOURCE' | 'MODULE' | 'HOOK';
  /** The name of the extension. Conditional: You must specify either TypeName and Type, or Arn. */
  TypeName?: string;
  /** The ID of a specific version of the extension. The version ID is the value at the end of the Amazon Resource Name (ARN) assigned to the extension version when it is registered. */
  VersionId?: string;
}

/** The input for the SignalResource action. */
export interface SignalResourceInput {
  /** The logical ID of the resource that you want to signal. The logical ID is the name of the resource that given in the template. */
  LogicalResourceId: string;
  /** The stack name or unique stack ID that includes the resource that you want to signal. */
  StackName: string;
  /** The status of the signal, which is either success or failure. A failure signal causes CloudFormation to immediately fail the stack creation or update. */
  Status: 'SUCCESS' | 'FAILURE';
  /** A unique ID of the signal. When you signal Amazon EC2 instances or Amazon EC2 Auto Scaling groups, specify the instance ID that you are signaling as the unique ID. If you send multiple signals to a si */
  UniqueId: string;
}

export interface StartResourceScanInput {
  /** A unique identifier for this StartResourceScan request. Specify this token if you plan to retry requests so that CloudFormation knows that you're not attempting to start a new resource scan. */
  ClientRequestToken?: string;
  /** The scan filters to use. */
  ScanFilters?: ScanFilter[];
}

export interface StopStackSetOperationInput {
  /** The ID of the stack operation. */
  OperationId: string;
  /** The name or unique ID of the StackSet that you want to stop the operation for. */
  StackSetName: string;
  /** Specifies whether you are acting as an account administrator in the organization's management account or as a delegated administrator in a member account. Valid only if the StackSet uses service-manag */
  CallAs?: 'SELF' | 'DELEGATED_ADMIN';
}

export interface TestTypeInput {
  /** The Amazon Resource Name (ARN) of the extension. Conditional: You must specify Arn, or TypeName and Type. */
  Arn?: string;
  /** The S3 bucket to which CloudFormation delivers the contract test execution logs. CloudFormation delivers the logs by the time contract testing has completed and the extension has been assigned a test  */
  LogDeliveryBucket?: string;
  /** The type of the extension to test. Conditional: You must specify Arn, or TypeName and Type. */
  Type?: 'RESOURCE' | 'MODULE' | 'HOOK';
  /** The name of the extension to test. Conditional: You must specify Arn, or TypeName and Type. */
  TypeName?: string;
  /** The version of the extension to test. You can specify the version id with either Arn, or with TypeName and Type. If you don't specify a version, CloudFormation uses the default version of the extensio */
  VersionId?: string;
}

export interface UpdateGeneratedTemplateInput {
  /** The name or Amazon Resource Name (ARN) of a generated template. */
  GeneratedTemplateName: string;
  /** An optional list of resources to be added to the generated template. */
  AddResources?: ResourceDefinition[];
  /** An optional new name to assign to the generated template. */
  NewGeneratedTemplateName?: string;
  /** If true, update the resource properties in the generated template with their current live state. This feature is useful when the resource properties in your generated a template does not reflect the l */
  RefreshAllResources?: boolean;
  /** A list of logical ids for resources to remove from the generated template. */
  RemoveResources?: string[];
  /** The configuration details of the generated template, including the DeletionPolicy and UpdateReplacePolicy. */
  TemplateConfiguration?: TemplateConfiguration;
}

/** The input for an UpdateStack action. */
export interface UpdateStackInput {
  /** The name or unique stack ID of the stack to update. */
  StackName: string;
  /** In some cases, you must explicitly acknowledge that your stack template contains certain capabilities in order for CloudFormation to update the stack. CAPABILITY_IAM and CAPABILITY_NAMED_IAM Some stac */
  Capabilities?: 'CAPABILITY_IAM' | 'CAPABILITY_NAMED_IAM' | 'CAPABILITY_AUTO_EXPAND'[];
  /** A unique identifier for this UpdateStack request. Specify this token if you plan to retry requests so that CloudFormation knows that you're not attempting to update a stack with the same name. You mig */
  ClientRequestToken?: string;
  /** Preserve the state of previously provisioned resources when an operation fails. Default: False */
  DisableRollback?: boolean;
  /** Amazon Simple Notification Service topic Amazon Resource Names (ARNs) that CloudFormation associates with the stack. Specify an empty list to remove all notification topics. */
  NotificationARNs?: string[];
  /** A list of Parameter structures that specify input parameters for the stack. For more information, see the Parameter data type. */
  Parameters?: Parameter[];
  /** Specifies which resource types you can work with, such as AWS::EC2::Instance or Custom::MyCustomInstance. If the list of resource types doesn't include a resource that you're updating, the stack updat */
  ResourceTypes?: string[];
  /** When set to true, newly created resources are deleted when the operation rolls back. This includes newly created resources marked with a deletion policy of Retain. Default: false */
  RetainExceptOnCreate?: boolean;
  /** The Amazon Resource Name (ARN) of an IAM role that CloudFormation assumes to update the stack. CloudFormation uses the role's credentials to make calls on your behalf. CloudFormation always uses this  */
  RoleARN?: string;
  /** The rollback triggers for CloudFormation to monitor during stack creation and updating operations, and for the specified monitoring period afterwards. */
  RollbackConfiguration?: RollbackConfiguration;
  /** Structure that contains a new stack policy body. You can specify either the StackPolicyBody or the StackPolicyURL parameter, but not both. You might update the stack policy, for example, in order to p */
  StackPolicyBody?: string;
  /** Structure that contains the temporary overriding stack policy body. You can specify either the StackPolicyDuringUpdateBody or the StackPolicyDuringUpdateURL parameter, but not both. If you want to upd */
  StackPolicyDuringUpdateBody?: string;
  /** Location of a file that contains the temporary overriding stack policy. The URL must point to a policy (max size: 16KB) located in an S3 bucket in the same Region as the stack. The location for an Ama */
  StackPolicyDuringUpdateURL?: string;
  /** Location of a file that contains the updated stack policy. The URL must point to a policy (max size: 16KB) located in an S3 bucket in the same Region as the stack. The location for an Amazon S3 bucket */
  StackPolicyURL?: string;
  /** Key-value pairs to associate with this stack. CloudFormation also propagates these tags to supported resources in the stack. You can specify a maximum number of 50 tags. If you don't specify this para */
  Tags?: Tag[];
  /** Structure that contains the template body with a minimum length of 1 byte and a maximum length of 51,200 bytes. Conditional: You must specify only one of the following parameters: TemplateBody, Templa */
  TemplateBody?: string;
  /** The URL of a file that contains the template body. The URL must point to a template that's located in an Amazon S3 bucket or a Systems Manager document. The location for an Amazon S3 bucket must start */
  TemplateURL?: string;
  /** Reuse the existing template that is associated with the stack that you are updating. When using templates with the AWS::LanguageExtensions transform, provide the template instead of using UsePreviousT */
  UsePreviousTemplate?: boolean;
}

export interface UpdateStackInstancesInput {
  /** The names of one or more Amazon Web Services Regions in which you want to update parameter values for stack instances. The overridden parameter values will be applied to all stack instances in the spe */
  Regions: string[];
  /** The name or unique ID of the StackSet associated with the stack instances. */
  StackSetName: string;
  /** [Self-managed permissions] The account IDs of one or more Amazon Web Services accounts in which you want to update parameter values for stack instances. The overridden parameter values will be applied */
  Accounts?: string[];
  /** [Service-managed permissions] Specifies whether you are acting as an account administrator in the organization's management account or as a delegated administrator in a member account. By default, SEL */
  CallAs?: 'SELF' | 'DELEGATED_ADMIN';
  /** [Service-managed permissions] The Organizations accounts in which you want to update parameter values for stack instances. If your update targets OUs, the overridden parameter values only apply to the */
  DeploymentTargets?: DeploymentTargets;
  /** The unique identifier for this StackSet operation. The operation ID also functions as an idempotency token, to ensure that CloudFormation performs the StackSet operation only once, even if you retry t */
  OperationId?: string;
  /** Preferences for how CloudFormation performs this StackSet operation. */
  OperationPreferences?: StackSetOperationPreferences;
  /** A list of input parameters whose values you want to update for the specified stack instances. Any overridden parameter values will be applied to all stack instances in the specified accounts and Amazo */
  ParameterOverrides?: Parameter[];
}

export interface UpdateStackSetInput {
  /** The name or unique ID of the StackSet that you want to update. */
  StackSetName: string;
  /** [Self-managed permissions] The accounts in which to update associated stack instances. If you specify accounts, you must also specify the Amazon Web Services Regions in which to update StackSet instan */
  Accounts?: string[];
  /** [Self-managed permissions] The Amazon Resource Name (ARN) of the IAM role to use to update this StackSet. Specify an IAM role only if you are using customized administrator roles to control which user */
  AdministrationRoleARN?: string;
  /** [Service-managed permissions] Describes whether StackSets automatically deploys to Organizations accounts that are added to a target organization or organizational unit (OU). For more information, see */
  AutoDeployment?: AutoDeployment;
  /** [Service-managed permissions] Specifies whether you are acting as an account administrator in the organization's management account or as a delegated administrator in a member account. By default, SEL */
  CallAs?: 'SELF' | 'DELEGATED_ADMIN';
  /** In some cases, you must explicitly acknowledge that your stack template contains certain capabilities in order for CloudFormation to update the StackSet and its associated stack instances. CAPABILITY_ */
  Capabilities?: 'CAPABILITY_IAM' | 'CAPABILITY_NAMED_IAM' | 'CAPABILITY_AUTO_EXPAND'[];
  /** [Service-managed permissions] The Organizations accounts in which to update associated stack instances. To update all the stack instances associated with this StackSet, do not specify DeploymentTarget */
  DeploymentTargets?: DeploymentTargets;
  /** A brief description of updates that you are making. */
  Description?: string;
  /** [Self-managed permissions] The name of the IAM execution role to use to update the stack set. If you do not specify an execution role, CloudFormation uses the AWSCloudFormationStackSetExecutionRole ro */
  ExecutionRoleName?: string;
  /** Describes whether CloudFormation performs non-conflicting operations concurrently and queues conflicting operations. */
  ManagedExecution?: ManagedExecution;
  /** The unique ID for this StackSet operation. The operation ID also functions as an idempotency token, to ensure that CloudFormation performs the StackSet operation only once, even if you retry the reque */
  OperationId?: string;
  /** Preferences for how CloudFormation performs this StackSet operation. */
  OperationPreferences?: StackSetOperationPreferences;
  /** A list of input parameters for the StackSet template. */
  Parameters?: Parameter[];
  /** Describes how the IAM roles required for StackSet operations are created. You cannot modify PermissionModel if there are stack instances associated with your stack set. With self-managed permissions,  */
  PermissionModel?: 'SERVICE_MANAGED' | 'SELF_MANAGED';
  /** The Amazon Web Services Regions in which to update associated stack instances. If you specify Regions, you must also specify accounts in which to update StackSet instances. To update all the stack ins */
  Regions?: string[];
  /** The key-value pairs to associate with this StackSet and the stacks created from it. CloudFormation also propagates these tags to supported resources that are created in the stacks. You can specify a m */
  Tags?: Tag[];
  /** The structure that contains the template body, with a minimum length of 1 byte and a maximum length of 51,200 bytes. Conditional: You must specify only one of the following parameters: TemplateBody or */
  TemplateBody?: string;
  /** The URL of a file that contains the template body. The URL must point to a template (maximum size: 1 MB) that is located in an Amazon S3 bucket or a Systems Manager document. The location for an Amazo */
  TemplateURL?: string;
  /** Use the existing template that's associated with the StackSet that you're updating. Conditional: You must specify only one of the following parameters: TemplateBody or TemplateURL—or set UsePreviousTe */
  UsePreviousTemplate?: boolean;
}

export interface UpdateTerminationProtectionInput {
  /** Whether to enable termination protection on the specified stack. */
  EnableTerminationProtection: boolean;
  /** The name or unique ID of the stack for which you want to set termination protection. */
  StackName: string;
}

/** The input for ValidateTemplate action. */
export interface ValidateTemplateInput {
  /** Structure that contains the template body with a minimum length of 1 byte and a maximum length of 51,200 bytes. Conditional: You must pass TemplateURL or TemplateBody. If both are passed, only Templat */
  TemplateBody?: string;
  /** The URL of a file that contains the template body. The URL must point to a template (max size: 1 MB) that is located in an Amazon S3 bucket or a Systems Manager document. The location for an Amazon S3 */
  TemplateURL?: string;
}

/** CloudFormation service binding for Step Functions SDK integrations. */
export class CloudFormation {
  constructor() {}

  activateOrganizationsAccess<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  activateType<T>(params: ActivateTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchDescribeTypeConfigurations<T>(params: BatchDescribeTypeConfigurationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelUpdateStack<T>(params: CancelUpdateStackInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  continueUpdateRollback<T>(params: ContinueUpdateRollbackInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createChangeSet<T>(params: CreateChangeSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createGeneratedTemplate<T>(params: CreateGeneratedTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createStack<T>(params: CreateStackInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createStackInstances<T>(params: CreateStackInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createStackRefactor<T>(params: CreateStackRefactorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createStackSet<T>(params: CreateStackSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deactivateOrganizationsAccess<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deactivateType<T>(params: DeactivateTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteChangeSet<T>(params: DeleteChangeSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteGeneratedTemplate<T>(params: DeleteGeneratedTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteStack<T>(params: DeleteStackInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteStackInstances<T>(params: DeleteStackInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteStackSet<T>(params: DeleteStackSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deregisterType<T>(params: DeregisterTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAccountLimits<T>(params: DescribeAccountLimitsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeChangeSet<T>(params: DescribeChangeSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeChangeSetHooks<T>(params: DescribeChangeSetHooksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEvents<T>(params: DescribeEventsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeGeneratedTemplate<T>(params: DescribeGeneratedTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeOrganizationsAccess<T>(params: DescribeOrganizationsAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePublisher<T>(params: DescribePublisherInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeResourceScan<T>(params: DescribeResourceScanInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStackDriftDetectionStatus<T>(params: DescribeStackDriftDetectionStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStackEvents<T>(params: DescribeStackEventsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStackInstance<T>(params: DescribeStackInstanceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStackRefactor<T>(params: DescribeStackRefactorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStackResource<T>(params: DescribeStackResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStackResourceDrifts<T>(params: DescribeStackResourceDriftsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStackResources<T>(params: DescribeStackResourcesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStacks<T>(params: DescribeStacksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStackSet<T>(params: DescribeStackSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStackSetOperation<T>(params: DescribeStackSetOperationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeType<T>(params: DescribeTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTypeRegistration<T>(params: DescribeTypeRegistrationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detectStackDrift<T>(params: DetectStackDriftInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detectStackResourceDrift<T>(params: DetectStackResourceDriftInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detectStackSetDrift<T>(params: DetectStackSetDriftInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  estimateTemplateCost<T>(params: EstimateTemplateCostInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  executeChangeSet<T>(params: ExecuteChangeSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  executeStackRefactor<T>(params: ExecuteStackRefactorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getGeneratedTemplate<T>(params: GetGeneratedTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getHookResult<T>(params: GetHookResultInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getStackPolicy<T>(params: GetStackPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTemplate<T>(params: GetTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getTemplateSummary<T>(params: GetTemplateSummaryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  importStacksToStackSet<T>(params: ImportStacksToStackSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listChangeSets<T>(params: ListChangeSetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listExports<T>(params: ListExportsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listGeneratedTemplates<T>(params: ListGeneratedTemplatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listHookResults<T>(params: ListHookResultsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listImports<T>(params: ListImportsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listResourceScanRelatedResources<T>(params: ListResourceScanRelatedResourcesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listResourceScanResources<T>(params: ListResourceScanResourcesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listResourceScans<T>(params: ListResourceScansInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStackInstanceResourceDrifts<T>(params: ListStackInstanceResourceDriftsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStackInstances<T>(params: ListStackInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStackRefactorActions<T>(params: ListStackRefactorActionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStackRefactors<T>(params: ListStackRefactorsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStackResources<T>(params: ListStackResourcesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStacks<T>(params: ListStacksInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStackSetAutoDeploymentTargets<T>(params: ListStackSetAutoDeploymentTargetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStackSetOperationResults<T>(params: ListStackSetOperationResultsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStackSetOperations<T>(params: ListStackSetOperationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStackSets<T>(params: ListStackSetsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTypeRegistrations<T>(params: ListTypeRegistrationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTypes<T>(params: ListTypesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTypeVersions<T>(params: ListTypeVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  publishType<T>(params: PublishTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  recordHandlerProgress<T>(params: RecordHandlerProgressInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  registerPublisher<T>(params: RegisterPublisherInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  registerType<T>(params: RegisterTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rollbackStack<T>(params: RollbackStackInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  setStackPolicy<T>(params: SetStackPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  setTypeConfiguration<T>(params: SetTypeConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  setTypeDefaultVersion<T>(params: SetTypeDefaultVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  signalResource<T>(params: SignalResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startResourceScan<T>(params: StartResourceScanInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopStackSetOperation<T>(params: StopStackSetOperationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  testType<T>(params: TestTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateGeneratedTemplate<T>(params: UpdateGeneratedTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateStack<T>(params: UpdateStackInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateStackInstances<T>(params: UpdateStackInstancesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateStackSet<T>(params: UpdateStackSetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateTerminationProtection<T>(params: UpdateTerminationProtectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  validateTemplate<T>(params: ValidateTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
