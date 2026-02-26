// execution.ts — Execution panel for the playground.
//
// Provides in-browser execution of compiled ASL using LocalRunner,
// with smart service mock inference, visual graph, and execution trace.

import { LocalRunner } from '@simplesteps/local/runner';
import { StateMachineError } from '@simplesteps/local/errors';
import type { ExecutionTrace, StateExecution, ServiceMock } from '@simplesteps/local/types';
import { createGraphView, type GraphView, type GraphCallbacks } from './graph';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

let graphContainer: HTMLElement;
let graphView: GraphView | null = null;
let traceContainer: HTMLElement;
let inputTextarea: HTMLTextAreaElement;
let runBtn: HTMLButtonElement;
let outputArea: HTMLElement;
let mockConfigArea: HTMLElement;
let lastAslJson: string = '';
let lastAsl: any = null;
let lastTrace: ExecutionTrace | null = null;

/** Discovered Task states keyed by resource ARN with inferred mock JSON. */
let discoveredTasks: TaskInfo[] = [];

interface TaskInfo {
  arn: string;
  stateName: string;
  inferredResponse: Record<string, any>;
}

/** Mock modes per resource ARN. */
const mockModes = new Map<string, 'auto' | 'echo' | 'error' | 'custom'>();
const customMockValues = new Map<string, string>();

// ---------------------------------------------------------------------------
// Exported functions for graph popover integration
// ---------------------------------------------------------------------------

/** Read mock state for a given ARN. */
export function getMockForArn(arn: string): { mode: string; value: string; inferred: any } | null {
  const task = discoveredTasks.find(t => t.arn === arn);
  if (!task) return null;
  const mode = mockModes.get(arn) ?? 'auto';
  const value = customMockValues.get(arn) ?? formatJson(task.inferredResponse);
  return { mode, value, inferred: task.inferredResponse };
}

/** Update mock for a given ARN. */
export function setMockForArn(arn: string, mode: string, customValue?: string): void {
  mockModes.set(arn, mode as 'auto' | 'echo' | 'error' | 'custom');
  if (customValue !== undefined) {
    customMockValues.set(arn, customValue);
  }
  // Re-render mock config sidebar to stay in sync
  renderMockConfig();
}

/** Re-execute with current mocks, updating graph trace in-place. */
export async function reRunExecution(): Promise<void> {
  if (!lastAsl) return;

  let input: any;
  try {
    input = JSON.parse(inputTextarea.value || '{}');
  } catch {
    return;
  }

  const services = buildServiceMocks();
  runBtn.disabled = true;

  try {
    const runner = new LocalRunner(lastAsl, { services, maxSteps: 200 });
    const { output, trace } = await runner.executeWithTrace(input);
    lastTrace = trace;

    // Update graph in-place via updateTrace
    if (graphView) {
      graphView.updateTrace(lastAsl, trace);
    }

    renderTrace(trace);
    renderOutput(output, trace);
  } catch (err: any) {
    renderError(err.message ?? String(err));
  } finally {
    runBtn.disabled = false;
  }
}

/** Get the trace entry for a specific state. */
export function getTraceForState(stateName: string): StateExecution | undefined {
  if (!lastTrace) return undefined;
  return lastTrace.states.find(s => s.name === stateName);
}

/** Get the ASL state definition. */
export function getAslState(stateName: string): any {
  if (!lastAsl?.States) return undefined;
  return lastAsl.States[stateName];
}

// ---------------------------------------------------------------------------
// Graph callbacks (passed to createGraphView)
// ---------------------------------------------------------------------------

function getGraphCallbacks(): GraphCallbacks {
  return {
    getMockForArn,
    setMockForArn,
    reRun: reRunExecution,
    getTraceForState,
    getAslState,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Build the execution panel DOM inside the given container.
 * Called once on startup.
 */
export function initExecutionPanel(container: HTMLElement): void {
  container.innerHTML = '';

  // Graph section (flex-expands to fill available space)
  const graphSection = el('div', 'exec-section exec-graph-section');
  graphSection.appendChild(el('div', 'exec-section-header', 'State Machine'));
  graphContainer = el('div', 'exec-graph');
  graphContainer.innerHTML = '<span class="exec-muted">Compile a workflow to see the graph</span>';
  graphSection.appendChild(graphContainer);

  // Input section
  const inputSection = el('div', 'exec-section');
  inputSection.appendChild(el('div', 'exec-section-header', 'Input'));
  inputTextarea = document.createElement('textarea');
  inputTextarea.className = 'exec-input';
  inputTextarea.value = '{}';
  inputTextarea.spellcheck = false;
  inputSection.appendChild(inputTextarea);

  // Mock config section
  const mockSection = el('div', 'exec-section');
  mockSection.appendChild(el('div', 'exec-section-header', 'Service Mocks'));
  mockConfigArea = el('div', 'exec-mock-config');
  mockConfigArea.innerHTML = '<span class="exec-muted">Compile a workflow to detect services</span>';
  mockSection.appendChild(mockConfigArea);

  // Run button
  runBtn = document.createElement('button');
  runBtn.id = 'exec-run-btn';
  runBtn.textContent = 'Run Execution';
  runBtn.addEventListener('click', () => executeCurrentAsl());

  // Trace section
  const traceSection = el('div', 'exec-section exec-trace-section');
  traceSection.appendChild(el('div', 'exec-section-header', 'Execution Trace'));
  traceContainer = el('div', 'exec-trace');
  traceContainer.innerHTML = '<span class="exec-muted">Click "Run" to execute the workflow</span>';
  traceSection.appendChild(traceContainer);

  // Output section
  const outputSection = el('div', 'exec-section');
  outputSection.appendChild(el('div', 'exec-section-header', 'Final Output'));
  outputArea = el('div', 'exec-output');
  outputArea.innerHTML = '<span class="exec-muted">&mdash;</span>';
  outputSection.appendChild(outputArea);

  container.appendChild(graphSection);
  container.appendChild(inputSection);
  container.appendChild(mockSection);
  container.appendChild(runBtn);
  container.appendChild(traceSection);
  container.appendChild(outputSection);
}

/**
 * Update the panel with the current ASL JSON (called after each compile).
 * Scans for Task resources, infers mock responses, and renders the graph.
 */
export function updateAsl(aslJson: string): void {
  lastAslJson = aslJson;
  lastTrace = null;
  try {
    lastAsl = JSON.parse(aslJson);
    discoveredTasks = analyzeServices(lastAsl);
    renderMockConfig();
    renderStaticGraph();
  } catch {
    lastAsl = null;
    discoveredTasks = [];
  }
}

// ---------------------------------------------------------------------------
// Static graph (no trace overlay)
// ---------------------------------------------------------------------------

function renderStaticGraph(): void {
  graphContainer.innerHTML = '';
  if (!lastAsl || !lastAsl.States) {
    graphContainer.innerHTML = '<span class="exec-muted">No state machine</span>';
    return;
  }
  graphView = createGraphView(lastAsl, null, getGraphCallbacks());
  graphView.onNodeClick(scrollToTraceCard);
  graphContainer.appendChild(graphView.element);
}

// ---------------------------------------------------------------------------
// Build service mocks from current state
// ---------------------------------------------------------------------------

function buildServiceMocks(): Record<string, ServiceMock> {
  const services: Record<string, ServiceMock> = {};
  for (const task of discoveredTasks) {
    const mode = mockModes.get(task.arn) ?? 'auto';
    if (mode === 'auto') {
      const inferred = task.inferredResponse;
      services[task.arn] = () => ({ ...inferred });
    } else if (mode === 'echo') {
      services[task.arn] = (inp: any) => inp;
    } else if (mode === 'error') {
      services[task.arn] = () => {
        throw new StateMachineError('MockError', `Simulated error for ${shortArn(task.arn)}`);
      };
    } else {
      const customJson = customMockValues.get(task.arn) ?? '{}';
      try {
        const parsed = JSON.parse(customJson);
        services[task.arn] = () => parsed;
      } catch {
        services[task.arn] = () => ({ error: 'Invalid custom mock JSON' });
      }
    }
  }
  return services;
}

// ---------------------------------------------------------------------------
// Execution
// ---------------------------------------------------------------------------

async function executeCurrentAsl(): Promise<void> {
  if (!lastAsl) {
    renderError('No compiled ASL to execute. Compile a workflow first.');
    return;
  }

  let input: any;
  try {
    input = JSON.parse(inputTextarea.value || '{}');
  } catch {
    renderError('Input JSON is invalid.');
    return;
  }

  const services = buildServiceMocks();

  // Show running state
  traceContainer.innerHTML = '<span class="exec-muted exec-running">Executing...</span>';
  outputArea.innerHTML = '<span class="exec-muted">&mdash;</span>';
  runBtn.disabled = true;

  try {
    const runner = new LocalRunner(lastAsl, { services, maxSteps: 200 });
    const { output, trace } = await runner.executeWithTrace(input);
    lastTrace = trace;

    // Render graph with trace overlay
    graphContainer.innerHTML = '';
    graphView = createGraphView(lastAsl, trace, getGraphCallbacks());
    graphView.onNodeClick(scrollToTraceCard);
    graphContainer.appendChild(graphView.element);

    renderTrace(trace);
    renderOutput(output, trace);
  } catch (err: any) {
    renderError(err.message ?? String(err));
  } finally {
    runBtn.disabled = false;
  }
}

// ---------------------------------------------------------------------------
// Service analysis & mock inference
// ---------------------------------------------------------------------------

/**
 * Analyze the ASL to discover Task resources and infer realistic mock responses.
 *
 * Strategy: For each Task state, look at what downstream states expect from
 * this task's result — scan Assign fields, Arguments, Parameters, and
 * Choice conditions to discover expected field names and generate plausible
 * placeholder values.
 */
function analyzeServices(asl: any): TaskInfo[] {
  const tasks: TaskInfo[] = [];
  if (!asl.States) return tasks;

  const states = asl.States as Record<string, any>;

  for (const [name, state] of Object.entries(states)) {
    if (state.Type !== 'Task' || !state.Resource) continue;

    // Find what the task's result variable name is
    const assignVar = findAssignedVar(state);

    // Look at downstream states to see what fields they access from this result
    const usedFields = findUsedFields(states, name, assignVar);

    // Generate inferred response with placeholder values
    const inferredResponse = generateMockResponse(usedFields, name);

    tasks.push({ arn: state.Resource, stateName: name, inferredResponse });
  }

  return tasks;
}

/**
 * Find the variable name assigned to a Task state's result.
 * JSONata mode: `Assign: { myVar: "{% $states.result %}" }` -> "myVar"
 * JSONPath mode: `ResultPath: "$.myVar"` -> "myVar"
 */
function findAssignedVar(state: any): string | null {
  // JSONata: Assign field
  if (state.Assign) {
    for (const [key, val] of Object.entries(state.Assign)) {
      if (typeof val === 'string' && val.includes('$states.result')) {
        return key;
      }
    }
    // If Assign exists but no $states.result, use first key
    const keys = Object.keys(state.Assign);
    if (keys.length > 0) return keys[0];
  }
  // JSONPath: ResultPath
  if (state.ResultPath && typeof state.ResultPath === 'string') {
    return state.ResultPath.replace(/^\$\./, '');
  }
  return null;
}

/**
 * Scan downstream states to discover what fields they access from a task's result.
 * Returns a set of field paths like ["valid", "chargeId", "items"].
 */
function findUsedFields(
  states: Record<string, any>,
  taskStateName: string,
  assignVar: string | null,
): Set<string> {
  const fields = new Set<string>();
  if (!assignVar) return fields;

  // Patterns to search for:
  // JSONata: "$myVar.fieldName" or "$myVar" in expressions
  const jsonataPattern = new RegExp(`\\$${escapeRegex(assignVar)}\\.([a-zA-Z_][a-zA-Z0-9_]*)`, 'g');
  // JSONPath: "$.myVar.fieldName"
  const jsonpathPattern = new RegExp(`\\$\\.${escapeRegex(assignVar)}\\.([a-zA-Z_][a-zA-Z0-9_]*)`, 'g');

  // Search all states (not just the immediate next one)
  const aslJson = JSON.stringify(states);

  for (const match of aslJson.matchAll(jsonataPattern)) {
    fields.add(match[1]);
  }
  for (const match of aslJson.matchAll(jsonpathPattern)) {
    fields.add(match[1]);
  }

  return fields;
}

/**
 * Generate a mock response object with placeholder values for each discovered field.
 * Uses the field name to guess appropriate types.
 */
function generateMockResponse(fields: Set<string>, stateName: string): Record<string, any> {
  if (fields.size === 0) {
    // No fields discovered — return a generic response based on state name
    return { result: 'ok' };
  }

  const response: Record<string, any> = {};
  for (const field of fields) {
    response[field] = guessFieldValue(field);
  }
  return response;
}

/**
 * Guess a plausible placeholder value for a field based on its name.
 */
function guessFieldValue(field: string): any {
  const lower = field.toLowerCase();

  // Booleans
  if (lower === 'valid' || lower === 'success' || lower === 'ok' || lower === 'enabled'
    || lower === 'active' || lower === 'sent' || lower === 'confirmed' || lower === 'approved'
    || lower.startsWith('is') || lower.startsWith('has') || lower.startsWith('can')) {
    return true;
  }

  // Numbers
  if (lower === 'count' || lower === 'total' || lower === 'amount' || lower === 'price'
    || lower === 'quantity' || lower === 'size' || lower === 'length' || lower === 'written'
    || lower === 'progress' || lower === 'score' || lower === 'age' || lower === 'value') {
    return 42;
  }

  // IDs
  if (lower === 'id' || lower.endsWith('id') || lower.endsWith('Id')) {
    return 'mock-' + lower + '-001';
  }

  // Arrays
  if (lower === 'items' || lower === 'records' || lower === 'results' || lower === 'list'
    || lower === 'data' || lower === 'entries' || lower === 'rows') {
    return [{ id: '1' }, { id: '2' }];
  }

  // Status/type strings
  if (lower === 'status' || lower === 'state') {
    return 'completed';
  }
  if (lower === 'type' || lower === 'kind' || lower === 'category') {
    return 'default';
  }

  // Name/label strings
  if (lower === 'name' || lower === 'label' || lower === 'title') {
    return 'Mock ' + field;
  }

  // Message/description strings
  if (lower === 'message' || lower === 'description' || lower === 'reason' || lower === 'error') {
    return 'Mock ' + field;
  }

  // Default: string with the field name
  return 'mock_' + field;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ---------------------------------------------------------------------------
// Resource discovery (kept for backward compat)
// ---------------------------------------------------------------------------

function extractResources(asl: any): string[] {
  return analyzeServices(asl).map(t => t.arn);
}

// ---------------------------------------------------------------------------
// Mock config UI
// ---------------------------------------------------------------------------

function renderMockConfig(): void {
  mockConfigArea.innerHTML = '';
  if (discoveredTasks.length === 0) {
    mockConfigArea.innerHTML = '<span class="exec-muted">No Task resources detected</span>';
    return;
  }

  for (const task of discoveredTasks) {
    const row = el('div', 'exec-mock-row');

    const label = el('span', 'exec-mock-label', shortArn(task.arn));
    label.title = task.arn;

    const select = document.createElement('select');
    select.className = 'exec-mock-select';
    const current = mockModes.get(task.arn) ?? 'auto';
    for (const opt of ['auto', 'echo', 'error', 'custom'] as const) {
      const option = document.createElement('option');
      option.value = opt;
      option.textContent = opt === 'auto' ? 'Auto (inferred)'
        : opt === 'echo' ? 'Echo input'
        : opt === 'error' ? 'Throw error'
        : 'Custom JSON';
      option.selected = opt === current;
      select.appendChild(option);
    }

    // Preview of inferred response (shown in auto mode)
    const inferredPreview = el('div', 'exec-mock-inferred');
    inferredPreview.textContent = formatJson(task.inferredResponse);
    inferredPreview.style.display = current === 'auto' ? 'block' : 'none';

    // Custom JSON textarea (hidden unless custom mode)
    const customInput = document.createElement('textarea');
    customInput.className = 'exec-mock-custom';
    customInput.value = customMockValues.get(task.arn) ?? formatJson(task.inferredResponse);
    customInput.rows = 2;
    customInput.spellcheck = false;
    customInput.style.display = current === 'custom' ? 'block' : 'none';
    customInput.addEventListener('input', () => {
      customMockValues.set(task.arn, customInput.value);
    });

    select.addEventListener('change', () => {
      const mode = select.value as 'auto' | 'echo' | 'error' | 'custom';
      mockModes.set(task.arn, mode);
      inferredPreview.style.display = mode === 'auto' ? 'block' : 'none';
      customInput.style.display = mode === 'custom' ? 'block' : 'none';
      // Pre-populate custom with inferred when switching to custom
      if (mode === 'custom' && !customMockValues.has(task.arn)) {
        customInput.value = formatJson(task.inferredResponse);
      }
    });

    row.appendChild(label);
    row.appendChild(select);
    mockConfigArea.appendChild(row);
    mockConfigArea.appendChild(inferredPreview);
    mockConfigArea.appendChild(customInput);
  }
}

// ---------------------------------------------------------------------------
// Trace rendering
// ---------------------------------------------------------------------------

function renderTrace(trace: ExecutionTrace): void {
  traceContainer.innerHTML = '';

  // Summary bar
  const status = trace.error ? 'FAILED' : 'SUCCEEDED';
  const statusClass = trace.error ? 'exec-status-failed' : 'exec-status-success';
  const summary = el('div', `exec-summary ${statusClass}`);
  summary.innerHTML = `Status: <strong>${status}</strong> &nbsp; Steps: <strong>${trace.totalSteps}</strong>`;
  traceContainer.appendChild(summary);

  // State cards
  for (const state of trace.states) {
    traceContainer.appendChild(renderStateCard(state));
  }
}

function scrollToTraceCard(stateId: string): void {
  const card = traceContainer.querySelector(`[data-state="${CSS.escape(stateId)}"]`) as HTMLElement | null;
  if (!card) return;
  // Expand details
  const details = card.querySelector('.exec-state-details') as HTMLElement | null;
  if (details) details.style.display = 'block';
  // Highlight briefly
  card.classList.add('exec-state-highlight');
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  setTimeout(() => card.classList.remove('exec-state-highlight'), 1500);
}

function renderStateCard(state: StateExecution): HTMLElement {
  const card = el('div', 'exec-state-card');
  card.dataset.state = state.name;

  // Header row
  const header = el('div', 'exec-state-header');
  const dot = el('span', state.error ? 'exec-dot exec-dot-error' : 'exec-dot exec-dot-ok');
  const name = el('span', 'exec-state-name', state.name);
  const type = el('span', 'exec-state-type', `(${state.type})`);
  const time = el('span', 'exec-state-time', `${state.duration}ms`);

  header.appendChild(dot);
  header.appendChild(name);
  header.appendChild(type);
  header.appendChild(time);

  if (state.error) {
    const errBadge = el('span', 'exec-badge-error', 'ERROR');
    header.appendChild(errBadge);
  }

  card.appendChild(header);

  // Collapsible details
  const details = el('div', 'exec-state-details');
  details.style.display = 'none';

  if (state.type === 'Choice' && state.transition) {
    details.appendChild(detailRow('Branch', state.transition));
  }

  if (state.retryAttempt !== undefined && state.retryAttempt > 0) {
    details.appendChild(detailRow('Retry', `attempt #${state.retryAttempt}`));
  }

  if (state.error) {
    details.appendChild(detailRow('Error', `${state.error.name}: ${state.error.message}`));
  }

  details.appendChild(detailRow('Input', formatJson(state.input)));
  details.appendChild(detailRow('Output', formatJson(state.output)));

  card.appendChild(details);

  // Toggle details on header click
  header.style.cursor = 'pointer';
  header.addEventListener('click', () => {
    details.style.display = details.style.display === 'none' ? 'block' : 'none';
  });

  return card;
}

function detailRow(label: string, value: string): HTMLElement {
  const row = el('div', 'exec-detail-row');
  row.appendChild(el('span', 'exec-detail-label', `${label}:`));
  const pre = el('pre', 'exec-detail-value');
  pre.textContent = value;
  row.appendChild(pre);
  return row;
}

// ---------------------------------------------------------------------------
// Output rendering
// ---------------------------------------------------------------------------

function renderOutput(output: any, trace: ExecutionTrace): void {
  outputArea.innerHTML = '';
  if (trace.error) {
    const errDiv = el('div', 'exec-output-error');
    errDiv.textContent = `${trace.error.name}: ${trace.error.message}`;
    outputArea.appendChild(errDiv);
  } else {
    const pre = el('pre', 'exec-output-json');
    pre.textContent = formatJson(output);
    outputArea.appendChild(pre);
  }
}

function renderError(message: string): void {
  traceContainer.innerHTML = '';
  const errDiv = el('div', 'exec-output-error');
  errDiv.textContent = message;
  traceContainer.appendChild(errDiv);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function el(tag: string, className: string, text?: string): HTMLElement {
  const element = document.createElement(tag);
  element.className = className;
  if (text) element.textContent = text;
  return element;
}

function shortArn(arn: string): string {
  const parts = arn.split(':');
  return parts[parts.length - 1] || arn;
}

function formatJson(value: any): string {
  if (value === undefined || value === null) return 'null';
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}
