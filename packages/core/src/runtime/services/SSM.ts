// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for SSM operations. */
export interface SSMOptions {
  retry?: RetryPolicy;
  timeoutSeconds?: number;
  heartbeatSeconds?: number;
}

export interface Tag {
  /** The name of the tag. */
  Key: string;
  /** The value of the tag. */
  Value: string;
}

export interface ParameterStringFilter {
  /** The name of the filter. The ParameterStringFilter object is used by the DescribeParameters and GetParametersByPath API operations. However, not all of the pattern values listed for Key can be used wit */
  Key: string;
  /** For all filters used with DescribeParameters, valid options include Equals and BeginsWith. The Name filter additionally supports the Contains option. (Exception: For filters using the key Path, valid  */
  Option?: string;
  /** The value you want to search for. */
  Values?: any[];
}

export interface GetParameterInput {
  /** The name or Amazon Resource Name (ARN) of the parameter that you want to query. For parameters shared with you from another account, you must use the full ARN. To query by parameter label, use "Name": */
  Name: string;
  /** Return decrypted values for secure string parameters. This flag is ignored for String and StringList parameter types. */
  WithDecryption?: boolean;
}

export interface PutParameterInput {
  /** The fully qualified name of the parameter that you want to create or update. You can't enter the Amazon Resource Name (ARN) for a parameter, only the parameter name itself. The fully qualified name in */
  Name: string;
  /** The parameter value that you want to add to the system. Standard parameters have a value limit of 4 KB. Advanced parameters have a value limit of 8 KB. Parameters can't be referenced or nested in the  */
  Value: string;
  /** A regular expression used to validate the parameter value. For example, for String types with values restricted to numbers, you can specify the following: AllowedPattern=^\d+$ */
  AllowedPattern?: string;
  /** The data type for a String parameter. Supported data types include plain text and Amazon Machine Image (AMI) IDs. The following data type values are supported. text aws:ec2:image aws:ssm:integration W */
  DataType?: string;
  /** Information about the parameter that you want to add to the system. Optional but recommended. Don't enter personally identifiable information in this field. */
  Description?: string;
  /** The Key Management Service (KMS) ID that you want to use to encrypt a parameter. Use a custom key for better security. Required for parameters that use the SecureString data type. If you don't specify */
  KeyId?: string;
  /** Overwrite an existing parameter. The default value is false. */
  Overwrite?: boolean;
  /** One or more policies to apply to a parameter. This operation takes a JSON array. Parameter Store, a tool in Amazon Web Services Systems Manager supports the following policy types: Expiration: This po */
  Policies?: string;
  /** Optional metadata that you assign to a resource. Tags enable you to categorize a resource in different ways, such as by purpose, owner, or environment. For example, you might want to tag a Systems Man */
  Tags?: Tag[];
  /** The parameter tier to assign to a parameter. Parameter Store offers a standard tier and an advanced tier for parameters. Standard parameters have a content size limit of 4 KB and can't be configured t */
  Tier?: 'Standard' | 'Advanced' | 'Intelligent-Tiering';
  /** The type of parameter that you want to create. SecureString isn't currently supported for CloudFormation templates. Items in a StringList must be separated by a comma (,). You can't use other punctuat */
  Type?: 'String' | 'StringList' | 'SecureString';
}

export interface GetParametersInput {
  /** The names or Amazon Resource Names (ARNs) of the parameters that you want to query. For parameters shared with you from another account, you must use the full ARNs. To query by parameter label, use "N */
  Names: string[];
  /** Return decrypted secure string value. Return decrypted values for secure string parameters. This flag is ignored for String and StringList parameter types. */
  WithDecryption?: boolean;
}

export interface GetParametersByPathInput {
  /** The hierarchy for the parameter. Hierarchies start with a forward slash (/). The hierarchy is the parameter name except the last part of the parameter. For the API call to succeed, the last part of th */
  Path: string;
  /** The maximum number of items to return for this call. The call also returns a token that you can specify in a subsequent call to get the next set of results. */
  MaxResults?: number;
  /** A token to start the list. Use this token to get the next set of results. */
  NextToken?: string;
  /** Filters to limit the request results. The following Key values are supported for GetParametersByPath: Type, KeyId, and Label. The following Key values aren't supported for GetParametersByPath: tag, Da */
  ParameterFilters?: ParameterStringFilter[];
  /** Retrieve all parameters within a hierarchy. If a user has access to a path, then the user can access all levels of that path. For example, if a user has permission to access path /a, then the user can */
  Recursive?: boolean;
  /** Retrieve all parameters in a hierarchy with their value decrypted. */
  WithDecryption?: boolean;
}

export interface DeleteParameterInput {
  /** The name of the parameter to delete. You can't enter the Amazon Resource Name (ARN) for a parameter, only the parameter name itself. */
  Name: string;
}

/** SSM Parameter Store binding for the SimpleSteps compiler. */
export class SSM {
  constructor() {}

  getParameter<T>(params: GetParameterInput, options?: SSMOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putParameter(params: PutParameterInput, options?: SSMOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  getParameters<T>(params: GetParametersInput, options?: SSMOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getParametersByPath<T>(params: GetParametersByPathInput, options?: SSMOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteParameter(params: DeleteParameterInput, options?: SSMOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }
}
