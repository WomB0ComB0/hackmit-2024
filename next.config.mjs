import pwa from '@ducanh2912/next-pwa';
import MillionLint from '@million/lint';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import  withPlugins from 'next-compose-plugins';

const withPwa = pwa({
  dest: 'public',
  disable: false,
  register: true,
  sw: '/sw.js',
  publicExcludes: ['!noprecache/**/*'],
});

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    instrumentationHook: true,
    optimizeCss: {
      preload: true,
    },
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'http', hostname: 'localhost', port: '3000' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
      }
    ],
  },
  rewrites: async () => {
    return [
      { source: "/healthz", destination: "/api/health" },
      { source: "/api/healthz", destination: "/api/health" },
      { source: "/health", destination: "/api/health" },
      { source: "/ping", destination: "/api/health" },
      {
        source: '/api/:path*',
        destination: 'https://hackmit-2024-server.vercel.app/api/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/api/v1/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true'
          },
          { key: 'Access-Control-Allow-Origin', value: 'https://full-stack-template.vercel.app' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
      {
        source: '/(.*).png',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/png',
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    });
    return config;
  },
  publicRuntimeConfig: {
    basePath: '',
  },
}

const withMillion = MillionLint.next({
  rsc: true,
  filter: {
    exclude: './src/components/Navigation.tsx',
    include: '**/components/*.{mtsx,mjsx,tsx,jsx}',
  },
})

const finalConfig = withPlugins([
  [withBundleAnalyzer({ enabled: false })],
  [withPwa],
  [withMillion],
], config)


export default withSentryConfig(finalConfig, {
  org: 'womb0comb0',
  project: 'fraud-guard',
  sentryUrl: 'https://sentry.io/',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
