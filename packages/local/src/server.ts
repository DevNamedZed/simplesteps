// ---------------------------------------------------------------------------
// HTTP server for local state machine execution.
//
// Provides a REST API for registering state machine definitions and
// executing them. Uses Node.js built-in http module (zero dependencies).
// ---------------------------------------------------------------------------

import { createServer, IncomingMessage, ServerResponse, Server } from 'http';
import { LocalRunner } from './runner.js';
import type { RunnerOptions, ExecutionTrace } from './types.js';
import type { StateMachineDefinition } from '@simplesteps/core/asl';
import { StateMachineError } from './errors.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RegisteredMachine {
  name: string;
  definition: StateMachineDefinition;
  services: RunnerOptions['services'];
}

interface ExecutionRecord {
  id: string;
  stateMachineName: string;
  status: 'RUNNING' | 'SUCCEEDED' | 'FAILED';
  input: any;
  output: any;
  trace?: ExecutionTrace;
  error?: { name: string; message: string };
  startTime: string;
  endTime?: string;
}

export interface ServerOptions {
  port?: number;
  /** Default service mocks applied to all executions. */
  services?: RunnerOptions['services'];
  /** Pre-register a state machine at startup. */
  definition?: StateMachineDefinition;
  /** Name for the pre-registered state machine. */
  name?: string;
}

// ---------------------------------------------------------------------------
// Server
// ---------------------------------------------------------------------------

export class LocalServer {
  private server: Server | null = null;
  private machines = new Map<string, RegisteredMachine>();
  private executions = new Map<string, ExecutionRecord>();
  private executionCounter = 0;
  private defaultServices: RunnerOptions['services'];

  constructor(private options: ServerOptions = {}) {
    this.defaultServices = options.services ?? {};

    // Pre-register definition if provided
    if (options.definition) {
      const name = options.name ?? 'default';
      this.machines.set(name, {
        name,
        definition: options.definition,
        services: this.defaultServices,
      });
    }
  }

  /**
   * Start the HTTP server.
   */
  async start(): Promise<{ port: number }> {
    const port = this.options.port ?? 0; // 0 = auto-assign

    return new Promise((resolve, reject) => {
      this.server = createServer((req, res) => this.handleRequest(req, res));
      this.server.listen(port, () => {
        const address = this.server!.address();
        const assignedPort = typeof address === 'object' ? address!.port : port;
        resolve({ port: assignedPort });
      });
      this.server.on('error', reject);
    });
  }

  /**
   * Stop the HTTP server.
   */
  async stop(): Promise<void> {
    return new Promise((resolve) => {
      if (this.server) {
        this.server.close(() => resolve());
      } else {
        resolve();
      }
    });
  }

  // ---------------------------------------------------------------------------
  // Request handling
  // ---------------------------------------------------------------------------

  private async handleRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const url = new URL(req.url ?? '/', `http://localhost`);
    const method = req.method ?? 'GET';

    try {
      // POST /state-machines
      if (method === 'POST' && url.pathname === '/state-machines') {
        const body = await readBody(req);
        return this.handleRegister(body, res);
      }

      // POST /executions
      if (method === 'POST' && url.pathname === '/executions') {
        const body = await readBody(req);
        return await this.handleExecute(body, res);
      }

      // GET /executions/:id
      const execMatch = url.pathname.match(/^\/executions\/(.+)$/);
      if (method === 'GET' && execMatch) {
        return this.handleGetExecution(execMatch[1], res);
      }

      // GET /executions
      if (method === 'GET' && url.pathname === '/executions') {
        return this.handleListExecutions(res);
      }

      // GET /health
      if (method === 'GET' && url.pathname === '/health') {
        return sendJson(res, 200, { status: 'ok', machines: this.machines.size });
      }

      sendJson(res, 404, { error: 'Not Found' });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      sendJson(res, 500, { error: 'Internal Server Error', message });
    }
  }

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  private handleRegister(body: any, res: ServerResponse): void {
    if (!body.name || !body.definition) {
      return sendJson(res, 400, { error: 'Missing required fields: name, definition' });
    }

    const machine: RegisteredMachine = {
      name: body.name,
      definition: body.definition,
      services: { ...this.defaultServices, ...(body.services ?? {}) },
    };
    this.machines.set(body.name, machine);
    sendJson(res, 201, { name: body.name, status: 'registered' });
  }

  private async handleExecute(body: any, res: ServerResponse): Promise<void> {
    // Allow inline definition or reference to registered machine
    let definition: StateMachineDefinition;
    let services = { ...this.defaultServices };
    let machineName = 'inline';

    if (body.definition) {
      definition = body.definition;
    } else if (body.stateMachine) {
      const machine = this.machines.get(body.stateMachine);
      if (!machine) {
        return sendJson(res, 404, { error: `State machine not found: ${body.stateMachine}` });
      }
      definition = machine.definition;
      services = { ...services, ...machine.services };
      machineName = machine.name;
    } else if (this.machines.size === 1) {
      // If only one machine registered, use it by default
      const [machine] = this.machines.values();
      definition = machine.definition;
      services = { ...services, ...machine.services };
      machineName = machine.name;
    } else {
      return sendJson(res, 400, {
        error: 'Specify either "definition" (inline) or "stateMachine" (registered name)',
      });
    }

    // Build execution-specific services from body
    if (body.services) {
      // For HTTP API, services are function-like objects.
      // In real usage, these would be injected differently.
      // For now, body.services is merged as-is.
      services = { ...services, ...body.services };
    }

    const executionId = `exec-${++this.executionCounter}`;
    const input = body.input ?? {};

    const record: ExecutionRecord = {
      id: executionId,
      stateMachineName: machineName,
      status: 'RUNNING',
      input,
      output: undefined,
      startTime: new Date().toISOString(),
    };
    this.executions.set(executionId, record);

    const runner = new LocalRunner(definition, { services });

    try {
      const { output, trace } = await runner.executeWithTrace(input);
      record.status = trace.error ? 'FAILED' : 'SUCCEEDED';
      record.output = output;
      record.trace = trace;
      record.error = trace.error;
      record.endTime = new Date().toISOString();

      sendJson(res, 200, {
        executionId,
        status: record.status,
        output: record.output,
        error: record.error,
        trace: {
          totalSteps: trace.totalSteps,
          states: trace.states.map(s => ({
            name: s.name,
            type: s.type,
            duration: s.duration,
            error: s.error,
          })),
        },
      });
    } catch (err) {
      const error = err instanceof Error
        ? { name: err.name, message: err.message }
        : { name: 'Error', message: String(err) };
      record.status = 'FAILED';
      record.error = error;
      record.endTime = new Date().toISOString();

      sendJson(res, 200, { executionId, status: 'FAILED', error });
    }
  }

  private handleGetExecution(id: string, res: ServerResponse): void {
    const record = this.executions.get(id);
    if (!record) {
      return sendJson(res, 404, { error: `Execution not found: ${id}` });
    }
    sendJson(res, 200, record);
  }

  private handleListExecutions(res: ServerResponse): void {
    const executions = Array.from(this.executions.values()).map(e => ({
      id: e.id,
      stateMachineName: e.stateMachineName,
      status: e.status,
      startTime: e.startTime,
      endTime: e.endTime,
    }));
    sendJson(res, 200, { executions });
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    req.on('data', (chunk: Uint8Array) => chunks.push(chunk));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf-8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch (err) {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res: ServerResponse, status: number, data: any): void {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}
