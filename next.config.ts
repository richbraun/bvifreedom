import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: false,
  turbopack: {
    rules: { "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" } },
  },
  images: { remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }] },
  async redirects() {
    // URLs from the old WordPress site that Google still has indexed
    return [
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/terms-and-conditions/", destination: "/terms", permanent: true },
      { source: "/privacy-policy-2", destination: "/privacy-policy", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/contact", destination: "/pricing-and-inquiries", permanent: true },
      { source: "/contact-us", destination: "/pricing-and-inquiries", permanent: true },
      { source: "/inquire", destination: "/pricing-and-inquiries", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/llms.txt", headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }] }];
  },
};

export default nextConfig;
