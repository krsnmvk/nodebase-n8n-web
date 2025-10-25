import db from '@/lib/db';
import { inngest } from './client';

export const helloWorld = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'test/hello.world' },

  async ({ step }) => {
    await step.sleep('wait-a-moment', '1s');

    await step.run('create-workflow', async () => {
      return await db.workflow.create({
        data: {
          name: 'test-workflows',
        },
      });
    });
  }
);
