import { Template } from '@/api/getTemplates';
import { useTemplates } from '@/hooks/useTemplates';
import { useTemplateStore } from '@/store/templateStore';
import Link from 'next/link';
import React from 'react';
import TemplateCard from './TemplateCard';

export default function TemplatePanel() {
  const templateStore = useTemplateStore();

  const { templates, isLoading } = useTemplates({
    onSuccess: (allTemplates) => {
      if (!templateStore.isSelected()) {
        const firstTemplate = allTemplates[0];
        templateStore.setOptions(
          firstTemplate.defaultOptions
        );
        templateStore.setTemplate(firstTemplate.template);
        templateStore.setEditables(firstTemplate.editables);
      }
    },
  });

  const onThumbnailClick = (template: Template) => {
    templateStore.setOptions(template.defaultOptions);
    templateStore.setTemplate(template.template);
    templateStore.setEditables(template.editables);
  };

  return (
    <div className="p-4 w-96 bg-gray-100 overflow-y-scroll">
      <h1 className="text-gray-600 text-2xl">TEMPLATES</h1>
      <Link href="/templates">
        <a className="text-blue-400 text-md">Browse All</a>
      </Link>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        templates?.map((template) => (
          <TemplateCard
            template={template}
            key={template.templateId}
            onSelect={onThumbnailClick}
          />
        ))
      )}
    </div>
  );
}
