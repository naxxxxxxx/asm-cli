"use strict";

var _commander = require("commander");

var _rc = require("./utils/rc");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var config = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(action, key, value) {
        var result, obj;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log("action", action);
                        console.log("key", key);
                        console.log("value", value);
                        _context.t0 = action;
                        _context.next = _context.t0 === "get" ? 6 : _context.t0 === "set" ? 18 : _context.t0 === "remove" ? 20 : 22;
                        break;

                    case 6:
                        if (!key) {
                            _context.next = 13;
                            break;
                        }

                        _context.next = 9;
                        return (0, _rc.get)(key);

                    case 9:
                        result = _context.sent;

                        console.log(result);
                        _context.next = 17;
                        break;

                    case 13:
                        _context.next = 15;
                        return (0, _rc.getAll)();

                    case 15:
                        obj = _context.sent;

                        Object.keys(obj).forEach(function (key) {
                            console.log(key + "=" + obj[key]);
                        });

                    case 17:
                        return _context.abrupt("break", 23);

                    case 18:
                        (0, _rc.set)(key, value);
                        return _context.abrupt("break", 23);

                    case 20:
                        (0, _rc.remove)(key);
                        return _context.abrupt("break", 23);

                    case 22:
                        return _context.abrupt("break", 23);

                    case 23:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function config(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();
module.exports = config;