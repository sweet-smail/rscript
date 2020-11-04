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
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const open_1 = __importDefault(require("open"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const webpack_hot_middleware_1 = __importDefault(require("webpack-hot-middleware"));
const webpack_dev_middleware_1 = __importDefault(require("webpack-dev-middleware"));
process.env.NODE_ENV = 'development';
const webpack_config_1 = __importDefault(require("../config/webpack.config"));
const webpack_dev_config_1 = __importDefault(require("../config/webpack.dev.config"));
exports.default = () => {
    const publicPath = webpack_config_1.default.output.publicPath;
    let compiler;
    try {
        compiler = webpack_1.default(webpack_config_1.default);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
    const app = express_1.default();
    app
        .use(webpack_dev_middleware_1.default(compiler, {
        logLevel: 'error',
        lazy: false,
        watchOptions: {
            ignored: /node_modules/,
            poll: false,
        },
        publicPath: publicPath,
    }))
        .use(webpack_hot_middleware_1.default(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    }));
    //proxy
    if (!!webpack_dev_config_1.default.proxy) {
        const arrayProxy = Object.entries(webpack_dev_config_1.default.proxy);
        arrayProxy.forEach(([proxyPath, proxyOptions]) => {
            app.use([proxyPath], http_proxy_middleware_1.createProxyMiddleware(proxyOptions));
        });
    }
    //设置static
    app.get('*', (req, res, next) => {
        const filename = path_1.default.join(webpack_config_1.default.output.path, 'index.html');
        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });
    });
    //监听端口，并打开浏览器
    app.listen(webpack_dev_config_1.default.port, () => __awaiter(void 0, void 0, void 0, function* () {
        yield open_1.default(`http://127.0.0.1:${webpack_dev_config_1.default.port}`);
    }));
};
