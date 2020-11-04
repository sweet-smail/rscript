"use strict";
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
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const r_config_1 = __importDefault(require("./r.config"));
const file_1 = require("../utils/file");
const userConfigPath = path_1.default.resolve(process.cwd(), 'config/r.config.js');
let config = r_config_1.default;
if (file_1.isExitsFile(userConfigPath)) {
    const mergeConfig = lodash_1.default.mergeWith(r_config_1.default, require(userConfigPath));
    const entry = {};
    const plugins = [];
    for (let pagesKey in mergeConfig.pages) {
        const pageConfigValue = mergeConfig.pages[pagesKey];
        if (typeof pageConfigValue === 'string') {
            entry[pagesKey] = mergeConfig.pages[pagesKey];
            plugins.push(new html_webpack_plugin_1.default({
                template: path_1.default.resolve(process.cwd(), 'config/index.html'),
                filename: `${pagesKey}.html`,
                title: pagesKey,
                chunks: [pagesKey],
            }));
        }
        if (typeof pageConfigValue === 'object') {
            const _a = mergeConfig.pages[pagesKey], { entry: userEntry } = _a, rest = __rest(_a, ["entry"]);
            entry[pagesKey] = userEntry;
            plugins.push(new html_webpack_plugin_1.default(rest));
        }
    }
    config = Object.assign(Object.assign({}, mergeConfig), { entry, plugins });
}
exports.default = config;
