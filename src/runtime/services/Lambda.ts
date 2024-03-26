import { Arnable, StatePromise } from "./types";




export interface LambdaOptions {
}

export interface LamndaInstance<TInput = any, TOutput = any, TError = any> {
    call(input: TInput): StatePromise<TOutput, TError>
}

export function Lambda<TInput = any, TOutput = any, TError = any>(
    serviceArn: String | Arnable, 
    options: Partial<LambdaOptions> = {}): LamndaInstance<TInput, TOutput, TError> {
        throw new Error("foo")
}

