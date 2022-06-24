import { Editable } from '@/store/templateStore';
import React from 'react';
import InputGroup from '../InputGroup';

export const Text = ({
  editable,
  setOptions,
  options,
}: {
  editable: Editable;
  setOptions: (options: any) => void;
  options: any;
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
