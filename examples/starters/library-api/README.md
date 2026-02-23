# SimpleSteps Library API Starter

Compile a SimpleSteps workflow programmatically using the `compile()` API.

## Setup

```bash
npm install
```

## Compile

```bash
npx tsx compile.ts
```

Prints the compiled ASL JSON to stdout.

## Files

- `workflow.ts` -- A minimal workflow that invokes a Lambda function
- `compile.ts` -- Script that calls `compile()` and `AslSerializer.serialize()`
