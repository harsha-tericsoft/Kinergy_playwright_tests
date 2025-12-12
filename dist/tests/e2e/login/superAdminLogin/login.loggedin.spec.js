"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const util_1 = require("tests/util");
const LoginPage_1 = require("page-objects/LoginPage");
const testData_1 = require("tests/data/testData");
test_1.test.describe("Super Amdin Login Tests", () => {
    let loginPage;
    let basePath;
    let userDetails;
    test_1.test.beforeAll(() => {
        basePath = (0, util_1.getEnvironmentBasePath)();
        userDetails = (0, util_1.getEnvironmentUserDetails)(util_1.Roles.SuperAdmin);
    });
    test_1.test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage_1.LoginPage(page);
    });
    test_1.test.skip("should login and assert Dashboard Page", async () => {
        await loginPage.navigateToLogin(basePath);
        await loginPage.login(userDetails.username, userDetails.password);
        await loginPage.verifyLogin();
    });
    test_1.test.skip("should show error for invalid email", async () => {
        await loginPage.navigateToLogin(basePath);
        await loginPage.login(userDetails.username, testData_1.testData.invalidPassword);
        await loginPage.verifyErrorMessage("Invalid login credentials");
    });
    test_1.test.skip("should show error for invalid credentials", async () => {
        await loginPage.navigateToLogin(basePath);
        await loginPage.login(testData_1.testData.invalidUsername, testData_1.testData.invalidPassword);
        await loginPage.verifyErrorMessage("User with the email does not exist");
    });
});
//# sourceMappingURL=login.loggedin.spec.js.map