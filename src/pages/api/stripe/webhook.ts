import { NextApiResponse, NextApiRequest } from 'next';
import { stripe } from '@/libs/stripe';
import { prisma } from '@/backend/utils/prisma';
import { buffer } from "micro";
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhook = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  console.log('runMiddleware')

  // await runMiddleware(
  //   req,
  //   res,
  //   bodyParser.raw({ type: 'application/json' })
  // );

  console.log(req.method)
  if (req.method === 'POST') {
    const signature = req.headers[
      'stripe-signature'
    ] as string;

    try {
      console.log('signature', signature)
      console.log('constructEvent')
      const event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      ) as any;

      const eventData = event.data as any;
      console.log('event.type', event.type)

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
