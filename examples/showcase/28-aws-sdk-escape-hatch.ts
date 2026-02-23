// AWS SDK Escape Hatch
//
// Steps.awsSdk() calls any AWS service not covered by built-in bindings.
// Compiles to: arn:aws:states:::aws-sdk:<service>:<action>

import { Steps, SimpleStepContext } from '../../packages/core/src/runtime/index';

export const awsSdkEscapeHatch = Steps.createFunction(
  async (context: SimpleStepContext, input: { email: string; messageBody: string }) => {
    // Send an email via SES (no built-in binding)
    await Steps.awsSdk('ses', 'sendEmail', {
      Source: 'noreply@example.com',
      Destination: { ToAddresses: [input.email] },
      Message: {
        Subject: { Data: 'Notification' },
        Body: { Text: { Data: input.messageBody } },
      },
    });

    // Start a Textract job (no built-in binding)
    await Steps.awsSdk('textract', 'startDocumentAnalysis', {
      DocumentLocation: {
        S3Object: { Bucket: 'my-docs', Name: 'document.pdf' },
      },
      FeatureTypes: ['TABLES', 'FORMS'],
    });

    return { sent: true };
  },
);
