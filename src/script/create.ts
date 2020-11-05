import chalk from 'chalk';
import path from 'path';
import Generator from 'yeoman-generator';
import prompts from './prompt';
let pkg = {
	dependencies: {},
	devDependencies: {},
};
export default class extends Generator {
	answers: any;
	constructor(args: any, opts: any) {
		super(args, opts);
		// 重写模板文件路径
		this.sourceRoot(path.join(__dirname, '../../templates'));
	}
	initializing() {}
	async prompting() {
		this.answers = await prompts(this);
	}
	configuring() {
		if (this.answers.typescript) {
			pkg.dependencies = {
				...pkg.dependencies,
				typescript: '^3.9.7',
			};
			pkg.devDependencies = {
				'@types/node': '^14.14.6',
				'@types/webpack-env': '^1.15.3',
			};
		}
		switch (this.answers.css) {
			case 'sass':
				pkg.dependencies = {
					...pkg.dependencies,
					'sass-loader': '^10.0.5',
					'node-sass': '^5.0.0',
				};
				break;
			case 'less':
				pkg.dependencies = {
					...pkg.dependencies,
					less: '^3.12.2',
					'less-loader': '^7.0.2',
				};
				break;
			default:
		}
		switch (this.answers.templateName) {
			case 'react':
				pkg.dependencies = {
					...pkg.dependencies,
					'@types/react': '^16.9.0',
					'@types/react-dom': '^16.9.0',
					'@types/react-router-dom': '^5.1.5',
					react: '^17.0.1',
					'react-dom': '^17.0.1',
					'react-router-dom': '^5.2.0',
				};
				break;
		}
	}
	default() {}
	writing() {
		// 确定需要拷贝的模板路径
		const originTemplatePath = this.templatePath(this.answers.templateName);
		const newTemplatePath = this.destinationPath(this.answers.name);
		try {
			// 复制整个模板到内存
			this.fs.copyTpl(originTemplatePath, newTemplatePath, {
				...this.answers,
			});
			// 修改package.json
			this.fs.extendJSON(
				path.resolve(newTemplatePath, 'package.json'),
				{
					dependencies: pkg.dependencies,
				},
				undefined,
				2
			);
			//如果不是ts项目，则移除
			if (!this.answers.typescript) {
				this.fs.delete(path.resolve(newTemplatePath, 'tsconfig.json'));
				this.fs.delete(path.resolve(newTemplatePath, 'global.d.ts'));
			}
		} catch (error) {
			this.log(chalk.red('rscript发生错误:', error.message));
			process.exit(1);
		}
		this.fs.commit(() => {
			this.log(chalk.green('模板创建成功'));
		});
	}
	conflicts() {}
	install() {
		// 进入工作目录
		try {
			process.chdir(path.resolve(process.cwd(), this.answers.name));
			this.yarnInstall();
		} catch (error) {
			this.log(error.message);
		}
	}
	end() {
		this.log(
			chalk.green(
				`rscript 创建 ${this.answers.name}项目成功,请cd ${this.answers.name} 执行yarn run start 进行开发吧`
			)
		);
	}
}
