import Head from "next/head";
import React, { useState } from "react";

export default function generateThumbnail() {

    const [thumbnailData, setThumbnailData] = useState({
        thumbnailTitle: '',
    })
    function onSumbit(e: React.SyntheticEvent) {
        e.preventDefault()
        setThumbnailData({
            ...thumbnailData,
            thumbnailTitle: ''
        })
        console.log(thumbnailData)
    }

    function formData(e: React.SyntheticEvent) {
        const { value } = e.target
        setThumbnailData({
            ...thumbnailData,
            thumbnailTitle: value
        })

    }
    return (
        <div className="h-screen w-screen flex flex-col justify-between items-center relative">
            <Head>
                <title>Generate Thumbnail</title>
            </Head>
            <div className="text-2xl text-center pt-8">
                <h1>Generate a Thumbnail !</h1>

                <form onSubmit={onSumbit}>
                    <label htmlFor="title">Thumbnail Title : {thumbnailData.thumbnailTitle}</label>
                    <br></br>
                    <input type="text" name="title" id="title" onChange={formData} value={thumbnailData.thumbnailTitle} />
                    <br />
                    <button type="submit">Done</button>
                </form>

            </div>
        </div>
    )
}