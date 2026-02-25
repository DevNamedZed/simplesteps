/**
 * Smithy JSON AST parser — extracts operation input shapes and resolves them
 * to TypeScript type representations.
 */

import { readFileSync } from 'fs';

// ---------------------------------------------------------------------------
// Smithy JSON AST types (subset we care about)
// ---------------------------------------------------------------------------

interface SmithyModel {
  smithy: string;
  shapes: Record<string, SmithyShape>;
}

interface SmithyShape {
  type: string;
  members?: Record<string, SmithyMemberRef>;
  member?: SmithyTargetRef;   // list element
  key?: SmithyTargetRef;      // map key
  value?: SmithyTargetRef;    // map value
  input?: SmithyTargetRef;    // operation input
  output?: SmithyTargetRef;   // operation output
  operations?: SmithyTargetRef[];
  resources?: SmithyTargetRef[];
  traits?: Record<string, any>;
}

interface SmithyMemberRef {
  target: string;
  traits?: Record<string, any>;
}

interface SmithyTargetRef {
  target: string;
}

// ---------------------------------------------------------------------------
// Resolved TypeScript type representations
// ---------------------------------------------------------------------------

export interface ResolvedField {
  name: string;
  tsType: string;
  required: boolean;
  doc?: string;
}

export interface ResolvedInterface {
  name: string;
  fields: ResolvedField[];
  doc?: string;
}

export interface ResolvedOperationInput {
  /** The generated interface for the operation input. */
  iface: ResolvedInterface;
  /** Any additional interfaces needed (shared types referenced by the input). */
  sharedTypes: ResolvedInterface[];
}

// ---------------------------------------------------------------------------
// Service info (for auto-discovery)
// ---------------------------------------------------------------------------

export interface SmithyServiceInfo {
  serviceShapeId: string;
  sdkId: string;         // PascalCase from trait, e.g., "DynamoDB"
  arnNamespace: string;  // lowercase, e.g., "dynamodb"
  cloudFormationName?: string;
  operations: SmithyOperationInfo[];
}

export interface SmithyOperationInfo {
  operationId: string;    // fully qualified shape ID
  operationName: string;  // PascalCase, e.g., "GetItem"
  methodName: string;     // camelCase, e.g., "getItem"
  hasInput: boolean;
  hasOutput: boolean;
}

// ---------------------------------------------------------------------------
// Parser
// ---------------------------------------------------------------------------

export class SmithyParser {
  private model: SmithyModel;
  /** Track which shapes have been resolved to named interfaces to deduplicate. */
  private resolvedShared = new Map<string, ResolvedInterface>();

  constructor(modelPath: string) {
    const raw = readFileSync(modelPath, 'utf-8');
    this.model = JSON.parse(raw) as SmithyModel;
  }

  /**
   * Extract high-level service info from the model.
   * Returns null if the model doesn't contain a recognizable service shape.
   */
  extractServiceInfo(): SmithyServiceInfo | null {
    for (const [shapeId, shape] of Object.entries(this.model.shapes)) {
      if (shape.type !== 'service') continue;

      const serviceTrait = shape.traits?.['aws.api#service'];
      if (!serviceTrait) continue;

      const sdkId: string = serviceTrait.sdkId ?? shapeId.split('#')[1] ?? 'Unknown';
      const arnNamespace: string = serviceTrait.arnNamespace ?? sdkId.replace(/\s+/g, '').toLowerCase();
      const cloudFormationName: string | undefined = serviceTrait.cloudFormationName;

      // Collect all operations (direct + from resources)
      const operationIds = new Set<string>();
      if (shape.operations) {
        for (const ref of shape.operations) {
          operationIds.add(ref.target);
        }
      }
      if (shape.resources) {
        for (const resRef of shape.resources) {
          this.collectResourceOperations(resRef.target, operationIds);
        }
      }

      const operations: SmithyOperationInfo[] = [];
      for (const opId of operationIds) {
        const opShape = this.model.shapes[opId];
        if (!opShape || opShape.type !== 'operation') continue;

        const opName = opId.split('#')[1];
        if (!opName) continue;

        operations.push({
          operationId: opId,
          operationName: opName,
          methodName: lcFirst(opName),
          hasInput: !!opShape.input && opShape.input.target !== 'smithy.api#Unit',
          hasOutput: !!opShape.output && opShape.output.target !== 'smithy.api#Unit',
        });
      }

      operations.sort((a, b) => a.methodName.localeCompare(b.methodName));

      return {
        serviceShapeId: shapeId,
        sdkId,
        arnNamespace,
        cloudFormationName,
        operations,
      };
    }

    return null;
  }

  private collectResourceOperations(resourceId: string, into: Set<string>): void {
    const shape = this.model.shapes[resourceId];
    if (!shape) return;

    const opKeys = ['create', 'read', 'update', 'delete', 'list'] as const;
    for (const key of opKeys) {
      const ref = (shape as any)[key] as SmithyTargetRef | undefined;
      if (ref) into.add(ref.target);
    }
    if (shape.operations) {
      for (const ref of shape.operations) into.add(ref.target);
    }
    const collOps = (shape as any).collectionOperations as SmithyTargetRef[] | undefined;
    if (collOps) {
      for (const ref of collOps) into.add(ref.target);
    }
    if (shape.resources) {
      for (const ref of shape.resources) {
        this.collectResourceOperations(ref.target, into);
      }
    }
  }

  /**
   * Resolve an operation's input shape to a TypeScript interface.
   */
  resolveOperationInput(
    operationId: string,
    omitFields: string[],
    interfaceName: string,
  ): ResolvedOperationInput {
    const opShape = this.model.shapes[operationId];
    if (!opShape || opShape.type !== 'operation') {
      throw new Error(`Operation not found: ${operationId}`);
    }
    if (!opShape.input) {
      return { iface: { name: interfaceName, fields: [], doc: undefined }, sharedTypes: [] };
    }

    const inputShapeId = opShape.input.target;
    const inputShape = this.model.shapes[inputShapeId];
    if (!inputShape || inputShape.type !== 'structure') {
      throw new Error(`Input shape not found or not a structure: ${inputShapeId}`);
    }

    const omitSet = new Set(omitFields);
    const fields: ResolvedField[] = [];

    for (const [memberName, memberRef] of Object.entries(inputShape.members ?? {})) {
      if (omitSet.has(memberName)) continue;

      const isRequired = memberRef.traits?.['smithy.api#required'] !== undefined
        || inputShape.traits?.['smithy.api#input']?.['required']?.includes?.(memberName);
      const doc = memberRef.traits?.['smithy.api#documentation'] as string | undefined;

      fields.push({
        name: memberName,
        tsType: this.resolveType(memberRef.target, 0),
        required: !!isRequired,
        doc: doc ? cleanDoc(doc) : undefined,
      });
    }

    // Sort: required fields first, then alphabetical
    fields.sort((a, b) => {
      if (a.required !== b.required) return a.required ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

    const doc = inputShape.traits?.['smithy.api#documentation'] as string | undefined;

    return {
      iface: { name: interfaceName, fields, doc: doc ? cleanDoc(doc) : undefined },
      sharedTypes: [...this.resolvedShared.values()],
    };
  }

  getSharedTypes(): ResolvedInterface[] {
    return [...this.resolvedShared.values()];
  }

  reset(): void {
    this.resolvedShared.clear();
  }

  // -------------------------------------------------------------------------
  // Type resolution
  // -------------------------------------------------------------------------

  private resolveType(shapeId: string, depth: number): string {
    if (depth > 2) return 'any';

    const prelude = PRELUDE_MAP[shapeId];
    if (prelude) return prelude;

    const shape = this.model.shapes[shapeId];
    if (!shape) return 'any';

    switch (shape.type) {
      case 'string':
        return this.resolveStringType(shape);
      case 'boolean':
        return 'boolean';
      case 'byte':
      case 'short':
      case 'integer':
      case 'long':
      case 'float':
      case 'double':
        return 'number';
      case 'blob':
        return 'string';
      case 'timestamp':
        return 'string';
      case 'document':
        return 'any';
      case 'list':
        return this.resolveListType(shape, depth);
      case 'map':
        return this.resolveMapType(shape, depth);
      case 'structure':
        return this.resolveStructureType(shapeId, shape, depth);
      case 'union':
        return this.resolveUnionType(shape, depth);
      case 'enum':
        return this.resolveEnumType(shape);
      case 'intEnum':
        return 'number';
      default:
        return 'any';
    }
  }

  private resolveStringType(shape: SmithyShape): string {
    const enumTrait = shape.traits?.['smithy.api#enum'];
    if (Array.isArray(enumTrait)) {
      const values = enumTrait.map((e: { value: string }) => `'${e.value}'`);
      return values.join(' | ');
    }
    return 'string';
  }

  private resolveEnumType(shape: SmithyShape): string {
    if (shape.members) {
      const values = Object.keys(shape.members);
      const enumValues = values.map(v => {
        const enumValue = shape.members![v].traits?.['smithy.api#enumValue'];
        return `'${enumValue ?? v}'`;
      });
      return enumValues.join(' | ');
    }
    return 'string';
  }

  private resolveListType(shape: SmithyShape, depth: number): string {
    if (!shape.member) return 'any[]';
    const elementType = this.resolveType(shape.member.target, depth + 1);
    return `${elementType}[]`;
  }

  private resolveMapType(shape: SmithyShape, depth: number): string {
    if (!shape.value) return 'Record<string, any>';
    const valueType = this.resolveType(shape.value.target, depth + 1);
    return `Record<string, ${valueType}>`;
  }

  private resolveStructureType(shapeId: string, shape: SmithyShape, depth: number): string {
    if (depth >= 2) return 'any';

    const shortName = shapeId.split('#')[1];
    if (!shortName) return 'any';

    // Avoid names that collide with TS built-ins or our own imports
    if (RESERVED_TYPE_NAMES.has(shortName)) return 'any';

    if (this.resolvedShared.has(shortName)) {
      return shortName;
    }

    const fields: ResolvedField[] = [];
    for (const [memberName, memberRef] of Object.entries(shape.members ?? {})) {
      const isRequired = memberRef.traits?.['smithy.api#required'] !== undefined;
      const doc = memberRef.traits?.['smithy.api#documentation'] as string | undefined;
      fields.push({
        name: memberName,
        tsType: this.resolveType(memberRef.target, depth + 1),
        required: !!isRequired,
        doc: doc ? cleanDoc(doc) : undefined,
      });
    }

    if (fields.length === 0) return 'Record<string, any>';

    const iface: ResolvedInterface = { name: shortName, fields };
    this.resolvedShared.set(shortName, iface);
    return shortName;
  }

  private resolveUnionType(shape: SmithyShape, depth: number): string {
    if (!shape.members) return 'any';
    if (depth >= 2) return 'any';

    const variants = Object.entries(shape.members).map(([name, ref]) => {
      const tsType = this.resolveType(ref.target, depth + 1);
      return `{ ${name}?: ${tsType} }`;
    });

    if (variants.length <= 4) {
      return variants.join(' | ');
    }
    return 'any';
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Type names that would collide with TS built-ins or our own imports. */
const RESERVED_TYPE_NAMES = new Set([
  'Record', 'Map', 'Set', 'Array', 'Promise', 'Error',
  'RetryPolicy', 'String', 'Number', 'Boolean', 'Object', 'Function',
  'Symbol', 'Date', 'RegExp', 'Buffer',
]);

const PRELUDE_MAP: Record<string, string> = {
  'smithy.api#String': 'string',
  'smithy.api#Boolean': 'boolean',
  'smithy.api#PrimitiveBoolean': 'boolean',
  'smithy.api#Byte': 'number',
  'smithy.api#Short': 'number',
  'smithy.api#Integer': 'number',
  'smithy.api#PrimitiveInteger': 'number',
  'smithy.api#Long': 'number',
  'smithy.api#PrimitiveLong': 'number',
  'smithy.api#Float': 'number',
  'smithy.api#PrimitiveFloat': 'number',
  'smithy.api#Double': 'number',
  'smithy.api#PrimitiveDouble': 'number',
  'smithy.api#BigInteger': 'number',
  'smithy.api#BigDecimal': 'number',
  'smithy.api#Blob': 'string',
  'smithy.api#Timestamp': 'string',
  'smithy.api#Document': 'any',
  'smithy.api#Unit': 'void',
};

function cleanDoc(doc: string): string {
  return doc
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 200);
}

function lcFirst(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}
