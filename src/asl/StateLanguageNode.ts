export enum StateLanguageNodeType {
    StateMachineDocument,
    
}

export abstract class StateLanguageNode {
    public comment?: string;

    abstract toJson(): any;
}