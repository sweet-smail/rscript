"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const resolve_config_1 = __importDefault(require("../config/resolve.config"));
const plugins_1 = __importDefault(require("./plugins"));
const loaders_1 = __importDefault(require("./loaders"));
const { assetsDir, publicPath, outputDir, entry, } = resolve_config_1.default;
const isProduction = process.env.NODE_ENV === 'production';
const root = process.cwd();
function getEntrys(entrys) {
    const newEntrys = {};
    for (let k in entrys) {
        newEntrys[k] = [
            !isProduction && 'webpack-hot-middleware/client',
            entrys[k],
        ].filter(Boolean);
    }
    return newEntrys;
}
const webpackConfig = {
    entry: getEntrys(entry),
    output: {
        publicPath: publicPath,
        filename: isProduction
            ? `${assetsDir}/js/[name].[chunkhash:8].js`
            : `${assetsDir}/js/bundle.js`,
        chunkFilename: isProduction
            ? `${assetsDir}/js/[name].[chunkhash:8].chunk.js`
            : `${assetsDir}/js/[name].chunk.js`,
        path: path_1.default.resolve(root, outputDir),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    optimization: {
        minimize: false,
        runtimeChunk: {
            name: (entrypoint) => `runtime-${entrypoint.name}`,
        },
        noEmitOnErrors: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        splitChunks: {
            chunks: 'all',
            minChunks: 1,
            maxInitialRequests: 30,
            maxAsyncRequests: 30,
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'cheap-module-source-map',
    plugins: plugins_1.default,
    module: {
        rules: loaders_1.default,
    },
};
exports.default = webpackConfig;
