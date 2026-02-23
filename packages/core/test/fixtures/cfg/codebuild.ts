// Test fixture: AWS CodeBuild start build
//
// Starts a CodeBuild project build synchronously and returns the result.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { CodeBuild } from '../../../src/runtime/services/CodeBuild';

const buildProject = new CodeBuild('my-build-project');

export const codebuildWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { branch: string }) => {
    const result = await buildProject.startBuild({
      SourceVersion: input.branch,
    });

    return { buildResult: result };
  },
);
