"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = __importDefault(require("webpack"));
var resolve_config_1 = __importDefault(require("./resolve.config"));
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
var assetsDir = resolve_config_1.default.assetsDir, pluginOptions = resolve_config_1.default.pluginOptions, plugins = resolve_config_1.default.plugins;
var pluginsConfig = __spreadArrays([
    new webpack_1.default.BannerPlugin({
        banner: 'hash:[hash] \n chunkhash:[chunkhash] \n  name:[name] \n filebase:[filebase] \n  query:[query] \n  file:[file]',
    })
], plugins);
if (process.env.NODE_ENV === 'development') {
    pluginsConfig.push(new webpack_1.default.NamedModulesPlugin(), new webpack_1.default.HotModuleReplacementPlugin(), new fork_ts_checker_webpack_plugin_1.default({
        async: false,
        formatter: undefined,
    }));
}
else {
    pluginsConfig.push(new clean_webpack_plugin_1.CleanWebpackPlugin(), new webpack_1.default.ProgressPlugin(), new webpack_1.default.HashedModuleIdsPlugin(), new mini_css_extract_plugin_1.default({
        filename: assetsDir + "/css/[name].[contenthash:8].css",
        chunkFilename: assetsDir + "/css/[name].[contenthash:8].chunk.css",
    }));
}
exports.default = pluginsConfig;
