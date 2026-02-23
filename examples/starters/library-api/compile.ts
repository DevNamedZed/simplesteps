import path from 'path';
import { compile } from '@simplesteps/core';
import { AslSerializer } from '@simplesteps/core/asl';

const result = compile({
  sourceFiles: [path.join(__dirname, 'workflow.ts')],
});

if (result.errors.length > 0) {
  for (const err of result.errors) {
    console.error(`${err.file}:${err.line} - ${err.message}`);
  }
  process.exit(1);
}

for (const sm of result.stateMachines) {
  console.log(`--- ${sm.name} ---`);
  console.log(AslSerializer.serialize(sm.definition, 2));
}
