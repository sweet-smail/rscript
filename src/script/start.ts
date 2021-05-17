import webpack from "webpack";
import express from "express";
import path from "path";
import open from "open";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackDevMiddleware from "webpack-dev-middleware"; // 主要是用来实现hmr操作，hmr 只能实现文件改变刷新浏览器操作，不能做到无感更新

// 设置环境变量
process.env.NODE_ENV = "development";

// 导入webpack config 文件

import config from "../config/webpack.config";

import { getDevServer } from "../config/parse.config";

const bundleHtmlPath = path.join(config.output?.path as string, "index.html");

let compiler: webpack.Compiler;
const devserver = getDevServer();

// 执行编译命令
try {
  compiler = webpack({stats:"errors-warnings",...config});
} catch (error) {
  console.error("webpack编译错误:", error);
  process.exit(1);
}

// 启动web服务

const app = express();
app
  .use(
    webpackDevMiddleware(compiler, {
      writeToDisk: false, // 是否写入磁盘
      publicPath: config.output?.publicPath as string,
    })
  )
  .use(
    webpackHotMiddleware(compiler, {
      log: false,
      path: "/__webpack_hmr",
      heartbeat: 2000,
    })
  );

// 转发
if (!!devserver.proxy && Object.keys(devserver.proxy).length > 0) {
  const arrayProxy = Object.entries(devserver.proxy);
  arrayProxy.forEach(([proxyPath, proxyOptions]) => {
    app.use([proxyPath], createProxyMiddleware(proxyOptions as Options));
  });
}

/**
 * 任何请求都指向编译好的html
 */
app.get("*", (_, res, next) => {
  // 读取文件
  compiler.outputFileSystem.readFile(bundleHtmlPath, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set("Content-type", "text/html");
    res.send(result);
    res.end();
  });
});

//监听端口，并打开浏览器
app.listen(devserver.port, async () => {
  await open(`http://127.0.0.1:${devserver.port}`);
});
