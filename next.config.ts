import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pdfmake'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.eqilo.fi',
          },
        ],
        destination: 'https://eqilo.fi/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
