"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const util_1 = require("./util");
const LoginPage_1 = require("page-objects/LoginPage");
const playwright_config_1 = require("playwright.config");
const pino_1 = __importDefault(require("pino"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const log = (0, pino_1.default)({ level: "info" });
const basePath = (0, util_1.getEnvironmentBasePath)();
const basePathAPI = (0, util_1.getEnvironmentBasePathForAPI)();
const adminUser = (0, util_1.getEnvironmentUserDetails)(util_1.Roles.Admin);
const providerUser = (0, util_1.getEnvironmentUserDetails)(util_1.Roles.Provider);
(0, test_1.test)("setup Admin user session", async ({ page }) => {
    log.info("🔄 Running setup for Admin User...");
    const loginPage = new LoginPage_1.LoginPage(page);
    await loginPage.navigateToLogin(basePath);
    await loginPage.login(adminUser.username, adminUser.password);
    await page.waitForURL(`${basePath}/mapview`);
    log.info("✅ Admin session stored.");
    await page.context().storageState({ path: playwright_config_1.STORAGE_STATE_ADMIN });
});
(0, test_1.test)("setup Provider user session", async ({ page }) => {
    log.info("🔄 Running setup for Provider User...");
    const loginPage = new LoginPage_1.LoginPage(page);
    await loginPage.navigateToLogin(basePath);
    await loginPage.login(providerUser.username, providerUser.password);
    await page.waitForURL(`${basePath}/mapview`);
    log.info("✅ Provider session stored.");
    await page.context().storageState({ path: playwright_config_1.STORAGE_STATE_PROVIDER });
});
(0, test_1.test)("setup Admin API session", async () => {
    log.info("🔄 Logging in for Admin API token setup...");
    const apiContext = await test_1.request.newContext();
    const res = await apiContext.post(`${basePathAPI}/login`, {
        data: {
            email: adminUser.username,
            password: adminUser.password,
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
    const tokenDir = path_1.default.dirname(playwright_config_1.STORAGE_STATE_TOKEN);
    if (!fs_1.default.existsSync(tokenDir)) {
        fs_1.default.mkdirSync(tokenDir, { recursive: true });
    }
    fs_1.default.writeFileSync(playwright_config_1.STORAGE_STATE_TOKEN, JSON.stringify(tokenData));
    log.info(`✅ Admin API token saved to ${playwright_config_1.STORAGE_STATE_TOKEN}`);
});
//# sourceMappingURL=global.setup.js.map