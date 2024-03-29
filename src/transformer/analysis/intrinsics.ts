import path from 'path';
import * as ts from 'typescript';
import StepTransformerContext from '../stepTransformerContext';

const LibraryFolder = path.resolve(path.join(__dirname, "../../"));
const StepsClassFile = path.resolve(path.join(LibraryFolder, "./runtime/Steps.ts"))

const StepFuctionFactoryClassName = "Steps"
const StepFunctionFactoryMethodName = "createFunction"

export enum IntrinsicsMethodName {

}

export type IntrinsicsMethodInfo = {
    
}

export type IntrinsicsMethods = {
    functionFactoryMethod: ts.Symbol
}

export function loadIntrinsics(context: StepTransformerContext): IntrinsicsMethods {
    const sourceFile = context.program.getSourceFile(StepsClassFile);
    if (!sourceFile) {
        throw new Error(`Could not load source file. ${StepsClassFile}`);
    }

    const classDefinition = sourceFile.statements
        .find(s => ts.isClassDeclaration(s) && s.name?.escapedText === StepFuctionFactoryClassName) as ts.ClassDeclaration;
    if (!classDefinition) {
        throw new Error(`Could not find steps class`);
    }

    const methods: Partial<IntrinsicsMethods> = {};
    context.visitEachChild(classDefinition, node => {
        if (ts.isMethodDeclaration(node)) {
            const symbol = context.checker.getSymbolAtLocation(node.name)
            if (symbol?.name === StepFunctionFactoryMethodName) {
                methods.functionFactoryMethod = symbol;
            }
        }

        return node;
    })

    return methods as IntrinsicsMethods;
}

function loadStaticMethods() {
    
}