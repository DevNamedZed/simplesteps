# Contributing

## Setup

```bash
git clone https://github.com/anthropics/SimpleStepCompiler.git
cd SimpleStepCompiler
npm install
npm run build
npm test
```

## Development Commands

```bash
npm run build          # Build all packages (tsc --build)
npm run clean          # Clean build artifacts
npm test               # Run all tests (~450 tests)
npm run examples       # Compile showcase examples
npm run examples:cdk   # Compile CDK comparison examples
npm run examples:all   # Compile all examples
npm run playground     # Start interactive playground (Monaco editor)
```

## Project Structure

```
packages/
  core/             @simplesteps/core -- compiler, runtime types, CLI
  cdk/              @simplesteps/cdk -- CDK construct
examples/
  showcase/         29 examples covering every language feature
  aws-cdk-comparison/  12 side-by-side CDK vs SimpleSteps comparisons
  starters/         3 standalone starter projects (cli, library-api, cdk)
playground/         Interactive browser-based compiler (Monaco editor)
spec/               Architecture and API specification (13 documents)
docs/               User-facing documentation
```

## Architecture

The compiler is a 5-stage pipeline:

1. **Discovery** -- Find `Steps.createFunction()` calls, resolve service bindings
2. **Call Graph** -- Build dependency graph of function calls
3. **CFG Construction** -- Convert TypeScript AST to control flow graph (basic blocks + terminators)
4. **Variable Resolution** -- Track variable types, classify as Input/StateOutput/Context/Constant/Derived, compute JSONPath references
5. **ASL Generation** -- Walk CFG and emit ASL states with correct data flow fields

## Specification

The [`spec/`](../spec/) directory contains the full internal specification. These documents are included in the repository and available to all contributors — they describe the compiler's internal architecture, ASL mapping rules, and design decisions in detail:

- [`spec/main.md`](../spec/main.md) -- Architecture overview
- [`spec/public-api.md`](../spec/public-api.md) -- Package structure and API reference
- [`spec/ast-to-asl-mapping.md`](../spec/ast-to-asl-mapping.md) -- TypeScript to ASL compilation rules
- [`spec/static-analysis.md`](../spec/static-analysis.md) -- Variable resolution and type tracking
- [`spec/services.md`](../spec/services.md) -- Service binding specification
- [`spec/feature-mapping.md`](../spec/feature-mapping.md) -- ASL / CDK / SimpleSteps cross-reference
- [`spec/intrinsic-functions.md`](../spec/intrinsic-functions.md) -- All 18 ASL intrinsics
- [`spec/error-handling.md`](../spec/error-handling.md) -- Error handling specification
- [`spec/asl-model.md`](../spec/asl-model.md) -- ASL type model
- [`spec/output-formats.md`](../spec/output-formats.md) -- Output file formats

## Packages

| Package | Description |
|---|---|
| [`@simplesteps/core`](../packages/core/) | TypeScript-to-ASL compiler, runtime types, CLI |
| [`@simplesteps/cdk`](../packages/cdk/) | CDK construct for deploying compiled state machines |
