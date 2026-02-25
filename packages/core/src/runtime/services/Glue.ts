// @generated — DO NOT EDIT. Run `npx tsx tools/codegen/generate.ts` to regenerate.
import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for Glue operations. */
export interface GlueOptions {
  retry?: RetryPolicy;
  timeoutSeconds?: number;
  heartbeatSeconds?: number;
}

export interface NotificationProperty {
  /** After a job run starts, the number of minutes to wait before sending a job run delay notification. */
  NotifyDelayAfter?: number;
}

export interface StartJobRunInput {
  /** This field is deprecated. Use MaxCapacity instead. The number of Glue data processing units (DPUs) to allocate to this JobRun. You can allocate a minimum of 2 DPUs; the default is 10. A DPU is a relat */
  AllocatedCapacity?: number;
  /** The job arguments associated with this run. For this job run, they replace the default arguments set in the job definition itself. You can specify arguments here that your own job-execution script con */
  Arguments?: Record<string, string>;
  /** Indicates whether the job is run with a standard or flexible execution class. The standard execution-class is ideal for time-sensitive workloads that require fast job startup and dedicated resources.  */
  ExecutionClass?: 'FLEX' | 'STANDARD';
  /** This inline session policy to the StartJobRun API allows you to dynamically restrict the permissions of the specified execution role for the scope of the job, without requiring the creation of additio */
  ExecutionRoleSessionPolicy?: string;
  /** The ID of a previous JobRun to retry. */
  JobRunId?: string;
  /** Specifies whether job run queuing is enabled for the job run. A value of true means job run queuing is enabled for the job run. If false or not populated, the job run will not be considered for queuei */
  JobRunQueuingEnabled?: boolean;
  /** For Glue version 1.0 or earlier jobs, using the standard worker type, the number of Glue data processing units (DPUs) that can be allocated when this job runs. A DPU is a relative measure of processin */
  MaxCapacity?: number;
  /** Specifies configuration properties of a job run notification. */
  NotificationProperty?: NotificationProperty;
  /** The number of workers of a defined workerType that are allocated when a job runs. */
  NumberOfWorkers?: number;
  /** The name of the SecurityConfiguration structure to be used with this job run. */
  SecurityConfiguration?: string;
  /** The JobRun timeout in minutes. This is the maximum time that a job run can consume resources before it is terminated and enters TIMEOUT status. This value overrides the timeout value set in the parent */
  Timeout?: number;
  /** The type of predefined worker that is allocated when a job runs. Accepts a value of G.1X, G.2X, G.4X, G.8X or G.025X for Spark jobs. Accepts the value Z.2X for Ray jobs. For the G.1X worker type, each */
  WorkerType?: 'Standard' | 'G.1X' | 'G.2X' | 'G.025X' | 'G.4X' | 'G.8X' | 'Z.2X';
}

export interface StartJobRunAsyncInput {
  /** This field is deprecated. Use MaxCapacity instead. The number of Glue data processing units (DPUs) to allocate to this JobRun. You can allocate a minimum of 2 DPUs; the default is 10. A DPU is a relat */
  AllocatedCapacity?: number;
  /** The job arguments associated with this run. For this job run, they replace the default arguments set in the job definition itself. You can specify arguments here that your own job-execution script con */
  Arguments?: Record<string, string>;
  /** Indicates whether the job is run with a standard or flexible execution class. The standard execution-class is ideal for time-sensitive workloads that require fast job startup and dedicated resources.  */
  ExecutionClass?: 'FLEX' | 'STANDARD';
  /** This inline session policy to the StartJobRun API allows you to dynamically restrict the permissions of the specified execution role for the scope of the job, without requiring the creation of additio */
  ExecutionRoleSessionPolicy?: string;
  /** The ID of a previous JobRun to retry. */
  JobRunId?: string;
  /** Specifies whether job run queuing is enabled for the job run. A value of true means job run queuing is enabled for the job run. If false or not populated, the job run will not be considered for queuei */
  JobRunQueuingEnabled?: boolean;
  /** For Glue version 1.0 or earlier jobs, using the standard worker type, the number of Glue data processing units (DPUs) that can be allocated when this job runs. A DPU is a relative measure of processin */
  MaxCapacity?: number;
  /** Specifies configuration properties of a job run notification. */
  NotificationProperty?: NotificationProperty;
  /** The number of workers of a defined workerType that are allocated when a job runs. */
  NumberOfWorkers?: number;
  /** The name of the SecurityConfiguration structure to be used with this job run. */
  SecurityConfiguration?: string;
  /** The JobRun timeout in minutes. This is the maximum time that a job run can consume resources before it is terminated and enters TIMEOUT status. This value overrides the timeout value set in the parent */
  Timeout?: number;
  /** The type of predefined worker that is allocated when a job runs. Accepts a value of G.1X, G.2X, G.4X, G.8X or G.025X for Spark jobs. Accepts the value Z.2X for Ray jobs. For the G.1X worker type, each */
  WorkerType?: 'Standard' | 'G.1X' | 'G.2X' | 'G.025X' | 'G.4X' | 'G.8X' | 'Z.2X';
}

/** AWS Glue job binding for the SimpleSteps compiler. */
export class Glue {
  constructor(jobName: string) {}

  startJobRun<T>(params: StartJobRunInput, options?: GlueOptions): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  startJobRunAsync(params: StartJobRunAsyncInput, options?: GlueOptions): Promise<void> {
    throw new Error(BINDING_ERROR);
  }
}
