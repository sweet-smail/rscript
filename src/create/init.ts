import path from 'path';
import chalk from 'chalk';
import { shouldUseYarn } from '../utils/platform';
import { resolveStyles } from '../path/pkg';
import Creator from './creator';
import ora from 'ora';
import child_process from 'child_process';
import { IProjectConf } from './project';
const isShouldUseYarn = shouldUseYarn();
export async function createApp(
  creator: Creator,
  params: IProjectConf,
  cb?: () => void
) {
  const { projectDir, projectName, autoInstall = true, css } = params;
  const projectPath = path.join(projectDir, projectName);
  //1. 将文件复制到内存中
  creator.fs.copyTpl(
    path.resolve(__dirname, '../../template/typescript-react/'),
    projectPath,
    params
  );
  const packageJson = creator.fs.readJSON(
    path.resolve(projectPath, 'package.json')
  );

  //2  修改文件
  creator.fs.writeJSON(path.resolve(projectPath, 'package.json'), {
    ...packageJson,
    dependencies: {
      ...packageJson.dependencies,
      ...resolveStyles(css).dependencies,
    },
  });

  //3  创建文件
  creator.fs.commit(() => {
    console.log(
      `${chalk.green('✔ ')} ${chalk.gray(
        `创建项目： ${chalk.gray.bold(projectName)}`
      )}  `
    );

    //执行 git init
    const gitInitSpinner = ora(
      `cd ${chalk.cyan.bold(projectName)},执行${chalk.cyan.bold('git init')}`
    ).start();
    //cd 到当前项目
    process.chdir(projectPath);
    const gitInit = child_process.exec('git init');

    gitInit.on('close', (code) => {
      if (code === 0) {
        //执行git 命令成功
        gitInitSpinner.color = 'green';
        gitInitSpinner.succeed(gitInit.stdout?.read());
      } else {
        //执行git 命令失败
        gitInitSpinner.color = 'red';
        gitInitSpinner.fail(gitInit.stderr?.read());
      }
    });
    //创建app 完成执行提示和回调
    const callSuccess = () => {
      console.log(
        chalk.green(`创建项目 ${chalk.green.bold(projectName)} 成功！`)
      );
      console.log(
        chalk.green(
          `请进入项目目录 ${chalk.green.bold(projectName)} 开始工作吧！😝`
        )
      );
      if (typeof cb === 'function') {
        cb();
      }
    };
    if (autoInstall) {
      const command = isShouldUseYarn ? 'yarn install' : 'npm install';
      const installSpinner = ora(
        `执行安装项目依赖 ${chalk.cyan.bold(command)}, 需要一会儿...`
      ).start();

      child_process.exec(command, (error, stdout, stderr) => {
        if (error) {
          installSpinner.color = 'red';
          installSpinner.fail(chalk.red('安装项目依赖失败，请自行重新安装！'));
          console.log(error);
        } else {
          installSpinner.color = 'green';
          installSpinner.succeed('安装成功');
          console.log(`${stderr}${stdout}`);
        }
        callSuccess();
      });
    } else {
      callSuccess();
    }
  });
}
