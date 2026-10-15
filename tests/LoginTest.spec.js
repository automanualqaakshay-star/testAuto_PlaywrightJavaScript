import {expect, test} from '../fixture/baseTest.js';
import empData from '../testData/empData.json' with { type: 'json' };
import { config } from '../utils/config.js';


const testType = process.env.TEST_TYPE;
const filteredEmpData = empData.filter((data) => {
    return !testType || data.testType === testType;
});

for (const data of filteredEmpData) {
    test(`Login Test End To End - ${data.description}`, async ({ openHRM }) => {

        /**
         * @page: {import('@playwright/test').Page}
         * @context: {import('@playwright/test').BrowserContext}
         * loginPage: {import('../pageObject/LoginPage.js').LoginPage}
         * homePage: {import('../pageObject/HomePage.js').HomePage}
         * poManager: {import('../pageObject/POManager.js').POManager}
         *
         */

        const {page, poManager, loginPage, homePage} = openHRM;

        await loginPage.launchApplicaiton();
        await loginPage.login(config.credentials.username, config.credentials.password);
       // await homePage.verifyLoginSuccess();
    });

}