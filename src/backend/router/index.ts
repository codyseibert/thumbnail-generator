import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@/backend/utils/prisma';

export const appRouter = trpc
  .router()
  .mutation('register', {
    input: z.object({
      email: z.string(),
      password: z.string(),
    }),
    async resolve({ input }) {
      const user = await prisma.user.create({
        data: {
          email: input.email,
          password: input.password,
        },
      });
      return { success: true, user };
    },
  });

export type AppRouter = typeof appRouter;
