import { LoginPage } from './LoginPage.js';
import { HomePage } from './HomePage.js';
import { DashboardPage } from './DashboardPage.js';
import { PIMPage } from './PIMPage.js';
import { AddEmployeePage } from './AddEmployeePage.js';
import { EmployeeDetailsPage } from './EmployeeDetailsPage.js';
import { EmployeeListPage } from './EmployeeListPage.js';


export class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        this.dashboardPage = new DashboardPage(page);
        this.pimPage = new PIMPage(page);
        this.addEmployeePage = new AddEmployeePage(page);
        this.employeeDetailsPage = new EmployeeDetailsPage(page);
        this.employeeListPage = new EmployeeListPage(page);

    }

    getLoginPage() {
        return this.loginPage;
    }

    getHomePage() {
        return this.homePage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }
    getPIMPage() {
        return this.pimPage;
    }
    getAddEmployeePage() {
        return this.addEmployeePage;
    }
    getEmployeeDetailsPage() {
        return this.employeeDetailsPage;
    }
    getEmployeeListPage() {
        return this.employeeListPage;
    }
}
