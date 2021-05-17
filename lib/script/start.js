"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const open_1 = __importDefault(require("open"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const webpack_hot_middleware_1 = __importDefault(require("webpack-hot-middleware"));
const webpack_dev_middleware_1 = __importDefault(require("webpack-dev-middleware")); // 主要是用来实现hmr操作，hmr 只能实现文件改变刷新浏览器操作，不能做到无感更新
// 设置环境变量
process.env.NODE_ENV = "development";
// 导入webpack config 文件
const webpack_config_1 = __importDefault(require("../config/webpack.config"));
const parse_config_1 = require("../config/parse.config");
const bundleHtmlPath = path_1.default.join((_a = webpack_config_1.default.output) === null || _a === void 0 ? void 0 : _a.path, "index.html");
let compiler;
const devserver = parse_config_1.getDevServer();
// 执行编译命令
try {
    compiler = webpack_1.default(Object.assign({ stats: "errors-warnings" }, webpack_config_1.default));
}
catch (error) {
    console.error("webpack编译错误:", error);
    process.exit(1);
}
// 启动web服务
const app = express_1.default();
app
    .use(webpack_dev_middleware_1.default(compiler, {
    writeToDisk: false,
    publicPath: (_b = webpack_config_1.default.output) === null || _b === void 0 ? void 0 : _b.publicPath,
}))
    .use(webpack_hot_middleware_1.default(compiler, {
    log: false,
    path: "/__webpack_hmr",
    heartbeat: 2000,
}));
// 转发
if (!!devserver.proxy && Object.keys(devserver.proxy).length > 0) {
    const arrayProxy = Object.entries(devserver.proxy);
    arrayProxy.forEach(([proxyPath, proxyOptions]) => {
        app.use([proxyPath], http_proxy_middleware_1.createProxyMiddleware(proxyOptions));
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
app.listen(devserver.port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield open_1.default(`http://127.0.0.1:${devserver.port}`);
}));
