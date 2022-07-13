import React from 'react';
import { Template } from '@/api/getTemplates';
import { Lock } from 'phosphor-react';
import classNames from 'classnames';
import { useTemplateStore } from '@/store/templateStore';

type TemplateCardProps = {
  template: Template;
  onSelect: (template: Template) => void;
};

export default function TemplateCard({
  template,
  onSelect,
}: TemplateCardProps) {
  const setShowPremiumModal = useTemplateStore(
    (state) => state.setShowPremiumModal
  );

  return (
    <div className="flex justify-center mt-10 relative">
      <div className="p-6 bg-white rounded-xl shadow-xl transition-all transform duration-500">
        <img
          className="w-64 object-cover rounded-t-md"
          src={template.templateImage}
          alt=""
        />
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-gray-700">
            {template.name}
          </h1>
          <p className="text-sm mt-2 text-gray-700">
            {template.description}
          </p>
          <div className="mt-4 mb-2 flex justify-end pl-4 pr-2">
            <button
              onClick={() => {
                template.isPremium
                  ? setShowPremiumModal(true)
                  : onSelect(template)
              }}
              className={classNames(
                'flex text-lg font-semibold py-2 px-6 text-green-100 hover:text-white bg-green-400 rounded-lg shadow hover:shadow-md transition duration-300',
                {
                  'bg-gray-400': template.isPremium,
                }
              )}
            >
              {template.isPremium && (
                <Lock className="mr-2" size={32} onClick={() => setShowPremiumModal(true)} />
              )}
              Use
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
