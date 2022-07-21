import { PRIMARY_BUTTON } from '@/classes/buttons';
import { trpc } from '@/utils/trpc';
import React, { FC, useState } from 'react';
import ImageSelectModal from '../ImageSelectModal';
import { EditableComponentProps } from './ColorPicker';

export const ImagePicker: FC<EditableComponentProps> = ({
  editable,
  setOptions,
}) => {

  const [showImageSelectModal, setShowImageSelectModal] = useState(false)

  return (
    <div className="mb-8 flex flex-col justify-items-start">
      <h2>{editable.label}</h2>
      <input
        type="file"
        className='mb-4'
        onChange={(e) => {
          if (!e.target.files) return;
          setOptions({
            [editable.optionKey]: URL.createObjectURL(
              e.target.files[0]
            ),
          });
        }}
      />
      <button
        onClick={() => setShowImageSelectModal(true)}
        className={PRIMARY_BUTTON}>
        Browse Library
      </button>
      {showImageSelectModal && <ImageSelectModal
        onClose={() => setShowImageSelectModal(false)}
        onImageSelect={(url) => {
          setOptions({
            [editable.optionKey]: url
          });
          setShowImageSelectModal(false)
        }}
      />}

    </div >
  );
};
