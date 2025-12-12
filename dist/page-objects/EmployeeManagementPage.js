"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeePage = void 0;
const test_1 = require("@playwright/test");
const util_1 = require("tests/util");
const logger_1 = require("tests/util/logger");
class EmployeePage {
    page;
    teamMembersMenu;
    employeeListTitle;
    searchEmployeeInput;
    addEmployeeButton;
    addEmployeePageTitle;
    firstNameInput;
    lastNameInput;
    emailInput;
    contactNumberInput;
    genderDropdown;
    roleDropdown;
    passwordInput;
    confirmPasswordInput;
    streetAddressInput;
    cityInput;
    stateDropdown;
    zipCodeInput;
    cancelButton;
    createButton;
    constructor(page) {
        this.page = page;
        this.teamMembersMenu = this.page.getByRole('link', { name: 'Team Members' });
        this.employeeListTitle = this.page.locator('//div[@class="header-title"]');
        this.searchEmployeeInput = this.page.getByPlaceholder('Search Employee');
        this.addEmployeeButton = this.page.getByRole('button', { name: 'Add Employee' });
        this.addEmployeePageTitle = this.page.locator('//div[@class="heading-title"]');
        this.firstNameInput = this.page.getByPlaceholder('Enter first Name');
        this.lastNameInput = this.page.getByPlaceholder('Enter last Name');
        this.emailInput = this.page.getByPlaceholder('Enter email address');
        this.contactNumberInput = this.page.getByPlaceholder('Enter contact number');
        this.genderDropdown = this.page.locator('//div[@id="mui-component-select-gender"]');
        this.roleDropdown = this.page.locator("//div[@id='mui-component-select-role']");
        this.passwordInput = this.page.locator("//input[@type='password']").first();
        this.confirmPasswordInput = this.page.locator("//input[@type='password']").last();
        this.streetAddressInput = this.page.getByPlaceholder("Enter street address");
        this.cityInput = this.page.getByPlaceholder("Enter city");
        this.stateDropdown = this.page.locator("//div[@id='mui-component-select-address.state']");
        this.zipCodeInput = this.page.getByPlaceholder("Enter zip code");
        this.cancelButton = this.page.getByText('Cancel');
        this.createButton = this.page.getByText('Create');
    }
    async navigateToTeamMembersPage() {
        await this.teamMembersMenu.click();
    }
    async verifyEmployeeListPage() {
        await (0, test_1.expect)(this.employeeListTitle).toBeVisible();
        await (0, test_1.expect)(this.addEmployeeButton).toBeVisible();
    }
    async navigateToEmployeePage(basePath) {
        await this.page.goto(`${basePath}${util_1.addEmployeePage}`);
    }
    async searchEmployee(searchTerm) {
        await this.searchEmployeeInput.fill(searchTerm);
    }
    async selectGender(gender) {
        const genderOption = this.page.locator(`[role="listbox"] [role="option"]:has-text("${gender}")`).first();
        await genderOption.waitFor({ state: 'visible' });
        await genderOption.click();
        logger_1.log.info(`✅ Gender selected: ${gender}`);
    }
    async selectRole(role) {
        await this.roleDropdown.click();
        const roleOption = this.page.locator(`[role="listbox"] [role="option"]:has-text("${role}")`).first();
        await roleOption.click();
        logger_1.log.info(`✅ Role selected: ${role}`);
    }
    async selectState(state) {
        await this.stateDropdown.click();
        const stateOption = this.page.locator(`[role="listbox"] [role="option"]:has-text("${state}")`).first();
        await stateOption.click();
        logger_1.log.info(`✅ State selected: ${state}`);
    }
    async clickAddEmployee() {
        await this.addEmployeeButton.click();
    }
    async verifyAddEmployeePage() {
        await (0, test_1.expect)(this.addEmployeePageTitle).toBeVisible();
    }
    async fillBasicInformation(data) {
        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill(data.lastName);
        await this.emailInput.fill(data.email);
        await this.contactNumberInput.fill(data.contactNumber);
        await this.genderDropdown.click();
        await this.passwordInput.fill(data.password);
        await this.confirmPasswordInput.fill(data.confirmPassword);
    }
    async fillAddressInformation(data) {
        await this.streetAddressInput.fill(data.streetAddress);
        await this.cityInput.fill(data.city);
        await this.zipCodeInput.fill(data.zipCode);
    }
    async createEmployeeBtn() {
        await this.createButton.click();
    }
    async verifyEmployeeInTable(employeeData) {
        const fullName = `${employeeData.firstName} ${employeeData.lastName}`;
        const employeeRow = this.page.locator(`//tr[contains(., '${fullName}')]`);
        await (0, test_1.expect)(employeeRow).toBeVisible();
        const nameCell = employeeRow.locator('td').nth(0);
        await (0, test_1.expect)(nameCell).toContainText(fullName);
        const emailCell = employeeRow.locator('td').nth(1);
        await (0, test_1.expect)(emailCell).toContainText(employeeData.email);
        const roleCell = employeeRow.locator('td').nth(2);
        await (0, test_1.expect)(roleCell).toContainText(employeeData.role);
        const contactCell = employeeRow.locator('td').nth(3);
        const digits = employeeData.contactNumber.replace(/\D/g, '');
        const formattedContact = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
        await (0, test_1.expect)(contactCell).toContainText(formattedContact);
        logger_1.log.info(`✅ Employee ${fullName} verified in table with all column data`);
    }
    async waitForEmployeeEmailToAppearInTable(email) {
        await this.page.waitForSelector(`//tr[contains(., '${email}')]`, {
            state: 'visible',
            timeout: 15000
        });
    }
    async cancelEmployeeCreation() {
        await this.cancelButton.click();
    }
}
exports.EmployeePage = EmployeePage;
//# sourceMappingURL=EmployeeManagementPage.js.map