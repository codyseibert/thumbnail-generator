import TemplateOptionsPanel from '@/components/TemplateOptionsPanel';
import TemplatePanel from '@/components/TemplatePanel';
import TemplatePreview from '@/components/TemplatePreview';
import Head from 'next/head';
import React from 'react';

export default function generateThumbnail() {
  return (
    <div className="">
      <Head>
        <title>Generate Thumbnail</title>
      </Head>
      <div className="flex h-screen">
        <TemplatePanel />
        <TemplateOptionsPanel />
        <TemplatePreview />
      </div>
    </div>
  );
}
