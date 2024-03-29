import * as ts from 'typescript';
import StepTransformerContext from '../stepTransformerContext';
import { getFunctionDeclarationFromNode, isFunctionLikeDeclarationBase } from './utils';

export type StepFunctionFactoryCallSite = {
    readonly file: ts.SourceFile;
    readonly call: ts.CallExpression;
    readonly factoryFunction: StepFunctionFactory;
}

export type StepFunctionFactory = {    
    readonly contextType?: ts.TypeNode;
    readonly inputType?: ts.TypeNode;
    readonly factory: ts.FunctionLikeDeclarationBase;
}

export function findCallSites(context: StepTransformerContext, file: ts.SourceFile): Array<StepFunctionFactoryCallSite> {
    const callsites = new Array<StepFunctionFactoryCallSite>();
    const importVisitor = (n: ts.Node) => {
        if (ts.isCallExpression(n) && context.checker.getSymbolAtLocation(n.expression) === context.intrinsics.functionFactoryMethod) {
            const factory = getFactoryFunction(context, n); 
            if (factory) {
                callsites.push({
                    file,
                    call: n,
                    factoryFunction: factory
                })
            }

            return n;
        }

        context.visitEachChild(n, importVisitor)
        return n;
    }

    context.visitEachChild(file, importVisitor)
    
    return callsites;
}

function getFactoryFunction(context: StepTransformerContext, callsite: ts.CallExpression): StepFunctionFactory | null {
    const factoryFunctionArg = callsite.arguments[0];
    let factory: ts.FunctionLikeDeclarationBase | null = null;

    if (isFunctionLikeDeclarationBase(factoryFunctionArg)) {
        factory = factoryFunctionArg;
    }
    else if (ts.isIdentifier(factoryFunctionArg)) {
        factory = getFunctionDeclarationFromNode(context, factoryFunctionArg);
    }

    console.log(`Factory is ${factory}`)
    if (!factory) {
        return null;
    }

    return {
        factory
    }
}
