import { Editable } from '@/store/templateStore';
import React from 'react';

export const ImagePicker = ({
  editable,
  setOptions,
  options,
}: {
  editable: Editable;
  setOptions: (options: any) => void;
  options: any;
}) => {
  return (
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
  );
};
