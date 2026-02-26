# CLI Reference

The CLI is for local development and testing. For production deployments, use the [CDK integration](./cdk-integration.md) or the [library API](./library-api.md).

The `simplesteps` CLI is provided by `@simplesteps/core`.

## Usage

```
simplesteps compile <file-or-tsconfig> [options]
```

## Options

| Flag | Description | Default |
|---|---|---|
| `-o, --output <dir>` | Write `.asl.json` files to this directory | stdout |
| `--query-language <jsonata\|jsonpath>` | ASL query language | `jsonata` |
| `--indent <N>` | JSON indentation spaces | `2` |
| `-v, --verbose` | Verbose output | off |
| `-h, --help` | Show help | |

## Examples

```bash
# Compile a single file, print ASL to stdout
npx simplesteps compile src/workflow.ts

# Compile to a directory
npx simplesteps compile src/workflow.ts -o dist/

# Compile an entire project
npx simplesteps compile tsconfig.json -o dist/

# Custom indentation
npx simplesteps compile src/workflow.ts --indent 4

# Compile with JSONPath instead of JSONata (default)
npx simplesteps compile src/workflow.ts --query-language jsonpath
```

## Input Detection

The CLI auto-detects whether the input is a tsconfig or a source file based on the filename. Files starting with `tsconfig` are treated as project configs; everything else is treated as a source file.

## Output

When using `-o`, each state machine produces a separate file:

```
output/
  myWorkflow.asl.json
  anotherWorkflow.asl.json
```

The filename is derived from the variable name assigned to `Steps.createFunction()`.

When multiple state machines exist and no `-o` is specified, each is printed to stdout with a `--- name ---` separator.

## `declare const` Variables

Workflow files typically use `declare const` placeholders for resource ARNs and names (see [Getting Started](./getting-started.md)). The CLI does not provide a mechanism to supply bindings for these variables.

When compiling with the CLI, any `declare const` variables without bindings are left as literal placeholder strings in the ASL output (e.g., `"validateOrderArn"` appears as-is in the `Resource` field). This makes the CLI useful for reviewing the structure of generated state machines, but the output is not directly deployable without replacing the placeholders.

To supply real values for `declare const` variables, use the [CDK integration](./cdk-integration.md) (via `bindings`) or the [library API](./library-api.md) (via `substitutions`).

## Programmatic-Only Options

The following compile options are available via the [library API](./library-api.md) but not the CLI:

- `sourceMap` — Add source `file:line` to ASL `Comment` fields for debugging
- `version` — Set the ASL `Version` field
- `timeoutSeconds` — Set global state machine execution timeout

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | Success |
| `1` | Compilation errors or no state machines found |
