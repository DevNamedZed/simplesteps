# AWS CDK vs SimpleSteps — Side-by-Side Comparison

Each directory contains two files showing the **complete** code for both approaches:

- **`cdk.ts`** — Full CDK stack: all imports, resource constructs, Lambda functions, permissions, state machine definition
- **`simplesteps.ts`** — Full SimpleSteps workflow: imports, service declarations, workflow function

This is what a real developer writes. No abbreviation, no cherry-picking.

## Line Count Comparison

| # | Example | CDK Lines | SimpleSteps Lines | Reduction |
|---|---------|-----------|-------------------|-----------|
| 01 | Hello World | 41 | 17 | 59% |
| 02 | Job Poller | 73 | 32 | 56% |
| 04 | Saga Pattern | 126 | 72 | 43% |
| 05 | Checkout Processing | 130 | 68 | 48% |
| 06 | Parallel Processing | 91 | 39 | 57% |
| 08 | Wait for Callback | 102 | 52 | 49% |
| 10 | DynamoDB CRUD | 100 | 51 | 49% |
| 15 | S3 Data Processing | 95 | 36 | 62% |
| 16 | Secrets & Config | 85 | 40 | 53% |
| 21 | Human Approval | 110 | 55 | 50% |
| 29 | Multi-Catch with Retry | 131 | 63 | 52% |
| 30 | ETL Pipeline | 143 | 60 | 58% |
| | **Average** | **102** | **49** | **53%** |

## What Makes CDK Verbose

1. **Infrastructure boilerplate** — Every Lambda needs `runtime`, `handler`, `code`. Every DynamoDB table needs `partitionKey`. These constructs exist only for CDK.

2. **No abstraction for most services** — CDK has typed constructs for Lambda, SQS, and SNS only. DynamoDB (with expressions), S3, Secrets Manager, and SSM all require `sfn.CustomState` with raw ASL JSON — no type safety, no autocompletion.

3. **Manual permission grants** — Every `grantInvoke()`, `grantReadWriteData()`, `grantSendMessages()` must be written explicitly.

4. **Explicit state wiring** — `.next()`, `.addCatch()`, `.addRetry()`, `sfn.Choice().when().otherwise()` chains replace natural `if/else`, `try/catch`, `while`, and `Promise.all`.

5. **JSONPath string references** — `'$.field'`, `sfn.JsonPath.stringAt(...)` replace natural variable access.

## What SimpleSteps Eliminates

- No infrastructure constructs (Lambda, Table, Queue definitions)
- No `sfn.CustomState` with raw JSON — typed methods for all 10 services
- No manual permission grants
- No `.next()` chains — sequential statements
- No `sfn.Choice` — `if/else` and `switch/case`
- No `sfn.Wait` — `Steps.delay()`
- No `sfn.Parallel` — `Promise.all()`
- No `sfn.Map` — `for...of` loops
- No JSONPath strings — variable names
- No `addCatch/addRetry` — `try/catch` and retry options

## Feature Coverage

These 12 examples cover every major Step Functions feature:

| Feature | Examples |
|---------|----------|
| Lambda invocation | 01, 02, 04, 05, 06, 08, 21, 29, 30 |
| DynamoDB operations | 05, 10, 30 |
| SQS messaging | 05, 08, 21 |
| SNS notifications | 05, 21, 29, 30 |
| S3 operations | 15, 30 |
| Secrets Manager | 16 |
| SSM Parameter Store | 16 |
| Loops / polling | 02 |
| Parallel execution | 06 |
| Error handling / retry | 04, 29 |
| Wait for callback | 08, 21 |
| Branching / conditions | 02, 05, 08, 21, 29 |
| Map iteration | 30 |
| Intrinsic functions | 30 |
