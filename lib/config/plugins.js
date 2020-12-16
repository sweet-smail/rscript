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
var webpack_1 = __importDefault(require("webpack"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var path_1 = __importDefault(require("path"));
var webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
var parse_config_1 = require("./parse.config");
var isProduction = process.env.NODE_ENV === "production";
var plugins = [];
// 如果是多入口，则需要添加plugin
var htmlWebpackPluginMinify = {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
};
if (parse_config_1.configs.pages && Object.keys(parse_config_1.configs.pages).length > 0) {
    for (var pageKey in parse_config_1.configs.pages) {
        plugins.push(new html_webpack_plugin_1.default(Object.assign({}, __assign({ template: path_1.default.resolve(process.cwd(), "public/index.html"), filename: pageKey + ".html", title: pageKey, chunks: [pageKey] }, parse_config_1.configs.pages[pageKey]), isProduction ? { minify: htmlWebpackPluginMinify } : undefined)));
    }
}
else {
    plugins.push(new html_webpack_plugin_1.default(Object.assign({}, {
        template: path_1.default.resolve(process.cwd(), "public/index.html"),
        favicon: parse_config_1.configs.favicon,
        filename: "index.html",
        inject: true
    }, isProduction ? { minify: htmlWebpackPluginMinify } : undefined)));
}
if (process.env.NODE_ENV === "development") {
    plugins.push(new webpack_1.default.HotModuleReplacementPlugin(), 
    //用单独一个进城来进行 ts类型检查
    new fork_ts_checker_webpack_plugin_1.default({
    // async: false, // 错误信息是否影响webpack编译
    }));
}
else {
    plugins.push(new clean_webpack_plugin_1.CleanWebpackPlugin(), new mini_css_extract_plugin_1.default({
        filename: parse_config_1.configs.hash
            ? parse_config_1.configs.assetsDir + "/css/[name].[contenthash:8].css"
            : parse_config_1.configs.assetsDir + "/css/[name].css",
        chunkFilename: parse_config_1.configs.hash
            ? parse_config_1.configs.assetsDir + "/css/[name].[contenthash:8].chunk.css"
            : parse_config_1.configs.assetsDir + "/css/[name].chunk.css"
    }));
}
if (parse_config_1.configs.analyze) {
    plugins.push(new webpack_bundle_analyzer_1.BundleAnalyzerPlugin({
        analyzerMode: "server",
        analyzerHost: "127.0.0.1",
        analyzerPort: 60000,
        reportFilename: "analyzer.html",
        openAnalyzer: true,
        generateStatsFile: true
    }));
}
exports.default = plugins;
