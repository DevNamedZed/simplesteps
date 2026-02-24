// Substeps — Async Inlining
//
// Extract parts of a workflow into named async functions (substeps).
// The compiler inlines them at compile time, producing a flat state
// machine. No runtime cost, no nested executions — just cleaner code.
//
// This example shows a resource provisioning saga with rollback.
// Without substeps, this would be 4 levels of nested try/catch.
// With substeps, each concern reads independently.
//
// Constraints:
//   - Substeps must be module-scope async functions
//   - Parameters: identifiers, object destructuring, or defaults (no rest params)
//   - Must be awaited at the call site
//   - Substeps can call other substeps (the compiler inlines transitively)
//
// ASL output:
//   Invoke_validateRequest (Task)
//     → Invoke_networkingApi (Task, retry)
//       → Invoke_securityApi (Task, retry, Catch → rollback_network)
//         → Invoke_computeApi (Task, retry, Catch → rollback_security_network)
//           → Invoke_configureResources (Task, Catch → rollback_all)
//             → Return_Result (Pass, End)

import { Steps, SimpleStepContext, StepException } from '../../packages/core/src/runtime/index';
import { Lambda } from '../../packages/core/src/runtime/services/Lambda';

// ── Service bindings (module scope) ─────────────────────────────────

const validateRequest = Lambda<
  { requestId: string; tenantId: string },
  { valid: boolean }
>('arn:aws:lambda:us-east-1:123:function:ValidateRequest');

const networkingApi = Lambda<
  { action: string; requestId: string },
  { networkId: string }
>('arn:aws:lambda:us-east-1:123:function:NetworkingApi');

const securityApi = Lambda<
  { action: string; requestId: string; networkId: string },
  { roleArn: string }
>('arn:aws:lambda:us-east-1:123:function:SecurityApi');

const computeApi = Lambda<
  { action: string; requestId: string; roleArn: string },
  { instanceId: string }
>('arn:aws:lambda:us-east-1:123:function:ComputeApi');

const configureResources = Lambda<
  { requestId: string; networkId: string; roleArn: string; instanceId: string },
  { configured: boolean }
>('arn:aws:lambda:us-east-1:123:function:ConfigureResources');

const networkingRollback = Lambda<{ networkId: string }, void>(
  'arn:aws:lambda:us-east-1:123:function:NetworkingRollback',
);
const securityRollback = Lambda<{ roleArn: string }, void>(
  'arn:aws:lambda:us-east-1:123:function:SecurityRollback',
);
const computeRollback = Lambda<{ instanceId: string }, void>(
  'arn:aws:lambda:us-east-1:123:function:ComputeRollback',
);

// ── Substeps (inlined by the compiler) ──────────────────────────────

// Provision security with rollback on failure
async function provisionSecurity(requestId: string, networkId: string) {
  try {
    return await securityApi.call(
      { action: 'create', requestId, networkId },
      { retry: { maxAttempts: 2, intervalSeconds: 5, backoffRate: 2 } },
    );
  } catch (e) {
    await networkingRollback.call({ networkId });
    throw new StepException('Security provisioning failed, network rolled back');
  }
}

// Provision compute with rollback on failure
async function provisionCompute(requestId: string, roleArn: string, networkId: string) {
  try {
    return await computeApi.call(
      { action: 'create', requestId, roleArn },
      { retry: { maxAttempts: 3, intervalSeconds: 10, backoffRate: 2 } },
    );
  } catch (e) {
    await securityRollback.call({ roleArn });
    await networkingRollback.call({ networkId });
    throw new StepException('Compute provisioning failed, security & network rolled back');
  }
}

// Configure and finalize with full rollback on failure
async function configureWithRollback(
  requestId: string,
  networkId: string,
  roleArn: string,
  instanceId: string,
) {
  try {
    await configureResources.call({ requestId, networkId, roleArn, instanceId });
  } catch (e) {
    await computeRollback.call({ instanceId });
    await securityRollback.call({ roleArn });
    await networkingRollback.call({ networkId });
    throw new StepException('Configuration failed, all resources rolled back');
  }
}

// ── Main workflow (reads top-to-bottom) ─────────────────────────────

export const provisionResources = Steps.createFunction(
  async (
    context: SimpleStepContext,
    input: { requestId: string; tenantId: string },
  ) => {
    // Validate
    const validation = await validateRequest.call({
      requestId: input.requestId,
      tenantId: input.tenantId,
    });

    if (!validation.valid) {
      throw new StepException('Request validation failed');
    }

    // Provision networking (no rollback needed — it's the first resource)
    const network = await networkingApi.call(
      { action: 'create', requestId: input.requestId },
      { retry: { maxAttempts: 2, intervalSeconds: 5, backoffRate: 2 } },
    );

    // Each step handles its own rollback via substeps
    const security = await provisionSecurity(input.requestId, network.networkId);
    const compute = await provisionCompute(input.requestId, security.roleArn, network.networkId);
    await configureWithRollback(input.requestId, network.networkId, security.roleArn, compute.instanceId);

    return {
      requestId: input.requestId,
      instanceId: compute.instanceId,
      status: 'COMPLETED',
    };
  },
);
