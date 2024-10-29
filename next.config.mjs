/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Warning: This is very permissive. In production, specify exact domains
      },
    ],
  },
};

export default nextConfig;
