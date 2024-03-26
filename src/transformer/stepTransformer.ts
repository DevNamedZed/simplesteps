import * as ts from 'typescript';
import StepTransformerContext from './stepTransformerContext';
import { findCallSites } from './callSiteLocator';
import { logger } from './logger'

export default function stepTransformer(program: ts.Program): ts.TransformerFactory<ts.Node> {    
    // TODO: root level context that evalatuates instrinisic once for all files
    return (context: ts.TransformationContext) => {
        const stepTransformerContext = new StepTransformerContext(program, context);

        const transformer = (sourceFile: ts.Node): ts.Node => {
            if (!ts.isSourceFile(sourceFile)) {
                // This should always be a source file. The ts compiler API
                // will call the transformer once per source files. It is up to the
                // transformer to futher travese the file.
                throw new Error("A source file was expected!")
            }

            // Find calls to the StepFunction factory method. 
            const callSites = findCallSites(stepTransformerContext, sourceFile); 
            if (callSites.length === 0) {
                logger.debug(`No callsites found in file. Name: ${sourceFile.fileName}`)
                return sourceFile;
            }

            logger.info(`Found callsites in file. Name: ${sourceFile.fileName}`)

            function visitor(node: ts.Node): ts.Node {
                // console.log(node.kind, `\t# ts.SyntaxKind.${ts.SyntaxKind[node.kind]}`);
                return ts.visitEachChild(node, visitor, context);
            }

            return ts.visitEachChild(sourceFile, visitor, context);
        };

        // Return the transformer function, which will be invoked by TypeScript during the emit phase
        return transformer;
    };
}