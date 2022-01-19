import { resolve } from "path";

export const root = resolve(__dirname, '..', '..', '..', '..');
export const buildRoot = resolve(__dirname, '..', '..', '..');
export const eventDir = resolve(buildRoot, 'src','events');
export const commandDir = resolve(buildRoot, 'src', 'commands');
