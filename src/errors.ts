export type LineOffset = {
    readonly lineNumber: number;
    readonly offset: number;
}

export enum StepTransformerErrorSeverity {
    Error,
    Warning
}

export type StepTransformerError = {
    filePath: string;
    startPosition: LineOffset;
    endPosition: LineOffset;
    message: string;
    severity: StepTransformerErrorSeverity;    
}

