import * as trpc from '@trpc/server';
import { createMonthlySubscription } from './checkout/createCheckout';
import getSessionById from './checkout/getSessionById';
import { z } from 'zod';
import { RouterContext } from '@/pages/api/trpc/[trpc]';
import { isLoggedInMiddleware } from './utils/isLoggedInMiddleware';

export const checkoutRouter = trpc
  .router<RouterContext>()
  .query('getSession', {
    input: z.object({
      session_id: z
        .string()
        .refine((id) => id.startsWith('cs_'), {
          message: 'Session ID must start with "cs_"',
        }),
    }),
    async resolve({ input }) {
      return await getSessionById(input.session_id);
    },
  })
  .middleware(isLoggedInMiddleware)
  .mutation('createMonthlySubscription', {
    async resolve({ ctx }) {
      return await createMonthlySubscription({
        userId: ctx.session.user.id
      });
    },
  });
