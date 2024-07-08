/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    basePath: isProd ? '/kei-ta-blog' : '',
    assetPrefix: isProd ? '/kei-ta-blog/' : '',
};

export default nextConfig;
