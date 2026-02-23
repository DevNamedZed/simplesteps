# AWS CDK vs CDK + SimpleSteps — Side-by-Side Comparison

Each directory contains two **complete CDK stacks** for the same workflow:

- **`cdk.ts`** — Step function defined with `sfn.*` constructs, `.next()` chains, `sfn.CustomState` for unsupported services
- **`simplesteps.ts`** — Same infrastructure, step function defined with `SimpleStepsStateMachine` + inline `Steps.createFunction()`

Both sides create the same Lambda functions, DynamoDB tables, SQS queues, SNS topics, S3 buckets, and grant the same permissions. The only difference is how the step function is defined.

## Line Count Comparison

| # | Example | CDK | CDK + SimpleSteps | Reduction |
|---|---------|-----|-------------------|-----------|
| 01 | Hello World | 41 | 38 | 7% |
| 02 | Job Poller | 73 | 61 | 16% |
| 03 | Saga Pattern | 126 | 117 | 7% |
| 04 | Checkout Processing | 130 | 105 | 19% |
| 05 | Parallel Processing | 91 | 74 | 19% |
| 06 | Wait for Callback | 102 | 82 | 20% |
| 07 | DynamoDB CRUD | 100 | 69 | 31% |
| 08 | S3 Data Processing | 95 | 58 | 39% |
| 09 | Secrets & Config | 85 | 69 | 19% |
| 10 | Human Approval | 110 | 81 | 26% |
| 11 | Multi-Catch with Retry | 131 | 92 | 30% |
| 12 | ETL Pipeline | 143 | 101 | 29% |
| 13 | Resource Provisioning | 454 | 332 | 27% |
| | **Average** | **129** | **98** | **24%** |

## What Changes Between the Two Stacks

The infrastructure code is identical. The difference is in how the step function is defined:

**Pure CDK:**
- `new tasks.LambdaInvoke()`, `new sfn.Choice()`, `new sfn.Wait()`, `new sfn.Fail()`
- `.next()` chains to wire states together
- `sfn.CustomState` with raw ASL JSON for DynamoDB (with expressions), S3, Secrets Manager, SSM
- `sfn.JsonPath.stringAt(...)` for data references
- `task.addCatch()` / `task.addRetry()` for error handling

**CDK + SimpleSteps:**
- `SimpleStepsStateMachine` with `workflow: Steps.createFunction(async (ctx, input) => { ... })`
- Sequential statements, `if/else`, `while`, `for...of`, `try/catch`, `Promise.all`
- Typed service methods for all 10 AWS services
- Variable names instead of JSONPath

## Feature Coverage

| Feature | Examples |
|---------|----------|
| Lambda invocation | 01, 02, 03, 04, 05, 06, 10, 11, 12, 13 |
| DynamoDB operations | 04, 07, 12, 13 |
| SQS messaging | 04, 06, 10, 13 |
| SNS notifications | 04, 10, 11, 12, 13 |
| S3 operations | 08, 12 |
| Secrets Manager | 09 |
| SSM Parameter Store | 09 |
| Loops / polling | 02, 13 |
| Parallel execution | 05, 13 |
| Error handling / retry | 03, 11, 13 |
| Wait for callback | 06, 10 |
| Map iteration | 12 |
| Saga-pattern rollback | 03, 13 |
