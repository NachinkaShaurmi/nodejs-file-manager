import { sayCurrentDir, sayHello } from './textCommands.js';
import getUserInfo from './userInfo.js';

const init = async () => {
    const { argName, homedir } = getUserInfo();

    process.stdout.write(sayHello(argName));
    process.stdout.write(sayCurrentDir(homedir));
}

init().catch(err => {
    console.error('Operation failed:', err.message);
    process.exit(1);
});