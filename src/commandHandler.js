import { homedir, EOL } from 'node:os';
import { Transform } from 'node:stream';
import { invalidInputText, sayCurrentDir } from './actions/textCommands.js';
import byeAndExit from './actions/byeAndExit.js';

const onCommand = async (command) => {
    switch (command) {
        case '.exit':
            byeAndExit();

            break;

        default: process.stdout.write(invalidInputText);
    }

    process.stdout.write(sayCurrentDir(homedir()));
}

export default new Transform({
    async transform(chunk, encoding, callback) {
        const normalizedCommand = chunk.toString().replace(EOL, '').trim();
        await onCommand(normalizedCommand);
        callback();
    },
});