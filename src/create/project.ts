import chalk from 'chalk';
import inquirer from 'inquirer';
import Creator from './creator';
import { createApp } from './init';
import fs from 'fs-extra';

export interface IProjectConf {
  projectName: string;
  projectDir: string;
  description?: string;
  typescript?: boolean;
  css: 'none' | 'sass' | 'less';
  autoInstall?: boolean;
}
interface AskMethods {
  (conf: IProjectConf, prompts: object[], choices?: string[]): void;
}

class Project extends Creator {
  public conf: IProjectConf;
  constructor(conf: Partial<IProjectConf>) {
    super();
    this.conf = Object.assign({
      projectDir: process.cwd(),
      projectName: '',
      description: '',
      ...conf,
    });
  }
  init() {
    console.log(chalk.green(`rscript 即将创建一个新项目!`));
  }
  create() {
    this.ask()
      .then((answers) => {
        this.conf = Object.assign(this.conf, answers);
        this.write();
      })
      .catch((error) => {
        console.log(chalk.red('创建项目失败：', error));
      });
  }
  ask() {
    const prompts: object[] = [];
    this.askProjectName(this.conf, prompts);
    this.askDescription(this.conf, prompts);
    this.askTypescript(this.conf, prompts);
    this.askCSS(this.conf, prompts);
    return inquirer.prompt(prompts);
  }
  askProjectName: AskMethods = function (conf, prompts) {
    if (typeof conf.projectName !== 'string') {
      prompts.push({
        type: 'input',
        name: 'projectName',
        message: '请输入项目名称！',
        validate(input: string) {
          if (!input) {
            return '项目名不能为空！';
          }
          if (fs.existsSync(input)) {
            return '当前目录已经存在同名项目，请换一个项目名！';
          }
          return true;
        },
      });
    } else if (fs.existsSync(conf.projectName)) {
      console.log(chalk.red('当前目录已经存在同名项目，请换一个项目名！'));
      prompts.push({
        type: 'input',
        name: 'projectName',
        message: '请输入项目名称！',

        validate(input: string) {
          if (!input) {
            return '项目名不能为空！';
          }
          if (fs.existsSync(input)) {
            return '当前目录已经存在同名项目，请换一个项目名！';
          }
          return true;
        },
      });
    }
  };
  askDescription: AskMethods = function (conf, prompts) {
    prompts.push({
      type: 'input',
      name: 'description',
      message: '请输入项目介绍！',
    });
  };
  askTypescript: AskMethods = function (conf, prompts) {
    prompts.push({
      type: 'confirm',
      name: 'typescript',
      message: '是否需要使用 TypeScript ？',
    });
  };
  askCSS: AskMethods = function (conf, prompts) {
    const cssChoices = [
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
  askTemplate() {}
  write(cb?: () => void) {
    createApp(this, this.conf, cb).catch((error) => console.log(error));
  }
}
export default Project;
