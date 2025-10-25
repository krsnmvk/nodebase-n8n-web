import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import db from './db';
// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql', // or "mysql", "postgresql", ...etc
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 6,
  },

  advanced: {
    database: {
      generateId: false,
    },
  },
});
