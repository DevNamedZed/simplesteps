import path from 'path';
import * as ts from 'typescript';
import StepTransformerContext from '../stepTransformerContext';

const StepFuctionFactoryClassName = "Step"
const StepFunctionFactoryMethodName = "createFunction"
const LibraryFolder = path.resolve(path.join(__dirname, "../.."));

export type StepFunctionCandidate = {
    readonly file: ts.SourceFile;
    readonly call: ts.CallExpression;    
}

type StepFunctionFactoryReference = {
    readonly import: ts.ImportDeclaration;
    readonly moduleAlias?: string;
}

export function findCandidates(context: StepTransformerContext, file: ts.SourceFile) {
    const factoryReferences = new Array<StepFunctionFactoryReference>();
    const candidates = new Array<StepFunctionCandidate>();
    const importVisitor = (node: ts.Node): ts.Node => checkForImports(file, node, factoryReferences);
    context.visitEachChild(file, importVisitor)

    if (factoryReferences.length !== 0) {
        return candidates;
    }

    return candidates;
}


function checkForImports (file: ts.SourceFile, node: ts.Node, results: Array<StepFunctionFactoryReference>) {
    if (!ts.isImportDeclaration(node)) {
        return node;
    }
    const bindings = node.importClause?.namedBindings;
    if (!bindings) {
        return node;
    }

    const importFileName = node.moduleSpecifier.getText(file).replace(/['"`]/g, '');
    if (doesModuleExportStepFactory(importFileName)) {
        return node;
    }

    if (ts.isNamespaceImport(bindings)) {
        results.push({
            import: node,
            moduleAlias: bindings.name.text
        })
    }
    else if (ts.isNamedImports(bindings)) {
        const names = bindings.elements.map(element => element.name.text);
        if (names.includes(StepFuctionFactoryClassName)) {
            results.push({ import: node })
        }
    }

    return node;
}

function doesModuleExportStepFactory(modulePath: string): boolean {
    const absoluteModulePath = path.resolve(modulePath);
    if (!absoluteModulePath.startsWith(LibraryFolder)) {
        return false;
    }

    const baseName = path.basename(absoluteModulePath);
    if (baseName === "Steps.ts") {
        return true;
    }
    else if (baseName === "runtime") {
        return true;
    }
    else if (baseName == path.basename(absoluteModulePath)) {
        return true;
    }

    return false;
}
