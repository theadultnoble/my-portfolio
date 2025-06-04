/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.scdn.co', 'cdn.sanity.io', 'placehold.co'], // Allow images from Spotify
  },
  webpack(config, { webpack }) {
    console.log('✅ Using Webpack version:', webpack.version)
    return config
  },
};


export default nextConfig;
