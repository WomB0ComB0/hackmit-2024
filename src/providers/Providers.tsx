'use client';

import { actions } from '@/lib/actions';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { JSXElementConstructor, ReactNode } from 'react';
import { Events, ThemeProvider, ConvexClientProvider } from '.';
import { QueryProvider } from './QueryProvider';

const Providers: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <>
      <ProviderStack
        providers={[
          [ThemeProvider, {}],
          [Events, {}],
          [ConvexClientProvider, {}],
          [QueryProvider, {}]
        ]}
      >
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </ProviderStack>
    </>
  );
};
export { Providers };

type NoInfer<T> = [T][T extends any ? 0 : 1];

type ContainsChildren = {
  children?: React.ReactNode;
};

function ProviderStack<Providers extends [ContainsChildren, ...ContainsChildren[]]>({
  providers,
  children,
}: {
  providers: {
    [k in keyof Providers]: [
      JSXElementConstructor<Providers[k]>,
      Omit<NoInfer<Providers[k]>, 'children'>,
    ];
  };
  children: ReactNode;
}) {
  let node = children;

  for (const [Provider, props] of providers) {
    node = <Provider {...props}>{node}</Provider>;
  }

  return node;
}
