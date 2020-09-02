// 注意设置了本文件需要重新 yarn run serve 启动项目
module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    devServer: {
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://localhost:3000/', // 开发环境后端地址
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    '^/api': '/',
                },
            },
        },
    },
}
