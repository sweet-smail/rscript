"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var resolve_config_1 = __importDefault(require("../config/resolve.config"));
var plugins_1 = __importDefault(require("./plugins"));
var loaders_1 = __importDefault(require("./loaders"));
var assetsDir = resolve_config_1.default.assetsDir, publicPath = resolve_config_1.default.publicPath, outputDir = resolve_config_1.default.outputDir, configureWebpack = resolve_config_1.default.configureWebpack, entry = resolve_config_1.default.entry;
var isProduction = process.env.NODE_ENV === 'production';
var root = process.cwd();
/**
 * @deprecated 合并entry
 * @param entrys
 */
function getEntrys(entrys) {
    var newEntrys = {};
    for (var k in entrys) {
        newEntrys[k] = [
            !isProduction && 'webpack-hot-middleware/client?reload=true',
            entrys[k],
        ].filter(Boolean);
    }
    return newEntrys;
}
var webpackConfig = {
    entry: getEntrys(entry),
    output: {
        publicPath: publicPath,
        filename: assetsDir + "/js/bundle.js",
        chunkFilename: isProduction
            ? assetsDir + "/js/[hash].chunk.js"
            : assetsDir + "/js/[name].chunk.js",
        path: path_1.default.resolve(root, outputDir),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime',
        },
        //告知 webpack 使用可读取模块标识符,默认会在 mode development 启用，在 mode production 禁用。
        namedModules: !isProduction,
        //告知 webpack 使用可读取 chunk 标识符,默认会在 mode development 启用，在 mode production 禁用。
        namedChunks: !isProduction,
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'cheap-module-eval-source-map',
    plugins: plugins_1.default,
    module: {
        rules: loaders_1.default,
    },
};
console.log('webpackConfig', webpackConfig);
exports.default = webpackConfig;
