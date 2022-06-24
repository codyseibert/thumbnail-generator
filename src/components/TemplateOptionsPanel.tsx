import { useTemplateStore } from '@/store/templateStore';
import { PaintBucket } from 'phosphor-react';
import React from 'react';
import { TwitterPicker } from 'react-color';
import InputGroup from './InputGroup';
import { MdGradient } from 'react-icons/md';
import { ColorPicker } from './Editables/ColorPicker';

function OptionGroup({
  editable,
  setOptions,
  options,
}: {
  editable: any;
  setOptions: any;
  options: any;
}) {
  return (
    <>
      {editable.type === 'slider' && (
        <>
          <label className="form-label">
            {editable.label}
          </label>
          <input
            key={editable.key}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement>
            ) => {
              setOptions({
                [editable.optionKey]: e.currentTarget.value,
              });
            }}
            value={options[editable.optionKey] + ''}
            type="range"
            min="0"
            max="100"
            className="range mb-8"
          />
        </>
      )}
      {editable.type === 'text' && (
        <InputGroup
          key={editable.key}
          label={editable.label}
          onChange={(value) => {
            setOptions({
              [editable.optionKey]: value,
            });
          }}
          value={options[editable.optionKey]}
        />
      )}
      {editable.type === 'colorPicker' && (
        <ColorPicker
          editable={editable}
          options={options}
          setOptions={setOptions}
        />
      )}

      {editable.type === 'imagePicker' && (
        <div className="mb-8">
          <h2>Add Image. Reccomded is 400 x 500 and up.</h2>
          <input
            type="file"
            onChange={(e) => {
              setOptions({
                [editable.optionKey]: URL.createObjectURL(
                  e.target.files[0]
                ),
              });
            }}
          />
        </div>
      )}
    </>
  );
}

export default function TemplateOptionsPanel() {
  const templateOptions = useTemplateStore();
  const { editables, options, setOptions } =
    templateOptions;

  return (
    <div className="p-4 w-96 bg-gray-200 overflow-y-scroll text-gray-600">
      <h1 className="text-2xl mb-4">OPTIONS</h1>

      {editables.map((item) => {
        return (
          <OptionGroup
            editable={item}
            key={item.optionKey}
            options={options}
            setOptions={setOptions}
          />
        );
      })}
    </div>
  );
}
