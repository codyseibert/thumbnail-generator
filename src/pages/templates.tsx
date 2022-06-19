import { getTemplates, Template } from '@/api/getTemplates';
import Header from '@/components/Header';
import TemplateCard from '@/components/TemplateCard';
import { useTemplates } from '@/hooks/useTemplates';
import { useTemplateStore } from '@/store/templateStore';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

export default function GeneratePage() {
  const router = useRouter();
  const templateStore = useTemplateStore();

  const onThumbnailClick = ({
    defaultOptions,
    template,
    editables,
  }) => {
    templateStore.setOptions(defaultOptions);
    templateStore.setTemplate(template);
    templateStore.setEditables(editables);
    router.push('/generate');
  };

  const { templates, isLoading } = useTemplates({
    onSuccess: () => {},
  });

  return (
    <div>
      <Head>
        <title>Templates</title>
      </Head>
      <Header />
      <div className="container mx-auto h-screen">
        <h1 className="mt-8 text-3xl">Templates</h1>

        <div className="grid grid-cols-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            templates!.map((template) => (
              <TemplateCard
                template={template.template}
                editables={template.editables}
                defaultOptions={template.defaultOptions}
                key={template.templateId}
                name={template.name}
                description={template.description}
                templateImage={template.templateImage}
                onSelect={onThumbnailClick}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
