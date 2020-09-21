// 注意设置了本文件需要重新 yarn run serve 启动项目
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'

// 代码压缩, 早期的 uglifyjs-webpack-plugin 已被弃用
const TerserPlugin = require('terser-webpack-plugin')

// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
    publicPath: './', // 这里一定要加个点
    outputDir: 'dist',
    productionSourceMap: false,
    chainWebpack: (config) => {
        // ============压缩图片 start============
        if (isProduction) {
            config.module
                .rule('images')
                .use('image-webpack-loader')
                .loader('image-webpack-loader')
                .options({ bypassOnDebug: true })
                .end()
        }
        // ============压缩图片 end============
    },
    configureWebpack: (config) => {
        // 生产环境相关配置
        if (isProduction) {
            // 1.代码压缩
            config.plugins.push(
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true,
                    //生产环境自动删除console
                    terserOptions: {
                        compress: {
                            drop_console: true,
                            drop_debugger: true,
                        },
                    },
                })
            )
            // 2.gzip压缩
            const productionGzipExtensions = ['html', 'js', 'css']
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240, // 只有大小大于该值的资源会被处理 10240
                    minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                    deleteOriginalAssets: false, // 删除原文件
                })
            )
            // 3.公共代码抽离
            config.optimization = {
                splitChunks: {
                    cacheGroups: {
                        vendor: {
                            chunks: 'all',
                            test: /node_modules/,
                            name: 'vendor',
                            minChunks: 1,
                            maxInitialRequests: 5,
                            minSize: 0,
                            priority: 100,
                        },
                        common: {
                            chunks: 'all',
                            test: /[\\/]src[\\/]js[\\/]/,
                            name: 'common',
                            minChunks: 2,
                            maxInitialRequests: 5,
                            minSize: 0,
                            priority: 60,
                        },
                        styles: {
                            name: 'styles',
                            test: /\.(sa|sc|c)ss$/,
                            chunks: 'all',
                            enforce: true,
                        },
                        runtimeChunk: {
                            name: 'manifest',
                        },
                    },
                },
            }
        }
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        open: true, // 加载后打开网页
        proxy: {
            '/api': {
                target: 'http://localhost:3000/', // 开发环境后端地址
                //target: 'http://你的公网ip地址:3000/', // 生产环境后端地址
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
}
