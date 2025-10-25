import { inngest } from '@/inngest/client';
import { createTRPCRouter, protectedProcedure } from '../init';
import db from '@/lib/db';

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(async () => {
    return await db.workflow.findMany();
  }),

  createWorkflows: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'test/hello.world',
      data: {
        name: 'test-workflow',
      },
    });

    return {
      success: true,
      message: 'Job Queued',
    };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
