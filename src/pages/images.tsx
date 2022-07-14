import React, { useRef, useState } from 'react';
import Header from '@/components/Header';
import { trpc } from '@/utils/trpc';
import { DANGER_BUTTON, PRIMARY_BUTTON } from '@/classes/buttons';

const ImageCard = (
  { url, id, refetchImages }: { url: string, id: string, refetchImages: any }
) => {

  const { mutateAsync: deleteImage } =
    trpc.useMutation('image.delete');

  return <div className="w-full flex-1 flex justify-center mt-10">
    <div className="w-full p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all transform duration-500">
      <img
        className="w-full h-32 object-cover"
        src={url}
        alt=""
      />
      <div className="flex mt-2 justify-end">
        <button
          onClick={async () => {
            await deleteImage({ imageId: id, })
            refetchImages();
          }}
          className={DANGER_BUTTON}>Remove</button>
      </div>
    </div>
  </div>
}

export default function ImagesPage() {
  const [file, setFile] = useState<any>(null);
  const fileRef = useRef<HTMLInputElement>(null);

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
    setFile(null);
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  }

  return (
    <div>
      <Header />
      <div className="container text-center pt-12 pb-64 mx-auto h-full">
        <h1 className="text-4xl mb-4">Manage Images</h1>

        <form className="text-white" onSubmit={uploadImage}>
          Upload Image
          <input ref={fileRef} className="ml-4 text-white" onChange={onFileChange} type="file"></input>
          {file && <button className={PRIMARY_BUTTON} type="submit">Upload</button>}
        </form>

        <div className="grid grid-cols-5 gap-8">
          {images && images.map(image => (
            <ImageCard refetchImages={refetchImages} key={image.id} {...image} />
          ))}
        </div>
      </div>
    </div>
  );
}
