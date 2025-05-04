import { EOL } from 'node:os';
import { Transform } from 'node:stream';
import { failedText, invalidInputText, sayCurrentDir } from './actions/textCommands.js';
import byeAndExit from './actions/byeAndExit.js';
import { up, cd, ls } from './actions/navigation.js';

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
            process.stdout.write(error);
            process.stdout.write(sayCurrentDir(process.cwd()));
        }
        callback();
    },
});