/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental:{
    allowMiddlewareResponseBody: true,
    appDir:true
  },
  publicRuntimeConfig: {
    BACKEND_URL:process.env.NEXT_PUBLIC_BACKEND_URL,
    secretJwt:"d136559609ec46616e1a0c664956511db3d61be8"
  },
}

module.exports = nextConfig
