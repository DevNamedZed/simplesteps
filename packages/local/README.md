# @simplesteps/local

[![npm](https://img.shields.io/npm/v/@simplesteps/local)](https://www.npmjs.com/package/@simplesteps/local)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/DevNamedZed/simplesteps/blob/main/LICENSE)

Local execution runtime for [SimpleSteps](https://github.com/DevNamedZed/simplesteps). Compile TypeScript workflows to ASL with `@simplesteps/core`, then run and test them locally with mock services — no AWS account needed.

## Install

```bash
npm install @simplesteps/local
```

## Usage

```typescript
import { compile } from '@simplesteps/core';
import { LocalRunner } from '@simplesteps/local';

// Compile your workflow
const result = compile({ sourceFiles: ['workflow.ts'] });
const asl = result.stateMachines[0].asl;

// Execute locally with mock services
const runner = new LocalRunner(asl, {
  services: {
    'arn:aws:lambda:us-east-1:123456789:function:MyFn': async (input) => {
      return { status: 'ok' };
    },
  },
});

const output = await runner.execute({ orderId: '123' });
console.log(output);
```

### Execution Traces

Use `executeWithTrace` to inspect the full state-by-state execution path:

```typescript
const { output, trace } = await runner.executeWithTrace({ orderId: '123' });

for (const entry of trace.states) {
  console.log(`${entry.name} (${entry.type})`);
}
```

## Features

- Supports all 8 ASL state types (Task, Pass, Choice, Wait, Succeed, Fail, Parallel, Map)
- Both JSONata and JSONPath query languages
- All 18 `States.*` intrinsic functions
- Choice state comparison operators and compound rules
- Full data flow pipeline (InputPath, Parameters, ResultSelector, ResultPath, OutputPath)
- Error handling (Catch/Retry)
- Execution tracing for test assertions

## Documentation

- [Getting Started](https://github.com/DevNamedZed/simplesteps/blob/main/docs/getting-started.md)
- [Language Reference](https://github.com/DevNamedZed/simplesteps/blob/main/docs/language-reference.md)

[Playground](https://devnamedzed.github.io/simplesteps/) | [GitHub](https://github.com/DevNamedZed/simplesteps)

## License

MIT
