# SimpleSteps CLI Starter

Compile a SimpleSteps workflow to ASL JSON using the CLI.

## Setup

```bash
npm install
```

## Compile

```bash
npx simplesteps compile workflow.ts -o output/
```

Produces `output/hello.asl.json`.

## Files

- `workflow.ts` -- A minimal workflow that invokes a Lambda function
- `output/` -- Compiled ASL JSON output (generated)
