/**
 * create 命令的具体任务
 */
import { changePackageInfo, end, isFileExist, getRepo } from '../utils/create';

// create 命令
export default async function create(projecrName: string): Promise<void> {
  // 判断文件是否已经存在
  isFileExist(projecrName);
  await getRepo(projecrName);
  console.log('xxx');
  // 改写项目的 package.json 基本信息，比如 name、description
  changePackageInfo(projecrName);
  // 结束
  end(projecrName);
}
