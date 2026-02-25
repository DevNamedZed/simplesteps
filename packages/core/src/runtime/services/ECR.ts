// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface ImageIdentifier {
  /** The sha256 digest of the image manifest. */
  imageDigest?: string;
  /** The tag used for the image. */
  imageTag?: string;
}

export interface Tag {
  /** One part of a key-value pair that make up a tag. A key is a general label that acts like a category for more specific tag values. */
  Key: string;
  /** A value acts as a descriptor within a tag category (key). */
  Value: string;
}

export interface ImageTagMutabilityExclusionFilter {
  /** The type of filter to apply for excluding image tags from mutability settings. */
  filterType: 'WILDCARD';
  /** The filter value used to match image tags for exclusion from mutability settings. */
  filter: string;
}

export interface ImageScanningConfiguration {
  /** The setting that determines whether images are scanned after being pushed to a repository. If set to true, images will be scanned after being pushed. If this parameter is not specified, it will defaul */
  scanOnPush?: boolean;
}

export interface EncryptionConfiguration {
  /** The encryption type to use. If you use the KMS encryption type, the contents of the repository will be encrypted using server-side encryption with Key Management Service key stored in KMS. When you us */
  encryptionType: 'AES256' | 'KMS' | 'KMS_DSSE';
  /** If you use the KMS encryption type, specify the KMS key to use for encryption. The alias, key ID, or full ARN of the KMS key can be specified. The key must exist in the same Region as the repository.  */
  kmsKey?: string;
}

export interface EncryptionConfigurationForRepositoryCreationTemplate {
  /** The encryption type to use. If you use the KMS encryption type, the contents of the repository will be encrypted using server-side encryption with Key Management Service key stored in KMS. When you us */
  encryptionType: 'AES256' | 'KMS' | 'KMS_DSSE';
  /** If you use the KMS encryption type, specify the KMS key to use for encryption. The full ARN of the KMS key must be specified. The key must exist in the same Region as the repository. If no key is spec */
  kmsKey?: string;
}

export interface DescribeImagesFilter {
  /** The tag status with which to filter your DescribeImages results. You can filter results based on whether they are TAGGED or UNTAGGED. */
  tagStatus?: 'TAGGED' | 'UNTAGGED' | 'ANY';
  /** The image status with which to filter your DescribeImages results. Valid values are ACTIVE, ARCHIVED, and ACTIVATING. */
  imageStatus?: 'ACTIVE' | 'ARCHIVED' | 'ACTIVATING' | 'ANY';
}

export interface LifecyclePolicyPreviewFilter {
  /** The tag status of the image. */
  tagStatus?: 'TAGGED' | 'UNTAGGED' | 'ANY';
}

export interface SubjectIdentifier {
  /** The digest of the image. */
  imageDigest: string;
}

export interface ListImageReferrersFilter {
  /** The artifact types with which to filter your ListImageReferrers results. */
  artifactTypes?: string[];
  /** The artifact status with which to filter your ListImageReferrers results. Valid values are ACTIVE, ARCHIVED, ACTIVATING, or ANY. If not specified, only artifacts with ACTIVE status are returned. */
  artifactStatus?: 'ACTIVE' | 'ARCHIVED' | 'ACTIVATING' | 'ANY';
}

export interface ListImagesFilter {
  /** The tag status with which to filter your ListImages results. */
  tagStatus?: 'TAGGED' | 'UNTAGGED' | 'ANY';
  /** The image status with which to filter your ListImages results. Valid values are ACTIVE, ARCHIVED, and ACTIVATING. */
  imageStatus?: 'ACTIVE' | 'ARCHIVED' | 'ACTIVATING' | 'ANY';
}

export interface RegistryScanningRule {
  /** The frequency that scans are performed at for a private registry. When the ENHANCED scan type is specified, the supported scan frequencies are CONTINUOUS_SCAN and SCAN_ON_PUSH. When the BASIC scan typ */
  scanFrequency: 'SCAN_ON_PUSH' | 'CONTINUOUS_SCAN' | 'MANUAL';
  /** The repository filters associated with the scanning configuration for a private registry. */
  repositoryFilters: any[];
}

export interface ReplicationConfiguration {
  /** An array of objects representing the replication destinations and repository filters for a replication configuration. */
  rules: any[];
}

export interface SigningConfiguration {
  /** A list of signing rules. Each rule defines a signing profile and optional repository filters that determine which images are automatically signed. Maximum of 10 rules. */
  rules: any[];
}

export interface BatchCheckLayerAvailabilityInput {
  /** The digests of the image layers to check. */
  layerDigests: string[];
  /** The name of the repository that is associated with the image layers to check. */
  repositoryName: string;
  /** The Amazon Web Services account ID associated with the registry that contains the image layers to check. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

/** Deletes specified images within a specified repository. Images are specified with either the imageTag or imageDigest. */
export interface BatchDeleteImageInput {
  /** A list of image ID references that correspond to images to delete. The format of the imageIds reference is imageTag=tag or imageDigest=digest. */
  imageIds: ImageIdentifier[];
  /** The repository that contains the image to delete. */
  repositoryName: string;
  /** The Amazon Web Services account ID associated with the registry that contains the image to delete. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface BatchGetImageInput {
  /** A list of image ID references that correspond to images to describe. The format of the imageIds reference is imageTag=tag or imageDigest=digest. */
  imageIds: ImageIdentifier[];
  /** The repository that contains the images to describe. */
  repositoryName: string;
  /** The accepted media types for the request. Valid values: application/vnd.docker.distribution.manifest.v1+json | application/vnd.docker.distribution.manifest.v2+json | application/vnd.oci.image.manifest */
  acceptedMediaTypes?: string[];
  /** The Amazon Web Services account ID associated with the registry that contains the images to describe. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface BatchGetRepositoryScanningConfigurationInput {
  /** One or more repository names to get the scanning configuration for. */
  repositoryNames: string[];
}

export interface CompleteLayerUploadInput {
  /** The sha256 digest of the image layer. */
  layerDigests: string[];
  /** The name of the repository to associate with the image layer. */
  repositoryName: string;
  /** The upload ID from a previous InitiateLayerUpload operation to associate with the image layer. */
  uploadId: string;
  /** The Amazon Web Services account ID associated with the registry to which to upload layers. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface CreatePullThroughCacheRuleInput {
  /** The repository name prefix to use when caching images from the source registry. There is always an assumed / applied to the end of the prefix. If you specify ecr-public as the prefix, Amazon ECR treat */
  ecrRepositoryPrefix: string;
  /** The registry URL of the upstream public registry to use as the source for the pull through cache rule. The following is the syntax to use for each supported upstream registry. Amazon ECR (ecr) – .dkr. */
  upstreamRegistryUrl: string;
  /** The Amazon Resource Name (ARN) of the Amazon Web Services Secrets Manager secret that identifies the credentials to authenticate to the upstream registry. */
  credentialArn?: string;
  /** Amazon Resource Name (ARN) of the IAM role to be assumed by Amazon ECR to authenticate to the ECR upstream registry. This role must be in the same account as the registry that you are configuring. */
  customRoleArn?: string;
  /** The Amazon Web Services account ID associated with the registry to create the pull through cache rule for. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
  /** The name of the upstream registry. */
  upstreamRegistry?: 'ecr' | 'ecr-public' | 'quay' | 'k8s' | 'docker-hub' | 'github-container-registry' | 'azure-container-registry' | 'gitlab-container-registry';
  /** The repository name prefix of the upstream registry to match with the upstream repository name. When this field isn't specified, Amazon ECR will use the ROOT. */
  upstreamRepositoryPrefix?: string;
}

export interface CreateRepositoryInput {
  /** The name to use for the repository. The repository name may be specified on its own (such as nginx-web-app) or it can be prepended with a namespace to group the repository into a category (such as pro */
  repositoryName: string;
  /** The encryption configuration for the repository. This determines how the contents of your repository are encrypted at rest. */
  encryptionConfiguration?: EncryptionConfiguration;
  /** The imageScanningConfiguration parameter is being deprecated, in favor of specifying the image scanning configuration at the registry level. For more information, see PutRegistryScanningConfiguration. */
  imageScanningConfiguration?: ImageScanningConfiguration;
  /** The tag mutability setting for the repository. If this parameter is omitted, the default setting of MUTABLE will be used which will allow image tags to be overwritten. If IMMUTABLE is specified, all i */
  imageTagMutability?: 'MUTABLE' | 'IMMUTABLE' | 'IMMUTABLE_WITH_EXCLUSION' | 'MUTABLE_WITH_EXCLUSION';
  /** A list of filters that specify which image tags should be excluded from the repository's image tag mutability setting. */
  imageTagMutabilityExclusionFilters?: ImageTagMutabilityExclusionFilter[];
  /** The Amazon Web Services account ID associated with the registry to create the repository. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
  /** The metadata that you apply to the repository to help you categorize and organize them. Each tag consists of a key and an optional value, both of which you define. Tag keys can have a maximum characte */
  tags?: Tag[];
}

export interface CreateRepositoryCreationTemplateInput {
  /** A list of enumerable strings representing the Amazon ECR repository creation scenarios that this template will apply towards. The supported scenarios are PULL_THROUGH_CACHE, REPLICATION, and CREATE_ON */
  appliedFor: 'REPLICATION' | 'PULL_THROUGH_CACHE' | 'CREATE_ON_PUSH'[];
  /** The repository namespace prefix to associate with the template. All repositories created using this namespace prefix will have the settings defined in this template applied. For example, a prefix of p */
  prefix: string;
  /** The ARN of the role to be assumed by Amazon ECR. This role must be in the same account as the registry that you are configuring. Amazon ECR will assume your supplied role when the customRoleArn is spe */
  customRoleArn?: string;
  /** A description for the repository creation template. */
  description?: string;
  /** The encryption configuration to use for repositories created using the template. */
  encryptionConfiguration?: EncryptionConfigurationForRepositoryCreationTemplate;
  /** The tag mutability setting for the repository. If this parameter is omitted, the default setting of MUTABLE will be used which will allow image tags to be overwritten. If IMMUTABLE is specified, all i */
  imageTagMutability?: 'MUTABLE' | 'IMMUTABLE' | 'IMMUTABLE_WITH_EXCLUSION' | 'MUTABLE_WITH_EXCLUSION';
  /** A list of filters that specify which image tags should be excluded from the repository creation template's image tag mutability setting. */
  imageTagMutabilityExclusionFilters?: ImageTagMutabilityExclusionFilter[];
  /** The lifecycle policy to use for repositories created using the template. */
  lifecyclePolicy?: string;
  /** The repository policy to apply to repositories created using the template. A repository policy is a permissions policy associated with a repository to control access permissions. */
  repositoryPolicy?: string;
  /** The metadata to apply to the repository to help you categorize and organize. Each tag consists of a key and an optional value, both of which you define. Tag keys can have a maximum character length of */
  resourceTags?: Tag[];
}

export interface DeleteLifecyclePolicyInput {
  /** The name of the repository. */
  repositoryName: string;
  /** The Amazon Web Services account ID associated with the registry that contains the repository. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface DeletePullThroughCacheRuleInput {
  /** The Amazon ECR repository prefix associated with the pull through cache rule to delete. */
  ecrRepositoryPrefix: string;
  /** The Amazon Web Services account ID associated with the registry that contains the pull through cache rule. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface DeleteRepositoryInput {
  /** The name of the repository to delete. */
  repositoryName: string;
  /** If true, deleting the repository force deletes the contents of the repository. If false, the repository must be empty before attempting to delete it. */
  force?: boolean;
  /** The Amazon Web Services account ID associated with the registry that contains the repository to delete. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface DeleteRepositoryCreationTemplateInput {
  /** The repository namespace prefix associated with the repository creation template. */
  prefix: string;
}

export interface DeleteRepositoryPolicyInput {
  /** The name of the repository that is associated with the repository policy to delete. */
  repositoryName: string;
  /** The Amazon Web Services account ID associated with the registry that contains the repository policy to delete. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface DeregisterPullTimeUpdateExclusionInput {
  /** The ARN of the IAM principal to remove from the pull time update exclusion list. */
  principalArn: string;
}

export interface DescribeImageReplicationStatusInput {
  imageId: ImageIdentifier;
  /** The name of the repository that the image is in. */
  repositoryName: string;
  /** The Amazon Web Services account ID associated with the registry. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface DescribeImagesInput {
  /** The repository that contains the images to describe. */
  repositoryName: string;
  /** The filter key and value with which to filter your DescribeImages results. */
  filter?: DescribeImagesFilter;
  /** The list of image IDs for the requested repository. */
  imageIds?: ImageIdentifier[];
  /** The maximum number of repository results returned by DescribeImages in paginated output. When this parameter is used, DescribeImages only returns maxResults results in a single page along with a nextT */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated DescribeImages request where maxResults was used and the results exceeded the value of that parameter. Pagination continues from the end of the p */
  nextToken?: string;
  /** The Amazon Web Services account ID associated with the registry that contains the repository in which to describe images. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface DescribeImageScanFindingsInput {
  imageId: ImageIdentifier;
  /** The repository for the image for which to describe the scan findings. */
  repositoryName: string;
  /** The maximum number of image scan results returned by DescribeImageScanFindings in paginated output. When this parameter is used, DescribeImageScanFindings only returns maxResults results in a single p */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated DescribeImageScanFindings request where maxResults was used and the results exceeded the value of that parameter. Pagination continues from the e */
  nextToken?: string;
  /** The Amazon Web Services account ID associated with the registry that contains the repository in which to describe the image scan findings for. If you do not specify a registry, the default registry is */
  registryId?: string;
}

export interface DescribeImageSigningStatusInput {
  /** An object containing identifying information for an image. */
  imageId: ImageIdentifier;
  /** The name of the repository that contains the image. */
  repositoryName: string;
  /** The Amazon Web Services account ID associated with the registry that contains the repository. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface DescribePullThroughCacheRulesInput {
  /** The Amazon ECR repository prefixes associated with the pull through cache rules to return. If no repository prefix value is specified, all pull through cache rules are returned. */
  ecrRepositoryPrefixes?: string[];
  /** The maximum number of pull through cache rules returned by DescribePullThroughCacheRulesRequest in paginated output. When this parameter is used, DescribePullThroughCacheRulesRequest only returns maxR */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated DescribePullThroughCacheRulesRequest request where maxResults was used and the results exceeded the value of that parameter. Pagination continues */
  nextToken?: string;
  /** The Amazon Web Services account ID associated with the registry to return the pull through cache rules for. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface DescribeRepositoriesInput {
  /** The maximum number of repository results returned by DescribeRepositories in paginated output. When this parameter is used, DescribeRepositories only returns maxResults results in a single page along  */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated DescribeRepositories request where maxResults was used and the results exceeded the value of that parameter. Pagination continues from the end of */
  nextToken?: string;
  /** The Amazon Web Services account ID associated with the registry that contains the repositories to be described. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
  /** A list of repositories to describe. If this parameter is omitted, then all repositories in a registry are described. */
  repositoryNames?: string[];
}

export interface DescribeRepositoryCreationTemplatesInput {
  /** The maximum number of repository results returned by DescribeRepositoryCreationTemplatesRequest in paginated output. When this parameter is used, DescribeRepositoryCreationTemplatesRequest only return */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated DescribeRepositoryCreationTemplates request where maxResults was used and the results exceeded the value of that parameter. Pagination continues  */
  nextToken?: string;
  /** The repository namespace prefixes associated with the repository creation templates to describe. If this value is not specified, all repository creation templates are returned. */
  prefixes?: string[];
}

export interface GetAccountSettingInput {
  /** The name of the account setting, such as BASIC_SCAN_TYPE_VERSION, REGISTRY_POLICY_SCOPE, or BLOB_MOUNTING. */
  name: string;
}

export interface GetAuthorizationTokenInput {
  /** A list of Amazon Web Services account IDs that are associated with the registries for which to get AuthorizationData objects. If you do not specify a registry, the default registry is assumed. */
  registryIds?: string[];
}

export interface GetDownloadUrlForLayerInput {
  /** The digest of the image layer to download. */
  layerDigest: string;
  /** The name of the repository that is associated with the image layer to download. */
  repositoryName: string;
  /** The Amazon Web Services account ID associated with the registry that contains the image layer to download. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface GetLifecyclePolicyInput {
  /** The name of the repository. */
  repositoryName: string;
  /** The Amazon Web Services account ID associated with the registry that contains the repository. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface GetLifecyclePolicyPreviewInput {
  /** The name of the repository. */
  repositoryName: string;
  /** An optional parameter that filters results based on image tag status and all tags, if tagged. */
  filter?: LifecyclePolicyPreviewFilter;
  /** The list of imageIDs to be included. */
  imageIds?: ImageIdentifier[];
  /** The maximum number of repository results returned by GetLifecyclePolicyPreviewRequest in paginated output. When this parameter is used, GetLifecyclePolicyPreviewRequest only returns maxResults results */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated GetLifecyclePolicyPreviewRequest request where maxResults was used and the results exceeded the value of that parameter. Pagination continues fro */
  nextToken?: string;
  /** The Amazon Web Services account ID associated with the registry that contains the repository. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface GetRepositoryPolicyInput {
  /** The name of the repository with the policy to retrieve. */
  repositoryName: string;
  /** The Amazon Web Services account ID associated with the registry that contains the repository. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface InitiateLayerUploadInput {
  /** The name of the repository to which you intend to upload layers. */
  repositoryName: string;
  /** The Amazon Web Services account ID associated with the registry to which you intend to upload layers. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface ListImageReferrersInput {
  /** The name of the repository that contains the subject image. */
  repositoryName: string;
  /** An object containing the image digest of the subject image for which to retrieve associated artifacts. */
  subjectId: SubjectIdentifier;
  /** The filter key and value with which to filter your ListImageReferrers results. If no filter is specified, only artifacts with ACTIVE status are returned. */
  filter?: ListImageReferrersFilter;
  /** The maximum number of image referrer results returned by ListImageReferrers in paginated output. When this parameter is used, ListImageReferrers only returns maxResults results in a single page along  */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated ListImageReferrers request where maxResults was used and the results exceeded the value of that parameter. Pagination continues from the end of t */
  nextToken?: string;
  /** The Amazon Web Services account ID associated with the registry that contains the repository in which to list image referrers. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface ListImagesInput {
  /** The repository with image IDs to be listed. */
  repositoryName: string;
  /** The filter key and value with which to filter your ListImages results. */
  filter?: ListImagesFilter;
  /** The maximum number of image results returned by ListImages in paginated output. When this parameter is used, ListImages only returns maxResults results in a single page along with a nextToken response */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated ListImages request where maxResults was used and the results exceeded the value of that parameter. Pagination continues from the end of the previ */
  nextToken?: string;
  /** The Amazon Web Services account ID associated with the registry that contains the repository in which to list images. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface ListPullTimeUpdateExclusionsInput {
  /** The maximum number of pull time update exclusion results returned by ListPullTimeUpdateExclusions in paginated output. When this parameter is used, ListPullTimeUpdateExclusions only returns maxResults */
  maxResults?: number;
  /** The nextToken value returned from a previous paginated ListPullTimeUpdateExclusions request where maxResults was used and the results exceeded the value of that parameter. Pagination continues from th */
  nextToken?: string;
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) that identifies the resource for which to list the tags. Currently, the only supported resource is an Amazon ECR repository. */
  resourceArn: string;
}

export interface PutAccountSettingInput {
  /** The name of the account setting, such as BASIC_SCAN_TYPE_VERSION, REGISTRY_POLICY_SCOPE, or BLOB_MOUNTING. */
  name: string;
  /** Setting value that is specified. Valid value for basic scan type: AWS_NATIVE. Valid values for registry policy scope: V1 or V2. Valid values for blob mounting: ENABLED or DISABLED. */
  value: string;
}

export interface PutImageInput {
  /** The image manifest corresponding to the image to be uploaded. */
  imageManifest: string;
  /** The name of the repository in which to put the image. */
  repositoryName: string;
  /** The image digest of the image manifest corresponding to the image. */
  imageDigest?: string;
  /** The media type of the image manifest. If you push an image manifest that does not contain the mediaType field, you must specify the imageManifestMediaType in the request. */
  imageManifestMediaType?: string;
  /** The tag to associate with the image. This parameter is optional. */
  imageTag?: string;
  /** The Amazon Web Services account ID associated with the registry that contains the repository in which to put the image. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface PutImageScanningConfigurationInput {
  /** The image scanning configuration for the repository. This setting determines whether images are scanned for known vulnerabilities after being pushed to the repository. */
  imageScanningConfiguration: ImageScanningConfiguration;
  /** The name of the repository in which to update the image scanning configuration setting. */
  repositoryName: string;
  /** The Amazon Web Services account ID associated with the registry that contains the repository in which to update the image scanning configuration setting. If you do not specify a registry, the default  */
  registryId?: string;
}

export interface PutImageTagMutabilityInput {
  /** The tag mutability setting for the repository. If MUTABLE is specified, image tags can be overwritten. If IMMUTABLE is specified, all image tags within the repository will be immutable which will prev */
  imageTagMutability: 'MUTABLE' | 'IMMUTABLE' | 'IMMUTABLE_WITH_EXCLUSION' | 'MUTABLE_WITH_EXCLUSION';
  /** The name of the repository in which to update the image tag mutability settings. */
  repositoryName: string;
  /** A list of filters that specify which image tags should be excluded from the image tag mutability setting being applied. */
  imageTagMutabilityExclusionFilters?: ImageTagMutabilityExclusionFilter[];
  /** The Amazon Web Services account ID associated with the registry that contains the repository in which to update the image tag mutability settings. If you do not specify a registry, the default registr */
  registryId?: string;
}

export interface PutLifecyclePolicyInput {
  /** The JSON repository policy text to apply to the repository. */
  lifecyclePolicyText: string;
  /** The name of the repository to receive the policy. */
  repositoryName: string;
  /** The Amazon Web Services account ID associated with the registry that contains the repository. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface PutRegistryPolicyInput {
  /** The JSON policy text to apply to your registry. The policy text follows the same format as IAM policy text. For more information, see Registry permissions in the Amazon Elastic Container Registry User */
  policyText: string;
}

export interface PutRegistryScanningConfigurationInput {
  /** The scanning rules to use for the registry. A scanning rule is used to determine which repository filters are used and at what frequency scanning will occur. */
  rules?: RegistryScanningRule[];
  /** The scanning type to set for the registry. When a registry scanning configuration is not defined, by default the BASIC scan type is used. When basic scanning is used, you may specify filters to determ */
  scanType?: 'BASIC' | 'ENHANCED';
}

export interface PutReplicationConfigurationInput {
  /** An object representing the replication configuration for a registry. */
  replicationConfiguration: ReplicationConfiguration;
}

export interface PutSigningConfigurationInput {
  /** The signing configuration to assign to the registry. */
  signingConfiguration: SigningConfiguration;
}

export interface RegisterPullTimeUpdateExclusionInput {
  /** The ARN of the IAM principal to exclude from having image pull times recorded. */
  principalArn: string;
}

export interface SetRepositoryPolicyInput {
  /** The JSON repository policy text to apply to the repository. For more information, see Amazon ECR repository policies in the Amazon Elastic Container Registry User Guide. */
  policyText: string;
  /** The name of the repository to receive the policy. */
  repositoryName: string;
  /** If the policy you are attempting to set on a repository policy would prevent you from setting another policy in the future, you must force the SetRepositoryPolicy operation. This is intended to preven */
  force?: boolean;
  /** The Amazon Web Services account ID associated with the registry that contains the repository. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface StartImageScanInput {
  imageId: ImageIdentifier;
  /** The name of the repository that contains the images to scan. */
  repositoryName: string;
  /** The Amazon Web Services account ID associated with the registry that contains the repository in which to start an image scan request. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface StartLifecyclePolicyPreviewInput {
  /** The name of the repository to be evaluated. */
  repositoryName: string;
  /** The policy to be evaluated against. If you do not specify a policy, the current policy for the repository is used. */
  lifecyclePolicyText?: string;
  /** The Amazon Web Services account ID associated with the registry that contains the repository. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface TagResourceInput {
  /** The Amazon Resource Name (ARN) of the the resource to which to add tags. Currently, the only supported resource is an Amazon ECR repository. */
  resourceArn: string;
  /** The tags to add to the resource. A tag is an array of key-value pairs. Tag keys can have a maximum character length of 128 characters, and tag values can have a maximum length of 256 characters. */
  tags: Tag[];
}

export interface UntagResourceInput {
  /** The Amazon Resource Name (ARN) of the resource from which to remove tags. Currently, the only supported resource is an Amazon ECR repository. */
  resourceArn: string;
  /** The keys of the tags to be removed. */
  tagKeys: string[];
}

export interface UpdateImageStorageClassInput {
  imageId: ImageIdentifier;
  /** The name of the repository that contains the image to transition. */
  repositoryName: string;
  /** The target storage class for the image. */
  targetStorageClass: 'STANDARD' | 'ARCHIVE';
  /** The Amazon Web Services account ID associated with the registry that contains the image to transition. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface UpdatePullThroughCacheRuleInput {
  /** The repository name prefix to use when caching images from the source registry. */
  ecrRepositoryPrefix: string;
  /** The Amazon Resource Name (ARN) of the Amazon Web Services Secrets Manager secret that identifies the credentials to authenticate to the upstream registry. */
  credentialArn?: string;
  /** Amazon Resource Name (ARN) of the IAM role to be assumed by Amazon ECR to authenticate to the ECR upstream registry. This role must be in the same account as the registry that you are configuring. */
  customRoleArn?: string;
  /** The Amazon Web Services account ID associated with the registry associated with the pull through cache rule. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface UpdateRepositoryCreationTemplateInput {
  /** The repository namespace prefix that matches an existing repository creation template in the registry. All repositories created using this namespace prefix will have the settings defined in this templ */
  prefix: string;
  /** Updates the list of enumerable strings representing the Amazon ECR repository creation scenarios that this template will apply towards. The supported scenarios are PULL_THROUGH_CACHE, REPLICATION, and */
  appliedFor?: 'REPLICATION' | 'PULL_THROUGH_CACHE' | 'CREATE_ON_PUSH'[];
  /** The ARN of the role to be assumed by Amazon ECR. This role must be in the same account as the registry that you are configuring. Amazon ECR will assume your supplied role when the customRoleArn is spe */
  customRoleArn?: string;
  /** A description for the repository creation template. */
  description?: string;
  encryptionConfiguration?: EncryptionConfigurationForRepositoryCreationTemplate;
  /** Updates the tag mutability setting for the repository. If this parameter is omitted, the default setting of MUTABLE will be used which will allow image tags to be overwritten. If IMMUTABLE is specifie */
  imageTagMutability?: 'MUTABLE' | 'IMMUTABLE' | 'IMMUTABLE_WITH_EXCLUSION' | 'MUTABLE_WITH_EXCLUSION';
  /** A list of filters that specify which image tags should be excluded from the repository creation template's image tag mutability setting. */
  imageTagMutabilityExclusionFilters?: ImageTagMutabilityExclusionFilter[];
  /** Updates the lifecycle policy associated with the specified repository creation template. */
  lifecyclePolicy?: string;
  /** Updates the repository policy created using the template. A repository policy is a permissions policy associated with a repository to control access permissions. */
  repositoryPolicy?: string;
  /** The metadata to apply to the repository to help you categorize and organize. Each tag consists of a key and an optional value, both of which you define. Tag keys can have a maximum character length of */
  resourceTags?: Tag[];
}

export interface UploadLayerPartInput {
  /** The base64-encoded layer part payload. */
  layerPartBlob: string;
  /** The position of the first byte of the layer part witin the overall image layer. */
  partFirstByte: number;
  /** The position of the last byte of the layer part within the overall image layer. */
  partLastByte: number;
  /** The name of the repository to which you are uploading layer parts. */
  repositoryName: string;
  /** The upload ID from a previous InitiateLayerUpload operation to associate with the layer part upload. */
  uploadId: string;
  /** The Amazon Web Services account ID associated with the registry to which you are uploading layer parts. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

export interface ValidatePullThroughCacheRuleInput {
  /** The repository name prefix associated with the pull through cache rule. */
  ecrRepositoryPrefix: string;
  /** The registry ID associated with the pull through cache rule. If you do not specify a registry, the default registry is assumed. */
  registryId?: string;
}

/** ECR service binding for Step Functions SDK integrations. */
export class ECR {
  constructor() {}

  batchCheckLayerAvailability<T>(params: BatchCheckLayerAvailabilityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchDeleteImage<T>(params: BatchDeleteImageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchGetImage<T>(params: BatchGetImageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  batchGetRepositoryScanningConfiguration<T>(params: BatchGetRepositoryScanningConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  completeLayerUpload<T>(params: CompleteLayerUploadInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createPullThroughCacheRule<T>(params: CreatePullThroughCacheRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRepository<T>(params: CreateRepositoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createRepositoryCreationTemplate<T>(params: CreateRepositoryCreationTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteLifecyclePolicy<T>(params: DeleteLifecyclePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deletePullThroughCacheRule<T>(params: DeletePullThroughCacheRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRegistryPolicy<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRepository<T>(params: DeleteRepositoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRepositoryCreationTemplate<T>(params: DeleteRepositoryCreationTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteRepositoryPolicy<T>(params: DeleteRepositoryPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteSigningConfiguration<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deregisterPullTimeUpdateExclusion<T>(params: DeregisterPullTimeUpdateExclusionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeImageReplicationStatus<T>(params: DescribeImageReplicationStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeImages<T>(params: DescribeImagesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeImageScanFindings<T>(params: DescribeImageScanFindingsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeImageSigningStatus<T>(params: DescribeImageSigningStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describePullThroughCacheRules<T>(params: DescribePullThroughCacheRulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRegistry<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRepositories<T>(params: DescribeRepositoriesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeRepositoryCreationTemplates<T>(params: DescribeRepositoryCreationTemplatesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAccountSetting<T>(params: GetAccountSettingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getAuthorizationToken<T>(params: GetAuthorizationTokenInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getDownloadUrlForLayer<T>(params: GetDownloadUrlForLayerInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getLifecyclePolicy<T>(params: GetLifecyclePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getLifecyclePolicyPreview<T>(params: GetLifecyclePolicyPreviewInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRegistryPolicy<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRegistryScanningConfiguration<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getRepositoryPolicy<T>(params: GetRepositoryPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSigningConfiguration<T>(params: Record<string, any>): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  initiateLayerUpload<T>(params: InitiateLayerUploadInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listImageReferrers<T>(params: ListImageReferrersInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listImages<T>(params: ListImagesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listPullTimeUpdateExclusions<T>(params: ListPullTimeUpdateExclusionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putAccountSetting<T>(params: PutAccountSettingInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putImage<T>(params: PutImageInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putImageScanningConfiguration<T>(params: PutImageScanningConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putImageTagMutability<T>(params: PutImageTagMutabilityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putLifecyclePolicy<T>(params: PutLifecyclePolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putRegistryPolicy<T>(params: PutRegistryPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putRegistryScanningConfiguration<T>(params: PutRegistryScanningConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putReplicationConfiguration<T>(params: PutReplicationConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putSigningConfiguration<T>(params: PutSigningConfigurationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  registerPullTimeUpdateExclusion<T>(params: RegisterPullTimeUpdateExclusionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  setRepositoryPolicy<T>(params: SetRepositoryPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startImageScan<T>(params: StartImageScanInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startLifecyclePolicyPreview<T>(params: StartLifecyclePolicyPreviewInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateImageStorageClass<T>(params: UpdateImageStorageClassInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePullThroughCacheRule<T>(params: UpdatePullThroughCacheRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateRepositoryCreationTemplate<T>(params: UpdateRepositoryCreationTemplateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  uploadLayerPart<T>(params: UploadLayerPartInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  validatePullThroughCacheRule<T>(params: ValidatePullThroughCacheRuleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
