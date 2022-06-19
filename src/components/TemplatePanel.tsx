import { getTemplates, Template } from '@/api/getTemplates';
import { useTemplateStore } from '@/store/templateStore';
import React, { useEffect, useState } from 'react';
import TemplateCard from './TemplateCard';

export default function TemplatePanel() {
  const templateStore = useTemplateStore();
  const [templates, setTemplates] = useState<Template[]>(
    []
  );

  useEffect(() => {
    getTemplates().then((allTemplates) => {
      const firstTemplate = allTemplates[0];
      templateStore.setOptions(
        firstTemplate.defaultOptions
      );
      templateStore.setTemplate(firstTemplate.template);
      templateStore.setEditables(firstTemplate.editables);
      setTemplates(allTemplates);
    });
  }, []);

  return (
    <div className="p-4 w-96 bg-gray-100 overflow-y-scroll">
      <h1 className="text-gray-600 text-2xl">TEMPLATES</h1>

      {templates.map((template) => (
        <TemplateCard
          template={template.template}
          editables={template.editables}
          defaultOptions={template.defaultOptions}
          key={template.templateId}
          name={template.name}
          description={template.description}
          templateImage={template.templateImage}
        />
      ))}
    </div>
  );
}
