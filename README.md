# Playwright JavaScript Test Framework

An end-to-end test framework for OpenHRM, built with Playwright Test and JavaScript. The sample flow logs in, creates an employee, updates and verifies job information in the UI and through the API, deletes the employee, and verifies logout.

## Setup

### Requirements

- Node.js and npm
- An accessible OpenHRM instance and a user account with permissions to manage employees

### Install

From the repository root, install the project dependencies and the Chromium browser used by the Playwright configuration:

```bash
npm ci
npx playwright install chromium
```

Create a `.env` file in the repository root with the connection details for your OpenHRM instance:

```dotenv
BASE_URL=https://your-openhrm-instance
USERNAME=your-username
PASSWORD=your-password
```

The application configuration loads these values from `.env` and exits with an error if any are missing. Keep real credentials private and do not commit `.env`.

## Framework structure

```text
.
├── api/
│   └── EmployeeApiClient.js       # Employee and job-details API helper
├── fixture/
│   └── baseTest.js                # Custom openHRM fixture and shared expect
├── pageObject/
│   ├── AddEmployeePage.js
│   ├── DashboardPage.js
│   ├── EmployeeDetailsPage.js
│   ├── EmployeeListPage.js
│   ├── LoginPage.js
│   ├── PIMPage.js
│   └── POManager.js               # Creates and exposes page objects
├── testData/
│   ├── empData.json               # Employee scenario data
│   └── TestImage.png              # Profile image used by the scenario
├── tests/
│   └── LoginTest.spec.js          # End-to-end employee lifecycle test
├── utils/
│   ├── config.js                  # Validated application URL and credentials
│   └── env.js                     # Loads required values from the root .env
├── .github/
│   └── workflows/
│       └── playwright.yml         # GitHub Actions workflow
├── playwright.config.js           # Playwright test runner configuration
├── package.json                   # Project metadata and dependencies
└── package-lock.json              # Locked npm dependency versions
```

The project uses JavaScript ES modules. Playwright discovers tests in `tests/` and runs the configured Chromium project in headed mode with the HTML reporter. `LoginTest.spec.js` makes its employee API checks directly through Playwright's request context; `api/EmployeeApiClient.js` contains a separate reusable API helper.

## Run the tests

Run all tests:

```bash
npx playwright test
```

Run the end-to-end spec directly:

```bash
npx playwright test tests/LoginTest.spec.js
```

After a run, open the HTML report with:

```bash
npx playwright show-report
```

The test data file is `testData/empData.json`. The test also supports filtering its records with the `TEST_TYPE` environment variable when records have a matching `testType` field.

## Dependencies

- `@playwright/test` — browser automation and test runner.
- `playwright` — browser automation runtime installed with `@playwright/test`.
- `dotenv` — loads the local `.env` configuration.
- `@types/node` — Node.js type definitions used by editor tooling.
