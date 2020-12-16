"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var parse_config_1 = require("./parse.config");
var isDev = process.env.NODE_ENV === "development";
var isProduction = process.env.NODE_ENV === "production";
var cssRegex = /\.css$/;
var cssModuleRegex = /\.module\.css$/;
var lessRegex = /\.less$/;
var lessModuleRegex = /\.module\.less$/;
var sassRegex = /\.(scss|sass)$/;
var sassModuleRegex = /\.module\.(scss|sass)$/;
/**
 *
 * @param cssOptions
 * @param preProcessor
 * @description 处理样式loader
 */
var getStyleLoaders = function (cssOptions, preProcessor) {
    var loaders = [
        isDev && {
            loader: require.resolve("style-loader"),
            options: __assign({}, parse_config_1.getStyleLoaderOptions())
        },
        isProduction && mini_css_extract_plugin_1.default.loader,
        {
            loader: require.resolve("css-loader"),
            options: cssOptions
        },
        {
            loader: require.resolve("postcss-loader"),
            options: parse_config_1.getPostLoaderOptions()
        }
    ].filter(Boolean);
    if (preProcessor) {
        loaders.push(preProcessor);
    }
    return loaders;
};
var rules = [
    // { test: /\.m?js/, type: 'javascript/auto' },
    {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
            {
                loader: require.resolve("babel-loader"),
                options: __assign({ cacheDirectory: isDev ? true : false, cacheCompression: false, compact: !isDev }, parse_config_1.getBableOptions())
            }
            // {
            // 	loader: require.resolve('ts-loader'),
            // 	options: {
            // 		// 关闭类型检查只进行转移，将类型检查交给fork-ts-checker-webpack-plugin,在别的线程进城检查
            // 		transpileOnly: true,
            // 	},
            // },
        ]
    },
    //css 编译
    {
        test: cssRegex,
        use: getStyleLoaders(__assign({}, parse_config_1.getCssloaderOptions()))
    },
    //less 编译
    {
        test: lessRegex,
        use: getStyleLoaders({
            importLoaders: 2
        }, {
            loader: "less-loader",
            options: parse_config_1.getLessLoaderOptions()
        })
    },
    //sass 编译
    {
        test: sassRegex,
        exclude: /(node_modules|bower_components)/,
        use: getStyleLoaders({
            importLoaders: 2
        }, {
            loader: "sass-loader",
            options: parse_config_1.getSassLoaderOptions()
        })
    },
    {
        test: /\.(png|jpg|gif|ico|svg)$/i,
        use: [
            {
                loader: require.resolve("url-loader"),
                options: {
                    limit: parse_config_1.configs.inlineLimit,
                    name: parse_config_1.configs.assetsDir + "/media/imgs/[name].[hash:8].[ext]"
                }
            }
        ]
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf|obj|gltf)$/,
        use: [
            {
                loader: require.resolve("url-loader"),
                options: {
                    name: parse_config_1.configs.assetsDir + "/media/fonts/[name].[hash:8].[ext]"
                }
            }
        ]
    }
];
exports.default = rules;
