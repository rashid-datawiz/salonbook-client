import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "i.ibb.co" },
      { hostname: "i.ibb.co.com" },
    ],
  },
};

export default nextConfig;
