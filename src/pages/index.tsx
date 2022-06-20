import Header from '@/components/Header';
import { Hero } from '@/components/Hero';
import Head from 'next/head';
import type React from 'react';

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Welome</title>
      </Head>
      <Header />
      <Hero />
    </div>
  );
}
