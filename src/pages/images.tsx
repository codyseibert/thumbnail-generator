import React, { useState } from 'react';
import Header from '@/components/Header';
import { trpc } from '@/utils/trpc';

export default function PricingPage() {

  const [file, setFile] = useState<any>(null);


  const { mutateAsync: createPresignedUrl } =
    trpc.useMutation('createPresignedUrl');

  const onFileChange = (e: React.FormEvent<HTMLFormElement>) => {
    setFile(e.currentTarget.files[0])
  }

  const uploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;

    console.log('file', file)

    const { url, fields }: { url: string, fields: any } = await createPresignedUrl() as any;
    console.log('fields', fields);

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
      </div>
    </div>
  );
}
