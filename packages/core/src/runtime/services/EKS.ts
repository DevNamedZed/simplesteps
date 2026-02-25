// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface AccessScope {
  /** The scope type of an access policy. */
  type?: 'cluster' | 'namespace';
  /** A Kubernetes namespace that an access policy is scoped to. A value is required if you specified namespace for Type. */
  namespaces?: string[];
}

export interface EncryptionConfig {
  /** Specifies the resources to be encrypted. The only supported value is secrets. */
  resources?: any[];
  /** Key Management Service (KMS) key. Either the ARN or the alias can be used. */
  provider?: any;
}

export interface OidcIdentityProviderConfigRequest {
  /** The name of the OIDC provider configuration. */
  identityProviderConfigName: string;
  /** The URL of the OIDC identity provider that allows the API server to discover public signing keys for verifying tokens. The URL must begin with https:// and should correspond to the iss claim in the pr */
  issuerUrl: string;
  /** This is also known as audience. The ID for the client application that makes authentication requests to the OIDC identity provider. */
  clientId: string;
  /** The JSON Web Token (JWT) claim to use as the username. The default is sub, which is expected to be a unique identifier of the end user. You can choose other claims, such as email or name, depending on */
  usernameClaim?: string;
  /** The prefix that is prepended to username claims to prevent clashes with existing names. If you do not provide this field, and username is a value other than email, the prefix defaults to issuerurl#. Y */
  usernamePrefix?: string;
  /** The JWT claim that the provider uses to return your groups. */
  groupsClaim?: string;
  /** The prefix that is prepended to group claims to prevent clashes with existing names (such as system: groups). For example, the value oidc: will create group names like oidc:engineering and oidc:infra. */
  groupsPrefix?: string;
  /** The key value pairs that describe required claims in the identity token. If set, each claim is verified to be present in the token with a matching value. For the maximum number of claims that you can  */
  requiredClaims?: Record<string, string>;
}

export interface AddonPodIdentityAssociations {
  /** The name of a Kubernetes Service Account. */
  serviceAccount: string;
  /** The ARN of an IAM Role. */
  roleArn: string;
}

export interface AddonNamespaceConfigRequest {
  /** The name of the Kubernetes namespace to install the addon in. Must be a valid RFC 1123 DNS label. */
  namespace?: string;
}

export interface ArgoCdConfigRequest {
  /** The Kubernetes namespace where Argo CD resources will be created. If not specified, the default namespace is used. */
  namespace?: string;
  /** Configuration for IAM Identity CenterIAM; Identity Center integration. When configured, users can authenticate to Argo CD using their IAM Identity CenterIAM; Identity Center credentials. */
  awsIdc: any;
  /** A list of role mappings that define which IAM Identity CenterIAM; Identity Center users or groups have which Argo CD roles. Each mapping associates an Argo CD role (ADMIN, EDITOR, or VIEWER) with one  */
  rbacRoleMappings?: any[];
  /** Configuration for network access to the Argo CD capability's managed API server endpoint. By default, the Argo CD server is accessible via a public endpoint. You can optionally specify one or more VPC */
  networkAccess?: any;
}

export interface CapabilityConfigurationRequest {
  /** Configuration settings specific to Argo CD capabilities. This field is only used when creating or updating an Argo CD capability. */
  argoCd?: ArgoCdConfigRequest;
}

export interface VpcConfigRequest {
  /** Specify subnets for your Amazon EKS nodes. Amazon EKS creates cross-account elastic network interfaces in these subnets to allow communication between your nodes and the Kubernetes control plane. */
  subnetIds?: string[];
  /** Specify one or more security groups for the cross-account elastic network interfaces that Amazon EKS creates to use that allow communication between your nodes and the Kubernetes control plane. If you */
  securityGroupIds?: string[];
  /** Set this value to false to disable public access to your cluster's Kubernetes API server endpoint. If you disable public access, your cluster's Kubernetes API server can only receive requests from wit */
  endpointPublicAccess?: boolean;
  /** Set this value to true to enable private access for your cluster's Kubernetes API server endpoint. If you enable private access, Kubernetes API requests from within your cluster's VPC use the private  */
  endpointPrivateAccess?: boolean;
  /** The CIDR blocks that are allowed access to your cluster's public Kubernetes API server endpoint. Communication to the endpoint from addresses outside of the CIDR blocks that you specify is denied. The */
  publicAccessCidrs?: string[];
}

export interface ElasticLoadBalancing {
  /** Indicates if the load balancing capability is enabled on your EKS Auto Mode cluster. If the load balancing capability is enabled, EKS Auto Mode will create and delete load balancers in your Amazon Web */
  enabled?: boolean;
}

export interface KubernetesNetworkConfigRequest {
  /** Don't specify a value if you select ipv6 for ipFamily. The CIDR block to assign Kubernetes service IP addresses from. If you don't specify a block, Kubernetes assigns addresses from either the 10.100. */
  serviceIpv4Cidr?: string;
  /** Specify which IP family is used to assign Kubernetes pod and service IP addresses. If you don't specify a value, ipv4 is used by default. You can only specify an IP family when you create a cluster an */
  ipFamily?: 'ipv4' | 'ipv6';
  /** Request to enable or disable the load balancing capability on your EKS Auto Mode cluster. For more information, see EKS Auto Mode load balancing capability in the Amazon EKS User Guide. */
  elasticLoadBalancing?: ElasticLoadBalancing;
}

export interface Logging {
  /** The cluster control plane logging configuration for your cluster. */
  clusterLogging?: any[];
}

export interface ControlPlanePlacementRequest {
  /** The name of the placement group for the Kubernetes control plane instances. This setting can't be changed after cluster creation. */
  groupName?: string;
}

export interface OutpostConfigRequest {
  /** The ARN of the Outpost that you want to use for your local Amazon EKS cluster on Outposts. Only a single Outpost ARN is supported. */
  outpostArns: string[];
  /** The Amazon EC2 instance type that you want to use for your local Amazon EKS cluster on Outposts. Choose an instance type based on the number of nodes that your cluster will have. For more information, */
  controlPlaneInstanceType: string;
  /** An object representing the placement configuration for all the control plane instances of your local Amazon EKS cluster on an Amazon Web Services Outpost. For more information, see Capacity considerat */
  controlPlanePlacement?: ControlPlanePlacementRequest;
}

export interface CreateAccessConfigRequest {
  /** Specifies whether or not the cluster creator IAM principal was set as a cluster admin access entry during cluster creation time. The default value is true. */
  bootstrapClusterCreatorAdminPermissions?: boolean;
  /** The desired authentication mode for the cluster. If you create a cluster by using the EKS API, Amazon Web Services SDKs, or CloudFormation, the default is CONFIG_MAP. If you create the cluster by usin */
  authenticationMode?: 'API' | 'API_AND_CONFIG_MAP' | 'CONFIG_MAP';
}

export interface UpgradePolicyRequest {
  /** If the cluster is set to EXTENDED, it will enter extended support at the end of standard support. If the cluster is set to STANDARD, it will be automatically upgraded at the end of standard support. L */
  supportType?: 'STANDARD' | 'EXTENDED';
}

export interface ZonalShiftConfigRequest {
  /** If zonal shift is enabled, Amazon Web Services configures zonal autoshift for the cluster. */
  enabled?: boolean;
}

export interface RemoteNetworkConfigRequest {
  /** The list of network CIDRs that can contain hybrid nodes. These CIDR blocks define the expected IP address range of the hybrid nodes that join the cluster. These blocks are typically determined by your */
  remoteNodeNetworks?: any[];
  /** The list of network CIDRs that can contain pods that run Kubernetes webhooks on hybrid nodes. These CIDR blocks are determined by configuring your Container Network Interface (CNI) plugin. We recommen */
  remotePodNetworks?: any[];
}

export interface ComputeConfigRequest {
  /** Request to enable or disable the compute capability on your EKS Auto Mode cluster. If the compute capability is enabled, EKS Auto Mode will create and delete EC2 Managed Instances in your Amazon Web S */
  enabled?: boolean;
  /** Configuration for node pools that defines the compute resources for your EKS Auto Mode cluster. For more information, see EKS Auto Mode Node Pools in the Amazon EKS User Guide. */
  nodePools?: string[];
  /** The ARN of the IAM Role EKS will assign to EC2 Managed Instances in your EKS Auto Mode cluster. This value cannot be changed after the compute capability of EKS Auto Mode is enabled. For more informat */
  nodeRoleArn?: string;
}

export interface BlockStorage {
  /** Indicates if the block storage capability is enabled on your EKS Auto Mode cluster. If the block storage capability is enabled, EKS Auto Mode will create and delete EBS volumes in your Amazon Web Serv */
  enabled?: boolean;
}

export interface StorageConfigRequest {
  /** Request to configure EBS Block Storage settings for your EKS Auto Mode cluster. */
  blockStorage?: BlockStorage;
}

export interface ControlPlaneScalingConfig {
  /** The control plane scaling tier configuration. Available options are standard, tier-xl, tier-2xl, or tier-4xl. For more information, see EKS Provisioned Control Plane in the Amazon EKS User Guide. */
  tier?: 'standard' | 'tier-xl' | 'tier-2xl' | 'tier-4xl';
}

export interface EksAnywhereSubscriptionTerm {
  /** The duration of the subscription term. Valid values are 12 and 36, indicating a 12 month or 36 month subscription. */
  duration?: number;
  /** The term unit of the subscription. Valid value is MONTHS. */
  unit?: 'MONTHS';
}

export interface FargateProfileSelector {
  /** The Kubernetes namespace that the selector should match. */
  namespace?: string;
  /** The Kubernetes labels that the selector should match. A pod must contain all of the labels that are specified in the selector for it to be considered a match. */
  labels?: Record<string, any>;
}

export interface NodegroupScalingConfig {
  /** The minimum number of nodes that the managed node group can scale in to. */
  minSize?: number;
  /** The maximum number of nodes that the managed node group can scale out to. For information about the maximum number that you can specify, see Amazon EKS service quotas in the Amazon EKS User Guide. */
  maxSize?: number;
  /** The current number of nodes that the managed node group should maintain. If you use the Kubernetes Cluster Autoscaler, you shouldn't change the desiredSize value directly, as this can cause the Cluste */
  desiredSize?: number;
}

export interface RemoteAccessConfig {
  /** The Amazon EC2 SSH key name that provides access for SSH communication with the nodes in the managed node group. For more information, see Amazon EC2 key pairs and Linux instances in the Amazon Elasti */
  ec2SshKey?: string;
  /** The security group IDs that are allowed SSH access (port 22) to the nodes. For Windows, the port is 3389. If you specify an Amazon EC2 SSH key but don't specify a source security group when you create */
  sourceSecurityGroups?: string[];
}

export interface Taint {
  /** The key of the taint. */
  key?: string;
  /** The value of the taint. */
  value?: string;
  /** The effect of the taint. */
  effect?: 'NO_SCHEDULE' | 'NO_EXECUTE' | 'PREFER_NO_SCHEDULE';
}

export interface LaunchTemplateSpecification {
  /** The name of the launch template. You must specify either the launch template name or the launch template ID in the request, but not both. After node group creation, you cannot use a different name. */
  name?: string;
  /** The version number of the launch template to use. If no version is specified, then the template's default version is used. You can use a different version for node group updates. */
  version?: string;
  /** The ID of the launch template. You must specify either the launch template ID or the launch template name in the request, but not both. After node group creation, you cannot use a different ID. */
  id?: string;
}

export interface NodegroupUpdateConfig {
  /** The maximum number of nodes unavailable at once during a version update. Nodes are updated in parallel. This value or maxUnavailablePercentage is required to have a value.The maximum number is 100. */
  maxUnavailable?: number;
  /** The maximum percentage of nodes unavailable during a version update. This percentage of nodes are updated in parallel, up to 100 nodes at once. This value or maxUnavailable is required to have a value */
  maxUnavailablePercentage?: number;
  /** The configuration for the behavior to follow during a node group version update of this managed node group. You choose between two possible strategies for replacing nodes during an UpdateNodegroupVers */
  updateStrategy?: 'DEFAULT' | 'MINIMAL';
}

export interface NodeRepairConfig {
  /** Specifies whether to enable node auto repair for the node group. Node auto repair is disabled by default. */
  enabled?: boolean;
  /** Specify a count threshold of unhealthy nodes, above which node auto repair actions will stop. When using this, you cannot also set maxUnhealthyNodeThresholdPercentage at the same time. */
  maxUnhealthyNodeThresholdCount?: number;
  /** Specify a percentage threshold of unhealthy nodes, above which node auto repair actions will stop. When using this, you cannot also set maxUnhealthyNodeThresholdCount at the same time. */
  maxUnhealthyNodeThresholdPercentage?: number;
  /** Specify the maximum number of nodes that can be repaired concurrently or in parallel, expressed as a count of unhealthy nodes. This gives you finer-grained control over the pace of node replacements.  */
  maxParallelNodesRepairedCount?: number;
  /** Specify the maximum number of nodes that can be repaired concurrently or in parallel, expressed as a percentage of unhealthy nodes. This gives you finer-grained control over the pace of node replaceme */
  maxParallelNodesRepairedPercentage?: number;
  /** Specify granular overrides for specific repair actions. These overrides control the repair action and the repair delay time before a node is considered eligible for repair. If you use this, you must s */
  nodeRepairConfigOverrides?: any[];
}

export interface IdentityProviderConfig {
  /** The type of the identity provider configuration. The only type available is oidc. */
  type: string;
  /** The name of the identity provider configuration. */
  name: string;
}

export interface InsightsFilter {
  /** The categories to use to filter insights. The following lists the available categories: UPGRADE_READINESS: Amazon EKS identifies issues that could impact your ability to upgrade to new versions of Kub */
  categories?: 'UPGRADE_READINESS' | 'MISCONFIGURATION'[];
  /** The Kubernetes versions to use to filter the insights. */
  kubernetesVersions?: string[];
  /** The statuses to use to filter the insights. */
  statuses?: 'PASSING' | 'WARNING' | 'ERROR' | 'UNKNOWN'[];
}

export interface ConnectorConfigRequest {
  /** The Amazon Resource Name (ARN) of the role that is authorized to request the connector configuration. */
  roleArn: string;
  /** The cloud provider for the target cluster to connect. */
  provider: 'EKS_ANYWHERE' | 'ANTHOS' | 'GKE' | 'AKS' | 'OPENSHIFT' | 'TANZU' | 'RANCHER' | 'EC2' | 'OTHER';
}

export interface UpdateArgoCdConfig {
  /** Updated RBAC role mappings for the Argo CD capability. You can add, update, or remove role mappings. */
  rbacRoleMappings?: any;
  /** Updated network access configuration for the Argo CD capability's managed API server endpoint. You can add or remove VPC endpoint associations to control which VPCs have private access to the Argo CD  */
  networkAccess?: any;
}

export interface UpdateCapabilityConfiguration {
  /** Configuration updates specific to Argo CD capabilities. */
  argoCd?: UpdateArgoCdConfig;
}

export interface UpdateAccessConfigRequest {
  /** The desired authentication mode for the cluster. */
  authenticationMode?: 'API' | 'API_AND_CONFIG_MAP' | 'CONFIG_MAP';
}

export interface UpdateLabelsPayload {
  /** The Kubernetes labels to add or update. */
  addOrUpdateLabels?: Record<string, string>;
  /** The Kubernetes labels to remove. */
  removeLabels?: string[];
}

export interface UpdateTaintsPayload {
  /** Kubernetes taints to be added or updated. */
  addOrUpdateTaints?: any[];
  /** Kubernetes taints to remove. */
  removeTaints?: any[];
}

export interface AssociateAccessPolicyInput {
  /** The scope for the AccessPolicy. You can scope access policies to an entire cluster or to specific Kubernetes namespaces. */
  accessScope: AccessScope;
  /** The name of your cluster. */
  clusterName: string;
  /** The ARN of the AccessPolicy that you're associating. For a list of ARNs, use ListAccessPolicies. */
  policyArn: string;
  /** The Amazon Resource Name (ARN) of the IAM user or role for the AccessEntry that you're associating the access policy to. */
  principalArn: string;
}

export interface AssociateEncryptionConfigInput {
  /** The name of your cluster. */
  clusterName: string;
  /** The configuration you are using for encryption. */
  encryptionConfig: EncryptionConfig[];
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  clientRequestToken?: string;
}

export interface AssociateIdentityProviderConfigInput {
  /** The name of your cluster. */
  clusterName: string;
  /** An object representing an OpenID Connect (OIDC) identity provider configuration. */
  oidc: OidcIdentityProviderConfigRequest;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  clientRequestToken?: string;
  /** Metadata that assists with categorization and organization. Each tag consists of a key and an optional value. You define both. Tags don't propagate to any other cluster or Amazon Web Services resource */
  tags?: Record<string, string>;
}

export interface CreateAccessEntryInput {
  /** The name of your cluster. */
  clusterName: string;
  /** The ARN of the IAM principal for the AccessEntry. You can specify one ARN for each access entry. You can't specify the same ARN in more than one access entry. This value can't be changed after access  */
  principalArn: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  clientRequestToken?: string;
  /** The value for name that you've specified for kind: Group as a subject in a Kubernetes RoleBinding or ClusterRoleBinding object. Amazon EKS doesn't confirm that the value for name exists in any binding */
  kubernetesGroups?: string[];
  /** Metadata that assists with categorization and organization. Each tag consists of a key and an optional value. You define both. Tags don't propagate to any other cluster or Amazon Web Services resource */
  tags?: Record<string, string>;
  /** The type of the new access entry. Valid values are STANDARD, FARGATE_LINUX, EC2_LINUX, EC2_WINDOWS, EC2 (for EKS Auto Mode), HYBRID_LINUX, and HYPERPOD_LINUX. If the principalArn is for an IAM role th */
  type?: string;
  /** The username to authenticate to Kubernetes with. We recommend not specifying a username and letting Amazon EKS specify it for you. For more information about the value Amazon EKS specifies for you, or */
  username?: string;
}

export interface CreateAddonInput {
  /** The name of the add-on. The name must match one of the names returned by DescribeAddonVersions. */
  addonName: string;
  /** The name of your cluster. */
  clusterName: string;
  /** The version of the add-on. The version must match one of the versions returned by DescribeAddonVersions . */
  addonVersion?: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  clientRequestToken?: string;
  /** The set of configuration values for the add-on that's created. The values that you provide are validated against the schema returned by DescribeAddonConfiguration. */
  configurationValues?: string;
  /** The namespace configuration for the addon. If specified, this will override the default namespace for the addon. */
  namespaceConfig?: AddonNamespaceConfigRequest;
  /** An array of EKS Pod Identity associations to be created. Each association maps a Kubernetes service account to an IAM role. For more information, see Attach an IAM Role to an Amazon EKS add-on using E */
  podIdentityAssociations?: AddonPodIdentityAssociations[];
  /** How to resolve field value conflicts for an Amazon EKS add-on. Conflicts are handled based on the value you choose: None – If the self-managed version of the add-on is installed on your cluster, Amazo */
  resolveConflicts?: 'OVERWRITE' | 'NONE' | 'PRESERVE';
  /** The Amazon Resource Name (ARN) of an existing IAM role to bind to the add-on's service account. The role must be assigned the IAM permissions required by the add-on. If you don't specify an existing I */
  serviceAccountRoleArn?: string;
  /** Metadata that assists with categorization and organization. Each tag consists of a key and an optional value. You define both. Tags don't propagate to any other cluster or Amazon Web Services resource */
  tags?: Record<string, string>;
}

export interface CreateCapabilityInput {
  /** A unique name for the capability. The name must be unique within your cluster and can contain alphanumeric characters, hyphens, and underscores. */
  capabilityName: string;
  /** The name of the Amazon EKS cluster where you want to create the capability. */
  clusterName: string;
  /** Specifies how Kubernetes resources managed by the capability should be handled when the capability is deleted. Currently, the only supported value is RETAIN which retains all Kubernetes resources mana */
  deletePropagationPolicy: 'RETAIN';
  /** The Amazon Resource Name (ARN) of the IAM role that the capability uses to interact with Amazon Web Services services. This role must have a trust policy that allows the EKS service principal to assum */
  roleArn: string;
  /** The type of capability to create. Valid values are: ACK – Amazon Web Services Controllers for Kubernetes (ACK), which lets you manage resources directly from Kubernetes. ARGOCD – Argo CD for GitOps-ba */
  type: 'ACK' | 'KRO' | 'ARGOCD';
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. This token is valid for 24 hours after creation. If you retry a request with the same client request toke */
  clientRequestToken?: string;
  /** The configuration settings for the capability. The structure of this object varies depending on the capability type. For Argo CD capabilities, you can configure IAM Identity CenterIAM; Identity Center */
  configuration?: CapabilityConfigurationRequest;
  tags?: Record<string, string>;
}

export interface CreateClusterInput {
  /** The unique name to give to your cluster. The name can contain only alphanumeric characters (case-sensitive), hyphens, and underscores. It must start with an alphanumeric character and can't be longer  */
  name: string;
  /** The VPC configuration that's used by the cluster control plane. Amazon EKS VPC resources have specific requirements to work properly with Kubernetes. For more information, see Cluster VPC Consideratio */
  resourcesVpcConfig: VpcConfigRequest;
  /** The Amazon Resource Name (ARN) of the IAM role that provides permissions for the Kubernetes control plane to make calls to Amazon Web Services API operations on your behalf. For more information, see  */
  roleArn: string;
  /** The access configuration for the cluster. */
  accessConfig?: CreateAccessConfigRequest;
  /** If you set this value to False when creating a cluster, the default networking add-ons will not be installed. The default networking add-ons include vpc-cni, coredns, and kube-proxy. Use this option w */
  bootstrapSelfManagedAddons?: boolean;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  clientRequestToken?: string;
  /** Enable or disable the compute capability of EKS Auto Mode when creating your EKS Auto Mode cluster. If the compute capability is enabled, EKS Auto Mode will create and delete EC2 Managed Instances in  */
  computeConfig?: ComputeConfigRequest;
  /** The control plane scaling tier configuration. For more information, see EKS Provisioned Control Plane in the Amazon EKS User Guide. */
  controlPlaneScalingConfig?: ControlPlaneScalingConfig;
  /** Indicates whether to enable deletion protection for the cluster. When enabled, the cluster cannot be deleted unless deletion protection is first disabled. This helps prevent accidental cluster deletio */
  deletionProtection?: boolean;
  /** The encryption configuration for the cluster. */
  encryptionConfig?: EncryptionConfig[];
  /** The Kubernetes network configuration for the cluster. */
  kubernetesNetworkConfig?: KubernetesNetworkConfigRequest;
  /** Enable or disable exporting the Kubernetes control plane logs for your cluster to CloudWatch Logs . By default, cluster control plane logs aren't exported to CloudWatch Logs . For more information, se */
  logging?: Logging;
  /** An object representing the configuration of your local Amazon EKS cluster on an Amazon Web Services Outpost. Before creating a local cluster on an Outpost, review Local clusters for Amazon EKS on Amaz */
  outpostConfig?: OutpostConfigRequest;
  /** The configuration in the cluster for EKS Hybrid Nodes. You can add, change, or remove this configuration after the cluster is created. */
  remoteNetworkConfig?: RemoteNetworkConfigRequest;
  /** Enable or disable the block storage capability of EKS Auto Mode when creating your EKS Auto Mode cluster. If the block storage capability is enabled, EKS Auto Mode will create and delete EBS volumes i */
  storageConfig?: StorageConfigRequest;
  /** Metadata that assists with categorization and organization. Each tag consists of a key and an optional value. You define both. Tags don't propagate to any other cluster or Amazon Web Services resource */
  tags?: Record<string, string>;
  /** New clusters, by default, have extended support enabled. You can disable extended support when creating a cluster by setting this value to STANDARD. */
  upgradePolicy?: UpgradePolicyRequest;
  /** The desired Kubernetes version for your cluster. If you don't specify a value here, the default version available in Amazon EKS is used. The default version might not be the latest version available. */
  version?: string;
  /** Enable or disable ARC zonal shift for the cluster. If zonal shift is enabled, Amazon Web Services configures zonal autoshift for the cluster. Zonal shift is a feature of Amazon Application Recovery Co */
  zonalShiftConfig?: ZonalShiftConfigRequest;
}

export interface CreateEksAnywhereSubscriptionInput {
  /** The unique name for your subscription. It must be unique in your Amazon Web Services account in the Amazon Web Services Region you're creating the subscription in. The name can contain only alphanumer */
  name: string;
  /** An object representing the term duration and term unit type of your subscription. This determines the term length of your subscription. Valid values are MONTHS for term unit and 12 or 36 for term dura */
  term: EksAnywhereSubscriptionTerm;
  /** A boolean indicating whether the subscription auto renews at the end of the term. */
  autoRenew?: boolean;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  clientRequestToken?: string;
  /** The number of licenses to purchase with the subscription. Valid values are between 1 and 100. This value can't be changed after creating the subscription. */
  licenseQuantity?: number;
  /** The license type for all licenses in the subscription. Valid value is CLUSTER. With the CLUSTER license type, each license covers support for a single EKS Anywhere cluster. */
  licenseType?: 'Cluster';
  /** The metadata for a subscription to assist with categorization and organization. Each tag consists of a key and an optional value. Subscription tags don't propagate to any other resources associated wi */
  tags?: Record<string, string>;
}

export interface CreateFargateProfileInput {
  /** The name of your cluster. */
  clusterName: string;
  /** The name of the Fargate profile. */
  fargateProfileName: string;
  /** The Amazon Resource Name (ARN) of the Pod execution role to use for a Pod that matches the selectors in the Fargate profile. The Pod execution role allows Fargate infrastructure to register with your  */
  podExecutionRoleArn: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  clientRequestToken?: string;
  /** The selectors to match for a Pod to use this Fargate profile. Each selector must have an associated Kubernetes namespace. Optionally, you can also specify labels for a namespace. You may specify up to */
  selectors?: FargateProfileSelector[];
  /** The IDs of subnets to launch a Pod into. A Pod running on Fargate isn't assigned a public IP address, so only private subnets (with no direct route to an Internet Gateway) are accepted for this parame */
  subnets?: string[];
  /** Metadata that assists with categorization and organization. Each tag consists of a key and an optional value. You define both. Tags don't propagate to any other cluster or Amazon Web Services resource */
  tags?: Record<string, string>;
}

export interface CreateNodegroupInput {
  /** The name of your cluster. */
  clusterName: string;
  /** The unique name to give your node group. */
  nodegroupName: string;
  /** The Amazon Resource Name (ARN) of the IAM role to associate with your node group. The Amazon EKS worker node kubelet daemon makes calls to Amazon Web Services APIs on your behalf. Nodes receive permis */
  nodeRole: string;
  /** The subnets to use for the Auto Scaling group that is created for your node group. If you specify launchTemplate, then don't specify SubnetId in your launch template, or the node group deployment will */
  subnets: string[];
  /** The AMI type for your node group. If you specify launchTemplate, and your launch template uses a custom AMI, then don't specify amiType, or the node group deployment will fail. If your launch template */
  amiType?: 'AL2_x86_64' | 'AL2_x86_64_GPU' | 'AL2_ARM_64' | 'CUSTOM' | 'BOTTLEROCKET_ARM_64' | 'BOTTLEROCKET_x86_64' | 'BOTTLEROCKET_ARM_64_FIPS' | 'BOTTLEROCKET_x86_64_FIPS' | 'BOTTLEROCKET_ARM_64_NVIDIA' | 'BOTTLEROCKET_x86_64_NVIDIA' | 'BOTTLEROCKET_ARM_64_NVIDIA_FIPS' | 'BOTTLEROCKET_x86_64_NVIDIA_FIPS' | 'WINDOWS_CORE_2019_x86_64' | 'WINDOWS_FULL_2019_x86_64' | 'WINDOWS_CORE_2022_x86_64' | 'WINDOWS_FULL_2022_x86_64' | 'WINDOWS_CORE_2025_x86_64' | 'WINDOWS_FULL_2025_x86_64' | 'AL2023_x86_64_STANDARD' | 'AL2023_ARM_64_STANDARD' | 'AL2023_x86_64_NEURON' | 'AL2023_x86_64_NVIDIA' | 'AL2023_ARM_64_NVIDIA';
  /** The capacity type for your node group. */
  capacityType?: 'ON_DEMAND' | 'SPOT' | 'CAPACITY_BLOCK';
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  clientRequestToken?: string;
  /** The root device disk size (in GiB) for your node group instances. The default disk size is 20 GiB for Linux and Bottlerocket. The default disk size is 50 GiB for Windows. If you specify launchTemplate */
  diskSize?: number;
  /** Specify the instance types for a node group. If you specify a GPU instance type, make sure to also specify an applicable GPU AMI type with the amiType parameter. If you specify launchTemplate, then yo */
  instanceTypes?: string[];
  /** The Kubernetes labels to apply to the nodes in the node group when they are created. */
  labels?: Record<string, string>;
  /** An object representing a node group's launch template specification. When using this object, don't directly specify instanceTypes, diskSize, or remoteAccess. You cannot later specify a different launc */
  launchTemplate?: LaunchTemplateSpecification;
  /** The node auto repair configuration for the node group. */
  nodeRepairConfig?: NodeRepairConfig;
  /** The AMI version of the Amazon EKS optimized AMI to use with your node group. By default, the latest available AMI version for the node group's current Kubernetes version is used. For information about */
  releaseVersion?: string;
  /** The remote access configuration to use with your node group. For Linux, the protocol is SSH. For Windows, the protocol is RDP. If you specify launchTemplate, then don't specify remoteAccess, or the no */
  remoteAccess?: RemoteAccessConfig;
  /** The scaling configuration details for the Auto Scaling group that is created for your node group. */
  scalingConfig?: NodegroupScalingConfig;
  /** Metadata that assists with categorization and organization. Each tag consists of a key and an optional value. You define both. Tags don't propagate to any other cluster or Amazon Web Services resource */
  tags?: Record<string, string>;
  /** The Kubernetes taints to be applied to the nodes in the node group. For more information, see Node taints on managed node groups. */
  taints?: Taint[];
  /** The node group update configuration. */
  updateConfig?: NodegroupUpdateConfig;
  /** The Kubernetes version to use for your managed nodes. By default, the Kubernetes version of the cluster is used, and this is the only accepted specified value. If you specify launchTemplate, and your  */
  version?: string;
}

export interface CreatePodIdentityAssociationInput {
  /** The name of the cluster to create the EKS Pod Identity association in. */
  clusterName: string;
  /** The name of the Kubernetes namespace inside the cluster to create the EKS Pod Identity association in. The service account and the Pods that use the service account must be in this namespace. */
  namespace: string;
  /** The Amazon Resource Name (ARN) of the IAM role to associate with the service account. The EKS Pod Identity agent manages credentials to assume this role for applications in the containers in the Pods  */
  roleArn: string;
  /** The name of the Kubernetes service account inside the cluster to associate the IAM credentials with. */
  serviceAccount: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  clientRequestToken?: string;
  /** Disable the automatic sessions tags that are appended by EKS Pod Identity. EKS Pod Identity adds a pre-defined set of session tags when it assumes the role. You can use these tags to author a single r */
  disableSessionTags?: boolean;
  /** An optional IAM policy in JSON format (as an escaped string) that applies additional restrictions to this pod identity association beyond the IAM policies attached to the IAM role. This policy is appl */
  policy?: string;
  /** Metadata that assists with categorization and organization. Each tag consists of a key and an optional value. You define both. Tags don't propagate to any other cluster or Amazon Web Services resource */
  tags?: Record<string, string>;
  /** The Amazon Resource Name (ARN) of the target IAM role to associate with the service account. This role is assumed by using the EKS Pod Identity association role, then the credentials for this role are */
  targetRoleArn?: string;
}

export interface DeleteAccessEntryInput {
  /** The name of your cluster. */
  clusterName: string;
  /** The ARN of the IAM principal for the AccessEntry. */
  principalArn: string;
}

export interface DeleteAddonInput {
  /** The name of the add-on. The name must match one of the names returned by ListAddons . */
  addonName: string;
  /** The name of your cluster. */
  clusterName: string;
  /** Specifying this option preserves the add-on software on your cluster but Amazon EKS stops managing any settings for the add-on. If an IAM account is associated with the add-on, it isn't removed. */
  preserve?: boolean;
}

export interface DeleteCapabilityInput {
  /** The name of the capability to delete. */
  capabilityName: string;
  /** The name of the Amazon EKS cluster that contains the capability you want to delete. */
  clusterName: string;
}

export interface DeleteClusterInput {
  /** The name of the cluster to delete. */
  name: string;
}

export interface DeleteEksAnywhereSubscriptionInput {
  /** The ID of the subscription. */
  id: string;
}

export interface DeleteFargateProfileInput {
  /** The name of your cluster. */
  clusterName: string;
  /** The name of the Fargate profile to delete. */
  fargateProfileName: string;
}

export interface DeleteNodegroupInput {
  /** The name of your cluster. */
  clusterName: string;
  /** The name of the node group to delete. */
  nodegroupName: string;
}

export interface DeletePodIdentityAssociationInput {
  /** The ID of the association to be deleted. */
  associationId: string;
  /** The cluster name that */
  clusterName: string;
}

export interface DeregisterClusterInput {
  /** The name of the connected cluster to deregister. */
  name: string;
}

export interface DescribeAccessEntryInput {
  /** The name of your cluster. */
  clusterName: string;
  /** The ARN of the IAM principal for the AccessEntry. */
  principalArn: string;
}

export interface DescribeAddonInput {
  /** The name of the add-on. The name must match one of the names returned by ListAddons . */
  addonName: string;
  /** The name of your cluster. */
  clusterName: string;
}

export interface DescribeAddonConfigurationInput {
  /** The name of the add-on. The name must match one of the names returned by DescribeAddonVersions. */
  addonName: string;
  /** The version of the add-on. The version must match one of the versions returned by DescribeAddonVersions . */
  addonVersion: string;
}

export interface DescribeAddonVersionsInput {
  /** The name of the add-on. The name must match one of the names returned by ListAddons . */
  addonName?: string;
  /** The Kubernetes versions that you can use the add-on with. */
  kubernetesVersion?: string;
  /** The maximum number of results, returned in paginated output. You receive maxResults in a single page, along with a nextToken response element. You can see the remaining results of the initial request  */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated request, where maxResults was used and the results exceeded the value of that parameter. Pagination continues from the end of the previous result */
  nextToken?: string;
  /** The owner of the add-on. For valid owners, don't specify a value for this property. */
  owners?: string[];
  /** The publisher of the add-on. For valid publishers, don't specify a value for this property. */
  publishers?: string[];
  /** The type of the add-on. For valid types, don't specify a value for this property. */
  types?: string[];
}

export interface DescribeCapabilityInput {
  /** The name of the capability to describe. */
  capabilityName: string;
  /** The name of the Amazon EKS cluster that contains the capability you want to describe. */
  clusterName: string;
}

export interface DescribeClusterInput {
  /** The name of your cluster. */
  name: string;
}

export interface DescribeClusterVersionsInput {
  /** The type of cluster to filter versions by. */
  clusterType?: string;
  /** List of specific cluster versions to describe. */
  clusterVersions?: string[];
  /** Filter to show only default versions. */
  defaultOnly?: boolean;
  /** Include all available versions in the response. */
  includeAll?: boolean;
  /** Maximum number of results to return. */
  maxResults?: number;
  /** Pagination token for the next set of results. */
  nextToken?: string;
  /** This field is deprecated. Use versionStatus instead, as that field matches for input and output of this action. Filter versions by their current status. */
  status?: 'unsupported' | 'standard-support' | 'extended-support';
  /** Filter versions by their current status. */
  versionStatus?: 'UNSUPPORTED' | 'STANDARD_SUPPORT' | 'EXTENDED_SUPPORT';
}

export interface DescribeEksAnywhereSubscriptionInput {
  /** The ID of the subscription. */
  id: string;
}

export interface DescribeFargateProfileInput {
  /** The name of your cluster. */
  clusterName: string;
  /** The name of the Fargate profile to describe. */
  fargateProfileName: string;
}

export interface DescribeIdentityProviderConfigInput {
  /** The name of your cluster. */
  clusterName: string;
  /** An object representing an identity provider configuration. */
  identityProviderConfig: IdentityProviderConfig;
}

export interface DescribeInsightInput {
  /** The name of the cluster to describe the insight for. */
  clusterName: string;
  /** The identity of the insight to describe. */
  id: string;
}

export interface DescribeInsightsRefreshInput {
  /** The name of the cluster associated with the insights refresh operation. */
  clusterName: string;
}

export interface DescribeNodegroupInput {
  /** The name of your cluster. */
  clusterName: string;
  /** The name of the node group to describe. */
  nodegroupName: string;
}

export interface DescribePodIdentityAssociationInput {
  /** The ID of the association that you want the description of. */
  associationId: string;
  /** The name of the cluster that the association is in. */
  clusterName: string;
}

/** Describes an update request. */
export interface DescribeUpdateInput {
  /** The name of the Amazon EKS cluster associated with the update. */
  name: string;
  /** The ID of the update to describe. */
  updateId: string;
  /** The name of the add-on. The name must match one of the names returned by ListAddons . This parameter is required if the update is an add-on update. */
  addonName?: string;
  /** The name of the capability for which you want to describe updates. */
  capabilityName?: string;
  /** The name of the Amazon EKS node group associated with the update. This parameter is required if the update is a node group update. */
  nodegroupName?: string;
}

export interface DisassociateAccessPolicyInput {
  /** The name of your cluster. */
  clusterName: string;
  /** The ARN of the policy to disassociate from the access entry. For a list of associated policies ARNs, use ListAssociatedAccessPolicies. */
  policyArn: string;
  /** The ARN of the IAM principal for the AccessEntry. */
  principalArn: string;
}

export interface DisassociateIdentityProviderConfigInput {
  /** The name of your cluster. */
  clusterName: string;
  /** An object representing an identity provider configuration. */
  identityProviderConfig: IdentityProviderConfig;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  clientRequestToken?: string;
}

export interface ListAccessEntriesInput {
  /** The name of your cluster. */
  clusterName: string;
  /** The ARN of an AccessPolicy. When you specify an access policy ARN, only the access entries associated to that access policy are returned. For a list of available policy ARNs, use ListAccessPolicies. */
  associatedPolicyArn?: string;
  /** The maximum number of results, returned in paginated output. You receive maxResults in a single page, along with a nextToken response element. You can see the remaining results of the initial request  */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated request, where maxResults was used and the results exceeded the value of that parameter. Pagination continues from the end of the previous result */
  nextToken?: string;
}

export interface ListAccessPoliciesInput {
  /** The maximum number of results, returned in paginated output. You receive maxResults in a single page, along with a nextToken response element. You can see the remaining results of the initial request  */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated request, where maxResults was used and the results exceeded the value of that parameter. Pagination continues from the end of the previous result */
  nextToken?: string;
}

export interface ListAddonsInput {
  /** The name of your cluster. */
  clusterName: string;
  /** The maximum number of results, returned in paginated output. You receive maxResults in a single page, along with a nextToken response element. You can see the remaining results of the initial request  */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated request, where maxResults was used and the results exceeded the value of that parameter. Pagination continues from the end of the previous result */
  nextToken?: string;
}

export interface ListAssociatedAccessPoliciesInput {
  /** The name of your cluster. */
  clusterName: string;
  /** The ARN of the IAM principal for the AccessEntry. */
  principalArn: string;
  /** The maximum number of results, returned in paginated output. You receive maxResults in a single page, along with a nextToken response element. You can see the remaining results of the initial request  */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated request, where maxResults was used and the results exceeded the value of that parameter. Pagination continues from the end of the previous result */
  nextToken?: string;
}

export interface ListCapabilitiesInput {
  /** The name of the Amazon EKS cluster for which you want to list capabilities. */
  clusterName: string;
  /** The maximum number of results to return in a single call. To retrieve the remaining results, make another call with the returned nextToken value. If you don't specify a value, the default is 100 resul */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated request, where maxResults was used and the results exceeded the value of that parameter. Pagination continues from the end of the previous result */
  nextToken?: string;
}

export interface ListClustersInput {
  /** Indicates whether external clusters are included in the returned list. Use 'all' to return https://docs.aws.amazon.com/eks/latest/userguide/eks-connector.htmlconnected clusters, or blank to return onl */
  include?: string[];
  /** The maximum number of results, returned in paginated output. You receive maxResults in a single page, along with a nextToken response element. You can see the remaining results of the initial request  */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated request, where maxResults was used and the results exceeded the value of that parameter. Pagination continues from the end of the previous result */
  nextToken?: string;
}

export interface ListEksAnywhereSubscriptionsInput {
  /** An array of subscription statuses to filter on. */
  includeStatus?: 'CREATING' | 'ACTIVE' | 'UPDATING' | 'EXPIRING' | 'EXPIRED' | 'DELETING'[];
  /** The maximum number of cluster results returned by ListEksAnywhereSubscriptions in paginated output. When you use this parameter, ListEksAnywhereSubscriptions returns only maxResults results in a singl */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated ListEksAnywhereSubscriptions request where maxResults was used and the results exceeded the value of that parameter. Pagination continues from th */
  nextToken?: string;
}

export interface ListFargateProfilesInput {
  /** The name of your cluster. */
  clusterName: string;
  /** The maximum number of results, returned in paginated output. You receive maxResults in a single page, along with a nextToken response element. You can see the remaining results of the initial request  */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated request, where maxResults was used and the results exceeded the value of that parameter. Pagination continues from the end of the previous result */
  nextToken?: string;
}

export interface ListIdentityProviderConfigsInput {
  /** The name of your cluster. */
  clusterName: string;
  /** The maximum number of results, returned in paginated output. You receive maxResults in a single page, along with a nextToken response element. You can see the remaining results of the initial request  */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated request, where maxResults was used and the results exceeded the value of that parameter. Pagination continues from the end of the previous result */
  nextToken?: string;
}

export interface ListInsightsInput {
  /** The name of the Amazon EKS cluster associated with the insights. */
  clusterName: string;
  /** The criteria to filter your list of insights for your cluster. You can filter which insights are returned by category, associated Kubernetes version, and status. */
  filter?: InsightsFilter;
  /** The maximum number of identity provider configurations returned by ListInsights in paginated output. When you use this parameter, ListInsights returns only maxResults results in a single page along wi */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated ListInsights request. When the results of a ListInsights request exceed maxResults, you can use this value to retrieve the next page of results.  */
  nextToken?: string;
}

export interface ListNodegroupsInput {
  /** The name of your cluster. */
  clusterName: string;
  /** The maximum number of results, returned in paginated output. You receive maxResults in a single page, along with a nextToken response element. You can see the remaining results of the initial request  */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated request, where maxResults was used and the results exceeded the value of that parameter. Pagination continues from the end of the previous result */
  nextToken?: string;
}

export interface ListPodIdentityAssociationsInput {
  /** The name of the cluster that the associations are in. */
  clusterName: string;
  /** The maximum number of EKS Pod Identity association results returned by ListPodIdentityAssociations in paginated output. When you use this parameter, ListPodIdentityAssociations returns only maxResults */
  maxResults?: number;
  /** The name of the Kubernetes namespace inside the cluster that the associations are in. */
  namespace?: string;
  /** The nextToken value returned from a previous paginated ListUpdates request where maxResults was used and the results exceeded the value of that parameter. Pagination continues from the end of the prev */
  nextToken?: string;
  /** The name of the Kubernetes service account that the associations use. */
  serviceAccount?: string;
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) that identifies the resource to list tags for. */
  resourceArn: string;
}

export interface ListUpdatesInput {
  /** The name of the Amazon EKS cluster to list updates for. */
  name: string;
  /** The names of the installed add-ons that have available updates. */
  addonName?: string;
  /** The name of the capability for which you want to list updates. */
  capabilityName?: string;
  /** The maximum number of results, returned in paginated output. You receive maxResults in a single page, along with a nextToken response element. You can see the remaining results of the initial request  */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated request, where maxResults was used and the results exceeded the value of that parameter. Pagination continues from the end of the previous result */
  nextToken?: string;
  /** The name of the Amazon EKS managed node group to list updates for. */
  nodegroupName?: string;
}

export interface RegisterClusterInput {
  /** The configuration settings required to connect the Kubernetes cluster to the Amazon EKS control plane. */
  connectorConfig: ConnectorConfigRequest;
  /** A unique name for this cluster in your Amazon Web Services Region. */
  name: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  clientRequestToken?: string;
  /** Metadata that assists with categorization and organization. Each tag consists of a key and an optional value. You define both. Tags don't propagate to any other cluster or Amazon Web Services resource */
  tags?: Record<string, string>;
}

export interface StartInsightsRefreshInput {
  /** The name of the cluster for the refresh insights operation. */
  clusterName: string;
}

export interface TagResourceInput {
  /** The Amazon Resource Name (ARN) of the resource to add tags to. */
  resourceArn: string;
  /** Metadata that assists with categorization and organization. Each tag consists of a key and an optional value. You define both. Tags don't propagate to any other cluster or Amazon Web Services resource */
  tags: Record<string, string>;
}

export interface UntagResourceInput {
  /** The Amazon Resource Name (ARN) of the resource to delete tags from. */
  resourceArn: string;
  /** The keys of the tags to remove. */
  tagKeys: string[];
}

export interface UpdateAccessEntryInput {
  /** The name of your cluster. */
  clusterName: string;
  /** The ARN of the IAM principal for the AccessEntry. */
  principalArn: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  clientRequestToken?: string;
  /** The value for name that you've specified for kind: Group as a subject in a Kubernetes RoleBinding or ClusterRoleBinding object. Amazon EKS doesn't confirm that the value for name exists in any binding */
  kubernetesGroups?: string[];
  /** The username to authenticate to Kubernetes with. We recommend not specifying a username and letting Amazon EKS specify it for you. For more information about the value Amazon EKS specifies for you, or */
  username?: string;
}

export interface UpdateAddonInput {
  /** The name of the add-on. The name must match one of the names returned by ListAddons . */
  addonName: string;
  /** The name of your cluster. */
  clusterName: string;
  /** The version of the add-on. The version must match one of the versions returned by DescribeAddonVersions . */
  addonVersion?: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  clientRequestToken?: string;
  /** The set of configuration values for the add-on that's created. The values that you provide are validated against the schema returned by DescribeAddonConfiguration. */
  configurationValues?: string;
  /** An array of EKS Pod Identity associations to be updated. Each association maps a Kubernetes service account to an IAM role. If this value is left blank, no change. If an empty array is provided, exist */
  podIdentityAssociations?: AddonPodIdentityAssociations[];
  /** How to resolve field value conflicts for an Amazon EKS add-on if you've changed a value from the Amazon EKS default value. Conflicts are handled based on the option you choose: None – Amazon EKS doesn */
  resolveConflicts?: 'OVERWRITE' | 'NONE' | 'PRESERVE';
  /** The Amazon Resource Name (ARN) of an existing IAM role to bind to the add-on's service account. The role must be assigned the IAM permissions required by the add-on. If you don't specify an existing I */
  serviceAccountRoleArn?: string;
}

export interface UpdateCapabilityInput {
  /** The name of the capability to update configuration for. */
  capabilityName: string;
  /** The name of the Amazon EKS cluster that contains the capability you want to update configuration for. */
  clusterName: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. This token is valid for 24 hours after creation. */
  clientRequestToken?: string;
  /** The updated configuration settings for the capability. You only need to specify the configuration parameters you want to change. For Argo CD capabilities, you can update RBAC role mappings and network */
  configuration?: UpdateCapabilityConfiguration;
  /** The updated delete propagation policy for the capability. Currently, the only supported value is RETAIN. */
  deletePropagationPolicy?: 'RETAIN';
  /** The Amazon Resource Name (ARN) of the IAM role that the capability uses to interact with Amazon Web Services services. If you specify a new role ARN, the capability will start using the new role for a */
  roleArn?: string;
}

export interface UpdateClusterConfigInput {
  /** The name of the Amazon EKS cluster to update. */
  name: string;
  /** The access configuration for the cluster. */
  accessConfig?: UpdateAccessConfigRequest;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  clientRequestToken?: string;
  /** Update the configuration of the compute capability of your EKS Auto Mode cluster. For example, enable the capability. */
  computeConfig?: ComputeConfigRequest;
  /** The control plane scaling tier configuration. For more information, see EKS Provisioned Control Plane in the Amazon EKS User Guide. */
  controlPlaneScalingConfig?: ControlPlaneScalingConfig;
  /** Specifies whether to enable or disable deletion protection for the cluster. When enabled (true), the cluster cannot be deleted until deletion protection is explicitly disabled. When disabled (false),  */
  deletionProtection?: boolean;
  kubernetesNetworkConfig?: KubernetesNetworkConfigRequest;
  /** Enable or disable exporting the Kubernetes control plane logs for your cluster to CloudWatch Logs . By default, cluster control plane logs aren't exported to CloudWatch Logs . For more information, se */
  logging?: Logging;
  remoteNetworkConfig?: RemoteNetworkConfigRequest;
  resourcesVpcConfig?: VpcConfigRequest;
  /** Update the configuration of the block storage capability of your EKS Auto Mode cluster. For example, enable the capability. */
  storageConfig?: StorageConfigRequest;
  /** You can enable or disable extended support for clusters currently on standard support. You cannot disable extended support once it starts. You must enable extended support before your cluster exits st */
  upgradePolicy?: UpgradePolicyRequest;
  /** Enable or disable ARC zonal shift for the cluster. If zonal shift is enabled, Amazon Web Services configures zonal autoshift for the cluster. Zonal shift is a feature of Amazon Application Recovery Co */
  zonalShiftConfig?: ZonalShiftConfigRequest;
}

export interface UpdateClusterVersionInput {
  /** The name of the Amazon EKS cluster to update. */
  name: string;
  /** The desired Kubernetes version following a successful update. */
  version: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  clientRequestToken?: string;
  /** Set this value to true to override upgrade-blocking readiness checks when updating a cluster. */
  force?: boolean;
}

export interface UpdateEksAnywhereSubscriptionInput {
  /** A boolean indicating whether or not to automatically renew the subscription. */
  autoRenew: boolean;
  /** The ID of the subscription. */
  id: string;
  /** Unique, case-sensitive identifier to ensure the idempotency of the request. */
  clientRequestToken?: string;
}

export interface UpdateNodegroupConfigInput {
  /** The name of your cluster. */
  clusterName: string;
  /** The name of the managed node group to update. */
  nodegroupName: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  clientRequestToken?: string;
  /** The Kubernetes labels to apply to the nodes in the node group after the update. */
  labels?: UpdateLabelsPayload;
  /** The node auto repair configuration for the node group. */
  nodeRepairConfig?: NodeRepairConfig;
  /** The scaling configuration details for the Auto Scaling group after the update. */
  scalingConfig?: NodegroupScalingConfig;
  /** The Kubernetes taints to be applied to the nodes in the node group after the update. For more information, see Node taints on managed node groups. */
  taints?: UpdateTaintsPayload;
  /** The node group update configuration. */
  updateConfig?: NodegroupUpdateConfig;
}

export interface UpdateNodegroupVersionInput {
  /** The name of your cluster. */
  clusterName: string;
  /** The name of the managed node group to update. */
  nodegroupName: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  clientRequestToken?: string;
  /** Force the update if any Pod on the existing node group can't be drained due to a Pod disruption budget issue. If an update fails because all Pods can't be drained, you can force the update after it fa */
  force?: boolean;
  /** An object representing a node group's launch template specification. You can only update a node group using a launch template if the node group was originally deployed with a launch template. When upd */
  launchTemplate?: LaunchTemplateSpecification;
  /** The AMI version of the Amazon EKS optimized AMI to use for the update. By default, the latest available AMI version for the node group's Kubernetes version is used. For information about Linux version */
  releaseVersion?: string;
  /** The Kubernetes version to update to. If no version is specified, then the node group will be updated to match the cluster's current Kubernetes version, and the latest available AMI for that version wi */
  version?: string;
}

export interface UpdatePodIdentityAssociationInput {
  /** The ID of the association to be updated. */
  associationId: string;
  /** The name of the cluster that you want to update the association in. */
  clusterName: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. */
  clientRequestToken?: string;
  /** Disable the automatic sessions tags that are appended by EKS Pod Identity. EKS Pod Identity adds a pre-defined set of session tags when it assumes the role. You can use these tags to author a single r */
  disableSessionTags?: boolean;
  /** An optional IAM policy in JSON format (as an escaped string) that applies additional restrictions to this pod identity association beyond the IAM policies attached to the IAM role. This policy is appl */
  policy?: string;
  /** The new IAM role to change in the association. */
  roleArn?: string;
  /** The Amazon Resource Name (ARN) of the target IAM role to associate with the service account. This role is assumed by using the EKS Pod Identity association role, then the credentials for this role are */
  targetRoleArn?: string;
}

/** EKS service binding for Step Functions SDK integrations. */
export class EKS {
  constructor() {}

  associateAccessPolicy<T>(params: AssociateAccessPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateEncryptionConfig<T>(params: AssociateEncryptionConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  associateIdentityProviderConfig<T>(params: AssociateIdentityProviderConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createAccessEntry<T>(params: CreateAccessEntryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createAddon<T>(params: CreateAddonInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCapability<T>(params: CreateCapabilityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCluster<T>(params: CreateClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createEksAnywhereSubscription<T>(params: CreateEksAnywhereSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createFargateProfile<T>(params: CreateFargateProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createNodegroup<T>(params: CreateNodegroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPodIdentityAssociation<T>(params: CreatePodIdentityAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAccessEntry<T>(params: DeleteAccessEntryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAddon<T>(params: DeleteAddonInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCapability<T>(params: DeleteCapabilityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCluster<T>(params: DeleteClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteEksAnywhereSubscription<T>(params: DeleteEksAnywhereSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteFargateProfile<T>(params: DeleteFargateProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteNodegroup<T>(params: DeleteNodegroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePodIdentityAssociation<T>(params: DeletePodIdentityAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deregisterCluster<T>(params: DeregisterClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAccessEntry<T>(params: DescribeAccessEntryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAddon<T>(params: DescribeAddonInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAddonConfiguration<T>(params: DescribeAddonConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeAddonVersions<T>(params: DescribeAddonVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCapability<T>(params: DescribeCapabilityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCluster<T>(params: DescribeClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeClusterVersions<T>(params: DescribeClusterVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeEksAnywhereSubscription<T>(params: DescribeEksAnywhereSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeFargateProfile<T>(params: DescribeFargateProfileInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeIdentityProviderConfig<T>(params: DescribeIdentityProviderConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInsight<T>(params: DescribeInsightInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeInsightsRefresh<T>(params: DescribeInsightsRefreshInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeNodegroup<T>(params: DescribeNodegroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePodIdentityAssociation<T>(params: DescribePodIdentityAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeUpdate<T>(params: DescribeUpdateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateAccessPolicy<T>(params: DisassociateAccessPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disassociateIdentityProviderConfig<T>(params: DisassociateIdentityProviderConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAccessEntries<T>(params: ListAccessEntriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAccessPolicies<T>(params: ListAccessPoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAddons<T>(params: ListAddonsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAssociatedAccessPolicies<T>(params: ListAssociatedAccessPoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listCapabilities<T>(params: ListCapabilitiesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listClusters<T>(params: ListClustersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listEksAnywhereSubscriptions<T>(params: ListEksAnywhereSubscriptionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listFargateProfiles<T>(params: ListFargateProfilesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listIdentityProviderConfigs<T>(params: ListIdentityProviderConfigsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listInsights<T>(params: ListInsightsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listNodegroups<T>(params: ListNodegroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPodIdentityAssociations<T>(params: ListPodIdentityAssociationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listUpdates<T>(params: ListUpdatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  registerCluster<T>(params: RegisterClusterInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startInsightsRefresh<T>(params: StartInsightsRefreshInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateAccessEntry<T>(params: UpdateAccessEntryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateAddon<T>(params: UpdateAddonInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateCapability<T>(params: UpdateCapabilityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateClusterConfig<T>(params: UpdateClusterConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateClusterVersion<T>(params: UpdateClusterVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateEksAnywhereSubscription<T>(params: UpdateEksAnywhereSubscriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateNodegroupConfig<T>(params: UpdateNodegroupConfigInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateNodegroupVersion<T>(params: UpdateNodegroupVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePodIdentityAssociation<T>(params: UpdatePodIdentityAssociationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
