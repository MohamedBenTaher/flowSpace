/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental:{
    appDir:true
  },
  publicRuntimeConfig: {
    BACKEND_URL:process.env.NEXT_PUBLIC_BACKEND_URL,
  },
}

module.exports = nextConfig
