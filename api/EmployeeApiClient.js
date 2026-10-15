class EmployeeApiClient {
    constructor(request) {
        this.request = request;
    }

    async getEmployee(empNumber) {
        return this.request.get(`/web/index.php/api/v2/pim/employees/${empNumber}`, {headers: {Accept: 'application/json'},});
    }

    async getJobDetails(empNumber) {
        return this.request.get(`/web/index.php/api/v2/pim/employees/${empNumber}/job-details`, {headers: {Accept: 'application/json'},});
    }

    async getEmployeeJson(empNumber) {
        const response = await this.getEmployee(empNumber);
        if (!response.ok()) {
            const body = await response.text();
            throw new Error(`Employee GET API failed: HTTP ${response.status()}. Response: ${body}`);
        }
        return response.json();
    }

    async getJobDetailsJson(empNumber) {
        const response = await this.getJobDetails(empNumber);
        if (!response.ok()) {
            const body = await response.text();
            throw new Error(`Job-details GET API failed: HTTP ${response.status()}. Response: ${body}`);
        }
        return response.json();
    }
}