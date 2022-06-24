import { Editable } from '@/store/templateStore';
import React from 'react';

export const Slider = ({
  editable,
  setOptions,
  options,
}: {
  editable: Editable;
  setOptions: (options: any) => void;
  options: any;
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
