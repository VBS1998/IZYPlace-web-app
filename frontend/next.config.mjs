/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: { 
        unoptimized: true,
        domains: ['theknot.com', 'nationaltoday.com', 'img.freepik.com', 'www.fullerholidays.com.au', 'www.editionhotels.com', 'media.architecturaldigest.com']
    }
    
};

export default nextConfig;
