import * as ts from 'typescript';

export default function stepTransformer(program: ts.Program): ts.TransformerFactory<ts.Node> {
    
    return (context: ts.TransformationContext) => {
        const transformer = (sourceFile: ts.Node): ts.Node => {
            if (ts.isSourceFile(sourceFile)) {
                console.log(`File: ${sourceFile.fileName}`)
            }
            function visitor(node: ts.Node): ts.Node {
                console.log(node.kind, `\t# ts.SyntaxKind.${ts.SyntaxKind[node.kind]}`);
                return ts.visitEachChild(node, visitor, context);
            }

            return ts.visitEachChild(sourceFile, visitor, context);
        };

        // Return the transformer function, which will be invoked by TypeScript during the emit phase
        return transformer;
    };
}

// import * as ts from 'typescript';


// export default function createStepTransformer(): ts.TransformerFactory<ts.SourceFile> {
//     return function(context) {

//     }
// }

// const stepTransformer: ts.TransformerFactory<ts.SourceFile> = context => {
//   return sourceFile => {
//     const visitor = (node: ts.Node): ts.Node => {
//       if (ts.isVariableDeclarationList(node)) {
//         ts.create
//         return ts.updateVariableDeclarationList(node, [
//           ...node.declarations,
//           ts.createVariableDeclaration(
//             ts.createUniqueName('hello'),
//             undefined,
//             ts.createStringLiteral('world')
//           ),
//         ]);
//       }

//       return ts.visitEachChild(node, visitor, context);
//     };

//     return ts.visitNode(sourceFile, visitor);
//   };
// };

// // export default stepTransformer;

import * as ts from 'typescript';
function uppercaseStringLiteralsTransformer(): ts.TransformerFactory<ts.Node> {
    // The 'context' provides necessary methods for transformation
    return (context: ts.TransformationContext) => {
        // The 'transformer' function receives a SourceFile and is expected to return a transformed SourceFile
        const transformer = (sourceFile: ts.N): ts.SourceFile => {
            // A 'visitor' function is used to inspect and potentially replace or update each node in the AST
            function visitor(node: ts.Node): ts.Node {
                // Here's the specific transformation: if the node is a string literal, convert its text to uppercase
                if (ts.isStringLiteral(node)) {
                    return ts.factory.createStringLiteral(node.text.toUpperCase());
                }
                // For all other nodes, analyze their children and apply any transformations recursively
                return ts.visitEachChild(node, visitor, context);
            }

            // Start the transformation with the top-level node, which is the SourceFile itself
            return ts.visitNode(sourceFile, visitor);
        };

        // Return the transformer function, which will be invoked by TypeScript during the emit phase
        return transformer;
    };
}
export function uppercaseStringLiteralsTransformer(context: ts.TransformationContext): ts.Transformer<ts.SourceFile> {
    const visit: ts.Visitor = (node: ts.Node): ts.VisitResult<ts.Node> => {
        // if (!ts.isSourceFile(node)) {
        //     return ts.visitEachChild(node, child => visit(child), context);
        // }

        ts.factory.createBinaryExpression()
        // Check if this is a string literal
        if (ts.isStringLiteral(node)) {
            // Change the text of the string literal to uppercase
            return ts.factory.createStringLiteral(node.text.toUpperCase());
        }
        // Continue visiting the rest of the AST
        return ts.visitEachChild(node, child => visit(child), context);
    };

    return (n: ts.SourceFile) => n;
    // Return the transformer function
    return (node: ts.SourceFile) => ts.visitNode(node, visit);

}

// const transformer = (ctx: ts.TransformationContext) => (sourceFile: ts.SourceFile): ts.SourceFile => {
    
    
    
//     ts.visitEachChild()
//     function paramVisitor(baseMethod: ts.MethodDeclaration) {
//         return (node: ts.Node): Node => {
//             if (ts.isTypeReferenceNode(node)) {
//                 baseMethod.
//                 const typeParam = baseMethod.typeParameters.find(t => t.name.escapedText === (node.typeName as ts.Identifier).escapedText);
//                 if (typeParam) return typeParam.constraint;
//             }

//             return ts.visitEachChild(node, paramVisitor(baseMethod), ctx);
//         };
//     }
// // ts.factory.updateMethodDeclaration
//     const visit = (node: ts.Node): ts.Node => {
//         if (ts.isMethodDeclaration(node))
//             return ts.updateMethod(
//                 node,
//                 node.decorators,
//                 node.modifiers,
//                 node.asteriskToken,
//                 node.name,
//                 node.questionToken,
//                 node.typeParameters,
//                 ts.visitNodes(node.parameters, paramVisitor(node)),
//                 node.type,
//                 node.body
//             );

//         return ts.visitEachChild(node, visit, ctx);
//     };

//     return ts.visitNode(sourceFile, visit);
// };