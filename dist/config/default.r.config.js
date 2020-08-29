"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    //默认为 "/"
    publicPath: '/',
    //构建文件存放的目录
    outputDir: 'dist',
    assetsDir: 'assets',
    //devServer 配置
    devServer: {
        port: 8080,
    },
    //自定义webpack
    configureWebpack: {},
    css: {
        //关于css modules,是默认以[filename].module.[ext]结尾的都会启用css-module
        //向 CSS 相关的 loader 传递选项
        loaderOptions: {
            //css loader
            css: {},
            //postcss
            postcss: {
                ident: 'postcss',
                plugins: [
                    require('postcss-preset-env')({
                        stage: 3,
                    }),
                ],
            },
            scss: {
                importLoaders: 3,
            },
            less: {
                lessOptions: {},
            },
        },
    },
    pluginOptions: {},
};
