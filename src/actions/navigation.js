import { resolve, dirname } from 'node:path';
import { stat, readdir } from 'node:fs/promises';

export const up = () => {
    const parentDir = dirname(process.cwd());

    if (parentDir !== process.cwd()) process.chdir(parentDir);
}

export const cd = async (path) => {
    if (!path) throw new Error();

    const newDir = resolve(process.cwd(), path);

    const stats = await stat(newDir);
    if (!stats.isDirectory()) throw new Error();

    process.chdir(newDir);
}

export const ls = async () => {
    const files = await readdir(process.cwd(), { withFileTypes: true });
    const folders = [];
    const filesList = [];

    for (const file of files) {
        const type = file.isDirectory() ? 'directory' : 'file';
        (file.isDirectory() ? folders : filesList).push({ Name: file.name, Type: type });
    }

    const sortedFolders = folders.sort((a, b) => a.Name.localeCompare(b.Name));
    const sortedFiles = filesList.sort((a, b) => a.Name.localeCompare(b.Name));
    console.table([...sortedFolders, ...sortedFiles]);
}