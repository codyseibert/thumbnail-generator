import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { useTemplateStore } from '@/store/templateStore';
import PremiumPopUp from '@/components/PremiumPopUp';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const showPremiumModal = useTemplateStore(
    (state) => state.showPremiumModal
  );

  return (
    <>
      {showPremiumModal && <PremiumPopUp />}
      <Head>
        <title>Thumbnail</title>
        <meta
          name="twitter:card"
          content="summary_large_image"
        />
        <meta name="theme-color" content="#000000" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png?v=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png?v=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png?v=2"
        />
        <link rel="manifest" href="/site.webmanifest?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
      </Head>
      <SessionProvider session={session}>
        <div className='flex flex-col'>
          <Component {...pageProps} />
          <Footer />
        </div>
      </SessionProvider>
    </>
  );
}

import { withTRPC } from '@trpc/next';
import type { AppRouter } from '@/backend/router/router';
import Footer from '@/components/Footer';

function getBaseUrl() {
  if (process.browser) return '';
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}`;

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
    };
  },
  ssr: false,
})(MyApp);
