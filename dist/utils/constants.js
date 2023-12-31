"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULTS = exports.RC = exports.DESC = exports.NAME = exports.VERSION = undefined;

var _package = require("../../package.json");

//当前 package.json 的版本号
var VERSION = exports.VERSION = _package.version;
var NAME = exports.NAME = _package.name;
var DESC = exports.DESC = _package.description;

// 用户的根目录
var HOME = process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];

// 配置文件目录
var RC = exports.RC = HOME + "/.asmrc";

// RC 配置下载模板的地方，给 github 的 api 使用
// https://api.github.com/users/YvetteLau/repos
// https://api.github.com/${type}/${registry}/repos
// 模板下载地址可配置
var DEFAULTS = exports.DEFAULTS = {
    registry: "naxxxxxxx",
    type: "users"
};