import { Editable } from '@/store/templateStore';
import { PaintBucket } from 'phosphor-react';
import React, { FC, useEffect, useState } from 'react';
import { TwitterPicker } from 'react-color';
import { MdGradient } from 'react-icons/md';

export type OptionsMap = {
  [key: string]: string;
};

export type SetOptions = {
  (options: OptionsMap): void;
};

export type EditableComponentProps = {
  editable: Editable;
  setOptions: SetOptions;
  options: OptionsMap;
};

export const ColorPicker: FC<EditableComponentProps> = ({
  editable,
  setOptions,
  options,
}) => {
  const [showGradient, setShowGradient] = useState(false);
  const [startGradient, setStartGradient] = useState('red');
  const [endGradient, setEndGradient] = useState('blue');

  useEffect(() => {
    if (showGradient) {
      setOptions({
        [editable.optionKey]: `linear-gradient(to right, ${startGradient}, ${endGradient})`,
      });
    }
  }, [endGradient, startGradient]);

  return (
    <div className="mb-8">
      <div className="flex">
        <h2 className="text-md mb-6 mr-4">
          {editable.label}
        </h2>
        <PaintBucket
          className="mr-4"
          size={32}
          onClick={() => setShowGradient(false)}
        />
        <MdGradient
          className="text-4xl"
          onClick={() => setShowGradient(true)}
        />
      </div>
      {!showGradient && (
        <TwitterPicker
          color={options[editable.optionKey]}
          onChangeComplete={({ hex }) =>
            setOptions({
              [editable.optionKey]: hex,
            })
          }
        />
      )}
      {showGradient && (
        <div className="pl-8">
          <label className="mb-8">Start Color</label>
          <TwitterPicker
            className="mt-4 mb-8"
            color={startGradient}
            onChangeComplete={({ hex }) =>
              setStartGradient(hex)
            }
          />
          <label className="mb-8">End Color</label>
          <TwitterPicker
            className="mt-4 mb-8"
            color={endGradient}
            onChangeComplete={({ hex }) =>
              setEndGradient(hex)
            }
          />
        </div>
      )}
    </div>
  );
};
