import React, { useState } from 'react';
import Header from '@/components/Header';
import { trpc } from '@/utils/trpc';
import { DANGER_BUTTON } from '@/classes/buttons';

const ImageCard = ({ url, id }: { url: string, id: string }) => {
  return <div className="flex justify-center mt-10">
    <div className="p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all transform duration-500">
      <img
        className="w-64 object-cover"
        src={url}
        alt=""
      />
      <div className="flex mt-2 justify-end">
        <button className={DANGER_BUTTON}>Remove</button>
      </div>
    </div>
  </div>
}

export default function ImagesPage() {
  const [file, setFile] = useState<any>(null);

  const { mutateAsync: createPresignedUrl } =
    trpc.useMutation('image.createPresignedUrl');

  const { data: images, refetch: refetchImages } =
    trpc.useQuery(['image.getImagesForUser'])

  const onFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files?.[0])
  }

  const uploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    const { url, fields }: { url: string, fields: any } =
      await createPresignedUrl() as any;
    const data = {
      ...fields,
      'Content-Type': file.type,
      file,
    };
    const formData = new FormData();
    for (const name in data) {
      formData.append(name, data[name]);
    }
    await fetch(url, {
      method: 'POST',
      body: formData,
    });
    refetchImages();
  }

  return (
    <div>
      <Header />
      <div className="container text-center pt-64 pb-64 mx-auto h-full">
        <h1 className="text-4xl mb-4">Images</h1>

        <form onSubmit={uploadImage}>
          Upload New Image
          <input onChange={onFileChange} type="file"></input>
          <button type="submit">Upload</button>
        </form>

        <div className="grid grid-cols-4">
          {images && images.map(image => (
            <ImageCard key={image.id} {...image} />
          ))}
        </div>
      </div>
    </div>
  );
}
