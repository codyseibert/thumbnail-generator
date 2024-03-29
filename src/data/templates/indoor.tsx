import React from 'react';
import { Editable } from '@/store/templateStore';
import { Template } from '@/api/getTemplates';

export const INDOOR: Template = {
  name: 'Bubbles',
  isPremium: true,
  description: 'Some guy with dark bg and colorful bubbles',
  templateImage:
    'https://www.picmaker.com/assets/images/YoutubeThumbnail/YouTube-thumbnail-maker-2.png',
  templateId: '2',
  editables: [
    {
      label: 'Line 1 Text',
      optionKey: 'line1Text',
      type: 'text',
    },
    {
      label: 'Background Color',
      optionKey: 'bgColor',
      type: 'colorPicker',
    },
    {
      label: 'Text Color',
      optionKey: 'txtColor',
      type: 'colorPicker',
    },
  ] as Editable[],
  defaultOptions: {
    line1Text: 'INDOOR',
    bgColor: '#333333',
    txtColor: '#00FF00',
    isPreimum: true,
  },
  template: (options: any) => {
    return (
      <div
        className="h-full relative"
        style={{
          backgroundColor: options.bgColor,
        }}
      >
        <h1
          className="text-center absolute text-black text-5xl p-4"
          style={{
            color: options.txtColor,
          }}
        >
          {options.line1Text}
        </h1>
      </div>
    );
  },
};
