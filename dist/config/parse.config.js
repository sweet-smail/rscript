"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBableOptions = exports.getSassLoaderOptions = exports.getLessLoaderOptions = exports.getStyleLoaderOptions = exports.getPostLoaderOptions = exports.getCssloaderOptions = exports.getDevServer = exports.getDevtool = exports.getOutput = exports.getEntrys = exports.configs = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const default_config_1 = __importDefault(require("./default.config"));
const isProduction = process.env.NODE_ENV === 'production';
const userConfigPath = path_1.default.resolve(process.cwd(), 'config/config.js');
const rootSource = process.cwd();
// 处理配置文件不存的情况
const getConfigs = () => {
    if (!fs_1.default.existsSync(userConfigPath)) {
        return default_config_1.default;
    }
    return require(userConfigPath);
};
exports.configs = getConfigs();
/**
 * @description 处理webpack 入口
 */
exports.getEntrys = () => {
    if (!!exports.configs.pages && Object.keys(exports.configs.pages).length > 0) {
        return exports.configs.pages;
    }
    const newEntry = exports.configs.entry || path_1.default.resolve(process.cwd(), 'src/index.tsx');
    return [
        path_1.default.resolve(__dirname, '../../node_modules/webpack-hot-middleware/client.js') + '?path=/__webpack_hmr&timeout=20000',
        newEntry,
    ];
};
/**
 * @description 处理出口
 */
exports.getOutput = () => {
    if (!exports.configs.hash) {
        return {
            publicPath: exports.configs.publicPath,
            filename: `${exports.configs.assetsDir}/js/bundle.js`,
            chunkFilename: `${exports.configs.assetsDir}/js/[name].chunk.js`,
            path: path_1.default.resolve(rootSource, exports.configs.outPutDir || 'dist'),
        };
    }
    return {
        publicPath: exports.configs.publicPath,
        filename: isProduction
            ? `${exports.configs.assetsDir}/js/[name].[chunkhash:8].js`
            : `${exports.configs.assetsDir}/js/bundle.js`,
        chunkFilename: isProduction
            ? `${exports.configs.assetsDir}/js/[name].[chunkhash:8].chunk.js`
            : `${exports.configs.assetsDir}/js/[name].chunk.js`,
        path: path_1.default.resolve(rootSource, exports.configs.outPutDir || 'dist'),
    };
};
exports.getDevtool = () => {
    return exports.configs.devtool || isProduction ? false : 'cheap-module-source-map';
};
/**
 * @description 获取webpack devServer的配置
 */
exports.getDevServer = () => {
    const defaultDevServer = {
        port: 8080,
        host: '127.0.0.1',
        proxy: {},
    };
    return Object.assign(Object.assign({}, defaultDevServer), exports.configs.devServer);
};
/**
 * @description 获取静态资源分析的配置
 */
const getAnalyze = () => {
    const defaultAnalyze = {};
    // 传递false,则代表不开启资源分析
    if (exports.configs.analyze === false) {
        return undefined;
    }
    // 传递true或者空对象则代表使用默认配置
    if (exports.configs.analyze === true || Object.keys(exports.configs.analyze).length === 0) {
        return defaultAnalyze;
    }
    if (!!exports.configs.analyze && Object.keys(exports.configs.analyze).length > 0) {
        return exports.configs.analyze;
    }
    return defaultAnalyze;
};
exports.getCssloaderOptions = () => {
    return Object.assign({}, exports.configs.cssLoader);
};
/**
 * @description post-loader 相关配置项
 */
exports.getPostLoaderOptions = () => {
    return Object.assign({ postcssOptions: {
            plugins: [
                ['postcss-preset-env', {}],
                ['autoprefixer', Object.assign({}, exports.configs.autoprefixer)],
                ...exports.configs.extraBabelPlugins,
            ],
        } }, exports.configs.postCssLoader);
};
exports.getStyleLoaderOptions = () => {
    return Object.assign({}, exports.configs.styleLoader);
};
exports.getLessLoaderOptions = () => {
    return Object.assign({}, exports.configs.styleLoader);
};
exports.getSassLoaderOptions = () => {
    return Object.assign({}, exports.configs.sassLoader);
};
/**
 * @description bable配置
 */
exports.getBableOptions = () => {
    return {
        presets: [
            [
                require('@babel/preset-env'),
                {
                    useBuiltIns: 'entry',
                    corejs: 3,
                },
            ],
            require('@babel/preset-typescript'),
            require('@babel/preset-react'),
            ...exports.configs.extraBabelPresets,
        ],
        plugins: [
        // '@babel/proposal-class-properties',
        // '@babel/proposal-object-rest-spread',
        // ...configs.extraBabelPlugins,
        ],
    };
};
