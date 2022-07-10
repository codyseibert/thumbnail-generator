import React from "react";
import { useTemplateStore } from "@/store/templateStore";

export default function PremiumPopUp() {
  const setShowModal = useTemplateStore((state) => state.setShowModal);

  return (
    <div
      className="absolute bg-gray-400 h-full w-full z-40"
      style={{ top: "0", left: "0", backgroundColor: "rgba(0,0,0,0.8)" }}
    >
      <button onClick={()=>setShowModal(false)} className="z-60 px-5 py-3 ml-5 mt-20 rounded-md bg-blue-500 ">Close</button>
      <div
        className="bg-gray-800 mx-auto mt-12 rounded-lg shadow-md "
        style={{ height: "630px", width: "580px" }}
      >
        <h1 className="text-center p-3">Payments Page</h1>
      </div>
    </div>
  );
}
