import { Stripe, loadStripe } from '@stripe/stripe-js';
import { useMemo } from 'react';

const useStripe = () => {
  const stripePublishableKey =
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!stripePublishableKey) {
    throw new Error(
      'please set process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'
    );
  }

  const stripe = useMemo<Promise<Stripe | null>>(
    () => loadStripe(stripePublishableKey),
    [stripePublishableKey]
  );

  return stripe;
};

export default useStripe;
