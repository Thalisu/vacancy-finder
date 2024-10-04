/** @type {import('next').NextConfig} */
function defineNextConfig(config) {
  return config;
}

export default defineNextConfig({
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
