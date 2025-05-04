import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import { EOL } from 'os';

const calcHash = async (path) => {
    if (!path) throw new Error();

    const hash = createHash('sha256');
    const filePath = resolve(process.cwd(), path);
    const stream = createReadStream(filePath);

    return new Promise((resolve, reject) => {
        stream.pipe(hash);

        hash.on('finish', () => {
            process.stdout.write(hash.digest('hex') + EOL);
            resolve();
        });

        stream.on('error', reject);
    });
};

export default calcHash