/**
 * Test helpers for inspecting Step Functions ASL definitions
 * extracted from CloudFormation templates.
 */

interface AslDefinition {
  StartAt: string;
  States: Record<string, any>;
}

/**
 * Extract ASL definition from a CloudFormation template's StateMachine resource.
 *
 * Handles both plain JSON string and Fn::Join (CDK token) formats.
 * Replaces CDK token references (Ref, Fn::GetAtt) with "__CDK_TOKEN__" placeholder
 * so the full ASL structure (state names, types, transitions) is preserved.
 *
 * @param template - CDK Template assertion object
 * @param machineIndex - Index of the state machine resource (default 0)
 */
export function extractDefinition(template: any, machineIndex = 0): AslDefinition {
  const resources = template.findResources('AWS::StepFunctions::StateMachine');
  const machines = Object.values(resources);

  if (machines.length === 0) {
    throw new Error('No StateMachine resources found in template');
  }
  if (machineIndex >= machines.length) {
    throw new Error(`StateMachine index ${machineIndex} out of range (found ${machines.length})`);
  }

  const sm = machines[machineIndex] as any;
  const defString = sm.Properties.DefinitionString;

  if (!defString) {
    throw new Error('DefinitionString is undefined');
  }

  // Plain JSON string
  if (typeof defString === 'string') {
    return JSON.parse(defString);
  }

  // Fn::Join format: { "Fn::Join": ["", [...parts]] }
  if (defString['Fn::Join']) {
    const [separator, parts] = defString['Fn::Join'];
    if (separator !== '') {
      throw new Error(`Expected Fn::Join separator "" but got ${JSON.stringify(separator)}`);
    }
    const joined = parts
      .map((part: any) => {
        if (typeof part === 'string') return part;
        // Nested Fn::Join (e.g. from complex CDK token substitutions)
        if (part['Fn::Join']) {
          const [innerSep, innerParts] = part['Fn::Join'];
          return innerParts
            .map((p: any) => (typeof p === 'string' ? p : '__CDK_TOKEN__'))
            .join(innerSep);
        }
        // Replace Ref, Fn::GetAtt, and other CDK token objects with placeholder.
        // No extra quotes — the surrounding JSON string parts already provide them.
        return '__CDK_TOKEN__';
      })
      .join(separator);
    return JSON.parse(joined);
  }

  throw new Error('Unsupported DefinitionString format');
}

/**
 * Collect all states recursively, including those nested inside
 * Parallel branches and Map ItemProcessor/Iterator.
 */
function collectAllStates(states: Record<string, any>): [string, any][] {
  const result: [string, any][] = [];
  for (const [name, state] of Object.entries(states)) {
    result.push([name, state]);
    // Parallel branches
    if (state.Branches) {
      for (const branch of state.Branches) {
        if (branch.States) {
          result.push(...collectAllStates(branch.States));
        }
      }
    }
    // Map iterator
    const processor = state.ItemProcessor || state.Iterator;
    if (processor?.States) {
      result.push(...collectAllStates(processor.States));
    }
  }
  return result;
}

/**
 * Filter states by ASL Type string (searches nested states too).
 *
 * @param definition - Parsed ASL definition
 * @param type - ASL state type (e.g. "Task", "Choice", "Parallel", "Wait", "Map", "Pass", "Fail", "Succeed")
 * @returns Array of [stateName, stateDefinition] tuples
 */
export function getStatesByType(
  definition: AslDefinition,
  type: string,
): [string, any][] {
  return collectAllStates(definition.States).filter(
    ([, state]) => state.Type === type,
  );
}

/**
 * Return an array of all top-level state names in the definition.
 */
export function getAllStateNames(definition: AslDefinition): string[] {
  return Object.keys(definition.States);
}

/**
 * Check if any Task state's Resource contains the given pattern.
 * Searches nested states (Parallel branches, Map iterators) too.
 *
 * @param definition - Parsed ASL definition
 * @param pattern - Substring to search for in Task Resource fields (e.g. "dynamodb:putItem", "sns")
 * @returns true if at least one Task state's Resource contains the pattern
 */
export function hasResourcePattern(
  definition: AslDefinition,
  pattern: string,
): boolean {
  return collectAllStates(definition.States).some(
    ([, state]) =>
      state.Type === 'Task' &&
      typeof state.Resource === 'string' &&
      state.Resource.includes(pattern),
  );
}

/**
 * Check if any Task state has a CDK token as its Resource.
 * Lambda invocations use the function ARN directly, which becomes __CDK_TOKEN__
 * when CDK tokens are replaced. Searches nested states too.
 */
export function hasLambdaInvocation(definition: AslDefinition): boolean {
  return collectAllStates(definition.States).some(
    ([, state]) =>
      state.Type === 'Task' &&
      typeof state.Resource === 'string' &&
      state.Resource.includes('__CDK_TOKEN__'),
  );
}
