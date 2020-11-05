import { program } from 'commander';
import chalk from 'chalk';

const yeoman = require('yeoman-environment');
import GeneratorCreate from './script/create';

const env = yeoman.createEnv();
env.registerStub(GeneratorCreate, 'rscript');
export default () => {
	program
		.version('0.0.1', '-v,--version', '查看当前版本')
		.description('richard 的脚手架');
	program
		.command('create')
		.description('使用rscript创建项目')
		.action(function() {
			console.log(chalk.blue('rscript 即将创建项目,请完成如下操作!!!'));
			env.run('rscript', function(error: Error) {
				if (error) {
					console.error(chalk.red(error.message));
					process.exit(1);
				}
			});
		});
	program
		.command('start')
		.description('使用rscript运行开发环境项目')
		.action(function() {
			require('./script/start');
		});
	program
		.command('build')
		.description('使用rscript构建生产环境项目')
		.action(function() {
			require('./script/build');
		});
	program
		.command('update')
		.description('升级rscript')
		.action(function() {
			console.log('update');
		});
	program.parse(process.argv);
};
