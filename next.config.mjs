/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          // options: {
          //   svgo: false, // Disable SVGO if you need to
          // },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
