import {expect} from "@playwright/test";
import {config} from "../utils/config.js";


export class LoginPage{
    constructor(page) {
        this.page = page;

        this.userNameTxt = page.locator('[name="username"]')
        this.passwordTxt = page.locator('[name="password"]')
        this.loginBtn = page.locator(`button[type="submit"]`)
        this.loginErrorTxt = page.locator('.oxd-alert-content-text');
    }


    async launchApplicaiton(){
        await this.page.goto(config.baseURL, {waitUntil: 'load'});
        await expect(this.userNameTxt).toBeVisible();
        await expect(this.loginBtn).toBeEnabled();
    }
    async login(username, password) {
        await this.userNameTxt.fill(username);
        await this.passwordTxt.fill(password);
        await this.loginBtn.click();
    }
}``