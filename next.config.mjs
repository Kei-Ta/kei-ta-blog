const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    reactStrictMode: true,
    output: 'export',
    basePath: isProd ? '/kei-ta-blog' : '',
    assetPrefix: isProd ? '/kei-ta-blog/' : '',
};
