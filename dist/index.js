"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var minimist_1 = __importDefault(require("minimist"));
var cross_spawn_1 = __importDefault(require("cross-spawn"));
var path_1 = __importDefault(require("path"));
var project_1 = __importDefault(require("./create/project"));
var Cli = /** @class */ (function () {
    function Cli() {
        this.appPath = process.cwd();
    }
    Cli.prototype.run = function () {
        this.parseArgs();
    };
    Cli.prototype.parseArgs = function () {
        var args = minimist_1.default(process.argv.slice(2), {
            alias: {
                version: ['v'],
                help: ['h'],
            },
            boolean: ['version', 'help'],
        });
        var command = args._[0];
        if (command) {
            switch (command) {
                //执行创建项目命令
                case 'create':
                    //如果create 命令后没有跟数据 则args[1]为undefind
                    var newProject = new project_1.default({
                        projectName: args._[1],
                    });
                    newProject.init();
                    newProject.create();
                    break;
                //执行构建命令
                case 'build':
                    var buildResult = cross_spawn_1.default.sync('node', [path_1.default.join(__dirname, './script/build.js')], {
                        stdio: 'inherit',
                    });
                    process.exit(buildResult.status || undefined);
                case 'start':
                    var result = cross_spawn_1.default.sync('node', [path_1.default.join(__dirname, './script/start.js')], {
                        stdio: 'inherit',
                    });
                    if (result.signal) {
                        if (result.signal === 'SIGKILL') {
                            console.log(result.signal, 1);
                        }
                        else if (result.signal === 'SIGTERM') {
                            console.log(result, 2);
                        }
                    }
                    process.exit(result.status || undefined);
                default:
                    console.log('Unknown script "' + command + '".');
            }
        }
    };
    return Cli;
}());
exports.default = Cli;
