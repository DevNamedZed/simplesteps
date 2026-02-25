// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy, TaskOptions } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for SecretsManager operations. */
export interface SecretsManagerOptions extends TaskOptions {
}

export interface Tag {
  /** The key identifier, or name, of the tag. */
  Key?: string;
  /** The string value associated with the key of the tag. */
  Value?: string;
}

export interface ReplicaRegionType {
  /** A Region code. For a list of Region codes, see Name and code of Regions. */
  Region?: string;
  /** The ARN, key ID, or alias of the KMS key to encrypt the secret. If you don't include this field, Secrets Manager uses aws/secretsmanager. */
  KmsKeyId?: string;
}

export interface GetSecretValueInput {
  /** The ARN or name of the secret to retrieve. To retrieve a secret from another account, you must use an ARN. For an ARN, we recommend that you specify a complete ARN rather than a partial ARN. See Findi */
  SecretId: string;
  /** The unique identifier of the version of the secret to retrieve. If you include both this parameter and VersionStage, the two parameters must refer to the same secret version. If you don't specify eith */
  VersionId?: string;
  /** The staging label of the version of the secret to retrieve. Secrets Manager uses staging labels to keep track of different versions during the rotation process. If you include both this parameter and  */
  VersionStage?: string;
}

export interface PutSecretValueInput {
  /** The ARN or name of the secret to add a new version to. For an ARN, we recommend that you specify a complete ARN rather than a partial ARN. See Finding a secret from a partial ARN. If the secret doesn' */
  SecretId: string;
  /** A unique identifier for the new version of the secret. If you use the Amazon Web Services CLI or one of the Amazon Web Services SDKs to call this operation, then you can leave this parameter empty. Th */
  ClientRequestToken?: string;
  /** A unique identifier that indicates the source of the request. Required for secret rotations using an IAM assumed role or cross-account rotation, in which you rotate a secret in one account by using a  */
  RotationToken?: string;
  /** The binary data to encrypt and store in the new version of the secret. To use this parameter in the command-line tools, we recommend that you store your binary data in a file and then pass the content */
  SecretBinary?: string;
  /** The text to encrypt and store in the new version of the secret. You must include SecretBinary or SecretString, but not both. We recommend you create the secret string as JSON key/value pairs, as shown */
  SecretString?: string;
  /** A list of staging labels to attach to this version of the secret. Secrets Manager uses staging labels to track versions of a secret through the rotation process. If you specify a staging label that's  */
  VersionStages?: string[];
}

export interface CreateSecretInput {
  /** The name of the new secret. The secret name can contain ASCII letters, numbers, and the following characters: /_+=.@- Do not end your secret name with a hyphen followed by six characters. If you do so */
  Name: string;
  /** A list of Regions and KMS keys to replicate secrets. */
  AddReplicaRegions?: ReplicaRegionType[];
  /** If you include SecretString or SecretBinary, then Secrets Manager creates an initial version for the secret, and this parameter specifies the unique identifier for the new version. If you use the Amaz */
  ClientRequestToken?: string;
  /** The description of the secret. */
  Description?: string;
  /** Specifies whether to overwrite a secret with the same name in the destination Region. By default, secrets aren't overwritten. */
  ForceOverwriteReplicaSecret?: boolean;
  /** The ARN, key ID, or alias of the KMS key that Secrets Manager uses to encrypt the secret value in the secret. An alias is always prefixed by alias/, for example alias/aws/secretsmanager. For more info */
  KmsKeyId?: string;
  /** The binary data to encrypt and store in the new version of the secret. We recommend that you store your binary data in a file and then pass the contents of the file as a parameter. Either SecretString */
  SecretBinary?: string;
  /** The text data to encrypt and store in this new version of the secret. We recommend you use a JSON structure of key/value pairs for your secret value. Either SecretString or SecretBinary must have a va */
  SecretString?: string;
  /** A list of tags to attach to the secret. Each tag is a key and value pair of strings in a JSON text string, for example: [{"Key":"CostCenter","Value":"12345"},{"Key":"environment","Value":"production"} */
  Tags?: Tag[];
  /** The exact string that identifies the partner that holds the external secret. For more information, see Using Secrets Manager managed external secrets. */
  Type?: string;
}

export interface UpdateSecretInput {
  /** The ARN or name of the secret. For an ARN, we recommend that you specify a complete ARN rather than a partial ARN. See Finding a secret from a partial ARN. */
  SecretId: string;
  /** If you include SecretString or SecretBinary, then Secrets Manager creates a new version for the secret, and this parameter specifies the unique identifier for the new version. If you use the Amazon We */
  ClientRequestToken?: string;
  /** The description of the secret. */
  Description?: string;
  /** The ARN, key ID, or alias of the KMS key that Secrets Manager uses to encrypt new secret versions as well as any existing versions with the staging labels AWSCURRENT, AWSPENDING, or AWSPREVIOUS. If yo */
  KmsKeyId?: string;
  /** The binary data to encrypt and store in the new version of the secret. We recommend that you store your binary data in a file and then pass the contents of the file as a parameter. Either SecretBinary */
  SecretBinary?: string;
  /** The text data to encrypt and store in the new version of the secret. We recommend you use a JSON structure of key/value pairs for your secret value. Either SecretBinary or SecretString must have a val */
  SecretString?: string;
  /** The exact string that identifies the third-party partner that holds the external secret. For more information, see Managed external secret partners. */
  Type?: string;
}

export interface DeleteSecretInput {
  /** The ARN or name of the secret to delete. For an ARN, we recommend that you specify a complete ARN rather than a partial ARN. See Finding a secret from a partial ARN. */
  SecretId: string;
  /** Specifies whether to delete the secret without any recovery window. You can't use both this parameter and RecoveryWindowInDays in the same call. If you don't use either, then by default Secrets Manage */
  ForceDeleteWithoutRecovery?: boolean;
  /** The number of days from 7 to 30 that Secrets Manager waits before permanently deleting the secret. You can't use both this parameter and ForceDeleteWithoutRecovery in the same call. If you don't use e */
  RecoveryWindowInDays?: number;
}

export interface DescribeSecretInput {
  /** The ARN or name of the secret. For an ARN, we recommend that you specify a complete ARN rather than a partial ARN. See Finding a secret from a partial ARN. */
  SecretId: string;
}

/** Secrets Manager binding for the SimpleSteps compiler. */
export class SecretsManager {
  constructor() {}

  getSecretValue<T>(params: GetSecretValueInput, options?: SecretsManagerOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putSecretValue(params: PutSecretValueInput, options?: SecretsManagerOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  createSecret<T>(params: CreateSecretInput, options?: SecretsManagerOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateSecret(params: UpdateSecretInput, options?: SecretsManagerOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  deleteSecret(params: DeleteSecretInput, options?: SecretsManagerOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  describeSecret<T>(params: DescribeSecretInput, options?: SecretsManagerOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
