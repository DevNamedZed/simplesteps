
export enum StepVariableType {
    Input,
    Output,
    External,
    Task,
    Service,
}

export type StepVariable = {
    name: string;
    possiblilites: Array<StepVariable>
}

export type FunctionStepVariables {

}


function analyizeVariables() {
    
}
