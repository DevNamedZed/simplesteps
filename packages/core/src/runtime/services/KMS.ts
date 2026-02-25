// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface XksProxyAuthenticationCredentialType {
  /** A unique identifier for the raw secret access key. */
  AccessKeyId: string;
  /** A secret string of 43-64 characters. Valid characters are a-z, A-Z, 0-9, /, +, and =. */
  RawSecretAccessKey: string;
}

export interface GrantConstraints {
  /** A list of key-value pairs that must be included in the encryption context of the cryptographic operation request. The grant allows the cryptographic operation only when the encryption context in the r */
  EncryptionContextSubset?: Record<string, string>;
  /** A list of key-value pairs that must match the encryption context in the cryptographic operation request. The grant allows the operation only when the encryption context in the request is the same as t */
  EncryptionContextEquals?: Record<string, string>;
}

export interface Tag {
  /** The key of the tag. */
  TagKey: string;
  /** The value of the tag. */
  TagValue: string;
}

export interface RecipientInfo {
  /** The encryption algorithm that KMS should use with the public key for an Amazon Web Services Nitro Enclave or NitroTPM to encrypt plaintext values for the response. The only valid value is RSAES_OAEP_S */
  KeyEncryptionAlgorithm?: 'RSAES_OAEP_SHA_256';
  /** The attestation document for an Amazon Web Services Nitro Enclave or a NitroTPM. This document includes the enclave's public key. */
  AttestationDocument?: string;
}

export interface CancelKeyDeletionInput {
  /** Identifies the KMS key whose deletion is being canceled. Specify the key ID or key ARN of the KMS key. For example: Key ID: 1234abcd-12ab-34cd-56ef-1234567890ab Key ARN: arn:aws:kms:us-east-2:11112222 */
  KeyId: string;
}

export interface ConnectCustomKeyStoreInput {
  /** Enter the key store ID of the custom key store that you want to connect. To find the ID of a custom key store, use the DescribeCustomKeyStores operation. */
  CustomKeyStoreId: string;
}

export interface CreateAliasInput {
  /** Specifies the alias name. This value must begin with alias/ followed by a name, such as alias/ExampleAlias. Do not include confidential or sensitive information in this field. This field may be displa */
  AliasName: string;
  /** Associates the alias with the specified customer managed key. The KMS key must be in the same Amazon Web Services Region. A valid key ID is required. If you supply a null or empty string value, this o */
  TargetKeyId: string;
}

export interface CreateCustomKeyStoreInput {
  /** Specifies a friendly name for the custom key store. The name must be unique in your Amazon Web Services account and Region. This parameter is required for all custom key stores. Do not include confide */
  CustomKeyStoreName: string;
  /** Identifies the CloudHSM cluster for an CloudHSM key store. This parameter is required for custom key stores with CustomKeyStoreType of AWS_CLOUDHSM. Enter the cluster ID of any active CloudHSM cluster */
  CloudHsmClusterId?: string;
  /** Specifies the type of custom key store. The default value is AWS_CLOUDHSM. For a custom key store backed by an CloudHSM cluster, omit the parameter or enter AWS_CLOUDHSM. For a custom key store backed */
  CustomKeyStoreType?: 'AWS_CLOUDHSM' | 'EXTERNAL_KEY_STORE';
  /** Specifies the kmsuser password for an CloudHSM key store. This parameter is required for custom key stores with a CustomKeyStoreType of AWS_CLOUDHSM. Enter the password of the kmsuser crypto user (CU) */
  KeyStorePassword?: string;
  /** Specifies the certificate for an CloudHSM key store. This parameter is required for custom key stores with a CustomKeyStoreType of AWS_CLOUDHSM. Enter the content of the trust anchor certificate for t */
  TrustAnchorCertificate?: string;
  /** Specifies an authentication credential for the external key store proxy (XKS proxy). This parameter is required for all custom key stores with a CustomKeyStoreType of EXTERNAL_KEY_STORE. The XksProxyA */
  XksProxyAuthenticationCredential?: XksProxyAuthenticationCredentialType;
  /** Indicates how KMS communicates with the external key store proxy. This parameter is required for custom key stores with a CustomKeyStoreType of EXTERNAL_KEY_STORE. If the external key store proxy uses */
  XksProxyConnectivity?: 'PUBLIC_ENDPOINT' | 'VPC_ENDPOINT_SERVICE';
  /** Specifies the endpoint that KMS uses to send requests to the external key store proxy (XKS proxy). This parameter is required for custom key stores with a CustomKeyStoreType of EXTERNAL_KEY_STORE. The */
  XksProxyUriEndpoint?: string;
  /** Specifies the base path to the proxy APIs for this external key store. To find this value, see the documentation for your external key store proxy. This parameter is required for all custom key stores */
  XksProxyUriPath?: string;
  /** Specifies the name of the Amazon VPC endpoint service for interface endpoints that is used to communicate with your external key store proxy (XKS proxy). This parameter is required when the value of C */
  XksProxyVpcEndpointServiceName?: string;
  /** Specifies the Amazon Web Services account ID that owns the Amazon VPC service endpoint for the interface that is used to communicate with your external key store proxy (XKS proxy). This parameter is o */
  XksProxyVpcEndpointServiceOwner?: string;
}

export interface CreateGrantInput {
  /** The identity that gets the permissions specified in the grant. To specify the grantee principal, use the Amazon Resource Name (ARN) of an Amazon Web Services principal. Valid principals include Amazon */
  GranteePrincipal: string;
  /** Identifies the KMS key for the grant. The grant gives principals permission to use this KMS key. Specify the key ID or key ARN of the KMS key. To specify a KMS key in a different Amazon Web Services a */
  KeyId: string;
  /** A list of operations that the grant permits. This list must include only operations that are permitted in a grant. Also, the operation must be supported on the KMS key. For example, you cannot create  */
  Operations: 'Decrypt' | 'Encrypt' | 'GenerateDataKey' | 'GenerateDataKeyWithoutPlaintext' | 'ReEncryptFrom' | 'ReEncryptTo' | 'Sign' | 'Verify' | 'GetPublicKey' | 'CreateGrant' | 'RetireGrant' | 'DescribeKey' | 'GenerateDataKeyPair' | 'GenerateDataKeyPairWithoutPlaintext' | 'GenerateMac' | 'VerifyMac' | 'DeriveSharedSecret'[];
  /** Specifies a grant constraint. Do not include confidential or sensitive information in this field. This field may be displayed in plaintext in CloudTrail logs and other output. KMS supports the Encrypt */
  Constraints?: GrantConstraints;
  /** Checks if your request will succeed. DryRun is an optional parameter. To learn more about how to use this parameter, see Testing your permissions in the Key Management Service Developer Guide. */
  DryRun?: boolean;
  /** A list of grant tokens. Use a grant token when your permission to call this operation comes from a new grant that has not yet achieved eventual consistency. For more information, see Grant token and U */
  GrantTokens?: string[];
  /** A friendly name for the grant. Use this value to prevent the unintended creation of duplicate grants when retrying this request. Do not include confidential or sensitive information in this field. Thi */
  Name?: string;
  /** The principal that has permission to use the RetireGrant operation to retire the grant. To specify the principal, use the Amazon Resource Name (ARN) of an Amazon Web Services principal. Valid principa */
  RetiringPrincipal?: string;
}

export interface CreateKeyInput {
  /** Skips ("bypasses") the key policy lockout safety check. The default value is false. Setting this value to true increases the risk that the KMS key becomes unmanageable. Do not set this value to true i */
  BypassPolicyLockoutSafetyCheck?: boolean;
  /** Instead, use the KeySpec parameter. The KeySpec and CustomerMasterKeySpec parameters work the same way. Only the names differ. We recommend that you use KeySpec parameter in your code. However, to avo */
  CustomerMasterKeySpec?: 'RSA_2048' | 'RSA_3072' | 'RSA_4096' | 'ECC_NIST_P256' | 'ECC_NIST_P384' | 'ECC_NIST_P521' | 'ECC_SECG_P256K1' | 'SYMMETRIC_DEFAULT' | 'HMAC_224' | 'HMAC_256' | 'HMAC_384' | 'HMAC_512' | 'SM2';
  /** Creates the KMS key in the specified custom key store. The ConnectionState of the custom key store must be CONNECTED. To find the CustomKeyStoreID and ConnectionState use the DescribeCustomKeyStores o */
  CustomKeyStoreId?: string;
  /** A description of the KMS key. Use a description that helps you decide whether the KMS key is appropriate for a task. The default value is an empty string (no description). Do not include confidential  */
  Description?: string;
  /** Specifies the type of KMS key to create. The default value, SYMMETRIC_DEFAULT, creates a KMS key with a 256-bit AES-GCM key that is used for encryption and decryption, except in China Regions, where i */
  KeySpec?: 'RSA_2048' | 'RSA_3072' | 'RSA_4096' | 'ECC_NIST_P256' | 'ECC_NIST_P384' | 'ECC_NIST_P521' | 'ECC_SECG_P256K1' | 'SYMMETRIC_DEFAULT' | 'HMAC_224' | 'HMAC_256' | 'HMAC_384' | 'HMAC_512' | 'SM2' | 'ML_DSA_44' | 'ML_DSA_65' | 'ML_DSA_87' | 'ECC_NIST_EDWARDS25519';
  /** Determines the cryptographic operations for which you can use the KMS key. The default value is ENCRYPT_DECRYPT. This parameter is optional when you are creating a symmetric encryption KMS key; otherw */
  KeyUsage?: 'SIGN_VERIFY' | 'ENCRYPT_DECRYPT' | 'GENERATE_VERIFY_MAC' | 'KEY_AGREEMENT';
  /** Creates a multi-Region primary key that you can replicate into other Amazon Web Services Regions. You cannot change this value after you create the KMS key. For a multi-Region key, set this parameter  */
  MultiRegion?: boolean;
  /** The source of the key material for the KMS key. You cannot change the origin after you create the KMS key. The default is AWS_KMS, which means that KMS creates the key material. To create a KMS key wi */
  Origin?: 'AWS_KMS' | 'EXTERNAL' | 'AWS_CLOUDHSM' | 'EXTERNAL_KEY_STORE';
  /** The key policy to attach to the KMS key. If you provide a key policy, it must meet the following criteria: The key policy must allow the calling principal to make a subsequent PutKeyPolicy request on  */
  Policy?: string;
  /** Assigns one or more tags to the KMS key. Use this parameter to tag the KMS key when it is created. To tag an existing KMS key, use the TagResource operation. Do not include confidential or sensitive i */
  Tags?: Tag[];
  /** Identifies the external key that serves as key material for the KMS key in an external key store. Specify the ID that the external key store proxy uses to refer to the external key. For help, see the  */
  XksKeyId?: string;
}

export interface DecryptInput {
  /** Ciphertext to be decrypted. The blob includes metadata. This parameter is required in all cases except when DryRun is true and DryRunModifiers is set to IGNORE_CIPHERTEXT. */
  CiphertextBlob?: string;
  /** Checks if your request will succeed. DryRun is an optional parameter. To learn more about how to use this parameter, see Testing your permissions in the Key Management Service Developer Guide. */
  DryRun?: boolean;
  /** Specifies the modifiers to apply to the dry run operation. DryRunModifiers is an optional parameter that only applies when DryRun is set to true. When set to IGNORE_CIPHERTEXT, KMS performs only autho */
  DryRunModifiers?: 'IGNORE_CIPHERTEXT'[];
  /** Specifies the encryption algorithm that will be used to decrypt the ciphertext. Specify the same algorithm that was used to encrypt the data. If you specify a different algorithm, the Decrypt operatio */
  EncryptionAlgorithm?: 'SYMMETRIC_DEFAULT' | 'RSAES_OAEP_SHA_1' | 'RSAES_OAEP_SHA_256' | 'SM2PKE';
  /** Specifies the encryption context to use when decrypting the data. An encryption context is valid only for cryptographic operations with a symmetric encryption KMS key. The standard asymmetric encrypti */
  EncryptionContext?: Record<string, string>;
  /** A list of grant tokens. Use a grant token when your permission to call this operation comes from a new grant that has not yet achieved eventual consistency. For more information, see Grant token and U */
  GrantTokens?: string[];
  /** Specifies the KMS key that KMS uses to decrypt the ciphertext. Enter a key ID of the KMS key that was used to encrypt the ciphertext. If you identify a different KMS key, the Decrypt operation throws  */
  KeyId?: string;
  /** A signed attestation document from an Amazon Web Services Nitro enclave or NitroTPM, and the encryption algorithm to use with the public key in the attestation document. The only valid encryption algo */
  Recipient?: RecipientInfo;
}

export interface DeleteAliasInput {
  /** The alias to be deleted. The alias name must begin with alias/ followed by the alias name, such as alias/ExampleAlias. */
  AliasName: string;
}

export interface DeleteCustomKeyStoreInput {
  /** Enter the ID of the custom key store you want to delete. To find the ID of a custom key store, use the DescribeCustomKeyStores operation. */
  CustomKeyStoreId: string;
}

export interface DeleteImportedKeyMaterialInput {
  /** Identifies the KMS key from which you are deleting imported key material. The Origin of the KMS key must be EXTERNAL. Specify the key ID or key ARN of the KMS key. For example: Key ID: 1234abcd-12ab-3 */
  KeyId: string;
  /** Identifies the imported key material you are deleting. If no KeyMaterialId is specified, KMS deletes the current key material. To get the list of key material IDs associated with a KMS key, use ListKe */
  KeyMaterialId?: string;
}

export interface DeriveSharedSecretInput {
  /** Specifies the key agreement algorithm used to derive the shared secret. The only valid value is ECDH. */
  KeyAgreementAlgorithm: 'ECDH';
  /** Identifies an asymmetric NIST-standard ECC or SM2 (China Regions only) KMS key. KMS uses the private key in the specified key pair to derive the shared secret. The key usage of the KMS key must be KEY */
  KeyId: string;
  /** Specifies the public key in your peer's NIST-standard elliptic curve (ECC) or SM2 (China Regions only) key pair. The public key must be a DER-encoded X.509 public key, also known as SubjectPublicKeyIn */
  PublicKey: string;
  /** Checks if your request will succeed. DryRun is an optional parameter. To learn more about how to use this parameter, see Testing your permissions in the Key Management Service Developer Guide. */
  DryRun?: boolean;
  /** A list of grant tokens. Use a grant token when your permission to call this operation comes from a new grant that has not yet achieved eventual consistency. For more information, see Grant token and U */
  GrantTokens?: string[];
  /** A signed attestation document from an Amazon Web Services Nitro enclave or NitroTPM, and the encryption algorithm to use with the public key in the attestation document. The only valid encryption algo */
  Recipient?: RecipientInfo;
}

export interface DescribeCustomKeyStoresInput {
  /** Gets only information about the specified custom key store. Enter the key store ID. By default, this operation gets information about all custom key stores in the account and Region. To limit the outp */
  CustomKeyStoreId?: string;
  /** Gets only information about the specified custom key store. Enter the friendly name of the custom key store. By default, this operation gets information about all custom key stores in the account and  */
  CustomKeyStoreName?: string;
  /** Use this parameter to specify the maximum number of items to return. When this value is present, KMS does not return more than the specified number of items, but it might return fewer. */
  Limit?: number;
  /** Use this parameter in a subsequent request after you receive a response with truncated results. Set it to the value of NextMarker from the truncated response you just received. */
  Marker?: string;
}

export interface DescribeKeyInput {
  /** Describes the specified KMS key. If you specify a predefined Amazon Web Services alias (an Amazon Web Services alias with no key ID), KMS associates the alias with an Amazon Web Services managed key a */
  KeyId: string;
  /** A list of grant tokens. Use a grant token when your permission to call this operation comes from a new grant that has not yet achieved eventual consistency. For more information, see Grant token and U */
  GrantTokens?: string[];
}

export interface DisableKeyInput {
  /** Identifies the KMS key to disable. Specify the key ID or key ARN of the KMS key. For example: Key ID: 1234abcd-12ab-34cd-56ef-1234567890ab Key ARN: arn:aws:kms:us-east-2:111122223333:key/1234abcd-12ab */
  KeyId: string;
}

export interface DisableKeyRotationInput {
  /** Identifies a symmetric encryption KMS key. You cannot enable or disable automatic rotation of asymmetric KMS keys, HMAC KMS keys, KMS keys with imported key material, or KMS keys in a custom key store */
  KeyId: string;
}

export interface DisconnectCustomKeyStoreInput {
  /** Enter the ID of the custom key store you want to disconnect. To find the ID of a custom key store, use the DescribeCustomKeyStores operation. */
  CustomKeyStoreId: string;
}

export interface EnableKeyInput {
  /** Identifies the KMS key to enable. Specify the key ID or key ARN of the KMS key. For example: Key ID: 1234abcd-12ab-34cd-56ef-1234567890ab Key ARN: arn:aws:kms:us-east-2:111122223333:key/1234abcd-12ab- */
  KeyId: string;
}

export interface EnableKeyRotationInput {
  /** Identifies a symmetric encryption KMS key. You cannot enable automatic rotation of asymmetric KMS keys, HMAC KMS keys, KMS keys with imported key material, or KMS keys in a custom key store. To enable */
  KeyId: string;
  /** Use this parameter to specify a custom period of time between each rotation date. If no value is specified, the default value is 365 days. The rotation period defines the number of days after you enab */
  RotationPeriodInDays?: number;
}

export interface EncryptInput {
  /** Identifies the KMS key to use in the encryption operation. The KMS key must have a KeyUsage of ENCRYPT_DECRYPT. To find the KeyUsage of a KMS key, use the DescribeKey operation. To specify a KMS key,  */
  KeyId: string;
  /** Data to be encrypted. */
  Plaintext: string;
  /** Checks if your request will succeed. DryRun is an optional parameter. To learn more about how to use this parameter, see Testing your permissions in the Key Management Service Developer Guide. */
  DryRun?: boolean;
  /** Specifies the encryption algorithm that KMS will use to encrypt the plaintext message. The algorithm must be compatible with the KMS key that you specify. This parameter is required only for asymmetri */
  EncryptionAlgorithm?: 'SYMMETRIC_DEFAULT' | 'RSAES_OAEP_SHA_1' | 'RSAES_OAEP_SHA_256' | 'SM2PKE';
  /** Specifies the encryption context that will be used to encrypt the data. An encryption context is valid only for cryptographic operations with a symmetric encryption KMS key. The standard asymmetric en */
  EncryptionContext?: Record<string, string>;
  /** A list of grant tokens. Use a grant token when your permission to call this operation comes from a new grant that has not yet achieved eventual consistency. For more information, see Grant token and U */
  GrantTokens?: string[];
}

export interface GenerateDataKeyInput {
  /** Specifies the symmetric encryption KMS key that encrypts the data key. You cannot specify an asymmetric KMS key or a KMS key in a custom key store. To get the type and origin of your KMS key, use the  */
  KeyId: string;
  /** Checks if your request will succeed. DryRun is an optional parameter. To learn more about how to use this parameter, see Testing your permissions in the Key Management Service Developer Guide. */
  DryRun?: boolean;
  /** Specifies the encryption context that will be used when encrypting the data key. Do not include confidential or sensitive information in this field. This field may be displayed in plaintext in CloudTr */
  EncryptionContext?: Record<string, string>;
  /** A list of grant tokens. Use a grant token when your permission to call this operation comes from a new grant that has not yet achieved eventual consistency. For more information, see Grant token and U */
  GrantTokens?: string[];
  /** Specifies the length of the data key. Use AES_128 to generate a 128-bit symmetric key, or AES_256 to generate a 256-bit symmetric key. You must specify either the KeySpec or the NumberOfBytes paramete */
  KeySpec?: 'AES_256' | 'AES_128';
  /** Specifies the length of the data key in bytes. For example, use the value 64 to generate a 512-bit data key (64 bytes is 512 bits). For 128-bit (16-byte) and 256-bit (32-byte) data keys, use the KeySp */
  NumberOfBytes?: number;
  /** A signed attestation document from an Amazon Web Services Nitro enclave or NitroTPM, and the encryption algorithm to use with the public key in the attestation document. The only valid encryption algo */
  Recipient?: RecipientInfo;
}

export interface GenerateDataKeyPairInput {
  /** Specifies the symmetric encryption KMS key that encrypts the private key in the data key pair. You cannot specify an asymmetric KMS key or a KMS key in a custom key store. To get the type and origin o */
  KeyId: string;
  /** Determines the type of data key pair that is generated. The KMS rule that restricts the use of asymmetric RSA and SM2 KMS keys to encrypt and decrypt or to sign and verify (but not both), the rule tha */
  KeyPairSpec: 'RSA_2048' | 'RSA_3072' | 'RSA_4096' | 'ECC_NIST_P256' | 'ECC_NIST_P384' | 'ECC_NIST_P521' | 'ECC_SECG_P256K1' | 'SM2' | 'ECC_NIST_EDWARDS25519';
  /** Checks if your request will succeed. DryRun is an optional parameter. To learn more about how to use this parameter, see Testing your permissions in the Key Management Service Developer Guide. */
  DryRun?: boolean;
  /** Specifies the encryption context that will be used when encrypting the private key in the data key pair. Do not include confidential or sensitive information in this field. This field may be displayed */
  EncryptionContext?: Record<string, string>;
  /** A list of grant tokens. Use a grant token when your permission to call this operation comes from a new grant that has not yet achieved eventual consistency. For more information, see Grant token and U */
  GrantTokens?: string[];
  /** A signed attestation document from an Amazon Web Services Nitro enclave or NitroTPM, and the encryption algorithm to use with the public key in the attestation document. The only valid encryption algo */
  Recipient?: RecipientInfo;
}

export interface GenerateDataKeyPairWithoutPlaintextInput {
  /** Specifies the symmetric encryption KMS key that encrypts the private key in the data key pair. You cannot specify an asymmetric KMS key or a KMS key in a custom key store. To get the type and origin o */
  KeyId: string;
  /** Determines the type of data key pair that is generated. The KMS rule that restricts the use of asymmetric RSA and SM2 KMS keys to encrypt and decrypt or to sign and verify (but not both), the rule tha */
  KeyPairSpec: 'RSA_2048' | 'RSA_3072' | 'RSA_4096' | 'ECC_NIST_P256' | 'ECC_NIST_P384' | 'ECC_NIST_P521' | 'ECC_SECG_P256K1' | 'SM2' | 'ECC_NIST_EDWARDS25519';
  /** Checks if your request will succeed. DryRun is an optional parameter. To learn more about how to use this parameter, see Testing your permissions in the Key Management Service Developer Guide. */
  DryRun?: boolean;
  /** Specifies the encryption context that will be used when encrypting the private key in the data key pair. Do not include confidential or sensitive information in this field. This field may be displayed */
  EncryptionContext?: Record<string, string>;
  /** A list of grant tokens. Use a grant token when your permission to call this operation comes from a new grant that has not yet achieved eventual consistency. For more information, see Grant token and U */
  GrantTokens?: string[];
}

export interface GenerateDataKeyWithoutPlaintextInput {
  /** Specifies the symmetric encryption KMS key that encrypts the data key. You cannot specify an asymmetric KMS key or a KMS key in a custom key store. To get the type and origin of your KMS key, use the  */
  KeyId: string;
  /** Checks if your request will succeed. DryRun is an optional parameter. To learn more about how to use this parameter, see Testing your permissions in the Key Management Service Developer Guide. */
  DryRun?: boolean;
  /** Specifies the encryption context that will be used when encrypting the data key. Do not include confidential or sensitive information in this field. This field may be displayed in plaintext in CloudTr */
  EncryptionContext?: Record<string, string>;
  /** A list of grant tokens. Use a grant token when your permission to call this operation comes from a new grant that has not yet achieved eventual consistency. For more information, see Grant token and U */
  GrantTokens?: string[];
  /** The length of the data key. Use AES_128 to generate a 128-bit symmetric key, or AES_256 to generate a 256-bit symmetric key. */
  KeySpec?: 'AES_256' | 'AES_128';
  /** The length of the data key in bytes. For example, use the value 64 to generate a 512-bit data key (64 bytes is 512 bits). For common key lengths (128-bit and 256-bit symmetric keys), we recommend that */
  NumberOfBytes?: number;
}

export interface GenerateMacInput {
  /** The HMAC KMS key to use in the operation. The MAC algorithm computes the HMAC for the message and the key as described in RFC 2104. To identify an HMAC KMS key, use the DescribeKey operation and see t */
  KeyId: string;
  /** The MAC algorithm used in the operation. The algorithm must be compatible with the HMAC KMS key that you specify. To find the MAC algorithms that your HMAC KMS key supports, use the DescribeKey operat */
  MacAlgorithm: 'HMAC_SHA_224' | 'HMAC_SHA_256' | 'HMAC_SHA_384' | 'HMAC_SHA_512';
  /** The message to be hashed. Specify a message of up to 4,096 bytes. GenerateMac and VerifyMac do not provide special handling for message digests. If you generate an HMAC for a hash digest of a message, */
  Message: string;
  /** Checks if your request will succeed. DryRun is an optional parameter. To learn more about how to use this parameter, see Testing your permissions in the Key Management Service Developer Guide. */
  DryRun?: boolean;
  /** A list of grant tokens. Use a grant token when your permission to call this operation comes from a new grant that has not yet achieved eventual consistency. For more information, see Grant token and U */
  GrantTokens?: string[];
}

export interface GenerateRandomInput {
  /** Generates the random byte string in the CloudHSM cluster that is associated with the specified CloudHSM key store. To find the ID of a custom key store, use the DescribeCustomKeyStores operation. Exte */
  CustomKeyStoreId?: string;
  /** The length of the random byte string. This parameter is required. */
  NumberOfBytes?: number;
  /** A signed attestation document from an Amazon Web Services Nitro enclave or NitroTPM, and the encryption algorithm to use with the public key in the attestation document. The only valid encryption algo */
  Recipient?: RecipientInfo;
}

export interface GetKeyPolicyInput {
  /** Gets the key policy for the specified KMS key. Specify the key ID or key ARN of the KMS key. For example: Key ID: 1234abcd-12ab-34cd-56ef-1234567890ab Key ARN: arn:aws:kms:us-east-2:111122223333:key/1 */
  KeyId: string;
  /** Specifies the name of the key policy. If no policy name is specified, the default value is default. The only valid name is default. To get the names of key policies, use ListKeyPolicies. */
  PolicyName?: string;
}

export interface GetKeyRotationStatusInput {
  /** Gets the rotation status for the specified KMS key. Specify the key ID or key ARN of the KMS key. To specify a KMS key in a different Amazon Web Services account, you must use the key ARN. For example */
  KeyId: string;
}

export interface GetParametersForImportInput {
  /** The identifier of the KMS key that will be associated with the imported key material. The Origin of the KMS key must be EXTERNAL. All KMS key types are supported, including multi-Region keys. However, */
  KeyId: string;
  /** The algorithm you will use with the RSA public key (PublicKey) in the response to protect your key material during import. For more information, see Select a wrapping algorithm in the Key Management S */
  WrappingAlgorithm: 'RSAES_PKCS1_V1_5' | 'RSAES_OAEP_SHA_1' | 'RSAES_OAEP_SHA_256' | 'RSA_AES_KEY_WRAP_SHA_1' | 'RSA_AES_KEY_WRAP_SHA_256' | 'SM2PKE';
  /** The type of RSA public key to return in the response. You will use this wrapping key with the specified wrapping algorithm to protect your key material during import. Use the longest RSA wrapping key  */
  WrappingKeySpec: 'RSA_2048' | 'RSA_3072' | 'RSA_4096' | 'SM2';
}

export interface GetPublicKeyInput {
  /** Identifies the asymmetric KMS key that includes the public key. To specify a KMS key, use its key ID, key ARN, alias name, or alias ARN. When using an alias name, prefix it with "alias/". To specify a */
  KeyId: string;
  /** A list of grant tokens. Use a grant token when your permission to call this operation comes from a new grant that has not yet achieved eventual consistency. For more information, see Grant token and U */
  GrantTokens?: string[];
}

export interface ImportKeyMaterialInput {
  /** The encrypted key material to import. The key material must be encrypted under the public wrapping key that GetParametersForImport returned, using the wrapping algorithm that you specified in the same */
  EncryptedKeyMaterial: string;
  /** The import token that you received in the response to a previous GetParametersForImport request. It must be from the same response that contained the public key that you used to encrypt the key materi */
  ImportToken: string;
  /** The identifier of the KMS key that will be associated with the imported key material. This must be the same KMS key specified in the KeyID parameter of the corresponding GetParametersForImport request */
  KeyId: string;
  /** Specifies whether the key material expires. The default is KEY_MATERIAL_EXPIRES. For help with this choice, see Setting an expiration time in the Key Management Service Developer Guide. When the value */
  ExpirationModel?: 'KEY_MATERIAL_EXPIRES' | 'KEY_MATERIAL_DOES_NOT_EXPIRE';
  /** Indicates whether the key material being imported is previously associated with this KMS key or not. This parameter is optional and only usable with symmetric encryption keys. If no key material has e */
  ImportType?: 'NEW_KEY_MATERIAL' | 'EXISTING_KEY_MATERIAL';
  /** Description for the key material being imported. This parameter is optional and only usable with symmetric encryption keys. If you do not specify a key material description, KMS retains the value you  */
  KeyMaterialDescription?: string;
  /** Identifies the key material being imported. This parameter is optional and only usable with symmetric encryption keys. You cannot specify a key material ID with ImportType set to NEW_KEY_MATERIAL. Whe */
  KeyMaterialId?: string;
  /** The date and time when the imported key material expires. This parameter is required when the value of the ExpirationModel parameter is KEY_MATERIAL_EXPIRES. Otherwise it is not valid. The value of th */
  ValidTo?: string;
}

export interface ListAliasesInput {
  /** Lists only aliases that are associated with the specified KMS key. Enter a KMS key in your Amazon Web Services account. This parameter is optional. If you omit it, ListAliases returns all aliases in t */
  KeyId?: string;
  /** Use this parameter to specify the maximum number of items to return. When this value is present, KMS does not return more than the specified number of items, but it might return fewer. This value is o */
  Limit?: number;
  /** Use this parameter in a subsequent request after you receive a response with truncated results. Set it to the value of NextMarker from the truncated response you just received. */
  Marker?: string;
}

export interface ListGrantsInput {
  /** Returns only grants for the specified KMS key. This parameter is required. Specify the key ID or key ARN of the KMS key. To specify a KMS key in a different Amazon Web Services account, you must use t */
  KeyId: string;
  /** Returns only grants where the specified principal is the grantee principal for the grant. */
  GranteePrincipal?: string;
  /** Returns only the grant with the specified grant ID. The grant ID uniquely identifies the grant. */
  GrantId?: string;
  /** Use this parameter to specify the maximum number of items to return. When this value is present, KMS does not return more than the specified number of items, but it might return fewer. This value is o */
  Limit?: number;
  /** Use this parameter in a subsequent request after you receive a response with truncated results. Set it to the value of NextMarker from the truncated response you just received. */
  Marker?: string;
}

export interface ListKeyPoliciesInput {
  /** Gets the names of key policies for the specified KMS key. Specify the key ID or key ARN of the KMS key. For example: Key ID: 1234abcd-12ab-34cd-56ef-1234567890ab Key ARN: arn:aws:kms:us-east-2:1111222 */
  KeyId: string;
  /** Use this parameter to specify the maximum number of items to return. When this value is present, KMS does not return more than the specified number of items, but it might return fewer. This value is o */
  Limit?: number;
  /** Use this parameter in a subsequent request after you receive a response with truncated results. Set it to the value of NextMarker from the truncated response you just received. */
  Marker?: string;
}

export interface ListKeyRotationsInput {
  /** Gets the key rotations for the specified KMS key. Specify the key ID or key ARN of the KMS key. For example: Key ID: 1234abcd-12ab-34cd-56ef-1234567890ab Key ARN: arn:aws:kms:us-east-2:111122223333:ke */
  KeyId: string;
  /** Use this optional parameter to control which key materials associated with this key are listed in the response. The default value of this parameter is ROTATIONS_ONLY. If you omit this parameter, KMS r */
  IncludeKeyMaterial?: 'ALL_KEY_MATERIAL' | 'ROTATIONS_ONLY';
  /** Use this parameter to specify the maximum number of items to return. When this value is present, KMS does not return more than the specified number of items, but it might return fewer. This value is o */
  Limit?: number;
  /** Use this parameter in a subsequent request after you receive a response with truncated results. Set it to the value of NextMarker from the truncated response you just received. */
  Marker?: string;
}

export interface ListKeysInput {
  /** Use this parameter to specify the maximum number of items to return. When this value is present, KMS does not return more than the specified number of items, but it might return fewer. This value is o */
  Limit?: number;
  /** Use this parameter in a subsequent request after you receive a response with truncated results. Set it to the value of NextMarker from the truncated response you just received. */
  Marker?: string;
}

export interface ListResourceTagsInput {
  /** Gets tags on the specified KMS key. Specify the key ID or key ARN of the KMS key. For example: Key ID: 1234abcd-12ab-34cd-56ef-1234567890ab Key ARN: arn:aws:kms:us-east-2:111122223333:key/1234abcd-12a */
  KeyId: string;
  /** Use this parameter to specify the maximum number of items to return. When this value is present, KMS does not return more than the specified number of items, but it might return fewer. This value is o */
  Limit?: number;
  /** Use this parameter in a subsequent request after you receive a response with truncated results. Set it to the value of NextMarker from the truncated response you just received. Do not attempt to const */
  Marker?: string;
}

export interface ListRetirableGrantsInput {
  /** The retiring principal for which to list grants. Enter a principal in your Amazon Web Services account. To specify the retiring principal, use the Amazon Resource Name (ARN) of an Amazon Web Services  */
  RetiringPrincipal: string;
  /** Use this parameter to specify the maximum number of items to return. When this value is present, KMS does not return more than the specified number of items, but it might return fewer. This value is o */
  Limit?: number;
  /** Use this parameter in a subsequent request after you receive a response with truncated results. Set it to the value of NextMarker from the truncated response you just received. */
  Marker?: string;
}

export interface PutKeyPolicyInput {
  /** Sets the key policy on the specified KMS key. Specify the key ID or key ARN of the KMS key. For example: Key ID: 1234abcd-12ab-34cd-56ef-1234567890ab Key ARN: arn:aws:kms:us-east-2:111122223333:key/12 */
  KeyId: string;
  /** The key policy to attach to the KMS key. The key policy must meet the following criteria: The key policy must allow the calling principal to make a subsequent PutKeyPolicy request on the KMS key. This */
  Policy: string;
  /** Skips ("bypasses") the key policy lockout safety check. The default value is false. Setting this value to true increases the risk that the KMS key becomes unmanageable. Do not set this value to true i */
  BypassPolicyLockoutSafetyCheck?: boolean;
  /** The name of the key policy. If no policy name is specified, the default value is default. The only valid value is default. */
  PolicyName?: string;
}

export interface ReEncryptInput {
  /** A unique identifier for the KMS key that is used to reencrypt the data. Specify a symmetric encryption KMS key or an asymmetric KMS key with a KeyUsage value of ENCRYPT_DECRYPT. To find the KeyUsage v */
  DestinationKeyId: string;
  /** Ciphertext of the data to reencrypt. This parameter is required in all cases except when DryRun is true and DryRunModifiers is set to IGNORE_CIPHERTEXT. */
  CiphertextBlob?: string;
  /** Specifies the encryption algorithm that KMS will use to reecrypt the data after it has decrypted it. The default value, SYMMETRIC_DEFAULT, represents the encryption algorithm used for symmetric encryp */
  DestinationEncryptionAlgorithm?: 'SYMMETRIC_DEFAULT' | 'RSAES_OAEP_SHA_1' | 'RSAES_OAEP_SHA_256' | 'SM2PKE';
  /** Specifies that encryption context to use when the reencrypting the data. Do not include confidential or sensitive information in this field. This field may be displayed in plaintext in CloudTrail logs */
  DestinationEncryptionContext?: Record<string, string>;
  /** Checks if your request will succeed. DryRun is an optional parameter. To learn more about how to use this parameter, see Testing your permissions in the Key Management Service Developer Guide. */
  DryRun?: boolean;
  /** Specifies the modifiers to apply to the dry run operation. DryRunModifiers is an optional parameter that only applies when DryRun is set to true. When set to IGNORE_CIPHERTEXT, KMS performs only autho */
  DryRunModifiers?: 'IGNORE_CIPHERTEXT'[];
  /** A list of grant tokens. Use a grant token when your permission to call this operation comes from a new grant that has not yet achieved eventual consistency. For more information, see Grant token and U */
  GrantTokens?: string[];
  /** Specifies the encryption algorithm that KMS will use to decrypt the ciphertext before it is reencrypted. The default value, SYMMETRIC_DEFAULT, represents the algorithm used for symmetric encryption KM */
  SourceEncryptionAlgorithm?: 'SYMMETRIC_DEFAULT' | 'RSAES_OAEP_SHA_1' | 'RSAES_OAEP_SHA_256' | 'SM2PKE';
  /** Specifies the encryption context to use to decrypt the ciphertext. Enter the same encryption context that was used to encrypt the ciphertext. An encryption context is a collection of non-secret key-va */
  SourceEncryptionContext?: Record<string, string>;
  /** Specifies the KMS key that KMS will use to decrypt the ciphertext before it is re-encrypted. Enter a key ID of the KMS key that was used to encrypt the ciphertext. If you identify a different KMS key, */
  SourceKeyId?: string;
}

export interface ReplicateKeyInput {
  /** Identifies the multi-Region primary key that is being replicated. To determine whether a KMS key is a multi-Region primary key, use the DescribeKey operation to check the value of the MultiRegionKeyTy */
  KeyId: string;
  /** The Region ID of the Amazon Web Services Region for this replica key. Enter the Region ID, such as us-east-1 or ap-southeast-2. For a list of Amazon Web Services Regions in which KMS is supported, see */
  ReplicaRegion: string;
  /** Skips ("bypasses") the key policy lockout safety check. The default value is false. Setting this value to true increases the risk that the KMS key becomes unmanageable. Do not set this value to true i */
  BypassPolicyLockoutSafetyCheck?: boolean;
  /** A description of the KMS key. The default value is an empty string (no description). Do not include confidential or sensitive information in this field. This field may be displayed in plaintext in Clo */
  Description?: string;
  /** The key policy to attach to the KMS key. This parameter is optional. If you do not provide a key policy, KMS attaches the default key policy to the KMS key. The key policy is not a shared property of  */
  Policy?: string;
  /** Assigns one or more tags to the replica key. Use this parameter to tag the KMS key when it is created. To tag an existing KMS key, use the TagResource operation. Do not include confidential or sensiti */
  Tags?: Tag[];
}

export interface RetireGrantInput {
  /** Checks if your request will succeed. DryRun is an optional parameter. To learn more about how to use this parameter, see Testing your permissions in the Key Management Service Developer Guide. */
  DryRun?: boolean;
  /** Identifies the grant to retire. To get the grant ID, use CreateGrant, ListGrants, or ListRetirableGrants. Grant ID Example - 0123456789012345678901234567890123456789012345678901234567890123 */
  GrantId?: string;
  /** Identifies the grant to be retired. You can use a grant token to identify a new grant even before it has achieved eventual consistency. Only the CreateGrant operation returns a grant token. For detail */
  GrantToken?: string;
  /** The key ARN KMS key associated with the grant. To find the key ARN, use the ListKeys operation. For example: arn:aws:kms:us-east-2:444455556666:key/1234abcd-12ab-34cd-56ef-1234567890ab */
  KeyId?: string;
}

export interface RevokeGrantInput {
  /** Identifies the grant to revoke. To get the grant ID, use CreateGrant, ListGrants, or ListRetirableGrants. */
  GrantId: string;
  /** A unique identifier for the KMS key associated with the grant. To get the key ID and key ARN for a KMS key, use ListKeys or DescribeKey. Specify the key ID or key ARN of the KMS key. To specify a KMS  */
  KeyId: string;
  /** Checks if your request will succeed. DryRun is an optional parameter. To learn more about how to use this parameter, see Testing your permissions in the Key Management Service Developer Guide. */
  DryRun?: boolean;
}

export interface RotateKeyOnDemandInput {
  /** Identifies a symmetric encryption KMS key. You cannot perform on-demand rotation of asymmetric KMS keys, HMAC KMS keys, multi-Region KMS keys with imported key material, or KMS keys in a custom key st */
  KeyId: string;
}

export interface ScheduleKeyDeletionInput {
  /** The unique identifier of the KMS key to delete. Specify the key ID or key ARN of the KMS key. For example: Key ID: 1234abcd-12ab-34cd-56ef-1234567890ab Key ARN: arn:aws:kms:us-east-2:111122223333:key/ */
  KeyId: string;
  /** The waiting period, specified in number of days. After the waiting period ends, KMS deletes the KMS key. If the KMS key is a multi-Region primary key with replica keys, the waiting period begins when  */
  PendingWindowInDays?: number;
}

export interface SignInput {
  /** Identifies an asymmetric KMS key. KMS uses the private key in the asymmetric KMS key to sign the message. The KeyUsage type of the KMS key must be SIGN_VERIFY. To find the KeyUsage of a KMS key, use t */
  KeyId: string;
  /** Specifies the message or message digest to sign. Messages can be 0-4096 bytes. To sign a larger message, provide a message digest. If you provide a message digest, use the DIGEST value of MessageType  */
  Message: string;
  /** Specifies the signing algorithm to use when signing the message. Choose an algorithm that is compatible with the type and size of the specified asymmetric KMS key. When signing with RSA key pairs, RSA */
  SigningAlgorithm: 'RSASSA_PSS_SHA_256' | 'RSASSA_PSS_SHA_384' | 'RSASSA_PSS_SHA_512' | 'RSASSA_PKCS1_V1_5_SHA_256' | 'RSASSA_PKCS1_V1_5_SHA_384' | 'RSASSA_PKCS1_V1_5_SHA_512' | 'ECDSA_SHA_256' | 'ECDSA_SHA_384' | 'ECDSA_SHA_512' | 'SM2DSA' | 'ML_DSA_SHAKE_256' | 'ED25519_SHA_512' | 'ED25519_PH_SHA_512';
  /** Checks if your request will succeed. DryRun is an optional parameter. To learn more about how to use this parameter, see Testing your permissions in the Key Management Service Developer Guide. */
  DryRun?: boolean;
  /** A list of grant tokens. Use a grant token when your permission to call this operation comes from a new grant that has not yet achieved eventual consistency. For more information, see Grant token and U */
  GrantTokens?: string[];
  /** Tells KMS whether the value of the Message parameter should be hashed as part of the signing algorithm. Use RAW for unhashed messages; use DIGEST for message digests, which are already hashed; use EXT */
  MessageType?: 'RAW' | 'DIGEST' | 'EXTERNAL_MU';
}

export interface TagResourceInput {
  /** Identifies a customer managed key in the account and Region. Specify the key ID or key ARN of the KMS key. For example: Key ID: 1234abcd-12ab-34cd-56ef-1234567890ab Key ARN: arn:aws:kms:us-east-2:1111 */
  KeyId: string;
  /** One or more tags. Each tag consists of a tag key and a tag value. The tag value can be an empty (null) string. Do not include confidential or sensitive information in this field. This field may be dis */
  Tags: Tag[];
}

export interface UntagResourceInput {
  /** Identifies the KMS key from which you are removing tags. Specify the key ID or key ARN of the KMS key. For example: Key ID: 1234abcd-12ab-34cd-56ef-1234567890ab Key ARN: arn:aws:kms:us-east-2:11112222 */
  KeyId: string;
  /** One or more tag keys. Specify only the tag keys, not the tag values. */
  TagKeys: string[];
}

export interface UpdateAliasInput {
  /** Identifies the alias that is changing its KMS key. This value must begin with alias/ followed by the alias name, such as alias/ExampleAlias. You cannot use UpdateAlias to change the alias name. Do not */
  AliasName: string;
  /** Identifies the customer managed key to associate with the alias. You don't have permission to associate an alias with an Amazon Web Services managed key. The KMS key must be in the same Amazon Web Ser */
  TargetKeyId: string;
}

export interface UpdateCustomKeyStoreInput {
  /** Identifies the custom key store that you want to update. Enter the ID of the custom key store. To find the ID of a custom key store, use the DescribeCustomKeyStores operation. */
  CustomKeyStoreId: string;
  /** Associates the custom key store with a related CloudHSM cluster. This parameter is valid only for custom key stores with a CustomKeyStoreType of AWS_CLOUDHSM. Enter the cluster ID of the cluster that  */
  CloudHsmClusterId?: string;
  /** Enter the current password of the kmsuser crypto user (CU) in the CloudHSM cluster that is associated with the custom key store. This parameter is valid only for custom key stores with a CustomKeyStor */
  KeyStorePassword?: string;
  /** Changes the friendly name of the custom key store to the value that you specify. The custom key store name must be unique in the Amazon Web Services account. Do not include confidential or sensitive i */
  NewCustomKeyStoreName?: string;
  /** Changes the credentials that KMS uses to sign requests to the external key store proxy (XKS proxy). This parameter is valid only for custom key stores with a CustomKeyStoreType of EXTERNAL_KEY_STORE.  */
  XksProxyAuthenticationCredential?: XksProxyAuthenticationCredentialType;
  /** Changes the connectivity setting for the external key store. To indicate that the external key store proxy uses a Amazon VPC endpoint service to communicate with KMS, specify VPC_ENDPOINT_SERVICE. Oth */
  XksProxyConnectivity?: 'PUBLIC_ENDPOINT' | 'VPC_ENDPOINT_SERVICE';
  /** Changes the URI endpoint that KMS uses to connect to your external key store proxy (XKS proxy). This parameter is valid only for custom key stores with a CustomKeyStoreType of EXTERNAL_KEY_STORE. For  */
  XksProxyUriEndpoint?: string;
  /** Changes the base path to the proxy APIs for this external key store. To find this value, see the documentation for your external key manager and external key store proxy (XKS proxy). This parameter is */
  XksProxyUriPath?: string;
  /** Changes the name that KMS uses to identify the Amazon VPC endpoint service for your external key store proxy (XKS proxy). This parameter is valid when the CustomKeyStoreType is EXTERNAL_KEY_STORE and  */
  XksProxyVpcEndpointServiceName?: string;
  /** Changes the Amazon Web Services account ID that KMS uses to identify the Amazon VPC endpoint service for your external key store proxy (XKS proxy). This parameter is optional. If not specified, the cu */
  XksProxyVpcEndpointServiceOwner?: string;
}

export interface UpdateKeyDescriptionInput {
  /** New description for the KMS key. Do not include confidential or sensitive information in this field. This field may be displayed in plaintext in CloudTrail logs and other output. */
  Description: string;
  /** Updates the description of the specified KMS key. Specify the key ID or key ARN of the KMS key. For example: Key ID: 1234abcd-12ab-34cd-56ef-1234567890ab Key ARN: arn:aws:kms:us-east-2:111122223333:ke */
  KeyId: string;
}

export interface UpdatePrimaryRegionInput {
  /** Identifies the current primary key. When the operation completes, this KMS key will be a replica key. Specify the key ID or key ARN of a multi-Region primary key. For example: Key ID: mrk-1234abcd12ab */
  KeyId: string;
  /** The Amazon Web Services Region of the new primary key. Enter the Region ID, such as us-east-1 or ap-southeast-2. There must be an existing replica key in this Region. When the operation completes, the */
  PrimaryRegion: string;
}

export interface VerifyInput {
  /** Identifies the asymmetric KMS key that will be used to verify the signature. This must be the same KMS key that was used to generate the signature. If you specify a different KMS key, the signature ve */
  KeyId: string;
  /** Specifies the message that was signed. You can submit a raw message of up to 4096 bytes, or a hash digest of the message. If you submit a digest, use the MessageType parameter with a value of DIGEST.  */
  Message: string;
  /** The signature that the Sign operation generated. */
  Signature: string;
  /** The signing algorithm that was used to sign the message. If you submit a different algorithm, the signature verification fails. */
  SigningAlgorithm: 'RSASSA_PSS_SHA_256' | 'RSASSA_PSS_SHA_384' | 'RSASSA_PSS_SHA_512' | 'RSASSA_PKCS1_V1_5_SHA_256' | 'RSASSA_PKCS1_V1_5_SHA_384' | 'RSASSA_PKCS1_V1_5_SHA_512' | 'ECDSA_SHA_256' | 'ECDSA_SHA_384' | 'ECDSA_SHA_512' | 'SM2DSA' | 'ML_DSA_SHAKE_256' | 'ED25519_SHA_512' | 'ED25519_PH_SHA_512';
  /** Checks if your request will succeed. DryRun is an optional parameter. To learn more about how to use this parameter, see Testing your permissions in the Key Management Service Developer Guide. */
  DryRun?: boolean;
  /** A list of grant tokens. Use a grant token when your permission to call this operation comes from a new grant that has not yet achieved eventual consistency. For more information, see Grant token and U */
  GrantTokens?: string[];
  /** Tells KMS whether the value of the Message parameter should be hashed as part of the signing algorithm. Use RAW for unhashed messages; use DIGEST for message digests, which are already hashed; use EXT */
  MessageType?: 'RAW' | 'DIGEST' | 'EXTERNAL_MU';
}

export interface VerifyMacInput {
  /** The KMS key that will be used in the verification. Enter a key ID of the KMS key that was used to generate the HMAC. If you identify a different KMS key, the VerifyMac operation fails. */
  KeyId: string;
  /** The HMAC to verify. Enter the HMAC that was generated by the GenerateMac operation when you specified the same message, HMAC KMS key, and MAC algorithm as the values specified in this request. */
  Mac: string;
  /** The MAC algorithm that will be used in the verification. Enter the same MAC algorithm that was used to compute the HMAC. This algorithm must be supported by the HMAC KMS key identified by the KeyId pa */
  MacAlgorithm: 'HMAC_SHA_224' | 'HMAC_SHA_256' | 'HMAC_SHA_384' | 'HMAC_SHA_512';
  /** The message that will be used in the verification. Enter the same message that was used to generate the HMAC. GenerateMac and VerifyMac do not provide special handling for message digests. If you gene */
  Message: string;
  /** Checks if your request will succeed. DryRun is an optional parameter. To learn more about how to use this parameter, see Testing your permissions in the Key Management Service Developer Guide. */
  DryRun?: boolean;
  /** A list of grant tokens. Use a grant token when your permission to call this operation comes from a new grant that has not yet achieved eventual consistency. For more information, see Grant token and U */
  GrantTokens?: string[];
}

/** KMS service binding for Step Functions SDK integrations. */
export class KMS {
  constructor() {}

  cancelKeyDeletion<T>(params: CancelKeyDeletionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  connectCustomKeyStore<T>(params: ConnectCustomKeyStoreInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createAlias<T>(params: CreateAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createCustomKeyStore<T>(params: CreateCustomKeyStoreInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createGrant<T>(params: CreateGrantInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createKey<T>(params: CreateKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  decrypt<T>(params: DecryptInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteAlias<T>(params: DeleteAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteCustomKeyStore<T>(params: DeleteCustomKeyStoreInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteImportedKeyMaterial<T>(params: DeleteImportedKeyMaterialInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deriveSharedSecret<T>(params: DeriveSharedSecretInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeCustomKeyStores<T>(params: DescribeCustomKeyStoresInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeKey<T>(params: DescribeKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableKey<T>(params: DisableKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disableKeyRotation<T>(params: DisableKeyRotationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  disconnectCustomKeyStore<T>(params: DisconnectCustomKeyStoreInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableKey<T>(params: EnableKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  enableKeyRotation<T>(params: EnableKeyRotationInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  encrypt<T>(params: EncryptInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  generateDataKey<T>(params: GenerateDataKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  generateDataKeyPair<T>(params: GenerateDataKeyPairInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  generateDataKeyPairWithoutPlaintext<T>(params: GenerateDataKeyPairWithoutPlaintextInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  generateDataKeyWithoutPlaintext<T>(params: GenerateDataKeyWithoutPlaintextInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  generateMac<T>(params: GenerateMacInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  generateRandom<T>(params: GenerateRandomInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getKeyPolicy<T>(params: GetKeyPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getKeyRotationStatus<T>(params: GetKeyRotationStatusInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getParametersForImport<T>(params: GetParametersForImportInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getPublicKey<T>(params: GetPublicKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  importKeyMaterial<T>(params: ImportKeyMaterialInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listAliases<T>(params: ListAliasesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listGrants<T>(params: ListGrantsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listKeyPolicies<T>(params: ListKeyPoliciesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listKeyRotations<T>(params: ListKeyRotationsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listKeys<T>(params: ListKeysInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listResourceTags<T>(params: ListResourceTagsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listRetirableGrants<T>(params: ListRetirableGrantsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putKeyPolicy<T>(params: PutKeyPolicyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  reEncrypt<T>(params: ReEncryptInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  replicateKey<T>(params: ReplicateKeyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  retireGrant<T>(params: RetireGrantInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  revokeGrant<T>(params: RevokeGrantInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  rotateKeyOnDemand<T>(params: RotateKeyOnDemandInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  scheduleKeyDeletion<T>(params: ScheduleKeyDeletionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  sign<T>(params: SignInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateAlias<T>(params: UpdateAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateCustomKeyStore<T>(params: UpdateCustomKeyStoreInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateKeyDescription<T>(params: UpdateKeyDescriptionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updatePrimaryRegion<T>(params: UpdatePrimaryRegionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  verify<T>(params: VerifyInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  verifyMac<T>(params: VerifyMacInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
