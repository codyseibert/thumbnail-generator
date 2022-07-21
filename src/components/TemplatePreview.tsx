import { useTemplateStore } from '@/store/templateStore';
import downloadjs from 'downloadjs';
import * as htmlToImage from 'html-to-image';
import React, { useRef } from 'react';
import domtoimage from 'dom-to-image';



export default function TemplatePreview() {
  const thumbnailDiv = useRef(null);
  const template = useTemplateStore(
    (state: any) => state.template
  );


  const templateOptions = useTemplateStore(
    (state: any) => state.options
  );


  const generateImage = (el: any) => {
    htmlToImage.toPng(el, { pixelRatio: 1 }).then((dataUrl) => {
      downloadjs(dataUrl, 'download.png', 'image/png');
    });
  };

  return (
    <div style={{ height: '1000px' }} className="p-4 flex flex-1 flex-col h-screen justify-center text-center">
      <h1 className="text-2xl mb-4">Preview</h1>

      <div className="mx-auto">
        <div
          ref={thumbnailDiv}
          style={{
            width: '1280px',
            height: '720px',
          }}
        >
          {template(templateOptions)}
        </div>
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
