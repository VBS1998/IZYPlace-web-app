/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'localhost' }, 
            { hostname: 'izyplace' }
        ]
    }
};

export default nextConfig;
