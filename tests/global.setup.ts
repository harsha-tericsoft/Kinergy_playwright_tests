// import { test as setup } from "@playwright/test";
// import {
//   getEnvironmentBasePath,
//   getEnvironmentUserDetails,
//   Roles,
//   getEnvironmentBasePathForAPI,
// } from "./util";
// import { LoginPage } from "page-objects/LoginPage";
// import {
//   STORAGE_STATE_AMF,
//   STORAGE_STATE_AMS,
//   STORAGE_STATE_SUPER_ADMIN,
//   STORAGE_STATE_TOKEN,
// } from "playwright.config";
// import pino from "pino";
// import { request } from "@playwright/test";
// import fs from "fs";

// const log = pino({
//   level: "info",
// });

// const basePath = getEnvironmentBasePath();
// const basePathAPI = getEnvironmentBasePathForAPI();
// const AdminUserDetails = getEnvironmentUserDetails(Roles.Admin);
// const ProviderUserDetails = getEnvironmentUserDetails(Roles.Provider);
// // const superAdminUserDetails = getEnvironmentUserDetails(Roles.SuperAdmin);

// // Environment Setup
// setup("setup Admin user session", async ({ page, context }) => {
//   log.info("🔄 Running setup for AMF User...");

//   const loginPage = new LoginPage(page);
//   await loginPage.navigateToLogin(basePath);
//   await loginPage.login(AdminUserDetails.username, AdminUserDetails.password);
//   await page.waitForURL(`${basePath}/mapview`);

//   log.info("✅ Admin User session stored.");
//   // await page.context().storageState({ path: STORAGE_STATE_AMF });
// });

// setup("setup provider user session", async ({ page, context }) => {
//   log.info("🔄 Running setup for provider User...");

//   const loginPage = new LoginPage(page);
//   await loginPage.navigateToLogin(basePath);
//   await loginPage.login(ProviderUserDetails.username, ProviderUserDetails.password);
//   await page.waitForURL(`${basePath}/mapview`);

//   log.info("✅ Provider User session stored.");
//   await page.context().storageState({ path: STORAGE_STATE_AMS });
// });

// // setup("setup super admin user session", async ({ page, context }) => {
// //   log.info("🔄 Running setup for Super Admin...");

// //   const loginPage = new LoginPage(page);
// //   await loginPage.navigateToLogin(basePath);
// //   await loginPage.login(
// //     AdminUserDetails.username,
// //     AdminUserDetails.password
// //   );
// //   await page.waitForURL(`${basePath}/mapview`);

// //   log.info("✅ Super Admin session stored.");
// //   await page.context().storageState({ path: STORAGE_STATE_SUPER_ADMIN });
// // });

// setup("setup admin user API session", async () => {
//   log.info("🔄 Logging in Admin API token setup...");

//   const apiContext = await request.newContext();
//   const res = await apiContext.post(`${basePathAPI}/login`, {
//     data: {
//       email: AdminUserDetails.username,
//       password: AdminUserDetails.password,
//     },
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   });

//   const body = await res.json();
//   if (!res.ok()) {
//     throw new Error(`Login failed: ${res.status()} - ${JSON.stringify(body)}`);
//   }

//   const tokenData = {
//     accessToken: body.token,
//   };

//   // Ensure the directory exists before writing the file
//   const tokenDir = require("path").dirname(STORAGE_STATE_TOKEN);
//   if (!fs.existsSync(tokenDir)) {
//     fs.mkdirSync(tokenDir, { recursive: true });
//   }

//   fs.writeFileSync(STORAGE_STATE_TOKEN, JSON.stringify(tokenData));
//   log.info(`✅ Super Admin API token saved to ${STORAGE_STATE_TOKEN}`);
// });

// setup("provider user API session", async () => {
//   log.info("🔄 Logging in for Admin API token setup...");

//   const apiContext = await request.newContext();
//   const res = await apiContext.post(`${basePathAPI}/login`, {
//     data: {
//       email: ProviderUserDetails.username,
//       password: ProviderUserDetails.password,
//     },
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   });

//   const body = await res.json();
//   if (!res.ok()) {
//     throw new Error(`Login failed: ${res.status()} - ${JSON.stringify(body)}`);
//   }

//   const tokenData = {
//     accessToken: body.token,
//   };

//   // Create Admin token file path
//   const adminTokenPath = STORAGE_STATE_TOKEN.replace(
//     "apiToken.json",
//     "admin.apiToken.json"
//   );
//   const tokenDir = require("path").dirname(adminTokenPath);
//   if (!fs.existsSync(tokenDir)) {
//     fs.mkdirSync(tokenDir, { recursive: true });
//   }

//   fs.writeFileSync(adminTokenPath, JSON.stringify(tokenData));
//   log.info(`✅ AMF API token saved to ${adminTokenPath}`);
// });

// setup("setup AMS user API session", async () => {
//   log.info("🔄 Logging in for AMS API token setup...");

//   const apiContext = await request.newContext();
//   const res = await apiContext.post(`${basePathAPI}/login`, {
//     data: {
//       email: AdminUserDetails.username,
//       password: AdminUserDetails.password,
//     },
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   });

//   const body = await res.json();
//   if (!res.ok()) {
//     throw new Error(`Login failed: ${res.status()} - ${JSON.stringify(body)}`);
//   }

//   const tokenData = {
//     accessToken: body.token,
//   };

//   // Create AMS token file path
//   const amsTokenPath = STORAGE_STATE_TOKEN.replace(
//     "apiToken.json",
//     "ams.apiToken.json"
//   );
//   const tokenDir = require("path").dirname(amsTokenPath);
//   if (!fs.existsSync(tokenDir)) {
//     fs.mkdirSync(tokenDir, { recursive: true });
//   }

//   fs.writeFileSync(amsTokenPath, JSON.stringify(tokenData));
//   log.info(`✅ AMS API token saved to ${amsTokenPath}`);
// });

import { test as setup, request } from "@playwright/test";
import {
  getEnvironmentBasePath,
  getEnvironmentUserDetails,
  Roles,
  getEnvironmentBasePathForAPI,
} from "./util";
import { LoginPage } from "page-objects/LoginPage";
import { STORAGE_STATE_ADMIN, STORAGE_STATE_PROVIDER, STORAGE_STATE_TOKEN } from "playwright.config";
import pino from "pino";
import fs from "fs";
import path from "path";

const log = pino({ level: "info" });

// Get environment URLs and credentials
const basePath = getEnvironmentBasePath();
const basePathAPI = getEnvironmentBasePathForAPI();

/**
 * Helper function to login and save session - follows DRY principle
 * Reusable for both Admin and Provider roles
 */
async function loginAndSaveSession(
  page: any,
  role: Roles,
  storageStatePath: string
): Promise<void> {
  const userDetails = getEnvironmentUserDetails(role);
  const roleName = Roles[role] || role;

  log.info(`🔄 Running setup for ${roleName} User...`);

  const loginPage = new LoginPage(page);
  await loginPage.navigateToLogin(basePath);
  await loginPage.login(userDetails.username, userDetails.password);

  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);
  
  // Wait for dashboard or navigate to it
  if (page.url().includes("/email-otp-verification")) {
    await page.waitForURL((url: URL) => url.pathname.includes("/dashboard"), { timeout: 30000 });
  } else {
    await page.goto(`${basePath}/dashboard`);
    await page.waitForLoadState("networkidle");
  }

  console.log(`✅ Final URL before saving session: ${page.url()}`);
  log.info(`✅ ${roleName} session stored.`);
  await page.context().storageState({ path: storageStatePath });
}

/**
 * Helper function to save API token - follows DRY principle
 */
async function saveApiToken(
  userCredentials: { username: string; password: string },
  tokenPath: string
): Promise<void> {
  log.info("🔄 Logging in for Admin API token setup...");

  const apiContext = await request.newContext();
  const res = await apiContext.post(`${basePathAPI}/login`, {
    data: {
      email: userCredentials.username,
      password: userCredentials.password,
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const body = await res.json();
  if (!res.ok()) {
    throw new Error(`Login failed: ${res.status()} - ${JSON.stringify(body)}`);
  }

  const tokenData = { accessToken: body.token };
  const tokenDir = path.dirname(tokenPath);
  if (!fs.existsSync(tokenDir)) {
    fs.mkdirSync(tokenDir, { recursive: true });
  }

  fs.writeFileSync(tokenPath, JSON.stringify(tokenData));
  log.info(`✅ Admin API token saved to ${tokenPath}`);
}

// ---- WEB LOGIN SESSIONS ----
// Using helper function to eliminate code duplication (DRY principle)

setup("setup Admin user session", async ({ page }) => {
  await loginAndSaveSession(page, Roles.Admin, STORAGE_STATE_ADMIN);
});

setup("setup Provider user session", async ({ page }) => {
  await loginAndSaveSession(page, Roles.Provider, STORAGE_STATE_PROVIDER);
});

// ---- API TOKEN LOGIN ----

setup("setup Admin API session", async () => {
  const adminUser = getEnvironmentUserDetails(Roles.Admin);
  await saveApiToken(adminUser, STORAGE_STATE_TOKEN);
});
