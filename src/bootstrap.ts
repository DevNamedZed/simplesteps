import * as ts from 'typescript';
import * as path from 'path';
import * as fs from 'fs';

// Import your custom transformers
import customTransformer from './your-custom-transformer';

function compile(configFilePath: string) {
    // Load the configuration file
    const configFile = ts.readConfigFile(configFilePath, ts.sys.readFile);
    const parsedCommandLine = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(configFilePath));

    // Prepare the compiler host
    const compilerHost = ts.createCompilerHost(parsedCommandLine.options, true);

    // Create the program
    const program = ts.createProgram({
        rootNames: parsedCommandLine.fileNames,
        options: parsedCommandLine.options,
        host: compilerHost,
    });

    // Inject custom transformers
    const customTransformers: ts.CustomTransformers = {
        before: [customTransformer(program)],
        after: [],
    };

    // Perform the compilation
    const emitResult = program.emit(undefined, undefined, undefined, undefined, customTransformers);

    // Check for and report any errors
    const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
    allDiagnostics.forEach(diagnostic => {
        if (diagnostic.file) {
            const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        } else {
            console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
        }
    });

    const exitCode = emitResult.emitSkipped ? 1 : 0;
    console.log(`Process exiting with code '${exitCode}'.`);
    process.exit(exitCode);
}

// Assuming the TypeScript config file is 'tsconfig.json' in the current directory
// You can modify this to accept command line arguments if needed
compile('./tsconfig.json');
