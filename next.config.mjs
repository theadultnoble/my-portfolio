/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.scdn.co"], // Allow images from Spotify
  },
};

if (process.env.MIGHTYMELD) {
  const { options } = await import('@mightymeld/swc-plugin/options');
  nextConfig.experimental = {
    swcPlugins: [['@mightymeld/swc-plugin', options()]],
  };
}

export default nextConfig;
