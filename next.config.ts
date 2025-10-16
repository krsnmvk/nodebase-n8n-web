import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
  },

  async redirects() {
    return [
      {
        destination: '/workflows',
        source: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
