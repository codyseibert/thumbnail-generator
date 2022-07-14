import React from 'react';
import { Template } from '@/api/getTemplates';
import {
  Bookmark as BookmarkIcon,
  Lock,
} from 'phosphor-react';
import classNames from 'classnames';
import { useTemplateStore } from '@/store/templateStore';
import { trpc } from '@/utils/trpc';

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

  const { data: bookmarks, refetch } = trpc.useQuery([
    'bookmark.getBookmarks',
  ]);

  const { data: isPremium } = trpc.useQuery(['isPremium'])

  const { mutateAsync: bookmarkTemplate } =
    trpc.useMutation('bookmark.bookmarkTemplate', {
      onSuccess() {
        refetch();
      },
    });

  const { mutateAsync: unbookmarkTemplate } =
    trpc.useMutation('bookmark.unbookmarkTemplate', {
      onSuccess() {
        refetch();
      },
    });

  const isBookmarked = bookmarks?.some(
    ({ templateId }) => templateId === template.templateId
  );

  const isBookmarkedClassnames = isBookmarked
    ? 'text-yellow-300 hover:text-yellow-400'
    : 'text-gray-300 hover:text-gray-400';

  const toggleBookmark = () => {
    if (!bookmarks) return;

    if (isBookmarked) {
      const bookmark = bookmarks.find(
        ({ templateId }) =>
          templateId === template.templateId
      );

      if (!bookmark) return;

      unbookmarkTemplate({
        bookmarkId: bookmark.id,
      });
    } else {
      bookmarkTemplate({
        templateId: template.templateId,
      });
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all transform duration-500">
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
          <div className="mt-4 mb-2 flex justify-between">
            <button
              onClick={toggleBookmark}
              className={classNames(
                isBookmarkedClassnames,
                'text-lg flex font-semibold'
              )}
            >
              <BookmarkIcon className="mr-2" size={32} />
            </button>
            <button
              onClick={() => {
                (template.isPremium && !isPremium)
                  ? setShowPremiumModal(true)
                  : onSelect(template)
              }}
              className={classNames(
                'text-lg flex font-semibold py-2 px-6 text-green-100 hover:text-white bg-green-400 rounded-lg shadow hover:shadow-md transition duration-300',
                {
                  'bg-gray-400': template.isPremium,
                }
              )}
            >
              {template.isPremium && !isPremium && (
                <Lock className="mr-2" size={32} />
              )}
              Use
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}