import * as trpc from '@trpc/server';
import { ZodError } from 'zod';
import { prisma } from '@/backend/utils/prisma';
import { checkoutRouter } from './checkoutRouter';
import { bookmarkRouter } from './bookmarkRouter';
import { RouterContext } from '@/pages/api/trpc/[trpc]';
import { imagesRouter } from './imagesRouter';

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
          id: ctx.session.user.id,
        },
      });
      return user?.isPremium;
    },
  })
  .merge('bookmark.', bookmarkRouter)
  .merge('image.', imagesRouter)
  .merge('checkout.', checkoutRouter);

export type AppRouter = typeof appRouter;
