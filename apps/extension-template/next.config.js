/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  output: "export",
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
