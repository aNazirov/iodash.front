/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["file.sunnyart.com", "play-lh.googleusercontent.com"],
  },
};

module.exports = nextConfig;
