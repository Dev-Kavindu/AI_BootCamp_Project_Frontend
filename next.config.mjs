/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure proper SSR and CSR handling
  reactStrictMode: true,
  // Enable output file tracing for serverless
  output: 'standalone',
}

export default nextConfig
