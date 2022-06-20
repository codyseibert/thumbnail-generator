import React, { SyntheticEvent } from 'react';

export default function InputGroup({
  onChange,
  value,
  label,
}: {
  onChange: (e: SyntheticEvent) => void;
  value: string;
  label: string;
}) {
  return (
    <div className="mb-8">
      <label className="text-md block mb-2">{label}</label>
      <input
        onChange={onChange}
        value={value}
        className="w-full p-2 border text-gray-800 border-gray-200 bg-white"
      />
    </div>
  );
}
