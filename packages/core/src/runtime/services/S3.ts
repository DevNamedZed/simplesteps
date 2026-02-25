// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for S3 operations. */
export interface S3Options {
  retry?: RetryPolicy;
  timeoutSeconds?: number;
  heartbeatSeconds?: number;
}

export interface GetObjectInput {
  /** Key of the object to get. */
  Key: string;
  /** To retrieve the checksum, this mode must be enabled. */
  ChecksumMode?: 'ENABLED';
  /** The account ID of the expected bucket owner. If the account ID that you provide does not match the actual owner of the bucket, the request fails with the HTTP status code 403 Forbidden (access denied) */
  ExpectedBucketOwner?: string;
  /** Return the object only if its entity tag (ETag) is the same as the one specified in this header; otherwise, return a 412 Precondition Failed error. If both of the If-Match and If-Unmodified-Since head */
  IfMatch?: string;
  /** Return the object only if it has been modified since the specified time; otherwise, return a 304 Not Modified error. If both of the If-None-Match and If-Modified-Since headers are present in the reque */
  IfModifiedSince?: string;
  /** Return the object only if its entity tag (ETag) is different from the one specified in this header; otherwise, return a 304 Not Modified error. If both of the If-None-Match and If-Modified-Since heade */
  IfNoneMatch?: string;
  /** Return the object only if it has not been modified since the specified time; otherwise, return a 412 Precondition Failed error. If both of the If-Match and If-Unmodified-Since headers are present in t */
  IfUnmodifiedSince?: string;
  /** Part number of the object being read. This is a positive integer between 1 and 10,000. Effectively performs a 'ranged' GET request for the part specified. Useful for downloading just a part of an obje */
  PartNumber?: number;
  /** Downloads the specified byte range of an object. For more information about the HTTP Range header, see https://www.rfc-editor.org/rfc/rfc9110.html#name-range. Amazon S3 doesn't support retrieving mult */
  Range?: string;
  RequestPayer?: 'requester';
  /** Sets the Cache-Control header of the response. */
  ResponseCacheControl?: string;
  /** Sets the Content-Disposition header of the response. */
  ResponseContentDisposition?: string;
  /** Sets the Content-Encoding header of the response. */
  ResponseContentEncoding?: string;
  /** Sets the Content-Language header of the response. */
  ResponseContentLanguage?: string;
  /** Sets the Content-Type header of the response. */
  ResponseContentType?: string;
  /** Sets the Expires header of the response. */
  ResponseExpires?: string;
  /** Specifies the algorithm to use when decrypting the object (for example, AES256). If you encrypt an object by using server-side encryption with customer-provided encryption keys (SSE-C) when you store  */
  SSECustomerAlgorithm?: string;
  /** Specifies the customer-provided encryption key that you originally provided for Amazon S3 to encrypt the data before storing it. This value is used to decrypt the object when recovering it and must ma */
  SSECustomerKey?: string;
  /** Specifies the 128-bit MD5 digest of the customer-provided encryption key according to RFC 1321. Amazon S3 uses this header for a message integrity check to ensure that the encryption key was transmitt */
  SSECustomerKeyMD5?: string;
  /** Version ID used to reference a specific version of the object. By default, the GetObject operation returns the current version of an object. To return a different version, use the versionId subresourc */
  VersionId?: string;
}

export interface PutObjectInput {
  /** Object key for which the PUT action was initiated. */
  Key: string;
  /** The canned ACL to apply to the object. For more information, see Canned ACL in the Amazon S3 User Guide. When adding a new object, you can use headers to grant ACL-based permissions to individual Amaz */
  ACL?: 'private' | 'public-read' | 'public-read-write' | 'authenticated-read' | 'aws-exec-read' | 'bucket-owner-read' | 'bucket-owner-full-control';
  /** Object data. */
  Body?: string;
  /** Specifies whether Amazon S3 should use an S3 Bucket Key for object encryption with server-side encryption using Key Management Service (KMS) keys (SSE-KMS). General purpose buckets - Setting this head */
  BucketKeyEnabled?: boolean;
  /** Can be used to specify caching behavior along the request/reply chain. For more information, see http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9. */
  CacheControl?: string;
  /** Indicates the algorithm used to create the checksum for the object when you use the SDK. This header will not provide any additional functionality if you don't use the SDK. When you send this header,  */
  ChecksumAlgorithm?: 'CRC32' | 'CRC32C' | 'SHA1' | 'SHA256' | 'CRC64NVME';
  /** This header can be used as a data integrity check to verify that the data received is the same data that was originally sent. This header specifies the Base64 encoded, 32-bit CRC32 checksum of the obj */
  ChecksumCRC32?: string;
  /** This header can be used as a data integrity check to verify that the data received is the same data that was originally sent. This header specifies the Base64 encoded, 32-bit CRC32C checksum of the ob */
  ChecksumCRC32C?: string;
  /** This header can be used as a data integrity check to verify that the data received is the same data that was originally sent. This header specifies the Base64 encoded, 64-bit CRC64NVME checksum of the */
  ChecksumCRC64NVME?: string;
  /** This header can be used as a data integrity check to verify that the data received is the same data that was originally sent. This header specifies the Base64 encoded, 160-bit SHA1 digest of the objec */
  ChecksumSHA1?: string;
  /** This header can be used as a data integrity check to verify that the data received is the same data that was originally sent. This header specifies the Base64 encoded, 256-bit SHA256 digest of the obj */
  ChecksumSHA256?: string;
  /** Specifies presentational information for the object. For more information, see https://www.rfc-editor.org/rfc/rfc6266#section-4. */
  ContentDisposition?: string;
  /** Specifies what content encodings have been applied to the object and thus what decoding mechanisms must be applied to obtain the media-type referenced by the Content-Type header field. For more inform */
  ContentEncoding?: string;
  /** The language the content is in. */
  ContentLanguage?: string;
  /** Size of the body in bytes. This parameter is useful when the size of the body cannot be determined automatically. For more information, see https://www.rfc-editor.org/rfc/rfc9110.html#name-content-len */
  ContentLength?: number;
  /** The Base64 encoded 128-bit MD5 digest of the message (without the headers) according to RFC 1864. This header can be used as a message integrity check to verify that the data is the same data that was */
  ContentMD5?: string;
  /** A standard MIME type describing the format of the contents. For more information, see https://www.rfc-editor.org/rfc/rfc9110.html#name-content-type. */
  ContentType?: string;
  /** The account ID of the expected bucket owner. If the account ID that you provide does not match the actual owner of the bucket, the request fails with the HTTP status code 403 Forbidden (access denied) */
  ExpectedBucketOwner?: string;
  /** The date and time at which the object is no longer cacheable. For more information, see https://www.rfc-editor.org/rfc/rfc7234#section-5.3. */
  Expires?: string;
  /** Gives the grantee READ, READ_ACP, and WRITE_ACP permissions on the object. This functionality is not supported for directory buckets. This functionality is not supported for Amazon S3 on Outposts. */
  GrantFullControl?: string;
  /** Allows grantee to read the object data and its metadata. This functionality is not supported for directory buckets. This functionality is not supported for Amazon S3 on Outposts. */
  GrantRead?: string;
  /** Allows grantee to read the object ACL. This functionality is not supported for directory buckets. This functionality is not supported for Amazon S3 on Outposts. */
  GrantReadACP?: string;
  /** Allows grantee to write the ACL for the applicable object. This functionality is not supported for directory buckets. This functionality is not supported for Amazon S3 on Outposts. */
  GrantWriteACP?: string;
  /** Uploads the object only if the ETag (entity tag) value provided during the WRITE operation matches the ETag of the object in S3. If the ETag values do not match, the operation returns a 412 Preconditi */
  IfMatch?: string;
  /** Uploads the object only if the object key name does not already exist in the bucket specified. Otherwise, Amazon S3 returns a 412 Precondition Failed error. If a conflicting operation occurs during th */
  IfNoneMatch?: string;
  /** A map of metadata to store with the object in S3. */
  Metadata?: Record<string, string>;
  /** Specifies whether a legal hold will be applied to this object. For more information about S3 Object Lock, see Object Lock in the Amazon S3 User Guide. This functionality is not supported for directory */
  ObjectLockLegalHoldStatus?: 'ON' | 'OFF';
  /** The Object Lock mode that you want to apply to this object. This functionality is not supported for directory buckets. */
  ObjectLockMode?: 'GOVERNANCE' | 'COMPLIANCE';
  /** The date and time when you want this object's Object Lock to expire. Must be formatted as a timestamp parameter. This functionality is not supported for directory buckets. */
  ObjectLockRetainUntilDate?: string;
  RequestPayer?: 'requester';
  /** The server-side encryption algorithm that was used when you store this object in Amazon S3 or Amazon FSx. General purpose buckets - You have four mutually exclusive options to protect data using serve */
  ServerSideEncryption?: 'AES256' | 'aws:fsx' | 'aws:kms' | 'aws:kms:dsse';
  /** Specifies the algorithm to use when encrypting the object (for example, AES256). This functionality is not supported for directory buckets. */
  SSECustomerAlgorithm?: string;
  /** Specifies the customer-provided encryption key for Amazon S3 to use in encrypting data. This value is used to store the object and then it is discarded; Amazon S3 does not store the encryption key. Th */
  SSECustomerKey?: string;
  /** Specifies the 128-bit MD5 digest of the encryption key according to RFC 1321. Amazon S3 uses this header for a message integrity check to ensure that the encryption key was transmitted without error.  */
  SSECustomerKeyMD5?: string;
  /** Specifies the Amazon Web Services KMS Encryption Context as an additional encryption context to use for object encryption. The value of this header is a Base64 encoded string of a UTF-8 encoded JSON,  */
  SSEKMSEncryptionContext?: string;
  /** Specifies the KMS key ID (Key ID, Key ARN, or Key Alias) to use for object encryption. If the KMS key doesn't exist in the same account that's issuing the command, you must use the full Key ARN not th */
  SSEKMSKeyId?: string;
  /** By default, Amazon S3 uses the STANDARD Storage Class to store newly created objects. The STANDARD storage class provides high durability and high availability. Depending on performance needs, you can */
  StorageClass?: 'STANDARD' | 'REDUCED_REDUNDANCY' | 'STANDARD_IA' | 'ONEZONE_IA' | 'INTELLIGENT_TIERING' | 'GLACIER' | 'DEEP_ARCHIVE' | 'OUTPOSTS' | 'GLACIER_IR' | 'SNOW' | 'EXPRESS_ONEZONE' | 'FSX_OPENZFS' | 'FSX_ONTAP';
  /** The tag-set for the object. The tag-set must be encoded as URL Query parameters. (For example, "Key1=Value1") This functionality is not supported for directory buckets. */
  Tagging?: string;
  /** If the bucket is configured as a website, redirects requests for this object to another object in the same bucket or to an external URL. Amazon S3 stores the value of this header in the object metadat */
  WebsiteRedirectLocation?: string;
  /** Specifies the offset for appending data to existing objects in bytes. The offset must be equal to the size of the existing object being appended to. If no object exists, setting this header to 0 will  */
  WriteOffsetBytes?: number;
}

export interface DeleteObjectInput {
  /** Key name of the object to delete. */
  Key: string;
  /** Indicates whether S3 Object Lock should bypass Governance-mode restrictions to process this operation. To use this header, you must have the s3:BypassGovernanceRetention permission. This functionality */
  BypassGovernanceRetention?: boolean;
  /** The account ID of the expected bucket owner. If the account ID that you provide does not match the actual owner of the bucket, the request fails with the HTTP status code 403 Forbidden (access denied) */
  ExpectedBucketOwner?: string;
  /** Deletes the object if the ETag (entity tag) value provided during the delete operation matches the ETag of the object in S3. If the ETag values do not match, the operation returns a 412 Precondition F */
  IfMatch?: string;
  /** If present, the object is deleted only if its modification times matches the provided Timestamp. If the Timestamp values do not match, the operation returns a 412 Precondition Failed error. If the Tim */
  IfMatchLastModifiedTime?: string;
  /** If present, the object is deleted only if its size matches the provided size in bytes. If the Size value does not match, the operation returns a 412 Precondition Failed error. If the Size matches or i */
  IfMatchSize?: number;
  /** The concatenation of the authentication device's serial number, a space, and the value that is displayed on your authentication device. Required to permanently delete a versioned object if versioning  */
  MFA?: string;
  RequestPayer?: 'requester';
  /** Version ID used to reference a specific version of the object. For directory buckets in this API operation, only the null value of the version ID is supported. */
  VersionId?: string;
}

export interface CopyObjectInput {
  /** Specifies the source object for the copy operation. The source object can be up to 5 GB. If the source object is an object that was uploaded by using a multipart upload, the object copy will be a sing */
  CopySource: string;
  /** The key of the destination object. */
  Key: string;
  /** The canned access control list (ACL) to apply to the object. When you copy an object, the ACL metadata is not preserved and is set to private by default. Only the owner has full access control. To ove */
  ACL?: 'private' | 'public-read' | 'public-read-write' | 'authenticated-read' | 'aws-exec-read' | 'bucket-owner-read' | 'bucket-owner-full-control';
  /** Specifies whether Amazon S3 should use an S3 Bucket Key for object encryption with server-side encryption using Key Management Service (KMS) keys (SSE-KMS). If a target object uses SSE-KMS, you can en */
  BucketKeyEnabled?: boolean;
  /** Specifies the caching behavior along the request/reply chain. */
  CacheControl?: string;
  /** Indicates the algorithm that you want Amazon S3 to use to create the checksum for the object. For more information, see Checking object integrity in the Amazon S3 User Guide. When you copy an object,  */
  ChecksumAlgorithm?: 'CRC32' | 'CRC32C' | 'SHA1' | 'SHA256' | 'CRC64NVME';
  /** Specifies presentational information for the object. Indicates whether an object should be displayed in a web browser or downloaded as a file. It allows specifying the desired filename for the downloa */
  ContentDisposition?: string;
  /** Specifies what content encodings have been applied to the object and thus what decoding mechanisms must be applied to obtain the media-type referenced by the Content-Type header field. For directory b */
  ContentEncoding?: string;
  /** The language the content is in. */
  ContentLanguage?: string;
  /** A standard MIME type that describes the format of the object data. */
  ContentType?: string;
  /** Copies the object if its entity tag (ETag) matches the specified tag. If both the x-amz-copy-source-if-match and x-amz-copy-source-if-unmodified-since headers are present in the request and evaluate a */
  CopySourceIfMatch?: string;
  /** Copies the object if it has been modified since the specified time. If both the x-amz-copy-source-if-none-match and x-amz-copy-source-if-modified-since headers are present in the request and evaluate  */
  CopySourceIfModifiedSince?: string;
  /** Copies the object if its entity tag (ETag) is different than the specified ETag. If both the x-amz-copy-source-if-none-match and x-amz-copy-source-if-modified-since headers are present in the request  */
  CopySourceIfNoneMatch?: string;
  /** Copies the object if it hasn't been modified since the specified time. If both the x-amz-copy-source-if-match and x-amz-copy-source-if-unmodified-since headers are present in the request and evaluate  */
  CopySourceIfUnmodifiedSince?: string;
  /** Specifies the algorithm to use when decrypting the source object (for example, AES256). If the source object for the copy is stored in Amazon S3 using SSE-C, you must provide the necessary encryption  */
  CopySourceSSECustomerAlgorithm?: string;
  /** Specifies the customer-provided encryption key for Amazon S3 to use to decrypt the source object. The encryption key provided in this header must be the same one that was used when the source object w */
  CopySourceSSECustomerKey?: string;
  /** Specifies the 128-bit MD5 digest of the encryption key according to RFC 1321. Amazon S3 uses this header for a message integrity check to ensure that the encryption key was transmitted without error.  */
  CopySourceSSECustomerKeyMD5?: string;
  /** The account ID of the expected destination bucket owner. If the account ID that you provide does not match the actual owner of the destination bucket, the request fails with the HTTP status code 403 F */
  ExpectedBucketOwner?: string;
  /** The account ID of the expected source bucket owner. If the account ID that you provide does not match the actual owner of the source bucket, the request fails with the HTTP status code 403 Forbidden ( */
  ExpectedSourceBucketOwner?: string;
  /** The date and time at which the object is no longer cacheable. */
  Expires?: string;
  /** Gives the grantee READ, READ_ACP, and WRITE_ACP permissions on the object. This functionality is not supported for directory buckets. This functionality is not supported for Amazon S3 on Outposts. */
  GrantFullControl?: string;
  /** Allows grantee to read the object data and its metadata. This functionality is not supported for directory buckets. This functionality is not supported for Amazon S3 on Outposts. */
  GrantRead?: string;
  /** Allows grantee to read the object ACL. This functionality is not supported for directory buckets. This functionality is not supported for Amazon S3 on Outposts. */
  GrantReadACP?: string;
  /** Allows grantee to write the ACL for the applicable object. This functionality is not supported for directory buckets. This functionality is not supported for Amazon S3 on Outposts. */
  GrantWriteACP?: string;
  /** Copies the object if the entity tag (ETag) of the destination object matches the specified tag. If the ETag values do not match, the operation returns a 412 Precondition Failed error. If a concurrent  */
  IfMatch?: string;
  /** Copies the object only if the object key name at the destination does not already exist in the bucket specified. Otherwise, Amazon S3 returns a 412 Precondition Failed error. If a concurrent operation */
  IfNoneMatch?: string;
  /** A map of metadata to store with the object in S3. */
  Metadata?: Record<string, string>;
  /** Specifies whether the metadata is copied from the source object or replaced with metadata that's provided in the request. When copying an object, you can preserve all metadata (the default) or specify */
  MetadataDirective?: 'COPY' | 'REPLACE';
  /** Specifies whether you want to apply a legal hold to the object copy. This functionality is not supported for directory buckets. */
  ObjectLockLegalHoldStatus?: 'ON' | 'OFF';
  /** The Object Lock mode that you want to apply to the object copy. This functionality is not supported for directory buckets. */
  ObjectLockMode?: 'GOVERNANCE' | 'COMPLIANCE';
  /** The date and time when you want the Object Lock of the object copy to expire. This functionality is not supported for directory buckets. */
  ObjectLockRetainUntilDate?: string;
  RequestPayer?: 'requester';
  /** The server-side encryption algorithm used when storing this object in Amazon S3. Unrecognized or unsupported values won’t write a destination object and will receive a 400 Bad Request response. Amazon */
  ServerSideEncryption?: 'AES256' | 'aws:fsx' | 'aws:kms' | 'aws:kms:dsse';
  /** Specifies the algorithm to use when encrypting the object (for example, AES256). When you perform a CopyObject operation, if you want to use a different type of encryption setting for the target objec */
  SSECustomerAlgorithm?: string;
  /** Specifies the customer-provided encryption key for Amazon S3 to use in encrypting data. This value is used to store the object and then it is discarded. Amazon S3 does not store the encryption key. Th */
  SSECustomerKey?: string;
  /** Specifies the 128-bit MD5 digest of the encryption key according to RFC 1321. Amazon S3 uses this header for a message integrity check to ensure that the encryption key was transmitted without error.  */
  SSECustomerKeyMD5?: string;
  /** Specifies the Amazon Web Services KMS Encryption Context as an additional encryption context to use for the destination object encryption. The value of this header is a base64-encoded UTF-8 string hol */
  SSEKMSEncryptionContext?: string;
  /** Specifies the KMS key ID (Key ID, Key ARN, or Key Alias) to use for object encryption. All GET and PUT requests for an object protected by KMS will fail if they're not made via SSL or using SigV4. For */
  SSEKMSKeyId?: string;
  /** If the x-amz-storage-class header is not used, the copied object will be stored in the STANDARD Storage Class by default. The STANDARD storage class provides high durability and high availability. Dep */
  StorageClass?: 'STANDARD' | 'REDUCED_REDUNDANCY' | 'STANDARD_IA' | 'ONEZONE_IA' | 'INTELLIGENT_TIERING' | 'GLACIER' | 'DEEP_ARCHIVE' | 'OUTPOSTS' | 'GLACIER_IR' | 'SNOW' | 'EXPRESS_ONEZONE' | 'FSX_OPENZFS' | 'FSX_ONTAP';
  /** The tag-set for the object copy in the destination bucket. This value must be used in conjunction with the x-amz-tagging-directive if you choose REPLACE for the x-amz-tagging-directive. If you choose  */
  Tagging?: string;
  /** Specifies whether the object tag-set is copied from the source object or replaced with the tag-set that's provided in the request. The default value is COPY. Directory buckets - For directory buckets  */
  TaggingDirective?: 'COPY' | 'REPLACE';
  /** If the destination bucket is configured as a website, redirects requests for this object copy to another object in the same bucket or to an external URL. Amazon S3 stores the value of this header in t */
  WebsiteRedirectLocation?: string;
}

export interface HeadObjectInput {
  /** The object key. */
  Key: string;
  /** To retrieve the checksum, this parameter must be enabled. General purpose buckets - If you enable checksum mode and the object is uploaded with a checksum and encrypted with an Key Management Service  */
  ChecksumMode?: 'ENABLED';
  /** The account ID of the expected bucket owner. If the account ID that you provide does not match the actual owner of the bucket, the request fails with the HTTP status code 403 Forbidden (access denied) */
  ExpectedBucketOwner?: string;
  /** Return the object only if its entity tag (ETag) is the same as the one specified; otherwise, return a 412 (precondition failed) error. If both of the If-Match and If-Unmodified-Since headers are prese */
  IfMatch?: string;
  /** Return the object only if it has been modified since the specified time; otherwise, return a 304 (not modified) error. If both of the If-None-Match and If-Modified-Since headers are present in the req */
  IfModifiedSince?: string;
  /** Return the object only if its entity tag (ETag) is different from the one specified; otherwise, return a 304 (not modified) error. If both of the If-None-Match and If-Modified-Since headers are presen */
  IfNoneMatch?: string;
  /** Return the object only if it has not been modified since the specified time; otherwise, return a 412 (precondition failed) error. If both of the If-Match and If-Unmodified-Since headers are present in */
  IfUnmodifiedSince?: string;
  /** Part number of the object being read. This is a positive integer between 1 and 10,000. Effectively performs a 'ranged' HEAD request for the part specified. Useful querying about the size of the part a */
  PartNumber?: number;
  /** HeadObject returns only the metadata for an object. If the Range is satisfiable, only the ContentLength is affected in the response. If the Range is not satisfiable, S3 returns a 416 - Requested Range */
  Range?: string;
  RequestPayer?: 'requester';
  /** Sets the Cache-Control header of the response. */
  ResponseCacheControl?: string;
  /** Sets the Content-Disposition header of the response. */
  ResponseContentDisposition?: string;
  /** Sets the Content-Encoding header of the response. */
  ResponseContentEncoding?: string;
  /** Sets the Content-Language header of the response. */
  ResponseContentLanguage?: string;
  /** Sets the Content-Type header of the response. */
  ResponseContentType?: string;
  /** Sets the Expires header of the response. */
  ResponseExpires?: string;
  /** Specifies the algorithm to use when encrypting the object (for example, AES256). This functionality is not supported for directory buckets. */
  SSECustomerAlgorithm?: string;
  /** Specifies the customer-provided encryption key for Amazon S3 to use in encrypting data. This value is used to store the object and then it is discarded; Amazon S3 does not store the encryption key. Th */
  SSECustomerKey?: string;
  /** Specifies the 128-bit MD5 digest of the encryption key according to RFC 1321. Amazon S3 uses this header for a message integrity check to ensure that the encryption key was transmitted without error.  */
  SSECustomerKeyMD5?: string;
  /** Version ID used to reference a specific version of the object. For directory buckets in this API operation, only the null value of the version ID is supported. */
  VersionId?: string;
}

export interface ListObjectsInput {
  /** ContinuationToken indicates to Amazon S3 that the list is being continued on this bucket with a token. ContinuationToken is obfuscated and is not a real key. You can use this ContinuationToken for pag */
  ContinuationToken?: string;
  /** A delimiter is a character that you use to group keys. CommonPrefixes is filtered out from results if it is not lexicographically greater than the StartAfter value. Directory buckets - For directory b */
  Delimiter?: string;
  /** Encoding type used by Amazon S3 to encode the object keys in the response. Responses are encoded only in UTF-8. An object key can contain any Unicode character. However, the XML 1.0 parser can't parse */
  EncodingType?: 'url';
  /** The account ID of the expected bucket owner. If the account ID that you provide does not match the actual owner of the bucket, the request fails with the HTTP status code 403 Forbidden (access denied) */
  ExpectedBucketOwner?: string;
  /** The owner field is not present in ListObjectsV2 by default. If you want to return the owner field with each key in the result, then set the FetchOwner field to true. Directory buckets - For directory  */
  FetchOwner?: boolean;
  /** Sets the maximum number of keys returned in the response. By default, the action returns up to 1,000 key names. The response might contain fewer keys but will never contain more. */
  MaxKeys?: number;
  /** Specifies the optional fields that you want returned in the response. Fields that you do not specify are not returned. This functionality is not supported for directory buckets. */
  OptionalObjectAttributes?: 'RestoreStatus'[];
  /** Limits the response to keys that begin with the specified prefix. Directory buckets - For directory buckets, only prefixes that end in a delimiter (/) are supported. */
  Prefix?: string;
  /** Confirms that the requester knows that she or he will be charged for the list objects request in V2 style. Bucket owners need not specify this parameter in their requests. This functionality is not su */
  RequestPayer?: 'requester';
  /** StartAfter is where you want Amazon S3 to start listing from. Amazon S3 starts listing after this specified key. StartAfter can be any key in the bucket. This functionality is not supported for direct */
  StartAfter?: string;
}

/** S3 bucket binding for the SimpleSteps compiler. */
export class S3 {
  constructor(bucketName: string) {}

  getObject<T>(params: GetObjectInput, options?: S3Options): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putObject(params: PutObjectInput, options?: S3Options): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  deleteObject(params: DeleteObjectInput, options?: S3Options): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  copyObject(params: CopyObjectInput, options?: S3Options): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  headObject<T>(params: HeadObjectInput, options?: S3Options): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listObjects<T>(params: ListObjectsInput, options?: S3Options): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
