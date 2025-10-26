import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from './generated/prisma/client';

const globalForPrisma = global as unknown as {
  db: PrismaClient;
};

const db = globalForPrisma.db || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== 'production') globalForPrisma.db = db;

export default db;
