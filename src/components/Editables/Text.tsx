import React, { FC } from 'react';
import InputGroup from '../InputGroup';
import { EditableComponentProps } from './ColorPicker';

export const Text: FC<EditableComponentProps> = ({
  editable,
  setOptions,
  options,
}) => {
  return (
    <InputGroup
      label={editable.label}
      onChange={(value) => {
        setOptions({
          [editable.optionKey]: value,
        });
      }}
      value={options[editable.optionKey]}
    />
  );
};
