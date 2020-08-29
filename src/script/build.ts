import webpack from 'webpack';
import ora from 'ora';
import chalk from 'chalk';
process.env.NODE_ENV = 'production';

import config from '../config/webpack.config';
let compiler: webpack.Compiler;
let buildTask = ora(`${chalk.bold('Rscrit 正在构建项目')}`).start();
try {
  buildTask.color = 'green';
  compiler = webpack(config as webpack.Configuration);
} catch (error) {
  buildTask.color = 'red';
  buildTask.fail(error.message);
  process.exit(1);
}
compiler.run((err, stats) => {
  if (err) {
    console.error(err.stack || err);
    return;
  }
  const info = stats.toJson();
  if (stats.hasErrors()) {
    console.error(info.errors);
  }
  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
  buildTask.succeed('构建成功');

  console.info(stats.toString());
});
