import React from 'react';
import Header from '@/components/Header';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div>
      <Header />
      <div className="container text-center pt-64 pb-64 mx-auto h-full">
        <button>
          <h1 className="text-4xl mb-4">
            Welcome to Premium!
          </h1>
          <p className="text-xl mb-8">
            {' '}
            Now you may access over 100+ templates
          </p>
          <Link href="/templates">
            <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Browse Templates
            </a>
          </Link>
        </button>
      </div>
    </div>
  );
}
