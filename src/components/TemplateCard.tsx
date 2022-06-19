import { useTemplateStore } from '@/store/templateStore';
import React from 'react';

type Template = {
  name: string;
  description: string;
  templateImage: string;
  defaultOptions: any;
  template: any;
};

export default function TemplateCard({
  name,
  description,
  templateImage,
  defaultOptions,
  template,
}: Template) {
  const templateStore = useTemplateStore();

  const use = () => {
    templateStore.setOptions(defaultOptions);
    templateStore.setTemplate(template);
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform duration-500">
        <img
          className="w-64 object-cover rounded-t-md"
          src={templateImage}
          alt=""
        />
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-gray-700">
            {name}
          </h1>
          <p className="text-sm mt-2 text-gray-700">
            {description}
          </p>
          <div className="mt-4 mb-2 flex justify-end pl-4 pr-2">
            <button
              onClick={use}
              className="text-lg block font-semibold py-2 px-6 text-green-100 hover:text-white bg-green-400 rounded-lg shadow hover:shadow-md transition duration-300"
            >
              Use
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
