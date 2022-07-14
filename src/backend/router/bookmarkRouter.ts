import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@/backend/utils/prisma';
import { RouterContext } from '@/pages/api/trpc/[trpc]';
import { isLoggedInMiddleware } from './utils/isLoggedInMiddleware';

export const bookmarkRouter = trpc
  .router<RouterContext>()
  .middleware(isLoggedInMiddleware)
  .query('getBookmarks', {
    async resolve({ ctx }) {
      const bookmarks = await prisma.bookmark.findMany({
        where: {
          userId: ctx.userId,
        }
      })
      return bookmarks;
    },
  })
  .mutation('unbookmarkTemplate', {
    input: z.object({
      bookmarkId: z.string()
    }),
    async resolve({ ctx, input }) {
      const bookmark = await prisma.bookmark.delete({
        where: {
          id: input.bookmarkId,
        }
      })

      return bookmark;
    },
  })
  .mutation('bookmarkTemplate', {
    input: z.object({
      templateId: z.string()
    }),
    async resolve({ ctx, input }) {
      const bookmark = await prisma.bookmark.create({
        data: {
          userId: ctx.userId,
          templateId: input.templateId,
        }
      })

      return bookmark;
    },
  });
