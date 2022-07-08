import { NextApiResponse, NextApiRequest } from 'next';
import { Stripe } from 'stripe';
import { stripe } from '@/libs/stripe';
import { runMiddleware } from '@/utils/middleware';
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
import bodyParser from 'body-parser';
import { prisma } from '@/backend/utils/prisma';

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhook = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await runMiddleware(
    req,
    res,
    bodyParser.raw({ type: 'application/json' })
  );

  if (req.method === 'POST') {
    const signature = req.headers[
      'stripe-signature'
    ] as string;

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      ) as Stripe.Event;

      const eventData = event.data as any;

      if (event.type === 'checkout.session.completed') {
        const userId = eventData.object.metadata.userId;
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            isPremium: true,
            stripePaymentId: eventData.object?.id,
          },
        });
      } else if (event.type === 'invoice.payment_failed') {
        const userId = eventData.object.metadata.userId;
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            isPremium: false,
          },
        });
      }
      res.send(200);
    } catch (err: unknown) {
      console.log(err);
      if (err instanceof SyntaxError) {
        console.log(`Error message: ${err.message}`);
        res
          .status(400)
          .send(`Webhook Error: ${err.message}`);
        return;
      }
    }
  }
};

export default webhook;
