"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const yeoman = require('yeoman-environment');
const create_1 = __importDefault(require("./script/create"));
const env = yeoman.createEnv();
env.registerStub(create_1.default, 'rscript');
exports.default = () => {
    commander_1.program
        .version('0.0.1', '-v,--version', '查看当前版本')
        .description('richard 的脚手架');
    commander_1.program
        .command('create')
        .description('使用rscript创建项目')
        .action(function () {
        console.log(chalk_1.default.blue('rscript 即将创建项目,请完成如下操作!!!'));
        env.run('rscript', function (error) {
            if (error) {
                console.error(chalk_1.default.red(error.message));
                process.exit(1);
            }
        });
    });
    commander_1.program
        .command('start')
        .description('使用rscript运行开发环境项目')
        .action(function () {
        require('./script/start');
    });
    commander_1.program
        .command('build')
        .description('使用rscript构建生产环境项目')
        .action(function () {
        require('./script/build');
    });
    commander_1.program
        .command('update')
        .description('升级rscript')
        .action(function () {
        console.log('update');
    });
    commander_1.program.parse(process.argv);
};
