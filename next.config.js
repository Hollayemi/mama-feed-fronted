/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // This option enables automatic static optimization for dynamic routes.
    // This will generate pre-rendered HTML for all dynamic routes,
    // improving performance and SEO.
    outputFileTracing: true,
  },
  swcMinify: false, // it should be false by default z
};

module.exports = nextConfig;
