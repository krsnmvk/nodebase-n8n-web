import { checkout, polar, portal } from '@polar-sh/better-auth';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import db from './db';
import { polarClient } from './polar';

export const auth = betterAuth({
  database: prismaAdapter(db, {
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
              productId: process.env.POLAR_PRODUCT_ID!,
              slug: 'pro', // Custom slug for easy reference in Checkout URL, e.g. /checkout/Nodebase
            },
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly: true,
        }),
        portal(),
      ],
    }),
  ],

  advanced: {
    database: {
      generateId: false,
    },
  },
});
