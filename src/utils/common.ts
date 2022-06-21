/**
 * 放一些通用的工具方法
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import * as clear from 'clear-console';
import * as ora from 'ora';

// 添加加载动画
export const wrapLoading = async (fn, message, ...args) => {
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora(message);
  // 开始加载动画
  spinner.start();

  try {
    // 执行传入方法 fn
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    return result;
  } catch (error) {
    // 状态为修改为失败
    spinner.fail('failed ...');
  }
};

export interface PackageJSON {
  name: string;
  version: string;
  description: string;
  scripts: {
    [key: string]: string;
  };
}

export interface JSON {
  [key: string]: unknown;
}

/**
 * 读取指定路径下 json 文件
 * @param filename json 文件的路径
 */
export function readJsonFile<T>(filename: string): T {
  return JSON.parse(readFileSync(filename, { encoding: 'utf-8', flag: 'r' }));
}

/**
 * 覆写指定路径下的 json 文件
 * @param filename json 文件的路径
 * @param content  json 内容
 */
export function writeJsonFile<T>(filename: string, content: T): void {
  writeFileSync(filename, JSON.stringify(content, null, 2));
}

/**
 * 获取项目绝对路径
 * @param projectName 项目名
 */
export function getProjectPath(projectName: string): string {
  return resolve(process.cwd(), projectName);
}

/**
 * 打印信息
 * @param msg 信息
 */
export function printMsg(msg: string): void {
  console.log(msg);
}

/**
 * 清空命令行
 */
export function clearConsole(): void {
  clear();
}
