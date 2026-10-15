import { expect } from '@playwright/test';

export class EmployeeListPage {
    constructor(page) {
        this.page = page;
        this.employeeIdSearch = page
            .locator('.oxd-input-group')
            .filter({ has: page.getByText('Employee Id', { exact: true }) })
            .locator('input');
        this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
        this.deleteButton = page.getByRole('button', { name: /Delete Selected/ });
    }

    async searchByEmployeeId(employeeId) {
        await this.employeeIdSearch.fill(employeeId);
        await this.searchButton.click();

        const row = this.page.getByRole('row').filter({ hasText: employeeId });
        await expect(row).toBeVisible();
        return row;
    }

    async openEmployee(employeeId) {
        const row = await this.searchByEmployeeId(employeeId);
        await row.click();
        await expect(this.page).toHaveURL(/viewPersonalDetails/);
    }

    async deleteEmployee(employeeId) {
        const row = await this.searchByEmployeeId(employeeId);
        const rowCheckbox = row.getByRole('checkbox');

        await row.locator('.oxd-checkbox-input').click();
        await expect(rowCheckbox).toBeChecked();
        await this.deleteButton.click();

        const confirmDeleteButton = this.page.getByRole('button', { name: /Yes, Delete/i });
        await expect(confirmDeleteButton).toBeVisible();
        await confirmDeleteButton.click();
        await expect(this.page.getByRole('row').filter({ hasText: employeeId })).toHaveCount(0);
    }
}