import { LocalServer } from '../../src/server.js';
import type { StateMachineDefinition } from '@simplesteps/core/asl';

function fetch(port: number, path: string, options: { method?: string; body?: any } = {}): Promise<{ status: number; data: any }> {
  const http = require('http');
  return new Promise((resolve, reject) => {
    const bodyStr = options.body ? JSON.stringify(options.body) : undefined;
    const req = http.request(
      {
        hostname: 'localhost',
        port,
        path,
        method: options.method ?? 'GET',
        headers: bodyStr
          ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(bodyStr) }
          : {},
      },
      (res: any) => {
        const chunks: Uint8Array[] = [];
        res.on('data', (chunk: Uint8Array) => chunks.push(chunk));
        res.on('end', () => {
          const body = Buffer.concat(chunks).toString('utf-8');
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        });
      },
    );
    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

const simpleDefinition: StateMachineDefinition = {
  StartAt: 'Echo',
  States: {
    Echo: { Type: 'Pass', End: true },
  },
};

const taskDefinition: StateMachineDefinition = {
  StartAt: 'CallService',
  States: {
    CallService: {
      Type: 'Task',
      Resource: 'arn:aws:lambda:*',
      End: true,
    },
  },
};

describe('LocalServer', () => {
  let server: LocalServer;
  let port: number;

  afterEach(async () => {
    if (server) await server.stop();
  });

  it('starts and responds to health check', async () => {
    server = new LocalServer();
    ({ port } = await server.start());

    const { status, data } = await fetch(port, '/health');
    expect(status).toBe(200);
    expect(data.status).toBe('ok');
  });

  it('executes inline definition via POST /executions', async () => {
    server = new LocalServer();
    ({ port } = await server.start());

    const { status, data } = await fetch(port, '/executions', {
      method: 'POST',
      body: {
        definition: simpleDefinition,
        input: { hello: 'world' },
      },
    });

    expect(status).toBe(200);
    expect(data.status).toBe('SUCCEEDED');
    expect(data.output).toEqual({ hello: 'world' });
  });

  it('registers and executes named state machine', async () => {
    server = new LocalServer();
    ({ port } = await server.start());

    // Register
    const reg = await fetch(port, '/state-machines', {
      method: 'POST',
      body: { name: 'echo', definition: simpleDefinition },
    });
    expect(reg.status).toBe(201);

    // Execute
    const { data } = await fetch(port, '/executions', {
      method: 'POST',
      body: { stateMachine: 'echo', input: { foo: 'bar' } },
    });
    expect(data.status).toBe('SUCCEEDED');
    expect(data.output).toEqual({ foo: 'bar' });
  });

  it('retrieves execution by ID', async () => {
    server = new LocalServer({ definition: simpleDefinition });
    ({ port } = await server.start());

    const exec = await fetch(port, '/executions', {
      method: 'POST',
      body: { input: { test: true } },
    });

    const { data } = await fetch(port, `/executions/${exec.data.executionId}`);
    expect(data.id).toBe(exec.data.executionId);
    expect(data.status).toBe('SUCCEEDED');
    expect(data.output).toEqual({ test: true });
  });

  it('lists all executions', async () => {
    server = new LocalServer({ definition: simpleDefinition });
    ({ port } = await server.start());

    await fetch(port, '/executions', { method: 'POST', body: { input: { a: 1 } } });
    await fetch(port, '/executions', { method: 'POST', body: { input: { b: 2 } } });

    const { data } = await fetch(port, '/executions');
    expect(data.executions).toHaveLength(2);
  });

  it('returns trace information', async () => {
    server = new LocalServer({
      definition: {
        StartAt: 'A',
        States: {
          A: { Type: 'Pass', Next: 'B' },
          B: { Type: 'Pass', End: true },
        },
      },
    });
    ({ port } = await server.start());

    const { data } = await fetch(port, '/executions', {
      method: 'POST',
      body: { input: {} },
    });

    expect(data.trace).toBeDefined();
    expect(data.trace.totalSteps).toBe(2);
    expect(data.trace.states).toHaveLength(2);
  });

  it('handles failed execution', async () => {
    server = new LocalServer({
      definition: {
        StartAt: 'Fail',
        States: {
          Fail: { Type: 'Fail', Error: 'TestError', Cause: 'test failure' },
        },
      },
    });
    ({ port } = await server.start());

    const { data } = await fetch(port, '/executions', {
      method: 'POST',
      body: { input: {} },
    });

    expect(data.status).toBe('FAILED');
    expect(data.error).toEqual({ name: 'TestError', message: 'test failure' });
  });

  it('returns 404 for unknown execution', async () => {
    server = new LocalServer();
    ({ port } = await server.start());

    const { status } = await fetch(port, '/executions/nonexistent');
    expect(status).toBe(404);
  });

  it('returns 404 for unknown routes', async () => {
    server = new LocalServer();
    ({ port } = await server.start());

    const { status } = await fetch(port, '/unknown');
    expect(status).toBe(404);
  });

  it('uses pre-registered definition with default services', async () => {
    const mock = jest.fn().mockReturnValue({ processed: true });
    server = new LocalServer({
      definition: taskDefinition,
      services: { 'arn:aws:lambda:*': mock },
    });
    ({ port } = await server.start());

    const { data } = await fetch(port, '/executions', {
      method: 'POST',
      body: { input: { data: 'hello' } },
    });

    expect(data.status).toBe('SUCCEEDED');
    expect(data.output).toEqual({ processed: true });
    expect(mock).toHaveBeenCalledWith({ data: 'hello' }, expect.any(Object));
  });

  it('auto-selects single registered machine', async () => {
    server = new LocalServer();
    ({ port } = await server.start());

    // Register one machine
    await fetch(port, '/state-machines', {
      method: 'POST',
      body: { name: 'only-one', definition: simpleDefinition },
    });

    // Execute without specifying machine
    const { data } = await fetch(port, '/executions', {
      method: 'POST',
      body: { input: { auto: true } },
    });

    expect(data.status).toBe('SUCCEEDED');
    expect(data.output).toEqual({ auto: true });
  });
});
