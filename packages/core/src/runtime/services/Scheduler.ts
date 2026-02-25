// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

export interface Tag {
  /** The key for the tag. */
  Key: string;
  /** The value for the tag. */
  Value: string;
}

export interface DeadLetterConfig {
  /** The Amazon Resource Name (ARN) of the SQS queue specified as the destination for the dead-letter queue. */
  Arn?: string;
}

export interface EcsParameters {
  /** The Amazon Resource Name (ARN) of the task definition to use if the event target is an Amazon ECS task. */
  TaskDefinitionArn: string;
  /** The number of tasks to create based on TaskDefinition. The default is 1. */
  TaskCount?: number;
  /** Specifies the launch type on which your task is running. The launch type that you specify here must match one of the launch type (compatibilities) of the target task. The FARGATE value is supported on */
  LaunchType?: 'EC2' | 'FARGATE' | 'EXTERNAL';
  /** This structure specifies the network configuration for an ECS task. */
  NetworkConfiguration?: any;
  /** Specifies the platform version for the task. Specify only the numeric portion of the platform version, such as 1.1.0. */
  PlatformVersion?: string;
  /** Specifies an ECS task group for the task. The maximum length is 255 characters. */
  Group?: string;
  /** The capacity provider strategy to use for the task. */
  CapacityProviderStrategy?: any[];
  /** Specifies whether to enable Amazon ECS managed tags for the task. For more information, see Tagging Your Amazon ECS Resources in the Amazon ECS Developer Guide. */
  EnableECSManagedTags?: boolean;
  /** Whether or not to enable the execute command functionality for the containers in this task. If true, this enables execute command functionality on all containers in the task. */
  EnableExecuteCommand?: boolean;
  /** An array of placement constraint objects to use for the task. You can specify up to 10 constraints per task (including constraints in the task definition and those specified at runtime). */
  PlacementConstraints?: any[];
  /** The task placement strategy for a task or service. */
  PlacementStrategy?: any[];
  /** Specifies whether to propagate the tags from the task definition to the task. If no value is specified, the tags are not propagated. Tags can only be propagated to the task during task creation. To ad */
  PropagateTags?: 'TASK_DEFINITION';
  /** The reference ID to use for the task. */
  ReferenceId?: string;
  /** The metadata that you apply to the task to help you categorize and organize them. Each tag consists of a key and an optional value, both of which you define. For more information, see RunTask in the A */
  Tags?: any[];
}

export interface EventBridgeParameters {
  /** A free-form string, with a maximum of 128 characters, used to decide what fields to expect in the event detail. */
  DetailType: string;
  /** The source of the event. */
  Source: string;
}

export interface KinesisParameters {
  /** Specifies the shard to which EventBridge Scheduler sends the event. For more information, see Amazon Kinesis Data Streams terminology and concepts in the Amazon Kinesis Streams Developer Guide. */
  PartitionKey: string;
}

export interface SageMakerPipelineParameters {
  /** List of parameter names and values to use when executing the SageMaker Model Building Pipeline. */
  PipelineParameterList?: any[];
}

export interface SqsParameters {
  /** The FIFO message group ID to use as the target. */
  MessageGroupId?: string;
}

export interface Target {
  /** The Amazon Resource Name (ARN) of the target. */
  Arn: string;
  /** The Amazon Resource Name (ARN) of the IAM role that EventBridge Scheduler will use for this target when the schedule is invoked. */
  RoleArn: string;
  /** An object that contains information about an Amazon SQS queue that EventBridge Scheduler uses as a dead-letter queue for your schedule. If specified, EventBridge Scheduler delivers failed events that  */
  DeadLetterConfig?: DeadLetterConfig;
  /** A RetryPolicy object that includes information about the retry policy settings, including the maximum age of an event, and the maximum number of times EventBridge Scheduler will try to deliver the eve */
  RetryPolicy?: any;
  /** The text, or well-formed JSON, passed to the target. If you are configuring a templated Lambda, AWS Step Functions, or Amazon EventBridge target, the input must be a well-formed JSON. For all other ta */
  Input?: string;
  /** The templated target type for the Amazon ECS RunTask API operation. */
  EcsParameters?: EcsParameters;
  /** The templated target type for the EventBridge PutEvents API operation. */
  EventBridgeParameters?: EventBridgeParameters;
  /** The templated target type for the Amazon Kinesis PutRecord API operation. */
  KinesisParameters?: KinesisParameters;
  /** The templated target type for the Amazon SageMaker StartPipelineExecution API operation. */
  SageMakerPipelineParameters?: SageMakerPipelineParameters;
  /** The templated target type for the Amazon SQS SendMessage API operation. Contains the message group ID to use when the target is a FIFO queue. If you specify an Amazon SQS FIFO queue as a target, the q */
  SqsParameters?: SqsParameters;
}

export interface FlexibleTimeWindow {
  /** Determines whether the schedule is invoked within a flexible time window. */
  Mode: 'OFF' | 'FLEXIBLE';
  /** The maximum time window during which a schedule can be invoked. */
  MaximumWindowInMinutes?: number;
}

export interface DeleteScheduleInput {
  /** The name of the schedule to delete. */
  Name: string;
  /** Unique, case-sensitive identifier you provide to ensure the idempotency of the request. If you do not specify a client token, EventBridge Scheduler uses a randomly generated token for the request to e */
  ClientToken?: string;
  /** The name of the schedule group associated with this schedule. If you omit this, the default schedule group is used. */
  GroupName?: string;
}

export interface DeleteScheduleGroupInput {
  /** The name of the schedule group to delete. */
  Name: string;
  /** Unique, case-sensitive identifier you provide to ensure the idempotency of the request. If you do not specify a client token, EventBridge Scheduler uses a randomly generated token for the request to e */
  ClientToken?: string;
}

export interface GetScheduleInput {
  /** The name of the schedule to retrieve. */
  Name: string;
  /** The name of the schedule group associated with this schedule. If you omit this, EventBridge Scheduler assumes that the schedule is associated with the default group. */
  GroupName?: string;
}

export interface GetScheduleGroupInput {
  /** The name of the schedule group to retrieve. */
  Name: string;
}

export interface ListScheduleGroupsInput {
  /** If specified, limits the number of results returned by this operation. The operation also returns a NextToken which you can use in a subsequent operation to retrieve the next set of results. */
  MaxResults?: number;
  /** The name prefix that you can use to return a filtered list of your schedule groups. */
  NamePrefix?: string;
  /** The token returned by a previous call to retrieve the next set of results. */
  NextToken?: string;
}

export interface ListSchedulesInput {
  /** If specified, only lists the schedules whose associated schedule group matches the given filter. */
  GroupName?: string;
  /** If specified, limits the number of results returned by this operation. The operation also returns a NextToken which you can use in a subsequent operation to retrieve the next set of results. */
  MaxResults?: number;
  /** Schedule name prefix to return the filtered list of resources. */
  NamePrefix?: string;
  /** The token returned by a previous call to retrieve the next set of results. */
  NextToken?: string;
  /** If specified, only lists the schedules whose current state matches the given filter. */
  State?: 'ENABLED' | 'DISABLED';
}

export interface ListTagsForResourceInput {
  /** The ARN of the EventBridge Scheduler resource for which you want to view tags. */
  ResourceArn: string;
}

export interface TagResourceInput {
  /** The Amazon Resource Name (ARN) of the schedule group that you are adding tags to. */
  ResourceArn: string;
  /** The list of tags to associate with the schedule group. */
  Tags: Tag[];
}

export interface UntagResourceInput {
  /** The Amazon Resource Name (ARN) of the schedule group from which you are removing tags. */
  ResourceArn: string;
  /** The list of tag keys to remove from the resource. */
  TagKeys: string[];
}

export interface UpdateScheduleInput {
  /** Allows you to configure a time window during which EventBridge Scheduler invokes the schedule. */
  FlexibleTimeWindow: FlexibleTimeWindow;
  /** The name of the schedule that you are updating. */
  Name: string;
  /** The expression that defines when the schedule runs. The following formats are supported. at expression - at(yyyy-mm-ddThh:mm:ss) rate expression - rate(value unit) cron expression - cron(fields) You c */
  ScheduleExpression: string;
  /** The schedule target. You can use this operation to change the target that your schedule invokes. */
  Target: Target;
  /** Specifies the action that EventBridge Scheduler applies to the schedule after the schedule completes invoking the target. */
  ActionAfterCompletion?: 'NONE' | 'DELETE';
  /** Unique, case-sensitive identifier you provide to ensure the idempotency of the request. If you do not specify a client token, EventBridge Scheduler uses a randomly generated token for the request to e */
  ClientToken?: string;
  /** The description you specify for the schedule. */
  Description?: string;
  /** The date, in UTC, before which the schedule can invoke its target. Depending on the schedule's recurrence expression, invocations might stop on, or before, the EndDate you specify. EventBridge Schedul */
  EndDate?: string;
  /** The name of the schedule group with which the schedule is associated. You must provide this value in order for EventBridge Scheduler to find the schedule you want to update. If you omit this value, Ev */
  GroupName?: string;
  /** The ARN for the customer managed KMS key that that you want EventBridge Scheduler to use to encrypt and decrypt your data. */
  KmsKeyArn?: string;
  /** The timezone in which the scheduling expression is evaluated. */
  ScheduleExpressionTimezone?: string;
  /** The date, in UTC, after which the schedule can begin invoking its target. Depending on the schedule's recurrence expression, invocations might occur on, or after, the StartDate you specify. EventBridg */
  StartDate?: string;
  /** Specifies whether the schedule is enabled or disabled. */
  State?: 'ENABLED' | 'DISABLED';
}

/** Scheduler service binding for Step Functions SDK integrations. */
export class Scheduler {
  constructor() {}

  deleteSchedule<T>(params: DeleteScheduleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  deleteScheduleGroup<T>(params: DeleteScheduleGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getSchedule<T>(params: GetScheduleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  getScheduleGroup<T>(params: GetScheduleGroupInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listScheduleGroups<T>(params: ListScheduleGroupsInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listSchedules<T>(params: ListSchedulesInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listTagsForResource<T>(params: ListTagsForResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  tagResource<T>(params: TagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  untagResource<T>(params: UntagResourceInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  updateSchedule<T>(params: UpdateScheduleInput): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
