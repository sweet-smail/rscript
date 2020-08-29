"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = __importDefault(require("webpack"));
var ora_1 = __importDefault(require("ora"));
var chalk_1 = __importDefault(require("chalk"));
process.env.NODE_ENV = 'production';
var webpack_config_1 = __importDefault(require("../config/webpack.config"));
var compiler;
var buildTask = ora_1.default("" + chalk_1.default.bold('Rscrit 正在构建项目')).start();
try {
    buildTask.color = 'green';
    compiler = webpack_1.default(webpack_config_1.default);
}
catch (error) {
    buildTask.color = 'red';
    buildTask.fail(error.message);
    process.exit(1);
}
compiler.run(function (err, stats) {
    if (err) {
        console.error(err.stack || err);
        return;
    }
    var info = stats.toJson();
    if (stats.hasErrors()) {
        console.error(info.errors);
    }
    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }
    buildTask.succeed('构建成功');
    console.info(stats.toString());
});
