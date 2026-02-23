// compiler-bridge.ts — Bridge between the Monaco editor and the SimpleSteps compiler.
//
// Creates a virtual TypeScript CompilerHost backed by an in-memory file map,
// builds a ts.Program, then delegates to compileFromProgram().

import ts from 'typescript';
import {
  compileFromProgram,
  AslSerializer,
  type CompileResult,
  type CompilerDiagnostic,
} from '@simplesteps/core';
import { buildVirtualFiles, RUNTIME_PATH, SERVICES_DIR } from './virtual-fs';

/** Result returned to the UI layer. */
export interface CompileBridgeResult {
  readonly json: string;
  readonly errors: readonly CompilerDiagnostic[];
  readonly stateMachineCount: number;
}

// ── Virtual CompilerHost ─────────────────────────────────────────────────

function resolveVirtualPath(containingFile: string, specifier: string): string {
  // Handle relative imports from the user file or between runtime files
  if (!specifier.startsWith('.')) return specifier;

  // Get the directory of the containing file
  const parts = containingFile.split('/');
  parts.pop(); // drop filename
  const dir = parts.join('/');

  // Resolve the relative path
  const segments = `${dir}/${specifier}`.split('/');
  const resolved: string[] = [];
  for (const seg of segments) {
    if (seg === '' || seg === '.') continue;
    if (seg === '..') {
      resolved.pop();
      continue;
    }
    resolved.push(seg);
  }

  let path = '/' + resolved.join('/');

  // Add .ts extension if missing
  if (!path.endsWith('.ts')) {
    path += '.ts';
  }
  return path;
}

function createVirtualHost(files: Record<string, string>): ts.CompilerHost {
  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ES2022,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    noLib: true,
  };

  const sourceFiles = new Map<string, ts.SourceFile>();

  const host: ts.CompilerHost = {
    getSourceFile(fileName, languageVersion) {
      if (sourceFiles.has(fileName)) return sourceFiles.get(fileName)!;
      const content = files[fileName];
      if (content == null) return undefined;
      const sf = ts.createSourceFile(fileName, content, languageVersion, true);
      sourceFiles.set(fileName, sf);
      return sf;
    },
    getDefaultLibFileName: () => '/lib/lib.shim.d.ts',
    writeFile: () => {},
    getCurrentDirectory: () => '/',
    getCanonicalFileName: (f: string) => f,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => '\n',
    fileExists: (fileName: string) => fileName in files,
    readFile: (fileName: string) => files[fileName] ?? undefined,

    resolveModuleNameLiterals(moduleLiterals, containingFile) {
      return moduleLiterals.map((literal) => {
        const name = literal.text;
        const resolved = resolveVirtualPath(containingFile, name);
        if (resolved in files) {
          return {
            resolvedModule: {
              resolvedFileName: resolved,
              isExternalLibraryImport: false,
              extension: ts.Extension.Ts,
            },
          };
        }
        // Try without .ts (for index files)
        const asIndex = resolved.replace(/\.ts$/, '/index.ts');
        if (asIndex in files) {
          return {
            resolvedModule: {
              resolvedFileName: asIndex,
              isExternalLibraryImport: false,
              extension: ts.Extension.Ts,
            },
          };
        }
        return { resolvedModule: undefined };
      });
    },
  };

  return host;
}

// ── Public API ────────────────────────────────────────────────────────────

export function compileFromFiles(userFiles: Record<string, string>): CompileBridgeResult {
  const files = buildVirtualFiles(userFiles);
  const host = createVirtualHost(files);

  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ES2022,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    noLib: true,
  };

  const program = ts.createProgram(
    Object.keys(files),
    compilerOptions,
    host,
  );

  const result: CompileResult = compileFromProgram({
    program,
    runtimePath: RUNTIME_PATH,
    servicesDir: SERVICES_DIR,
    skipPatterns: ['/virtual/runtime/', '/lib/lib.shim'],
  });

  // Serialize each state machine and combine
  const outputs: string[] = [];
  for (const sm of result.stateMachines) {
    const json = AslSerializer.serialize(sm.definition, 2);
    if (result.stateMachines.length > 1) {
      outputs.push(`// ${sm.name}\n${json}`);
    } else {
      outputs.push(json);
    }
  }

  const json = outputs.length > 0
    ? outputs.join('\n\n')
    : result.errors.length > 0
      ? '// Compilation failed — see errors below'
      : '// No state machines found';

  return {
    json,
    errors: result.errors,
    stateMachineCount: result.stateMachines.length,
  };
}

export function compileFromString(code: string): CompileBridgeResult {
  return compileFromFiles({ 'user.ts': code });
}
