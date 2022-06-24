import { useTemplateStore } from '@/store/templateStore';
import React, { FC } from 'react';
import {
  ColorPicker,
  EditableComponentProps,
} from './Editables/ColorPicker';
import { Slider } from './Editables/Slider';
import { Text } from './Editables/Text';
import { ImagePicker } from './Editables/ImagePicker';

const OptionGroup: FC<EditableComponentProps> = ({
  editable,
  setOptions,
  options,
}) => {
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
};

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
