import { useTemplateStore } from '@/store/templateStore';
import React from 'react';
import { TwitterPicker } from 'react-color';

export default function TemplateOptionsPanel() {
  const templateOptions = useTemplateStore();
  const { options } = templateOptions;

  return (
    <div className="p-4 w-96 bg-gray-200 overflow-y-scroll text-gray-600">
      <h1 className="text-5xl mb-4">Options</h1>

      <h2 className="text-3xl mb-2">Line 1 Text</h2>
      <input
        onChange={(e) => {
          console.log(templateOptions, e.target.value);
          templateOptions.setOptions({
            line1Text: e.target.value,
          });
        }}
        value={options.line1Text}
        className="mb-6 rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
      />

      <h2 className="text-3xl mb-2">Line 2 Text</h2>
      <input
        onChange={(e) => {
          templateOptions.setOptions({
            line2Text: e.target.value,
          });
        }}
        value={options.line2Text}
        className="mb-6 rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
      />

      <h2 className="text-3xl mb-2">Line 3 Text</h2>
      <input
        onChange={(e) => {
          templateOptions.setOptions({
            line3Text: e.target.value,
          });
        }}
        value={options.line3Text}
        className="mb-6 rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
      />

      <h2 className="text-3xl mb-6">BG Color</h2>
      <TwitterPicker
        color={options.bgColor}
        onChangeComplete={({ hex }) =>
          templateOptions.setOptions({
            bgColor: hex,
          })
        }
      />

      <h2 className="text-3xl mb-4 mt-6">Text Color</h2>
      <TwitterPicker
        color={options.txtColor}
        onChangeComplete={({ hex }) =>
          templateOptions.setOptions({
            txtColor: hex,
          })
        }
      />
    </div>
  );
}
