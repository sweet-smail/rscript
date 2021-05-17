"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const yeoman_environment_1 = __importDefault(require("yeoman-environment"));
const create_1 = __importDefault(require("./script/create"));
const env = yeoman_environment_1.default.createEnv();
env.registerStub(create_1.default, "rca");
exports.default = () => {
    commander_1.program
        .version(require("../package").version, "-v,--version", "查看当前版本")
        .description("richard 的脚手架");
    commander_1.program
        .command("create")
        .description("使用rca创建项目")
        .action(function () {
        const appName = process.argv[3];
        console.info(chalk_1.default.blue("rca 即将创建项目,请完成如下操作!!!"));
        env.run("rca", { appName }, function (error) {
            if (error) {
                console.error(chalk_1.default.red(error.message));
                process.exit(1);
            }
        });
    });
    commander_1.program
        .command("start")
        .description("使用rca运行开发环境项目")
        .action(function () {
        require("./script/start");
    });
    commander_1.program
        .command("build")
        .description("使用rca构建生产环境项目")
        .action(function () {
        require("./script/build");
    });
    commander_1.program
        .command("update")
        .description("升级rca")
        .action(function () {
        console.log("update");
    });
    commander_1.program.parse(process.argv);
};
