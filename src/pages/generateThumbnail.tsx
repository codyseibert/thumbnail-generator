import Head from "next/head";

export default function generateThumbnail(){
    return (
        <div className="h-screen w-screen flex flex-col justify-between items-center relative">
      <Head>
        <title>Generate Thumbnail</title>
      </Head>
      <div className="text-2xl text-center pt-8">
        <h1>Generate a Thumbnail !</h1>
        
      </div>
    </div>
    )
}