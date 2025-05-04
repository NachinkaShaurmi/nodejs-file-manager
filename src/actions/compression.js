import { resolve } from 'path';
import { pipeline } from 'stream/promises';
import { stat } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

const fileHandler = async (src, destination, compress) => {
    if (!src || !destination) throw new Error();

    const srcPath = resolve(process.cwd(), src);
    const destPath = resolve(process.cwd(), destination);

    await stat(srcPath);

    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(destPath);
    const brotli = compress();

    await pipeline(readStream, brotli, writeStream);
}

export const compress = async (src, destination) => await fileHandler(src, destination, createBrotliCompress);

export const decompress = async (src, destination) => await fileHandler(src, destination, createBrotliDecompress);