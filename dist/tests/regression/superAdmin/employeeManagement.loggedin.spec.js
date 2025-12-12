"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const util_1 = require("tests/util");
const EmployeeManagementPage_1 = require("page-objects/EmployeeManagementPage");
const testData_1 = require("tests/data/testData");
test_1.test.describe('Employee Management tests', () => {
    let basePath;
    let employeePage;
    test_1.test.beforeAll(() => {
        basePath = (0, util_1.getEnvironmentBasePath)();
    });
    test_1.test.beforeEach(async ({ page }) => {
        employeePage = new EmployeeManagementPage_1.EmployeePage(page);
        await employeePage.navigateToEmployeePage(basePath);
    });
    (0, test_1.test)('Add Employee with valid data and verify data in table', async ({ page }) => {
        const employeeData = testData_1.testData.employees.basicDetails;
        const addressData = testData_1.testData.employees.addressDetails;
        await employeePage.clickAddEmployee();
        await employeePage.verifyAddEmployeePage();
        await employeePage.fillBasicInformation(employeeData);
        await employeePage.selectGender(testData_1.testData.getRandomGender());
        const selectedRole = testData_1.testData.getRandomRole();
        await employeePage.selectRole(selectedRole);
        await employeePage.selectState(testData_1.testData.getRandomState());
        await employeePage.fillAddressInformation(addressData);
        await employeePage.createEmployeeBtn();
        await employeePage.waitForEmployeeEmailToAppearInTable(employeeData.email);
        await employeePage.verifyEmployeeInTable({
            ...employeeData,
            role: selectedRole,
        });
    });
});
//# sourceMappingURL=employeeManagement.loggedin.spec.js.map