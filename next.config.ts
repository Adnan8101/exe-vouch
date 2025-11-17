import type { NextConfig } from "next";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
      },
      {
        protocol: 'https',
        hostname: 'media.discordapp.net',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
      },
      {
        protocol: 'https',
        hostname: 'images-ext-1.discordapp.net',
      },
    ],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
};

export default nextConfig;

export default nextConfig;
