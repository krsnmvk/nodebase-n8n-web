import { inngest } from '@/inngest/client';
import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/prisma';

export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(async () => {
    return await prisma.workflow.findMany();
  }),

  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'test/hello.world',
      data: {
        email: 'test@test.com',
      },
    });
    return { success: true, message: 'job queued' };
  }),

  testAI: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'execute/ai',
    });

    return { success: true, message: 'job queued' };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
