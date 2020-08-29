import minimist from 'minimist';
import spawn from 'cross-spawn';
import path from 'path';
import Project from './create/project';
export default class Cli {
  public appPath: string;
  constructor() {
    this.appPath = process.cwd();
  }
  run() {
    this.parseArgs();
  }
  parseArgs() {
    const args = minimist(process.argv.slice(2), {
      alias: {
        version: ['v'],
        help: ['h'],
      },
      boolean: ['version', 'help'],
    });
    const command = args._[0];
    if (command) {
      switch (command) {
        //执行创建项目命令
        case 'create':
          //如果create 命令后没有跟数据 则args[1]为undefind
          const newProject = new Project({
            projectName: args._[1],
          });
          newProject.init();
          newProject.create();
          break;
        //执行构建命令
        case 'build':
          const buildResult = spawn.sync(
            'node',
            [path.join(__dirname, './script/build.js')],
            {
              stdio: 'inherit',
            }
          );
          process.exit(buildResult.status || undefined);

        case 'start':
          const result = spawn.sync(
            'node',
            [path.join(__dirname, './script/start.js')],
            {
              stdio: 'inherit',
            }
          );
          if (result.signal) {
            if (result.signal === 'SIGKILL') {
              console.log(result.signal, 1);
            } else if (result.signal === 'SIGTERM') {
              console.log(result, 2);
            }
          }
          process.exit(result.status || undefined);

        default:
          console.log('Unknown script "' + command + '".');
      }
    }
  }
}
