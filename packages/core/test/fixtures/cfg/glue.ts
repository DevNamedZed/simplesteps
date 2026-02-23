// Test fixture: AWS Glue start job run
//
// Starts a Glue ETL job synchronously and returns the result.

import { Steps, SimpleStepContext } from '../../../src/runtime/index';
import { Glue } from '../../../src/runtime/services/Glue';

const etlJob = new Glue('my-etl-job');

export const glueWorkflow = Steps.createFunction(
  async (context: SimpleStepContext, input: { inputPath: string; outputPath: string }) => {
    const result = await etlJob.startJobRun({
      Arguments: {
        '--input_path': input.inputPath,
        '--output_path': input.outputPath,
      },
    });

    return { jobResult: result };
  },
);
