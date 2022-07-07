import * as trpc from '@trpc/server';
import { getCookie } from 'cookies-next';
import { createMonthlySubscription } from './createCheckout';
import getSessionById from './getSessionById';
import { z } from 'zod';
import { prisma } from '@/backend/utils/prisma';
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
    // input: z.object({}),
    async resolve({ ctx }) {
      const token = getCookie('next-auth.session-token', {
        req: ctx.req,
        res: ctx.res,
      }) as string;
      const dbSession = await prisma.session.findUnique({
        where: { sessionToken: token },
      });
      console.log('dbSession', dbSession);
      console.log('session', ctx.session);
      if (!ctx.session) {
        throw new Error(
          'you must be logged in to subscribe'
        );
      }
      return await createMonthlySubscription({
        userId: dbSession.userId,
      });
    },
  });