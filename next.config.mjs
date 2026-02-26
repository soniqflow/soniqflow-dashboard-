/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true' ? 'export' : undefined,
  trailingSlash: true,
  cleanDistDir: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
