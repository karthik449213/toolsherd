import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pkjgladwgxzyqamrwnds.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // Allow unoptimized images from Supabase
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
