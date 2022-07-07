import useStripe from '@/hooks/useStripe';
import React from 'react';
import { trpc } from '@/utils/trpc';
import Header from '@/components/Header';

export default function UpgradePage() {
  const { isLoading, mutateAsync: createCheckout } =
    trpc.useMutation('checkout.createMonthlySubscription');

  const stripePromise = useStripe();

  const handleDonationSubmit = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();

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
      {isLoading && <div>...loading</div>}
      <form onSubmit={handleDonationSubmit}>
        <button>upgrade</button>
      </form>
    </div>
  );
}
