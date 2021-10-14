/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  trailingSlash:false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
