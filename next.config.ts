import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/hostai-wrapped' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/hostai-wrapped/' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
