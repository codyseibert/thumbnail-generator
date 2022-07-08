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
      const token = getCookie(`${process.env.COOKIE_PREFIX}next-auth.session-token`, {
        req: ctx.req,
        res: ctx.res,
      }) as string;
      console.log('token', token);

      if (!ctx.session) {
        throw new Error(
          'you must be logged in to subscribe'
        );
      }

      const dbSession = await prisma.session.findUnique({
        where: { sessionToken: token },
      });
      console.log('dbSession', dbSession);


      if (!dbSession) {
        throw new Error(
          'no user exists with this sessionToken'
        );
      }

      return await createMonthlySubscription({
        userId: dbSession.userId,
      });
    },
  });
