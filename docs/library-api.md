# Library API

For custom deployment pipelines -- Terraform, SAM, Pulumi, or anything outside CDK that needs ASL JSON as a build artifact. The library API gives you programmatic access to the compiler so you can integrate SimpleSteps into your own toolchain.

Use the compiler programmatically from Node.js.

```bash
npm install @simplesteps/core
```

## `compile()`

The primary entry point. Returns all compiled state machines and diagnostics.

```typescript
import { compile } from '@simplesteps/core';
import { AslSerializer } from '@simplesteps/core/asl';

const result = compile({ sourceFiles: ['workflow.ts'] });

if (result.errors.length > 0) {
  for (const err of result.errors) {
    console.error(`${err.file}:${err.line} - ${err.message}`);
  }
  process.exit(1);
}

for (const sm of result.stateMachines) {
  const json = AslSerializer.serialize(sm.definition);
  console.log(json);
}
```

### `CompileOptions`

```typescript
interface CompileOptions {
  tsconfigPath?: string;       // Path to tsconfig.json
  sourceFiles?: string[];      // Specific files to compile
  cwd?: string;                // Working directory (default: process.cwd())
  substitutions?: Record<string, unknown>;  // Deploy-time value overrides
}
```

Provide either `tsconfigPath` (compile a project) or `sourceFiles` (compile specific files). If both are provided, `sourceFiles` takes precedence.

> **Note on naming:** The library API calls these `substitutions`, while the [CDK integration](./cdk-integration.md) calls them `bindings`. They do the same thing — replace `declare const` variable names with real values. The CDK construct maps its `bindings` prop to `substitutions` internally. The different names reflect the different layers: "bindings" is a CDK/infrastructure term (binding a resource to a placeholder), while "substitutions" is a compiler term (substituting a value for a name).

### `CompileResult`

```typescript
interface CompileResult {
  stateMachines: CompiledStateMachine[];  // Successfully compiled machines
  errors: CompilerDiagnostic[];           // Errors and warnings
}
```

### `CompiledStateMachine`

```typescript
interface CompiledStateMachine {
  name: string;                          // Derived from variable name
  source: string;                        // Source file path
  definition: StateMachineDefinition;    // The ASL definition
  services: string[];                    // Referenced AWS services
}
```

## `SimpleSteps` Fluent API

A convenience wrapper for common use cases.

```typescript
import { SimpleSteps } from '@simplesteps/core';

// Single file -> single state machine definition
const definition = SimpleSteps.fromFile('workflow.ts')
  .toStateMachine();

// With deploy-time substitutions
const definition = SimpleSteps.fromFile('workflow.ts')
  .withSubstitutions({
    myLambda: 'arn:aws:lambda:us-east-1:123:function:MyFn',
  })
  .toStateMachine();

// Entire project -> all state machines
const machines = SimpleSteps.fromProject('./tsconfig.json')
  .toStateMachines();

// Get full result with diagnostics (does not throw)
const result = SimpleSteps.fromFile('workflow.ts')
  .toResult();
```

`toStateMachine()` and `toStateMachines()` throw `SimpleStepsCompileError` on compilation errors. Use `toResult()` if you want to handle errors yourself.

## `AslSerializer`

Serialize ASL definitions to JSON.

```typescript
import { AslSerializer } from '@simplesteps/core/asl';

// To JSON string
const json = AslSerializer.serialize(definition, 2);

// To plain object (for embedding in templates)
const obj = AslSerializer.serializeToObject(definition);
```

## Package Exports

| Import Path | Exports |
|---|---|
| `@simplesteps/core` | `compile()`, `SimpleSteps`, `SimpleStepsBuilder`, `SimpleStepsCompileError` |
| `@simplesteps/core/runtime` | `Steps`, `SimpleStepContext`, `StepException`, error classes |
| `@simplesteps/core/runtime/services` | `Lambda`, `DynamoDB`, `S3`, `SQS`, `SNS`, `StepFunction`, `EventBridge`, `SecretsManager`, `SSM` |
| `@simplesteps/core/asl` | `AslSerializer`, `AslParser`, `AslValidator`, ASL type definitions |

For full type signatures, see [`spec/public-api.md`](../spec/public-api.md).
