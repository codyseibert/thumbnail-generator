import { useTemplateStore } from '@/store/templateStore';
import React, { useEffect } from 'react';
import TemplateCard from './TemplateCard';

const templates = [
  {
    name: 'Default',
    description: 'Default template',
    templateImage:
      'https://i.easil.com/wp-content/uploads/20210901115812/Stacked-Angled-Heading-Pink-Black-youtube-thumbnail.jpg',
    templateId: 1,
    defaultOptions: {
      line1Text: 'Line 1',
      line2Text: 'Line 2',
      line3Text: 'Line 3',
      bgColor: '#F78DA7',
      txtColor: '#ffffff',
    },
  },
  {
    name: 'Default',
    description: 'Default template',
    templateImage:
      'https://www.picmaker.com/assets/images/YoutubeThumbnail/YouTube-thumbnail-maker-2.png',
    templateId: 2,
  },
  {
    name: 'Default',
    description: 'Default template',
    templateImage:
      'https://i.ytimg.com/vi/whxAXY0OIGc/maxresdefault.jpg',
    templateId: 3,
  },
];

export default function TemplatePanel() {
  const templateOptions = useTemplateStore();
  useEffect(() => {
    templateOptions.setOptions(templates[0].defaultOptions);
  }, []);

  return (
    <div className="p-4 w-96 bg-gray-100 overflow-y-scroll">
      <h1 className="text-gray-600 text-2xl">TEMPLATES</h1>

      {templates.map((template) => (
        <TemplateCard
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
