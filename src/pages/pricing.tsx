import React from 'react';
import Header from '@/components/Header';
import GoPremiumButton from '@/components/GoPremiumButton';

export default function PricingPage() {
  return (
    <div>
      <Header />
      <div className="container text-center pt-64 pb-64 mx-auto h-full">
        <h1 className="text-4xl mb-4">$9.99 Baby</h1>
        <p className="text-xl mb-8">
          Go Premium to unlock access to over 100+ templates
        </p>
        <GoPremiumButton />
      </div>
    </div>
  );
}
