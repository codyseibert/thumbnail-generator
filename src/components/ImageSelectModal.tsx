import { PRIMARY_BUTTON } from '@/classes/buttons';
import { trpc } from '@/utils/trpc'
import { XCircle } from 'phosphor-react';
import React, { useEffect } from 'react'

const ImageCard = (
  { url, onImageSelect }:
    { url: string, onImageSelect: (url: string) => void }
) => {

  return <div className="w-full flex-1 flex justify-center mt-10">
    <div className="w-full p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all transform duration-500">
      <img
        className="w-full h-32 object-cover"
        src={url}
        alt=""
      />
      <div className="flex mt-2 justify-end">
        <button
          onClick={() => onImageSelect(url)}
          className={PRIMARY_BUTTON}>Use</button>
      </div>
    </div>
  </div>
}

const ImageSelectModal = (
  { onClose, onImageSelect }:
    {
      onClose: () => void,
      onImageSelect: (url: string) => void
    }
) => {

  const { data: images } =
    trpc.useQuery(['image.getImagesForUser'])

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, []);

  return (
    <div className="relative z-40" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-6xl sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto">
              <div className="sm:flex sm:justify-center">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <div className="flex justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Your Images</h3>
                    <button onClick={onClose}>
                      <XCircle className="cursor-pointer hover:text-gray-700" size={32} />
                    </button>
                  </div>
                  <div className="mt-2 grid grid-cols-4 gap-5">
                    {images?.map(image => <ImageCard
                      key={image.id}
                      url={image.url}
                      onImageSelect={onImageSelect}
                    />)}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={onClose}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ImageSelectModal