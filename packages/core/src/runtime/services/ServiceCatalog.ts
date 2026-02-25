// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface ServiceActionAssociation {
  /** The self-service action identifier. For example, act-fs7abcd89wxyz. */
  ServiceActionId: string;
  /** The product identifier. For example, prod-abcdzk7xy33qa. */
  ProductId: string;
  /** The identifier of the provisioning artifact. For example, pa-4abcdjnxjj6ne. */
  ProvisioningArtifactId: string;
}

export interface Tag {
  /** The tag key. */
  Key: string;
  /** The value for this key. */
  Value: string;
}

export interface OrganizationNode {
  /** The organization node type. */
  Type?: 'ORGANIZATION' | 'ORGANIZATIONAL_UNIT' | 'ACCOUNT';
  /** The identifier of the organization node. */
  Value?: string;
}

export interface ProvisioningArtifactProperties {
  /** The name of the provisioning artifact (for example, v1 v2beta). No spaces are allowed. */
  Name?: string;
  /** The description of the provisioning artifact, including how it differs from the previous provisioning artifact. */
  Description?: string;
  /** Specify the template source with one of the following options, but not both. Keys accepted: [ LoadTemplateFromURL, ImportFromPhysicalId ] The URL of the CloudFormation template in Amazon S3 or GitHub  */
  Info?: Record<string, string>;
  /** The type of provisioning artifact. CLOUD_FORMATION_TEMPLATE - CloudFormation template TERRAFORM_OPEN_SOURCE - Terraform Open Source configuration file TERRAFORM_CLOUD - Terraform Cloud configuration f */
  Type?: 'CLOUD_FORMATION_TEMPLATE' | 'MARKETPLACE_AMI' | 'MARKETPLACE_CAR' | 'TERRAFORM_OPEN_SOURCE' | 'TERRAFORM_CLOUD' | 'EXTERNAL';
  /** If set to true, Service Catalog stops validating the specified provisioning artifact even if it is invalid. Service Catalog does not support template validation for the TERRAFORM_OS product type. */
  DisableTemplateValidation?: boolean;
}

export interface SourceConnectionParameters {
  /** Provides ConnectionType details. */
  CodeStar?: any;
}

export interface SourceConnection {
  /** The only supported SourceConnection type is Codestar. */
  Type?: 'CODESTAR';
  /** The connection details based on the connection Type. */
  ConnectionParameters: SourceConnectionParameters;
}

export interface UpdateProvisioningParameter {
  /** The parameter key. */
  Key?: string;
  /** The parameter value. */
  Value?: string;
  /** If set to true, Value is ignored and the previous parameter value is kept. */
  UsePreviousValue?: boolean;
}

export interface AccessLevelFilter {
  /** The access level. Account - Filter results based on the account. Role - Filter results based on the federated role of the specified user. User - Filter results based on the specified user. */
  Key?: 'Account' | 'Role' | 'User';
  /** The user to which the access level applies. The only supported value is self. */
  Value?: string;
}

export interface ListRecordHistorySearchFilter {
  /** The filter key. product - Filter results based on the specified product identifier. provisionedproduct - Filter results based on the provisioned product identifier. */
  Key?: string;
  /** The filter value. */
  Value?: string;
}

export interface ListTagOptionsFilters {
  /** The TagOption key. */
  Key?: string;
  /** The TagOption value. */
  Value?: string;
  /** The active state. */
  Active?: boolean;
}

export interface UniqueTagResourceIdentifier {
  /** A unique key that's attached to a resource. */
  Key?: string;
  /** A unique value that's attached to a resource. */
  Value?: string;
}

export interface EngineWorkflowResourceIdentifier {
  /** The unique key-value pair for a tag that identifies provisioned product resources. */
  UniqueTag?: UniqueTagResourceIdentifier;
}

export interface RecordOutput {
  /** The output key. */
  OutputKey?: string;
  /** The output value. */
  OutputValue?: string;
  /** The description of the output. */
  Description?: string;
}

export interface ProvisioningParameter {
  /** The parameter key. */
  Key?: string;
  /** The parameter value. */
  Value?: string;
}

export interface ProvisioningPreferences {
  /** One or more Amazon Web Services accounts where the provisioned product will be available. Applicable only to a CFN_STACKSET provisioned product type. The specified accounts should be within the list o */
  StackSetAccounts?: string[];
  /** One or more Amazon Web Services Regions where the provisioned product will be available. Applicable only to a CFN_STACKSET provisioned product type. The specified Regions should be within the list of  */
  StackSetRegions?: string[];
  /** The number of accounts, per Region, for which this operation can fail before Service Catalog stops the operation in that Region. If the operation is stopped in a Region, Service Catalog doesn't attemp */
  StackSetFailureToleranceCount?: number;
  /** The percentage of accounts, per Region, for which this stack operation can fail before Service Catalog stops the operation in that Region. If the operation is stopped in a Region, Service Catalog does */
  StackSetFailureTolerancePercentage?: number;
  /** The maximum number of accounts in which to perform this operation at one time. This is dependent on the value of StackSetFailureToleranceCount. StackSetMaxConcurrentCount is at most one more than the  */
  StackSetMaxConcurrencyCount?: number;
  /** The maximum percentage of accounts in which to perform this operation at one time. When calculating the number of accounts based on the specified percentage, Service Catalog rounds down to the next wh */
  StackSetMaxConcurrencyPercentage?: number;
}

export interface UpdateProvisioningPreferences {
  /** One or more Amazon Web Services accounts that will have access to the provisioned product. Applicable only to a CFN_STACKSET provisioned product type. The Amazon Web Services accounts specified should */
  StackSetAccounts?: string[];
  /** One or more Amazon Web Services Regions where the provisioned product will be available. Applicable only to a CFN_STACKSET provisioned product type. The specified Regions should be within the list of  */
  StackSetRegions?: string[];
  /** The number of accounts, per Region, for which this operation can fail before Service Catalog stops the operation in that Region. If the operation is stopped in a Region, Service Catalog doesn't attemp */
  StackSetFailureToleranceCount?: number;
  /** The percentage of accounts, per Region, for which this stack operation can fail before Service Catalog stops the operation in that Region. If the operation is stopped in a Region, Service Catalog does */
  StackSetFailureTolerancePercentage?: number;
  /** The maximum number of accounts in which to perform this operation at one time. This is dependent on the value of StackSetFailureToleranceCount. StackSetMaxConcurrentCount is at most one more than the  */
  StackSetMaxConcurrencyCount?: number;
  /** The maximum percentage of accounts in which to perform this operation at one time. When calculating the number of accounts based on the specified percentage, Service Catalog rounds down to the next wh */
  StackSetMaxConcurrencyPercentage?: number;
  /** Determines what action Service Catalog performs to a stack set or a stack instance represented by the provisioned product. The default value is UPDATE if nothing is specified. Applicable only to a CFN */
  StackSetOperationType?: 'CREATE' | 'UPDATE' | 'DELETE';
}

export interface AcceptPortfolioShareInput {
  /** The portfolio identifier. */
  PortfolioId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The type of shared portfolios to accept. The default is to accept imported portfolios. AWS_ORGANIZATIONS - Accept portfolios shared by the management account of your organization. IMPORTED - Accept im */
  PortfolioShareType?: 'IMPORTED' | 'AWS_SERVICECATALOG' | 'AWS_ORGANIZATIONS';
}

export interface AssociateBudgetWithResourceInput {
  /** The name of the budget you want to associate. */
  BudgetName: string;
  /** The resource identifier. Either a portfolio-id or a product-id. */
  ResourceId: string;
}

export interface AssociatePrincipalWithPortfolioInput {
  /** The portfolio identifier. */
  PortfolioId: string;
  /** The ARN of the principal (user, role, or group). If the PrincipalType is IAM, the supported value is a fully defined IAM Amazon Resource Name (ARN). If the PrincipalType is IAM_PATTERN, the supported  */
  PrincipalARN: string;
  /** The principal type. The supported value is IAM if you use a fully defined Amazon Resource Name (ARN), or IAM_PATTERN if you use an ARN with no accountID, with or without wildcard characters. */
  PrincipalType: 'IAM' | 'IAM_PATTERN';
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
}

export interface AssociateProductWithPortfolioInput {
  /** The portfolio identifier. */
  PortfolioId: string;
  /** The product identifier. */
  ProductId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The identifier of the source portfolio. */
  SourcePortfolioId?: string;
}

export interface AssociateServiceActionWithProvisioningArtifactInput {
  /** The product identifier. For example, prod-abcdzk7xy33qa. */
  ProductId: string;
  /** The identifier of the provisioning artifact. For example, pa-4abcdjnxjj6ne. */
  ProvisioningArtifactId: string;
  /** The self-service action identifier. For example, act-fs7abcd89wxyz. */
  ServiceActionId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** A unique identifier that you provide to ensure idempotency. If multiple requests from the same Amazon Web Services account use the same idempotency token, the same response is returned for each repeat */
  IdempotencyToken?: string;
}

export interface AssociateTagOptionWithResourceInput {
  /** The resource identifier. */
  ResourceId: string;
  /** The TagOption identifier. */
  TagOptionId: string;
}

export interface BatchAssociateServiceActionWithProvisioningArtifactInput {
  /** One or more associations, each consisting of the Action ID, the Product ID, and the Provisioning Artifact ID. */
  ServiceActionAssociations: ServiceActionAssociation[];
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
}

export interface BatchDisassociateServiceActionFromProvisioningArtifactInput {
  /** One or more associations, each consisting of the Action ID, the Product ID, and the Provisioning Artifact ID. */
  ServiceActionAssociations: ServiceActionAssociation[];
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
}

export interface CopyProductInput {
  /** A unique identifier that you provide to ensure idempotency. If multiple requests differ only by the idempotency token, the same response is returned for each repeated request. */
  IdempotencyToken: string;
  /** The Amazon Resource Name (ARN) of the source product. */
  SourceProductArn: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The copy options. If the value is CopyTags, the tags from the source product are copied to the target product. */
  CopyOptions?: 'CopyTags'[];
  /** The identifiers of the provisioning artifacts (also known as versions) of the product to copy. By default, all provisioning artifacts are copied. */
  SourceProvisioningArtifactIdentifiers?: Record<string, string>[];
  /** The identifier of the target product. By default, a new product is created. */
  TargetProductId?: string;
  /** A name for the target product. The default is the name of the source product. */
  TargetProductName?: string;
}

export interface CreateConstraintInput {
  /** A unique identifier that you provide to ensure idempotency. If multiple requests differ only by the idempotency token, the same response is returned for each repeated request. */
  IdempotencyToken: string;
  /** The constraint parameters, in JSON format. The syntax depends on the constraint type as follows: LAUNCH You are required to specify either the RoleArn or the LocalRoleName but can't use both. Specify  */
  Parameters: string;
  /** The portfolio identifier. */
  PortfolioId: string;
  /** The product identifier. */
  ProductId: string;
  /** The type of constraint. LAUNCH NOTIFICATION RESOURCE_UPDATE STACKSET TEMPLATE */
  Type: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The description of the constraint. */
  Description?: string;
}

export interface CreatePortfolioInput {
  /** The name to use for display purposes. */
  DisplayName: string;
  /** A unique identifier that you provide to ensure idempotency. If multiple requests differ only by the idempotency token, the same response is returned for each repeated request. */
  IdempotencyToken: string;
  /** The name of the portfolio provider. */
  ProviderName: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The description of the portfolio. */
  Description?: string;
  /** One or more tags. */
  Tags?: Tag[];
}

export interface CreatePortfolioShareInput {
  /** The portfolio identifier. */
  PortfolioId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The Amazon Web Services account ID. For example, 123456789012. */
  AccountId?: string;
  /** The organization node to whom you are going to share. When you pass OrganizationNode, it creates PortfolioShare for all of the Amazon Web Services accounts that are associated to the OrganizationNode. */
  OrganizationNode?: OrganizationNode;
  /** This parameter is only supported for portfolios with an OrganizationalNode Type of ORGANIZATION or ORGANIZATIONAL_UNIT. Enables or disables Principal sharing when creating the portfolio share. If you  */
  SharePrincipals?: boolean;
  /** Enables or disables TagOptions sharing when creating the portfolio share. If this flag is not provided, TagOptions sharing is disabled. */
  ShareTagOptions?: boolean;
}

export interface CreateProductInput {
  /** A unique identifier that you provide to ensure idempotency. If multiple requests differ only by the idempotency token, the same response is returned for each repeated request. */
  IdempotencyToken: string;
  /** The name of the product. */
  Name: string;
  /** The owner of the product. */
  Owner: string;
  /** The type of product. */
  ProductType: 'CLOUD_FORMATION_TEMPLATE' | 'MARKETPLACE' | 'TERRAFORM_OPEN_SOURCE' | 'TERRAFORM_CLOUD' | 'EXTERNAL';
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The description of the product. */
  Description?: string;
  /** The distributor of the product. */
  Distributor?: string;
  /** The configuration of the provisioning artifact. */
  ProvisioningArtifactParameters?: ProvisioningArtifactProperties;
  /** Specifies connection details for the created product and syncs the product to the connection source artifact. This automatically manages the product's artifacts based on changes to the source. The Sou */
  SourceConnection?: SourceConnection;
  /** The support information about the product. */
  SupportDescription?: string;
  /** The contact email for product support. */
  SupportEmail?: string;
  /** The contact URL for product support. ^https?:\/\// / is the pattern used to validate SupportUrl. */
  SupportUrl?: string;
  /** One or more tags. */
  Tags?: Tag[];
}

export interface CreateProvisionedProductPlanInput {
  /** A unique identifier that you provide to ensure idempotency. If multiple requests differ only by the idempotency token, the same response is returned for each repeated request. */
  IdempotencyToken: string;
  /** The name of the plan. */
  PlanName: string;
  /** The plan type. */
  PlanType: 'CLOUDFORMATION';
  /** The product identifier. */
  ProductId: string;
  /** A user-friendly name for the provisioned product. This value must be unique for the Amazon Web Services account and cannot be updated after the product is provisioned. */
  ProvisionedProductName: string;
  /** The identifier of the provisioning artifact. */
  ProvisioningArtifactId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** Passed to CloudFormation. The SNS topic ARNs to which to publish stack-related events. */
  NotificationArns?: string[];
  /** The path identifier of the product. This value is optional if the product has a default path, and required if the product has more than one path. To list the paths for a product, use ListLaunchPaths. */
  PathId?: string;
  /** Parameters specified by the administrator that are required for provisioning the product. */
  ProvisioningParameters?: UpdateProvisioningParameter[];
  /** One or more tags. If the plan is for an existing provisioned product, the product must have a RESOURCE_UPDATE constraint with TagUpdatesOnProvisionedProduct set to ALLOWED to allow tag updates. */
  Tags?: Tag[];
}

export interface CreateProvisioningArtifactInput {
  /** A unique identifier that you provide to ensure idempotency. If multiple requests differ only by the idempotency token, the same response is returned for each repeated request. */
  IdempotencyToken: string;
  /** The configuration for the provisioning artifact. */
  Parameters: ProvisioningArtifactProperties;
  /** The product identifier. */
  ProductId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
}

export interface CreateServiceActionInput {
  /** The self-service action definition. Can be one of the following: Name The name of the Amazon Web Services Systems Manager document (SSM document). For example, AWS-RestartEC2Instance. If you are using */
  Definition: Record<string, string>;
  /** The service action definition type. For example, SSM_AUTOMATION. */
  DefinitionType: 'SSM_AUTOMATION';
  /** A unique identifier that you provide to ensure idempotency. If multiple requests differ only by the idempotency token, the same response is returned for each repeated request. */
  IdempotencyToken: string;
  /** The self-service action name. */
  Name: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The self-service action description. */
  Description?: string;
}

export interface CreateTagOptionInput {
  /** The TagOption key. */
  Key: string;
  /** The TagOption value. */
  Value: string;
}

export interface DeleteConstraintInput {
  /** The identifier of the constraint. */
  Id: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
}

export interface DeletePortfolioInput {
  /** The portfolio identifier. */
  Id: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
}

export interface DeletePortfolioShareInput {
  /** The portfolio identifier. */
  PortfolioId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The Amazon Web Services account ID. */
  AccountId?: string;
  /** The organization node to whom you are going to stop sharing. */
  OrganizationNode?: OrganizationNode;
}

export interface DeleteProductInput {
  /** The product identifier. */
  Id: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
}

export interface DeleteProvisionedProductPlanInput {
  /** The plan identifier. */
  PlanId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** If set to true, Service Catalog stops managing the specified provisioned product even if it cannot delete the underlying resources. */
  IgnoreErrors?: boolean;
}

export interface DeleteProvisioningArtifactInput {
  /** The product identifier. */
  ProductId: string;
  /** The identifier of the provisioning artifact. */
  ProvisioningArtifactId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
}

export interface DeleteServiceActionInput {
  /** The self-service action identifier. For example, act-fs7abcd89wxyz. */
  Id: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** A unique identifier that you provide to ensure idempotency. If multiple requests from the same Amazon Web Services account use the same idempotency token, the same response is returned for each repeat */
  IdempotencyToken?: string;
}

export interface DeleteTagOptionInput {
  /** The TagOption identifier. */
  Id: string;
}

export interface DescribeConstraintInput {
  /** The identifier of the constraint. */
  Id: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
}

export interface DescribeCopyProductStatusInput {
  /** The token for the copy product operation. This token is returned by CopyProduct. */
  CopyProductToken: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
}

export interface DescribePortfolioInput {
  /** The portfolio identifier. */
  Id: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
}

export interface DescribePortfolioSharesInput {
  /** The unique identifier of the portfolio for which shares will be retrieved. */
  PortfolioId: string;
  /** The type of portfolio share to summarize. This field acts as a filter on the type of portfolio share, which can be one of the following: 1. ACCOUNT - Represents an external account to account share. 2 */
  Type: 'ACCOUNT' | 'ORGANIZATION' | 'ORGANIZATIONAL_UNIT' | 'ORGANIZATION_MEMBER_ACCOUNT';
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
}

export interface DescribePortfolioShareStatusInput {
  /** The token for the portfolio share operation. This token is returned either by CreatePortfolioShare or by DeletePortfolioShare. */
  PortfolioShareToken: string;
}

export interface DescribeProductInput {
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The product identifier. */
  Id?: string;
  /** The product name. */
  Name?: string;
}

export interface DescribeProductAsAdminInput {
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The product identifier. */
  Id?: string;
  /** The product name. */
  Name?: string;
  /** The unique identifier of the shared portfolio that the specified product is associated with. You can provide this parameter to retrieve the shared TagOptions associated with the product. If this param */
  SourcePortfolioId?: string;
}

export interface DescribeProductViewInput {
  /** The product view identifier. */
  Id: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
}

/** DescribeProvisionedProductAPI input structure. AcceptLanguage - [Optional] The language code for localization. Id - [Optional] The provisioned product identifier. Name - [Optional] Another provisioned */
export interface DescribeProvisionedProductInput {
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The provisioned product identifier. You must provide the name or ID, but not both. If you do not provide a name or ID, or you provide both name and ID, an InvalidParametersException will occur. */
  Id?: string;
  /** The name of the provisioned product. You must provide the name or ID, but not both. If you do not provide a name or ID, or you provide both name and ID, an InvalidParametersException will occur. */
  Name?: string;
}

export interface DescribeProvisionedProductPlanInput {
  /** The plan identifier. */
  PlanId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
}

export interface DescribeProvisioningArtifactInput {
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** Indicates if the API call response does or does not include additional details about the provisioning parameters. */
  IncludeProvisioningArtifactParameters?: boolean;
  /** The product identifier. */
  ProductId?: string;
  /** The product name. */
  ProductName?: string;
  /** The identifier of the provisioning artifact. */
  ProvisioningArtifactId?: string;
  /** The provisioning artifact name. */
  ProvisioningArtifactName?: string;
  /** Indicates whether a verbose level of detail is enabled. */
  Verbose?: boolean;
}

export interface DescribeProvisioningParametersInput {
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The path identifier of the product. This value is optional if the product has a default path, and required if the product has more than one path. To list the paths for a product, use ListLaunchPaths.  */
  PathId?: string;
  /** The name of the path. You must provide the name or ID, but not both. */
  PathName?: string;
  /** The product identifier. You must provide the product name or ID, but not both. */
  ProductId?: string;
  /** The name of the product. You must provide the name or ID, but not both. */
  ProductName?: string;
  /** The identifier of the provisioning artifact. You must provide the name or ID, but not both. */
  ProvisioningArtifactId?: string;
  /** The name of the provisioning artifact. You must provide the name or ID, but not both. */
  ProvisioningArtifactName?: string;
}

export interface DescribeRecordInput {
  /** The record identifier of the provisioned product. This identifier is returned by the request operation. */
  Id: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
}

export interface DescribeServiceActionInput {
  /** The self-service action identifier. */
  Id: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
}

export interface DescribeServiceActionExecutionParametersInput {
  /** The identifier of the provisioned product. */
  ProvisionedProductId: string;
  /** The self-service action identifier. */
  ServiceActionId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
}

export interface DescribeTagOptionInput {
  /** The TagOption identifier. */
  Id: string;
}

export interface DisassociateBudgetFromResourceInput {
  /** The name of the budget you want to disassociate. */
  BudgetName: string;
  /** The resource identifier you want to disassociate from. Either a portfolio-id or a product-id. */
  ResourceId: string;
}

export interface DisassociatePrincipalFromPortfolioInput {
  /** The portfolio identifier. */
  PortfolioId: string;
  /** The ARN of the principal (user, role, or group). This field allows an ARN with no accountID with or without wildcard characters if PrincipalType is IAM_PATTERN. */
  PrincipalARN: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The supported value is IAM if you use a fully defined ARN, or IAM_PATTERN if you specify an IAM ARN with no AccountId, with or without wildcard characters. */
  PrincipalType?: 'IAM' | 'IAM_PATTERN';
}

export interface DisassociateProductFromPortfolioInput {
  /** The portfolio identifier. */
  PortfolioId: string;
  /** The product identifier. */
  ProductId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
}

export interface DisassociateServiceActionFromProvisioningArtifactInput {
  /** The product identifier. For example, prod-abcdzk7xy33qa. */
  ProductId: string;
  /** The identifier of the provisioning artifact. For example, pa-4abcdjnxjj6ne. */
  ProvisioningArtifactId: string;
  /** The self-service action identifier. For example, act-fs7abcd89wxyz. */
  ServiceActionId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** A unique identifier that you provide to ensure idempotency. If multiple requests from the same Amazon Web Services account use the same idempotency token, the same response is returned for each repeat */
  IdempotencyToken?: string;
}

export interface DisassociateTagOptionFromResourceInput {
  /** The resource identifier. */
  ResourceId: string;
  /** The TagOption identifier. */
  TagOptionId: string;
}

export interface ExecuteProvisionedProductPlanInput {
  /** A unique identifier that you provide to ensure idempotency. If multiple requests differ only by the idempotency token, the same response is returned for each repeated request. */
  IdempotencyToken: string;
  /** The plan identifier. */
  PlanId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
}

export interface ExecuteProvisionedProductServiceActionInput {
  /** An idempotency token that uniquely identifies the execute request. */
  ExecuteToken: string;
  /** The identifier of the provisioned product. */
  ProvisionedProductId: string;
  /** The self-service action identifier. For example, act-fs7abcd89wxyz. */
  ServiceActionId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** A map of all self-service action parameters and their values. If a provided parameter is of a special type, such as TARGET, the provided value will override the default value generated by Service Cata */
  Parameters?: Record<string, string[]>;
}

export interface GetProvisionedProductOutputsInput {
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The list of keys that the API should return with their values. If none are provided, the API will return all outputs of the provisioned product. */
  OutputKeys?: string[];
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
  /** The identifier of the provisioned product that you want the outputs from. */
  ProvisionedProductId?: string;
  /** The name of the provisioned product that you want the outputs from. */
  ProvisionedProductName?: string;
}

export interface ImportAsProvisionedProductInput {
  /** A unique identifier that you provide to ensure idempotency. If multiple requests differ only by the idempotency token, the same response is returned for each repeated request. */
  IdempotencyToken: string;
  /** The unique identifier of the resource to be imported. It only currently supports CloudFormation stack IDs. */
  PhysicalId: string;
  /** The product identifier. */
  ProductId: string;
  /** The user-friendly name of the provisioned product. The value must be unique for the Amazon Web Services account. The name cannot be updated after the product is provisioned. */
  ProvisionedProductName: string;
  /** The identifier of the provisioning artifact. */
  ProvisioningArtifactId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
}

export interface ListAcceptedPortfolioSharesInput {
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
  /** The type of shared portfolios to list. The default is to list imported portfolios. AWS_ORGANIZATIONS - List portfolios accepted and shared via organizational sharing by the management account or deleg */
  PortfolioShareType?: 'IMPORTED' | 'AWS_SERVICECATALOG' | 'AWS_ORGANIZATIONS';
}

export interface ListBudgetsForResourceInput {
  /** The resource identifier. */
  ResourceId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
}

export interface ListConstraintsForPortfolioInput {
  /** The portfolio identifier. */
  PortfolioId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
  /** The product identifier. */
  ProductId?: string;
}

export interface ListLaunchPathsInput {
  /** The product identifier. */
  ProductId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
}

export interface ListOrganizationPortfolioAccessInput {
  /** The organization node type that will be returned in the output. ORGANIZATION - Organization that has access to the portfolio. ORGANIZATIONAL_UNIT - Organizational unit that has access to the portfolio */
  OrganizationNodeType: 'ORGANIZATION' | 'ORGANIZATIONAL_UNIT' | 'ACCOUNT';
  /** The portfolio identifier. For example, port-2abcdext3y5fk. */
  PortfolioId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
}

export interface ListPortfolioAccessInput {
  /** The portfolio identifier. */
  PortfolioId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The ID of an organization node the portfolio is shared with. All children of this node with an inherited portfolio share will be returned. */
  OrganizationParentId?: string;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
}

export interface ListPortfoliosInput {
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
}

export interface ListPortfoliosForProductInput {
  /** The product identifier. */
  ProductId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
}

export interface ListPrincipalsForPortfolioInput {
  /** The portfolio identifier. */
  PortfolioId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
}

export interface ListProvisionedProductPlansInput {
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The access level to use to obtain results. The default is User. */
  AccessLevelFilter?: AccessLevelFilter;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
  /** The product identifier. */
  ProvisionProductId?: string;
}

export interface ListProvisioningArtifactsInput {
  /** The product identifier. */
  ProductId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
}

export interface ListProvisioningArtifactsForServiceActionInput {
  /** The self-service action identifier. For example, act-fs7abcd89wxyz. */
  ServiceActionId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
}

export interface ListRecordHistoryInput {
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The access level to use to obtain results. The default is User. */
  AccessLevelFilter?: AccessLevelFilter;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
  /** The search filter to scope the results. */
  SearchFilter?: ListRecordHistorySearchFilter;
}

export interface ListResourcesForTagOptionInput {
  /** The TagOption identifier. */
  TagOptionId: string;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
  /** The resource type. Portfolio Product */
  ResourceType?: string;
}

export interface ListServiceActionsInput {
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
}

export interface ListServiceActionsForProvisioningArtifactInput {
  /** The product identifier. For example, prod-abcdzk7xy33qa. */
  ProductId: string;
  /** The identifier of the provisioning artifact. For example, pa-4abcdjnxjj6ne. */
  ProvisioningArtifactId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
}

export interface ListStackInstancesForProvisionedProductInput {
  /** The identifier of the provisioned product. */
  ProvisionedProductId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
}

export interface ListTagOptionsInput {
  /** The search filters. If no search filters are specified, the output includes all TagOptions. */
  Filters?: ListTagOptionsFilters;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
}

export interface NotifyProvisionProductEngineWorkflowResultInput {
  /** The idempotency token that identifies the provisioning engine execution. */
  IdempotencyToken: string;
  /** The identifier of the record. */
  RecordId: string;
  /** The status of the provisioning engine execution. */
  Status: 'SUCCEEDED' | 'FAILED';
  /** The encrypted contents of the provisioning engine execution payload that Service Catalog sends after the Terraform product provisioning workflow starts. */
  WorkflowToken: string;
  /** The reason why the provisioning engine execution failed. */
  FailureReason?: string;
  /** The output of the provisioning engine execution. */
  Outputs?: RecordOutput[];
  /** The ID for the provisioned product resources that are part of a resource group. */
  ResourceIdentifier?: EngineWorkflowResourceIdentifier;
}

export interface NotifyTerminateProvisionedProductEngineWorkflowResultInput {
  /** The idempotency token that identifies the terminate engine execution. */
  IdempotencyToken: string;
  /** The identifier of the record. */
  RecordId: string;
  /** The status of the terminate engine execution. */
  Status: 'SUCCEEDED' | 'FAILED';
  /** The encrypted contents of the terminate engine execution payload that Service Catalog sends after the Terraform product terminate workflow starts. */
  WorkflowToken: string;
  /** The reason why the terminate engine execution failed. */
  FailureReason?: string;
}

export interface NotifyUpdateProvisionedProductEngineWorkflowResultInput {
  /** The idempotency token that identifies the update engine execution. */
  IdempotencyToken: string;
  /** The identifier of the record. */
  RecordId: string;
  /** The status of the update engine execution. */
  Status: 'SUCCEEDED' | 'FAILED';
  /** The encrypted contents of the update engine execution payload that Service Catalog sends after the Terraform product update workflow starts. */
  WorkflowToken: string;
  /** The reason why the update engine execution failed. */
  FailureReason?: string;
  /** The output of the update engine execution. */
  Outputs?: RecordOutput[];
}

export interface ProvisionProductInput {
  /** A user-friendly name for the provisioned product. This value must be unique for the Amazon Web Services account and cannot be updated after the product is provisioned. */
  ProvisionedProductName: string;
  /** An idempotency token that uniquely identifies the provisioning request. */
  ProvisionToken: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** Passed to CloudFormation. The SNS topic ARNs to which to publish stack-related events. */
  NotificationArns?: string[];
  /** The path identifier of the product. This value is optional if the product has a default path, and required if the product has more than one path. To list the paths for a product, use ListLaunchPaths.  */
  PathId?: string;
  /** The name of the path. You must provide the name or ID, but not both. */
  PathName?: string;
  /** The product identifier. You must provide the name or ID, but not both. */
  ProductId?: string;
  /** The name of the product. You must provide the name or ID, but not both. */
  ProductName?: string;
  /** The identifier of the provisioning artifact. You must provide the name or ID, but not both. */
  ProvisioningArtifactId?: string;
  /** The name of the provisioning artifact. You must provide the name or ID, but not both. */
  ProvisioningArtifactName?: string;
  /** Parameters specified by the administrator that are required for provisioning the product. */
  ProvisioningParameters?: ProvisioningParameter[];
  /** An object that contains information about the provisioning preferences for a stack set. */
  ProvisioningPreferences?: ProvisioningPreferences;
  /** One or more tags. */
  Tags?: Tag[];
}

export interface RejectPortfolioShareInput {
  /** The portfolio identifier. */
  PortfolioId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The type of shared portfolios to reject. The default is to reject imported portfolios. AWS_ORGANIZATIONS - Reject portfolios shared by the management account of your organization. IMPORTED - Reject im */
  PortfolioShareType?: 'IMPORTED' | 'AWS_SERVICECATALOG' | 'AWS_ORGANIZATIONS';
}

export interface ScanProvisionedProductsInput {
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The access level to use to obtain results. The default is User. */
  AccessLevelFilter?: AccessLevelFilter;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
}

export interface SearchProductsInput {
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The search filters. If no search filters are specified, the output includes all products to which the caller has access. */
  Filters?: Record<string, string[]>;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
  /** The sort field. If no value is specified, the results are not sorted. */
  SortBy?: 'Title' | 'VersionCount' | 'CreationDate';
  /** The sort order. If no value is specified, the results are not sorted. */
  SortOrder?: 'ASCENDING' | 'DESCENDING';
}

export interface SearchProductsAsAdminInput {
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The search filters. If no search filters are specified, the output includes all products to which the administrator has access. */
  Filters?: Record<string, string[]>;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
  /** The portfolio identifier. */
  PortfolioId?: string;
  /** Access level of the source of the product. */
  ProductSource?: 'ACCOUNT';
  /** The sort field. If no value is specified, the results are not sorted. */
  SortBy?: 'Title' | 'VersionCount' | 'CreationDate';
  /** The sort order. If no value is specified, the results are not sorted. */
  SortOrder?: 'ASCENDING' | 'DESCENDING';
}

export interface SearchProvisionedProductsInput {
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The access level to use to obtain results. The default is Account. */
  AccessLevelFilter?: AccessLevelFilter;
  /** The search filters. When the key is SearchQuery, the searchable fields are arn, createdTime, id, lastRecordId, idempotencyToken, name, physicalId, productId, provisioningArtifactId, type, status, tags */
  Filters?: Record<string, string[]>;
  /** The maximum number of items to return with this call. */
  PageSize?: number;
  /** The page token for the next set of results. To retrieve the first set of results, use null. */
  PageToken?: string;
  /** The sort field. If no value is specified, the results are not sorted. The valid values are arn, id, name, and lastRecordId. */
  SortBy?: string;
  /** The sort order. If no value is specified, the results are not sorted. */
  SortOrder?: 'ASCENDING' | 'DESCENDING';
}

export interface TerminateProvisionedProductInput {
  /** An idempotency token that uniquely identifies the termination request. This token is only valid during the termination process. After the provisioned product is terminated, subsequent requests to term */
  TerminateToken: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** If set to true, Service Catalog stops managing the specified provisioned product even if it cannot delete the underlying resources. */
  IgnoreErrors?: boolean;
  /** The identifier of the provisioned product. You cannot specify both ProvisionedProductName and ProvisionedProductId. */
  ProvisionedProductId?: string;
  /** The name of the provisioned product. You cannot specify both ProvisionedProductName and ProvisionedProductId. */
  ProvisionedProductName?: string;
  /** When this boolean parameter is set to true, the TerminateProvisionedProduct API deletes the Service Catalog provisioned product. However, it does not remove the CloudFormation stack, stack set, or the */
  RetainPhysicalResources?: boolean;
}

export interface UpdateConstraintInput {
  /** The identifier of the constraint. */
  Id: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The updated description of the constraint. */
  Description?: string;
  /** The constraint parameters, in JSON format. The syntax depends on the constraint type as follows: LAUNCH You are required to specify either the RoleArn or the LocalRoleName but can't use both. Specify  */
  Parameters?: string;
}

export interface UpdatePortfolioInput {
  /** The portfolio identifier. */
  Id: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The tags to add. */
  AddTags?: Tag[];
  /** The updated description of the portfolio. */
  Description?: string;
  /** The name to use for display purposes. */
  DisplayName?: string;
  /** The updated name of the portfolio provider. */
  ProviderName?: string;
  /** The tags to remove. */
  RemoveTags?: string[];
}

export interface UpdatePortfolioShareInput {
  /** The unique identifier of the portfolio for which the share will be updated. */
  PortfolioId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The Amazon Web Services account Id of the recipient account. This field is required when updating an external account to account type share. */
  AccountId?: string;
  OrganizationNode?: OrganizationNode;
  /** A flag to enables or disables Principals sharing in the portfolio. If this field is not provided, the current state of the Principals sharing on the portfolio share will not be modified. */
  SharePrincipals?: boolean;
  /** Enables or disables TagOptions sharing for the portfolio share. If this field is not provided, the current state of TagOptions sharing on the portfolio share will not be modified. */
  ShareTagOptions?: boolean;
}

export interface UpdateProductInput {
  /** The product identifier. */
  Id: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The tags to add to the product. */
  AddTags?: Tag[];
  /** The updated description of the product. */
  Description?: string;
  /** The updated distributor of the product. */
  Distributor?: string;
  /** The updated product name. */
  Name?: string;
  /** The updated owner of the product. */
  Owner?: string;
  /** The tags to remove from the product. */
  RemoveTags?: string[];
  /** Specifies connection details for the updated product and syncs the product to the connection source artifact. This automatically manages the product's artifacts based on changes to the source. The Sou */
  SourceConnection?: SourceConnection;
  /** The updated support description for the product. */
  SupportDescription?: string;
  /** The updated support email for the product. */
  SupportEmail?: string;
  /** The updated support URL for the product. */
  SupportUrl?: string;
}

export interface UpdateProvisionedProductInput {
  /** The idempotency token that uniquely identifies the provisioning update request. */
  UpdateToken: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** The path identifier. This value is optional if the product has a default path, and required if the product has more than one path. You must provide the name or ID, but not both. */
  PathId?: string;
  /** The name of the path. You must provide the name or ID, but not both. */
  PathName?: string;
  /** The identifier of the product. You must provide the name or ID, but not both. */
  ProductId?: string;
  /** The name of the product. You must provide the name or ID, but not both. */
  ProductName?: string;
  /** The identifier of the provisioned product. You must provide the name or ID, but not both. */
  ProvisionedProductId?: string;
  /** The name of the provisioned product. You cannot specify both ProvisionedProductName and ProvisionedProductId. */
  ProvisionedProductName?: string;
  /** The identifier of the provisioning artifact. */
  ProvisioningArtifactId?: string;
  /** The name of the provisioning artifact. You must provide the name or ID, but not both. */
  ProvisioningArtifactName?: string;
  /** The new parameters. */
  ProvisioningParameters?: UpdateProvisioningParameter[];
  /** An object that contains information about the provisioning preferences for a stack set. */
  ProvisioningPreferences?: UpdateProvisioningPreferences;
  /** One or more tags. Requires the product to have RESOURCE_UPDATE constraint with TagUpdatesOnProvisionedProduct set to ALLOWED to allow tag updates. */
  Tags?: Tag[];
}

export interface UpdateProvisionedProductPropertiesInput {
  /** The idempotency token that uniquely identifies the provisioning product update request. */
  IdempotencyToken: string;
  /** The identifier of the provisioned product. */
  ProvisionedProductId: string;
  /** A map that contains the provisioned product properties to be updated. The LAUNCH_ROLE key accepts role ARNs. This key allows an administrator to call UpdateProvisionedProductProperties to update the l */
  ProvisionedProductProperties: Record<string, string>;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
}

export interface UpdateProvisioningArtifactInput {
  /** The product identifier. */
  ProductId: string;
  /** The identifier of the provisioning artifact. */
  ProvisioningArtifactId: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** Indicates whether the product version is active. Inactive provisioning artifacts are invisible to end users. End users cannot launch or update a provisioned product from an inactive provisioning artif */
  Active?: boolean;
  /** The updated description of the provisioning artifact. */
  Description?: string;
  /** Information set by the administrator to provide guidance to end users about which provisioning artifacts to use. The DEFAULT value indicates that the product version is active. The administrator can s */
  Guidance?: 'DEFAULT' | 'DEPRECATED';
  /** The updated name of the provisioning artifact. */
  Name?: string;
}

export interface UpdateServiceActionInput {
  /** The self-service action identifier. */
  Id: string;
  /** The language code. jp - Japanese zh - Chinese */
  AcceptLanguage?: string;
  /** A map that defines the self-service action. */
  Definition?: Record<string, string>;
  /** The self-service action description. */
  Description?: string;
  /** The self-service action name. */
  Name?: string;
}

export interface UpdateTagOptionInput {
  /** The TagOption identifier. */
  Id: string;
  /** The updated active state. */
  Active?: boolean;
  /** The updated value. */
  Value?: string;
}

/** Service Catalog service binding for Step Functions SDK integrations. */
export class ServiceCatalog {
  constructor() {}

  acceptPortfolioShare<T>(params: AcceptPortfolioShareInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateBudgetWithResource<T>(params: AssociateBudgetWithResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associatePrincipalWithPortfolio<T>(params: AssociatePrincipalWithPortfolioInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateProductWithPortfolio<T>(params: AssociateProductWithPortfolioInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateServiceActionWithProvisioningArtifact<T>(params: AssociateServiceActionWithProvisioningArtifactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateTagOptionWithResource<T>(params: AssociateTagOptionWithResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchAssociateServiceActionWithProvisioningArtifact<T>(params: BatchAssociateServiceActionWithProvisioningArtifactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchDisassociateServiceActionFromProvisioningArtifact<T>(params: BatchDisassociateServiceActionFromProvisioningArtifactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  copyProduct<T>(params: CopyProductInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createConstraint<T>(params: CreateConstraintInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPortfolio<T>(params: CreatePortfolioInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPortfolioShare<T>(params: CreatePortfolioShareInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createProduct<T>(params: CreateProductInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createProvisionedProductPlan<T>(params: CreateProvisionedProductPlanInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createProvisioningArtifact<T>(params: CreateProvisioningArtifactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createServiceAction<T>(params: CreateServiceActionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createTagOption<T>(params: CreateTagOptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteConstraint<T>(params: DeleteConstraintInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePortfolio<T>(params: DeletePortfolioInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePortfolioShare<T>(params: DeletePortfolioShareInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteProduct<T>(params: DeleteProductInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteProvisionedProductPlan<T>(params: DeleteProvisionedProductPlanInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteProvisioningArtifact<T>(params: DeleteProvisioningArtifactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteServiceAction<T>(params: DeleteServiceActionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteTagOption<T>(params: DeleteTagOptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeConstraint<T>(params: DescribeConstraintInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCopyProductStatus<T>(params: DescribeCopyProductStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePortfolio<T>(params: DescribePortfolioInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePortfolioShares<T>(params: DescribePortfolioSharesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePortfolioShareStatus<T>(params: DescribePortfolioShareStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeProduct<T>(params: DescribeProductInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeProductAsAdmin<T>(params: DescribeProductAsAdminInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeProductView<T>(params: DescribeProductViewInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeProvisionedProduct<T>(params: DescribeProvisionedProductInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeProvisionedProductPlan<T>(params: DescribeProvisionedProductPlanInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeProvisioningArtifact<T>(params: DescribeProvisioningArtifactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeProvisioningParameters<T>(params: DescribeProvisioningParametersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRecord<T>(params: DescribeRecordInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeServiceAction<T>(params: DescribeServiceActionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeServiceActionExecutionParameters<T>(params: DescribeServiceActionExecutionParametersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeTagOption<T>(params: DescribeTagOptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableAWSOrganizationsAccess<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateBudgetFromResource<T>(params: DisassociateBudgetFromResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociatePrincipalFromPortfolio<T>(params: DisassociatePrincipalFromPortfolioInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateProductFromPortfolio<T>(params: DisassociateProductFromPortfolioInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateServiceActionFromProvisioningArtifact<T>(params: DisassociateServiceActionFromProvisioningArtifactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateTagOptionFromResource<T>(params: DisassociateTagOptionFromResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableAWSOrganizationsAccess<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  executeProvisionedProductPlan<T>(params: ExecuteProvisionedProductPlanInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  executeProvisionedProductServiceAction<T>(params: ExecuteProvisionedProductServiceActionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAWSOrganizationsAccessStatus<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getProvisionedProductOutputs<T>(params: GetProvisionedProductOutputsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  importAsProvisionedProduct<T>(params: ImportAsProvisionedProductInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAcceptedPortfolioShares<T>(params: ListAcceptedPortfolioSharesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listBudgetsForResource<T>(params: ListBudgetsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listConstraintsForPortfolio<T>(params: ListConstraintsForPortfolioInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listLaunchPaths<T>(params: ListLaunchPathsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listOrganizationPortfolioAccess<T>(params: ListOrganizationPortfolioAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPortfolioAccess<T>(params: ListPortfolioAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPortfolios<T>(params: ListPortfoliosInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPortfoliosForProduct<T>(params: ListPortfoliosForProductInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPrincipalsForPortfolio<T>(params: ListPrincipalsForPortfolioInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listProvisionedProductPlans<T>(params: ListProvisionedProductPlansInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listProvisioningArtifacts<T>(params: ListProvisioningArtifactsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listProvisioningArtifactsForServiceAction<T>(params: ListProvisioningArtifactsForServiceActionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRecordHistory<T>(params: ListRecordHistoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listResourcesForTagOption<T>(params: ListResourcesForTagOptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listServiceActions<T>(params: ListServiceActionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listServiceActionsForProvisioningArtifact<T>(params: ListServiceActionsForProvisioningArtifactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStackInstancesForProvisionedProduct<T>(params: ListStackInstancesForProvisionedProductInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagOptions<T>(params: ListTagOptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  notifyProvisionProductEngineWorkflowResult<T>(params: NotifyProvisionProductEngineWorkflowResultInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  notifyTerminateProvisionedProductEngineWorkflowResult<T>(params: NotifyTerminateProvisionedProductEngineWorkflowResultInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  notifyUpdateProvisionedProductEngineWorkflowResult<T>(params: NotifyUpdateProvisionedProductEngineWorkflowResultInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  provisionProduct<T>(params: ProvisionProductInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rejectPortfolioShare<T>(params: RejectPortfolioShareInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  scanProvisionedProducts<T>(params: ScanProvisionedProductsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchProducts<T>(params: SearchProductsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchProductsAsAdmin<T>(params: SearchProductsAsAdminInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  searchProvisionedProducts<T>(params: SearchProvisionedProductsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  terminateProvisionedProduct<T>(params: TerminateProvisionedProductInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateConstraint<T>(params: UpdateConstraintInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePortfolio<T>(params: UpdatePortfolioInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePortfolioShare<T>(params: UpdatePortfolioShareInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateProduct<T>(params: UpdateProductInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateProvisionedProduct<T>(params: UpdateProvisionedProductInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateProvisionedProductProperties<T>(params: UpdateProvisionedProductPropertiesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateProvisioningArtifact<T>(params: UpdateProvisioningArtifactInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateServiceAction<T>(params: UpdateServiceActionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateTagOption<T>(params: UpdateTagOptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
