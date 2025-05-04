import { EOL } from 'node:os';
import { Transform } from 'node:stream';
import { failedText, invalidInputText, sayCurrentDir } from './actions/textCommands.js';
import byeAndExit from './actions/byeAndExit.js';
import { up, cd, ls } from './actions/navigation.js';
import { cat, add, mkdir, rn, cp, mv, rm } from './actions/files.js';
import osInfo from './actions/os.js';
import calcHash from './actions/hash.js';

const onCommand = async (command) => {
    switch (command[0]) {
        case '.exit':
            byeAndExit();
            break;

        case 'up':
            up();
            break;

        case 'cd':
            await cd(command[1]);
            break;

        case 'ls':
            await ls();
            break;

        case 'cat':
            await cat(command[1]);
            break;

        case 'add':
            await add(command[1]);
            break;

        case 'mkdir':
            await mkdir(command[1]);
            break;

        case 'rn':
            await rn(command[1], command[2]);
            break;

        case 'cp':
            await cp(command[1], command[2]);
            break;

        case 'mv':
            await mv(command[1], command[2]);
            break;

        case 'rm':
            await rm(command[1]);
            break;

        case 'os':
            osInfo(command[1]);
            break;

        case 'hash':
            await calcHash(command[1]);
            break;

        default:
            process.stdout.write(invalidInputText);
    }

    process.stdout.write(sayCurrentDir(process.cwd()));
}

export default new Transform({
    async transform(chunk, encoding, callback) {
        const normalizedCommand = chunk.toString().replace(EOL, '').trim().split(/\s+/);
        try {
            await onCommand(normalizedCommand);
        } catch (error) {
            process.stdout.write(failedText);
            process.stdout.write(`${error.message}${EOL}`);
            process.stdout.write(sayCurrentDir(process.cwd()));
        }
        callback();
    },
});