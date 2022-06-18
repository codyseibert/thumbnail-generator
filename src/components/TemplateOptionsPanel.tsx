import Head from 'next/head';
import React, { useRef, useState } from 'react';
import { TwitterPicker } from 'react-color';
import TemplateCard from './TemplateCard';

export default function TemplateOptionsPanel() {
  const [bgColor, setBgColor] = useState('#555753');
  const [txtColor, setTxtColor] = useState('#555753');

  return (
    <div className="p-4 w-96 bg-gray-200 overflow-y-scroll text-gray-600">
      <h1 className="text-5xl mb-4">Options</h1>

      <h2 className="text-3xl mb-2">Line 1 Text</h2>
      <input
        value="5 THINGS TO"
        className="mb-6 rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
      />

      <h2 className="text-3xl mb-2">Line 2 Text</h2>
      <input
        value="NEVER"
        className="mb-6 rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
      />

      <h2 className="text-3xl mb-2">Line 3 Text</h2>
      <input
        value="WEAR"
        className="mb-6 rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
      />

      <h2 className="text-3xl mb-6">BG Color</h2>
      <TwitterPicker
        color={bgColor}
        onChangeComplete={(bgColor) =>
          setBgColor(bgColor.hex)
        }
      />

      <h2 className="text-3xl mb-4 mt-6">Text Color</h2>
      <TwitterPicker
        color={txtColor}
        onChangeComplete={(color) => setTxtColor(color.hex)}
      />
    </div>
  );
}
