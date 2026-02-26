// graph.ts — Interactive state machine graph with AWS service icons,
// detail popovers, inline mock editing, and execution trace overlay.

import type { ExecutionTrace, StateExecution } from '@simplesteps/local/types';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface GraphCallbacks {
  getMockForArn?: (arn: string) => { mode: string; value: string; inferred: any } | null;
  setMockForArn?: (arn: string, mode: string, customValue?: string) => void;
  reRun?: () => Promise<void>;
  getTraceForState?: (stateName: string) => StateExecution | undefined;
  getAslState?: (stateName: string) => any;
}

export interface GraphView {
  element: HTMLElement;
  onNodeClick(cb: (stateId: string) => void): void;
  fitToView(): void;
  updateTrace(asl: any, trace: ExecutionTrace): void;
}

export function createGraphView(
  asl: any,
  trace: ExecutionTrace | null = null,
  callbacks: GraphCallbacks = {},
): GraphView {
  const { nodes, edges } = buildGraph(asl);
  layoutGraph(nodes, edges, asl.StartAt);
  if (trace) overlayTrace(nodes, edges, trace);

  let contentW = 0, contentH = 0;
  for (const n of nodes.values()) {
    contentW = Math.max(contentW, n.x + NODE_W);
    contentH = Math.max(contentH, n.y + NODE_H);
  }
  contentW += PAD * 2;
  contentH += PAD * 2;

  const container = h('div', 'graph-root');
  const toolbar = buildToolbar();
  const canvas = h('div', 'graph-canvas');
  const svg = buildSvg(contentW, contentH, nodes, edges, asl.StartAt);
  canvas.appendChild(svg);
  container.appendChild(toolbar.el);
  container.appendChild(canvas);

  // Popover (HTML, positioned over SVG)
  const popover = h('div', 'graph-popover');
  popover.style.display = 'none';
  canvas.appendChild(popover);

  // --------------- Pan / Zoom ---------------
  let scale = 1, tx = 0, ty = 0;
  let dragging = false, dragStartX = 0, dragStartY = 0, dragStartTx = 0, dragStartTy = 0;
  const content = svg.querySelector('#graph-content') as SVGGElement;

  function applyTransform() {
    content.setAttribute('transform', `translate(${tx},${ty}) scale(${scale})`);
    toolbar.zoomLabel.textContent = `${Math.round(scale * 100)}%`;
  }

  function zoomTo(newScale: number, cx: number, cy: number) {
    const clamped = Math.max(0.15, Math.min(4, newScale));
    const rect = canvas.getBoundingClientRect();
    const sx = cx - rect.left, sy = cy - rect.top;
    const gx = (sx - tx) / scale, gy = (sy - ty) / scale;
    scale = clamped;
    tx = sx - gx * scale;
    ty = sy - gy * scale;
    applyTransform();
  }

  function fitView() {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    scale = Math.min(rect.width / contentW, rect.height / contentH, 1.5) * 0.9;
    tx = (rect.width - contentW * scale) / 2;
    ty = (rect.height - contentH * scale) / 2;
    applyTransform();
  }

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    zoomTo(scale * (e.deltaY < 0 ? 1.12 : 1 / 1.12), e.clientX, e.clientY);
  }, { passive: false });

  canvas.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    const t = e.target as HTMLElement;
    if (t.closest('.graph-node') || t.closest('.graph-popover')) return;
    dragging = true;
    dragStartX = e.clientX; dragStartY = e.clientY;
    dragStartTx = tx; dragStartTy = ty;
    canvas.style.cursor = 'grabbing';
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    tx = dragStartTx + (e.clientX - dragStartX);
    ty = dragStartTy + (e.clientY - dragStartY);
    applyTransform();
    hidePopover();
  });

  window.addEventListener('mouseup', () => {
    if (dragging) { dragging = false; canvas.style.cursor = ''; }
  });

  toolbar.zoomIn.addEventListener('click', () => {
    const r = canvas.getBoundingClientRect();
    zoomTo(scale * 1.3, r.left + r.width / 2, r.top + r.height / 2);
  });
  toolbar.zoomOut.addEventListener('click', () => {
    const r = canvas.getBoundingClientRect();
    zoomTo(scale / 1.3, r.left + r.width / 2, r.top + r.height / 2);
  });
  toolbar.fitBtn.addEventListener('click', fitView);

  canvas.addEventListener('dblclick', (e) => {
    if (!(e.target as SVGElement).closest('.graph-node')) fitView();
  });

  requestAnimationFrame(() => requestAnimationFrame(fitView));

  // --------------- Popover ---------------
  let popoverNodeId: string | null = null;

  function showPopover(stateId: string) {
    const node = nodes.get(stateId);
    if (!node) return;
    popoverNodeId = stateId;
    popover.innerHTML = '';
    popover.style.display = 'block';

    const state = node.state || {};
    const traceEntry = callbacks.getTraceForState?.(stateId);
    popover.appendChild(buildPopoverContent(stateId, node, state, traceEntry, callbacks));

    const cr = canvas.getBoundingClientRect();
    const pw = Math.min(320, cr.width - 16);
    popover.style.width = pw + 'px';

    let sx = node.x * scale + tx + (NODE_W * scale) / 2 - pw / 2;
    let sy = node.y * scale + ty + NODE_H * scale + 10;
    sx = Math.max(8, Math.min(cr.width - pw - 8, sx));
    sy = Math.max(8, Math.min(cr.height - 60, sy));
    popover.style.left = sx + 'px';
    popover.style.top = sy + 'px';
  }

  function hidePopover() {
    popover.style.display = 'none';
    popoverNodeId = null;
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popoverNodeId) hidePopover();
  });

  canvas.addEventListener('mousedown', (e) => {
    const t = e.target as HTMLElement;
    if (!t.closest('.graph-node') && !t.closest('.graph-popover')) hidePopover();
  });

  // --------------- Node click ---------------
  let nodeClickCb: ((id: string) => void) | null = null;
  let selectedNodeId: string | null = null;

  svg.addEventListener('click', (e) => {
    const nodeG = (e.target as SVGElement).closest('.graph-node') as SVGGElement | null;
    if (selectedNodeId) {
      svg.querySelector(`[data-state="${CSS.escape(selectedNodeId)}"]`)?.classList.remove('selected');
    }
    if (nodeG) {
      const stateId = nodeG.dataset.state!;
      nodeG.classList.add('selected');
      selectedNodeId = stateId;
      nodeClickCb?.(stateId);
      showPopover(stateId);
    } else {
      selectedNodeId = null;
    }
  });

  // --------------- updateTrace ---------------
  function updateTrace(_newAsl: any, newTrace: ExecutionTrace) {
    for (const n of nodes.values()) { n.status = undefined; n.duration = undefined; }
    for (const e of edges) { e.active = false; }
    overlayTrace(nodes, edges, newTrace);

    for (const n of nodes.values()) {
      const g = svg.querySelector(`[data-state="${CSS.escape(n.id)}"]`) as SVGGElement | null;
      if (!g) continue;
      const svc = n.resource ? detectService(n.resource) : null;
      const tl = (n.type || 'Pass').toLowerCase();
      const accent = svc?.color ?? TYPE_ACCENT[tl] ?? '#64748b';
      const [fill, stroke, strokeW, opacity] = statusStyle(n.status, accent);
      g.setAttribute('opacity', opacity);
      const bg = g.querySelector('.graph-node-bg') as SVGRectElement | null;
      if (bg) { bg.setAttribute('fill', fill); bg.setAttribute('stroke', stroke); bg.setAttribute('stroke-width', String(strokeW)); }
      g.querySelector('.graph-node-status')?.remove();
      if (n.status === 'success' || n.status === 'error') {
        g.appendChild(statusBadge(n));
      }
      const subEl = g.querySelector('.graph-node-sub') as SVGTextElement | null;
      if (subEl) subEl.textContent = buildSubtitle(n);
    }

    const paths = svg.querySelectorAll('.graph-edge-path');
    paths.forEach((p, i) => {
      if (i >= edges.length) return;
      const e = edges[i];
      if (e.active) {
        p.setAttribute('stroke', '#4ade80');
        p.setAttribute('stroke-width', '2.5');
        p.setAttribute('marker-end', 'url(#ah-green)');
        p.classList.add('graph-edge-active');
      } else {
        p.classList.remove('graph-edge-active');
      }
    });
    hidePopover();
  }

  return {
    element: container,
    onNodeClick(cb) { nodeClickCb = cb; },
    fitToView: fitView,
    updateTrace,
  };
}

// ---------------------------------------------------------------------------
// Data model
// ---------------------------------------------------------------------------

interface GNode {
  id: string;
  type: string;
  layer: number;
  col: number;
  x: number;
  y: number;
  status?: 'success' | 'error' | 'skipped';
  duration?: number;
  resource?: string;
  state?: any;
}

interface GEdge {
  from: string;
  to: string;
  label?: string;
  type: 'normal' | 'catch' | 'default' | 'choice';
  active?: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const NODE_W = 240;
const NODE_H = 64;
const LAYER_Y = 120;
const COL_X = 280;
const PAD = 60;
const R = 12;

const TYPE_ACCENT: Record<string, string> = {
  task:     '#3b82f6',
  pass:     '#8b5cf6',
  choice:   '#f59e0b',
  wait:     '#10b981',
  fail:     '#ef4444',
  succeed:  '#22c55e',
  parallel: '#6366f1',
  map:      '#6366f1',
};

// ---------------------------------------------------------------------------
// AWS Service Detection
// ---------------------------------------------------------------------------

interface ServiceInfo {
  key: string;
  color: string;
  label: string;
  /** Bold 1-2 char icon rendered inside badge */
  icon: string;
}

const SERVICE_RULES: Array<{ pattern: string; key: string; color: string; icon: string; name: string }> = [
  { pattern: ':lambda:',          key: 'lambda',      color: '#FF9900', icon: '\u03BB', name: 'Lambda' },
  { pattern: 'lambda:invoke',     key: 'lambda',      color: '#FF9900', icon: '\u03BB', name: 'Lambda' },
  { pattern: ':dynamodb:',        key: 'dynamodb',    color: '#3B82F6', icon: 'DB',     name: 'DynamoDB' },
  { pattern: ':sqs:',             key: 'sqs',         color: '#8B5CF6', icon: 'Q',      name: 'SQS' },
  { pattern: ':sns:',             key: 'sns',         color: '#EC4899', icon: 'N',      name: 'SNS' },
  { pattern: ':events:',          key: 'eventbridge', color: '#8B5CF6', icon: 'EB',     name: 'EventBridge' },
  { pattern: ':aws-sdk:s3:',      key: 's3',          color: '#22C55E', icon: 'S3',     name: 'S3' },
  { pattern: ':states:startexe',  key: 'sfn',         color: '#EC4899', icon: 'SF',     name: 'SFN' },
  { pattern: ':ecs:',             key: 'ecs',         color: '#FF9900', icon: 'CS',     name: 'ECS' },
  { pattern: ':bedrock:',         key: 'bedrock',     color: '#06B6D4', icon: 'AI',     name: 'Bedrock' },
  { pattern: ':batch:',           key: 'batch',       color: '#FF9900', icon: 'BA',     name: 'Batch' },
  { pattern: ':glue:',            key: 'glue',        color: '#3B82F6', icon: 'GL',     name: 'Glue' },
  { pattern: ':aws-sdk:secretsm', key: 'secrets',     color: '#EF4444', icon: 'SM',     name: 'Secrets' },
  { pattern: ':aws-sdk:ssm:',     key: 'ssm',         color: '#EF4444', icon: 'SS',     name: 'SSM' },
  { pattern: ':aws-sdk:',         key: 'aws',         color: '#FF9900', icon: 'AW',     name: 'AWS' },
];

function detectService(arn: string): ServiceInfo | null {
  if (!arn) return null;
  const a = arn.toLowerCase();
  for (const r of SERVICE_RULES) {
    if (a.includes(r.pattern)) {
      return { key: r.key, color: r.color, icon: r.icon, label: shortServiceLabel(arn, r.name) };
    }
  }
  return null;
}

function shortServiceLabel(arn: string, serviceName: string): string {
  const parts = arn.split(':');
  const last = parts[parts.length - 1];
  if (last && last !== '*' && last.length < 20) return `${serviceName}:${last}`;
  return serviceName;
}

// Type icons for non-Task states — clear shapes
const TYPE_ICONS: Record<string, { icon: string; color: string }> = {
  Pass:     { icon: '\u279C', color: '#8b5cf6' },  // ➜
  Choice:   { icon: '\u25C7', color: '#f59e0b' },  // ◇
  Wait:     { icon: '\u23F1', color: '#10b981' },  // ⏱
  Fail:     { icon: '\u2716', color: '#ef4444' },   // ✖
  Succeed:  { icon: '\u2714', color: '#22c55e' },   // ✔
  Parallel: { icon: '\u2261', color: '#6366f1' },   // ≡
  Map:      { icon: '\u21C4', color: '#6366f1' },   // ⇄
};

// ---------------------------------------------------------------------------
// Build graph from ASL
// ---------------------------------------------------------------------------

function buildGraph(asl: any): { nodes: Map<string, GNode>; edges: GEdge[] } {
  const nodes = new Map<string, GNode>();
  const edges: GEdge[] = [];
  if (!asl.States) return { nodes, edges };

  for (const [name, state] of Object.entries(asl.States) as [string, any][]) {
    nodes.set(name, {
      id: name, type: state.Type ?? 'Pass', layer: 0, col: 0, x: 0, y: 0,
      resource: state.Resource, state,
    });
    if (state.Next) edges.push({ from: name, to: state.Next, type: 'normal' });
    if (state.Type === 'Choice') {
      for (const [i, rule] of (state.Choices ?? []).entries()) {
        if (rule.Next) edges.push({ from: name, to: rule.Next, type: 'choice', label: choiceLabel(rule, i) });
      }
      if (state.Default) edges.push({ from: name, to: state.Default, type: 'default', label: 'default' });
    }
    if (state.Catch) {
      for (const c of state.Catch) {
        if (c.Next) edges.push({ from: name, to: c.Next, type: 'catch', label: 'catch' });
      }
    }
  }
  return { nodes, edges };
}

function choiceLabel(rule: any, i: number): string {
  if (rule.Condition) {
    const c = rule.Condition.replace(/\{%\s*|\s*%\}/g, '').trim();
    return c.length > 24 ? c.slice(0, 22) + '\u2026' : c;
  }
  if (rule.Variable) {
    const v = rule.Variable.replace(/^\$\./, '');
    for (const k of Object.keys(rule)) {
      if (k !== 'Variable' && k !== 'Next') {
        const l = `${v} ${k}`;
        return l.length > 24 ? l.slice(0, 22) + '\u2026' : l;
      }
    }
  }
  return `rule ${i + 1}`;
}

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

function layoutGraph(nodes: Map<string, GNode>, edges: GEdge[], startAt: string): void {
  if (nodes.size === 0) return;
  const visited = new Set<string>();
  const queue: { id: string; layer: number }[] = [{ id: startAt, layer: 0 }];
  const layers = new Map<number, string[]>();

  while (queue.length > 0) {
    const { id, layer } = queue.shift()!;
    if (visited.has(id)) continue;
    visited.add(id);
    const node = nodes.get(id);
    if (!node) continue;
    node.layer = layer;
    if (!layers.has(layer)) layers.set(layer, []);
    layers.get(layer)!.push(id);
    for (const e of edges) {
      if (e.from === id && !visited.has(e.to)) queue.push({ id: e.to, layer: layer + 1 });
    }
  }

  for (const [id, node] of nodes) {
    if (!visited.has(id)) {
      const ml = Math.max(...[...layers.keys()], 0) + 1;
      node.layer = ml;
      if (!layers.has(ml)) layers.set(ml, []);
      layers.get(ml)!.push(id);
    }
  }

  const top = PAD + 40;
  for (const [layer, ids] of layers) {
    for (let i = 0; i < ids.length; i++) {
      const n = nodes.get(ids[i])!;
      n.col = i;
      n.x = PAD + i * COL_X;
      n.y = top + layer * LAYER_Y;
    }
  }

  const maxCols = Math.max(...[...layers.values()].map(a => a.length));
  for (const [, ids] of layers) {
    if (ids.length < maxCols) {
      const off = ((maxCols - ids.length) * COL_X) / 2;
      for (const id of ids) nodes.get(id)!.x += off;
    }
  }
}

// ---------------------------------------------------------------------------
// Trace overlay
// ---------------------------------------------------------------------------

function overlayTrace(nodes: Map<string, GNode>, edges: GEdge[], trace: ExecutionTrace): void {
  for (const s of trace.states) {
    const n = nodes.get(s.name);
    if (n) { n.status = s.error ? 'error' : 'success'; n.duration = s.duration; }
  }
  for (const n of nodes.values()) { if (!n.status) n.status = 'skipped'; }
  for (let i = 0; i < trace.states.length - 1; i++) {
    const f = trace.states[i].name, t = trace.states[i + 1].name;
    for (const e of edges) { if (e.from === f && e.to === t) { e.active = true; break; } }
  }
}

// ---------------------------------------------------------------------------
// Status helpers
// ---------------------------------------------------------------------------

function statusStyle(status: string | undefined, accent: string): [string, string, number, string] {
  if (status === 'success') return ['#0d2818', '#34d399', 2, '1'];
  if (status === 'error')   return ['#2a1215', '#f87171', 2, '1'];
  if (status === 'skipped') return ['#111827', '#334155', 1, '0.45'];
  return ['#1e293b', accent, 1.5, '1'];
}

function statusBadge(n: GNode): SVGGElement {
  const g = document.createElementNS(NS, 'g') as SVGGElement;
  g.classList.add('graph-node-status');
  const cx = n.x + NODE_W - 20;
  const cy = n.y + NODE_H / 2;
  const isOk = n.status === 'success';
  const color = isOk ? '#34d399' : '#f87171';
  const bg = document.createElementNS(NS, 'circle');
  bg.setAttribute('cx', String(cx)); bg.setAttribute('cy', String(cy));
  bg.setAttribute('r', '10');
  bg.setAttribute('fill', color + '1A');
  g.appendChild(bg);
  const txt = svgText(cx, cy, isOk ? '\u2713' : '\u2717', color, 13, 'central', '700');
  txt.setAttribute('text-anchor', 'middle');
  g.appendChild(txt);
  return g;
}

function buildSubtitle(n: GNode): string {
  let sub = n.type;
  const svc = n.resource ? detectService(n.resource) : null;
  if (svc) sub += ` \u00B7 ${svc.label}`;
  if (n.duration !== undefined) sub += ` \u00B7 ${n.duration}ms`;
  return sub;
}

// ---------------------------------------------------------------------------
// SVG rendering
// ---------------------------------------------------------------------------

function buildSvg(w: number, h: number, nodes: Map<string, GNode>, edges: GEdge[], startAt: string): SVGSVGElement {
  const svg = document.createElementNS(NS, 'svg') as SVGSVGElement;
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');

  svg.innerHTML = `<defs>
    <marker id="ah-gray" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0.5 L9,3.5 L0,6.5" fill="#475569"/>
    </marker>
    <marker id="ah-green" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0.5 L9,3.5 L0,6.5" fill="#34d399"/>
    </marker>
    <marker id="ah-red" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0.5 L9,3.5 L0,6.5" fill="#f87171"/>
    </marker>
    <marker id="ah-blue" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0.5 L9,3.5 L0,6.5" fill="#60a5fa"/>
    </marker>
  </defs>`;

  const g = document.createElementNS(NS, 'g');
  g.id = 'graph-content';
  svg.appendChild(g);

  // Dot grid background
  const gridG = document.createElementNS(NS, 'g');
  gridG.setAttribute('opacity', '0.08');
  for (let gx = 0; gx < w; gx += 24) {
    for (let gy = 0; gy < h; gy += 24) {
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', String(gx)); c.setAttribute('cy', String(gy));
      c.setAttribute('r', '0.8'); c.setAttribute('fill', '#94a3b8');
      gridG.appendChild(c);
    }
  }
  g.appendChild(gridG);

  // Start indicator
  const sn = nodes.get(startAt);
  if (sn) {
    const cx = sn.x + NODE_W / 2, cy = sn.y - 20;
    // Filled green circle
    const startC = document.createElementNS(NS, 'circle');
    startC.setAttribute('cx', String(cx)); startC.setAttribute('cy', String(cy));
    startC.setAttribute('r', '8'); startC.setAttribute('fill', '#34d399');
    g.appendChild(startC);
    // Connecting line
    const startL = document.createElementNS(NS, 'line');
    startL.setAttribute('x1', String(cx)); startL.setAttribute('y1', String(cy + 8));
    startL.setAttribute('x2', String(cx)); startL.setAttribute('y2', String(sn.y));
    startL.setAttribute('stroke', '#34d399'); startL.setAttribute('stroke-width', '2');
    g.appendChild(startL);
  }

  // Edges (rendered first, behind nodes)
  for (const e of edges) {
    const f = nodes.get(e.from), t = nodes.get(e.to);
    if (f && t) g.appendChild(renderEdge(f, t, e));
  }

  // Nodes
  for (const n of nodes.values()) g.appendChild(renderNode(n));

  return svg;
}

// ---------------------------------------------------------------------------
// Node rendering
// ---------------------------------------------------------------------------

function renderNode(n: GNode): SVGGElement {
  const g = document.createElementNS(NS, 'g') as SVGGElement;
  g.classList.add('graph-node');
  g.dataset.state = n.id;

  const tl = (n.type || 'Pass').toLowerCase();
  const svc = n.resource ? detectService(n.resource) : null;
  const accent = svc?.color ?? TYPE_ACCENT[tl] ?? '#64748b';
  const [fill, stroke, strokeW, opacity] = statusStyle(n.status, accent);
  g.setAttribute('opacity', opacity);

  // Glow rect for selection (CSS-driven)
  const glow = svgRect(n.x - 4, n.y - 4, NODE_W + 8, NODE_H + 8, R + 3, 'transparent', 'transparent', 0);
  glow.classList.add('graph-node-glow');
  g.appendChild(glow);

  // Hit area
  const hit = svgRect(n.x - 2, n.y - 2, NODE_W + 4, NODE_H + 4, R + 1, 'transparent', 'transparent', 0);
  hit.classList.add('graph-node-hit');
  g.appendChild(hit);

  // Main rect
  const bg = svgRect(n.x, n.y, NODE_W, NODE_H, R, fill, stroke, strokeW);
  bg.classList.add('graph-node-bg');
  g.appendChild(bg);

  // Accent bar (left edge, clipped with rounded ends)
  const bar = svgRect(n.x + 1, n.y + 6, 3.5, NODE_H - 12, 2, accent, 'none', 0);
  g.appendChild(bar);

  // Icon badge
  const badgeX = n.x + 28;
  const badgeY = n.y + NODE_H / 2;

  if (svc) {
    // Service badge: colored rounded-rect with bold abbreviation
    const bw = svc.icon.length > 1 ? 30 : 26;
    const bh = 26;
    const badge = svgRect(badgeX - bw / 2, badgeY - bh / 2, bw, bh, 6, svc.color + '20', svc.color + '55', 1);
    g.appendChild(badge);
    const iconTxt = svgText(badgeX, badgeY, svc.icon, svc.color, svc.icon.length > 1 ? 11 : 15, 'central', '700');
    iconTxt.setAttribute('text-anchor', 'middle');
    iconTxt.setAttribute('letter-spacing', svc.icon.length > 1 ? '-0.5' : '0');
    g.appendChild(iconTxt);
  } else {
    // Type icon: colored circle with symbol
    const ti = TYPE_ICONS[n.type];
    if (ti) {
      const badge = document.createElementNS(NS, 'circle');
      badge.setAttribute('cx', String(badgeX)); badge.setAttribute('cy', String(badgeY));
      badge.setAttribute('r', '13');
      badge.setAttribute('fill', ti.color + '18');
      badge.setAttribute('stroke', ti.color + '44');
      badge.setAttribute('stroke-width', '1');
      g.appendChild(badge);
      const iconTxt = svgText(badgeX, badgeY, ti.icon, ti.color, 14, 'central', '600');
      iconTxt.setAttribute('text-anchor', 'middle');
      g.appendChild(iconTxt);
    }
  }

  // State name — larger, bolder
  const textX = n.x + 50;
  const nameY = n.y + NODE_H / 2 - 9;
  const maxNameLen = 20;
  const displayName = n.id.length > maxNameLen ? n.id.slice(0, maxNameLen - 1) + '\u2026' : n.id;
  const nameEl = svgText(textX, nameY, displayName, '#f1f5f9', 13, 'central', '600');
  nameEl.setAttribute('text-anchor', 'start');
  g.appendChild(nameEl);

  // Subtitle
  const subY = n.y + NODE_H / 2 + 11;
  const subEl = svgText(textX, subY, buildSubtitle(n), '#64748b', 10.5, 'central', '400');
  subEl.setAttribute('text-anchor', 'start');
  subEl.classList.add('graph-node-sub');
  g.appendChild(subEl);

  // Status badge (right)
  if (n.status === 'success' || n.status === 'error') {
    g.appendChild(statusBadge(n));
  }

  return g;
}

// ---------------------------------------------------------------------------
// Edge rendering
// ---------------------------------------------------------------------------

function renderEdge(from: GNode, to: GNode, edge: GEdge): SVGGElement {
  const g = document.createElementNS(NS, 'g') as SVGGElement;

  let color = '#475569', marker = 'ah-gray', dash = '', width = 1.5;
  if (edge.active) {
    color = '#34d399'; marker = 'ah-green'; width = 2.5;
  } else if (edge.type === 'catch') {
    color = '#f87171'; marker = 'ah-red'; dash = '6,4';
  } else if (edge.type === 'choice' || edge.type === 'default') {
    color = '#60a5fa'; marker = 'ah-blue';
  }

  const fcx = from.x + NODE_W / 2, tcx = to.x + NODE_W / 2;
  let x1: number, y1: number, x2: number, y2: number;

  if (to.layer > from.layer) {
    x1 = fcx; y1 = from.y + NODE_H;
    x2 = tcx; y2 = to.y;
  } else if (to.layer < from.layer) {
    // Back-edge: exit left
    x1 = from.x; y1 = from.y + NODE_H / 2;
    x2 = to.x;   y2 = to.y + NODE_H / 2;
  } else {
    // Same layer
    if (to.x > from.x) {
      x1 = from.x + NODE_W; y1 = from.y + NODE_H / 2;
      x2 = to.x;            y2 = to.y + NODE_H / 2;
    } else {
      x1 = from.x;          y1 = from.y + NODE_H / 2;
      x2 = to.x + NODE_W;   y2 = to.y + NODE_H / 2;
    }
  }

  // Build path
  let d: string;
  if (to.layer < from.layer) {
    const lx = Math.min(from.x, to.x) - 70;
    d = `M${x1},${y1} C${lx},${y1} ${lx},${y2} ${x2},${y2}`;
  } else if (Math.abs(x1 - x2) < 5) {
    // Straight vertical — no curve needed
    d = `M${x1},${y1} L${x2},${y2}`;
  } else {
    // Smooth S-curve
    const my = (y1 + y2) / 2;
    d = `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`;
  }

  const path = document.createElementNS(NS, 'path');
  path.setAttribute('d', d);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', color);
  path.setAttribute('stroke-width', String(width));
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('marker-end', `url(#${marker})`);
  if (dash) path.setAttribute('stroke-dasharray', dash);
  path.classList.add('graph-edge-path');
  if (edge.active) path.classList.add('graph-edge-active');
  g.appendChild(path);

  // Label pill
  if (edge.label) {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const txt = edge.label.length > 18 ? edge.label.slice(0, 16) + '\u2026' : edge.label;
    const tw = txt.length * 6.2 + 14;
    const th = 20;
    const ox = Math.abs(x1 - x2) < 5 ? 14 : 0;

    const pill = svgRect(mx + ox - tw / 2, my - th / 2, tw, th, 5, '#111827', '#334155', 1);
    g.appendChild(pill);

    const lbl = svgText(mx + ox, my, txt, color, 10, 'central', '500');
    lbl.setAttribute('text-anchor', 'middle');
    g.appendChild(lbl);
  }

  return g;
}

// ---------------------------------------------------------------------------
// Popover
// ---------------------------------------------------------------------------

function buildPopoverContent(
  stateId: string, node: GNode, state: any,
  traceEntry: StateExecution | undefined, callbacks: GraphCallbacks,
): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'graph-popover-inner';

  // Header
  const header = document.createElement('div');
  header.className = 'graph-popover-header';

  const title = document.createElement('span');
  title.className = 'graph-popover-title';
  title.textContent = stateId;

  const tl = (node.type || 'Pass').toLowerCase();
  const svc = node.resource ? detectService(node.resource) : null;
  const accentColor = svc?.color ?? TYPE_ACCENT[tl] ?? '#64748b';

  const typeBadge = document.createElement('span');
  typeBadge.className = 'graph-popover-type';
  typeBadge.textContent = node.type;
  typeBadge.style.background = accentColor + '33';
  typeBadge.style.color = accentColor;

  const closeBtn = document.createElement('button');
  closeBtn.className = 'graph-popover-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    (e.target as HTMLElement).closest('.graph-popover')!.style.display = 'none';
  });

  header.appendChild(title);
  header.appendChild(typeBadge);
  header.appendChild(closeBtn);
  wrap.appendChild(header);

  // Duration
  if (traceEntry?.duration !== undefined) {
    wrap.appendChild(popRow('Duration', `${traceEntry.duration}ms`));
  }

  // Resource ARN
  if (node.resource) {
    const row = popRow('Resource', node.resource);
    row.querySelector('.gp-val')?.classList.add('gp-arn');
    wrap.appendChild(row);
  }

  // Task mock section
  if (node.type === 'Task' && node.resource) {
    wrap.appendChild(buildTaskMockSection(node.resource, callbacks));
  }

  // Choice conditions
  if (node.type === 'Choice' && state.Choices) {
    const sec = popSection('Conditions');
    for (const [i, rule] of (state.Choices as any[]).entries()) {
      const div = document.createElement('div');
      div.className = 'gp-cond';
      const taken = traceEntry?.transition === rule.Next;
      if (taken) div.classList.add('gp-cond-active');
      const cond = rule.Condition ?? (rule.Variable ? `${rule.Variable} ${Object.keys(rule).find(k => k !== 'Variable' && k !== 'Next') ?? ''}` : `rule ${i + 1}`);
      div.textContent = `${cond} \u2192 ${rule.Next ?? '?'}`;
      sec.appendChild(div);
    }
    if (state.Default) {
      const div = document.createElement('div');
      div.className = 'gp-cond';
      if (traceEntry?.transition === state.Default) div.classList.add('gp-cond-active');
      div.textContent = `default \u2192 ${state.Default}`;
      sec.appendChild(div);
    }
    wrap.appendChild(sec);
  }

  // Fail state details
  if (node.type === 'Fail') {
    if (state.Error) wrap.appendChild(popRow('Error', state.Error));
    if (state.Cause) wrap.appendChild(popRow('Cause', state.Cause));
  }

  // Wait state details
  if (node.type === 'Wait') {
    if (state.Seconds !== undefined) wrap.appendChild(popRow('Wait', `${state.Seconds}s`));
    if (state.Timestamp) wrap.appendChild(popRow('Until', state.Timestamp));
    if (state.SecondsPath) wrap.appendChild(popRow('SecondsPath', state.SecondsPath));
    if (state.TimestampPath) wrap.appendChild(popRow('TimestampPath', state.TimestampPath));
  }

  // Trace data
  if (traceEntry) {
    if (traceEntry.error) {
      const row = popRow('Error', `${traceEntry.error.name}: ${traceEntry.error.message}`);
      row.querySelector('.gp-val')?.classList.add('gp-error');
      wrap.appendChild(row);
    }
    wrap.appendChild(buildCollapsible('Input', fmtJson(traceEntry.input)));
    wrap.appendChild(buildCollapsible('Output', fmtJson(traceEntry.output)));
  }

  return wrap;
}

function buildTaskMockSection(arn: string, callbacks: GraphCallbacks): HTMLElement {
  const sec = popSection('Mock Configuration');
  const mock = callbacks.getMockForArn?.(arn);

  const row = document.createElement('div');
  row.className = 'gp-mock-row';
  const label = document.createElement('span');
  label.className = 'gp-mock-label';
  label.textContent = 'Mode:';
  row.appendChild(label);

  const select = document.createElement('select');
  select.className = 'gp-mock-select';
  for (const [val, txt] of [['auto','Auto (inferred)'],['echo','Echo input'],['error','Throw error'],['custom','Custom JSON']] as const) {
    const opt = document.createElement('option');
    opt.value = val; opt.textContent = txt;
    opt.selected = val === (mock?.mode ?? 'auto');
    select.appendChild(opt);
  }
  row.appendChild(select);
  sec.appendChild(row);

  const textarea = document.createElement('textarea');
  textarea.className = 'gp-mock-textarea';
  textarea.rows = 3;
  textarea.spellcheck = false;
  textarea.value = mock?.value ?? (mock?.inferred ? JSON.stringify(mock.inferred, null, 2) : '{}');
  textarea.style.display = (mock?.mode ?? 'auto') === 'custom' ? 'block' : 'none';
  sec.appendChild(textarea);

  const preview = document.createElement('pre');
  preview.className = 'gp-mock-preview';
  preview.textContent = mock?.inferred ? JSON.stringify(mock.inferred, null, 2) : '{}';
  preview.style.display = (mock?.mode ?? 'auto') === 'auto' ? 'block' : 'none';
  sec.appendChild(preview);

  select.addEventListener('change', () => {
    const m = select.value;
    textarea.style.display = m === 'custom' ? 'block' : 'none';
    preview.style.display = m === 'auto' ? 'block' : 'none';
    callbacks.setMockForArn?.(arn, m, m === 'custom' ? textarea.value : undefined);
  });
  textarea.addEventListener('blur', () => {
    callbacks.setMockForArn?.(arn, 'custom', textarea.value);
  });

  if (callbacks.reRun) {
    const btn = document.createElement('button');
    btn.className = 'gp-rerun';
    btn.textContent = 'Re-run Execution';
    btn.addEventListener('click', async () => {
      btn.disabled = true; btn.textContent = 'Running\u2026';
      try { await callbacks.reRun!(); } finally { btn.disabled = false; btn.textContent = 'Re-run Execution'; }
    });
    sec.appendChild(btn);
  }

  return sec;
}

function buildCollapsible(label: string, content: string): HTMLElement {
  const sec = document.createElement('div');
  sec.className = 'gp-collapse';
  const toggle = document.createElement('div');
  toggle.className = 'gp-collapse-toggle';
  toggle.textContent = `\u25B6 ${label}`;
  toggle.style.cursor = 'pointer';
  const body = document.createElement('pre');
  body.className = 'gp-collapse-body';
  body.textContent = content;
  body.style.display = 'none';
  toggle.addEventListener('click', () => {
    const open = body.style.display !== 'none';
    body.style.display = open ? 'none' : 'block';
    toggle.textContent = `${open ? '\u25B6' : '\u25BC'} ${label}`;
  });
  sec.appendChild(toggle);
  sec.appendChild(body);
  return sec;
}

function popRow(label: string, value: string): HTMLElement {
  const row = document.createElement('div');
  row.className = 'gp-row';
  const l = document.createElement('span');
  l.className = 'gp-label';
  l.textContent = label;
  const v = document.createElement('span');
  v.className = 'gp-val';
  v.textContent = value;
  row.appendChild(l);
  row.appendChild(v);
  return row;
}

function popSection(title: string): HTMLElement {
  const sec = document.createElement('div');
  sec.className = 'gp-section';
  const lbl = document.createElement('div');
  lbl.className = 'gp-section-label';
  lbl.textContent = title;
  sec.appendChild(lbl);
  return sec;
}

// ---------------------------------------------------------------------------
// Toolbar
// ---------------------------------------------------------------------------

function buildToolbar() {
  const el = h('div', 'graph-toolbar');
  const zoomOut = hBtn('\u2212', 'Zoom out');
  const zoomLabel = h('span', 'graph-zoom-label');
  zoomLabel.textContent = '100%';
  const zoomIn = hBtn('+', 'Zoom in');
  const fitBtn = hBtn('\u2922', 'Fit to view');
  el.appendChild(zoomOut);
  el.appendChild(zoomLabel);
  el.appendChild(zoomIn);
  el.appendChild(fitBtn);
  return { el, zoomOut, zoomIn, zoomLabel, fitBtn };
}

// ---------------------------------------------------------------------------
// SVG helpers
// ---------------------------------------------------------------------------

const NS = 'http://www.w3.org/2000/svg';

function svgText(x: number, y: number, text: string, fill: string, size: number, baseline: string, weight: string): SVGTextElement {
  const el = document.createElementNS(NS, 'text');
  el.setAttribute('x', String(x));
  el.setAttribute('y', String(y));
  el.setAttribute('fill', fill);
  el.setAttribute('font-size', String(size));
  el.setAttribute('font-weight', weight);
  el.setAttribute('font-family', "'Inter', 'SF Pro', system-ui, -apple-system, sans-serif");
  el.setAttribute('dominant-baseline', baseline);
  el.textContent = text;
  return el;
}

function svgRect(x: number, y: number, w: number, h: number, r: number, fill: string, stroke: string, sw: number): SVGRectElement {
  const el = document.createElementNS(NS, 'rect');
  el.setAttribute('x', String(x));
  el.setAttribute('y', String(y));
  el.setAttribute('width', String(w));
  el.setAttribute('height', String(h));
  el.setAttribute('rx', String(r));
  el.setAttribute('fill', fill);
  if (stroke !== 'none') { el.setAttribute('stroke', stroke); el.setAttribute('stroke-width', String(sw)); }
  return el;
}

// ---------------------------------------------------------------------------
// DOM helpers
// ---------------------------------------------------------------------------

function h(tag: string, cls: string): HTMLElement {
  const el = document.createElement(tag);
  el.className = cls;
  return el;
}

function hBtn(label: string, title: string): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.className = 'graph-tb-btn';
  btn.textContent = label;
  btn.title = title;
  return btn;
}

function fmtJson(value: any): string {
  if (value === undefined || value === null) return 'null';
  try { return JSON.stringify(value, null, 2); } catch { return String(value); }
}
