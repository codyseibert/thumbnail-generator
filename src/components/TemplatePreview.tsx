import { useTemplateStore } from '@/store/templateStore';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import React, { useRef } from 'react';

export default function TemplatePreview() {
  const thumbnailDiv = useRef(null);

  const template = useTemplateStore(
    (state: any) => state.template
  );

  const templateOptions = useTemplateStore(
    (state: any) => state.options
  );

  const generateImage = async (el: any) => {
    const canvas = await html2canvas(el);
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, 'download.png', 'image/png');
  };

  return (
    <div className="p-4 flex flex-1 flex-col h-screen justify-center text-center">
      <h1 className="text-2xl mb-4">Preview</h1>

      <div
        ref={thumbnailDiv}
        style={{
          width: 1024,
          height: 576,
        }}
        className="mx-auto"
      >
        {template(templateOptions)}
      </div>

      <button
        onClick={() => {
          const elements = thumbnailDiv.current;
          generateImage(elements);
        }}
        className="mx-auto mt-4 w-40 p-3 bg-blue-500"
      >
        Generate Image
      </button>
    </div>
  );
}
