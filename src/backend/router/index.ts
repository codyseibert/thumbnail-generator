import * as trpc from '@trpc/server';
import { z, ZodError } from 'zod';
import { prisma } from '@/backend/utils/prisma';

export const appRouter = trpc
  .router()
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
      }
    };
  })
  .mutation('register', {
    input: z.object({
      email: z.string().email(),
      password: z.string().min(8).max(32),
    }),
    async resolve({ input }) {
      // TODO: validate the email and password
      // TODO: hash + salt the password
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
