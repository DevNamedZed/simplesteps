/**
 * Compile all CDK comparison SimpleSteps examples and write ASL JSON to output/.
 *
 * Usage: npx tsx examples/aws-cdk-comparison/run-examples.ts
 */
import path from 'path';
import fs from 'fs';
import { compile, AslSerializer } from '../../packages/core/src/index';

const EXAMPLES_DIR = path.resolve(__dirname);
const OUTPUT_DIR = path.join(EXAMPLES_DIR, 'output');

// Find all example directories with simplesteps.ts
const dirs = fs.readdirSync(EXAMPLES_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .filter(d => d.name !== 'output')
  .sort((a, b) => a.name.localeCompare(b.name));

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

let failures = 0;
let total = 0;

for (const dir of dirs) {
  const ssFile = path.join(EXAMPLES_DIR, dir.name, 'simplesteps.ts');
  if (!fs.existsSync(ssFile)) continue;

  total++;
  const result = compile({ sourceFiles: [ssFile] });

  if (result.errors.length > 0) {
    console.error(`  FAIL  ${dir.name}/simplesteps.ts`);
    for (const err of result.errors) {
      console.error(`        [${err.code}] ${err.file}:${err.line} — ${err.message}`);
    }
    failures++;
    continue;
  }

  if (result.stateMachines.length === 0) {
    console.error(`  FAIL  ${dir.name}/simplesteps.ts — no state machines found`);
    failures++;
    continue;
  }

  for (const sm of result.stateMachines) {
    const json = AslSerializer.serialize(sm.definition);
    const outFile = path.join(OUTPUT_DIR, `${dir.name}.asl.json`);
    fs.writeFileSync(outFile, json + '\n', 'utf-8');
    console.log(`  OK    ${dir.name}/simplesteps.ts → output/${dir.name}.asl.json`);
  }
}

console.log(`\n${total - failures}/${total} compiled → examples/aws-cdk-comparison/output/`);
if (failures > 0) {
  process.exit(1);
}
