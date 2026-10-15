import path from 'node:path';
import { expect } from '@playwright/test';

export class AddEmployeePage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.middleNameInput = page.getByPlaceholder('Middle Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.employeeIdInput = page
            .locator('.oxd-input-group')
            .filter({ has: page.getByText('Employee Id', { exact: true }) })
            .locator('input');
        this.photoInput = page.locator('input[type="file"]');
        this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
    }

    async createEmployee(firstName, middleName, lastName, jobTitle, employmentStatus, profilePicture, employeeId) {
        await this.firstNameInput.fill(firstName);
        await this.middleNameInput.fill(middleName || '');
        await this.lastNameInput.fill(lastName);
        await this.employeeIdInput.fill(employeeId);

        const imagePath = path.resolve(process.cwd(), profilePicture);
        await this.photoInput.setInputFiles(imagePath);
        await this.saveButton.click();

        await expect(this.page).toHaveURL(/viewPersonalDetails/, { timeout: 60_000 });
        await expect(this.page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
    }

    async getEmployeeNumberFromUrl() {
        const match = this.page.url().match(/empNumber\/(\d+)/);
        if (!match) {
            throw new Error(`Could not extract OrangeHRM empNumber from URL: ${this.page.url()}`);
        }
        return match[1];
    }
}