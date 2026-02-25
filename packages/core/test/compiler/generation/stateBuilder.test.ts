import path from 'path';
import ts from 'typescript';
import { CompilerContext } from '@simplesteps/core/compiler/compilerContext';
import { loadIntrinsics } from '@simplesteps/core/compiler/discovery/intrinsics';
import { findCallSites } from '@simplesteps/core/compiler/discovery/callSiteLocator';
import { discoverServices } from '@simplesteps/core/compiler/discovery/serviceDiscovery';
import { buildCFG } from '@simplesteps/core/compiler/cfg/cfgBuilder';
import { generateStateMachine, deriveStateMachineName } from '@simplesteps/core/compiler/generation/index';
import type { StateMachineDefinition, TaskState, PassState, ChoiceState, WaitState, MapState, ParallelState, ChoiceRule, NotRule, AndRule, ComparisonRule, CatchRule } from '@simplesteps/core/asl/types';

const CFG_FIXTURES_DIR = path.resolve(__dirname, '../../fixtures/cfg');

function createProgram(fixtureFile: string): ts.Program {
  const filePath = path.join(CFG_FIXTURES_DIR, fixtureFile);
  const runtimePath = path.resolve(__dirname, '../../../src/runtime/index.ts');
  const servicesDir = path.resolve(__dirname, '../../../src/runtime/services');

  const serviceFiles = [
    path.join(servicesDir, 'types.ts'),
    path.join(servicesDir, 'Lambda.ts'),
    path.join(servicesDir, 'SimpleQueueService.ts'),
    path.join(servicesDir, 'DynamoDB.ts'),
    path.join(servicesDir, 'SNS.ts'),
    path.join(servicesDir, 'StepFunction.ts'),
    path.join(servicesDir, 'EventBridge.ts'),
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

function compileFixture(fixtureFile: string): {
  definition: StateMachineDefinition;
  context: CompilerContext;
  name: string;
} {
  const program = createProgram(fixtureFile);
  const context = new CompilerContext(program);
  const intrinsics = loadIntrinsics(context);
  expect(intrinsics).not.toBeNull();

  const serviceRegistry = discoverServices(context);

  const filePath = path.join(CFG_FIXTURES_DIR, fixtureFile);
  const sourceFile = program.getSourceFile(filePath);
  expect(sourceFile).toBeDefined();

  const callSites = findCallSites(context, intrinsics!, sourceFile!);
  expect(callSites).toHaveLength(1);

  const callSite = callSites[0];
  const factory = callSite.factoryFunction.factory;
  expect(factory.body).toBeDefined();
  expect(ts.isBlock(factory.body!)).toBe(true);

  const { cfg } = buildCFG(context, factory.body! as ts.Block);
  const definition = generateStateMachine(context, callSite, cfg, serviceRegistry);
  const name = deriveStateMachineName(callSite);

  return { definition, context, name };
}

function getStates(def: StateMachineDefinition): Record<string, any> {
  return def.States;
}

function getStateNames(def: StateMachineDefinition): string[] {
  return Object.keys(def.States);
}

function getStatesByType(def: StateMachineDefinition, type: string): [string, any][] {
  return Object.entries(def.States).filter(([, s]) => s.Type === type);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('State builder', () => {
  describe('sequential fixture', () => {
    let definition: StateMachineDefinition;
    let context: CompilerContext;
    let name: string;

    beforeAll(() => {
      ({ definition, context, name } = compileFixture('sequential.ts'));
    });

    it('should derive state machine name', () => {
      expect(name).toBe('sequential');
    });

    it('should produce no errors', () => {
      expect(context.hasErrors()).toBe(false);
    });

    it('should have a StartAt state', () => {
      expect(definition.StartAt).toBeDefined();
      expect(definition.StartAt).not.toBe('');
    });

    it('should produce 3 states (Task, Task, Pass)', () => {
      const names = getStateNames(definition);
      expect(names).toHaveLength(3);

      const tasks = getStatesByType(definition, 'Task');
      expect(tasks).toHaveLength(2);

      const passes = getStatesByType(definition, 'Pass');
      expect(passes).toHaveLength(1);
    });

    it('should have first Task with Lambda ARN and correct Parameters', () => {
      const startState = definition.States[definition.StartAt] as TaskState;
      expect(startState.Type).toBe('Task');
      expect(startState.Resource).toBe('arn:aws:lambda:us-east-1:123:function:A');
      expect(startState.Parameters).toEqual({ 'id.$': '$.id' });
      expect(startState.ResultPath).toBe('$.a');
    });

    it('should have second Task with correct Parameters referencing first result', () => {
      const firstState = definition.States[definition.StartAt] as TaskState;
      const secondStateName = firstState.Next!;
      const secondState = definition.States[secondStateName] as TaskState;
      expect(secondState.Type).toBe('Task');
      expect(secondState.Resource).toBe('arn:aws:lambda:us-east-1:123:function:B');
      expect(secondState.Parameters).toEqual({ 'name.$': '$.a.name' });
      expect(secondState.ResultPath).toBe('$.b');
    });

    it('should have return Pass state with End: true', () => {
      const passes = getStatesByType(definition, 'Pass');
      expect(passes).toHaveLength(1);
      const [, passState] = passes[0];
      expect(passState.End).toBe(true);
      expect(passState.Parameters).toEqual({ 'result.$': '$.b.result' });
    });

    it('should chain all states in order', () => {
      const states = getStates(definition);
      const first = states[definition.StartAt] as TaskState;
      expect(first.Next).toBeDefined();

      const second = states[first.Next!] as TaskState;
      expect(second.Next).toBeDefined();

      const third = states[second.Next!] as PassState;
      expect(third.End).toBe(true);
    });
  });

  describe('if-else fixture', () => {
    let definition: StateMachineDefinition;
    let context: CompilerContext;
    let name: string;

    beforeAll(() => {
      ({ definition, context, name } = compileFixture('if-else.ts'));
    });

    it('should derive state machine name', () => {
      expect(name).toBe('ifElse');
    });

    it('should produce no errors', () => {
      expect(context.hasErrors()).toBe(false);
    });

    it('should have a Choice state', () => {
      const choices = getStatesByType(definition, 'Choice');
      expect(choices.length).toBeGreaterThanOrEqual(1);
    });

    it('should have Choice with StringEquals on mode', () => {
      const choices = getStatesByType(definition, 'Choice');
      const [, choiceState] = choices[0];
      expect(choiceState.Choices).toBeDefined();
      expect(choiceState.Choices).toHaveLength(1);

      const rule = choiceState.Choices[0] as ComparisonRule;
      expect(rule.Variable).toBe('$.mode');
      expect(rule.StringEquals).toBe('fast');
    });

    it('should have both branches ending with Pass states', () => {
      const passes = getStatesByType(definition, 'Pass');
      expect(passes.length).toBeGreaterThanOrEqual(2);
      for (const [, pass] of passes) {
        expect(pass.End).toBe(true);
      }
    });

    it('should have Task states in each branch', () => {
      const tasks = getStatesByType(definition, 'Task');
      expect(tasks).toHaveLength(2);
    });

    it('should have the Choice as the StartAt state', () => {
      const startState = definition.States[definition.StartAt];
      expect(startState.Type).toBe('Choice');
    });
  });

  describe('early-return fixture', () => {
    let definition: StateMachineDefinition;
    let context: CompilerContext;
    let name: string;

    beforeAll(() => {
      ({ definition, context, name } = compileFixture('early-return.ts'));
    });

    it('should derive state machine name', () => {
      expect(name).toBe('earlyReturn');
    });

    it('should produce no errors', () => {
      expect(context.hasErrors()).toBe(false);
    });

    it('should start with a Task (validate call)', () => {
      const startState = definition.States[definition.StartAt] as TaskState;
      expect(startState.Type).toBe('Task');
      expect(startState.Resource).toBe('arn:aws:lambda:us-east-1:123:function:Validate');
    });

    it('should have a Choice state after the validate Task', () => {
      const startState = definition.States[definition.StartAt] as TaskState;
      const nextState = definition.States[startState.Next!];
      expect(nextState.Type).toBe('Choice');
    });

    it('should have Choice with Not rule on validation.valid', () => {
      const startState = definition.States[definition.StartAt] as TaskState;
      const choiceState = definition.States[startState.Next!] as ChoiceState;
      expect(choiceState.Choices).toHaveLength(1);

      const rule = choiceState.Choices[0] as NotRule;
      expect(rule.Not).toBeDefined();
      expect((rule.Not as ComparisonRule).Variable).toBe('$.validation.valid');
      expect((rule.Not as ComparisonRule).BooleanEquals).toBe(true);
    });

    it('should have two Pass states (early return + normal return)', () => {
      const passes = getStatesByType(definition, 'Pass');
      expect(passes.length).toBeGreaterThanOrEqual(2);
    });

    it('should have early return Pass with error parameter', () => {
      const passes = getStatesByType(definition, 'Pass');
      const earlyReturn = passes.find(([, s]) =>
        s.Parameters && 'error' in s.Parameters,
      );
      expect(earlyReturn).toBeDefined();
      expect(earlyReturn![1].End).toBe(true);
      expect(earlyReturn![1].Parameters.error).toBe('Invalid input');
    });

    it('should have a process Task in the non-early-return path', () => {
      const tasks = getStatesByType(definition, 'Task');
      const processTask = tasks.find(([, s]) =>
        s.Resource === 'arn:aws:lambda:us-east-1:123:function:Process',
      );
      expect(processTask).toBeDefined();
    });
  });

  describe('while-loop fixture', () => {
    let definition: StateMachineDefinition;
    let context: CompilerContext;
    let name: string;

    beforeAll(() => {
      ({ definition, context, name } = compileFixture('while-loop.ts'));
    });

    it('should derive state machine name', () => {
      expect(name).toBe('whileLoop');
    });

    it('should produce no errors', () => {
      expect(context.hasErrors()).toBe(false);
    });

    it('should start with a Task (first checkService call)', () => {
      const startState = definition.States[definition.StartAt] as TaskState;
      expect(startState.Type).toBe('Task');
      expect(startState.Resource).toBe('arn:aws:lambda:us-east-1:123:function:Check');
      expect(startState.ResultPath).toBe('$.result');
    });

    it('should have a Choice state after the first Task', () => {
      const startState = definition.States[definition.StartAt] as TaskState;
      expect(startState.Next).toBeDefined();
      const nextState = definition.States[startState.Next!];
      expect(nextState.Type).toBe('Choice');
    });

    it('should have Choice with Not rule on result.done', () => {
      const startState = definition.States[definition.StartAt] as TaskState;
      const choiceState = definition.States[startState.Next!] as ChoiceState;
      expect(choiceState.Choices).toHaveLength(1);

      const rule = choiceState.Choices[0] as NotRule;
      expect(rule.Not).toBeDefined();
      expect((rule.Not as ComparisonRule).Variable).toBe('$.result.done');
      expect((rule.Not as ComparisonRule).BooleanEquals).toBe(true);
    });

    it('should have loop body Task that loops back to the Choice', () => {
      const states = getStates(definition);
      const startState = states[definition.StartAt] as TaskState;
      const choiceName = startState.Next!;
      const choiceState = states[choiceName] as ChoiceState;

      // The true branch (Not done) should point to another Task
      const bodyTaskName = choiceState.Choices[0].Next;
      const bodyTask = states[bodyTaskName] as TaskState;
      expect(bodyTask.Type).toBe('Task');
      expect(bodyTask.Resource).toBe('arn:aws:lambda:us-east-1:123:function:Check');
      expect(bodyTask.ResultPath).toBe('$.result');

      // The body task should loop back to the Choice
      expect(bodyTask.Next).toBe(choiceName);
    });

    it('should have Choice Default pointing to Return_Result', () => {
      const states = getStates(definition);
      const startState = states[definition.StartAt] as TaskState;
      const choiceState = states[startState.Next!] as ChoiceState;

      const defaultTarget = choiceState.Default!;
      const returnState = states[defaultTarget] as PassState;
      expect(returnState.Type).toBe('Pass');
      expect(returnState.End).toBe(true);
    });
  });

  describe('for-of fixture', () => {
    let definition: StateMachineDefinition;
    let context: CompilerContext;
    let name: string;

    beforeAll(() => {
      ({ definition, context, name } = compileFixture('for-of.ts'));
    });

    it('should derive state machine name', () => {
      expect(name).toBe('forOf');
    });

    it('should produce no errors', () => {
      expect(context.hasErrors()).toBe(false);
    });

    it('should start with a Map state', () => {
      const startState = definition.States[definition.StartAt] as MapState;
      expect(startState.Type).toBe('Map');
    });

    it('should have Map with ItemsPath and ResultPath: null', () => {
      const mapState = definition.States[definition.StartAt] as MapState;
      expect(mapState.ItemsPath).toBe('$.items');
      expect(mapState.ResultPath).toBeNull();
    });

    it('should have ItemProcessor with a Task state', () => {
      const mapState = definition.States[definition.StartAt] as MapState;
      const processor = mapState.ItemProcessor;
      expect(processor).toBeDefined();
      expect(processor.StartAt).toBeDefined();
      expect(processor.StartAt).not.toBe('');

      const innerTask = processor.States[processor.StartAt] as TaskState;
      expect(innerTask.Type).toBe('Task');
      expect(innerTask.Resource).toBe('arn:aws:lambda:us-east-1:123:function:Process');
      expect(innerTask.ResultPath).toBeNull();
    });

    it('should have ItemProcessor Task with correct Parameters', () => {
      const mapState = definition.States[definition.StartAt] as MapState;
      const processor = mapState.ItemProcessor;
      const innerTask = processor.States[processor.StartAt] as TaskState;
      expect(innerTask.Parameters).toEqual({ 'item.$': '$' });
    });

    it('should have Map state Next pointing to Return_Result', () => {
      const mapState = definition.States[definition.StartAt] as MapState;
      expect(mapState.Next).toBeDefined();
      const returnState = definition.States[mapState.Next!] as PassState;
      expect(returnState.Type).toBe('Pass');
      expect(returnState.End).toBe(true);
    });
  });

  describe('try-catch fixture', () => {
    let definition: StateMachineDefinition;
    let context: CompilerContext;
    let name: string;

    beforeAll(() => {
      ({ definition, context, name } = compileFixture('try-catch.ts'));
    });

    it('should derive state machine name', () => {
      expect(name).toBe('tryCatch');
    });

    it('should produce no errors', () => {
      expect(context.hasErrors()).toBe(false);
    });

    it('should start with a Task that has a Catch rule', () => {
      const startState = definition.States[definition.StartAt] as TaskState;
      expect(startState.Type).toBe('Task');
      expect(startState.Resource).toBe('arn:aws:lambda:us-east-1:123:function:Risky');
      expect(startState.Catch).toBeDefined();
      expect(startState.Catch).toHaveLength(1);
    });

    it('should have Catch rule with States.ALL and ResultPath $.err', () => {
      const startState = definition.States[definition.StartAt] as TaskState;
      const catchRule = startState.Catch![0] as CatchRule;
      expect(catchRule.ErrorEquals).toEqual(['States.ALL']);
      expect(catchRule.ResultPath).toBe('$.err');
    });

    it('should have Catch Next pointing to a catch handler Pass state', () => {
      const states = getStates(definition);
      const startState = states[definition.StartAt] as TaskState;
      const catchTarget = startState.Catch![0].Next;

      const catchHandler = states[catchTarget] as PassState;
      expect(catchHandler.Type).toBe('Pass');
      expect(catchHandler.End).toBe(true);
      expect(catchHandler.Parameters).toBeDefined();
      expect(catchHandler.Parameters!.success).toBe(false);
      expect(catchHandler.Parameters!.error).toBe('Service failed');
    });

    it('should have success path Return_Result Pass state with End', () => {
      const states = getStates(definition);
      const startState = states[definition.StartAt] as TaskState;
      // Task Next → success return
      expect(startState.Next).toBeDefined();
      const successReturn = states[startState.Next!] as PassState;
      expect(successReturn.Type).toBe('Pass');
      expect(successReturn.End).toBe(true);
      expect(successReturn.Parameters).toBeDefined();
      expect(successReturn.Parameters!.success).toBe(true);
    });
  });

  describe('multi-service fixture', () => {
    let definition: StateMachineDefinition;
    let context: CompilerContext;
    let name: string;

    beforeAll(() => {
      ({ definition, context, name } = compileFixture('multi-service.ts'));
    });

    it('should derive state machine name', () => {
      expect(name).toBe('multiServiceWorkflow');
    });

    it('should produce no errors', () => {
      expect(context.hasErrors()).toBe(false);
    });

    it('should start with a Lambda Task (validateFn)', () => {
      const startState = definition.States[definition.StartAt] as TaskState;
      expect(startState.Type).toBe('Task');
      expect(startState.Resource).toBe('arn:aws:lambda:us-east-1:123:function:Validate');
    });

    it('should have a Choice state checking validation.valid', () => {
      const choices = getStatesByType(definition, 'Choice');
      expect(choices.length).toBeGreaterThanOrEqual(1);
      const [, choiceState] = choices[0];
      expect(choiceState.Choices[0].Variable).toBe('$.validation.valid');
    });

    it('should have DynamoDB putItem Task with TableName in Parameters', () => {
      const tasks = getStatesByType(definition, 'Task');
      const dynamoTask = tasks.find(([, s]) =>
        s.Resource === 'arn:aws:states:::dynamodb:putItem',
      );
      expect(dynamoTask).toBeDefined();
      const [, taskState] = dynamoTask!;
      expect(taskState.Parameters).toBeDefined();
      expect(taskState.Parameters.TableName).toBe('OrdersTable');
      expect(taskState.Parameters.Item).toBeDefined();
    });

    it('should have SNS publish Task with TopicArn in Parameters', () => {
      const tasks = getStatesByType(definition, 'Task');
      const snsTask = tasks.find(([, s]) =>
        s.Resource === 'arn:aws:states:::sns:publish',
      );
      expect(snsTask).toBeDefined();
      const [, taskState] = snsTask!;
      expect(taskState.Parameters).toBeDefined();
      expect(taskState.Parameters.TopicArn).toBe('arn:aws:sns:us-east-1:123:OrderNotifications');
      expect(taskState.Parameters.Message).toBeDefined();
    });
  });

  describe('and-or-conditions fixture', () => {
    let definition: StateMachineDefinition;
    let context: CompilerContext;
    let name: string;

    beforeAll(() => {
      ({ definition, context, name } = compileFixture('and-or-conditions.ts'));
    });

    it('should derive state machine name', () => {
      expect(name).toBe('andOrConditions');
    });

    it('should produce no errors', () => {
      expect(context.hasErrors()).toBe(false);
    });

    it('should have a Choice state with And rule', () => {
      const choices = getStatesByType(definition, 'Choice');
      expect(choices.length).toBeGreaterThanOrEqual(1);
      const [, choiceState] = choices[0];
      expect(choiceState.Choices).toHaveLength(1);

      const rule = choiceState.Choices[0] as AndRule;
      expect(rule.And).toBeDefined();
      expect(rule.And).toHaveLength(2);
    });

    it('should have And rule with NumericGreaterThan and StringEquals', () => {
      const choices = getStatesByType(definition, 'Choice');
      const [, choiceState] = choices[0];
      const rule = choiceState.Choices[0] as AndRule;

      const first = rule.And[0] as ComparisonRule;
      expect(first.Variable).toBe('$.priority');
      expect(first.NumericGreaterThan).toBe(5);

      const second = rule.And[1] as ComparisonRule;
      expect(second.Variable).toBe('$.status');
      expect(second.StringEquals).toBe('active');
    });
  });

  describe('wait-state fixture', () => {
    let definition: StateMachineDefinition;
    let context: CompilerContext;
    let name: string;

    beforeAll(() => {
      ({ definition, context, name } = compileFixture('wait-state.ts'));
    });

    it('should derive state machine name', () => {
      expect(name).toBe('waitState');
    });

    it('should produce no errors', () => {
      expect(context.hasErrors()).toBe(false);
    });

    it('should start with a Wait state', () => {
      const startState = definition.States[definition.StartAt] as WaitState;
      expect(startState.Type).toBe('Wait');
      expect(startState.Seconds).toBe(30);
    });

    it('should chain Wait → Task → Pass', () => {
      const states = getStates(definition);
      const waitState = states[definition.StartAt] as WaitState;
      expect(waitState.Next).toBeDefined();

      const taskState = states[waitState.Next!] as TaskState;
      expect(taskState.Type).toBe('Task');
      expect(taskState.Resource).toBe('arn:aws:lambda:us-east-1:123:function:Process');

      expect(taskState.Next).toBeDefined();
      const passState = states[taskState.Next!] as PassState;
      expect(passState.Type).toBe('Pass');
      expect(passState.End).toBe(true);
    });
  });

  describe('switch-case fixture', () => {
    let definition: StateMachineDefinition;
    let context: CompilerContext;
    let name: string;

    beforeAll(() => {
      ({ definition, context, name } = compileFixture('switch-case.ts'));
    });

    it('should derive state machine name', () => {
      expect(name).toBe('switchCase');
    });

    it('should produce no errors', () => {
      expect(context.hasErrors()).toBe(false);
    });

    it('should have Choice states for chained case matching', () => {
      const choices = getStatesByType(definition, 'Choice');
      expect(choices.length).toBeGreaterThanOrEqual(2);
    });

    it('should have first Choice with StringEquals "active"', () => {
      // The first choice state should check input.status === 'active'
      const startState = definition.States[definition.StartAt];
      expect(startState.Type).toBe('Choice');

      const choiceState = startState as ChoiceState;
      const rule = choiceState.Choices[0] as ComparisonRule;
      expect(rule.Variable).toBe('$.status');
      expect(rule.StringEquals).toBe('active');
    });

    it('should have Task states for each case', () => {
      const tasks = getStatesByType(definition, 'Task');
      expect(tasks.length).toBeGreaterThanOrEqual(3);

      const resources = tasks.map(([, s]) => s.Resource);
      expect(resources).toContain('arn:aws:lambda:us-east-1:123:function:Activate');
      expect(resources).toContain('arn:aws:lambda:us-east-1:123:function:Pending');
      expect(resources).toContain('arn:aws:lambda:us-east-1:123:function:Default');
    });
  });

  describe('intrinsics fixture', () => {
    let definition: StateMachineDefinition;
    let context: CompilerContext;

    beforeAll(() => {
      ({ definition, context } = compileFixture('intrinsics.ts'));
    });

    it('should produce no errors', () => {
      expect(context.hasErrors()).toBe(false);
    });

    it('should emit a Pass state with intrinsic Parameters', () => {
      const passStates = getStatesByType(definition, 'Pass');
      expect(passStates.length).toBeGreaterThanOrEqual(1);

      // Find the return state with Parameters
      const returnState = passStates.find(([, s]) => s.Parameters);
      expect(returnState).toBeDefined();
      const params = returnState![1].Parameters;

      expect(params['message.$']).toBe("States.Format('Order {} confirmed', $.orderId)");
      expect(params['id.$']).toBe('States.UUID()');
      expect(params['total.$']).toBe('States.MathAdd($.price, $.tax)');
      expect(params['meta.$']).toBe('States.StringToJson($.metadata)');
    });
  });

  describe('js-operators fixture', () => {
    let definition: StateMachineDefinition;
    let context: CompilerContext;

    beforeAll(() => {
      ({ definition, context } = compileFixture('js-operators.ts'));
    });

    it('should produce no errors', () => {
      expect(context.hasErrors()).toBe(false);
    });

    it('should emit intrinsics for split, + operator, and JSON.parse', () => {
      const passStates = getStatesByType(definition, 'Pass');
      expect(passStates.length).toBeGreaterThanOrEqual(1);

      const returnState = passStates.find(([, s]) => s.Parameters);
      expect(returnState).toBeDefined();
      const params = returnState![1].Parameters;

      expect(params['parts.$']).toBe("States.StringSplit($.csv, ',')");
      expect(params['total.$']).toBe('States.MathAdd($.price, $.tax)');
      expect(params['meta.$']).toBe('States.StringToJson($.metadata)');
    });
  });

  describe('parallel fixture', () => {
    let definition: StateMachineDefinition;
    let context: CompilerContext;

    beforeAll(() => {
      ({ definition, context } = compileFixture('parallel.ts'));
    });

    it('should produce no errors', () => {
      expect(context.hasErrors()).toBe(false);
    });

    it('should emit a Parallel state', () => {
      const parallelStates = getStatesByType(definition, 'Parallel');
      expect(parallelStates).toHaveLength(1);
    });

    it('should have 2 branches in the Parallel state', () => {
      const [, state] = getStatesByType(definition, 'Parallel')[0];
      const parallel = state as ParallelState;
      expect(parallel.Branches).toHaveLength(2);
    });

    it('each branch should contain a Task state', () => {
      const [, state] = getStatesByType(definition, 'Parallel')[0];
      const parallel = state as ParallelState;

      for (const branch of parallel.Branches) {
        expect(branch.StartAt).toBeDefined();
        const branchStates = Object.values(branch.States);
        const taskStates = branchStates.filter((s: any) => s.Type === 'Task');
        expect(taskStates.length).toBeGreaterThanOrEqual(1);
      }
    });

    it('should have ResultPath $.__parallel and Assign Pass states', () => {
      const [, state] = getStatesByType(definition, 'Parallel')[0];
      const parallel = state as ParallelState;
      expect(parallel.ResultPath).toBe('$.__parallel');
      expect(parallel.ResultSelector).toBeUndefined();

      const passStates = getStatesByType(definition, 'Pass');
      const assignPasses = passStates.filter(([name]) => name.startsWith('Assign_'));
      expect(assignPasses).toHaveLength(2);
    });

    it('should have a return Pass state after the Parallel', () => {
      const passStates = getStatesByType(definition, 'Pass');
      expect(passStates.length).toBeGreaterThanOrEqual(1);
      const returnState = passStates.find(([, s]) => s.Parameters);
      expect(returnState).toBeDefined();
      const params = returnState![1].Parameters;
      expect(params['order.$']).toBe('$.orderResult');
      expect(params['payment.$']).toBe('$.paymentResult');
    });
  });

  describe('deriveStateMachineName', () => {
    it('should return variable name for createFunction pattern', () => {
      const { name } = compileFixture('sequential.ts');
      expect(name).toBe('sequential');
    });

    it('should return variable name for if-else fixture', () => {
      const { name } = compileFixture('if-else.ts');
      expect(name).toBe('ifElse');
    });
  });
});
