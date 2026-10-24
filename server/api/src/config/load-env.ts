import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

// Load per-machine secrets without committing them to the repository.
const localEnvPath = resolve(__dirname, '..', '..', '.env.local');

if (!process.env.PRIVATE_KEY && existsSync(localEnvPath)) {
    const contents = readFileSync(localEnvPath, 'utf8').replace(/^\uFEFF/, '');
    const privateKeyLine = contents.match(/^\s*PRIVATE_KEY\s*=\s*(.*?)\s*$/m);
    const privateKey = privateKeyLine?.[1].replace(/^(["'])(.*)\1$/, '$2');

    if (privateKey) {
        process.env.PRIVATE_KEY = privateKey;
    }
}
