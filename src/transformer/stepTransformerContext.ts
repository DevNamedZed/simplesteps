import * as ts from 'typescript';
import { StepTransformerError } from '../errors';

export default class StepTransformerContext {
    public readonly checker: ts.TypeChecker;
    public readonly errors: Array<StepTransformerError> = [];
    constructor(
        public readonly program: ts.Program,
        public readonly transformationContext: ts.TransformationContext) {
        this.checker = program.getTypeChecker();        
    }

    visitEachChild<TNode extends ts.Node>(node: TNode, visitor: ts.Visitor): TNode {
        return ts.visitEachChild(node, visitor, this.transformationContext);
    }

    visitNodes<TIn extends ts.Node, TInArray extends ts.NodeArray<TIn> | undefined, TOut extends Node>(nodes: TInArray, visitor: ts.Visitor<TIn, ts.Node | undefined>, test: (node: Node) => node is TOut, start?: number, count?: number): ts.NodeArray<TOut> | (TInArray & undefined) {
        ts.visitNodes(nodes, visitor);
        
    }
    // visitNodes<TNode extends ts.Node>(node: TNode, visitor: ts.Visitor): TNode {
    // }

    addError(node: ts.Node, message: string) {
        
    }

    addWarning(node: ts.Node, message: string) {
        
    }


    private addWarningOrError(node: ts.Node) {
        
    }
}