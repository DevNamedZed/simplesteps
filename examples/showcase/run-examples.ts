/**
 * Compile all showcase examples and write ASL JSON to output/.
 *
 * Usage: npx tsx examples/showcase/run-examples.ts
 */
import path from 'path';
import fs from 'fs';
import { compile, AslSerializer } from '../../packages/core/src/index';

const EXAMPLES_DIR = path.resolve(__dirname);
const OUTPUT_DIR = path.join(EXAMPLES_DIR, 'output');

const examples = [
  '01-sequential.ts',
  '02-if-else.ts',
  '03-early-return.ts',
  '04-while-loop.ts',
  '05-for-each.ts',
  '06-try-catch.ts',
  '07-multi-service.ts',
  '08-wait-and-continue.ts',
  '09-switch-case.ts',
  '10-and-or-conditions.ts',
  '11-sqs-queue.ts',
  '12-eventbridge.ts',
  '13-dynamodb-crud.ts',
  '14-nested-conditions.ts',
  '15-dynamic-wait.ts',
  '16-multi-step-function.ts',
  '17-intrinsics.ts',
  '18-js-operators.ts',
  '19-parallel.ts',
  '20-string-interpolation.ts',
  '21-constants.ts',
  '22-js-patterns.ts',
  '23-s3.ts',
  '24-secrets-manager.ts',
  '25-ssm.ts',
  '26-step-function-nested.ts',
  '27-lambda-patterns.ts',
  '28-aws-sdk-escape-hatch.ts',
  '29-context-object.ts',
  '30-substeps.ts',
  '31-steps-map.ts',
  '32-deferred-await.ts',
  '33-retry-timeout.ts',
];

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

let failures = 0;

for (const example of examples) {
  const filePath = path.join(EXAMPLES_DIR, example);
  const result = compile({ sourceFiles: [filePath] });

  if (result.errors.length > 0) {
    console.error(`FAIL  ${example}`);
    for (const err of result.errors) {
      console.error(`      [${err.code}] ${err.message}`);
    }
    failures++;
    continue;
  }

  if (result.stateMachines.length === 0) {
    console.error(`FAIL  ${example} — no state machines found`);
    failures++;
    continue;
  }

  for (const sm of result.stateMachines) {
    const json = AslSerializer.serialize(sm.definition);
    const outFile = path.join(OUTPUT_DIR, `${sm.name}.asl.json`);
    fs.writeFileSync(outFile, json + '\n', 'utf-8');
    console.log(`  OK  ${example} → output/${sm.name}.asl.json`);
  }
}

console.log(`\n${examples.length - failures}/${examples.length} compiled → examples/showcase/output/`);
if (failures > 0) {
  process.exit(1);
}
