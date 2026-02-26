/**
 * Data Pipeline Workflow — Test Suite
 *
 * Demonstrates testing patterns for workflows with:
 * - Sequential multi-step Lambda pipelines
 * - Data transformation and aggregation
 * - Edge cases (empty input, single records)
 */
import { compile, AslSerializer, type CompileResult } from '@simplesteps/core';
import { LocalRunner } from '@simplesteps/local';
import type { StateMachineDefinition } from '@simplesteps/core/asl';
import path from 'path';

// ---------------------------------------------------------------------------
// Compile once
// ---------------------------------------------------------------------------

let asl: StateMachineDefinition;
let compileResult: CompileResult;

beforeAll(() => {
  compileResult = compile({
    tsconfigPath: path.resolve(__dirname, '../tsconfig.workflows.json'),
    cwd: path.resolve(__dirname, '..'),
  });

  // Find the data-pipeline state machine
  const pipelineSm = compileResult.stateMachines.find(
    sm => sm.name === 'dataPipeline' || sm.source.includes('data-pipeline'),
  );
  if (!pipelineSm) {
    throw new Error(
      compileResult.errors.length > 0
        ? `Compilation failed:\n${compileResult.errors.map(e => `  ${e.message}`).join('\n')}`
        : 'No data-pipeline state machine found',
    );
  }
  asl = JSON.parse(AslSerializer.serialize(pipelineSm.definition));
});

// ---------------------------------------------------------------------------
// Compilation
// ---------------------------------------------------------------------------

describe('Compilation', () => {
  it('compiles without errors', () => {
    const pipelineErrors = compileResult.errors.filter(
      e => e.file.includes('data-pipeline'),
    );
    expect(pipelineErrors).toHaveLength(0);
  });

  it('detects the pipeline services', () => {
    const sm = compileResult.stateMachines.find(
      sm => sm.name === 'dataPipeline' || sm.source.includes('data-pipeline'),
    )!;
    expect(sm.services).toContain('arn:aws:lambda:us-east-1:123456789:function:FetchRecords');
    expect(sm.services).toContain('arn:aws:lambda:us-east-1:123456789:function:TransformBatch');
    expect(sm.services).toContain('arn:aws:lambda:us-east-1:123456789:function:WriteBatch');
  });
});

// ---------------------------------------------------------------------------
// Happy path
// ---------------------------------------------------------------------------

describe('Happy path', () => {
  const makeServices = (records: Array<{ id: string; value: number }>) => ({
    'arn:aws:lambda:us-east-1:123456789:function:FetchRecords': () => ({
      records,
    }),
    'arn:aws:lambda:us-east-1:123456789:function:TransformBatch': (input: any) => ({
      results: input.records.map((r: any) => ({ id: r.id, result: r.value * 2 })),
    }),
    'arn:aws:lambda:us-east-1:123456789:function:WriteBatch': (input: any) => ({
      written: input.items?.length ?? 0,
    }),
  });

  it('processes records through the full pipeline', async () => {
    const records = [
      { id: 'r1', value: 10 },
      { id: 'r2', value: 20 },
      { id: 'r3', value: 30 },
    ];
    const runner = new LocalRunner(asl, { services: makeServices(records) });
    const output = await runner.execute({ source: 'test-db', limit: 100 });

    expect(output.writtenCount).toBe(3);
  });

  it('handles a single record', async () => {
    const records = [{ id: 'single', value: 42 }];
    const runner = new LocalRunner(asl, { services: makeServices(records) });
    const output = await runner.execute({ source: 'single-source', limit: 1 });

    expect(output.recordCount).toBe(1);
    expect(output.writtenCount).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// Trace inspection
// ---------------------------------------------------------------------------

describe('Trace inspection', () => {
  it('shows the pipeline execution steps', async () => {
    const services = {
      'arn:aws:lambda:us-east-1:123456789:function:FetchRecords': () => ({
        records: [
          { id: 'a', value: 1 },
          { id: 'b', value: 2 },
        ],
      }),
      'arn:aws:lambda:us-east-1:123456789:function:TransformBatch': (input: any) => ({
        results: input.records.map((r: any) => ({ id: r.id, result: r.value * 10 })),
      }),
      'arn:aws:lambda:us-east-1:123456789:function:WriteBatch': (input: any) => ({
        written: input.items?.length ?? 0,
      }),
    };

    const runner = new LocalRunner(asl, { services });
    const { trace } = await runner.executeWithTrace({ source: 'trace-db', limit: 50 });

    // Should have executed without error
    expect(trace.error).toBeUndefined();
    // Three Task states: FetchRecords, TransformBatch, WriteBatch
    expect(trace.states.length).toBeGreaterThanOrEqual(3);
  });
});

// ---------------------------------------------------------------------------
// Service mock assertions
// ---------------------------------------------------------------------------

describe('Service mock assertions', () => {
  it('passes fetched records to TransformBatch', async () => {
    let transformInput: any = null;
    const services = {
      'arn:aws:lambda:us-east-1:123456789:function:FetchRecords': () => ({
        records: [
          { id: 'x', value: 5 },
          { id: 'y', value: 15 },
        ],
      }),
      'arn:aws:lambda:us-east-1:123456789:function:TransformBatch': (input: any) => {
        transformInput = input;
        return { results: input.records.map((r: any) => ({ id: r.id, result: r.value + 1 })) };
      },
      'arn:aws:lambda:us-east-1:123456789:function:WriteBatch': (input: any) => ({
        written: input.items?.length ?? 0,
      }),
    };

    const runner = new LocalRunner(asl, { services });
    await runner.execute({ source: 'mock-db', limit: 10 });

    expect(transformInput).not.toBeNull();
    expect(transformInput.records).toHaveLength(2);
  });

  it('passes all transformed items to WriteBatch', async () => {
    let writeBatchInput: any = null;
    const services = {
      'arn:aws:lambda:us-east-1:123456789:function:FetchRecords': () => ({
        records: [
          { id: 'a', value: 100 },
          { id: 'b', value: 200 },
        ],
      }),
      'arn:aws:lambda:us-east-1:123456789:function:TransformBatch': (input: any) => ({
        results: input.records.map((r: any) => ({ id: r.id, result: r.value * 3 })),
      }),
      'arn:aws:lambda:us-east-1:123456789:function:WriteBatch': (input: any) => {
        writeBatchInput = input;
        return { written: input.items?.length ?? 0 };
      },
    };

    const runner = new LocalRunner(asl, { services });
    await runner.execute({ source: 'batch-db', limit: 10 });

    expect(writeBatchInput).not.toBeNull();
    expect(writeBatchInput.items).toHaveLength(2);
  });
});
