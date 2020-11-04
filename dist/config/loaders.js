"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const parse_config_1 = require("./parse.config");
const isDev = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
/**
 *
 * @param cssOptions
 * @param preProcessor
 * @description 处理样式loader
 */
const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        isDev && {
            loader: 'style-loader',
            options: Object.assign({}, parse_config_1.getStyleLoaderOptions()),
        },
        isProduction && mini_css_extract_plugin_1.default.loader,
        {
            loader: 'css-loader',
            options: cssOptions,
        },
        {
            loader: 'postcss-loader',
            options: parse_config_1.getPostLoaderOptions(),
        },
    ].filter(Boolean);
    if (preProcessor) {
        loaders.push(preProcessor);
    }
    return loaders;
};
const rules = [
    {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: path_1.default.resolve(__dirname, '../../node_modules/babel-loader'),
                options: Object.assign({ cacheDirectory: isDev ? true : false, cacheCompression: true, compact: !isDev }, parse_config_1.getBableOptions()),
            },
        ],
    },
    //css 编译
    {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoaders(Object.assign({ importLoaders: 1 }, parse_config_1.getCssloaderOptions())),
    },
    //less 编译
    {
        test: lessRegex,
        exclude: lessModuleRegex,
        use: getStyleLoaders({}, {
            loader: 'less-loader',
            options: parse_config_1.getLessLoaderOptions(),
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
            options: parse_config_1.getSassLoaderOptions(),
        }),
    },
    {
        test: /\.(png|jpg|gif|ico)$/i,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: parse_config_1.configs.inlineLimit,
                    name: `${parse_config_1.configs.assetsDir}/media/imgs/[name].[hash:8].[ext]`,
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
                    name: `${parse_config_1.configs.assetsDir}/media/fonts/[name].[hash:8].[ext]`,
                },
            },
        ],
    },
];
exports.default = rules;
