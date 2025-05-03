import { argv } from 'node:process';
import os from 'node:os';

const nameRegExp = /^--username=/;

export default function getUserInfo() {
  const { username, homedir } = os.userInfo();
  const name = argv.find((e) => nameRegExp.test(e))?.split('=')[1] ?? '';

  return { argName: name, systemName: username, homedir };
}