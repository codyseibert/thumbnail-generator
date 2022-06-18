import Head from 'next/head';
import React, { useRef, useState } from 'react';
import TemplateCard from './TemplateCard';

export default function TemplatePanel() {
  return (
    <div className="p-4 w-96 bg-gray-100 overflow-y-scroll">
      <h1 className="text-gray-600 text-5xl">Templates</h1>

      <TemplateCard />
      <TemplateCard />
      <TemplateCard />
      <TemplateCard />
    </div>
  );
}
