import { expect } from '@playwright/test';

export class EmployeeDetailsPage {
    constructor(page) {
        this.page = page;
        this.jobTab = page.getByRole('tab', { name: 'Job' });
    }

    async openJobTab() {
        await this.jobTab.click();
        await expect(this.page.getByText('Job Title', { exact: true })).toBeVisible();
    }

    async chooseDropdownValue(label, value) {
        const dropdown = this.page
            .locator('.oxd-input-group')
            .filter({ has: this.page.getByText(label, { exact: true }) })
            .locator('.oxd-select-text');

        await dropdown.click();
        await this.page.getByRole('option', { name: value, exact: true }).click();
    }

    async updateJobInformation(jobTitle, employmentStatus) {
        await this.openJobTab();
        await this.chooseDropdownValue('Job Title', jobTitle);
        await this.chooseDropdownValue('Employment Status', employmentStatus);
        await this.page.getByRole('button', { name: 'Save', exact: true }).last().click();
        await expect(this.page.getByText('Job Title', { exact: true })).toBeVisible();
    }

    async expectJobInformationVisible(jobTitle, employmentStatus) {
        await expect(this.page.getByText(jobTitle, { exact: true })).toBeVisible();
        await expect(this.page.getByText(employmentStatus, { exact: true })).toBeVisible();
    }
}