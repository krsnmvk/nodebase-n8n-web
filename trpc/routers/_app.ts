import { createTRPCRouter, protectedProcedure } from '../init';
import db from '@/lib/db';

export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(async ({ ctx }) => {
    return await db.user.findMany({
      where: {
        id: ctx.auth.user.id,
      },
    });
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
