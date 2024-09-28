'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-[#242424] text-white overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="relative">
          <Image
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none w-60 h-60 animate-pulse"
            src="/assets/svgs/logo.svg"
            alt="404 Not Found"
            width={240}
            height={240}
            priority
          />
        </div>
        <h1 className="mt-8 text-4xl font-bold text-purple-300">404 - Not Found</h1>
        <p className="mt-4 text-xl text-purple-200">
          Oops! Could not scan this page :(.
        </p>
        <Link href={'/'}>
          <Button className="mt-8 w-[200px] bg-transparent px-6 py-2 border border-purple-600 rounded-sm uppercase text-sm tracking-widest text-purple-400 transition-all hover:border-purple-600/40 hover:text-purple-400/40 hover:bg-transparent">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
