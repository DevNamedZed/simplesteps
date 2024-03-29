import * as ts from 'typescript';
import StepTransformerContext from '../stepTransformerContext';
import { StepFunctionFactoryCallSite } from './callSiteLocator';

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

export class CallGraphNode {
    private readonly nodeEdges = new Array<CallGraphNodeEdge>();

    constructor(
        public readonly symbol: ts.Symbol | null | undefined,
        public readonly caller: ts.FunctionLikeDeclarationBase | null | undefined,
        public readonly edges: ReadonlyArray<CallGraphNodeEdge>) {
    }

    get name() {
        return "";
    }
}

export type CallGraphNodeEdge = {
    readonly await: boolean;
    readonly callsite: ts.CallLikeExpression;
    readonly symbol?: ts.Symbol;
    readonly callee?: CallGraphNode;
}

/**
 * Creates a call graph for every step function entry point in the source file. 
 * @param sourceFile The source file to analyize. 
 */
export function createCallGraph(context: StepTransformerContext, callsite: StepFunctionFactoryCallSite): CallGraphNode {
    
    const cache = new Map<ts.FunctionLikeDeclarationBase, CallGraphNode>();
    const path = new Set<ts.FunctionLikeDeclarationBase>();
    const edges: Array<CallGraphNodeEdge> = parseFunctionEdges(context, cache, path, callsite.factoryFunction.factory);
    return new CallGraphNode(null, callsite.factoryFunction.factory, edges);
}

export function debugPrint(graph: CallGraphNode, depth: number = 0) {
    console.log(`${'   '.repeat(depth)} ${graph.symbol?.escapedName}`)
    for (let edge of graph.edges) {
        if (edge.callee) {
            debugPrint(edge.callee, depth + 1)
        }
        else {
            console.log(`${'   '.repeat(depth + 1)} ${edge.symbol?.escapedName}`)
        }
    }

}

function parseFunctionEdges(
    context: StepTransformerContext, 
    cache: Map<ts.FunctionLikeDeclarationBase, CallGraphNode>,
    path: Set<ts.FunctionLikeDeclarationBase>,
    functionDeclaration: ts.FunctionLikeDeclarationBase): Array<CallGraphNodeEdge> {
    const edges = new Array<CallGraphNodeEdge>();
    let lastAwait: ts.AwaitExpression | undefined;

    // if (cache.has(functionDeclaration)) {
    //     return cache.get(functionDeclaration);
    // }

    const visitCalls = (n: ts.Node): ts.Node => {         
        if (ts.isCallExpression(n)) {

            const symbol = context.checker.getSymbolAtLocation(n.expression);
            const functionBase = getFunctionDefinition(symbol);
            let child: CallGraphNode | undefined;

            console.log(`Func is ${functionBase} ${symbol?.escapedName}`)
            if (functionBase){
                if (cache.has(functionBase)) {
                    child = cache.get(functionBase);
                }
                else {
                    const childEdges = parseFunctionEdges(context, cache, path, functionBase);
                    child = new CallGraphNode(symbol, functionDeclaration, childEdges);
                    cache.set(functionBase, child);
                }
            }

            edges.push({
                await: false,
                callee: child,
                callsite: n,
                symbol: symbol,
            })

            return n;
        }

        if (ts.isAwaitExpression(n)) {
            lastAwait = n;
        }

        context.visitEachChild(n, visitCalls);

        return n;
    };

    context.visitEachChild(functionDeclaration, visitCalls);

    return edges;
}

function getFunctionDefinition(symbol?: ts.Symbol): ts.FunctionLikeDeclarationBase | null {
    if (!symbol || !symbol.declarations || symbol.declarations.length === 0) {
        return null
    }

    const functionDeclarations: Array<ts.FunctionLikeDeclarationBase> = symbol.declarations.filter(x => {
        if (!isFunctionLikeDeclarationBase(x)) {
            return false;
        }

        return x.body;

    }) as Array<ts.FunctionLikeDeclarationBase>;

    return functionDeclarations[0];
}

function isFunctionLikeDeclarationBase(node: ts.Node): node is ts.FunctionLikeDeclarationBase {
    switch (node.kind) {
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ArrowFunction:
            return true;
    }

    return false;
}
