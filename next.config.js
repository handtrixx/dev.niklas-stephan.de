const {
  apiProtocol,
  apiHost,
  frontendProtocol,
  frontendHost,
} = require("./utils/env");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["de", "en"],
    defaultLocale: "de",
    localeDetection: false,
  },
  images: {
    loader: "default",
    remotePatterns: [
      {
        protocol: apiProtocol,
        hostname: apiHost,
        pathname: "/**",
      },
      {
        protocol: frontendProtocol,
        hostname: frontendHost,
        pathname: "/**",
      },
    ],
  },
};
