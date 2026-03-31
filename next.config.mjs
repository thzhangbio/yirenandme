/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable polyfills for older browsers to reduce JS bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    // Optimize CSS loading
    optimizeCss: true,
  },
};

export default nextConfig;