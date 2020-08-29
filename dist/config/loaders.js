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
var resolve_config_1 = __importDefault(require("./resolve.config"));
var isDev = process.env.NODE_ENV === 'development';
var isProduction = process.env.NODE_ENV === 'production';
var cssRegex = /\.css$/;
var cssModuleRegex = /\.module\.css$/;
var lessRegex = /\.less$/;
var lessModuleRegex = /\.module\.less$/;
var sassRegex = /\.(scss|sass)$/;
var sassModuleRegex = /\.module\.(scss|sass)$/;
var loaderOptions = resolve_config_1.default.css.loaderOptions, outputDir = resolve_config_1.default.outputDir;
/**
 *
 * @param cssOptions
 * @param preProcessor
 */
var getStyleLoaders = function (cssOptions, preProcessor) {
    var loaders = [
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
var loaders = [
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
        use: getStyleLoaders(__assign({ importLoaders: 1 }, resolve_config_1.default.css.loaderOptions.css)),
    },
    //css module 编译
    {
        test: cssModuleRegex,
        use: getStyleLoaders(__assign(__assign({}, loaderOptions.css), { modules: {
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
                    name: outputDir + "/media/[name].[hash:8].[ext]",
                },
            },
        ],
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: outputDir + "/media/[name].[hash:8].[ext]",
                },
            },
        ],
    },
];
exports.default = loaders;
