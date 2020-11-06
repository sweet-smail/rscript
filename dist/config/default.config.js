"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.default = {
    /**
     * @description 打包目录
     * @type string
     * @default "dist"
     */
    outPutDir: 'dist',
    /**
     * @description webpack outputpublicPath
     * @type string
     * @default "/"
     */
    publicPath: '/',
    /**
     * @description 静态资源存放位置
     * @type string
     * @default "assest"
     */
    assetsDir: 'assest',
    /**
     * @description 配置开发服务器,配置的将与默认配置进行合并
     * @default {
     * 		port: 8080, // 默认运行端口
            host: '127.0.0.1',
            proxy: {}, //转发方式
        }
     */
    devServer: {
        port: 8080,
        host: '127.0.0.1',
        proxy: {},
    },
    /**
     * @description 打包入口(如果同时配置了pages,则将忽略entry)
     * @type string
     * @default src/index.tsx
     */
    entry: path_1.default.resolve(process.cwd(), 'src/index.tsx'),
    /**
     * @description 多页面配置,自定义配置将和默认配置进行合并
     * @type object
     * @default {}
     * @example
     * {
            index:{
                // 页面入口
                entry: path.resolve(process.cwd(), 'src/index.tsx'),
                // 页面模板文件，如果没有配置则默认指向public index.html
                template: path.resolve(process.cwd(), 'config/index.html'),
                // 文件名，默认取key
                filename: 'index.html',
                // 页面标题 默认取 key
                title: 'Index Page',
                //包含的模块文件 默认是key
                chunks: ['index'],
            }
     * }
     */
    pages: {},
    /**
     * @description 配置别名，对引用路径进行映射
     */
    alias: {},
    /**
     * @description 模块分析结构
     * @description 如果传递false,则代表不开启代码分析插件，true则代表启用默认配置
     * @description 如果传递对象则代表启用默认配置，也可自定义配置
     * @type Boolean| {}
     *
     */
    analyze: false,
    /**
     * @description 设置autoprefixer 配置项
     * @description {}
     */
    autoprefixer: {},
    /**
     * @description cssloader 相关的配置
     */
    cssLoader: {},
    // less相关配置项
    lessLoader: {},
    // styleloader 相关配置项
    styleLoader: {},
    //sassloader 相关配置项
    sassLoader: {},
    /**
     * @description postloader 相关配置项
     * @description 默认配置了postcss-preset-env, 和autoprefixer 插件
     * @description {}
     */
    postCssLoader: {
    // execute: undefined,
    // 如果设置了这个值，将直接覆盖默认的配置，建议通过
    // postcssOptions: {
    // 	plugins: [],
    // },
    // sourceMap: false,
    },
    /**
     * @description 配置额外的postcss插件
     * @default []
     */
    extraPostCSSPlugins: [],
    //设置要复制到输出目录的文件或文件夹。
    copy: [],
    /**
     * @type Configuration.devtool
     */
    devtool: process.env.NODE_ENV === 'deveopment'
        ? 'eval-cheap-module-source-map'
        : false,
    //设置哪些模块可以不被打包
    externals: {},
    //配置额外的babel打包插件
    extraBabelPlugins: [],
    //配置额外的babel预设
    extraBabelPresets: [],
    // 配置额外的webpack 插件
    extraPlugins: [],
    // 配置favicon 地址
    favicon: '',
    // 开启ts 编译时的类型检查，默认开启
    forkTSChecker: {},
    // 配置是否让生成的文件包含hash后缀
    hash: true,
    //配置图片文件是否走base64的编译的阈值
    inlineLimit: 10000,
    targets: {
        chrome: 49,
        firefox: 64,
        safari: 10,
        edge: 13,
        ios: 10,
    },
};
