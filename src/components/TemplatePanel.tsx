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
      line1Text: '5 THINGS TO',
      line2Text: 'NEVER',
      line3Text: 'WEAR',
      bgColor: '#F78DA7',
      txtColor: '#ffffff',
    },
    template: (templateOptions: any) => {
      console.log(templateOptions)
      return (
        <div
          className="h-full relative"
          style={{
            backgroundColor: templateOptions.bgColor,
          }}
        >
          <h1
            className="absolute bg-white text-black text-5xl p-4"
            style={{
              // color: templateOptions.txtColor,
              right: '120px',
              top: '80px',
              transform: 'rotate(-5deg)',
            }}
          >
            {templateOptions.line1Text}
          </h1>

          <h1
            className="absolute bg-black text-orange-400 text-8xl p-4 pl-8 pr-8"
            style={{
              right: '120px',
              top: '180px',
            }}
          >
            {templateOptions.line2Text}
          </h1>
          <h1
            className="absolute text-black text-6xl"
            style={{
              right: '210px',
              top: '320px',
            }}
          >
            {templateOptions.line3Text}
          </h1>
        </div>
      );
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
  const templateStore = useTemplateStore();
  useEffect(() => {
    const firstTemplate = templates[0];
    templateStore.setOptions(firstTemplate.defaultOptions);
    templateStore.setTemplate(firstTemplate.template);
  }, []);

  return (
    <div className="p-4 w-96 bg-gray-100 overflow-y-scroll">
      <h1 className="text-gray-600 text-2xl">TEMPLATES</h1>

      {templates.map((template) => (
        <TemplateCard
          template={template.template}
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
