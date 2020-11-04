import webpack from 'webpack';
import express from 'express';
import path from 'path';
import open from 'open';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';

process.env.NODE_ENV = 'development';

import config from '../config/webpack.config';

import { getDevServer } from '../config/parse.config';
export default () => {
	let compiler: webpack.Compiler;
	const devserver = getDevServer();
	try {
		compiler = webpack(config);
	} catch (error) {
		console.error('webpack编译错误:', error);
		process.exit(1);
	}

	const app = express();
	console.log('module', module.hot);
	app
		.use(
			webpackDevMiddleware(compiler, {
				// logLevel: 'error',
				publicPath: config.output?.publicPath as string,
			})
		)
		.use(
			webpackHotMiddleware(compiler, {
				log: console.log,
				path: '/__webpack_hmr',
				heartbeat: 2000,
			})
		);

	//转发api
	if (!!devserver.proxy && Object.keys(devserver.proxy).length > 0) {
		const arrayProxy = Object.entries(devserver.proxy);
		arrayProxy.forEach(([proxyPath, proxyOptions]) => {
			app.use([proxyPath], createProxyMiddleware(proxyOptions as Options));
		});
	}

	app.get('*', (req, res, next) => {
		const filename = path.join(config.output?.path as string, 'index.html');
		(compiler.outputFileSystem as any).readFile(
			filename,
			(err: Error, result: any) => {
				if (err) {
					console.error(err.message);
					return next(err);
				}
				res.set('content-type', 'text/html');
				res.send(result);
				res.end();
			}
		);
	});

	//监听端口，并打开浏览器
	app.listen(devserver.port, async () => {
		await open(`http://127.0.0.1:${devserver.port}`);
	});
};
