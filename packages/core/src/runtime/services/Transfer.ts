// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface HomeDirectoryMapEntry {
  /** Represents an entry for HomeDirectoryMappings. */
  Entry: string;
  /** Represents the map target that is used in a HomeDirectoryMapEntry. */
  Target: string;
  /** Specifies the type of mapping. Set the type to FILE if you want the mapping to point to a file, or DIRECTORY for the directory to point to a directory. By default, home directory mappings have a Type  */
  Type?: 'FILE' | 'DIRECTORY';
}

export interface PosixProfile {
  /** The POSIX user ID used for all EFS operations by this user. */
  Uid: number;
  /** The POSIX group ID used for all EFS operations by this user. */
  Gid: number;
  /** The secondary POSIX group IDs used for all EFS operations by this user. */
  SecondaryGids?: number[];
}

export interface Tag {
  /** The name assigned to the tag that you create. */
  Key: string;
  /** Contains one or more values that you assigned to the key name you create. */
  Value: string;
}

export interface CustomDirectoriesType {
  /** Specifies a location to store failed AS2 message files. */
  FailedFilesDirectory: string;
  /** Specifies a location to store MDN files. */
  MdnFilesDirectory: string;
  /** Specifies a location to store the payload for AS2 message files. */
  PayloadFilesDirectory: string;
  /** Specifies a location to store AS2 status messages. */
  StatusFilesDirectory: string;
  /** Specifies a location to store temporary AS2 message files. */
  TemporaryFilesDirectory: string;
}

export interface As2AsyncMdnConnectorConfig {
  /** The URL endpoint where asynchronous MDN responses should be sent. */
  Url?: string;
  /** A list of server identifiers that can handle asynchronous MDN responses. You can specify between 1 and 10 server IDs. */
  ServerIds?: any[];
}

export interface As2ConnectorConfig {
  /** A unique identifier for the AS2 local profile. */
  LocalProfileId?: string;
  /** A unique identifier for the partner profile for the connector. */
  PartnerProfileId?: string;
  /** Used as the Subject HTTP header attribute in AS2 messages that are being sent with the connector. */
  MessageSubject?: string;
  /** Specifies whether the AS2 file is compressed. */
  Compression?: 'ZLIB' | 'DISABLED';
  /** The algorithm that is used to encrypt the file. Note the following: Do not use the DES_EDE3_CBC algorithm unless you must support a legacy client that requires it, as it is a weak encryption algorithm */
  EncryptionAlgorithm?: 'AES128_CBC' | 'AES192_CBC' | 'AES256_CBC' | 'DES_EDE3_CBC' | 'NONE';
  /** The algorithm that is used to sign the AS2 messages sent with the connector. */
  SigningAlgorithm?: 'SHA256' | 'SHA384' | 'SHA512' | 'SHA1' | 'NONE';
  /** The signing algorithm for the MDN response. If set to DEFAULT (or not set at all), the value for SigningAlgorithm is used. */
  MdnSigningAlgorithm?: 'SHA256' | 'SHA384' | 'SHA512' | 'SHA1' | 'NONE' | 'DEFAULT';
  /** Used for outbound requests (from an Transfer Family connector to a partner AS2 server) to determine whether the partner response for transfers is synchronous or asynchronous. Specify either of the fol */
  MdnResponse?: 'SYNC' | 'NONE' | 'ASYNC';
  /** Provides Basic authentication support to the AS2 Connectors API. To use Basic authentication, you must provide the name or Amazon Resource Name (ARN) of a secret in Secrets Manager. The default value  */
  BasicAuthSecretId?: string;
  /** Allows you to use the Amazon S3 Content-Type that is associated with objects in S3 instead of having the content type mapped based on the file extension. This parameter is enabled by default when you  */
  PreserveContentType?: 'ENABLED' | 'DISABLED';
  /** Configuration settings for asynchronous Message Disposition Notification (MDN) responses. This allows you to configure where asynchronous MDN responses should be sent and which servers should handle t */
  AsyncMdnConfig?: As2AsyncMdnConnectorConfig;
}

export interface SftpConnectorConfig {
  /** The identifier for the secret (in Amazon Web Services Secrets Manager) that contains the SFTP user's private key, password, or both. The identifier must be the Amazon Resource Name (ARN) of the secret */
  UserSecretId?: string;
  /** The public portion of the host key, or keys, that are used to identify the external server to which you are connecting. You can use the ssh-keyscan command against the SFTP server to retrieve the nece */
  TrustedHostKeys?: string[];
  /** Specify the number of concurrent connections that your connector creates to the remote server. The default value is 1. The maximum values is 5. If you are using the Amazon Web Services Management Cons */
  MaxConcurrentConnections?: number;
}

export interface ConnectorVpcLatticeEgressConfig {
  /** ARN of the VPC_LATTICE Resource Configuration that defines the target SFTP server location. Must point to a valid Resource Configuration in the customer's VPC with appropriate network connectivity to  */
  ResourceConfigurationArn: string;
  /** Port number for connecting to the SFTP server through VPC_LATTICE. Defaults to 22 if not specified. Must match the port on which the target SFTP server is listening. */
  PortNumber?: number;
}

export interface EndpointDetails {
  /** A list of address allocation IDs that are required to attach an Elastic IP address to your server's endpoint. An address allocation ID corresponds to the allocation ID of an Elastic IP address. This v */
  AddressAllocationIds?: string[];
  /** A list of subnet IDs that are required to host your server endpoint in your VPC. This property can only be set when EndpointType is set to VPC. */
  SubnetIds?: string[];
  /** The identifier of the VPC endpoint. This property can only be set when EndpointType is set to VPC_ENDPOINT. For more information, see https://docs.aws.amazon.com/transfer/latest/userguide/create-serve */
  VpcEndpointId?: string;
  /** The VPC identifier of the VPC in which a server's endpoint will be hosted. This property can only be set when EndpointType is set to VPC. */
  VpcId?: string;
  /** A list of security groups IDs that are available to attach to your server's endpoint. While SecurityGroupIds appears in the response syntax for consistency with CreateServer and UpdateServer operation */
  SecurityGroupIds?: string[];
}

export interface IdentityProviderDetails {
  /** Provides the location of the service endpoint used to authenticate users. */
  Url?: string;
  /** This parameter is only applicable if your IdentityProviderType is API_GATEWAY. Provides the type of InvocationRole used to authenticate the user account. */
  InvocationRole?: string;
  /** The identifier of the Directory Service directory that you want to use as your identity provider. */
  DirectoryId?: string;
  /** The ARN for a Lambda function to use for the Identity provider. */
  Function?: string;
  /** For SFTP-enabled servers, and for custom identity providers only, you can specify whether to authenticate using a password, SSH key pair, or both. PASSWORD - users must provide their password to conne */
  SftpAuthenticationMethods?: 'PASSWORD' | 'PUBLIC_KEY' | 'PUBLIC_KEY_OR_PASSWORD' | 'PUBLIC_KEY_AND_PASSWORD';
}

export interface ProtocolDetails {
  /** Indicates passive mode, for FTP and FTPS protocols. Enter a single IPv4 address, such as the public IP address of a firewall, router, or load balancer. For example: aws transfer update-server --protoc */
  PassiveIp?: string;
  /** A property used with Transfer Family servers that use the FTPS protocol. TLS Session Resumption provides a mechanism to resume or share a negotiated secret key between the control and data connection  */
  TlsSessionResumptionMode?: 'DISABLED' | 'ENABLED' | 'ENFORCED';
  /** Use the SetStatOption to ignore the error that is generated when the client attempts to use SETSTAT on a file you are uploading to an S3 bucket. Some SFTP file transfer clients can attempt to change t */
  SetStatOption?: 'DEFAULT' | 'ENABLE_NO_OP';
  /** Indicates the transport method for the AS2 messages. Currently, only HTTP is supported. */
  As2Transports?: 'HTTP'[];
}

export interface WorkflowDetails {
  /** A trigger that starts a workflow: the workflow begins to execute after a file is uploaded. To remove an associated workflow from a server, you can provide an empty OnUpload object, as in the following */
  OnUpload?: any[];
  /** A trigger that starts a workflow if a file is only partially uploaded. You can attach a workflow to a server that executes whenever there is a partial upload. A partial upload occurs when a file is op */
  OnPartialUpload?: any[];
}

export interface S3StorageOptions {
  /** Specifies whether or not performance for your Amazon S3 directories is optimized. If using the console, this is enabled by default. If using the API or CLI, this is disabled by default. By default, ho */
  DirectoryListingOptimization?: 'ENABLED' | 'DISABLED';
}

export interface IdentityCenterConfig {
  /** The Amazon Resource Name (ARN) for the IAM Identity Center used for the web app. */
  InstanceArn?: string;
  /** The IAM role in IAM Identity Center used for the web app. */
  Role?: string;
}

export interface WebAppVpcConfig {
  /** The list of subnet IDs within the VPC where the web app endpoint will be deployed. These subnets must be in the same VPC specified in the VpcId parameter. */
  SubnetIds?: any[];
  /** The identifier of the VPC where the web app endpoint will be hosted. */
  VpcId?: string;
  /** The list of security group IDs that control access to the web app endpoint. These security groups determine which sources can access the endpoint based on IP addresses and port configurations. */
  SecurityGroupIds?: any[];
}

export interface WorkflowStep {
  /** Currently, the following step types are supported. COPY - Copy the file to another location. CUSTOM - Perform a custom step with an Lambda function target. DECRYPT - Decrypt a file that was encrypted  */
  Type?: 'COPY' | 'CUSTOM' | 'TAG' | 'DELETE' | 'DECRYPT';
  /** Details for a step that performs a file copy. Consists of the following values: A description An Amazon S3 location for the destination of the file copy. A flag that indicates whether to overwrite an  */
  CopyStepDetails?: any;
  /** Details for a step that invokes an Lambda function. Consists of the Lambda function's name, target, and timeout (in seconds). */
  CustomStepDetails?: any;
  /** Details for a step that deletes the file. */
  DeleteStepDetails?: any;
  /** Details for a step that creates one or more tags. You specify one or more tags. Each tag contains a key-value pair. */
  TagStepDetails?: any;
  /** Details for a step that decrypts an encrypted file. Consists of the following values: A descriptive name An Amazon S3 or Amazon Elastic File System (Amazon EFS) location for the source file to decrypt */
  DecryptStepDetails?: any;
}

export interface CustomHttpHeader {
  /** The name of the custom HTTP header. */
  Key?: string;
  /** The value of the custom HTTP header. */
  Value?: string;
}

export interface UpdateConnectorVpcLatticeEgressConfig {
  /** Updated ARN of the VPC_LATTICE Resource Configuration. Use this to change the target SFTP server location or modify the network path through the customer's VPC infrastructure. */
  ResourceConfigurationArn?: string;
  /** Updated port number for SFTP connections through VPC_LATTICE. Change this if the target SFTP server port has been modified or if connecting to a different server endpoint. */
  PortNumber?: number;
}

export interface UpdateWebAppIdentityCenterConfig {
  /** The IAM role used to access IAM Identity Center. */
  Role?: string;
}

export interface UpdateWebAppVpcConfig {
  /** The list of subnet IDs within the VPC where the web app endpoint should be deployed during the update operation. */
  SubnetIds?: any[];
}

export interface CreateAccessInput {
  /** A unique identifier that is required to identify specific groups within your directory. The users of the group that you associate have access to your Amazon S3 or Amazon EFS resources over the enabled */
  ExternalId: string;
  /** The Amazon Resource Name (ARN) of the Identity and Access Management (IAM) role that controls your users' access to your Amazon S3 bucket or Amazon EFS file system. The policies attached to this role  */
  Role: string;
  /** A system-assigned unique identifier for a server instance. This is the specific server that you added your user to. */
  ServerId: string;
  /** The landing directory (folder) for a user when they log in to the server using the client. A HomeDirectory example is /bucket_name/home/mydirectory. You can use the HomeDirectory parameter for HomeDir */
  HomeDirectory?: string;
  /** Logical directory mappings that specify what Amazon S3 or Amazon EFS paths and keys should be visible to your user and how you want to make them visible. You must specify the Entry and Target pair, wh */
  HomeDirectoryMappings?: HomeDirectoryMapEntry[];
  /** The type of landing directory (folder) that you want your users' home directory to be when they log in to the server. If you set it to PATH, the user will see the absolute Amazon S3 bucket or Amazon E */
  HomeDirectoryType?: 'PATH' | 'LOGICAL';
  /** A session policy for your user so that you can use the same Identity and Access Management (IAM) role across multiple users. This policy scopes down a user's access to portions of their Amazon S3 buck */
  Policy?: string;
  PosixProfile?: PosixProfile;
}

export interface CreateAgreementInput {
  /** Connectors are used to send files using either the AS2 or SFTP protocol. For the access role, provide the Amazon Resource Name (ARN) of the Identity and Access Management role to use. For AS2 connecto */
  AccessRole: string;
  /** A unique identifier for the AS2 local profile. */
  LocalProfileId: string;
  /** A unique identifier for the partner profile used in the agreement. */
  PartnerProfileId: string;
  /** A system-assigned unique identifier for a server instance. This is the specific server that the agreement uses. */
  ServerId: string;
  /** The landing directory (folder) for files transferred by using the AS2 protocol. A BaseDirectory example is /amzn-s3-demo-bucket/home/mydirectory. */
  BaseDirectory?: string;
  /** A CustomDirectoriesType structure. This structure specifies custom directories for storing various AS2 message files. You can specify directories for the following types of files. Failed files MDN fil */
  CustomDirectories?: CustomDirectoriesType;
  /** A name or short description to identify the agreement. */
  Description?: string;
  /** Determines whether or not unsigned messages from your trading partners will be accepted. ENABLED: Transfer Family rejects unsigned messages from your trading partner. DISABLED (default value): Transfe */
  EnforceMessageSigning?: 'ENABLED' | 'DISABLED';
  /** Determines whether or not Transfer Family appends a unique string of characters to the end of the AS2 message payload filename when saving it. ENABLED: the filename provided by your trading parter is  */
  PreserveFilename?: 'ENABLED' | 'DISABLED';
  /** The status of the agreement. The agreement can be either ACTIVE or INACTIVE. */
  Status?: 'ACTIVE' | 'INACTIVE';
  /** Key-value pairs that can be used to group and search for agreements. */
  Tags?: Tag[];
}

export interface CreateConnectorInput {
  /** Connectors are used to send files using either the AS2 or SFTP protocol. For the access role, provide the Amazon Resource Name (ARN) of the Identity and Access Management role to use. For AS2 connecto */
  AccessRole: string;
  /** A structure that contains the parameters for an AS2 connector object. */
  As2Config?: As2ConnectorConfig;
  /** Specifies the egress configuration for the connector, which determines how traffic is routed from the connector to the SFTP server. When set to VPC, enables routing through customer VPCs using VPC_LAT */
  EgressConfig?: { VpcLattice?: ConnectorVpcLatticeEgressConfig };
  /** The Amazon Resource Name (ARN) of the Identity and Access Management (IAM) role that allows a connector to turn on CloudWatch logging for Amazon S3 events. When set, you can view connector activity in */
  LoggingRole?: string;
  /** Specifies the name of the security policy for the connector. */
  SecurityPolicyName?: string;
  /** A structure that contains the parameters for an SFTP connector object. */
  SftpConfig?: SftpConnectorConfig;
  /** Key-value pairs that can be used to group and search for connectors. Tags are metadata attached to connectors for any purpose. */
  Tags?: Tag[];
  /** The URL of the partner's AS2 or SFTP endpoint. When creating AS2 connectors or service-managed SFTP connectors (connectors without egress configuration), you must provide a URL to specify the remote s */
  Url?: string;
}

export interface CreateProfileInput {
  /** The As2Id is the AS2-name, as defined in the RFC 4130. For inbound transfers, this is the AS2-From header for the AS2 messages sent from the partner. For outbound connectors, this is the AS2-To header */
  As2Id: string;
  /** Determines the type of profile to create: Specify LOCAL to create a local profile. A local profile represents the AS2-enabled Transfer Family server organization or party. Specify PARTNER to create a  */
  ProfileType: 'LOCAL' | 'PARTNER';
  /** An array of identifiers for the imported certificates. You use this identifier for working with profiles and partner profiles. */
  CertificateIds?: string[];
  /** Key-value pairs that can be used to group and search for AS2 profiles. */
  Tags?: Tag[];
}

export interface CreateServerInput {
  /** The Amazon Resource Name (ARN) of the Certificate Manager (ACM) certificate. Required when Protocols is set to FTPS. To request a new public certificate, see Request a public certificate in the Certif */
  Certificate?: string;
  /** The domain of the storage system that is used for file transfers. There are two domains available: Amazon Simple Storage Service (Amazon S3) and Amazon Elastic File System (Amazon EFS). The default va */
  Domain?: 'S3' | 'EFS';
  /** The virtual private cloud (VPC) endpoint settings that are configured for your server. When you host your endpoint within your VPC, you can make your endpoint accessible only to resources within your  */
  EndpointDetails?: EndpointDetails;
  /** The type of endpoint that you want your server to use. You can choose to make your server's endpoint publicly accessible (PUBLIC) or host it inside your VPC. With an endpoint that is hosted in a VPC,  */
  EndpointType?: 'PUBLIC' | 'VPC' | 'VPC_ENDPOINT';
  /** The RSA, ECDSA, or ED25519 private key to use for your SFTP-enabled server. You can add multiple host keys, in case you want to rotate keys, or have a set of active keys that use different algorithms. */
  HostKey?: string;
  /** Required when IdentityProviderType is set to AWS_DIRECTORY_SERVICE, Amazon Web Services_LAMBDA or API_GATEWAY. Accepts an array containing all of the information required to use a directory in AWS_DIR */
  IdentityProviderDetails?: IdentityProviderDetails;
  /** The mode of authentication for a server. The default value is SERVICE_MANAGED, which allows you to store and access user credentials within the Transfer Family service. Use AWS_DIRECTORY_SERVICE to pr */
  IdentityProviderType?: 'SERVICE_MANAGED' | 'API_GATEWAY' | 'AWS_DIRECTORY_SERVICE' | 'AWS_LAMBDA';
  /** Specifies whether to use IPv4 only, or to use dual-stack (IPv4 and IPv6) for your Transfer Family endpoint. The default value is IPV4. The IpAddressType parameter has the following limitations: It can */
  IpAddressType?: 'IPV4' | 'DUALSTACK';
  /** The Amazon Resource Name (ARN) of the Identity and Access Management (IAM) role that allows a server to turn on Amazon CloudWatch logging for Amazon S3 or Amazon EFS events. When set, you can view use */
  LoggingRole?: string;
  /** Specifies a string to display when users connect to a server. This string is displayed after the user authenticates. The SFTP protocol does not support post-authentication display banners. */
  PostAuthenticationLoginBanner?: string;
  /** Specifies a string to display when users connect to a server. This string is displayed before the user authenticates. For example, the following banner displays details about using the system: This sy */
  PreAuthenticationLoginBanner?: string;
  /** The protocol settings that are configured for your server. Avoid placing Network Load Balancers (NLBs) or NAT gateways in front of Transfer Family servers, as this increases costs and can cause perfor */
  ProtocolDetails?: ProtocolDetails;
  /** Specifies the file transfer protocol or protocols over which your file transfer protocol client can connect to your server's endpoint. The available protocols are: SFTP (Secure Shell (SSH) File Transf */
  Protocols?: 'SFTP' | 'FTP' | 'FTPS' | 'AS2'[];
  /** Specifies whether or not performance for your Amazon S3 directories is optimized. If using the console, this is enabled by default. If using the API or CLI, this is disabled by default. By default, ho */
  S3StorageOptions?: S3StorageOptions;
  /** Specifies the name of the security policy for the server. */
  SecurityPolicyName?: string;
  /** Specifies the log groups to which your server logs are sent. To specify a log group, you must provide the ARN for an existing log group. In this case, the format of the log group is as follows: arn:aw */
  StructuredLogDestinations?: string[];
  /** Key-value pairs that can be used to group and search for servers. */
  Tags?: Tag[];
  /** Specifies the workflow ID for the workflow to assign and the execution role that's used for executing the workflow. In addition to a workflow to execute when a file is uploaded completely, WorkflowDet */
  WorkflowDetails?: WorkflowDetails;
}

export interface CreateWebAppInput {
  /** You can provide a structure that contains the details for the identity provider to use with your web app. For more details about this parameter, see Configure your identity provider for Transfer Famil */
  IdentityProviderDetails: { IdentityCenterConfig?: IdentityCenterConfig };
  /** The AccessEndpoint is the URL that you provide to your users for them to interact with the Transfer Family web app. You can specify a custom URL or use the default value. Before you enter a custom URL */
  AccessEndpoint?: string;
  /** The endpoint configuration for the web app. You can specify whether the web app endpoint is publicly accessible or hosted within a VPC. */
  EndpointDetails?: { Vpc?: WebAppVpcConfig };
  /** Key-value pairs that can be used to group and search for web apps. */
  Tags?: Tag[];
  /** Setting for the type of endpoint policy for the web app. The default value is STANDARD. If you are creating the web app in an Amazon Web Services GovCloud (US) Region, you can set this parameter to FI */
  WebAppEndpointPolicy?: 'FIPS' | 'STANDARD';
  /** A union that contains the value for number of concurrent connections or the user sessions on your web app. */
  WebAppUnits?: { Provisioned?: number };
}

export interface CreateWorkflowInput {
  /** Specifies the details for the steps that are in the specified workflow. The TYPE specifies which of the following actions is being taken for this step. COPY - Copy the file to another location. CUSTOM */
  Steps: WorkflowStep[];
  /** A textual description for the workflow. */
  Description?: string;
  /** Specifies the steps (actions) to take if errors are encountered during execution of the workflow. For custom steps, the Lambda function needs to send FAILURE to the call back API to kick off the excep */
  OnExceptionSteps?: WorkflowStep[];
  /** Key-value pairs that can be used to group and search for workflows. Tags are metadata attached to workflows for any purpose. */
  Tags?: Tag[];
}

export interface DeleteAccessInput {
  /** A unique identifier that is required to identify specific groups within your directory. The users of the group that you associate have access to your Amazon S3 or Amazon EFS resources over the enabled */
  ExternalId: string;
  /** A system-assigned unique identifier for a server that has this user assigned. */
  ServerId: string;
}

export interface DeleteAgreementInput {
  /** A unique identifier for the agreement. This identifier is returned when you create an agreement. */
  AgreementId: string;
  /** The server identifier associated with the agreement that you are deleting. */
  ServerId: string;
}

export interface DeleteCertificateInput {
  /** The identifier of the certificate object that you are deleting. */
  CertificateId: string;
}

export interface DeleteConnectorInput {
  /** The unique identifier for the connector. */
  ConnectorId: string;
}

export interface DeleteHostKeyInput {
  /** The identifier of the host key that you are deleting. */
  HostKeyId: string;
  /** The identifier of the server that contains the host key that you are deleting. */
  ServerId: string;
}

export interface DeleteProfileInput {
  /** The identifier of the profile that you are deleting. */
  ProfileId: string;
}

export interface DeleteServerInput {
  /** A unique system-assigned identifier for a server instance. */
  ServerId: string;
}

export interface DeleteSshPublicKeyInput {
  /** A system-assigned unique identifier for a file transfer protocol-enabled server instance that has the user assigned to it. */
  ServerId: string;
  /** A unique identifier used to reference your user's specific SSH key. */
  SshPublicKeyId: string;
  /** A unique string that identifies a user whose public key is being deleted. */
  UserName: string;
}

export interface DeleteUserInput {
  /** A system-assigned unique identifier for a server instance that has the user assigned to it. */
  ServerId: string;
  /** A unique string that identifies a user that is being deleted from a server. */
  UserName: string;
}

export interface DeleteWebAppInput {
  /** Provide the unique identifier for the web app that you are deleting. */
  WebAppId: string;
}

export interface DeleteWebAppCustomizationInput {
  /** Provide the unique identifier for the web app that contains the customizations that you are deleting. */
  WebAppId: string;
}

export interface DeleteWorkflowInput {
  /** A unique identifier for the workflow. */
  WorkflowId: string;
}

export interface DescribeAccessInput {
  /** A unique identifier that is required to identify specific groups within your directory. The users of the group that you associate have access to your Amazon S3 or Amazon EFS resources over the enabled */
  ExternalId: string;
  /** A system-assigned unique identifier for a server that has this access assigned. */
  ServerId: string;
}

export interface DescribeAgreementInput {
  /** A unique identifier for the agreement. This identifier is returned when you create an agreement. */
  AgreementId: string;
  /** The server identifier that's associated with the agreement. */
  ServerId: string;
}

export interface DescribeCertificateInput {
  /** An array of identifiers for the imported certificates. You use this identifier for working with profiles and partner profiles. */
  CertificateId: string;
}

export interface DescribeConnectorInput {
  /** The unique identifier for the connector. */
  ConnectorId: string;
}

export interface DescribeExecutionInput {
  /** A unique identifier for the execution of a workflow. */
  ExecutionId: string;
  /** A unique identifier for the workflow. */
  WorkflowId: string;
}

export interface DescribeHostKeyInput {
  /** The identifier of the host key that you want described. */
  HostKeyId: string;
  /** The identifier of the server that contains the host key that you want described. */
  ServerId: string;
}

export interface DescribeProfileInput {
  /** The identifier of the profile that you want described. */
  ProfileId: string;
}

export interface DescribeSecurityPolicyInput {
  /** Specify the text name of the security policy for which you want the details. */
  SecurityPolicyName: string;
}

export interface DescribeServerInput {
  /** A system-assigned unique identifier for a server. */
  ServerId: string;
}

export interface DescribeUserInput {
  /** A system-assigned unique identifier for a server that has this user assigned. */
  ServerId: string;
  /** The name of the user assigned to one or more servers. User names are part of the sign-in credentials to use the Transfer Family service and perform file transfer tasks. */
  UserName: string;
}

export interface DescribeWebAppInput {
  /** Provide the unique identifier for the web app. */
  WebAppId: string;
}

export interface DescribeWebAppCustomizationInput {
  /** Provide the unique identifier for the web app. */
  WebAppId: string;
}

export interface DescribeWorkflowInput {
  /** A unique identifier for the workflow. */
  WorkflowId: string;
}

export interface ImportCertificateInput {
  /** For the CLI, provide a file path for a certificate in URI format. For example, --certificate file://encryption-cert.pem. Alternatively, you can provide the raw content. For the SDK, specify the raw co */
  Certificate: string;
  /** Specifies how this certificate is used. It can be used in the following ways: SIGNING: For signing AS2 messages ENCRYPTION: For encrypting AS2 messages TLS: For securing AS2 communications sent over H */
  Usage: 'SIGNING' | 'ENCRYPTION' | 'TLS';
  /** An optional date that specifies when the certificate becomes active. If you do not specify a value, ActiveDate takes the same value as NotBeforeDate, which is specified by the CA. */
  ActiveDate?: string;
  /** An optional list of certificates that make up the chain for the certificate that's being imported. */
  CertificateChain?: string;
  /** A short description that helps identify the certificate. */
  Description?: string;
  /** An optional date that specifies when the certificate becomes inactive. If you do not specify a value, InactiveDate takes the same value as NotAfterDate, which is specified by the CA. */
  InactiveDate?: string;
  /** For the CLI, provide a file path for a private key in URI format. For example, --private-key file://encryption-key.pem. Alternatively, you can provide the raw content of the private key file. For the  */
  PrivateKey?: string;
  /** Key-value pairs that can be used to group and search for certificates. */
  Tags?: Tag[];
}

export interface ImportHostKeyInput {
  /** The private key portion of an SSH key pair. Transfer Family accepts RSA, ECDSA, and ED25519 keys. */
  HostKeyBody: string;
  /** The identifier of the server that contains the host key that you are importing. */
  ServerId: string;
  /** The text description that identifies this host key. */
  Description?: string;
  /** Key-value pairs that can be used to group and search for host keys. */
  Tags?: Tag[];
}

export interface ImportSshPublicKeyInput {
  /** A system-assigned unique identifier for a server. */
  ServerId: string;
  /** The public key portion of an SSH key pair. Transfer Family accepts RSA, ECDSA, and ED25519 keys. */
  SshPublicKeyBody: string;
  /** The name of the Transfer Family user that is assigned to one or more servers. */
  UserName: string;
}

export interface ListAccessesInput {
  /** A system-assigned unique identifier for a server that has users assigned to it. */
  ServerId: string;
  /** The maximum number of items to return. */
  MaxResults?: number;
  /** When you can get additional results from the ListAccesses call, a NextToken parameter is returned in the output. You can then pass in a subsequent command to the NextToken parameter to continue listin */
  NextToken?: string;
}

export interface ListAgreementsInput {
  /** The identifier of the server for which you want a list of agreements. */
  ServerId: string;
  /** The maximum number of items to return. */
  MaxResults?: number;
  /** When you can get additional results from the ListAgreements call, a NextToken parameter is returned in the output. You can then pass in a subsequent command to the NextToken parameter to continue list */
  NextToken?: string;
}

export interface ListCertificatesInput {
  /** The maximum number of items to return. */
  MaxResults?: number;
  /** When you can get additional results from the ListCertificates call, a NextToken parameter is returned in the output. You can then pass in a subsequent command to the NextToken parameter to continue li */
  NextToken?: string;
}

export interface ListConnectorsInput {
  /** The maximum number of items to return. */
  MaxResults?: number;
  /** When you can get additional results from the ListConnectors call, a NextToken parameter is returned in the output. You can then pass in a subsequent command to the NextToken parameter to continue list */
  NextToken?: string;
}

export interface ListExecutionsInput {
  /** A unique identifier for the workflow. */
  WorkflowId: string;
  /** The maximum number of items to return. */
  MaxResults?: number;
  /** ListExecutions returns the NextToken parameter in the output. You can then pass the NextToken parameter in a subsequent command to continue listing additional executions. This is useful for pagination */
  NextToken?: string;
}

export interface ListFileTransferResultsInput {
  /** A unique identifier for a connector. This value should match the value supplied to the corresponding StartFileTransfer call. */
  ConnectorId: string;
  /** A unique identifier for a file transfer. This value should match the value supplied to the corresponding StartFileTransfer call. */
  TransferId: string;
  /** The maximum number of files to return in a single page. Note that currently you can specify a maximum of 10 file paths in a single StartFileTransfer operation. Thus, the maximum number of file transfe */
  MaxResults?: number;
  /** If there are more file details than returned in this call, use this value for a subsequent call to ListFileTransferResults to retrieve them. */
  NextToken?: string;
}

export interface ListHostKeysInput {
  /** The identifier of the server that contains the host keys that you want to view. */
  ServerId: string;
  /** The maximum number of items to return. */
  MaxResults?: number;
  /** When there are additional results that were not returned, a NextToken parameter is returned. You can use that value for a subsequent call to ListHostKeys to continue listing results. */
  NextToken?: string;
}

export interface ListProfilesInput {
  /** The maximum number of items to return. */
  MaxResults?: number;
  /** When there are additional results that were not returned, a NextToken parameter is returned. You can use that value for a subsequent call to ListProfiles to continue listing results. */
  NextToken?: string;
  /** Indicates whether to list only LOCAL type profiles or only PARTNER type profiles. If not supplied in the request, the command lists all types of profiles. */
  ProfileType?: 'LOCAL' | 'PARTNER';
}

export interface ListSecurityPoliciesInput {
  /** Specifies the number of security policies to return as a response to the ListSecurityPolicies query. */
  MaxResults?: number;
  /** When additional results are obtained from the ListSecurityPolicies command, a NextToken parameter is returned in the output. You can then pass the NextToken parameter in a subsequent command to contin */
  NextToken?: string;
}

export interface ListServersInput {
  /** Specifies the number of servers to return as a response to the ListServers query. */
  MaxResults?: number;
  /** When additional results are obtained from the ListServers command, a NextToken parameter is returned in the output. You can then pass the NextToken parameter in a subsequent command to continue listin */
  NextToken?: string;
}

export interface ListTagsForResourceInput {
  /** Requests the tags associated with a particular Amazon Resource Name (ARN). An ARN is an identifier for a specific Amazon Web Services resource, such as a server, user, or role. */
  Arn: string;
  /** Specifies the number of tags to return as a response to the ListTagsForResource request. */
  MaxResults?: number;
  /** When you request additional results from the ListTagsForResource operation, a NextToken parameter is returned in the input. You can then pass in a subsequent command to the NextToken parameter to cont */
  NextToken?: string;
}

export interface ListUsersInput {
  /** A system-assigned unique identifier for a server that has users assigned to it. */
  ServerId: string;
  /** Specifies the number of users to return as a response to the ListUsers request. */
  MaxResults?: number;
  /** If there are additional results from the ListUsers call, a NextToken parameter is returned in the output. You can then pass the NextToken to a subsequent ListUsers command, to continue listing additio */
  NextToken?: string;
}

export interface ListWebAppsInput {
  /** The maximum number of items to return. */
  MaxResults?: number;
  /** Returns the NextToken parameter in the output. You can then pass the NextToken parameter in a subsequent command to continue listing additional web apps. */
  NextToken?: string;
}

export interface ListWorkflowsInput {
  /** The maximum number of items to return. */
  MaxResults?: number;
  /** ListWorkflows returns the NextToken parameter in the output. You can then pass the NextToken parameter in a subsequent command to continue listing additional workflows. */
  NextToken?: string;
}

export interface SendWorkflowStepStateInput {
  /** A unique identifier for the execution of a workflow. */
  ExecutionId: string;
  /** Indicates whether the specified step succeeded or failed. */
  Status: 'SUCCESS' | 'FAILURE';
  /** Used to distinguish between multiple callbacks for multiple Lambda steps within the same execution. */
  Token: string;
  /** A unique identifier for the workflow. */
  WorkflowId: string;
}

export interface StartDirectoryListingInput {
  /** The unique identifier for the connector. */
  ConnectorId: string;
  /** Specifies the path (bucket and prefix) in Amazon S3 storage to store the results of the directory listing. */
  OutputDirectoryPath: string;
  /** Specifies the directory on the remote SFTP server for which you want to list its contents. */
  RemoteDirectoryPath: string;
  /** An optional parameter where you can specify the maximum number of file/directory names to retrieve. The default value is 1,000. */
  MaxItems?: number;
}

export interface StartFileTransferInput {
  /** The unique identifier for the connector. */
  ConnectorId: string;
  /** An array of key-value pairs that represent custom HTTP headers to include in AS2 messages. These headers are added to the AS2 message when sending files to your trading partner. */
  CustomHttpHeaders?: CustomHttpHeader[];
  /** For an inbound transfer, the LocaDirectoryPath specifies the destination for one or more files that are transferred from the partner's SFTP server. */
  LocalDirectoryPath?: string;
  /** For an outbound transfer, the RemoteDirectoryPath specifies the destination for one or more files that are transferred to the partner's SFTP server. If you don't specify a RemoteDirectoryPath, the des */
  RemoteDirectoryPath?: string;
  /** One or more source paths for the partner's SFTP server. Each string represents a source file path for one inbound file transfer. */
  RetrieveFilePaths?: string[];
  /** One or more source paths for the Amazon S3 storage. Each string represents a source file path for one outbound file transfer. For example, amzn-s3-demo-bucket/myfile.txt . Replace amzn-s3-demo-bucket  */
  SendFilePaths?: string[];
}

export interface StartRemoteDeleteInput {
  /** The unique identifier for the connector. */
  ConnectorId: string;
  /** The absolute path of the file or directory to delete. You can only specify one path per call to this operation. */
  DeletePath: string;
}

export interface StartRemoteMoveInput {
  /** The unique identifier for the connector. */
  ConnectorId: string;
  /** The absolute path of the file or directory to move or rename. You can only specify one path per call to this operation. */
  SourcePath: string;
  /** The absolute path for the target of the move/rename operation. */
  TargetPath: string;
}

export interface StartServerInput {
  /** A system-assigned unique identifier for a server that you start. */
  ServerId: string;
}

export interface StopServerInput {
  /** A system-assigned unique identifier for a server that you stopped. */
  ServerId: string;
}

export interface TagResourceInput {
  /** An Amazon Resource Name (ARN) for a specific Amazon Web Services resource, such as a server, user, or role. */
  Arn: string;
  /** Key-value pairs assigned to ARNs that you can use to group and search for resources by type. You can attach this metadata to resources (servers, users, workflows, and so on) for any purpose. */
  Tags: Tag[];
}

export interface TestConnectionInput {
  /** The unique identifier for the connector. */
  ConnectorId: string;
}

export interface TestIdentityProviderInput {
  /** A system-assigned identifier for a specific server. That server's user authentication method is tested with a user name and password. */
  ServerId: string;
  /** The name of the account to be tested. */
  UserName: string;
  /** The type of file transfer protocol to be tested. The available protocols are: Secure Shell (SSH) File Transfer Protocol (SFTP) File Transfer Protocol Secure (FTPS) File Transfer Protocol (FTP) Applica */
  ServerProtocol?: 'SFTP' | 'FTP' | 'FTPS' | 'AS2';
  /** The source IP address of the account to be tested. */
  SourceIp?: string;
  /** The password of the account to be tested. */
  UserPassword?: string;
}

export interface UntagResourceInput {
  /** The value of the resource that will have the tag removed. An Amazon Resource Name (ARN) is an identifier for a specific Amazon Web Services resource, such as a server, user, or role. */
  Arn: string;
  /** TagKeys are key-value pairs assigned to ARNs that can be used to group and search for resources by type. This metadata can be attached to resources for any purpose. */
  TagKeys: string[];
}

export interface UpdateAccessInput {
  /** A unique identifier that is required to identify specific groups within your directory. The users of the group that you associate have access to your Amazon S3 or Amazon EFS resources over the enabled */
  ExternalId: string;
  /** A system-assigned unique identifier for a server instance. This is the specific server that you added your user to. */
  ServerId: string;
  /** The landing directory (folder) for a user when they log in to the server using the client. A HomeDirectory example is /bucket_name/home/mydirectory. You can use the HomeDirectory parameter for HomeDir */
  HomeDirectory?: string;
  /** Logical directory mappings that specify what Amazon S3 or Amazon EFS paths and keys should be visible to your user and how you want to make them visible. You must specify the Entry and Target pair, wh */
  HomeDirectoryMappings?: HomeDirectoryMapEntry[];
  /** The type of landing directory (folder) that you want your users' home directory to be when they log in to the server. If you set it to PATH, the user will see the absolute Amazon S3 bucket or Amazon E */
  HomeDirectoryType?: 'PATH' | 'LOGICAL';
  /** A session policy for your user so that you can use the same Identity and Access Management (IAM) role across multiple users. This policy scopes down a user's access to portions of their Amazon S3 buck */
  Policy?: string;
  PosixProfile?: PosixProfile;
  /** The Amazon Resource Name (ARN) of the Identity and Access Management (IAM) role that controls your users' access to your Amazon S3 bucket or Amazon EFS file system. The policies attached to this role  */
  Role?: string;
}

export interface UpdateAgreementInput {
  /** A unique identifier for the agreement. This identifier is returned when you create an agreement. */
  AgreementId: string;
  /** A system-assigned unique identifier for a server instance. This is the specific server that the agreement uses. */
  ServerId: string;
  /** Connectors are used to send files using either the AS2 or SFTP protocol. For the access role, provide the Amazon Resource Name (ARN) of the Identity and Access Management role to use. For AS2 connecto */
  AccessRole?: string;
  /** To change the landing directory (folder) for files that are transferred, provide the bucket folder that you want to use; for example, /amzn-s3-demo-bucket/home/mydirectory . */
  BaseDirectory?: string;
  /** A CustomDirectoriesType structure. This structure specifies custom directories for storing various AS2 message files. You can specify directories for the following types of files. Failed files MDN fil */
  CustomDirectories?: CustomDirectoriesType;
  /** To replace the existing description, provide a short description for the agreement. */
  Description?: string;
  /** Determines whether or not unsigned messages from your trading partners will be accepted. ENABLED: Transfer Family rejects unsigned messages from your trading partner. DISABLED (default value): Transfe */
  EnforceMessageSigning?: 'ENABLED' | 'DISABLED';
  /** A unique identifier for the AS2 local profile. To change the local profile identifier, provide a new value here. */
  LocalProfileId?: string;
  /** A unique identifier for the partner profile. To change the partner profile identifier, provide a new value here. */
  PartnerProfileId?: string;
  /** Determines whether or not Transfer Family appends a unique string of characters to the end of the AS2 message payload filename when saving it. ENABLED: the filename provided by your trading parter is  */
  PreserveFilename?: 'ENABLED' | 'DISABLED';
  /** You can update the status for the agreement, either activating an inactive agreement or the reverse. */
  Status?: 'ACTIVE' | 'INACTIVE';
}

export interface UpdateCertificateInput {
  /** The identifier of the certificate object that you are updating. */
  CertificateId: string;
  /** An optional date that specifies when the certificate becomes active. If you do not specify a value, ActiveDate takes the same value as NotBeforeDate, which is specified by the CA. */
  ActiveDate?: string;
  /** A short description to help identify the certificate. */
  Description?: string;
  /** An optional date that specifies when the certificate becomes inactive. If you do not specify a value, InactiveDate takes the same value as NotAfterDate, which is specified by the CA. */
  InactiveDate?: string;
}

export interface UpdateConnectorInput {
  /** The unique identifier for the connector. */
  ConnectorId: string;
  /** Connectors are used to send files using either the AS2 or SFTP protocol. For the access role, provide the Amazon Resource Name (ARN) of the Identity and Access Management role to use. For AS2 connecto */
  AccessRole?: string;
  /** A structure that contains the parameters for an AS2 connector object. */
  As2Config?: As2ConnectorConfig;
  /** Updates the egress configuration for the connector, allowing you to modify how traffic is routed from the connector to the SFTP server. Changes to VPC configuration may require connector restart. */
  EgressConfig?: { VpcLattice?: UpdateConnectorVpcLatticeEgressConfig };
  /** The Amazon Resource Name (ARN) of the Identity and Access Management (IAM) role that allows a connector to turn on CloudWatch logging for Amazon S3 events. When set, you can view connector activity in */
  LoggingRole?: string;
  /** Specifies the name of the security policy for the connector. */
  SecurityPolicyName?: string;
  /** A structure that contains the parameters for an SFTP connector object. */
  SftpConfig?: SftpConnectorConfig;
  /** The URL of the partner's AS2 or SFTP endpoint. When creating AS2 connectors or service-managed SFTP connectors (connectors without egress configuration), you must provide a URL to specify the remote s */
  Url?: string;
}

export interface UpdateHostKeyInput {
  /** An updated description for the host key. */
  Description: string;
  /** The identifier of the host key that you are updating. */
  HostKeyId: string;
  /** The identifier of the server that contains the host key that you are updating. */
  ServerId: string;
}

export interface UpdateProfileInput {
  /** The identifier of the profile object that you are updating. */
  ProfileId: string;
  /** An array of identifiers for the imported certificates. You use this identifier for working with profiles and partner profiles. */
  CertificateIds?: string[];
}

export interface UpdateServerInput {
  /** A system-assigned unique identifier for a server instance that the Transfer Family user is assigned to. */
  ServerId: string;
  /** The Amazon Resource Name (ARN) of the Amazon Web ServicesCertificate Manager (ACM) certificate. Required when Protocols is set to FTPS. To request a new public certificate, see Request a public certif */
  Certificate?: string;
  /** The virtual private cloud (VPC) endpoint settings that are configured for your server. When you host your endpoint within your VPC, you can make your endpoint accessible only to resources within your  */
  EndpointDetails?: EndpointDetails;
  /** The type of endpoint that you want your server to use. You can choose to make your server's endpoint publicly accessible (PUBLIC) or host it inside your VPC. With an endpoint that is hosted in a VPC,  */
  EndpointType?: 'PUBLIC' | 'VPC' | 'VPC_ENDPOINT';
  /** The RSA, ECDSA, or ED25519 private key to use for your SFTP-enabled server. You can add multiple host keys, in case you want to rotate keys, or have a set of active keys that use different algorithms. */
  HostKey?: string;
  /** An array containing all of the information required to call a customer's authentication API method. */
  IdentityProviderDetails?: IdentityProviderDetails;
  /** The mode of authentication for a server. The default value is SERVICE_MANAGED, which allows you to store and access user credentials within the Transfer Family service. Use AWS_DIRECTORY_SERVICE to pr */
  IdentityProviderType?: 'SERVICE_MANAGED' | 'API_GATEWAY' | 'AWS_DIRECTORY_SERVICE' | 'AWS_LAMBDA';
  /** Specifies whether to use IPv4 only, or to use dual-stack (IPv4 and IPv6) for your Transfer Family endpoint. The default value is IPV4. The IpAddressType parameter has the following limitations: It can */
  IpAddressType?: 'IPV4' | 'DUALSTACK';
  /** The Amazon Resource Name (ARN) of the Identity and Access Management (IAM) role that allows a server to turn on Amazon CloudWatch logging for Amazon S3 or Amazon EFS events. When set, you can view use */
  LoggingRole?: string;
  /** Specifies a string to display when users connect to a server. This string is displayed after the user authenticates. The SFTP protocol does not support post-authentication display banners. */
  PostAuthenticationLoginBanner?: string;
  /** Specifies a string to display when users connect to a server. This string is displayed before the user authenticates. For example, the following banner displays details about using the system: This sy */
  PreAuthenticationLoginBanner?: string;
  /** The protocol settings that are configured for your server. Avoid placing Network Load Balancers (NLBs) or NAT gateways in front of Transfer Family servers, as this increases costs and can cause perfor */
  ProtocolDetails?: ProtocolDetails;
  /** Specifies the file transfer protocol or protocols over which your file transfer protocol client can connect to your server's endpoint. The available protocols are: SFTP (Secure Shell (SSH) File Transf */
  Protocols?: 'SFTP' | 'FTP' | 'FTPS' | 'AS2'[];
  /** Specifies whether or not performance for your Amazon S3 directories is optimized. If using the console, this is enabled by default. If using the API or CLI, this is disabled by default. By default, ho */
  S3StorageOptions?: S3StorageOptions;
  /** Specifies the name of the security policy for the server. */
  SecurityPolicyName?: string;
  /** Specifies the log groups to which your server logs are sent. To specify a log group, you must provide the ARN for an existing log group. In this case, the format of the log group is as follows: arn:aw */
  StructuredLogDestinations?: string[];
  /** Specifies the workflow ID for the workflow to assign and the execution role that's used for executing the workflow. In addition to a workflow to execute when a file is uploaded completely, WorkflowDet */
  WorkflowDetails?: WorkflowDetails;
}

export interface UpdateUserInput {
  /** A system-assigned unique identifier for a Transfer Family server instance that the user is assigned to. */
  ServerId: string;
  /** A unique string that identifies a user and is associated with a server as specified by the ServerId. This user name must be a minimum of 3 and a maximum of 100 characters long. The following are valid */
  UserName: string;
  /** The landing directory (folder) for a user when they log in to the server using the client. A HomeDirectory example is /bucket_name/home/mydirectory. You can use the HomeDirectory parameter for HomeDir */
  HomeDirectory?: string;
  /** Logical directory mappings that specify what Amazon S3 or Amazon EFS paths and keys should be visible to your user and how you want to make them visible. You must specify the Entry and Target pair, wh */
  HomeDirectoryMappings?: HomeDirectoryMapEntry[];
  /** The type of landing directory (folder) that you want your users' home directory to be when they log in to the server. If you set it to PATH, the user will see the absolute Amazon S3 bucket or Amazon E */
  HomeDirectoryType?: 'PATH' | 'LOGICAL';
  /** A session policy for your user so that you can use the same Identity and Access Management (IAM) role across multiple users. This policy scopes down a user's access to portions of their Amazon S3 buck */
  Policy?: string;
  /** Specifies the full POSIX identity, including user ID (Uid), group ID (Gid), and any secondary groups IDs (SecondaryGids), that controls your users' access to your Amazon Elastic File Systems (Amazon E */
  PosixProfile?: PosixProfile;
  /** The Amazon Resource Name (ARN) of the Identity and Access Management (IAM) role that controls your users' access to your Amazon S3 bucket or Amazon EFS file system. The policies attached to this role  */
  Role?: string;
}

export interface UpdateWebAppInput {
  /** Provide the identifier of the web app that you are updating. */
  WebAppId: string;
  /** The AccessEndpoint is the URL that you provide to your users for them to interact with the Transfer Family web app. You can specify a custom URL or use the default value. */
  AccessEndpoint?: string;
  /** The updated endpoint configuration for the web app. You can modify the endpoint type and VPC configuration settings. */
  EndpointDetails?: { Vpc?: UpdateWebAppVpcConfig };
  /** Provide updated identity provider values in a WebAppIdentityProviderDetails object. */
  IdentityProviderDetails?: { IdentityCenterConfig?: UpdateWebAppIdentityCenterConfig };
  /** A union that contains the value for number of concurrent connections or the user sessions on your web app. */
  WebAppUnits?: { Provisioned?: number };
}

export interface UpdateWebAppCustomizationInput {
  /** Provide the identifier of the web app that you are updating. */
  WebAppId: string;
  /** Specify an icon file data string (in base64 encoding). */
  FaviconFile?: string;
  /** Specify logo file data string (in base64 encoding). */
  LogoFile?: string;
  /** Provide an updated title. */
  Title?: string;
}

/** Transfer service binding for Step Functions SDK integrations. */
export class Transfer {
  constructor() {}

  createAccess<T>(params: CreateAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createAgreement<T>(params: CreateAgreementInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createConnector<T>(params: CreateConnectorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createProfile<T>(params: CreateProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createServer<T>(params: CreateServerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createWebApp<T>(params: CreateWebAppInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createWorkflow<T>(params: CreateWorkflowInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAccess<T>(params: DeleteAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAgreement<T>(params: DeleteAgreementInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCertificate<T>(params: DeleteCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteConnector<T>(params: DeleteConnectorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteHostKey<T>(params: DeleteHostKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteProfile<T>(params: DeleteProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteServer<T>(params: DeleteServerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSshPublicKey<T>(params: DeleteSshPublicKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteUser<T>(params: DeleteUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteWebApp<T>(params: DeleteWebAppInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteWebAppCustomization<T>(params: DeleteWebAppCustomizationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteWorkflow<T>(params: DeleteWorkflowInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAccess<T>(params: DescribeAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAgreement<T>(params: DescribeAgreementInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCertificate<T>(params: DescribeCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeConnector<T>(params: DescribeConnectorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeExecution<T>(params: DescribeExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeHostKey<T>(params: DescribeHostKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeProfile<T>(params: DescribeProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeSecurityPolicy<T>(params: DescribeSecurityPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeServer<T>(params: DescribeServerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeUser<T>(params: DescribeUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeWebApp<T>(params: DescribeWebAppInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeWebAppCustomization<T>(params: DescribeWebAppCustomizationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeWorkflow<T>(params: DescribeWorkflowInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  importCertificate<T>(params: ImportCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  importHostKey<T>(params: ImportHostKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  importSshPublicKey<T>(params: ImportSshPublicKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAccesses<T>(params: ListAccessesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAgreements<T>(params: ListAgreementsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listCertificates<T>(params: ListCertificatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listConnectors<T>(params: ListConnectorsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listExecutions<T>(params: ListExecutionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listFileTransferResults<T>(params: ListFileTransferResultsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listHostKeys<T>(params: ListHostKeysInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listProfiles<T>(params: ListProfilesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSecurityPolicies<T>(params: ListSecurityPoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listServers<T>(params: ListServersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listUsers<T>(params: ListUsersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listWebApps<T>(params: ListWebAppsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listWorkflows<T>(params: ListWorkflowsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  sendWorkflowStepState<T>(params: SendWorkflowStepStateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startDirectoryListing<T>(params: StartDirectoryListingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startFileTransfer<T>(params: StartFileTransferInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startRemoteDelete<T>(params: StartRemoteDeleteInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startRemoteMove<T>(params: StartRemoteMoveInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startServer<T>(params: StartServerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopServer<T>(params: StopServerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  testConnection<T>(params: TestConnectionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  testIdentityProvider<T>(params: TestIdentityProviderInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateAccess<T>(params: UpdateAccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateAgreement<T>(params: UpdateAgreementInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateCertificate<T>(params: UpdateCertificateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateConnector<T>(params: UpdateConnectorInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateHostKey<T>(params: UpdateHostKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateProfile<T>(params: UpdateProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateServer<T>(params: UpdateServerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateUser<T>(params: UpdateUserInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateWebApp<T>(params: UpdateWebAppInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateWebAppCustomization<T>(params: UpdateWebAppCustomizationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
