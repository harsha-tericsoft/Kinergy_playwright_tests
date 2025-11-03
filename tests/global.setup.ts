import { test as setup } from "@playwright/test";
import {
  getEnvironmentBasePath,
  getEnvironmentUserDetails,
  Roles,
  getEnvironmentBasePathForAPI,
} from "./util";
import { LoginPage } from "page-objects/LoginPage";
import {
  STORAGE_STATE_AMF,
  STORAGE_STATE_AMS,
  STORAGE_STATE_SUPER_ADMIN,
  STORAGE_STATE_TOKEN,
} from "playwright.config";
import pino from "pino";
import { request } from "@playwright/test";
import fs from "fs";

const log = pino({
  level: "info",
});

const basePath = getEnvironmentBasePath();
const basePathAPI = getEnvironmentBasePathForAPI();
const amfUserDetails = getEnvironmentUserDetails(Roles.AMF);
const amsUserDetails = getEnvironmentUserDetails(Roles.AMS);
const superAdminUserDetails = getEnvironmentUserDetails(Roles.SuperAdmin);

// Environment Setup
setup("setup AMF user session", async ({ page, context }) => {
  log.info("🔄 Running setup for AMF User...");

  const loginPage = new LoginPage(page);
  await loginPage.navigateToLogin(basePath);
  await loginPage.login(amfUserDetails.username, amfUserDetails.password);
  await page.waitForURL(`${basePath}/mapview`);

  log.info("✅ AMF User session stored.");
  await page.context().storageState({ path: STORAGE_STATE_AMF });
});

setup("setup AMS user session", async ({ page, context }) => {
  log.info("🔄 Running setup for AMS User...");

  const loginPage = new LoginPage(page);
  await loginPage.navigateToLogin(basePath);
  await loginPage.login(amsUserDetails.username, amsUserDetails.password);
  await page.waitForURL(`${basePath}/mapview`);

  log.info("✅ AMS User session stored.");
  await page.context().storageState({ path: STORAGE_STATE_AMS });
});

setup("setup super admin user session", async ({ page, context }) => {
  log.info("🔄 Running setup for Super Admin...");

  const loginPage = new LoginPage(page);
  await loginPage.navigateToLogin(basePath);
  await loginPage.login(
    superAdminUserDetails.username,
    superAdminUserDetails.password
  );
  await page.waitForURL(`${basePath}/mapview`);

  log.info("✅ Super Admin session stored.");
  await page.context().storageState({ path: STORAGE_STATE_SUPER_ADMIN });
});

setup("setup super admin user API session", async () => {
  log.info("🔄 Logging in for Super Admin API token setup...");

  const apiContext = await request.newContext();
  const res = await apiContext.post(`${basePathAPI}/login`, {
    data: {
      email: superAdminUserDetails.username,
      password: superAdminUserDetails.password,
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

  const tokenData = {
    accessToken: body.token,
  };

  // Ensure the directory exists before writing the file
  const tokenDir = require("path").dirname(STORAGE_STATE_TOKEN);
  if (!fs.existsSync(tokenDir)) {
    fs.mkdirSync(tokenDir, { recursive: true });
  }

  fs.writeFileSync(STORAGE_STATE_TOKEN, JSON.stringify(tokenData));
  log.info(`✅ Super Admin API token saved to ${STORAGE_STATE_TOKEN}`);
});

setup("setup AMF user API session", async () => {
  log.info("🔄 Logging in for AMF API token setup...");

  const apiContext = await request.newContext();
  const res = await apiContext.post(`${basePathAPI}/login`, {
    data: {
      email: amfUserDetails.username,
      password: amfUserDetails.password,
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

  const tokenData = {
    accessToken: body.token,
  };

  // Create AMF token file path
  const amfTokenPath = STORAGE_STATE_TOKEN.replace(
    "apiToken.json",
    "amf.apiToken.json"
  );
  const tokenDir = require("path").dirname(amfTokenPath);
  if (!fs.existsSync(tokenDir)) {
    fs.mkdirSync(tokenDir, { recursive: true });
  }

  fs.writeFileSync(amfTokenPath, JSON.stringify(tokenData));
  log.info(`✅ AMF API token saved to ${amfTokenPath}`);
});

setup("setup AMS user API session", async () => {
  log.info("🔄 Logging in for AMS API token setup...");

  const apiContext = await request.newContext();
  const res = await apiContext.post(`${basePathAPI}/login`, {
    data: {
      email: amsUserDetails.username,
      password: amsUserDetails.password,
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

  const tokenData = {
    accessToken: body.token,
  };

  // Create AMS token file path
  const amsTokenPath = STORAGE_STATE_TOKEN.replace(
    "apiToken.json",
    "ams.apiToken.json"
  );
  const tokenDir = require("path").dirname(amsTokenPath);
  if (!fs.existsSync(tokenDir)) {
    fs.mkdirSync(tokenDir, { recursive: true });
  }

  fs.writeFileSync(amsTokenPath, JSON.stringify(tokenData));
  log.info(`✅ AMS API token saved to ${amsTokenPath}`);
});
