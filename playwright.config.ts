// import { defineConfig, devices } from "@playwright/test";
// import * as path from "path";
// import { getEnvironment } from "tests/util";

// // Dynamically fetch environment and corresponding storage state
// const ENV = getEnvironment(); // Gets 'staging', 'dev', etc.

// // Define separate storage states for each role
// export const STORAGE_STATE_AMF = path.join(
//   __dirname,
//   `playwright/.auth/${ENV}.amf.json`
// );
// export const STORAGE_STATE_AMS = path.join(
//   __dirname,
//   `playwright/.auth/${ENV}.ams.json`
// );
// export const STORAGE_STATE_SUPER_ADMIN = path.join(
//   __dirname,
//   `playwright/.auth/${ENV}.superAdmin.json`
// );
// export const STORAGE_STATE_TOKEN = path.join(
//   __dirname,
//   `playwright/.auth/${ENV}.apiToken.json`
// );

// export default defineConfig({
//   timeout: 60000,
//   testDir: "./tests",
//   /* Run tests in files in parallel */
//   fullyParallel: true,
//   /* Fail the build on CI if you accidentally left test.only in the source code */
//   forbidOnly: false,
//   /* Retry on CI only */
//   retries: process.env.CI ? 2 : 0,
//   /* Opt out of parallel tests on CI */
//   workers: process.env.CI ? 2 : undefined,
//   /* Reporter to use */
//   reporter: [
//     ["html", { outputFolder: "playwright-report", open: "never" }],
//     ["blob", { outputDir: "blob-report" }],
//   ],
//   /* Shared settings for all projects */
//   use: {
//     /* Collect trace when retrying failed tests */
//     screenshot: "only-on-failure",
//     video: "retain-on-failure",
//     trace: "retain-on-failure",
//   },

//   /* Configure projects for major browsers */
//   projects: [
//     {
//       name: "setup",
//       testMatch: /global\.setup\.ts/,
//     },
//     {
//       name: "api tests",
//       testDir: "./tests/api",
//       testMatch: "**/*.spec.ts",
//       dependencies: ["setup"],
//       use: {
//         headless: true,
//         storageState: STORAGE_STATE_TOKEN,
//       },
//     },
//     {
//       name: "regression AMF",
//       testDir: "./tests/regression",
//       testMatch: "**/amf*/*.loggedin.spec.ts",
//       dependencies: ["setup"],
//       use: {
//         ...devices["Desktop Chrome"],
//         storageState: STORAGE_STATE_AMF,
//       },
//     },
//     {
//       name: "regression AMS",
//       testDir: "./tests/regression",
//       testMatch: "**/ams*/*.loggedin.spec.ts",
//       dependencies: ["setup"],
//       use: {
//         ...devices["Desktop Chrome"],
//         storageState: STORAGE_STATE_AMS,
//       },
//     },
//     {
//       name: "regression super admin",
//       testDir: "./tests/regression",
//       testMatch: "**/superAdmin*/**/*.loggedin.spec.ts",
//       dependencies: ["setup"],
//       use: {
//         ...devices["Desktop Chrome"],
//         storageState: STORAGE_STATE_SUPER_ADMIN,
//       },
//     },
//     {
//       name: "e2e AMF",
//       testDir: "./tests/e2e",
//       testMatch: "**/amf*/*.loggedin.spec.ts",
//       dependencies: ["setup"],
//       use: {
//         ...devices["Desktop Chrome"],
//         storageState: STORAGE_STATE_AMF,
//       },
//     },
//     {
//       name: "e2e AMS",
//       testDir: "./tests/e2e",
//       testMatch: "**/ams*/*.loggedin.spec.ts",
//       dependencies: ["setup"],
//       use: {
//         ...devices["Desktop Chrome"],
//         storageState: STORAGE_STATE_AMS,
//       },
//     },
//     {
//       name: "e2e super admin",
//       testDir: "./tests/e2e",
//       testMatch: "**/superAdmin*/**/*.loggedin.spec.ts",
//       dependencies: ["setup"],
//       use: {
//         ...devices["Desktop Chrome"],
//         storageState: STORAGE_STATE_SUPER_ADMIN,
//       },
//     },
//     {
//       name: "e2e login",
//       testDir: "./tests/e2e",
//       testMatch: "**/login/*.loggedin.spec.ts|**/login/superAdminLogin/*.loggedin.spec.ts",
//       dependencies: ["setup"],
//       use: {
//         ...devices["Desktop Chrome"],
//         storageState: STORAGE_STATE_SUPER_ADMIN,
//       },
//     },
//   ],
// });


import { defineConfig, devices } from "@playwright/test";
import * as path from "path";
import { getEnvironment, getEnvironmentBasePath } from "tests/util";


// Get directory path - works for both CommonJS and ES modules
// Using process.cwd() as base since config is in project root
const baseDir = process.cwd();

// Dynamically fetch environment and corresponding storage state
const ENV = getEnvironment(); // Gets 'staging', 'dev', etc.

// Define separate storage states for each role
export const STORAGE_STATE_ADMIN = path.join(
  baseDir,
  `playwright/.auth/${ENV}.admin.json`
);
export const STORAGE_STATE_PROVIDER = path.join(
  baseDir,
  `playwright/.auth/${ENV}.provider.json`
);
export const STORAGE_STATE_TOKEN = path.join(
  baseDir,
  `playwright/.auth/${ENV}.apiToken.json`
);

export default defineConfig({
  timeout: 120000,
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: false,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["blob", { outputDir: "blob-report" }],
  ],
  use: {
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    // Set baseURL so we can use relative paths in tests
    baseURL: getEnvironmentBasePath(),
  },

  projects: [
    // 1️⃣ Setup project — runs first to log in and save sessions
    {
      name: "setup",
      testMatch: /global\.setup\.ts/,
    },

    // 2️⃣ API Tests (if you have API-based tests)
    {
      name: "api tests",
      testDir: "./tests/api",
      testMatch: "**/*.spec.ts",
      dependencies: ["setup"],
      use: {
        headless: true,
      },
    },

    // 3️⃣ Regression Tests for Admin
    {
      name: "regression Admin",
      testDir: "./tests/regression",
      testMatch: "**/admin*/*.loggedin.spec.ts",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: STORAGE_STATE_ADMIN,
      },
    },

    // 4️⃣ Regression Tests for Provider
    {
      name: "regression Provider",
      testDir: "./tests/regression",
      testMatch: "**/provider*/*.loggedin.spec.ts",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: STORAGE_STATE_PROVIDER,
      },
    },

    // 5️⃣ E2E Tests for Admin
    {
      name: "e2e Admin",
      testDir: "./tests/e2e",
      testMatch: "**/admin*/*.loggedin.spec.ts",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: STORAGE_STATE_ADMIN,
      },
    },

    // 6️⃣ E2E Tests for Provider
    {
      name: "e2e Provider",
      testDir: "./tests/e2e",
      testMatch: "**/provider*/*.loggedin.spec.ts",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: STORAGE_STATE_PROVIDER,
      },
    },

    // 7️⃣ E2E Tests for Client (Admin role)
    {
      name: "e2e Client",
      testDir: "./tests/e2e",
      testMatch: "**/client*.spec.ts",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: STORAGE_STATE_ADMIN,
      },
    },

    // 8️⃣ Login Page Tests - admin.loggedin.spec.ts logs in and saves state
    // No dependency on setup, so it can login independently
    {
      name: "e2e login",
      testDir: "./tests/e2e",
      testMatch: "**/login/**/*.loggedin.spec.ts",
      // No dependencies - this test will login and save the state
      // No storageState - this test needs to login first
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
