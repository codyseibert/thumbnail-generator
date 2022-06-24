import React, { FC } from 'react';
import { EditableComponentProps } from './ColorPicker';

export const Slider: FC<EditableComponentProps> = ({
  editable,
  setOptions,
  options,
}) => {
  return (
    <>
      <label className="form-label">{editable.label}</label>
      <input
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
  );
};
