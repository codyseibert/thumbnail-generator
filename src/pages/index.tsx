import { trpc } from '@/utils/trpc';
import type React from 'react';

import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { mutate: register } = trpc.useMutation(
    ['register'],
    {
      onSuccess: () => {
        router.push('/dashboard');
      },
    }
  );

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    register(form);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-between items-center relative">
      <Head>
        <title>Register</title>
      </Head>
      <div className="text-2xl text-center pt-8">
        <h1>Register</h1>
        <form onSubmit={onSubmit}>
          <input
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            type="text"
            placeholder="email"
          />
          <input
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            type="password"
            placeholder="password"
          />
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
