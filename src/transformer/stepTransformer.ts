import * as ts from 'typescript';
import StepTransformerContext from './stepTransformerContext';
import { findCallSites } from './analysis/callSiteLocator';
import { logger } from './logger'
import { createCallGraph, debugPrint } from './analysis/callGraph';

export default function stepTransformer(program: ts.Program): ts.TransformerFactory<ts.Node> {    
    // TODO: root level context that evalatuates instrinisic once for all files
    return (transformationContext: ts.TransformationContext) => {
        const context = new StepTransformerContext(program, transformationContext);

        const transformer = (sourceFile: ts.Node): ts.Node => {
            if (!ts.isSourceFile(sourceFile)) {
                // This should always be a source file. The ts compiler API
                // will call the transformer once per source files. It is up to the
                // transformer to futher travese the file.
                throw new Error("A source file was expected!")
            }

            // Find calls to the StepFunction factory method. 
            const callSites = findCallSites(context, sourceFile); 
            if (callSites.length === 0) {
                logger.debug(`No callsites found in file. Name: ${sourceFile.fileName}`)
                return sourceFile;
            }

            logger.info(`Found callsites in file. Name: ${sourceFile.fileName}`)
            for (let callsite of callSites) {
                const callGraph = createCallGraph(context, callsite)
                debugPrint(callGraph)
            }

            // console.log(callSites)
            // 
            // Create call graph
            // perform data flow analysis - ssa?
            // create control flow
            // Create step flow
            // transform to asl
            // transform to code


            function visitor(node: ts.Node): ts.Node {
                // console.log(node.kind, `\t# ts.SyntaxKind.${ts.SyntaxKind[node.kind]}`);
                return ts.visitEachChild(node, visitor, transformationContext);
            }

            return ts.visitEachChild(sourceFile, visitor, transformationContext);
        };

        // Return the transformer function, which will be invoked by TypeScript during the emit phase
        return transformer;
    };
}