import * as ts from 'typescript';

export default function dumpAstTransformer(program: ts.Program): ts.TransformerFactory<ts.Node> {
    console.log(arguments.length)
    console.log(program)
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