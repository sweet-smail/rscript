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
var ora_1 = __importDefault(require("ora"));
var chalk_1 = __importDefault(require("chalk"));
process.env.NODE_ENV = "production";
var webpack_config_1 = __importDefault(require("../config/webpack.config"));
var compiler;
var buildTask = ora_1.default("" + chalk_1.default.bold("Rscrit 正在构建项目")).start();
try {
    buildTask.color = "green";
    compiler = webpack_1.default(webpack_config_1.default);
}
catch (error) {
    buildTask.color = "red";
    buildTask.fail(error.message);
    process.exit(1);
}
compiler.run(function (err, stats) {
    if (err) {
        console.error("编译错误:", err.stack || err);
        return;
    }
    var statsInfoJson = {
        colors: true,
        version: true,
        hash: true,
        warningsCount: true,
        outputPath: true,
        errorsCount: true,
        env: true,
        publicPath: true,
        builtAt: true
    };
    if (stats === null || stats === void 0 ? void 0 : stats.hasErrors()) {
        console.error(stats.toString(__assign(__assign({}, statsInfoJson), { logging: "error" })));
        process.exit(1);
    }
    // if (stats?.hasWarnings()) {
    // 	console.warn(
    // 		stats.toString({
    // 			...statsInfoJson,
    // 			logging: 'warn',
    // 		})
    // 	);
    // }
    buildTask.succeed("构建成功");
    process.exit();
});
