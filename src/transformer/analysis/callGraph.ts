import * as ts from 'typescript';
import StepTransformerContext from '../stepTransformerContext';

export enum CallNodeType {
    /**
     * Used to indicate the function or method is the entry point to the step function
     */
    EntryPoint,


    /**
     * Used to indicate a call to an intrinsic method or function. 
     * For example, JSON.stringify, Promise.all,
     */
    Intrinsic
}

export type CallGraphNode = {
    readonly class?: ts.ClassDeclaration;
    readonly callable: ts.MethodDeclaration | ts.FunctionDeclaration | ts.ConstructorDeclaration;
    readonly edges: Array<CallGraphNode>;
    readonly async: boolean;
}

type ImportInfo = {
    
}

function hasStepImport(context: StepTransformerContext, file: ts.SourceFile): boolean {
    let result: boolean = false;
    const visit = (node: ts.Node) => {
        // if (ts.isImportDeclaration())

    };
    
    return result;
}



function isStepFunctionFactory(node: ts.HasDecorators): boolean {
    const decorators = ts.getDecorators(node);
    
    return false;
}

/**
 * Creates a call graph for every step function entry point in the source file. 
 * @param sourceFile The source file to analyize. 
 */
export function createCallGraphs(context: StepTransformerContext, sourceFile: ts.SourceFile): Array<CallGraphNode> {
    const nodes = new Array<CallGraphNode>();
    const classVisitor = (node: ts.Node) => {

    }
    context.checker.tryGetMemberInModuleExports

    const visit = (node: ts.Node) => {
        if (ts.isFunctionDeclaration(node)) {

            isStepFunctionFactory(node.)
        }

    };


}

export function createMethodCallGraph(context: StepTransformerContext, source: ts.MethodDeclaration): CallGraphNode {
    return {
        callable: source,
        edges: parseCallableEdges(context, source.body)
    };
}

export function createFunctionCallGraph(context: StepTransformerContext, source: ts.FunctionDeclaration) {
    return {
        callable: source,
        edges: parseCallableEdges(context, source.body)
    };
}

function parseCallableEdges(context: StepTransformerContext, body?: ts.FunctionBody): Array<CallGraphNode> {
    const nodes = new Array<CallGraphNode>();
    const path = new Array<ts.FunctionLikeDeclarationBase>();
  
    if (!body) {
        return nodes
    }
    Promise

    const visit = (node: ts.Node): ts.Node => {
        ts.isAwaitExpression()
        if (ts.isCallExpression(node)) {
            node.getFirstToken
        }

        return node;
    };

    ts.visitNode(body, visit)
    return nodes;
}