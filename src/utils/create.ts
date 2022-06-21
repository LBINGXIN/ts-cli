/**
 * create 命令需要用到的所有方法
 */
import {
  getProjectPath,
  PackageJSON,
  printMsg,
  readJsonFile,
  writeJsonFile,
  wrapLoading,
} from '../utils/common';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { cyan, gray, red, yellow } from 'chalk';
import { promisify } from 'util';
import * as downloadGitRepo from 'download-git-repo';
const download = promisify(downloadGitRepo);

/**
 * 验证当前目录下是否已经存在指定文件，如果存在则退出进行
 * @param filename 文件名
 */
export function isFileExist(filename: string): void {
  // 文件路径
  const file = getProjectPath(filename);
  // 验证文件是否已经存在，存在则推出进程
  if (existsSync(file)) {
    printMsg(red(`${file} 已经存在`));
    process.exit(1);
  }
}

export async function getRepo(projectName: string): Promise<void> {
  const requestUrl = `LBINGXIN/ts-cli-template`;
  await wrapLoading(
    download, // 远程下载方法
    'waiting download template', // 加载提示信息
    requestUrl, // 参数1: 下载地址
    resolve(process.cwd(), projectName),
  );
}

/**
 * 改写项目中 package.json 的 name、description
 */
export function changePackageInfo(projectName: string): void {
  const packagePath = resolve(getProjectPath(projectName), './package.json');
  const packageJSON: PackageJSON = readJsonFile<PackageJSON>(packagePath);
  packageJSON.name = packageJSON.description = projectName;
  writeJsonFile<PackageJSON>(packagePath, packageJSON);
}

/**
 * 整个项目安装结束，给用户提示信息
 */
export function end(projectName: string): void {
  printMsg(`Successfully created project ${yellow(projectName)}`);
  printMsg('Get started with the following commands:');
  printMsg('');
  printMsg(`${gray('$')} ${cyan('cd ' + projectName)}`);
  printMsg(`${gray('$')} ${cyan('npm run dev')}`);
  printMsg('');
}
