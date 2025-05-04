import { createReadStream, createWriteStream } from 'fs';
import { mkdir as nodeMkdir, unlink, rename, stat, open } from 'fs/promises';
import { dirname, resolve, join, basename } from 'path';
import { pipeline } from 'stream/promises';

export const cat = async (path) => {
    if (!path) throw new Error();

    const filePath = resolve(process.cwd(), path);
    await stat(filePath);

    return new Promise((resolve, reject) => {
        const stream = createReadStream(filePath);
        stream.pipe(process.stdout);

        stream.on('end', resolve);
        stream.on('error', reject);
    });
};

export const add = async (name) => {
    if (!name) throw new Error();

    const filePath = resolve(process.cwd(), name);

    const handler = await open(filePath, 'wx');
    await handler.close();
};

export const mkdir = async (name) => {
    if (!name) throw new Error();

    const dirPath = resolve(process.cwd(), name);

    await stat(dirPath).catch(async () => await nodeMkdir(dirPath));
};

export const rn = async (path, newName) => {
    if (!path || !newName) throw new Error();

    const oldPath = resolve(process.cwd(), path);
    const newPath = resolve(dirname(oldPath), newName);

    await rename(oldPath, newPath);
};

export const cp = async (filePath, newPath) => {
    if (!filePath || !newPath) throw new Error();

    const srcPath = resolve(process.cwd(), filePath);
    let destPath = resolve(process.cwd(), newPath);

    const srcStat = await stat(srcPath);
    if (!srcStat.isFile()) throw new Error();

    let destStat;
    try {
        destStat = await stat(destPath);
        if (destStat.isDirectory()) destPath = join(destPath, basename(srcPath));
    } catch (err) {
        if (err.code !== 'ENOENT') throw err;
    }

    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(destPath);
    await pipeline(readStream, writeStream);
};

export const rm = async (path) => {
    if (!path) throw new Error();

    const filePath = resolve(process.cwd(), path);
    await unlink(filePath);
};

export const mv = async (src, dest) => {
    await cp(src, dest);
    await rm(src);
};
