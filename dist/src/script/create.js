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
const prompt_1 = __importDefault(require("./prompt"));
let pkg = {
    dependencies: {}
};
class default_1 extends yeoman_generator_1.default {
    constructor(args, opts) {
        super(args, opts);
        // 重写模板文件路径
        this.sourceRoot(path_1.default.join(__dirname, "../../templates"));
    }
    initializing() {
    }
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            this.answers = yield prompt_1.default(this);
        });
    }
    configuring() {
        if (this.answers.typescript) {
            pkg.dependencies = Object.assign(Object.assign({}, pkg.dependencies), { typescript: "^3.9.7" });
        }
        if (this.answers.css) {
        }
    }
    default() {
    }
    writing() {
        // 确定需要拷贝的模板路径
        const originTemplatePath = this.templatePath(this.answers.templateName);
        const newTemplatePath = this.destinationPath(this.answers.name);
        try {
            this.fs.copyTpl(originTemplatePath, newTemplatePath, this.answers);
            if (!this.answers.typescript) {
                this.fs.delete(path_1.default.resolve(newTemplatePath, "tsconfig.json"));
                this.fs.delete(path_1.default.resolve(newTemplatePath, "global.d.ts"));
            }
        }
        catch (error) {
            this.log(chalk_1.default.red("rscript发生错误:", error.message));
            process.exit(1);
        }
        this.fs.commit(() => {
            this.log(chalk_1.default.green("模板创建成功"));
        });
    }
    conflicts() {
    }
    install() {
        // 进入工作目录
        try {
            process.chdir(path_1.default.resolve(process.cwd(), this.answers.name));
            this.yarnInstall();
        }
        catch (error) {
            this.log(error.message);
        }
    }
    end() {
        this.log(chalk_1.default.green(`rscript 创建 ${this.answers.name}项目成功,请cd ${this.answers.name} 执行yarn run start 进行开发吧`));
    }
}
exports.default = default_1;
