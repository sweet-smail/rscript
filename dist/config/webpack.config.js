"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse_config_1 = require("./parse.config");
const plugins_1 = __importDefault(require("./plugins"));
const loaders_1 = __importDefault(require("./loaders"));
const isDevelopment = process.env.NODE_ENV === 'development';
const webpackConfig = {
    entry: parse_config_1.getEntrys(),
    output: parse_config_1.getOutput(),
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    externals: parse_config_1.configs.externals,
    // optimization: {
    // 	minimize: false, // 是否压缩
    // 	runtimeChunk: {
    // 		name: (entrypoint: any) => `runtime-${entrypoint.name}`,
    // 	},
    // 	noEmitOnErrors: true,
    // 	removeEmptyChunks: true, // 删除空的模块
    // 	mergeDuplicateChunks: true, //合并相同得模块
    // 	splitChunks: {
    // 		chunks: 'all',
    // 		minChunks: 1, //共享模块得最小块数
    // 		maxInitialRequests: 30, // 入口点得最大并行请求
    // 		maxAsyncRequests: 30, //按需加载得时候最大并行请求
    // 		cacheGroups: {
    // 			commons: {
    // 				test: /[\\/]node_modules[\\/]/,
    // 				name: 'vendors',
    // 				chunks: 'all',
    // 			},
    // 		},
    // 	},
    // },
    mode: isDevelopment ? 'development' : 'production',
    devtool: parse_config_1.getDevtool(),
    plugins: plugins_1.default,
    module: {
        rules: loaders_1.default,
    },
};
exports.default = webpackConfig;
