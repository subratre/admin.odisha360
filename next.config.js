/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
  },
  images: {
    domains: [
      "upload.wikimedia.org",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "e1a4c9d0d2f9f737c5e1.ucr.io",
      "studymentor.created.app",
    ],
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }]; // required to make pdfjs work
    return config;
  },
  strict: false,
};

module.exports = nextConfig;
