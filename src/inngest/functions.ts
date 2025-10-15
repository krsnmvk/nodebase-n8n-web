import prisma from '@/lib/prisma';
import { inngest } from './client';

export const helloWorld = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'test/hello.world' },
  async ({ event, step }) => {
    await step.sleep('wait-a-moment', '1s');

    await step.sleep('wait-a-moment', '1s');

    await step.sleep('wait-a-moment', '1s');

    await step.run('create-workflow', async () => {
      return await prisma.workflow.create({
        data: {
          name: 'workflow-from-inngest',
        },
      });
    });
  }
);
