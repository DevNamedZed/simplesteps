# SimpleSteps Testing Starter

A template project showing how to test SimpleSteps workflows locally with Jest and `@simplesteps/local`.

## Quick Start

```bash
npm install
npm test
```

## Project Structure

```
workflows/            # Your SimpleSteps workflow definitions
  order-processing.ts # Example: order validation, payment, confirmation
  data-pipeline.ts    # Example: fetch → transform → write pipeline
test/
  order-processing.test.ts   # Tests for order workflow
  data-pipeline.test.ts      # Tests for pipeline workflow
```

## Testing Patterns

### 1. Compile & Validate

Compile your workflow once in `beforeAll` and reuse the ASL across tests:

```typescript
let asl: StateMachineDefinition;

beforeAll(() => {
  const result = compile({
    tsconfigPath: './tsconfig.workflows.json',
  });
  asl = JSON.parse(AslSerializer.serialize(result.stateMachines[0].definition));
});
```

### 2. Mock Services

Provide mock implementations for each Lambda/service your workflow calls:

```typescript
const services = {
  'arn:aws:lambda:us-east-1:123:function:MyFn': (input) => ({
    result: 'mocked',
  }),
};
const runner = new LocalRunner(asl, { services });
```

### 3. Execute & Assert

```typescript
// Simple execution — throws on failure
const output = await runner.execute({ key: 'value' });
expect(output.result).toBe('expected');

// With trace — never throws, captures full execution history
const { output, trace } = await runner.executeWithTrace({ key: 'value' });
expect(trace.states).toHaveLength(3);
```

### 4. Test Error Paths

Throw `StateMachineError` from mocks to simulate service failures:

```typescript
const services = {
  'arn:aws:lambda:...': () => {
    throw new StateMachineError('ServiceError', 'timeout');
  },
};
```

### 5. Inspect Execution Traces

Use `executeWithTrace()` to verify state ordering, transitions, and timing:

```typescript
const { trace } = await runner.executeWithTrace(input);
const stateNames = trace.states.map(s => s.name);
expect(stateNames).toContain('ValidateOrder');

// Check Choice branches
const choices = trace.states.filter(s => s.type === 'Choice');
expect(choices[0].transition).toBe('ProcessOrder');
```

## Runner Options

```typescript
new LocalRunner(asl, {
  services: { ... },     // Mock service implementations
  maxSteps: 500,         // Prevent infinite loops (default: 1000)
  retryDelays: 'skip',   // Skip retry delays in tests (default)
  simulateWaits: false,  // Skip Wait state delays (default)
});
```
