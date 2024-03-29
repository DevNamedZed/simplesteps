import * as ts from 'typescript';

export default function dumpAstTransformer(program: ts.Program): ts.TransformerFactory<ts.Node> {
    
    return (context: ts.TransformationContext) => {
        let indent = 0;
        const found = new Array<ts.Symbol>();
        const transformer = (sourceFile: ts.Node): ts.Node => {
            if (ts.isSourceFile(sourceFile)) {
                console.log(`File: ${sourceFile.fileName}`)
            }

            function visitor(node: ts.Node): ts.Node {
                const name = program.getTypeChecker().getSymbolAtLocation(node)?.escapedName;
                if (name === "createFunction") {
                    found.push(program.getTypeChecker().getSymbolAtLocation(node)!)
                }


                console.log('    '.repeat(indent), node.kind, `\t# ts.SyntaxKind.${ts.SyntaxKind[node.kind]} ${node.getFullText(sourceFile as ts.SourceFile).replace('\n', '').replace('\r', '')}`);
                // console.log(`${'    '.repeat(indent)}Symbol: ${program.getTypeChecker().getSymbolAtLocation(node)?.escapedName}`)
                indent++;
                const result =  ts.visitEachChild(node, visitor, context);
                indent--;
                return result;
            }

            ts.visitEachChild(sourceFile, visitor, context);
            // console.log(found)
            // console.log(found[0] == found[1])
            // console.log(found[2] == found[1])

            return sourceFile;
        };

        // Return the transformer function, which will be invoked by TypeScript during the emit phase
        return transformer;
    };
}