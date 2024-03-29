import * as ts from 'typescript';
import StepTransformerContext from '../stepTransformerContext';

export function getFunctionDeclarationFromNode(context: StepTransformerContext, node: ts.Node): ts.FunctionLikeDeclarationBase | null {
    return getFunctionDeclarationFromSymbol(context.checker.getSymbolAtLocation(node));
}

export function getFunctionDeclarationFromSymbol(symbol?: ts.Symbol): ts.FunctionLikeDeclarationBase | null {
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

export function isFunctionLikeDeclarationBase(node: ts.Node): node is ts.FunctionLikeDeclarationBase {
    switch (node.kind) {
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ArrowFunction:
            return true;
    }

    return false;
}
