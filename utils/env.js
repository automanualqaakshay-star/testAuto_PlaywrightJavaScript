import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadEnv() {
    const envFile = path.resolve(__dirname, '../.env');
    const result = dotenv.config({ path: envFile });

    if (result.error) {
        throw result.error;
    }
}

export function requireEnv(name) {
    const value = process.env[name];

    if (!value || value.trim() === '') {
        throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
}