import { useTemplateStore } from '@/store/templateStore';
import React from 'react';
import { TwitterPicker } from 'react-color';
import InputGroup from './InputGroup';

export default function TemplateOptionsPanel() {
  const templateOptions = useTemplateStore();
  const { options } = templateOptions;

  return (
    <div className="p-4 w-96 bg-gray-200 overflow-y-scroll text-gray-600">
      <h1 className="text-2xl mb-4">OPTIONS</h1>

      <InputGroup
        label="Line 1 Text"
        onChange={(e: any) => {
          templateOptions.setOptions({
            line1Text: e.target.value,
          });
        }}
        value={options.line1Text}
      />

      <InputGroup
        label="Line 2 Text"
        onChange={(e: any) => {
          templateOptions.setOptions({
            line2Text: e.target.value,
          });
        }}
        value={options.line2Text}
      />

      <InputGroup
        label="Line 3 Text"
        onChange={(e: any) => {
          templateOptions.setOptions({
            line3Text: e.target.value,
          });
        }}
        value={options.line3Text}
      />

      <h2 className="text-md mb-6">Background Color</h2>
      <TwitterPicker
        color={options.bgColor}
        onChangeComplete={({ hex }) =>
          templateOptions.setOptions({
            bgColor: hex,
          })
        }
      />

      <h2 className="text-md mb-4 mt-6">Text Color</h2>
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
