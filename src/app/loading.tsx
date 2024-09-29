'use client';

import React from 'react';
import Image from 'next/image';

const Loading = React.memo(() => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-[rgb(36,36,36)] text-white">
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="loader" />
          <Image
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none h-60 w-60 animate-pulse"
            src="/assets/svgs/logo-client.svg"
            alt="Loading..."
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
});

Loading.displayName = 'Loading';

export default Loading;
