/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.schuetzen-buederich.de",
        pathname: "/wp-content/uploads/**",
      },
      {
        // Sanity CDN für Bilder
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        // Cloudinary für Galerie
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
