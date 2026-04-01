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
        // Cloudinary für Galerie (Legacy)
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        // Supabase Storage für Galerie
        protocol: "https",
        hostname: "zhaljvkenzkxnbysbmyf.supabase.co",
        pathname: "/storage/**",
      },
      {
        // Directus CMS Assets
        protocol: "https",
        hostname: "cms.meerfabrik.de",
        pathname: "/assets/**",
      },
    ],
  },
};

module.exports = nextConfig;
