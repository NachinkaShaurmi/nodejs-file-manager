import { EOL, cpus, homedir, userInfo, arch } from 'node:os';
import { invalidInputText } from './textCommands.js';

const osInfo = (arg) => {
    switch (arg) {
        case '--EOL':
            process.stdout.write(`EOL: ${JSON.stringify(EOL)}${EOL}`);
            break;

        case '--cpus':
            const cpuInfo = cpus().map(cpu => ({
                model: cpu.model,
                speed: (cpu.speed / 1000).toFixed(2) + ' GHz'
            }));
            process.stdout.write(`Overall amount of CPUS: ${cpuInfo.length}${EOL}`);
            console.table(cpuInfo);
            break;

        case '--homedir':
            process.stdout.write(homedir() + EOL);
            break;

        case '--username':
            process.stdout.write(userInfo().username + EOL);
            break;

        case '--architecture':
            process.stdout.write(arch() + EOL);
            break;

        default:
            process.stdout.write(invalidInputText);
            break;
    }

}

export default osInfo;