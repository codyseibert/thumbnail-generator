import useStripe from '@/hooks/useStripe';
import React from 'react';
import { trpc } from '@/utils/trpc';
import { PRIMARY_BUTTON } from '@/classes/buttons';

export default function GoPremiumButton() {
  const { isLoading, mutateAsync: createCheckout } =
    trpc.useMutation('checkout.createMonthlySubscription');

  const stripePromise = useStripe();

  const goPremium = async () => {
    const response = await createCheckout();
    const stripe = await stripePromise;

    if (stripe !== null) {
      await stripe.redirectToCheckout({
        sessionId: response.id,
      });
    }
  };

  return (
    <button
      onClick={goPremium}
      disabled={isLoading}
      className={PRIMARY_BUTTON}
    >
      Go Premium
    </button>
  );
}
