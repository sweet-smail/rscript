import { program } from "commander";
import chalk from "chalk";
import yeoman from "yeoman-environment";
import GeneratorCreate from "./script/create";
const env = yeoman.createEnv();
env.registerStub(GeneratorCreate, "rca");
export default () => {
  program
    .version(require("../package").version, "-v,--version", "查看当前版本")
    .description("richard 的脚手架");
  program
    .command("create")
    .description("使用rca创建项目")
    .action(function() {
      const appName = process.argv[3];
      console.info(chalk.blue("rca 即将创建项目,请完成如下操作!!!"));
      env.run("rca", { appName }, function(error: Error | null) {
        if (error) {
          console.error(chalk.red(error.message));
          process.exit(1);
        }
      });
    });
  program
    .command("start")
    .description("使用rca运行开发环境项目")
    .action(function() {
      require("./script/start");
    });
  program
    .command("build")
    .description("使用rca构建生产环境项目")
    .action(function() {
      require("./script/build");
    });
  program
    .command("update")
    .description("升级rca")
    .action(function() {
      console.log("update");
    });
  program.parse(process.argv);
};
