// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface Tag {
  /** The key identifier, or name, of the tag. */
  Key: string;
  /** The string value that's associated with the key of the tag. You can set the value of a tag to an empty string, but you can't set the value of a tag to null. */
  Value: string;
}

export interface HandshakeParty {
  /** ID for the participant: Acccount ID, organization ID, or email address. The regex pattern for handshake ID string requires "h-" followed by from 8 to 32 lowercase letters or digits. */
  Id: string;
  /** The type of ID for the participant. */
  Type: 'ACCOUNT' | 'ORGANIZATION' | 'EMAIL';
}

export interface HandshakeFilter {
  /** The type of handshake. If you specify ActionType, you cannot also specify ParentHandshakeId. */
  ActionType?: 'INVITE' | 'ENABLE_ALL_FEATURES' | 'APPROVE_ALL_FEATURES' | 'ADD_ORGANIZATIONS_SERVICE_LINKED_ROLE' | 'TRANSFER_RESPONSIBILITY';
  /** The parent handshake. Only used for handshake types that are a child of another type. If you specify ParentHandshakeId, you cannot also specify ActionType. The regex pattern for handshake ID string re */
  ParentHandshakeId?: string;
}

export interface AcceptHandshakeInput {
  /** ID for the handshake that you want to accept. The regex pattern for handshake ID string requires "h-" followed by from 8 to 32 lowercase letters or digits. */
  HandshakeId: string;
}

export interface AttachPolicyInput {
  /** ID for the policy that you want to attach to the target. You can get the ID for the policy by calling the ListPolicies operation. The regex pattern for a policy ID string requires "p-" followed by fro */
  PolicyId: string;
  /** ID for the root, OU, or account that you want to attach the policy to. You can get the ID by calling the ListRoots, ListOrganizationalUnitsForParent, or ListAccounts operations. The regex pattern for  */
  TargetId: string;
}

export interface CancelHandshakeInput {
  /** ID for the handshake that you want to cancel. You can get the ID from the ListHandshakesForOrganization operation. The regex pattern for handshake ID string requires "h-" followed by from 8 to 32 lowe */
  HandshakeId: string;
}

export interface CloseAccountInput {
  /** Retrieves the Amazon Web Services account Id for the current CloseAccount API request. */
  AccountId: string;
}

export interface CreateAccountInput {
  /** The friendly name of the member account. */
  AccountName: string;
  /** The email address of the owner to assign to the new member account. This email address must not already be associated with another Amazon Web Services account. You must use a valid email address to co */
  Email: string;
  /** If set to ALLOW, the new account enables IAM users to access account billing information if they have the required permissions. If set to DENY, only the root user of the new account can access account */
  IamUserAccessToBilling?: 'ALLOW' | 'DENY';
  /** The name of an IAM role that Organizations automatically preconfigures in the new member account. This role trusts the management account, allowing users in the management account to assume the role,  */
  RoleName?: string;
  /** A list of tags that you want to attach to the newly created account. For each tag in the list, you must specify both a tag key and a value. You can set the value to an empty string, but you can't set  */
  Tags?: Tag[];
}

export interface CreateGovCloudAccountInput {
  /** The friendly name of the member account. The account name can consist of only the characters [a-z],[A-Z],[0-9], hyphen (-), or dot (.) You can't separate characters with a dash (–). */
  AccountName: string;
  /** Specifies the email address of the owner to assign to the new member account in the commercial Region. This email address must not already be associated with another Amazon Web Services account. You m */
  Email: string;
  /** If set to ALLOW, the new linked account in the commercial Region enables IAM users to access account billing information if they have the required permissions. If set to DENY, only the root user of th */
  IamUserAccessToBilling?: 'ALLOW' | 'DENY';
  /** (Optional) The name of an IAM role that Organizations automatically preconfigures in the new member accounts in both the Amazon Web Services GovCloud (US) Region and in the commercial Region. This rol */
  RoleName?: string;
  /** A list of tags that you want to attach to the newly created account. These tags are attached to the commercial account associated with the GovCloud account, and not to the GovCloud account itself. To  */
  Tags?: Tag[];
}

export interface CreateOrganizationInput {
  /** Specifies the feature set supported by the new organization. Each feature set supports different levels of functionality. CONSOLIDATED_BILLING: All member accounts have their bills consolidated to and */
  FeatureSet?: 'ALL' | 'CONSOLIDATED_BILLING';
}

export interface CreateOrganizationalUnitInput {
  /** The friendly name to assign to the new OU. */
  Name: string;
  /** ID for the parent root or OU that you want to create the new OU in. The regex pattern for a parent ID string requires one of the following: Root - A string that begins with "r-" followed by from 4 to  */
  ParentId: string;
  /** A list of tags that you want to attach to the newly created OU. For each tag in the list, you must specify both a tag key and a value. You can set the value to an empty string, but you can't set it to */
  Tags?: Tag[];
}

export interface CreatePolicyInput {
  /** The policy text content to add to the new policy. The text that you supply must adhere to the rules of the policy type you specify in the Type parameter. The maximum size of a policy document depends  */
  Content: string;
  /** An optional description to assign to the policy. */
  Description: string;
  /** The friendly name to assign to the policy. The regex pattern that is used to validate this parameter is a string of any of the characters in the ASCII character range. */
  Name: string;
  /** The type of policy to create. You can specify one of the following values: SERVICE_CONTROL_POLICY RESOURCE_CONTROL_POLICY DECLARATIVE_POLICY_EC2 BACKUP_POLICY TAG_POLICY CHATBOT_POLICY AISERVICES_OPT_ */
  Type: 'SERVICE_CONTROL_POLICY' | 'RESOURCE_CONTROL_POLICY' | 'TAG_POLICY' | 'BACKUP_POLICY' | 'AISERVICES_OPT_OUT_POLICY' | 'CHATBOT_POLICY' | 'DECLARATIVE_POLICY_EC2' | 'SECURITYHUB_POLICY' | 'INSPECTOR_POLICY' | 'UPGRADE_ROLLOUT_POLICY' | 'BEDROCK_POLICY' | 'S3_POLICY' | 'NETWORK_SECURITY_DIRECTOR_POLICY';
  /** A list of tags that you want to attach to the newly created policy. For each tag in the list, you must specify both a tag key and a value. You can set the value to an empty string, but you can't set i */
  Tags?: Tag[];
}

export interface DeclineHandshakeInput {
  /** ID for the handshake that you want to decline. You can get the ID from the ListHandshakesForAccount operation. The regex pattern for handshake ID string requires "h-" followed by from 8 to 32 lowercas */
  HandshakeId: string;
}

export interface DeleteOrganizationalUnitInput {
  /** ID for the organizational unit that you want to delete. You can get the ID from the ListOrganizationalUnitsForParent operation. The regex pattern for an organizational unit ID string requires "ou-" fo */
  OrganizationalUnitId: string;
}

export interface DeletePolicyInput {
  /** ID for the policy that you want to delete. You can get the ID from the ListPolicies or ListPoliciesForTarget operations. The regex pattern for a policy ID string requires "p-" followed by from 8 to 12 */
  PolicyId: string;
}

export interface DeregisterDelegatedAdministratorInput {
  /** The account ID number of the member account in the organization that you want to deregister as a delegated administrator. */
  AccountId: string;
  /** The service principal name of an Amazon Web Services service for which the account is a delegated administrator. Delegated administrator privileges are revoked for only the specified Amazon Web Servic */
  ServicePrincipal: string;
}

export interface DescribeAccountInput {
  /** The unique identifier (ID) of the Amazon Web Services account that you want information about. You can get the ID from the ListAccounts or ListAccountsForParent operations. The regex pattern for an ac */
  AccountId: string;
}

export interface DescribeCreateAccountStatusInput {
  /** Specifies the Id value that uniquely identifies the CreateAccount request. You can get the value from the CreateAccountStatus.Id response in an earlier CreateAccount request, or from the ListCreateAcc */
  CreateAccountRequestId: string;
}

export interface DescribeEffectivePolicyInput {
  /** The type of policy that you want information about. You can specify one of the following values: DECLARATIVE_POLICY_EC2 BACKUP_POLICY TAG_POLICY CHATBOT_POLICY AISERVICES_OPT_OUT_POLICY SECURITYHUB_PO */
  PolicyType: 'TAG_POLICY' | 'BACKUP_POLICY' | 'AISERVICES_OPT_OUT_POLICY' | 'CHATBOT_POLICY' | 'DECLARATIVE_POLICY_EC2' | 'SECURITYHUB_POLICY' | 'INSPECTOR_POLICY' | 'UPGRADE_ROLLOUT_POLICY' | 'BEDROCK_POLICY' | 'S3_POLICY' | 'NETWORK_SECURITY_DIRECTOR_POLICY';
  /** When you're signed in as the management account, specify the ID of the account that you want details about. Specifying an organization root or organizational unit (OU) as the target is not supported. */
  TargetId?: string;
}

export interface DescribeHandshakeInput {
  /** ID for the handshake that you want information about. The regex pattern for handshake ID string requires "h-" followed by from 8 to 32 lowercase letters or digits. */
  HandshakeId: string;
}

export interface DescribeOrganizationalUnitInput {
  /** ID for the organizational unit that you want details about. You can get the ID from the ListOrganizationalUnitsForParent operation. The regex pattern for an organizational unit ID string requires "ou- */
  OrganizationalUnitId: string;
}

export interface DescribePolicyInput {
  /** ID for the policy that you want details about. You can get the ID from the ListPolicies or ListPoliciesForTarget operations. The regex pattern for a policy ID string requires "p-" followed by from 8 t */
  PolicyId: string;
}

export interface DescribeResponsibilityTransferInput {
  /** ID for the transfer. */
  Id: string;
}

export interface DetachPolicyInput {
  /** ID for the policy you want to detach. You can get the ID from the ListPolicies or ListPoliciesForTarget operations. The regex pattern for a policy ID string requires "p-" followed by from 8 to 128 low */
  PolicyId: string;
  /** ID for the root, OU, or account that you want to detach the policy from. You can get the ID from the ListRoots, ListOrganizationalUnitsForParent, or ListAccounts operations. The regex pattern for a ta */
  TargetId: string;
}

export interface DisableAWSServiceAccessInput {
  /** The service principal name of the Amazon Web Services service for which you want to disable integration with your organization. This is typically in the form of a URL, such as service-abbreviation.ama */
  ServicePrincipal: string;
}

export interface DisablePolicyTypeInput {
  /** The policy type that you want to disable in this root. You can specify one of the following values: SERVICE_CONTROL_POLICY RESOURCE_CONTROL_POLICY DECLARATIVE_POLICY_EC2 BACKUP_POLICY TAG_POLICY CHATB */
  PolicyType: 'SERVICE_CONTROL_POLICY' | 'RESOURCE_CONTROL_POLICY' | 'TAG_POLICY' | 'BACKUP_POLICY' | 'AISERVICES_OPT_OUT_POLICY' | 'CHATBOT_POLICY' | 'DECLARATIVE_POLICY_EC2' | 'SECURITYHUB_POLICY' | 'INSPECTOR_POLICY' | 'UPGRADE_ROLLOUT_POLICY' | 'BEDROCK_POLICY' | 'S3_POLICY' | 'NETWORK_SECURITY_DIRECTOR_POLICY';
  /** ID for the root in which you want to disable a policy type. You can get the ID from the ListRoots operation. The regex pattern for a root ID string requires "r-" followed by from 4 to 32 lowercase let */
  RootId: string;
}

export interface EnableAWSServiceAccessInput {
  /** The service principal name of the Amazon Web Services service for which you want to enable integration with your organization. This is typically in the form of a URL, such as service-abbreviation.amaz */
  ServicePrincipal: string;
}

export interface EnablePolicyTypeInput {
  /** The policy type that you want to enable. You can specify one of the following values: SERVICE_CONTROL_POLICY RESOURCE_CONTROL_POLICY DECLARATIVE_POLICY_EC2 BACKUP_POLICY TAG_POLICY CHATBOT_POLICY AISE */
  PolicyType: 'SERVICE_CONTROL_POLICY' | 'RESOURCE_CONTROL_POLICY' | 'TAG_POLICY' | 'BACKUP_POLICY' | 'AISERVICES_OPT_OUT_POLICY' | 'CHATBOT_POLICY' | 'DECLARATIVE_POLICY_EC2' | 'SECURITYHUB_POLICY' | 'INSPECTOR_POLICY' | 'UPGRADE_ROLLOUT_POLICY' | 'BEDROCK_POLICY' | 'S3_POLICY' | 'NETWORK_SECURITY_DIRECTOR_POLICY';
  /** ID for the root in which you want to enable a policy type. You can get the ID from the ListRoots operation. The regex pattern for a root ID string requires "r-" followed by from 4 to 32 lowercase lett */
  RootId: string;
}

export interface InviteAccountToOrganizationInput {
  /** The identifier (ID) of the Amazon Web Services account that you want to invite to join your organization. This is a JSON object that contains the following elements: { "Type": "ACCOUNT", "Id": " accou */
  Target: HandshakeParty;
  /** Additional information that you want to include in the generated email to the recipient account owner. */
  Notes?: string;
  /** A list of tags that you want to attach to the account when it becomes a member of the organization. For each tag in the list, you must specify both a tag key and a value. You can set the value to an e */
  Tags?: Tag[];
}

export interface InviteOrganizationToTransferResponsibilityInput {
  /** Name you want to assign to the transfer. */
  SourceName: string;
  /** Timestamp when the recipient will begin managing the specified responsibilities. */
  StartTimestamp: string;
  /** A HandshakeParty object. Contains details for the account you want to invite. Currently, only ACCOUNT and EMAIL are supported. */
  Target: HandshakeParty;
  /** The type of responsibility you want to designate to your organization. Currently, only BILLING is supported. */
  Type: 'BILLING';
  /** Additional information that you want to include in the invitation. */
  Notes?: string;
  /** A list of tags that you want to attach to the transfer. For each tag in the list, you must specify both a tag key and a value. You can set the value to an empty string, but you can't set it to null. F */
  Tags?: Tag[];
}

export interface ListAccountsInput {
  /** The maximum number of items to return in the response. If more results exist than the specified MaxResults value, a token is included in the response so that you can retrieve the remaining results. */
  MaxResults?: number;
  /** The parameter for receiving additional results if you receive a NextToken response in a previous request. A NextToken response indicates that more output is available. Set this parameter to the value  */
  NextToken?: string;
}

export interface ListAccountsForParentInput {
  /** The unique identifier (ID) for the parent root or organization unit (OU) whose accounts you want to list. */
  ParentId: string;
  /** The maximum number of items to return in the response. If more results exist than the specified MaxResults value, a token is included in the response so that you can retrieve the remaining results. */
  MaxResults?: number;
  /** The parameter for receiving additional results if you receive a NextToken response in a previous request. A NextToken response indicates that more output is available. Set this parameter to the value  */
  NextToken?: string;
}

export interface ListAccountsWithInvalidEffectivePolicyInput {
  /** The type of policy that you want information about. You can specify one of the following values: DECLARATIVE_POLICY_EC2 BACKUP_POLICY TAG_POLICY CHATBOT_POLICY AISERVICES_OPT_OUT_POLICY SECURITYHUB_PO */
  PolicyType: 'TAG_POLICY' | 'BACKUP_POLICY' | 'AISERVICES_OPT_OUT_POLICY' | 'CHATBOT_POLICY' | 'DECLARATIVE_POLICY_EC2' | 'SECURITYHUB_POLICY' | 'INSPECTOR_POLICY' | 'UPGRADE_ROLLOUT_POLICY' | 'BEDROCK_POLICY' | 'S3_POLICY' | 'NETWORK_SECURITY_DIRECTOR_POLICY';
  /** The maximum number of items to return in the response. If more results exist than the specified MaxResults value, a token is included in the response so that you can retrieve the remaining results. */
  MaxResults?: number;
  /** The parameter for receiving additional results if you receive a NextToken response in a previous request. A NextToken response indicates that more output is available. Set this parameter to the value  */
  NextToken?: string;
}

export interface ListAWSServiceAccessForOrganizationInput {
  /** The maximum number of items to return in the response. If more results exist than the specified MaxResults value, a token is included in the response so that you can retrieve the remaining results. */
  MaxResults?: number;
  /** The parameter for receiving additional results if you receive a NextToken response in a previous request. A NextToken response indicates that more output is available. Set this parameter to the value  */
  NextToken?: string;
}

export interface ListChildrenInput {
  /** Filters the output to include only the specified child type. */
  ChildType: 'ACCOUNT' | 'ORGANIZATIONAL_UNIT';
  /** The unique identifier (ID) for the parent root or OU whose children you want to list. The regex pattern for a parent ID string requires one of the following: Root - A string that begins with "r-" foll */
  ParentId: string;
  /** The maximum number of items to return in the response. If more results exist than the specified MaxResults value, a token is included in the response so that you can retrieve the remaining results. */
  MaxResults?: number;
  /** The parameter for receiving additional results if you receive a NextToken response in a previous request. A NextToken response indicates that more output is available. Set this parameter to the value  */
  NextToken?: string;
}

export interface ListCreateAccountStatusInput {
  /** The maximum number of items to return in the response. If more results exist than the specified MaxResults value, a token is included in the response so that you can retrieve the remaining results. */
  MaxResults?: number;
  /** The parameter for receiving additional results if you receive a NextToken response in a previous request. A NextToken response indicates that more output is available. Set this parameter to the value  */
  NextToken?: string;
  /** A list of one or more states that you want included in the response. If this parameter isn't present, all requests are included in the response. */
  States?: 'IN_PROGRESS' | 'SUCCEEDED' | 'FAILED'[];
}

export interface ListDelegatedAdministratorsInput {
  /** The maximum number of items to return in the response. If more results exist than the specified MaxResults value, a token is included in the response so that you can retrieve the remaining results. */
  MaxResults?: number;
  /** The parameter for receiving additional results if you receive a NextToken response in a previous request. A NextToken response indicates that more output is available. Set this parameter to the value  */
  NextToken?: string;
  /** Specifies a service principal name. If specified, then the operation lists the delegated administrators only for the specified service. If you don't specify a service principal, the operation lists al */
  ServicePrincipal?: string;
}

export interface ListDelegatedServicesForAccountInput {
  /** The account ID number of a delegated administrator account in the organization. */
  AccountId: string;
  /** The maximum number of items to return in the response. If more results exist than the specified MaxResults value, a token is included in the response so that you can retrieve the remaining results. */
  MaxResults?: number;
  /** The parameter for receiving additional results if you receive a NextToken response in a previous request. A NextToken response indicates that more output is available. Set this parameter to the value  */
  NextToken?: string;
}

export interface ListEffectivePolicyValidationErrorsInput {
  /** The ID of the account that you want details about. Specifying an organization root or organizational unit (OU) as the target is not supported. */
  AccountId: string;
  /** The type of policy that you want information about. You can specify one of the following values: DECLARATIVE_POLICY_EC2 BACKUP_POLICY TAG_POLICY CHATBOT_POLICY AISERVICES_OPT_OUT_POLICY SECURITYHUB_PO */
  PolicyType: 'TAG_POLICY' | 'BACKUP_POLICY' | 'AISERVICES_OPT_OUT_POLICY' | 'CHATBOT_POLICY' | 'DECLARATIVE_POLICY_EC2' | 'SECURITYHUB_POLICY' | 'INSPECTOR_POLICY' | 'UPGRADE_ROLLOUT_POLICY' | 'BEDROCK_POLICY' | 'S3_POLICY' | 'NETWORK_SECURITY_DIRECTOR_POLICY';
  /** The maximum number of items to return in the response. If more results exist than the specified MaxResults value, a token is included in the response so that you can retrieve the remaining results. */
  MaxResults?: number;
  /** The parameter for receiving additional results if you receive a NextToken response in a previous request. A NextToken response indicates that more output is available. Set this parameter to the value  */
  NextToken?: string;
}

export interface ListHandshakesForAccountInput {
  /** A HandshakeFilter object. Contains the filer used to select the handshakes for an operation. */
  Filter?: HandshakeFilter;
  /** The maximum number of items to return in the response. If more results exist than the specified MaxResults value, a token is included in the response so that you can retrieve the remaining results. */
  MaxResults?: number;
  /** The parameter for receiving additional results if you receive a NextToken response in a previous request. A NextToken response indicates that more output is available. Set this parameter to the value  */
  NextToken?: string;
}

export interface ListHandshakesForOrganizationInput {
  /** A HandshakeFilter object. Contains the filer used to select the handshakes for an operation. */
  Filter?: HandshakeFilter;
  /** The maximum number of items to return in the response. If more results exist than the specified MaxResults value, a token is included in the response so that you can retrieve the remaining results. */
  MaxResults?: number;
  /** The parameter for receiving additional results if you receive a NextToken response in a previous request. A NextToken response indicates that more output is available. Set this parameter to the value  */
  NextToken?: string;
}

export interface ListInboundResponsibilityTransfersInput {
  /** The type of responsibility. Currently, only BILLING is supported. */
  Type: 'BILLING';
  /** ID for the transfer. */
  Id?: string;
  /** The maximum number of items to return in the response. If more results exist than the specified MaxResults value, a token is included in the response so that you can retrieve the remaining results. */
  MaxResults?: number;
  /** The parameter for receiving additional results if you receive a NextToken response in a previous request. A NextToken response indicates that more output is available. Set this parameter to the value  */
  NextToken?: string;
}

export interface ListOrganizationalUnitsForParentInput {
  /** ID for the root or OU whose child OUs you want to list. The regex pattern for a parent ID string requires one of the following: Root - A string that begins with "r-" followed by from 4 to 32 lowercase */
  ParentId: string;
  /** The maximum number of items to return in the response. If more results exist than the specified MaxResults value, a token is included in the response so that you can retrieve the remaining results. */
  MaxResults?: number;
  /** The parameter for receiving additional results if you receive a NextToken response in a previous request. A NextToken response indicates that more output is available. Set this parameter to the value  */
  NextToken?: string;
}

export interface ListOutboundResponsibilityTransfersInput {
  /** The type of responsibility. Currently, only BILLING is supported. */
  Type: 'BILLING';
  /** The maximum number of items to return in the response. If more results exist than the specified MaxResults value, a token is included in the response so that you can retrieve the remaining results. */
  MaxResults?: number;
  /** The parameter for receiving additional results if you receive a NextToken response in a previous request. A NextToken response indicates that more output is available. Set this parameter to the value  */
  NextToken?: string;
}

export interface ListParentsInput {
  /** ID for the OU or account whose parent containers you want to list. Don't specify a root. The regex pattern for a child ID string requires one of the following: Account - A string that consists of exac */
  ChildId: string;
  /** The maximum number of items to return in the response. If more results exist than the specified MaxResults value, a token is included in the response so that you can retrieve the remaining results. */
  MaxResults?: number;
  /** The parameter for receiving additional results if you receive a NextToken response in a previous request. A NextToken response indicates that more output is available. Set this parameter to the value  */
  NextToken?: string;
}

export interface ListPoliciesInput {
  /** Specifies the type of policy that you want to include in the response. You must specify one of the following values: SERVICE_CONTROL_POLICY RESOURCE_CONTROL_POLICY DECLARATIVE_POLICY_EC2 BACKUP_POLICY */
  Filter: 'SERVICE_CONTROL_POLICY' | 'RESOURCE_CONTROL_POLICY' | 'TAG_POLICY' | 'BACKUP_POLICY' | 'AISERVICES_OPT_OUT_POLICY' | 'CHATBOT_POLICY' | 'DECLARATIVE_POLICY_EC2' | 'SECURITYHUB_POLICY' | 'INSPECTOR_POLICY' | 'UPGRADE_ROLLOUT_POLICY' | 'BEDROCK_POLICY' | 'S3_POLICY' | 'NETWORK_SECURITY_DIRECTOR_POLICY';
  /** The maximum number of items to return in the response. If more results exist than the specified MaxResults value, a token is included in the response so that you can retrieve the remaining results. */
  MaxResults?: number;
  /** The parameter for receiving additional results if you receive a NextToken response in a previous request. A NextToken response indicates that more output is available. Set this parameter to the value  */
  NextToken?: string;
}

export interface ListPoliciesForTargetInput {
  /** The type of policy that you want to include in the returned list. You must specify one of the following values: SERVICE_CONTROL_POLICY RESOURCE_CONTROL_POLICY DECLARATIVE_POLICY_EC2 BACKUP_POLICY TAG_ */
  Filter: 'SERVICE_CONTROL_POLICY' | 'RESOURCE_CONTROL_POLICY' | 'TAG_POLICY' | 'BACKUP_POLICY' | 'AISERVICES_OPT_OUT_POLICY' | 'CHATBOT_POLICY' | 'DECLARATIVE_POLICY_EC2' | 'SECURITYHUB_POLICY' | 'INSPECTOR_POLICY' | 'UPGRADE_ROLLOUT_POLICY' | 'BEDROCK_POLICY' | 'S3_POLICY' | 'NETWORK_SECURITY_DIRECTOR_POLICY';
  /** ID for the root, organizational unit, or account whose policies you want to list. The regex pattern for a target ID string requires one of the following: Root - A string that begins with "r-" followed */
  TargetId: string;
  /** The maximum number of items to return in the response. If more results exist than the specified MaxResults value, a token is included in the response so that you can retrieve the remaining results. */
  MaxResults?: number;
  /** The parameter for receiving additional results if you receive a NextToken response in a previous request. A NextToken response indicates that more output is available. Set this parameter to the value  */
  NextToken?: string;
}

export interface ListRootsInput {
  /** The maximum number of items to return in the response. If more results exist than the specified MaxResults value, a token is included in the response so that you can retrieve the remaining results. */
  MaxResults?: number;
  /** The parameter for receiving additional results if you receive a NextToken response in a previous request. A NextToken response indicates that more output is available. Set this parameter to the value  */
  NextToken?: string;
}

export interface ListTagsForResourceInput {
  /** The ID of the resource with the tags to list. You can specify any of the following taggable resources. Amazon Web Services account – specify the account ID number. Organizational unit – specify the OU */
  ResourceId: string;
  /** The parameter for receiving additional results if you receive a NextToken response in a previous request. A NextToken response indicates that more output is available. Set this parameter to the value  */
  NextToken?: string;
}

export interface ListTargetsForPolicyInput {
  /** ID for the policy whose attachments you want to know. The regex pattern for a policy ID string requires "p-" followed by from 8 to 128 lowercase or uppercase letters, digits, or the underscore charact */
  PolicyId: string;
  /** The maximum number of items to return in the response. If more results exist than the specified MaxResults value, a token is included in the response so that you can retrieve the remaining results. */
  MaxResults?: number;
  /** The parameter for receiving additional results if you receive a NextToken response in a previous request. A NextToken response indicates that more output is available. Set this parameter to the value  */
  NextToken?: string;
}

export interface MoveAccountInput {
  /** ID for the account that you want to move. The regex pattern for an account ID string requires exactly 12 digits. */
  AccountId: string;
  /** ID for the root or organizational unit that you want to move the account to. The regex pattern for a parent ID string requires one of the following: Root - A string that begins with "r-" followed by f */
  DestinationParentId: string;
  /** ID for the root or organizational unit that you want to move the account from. The regex pattern for a parent ID string requires one of the following: Root - A string that begins with "r-" followed by */
  SourceParentId: string;
}

export interface PutResourcePolicyInput {
  /** If provided, the new content for the resource policy. The text must be correctly formatted JSON that complies with the syntax for the resource policy's type. For more information, see SCP syntax in th */
  Content: string;
  /** A list of tags that you want to attach to the newly created resource policy. For each tag in the list, you must specify both a tag key and a value. You can set the value to an empty string, but you ca */
  Tags?: Tag[];
}

export interface RegisterDelegatedAdministratorInput {
  /** The account ID number of the member account in the organization to register as a delegated administrator. */
  AccountId: string;
  /** The service principal of the Amazon Web Services service for which you want to make the member account a delegated administrator. */
  ServicePrincipal: string;
}

export interface RemoveAccountFromOrganizationInput {
  /** ID for the member account that you want to remove from the organization. The regex pattern for an account ID string requires exactly 12 digits. */
  AccountId: string;
}

export interface TagResourceInput {
  /** The ID of the resource to add a tag to. You can specify any of the following taggable resources. Amazon Web Services account – specify the account ID number. Organizational unit – specify the OU ID th */
  ResourceId: string;
  /** A list of tags to add to the specified resource. For each tag in the list, you must specify both a tag key and a value. The value can be an empty string, but you can't set it to null. If any one of th */
  Tags: Tag[];
}

export interface TerminateResponsibilityTransferInput {
  /** ID for the transfer. */
  Id: string;
  /** Timestamp when the responsibility transfer is to end. */
  EndTimestamp?: string;
}

export interface UntagResourceInput {
  /** The ID of the resource to remove a tag from. You can specify any of the following taggable resources. Amazon Web Services account – specify the account ID number. Organizational unit – specify the OU  */
  ResourceId: string;
  /** The list of keys for tags to remove from the specified resource. */
  TagKeys: string[];
}

export interface UpdateOrganizationalUnitInput {
  /** ID for the OU that you want to rename. You can get the ID from the ListOrganizationalUnitsForParent operation. The regex pattern for an organizational unit ID string requires "ou-" followed by from 4  */
  OrganizationalUnitId: string;
  /** The new name that you want to assign to the OU. The regex pattern that is used to validate this parameter is a string of any of the characters in the ASCII character range. */
  Name?: string;
}

export interface UpdatePolicyInput {
  /** ID for the policy that you want to update. The regex pattern for a policy ID string requires "p-" followed by from 8 to 128 lowercase or uppercase letters, digits, or the underscore character (_). */
  PolicyId: string;
  /** If provided, the new content for the policy. The text must be correctly formatted JSON that complies with the syntax for the policy's type. For more information, see SCP syntax in the Organizations Us */
  Content?: string;
  /** If provided, the new description for the policy. */
  Description?: string;
  /** If provided, the new name for the policy. The regex pattern that is used to validate this parameter is a string of any of the characters in the ASCII character range. */
  Name?: string;
}

export interface UpdateResponsibilityTransferInput {
  /** ID for the transfer. */
  Id: string;
  /** New name you want to assign to the transfer. */
  Name: string;
}

/** Organizations service binding for Step Functions SDK integrations. */
export class Organizations {
  constructor() {}

  acceptHandshake<T>(params: AcceptHandshakeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  attachPolicy<T>(params: AttachPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  cancelHandshake<T>(params: CancelHandshakeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  closeAccount<T>(params: CloseAccountInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createAccount<T>(params: CreateAccountInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createGovCloudAccount<T>(params: CreateGovCloudAccountInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createOrganization<T>(params: CreateOrganizationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createOrganizationalUnit<T>(params: CreateOrganizationalUnitInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPolicy<T>(params: CreatePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  declineHandshake<T>(params: DeclineHandshakeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteOrganization<T>(): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteOrganizationalUnit<T>(params: DeleteOrganizationalUnitInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePolicy<T>(params: DeletePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteResourcePolicy<T>(): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deregisterDelegatedAdministrator<T>(params: DeregisterDelegatedAdministratorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAccount<T>(params: DescribeAccountInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCreateAccountStatus<T>(params: DescribeCreateAccountStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEffectivePolicy<T>(params: DescribeEffectivePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeHandshake<T>(params: DescribeHandshakeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeOrganization<T>(): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeOrganizationalUnit<T>(params: DescribeOrganizationalUnitInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePolicy<T>(params: DescribePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeResourcePolicy<T>(): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeResponsibilityTransfer<T>(params: DescribeResponsibilityTransferInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detachPolicy<T>(params: DetachPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableAWSServiceAccess<T>(params: DisableAWSServiceAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disablePolicyType<T>(params: DisablePolicyTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableAllFeatures<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableAWSServiceAccess<T>(params: EnableAWSServiceAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enablePolicyType<T>(params: EnablePolicyTypeInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  inviteAccountToOrganization<T>(params: InviteAccountToOrganizationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  inviteOrganizationToTransferResponsibility<T>(params: InviteOrganizationToTransferResponsibilityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  leaveOrganization<T>(): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAccounts<T>(params: ListAccountsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAccountsForParent<T>(params: ListAccountsForParentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAccountsWithInvalidEffectivePolicy<T>(params: ListAccountsWithInvalidEffectivePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAWSServiceAccessForOrganization<T>(params: ListAWSServiceAccessForOrganizationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listChildren<T>(params: ListChildrenInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listCreateAccountStatus<T>(params: ListCreateAccountStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDelegatedAdministrators<T>(params: ListDelegatedAdministratorsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDelegatedServicesForAccount<T>(params: ListDelegatedServicesForAccountInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listEffectivePolicyValidationErrors<T>(params: ListEffectivePolicyValidationErrorsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listHandshakesForAccount<T>(params: ListHandshakesForAccountInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listHandshakesForOrganization<T>(params: ListHandshakesForOrganizationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listInboundResponsibilityTransfers<T>(params: ListInboundResponsibilityTransfersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listOrganizationalUnitsForParent<T>(params: ListOrganizationalUnitsForParentInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listOutboundResponsibilityTransfers<T>(params: ListOutboundResponsibilityTransfersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listParents<T>(params: ListParentsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPolicies<T>(params: ListPoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPoliciesForTarget<T>(params: ListPoliciesForTargetInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRoots<T>(params: ListRootsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTargetsForPolicy<T>(params: ListTargetsForPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  moveAccount<T>(params: MoveAccountInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putResourcePolicy<T>(params: PutResourcePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  registerDelegatedAdministrator<T>(params: RegisterDelegatedAdministratorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeAccountFromOrganization<T>(params: RemoveAccountFromOrganizationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  terminateResponsibilityTransfer<T>(params: TerminateResponsibilityTransferInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateOrganizationalUnit<T>(params: UpdateOrganizationalUnitInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePolicy<T>(params: UpdatePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateResponsibilityTransfer<T>(params: UpdateResponsibilityTransferInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
