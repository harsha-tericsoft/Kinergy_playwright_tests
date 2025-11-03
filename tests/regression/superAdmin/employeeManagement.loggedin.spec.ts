import { test } from '@playwright/test';
import { getEnvironmentBasePath } from 'tests/util';
import { EmployeePage } from 'page-objects/EmployeeManagementPage';
import { testData } from 'tests/data/testData';

test.describe('Employee Management tests', () => {
    let basePath: string;
    let employeePage: EmployeePage;

    // Set up environment base path
    test.beforeAll(() => {
        basePath = getEnvironmentBasePath();
    });

    test.beforeEach(async ({ page }) => {
        employeePage = new EmployeePage(page);
        await employeePage.navigateToEmployeePage(basePath);

    });

    test('Add Employee with valid data and verify data in table', async ({ page }) => {
        const employeeData = testData.employees.basicDetails;
        const addressData = testData.employees.addressDetails;
        await employeePage.clickAddEmployee();
        await employeePage.verifyAddEmployeePage();
        await employeePage.fillBasicInformation(employeeData);
        await employeePage.selectGender(testData.getRandomGender());

        const selectedRole = testData.getRandomRole();
        await employeePage.selectRole(selectedRole);

        await employeePage.selectState(testData.getRandomState());
        await employeePage.fillAddressInformation(addressData);
        await employeePage.createEmployeeBtn();
        await employeePage.waitForEmployeeEmailToAppearInTable(employeeData.email);

        await employeePage.verifyEmployeeInTable({
            ...employeeData,
            role: selectedRole,
        });

    });
});