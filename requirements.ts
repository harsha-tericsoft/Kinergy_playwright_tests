/**
 * Requirements for FlexOS Playwright Tests
 * 
 * This file lists all required dependencies and installation commands.
 */

// Required npm packages to install
export const REQUIRED_PACKAGES = [
  '@playwright/test',
  'dotenv',
  'ts-pattern',
  'pino',
  'pino-pretty'
];

// Installation commands
export const INSTALL_COMMANDS = [
  'npm install --save-dev @playwright/test',
  'npm install dotenv',
  'npm install --save-dev ts-pattern',
  'npm install pino pino-pretty',
  'npx playwright install'
];

// Quick install function
export function getInstallCommands(): string[] {
  return INSTALL_COMMANDS;
}

// Check if all packages are installed
export function checkPackages(): boolean {
  // Add package checking logic here
  return true;
} 