import { inngest } from './client';
import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI();

export const execute = inngest.createFunction(
  { id: 'execute-ai' },
  { event: 'execute/ai' },

  async ({ event, step }) => {
    const { steps } = await step.ai.wrap(
      'gemeini-generate-text',
      generateText,
      {
        model: google('gemini-2.5-flash'),
        system: 'You are a helful assistent.',
        prompt: 'What is 1 + 1?',
      }
    );

    return steps;
  }
);
