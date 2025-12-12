"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INSTALL_COMMANDS = exports.REQUIRED_PACKAGES = void 0;
exports.getInstallCommands = getInstallCommands;
exports.checkPackages = checkPackages;
exports.REQUIRED_PACKAGES = [
    '@playwright/test',
    'dotenv',
    'ts-pattern',
    'pino',
    'pino-pretty'
];
exports.INSTALL_COMMANDS = [
    'npm install --save-dev @playwright/test',
    'npm install dotenv',
    'npm install --save-dev ts-pattern',
    'npm install pino pino-pretty',
    'npx playwright install'
];
function getInstallCommands() {
    return exports.INSTALL_COMMANDS;
}
function checkPackages() {
    return true;
}
//# sourceMappingURL=requirements.js.map