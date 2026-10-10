/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warnings or unused vars won't block production build
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
