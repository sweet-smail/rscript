"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const resolve_config_1 = __importDefault(require("./resolve.config"));
const isDev = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const { css: { loaderOptions }, outputDir, assetsDir, } = resolve_config_1.default;
/**
 *
 * @param cssOptions
 * @param preProcessor
 * @description 处理样式loader
 */
const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        isDev && 'style-loader',
        isProduction && mini_css_extract_plugin_1.default.loader,
        {
            loader: 'css-loader',
            options: cssOptions,
        },
        {
            loader: 'postcss-loader',
            options: loaderOptions.postcss,
        },
    ].filter(Boolean);
    if (preProcessor) {
        loaders.push(preProcessor);
    }
    return loaders;
};
const loaders = [
    {
        test: /\.(ts|js)x?$/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: isDev ? true : false,
                    cacheCompression: false,
                    compact: !isDev,
                },
            },
        ],
    },
    //css 编译
    {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoaders({
            importLoaders: 1,
        }),
    },
    //css module 编译
    {
        test: cssModuleRegex,
        use: getStyleLoaders(Object.assign(Object.assign({}, loaderOptions.css), { modules: {
                auto: true,
            }, importLoaders: 1 })),
    },
    //less 编译
    {
        test: lessRegex,
        exclude: lessModuleRegex,
        use: getStyleLoaders({}, {
            loader: 'less-loader',
            options: loaderOptions.less,
        }),
    },
    //less module 编译
    {
        test: lessModuleRegex,
        use: getStyleLoaders({
            importLoaders: 3,
            modules: true,
        }, {
            loader: 'less-loader',
            options: loaderOptions.less,
        }),
    },
    //sass 编译
    {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: getStyleLoaders({
            importLoaders: 3,
        }, {
            loader: 'sass-loader',
            options: loaderOptions.scss,
        }),
    },
    //sass module 编译
    {
        test: sassModuleRegex,
        use: getStyleLoaders({
            importLoaders: 3,
            modules: true,
        }, {
            loader: 'sass-loader',
            options: loaderOptions.scss,
        }),
    },
    {
        test: /\.(png|jpg|gif|ico)$/i,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: `${assetsDir}/media/imgs/[name].[hash:8].[ext]`,
                },
            },
        ],
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf|obj|gltf)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    name: `${assetsDir}/media/fonts/[name].[hash:8].[ext]`,
                },
            },
        ],
    },
];
exports.default = loaders;
