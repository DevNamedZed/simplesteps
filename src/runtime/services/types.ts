export type Arnable = LambdaResource | SqsArnable

interface LambdaResource {
    functionArn(): string;
}

interface SqsArnable {
    queueArn(): string
}

export type StateThenCallback<TError> = (error: TError) => VoidFunction;


export interface StatePromise<TOutput, TError> extends Promise<TOutput> {
    next(result: TOutput): StatePromise<TOutput, TError>
    error(result: Error): StatePromise<TOutput, TError>
}
