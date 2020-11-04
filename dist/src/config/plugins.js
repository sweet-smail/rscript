"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
const resolve_config_1 = __importDefault(require("./resolve.config"));
const clean_webpack_plugin_1 = require("clean-webpack-plugin");
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
const { assetsDir, plugins, analyze } = resolve_config_1.default;
const pluginsConfig = [
    new webpack_1.default.BannerPlugin({
        banner: 'hash:[hash] \n chunkhash:[chunkhash] \n  name:[name] \n filebase:[filebase] \n  query:[query] \n  file:[file]',
    }),
    ...plugins,
];
if (process.env.NODE_ENV === 'development') {
    pluginsConfig.push(new webpack_1.default.HotModuleReplacementPlugin(), new fork_ts_checker_webpack_plugin_1.default({
        async: false,
        formatter: undefined,
    }));
}
else {
    pluginsConfig.push(new clean_webpack_plugin_1.CleanWebpackPlugin(), new webpack_1.default.HotModuleReplacementPlugin(), new mini_css_extract_plugin_1.default({
        filename: `${assetsDir}/css/[name].[contenthash:8].css`,
        chunkFilename: `${assetsDir}/css/[name].[contenthash:8].chunk.css`,
    }));
}
// // 处理模块分析
if (!!analyze) {
    if (typeof analyze === "object") {
        pluginsConfig.push(new webpack_bundle_analyzer_1.BundleAnalyzerPlugin(analyze));
    }
    else {
        pluginsConfig.push(new webpack_bundle_analyzer_1.BundleAnalyzerPlugin({
            analyzerMode: "server",
            analyzerPort: 8888,
            openAnalyzer: true,
            generateStatsFile: true,
            statsFilename: "stats.json",
            logLevel: "info",
            defaultSizes: "parsed"
        }));
    }
}
exports.default = pluginsConfig;
