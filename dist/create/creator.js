"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var memFs = require('mem-fs');
var memFsEditor = require('mem-fs-editor');
var Creator = /** @class */ (function () {
    function Creator() {
        var store = memFs.create();
        this.fs = memFsEditor.create(store);
    }
    Creator.prototype.template = function () { };
    return Creator;
}());
exports.default = Creator;
