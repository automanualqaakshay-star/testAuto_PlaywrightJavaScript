import {expect, test} from '../fixture/baseTest.js';
import empData from '../testData/empData.json' with {type: 'json'};
import {config} from '../utils/config.js';


const testType = process.env.TEST_TYPE;
const filteredEmpData = empData.filter((data) => {
    return !testType || data.testType === testType;
});

for (const data of filteredEmpData) {
    test(`Login Test End To End - ${data.description}`, async ({openHRM}) => {

        /**
         * @page: {import('@playwright/test').Page}
         * @context: {import('@playwright/test').BrowserContext}
         * loginPage: {import('../pageObject/LoginPage.js').LoginPage}
         * poManager: {import('../pageObject/POManager.js').POManager}
         */

        const {
            page,
            loginPage,
            addEmployeePage,
            dashboardPage,
            employeeListPage,
            pimPage,
            employeeDetailsPage
        } = openHRM;

        await loginPage.launchApplicaiton();
        await loginPage.login(config.credentials.username, config.credentials.password);
        await expect(page).toHaveURL(/\/web\/index\.php\/dashboard\/index$/);
        await dashboardPage.openPIM();
        await pimPage.openAddEmployee();
        //Random Emplyoee id
        const employeeID = `Auto${Math.floor(1000 + Math.random() * 10000)}`;
        await addEmployeePage.createEmployee(data.firstName, data.middleName, data.lastName, data.jobTitle, data.employmentStatus, data.profilePicture, employeeID);
        let empNumber = await addEmployeePage.getEmployeeNumberFromUrl();
        await expect(addEmployeePage.employeeIdInput).toHaveValue(employeeID);
        await dashboardPage.openPIM();
        await pimPage.openEmployeeList();
        await employeeListPage.openEmployee(employeeID);
        await employeeDetailsPage.updateJobInformation(data.jobTitle, data.employmentStatus);
        await employeeDetailsPage.expectJobInformationVisible(data.jobTitle, data.employmentStatus);
        // API validation: Get employee details
        const apiRequest = page.context().request;
        const response = await apiRequest.get(`${config.baseURL}/web/index.php/api/v2/pim/employees/${empNumber}`,
            {headers: {Accept: 'application/json'}});
        await expect(response).toBeOK()
        const body = await response.json();
        console.log('Employee API response:', body);
        const employee = body.data ?? body;
        console.log(employee);
        expect(employee.employeeId).toBe(employeeID);
        expect(employee.firstName).toBe(data.firstName);
        expect(employee.lastName).toBe(data.lastName);

        const jobResponse = await page.context().request.get(
            `${config.baseURL}/web/index.php/api/v2/pim/employees/${empNumber}/job-details`,
            {
                headers: {Accept: 'application/json'}
            }
        );
        await expect(jobResponse).toBeOK();
        const jobBody = await jobResponse.json();
        const job = jobBody.data ?? jobBody;
        const apiJobTitle = typeof job.jobTitle === 'object' ? job.jobTitle?.title
            : job.jobTitle;
        const status = job.empStatus ?? job.employmentStatus;
        const apiEmploymentStatus = typeof status === 'object'
            ? status?.name ?? status?.label
            : status;

        expect(apiJobTitle).toBe(data.jobTitle);
        expect(apiEmploymentStatus).toBe(data.employmentStatus);

        await dashboardPage.openPIM();
        await pimPage.openEmployeeList();
        await employeeListPage.deleteEmployee(employeeID);
        //Pull API call call after Delete
        const deletedResponse = await page.context().request.get(`${config.baseURL}/web/index.php/api/v2/pim/employees/${empNumber}`,
            {
                headers: {Accept: 'application/json'}
            }
        );
        const deletedStatus = deletedResponse.status();
        if (deletedStatus === 404) {
            expect(deletedStatus).toBe(404);
        } else if (deletedStatus === 200) {
            const deletedBody = await deletedResponse.json();
            const deletedData = deletedBody.data ?? deletedBody;
            expect(deletedData?.employeeId, 'Deleted employee should not exist in the API response').not.toBe(employeeId);
        } else if (deletedStatus === 422) {
            const deletedBody = await deletedResponse.json();
            expect(deletedBody.error?.message).toBe('Invalid Parameter');
            expect(deletedBody.error?.data?.invalidParamKeys).toContain('empNumber');
        } else {
            throw new Error(`Unexpected API status after deletion: ${deletedStatus}`);
        }
        await dashboardPage.logout();
        await page.goto('/web/index.php/pim/viewEmployeeList');
        await expect(page.getByPlaceholder('Username')).toBeVisible();
    });

}