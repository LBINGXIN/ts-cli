import { program } from 'commander';
import create from './order/create';

// 查看版本 ts-cli -v 或 ts-cli --version
/* eslint-disable @typescript-eslint/no-var-requires */
program
  .version(`${require('../package.json').version}`, '-v --version')
  .usage('<command> [options]');

// 创建项目命令 ts-cli create app-name
program
  .command('create <app-name>')
  .description('create a new project')
  .action(async (name: string) => {
    // 创建逻辑
    await create(name);
  });

program.parse(process.argv);
