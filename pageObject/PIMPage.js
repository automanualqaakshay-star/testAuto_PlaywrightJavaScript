import { expect } from '@playwright/test';

export class PIMPage {
    constructor(page) {
        this.page = page;
        this.addEmployeeLink = page.getByRole('link', { name: 'Add Employee' });
        this.employeeListLink = page.getByRole('link', { name: 'Employee List' });
    }

    async openAddEmployee() {
        await this.addEmployeeLink.click();
        await expect(this.page.getByRole('heading', { name: 'Add Employee' })).toBeVisible();
    }

    async openEmployeeList() {
        await this.employeeListLink.click();
        await expect(this.page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();
    }
}