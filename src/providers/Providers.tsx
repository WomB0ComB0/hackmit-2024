'use client';

import { ReactNode } from "react";
import { ThemeProvider } from "@/providers/theme/ThemeProvider";
import { ConvexClientProvider } from "@/providers/core/Convex";
import { Events } from ".";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from './QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ConvexClientProvider>
        <QueryProvider>
          <Events>
            <TooltipProvider>{children}</TooltipProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </Events>
        </QueryProvider>
      </ConvexClientProvider>
    </ThemeProvider>
  );
}
