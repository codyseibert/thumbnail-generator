import { Editable } from '@/store/templateStore';

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
  ] as Editable[],
  defaultOptions: {
    line1Text: '5 THINGS TO',
    line2Text: 'NEVER',
    line3Text: 'WEAR',
    bgColor: '#F78DA7',
    txtColor: '#ffffff',
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
          className="absolute bg-white text-black text-5xl p-4"
          style={{
            right: '120px',
            top: '80px',
            transform: 'rotate(-5deg)',
          }}
        >
          {options.line1Text}
        </h1>
        <h1
          className="absolute bg-black text-orange-400 text-8xl p-4 pl-8 pr-8"
          style={{
            right: '120px',
            top: '180px',
          }}
        >
          {options.line2Text}
        </h1>
        <h1
          className="absolute text-black text-6xl"
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
