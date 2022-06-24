import React from 'react';
import { Editable } from '@/store/templateStore';
import '../../../public/pngegg.png';
import { Template } from '@/api/getTemplates';

type PlainOptions = {
  line1Text: string;
  lineHeight: string;
  bgColor: string;
  foreImage: string;
};

export const PLAIN: Template = {
  name: 'Plan Template',
  description: 'A title and one foreground image',
  templateImage:
    'https://i.easil.com/wp-content/uploads/20210901115812/Stacked-Angled-Heading-Pink-Black-youtube-thumbnail.jpg',
  templateId: '3',
  isPremium: false,
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
      label: 'Fore Ground Image',
      optionKey: 'foreImage',
      type: 'imagePicker',
    },
  ] as Editable[],
  defaultOptions: {
    line1Text: 'CONTEXT API CRASH COURSE',
    lineHeight: '2',
    bgColor: '#0693E3',
    foreImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png',
  } as PlainOptions,
  template: (options: PlainOptions) => {
    const showLinearGradient =
      options.bgColor.includes('linear');
    return (
      <div
        className="h-full relative overflow-hidden"
        style={{
          backgroundColor: !showLinearGradient
            ? options.bgColor
            : undefined,
          backgroundImage: showLinearGradient
            ? options.bgColor
            : undefined,
        }}
      >
        <div className="grid grid-cols-5 h-full">
          <div className="col-span-2 flex flex-col justify-center">
            <img
              src={options.foreImage}
              style={{
                height: '350px',
                position: 'relative',
                left: '50px',
              }}
            />
          </div>

          <div className="col-span-3">
            <div className="flex flex-col h-full justify-center">
              <h1
                className="z-20 text-8xl p-4"
                style={{
                  lineHeight: '100px',
                }}
              >
                {options.line1Text}
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
