import Header from '@/components/Header';
import TemplateOptionsPanel from '@/components/TemplateOptionsPanel';
import TemplatePanel from '@/components/TemplatePanel';
import TemplatePreview from '@/components/TemplatePreview';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

export default function GeneratePage() {
  const router = useRouter();
  const templateId = router.query.templateId as string;

  return (
    <div>
      <Head>
        <title>Generate Thumbnail</title>
      </Head>
      <Header />
      <div className="flex">
        <TemplatePanel templateId={templateId} />
        <TemplateOptionsPanel />
        <TemplatePreview />
      </div>
    </div>
  );
}
