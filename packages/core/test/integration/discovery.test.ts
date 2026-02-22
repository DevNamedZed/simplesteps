import path from 'path';
import ts from 'typescript';
import { CompilerContext } from '@simplesteps/core/compiler/compilerContext';
import { loadIntrinsics } from '@simplesteps/core/compiler/discovery/intrinsics';
import { findCallSites } from '@simplesteps/core/compiler/discovery/callSiteLocator';
import { createCallGraph } from '@simplesteps/core/compiler/discovery/callGraph';
import { discoverServices } from '@simplesteps/core/compiler/discovery/serviceDiscovery';

const FIXTURES_DIR = path.resolve(__dirname, '../fixtures');

function createProgram(fixtureFile: string): ts.Program {
  const filePath = path.join(FIXTURES_DIR, fixtureFile);
  const runtimePath = path.resolve(__dirname, '../../src/runtime/index.ts');
  const servicesDir = path.resolve(__dirname, '../../src/runtime/services');

  // Include the runtime files so the program can resolve symbols
  const serviceFiles = [
    path.join(servicesDir, 'types.ts'),
    path.join(servicesDir, 'Lambda.ts'),
    path.join(servicesDir, 'SimpleQueueService.ts'),
    path.join(servicesDir, 'DynamoDB.ts'),
    path.join(servicesDir, 'SNS.ts'),
    path.join(servicesDir, 'StepFunction.ts'),
    path.join(servicesDir, 'EventBridge.ts'),
    path.join(servicesDir, 'index.ts'),
  ];

  return ts.createProgram(
    [filePath, runtimePath, ...serviceFiles],
    {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.Node16,
      moduleResolution: ts.ModuleResolutionKind.Node16,
      strict: true,
      esModuleInterop: true,
      experimentalDecorators: true,
      skipLibCheck: true,
    },
  );
}

describe('Discovery pipeline — intrinsics loading', () => {
  it('should load all Steps static methods', () => {
    const program = createProgram('simple-step-function.ts');
    const context = new CompilerContext(program);
    const intrinsics = loadIntrinsics(context);

    expect(intrinsics).not.toBeNull();
    expect(intrinsics!.createFunction).toBeDefined();

    // Should have all the intrinsic methods from Steps class
    const methodNames = [...intrinsics!.methods.keys()];
    expect(methodNames).toContain('createFunction');
    expect(methodNames).toContain('delay');
    expect(methodNames).toContain('sequential');
    expect(methodNames).toContain('format');
    expect(methodNames).toContain('add');
    expect(methodNames).toContain('random');
    expect(methodNames).toContain('uuid');
    expect(methodNames).toContain('hash');
    expect(methodNames).toContain('base64Encode');
    expect(methodNames).toContain('base64Decode');
    expect(methodNames).toContain('array');
    expect(methodNames).toContain('arrayPartition');
    expect(methodNames).toContain('partition');
    expect(methodNames).toContain('arrayContains');
    expect(methodNames).toContain('arrayRange');
    expect(methodNames).toContain('range');
    expect(methodNames).toContain('arrayGetItem');
    expect(methodNames).toContain('arrayLength');
    expect(methodNames).toContain('arrayUnique');
    expect(methodNames).toContain('unique');
    expect(methodNames).toContain('arraySlice');
    expect(methodNames).toContain('jsonParse');
    expect(methodNames).toContain('jsonStringify');
    expect(methodNames).toContain('merge');
    expect(methodNames).toContain('awsSdk');
  });
});

describe('Discovery pipeline — service discovery', () => {
  it('should discover service bindings from runtime/services/', () => {
    const program = createProgram('simple-step-function.ts');
    const context = new CompilerContext(program);
    const registry = discoverServices(context);

    // Should find at least the major services
    const bindingNames = [...registry.bindings.keys()];
    expect(bindingNames).toContain('SimpleQueueService');
    expect(bindingNames).toContain('DynamoDB');
    expect(bindingNames).toContain('SNS');
    expect(bindingNames).toContain('StepFunction');
    expect(bindingNames).toContain('EventBridge');
  });

  it('should map DynamoDB methods including aliases', () => {
    const program = createProgram('simple-step-function.ts');
    const context = new CompilerContext(program);
    const registry = discoverServices(context);

    const dynamo = registry.bindings.get('DynamoDB');
    expect(dynamo).toBeDefined();

    const methodNames = [...dynamo!.methods.keys()];
    expect(methodNames).toContain('getItem');
    expect(methodNames).toContain('get');
    expect(methodNames).toContain('putItem');
    expect(methodNames).toContain('put');
    expect(methodNames).toContain('deleteItem');
    expect(methodNames).toContain('delete');
    expect(methodNames).toContain('updateItem');
    expect(methodNames).toContain('update');
    expect(methodNames).toContain('query');
    expect(methodNames).toContain('scan');

    // Verify the alias resolves to correct integration
    const getMethod = dynamo!.methods.get('get');
    expect(getMethod!.integration).toBe('sdk');
    expect(getMethod!.sdkResource).toBe('arn:aws:states:::dynamodb:getItem');
    expect(getMethod!.hasOutput).toBe(true);
  });

  it('should map SQS methods', () => {
    const program = createProgram('simple-step-function.ts');
    const context = new CompilerContext(program);
    const registry = discoverServices(context);

    const sqs = registry.bindings.get('SimpleQueueService');
    expect(sqs).toBeDefined();
    expect(sqs!.methods.has('publish')).toBe(true);
    expect(sqs!.methods.has('publishWithCallback')).toBe(true);

    const publish = sqs!.methods.get('publish');
    expect(publish!.sdkResource).toBe('arn:aws:states:::sqs:sendMessage');
    expect(publish!.hasOutput).toBe(false);
  });
});

describe('Discovery pipeline — call site location', () => {
  it('should find Steps.createFunction() call sites', () => {
    const program = createProgram('simple-step-function.ts');
    const context = new CompilerContext(program);
    const intrinsics = loadIntrinsics(context);
    expect(intrinsics).not.toBeNull();

    const filePath = path.join(FIXTURES_DIR, 'simple-step-function.ts');
    const sourceFile = program.getSourceFile(filePath);
    expect(sourceFile).toBeDefined();

    const callSites = findCallSites(context, intrinsics!, sourceFile!);
    expect(callSites).toHaveLength(1);

    const site = callSites[0];
    expect(site.origin.kind).toBe('createFunction');
    expect(site.factoryFunction.factory).toBeDefined();
  });

  it('should find multiple call sites in multi-service fixture', () => {
    const program = createProgram('multi-service.ts');
    const context = new CompilerContext(program);
    const intrinsics = loadIntrinsics(context);
    expect(intrinsics).not.toBeNull();

    const filePath = path.join(FIXTURES_DIR, 'multi-service.ts');
    const sourceFile = program.getSourceFile(filePath);
    expect(sourceFile).toBeDefined();

    const callSites = findCallSites(context, intrinsics!, sourceFile!);
    expect(callSites).toHaveLength(1); // one createFunction call
    expect(callSites[0].origin.kind).toBe('createFunction');
  });
});

describe('Discovery pipeline — call graph', () => {
  it('should build a call graph from a simple step function', () => {
    const program = createProgram('simple-step-function.ts');
    const context = new CompilerContext(program);
    const intrinsics = loadIntrinsics(context);
    expect(intrinsics).not.toBeNull();

    const filePath = path.join(FIXTURES_DIR, 'simple-step-function.ts');
    const sourceFile = program.getSourceFile(filePath);
    const callSites = findCallSites(context, intrinsics!, sourceFile!);
    expect(callSites).toHaveLength(1);

    const graph = createCallGraph(context, callSites[0]);
    expect(graph).toBeDefined();
    expect(graph.edges.length).toBeGreaterThan(0);

    // The factory body calls orderService.call() — should be an awaited edge
    const awaitedEdges = graph.edges.filter(e => e.await);
    expect(awaitedEdges.length).toBeGreaterThanOrEqual(1);
  });

  it('should build a call graph with multiple service calls', () => {
    const program = createProgram('multi-service.ts');
    const context = new CompilerContext(program);
    const intrinsics = loadIntrinsics(context);
    expect(intrinsics).not.toBeNull();

    const filePath = path.join(FIXTURES_DIR, 'multi-service.ts');
    const sourceFile = program.getSourceFile(filePath);
    const callSites = findCallSites(context, intrinsics!, sourceFile!);
    expect(callSites).toHaveLength(1);

    const graph = createCallGraph(context, callSites[0]);
    expect(graph).toBeDefined();

    // Should have edges for: validateFn.call(), table.putItem(), notificationTopic.publish()
    const awaitedEdges = graph.edges.filter(e => e.await);
    expect(awaitedEdges.length).toBeGreaterThanOrEqual(3);
  });

  it('should correctly set await: true for awaited calls', () => {
    const program = createProgram('simple-step-function.ts');
    const context = new CompilerContext(program);
    const intrinsics = loadIntrinsics(context);

    const filePath = path.join(FIXTURES_DIR, 'simple-step-function.ts');
    const sourceFile = program.getSourceFile(filePath);
    const callSites = findCallSites(context, intrinsics!, sourceFile!);

    const graph = createCallGraph(context, callSites[0]);

    // The "await orderService.call(...)" should have await: true
    const serviceCallEdge = graph.edges.find(e => e.await);
    expect(serviceCallEdge).toBeDefined();
    expect(serviceCallEdge!.await).toBe(true);
  });

  it('should report no errors for valid step functions', () => {
    const program = createProgram('simple-step-function.ts');
    const context = new CompilerContext(program);
    const intrinsics = loadIntrinsics(context);

    const filePath = path.join(FIXTURES_DIR, 'simple-step-function.ts');
    const sourceFile = program.getSourceFile(filePath);
    const callSites = findCallSites(context, intrinsics!, sourceFile!);

    createCallGraph(context, callSites[0]);

    expect(context.hasErrors()).toBe(false);
  });
});
