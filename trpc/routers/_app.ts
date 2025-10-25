import { baseProcedure, createTRPCRouter } from '../init';
import db from '@/lib/db';

export const appRouter = createTRPCRouter({
  getUsers: baseProcedure.query(async () => {
    return await db.user.findMany();
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
