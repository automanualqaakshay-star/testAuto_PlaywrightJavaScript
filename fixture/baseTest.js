import {test as base, expect} from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { POManager } from '../pageObject/POManager.js';
import { config } from '../utils/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @typedef{object} TestFixtures
 * @property {import('@playwright/test').Page} page
 * @property {import('@playwright/test').BrowserContext} context
 * @property {import('@playwright/test').Browser} browser
 */

export const test = base.extend({
    openHRM: async ({browser}, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        const poManager = new POManager(page);
        await use({
            browser,
            page,
            context,
            poManager,
            loginPage: poManager.getLoginPage(),
            homePage: poManager.getHomePage()
        });
        await context.close();
    }
});
export { expect };
