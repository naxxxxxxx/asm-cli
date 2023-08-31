const {Command} = require('commander');
import chalk from "chalk";
import apply from "./index";
import {VERSION, NAME, DESC} from "./utils/constants";

const program = new Command();

program.name(NAME).description(DESC).version(VERSION);

/**
 * asm commands
 * - generate
 * - config
 */
let actionMap = {
    install: {
        alias: "i",
        description: "从模板中生成新的项目 " + chalk.blue("asm install <templateName> <projectName>"),
        usages: [
            "asm install <templateName> <projectName>",
        ],
    },

};

/**
 * 添加 install/config命令
 */
Object.keys(actionMap).forEach(action => {
    program
        .command(action)
        .description(actionMap[action].description)
        .action(() => {
            const actionArr = process.argv.slice(2);
            if (actionArr && actionArr.length > 0) {
                const subCommand = actionArr[0];
                switch (subCommand) {
                    case "install":
                        if (actionArr.length < 2) {
                            console.log(chalk.red("请输入模板名称"));
                            return false;
                        } else if (actionArr.length < 3) {
                            console.log(chalk.red("请输入要生成的目标文件夹名称"));
                            return false;
                        } else {
                            apply(subCommand, ...process.argv.slice(3));
                        }
                        break;
                    default:
                        break;
                }
            }
        })
        .parse(process.argv);
});

/**
 * help 命令
 */
function help() {
    console.log("\r\nUsage:");
    Object.keys(actionMap).forEach((action) => {
        actionMap[action].usages.forEach((usage) => {
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
