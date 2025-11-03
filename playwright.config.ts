import { defineConfig, devices } from "@playwright/test";
import * as path from "path";
import { getEnvironment } from "tests/util";

// Dynamically fetch environment and corresponding storage state
const ENV = getEnvironment(); // Gets 'staging', 'dev', etc.

// Define separate storage states for each role
export const STORAGE_STATE_AMF = path.join(
  __dirname,
  `playwright/.auth/${ENV}.amf.json`
);
export const STORAGE_STATE_AMS = path.join(
  __dirname,
  `playwright/.auth/${ENV}.ams.json`
);
export const STORAGE_STATE_SUPER_ADMIN = path.join(
  __dirname,
  `playwright/.auth/${ENV}.superAdmin.json`
);
export const STORAGE_STATE_TOKEN = path.join(
  __dirname,
  `playwright/.auth/${ENV}.apiToken.json`
);

export default defineConfig({
  timeout: 60000,
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: false,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use */
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["blob", { outputDir: "blob-report" }],
  ],
  /* Shared settings for all projects */
  use: {
    /* Collect trace when retrying failed tests */
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      testMatch: /global\.setup\.ts/,
    },
    {
      name: "api tests",
      testDir: "./tests/api",
      testMatch: "**/*.spec.ts",
      dependencies: ["setup"],
      use: {
        headless: true,
        storageState: STORAGE_STATE_TOKEN,
      },
    },
    {
      name: "regression AMF",
      testDir: "./tests/regression",
      testMatch: "**/amf*/*.loggedin.spec.ts",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: STORAGE_STATE_AMF,
      },
    },
    {
      name: "regression AMS",
      testDir: "./tests/regression",
      testMatch: "**/ams*/*.loggedin.spec.ts",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: STORAGE_STATE_AMS,
      },
    },
    {
      name: "regression super admin",
      testDir: "./tests/regression",
      testMatch: "**/superAdmin*/**/*.loggedin.spec.ts",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: STORAGE_STATE_SUPER_ADMIN,
      },
    },
    {
      name: "e2e AMF",
      testDir: "./tests/e2e",
      testMatch: "**/amf*/*.loggedin.spec.ts",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: STORAGE_STATE_AMF,
      },
    },
    {
      name: "e2e AMS",
      testDir: "./tests/e2e",
      testMatch: "**/ams*/*.loggedin.spec.ts",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: STORAGE_STATE_AMS,
      },
    },
    {
      name: "e2e super admin",
      testDir: "./tests/e2e",
      testMatch: "**/superAdmin*/**/*.loggedin.spec.ts",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: STORAGE_STATE_SUPER_ADMIN,
      },
    },
    {
      name: "e2e login",
      testDir: "./tests/e2e",
      testMatch: "**/login/*.loggedin.spec.ts|**/login/superAdminLogin/*.loggedin.spec.ts",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: STORAGE_STATE_SUPER_ADMIN,
      },
    },
  ],
});
