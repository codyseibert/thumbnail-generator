import * as trpc from '@trpc/server';
import { ZodError } from 'zod';
import { prisma } from '@/backend/utils/prisma';
import { checkoutRouter } from './checkout';
import { RouterContext } from '@/pages/api/trpc/[trpc]';
import { bookmarkRouter } from './bookmark';
import * as AWS from 'aws-sdk';
const s3 = new AWS.S3()

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
  .mutation('createPresignedUrl', {
    async resolve({ ctx }) {
      if (!ctx.session) {
        throw new Error('you must be logged in');
      }

      const userId = ctx.session.id as string;

      const image = await prisma.image.create({
        data: {
          userId,
        }
      })

      return new Promise((resolve, reject) => {
        s3.createPresignedPost({
          Fields: {
            key: image.id,
          },
          Conditions: [
            ["starts-with", "$Content-Type", "image/"],
            ["content-length-range", 0, 1000000],
          ],
          Expires: 30,
          Bucket: 'thumbnail-generator-images',
        }, (err, signed) => {
          if (err) return reject(err);
          resolve(signed);
        });
      })
    }
  })
  .merge('bookmark.', bookmarkRouter)
  .merge('checkout.', checkoutRouter);

export type AppRouter = typeof appRouter;
