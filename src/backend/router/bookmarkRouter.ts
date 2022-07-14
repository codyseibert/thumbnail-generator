import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@/backend/utils/prisma';
import { RouterContext } from '@/pages/api/trpc/[trpc]';

export const bookmarkRouter = trpc
  .router<RouterContext>()
  .query('getBookmarks', {
    async resolve({ ctx }) {
      if (!ctx.session) {
        throw new Error(
          'you must be logged in to fetch bookmarks'
        );
      }
      // TODO: fix typescript hack add type to id
      const userId = ctx.session.user.id;
      const bookmarks = await prisma.bookmark.findMany({
        where: {
          userId,
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
      if (!ctx.session) {
        throw new Error(
          'you must be logged in to bookmark a template'
        );
      }

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
      if (!ctx.session) {
        throw new Error(
          'you must be logged in to bookmark a template'
        );
      }

      const userId = ctx.session.user.id;

      const bookmark = await prisma.bookmark.create({
        data: {
          userId,
          templateId: input.templateId,
        }
      })

      return bookmark;
    },
  });
