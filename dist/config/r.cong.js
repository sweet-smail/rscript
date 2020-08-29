"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    //默认为 "/"
    publicPath: '',
    //构建文件存放的目录
    outputDir: 'dist',
    assetsDir: 'assets',
    indexPath: '',
    //devServer 配置
    devServer: {
        port: 8080,
    },
    //自定义webpack
    configureWebpack: {},
    css: {
        //生产环境下是 true，开发环境下是 false
        extract: {},
        //是否为 CSS 开启 source map
        sourceMap: false,
        //向 CSS 相关的 loader 传递选项
        loaderOptions: {
            //css loader
            css: {},
            //postcss
            postcss: {},
            scss: {},
            less: {
                lessOptions: {},
            },
        },
    },
    //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    parallel: {},
    pluginOptions: {},
};
