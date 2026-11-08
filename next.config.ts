import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: false,
  turbopack: {
    rules: { "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" } },
  },
  images: { remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }] },
  async headers() {
    return [{ source: "/llms.txt", headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }] }];
  },
};

export default nextConfig;
