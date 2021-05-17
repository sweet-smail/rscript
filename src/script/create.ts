import chalk from "chalk";
import path from "path";
import Generator from "yeoman-generator";
import { execSync } from "child_process";
import prompts from "./prompt";
let pkg: any = {
  dependencies: {
    rca: require("../../package.json").version as string,
  },
  devDependencies: {},
};

function shouldUseYarn() {
  try {
    execSync("yarnpkg --version", { stdio: "ignore" });
    return true;
  } catch (e) {
    return false;
  }
}

export default class extends Generator {
  answers: any;
  constructor(args: any, opts: any) {
    super(args, opts);
    // 重写模板文件路径
    this.sourceRoot(path.join(__dirname, "../../templates"));
  }
  initializing() {}
  async prompting() {
    this.answers = await prompts(this);
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
        pkg.dependencies = {
          ...pkg.dependencies,
          "sass-loader": "^10.0.5",
          "node-sass": "^5.0.0",
        };
        break;
      case "less":
        pkg.dependencies = {
          ...pkg.dependencies,
          less: "^3.12.2",
          "less-loader": "^7.0.2",
        };
        break;
      default:
    }
  }
  default() {}
  writing() {
    // 确定需要拷贝的模板路径
    const originTemplatePath = this.templatePath(this.answers.templateName);
    // 目标路径
    const newTemplatePath = this.destinationPath(this.answers.name);
    try {
      // 复制整个模板到内存
      this.fs.copyTpl(
        originTemplatePath,
        newTemplatePath,
        {
          ...this.answers,
        },
        {},
        { globOptions: { dot: true } } // 复制隐藏文件
      );
      // 读取packagejson
      const packageJSON: any = this.fs.readJSON(
        path.resolve(newTemplatePath, "package.json")
      );
      this.fs.extendJSON(
        path.resolve(newTemplatePath, "package.json"),
        {
          dependencies: { ...pkg.dependencies, ...packageJSON.dependencies },
          devDependencies: {
            ...pkg.devDependencies,
            ...packageJSON.devDependencies,
          },
        },
        undefined,
        2
      );
      //如果不是ts项目，则移除
      if (!this.answers.typescript) {
        this.fs.delete(path.resolve(newTemplatePath, "tsconfig.json"));
        this.fs.delete(path.resolve(newTemplatePath, "src/global.d.ts"));
      }
    } catch (error) {
      this.log(chalk.red("rca发生错误:", error.message));
      process.exit(1);
    }
    this.fs.commit(() => {
      this.log(chalk.green("模板创建成功"));
    });
  }
  conflicts() {}
  install() {
    // 进入工作目录
    process.chdir(path.resolve(process.cwd(), this.answers.name));
    try {
      this.installDependencies({
        npm: !shouldUseYarn(),
        yarn: shouldUseYarn(),
        bower: false,
      });
    } catch (error) {
      this.log(
        chalk.red("下载依赖失败，请手动下载\n", "错误原因:" + error.message)
      );
    }
  }
  end() {
    this.log(
      chalk.green(
        `rca 创建 ${this.answers.name}项目成功,请cd ${this.answers.name} 执行yarn run start 进行开发吧`
      )
    );
  }
}
