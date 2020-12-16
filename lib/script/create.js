"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
var chalk_1 = __importDefault(require("chalk"));
var path_1 = __importDefault(require("path"));
var yeoman_generator_1 = __importDefault(require("yeoman-generator"));
var child_process_1 = require("child_process");
var prompt_1 = __importDefault(require("./prompt"));
var pkg = {
    dependencies: {
        rca: require("../../package.json").version
    },
    devDependencies: {}
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
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1(args, opts) {
        var _this = _super.call(this, args, opts) || this;
        // 重写模板文件路径
        _this.sourceRoot(path_1.default.join(__dirname, "../../templates"));
        return _this;
    }
    default_1.prototype.initializing = function () { };
    default_1.prototype.prompting = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, prompt_1.default(this)];
                    case 1:
                        _a.answers = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    default_1.prototype.configuring = function () {
        if (this.answers.typescript) {
            pkg.devDependencies = {
                "@types/node": "^14.14.6",
                "@types/webpack-env": "^1.15.3",
                typescript: "^3.9.7"
            };
        }
        switch (this.answers.css) {
            case "sass":
                pkg.dependencies = __assign(__assign({}, pkg.dependencies), { "sass-loader": "^10.0.5", "node-sass": "^5.0.0" });
                break;
            case "less":
                pkg.dependencies = __assign(__assign({}, pkg.dependencies), { less: "^3.12.2", "less-loader": "^7.0.2" });
                break;
            default:
        }
    };
    default_1.prototype.default = function () { };
    default_1.prototype.writing = function () {
        var _this = this;
        // 确定需要拷贝的模板路径
        var originTemplatePath = this.templatePath(this.answers.templateName);
        // 目标路径
        var newTemplatePath = this.destinationPath(this.answers.name);
        try {
            // 复制整个模板到内存
            this.fs.copyTpl(originTemplatePath, newTemplatePath, __assign({}, this.answers), {}, { globOptions: { dot: true } } // 复制隐藏文件
            );
            // 读取packagejson
            var packageJSON = this.fs.readJSON(path_1.default.resolve(newTemplatePath, "package.json"));
            this.fs.extendJSON(path_1.default.resolve(newTemplatePath, "package.json"), {
                dependencies: __assign(__assign({}, pkg.dependencies), packageJSON.dependencies),
                devDependencies: __assign(__assign({}, pkg.devDependencies), packageJSON.devDependencies)
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
        this.fs.commit(function () {
            _this.log(chalk_1.default.green("模板创建成功"));
        });
    };
    default_1.prototype.conflicts = function () { };
    default_1.prototype.install = function () {
        // 进入工作目录
        try {
            process.chdir(path_1.default.resolve(process.cwd(), this.answers.name));
            this.installDependencies({
                npm: !shouldUseYarn(),
                yarn: shouldUseYarn(),
                bower: false
            });
        }
        catch (error) {
            this.log(error.message);
        }
    };
    default_1.prototype.end = function () {
        this.log(chalk_1.default.green("rca \u521B\u5EFA " + this.answers.name + "\u9879\u76EE\u6210\u529F,\u8BF7cd " + this.answers.name + " \u6267\u884Cyarn run start \u8FDB\u884C\u5F00\u53D1\u5427"));
    };
    return default_1;
}(yeoman_generator_1.default));
exports.default = default_1;
