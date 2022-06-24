import React, { FC } from 'react';
import { EditableComponentProps } from './ColorPicker';

export const ImagePicker: FC<EditableComponentProps> = ({
  editable,
  setOptions,
  options,
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