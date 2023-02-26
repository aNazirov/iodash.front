/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["159.223.157.138"],
  },
};

module.exports = nextConfig;
