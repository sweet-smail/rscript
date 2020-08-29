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
var path_1 = __importDefault(require("path"));
var file_1 = require("../utils/file");
var default_r_config_1 = __importDefault(require("../config/default.r.config"));
var userConfigPath = path_1.default.resolve(process.cwd(), 'config/r.config.js');
var userConfg = {
    devServer: {},
    css: { loaderOptions: {} },
};
if (file_1.isExitsFile(userConfigPath)) {
    userConfg = require(userConfigPath);
}
exports.default = Object.assign({}, default_r_config_1.default, userConfg, {
    css: __assign(__assign(__assign({}, default_r_config_1.default.css), userConfg.css), { loaderOptions: __assign(__assign({}, default_r_config_1.default.css.loaderOptions), userConfg.css.loaderOptions) }),
    devServer: __assign(__assign({}, default_r_config_1.default.devServer), userConfg.devServer),
});
