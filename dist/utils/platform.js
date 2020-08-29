"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldUseYarn = void 0;
var child_process_1 = require("child_process");
exports.shouldUseYarn = function () {
    try {
        child_process_1.execSync('yarnpkg --version', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        return false;
    }
};
