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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
var path_1 = __importDefault(require("path"));
var chalk_1 = __importDefault(require("chalk"));
var platform_1 = require("../utils/platform");
var pkg_1 = require("../path/pkg");
var ora_1 = __importDefault(require("ora"));
var child_process_1 = __importDefault(require("child_process"));
var isShouldUseYarn = platform_1.shouldUseYarn();
function createApp(creator, params, cb) {
    return __awaiter(this, void 0, void 0, function () {
        var projectDir, projectName, _a, autoInstall, css, projectPath, packageJson;
        return __generator(this, function (_b) {
            projectDir = params.projectDir, projectName = params.projectName, _a = params.autoInstall, autoInstall = _a === void 0 ? true : _a, css = params.css;
            projectPath = path_1.default.join(projectDir, projectName);
            //1. 将文件复制到内存中
            creator.fs.copyTpl(path_1.default.resolve(__dirname, '../../template/typescript-react/'), projectPath, params);
            packageJson = creator.fs.readJSON(path_1.default.resolve(projectPath, 'package.json'));
            //2  修改文件
            creator.fs.writeJSON(path_1.default.resolve(projectPath, 'package.json'), __assign(__assign({}, packageJson), { dependencies: __assign(__assign({}, packageJson.dependencies), pkg_1.resolveStyles(css).dependencies) }));
            //3  创建文件
            creator.fs.commit(function () {
                console.log(chalk_1.default.green('✔ ') + " " + chalk_1.default.gray("\u521B\u5EFA\u9879\u76EE\uFF1A " + chalk_1.default.gray.bold(projectName)) + "  ");
                //执行 git init
                var gitInitSpinner = ora_1.default("cd " + chalk_1.default.cyan.bold(projectName) + ",\u6267\u884C" + chalk_1.default.cyan.bold('git init')).start();
                //cd 到当前项目
                process.chdir(projectPath);
                var gitInit = child_process_1.default.exec('git init');
                gitInit.on('close', function (code) {
                    var _a, _b;
                    if (code === 0) {
                        //执行git 命令成功
                        gitInitSpinner.color = 'green';
                        gitInitSpinner.succeed((_a = gitInit.stdout) === null || _a === void 0 ? void 0 : _a.read());
                    }
                    else {
                        //执行git 命令失败
                        gitInitSpinner.color = 'red';
                        gitInitSpinner.fail((_b = gitInit.stderr) === null || _b === void 0 ? void 0 : _b.read());
                    }
                });
                //创建app 完成执行提示和回调
                var callSuccess = function () {
                    console.log(chalk_1.default.green("\u521B\u5EFA\u9879\u76EE " + chalk_1.default.green.bold(projectName) + " \u6210\u529F\uFF01"));
                    console.log(chalk_1.default.green("\u8BF7\u8FDB\u5165\u9879\u76EE\u76EE\u5F55 " + chalk_1.default.green.bold(projectName) + " \u5F00\u59CB\u5DE5\u4F5C\u5427\uFF01\uD83D\uDE1D"));
                    if (typeof cb === 'function') {
                        cb();
                    }
                };
                if (autoInstall) {
                    var command = isShouldUseYarn ? 'yarn install' : 'npm install';
                    var installSpinner_1 = ora_1.default("\u6267\u884C\u5B89\u88C5\u9879\u76EE\u4F9D\u8D56 " + chalk_1.default.cyan.bold(command) + ", \u9700\u8981\u4E00\u4F1A\u513F...").start();
                    child_process_1.default.exec(command, function (error, stdout, stderr) {
                        if (error) {
                            installSpinner_1.color = 'red';
                            installSpinner_1.fail(chalk_1.default.red('安装项目依赖失败，请自行重新安装！'));
                            console.log(error);
                        }
                        else {
                            installSpinner_1.color = 'green';
                            installSpinner_1.succeed('安装成功');
                            console.log("" + stderr + stdout);
                        }
                        callSuccess();
                    });
                }
                else {
                    callSuccess();
                }
            });
            return [2 /*return*/];
        });
    });
}
exports.createApp = createApp;
