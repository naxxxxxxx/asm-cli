"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remove = exports.set = exports.getAll = exports.get = undefined;

var _ini = require("ini");

var _util = require("util");

var _constants = require("./constants");

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var exits = (0, _util.promisify)(_fs2.default.exists);
var readFile = (0, _util.promisify)(_fs2.default.readFile);
var writeFile = (0, _util.promisify)(_fs2.default.writeFile);

/**
 * RC 是配置文件
 * DEFAULTS 是默认的配置
 */

var get = exports.get = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key) {
        var exit, opts;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return exits(_constants.RC);

                    case 2:
                        exit = _context.sent;
                        opts = void 0;

                        if (!exit) {
                            _context.next = 10;
                            break;
                        }

                        _context.next = 7;
                        return readFile(_constants.RC);

                    case 7:
                        opts = _context.sent;

                        opts = (0, _ini.decode)(opts);
                        return _context.abrupt("return", opts[key]);

                    case 10:
                        return _context.abrupt("return", "");

                    case 11:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function get(_x) {
        return _ref.apply(this, arguments);
    };
}();

var getAll = exports.getAll = function getAll() {
    return _constants.DEFAULTS;
};

var set = exports.set = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(key, value) {
        var exit, opts;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return exits(_constants.RC);

                    case 2:
                        exit = _context2.sent;
                        opts = void 0;

                        if (!exit) {
                            _context2.next = 18;
                            break;
                        }

                        _context2.next = 7;
                        return readFile(_constants.RC);

                    case 7:
                        opts = _context2.sent;

                        opts = (0, _ini.decode)(opts);

                        if (key) {
                            _context2.next = 12;
                            break;
                        }

                        console.log(_chalk2.default.red(_chalk2.default.bold("Error:")), _chalk2.default.red("key is required"));
                        return _context2.abrupt("return");

                    case 12:
                        if (value) {
                            _context2.next = 15;
                            break;
                        }

                        console.log(_chalk2.default.red(_chalk2.default.bold("Error:")), _chalk2.default.red("value is required"));
                        return _context2.abrupt("return");

                    case 15:
                        Object.assign(opts, _defineProperty({}, key, value));
                        _context2.next = 19;
                        break;

                    case 18:
                        opts = Object.assign(_constants.DEFAULTS, _defineProperty({}, key, value));

                    case 19:
                        _context2.next = 21;
                        return writeFile(_constants.RC, (0, _ini.encode)(opts));

                    case 21:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function set(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

var remove = exports.remove = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(key) {
        var exit, opts;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return exits(_constants.RC);

                    case 2:
                        exit = _context3.sent;
                        opts = void 0;

                        if (!exit) {
                            _context3.next = 12;
                            break;
                        }

                        _context3.next = 7;
                        return readFile(_constants.RC);

                    case 7:
                        opts = _context3.sent;

                        opts = (0, _ini.decode)(opts);
                        delete opts[key];
                        _context3.next = 12;
                        return writeFile(_constants.RC, (0, _ini.encode)(opts));

                    case 12:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function remove(_x4) {
        return _ref3.apply(this, arguments);
    };
}();