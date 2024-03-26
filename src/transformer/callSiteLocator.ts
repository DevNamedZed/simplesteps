import * as ts from 'typescript';
import StepTransformerContext from './stepTransformerContext';

export type StepFunctionFactoryCallSite = {
    readonly file: ts.SourceFile;
    readonly call: ts.CallExpression;    
}

export function findCallSites(context: StepTransformerContext, file: ts.SourceFile): Array<StepFunctionFactoryCallSite> {
    const callsites = new Array<StepFunctionFactoryCallSite>();
    const importVisitor = (n: ts.Node) => {
        if (ts.isCallExpression(n) && context.checker.getSymbolAtLocation(n.expression) === context.intrinsics.functionFactoryMethod) {
            callsites.push({
                file,
                call: n
            })

            return n;
        }

        context.visitEachChild(n, importVisitor)
        return n;
    }

    context.visitEachChild(file, importVisitor)
    
    return callsites;
}
