import webpack from 'webpack';
import express from 'express';
import path from 'path';
import open from 'open';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
process.env.NODE_ENV = 'development';
import config from '../config/webpack.config';
import webpackDevConfig from '../config/webpack.dev.config';
const publicPath = config.output.publicPath;
let compiler: webpack.Compiler;
try {
  compiler = webpack(config as webpack.Configuration);
} catch (error) {
  console.error(error);
  process.exit(1);
}
const app = express();
app.use(
  webpackDevMiddleware(compiler, {
    logLevel: 'error',
    publicPath: publicPath,
  })
);
app.use(
  webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  })
);
//转发
if (!!webpackDevConfig.proxy) {
  const arrayProxy = Object.entries(webpackDevConfig.proxy);
  arrayProxy.forEach(([proxyPath, proxyOptions]) => {
    app.use([proxyPath], createProxyMiddleware(proxyOptions as Options));
  });
}
//设置static
app.get('*', (req, res, next) => {
  const filename = path.join(config.output.path, 'index.html');
  (compiler.outputFileSystem as any).readFile(
    filename,
    (err: Error, result: any) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    }
  );
});
app.listen(webpackDevConfig.port, async () => {
  await open(`http://127.0.0.1:${webpackDevConfig.port}`);
  console.info(`running port: ${webpackDevConfig.port}`);
  console.info(`publicPath: ${config.output.publicPath}`);
});
