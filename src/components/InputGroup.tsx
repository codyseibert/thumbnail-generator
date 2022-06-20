import React, { SyntheticEvent } from 'react';
import classNames from 'classnames';

type InputGroupProps = {
  label: string;
  onChange: (value: string) => void;
  value: string;
  error?: string;
  type?: string;
};

export default function InputGroup({
  onChange,
  value,
  error,
  label,
  type = 'text',
}: InputGroupProps) {
  return (
    <div className="mb-8">
      <label className="text-md block mb-2">{label}</label>
      <input
        className={classNames('mb-8', {
          'border border-red-500': error,
        })}
        onChange={(
          e: React.FormEvent<HTMLInputElement>
        ) => {
          onChange(e.currentTarget.value);
        }}
        type={type}
        value={value}
        className="w-full p-2 border text-gray-800 border-gray-200 bg-white"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
