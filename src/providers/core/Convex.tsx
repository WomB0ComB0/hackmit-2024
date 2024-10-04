"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkLoaded, ClerkLoading, ClerkProvider, useAuth } from "@clerk/clerk-react";
import { MultisessionAppSupport } from "@clerk/clerk-react/internal";
import { clerkAppearance } from "@/constants";
import Loader from "@/components/client/Loader";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        appearance={clerkAppearance}
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
      >
        <MultisessionAppSupport>
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <ClerkLoading>
              <Loader />
            </ClerkLoading>
            <ClerkLoaded>
              {children}
            </ClerkLoaded>
          </ConvexProviderWithClerk>
        </MultisessionAppSupport>
      </ClerkProvider>
    </>
  );
}
