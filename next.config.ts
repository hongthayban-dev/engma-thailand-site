import type { NextConfig } from 'next';

// Static HTML export: GitHub Pages (GITHUB_PAGES) or Hostatom shared hosting (STATIC_EXPORT).
const isStaticExport = process.env.GITHUB_PAGES === 'true' || process.env.STATIC_EXPORT === 'true';
const basePath = isStaticExport ? (process.env.NEXT_PUBLIC_BASE_PATH ?? '') : '';

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: 'export', trailingSlash: true } : {}),
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
