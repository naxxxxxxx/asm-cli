import {downloadLocal} from "./utils/get";
import ora from "ora";
import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";
import symbol from "log-symbols";
import {exec} from "child_process";

const init = async (templateName, projectName) => {
    //项目不存在
    if (!fs.existsSync(projectName)) {
        //命令行交互
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "type",
                    message: "选择你的项目模板类型",
                    default: 0,
                    choices: [
                        {
                            value: "server-redirect",
                            name: "后端项目(只含中转服务:Koa2+Axios)"
                        },
                        {
                            value: "full-admin",
                            name: "后台项目模板(前后端同项目:Umi+AntDesign+Koa2+Redis+Mysql)"
                        },
                        {
                            value: "full-admin-redirect",
                            name: "后台项目模板(包含服务端中转:Umi+AntDesign+Koa2+Axios)"
                        },
                        {
                            value: "client-admin",
                            name: "后台项目模板(纯前端:Umi+AntDesign)"
                        },
                        {
                            value: "full-project",
                            name: "项目模板(前后端同项目:Umi+AntDesign+Koa2+Redis+Mysql))"
                        },
                        {
                            value: "full-project-redirect",
                            name: "项目模板(包含服务端中转:Umi+AntDesign+Koa2+Axios)"
                        },
                        {
                            value: "client-project",
                            name: "项目模板(纯前端:Umi+AntDesign)"
                        },
                    ]
                },
                {
                    name: "name",
                    message: "请输入项目名称(小写): ",
                },
                {
                    name: "description",
                    message: "请输入项目描述: ",
                },
                {
                    name: "author",
                    message: "请填写项目作者: ",
                },
                {
                    name: "autoInstall",
                    type: "confirm",
                    message: "是否自动安装依赖: ",
                },
            ])
            .then(async (answer) => {
                //下载模板 选择模板
                const {type, name, description, author, autoInstall} = answer;
                //通过配置文件，获取模板信息
                let loading = ora("正在下载模板 ...");
                loading.start();

                await downloadLocal(type, name || type).then(
                    () => {
                        loading.succeed();
                        try {
                            const fileName = `${name || type}/package.json`;
                            if (fs.existsSync(fileName)) {
                                const data = fs.readFileSync(fileName).toString();
                                let json = JSON.parse(data);
                                json.name = name || type;
                                json.author = author;
                                json.description = description;
                                //修改项目文件夹中 package.json 文件
                                fs.writeFileSync(
                                    fileName,
                                    JSON.stringify(json, null, "\t"),
                                    "utf-8"
                                );

                                console.log(
                                    symbol.success,
                                    chalk.green("项目模板下载完成!")
                                );

                                let install = ora();
                                if (autoInstall) {
                                    install.start("开始安装依赖");
                                    exec(`cd ${name || type} && yarn install`, (err, stdout, stderr) => {
                                        if (err) {
                                            console.log(err);
                                            install.fail("依赖安装失败，您可以进入文件夹后手动执行 " + chalk.blue('yarn install'));
                                            return false
                                        }
                                        install.succeed("依赖安装成功，您可以进入文件夹使用 " + chalk.blue("yarn start") + " 命令启动项目");
                                    })
                                } else {
                                    install.succeed("您可以进入文件夹使用 " + chalk.blue("yarn install") + " 安装依赖，然后使用 " + chalk.blue("yarn install") + " 启动项目");
                                }
                            } else {
                                loading.fail("未找到相关依赖描述文件");
                            }
                        } catch (e) {
                            console.log("err", e);
                        }
                    }
                ).catch((err) => {
                    loading.fail("下载模板失败，请检查网络或是否存在对应项目模板");
                });
            });
    } else {
        //项目已经存在
        console.log(symbol.error, chalk.red("项目已存在"));
    }
};

module.exports = init