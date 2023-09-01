"use strict";

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _constants = require("./utils/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('commander'),
    Command = _require.Command;

var program = new Command();

program.name(_constants.NAME).description(_constants.DESC).version(_constants.VERSION);

/**
 * asm commands
 * - generate
 * - config
 */
var actionMap = {
    init: {
        alias: "i",
        description: "从模板中生成新的项目 " + _chalk2.default.blue("asm init"),
        usages: ["asm init"]
    }
};

/**
 * 添加 install/config命令
 */
Object.keys(actionMap).forEach(function (action) {
    program.command(action).description(actionMap[action].description).alias(actionMap[action].alias).action(function () {
        var actionArr = process.argv.slice(2);
        if (actionArr && actionArr.length > 0) {
            var subCommand = actionArr[0];
            switch (subCommand) {
                case "i":
                    _index2.default.apply(undefined, ["init"].concat(_toConsumableArray(process.argv.slice(3))));
                    break;
                case "init":
                    _index2.default.apply(undefined, ["init"].concat(_toConsumableArray(process.argv.slice(3))));
                    break;
                default:
                    console.log(_chalk2.default.red("asm command error: no command " + subCommand + " found"));
                    break;
            }
        }
    }).parse(process.argv);
});

/**
 * help 命令
 */
function help() {
    console.log("\r\nUsage:");
    Object.keys(actionMap).forEach(function (action) {
        actionMap[action].usages.forEach(function (usage) {
            console.log(" - " + usage);
        });
    });
}

program.usage("<command> [options]");

// asm -h
program.on("-h", help);
program.on("-help", help);

/**
 * asm 不带参数
 */
if (!process.argv.slice(2).length) {
    program.outputHelp();
}