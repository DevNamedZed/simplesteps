// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface Tag {
  /** The key of a tag. */
  key?: string;
  /** The value of a tag. */
  value?: string;
}

export interface EncryptionConfiguration {
  /** An alias, alias ARN, key ID, or key ARN of a symmetric encryption KMS key to encrypt data. To specify a KMS key in a different Amazon Web Services account, you must use the key ARN or alias ARN. */
  kmsKeyId?: string;
  /** Maximum duration that Step Functions will reuse data keys. When the period expires, Step Functions will call GenerateDataKey. Only applies to customer managed keys. */
  kmsDataKeyReusePeriodSeconds?: number;
  /** Encryption type */
  type: 'AWS_OWNED_KEY' | 'CUSTOMER_MANAGED_KMS_KEY';
}

export interface LoggingConfiguration {
  /** Defines which category of execution history events are logged. */
  level?: 'ALL' | 'ERROR' | 'FATAL' | 'OFF';
  /** Determines whether execution data is included in your log. When set to false, data is excluded. */
  includeExecutionData?: boolean;
  /** An array of objects that describes where your execution history events will be logged. Limited to size 1. Required, if your log level is not set to OFF. */
  destinations?: any[];
}

export interface TracingConfiguration {
  /** When set to true, X-Ray tracing is enabled. */
  enabled?: boolean;
}

export interface RoutingConfigurationListItem {
  /** The Amazon Resource Name (ARN) that identifies one or two state machine versions defined in the routing configuration. If you specify the ARN of a second version, it must belong to the same state mach */
  stateMachineVersionArn: string;
  /** The percentage of traffic you want to route to a state machine version. The sum of the weights in the routing configuration must be equal to 100. */
  weight: number;
}

export interface MockErrorOutput {
  /** A string denoting the error code of the exception thrown when invoking the tested state. This field is required if mock.errorOutput is specified. */
  error?: string;
  /** A string containing the cause of the exception thrown when executing the state's logic. */
  cause?: string;
}

export interface MockInput {
  /** A JSON string containing the mocked result of the state invocation. */
  result?: string;
  /** The mocked error output when calling TestState. When specified, the mocked response is returned as a JSON object that contains an error and cause field. */
  errorOutput?: MockErrorOutput;
  /** Determines the level of strictness when validating mocked results against their respective API models. Values include: STRICT: All required fields must be present, and all present fields must conform  */
  fieldValidationMode?: 'STRICT' | 'PRESENT' | 'NONE';
}

export interface TestStateConfiguration {
  /** The number of retry attempts that have occurred for the state's Retry that applies to the mocked error. */
  retrierRetryCount?: number;
  /** The name of the state from which an error originates when an error is mocked for a Map or Parallel state. */
  errorCausedByState?: string;
  /** The number of Map state iterations that failed during the Map state invocation. */
  mapIterationFailureCount?: number;
  /** The data read by ItemReader in Distributed Map states as found in its original source. */
  mapItemReaderData?: string;
}

export interface CreateActivityInput {
  /** The name of the activity to create. This name must be unique for your Amazon Web Services account and region for 90 days. For more information, see Limits Related to State Machine Executions in the St */
  name: string;
  /** Settings to configure server-side encryption. */
  encryptionConfiguration?: EncryptionConfiguration;
  /** The list of tags to add to a resource. An array of key-value pairs. For more information, see Using Cost Allocation Tags in the Amazon Web Services Billing and Cost Management User Guide, and Controll */
  tags?: Tag[];
}

export interface CreateStateMachineInput {
  /** The Amazon States Language definition of the state machine. See Amazon States Language. */
  definition: string;
  /** The name of the state machine. A name must not contain: white space brackets { } [ ] wildcard characters ? * special characters " # % \ ^ | ~ ` $ & , ; : / control characters (U+0000-001F, U+007F-009F */
  name: string;
  /** The Amazon Resource Name (ARN) of the IAM role to use for this state machine. */
  roleArn: string;
  /** Settings to configure server-side encryption. */
  encryptionConfiguration?: EncryptionConfiguration;
  /** Defines what execution history events are logged and where they are logged. By default, the level is set to OFF. For more information see Log Levels in the Step Functions User Guide. */
  loggingConfiguration?: LoggingConfiguration;
  /** Set to true to publish the first version of the state machine during creation. The default is false. */
  publish?: boolean;
  /** Tags to be added when creating a state machine. An array of key-value pairs. For more information, see Using Cost Allocation Tags in the Amazon Web Services Billing and Cost Management User Guide, and */
  tags?: Tag[];
  /** Selects whether X-Ray tracing is enabled. */
  tracingConfiguration?: TracingConfiguration;
  /** Determines whether a Standard or Express state machine is created. The default is STANDARD. You cannot update the type of a state machine once it has been created. */
  type?: 'STANDARD' | 'EXPRESS';
  /** Sets description about the state machine version. You can only set the description if the publish parameter is set to true. Otherwise, if you set versionDescription, but publish to false, this API act */
  versionDescription?: string;
}

export interface CreateStateMachineAliasInput {
  /** The name of the state machine alias. To avoid conflict with version ARNs, don't use an integer in the name of the alias. */
  name: string;
  /** The routing configuration of a state machine alias. The routing configuration shifts execution traffic between two state machine versions. routingConfiguration contains an array of RoutingConfig objec */
  routingConfiguration: RoutingConfigurationListItem[];
  /** A description for the state machine alias. */
  description?: string;
}

export interface DeleteActivityInput {
  /** The Amazon Resource Name (ARN) of the activity to delete. */
  activityArn: string;
}

export interface DeleteStateMachineInput {
  /** The Amazon Resource Name (ARN) of the state machine to delete. */
  stateMachineArn: string;
}

export interface DeleteStateMachineAliasInput {
  /** The Amazon Resource Name (ARN) of the state machine alias to delete. */
  stateMachineAliasArn: string;
}

export interface DeleteStateMachineVersionInput {
  /** The Amazon Resource Name (ARN) of the state machine version to delete. */
  stateMachineVersionArn: string;
}

export interface DescribeActivityInput {
  /** The Amazon Resource Name (ARN) of the activity to describe. */
  activityArn: string;
}

export interface DescribeExecutionInput {
  /** The Amazon Resource Name (ARN) of the execution to describe. */
  executionArn: string;
  /** If your state machine definition is encrypted with a KMS key, callers must have kms:Decrypt permission to decrypt the definition. Alternatively, you can call DescribeStateMachine API with includedData */
  includedData?: 'ALL_DATA' | 'METADATA_ONLY';
}

export interface DescribeMapRunInput {
  /** The Amazon Resource Name (ARN) that identifies a Map Run. */
  mapRunArn: string;
}

export interface DescribeStateMachineInput {
  /** The Amazon Resource Name (ARN) of the state machine for which you want the information. If you specify a state machine version ARN, this API returns details about that version. The version ARN is a co */
  stateMachineArn: string;
  /** If your state machine definition is encrypted with a KMS key, callers must have kms:Decrypt permission to decrypt the definition. Alternatively, you can call the API with includedData = METADATA_ONLY  */
  includedData?: 'ALL_DATA' | 'METADATA_ONLY';
}

export interface DescribeStateMachineAliasInput {
  /** The Amazon Resource Name (ARN) of the state machine alias. */
  stateMachineAliasArn: string;
}

export interface DescribeStateMachineForExecutionInput {
  /** The Amazon Resource Name (ARN) of the execution you want state machine information for. */
  executionArn: string;
  /** If your state machine definition is encrypted with a KMS key, callers must have kms:Decrypt permission to decrypt the definition. Alternatively, you can call the API with includedData = METADATA_ONLY  */
  includedData?: 'ALL_DATA' | 'METADATA_ONLY';
}

export interface GetActivityTaskInput {
  /** The Amazon Resource Name (ARN) of the activity to retrieve tasks from (assigned when you create the task using CreateActivity.) */
  activityArn: string;
  /** You can provide an arbitrary name in order to identify the worker that the task is assigned to. This name is used when it is logged in the execution history. */
  workerName?: string;
}

export interface GetExecutionHistoryInput {
  /** The Amazon Resource Name (ARN) of the execution. */
  executionArn: string;
  /** You can select whether execution data (input or output of a history event) is returned. The default is true. */
  includeExecutionData?: boolean;
  /** The maximum number of results that are returned per call. You can use nextToken to obtain further pages of results. The default is 100 and the maximum allowed page size is 1000. A value of 0 uses the  */
  maxResults?: number;
  /** If nextToken is returned, there are more results available. The value of nextToken is a unique pagination token for each page. Make the call again using the returned token to retrieve the next page. K */
  nextToken?: string;
  /** Lists events in descending order of their timeStamp. */
  reverseOrder?: boolean;
}

export interface ListActivitiesInput {
  /** The maximum number of results that are returned per call. You can use nextToken to obtain further pages of results. The default is 100 and the maximum allowed page size is 1000. A value of 0 uses the  */
  maxResults?: number;
  /** If nextToken is returned, there are more results available. The value of nextToken is a unique pagination token for each page. Make the call again using the returned token to retrieve the next page. K */
  nextToken?: string;
}

export interface ListExecutionsInput {
  /** The Amazon Resource Name (ARN) of the Map Run that started the child workflow executions. If the mapRunArn field is specified, a list of all of the child workflow executions started by a Map Run is re */
  mapRunArn?: string;
  /** The maximum number of results that are returned per call. You can use nextToken to obtain further pages of results. The default is 100 and the maximum allowed page size is 1000. A value of 0 uses the  */
  maxResults?: number;
  /** If nextToken is returned, there are more results available. The value of nextToken is a unique pagination token for each page. Make the call again using the returned token to retrieve the next page. K */
  nextToken?: string;
  /** Sets a filter to list executions based on whether or not they have been redriven. For a Distributed Map, redriveFilter sets a filter to list child workflow executions based on whether or not they have */
  redriveFilter?: 'REDRIVEN' | 'NOT_REDRIVEN';
  /** The Amazon Resource Name (ARN) of the state machine whose executions is listed. You can specify either a mapRunArn or a stateMachineArn, but not both. You can also return a list of executions associat */
  stateMachineArn?: string;
  /** If specified, only list the executions whose current execution status matches the given filter. If you provide a PENDING_REDRIVE statusFilter, you must specify mapRunArn. For more information, see Chi */
  statusFilter?: 'RUNNING' | 'SUCCEEDED' | 'FAILED' | 'TIMED_OUT' | 'ABORTED' | 'PENDING_REDRIVE';
}

export interface ListMapRunsInput {
  /** The Amazon Resource Name (ARN) of the execution for which the Map Runs must be listed. */
  executionArn: string;
  /** The maximum number of results that are returned per call. You can use nextToken to obtain further pages of results. The default is 100 and the maximum allowed page size is 1000. A value of 0 uses the  */
  maxResults?: number;
  /** If nextToken is returned, there are more results available. The value of nextToken is a unique pagination token for each page. Make the call again using the returned token to retrieve the next page. K */
  nextToken?: string;
}

export interface ListStateMachineAliasesInput {
  /** The Amazon Resource Name (ARN) of the state machine for which you want to list aliases. If you specify a state machine version ARN, this API returns a list of aliases for that version. */
  stateMachineArn: string;
  /** The maximum number of results that are returned per call. You can use nextToken to obtain further pages of results. The default is 100 and the maximum allowed page size is 1000. A value of 0 uses the  */
  maxResults?: number;
  /** If nextToken is returned, there are more results available. The value of nextToken is a unique pagination token for each page. Make the call again using the returned token to retrieve the next page. K */
  nextToken?: string;
}

export interface ListStateMachinesInput {
  /** The maximum number of results that are returned per call. You can use nextToken to obtain further pages of results. The default is 100 and the maximum allowed page size is 1000. A value of 0 uses the  */
  maxResults?: number;
  /** If nextToken is returned, there are more results available. The value of nextToken is a unique pagination token for each page. Make the call again using the returned token to retrieve the next page. K */
  nextToken?: string;
}

export interface ListStateMachineVersionsInput {
  /** The Amazon Resource Name (ARN) of the state machine. */
  stateMachineArn: string;
  /** The maximum number of results that are returned per call. You can use nextToken to obtain further pages of results. The default is 100 and the maximum allowed page size is 1000. A value of 0 uses the  */
  maxResults?: number;
  /** If nextToken is returned, there are more results available. The value of nextToken is a unique pagination token for each page. Make the call again using the returned token to retrieve the next page. K */
  nextToken?: string;
}

export interface ListTagsForResourceInput {
  /** The Amazon Resource Name (ARN) for the Step Functions state machine or activity. */
  resourceArn: string;
}

export interface PublishStateMachineVersionInput {
  /** The Amazon Resource Name (ARN) of the state machine. */
  stateMachineArn: string;
  /** An optional description of the state machine version. */
  description?: string;
  /** Only publish the state machine version if the current state machine's revision ID matches the specified ID. Use this option to avoid publishing a version if the state machine changed since you last up */
  revisionId?: string;
}

export interface RedriveExecutionInput {
  /** The Amazon Resource Name (ARN) of the execution to be redriven. */
  executionArn: string;
  /** A unique, case-sensitive identifier that you provide to ensure the idempotency of the request. If you don’t specify a client token, the Amazon Web Services SDK automatically generates a client token a */
  clientToken?: string;
}

export interface SendTaskFailureInput {
  /** The token that represents this task. Task tokens are generated by Step Functions when tasks are assigned to a worker, or in the context object when a workflow enters a task state. See GetActivityTaskO */
  taskToken: string;
  /** A more detailed explanation of the cause of the failure. */
  cause?: string;
  /** The error code of the failure. */
  error?: string;
}

export interface SendTaskHeartbeatInput {
  /** The token that represents this task. Task tokens are generated by Step Functions when tasks are assigned to a worker, or in the context object when a workflow enters a task state. See GetActivityTaskO */
  taskToken: string;
}

export interface SendTaskSuccessInput {
  /** The JSON output of the task. Length constraints apply to the payload size, and are expressed as bytes in UTF-8 encoding. */
  output: string;
  /** The token that represents this task. Task tokens are generated by Step Functions when tasks are assigned to a worker, or in the context object when a workflow enters a task state. See GetActivityTaskO */
  taskToken: string;
}

export interface StartExecutionInput {
  /** The Amazon Resource Name (ARN) of the state machine to execute. The stateMachineArn parameter accepts one of the following inputs: An unqualified state machine ARN – Refers to a state machine ARN that */
  stateMachineArn: string;
  /** The string that contains the JSON input data for the execution, for example: "{\"first_name\" : \"Alejandro\"}" If you don't include any JSON input data, you still must include the two braces, for exa */
  input?: string;
  /** Optional name of the execution. This name must be unique for your Amazon Web Services account, Region, and state machine for 90 days. For more information, see Limits Related to State Machine Executio */
  name?: string;
  /** Passes the X-Ray trace header. The trace header can also be passed in the request payload. For X-Ray traces, all Amazon Web Services services use the X-Amzn-Trace-Id header from the HTTP request. Usin */
  traceHeader?: string;
}

export interface StartSyncExecutionInput {
  /** The Amazon Resource Name (ARN) of the state machine to execute. */
  stateMachineArn: string;
  /** If your state machine definition is encrypted with a KMS key, callers must have kms:Decrypt permission to decrypt the definition. Alternatively, you can call the API with includedData = METADATA_ONLY  */
  includedData?: 'ALL_DATA' | 'METADATA_ONLY';
  /** The string that contains the JSON input data for the execution, for example: "{\"first_name\" : \"Alejandro\"}" If you don't include any JSON input data, you still must include the two braces, for exa */
  input?: string;
  /** The name of the execution. */
  name?: string;
  /** Passes the X-Ray trace header. The trace header can also be passed in the request payload. For X-Ray traces, all Amazon Web Services services use the X-Amzn-Trace-Id header from the HTTP request. Usin */
  traceHeader?: string;
}

export interface StopExecutionInput {
  /** The Amazon Resource Name (ARN) of the execution to stop. */
  executionArn: string;
  /** A more detailed explanation of the cause of the failure. */
  cause?: string;
  /** The error code of the failure. */
  error?: string;
}

export interface TagResourceInput {
  /** The Amazon Resource Name (ARN) for the Step Functions state machine or activity. */
  resourceArn: string;
  /** The list of tags to add to a resource. Tags may only contain Unicode letters, digits, white space, or these symbols: _ . : / = + - @. */
  tags: Tag[];
}

export interface TestStateInput {
  /** The Amazon States Language (ASL) definition of the state or state machine. */
  definition: string;
  /** A JSON string representing a valid Context object for the state under test. This field may only be specified if a mock is specified in the same request. */
  context?: string;
  /** A string that contains the JSON input data for the state. */
  input?: string;
  /** Determines the values to return when a state is tested. You can specify one of the following types: INFO: Shows the final state output. By default, Step Functions sets inspectionLevel to INFO if you d */
  inspectionLevel?: 'INFO' | 'DEBUG' | 'TRACE';
  /** Defines a mocked result or error for the state under test. A mock can only be specified for Task, Map, or Parallel states. If it is specified for another state type, an exception will be thrown. */
  mock?: MockInput;
  /** Specifies whether or not to include secret information in the test result. For HTTP Tasks, a secret includes the data that an EventBridge connection adds to modify the HTTP request headers, query para */
  revealSecrets?: boolean;
  /** The Amazon Resource Name (ARN) of the execution role with the required IAM permissions for the state. */
  roleArn?: string;
  /** Contains configurations for the state under test. */
  stateConfiguration?: TestStateConfiguration;
  /** Denotes the particular state within a state machine definition to be tested. If this field is specified, the definition must contain a fully-formed state machine definition. */
  stateName?: string;
  /** JSON object literal that sets variables used in the state under test. Object keys are the variable names and values are the variable values. */
  variables?: string;
}

export interface UntagResourceInput {
  /** The Amazon Resource Name (ARN) for the Step Functions state machine or activity. */
  resourceArn: string;
  /** The list of tags to remove from the resource. */
  tagKeys: string[];
}

export interface UpdateMapRunInput {
  /** The Amazon Resource Name (ARN) of a Map Run. */
  mapRunArn: string;
  /** The maximum number of child workflow executions that can be specified to run in parallel for the Map Run at the same time. */
  maxConcurrency?: number;
  /** The maximum number of failed items before the Map Run fails. */
  toleratedFailureCount?: number;
  /** The maximum percentage of failed items before the Map Run fails. */
  toleratedFailurePercentage?: number;
}

export interface UpdateStateMachineInput {
  /** The Amazon Resource Name (ARN) of the state machine. */
  stateMachineArn: string;
  /** The Amazon States Language definition of the state machine. See Amazon States Language. */
  definition?: string;
  /** Settings to configure server-side encryption. */
  encryptionConfiguration?: EncryptionConfiguration;
  /** Use the LoggingConfiguration data type to set CloudWatch Logs options. */
  loggingConfiguration?: LoggingConfiguration;
  /** Specifies whether the state machine version is published. The default is false. To publish a version after updating the state machine, set publish to true. */
  publish?: boolean;
  /** The Amazon Resource Name (ARN) of the IAM role of the state machine. */
  roleArn?: string;
  /** Selects whether X-Ray tracing is enabled. */
  tracingConfiguration?: TracingConfiguration;
  /** An optional description of the state machine version to publish. You can only specify the versionDescription parameter if you've set publish to true. */
  versionDescription?: string;
}

export interface UpdateStateMachineAliasInput {
  /** The Amazon Resource Name (ARN) of the state machine alias. */
  stateMachineAliasArn: string;
  /** A description of the state machine alias. */
  description?: string;
  /** The routing configuration of the state machine alias. An array of RoutingConfig objects that specifies up to two state machine versions that the alias starts executions for. */
  routingConfiguration?: RoutingConfigurationListItem[];
}

export interface ValidateStateMachineDefinitionInput {
  /** The Amazon States Language definition of the state machine. For more information, see Amazon States Language (ASL). */
  definition: string;
  /** The maximum number of diagnostics that are returned per call. The default and maximum value is 100. Setting the value to 0 will also use the default of 100. If the number of diagnostics returned in th */
  maxResults?: number;
  /** Minimum level of diagnostics to return. ERROR returns only ERROR diagnostics, whereas WARNING returns both WARNING and ERROR diagnostics. The default is ERROR. */
  severity?: 'ERROR' | 'WARNING';
  /** The target type of state machine for this definition. The default is STANDARD. */
  type?: 'STANDARD' | 'EXPRESS';
}

/** SFN service binding for Step Functions SDK integrations. */
export class SFN {
  constructor() {}

  createActivity<T>(params: CreateActivityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createStateMachine<T>(params: CreateStateMachineInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  createStateMachineAlias<T>(params: CreateStateMachineAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteActivity<T>(params: DeleteActivityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteStateMachine<T>(params: DeleteStateMachineInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteStateMachineAlias<T>(params: DeleteStateMachineAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteStateMachineVersion<T>(params: DeleteStateMachineVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeActivity<T>(params: DescribeActivityInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeExecution<T>(params: DescribeExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeMapRun<T>(params: DescribeMapRunInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStateMachine<T>(params: DescribeStateMachineInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStateMachineAlias<T>(params: DescribeStateMachineAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  describeStateMachineForExecution<T>(params: DescribeStateMachineForExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getActivityTask<T>(params: GetActivityTaskInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getExecutionHistory<T>(params: GetExecutionHistoryInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listActivities<T>(params: ListActivitiesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listExecutions<T>(params: ListExecutionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listMapRuns<T>(params: ListMapRunsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStateMachineAliases<T>(params: ListStateMachineAliasesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStateMachines<T>(params: ListStateMachinesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listStateMachineVersions<T>(params: ListStateMachineVersionsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  publishStateMachineVersion<T>(params: PublishStateMachineVersionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  redriveExecution<T>(params: RedriveExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  sendTaskFailure<T>(params: SendTaskFailureInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  sendTaskHeartbeat<T>(params: SendTaskHeartbeatInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  sendTaskSuccess<T>(params: SendTaskSuccessInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startExecution<T>(params: StartExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startSyncExecution<T>(params: StartSyncExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  stopExecution<T>(params: StopExecutionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  testState<T>(params: TestStateInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateMapRun<T>(params: UpdateMapRunInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateStateMachine<T>(params: UpdateStateMachineInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateStateMachineAlias<T>(params: UpdateStateMachineAliasInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  validateStateMachineDefinition<T>(params: ValidateStateMachineDefinitionInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
