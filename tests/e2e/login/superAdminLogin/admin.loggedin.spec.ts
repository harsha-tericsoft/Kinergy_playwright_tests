import { test, expect } from "@playwright/test";
import {
  getEnvironmentBasePath,
  getEnvironmentUserDetails,
  Roles,
} from "tests/util";
import { LoginPage } from "page-objects/LoginPage";
import { testData } from "tests/data/testData";
import { STORAGE_STATE_ADMIN } from "playwright.config";
import fs from "fs";
import path from "path";

/**
 * Admin Login Tests
 * This test logs in and saves the authentication state.
 * Other tests (like client.spec.ts) will automatically use this saved state
 * and won't need to login again.
 */
test.describe("Super Admin Login Tests", () => {
  let loginPage: LoginPage;
  let basePath: string;
  let userDetails: { username: string; password: string };

  // Initialize constants
  test.beforeAll(() => {
    basePath = getEnvironmentBasePath();
    userDetails = getEnvironmentUserDetails(Roles.Admin);
  });

  // Initialize the Page Object before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test.only("should login and save authentication state for other tests", async ({ page, context }) => {
    // This test performs login and saves the authentication state
    // Other tests (like client.spec.ts) will automatically use this saved state
    console.log("🔄 Performing login and saving authentication state...");
    
    await loginPage.navigateToLogin(basePath);
    await loginPage.login(userDetails.username, userDetails.password);
    
    // Wait for navigation to dashboard
    await page.waitForLoadState("networkidle");
    const currentUrl = page.url();
    
    // Handle OTP verification redirect if needed
    if (currentUrl.includes("/email-otp-verification")) {
      await page.waitForURL(
        (url: URL) => url.pathname.includes("/dashboard"),
        { timeout: 30000, waitUntil: "networkidle" }
      );
    } else if (!currentUrl.includes("/dashboard")) {
      await page.goto(`${basePath}/dashboard`);
      await page.waitForLoadState("networkidle");
    }

    // Ensure directory exists
    const stateDir = path.dirname(STORAGE_STATE_ADMIN);
    if (!fs.existsSync(stateDir)) {
      fs.mkdirSync(stateDir, { recursive: true });
    }

    // Save authentication state for other tests to use
    await context.storageState({ path: STORAGE_STATE_ADMIN });
    console.log(`✅ Authentication state saved to ${STORAGE_STATE_ADMIN}`);
    
    // Verify we're on dashboard
    const finalUrl = page.url();
    expect(finalUrl).toContain("/dashboard");
    expect(finalUrl).not.toContain("/login");
    expect(finalUrl).not.toContain("/email-otp-verification");
  });

  test.skip("should show error for invalid email", async () => {
    await loginPage.navigateToLogin(basePath);
    await loginPage.login(userDetails.username, testData.invalidPassword);
    // await loginPage.verifyErrorMessage("Invalid login credentials");
  });

  test.skip("should show error for invalid credentials", async () => {
    await loginPage.navigateToLogin(basePath);
    await loginPage.login(testData.invalidUsername, testData.invalidPassword);
    // await loginPage.verifyErrorMessage("User with the email does not exist");
  });
});
