import { EOL } from 'node:os';

export const sayHello = (name) => `Welcome to the File Manager, ${name}!${EOL}`;

export const sayBye = (name) => `\nThank you for using File Manager, ${name}, goodbye!${EOL}`;

export const sayCurrentDir = (dir) => `\nYou are currently in ${dir}${EOL}`;

export const invalidInputText = `Invalid input${EOL}`;

export const failedText = `Operation failed${EOL}`;