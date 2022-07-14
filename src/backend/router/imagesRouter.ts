import * as trpc from '@trpc/server';
import { RouterContext } from '@/pages/api/trpc/[trpc]';
import { prisma } from '@/backend/utils/prisma';
import * as AWS from 'aws-sdk';
import { Image } from '@prisma/client';
const s3 = new AWS.S3()
import { z } from 'zod';
import { imageConfigDefault } from 'next/dist/shared/lib/image-config';

interface ImageMetadata extends Image {
  url: string
}

export const imagesRouter = trpc
  .router<RouterContext>()
  .query('getImagesForUser', {
    async resolve({ ctx }) {
      if (!ctx.session) {
        throw new Error('you must be logged in');
      }

      const userId = ctx.session.user.id;

      const images = await ctx.prisma.image.findMany({
        where: {
          userId: ctx.session.user.id,
        }
      })

      const extendedImages: ImageMetadata[] = await Promise.all(images.map(async image => {
        return {
          ...image,
          url: await s3.getSignedUrlPromise('getObject', {
            Bucket: 'thumbnail-generator-images',
            Key: `${userId}/${image.id}`
          })
        }
      }))

      return extendedImages;
    }
  })
  .mutation('delete', {
    input: z.object({
      imageId: z.string()
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session) {
        throw new Error('you must be logged in');
      }

      const userId = ctx.session.user.id;

      const image = await prisma.image.findFirst({
        where: {
          id: input.imageId
        }
      })

      if (!image || image.userId !== userId) {
        throw new Error('invalid access');
      }

      await prisma.image.delete({
        where: {
          id: input.imageId
        }
      })
    }
  })
  .mutation('createPresignedUrl', {
    async resolve({ ctx }) {
      if (!ctx.session) {
        throw new Error('you must be logged in');
      }

      const userId = ctx.session.user.id;

      const image = await prisma.image.create({
        data: {
          userId,
        }
      })

      return new Promise((resolve, reject) => {
        s3.createPresignedPost({
          Fields: {
            key: `${userId}/${image.id}`,
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