import { Link } from '@inertiajs/react';
import React from 'react';

const NotFound = () => {
  return (
    <>
      <main className='h-screen w-full flex flex-col justify-center items-center bg-gray-800'>
        <h1 className='text-9xl font-extrabold text-white tracking-widest'>
          404
        </h1>
        <div className='bg-blue-500 px-2 text-sm rounded rotate-12 absolute'>
          Page Not Found
        </div>
        <button className='mt-5'>
          <span className='relative inline-block text-sm font-medium text-blue-500 group active:text-blue-600 focus:outline-none focus:ring'>
            <span className='absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-blue-500 group-hover:translate-y-0 group-hover:translate-x-0'></span>

            <span className='relative block px-8 py-3 bg-gray-700 border border-current'>
              <Link href={route('note.index')}>Go Home</Link>
            </span>
          </span>
        </button>
      </main>
    </>
  );
};

export default NotFound;
