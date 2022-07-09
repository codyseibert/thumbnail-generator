import * as trpc from '@trpc/server';
import { ZodError } from 'zod';
import { prisma } from '@/backend/utils/prisma';
import { checkoutRouter } from './checkout';
import { RouterContext } from '@/pages/api/trpc/[trpc]';
import { bookmarkRouter } from './bookmark';

export const appRouter = trpc
  .router<RouterContext>()
  .formatError(({ shape, error }) => {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' &&
          error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  })
  .query('isPremium', {
    async resolve({ ctx }) {
      if (!ctx.session) {
        return false;
      }
      const user = await prisma.user.findUnique({
        where: {
          id: ctx.session.id as string,
        },
      });
      return user?.isPremium;
    },
  })
  .merge('bookmark.', bookmarkRouter)
  .merge('checkout.', checkoutRouter);

export type AppRouter = typeof appRouter;
