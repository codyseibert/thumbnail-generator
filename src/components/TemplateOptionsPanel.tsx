import {
  Editable,
  useTemplateStore,
} from '@/store/templateStore';
import { PaintBucket } from 'phosphor-react';
import React from 'react';
import { TwitterPicker } from 'react-color';
import InputGroup from './InputGroup';
import { MdGradient } from 'react-icons/md';
import { ColorPicker } from './Editables/ColorPicker';
import { Slider } from './Editables/Slider';
import { Text } from './Editables/Text';
import { ImagePicker } from './Editables/ImagePicker';

function OptionGroup({
  editable,
  setOptions,
  options,
}: {
  editable: Editable;
  setOptions: (options: any) => void;
  options: any;
}) {
  return (
    <>
      {editable.type === 'slider' && (
        <Slider
          editable={editable}
          options={options}
          setOptions={setOptions}
        />
      )}

      {editable.type === 'text' && (
        <Text
          editable={editable}
          options={options}
          setOptions={setOptions}
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
        <ImagePicker
          editable={editable}
          options={options}
          setOptions={setOptions}
        />
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
