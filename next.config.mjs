/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {hostname: "img.daisyui.com"},
        {hostname: "127.0.0.1"},
      ]  
    },
   
};

export default nextConfig;
