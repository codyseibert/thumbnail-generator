import { Template } from '@/api/getTemplates';
import { useTemplates } from '@/hooks/useTemplates';
import { useTemplateStore } from '@/store/templateStore';
import Link from 'next/link';
import React, { useEffect } from 'react';
import TemplateCard from './TemplateCard';

export default function TemplatePanel({
  templateId,
}: {
  templateId: string;
}) {
  const templateStore = useTemplateStore();

  const { templates, isLoading } = useTemplates({
    onSuccess: () => null,
  });

  useEffect(() => {
    if (!templates) return;
    if (!templateStore.isSelected()) {
      const firstTemplate = templates.find(
        (template) => template.templateId === templateId
      );
      if (firstTemplate) {
        templateStore.setOptions(
          firstTemplate.defaultOptions
        );
        templateStore.setTemplate(firstTemplate.template);
        templateStore.setEditables(firstTemplate.editables);
      }
    }
  }, [templateId, templates]);

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
