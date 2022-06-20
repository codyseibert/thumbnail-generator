import InputGroup from '@/components/InputGroup';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

type RegisterFormState = {
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterFormState>({
    email: '',
    password: '',
  });

  const {
    isLoading,
    error,
    mutate: register,
  } = trpc.useMutation(['register'], {
    onSuccess: () => {
      router.push('/templates');
    },
  });

  const getAlertError = () => {
    return (
      error?.data?.code === 'INTERNAL_SERVER_ERROR' &&
      'something went wrong, try again later'
    );
  };

  const getError = (fieldKey: string) => {
    return error?.data?.zodError?.fieldErrors[
      fieldKey
    ]?.[0];
  };

  return (
    <div className="pt-32 h-screen w-96 mx-auto">
      <h1 className="mb-4">Register</h1>

      {getAlertError() && (
        <div className="mb-4 p-4 bg-red-500 font-bold">
          {getAlertError()}
        </div>
      )}

      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (isLoading) return;
          register(form);
        }}
      >
        <InputGroup
          label="email"
          error={getError('email')}
          onChange={(value) =>
            setForm({ ...form, email: value })
          }
          value={form.email}
        />

        <InputGroup
          label="password"
          error={getError('password')}
          type="password"
          onChange={(value) =>
            setForm({ ...form, password: value })
          }
          value={form.password}
        />

        <button
          className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          disabled={isLoading}
        >
          Register
        </button>
      </form>
    </div>
  );
}
