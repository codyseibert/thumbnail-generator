import React from 'react';
import { Editable } from '@/store/templateStore';
import '../../../public/pngegg.png';

export const THINGS_TO_NEVER_WEAR = {
  name: 'Some Woman',
  description: 'Dont',
  templateImage:
    'https://i.easil.com/wp-content/uploads/20210901115812/Stacked-Angled-Heading-Pink-Black-youtube-thumbnail.jpg',
  templateId: 1,
  editables: [
    {
      label: 'Line 1 Text',
      optionKey: 'line1Text',
      type: 'text',
    },
    {
      label: 'Line 2 Text',
      optionKey: 'line2Text',
      type: 'text',
    },
    {
      label: 'Line 3 Text',
      optionKey: 'line3Text',
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
    {
      label: 'Fore Ground Image',
      optionKey: 'foreImage',
      type: 'imagePicker',
    },
  ] as Editable[],
  defaultOptions: {
    line1Text: '5 THINGS TO',
    line2Text: 'NEVER',
    line3Text: 'WEAR',
    bgColor: '#F78DA7',
    txtColor: '#ffffff',
    foreImage: '',
  },
  template: (options: any) => {
    return (
      <div
        className="h-full relative overflow-hidden"
        style={{
          backgroundColor: options.bgColor,
        }}
      >
        <img
          src="pngegg.png"
          className="absolute  cross bg-red-400 rounded-full "
          style={{
            width: '80px',
            height: '80px',
            marginLeft: '200px',
            marginTop: '-15px',
          }}
        />

        <div
          className="img-container relative h-full"
          style={{ width: '55%' }}
        >
          <img
            src={options.foreImage}
            className="z-30 absolute overflow-hidden "
            style={{
              width: '100%',
              height: '100%',
              top: '0',
              left: '0',
            }}
          />
        </div>

        <h1
          className="absolute z-20 bg-white text-black text-5xl p-4"
          style={{
            right: '120px',
            top: '80px',
            transform: 'rotate(-5deg)',
          }}
        >
          {options.line1Text}
        </h1>
        <h1
          className="absolute z-10 bg-black text-orange-400 text-8xl p-4 pl-8 pr-8"
          style={{
            right: '120px',
            top: '180px',
          }}
        >
          {options.line2Text}
        </h1>
        <h1
          className="absolute z-10 text-black text-6xl"
          style={{
            right: '210px',
            top: '320px',
          }}
        >
          {options.line3Text}
        </h1>
      </div>
    );
  },
};
