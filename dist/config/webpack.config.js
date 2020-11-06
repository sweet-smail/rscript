"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const parse_config_1 = require("./parse.config");
const plugins_1 = __importDefault(require("./plugins"));
const loaders_1 = __importDefault(require("./loaders"));
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const webpackConfig = {
    entry: parse_config_1.getEntrys(),
    output: parse_config_1.getOutput(),
    resolve: {
        alias: parse_config_1.configs.alias,
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    recordsPath: path_1.default.resolve(process.cwd(), 'dist/records.json'),
    profile: isProduction,
    performance: {
        hints: 'warning',
        maxEntrypointSize: 250000,
        maxAssetSize: 250000,
    },
    target: 'web',
    externals: parse_config_1.configs.externals,
    optimization: {
        minimize: true,
        moduleIds: 'deterministic',
        runtimeChunk: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        splitChunks: {
            chunks: 'all',
            // 按照某种规则进行拆分
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    idHint: 'vendors',
                    chunks: 'all',
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    mode: isDevelopment ? 'development' : 'production',
    devtool: parse_config_1.getDevtool(),
    plugins: plugins_1.default,
    module: {
        rules: loaders_1.default,
    },
};
exports.default = webpackConfig;
