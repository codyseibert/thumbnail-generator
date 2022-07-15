import * as trpc from '@trpc/server';
import { Image } from '@prisma/client';
import { z } from 'zod';

import { RouterContext } from '@/pages/api/trpc/[trpc]';
import { prisma } from '@/backend/utils/prisma';
import { isLoggedInMiddleware } from '@/backend/router/utils/isLoggedInMiddleware';
import { AWS } from '@/libs/aws'

const s3 = new AWS.S3()

const BUCKET_NAME = process.env.IMAGE_STORAGE_S3_BUCKET ?? 'thumbnail-generator-images';
const UPLOADING_TIME_LIMIT = 30;
const UPLOAD_MAX_FILE_SIZE = 1000000;

interface ImageMetadata extends Image {
  url: string
}

export const imagesRouter = trpc
  .router<RouterContext>()
  .middleware(isLoggedInMiddleware)
  .query('getImagesForUser', {
    async resolve({ ctx }) {
      const userId = ctx.session.user.id;

      const images = await ctx.prisma.image.findMany({
        where: {
          userId,
        }
      })

      const extendedImages: ImageMetadata[] = await Promise.all(
        images.map(async image => {
          return {
            ...image,
            url: await s3.getSignedUrlPromise('getObject', {
              Bucket: BUCKET_NAME,
              Key: `${userId}/${image.id}`
            })
          }
        }))

      return extendedImages;
    }
  })
  .mutation('delete', {
    input: z.object({
      imageId: z.string(),
    }),
    async resolve({ ctx, input }) {
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

      await s3.deleteObject(
        {
          Bucket: BUCKET_NAME,
          Key: `${userId}/${input.imageId}`
        }
      ).promise()
    }
  })
  .mutation('createPresignedUrl', {
    async resolve({ ctx }) {
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
            ["content-length-range", 0, UPLOAD_MAX_FILE_SIZE],
          ],
          Expires: UPLOADING_TIME_LIMIT,
          Bucket: BUCKET_NAME,
        }, (err, signed) => {
          if (err) return reject(err);
          resolve(signed);
        });
      })
    }
  })