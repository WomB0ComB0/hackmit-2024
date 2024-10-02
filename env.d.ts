declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ANALYZE: string;
      NEXT_PUBLIC_CONVEX_URL: string;
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
      CLERK_SECRET_KEY: string;
      CONVEX_DEPLOYMENT: string;
      CLERK_JWT_ISSUER_DOMAIN: string;
      NEXT_PUBLIC_API_URL: strnig;
      SENTRY_AUTH_TOKEN: string;
    }
  }
}
export {};
