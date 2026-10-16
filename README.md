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

| Path | Purpose |
| --- | --- |
| `tests/` | Playwright test specifications. `LoginTest.spec.js` contains the end-to-end employee-management flow. |
| `pageObject/` | Page Object Model classes for login, dashboard, PIM, and employee pages; `POManager.js` provides access to them. |
| `fixture/` | Custom Playwright fixture that creates the page and exposes the page objects to tests. |
| `api/` | Employee API client helpers for retrieving employee and job details. |
| `testData/` | JSON test data and assets, including the employee profile image. |
| `utils/` | Environment loading and application configuration. |
| `playwright.config.js` | Test discovery, Chromium project, browser settings, retries, and HTML reporter configuration. |
| `.github/workflows/` | GitHub Actions workflow configuration. |

The project uses JavaScript ES modules. Tests are discovered under `tests/`; Playwright is configured to run them in Chromium in headed mode and generate an HTML report.

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
