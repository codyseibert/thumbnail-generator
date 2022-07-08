import useStripe from '@/hooks/useStripe';
import React from 'react';
import { trpc } from '@/utils/trpc';
import Header from '@/components/Header';

export default function PricingPage() {
  const { isLoading, mutateAsync: createCheckout } =
    trpc.useMutation('checkout.createMonthlySubscription');

  const stripePromise = useStripe();

  const goPremium = async () => {
    const response = await createCheckout();
    const stripe = await stripePromise;

    if (stripe != null) {
      await stripe.redirectToCheckout({
        sessionId: response.id,
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="container text-center pt-64 pb-64 mx-auto h-full">
        <h1 className="text-4xl mb-4">$9.99 Baby</h1>
        <p className="text-xl mb-8">
          Go Premium to unlock access to over 100+ templates
        </p>
        <button
          onClick={goPremium}
          disabled={isLoading}
          className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Go Premium
        </button>
      </div>
    </div>
  );
}
