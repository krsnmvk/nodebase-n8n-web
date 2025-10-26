import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { inngest } from './client';

const google = createGoogleGenerativeAI();

export const execute = inngest.createFunction(
  { id: 'execute-ai' },
  { event: 'execute/ai' },

  async ({ event, step }) => {
    const { steps } = await step.ai.wrap('gemeini-generate-text', generateText, {
      model: google('gemini-2.5-flash'),
      system: 'You are a helful assistent.',
      prompt: 'What is 1 + 1?',
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    });

    return steps;
  }
);
