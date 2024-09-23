/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.externals.push(...config.externals, 'canvas', 'jsdom', 'pino-pretty', 'lokijs', 'encoding')
    return config
  }
}

export default nextConfig;
