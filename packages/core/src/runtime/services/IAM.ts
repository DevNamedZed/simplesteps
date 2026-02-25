// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface DelegationPermission {
  /** This ARN maps to a pre-registered policy content for this partner. See the partner onboarding documentation to understand how to create a delegation template. */
  PolicyTemplateArn?: string;
  /** A list of policy parameters that define the scope and constraints of the delegated permissions. */
  Parameters?: any[];
}

export interface Tag {
  /** The key name that can be used to look up or retrieve the associated value. For example, Department or Cost Center are common choices. */
  Key: string;
  /** The value associated with this tag. For example, tags with a key name of Department could have values such as Human Resources, Accounting, and Support. Tags with a key name of Cost Center might have v */
  Value: string;
}

export interface ContextEntry {
  /** The full name of a condition context key, including the service prefix. For example, aws:SourceIp or s3:VersionId. */
  ContextKeyName?: string;
  /** The value (or values, if the condition context key supports multiple values) to provide to the simulation when the key is referenced by a Condition element in an input policy. */
  ContextKeyValues?: any[];
  /** The data type of the value (or values) specified in the ContextKeyValues parameter. */
  ContextKeyType?: 'string' | 'stringList' | 'numeric' | 'numericList' | 'boolean' | 'booleanList' | 'ip' | 'ipList' | 'binary' | 'binaryList' | 'date' | 'dateList';
}

export interface AcceptDelegationRequestInput {
  /** The unique identifier of the delegation request to accept. */
  DelegationRequestId: string;
}

export interface AddClientIDToOpenIDConnectProviderInput {
  /** The client ID (also known as audience) to add to the IAM OpenID Connect provider resource. */
  ClientID: string;
  /** The Amazon Resource Name (ARN) of the IAM OpenID Connect (OIDC) provider resource to add the client ID to. You can get a list of OIDC provider ARNs by using the ListOpenIDConnectProviders operation. */
  OpenIDConnectProviderArn: string;
}

export interface AddRoleToInstanceProfileInput {
  /** The name of the instance profile to update. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can a */
  InstanceProfileName: string;
  /** The name of the role to add. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any */
  RoleName: string;
}

export interface AddUserToGroupInput {
  /** The name of the group to update. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include */
  GroupName: string;
  /** The name of the user to add. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any */
  UserName: string;
}

export interface AssociateDelegationRequestInput {
  /** The unique identifier of the delegation request to associate. */
  DelegationRequestId: string;
}

export interface AttachGroupPolicyInput {
  /** The name (friendly name, not ARN) of the group to attach the policy to. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characte */
  GroupName: string;
  /** The Amazon Resource Name (ARN) of the IAM policy you want to attach. For more information about ARNs, see Amazon Resource Names (ARNs) in the Amazon Web Services General Reference. */
  PolicyArn: string;
}

export interface AttachRolePolicyInput {
  /** The Amazon Resource Name (ARN) of the IAM policy you want to attach. For more information about ARNs, see Amazon Resource Names (ARNs) in the Amazon Web Services General Reference. */
  PolicyArn: string;
  /** The name (friendly name, not ARN) of the role to attach the policy to. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric character */
  RoleName: string;
}

export interface AttachUserPolicyInput {
  /** The Amazon Resource Name (ARN) of the IAM policy you want to attach. For more information about ARNs, see Amazon Resource Names (ARNs) in the Amazon Web Services General Reference. */
  PolicyArn: string;
  /** The name (friendly name, not ARN) of the IAM user to attach the policy to. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric chara */
  UserName: string;
}

export interface ChangePasswordInput {
  /** The new password. The new password must conform to the Amazon Web Services account's password policy, if one exists. The regex pattern that is used to validate this parameter is a string of characters */
  NewPassword: string;
  /** The IAM user's current password. */
  OldPassword: string;
}

export interface CreateAccessKeyInput {
  /** The name of the IAM user that the new key will belong to. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spa */
  UserName?: string;
}

export interface CreateAccountAliasInput {
  /** The account alias to create. This parameter allows (through its regex pattern) a string of characters consisting of lowercase letters, digits, and dashes. You cannot start or finish with a dash, nor c */
  AccountAlias: string;
}

export interface CreateDelegationRequestInput {
  /** A description of the delegation request. */
  Description: string;
  /** The notification channel for updates about the delegation request. At this time,only SNS topic ARNs are accepted for notification. This topic ARN must have a resource policy granting SNS:Publish permi */
  NotificationChannel: string;
  /** The permissions to be delegated in this delegation request. */
  Permissions: DelegationPermission;
  /** The workflow ID associated with the requestor. This is the unique identifier on the partner side that can be used to track the progress of the request. IAM maintains a uniqueness check on this workflo */
  RequestorWorkflowId: string;
  /** The duration for which the delegated session should remain active, in seconds. The active time window for the session starts when the customer calls the SendDelegationToken API. */
  SessionDuration: number;
  /** Specifies whether the delegation token should only be sent by the owner. This flag prevents any party other than the owner from calling SendDelegationToken API for this delegation request. This behavi */
  OnlySendByOwner?: boolean;
  /** The Amazon Web Services account ID this delegation request is targeted to. If the account ID is not known, this parameter can be omitted, resulting in a request that can be associated by any account.  */
  OwnerAccountId?: string;
  /** The URL to redirect to after the delegation request is processed. This URL is used by the IAM console to show a link to the customer to re-load the partner workflow. */
  RedirectUrl?: string;
  /** A message explaining the reason for the delegation request. Requesters can utilize this field to add a custom note to the delegation request. This field is different from the description such that thi */
  RequestMessage?: string;
}

export interface CreateGroupInput {
  /** The name of the group to create. Do not include the path in this value. IAM user, group, role, and policy names must be unique within the account. Names are not distinguished by case. For example, you */
  GroupName: string;
  /** The path to the group. For more information about paths, see IAM identifiers in the IAM User Guide. This parameter is optional. If it is not included, it defaults to a slash (/). This parameter allows */
  Path?: string;
}

export interface CreateInstanceProfileInput {
  /** The name of the instance profile to create. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can a */
  InstanceProfileName: string;
  /** The path to the instance profile. For more information about paths, see IAM Identifiers in the IAM User Guide. This parameter is optional. If it is not included, it defaults to a slash (/). This param */
  Path?: string;
  /** A list of tags that you want to attach to the newly created IAM instance profile. Each tag consists of a key name and an associated value. For more information about tagging, see Tagging IAM resources */
  Tags?: Tag[];
}

export interface CreateLoginProfileInput {
  /** The new password for the user. This parameter must be omitted when you make the request with an AssumeRoot session. It is required in all other cases. The regex pattern that is used to validate this p */
  Password?: string;
  /** Specifies whether the user is required to set a new password on next sign-in. */
  PasswordResetRequired?: boolean;
  /** The name of the IAM user to create a password for. The user must already exist. This parameter is optional. If no user name is included, it defaults to the principal making the request. When you make  */
  UserName?: string;
}

export interface CreateOpenIDConnectProviderInput {
  /** The URL of the identity provider. The URL must begin with https:// and should correspond to the iss claim in the provider's OpenID Connect ID tokens. Per the OIDC standard, path components are allowed */
  Url: string;
  /** Provides a list of client IDs, also known as audiences. When a mobile or web app registers with an OpenID Connect provider, they establish a value that identifies the application. This is the value th */
  ClientIDList?: string[];
  /** A list of tags that you want to attach to the new IAM OpenID Connect (OIDC) provider. Each tag consists of a key name and an associated value. For more information about tagging, see Tagging IAM resou */
  Tags?: Tag[];
  /** A list of server certificate thumbprints for the OpenID Connect (OIDC) identity provider's server certificates. Typically this list includes only one entry. However, IAM lets you have up to five thumb */
  ThumbprintList?: string[];
}

export interface CreatePolicyInput {
  /** The JSON policy document that you want to use as the content for the new policy. You must provide policies in JSON format in IAM. However, for CloudFormation templates formatted in YAML, you can provi */
  PolicyDocument: string;
  /** The friendly name of the policy. IAM user, group, role, and policy names must be unique within the account. Names are not distinguished by case. For example, you cannot create resources named both "My */
  PolicyName: string;
  /** A friendly description of the policy. Typically used to store information about the permissions defined in the policy. For example, "Grants access to production DynamoDB tables." The policy descriptio */
  Description?: string;
  /** The path for the policy. For more information about paths, see IAM identifiers in the IAM User Guide. This parameter is optional. If it is not included, it defaults to a slash (/). This parameter allo */
  Path?: string;
  /** A list of tags that you want to attach to the new IAM customer managed policy. Each tag consists of a key name and an associated value. For more information about tagging, see Tagging IAM resources in */
  Tags?: Tag[];
}

export interface CreatePolicyVersionInput {
  /** The Amazon Resource Name (ARN) of the IAM policy to which you want to add a new version. For more information about ARNs, see Amazon Resource Names (ARNs) in the Amazon Web Services General Reference. */
  PolicyArn: string;
  /** The JSON policy document that you want to use as the content for this new version of the policy. You must provide policies in JSON format in IAM. However, for CloudFormation templates formatted in YAM */
  PolicyDocument: string;
  /** Specifies whether to set this version as the policy's default version. When this parameter is true, the new policy version becomes the operative version. That is, it becomes the version that is in eff */
  SetAsDefault?: boolean;
}

export interface CreateRoleInput {
  /** The trust relationship policy document that grants an entity permission to assume the role. In IAM, you must provide a JSON policy that has been converted to a string. However, for CloudFormation temp */
  AssumeRolePolicyDocument: string;
  /** The name of the role to create. IAM user, group, role, and policy names must be unique within the account. Names are not distinguished by case. For example, you cannot create resources named both "MyR */
  RoleName: string;
  /** A description of the role. */
  Description?: string;
  /** The maximum session duration (in seconds) that you want to set for the specified role. If you do not specify a value for this setting, the default value of one hour is applied. This setting can have a */
  MaxSessionDuration?: number;
  /** The path to the role. For more information about paths, see IAM Identifiers in the IAM User Guide. This parameter is optional. If it is not included, it defaults to a slash (/). This parameter allows  */
  Path?: string;
  /** The ARN of the managed policy that is used to set the permissions boundary for the role. A permissions boundary policy defines the maximum permissions that identity-based policies can grant to an enti */
  PermissionsBoundary?: string;
  /** A list of tags that you want to attach to the new role. Each tag consists of a key name and an associated value. For more information about tagging, see Tagging IAM resources in the IAM User Guide. If */
  Tags?: Tag[];
}

export interface CreateSAMLProviderInput {
  /** The name of the provider to create. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also incl */
  Name: string;
  /** An XML document generated by an identity provider (IdP) that supports SAML 2.0. The document includes the issuer's name, expiration information, and keys that can be used to validate the SAML authenti */
  SAMLMetadataDocument: string;
  /** The private key generated from your external identity provider. The private key must be a .pem file that uses AES-GCM or AES-CBC encryption algorithm to decrypt SAML assertions. */
  AddPrivateKey?: string;
  /** Specifies the encryption setting for the SAML provider. */
  AssertionEncryptionMode?: 'Required' | 'Allowed';
  /** A list of tags that you want to attach to the new IAM SAML provider. Each tag consists of a key name and an associated value. For more information about tagging, see Tagging IAM resources in the IAM U */
  Tags?: Tag[];
}

export interface CreateServiceLinkedRoleInput {
  /** The service principal for the Amazon Web Services service to which this role is attached. You use a string similar to a URL but without the http:// in front. For example: elasticbeanstalk.amazonaws.co */
  AWSServiceName: string;
  /** A string that you provide, which is combined with the service-provided prefix to form the complete role name. If you make multiple requests for the same service, then you must supply a different Custo */
  CustomSuffix?: string;
  /** The description of the role. */
  Description?: string;
}

export interface CreateServiceSpecificCredentialInput {
  /** The name of the Amazon Web Services service that is to be associated with the credentials. The service you specify here is the only service that can be accessed using these credentials. */
  ServiceName: string;
  /** The name of the IAM user that is to be associated with the credentials. The new service-specific credentials have the same permissions as the associated user except that they can be used only to acces */
  UserName: string;
  /** The number of days until the service specific credential expires. This field is only valid for Bedrock API keys and must be a positive integer. When not specified, the credential will not expire. */
  CredentialAgeDays?: number;
}

export interface CreateUserInput {
  /** The name of the user to create. IAM user, group, role, and policy names must be unique within the account. Names are not distinguished by case. For example, you cannot create resources named both "MyR */
  UserName: string;
  /** The path for the user name. For more information about paths, see IAM identifiers in the IAM User Guide. This parameter is optional. If it is not included, it defaults to a slash (/). This parameter a */
  Path?: string;
  /** The ARN of the managed policy that is used to set the permissions boundary for the user. A permissions boundary policy defines the maximum permissions that identity-based policies can grant to an enti */
  PermissionsBoundary?: string;
  /** A list of tags that you want to attach to the new user. Each tag consists of a key name and an associated value. For more information about tagging, see Tagging IAM resources in the IAM User Guide. If */
  Tags?: Tag[];
}

export interface CreateVirtualMFADeviceInput {
  /** The name of the virtual MFA device, which must be unique. Use with path to uniquely identify a virtual MFA device. This parameter allows (through its regex pattern) a string of characters consisting o */
  VirtualMFADeviceName: string;
  /** The path for the virtual MFA device. For more information about paths, see IAM identifiers in the IAM User Guide. This parameter is optional. If it is not included, it defaults to a slash (/). This pa */
  Path?: string;
  /** A list of tags that you want to attach to the new IAM virtual MFA device. Each tag consists of a key name and an associated value. For more information about tagging, see Tagging IAM resources in the  */
  Tags?: Tag[];
}

export interface DeactivateMFADeviceInput {
  /** The serial number that uniquely identifies the MFA device. For virtual MFA devices, the serial number is the device ARN. This parameter allows (through its regex pattern) a string of characters consis */
  SerialNumber: string;
  /** The name of the user whose MFA device you want to deactivate. This parameter is optional. If no user name is included, it defaults to the principal making the request. When you make this request with  */
  UserName?: string;
}

export interface DeleteAccessKeyInput {
  /** The access key ID for the access key ID and secret access key you want to delete. This parameter allows (through its regex pattern) a string of characters that can consist of any upper or lowercased l */
  AccessKeyId: string;
  /** The name of the user whose access key pair you want to delete. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with n */
  UserName?: string;
}

export interface DeleteAccountAliasInput {
  /** The name of the account alias to delete. This parameter allows (through its regex pattern) a string of characters consisting of lowercase letters, digits, and dashes. You cannot start or finish with a */
  AccountAlias: string;
}

export interface DeleteGroupInput {
  /** The name of the IAM group to delete. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also inc */
  GroupName: string;
}

export interface DeleteGroupPolicyInput {
  /** The name (friendly name, not ARN) identifying the group that the policy is embedded in. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alpha */
  GroupName: string;
  /** The name identifying the policy document to delete. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. Y */
  PolicyName: string;
}

export interface DeleteInstanceProfileInput {
  /** The name of the instance profile to delete. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can a */
  InstanceProfileName: string;
}

export interface DeleteLoginProfileInput {
  /** The name of the user whose password you want to delete. This parameter is optional. If no user name is included, it defaults to the principal making the request. When you make this request with root u */
  UserName?: string;
}

export interface DeleteOpenIDConnectProviderInput {
  /** The Amazon Resource Name (ARN) of the IAM OpenID Connect provider resource object to delete. You can get a list of OpenID Connect provider resource ARNs by using the ListOpenIDConnectProviders operati */
  OpenIDConnectProviderArn: string;
}

export interface DeletePolicyInput {
  /** The Amazon Resource Name (ARN) of the IAM policy you want to delete. For more information about ARNs, see Amazon Resource Names (ARNs) in the Amazon Web Services General Reference. */
  PolicyArn: string;
}

export interface DeletePolicyVersionInput {
  /** The Amazon Resource Name (ARN) of the IAM policy from which you want to delete a version. For more information about ARNs, see Amazon Resource Names (ARNs) in the Amazon Web Services General Reference */
  PolicyArn: string;
  /** The policy version to delete. This parameter allows (through its regex pattern) a string of characters that consists of the lowercase letter 'v' followed by one or two digits, and optionally followed  */
  VersionId: string;
}

export interface DeleteRoleInput {
  /** The name of the role to delete. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include  */
  RoleName: string;
}

export interface DeleteRolePermissionsBoundaryInput {
  /** The name (friendly name, not ARN) of the IAM role from which you want to remove the permissions boundary. */
  RoleName: string;
}

export interface DeleteRolePolicyInput {
  /** The name of the inline policy to delete from the specified IAM role. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters  */
  PolicyName: string;
  /** The name (friendly name, not ARN) identifying the role that the policy is embedded in. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphan */
  RoleName: string;
}

export interface DeleteSAMLProviderInput {
  /** The Amazon Resource Name (ARN) of the SAML provider to delete. */
  SAMLProviderArn: string;
}

export interface DeleteServerCertificateInput {
  /** The name of the server certificate you want to delete. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces */
  ServerCertificateName: string;
}

export interface DeleteServiceLinkedRoleInput {
  /** The name of the service-linked role to be deleted. */
  RoleName: string;
}

export interface DeleteServiceSpecificCredentialInput {
  /** The unique identifier of the service-specific credential. You can get this value by calling ListServiceSpecificCredentials. This parameter allows (through its regex pattern) a string of characters tha */
  ServiceSpecificCredentialId: string;
  /** The name of the IAM user associated with the service-specific credential. If this value is not specified, then the operation assumes the user whose credentials are used to call the operation. This par */
  UserName?: string;
}

export interface DeleteSigningCertificateInput {
  /** The ID of the signing certificate to delete. The format of this parameter, as described by its regex pattern, is a string of characters that can be upper- or lower-cased letters or digits. */
  CertificateId: string;
  /** The name of the user the signing certificate belongs to. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spac */
  UserName?: string;
}

export interface DeleteSSHPublicKeyInput {
  /** The unique identifier for the SSH public key. This parameter allows (through its regex pattern) a string of characters that can consist of any upper or lowercased letter or digit. */
  SSHPublicKeyId: string;
  /** The name of the IAM user associated with the SSH public key. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no  */
  UserName: string;
}

export interface DeleteUserInput {
  /** The name of the user to delete. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include  */
  UserName: string;
}

export interface DeleteUserPermissionsBoundaryInput {
  /** The name (friendly name, not ARN) of the IAM user from which you want to remove the permissions boundary. */
  UserName: string;
}

export interface DeleteUserPolicyInput {
  /** The name identifying the policy document to delete. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. Y */
  PolicyName: string;
  /** The name (friendly name, not ARN) identifying the user that the policy is embedded in. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphan */
  UserName: string;
}

export interface DeleteVirtualMFADeviceInput {
  /** The serial number that uniquely identifies the MFA device. For virtual MFA devices, the serial number is the same as the ARN. This parameter allows (through its regex pattern) a string of characters c */
  SerialNumber: string;
}

export interface DetachGroupPolicyInput {
  /** The name (friendly name, not ARN) of the IAM group to detach the policy from. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric ch */
  GroupName: string;
  /** The Amazon Resource Name (ARN) of the IAM policy you want to detach. For more information about ARNs, see Amazon Resource Names (ARNs) in the Amazon Web Services General Reference. */
  PolicyArn: string;
}

export interface DetachRolePolicyInput {
  /** The Amazon Resource Name (ARN) of the IAM policy you want to detach. For more information about ARNs, see Amazon Resource Names (ARNs) in the Amazon Web Services General Reference. */
  PolicyArn: string;
  /** The name (friendly name, not ARN) of the IAM role to detach the policy from. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric cha */
  RoleName: string;
}

export interface DetachUserPolicyInput {
  /** The Amazon Resource Name (ARN) of the IAM policy you want to detach. For more information about ARNs, see Amazon Resource Names (ARNs) in the Amazon Web Services General Reference. */
  PolicyArn: string;
  /** The name (friendly name, not ARN) of the IAM user to detach the policy from. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric cha */
  UserName: string;
}

export interface EnableMFADeviceInput {
  /** An authentication code emitted by the device. The format for this parameter is a string of six digits. Submit your request immediately after generating the authentication codes. If you generate the co */
  AuthenticationCode1: string;
  /** A subsequent authentication code emitted by the device. The format for this parameter is a string of six digits. Submit your request immediately after generating the authentication codes. If you gener */
  AuthenticationCode2: string;
  /** The serial number that uniquely identifies the MFA device. For virtual MFA devices, the serial number is the device ARN. This parameter allows (through its regex pattern) a string of characters consis */
  SerialNumber: string;
  /** The name of the IAM user for whom you want to enable the MFA device. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters  */
  UserName: string;
}

export interface GenerateOrganizationsAccessReportInput {
  /** The path of the Organizations entity (root, OU, or account). You can build an entity path using the known structure of your organization. For example, assume that your account ID is 123456789012 and i */
  EntityPath: string;
  /** The identifier of the Organizations service control policy (SCP). This parameter is optional. This ID is used to generate information about when an account principal that is limited by the SCP attempt */
  OrganizationsPolicyId?: string;
}

export interface GenerateServiceLastAccessedDetailsInput {
  /** The ARN of the IAM resource (user, group, role, or managed policy) used to generate information about when the resource was last used in an attempt to access an Amazon Web Services service. */
  Arn: string;
  /** The level of detail that you want to generate. You can specify whether you want to generate information about the last attempt to access services or actions. If you specify service-level granularity,  */
  Granularity?: 'SERVICE_LEVEL' | 'ACTION_LEVEL';
}

export interface GetAccessKeyLastUsedInput {
  /** The identifier of an access key. This parameter allows (through its regex pattern) a string of characters that can consist of any upper or lowercased letter or digit. */
  AccessKeyId: string;
}

export interface GetAccountAuthorizationDetailsInput {
  /** A list of entity types used to filter the results. Only the entities that match the types you specify are included in the output. Use the value LocalManagedPolicy to include customer managed policies. */
  Filter?: 'User' | 'Role' | 'Group' | 'LocalManagedPolicy' | 'AWSManagedPolicy'[];
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
}

export interface GetContextKeysForCustomPolicyInput {
  /** A list of policies for which you want the list of context keys referenced in those policies. Each document is specified as a string containing the complete, valid JSON text of an IAM policy. The regex */
  PolicyInputList: string[];
}

export interface GetContextKeysForPrincipalPolicyInput {
  /** The ARN of a user, group, or role whose policies contain the context keys that you want listed. If you specify a user, the list includes context keys that are found in all policies that are attached t */
  PolicySourceArn: string;
  /** An optional list of additional policies for which you want the list of context keys that are referenced. The regex pattern used to validate this parameter is a string of characters consisting of the f */
  PolicyInputList?: string[];
}

export interface GetDelegationRequestInput {
  /** The unique identifier of the delegation request to retrieve. */
  DelegationRequestId: string;
  /** Specifies whether to perform a permission check for the delegation request. If set to true, the GetDelegationRequest API call will start a permission check process. This process calculates whether the */
  DelegationPermissionCheck?: boolean;
}

export interface GetGroupInput {
  /** The name of the group. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of th */
  GroupName: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
}

export interface GetGroupPolicyInput {
  /** The name of the group the policy is associated with. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces.  */
  GroupName: string;
  /** The name of the policy document to get. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also  */
  PolicyName: string;
}

export interface GetHumanReadableSummaryInput {
  /** Arn of the entity to be summarized. At this time, the only supported entity type is delegation-request */
  EntityArn: string;
  /** A string representing the locale to use for the summary generation. The supported locale strings are based on the Supported languages of the Amazon Web Services Management Console . */
  Locale?: string;
}

export interface GetInstanceProfileInput {
  /** The name of the instance profile to get information about. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no sp */
  InstanceProfileName: string;
}

export interface GetLoginProfileInput {
  /** The name of the user whose login profile you want to retrieve. This parameter is optional. If no user name is included, it defaults to the principal making the request. When you make this request with */
  UserName?: string;
}

export interface GetMFADeviceInput {
  /** Serial number that uniquely identifies the MFA device. For this API, we only accept FIDO security key ARNs. */
  SerialNumber: string;
  /** The friendly name identifying the user. */
  UserName?: string;
}

export interface GetOpenIDConnectProviderInput {
  /** The Amazon Resource Name (ARN) of the OIDC provider resource object in IAM to get information for. You can get a list of OIDC provider resource ARNs by using the ListOpenIDConnectProviders operation.  */
  OpenIDConnectProviderArn: string;
}

export interface GetOrganizationsAccessReportInput {
  /** The identifier of the request generated by the GenerateOrganizationsAccessReport operation. */
  JobId: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
  /** The key that is used to sort the results. If you choose the namespace key, the results are returned in alphabetical order. If you choose the time key, the results are sorted numerically by the date an */
  SortKey?: 'SERVICE_NAMESPACE_ASCENDING' | 'SERVICE_NAMESPACE_DESCENDING' | 'LAST_AUTHENTICATED_TIME_ASCENDING' | 'LAST_AUTHENTICATED_TIME_DESCENDING';
}

export interface GetPolicyInput {
  /** The Amazon Resource Name (ARN) of the managed policy that you want information about. For more information about ARNs, see Amazon Resource Names (ARNs) in the Amazon Web Services General Reference. */
  PolicyArn: string;
}

export interface GetPolicyVersionInput {
  /** The Amazon Resource Name (ARN) of the managed policy that you want information about. For more information about ARNs, see Amazon Resource Names (ARNs) in the Amazon Web Services General Reference. */
  PolicyArn: string;
  /** Identifies the policy version to retrieve. This parameter allows (through its regex pattern) a string of characters that consists of the lowercase letter 'v' followed by one or two digits, and optiona */
  VersionId: string;
}

export interface GetRoleInput {
  /** The name of the IAM role to get information about. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. Yo */
  RoleName: string;
}

export interface GetRolePolicyInput {
  /** The name of the policy document to get. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also  */
  PolicyName: string;
  /** The name of the role associated with the policy. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You  */
  RoleName: string;
}

export interface GetSAMLProviderInput {
  /** The Amazon Resource Name (ARN) of the SAML provider resource object in IAM to get information about. For more information about ARNs, see Amazon Resource Names (ARNs) in the Amazon Web Services Genera */
  SAMLProviderArn: string;
}

export interface GetServerCertificateInput {
  /** The name of the server certificate you want to retrieve information about. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric chara */
  ServerCertificateName: string;
}

export interface GetServiceLastAccessedDetailsInput {
  /** The ID of the request generated by the GenerateServiceLastAccessedDetails operation. The JobId returned by GenerateServiceLastAccessedDetail must be used by the same role within a session, or by the s */
  JobId: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
}

export interface GetServiceLastAccessedDetailsWithEntitiesInput {
  /** The ID of the request generated by the GenerateServiceLastAccessedDetails operation. */
  JobId: string;
  /** The service namespace for an Amazon Web Services service. Provide the service namespace to learn when the IAM entity last attempted to access the specified service. To learn the service namespace for  */
  ServiceNamespace: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
}

export interface GetServiceLinkedRoleDeletionStatusInput {
  /** The deletion task identifier. This identifier is returned by the DeleteServiceLinkedRole operation in the format task/aws-service-role///. */
  DeletionTaskId: string;
}

export interface GetSSHPublicKeyInput {
  /** Specifies the public key encoding format to use in the response. To retrieve the public key in ssh-rsa format, use SSH. To retrieve the public key in PEM format, use PEM. */
  Encoding: 'SSH' | 'PEM';
  /** The unique identifier for the SSH public key. This parameter allows (through its regex pattern) a string of characters that can consist of any upper or lowercased letter or digit. */
  SSHPublicKeyId: string;
  /** The name of the IAM user associated with the SSH public key. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no  */
  UserName: string;
}

export interface GetUserInput {
  /** The name of the user to get information about. This parameter is optional. If it is not included, it defaults to the user making the request. This parameter allows (through its regex pattern) a string */
  UserName?: string;
}

export interface GetUserPolicyInput {
  /** The name of the policy document to get. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also  */
  PolicyName: string;
  /** The name of the user who the policy is associated with. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no space */
  UserName: string;
}

export interface ListAccessKeysInput {
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
  /** The name of the user. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the */
  UserName?: string;
}

export interface ListAccountAliasesInput {
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
}

export interface ListAttachedGroupPoliciesInput {
  /** The name (friendly name, not ARN) of the group to list attached policies for. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric ch */
  GroupName: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
  /** The path prefix for filtering the results. This parameter is optional. If it is not included, it defaults to a slash (/), listing all policies. This parameter allows (through its regex pattern) a stri */
  PathPrefix?: string;
}

export interface ListAttachedRolePoliciesInput {
  /** The name (friendly name, not ARN) of the role to list attached policies for. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric cha */
  RoleName: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
  /** The path prefix for filtering the results. This parameter is optional. If it is not included, it defaults to a slash (/), listing all policies. This parameter allows (through its regex pattern) a stri */
  PathPrefix?: string;
}

export interface ListAttachedUserPoliciesInput {
  /** The name (friendly name, not ARN) of the user to list attached policies for. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric cha */
  UserName: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
  /** The path prefix for filtering the results. This parameter is optional. If it is not included, it defaults to a slash (/), listing all policies. This parameter allows (through its regex pattern) a stri */
  PathPrefix?: string;
}

export interface ListDelegationRequestsInput {
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
  /** The owner ID to filter delegation requests by. */
  OwnerId?: string;
}

export interface ListEntitiesForPolicyInput {
  /** The Amazon Resource Name (ARN) of the IAM policy for which you want the versions. For more information about ARNs, see Amazon Resource Names (ARNs) in the Amazon Web Services General Reference. */
  PolicyArn: string;
  /** The entity type to use for filtering the results. For example, when EntityFilter is Role, only the roles that are attached to the specified policy are returned. This parameter is optional. If it is no */
  EntityFilter?: 'User' | 'Role' | 'Group' | 'LocalManagedPolicy' | 'AWSManagedPolicy';
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
  /** The path prefix for filtering the results. This parameter is optional. If it is not included, it defaults to a slash (/), listing all entities. This parameter allows (through its regex pattern) a stri */
  PathPrefix?: string;
  /** The policy usage method to use for filtering the results. To list only permissions policies, set PolicyUsageFilter to PermissionsPolicy. To list only the policies used to set permissions boundaries, s */
  PolicyUsageFilter?: 'PermissionsPolicy' | 'PermissionsBoundary';
}

export interface ListGroupPoliciesInput {
  /** The name of the group to list policies for. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can a */
  GroupName: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
}

export interface ListGroupsInput {
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
  /** The path prefix for filtering the results. For example, the prefix /division_abc/subdivision_xyz/ gets all groups whose path starts with /division_abc/subdivision_xyz/. This parameter is optional. If  */
  PathPrefix?: string;
}

export interface ListGroupsForUserInput {
  /** The name of the user to list groups for. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also */
  UserName: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
}

export interface ListInstanceProfilesInput {
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
  /** The path prefix for filtering the results. For example, the prefix /application_abc/component_xyz/ gets all instance profiles whose path starts with /application_abc/component_xyz/. This parameter is  */
  PathPrefix?: string;
}

export interface ListInstanceProfilesForRoleInput {
  /** The name of the role to list instance profiles for. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. Y */
  RoleName: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
}

export interface ListInstanceProfileTagsInput {
  /** The name of the IAM instance profile whose tags you want to see. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with */
  InstanceProfileName: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
}

export interface ListMFADevicesInput {
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
  /** The name of the user whose MFA devices you want to list. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spac */
  UserName?: string;
}

export interface ListMFADeviceTagsInput {
  /** The unique identifier for the IAM virtual MFA device whose tags you want to see. For virtual MFA devices, the serial number is the same as the ARN. This parameter allows (through its regex pattern) a  */
  SerialNumber: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
}

export interface ListOpenIDConnectProviderTagsInput {
  /** The ARN of the OpenID Connect (OIDC) identity provider whose tags you want to see. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumer */
  OpenIDConnectProviderArn: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
}

export interface ListPoliciesInput {
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
  /** A flag to filter the results to only the attached policies. When OnlyAttached is true, the returned list contains only the policies that are attached to an IAM user, group, or role. When OnlyAttached  */
  OnlyAttached?: boolean;
  /** The path prefix for filtering the results. This parameter is optional. If it is not included, it defaults to a slash (/), listing all policies. This parameter allows (through its regex pattern) a stri */
  PathPrefix?: string;
  /** The policy usage method to use for filtering the results. To list only permissions policies, set PolicyUsageFilter to PermissionsPolicy. To list only the policies used to set permissions boundaries, s */
  PolicyUsageFilter?: 'PermissionsPolicy' | 'PermissionsBoundary';
  /** The scope to use for filtering the results. To list only Amazon Web Services managed policies, set Scope to AWS. To list only the customer managed policies in your Amazon Web Services account, set Sco */
  Scope?: 'All' | 'AWS' | 'Local';
}

export interface ListPoliciesGrantingServiceAccessInput {
  /** The ARN of the IAM identity (user, group, or role) whose policies you want to list. */
  Arn: string;
  /** The service namespace for the Amazon Web Services services whose policies you want to list. To learn the service namespace for a service, see Actions, resources, and condition keys for Amazon Web Serv */
  ServiceNamespaces: string[];
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
}

export interface ListPolicyTagsInput {
  /** The ARN of the IAM customer managed policy whose tags you want to see. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric character */
  PolicyArn: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
}

export interface ListPolicyVersionsInput {
  /** The Amazon Resource Name (ARN) of the IAM policy for which you want the versions. For more information about ARNs, see Amazon Resource Names (ARNs) in the Amazon Web Services General Reference. */
  PolicyArn: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
}

export interface ListRolePoliciesInput {
  /** The name of the role to list policies for. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can al */
  RoleName: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
}

export interface ListRolesInput {
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
  /** The path prefix for filtering the results. For example, the prefix /application_abc/component_xyz/ gets all roles whose path starts with /application_abc/component_xyz/. This parameter is optional. If */
  PathPrefix?: string;
}

export interface ListRoleTagsInput {
  /** The name of the IAM role for which you want to see the list of tags. This parameter accepts (through its regex pattern) a string of characters that consist of upper and lowercase alphanumeric characte */
  RoleName: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
}

export interface ListSAMLProviderTagsInput {
  /** The ARN of the Security Assertion Markup Language (SAML) identity provider whose tags you want to see. This parameter allows (through its regex pattern) a string of characters consisting of upper and  */
  SAMLProviderArn: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
}

export interface ListServerCertificatesInput {
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
  /** The path prefix for filtering the results. For example: /company/servercerts would get all server certificates for which the path starts with /company/servercerts. This parameter is optional. If it is */
  PathPrefix?: string;
}

export interface ListServerCertificateTagsInput {
  /** The name of the IAM server certificate whose tags you want to see. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters wi */
  ServerCertificateName: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
}

export interface ListServiceSpecificCredentialsInput {
  /** A flag indicating whether to list service specific credentials for all users. This parameter cannot be specified together with UserName. When true, returns all credentials associated with the specifie */
  AllUsers?: boolean;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker from the response that you received t */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
  /** Filters the returned results to only those for the specified Amazon Web Services service. If not specified, then Amazon Web Services returns service-specific credentials for all services. */
  ServiceName?: string;
  /** The name of the user whose service-specific credentials you want information about. If this value is not specified, then the operation assumes the user whose credentials are used to call the operation */
  UserName?: string;
}

export interface ListSigningCertificatesInput {
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
  /** The name of the IAM user whose signing certificates you want to examine. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric charact */
  UserName?: string;
}

export interface ListSSHPublicKeysInput {
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
  /** The name of the IAM user to list SSH public keys for. If none is specified, the UserName field is determined implicitly based on the Amazon Web Services access key used to sign the request. This param */
  UserName?: string;
}

export interface ListUserPoliciesInput {
  /** The name of the user to list policies for. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can al */
  UserName: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
}

export interface ListUsersInput {
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
  /** The path prefix for filtering the results. For example: /division_abc/subdivision_xyz/, which would get all user names whose path starts with /division_abc/subdivision_xyz/. This parameter is optional */
  PathPrefix?: string;
}

export interface ListUserTagsInput {
  /** The name of the IAM user whose tags you want to see. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces.  */
  UserName: string;
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
}

export interface ListVirtualMFADevicesInput {
  /** The status (Unassigned or Assigned) of the devices to list. If you do not specify an AssignmentStatus, the operation defaults to Any, which lists both assigned and unassigned virtual MFA devices., */
  AssignmentStatus?: 'Assigned' | 'Unassigned' | 'Any';
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
}

export interface PutGroupPolicyInput {
  /** The name of the group to associate the policy with. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. Y */
  GroupName: string;
  /** The policy document. You must provide policies in JSON format in IAM. However, for CloudFormation templates formatted in YAML, you can provide the policy in JSON or YAML format. CloudFormation always  */
  PolicyDocument: string;
  /** The name of the policy document. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include */
  PolicyName: string;
}

export interface PutRolePermissionsBoundaryInput {
  /** The ARN of the managed policy that is used to set the permissions boundary for the role. A permissions boundary policy defines the maximum permissions that identity-based policies can grant to an enti */
  PermissionsBoundary: string;
  /** The name (friendly name, not ARN) of the IAM role for which you want to set the permissions boundary. */
  RoleName: string;
}

export interface PutRolePolicyInput {
  /** The policy document. You must provide policies in JSON format in IAM. However, for CloudFormation templates formatted in YAML, you can provide the policy in JSON or YAML format. CloudFormation always  */
  PolicyDocument: string;
  /** The name of the policy document. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include */
  PolicyName: string;
  /** The name of the role to associate the policy with. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. Yo */
  RoleName: string;
}

export interface PutUserPermissionsBoundaryInput {
  /** The ARN of the managed policy that is used to set the permissions boundary for the user. A permissions boundary policy defines the maximum permissions that identity-based policies can grant to an enti */
  PermissionsBoundary: string;
  /** The name (friendly name, not ARN) of the IAM user for which you want to set the permissions boundary. */
  UserName: string;
}

export interface PutUserPolicyInput {
  /** The policy document. You must provide policies in JSON format in IAM. However, for CloudFormation templates formatted in YAML, you can provide the policy in JSON or YAML format. CloudFormation always  */
  PolicyDocument: string;
  /** The name of the policy document. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include */
  PolicyName: string;
  /** The name of the user to associate the policy with. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. Yo */
  UserName: string;
}

export interface RejectDelegationRequestInput {
  /** The unique identifier of the delegation request to reject. */
  DelegationRequestId: string;
  /** Optional notes explaining the reason for rejecting the delegation request. */
  Notes?: string;
}

export interface RemoveClientIDFromOpenIDConnectProviderInput {
  /** The client ID (also known as audience) to remove from the IAM OIDC provider resource. For more information about client IDs, see CreateOpenIDConnectProvider. */
  ClientID: string;
  /** The Amazon Resource Name (ARN) of the IAM OIDC provider resource to remove the client ID from. You can get a list of OIDC provider ARNs by using the ListOpenIDConnectProviders operation. For more info */
  OpenIDConnectProviderArn: string;
}

export interface RemoveRoleFromInstanceProfileInput {
  /** The name of the instance profile to update. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can a */
  InstanceProfileName: string;
  /** The name of the role to remove. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include  */
  RoleName: string;
}

export interface RemoveUserFromGroupInput {
  /** The name of the group to update. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include */
  GroupName: string;
  /** The name of the user to remove. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include  */
  UserName: string;
}

export interface ResetServiceSpecificCredentialInput {
  /** The unique identifier of the service-specific credential. This parameter allows (through its regex pattern) a string of characters that can consist of any upper or lowercased letter or digit. */
  ServiceSpecificCredentialId: string;
  /** The name of the IAM user associated with the service-specific credential. If this value is not specified, then the operation assumes the user whose credentials are used to call the operation. This par */
  UserName?: string;
}

export interface ResyncMFADeviceInput {
  /** An authentication code emitted by the device. The format for this parameter is a sequence of six digits. */
  AuthenticationCode1: string;
  /** A subsequent authentication code emitted by the device. The format for this parameter is a sequence of six digits. */
  AuthenticationCode2: string;
  /** Serial number that uniquely identifies the MFA device. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces */
  SerialNumber: string;
  /** The name of the user whose MFA device you want to resynchronize. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with */
  UserName: string;
}

export interface SendDelegationTokenInput {
  /** The unique identifier of the delegation request for which to send the token. */
  DelegationRequestId: string;
}

export interface SetDefaultPolicyVersionInput {
  /** The Amazon Resource Name (ARN) of the IAM policy whose default version you want to set. For more information about ARNs, see Amazon Resource Names (ARNs) in the Amazon Web Services General Reference. */
  PolicyArn: string;
  /** The version of the policy to set as the default (operative) version. For more information about managed policy versions, see Versioning for managed policies in the IAM User Guide. */
  VersionId: string;
}

export interface SetSecurityTokenServicePreferencesInput {
  /** The version of the global endpoint token. Version 1 tokens are valid only in Amazon Web Services Regions that are available by default. These tokens do not work in manually enabled Regions, such as As */
  GlobalEndpointTokenVersion: 'v1Token' | 'v2Token';
}

export interface SimulateCustomPolicyInput {
  /** A list of names of API operations to evaluate in the simulation. Each operation is evaluated against each resource. Each operation must include the service identifier, such as iam:CreateUser. This ope */
  ActionNames: string[];
  /** A list of policy documents to include in the simulation. Each document is specified as a string containing the complete, valid JSON text of an IAM policy. Do not include any resource-based policies in */
  PolicyInputList: string[];
  /** The ARN of the IAM user that you want to use as the simulated caller of the API operations. CallerArn is required if you include a ResourcePolicy so that the policy's Principal element has a value to  */
  CallerArn?: string;
  /** A list of context keys and corresponding values for the simulation to use. Whenever a context key is evaluated in one of the simulated IAM permissions policies, the corresponding value is supplied. */
  ContextEntries?: ContextEntry[];
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
  /** The IAM permissions boundary policy to simulate. The permissions boundary sets the maximum permissions that an IAM entity can have. You can input only one permissions boundary when you pass a policy t */
  PermissionsBoundaryPolicyInputList?: string[];
  /** A list of ARNs of Amazon Web Services resources to include in the simulation. If this parameter is not provided, then the value defaults to * (all resources). Each API in the ActionNames parameter is  */
  ResourceArns?: string[];
  /** Specifies the type of simulation to run. Different API operations that support resource-based policies require different combinations of resources. By specifying the type of simulation to run, you ena */
  ResourceHandlingOption?: string;
  /** An ARN representing the Amazon Web Services account ID that specifies the owner of any simulated resource that does not identify its owner in the resource ARN. Examples of resource ARNs include an S3  */
  ResourceOwner?: string;
  /** A resource-based policy to include in the simulation provided as a string. Each resource in the simulation is treated as if it had this policy attached. You can include only one resource-based policy  */
  ResourcePolicy?: string;
}

export interface SimulatePrincipalPolicyInput {
  /** A list of names of API operations to evaluate in the simulation. Each operation is evaluated for each resource. Each operation must include the service identifier, such as iam:CreateUser. */
  ActionNames: string[];
  /** The Amazon Resource Name (ARN) of a user, group, or role whose policies you want to include in the simulation. If you specify a user, group, or role, the simulation includes all policies that are asso */
  PolicySourceArn: string;
  /** The ARN of the IAM user that you want to specify as the simulated caller of the API operations. If you do not specify a CallerArn, it defaults to the ARN of the user that you specify in PolicySourceAr */
  CallerArn?: string;
  /** A list of context keys and corresponding values for the simulation to use. Whenever a context key is evaluated in one of the simulated IAM permissions policies, the corresponding value is supplied. */
  ContextEntries?: ContextEntry[];
  /** Use this parameter only when paginating results and only after you receive a response indicating that the results are truncated. Set it to the value of the Marker element in the response that you rece */
  Marker?: string;
  /** Use this only when paginating results to indicate the maximum number of items you want in the response. If additional items exist beyond the maximum you specify, the IsTruncated response element is tr */
  MaxItems?: number;
  /** The IAM permissions boundary policy to simulate. The permissions boundary sets the maximum permissions that the entity can have. You can input only one permissions boundary when you pass a policy to t */
  PermissionsBoundaryPolicyInputList?: string[];
  /** An optional list of additional policy documents to include in the simulation. Each document is specified as a string containing the complete, valid JSON text of an IAM policy. The regex pattern used t */
  PolicyInputList?: string[];
  /** A list of ARNs of Amazon Web Services resources to include in the simulation. If this parameter is not provided, then the value defaults to * (all resources). Each API in the ActionNames parameter is  */
  ResourceArns?: string[];
  /** Specifies the type of simulation to run. Different API operations that support resource-based policies require different combinations of resources. By specifying the type of simulation to run, you ena */
  ResourceHandlingOption?: string;
  /** An Amazon Web Services account ID that specifies the owner of any simulated resource that does not identify its owner in the resource ARN. Examples of resource ARNs include an S3 bucket or object. If  */
  ResourceOwner?: string;
  /** A resource-based policy to include in the simulation provided as a string. Each resource in the simulation is treated as if it had this policy attached. You can include only one resource-based policy  */
  ResourcePolicy?: string;
}

export interface TagInstanceProfileInput {
  /** The name of the IAM instance profile to which you want to add tags. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters w */
  InstanceProfileName: string;
  /** The list of tags that you want to attach to the IAM instance profile. Each tag consists of a key name and an associated value. */
  Tags: Tag[];
}

export interface TagMFADeviceInput {
  /** The unique identifier for the IAM virtual MFA device to which you want to add tags. For virtual MFA devices, the serial number is the same as the ARN. This parameter allows (through its regex pattern) */
  SerialNumber: string;
  /** The list of tags that you want to attach to the IAM virtual MFA device. Each tag consists of a key name and an associated value. */
  Tags: Tag[];
}

export interface TagOpenIDConnectProviderInput {
  /** The ARN of the OIDC identity provider in IAM to which you want to add tags. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric char */
  OpenIDConnectProviderArn: string;
  /** The list of tags that you want to attach to the OIDC identity provider in IAM. Each tag consists of a key name and an associated value. */
  Tags: Tag[];
}

export interface TagPolicyInput {
  /** The ARN of the IAM customer managed policy to which you want to add tags. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric charac */
  PolicyArn: string;
  /** The list of tags that you want to attach to the IAM customer managed policy. Each tag consists of a key name and an associated value. */
  Tags: Tag[];
}

export interface TagRoleInput {
  /** The name of the IAM role to which you want to add tags. This parameter accepts (through its regex pattern) a string of characters that consist of upper and lowercase alphanumeric characters with no sp */
  RoleName: string;
  /** The list of tags that you want to attach to the IAM role. Each tag consists of a key name and an associated value. */
  Tags: Tag[];
}

export interface TagSAMLProviderInput {
  /** The ARN of the SAML identity provider in IAM to which you want to add tags. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric char */
  SAMLProviderArn: string;
  /** The list of tags that you want to attach to the SAML identity provider in IAM. Each tag consists of a key name and an associated value. */
  Tags: Tag[];
}

export interface TagServerCertificateInput {
  /** The name of the IAM server certificate to which you want to add tags. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters */
  ServerCertificateName: string;
  /** The list of tags that you want to attach to the IAM server certificate. Each tag consists of a key name and an associated value. */
  Tags: Tag[];
}

export interface TagUserInput {
  /** The list of tags that you want to attach to the IAM user. Each tag consists of a key name and an associated value. */
  Tags: Tag[];
  /** The name of the IAM user to which you want to add tags. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no space */
  UserName: string;
}

export interface UntagInstanceProfileInput {
  /** The name of the IAM instance profile from which you want to remove tags. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric charact */
  InstanceProfileName: string;
  /** A list of key names as a simple array of strings. The tags with matching keys are removed from the specified instance profile. */
  TagKeys: string[];
}

export interface UntagMFADeviceInput {
  /** The unique identifier for the IAM virtual MFA device from which you want to remove tags. For virtual MFA devices, the serial number is the same as the ARN. This parameter allows (through its regex pat */
  SerialNumber: string;
  /** A list of key names as a simple array of strings. The tags with matching keys are removed from the specified instance profile. */
  TagKeys: string[];
}

export interface UntagOpenIDConnectProviderInput {
  /** The ARN of the OIDC provider in IAM from which you want to remove tags. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characte */
  OpenIDConnectProviderArn: string;
  /** A list of key names as a simple array of strings. The tags with matching keys are removed from the specified OIDC provider. */
  TagKeys: string[];
}

export interface UntagPolicyInput {
  /** The ARN of the IAM customer managed policy from which you want to remove tags. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric c */
  PolicyArn: string;
  /** A list of key names as a simple array of strings. The tags with matching keys are removed from the specified policy. */
  TagKeys: string[];
}

export interface UntagRoleInput {
  /** The name of the IAM role from which you want to remove tags. This parameter accepts (through its regex pattern) a string of characters that consist of upper and lowercase alphanumeric characters with  */
  RoleName: string;
  /** A list of key names as a simple array of strings. The tags with matching keys are removed from the specified role. */
  TagKeys: string[];
}

export interface UntagSAMLProviderInput {
  /** The ARN of the SAML identity provider in IAM from which you want to remove tags. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric */
  SAMLProviderArn: string;
  /** A list of key names as a simple array of strings. The tags with matching keys are removed from the specified SAML identity provider. */
  TagKeys: string[];
}

export interface UntagServerCertificateInput {
  /** The name of the IAM server certificate from which you want to remove tags. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric chara */
  ServerCertificateName: string;
  /** A list of key names as a simple array of strings. The tags with matching keys are removed from the specified IAM server certificate. */
  TagKeys: string[];
}

export interface UntagUserInput {
  /** A list of key names as a simple array of strings. The tags with matching keys are removed from the specified user. */
  TagKeys: string[];
  /** The name of the IAM user from which you want to remove tags. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no  */
  UserName: string;
}

export interface UpdateAccessKeyInput {
  /** The access key ID of the secret access key you want to update. This parameter allows (through its regex pattern) a string of characters that can consist of any upper or lowercased letter or digit. */
  AccessKeyId: string;
  /** The status you want to assign to the secret access key. Active means that the key can be used for programmatic calls to Amazon Web Services, while Inactive means that the key cannot be used. */
  Status: 'Active' | 'Inactive' | 'Expired';
  /** The name of the user whose key you want to update. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. Yo */
  UserName?: string;
}

export interface UpdateAccountPasswordPolicyInput {
  /** Allows all IAM users in your account to use the Amazon Web Services Management Console to change their own passwords. For more information, see Permitting IAM users to change their own passwords in th */
  AllowUsersToChangePassword?: boolean;
  /** Prevents IAM users who are accessing the account via the Amazon Web Services Management Console from setting a new console password after their password has expired. The IAM user cannot access the con */
  HardExpiry?: boolean;
  /** The number of days that an IAM user password is valid. If you do not specify a value for this parameter, then the operation uses the default value of 0. The result is that IAM user passwords never exp */
  MaxPasswordAge?: number;
  /** The minimum number of characters allowed in an IAM user password. If you do not specify a value for this parameter, then the operation uses the default value of 6. */
  MinimumPasswordLength?: number;
  /** Specifies the number of previous passwords that IAM users are prevented from reusing. If you do not specify a value for this parameter, then the operation uses the default value of 0. The result is th */
  PasswordReusePrevention?: number;
  /** Specifies whether IAM user passwords must contain at least one lowercase character from the ISO basic Latin alphabet (a to z). If you do not specify a value for this parameter, then the operation uses */
  RequireLowercaseCharacters?: boolean;
  /** Specifies whether IAM user passwords must contain at least one numeric character (0 to 9). If you do not specify a value for this parameter, then the operation uses the default value of false. The res */
  RequireNumbers?: boolean;
  /** Specifies whether IAM user passwords must contain at least one of the following non-alphanumeric characters: ! @ # $ % ^ & * ( ) _ + - = [ ] { } | ' If you do not specify a value for this parameter, t */
  RequireSymbols?: boolean;
  /** Specifies whether IAM user passwords must contain at least one uppercase character from the ISO basic Latin alphabet (A to Z). If you do not specify a value for this parameter, then the operation uses */
  RequireUppercaseCharacters?: boolean;
}

export interface UpdateAssumeRolePolicyInput {
  /** The policy that grants an entity permission to assume the role. You must provide policies in JSON format in IAM. However, for CloudFormation templates formatted in YAML, you can provide the policy in  */
  PolicyDocument: string;
  /** The name of the role to update with the new policy. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. Y */
  RoleName: string;
}

export interface UpdateDelegationRequestInput {
  /** The unique identifier of the delegation request to update. */
  DelegationRequestId: string;
  /** Additional notes or comments to add to the delegation request. */
  Notes?: string;
}

export interface UpdateGroupInput {
  /** Name of the IAM group to update. If you're changing the name of the group, this is the original name. This parameter allows (through its regex pattern) a string of characters consisting of upper and l */
  GroupName: string;
  /** New name for the IAM group. Only include this if changing the group's name. IAM user, group, role, and policy names must be unique within the account. Names are not distinguished by case. For example, */
  NewGroupName?: string;
  /** New path for the IAM group. Only include this if changing the group's path. This parameter allows (through its regex pattern) a string of characters consisting of either a forward slash (/) by itself  */
  NewPath?: string;
}

export interface UpdateLoginProfileInput {
  /** The name of the user whose password you want to update. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no space */
  UserName: string;
  /** The new password for the specified IAM user. The regex pattern used to validate this parameter is a string of characters consisting of the following: Any printable ASCII character ranging from the spa */
  Password?: string;
  /** Allows this new password to be used only once by requiring the specified IAM user to set a new password on next sign-in. */
  PasswordResetRequired?: boolean;
}

export interface UpdateOpenIDConnectProviderThumbprintInput {
  /** The Amazon Resource Name (ARN) of the IAM OIDC provider resource object for which you want to update the thumbprint. You can get a list of OIDC provider ARNs by using the ListOpenIDConnectProviders op */
  OpenIDConnectProviderArn: string;
  /** A list of certificate thumbprints that are associated with the specified IAM OpenID Connect provider. For more information, see CreateOpenIDConnectProvider. */
  ThumbprintList: string[];
}

export interface UpdateRoleInput {
  /** The name of the role that you want to modify. */
  RoleName: string;
  /** The new description that you want to apply to the specified role. */
  Description?: string;
  /** The maximum session duration (in seconds) that you want to set for the specified role. If you do not specify a value for this setting, the default value of one hour is applied. This setting can have a */
  MaxSessionDuration?: number;
}

export interface UpdateRoleDescriptionInput {
  /** The new description that you want to apply to the specified role. */
  Description: string;
  /** The name of the role that you want to modify. */
  RoleName: string;
}

export interface UpdateSAMLProviderInput {
  /** The Amazon Resource Name (ARN) of the SAML provider to update. For more information about ARNs, see Amazon Resource Names (ARNs) in the Amazon Web Services General Reference. */
  SAMLProviderArn: string;
  /** Specifies the new private key from your external identity provider. The private key must be a .pem file that uses AES-GCM or AES-CBC encryption algorithm to decrypt SAML assertions. */
  AddPrivateKey?: string;
  /** Specifies the encryption setting for the SAML provider. */
  AssertionEncryptionMode?: 'Required' | 'Allowed';
  /** The Key ID of the private key to remove. */
  RemovePrivateKey?: string;
  /** An XML document generated by an identity provider (IdP) that supports SAML 2.0. The document includes the issuer's name, expiration information, and keys that can be used to validate the SAML authenti */
  SAMLMetadataDocument?: string;
}

export interface UpdateServerCertificateInput {
  /** The name of the server certificate that you want to update. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no s */
  ServerCertificateName: string;
  /** The new path for the server certificate. Include this only if you are updating the server certificate's path. This parameter allows (through its regex pattern) a string of characters consisting of eit */
  NewPath?: string;
  /** The new name for the server certificate. Include this only if you are updating the server certificate's name. The name of the certificate cannot contain any spaces. This parameter allows (through its  */
  NewServerCertificateName?: string;
}

export interface UpdateServiceSpecificCredentialInput {
  /** The unique identifier of the service-specific credential. This parameter allows (through its regex pattern) a string of characters that can consist of any upper or lowercased letter or digit. */
  ServiceSpecificCredentialId: string;
  /** The status to be assigned to the service-specific credential. */
  Status: 'Active' | 'Inactive' | 'Expired';
  /** The name of the IAM user associated with the service-specific credential. If you do not specify this value, then the operation assumes the user whose credentials are used to call the operation. This p */
  UserName?: string;
}

export interface UpdateSigningCertificateInput {
  /** The ID of the signing certificate you want to update. This parameter allows (through its regex pattern) a string of characters that can consist of any upper or lowercased letter or digit. */
  CertificateId: string;
  /** The status you want to assign to the certificate. Active means that the certificate can be used for programmatic calls to Amazon Web Services Inactive means that the certificate cannot be used. */
  Status: 'Active' | 'Inactive' | 'Expired';
  /** The name of the IAM user the signing certificate belongs to. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no  */
  UserName?: string;
}

export interface UpdateSSHPublicKeyInput {
  /** The unique identifier for the SSH public key. This parameter allows (through its regex pattern) a string of characters that can consist of any upper or lowercased letter or digit. */
  SSHPublicKeyId: string;
  /** The status to assign to the SSH public key. Active means that the key can be used for authentication with an CodeCommit repository. Inactive means that the key cannot be used. */
  Status: 'Active' | 'Inactive' | 'Expired';
  /** The name of the IAM user associated with the SSH public key. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no  */
  UserName: string;
}

export interface UpdateUserInput {
  /** Name of the user to update. If you're changing the name of the user, this is the original user name. This parameter allows (through its regex pattern) a string of characters consisting of upper and lo */
  UserName: string;
  /** New path for the IAM user. Include this parameter only if you're changing the user's path. This parameter allows (through its regex pattern) a string of characters consisting of either a forward slash */
  NewPath?: string;
  /** New name for the user. Include this parameter only if you're changing the user's name. IAM user, group, role, and policy names must be unique within the account. Names are not distinguished by case. F */
  NewUserName?: string;
}

export interface UploadServerCertificateInput {
  /** The contents of the public key certificate in PEM-encoded format. The regex pattern used to validate this parameter is a string of characters consisting of the following: Any printable ASCII character */
  CertificateBody: string;
  /** The contents of the private key in PEM-encoded format. The regex pattern used to validate this parameter is a string of characters consisting of the following: Any printable ASCII character ranging fr */
  PrivateKey: string;
  /** The name for the server certificate. Do not include the path in this value. The name of the certificate cannot contain any spaces. This parameter allows (through its regex pattern) a string of charact */
  ServerCertificateName: string;
  /** The contents of the certificate chain. This is typically a concatenation of the PEM-encoded public key certificates of the chain. The regex pattern used to validate this parameter is a string of chara */
  CertificateChain?: string;
  /** The path for the server certificate. For more information about paths, see IAM identifiers in the IAM User Guide. This parameter is optional. If it is not included, it defaults to a slash (/). This pa */
  Path?: string;
  /** A list of tags that you want to attach to the new IAM server certificate resource. Each tag consists of a key name and an associated value. For more information about tagging, see Tagging IAM resource */
  Tags?: Tag[];
}

export interface UploadSigningCertificateInput {
  /** The contents of the signing certificate. The regex pattern used to validate this parameter is a string of characters consisting of the following: Any printable ASCII character ranging from the space c */
  CertificateBody: string;
  /** The name of the user the signing certificate is for. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces.  */
  UserName?: string;
}

export interface UploadSSHPublicKeyInput {
  /** The SSH public key. The public key must be encoded in ssh-rsa format or PEM format. The minimum bit-length of the public key is 2048 bits. For example, you can generate a 2048-bit key, and the resulti */
  SSHPublicKeyBody: string;
  /** The name of the IAM user to associate the SSH public key with. This parameter allows (through its regex pattern) a string of characters consisting of upper and lowercase alphanumeric characters with n */
  UserName: string;
}

/** IAM service binding for Step Functions SDK integrations. */
export class IAM {
  constructor() {}

  acceptDelegationRequest<T>(params: AcceptDelegationRequestInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  addClientIDToOpenIDConnectProvider<T>(params: AddClientIDToOpenIDConnectProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  addRoleToInstanceProfile<T>(params: AddRoleToInstanceProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  addUserToGroup<T>(params: AddUserToGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateDelegationRequest<T>(params: AssociateDelegationRequestInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  attachGroupPolicy<T>(params: AttachGroupPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  attachRolePolicy<T>(params: AttachRolePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  attachUserPolicy<T>(params: AttachUserPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  changePassword<T>(params: ChangePasswordInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createAccessKey<T>(params: CreateAccessKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createAccountAlias<T>(params: CreateAccountAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createDelegationRequest<T>(params: CreateDelegationRequestInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createGroup<T>(params: CreateGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createInstanceProfile<T>(params: CreateInstanceProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createLoginProfile<T>(params: CreateLoginProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createOpenIDConnectProvider<T>(params: CreateOpenIDConnectProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPolicy<T>(params: CreatePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPolicyVersion<T>(params: CreatePolicyVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRole<T>(params: CreateRoleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createSAMLProvider<T>(params: CreateSAMLProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createServiceLinkedRole<T>(params: CreateServiceLinkedRoleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createServiceSpecificCredential<T>(params: CreateServiceSpecificCredentialInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createUser<T>(params: CreateUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createVirtualMFADevice<T>(params: CreateVirtualMFADeviceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deactivateMFADevice<T>(params: DeactivateMFADeviceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAccessKey<T>(params: DeleteAccessKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAccountAlias<T>(params: DeleteAccountAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAccountPasswordPolicy<T>(): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteGroup<T>(params: DeleteGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteGroupPolicy<T>(params: DeleteGroupPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteInstanceProfile<T>(params: DeleteInstanceProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteLoginProfile<T>(params: DeleteLoginProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteOpenIDConnectProvider<T>(params: DeleteOpenIDConnectProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePolicy<T>(params: DeletePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePolicyVersion<T>(params: DeletePolicyVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRole<T>(params: DeleteRoleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRolePermissionsBoundary<T>(params: DeleteRolePermissionsBoundaryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRolePolicy<T>(params: DeleteRolePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSAMLProvider<T>(params: DeleteSAMLProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteServerCertificate<T>(params: DeleteServerCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteServiceLinkedRole<T>(params: DeleteServiceLinkedRoleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteServiceSpecificCredential<T>(params: DeleteServiceSpecificCredentialInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSigningCertificate<T>(params: DeleteSigningCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSSHPublicKey<T>(params: DeleteSSHPublicKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteUser<T>(params: DeleteUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteUserPermissionsBoundary<T>(params: DeleteUserPermissionsBoundaryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteUserPolicy<T>(params: DeleteUserPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteVirtualMFADevice<T>(params: DeleteVirtualMFADeviceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detachGroupPolicy<T>(params: DetachGroupPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detachRolePolicy<T>(params: DetachRolePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  detachUserPolicy<T>(params: DetachUserPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableOrganizationsRootCredentialsManagement<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableOrganizationsRootSessions<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableOutboundWebIdentityFederation<T>(): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableMFADevice<T>(params: EnableMFADeviceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableOrganizationsRootCredentialsManagement<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableOrganizationsRootSessions<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableOutboundWebIdentityFederation<T>(): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  generateCredentialReport<T>(): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  generateOrganizationsAccessReport<T>(params: GenerateOrganizationsAccessReportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  generateServiceLastAccessedDetails<T>(params: GenerateServiceLastAccessedDetailsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAccessKeyLastUsed<T>(params: GetAccessKeyLastUsedInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAccountAuthorizationDetails<T>(params: GetAccountAuthorizationDetailsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAccountPasswordPolicy<T>(): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAccountSummary<T>(): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getContextKeysForCustomPolicy<T>(params: GetContextKeysForCustomPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getContextKeysForPrincipalPolicy<T>(params: GetContextKeysForPrincipalPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getCredentialReport<T>(): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDelegationRequest<T>(params: GetDelegationRequestInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getGroup<T>(params: GetGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getGroupPolicy<T>(params: GetGroupPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getHumanReadableSummary<T>(params: GetHumanReadableSummaryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getInstanceProfile<T>(params: GetInstanceProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getLoginProfile<T>(params: GetLoginProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getMFADevice<T>(params: GetMFADeviceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getOpenIDConnectProvider<T>(params: GetOpenIDConnectProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getOrganizationsAccessReport<T>(params: GetOrganizationsAccessReportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getOutboundWebIdentityFederationInfo<T>(): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPolicy<T>(params: GetPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPolicyVersion<T>(params: GetPolicyVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRole<T>(params: GetRoleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRolePolicy<T>(params: GetRolePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSAMLProvider<T>(params: GetSAMLProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getServerCertificate<T>(params: GetServerCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getServiceLastAccessedDetails<T>(params: GetServiceLastAccessedDetailsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getServiceLastAccessedDetailsWithEntities<T>(params: GetServiceLastAccessedDetailsWithEntitiesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getServiceLinkedRoleDeletionStatus<T>(params: GetServiceLinkedRoleDeletionStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSSHPublicKey<T>(params: GetSSHPublicKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getUser<T>(params: GetUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getUserPolicy<T>(params: GetUserPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAccessKeys<T>(params: ListAccessKeysInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAccountAliases<T>(params: ListAccountAliasesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAttachedGroupPolicies<T>(params: ListAttachedGroupPoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAttachedRolePolicies<T>(params: ListAttachedRolePoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAttachedUserPolicies<T>(params: ListAttachedUserPoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listDelegationRequests<T>(params: ListDelegationRequestsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listEntitiesForPolicy<T>(params: ListEntitiesForPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listGroupPolicies<T>(params: ListGroupPoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listGroups<T>(params: ListGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listGroupsForUser<T>(params: ListGroupsForUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listInstanceProfiles<T>(params: ListInstanceProfilesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listInstanceProfilesForRole<T>(params: ListInstanceProfilesForRoleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listInstanceProfileTags<T>(params: ListInstanceProfileTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listMFADevices<T>(params: ListMFADevicesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listMFADeviceTags<T>(params: ListMFADeviceTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listOpenIDConnectProviders<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listOpenIDConnectProviderTags<T>(params: ListOpenIDConnectProviderTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listOrganizationsFeatures<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPolicies<T>(params: ListPoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPoliciesGrantingServiceAccess<T>(params: ListPoliciesGrantingServiceAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPolicyTags<T>(params: ListPolicyTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPolicyVersions<T>(params: ListPolicyVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRolePolicies<T>(params: ListRolePoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRoles<T>(params: ListRolesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRoleTags<T>(params: ListRoleTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSAMLProviders<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSAMLProviderTags<T>(params: ListSAMLProviderTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listServerCertificates<T>(params: ListServerCertificatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listServerCertificateTags<T>(params: ListServerCertificateTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listServiceSpecificCredentials<T>(params: ListServiceSpecificCredentialsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSigningCertificates<T>(params: ListSigningCertificatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSSHPublicKeys<T>(params: ListSSHPublicKeysInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listUserPolicies<T>(params: ListUserPoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listUsers<T>(params: ListUsersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listUserTags<T>(params: ListUserTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listVirtualMFADevices<T>(params: ListVirtualMFADevicesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putGroupPolicy<T>(params: PutGroupPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putRolePermissionsBoundary<T>(params: PutRolePermissionsBoundaryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putRolePolicy<T>(params: PutRolePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putUserPermissionsBoundary<T>(params: PutUserPermissionsBoundaryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putUserPolicy<T>(params: PutUserPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rejectDelegationRequest<T>(params: RejectDelegationRequestInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeClientIDFromOpenIDConnectProvider<T>(params: RemoveClientIDFromOpenIDConnectProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeRoleFromInstanceProfile<T>(params: RemoveRoleFromInstanceProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  removeUserFromGroup<T>(params: RemoveUserFromGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  resetServiceSpecificCredential<T>(params: ResetServiceSpecificCredentialInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  resyncMFADevice<T>(params: ResyncMFADeviceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  sendDelegationToken<T>(params: SendDelegationTokenInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  setDefaultPolicyVersion<T>(params: SetDefaultPolicyVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  setSecurityTokenServicePreferences<T>(params: SetSecurityTokenServicePreferencesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  simulateCustomPolicy<T>(params: SimulateCustomPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  simulatePrincipalPolicy<T>(params: SimulatePrincipalPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagInstanceProfile<T>(params: TagInstanceProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagMFADevice<T>(params: TagMFADeviceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagOpenIDConnectProvider<T>(params: TagOpenIDConnectProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagPolicy<T>(params: TagPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagRole<T>(params: TagRoleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagSAMLProvider<T>(params: TagSAMLProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagServerCertificate<T>(params: TagServerCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagUser<T>(params: TagUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagInstanceProfile<T>(params: UntagInstanceProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagMFADevice<T>(params: UntagMFADeviceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagOpenIDConnectProvider<T>(params: UntagOpenIDConnectProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagPolicy<T>(params: UntagPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagRole<T>(params: UntagRoleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagSAMLProvider<T>(params: UntagSAMLProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagServerCertificate<T>(params: UntagServerCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagUser<T>(params: UntagUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateAccessKey<T>(params: UpdateAccessKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateAccountPasswordPolicy<T>(params: UpdateAccountPasswordPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateAssumeRolePolicy<T>(params: UpdateAssumeRolePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateDelegationRequest<T>(params: UpdateDelegationRequestInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateGroup<T>(params: UpdateGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateLoginProfile<T>(params: UpdateLoginProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateOpenIDConnectProviderThumbprint<T>(params: UpdateOpenIDConnectProviderThumbprintInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRole<T>(params: UpdateRoleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRoleDescription<T>(params: UpdateRoleDescriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateSAMLProvider<T>(params: UpdateSAMLProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateServerCertificate<T>(params: UpdateServerCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateServiceSpecificCredential<T>(params: UpdateServiceSpecificCredentialInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateSigningCertificate<T>(params: UpdateSigningCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateSSHPublicKey<T>(params: UpdateSSHPublicKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateUser<T>(params: UpdateUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  uploadServerCertificate<T>(params: UploadServerCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  uploadSigningCertificate<T>(params: UploadSigningCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  uploadSSHPublicKey<T>(params: UploadSSHPublicKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
