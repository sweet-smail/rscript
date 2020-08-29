"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var chalk_1 = __importDefault(require("chalk"));
var inquirer_1 = __importDefault(require("inquirer"));
var creator_1 = __importDefault(require("./creator"));
var init_1 = require("./init");
var fs_extra_1 = __importDefault(require("fs-extra"));
var Project = /** @class */ (function (_super) {
    __extends(Project, _super);
    function Project(conf) {
        var _this = _super.call(this) || this;
        _this.askProjectName = function (conf, prompts) {
            if (typeof conf.projectName !== 'string') {
                prompts.push({
                    type: 'input',
                    name: 'projectName',
                    message: '请输入项目名称！',
                    validate: function (input) {
                        if (!input) {
                            return '项目名不能为空！';
                        }
                        if (fs_extra_1.default.existsSync(input)) {
                            return '当前目录已经存在同名项目，请换一个项目名！';
                        }
                        return true;
                    },
                });
            }
            else if (fs_extra_1.default.existsSync(conf.projectName)) {
                console.log(chalk_1.default.red('当前目录已经存在同名项目，请换一个项目名！'));
                prompts.push({
                    type: 'input',
                    name: 'projectName',
                    message: '请输入项目名称！',
                    validate: function (input) {
                        if (!input) {
                            return '项目名不能为空！';
                        }
                        if (fs_extra_1.default.existsSync(input)) {
                            return '当前目录已经存在同名项目，请换一个项目名！';
                        }
                        return true;
                    },
                });
            }
        };
        _this.askDescription = function (conf, prompts) {
            prompts.push({
                type: 'input',
                name: 'description',
                message: '请输入项目介绍！',
            });
        };
        _this.askTypescript = function (conf, prompts) {
            prompts.push({
                type: 'confirm',
                name: 'typescript',
                message: '是否需要使用 TypeScript ？',
            });
        };
        _this.askCSS = function (conf, prompts) {
            var cssChoices = [
                {
                    name: 'Sass',
                    value: 'sass',
                },
                {
                    name: 'Less',
                    value: 'less',
                },
                {
                    name: '无',
                    value: 'none',
                },
            ];
            prompts.push({
                type: 'list',
                name: 'css',
                message: '请选择 CSS 预处理器（Sass/Less）',
                choices: cssChoices,
            });
        };
        _this.conf = Object.assign(__assign({ projectDir: process.cwd(), projectName: '', description: '' }, conf));
        return _this;
    }
    Project.prototype.init = function () {
        console.log(chalk_1.default.green("rscript \u5373\u5C06\u521B\u5EFA\u4E00\u4E2A\u65B0\u9879\u76EE!"));
    };
    Project.prototype.create = function () {
        var _this = this;
        this.ask()
            .then(function (answers) {
            _this.conf = Object.assign(_this.conf, answers);
            _this.write();
        })
            .catch(function (error) {
            console.log(chalk_1.default.red('创建项目失败：', error));
        });
    };
    Project.prototype.ask = function () {
        var prompts = [];
        this.askProjectName(this.conf, prompts);
        this.askDescription(this.conf, prompts);
        this.askTypescript(this.conf, prompts);
        this.askCSS(this.conf, prompts);
        return inquirer_1.default.prompt(prompts);
    };
    Project.prototype.askTemplate = function () { };
    Project.prototype.write = function (cb) {
        init_1.createApp(this, this.conf, cb).catch(function (error) { return console.log(error); });
    };
    return Project;
}(creator_1.default));
exports.default = Project;
