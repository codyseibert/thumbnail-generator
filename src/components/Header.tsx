import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Header() {
  const session = useSession();
  console.log('session', session);
  return (
    <div className="drop-shadow-md px-8 relative bg-white">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1 text-gray-800">
            <Link href="/">
              <a>LOGO</a>
            </Link>
          </div>

          <nav className="flex space-x-10">
            <Link href="/templates">
              <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                Templates
              </a>
            </Link>
            <a
              href="#"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Pricing
            </a>
          </nav>

          <div className="flex items-center justify-end md:flex-1 lg:w-0 ">
            {session.status === 'authenticated' && (
              <>
                <img
                  className="rounded-full w-8 mr-4"
                  src={session.data.user.image}
                />
                <span className="text-gray-500 mr-4">
                  {session.data.user.name}
                </span>
                <Link href="/api/auth/signout">
                  <a className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                    Sign out
                  </a>
                </Link>
              </>
            )}

            {session.status === 'unauthenticated' && (
              <>
                <Link href="/api/auth/signin">
                  <a className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                    Sign in
                  </a>
                </Link>
                <Link href="/api/auth/signin">
                  <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Sign up
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
