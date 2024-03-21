const {
  backendProtocol,
  backendHost,
  frontendProtocol,
  frontendHost,
} = require("./utils/env");


/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
  },
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
        protocol: backendProtocol,
        hostname: backendHost,
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
