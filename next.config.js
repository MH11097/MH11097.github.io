/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
  // NO basePath or assetPrefix needed for root domain
}