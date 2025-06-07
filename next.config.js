/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Uncomment and replace with your repo name when deploying
  // basePath: isProd ? '/your-repo-name' : '',
  // assetPrefix: isProd ? '/your-repo-name/' : '',
}