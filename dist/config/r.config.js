"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
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
    pages: {
        index: {
            // page 的入口
            entry: path_1.default.resolve(process.cwd(), 'src/index.tsx'),
            // 模板来源
            template: path_1.default.resolve(process.cwd(), 'config/index.html'),
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            chunks: ['index'],
        },
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
                    require('postcss-normalize')(),
                ],
            },
            scss: {},
            less: {},
        },
    },
    pluginOptions: {},
};
