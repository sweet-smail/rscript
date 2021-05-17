"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const child_process_1 = require("child_process");
const prompt_1 = __importDefault(require("./prompt"));
let pkg = {
    dependencies: {
        rca: require("../../package.json").version,
    },
    devDependencies: {},
};
function shouldUseYarn() {
    try {
        child_process_1.execSync("yarnpkg --version", { stdio: "ignore" });
        return true;
    }
    catch (e) {
        return false;
    }
}
class default_1 extends yeoman_generator_1.default {
    constructor(args, opts) {
        super(args, opts);
        // 重写模板文件路径
        this.sourceRoot(path_1.default.join(__dirname, "../../templates"));
    }
    initializing() { }
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            this.answers = yield prompt_1.default(this);
        });
    }
    configuring() {
        if (this.answers.typescript) {
            pkg.devDependencies = {
                "@types/node": "^14.14.6",
                "@types/webpack-env": "^1.15.3",
                typescript: "^3.9.7",
            };
        }
        switch (this.answers.css) {
            case "sass":
                pkg.dependencies = Object.assign(Object.assign({}, pkg.dependencies), { "sass-loader": "^10.0.5", "node-sass": "^5.0.0" });
                break;
            case "less":
                pkg.dependencies = Object.assign(Object.assign({}, pkg.dependencies), { less: "^3.12.2", "less-loader": "^7.0.2" });
                break;
            default:
        }
    }
    default() { }
    writing() {
        // 确定需要拷贝的模板路径
        const originTemplatePath = this.templatePath(this.answers.templateName);
        // 目标路径
        const newTemplatePath = this.destinationPath(this.answers.name);
        try {
            // 复制整个模板到内存
            this.fs.copyTpl(originTemplatePath, newTemplatePath, Object.assign({}, this.answers), {}, { globOptions: { dot: true } } // 复制隐藏文件
            );
            // 读取packagejson
            const packageJSON = this.fs.readJSON(path_1.default.resolve(newTemplatePath, "package.json"));
            this.fs.extendJSON(path_1.default.resolve(newTemplatePath, "package.json"), {
                dependencies: Object.assign(Object.assign({}, pkg.dependencies), packageJSON.dependencies),
                devDependencies: Object.assign(Object.assign({}, pkg.devDependencies), packageJSON.devDependencies),
            }, undefined, 2);
            //如果不是ts项目，则移除
            if (!this.answers.typescript) {
                this.fs.delete(path_1.default.resolve(newTemplatePath, "tsconfig.json"));
                this.fs.delete(path_1.default.resolve(newTemplatePath, "src/global.d.ts"));
            }
        }
        catch (error) {
            this.log(chalk_1.default.red("rca发生错误:", error.message));
            process.exit(1);
        }
        this.fs.commit(() => {
            this.log(chalk_1.default.green("模板创建成功"));
        });
    }
    conflicts() { }
    install() {
        // 进入工作目录
        process.chdir(path_1.default.resolve(process.cwd(), this.answers.name));
        try {
            this.installDependencies({
                npm: !shouldUseYarn(),
                yarn: shouldUseYarn(),
                bower: false,
            });
        }
        catch (error) {
            this.log(chalk_1.default.red("下载依赖失败，请手动下载\n", "错误原因:" + error.message));
        }
    }
    end() {
        this.log(chalk_1.default.green(`rca 创建 ${this.answers.name}项目成功,请cd ${this.answers.name} 执行yarn run start 进行开发吧`));
    }
}
exports.default = default_1;
