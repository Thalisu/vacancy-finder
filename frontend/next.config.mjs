/** @type {import('next').NextConfig} */
function defineNextConfig(config) {
  return config;
}

export default defineNextConfig({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
    ],
  },
  output: "standalone",
  experimental: {
    serverActions: {
      allowedOrigins: [
        "http://localhost:3000",
        "http://0.0.0.0:3000",
        "http://frontend:3000",
        "frontend:3000",
      ],
    },
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            ref: true,
            svgoConfig: {
              plugins: [
                {
                  name: "removeViewBox",
                  active: false,
                },
                {
                  name: "mergePaths",
                  active: false,
                },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
});
