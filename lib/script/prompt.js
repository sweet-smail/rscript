"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
exports.default = (instance) => {
    const templateDir = fs_1.default.readdirSync(instance.sourceRoot());
    return instance.prompt([
        {
            type: "input",
            name: "name",
            message: "请输入项目名称",
            default: instance.options.appName,
            validate: (input) => {
                if (!input) {
                    return "项目名不能为空！";
                }
                if (instance.fs.exists(input)) {
                    return "当前目录已经存在同名项目，请换一个项目名!";
                }
                return true;
            },
        },
        {
            type: "input",
            name: "description",
            message: "请输入项目介绍！",
        },
        {
            type: "input",
            name: "author",
            message: "请输入作者",
            default: instance.user.git.name,
            store: false,
        },
        {
            type: "list",
            name: "templateName",
            message: "请选择项目类型",
            choices: templateDir,
        },
        {
            type: "confirm",
            name: "typescript",
            message: "是否需要使用 TypeScript?",
        },
        {
            type: "list",
            name: "css",
            message: "请选择 CSS 预处理器（Sass/Less）",
            choices: [
                {
                    name: "Sass",
                    value: "sass",
                },
                {
                    name: "Less",
                    value: "less",
                },
                {
                    name: "无",
                    value: "none",
                },
            ],
        },
    ]);
};
