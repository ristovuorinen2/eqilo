import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['pdfmake'],
  images: {
    minimumCacheTTL: 31536000,
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
