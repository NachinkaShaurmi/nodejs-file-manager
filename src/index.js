import commandHandler from './commandHandler.js';
import { failedText, sayCurrentDir, sayHello } from './actions/textCommands.js';
import getUserInfo from './userInfo.js';
import byeAndExit from './actions/byeAndExit.js';

process.on('SIGINT', byeAndExit);

const init = async () => {
    const { argName, homedir } = getUserInfo();
    process.chdir(homedir);

    process.stdout.write(sayHello(argName));
    process.stdout.write(sayCurrentDir(homedir));

    process.stdin.pipe(commandHandler).pipe(process.stdout);
}

init().catch(err => {
    console.error(failedText, err.message);
    process.exit(1);
});