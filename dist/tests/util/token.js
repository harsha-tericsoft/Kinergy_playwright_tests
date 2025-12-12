"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidToken = getValidToken;
exports.saveToken = saveToken;
const fs_1 = __importDefault(require("fs"));
const playwright_config_1 = require("playwright.config");
const logger_1 = require("./logger");
const TOKEN_PATH = playwright_config_1.STORAGE_STATE_TOKEN;
async function getValidToken() {
    if (!fs_1.default.existsSync(TOKEN_PATH)) {
        throw new Error(`Token file not found at ${TOKEN_PATH}. Did global setup run?`);
    }
    const tokenData = JSON.parse(fs_1.default.readFileSync(TOKEN_PATH, "utf-8"));
    const { accessToken } = tokenData;
    return accessToken;
}
function saveToken(accessToken) {
    const tokenData = {
        accessToken,
    };
    fs_1.default.writeFileSync(TOKEN_PATH, JSON.stringify(tokenData));
    logger_1.log.info("✅ Access token saved.");
}
//# sourceMappingURL=token.js.map