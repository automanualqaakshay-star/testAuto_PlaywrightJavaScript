import { expect } from '@playwright/test';

export class DashboardPage {
    constructor(page) {
        this.page = page;
        this.pimMenu = page.getByRole('link', { name: 'PIM' });
        this.userDropdown = page.locator('.oxd-userdropdown-tab');
        this.logoutLink = page.getByRole('menuitem', { name: 'Logout' });
    }

    async openPIM() {
        await this.pimMenu.click();
        await expect(this.page.getByRole('heading', { name: 'PIM' })).toBeVisible();
    }

    async logout() {
        await this.userDropdown.click();
        await this.logoutLink.click();
        await expect(this.page.getByPlaceholder('Username')).toBeVisible();
    }
}