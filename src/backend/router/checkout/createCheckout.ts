import { stripe } from '../../../libs/stripe';

const ORIGIN_URL = process.env.ORIGIN_URL;

export async function createMonthlySubscription({
  userId,
}: {
  userId: string;
}) {
  return await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card', 'us_bank_account'],
    line_items: [
      {
        price: 'price_1LIjGPKXcrbzumd0GEq3hEqC',
        quantity: 1,
        description: 'Access all premium thumbnails',
      },
    ],
    subscription_data: {
      metadata: { userId },
    },
    metadata: { userId },
    success_url: `${ORIGIN_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${ORIGIN_URL}/pricing`,
  });
}
