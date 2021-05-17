"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const parse_config_1 = require("./parse.config");
const plugins_1 = __importDefault(require("./plugins"));
const loaders_1 = __importDefault(require("./loaders"));
const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";
const smp = new SpeedMeasurePlugin();
const webpackConfig = smp.wrap({
    entry: parse_config_1.getEntrys(),
    output: parse_config_1.getOutput(),
    resolve: {
        alias: parse_config_1.configs.alias,
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    // recordsPath: path.resolve(process.cwd(), 'dist/records.json'),
    // profile: isProduction,
    // performance: {
    //   hints: "warning",
    //   maxEntrypointSize: 250000,
    //   maxAssetSize: 250000
    // },
    target: ["web", "es5"],
    externals: parse_config_1.configs.externals,
    optimization: {
        minimize: isProduction,
        moduleIds: "deterministic",
        runtimeChunk: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        splitChunks: {
            chunks: "all",
            // 按照某种规则进行拆分
            cacheGroups: {
                vendors: {
                    // 基本框架
                    chunks: "all",
                    test: /(react|react-dom|react-dom-router)/,
                    priority: 100,
                    name: "vendors",
                },
                "async-commons": {
                    // 其余异步加载包
                    chunks: "async",
                    minChunks: 2,
                    name: "async-commons",
                    priority: 90,
                },
                commons: {
                    // 其余同步加载包
                    chunks: "all",
                    minChunks: 2,
                    name: "commons",
                    priority: 80,
                },
            },
        },
    },
    mode: isDevelopment ? "development" : "production",
    devtool: parse_config_1.getDevtool(),
    plugins: plugins_1.default,
    module: {
        rules: loaders_1.default,
    },
});
exports.default = webpackConfig;
