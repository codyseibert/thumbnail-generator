import useStripe from '@/hooks/useStripe';
import React from 'react';
import { trpc } from '@/utils/trpc';

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
      className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
    >
      Go Premium
    </button>
  );
}
