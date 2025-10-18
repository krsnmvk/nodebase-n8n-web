import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from './prisma';
import { checkout, polar, portal } from '@polar-sh/better-auth';
import { polarClient } from './polar';
// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // or "mysql", "postgresql", ...etc
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 6,
  },

  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: '5a05d47f-306e-46e5-915f-a724efaea9e2',
              slug: 'pro',
            },
          ],
          authenticatedUsersOnly: true,
          successUrl: process.env.POLAR_SUCCESS_URL,
        }),
        portal(),
      ],
    }),
  ],
});
