import { NextApiResponse, NextApiRequest } from 'next';
import { stripe } from '@/libs/stripe';
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
import { prisma } from '@/backend/utils/prisma';
import { buffer } from "micro";

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhook = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const signature = req.headers[
      'stripe-signature'
    ] as string;

    try {
      const event = stripe.webhooks.constructEvent(
        buf,
        signature,
        webhookSecret
      ) as any;

      const eventData = event.data as any;

      const userId = eventData.object.metadata.userId;

      if (event.type === 'checkout.session.completed') {
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
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            isPremium: false,
          },
        });
      }
    } catch (err: any) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default webhook;
