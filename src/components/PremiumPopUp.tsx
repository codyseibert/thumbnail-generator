import React from 'react';
import { useTemplateStore } from '@/store/templateStore';

export default function PremiumPopUp() {
  const setShowModal = useTemplateStore(
    (state) => state.setShowModal
  );

  return (
    <>
      <button onClick={() => setShowModal(false)}>
        Close
      </button>
      <h1 className="h-full w-full bg-red-400">
        Popup for Premium
      </h1>
    </>
  );
}
