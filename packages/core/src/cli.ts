#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import { compile } from './index.js';
import { AslSerializer } from './asl/index.js';

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
let command = '';
let inputPath = '';
let outputDir = '';
let indent = 2;
let verbose = false;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '-o' || arg === '--output') {
    outputDir = args[++i] ?? '';
  } else if (arg === '--indent') {
    indent = parseInt(args[++i] ?? '2', 10);
  } else if (arg === '-v' || arg === '--verbose') {
    verbose = true;
  } else if (arg === '-h' || arg === '--help') {
    printUsage();
    process.exit(0);
  } else if (!command) {
    command = arg;
  } else if (!inputPath) {
    inputPath = arg;
  }
}

// ---------------------------------------------------------------------------
// Usage
// ---------------------------------------------------------------------------

function printUsage(): void {
  console.log(`
Usage: simplesteps compile <file-or-tsconfig> [options]

Options:
  -o, --output <dir>   Write .asl.json files to this directory
  --indent <N>         JSON indentation (default: 2)
  -v, --verbose        Verbose output
  -h, --help           Show this help message

Examples:
  simplesteps compile src/workflow.ts
  simplesteps compile tsconfig.json -o dist/
  simplesteps compile src/workflow.ts --indent 4
`.trim());
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

if (command !== 'compile' || !inputPath) {
  if (!command && !inputPath) {
    printUsage();
    process.exit(0);
  }
  console.error(`Error: Expected 'simplesteps compile <file-or-tsconfig>'`);
  printUsage();
  process.exit(1);
}

const resolvedInput = path.resolve(inputPath);

// Detect whether input is a tsconfig or a source file
const isTsConfig = path.basename(resolvedInput).startsWith('tsconfig');

const result = compile(
  isTsConfig
    ? { tsconfigPath: resolvedInput, cwd: path.dirname(resolvedInput) }
    : { sourceFiles: [resolvedInput] },
);

// Report errors
if (result.errors.length > 0) {
  for (const err of result.errors) {
    const loc = err.file ? `${err.file}:${err.line}:${err.column}` : '<unknown>';
    console.error(`${err.severity === 'error' ? 'ERROR' : 'WARN'} [${err.code}] ${loc} — ${err.message}`);
  }
  if (result.errors.some(e => e.severity === 'error')) {
    process.exit(1);
  }
}

if (result.stateMachines.length === 0) {
  console.error('No state machines found.');
  process.exit(1);
}

// Output
for (const sm of result.stateMachines) {
  const json = AslSerializer.serialize(sm.definition, indent);

  if (outputDir) {
    const resolvedOutputDir = path.resolve(outputDir);
    fs.mkdirSync(resolvedOutputDir, { recursive: true });
    const outFile = path.join(resolvedOutputDir, `${sm.name}.asl.json`);
    fs.writeFileSync(outFile, json + '\n', 'utf-8');
    if (verbose) {
      console.log(`Wrote ${outFile}`);
    }
  } else {
    // Print to stdout
    if (result.stateMachines.length > 1) {
      console.log(`\n--- ${sm.name} ---`);
    }
    console.log(json);
  }
}

if (verbose) {
  console.log(`\nCompiled ${result.stateMachines.length} state machine(s).`);
}
