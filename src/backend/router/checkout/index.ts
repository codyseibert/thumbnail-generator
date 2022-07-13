import * as trpc from '@trpc/server';
import { createMonthlySubscription } from './createCheckout';
import getSessionById from './getSessionById';
import { z } from 'zod';
import { RouterContext } from '@/pages/api/trpc/[trpc]';

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
  .mutation('createMonthlySubscription', {
    async resolve({ ctx }) {
      console.log('we are here');
      if (!ctx.session) {
        throw new Error(
          'you must be logged in to subscribe'
        );
      }

      const userId = ctx.session.user.id;
      return await createMonthlySubscription({
        userId,
      });
    },
  });
