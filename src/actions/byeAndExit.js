import { exit } from 'node:process';
import getUserInfo from '../userInfo.js';
import { sayBye } from './textCommands.js';

const byeAndExit = () => {
    const { argName } = getUserInfo();

    process.stdout.write(sayBye(argName));
    exit();
}

export default byeAndExit;
