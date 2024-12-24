import dayjs from 'dayjs'

const month = dayjs().format('MMM-YY').toLowerCase()

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: `/expenses?chart=expense&period=${month}`,
        permanent: true,
      },
    ]
  },
}

export default nextConfig
