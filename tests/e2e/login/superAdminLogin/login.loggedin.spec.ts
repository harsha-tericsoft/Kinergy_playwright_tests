import { test } from "@playwright/test";
import {
  getEnvironmentBasePath,
  getEnvironmentUserDetails,
  Roles,
} from "tests/util";
import { LoginPage } from "page-objects/LoginPage";
import { testData } from "tests/data/testData";

test.describe("Super Amdin Login Tests", () => {
  let loginPage: LoginPage;
  let basePath: string;
  let userDetails: { username: string; password: string };

  // Initialize constants
  test.beforeAll(() => {
    basePath = getEnvironmentBasePath();
    userDetails = getEnvironmentUserDetails(Roles.SuperAdmin);
  });

  // Initialize the Page Object before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test.skip("should login and assert Dashboard Page", async () => {
    await loginPage.navigateToLogin(basePath);
    await loginPage.login(userDetails.username, userDetails.password);
    await loginPage.verifyLogin();
  });

  test.skip("should show error for invalid email", async () => {
    await loginPage.navigateToLogin(basePath);
    await loginPage.login(userDetails.username, testData.invalidPassword);
    await loginPage.verifyErrorMessage("Invalid login credentials");
  });

  test.skip("should show error for invalid credentials", async () => {
    await loginPage.navigateToLogin(basePath);
    await loginPage.login(testData.invalidUsername, testData.invalidPassword);
    await loginPage.verifyErrorMessage("User with the email does not exist");
  });
});
