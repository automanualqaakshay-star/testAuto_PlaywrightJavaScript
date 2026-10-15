import { loadEnv, requireEnv } from './env.js';

loadEnv();

class Config {
    constructor() {
        this.baseURL = requireEnv('BASE_URL');

        this.credentials = {
            username: requireEnv('USERNAME'),
            password: requireEnv('PASSWORD'),
        };
    }
}

export const config = new Config();