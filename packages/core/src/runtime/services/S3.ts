import type { RetryPolicy } from './types';

const BINDING_ERROR =
  'SimpleSteps service bindings cannot be called directly. They exist only for the compiler.';

/** Options for S3 operations. */
export interface S3Options {
  retry?: RetryPolicy;
}

/** S3 bucket binding for the SimpleSteps compiler. */
export class S3 {
  constructor(bucketName: string) {}

  getObject<T = any>(key: Record<string, any>, options?: S3Options): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  putObject(params: Record<string, any>, options?: S3Options): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  deleteObject(key: Record<string, any>, options?: S3Options): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  copyObject(params: Record<string, any>, options?: S3Options): Promise<void> {
    throw new Error(BINDING_ERROR);
  }

  headObject<T = any>(key: Record<string, any>, options?: S3Options): Promise<T> {
    throw new Error(BINDING_ERROR);
  }

  listObjects<T = any>(params: Record<string, any>, options?: S3Options): Promise<T> {
    throw new Error(BINDING_ERROR);
  }
}
