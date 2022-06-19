import { getTemplates, Template } from '@/api/getTemplates';
import { useTemplates } from '@/hooks/useTemplates';
import { useTemplateStore } from '@/store/templateStore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
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

  const onThumbnailClick = ({
    defaultOptions,
    template,
    editables,
  }) => {
    templateStore.setOptions(defaultOptions);
    templateStore.setTemplate(template);
    templateStore.setEditables(editables);
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
  );
}
