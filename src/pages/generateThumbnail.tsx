import Head from "next/head";
import React, { useState } from "react";
import { TwitterPicker } from "react-color";

export default function generateThumbnail() {
  const [thumbnailData, setThumbnailData] = useState({
    thumbnailTitle: "",
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [bgColor, setBgColor] = useState("#555753");
  function onSumbit(e: React.SyntheticEvent) {
    e.preventDefault();
    // setThumbnailData({
    //     ...thumbnailData,
    //     thumbnailTitle: ''
    // })
    console.log(thumbnailData);
  }

  function formData(e: React.SyntheticEvent) {
    const { value } = e.target;
    setThumbnailData({
      ...thumbnailData,
      thumbnailTitle: value,
    });
  }
  return (
    <div className="h-screen w-screen flex flex-col justify-between items-center relative">
      <Head>
        <title>Generate Thumbnail</title>
      </Head>
      <div className="text-2xl mt-4 text-center pt-8">
        <h1>Generate a Thumbnail !</h1>

        <form onSubmit={onSumbit}>
          <label htmlFor="title">Title</label>

          <input
            type="text"
            name="title"
            id="title"
            onChange={formData}
            value={thumbnailData.thumbnailTitle}
          />
          <br />

          <button type="submit" className="bg-blue-600 rounded-md p-3">
            Done
          </button>
        </form>
        <div className="color-picker-bg">
          <button
            className="p-3 bg-pink-400 w-32"
            onClick={() => setShowColorPicker((oldState) => !oldState)}
          >
            {showColorPicker ? "X" : "Pick a Color"}
          </button>

          {/* conditional render for color picker */}
          {showColorPicker && (
            <TwitterPicker
              className="rounded-md"
              color={bgColor}
              onChangeComplete={(bgColor) => setBgColor(bgColor.hex)}
            />
          )}
        </div>

        <h2 className="mt-5">Ugly Preview :</h2>
        <div
          style={{ background: bgColor }}
          className="thumbnail-card mt-10  p-5 h-32 mx-auto  bg-gray-500 rounded-lg"
        >
          <h2>{thumbnailData.thumbnailTitle}</h2>
        </div>
      </div>
    </div>
  );
}
