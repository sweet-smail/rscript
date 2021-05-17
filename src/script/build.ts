import webpack from "webpack";
import ora from "ora";
import chalk from "chalk";
process.env.NODE_ENV = "production";

import config from "../config/webpack.config";
let compiler: webpack.Compiler;
let buildTask = ora(`${chalk.bold("Rscrit 正在构建项目")}`).start();
try {
  buildTask.color = "green";
  compiler = webpack(config);
} catch (error) {
  buildTask.color = "red";
  buildTask.fail(error.message);
  process.exit(1);
}
// 执行编译操作
compiler.run((err, stats) => {
  if (err) {
    console.error("编译错误:", err.stack || err);
    return;
  }
  const statsInfoJson = {
    colors: true,
    version: true,
    hash: true,
    warningsCount: true,
    outputPath: true,
    errorsCount: true,
    env: true,
    publicPath: true,
    builtAt: true,
  };
  if (stats?.hasErrors()) {
    console.error(
      stats.toString({
        ...statsInfoJson,
        logging: "error",
      })
    );
    return;
  }
  buildTask.succeed("项目构建成功");
  process.exit();
});
