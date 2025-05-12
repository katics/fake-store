import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["fakestoreapi.com"],
  },

  experimental: {
    scrollRestoration: false,
  },

  turbopack: {
    resolveAlias: {},
  },
};

export default nextConfig;
