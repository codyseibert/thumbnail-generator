import type React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col justify-between items-center relative">
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="text-2xl text-center pt-8">
        <h1>Dashboard</h1>
      </div>
    </div>
  );
}
