"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.default = {
    entery: path_1.default.resolve(__dirname, '../src/index.tsx'),
    //配置别名，对引用路径进行映射。
    alias: {},
    //模块结构分析,当设置为false 得时候代表关闭
    analyze: {
        analyzerMode: "server",
        analyzerPort: 8888,
        openAnalyzer: true,
        generateStatsFile: true,
        statsFilename: "stats.json",
        logLevel: "info",
        defaultSizes: "parsed"
    },
    // 复制
    copy: [],
    //用户配置 sourcemap 类型。
    devtool: "",
    //默认为 "/"
    publicPath: '/',
    //构建文件存放的目录
    outputDir: 'dist',
    assetsDir: 'assets',
    //devServer 配置
    devServer: {
        port: 8080,
        host: "127.0.0.1",
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
    //用于提供给代码中可用的变量。
    define: {
        FOO: "bar"
    },
    //配置额外的 插件。
    plugins: [],
};
