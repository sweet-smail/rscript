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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var path_1 = __importDefault(require("path"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var r_config_1 = __importDefault(require("./r.config"));
var file_1 = require("../utils/file");
var userConfigPath = path_1.default.resolve(process.cwd(), 'config/r.config.js');
var config = r_config_1.default;
if (file_1.isExitsFile(userConfigPath)) {
    var mergeConfig = lodash_1.default.mergeWith(r_config_1.default, require(userConfigPath));
    var entry = {};
    var plugins = [];
    for (var pagesKey in mergeConfig.pages) {
        var pageConfigValue = mergeConfig.pages[pagesKey];
        if (typeof pageConfigValue === 'string') {
            entry[pagesKey] = mergeConfig.pages[pagesKey];
            plugins.push(new html_webpack_plugin_1.default({
                template: path_1.default.resolve(process.cwd(), 'config/index.html'),
                filename: pagesKey + ".html",
                title: pagesKey,
                chunks: [pagesKey],
            }));
        }
        if (typeof pageConfigValue === 'object') {
            var _a = mergeConfig.pages[pagesKey], userEntry = _a.entry, rest = __rest(_a, ["entry"]);
            entry[pagesKey] = userEntry;
            plugins.push(new html_webpack_plugin_1.default(rest));
        }
    }
    config = __assign(__assign({}, mergeConfig), { entry: entry, plugins: plugins });
}
exports.default = config;
