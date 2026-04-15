import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**",
      },
    ],
    // Optimize LCP by enabling modern AVIF formats which are 20% smaller than WebP
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    // Enable optimizing package imports to reduce bundle size and INP
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  }
};

export default nextConfig;
