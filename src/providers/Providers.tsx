'use client';

import { ThemeProvider } from 'next-themes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Events, ConvexClientProvider } from '.';
import { QueryProvider } from './QueryProvider';

const Providers: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ConvexClientProvider>
        <QueryProvider>
          <Events>
            {children}
          </Events>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </ConvexClientProvider>
    </ThemeProvider>
  );
};

export { Providers };
