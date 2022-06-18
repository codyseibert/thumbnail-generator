import Head from 'next/head';
import React, { useRef, useState } from 'react';

export default function TemplateCard() {
  return (
    <div className="flex justify-center mt-10">
      <div className="p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
        <img
          className="w-64 object-cover rounded-t-md"
          src="https://i.easil.com/wp-content/uploads/20210901115812/Stacked-Angled-Heading-Pink-Black-youtube-thumbnail.jpg"
          alt=""
        />
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-gray-700">
            Standard
          </h1>
          <p className="text-sm mt-2 text-gray-700">
            A common thumbnail layout
          </p>
          <div className="mt-4 mb-2 flex justify-end pl-4 pr-2">
            <button className="text-lg block font-semibold py-2 px-6 text-green-100 hover:text-white bg-green-400 rounded-lg shadow hover:shadow-md transition duration-300">
              Use
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
