/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
    localeDetection: true,
  },
  images: {
    // Allow images from your public directory
    // You can add remotePatterns if you use external images
    // domains: [],
  },
  // Add any other Next.js config options here
};

export default nextConfig;

