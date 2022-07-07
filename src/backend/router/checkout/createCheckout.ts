import Stripe from 'stripe';
import { stripe } from '../../../libs/stripe';

const ORIGIN_URL = 'http://localhost:3000';

export async function createMonthlySubscription({
  userId,
}: {
  userId: string;
}) {
  const params: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    payment_method_types: ['card', 'us_bank_account'],
    line_items: [
      {
        price: 'price_1LIjGPKXcrbzumd0GEq3hEqC',
        quantity: 1,
        description: 'Access all premium thumbnails',
      },
    ],
    metadata: { userId },
    success_url: `${ORIGIN_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${ORIGIN_URL}/`,
  };
  return await stripe.checkout.sessions.create(params);
}
