import type { NextConfig } from "next";

const basePath = (process.env.BASE_PATH || '').replace(/\/$/, '');
if (basePath && !/^\/[A-Za-z0-9._/-]+$/.test(basePath)) {
  throw new Error('BASE_PATH must be empty or a path such as /repository-name');
}

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.bib$/,
      type: 'asset/source',
    });
    return config;
  },
};

export default nextConfig;
