"use strict";

var _get = require("./utils/get");

var _ora = require("ora");

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _logSymbols = require("log-symbols");

var _logSymbols2 = _interopRequireDefault(_logSymbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var install = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(templateName, projectName) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        //项目不存在
                        if (!_fs2.default.existsSync(projectName)) {
                            //命令行交互
                            _inquirer2.default.prompt([{
                                type: "list",
                                name: "type",
                                message: "选择你的项目模板类型",
                                default: 0,
                                choices: [{
                                    value: "full-admin",
                                    name: "后台项目模板(前后端同项目:Umi+AntDesign+Koa2+Redis+Mysql)"
                                }, {
                                    value: "full-admin-redirect",
                                    name: "后台项目模板(包含服务端中转:Umi+AntDesign+Koa2+Axios)"
                                }, {
                                    value: "client-admin",
                                    name: "后台项目模板(纯前端:Umi+AntDesign)"
                                }, {
                                    value: "full-project",
                                    name: "项目模板(前后端同项目:Umi+AntDesign+Koa2+Redis+Mysql))"
                                }, {
                                    value: "full-project-redirect",
                                    name: "项目模板(包含服务端中转:Umi+AntDesign+Koa2+Axios)"
                                }, {
                                    value: "client-project",
                                    name: "项目模板(纯前端:Umi+AntDesign)"
                                }]
                            }, {
                                name: "description",
                                message: "请输入项目描述: "
                            }, {
                                name: "author",
                                message: "请填写项目作者: "
                            }, {
                                name: "autoInstall",
                                type: "confirm",
                                message: "是否自动安装依赖: "
                            }]).then(function () {
                                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(answer) {
                                    var loading;
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    // console.log("answer", answer)
                                                    //下载模板 选择模板
                                                    //通过配置文件，获取模板信息
                                                    loading = (0, _ora2.default)("正在下载模板 ...");

                                                    loading.start();
                                                    _context.next = 4;
                                                    return (0, _get.downloadLocal)(templateName, projectName).then(function () {
                                                        loading.succeed();
                                                        var fileName = projectName + "/package.json";
                                                        if (_fs2.default.existsSync(fileName)) {
                                                            var data = _fs2.default.readFileSync(fileName).toString();
                                                            var json = JSON.parse(data);
                                                            json.name = projectName;
                                                            json.author = answer.author;
                                                            json.description = answer.description;
                                                            //修改项目文件夹中 package.json 文件
                                                            _fs2.default.writeFileSync(fileName, JSON.stringify(json, null, "\t"), "utf-8");
                                                            console.log(_logSymbols2.default.success, _chalk2.default.green("项目模板下载完成!"));
                                                        }
                                                    }).catch(function (err) {
                                                        loading.fail("下载模板失败，请检查网络或是否存在对应项目模板");
                                                    });

                                                case 4:
                                                case "end":
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, undefined);
                                }));

                                return function (_x3) {
                                    return _ref2.apply(this, arguments);
                                };
                            }());
                        } else {
                            //项目已经存在
                            console.log(_logSymbols2.default.error, _chalk2.default.red("项目已存在"));
                        }

                    case 1:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function install(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

module.exports = install;