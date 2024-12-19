/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/expenses?chart=expense',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
